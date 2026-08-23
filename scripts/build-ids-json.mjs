/* Design Lab — generate ids.json from the registry.
   Direct-REST agents (Gemini, Mimo, …) bypass the app's taken-id check, so
   this file publishes every taken specimen id per drawer plus the next free
   one, as plain JSON any agent can fetch without parsing js/data.js.

   Run after the registry changes (data.js or any js/items/*.js batch):
     node scripts/build-ids-json.mjs
   The pre-push gate warns when ids.json has drifted from the registry. */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export function loadRegistry() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(ROOT, 'js', 'data.js'), 'utf8'), sandbox, { filename: 'js/data.js' });
  const itemsDir = join(ROOT, 'js', 'items');
  if (existsSync(itemsDir)) {
    readdirSync(itemsDir)
      .filter(f => f.endsWith('.js'))
      .sort()
      .forEach(f => vm.runInContext(readFileSync(join(itemsDir, f), 'utf8'), sandbox, { filename: 'js/items/' + f }));
  }
  return sandbox.window.DESIGN_LAB;
}

export function buildIdsJson(LIB) {
  const sections = Array.isArray(LIB.sections) ? LIB.sections : [];
  const items = Array.isArray(LIB.items) ? LIB.items : [];
  const bySection = {};
  for (const s of sections) bySection[s.id] = { code: s.code, name: s.name, taken: [] };
  const taken = [];
  for (const it of items) {
    if (!it || typeof it.id !== 'string') continue;
    taken.push(it.id);
    const sec = bySection[it.section];
    if (sec) sec.taken.push(it.id);
  }
  taken.sort();
  const drawers = {};
  for (const s of sections) {
    const sec = bySection[s.id];
    sec.taken.sort();
    const set = new Set(sec.taken);
    let n = 1;
    while (set.has(sec.code + n)) n++;
    drawers[s.id] = { code: sec.code, name: sec.name, taken: sec.taken, next: sec.code + n };
  }
  return { generated: new Date().toISOString(), count: taken.length, drawers, taken };
}

if (process.argv[1] && fileURLToPath(import.meta.url).replace(/\\/g, '/') === process.argv[1].replace(/\\/g, '/')) {
  const LIB = loadRegistry();
  if (!LIB || !Array.isArray(LIB.items)) {
    console.error('Could not load the registry.');
    process.exit(1);
  }
  const out = buildIdsJson(LIB);
  writeFileSync(join(ROOT, 'ids.json'), JSON.stringify(out, null, 2) + '\n');
  console.log(`ids.json written — ${out.count} ids across ${Object.keys(out.drawers).length} drawers.`);
}
