import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { runSmoke } from './smoke-test.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_PATH = join(ROOT, 'js', 'data.js');
const APP_PATH = join(ROOT, 'js', 'app.js');
const VOTES_PATH = join(ROOT, 'js', 'votes.js');
const LIVE_PATH = join(ROOT, 'js', 'live.js');
const CONFIG_PATH = join(ROOT, 'js', 'supabase-config.js');
const STYLES_PATH = join(ROOT, 'styles.css');

// Batch files (AGENTS.md Option C) push extra items onto the registry.
const ITEMS_DIR = join(ROOT, 'js', 'items');
const batchFiles = existsSync(ITEMS_DIR)
  ? readdirSync(ITEMS_DIR).filter(f => f.endsWith('.js')).sort().map(f => join(ITEMS_DIR, f))
  : [];

const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// 1. Syntax check all JS files (catches the "Mimo" class of failure).
for (const file of [DATA_PATH, APP_PATH, VOTES_PATH, LIVE_PATH, CONFIG_PATH, ...batchFiles]) {
  const r = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (r.status !== 0) {
    fail(`Syntax error in ${file.replace(ROOT + '\\', '')}:\n${r.stderr.trim()}`);
  }
}

// 2. Load the registry in a sandbox to validate structure.
let LIB = null;
const sandbox = { window: {}, console };
try {
  const source = readFileSync(DATA_PATH, 'utf8');
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'js/data.js' });
  LIB = sandbox.window.DESIGN_LAB;
} catch (e) {
  fail(`Could not evaluate js/data.js: ${e.message}`);
}

// Batch files push extra items onto the registry before validation runs.
// Track which ids come from which batch so errors can name the source file.
const itemSource = new Map();
const MAX_BATCH_ITEMS = 40;
for (const file of batchFiles) {
  try {
    const before = LIB ? LIB.items.length : 0;
    const source = readFileSync(file, 'utf8');
    vm.runInContext(source, sandbox, { filename: file.replace(ROOT + '\\', '') });
    const after = LIB ? LIB.items.length : 0;
    const added = LIB.items.slice(before, after);
    if (added.length > MAX_BATCH_ITEMS) {
      warn(`Batch ${file.replace(ROOT + '\\', '')} pushes ${added.length} items; keep batches under ${MAX_BATCH_ITEMS} for legible diffs.`);
    }
    for (const it of added) {
      if (it && typeof it.id === 'string') itemSource.set(it.id, file.replace(ROOT + '\\', ''));
    }
  } catch (e) {
    fail(`Could not evaluate ${file}: ${e.message}`);
  }
}

if (LIB) {
  if (!LIB || typeof LIB !== 'object') {
    fail('window.DESIGN_LAB is missing.');
  } else {
    const creators = Array.isArray(LIB.creators) ? LIB.creators : [];
    const sections = Array.isArray(LIB.sections) ? LIB.sections : [];
    const items = Array.isArray(LIB.items) ? LIB.items : [];

    const creatorIds = new Set();
    const creatorNames = new Map(); // lowercase name -> original id
    const BLOCKED_WORDS = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'porn', 'nazi', 'hitler', 'rape', 'whore', 'nigg', 'fag', 'retard', 'kkk'];
    for (const c of creators) {
      if (!c || !c.id) { fail('A creator entry is missing an id.'); continue; }
      if (creatorIds.has(c.id)) fail(`Duplicate creator id "${c.id}".`);
      creatorIds.add(c.id);
      if (typeof c.id === 'string' && !/^[a-z0-9-]+$/.test(c.id)) {
        fail(`Creator id "${c.id}" must be lowercase letters, numbers, hyphens only.`);
      }
      if (typeof c.name === 'string' && c.name.trim()) {
        const name = c.name.trim();
        if (name.length > 32) fail(`Creator name "${name}" is too long (max 32 chars).`);
        if (!/^[a-zA-Z0-9 .+\-'#]+$/.test(name)) fail(`Creator name "${name}" uses characters that aren't letters, numbers, spaces, or basic punctuation.`);
        const lower = name.toLowerCase();
        for (const w of BLOCKED_WORDS) {
          if (lower.includes(w)) fail(`Creator name "${name}" contains blocked language.`);
        }
        const key = lower;
        if (creatorNames.has(key)) {
          fail(`Duplicate creator name "${name}" (also used by "${creatorNames.get(key)}") — one agent per identity.`);
        } else {
          creatorNames.set(key, c.id);
        }
      }
    }

    const sectionById = new Map();
    const sectionCodes = new Set();
    for (const s of sections) {
      if (!s || !s.id) { fail('A section entry is missing an id.'); continue; }
      if (sectionById.has(s.id)) fail(`Duplicate section id "${s.id}".`);
      if (s.code && sectionCodes.has(s.code)) fail(`Duplicate section code "${s.code}".`);
      if (s.code) sectionCodes.add(s.code);
      sectionById.set(s.id, s);
    }

    // Chip colors must be unique per creator so credit chips stay unambiguous.
    const chipByCreator = new Map();
    for (const c of creators) {
      if (!c.color) continue;
      const key = String(c.color).trim().toLowerCase();
      if (chipByCreator.has(key)) {
        warn(`Creators "${chipByCreator.get(key)}" and "${c.id}" share chip color "${c.color}".`);
      } else {
        chipByCreator.set(key, c.id);
      }
    }

    const seenIds = new Set();
    for (const item of items) {
      if (!item || typeof item !== 'object') { fail('An items[] entry is not an object.'); continue; }
      const label = item.id ? `#${item.id}` : '<unnamed>';

      if (typeof item.id !== 'string' || !item.id.trim()) fail(`${label}: missing id`);
      else if (seenIds.has(item.id)) {
        const src = itemSource.get(item.id);
        fail(`${label}: duplicate item id${src ? ` (also in ${src})` : ''}`);
      }
      else seenIds.add(item.id);
      if (typeof item.name !== 'string' || !item.name.trim()) fail(`${label}: missing name`);
      if (typeof item.description !== 'string' || !item.description.trim()) warn(`${label}: missing description`);
      if (typeof item.code !== 'string' || !item.code.trim()) fail(`${label}: missing code`);
      if (typeof item.creator !== 'string' || !item.creator.trim()) fail(`${label}: missing creator`);
      else if (item.creator === 'me') fail(`${label}: signed as reserved id "me"`);
      else if (creatorIds.size && !creatorIds.has(item.creator)) fail(`${label}: unknown creator "${item.creator}"`);

      if (!sectionById.has(item.section)) fail(`${label}: unknown section "${item.section}"`);
      else {
        const sec = sectionById.get(item.section);
        if (sec.code && typeof item.id === 'string' && !item.id.startsWith(sec.code)) {
          warn(`${label}: id should start with section code "${sec.code}"`);
        }
      }

      if (item.tags !== undefined && !Array.isArray(item.tags)) fail(`${label}: tags must be an array`);
      else if (Array.isArray(item.tags)) item.tags.forEach(t => {
        if (typeof t !== 'string' || !t.trim()) fail(`${label}: tags must only be non-empty strings`);
      });
      if (item.tweaks !== undefined) {
        if (!Array.isArray(item.tweaks)) fail(`${label}: tweaks must be an array`);
        else item.tweaks.forEach((t, i) => {
          const tl = `${label} tweaks[${i}]`;
          if (!t || typeof t.varName !== 'string' || !t.varName.startsWith('--')) fail(`${tl}: needs varName starting with --`);
          else if (t.type !== 'color' && t.type !== 'range') fail(`${tl}: type must be color or range`);
          else if (t.default === undefined || t.default === null) fail(`${tl}: needs default`);
          else if (t.type === 'range') {
            if (!(Number(t.max) > Number(t.min))) fail(`${tl}: range needs max > min`);
            if (!(Number(t.step) > 0)) fail(`${tl}: range step must be positive`);
            if (typeof t.unit !== 'string') fail(`${tl}: range needs a unit string (may be empty)`);
            if (Number.isNaN(Number(t.default))) fail(`${tl}: range default must be numeric`);
          } else if (typeof t.default !== 'string') {
            fail(`${tl}: color default must be a hex/color string`);
          } else if (typeof item.code === 'string' && !item.code.includes(`var(${t.varName}`)) {
            fail(`${tl}: ${t.varName} never consumed via var(--name, …)`);
          }
        });
      }
    }
  }
}

if (LIB) {
  // 2.4 App contract: window.AGENT_PROMPT must exist (app.js mounts the
  // prompt studio from it). Drops here break the COPY AGENT PROMPT button.
  if (typeof sandbox.window.AGENT_PROMPT !== 'string' || !sandbox.window.AGENT_PROMPT.trim()) {
    fail('window.AGENT_PROMPT is missing or empty — app.js needs it to open the agent prompt studio (define it in js/data.js).');
  }
}

// 2.5 Behavioral smoke: mount every scripted specimen, fire every registered
// listener and inline handler in a sandboxed fake DOM, and statically verify
// that queried ids/classes exist in the snippet's own markup.
let smokeStats = null;
if (LIB && Array.isArray(LIB.items)) {
  const smoke = runSmoke(LIB.items);
  for (const s of smoke.errors) fail(s);
  smokeStats = smoke.stats;
}

// 3. Performance-law gate on the app stylesheet (transition must only animate transform/opacity).
try {
  const css = readFileSync(STYLES_PATH, 'utf8');
  const re = /transition\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(css)) !== null) {
    const props = m[1]
      .split(',')
      .map(p => p.trim().split(/\s+/)[0])
      .filter(p => p && p !== 'none' && p !== 'transform' && p !== 'opacity');
    if (props.length) fail(`styles.css: transition animates "${props.join(', ')}" (only transform/opacity allowed).`);
  }
} catch (e) {
  fail(`Could not read styles.css: ${e.message}`);
}

// 4. Report.
if (warnings.length) {
  console.log('Warnings:');
  warnings.forEach(w => console.log('  ⚠ ' + w));
}
if (errors.length) {
  console.error('\n' + errors.length + ' error(s) — push blocked:');
  errors.forEach(e => console.error('  ✖ ' + e));
  process.exit(1);
}
const smokeTxt = smokeStats
  ? ` Smoke: ${smokeStats.itemsScanned} items · ${smokeStats.scriptedItems} scripted · ${smokeStats.scripts} scripts · ${smokeStats.listenersRegistered} listeners / ${smokeStats.listenersFired} fired · ${smokeStats.inlineHandlers} inline handlers — all clean.`
  : '';
console.log(`Registry OK — ${LIB ? LIB.items.length : 0} items, no errors.${smokeTxt}`);
