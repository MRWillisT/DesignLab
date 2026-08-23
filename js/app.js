'use strict';

/* ============================================================
   DESIGN LAB — app logic
   Renders the registry onto cards; owns filters, favorites,
   copying, and personal tweaking. Data lives in
   js/data.js; saved variants live in localStorage only.
   ============================================================ */

const LIB = window.DESIGN_LAB;
const AGENT_PROMPT = window.AGENT_PROMPT;

const LS_FAVORITES = 'designlab.favorites.v1';
const LS_FILTERS = 'designlab.filters.v1';
const LS_VARIANTS = 'designlab.variants.v1';
const LS_IMPORTS = 'designlab.imports.v1';
const LS_CANVAS = 'designlab.canvas.v1';
const LS_DENSITY = 'designlab.density.v1';
const LS_SEEN = 'designlab.seen.v1';
const ME_ID = 'me';
const STAGE_MIN_H = 80;
const STAGE_MAX_H = 420;

const DENSITY_TIERS = [
  { label: 'XXS', cols: 9, min: '140px' },
  { label: 'XS',  cols: 7, min: '175px' },
  { label: 'Sm',  cols: 5, min: '220px' },
  { label: 'Med', cols: 4, min: '270px' },
  { label: 'Lg',  cols: 3, min: '340px' }
];

/* Preset swatches for the prompt studio's credit-chip color picker.
   COLORS ALREADY HELD by a registered creator are filtered out at runtime
   (see populateColorPills), then the list is topped up with fresh
   candidates so new agents never pick an already-taken chip color. */
const COLOR_PRESETS = [
  { hex: '#818cf8', label: 'Indigo' },
  { hex: '#f97316', label: 'Coral / Orange' },
  { hex: '#10a37f', label: 'Emerald' },
  { hex: '#38bdf8', label: 'Sky Blue' },
  { hex: '#ec4899', label: 'Pink / Rose' },
  { hex: '#a855f7', label: 'Purple' },
  { hex: '#eab308', label: 'Amber' },
  { hex: '#22d3ee', label: 'Cyan' }
];
const COLOR_FRESH = [
  { hex: '#ef4444', label: 'Bright Red' },
  { hex: '#f59e0b', label: 'Honey' },
  { hex: '#84cc16', label: 'Lime' },
  { hex: '#22c55e', label: 'Leaf Green' },
  { hex: '#06b6d4', label: 'Cyan' },
  { hex: '#0ea5e9', label: 'Sky' },
  { hex: '#6366f1', label: 'Indigo' },
  { hex: '#8b5cf6', label: 'Violet' },
  { hex: '#d946ef', label: 'Fuchsia' },
  { hex: '#f43f5e', label: 'Rose' },
  { hex: '#fb7185', label: 'Salmon' },
  { hex: '#34d399', label: 'Mint' },
  { hex: '#c084fc', label: 'Lilac' },
  { hex: '#4ade80', label: 'Grass' },
  { hex: '#fb923c', label: 'Tangerine' },
  { hex: '#67e8f9', label: 'Ice Blue' },
  { hex: '#d4d4d8', label: 'Silver' }
];

const state = {
  query: '',
  section: 'all',
  creator: null,
  favoritesOnly: false,
  newOnly: false,
  canvas: 'dark',
  densityIndex: 3,
  sort: 'newest'
};

let favorites = new Set();
let savedVariants = [];
let importedItems = [];
let newItemIds = new Set();
const wavedIds = new Set(); // new items that already played the arrival wave this session
const draftVars = new Map();
const openTrays = new Set();
let toastTimer = null;

/* ---------- tiny helpers ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function sectionOf(id) {
  return LIB.sections.find(s => s.id === id) || null;
}

function creatorOf(id) {
  return LIB.creators.find(c => c.id === id)
    || (window.DesignLabLive && DesignLabLive.creatorOf(id))
    || null;
}

/* A live submission claiming one of the immutable registry creators — that
   is the impersonation surface. Returns the registry creator or null. */
function registeredCreatorOf(id) {
  if (!id) return null;
  return LIB.creators.find(c => c.id === id && c.id !== ME_ID) || null;
}

function drawerNumber(id) {
  const idx = LIB.sections.findIndex(s => s.id === id);
  return idx === -1 ? '??' : String(idx + 1).padStart(2, '0');
}

/* ---------- persistence ---------- */

function loadFavorites() {
  try {
    const raw = localStorage.getItem(LS_FAVORITES);
    if (raw) favorites = new Set(JSON.parse(raw));
  } catch (e) { /* fresh start */ }
}

function saveFavorites() {
  try { localStorage.setItem(LS_FAVORITES, JSON.stringify([...favorites])); } catch (e) { /* ignore */ }
}

function loadVariants() {
  try {
    const raw = localStorage.getItem(LS_VARIANTS);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      savedVariants = arr.filter(v => v && v.id && typeof v.code === 'string' && v.variantOf);
    }
  } catch (e) { /* fresh start */ }
}

function saveVariants() {
  try { localStorage.setItem(LS_VARIANTS, JSON.stringify(savedVariants)); } catch (e) { /* ignore */ }
}

function loadImports() {
  try {
    const raw = localStorage.getItem(LS_IMPORTS);
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) {
      importedItems = arr.filter(v => v && v.id && typeof v.code === 'string');
    }
  } catch (e) { /* fresh start */ }
}

function saveImports() {
  try { localStorage.setItem(LS_IMPORTS, JSON.stringify(importedItems)); } catch (e) { /* ignore */ }
}

function loadSeen() {
  try {
    const raw = localStorage.getItem(LS_SEEN);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch (e) { return new Set(); }
}

function saveSeen(ids) {
  try { localStorage.setItem(LS_SEEN, JSON.stringify(ids)); } catch (e) { /* ignore */ }
}

function loadFilters() {
  try {
    const raw = localStorage.getItem(LS_FILTERS);
    if (raw) {
      const saved = JSON.parse(raw);
      if (typeof saved.query === 'string') state.query = saved.query;
      if (saved.section && sectionOf(saved.section)) state.section = saved.section;
      else state.section = 'all';
      if (!saved.creator || creatorOf(saved.creator)) state.creator = saved.creator || null;
      state.favoritesOnly = !!saved.favoritesOnly;
      if (saved.sort === 'creator') state.sort = 'creator';
      else if (saved.sort === 'top') state.sort = 'top';
      else state.sort = 'newest';
    }
    const c = localStorage.getItem(LS_CANVAS);
    if (['dark', 'light', 'neutral'].includes(c)) state.canvas = c;
    const d = localStorage.getItem(LS_DENSITY);
    if (d !== null && !isNaN(parseInt(d, 10))) {
      const idx = parseInt(d, 10);
      if (idx >= 0 && idx < DENSITY_TIERS.length) state.densityIndex = idx;
    }
  } catch (e) { /* fresh start */ }
}

function saveFilters() {
  try {
    localStorage.setItem(LS_FILTERS, JSON.stringify({
      query: state.query,
      section: state.section,
      creator: state.creator,
      favoritesOnly: state.favoritesOnly,
      sort: state.sort
    }));
    localStorage.setItem(LS_CANVAS, state.canvas);
    localStorage.setItem(LS_DENSITY, String(state.densityIndex));
  } catch (e) { /* ignore */ }
}

/* ---------- integrity guard (helps future agents) ---------- */

function validateLibrary() {
  const seen = new Set();
  LIB.items.forEach(item => {
    if (!sectionOf(item.section)) console.warn(`[Design Lab] Item "${item.id}" references unknown section "${item.section}".`);
    if (!creatorOf(item.creator)) console.warn(`[Design Lab] Item "${item.id}" references unknown creator "${item.creator}".`);
    if (seen.has(item.id)) console.warn(`[Design Lab] Duplicate item id "${item.id}".`);
    if (item.id) seen.add(item.id);
    (item.tweaks || []).forEach(t => {
      if (typeof item.code === 'string' && item.code.indexOf('var(' + t.varName) === -1) {
        console.warn(`[Design Lab] Item "${item.id}" declares tweak ${t.varName} but its code never uses var(${t.varName}, …).`);
      }
    });
  });
  savedVariants.forEach(v => {
    if (seen.has(v.id)) console.warn(`[Design Lab] Saved variant "${v.id}" collides with a library id.`);
    seen.add(v.id);
  });
  importedItems.forEach(v => {
    if (seen.has(v.id)) console.warn(`[Design Lab] Imported item "${v.id}" collides with an existing id.`);
    seen.add(v.id);
  });
}

/* ---------- clipboard + toast ---------- */

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (err2) {
      return false;
    }
  }
}

function flashButton(btn, label) {
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = label;
  btn.classList.add('is-copied');
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('is-copied');
    btn.disabled = false;
  }, 1300);
}

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
}

async function copyItemCode(item, btn) {
  const changed = changedVars(item);
  const ok = await copyText(composeCode(item, currentValues(item)));
  if (ok) {
    flashButton(btn, 'Copied ✓');
    toast(Object.keys(changed).length
      ? `Copied your tweaked #${item.id} — the shared original stays untouched.`
      : `Copied #${item.id} — clean code only. Add your own words around it.`);
  } else {
    toast('Copy blocked by the browser — select and copy manually.');
  }
}

const LS_PROMPT_AGENT = 'designlab.prompt_agent.v1';
const LS_PROMPT_DRAWER = 'designlab.prompt_drawer.v1';
const LS_CUSTOM_AGENTS = 'designlab.custom_agents.v1';
const LS_PROMPT_HISTORY = 'designlab.prompt_history.v1';

let customAgents = [];
let promptHistory = [];

function loadCustomAgents() {
  try {
    const raw = localStorage.getItem(LS_CUSTOM_AGENTS);
    if (raw) customAgents = JSON.parse(raw);
  } catch (e) { customAgents = []; }
}

function loadPromptHistory() {
  try {
    const raw = localStorage.getItem(LS_PROMPT_HISTORY);
    if (raw) promptHistory = JSON.parse(raw);
  } catch (e) { promptHistory = []; }
  if (!Array.isArray(promptHistory)) promptHistory = [];
}

/* Remember dispatched identities (most recent first) for the header switcher. */
function recordPromptHistory(entry) {
  if (!entry || !entry.id) return;
  promptHistory = promptHistory.filter(h => h.id !== entry.id);
  promptHistory.unshift(entry);
  promptHistory = promptHistory.slice(0, 10);
  try { localStorage.setItem(LS_PROMPT_HISTORY, JSON.stringify(promptHistory)); } catch (e) { /* ignore */ }
  populateAgentSwitch();
}

/* ---------- header identity switcher (custom dropdown) ---------- */

function agentSwitchToggle(force) {
  const box = $('#agentSwitch');
  const btn = $('#agentSwitchBtn');
  const menu = $('#agentSwitchMenu');
  if (!box || !btn || !menu) return;
  const open = force !== undefined ? force : menu.hidden;
  menu.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
  if (open) {
    $('#agentSwitchInput').value = '';
    $('#agentSwitchInput').focus();
  }
}

function agentSwitchItem(id, name, color, tag) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'agent-switch-item';
  b.dataset.id = id;
  const dot = document.createElement('span');
  dot.className = 'sw-dot';
  dot.style.background = color || '#94a3b8';
  const txt = document.createElement('span');
  txt.textContent = name;
  b.appendChild(dot);
  b.appendChild(txt);
  if (tag) {
    const t = document.createElement('span');
    t.className = 'sw-tag';
    t.textContent = tag;
    b.appendChild(t);
  }
  return b;
}

/* Full roster in the header dropdown: recent identities first, then every
   available agent (registered + custom + known choices), then a custom
   text box that dispatches the typed name on Enter. */
function populateAgentSwitch() {
  const box = $('#agentSwitch');
  const recentWrap = $('#agentSwitchRecent');
  const listWrap = $('#agentSwitchList');
  if (!box || !recentWrap || !listWrap) return;

  recentWrap.innerHTML = '';
  if (promptHistory.length) {
    const head = document.createElement('div');
    head.className = 'agent-switch-head';
    head.textContent = 'Recent';
    recentWrap.appendChild(head);
    promptHistory.forEach(h => {
      recentWrap.appendChild(agentSwitchItem(h.id, h.name, h.color, h.id.startsWith('known:') ? 'known' : ''));
    });
  }

  listWrap.innerHTML = '';
  const seen = new Set(promptHistory.map(h => h.id));
  allAvailableAgents().forEach(c => {
    if (seen.has(c.id)) return;
    const reg = LIB.creators.some(r => r.id === c.id);
    listWrap.appendChild(agentSwitchItem(c.id, c.name, c.color, reg ? 'registered' : ''));
  });
  // Known agent choices not yet registered / not in history — cheap pick.
  const taken = new Set(allAvailableAgents().map(c => c.id));
  KNOWN_AGENT_CHOICES.forEach(n => {
    const id = 'known:' + n;
    if (seen.has(id) || taken.has(id)) return;
    listWrap.appendChild(agentSwitchItem(id, n, '#94a3b8'));
  });

  box.hidden = promptHistory.length === 0 && allAvailableAgents().length === 0 && KNOWN_AGENT_CHOICES.length === 0;
  agentSwitchToggle(false);
}

/* Turn the typed custom name into a saved identity and dispatch as it. */
function dispatchCustomSwitchAgent() {
  const input = $('#agentSwitchInput');
  const raw = (input.value || '').trim();
  if (!raw) { agentSwitchToggle(false); return; }
  const v = validateAgentName(raw);
  if (!v.ok) {
    toast('Pick a clean agent name — letters, numbers, spaces, hyphens only.');
    return;
  }
  loadCustomAgents();
  const id = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'agent';
  let color = '#818cf8';
  const existing = customAgents.find(a => a.id === id);
  if (existing) {
    color = existing.color;
  } else {
    color = QUICK_PALETTE[Math.floor(Math.random() * QUICK_PALETTE.length)];
    customAgents.push({ id, name: v.name, color });
    saveCustomAgents();
  }
  agentSwitchToggle(false);
  quickDispatch({ id, name: v.name, color });
}

/* Curated known-agent checklist: well-known model families a visitor can pick
   instead of typing a free-form name. Keeps identity claims honest and blocks
   the obvious "type anything" abuse path. */
const KNOWN_AGENT_CHOICES = [
  'Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Grok', 'Llama', 'Mistral',
  'Qwen', 'Kimi', 'GLM', 'Phi', 'GPT-OSS', 'Mimo', 'Opus', 'Sonnet',
  'Nemotron', 'Command R', 'Aya', 'Falcon', 'Zephyr', 'Yi'
];

/* Profanity + abuse blocklist for custom agent names. Lowercased, substring
   matched against the whole name so "deepseek" stays fine but slurs don't. */
const NAME_BLOCKLIST = [
  'fuck', 'shit', 'bitch', 'ass', 'cunt', 'dick', 'porn', 'sex', 'nazi',
  'hitler', 'rape', 'slave', 'whore', 'nigg', 'fag', 'retard', 'kkk', '666'
];

function validateAgentName(raw) {
  const name = String(raw || '').trim();
  if (!name) return { ok: false, reason: 'empty' };
  if (name.length < 2) return { ok: false, reason: 'short' };
  if (name.length > 32) return { ok: false, reason: 'long' };
  if (!/^[a-zA-Z0-9 .+\-'#]+$/.test(name)) return { ok: false, reason: 'chars' };
  const lower = name.toLowerCase();
  for (const bad of NAME_BLOCKLIST) {
    if (lower.includes(bad)) return { ok: false, reason: 'blocked' };
  }
  // No impersonation of existing creators under a different casing.
  const existing = LIB.creators.some(c => c.id !== ME_ID && c.name.toLowerCase() === lower);
  if (existing) return { ok: false, reason: 'taken' };
  return { ok: true, name };
}

/* Soft warning: a custom name that is only a punctuation/casing variant of a
   registered creator (e.g. "mimo" vs registered "mimo-2-5" / "Mimo 2.5")
   will quietly split that agent's leaderboard row. Warn, don't block.
   Matcher: strip separators and compare leading tokens, so "mimo" matches
   "mimo 2.5" / "mimo-2-5" but not "mimosa". */
function nearRegisteredName(name) {
  const firstTok = s => {
    const t = String(s || '').toLowerCase().replace(/[-_.\s]+/g, ' ').trim().split(' ')[0] || '';
    return t.replace(/[^a-z0-9]/g, '');
  };
  const n = firstTok(name);
  if (!n) return null;
  for (const c of LIB.creators) {
    if (c.id === ME_ID) continue;
    const cn = firstTok(c.name) || firstTok(c.id);
    if (cn && cn !== n && (cn === n || cn.startsWith(n) || n.startsWith(cn))) return c;
  }
  return null;
}

function saveCustomAgents() {
  try {
    localStorage.setItem(LS_CUSTOM_AGENTS, JSON.stringify(customAgents));
  } catch (e) {}
}

function allAvailableAgents() {
  const base = LIB.creators.filter(c => c.id !== ME_ID);
  const seen = new Set(base.map(c => c.id));
  const extras = customAgents.filter(c => !seen.has(c.id));
  return base.concat(extras);
}

function populateAgentDropdown(selectedId) {
  const sel = $('#agentSelect');
  sel.innerHTML = '';
  allAvailableAgents().forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    // Dot in the agent's chip color so identity + color are visible together.
    opt.textContent = (c.color ? '● ' : '') + c.name;
    opt.dataset.name = c.name;
    if (c.color) {
      opt.style.color = c.color;
      opt.setAttribute('data-color', c.color);
    }
    sel.appendChild(opt);
  });
  // Curated known agents (not yet registered) — pick a base identity
  // instead of free-typing, which keeps the roster honest.
  const takenNames = new Set(Array.from(sel.options).map(o => o.dataset.name || o.textContent.trim()));
  KNOWN_AGENT_CHOICES.forEach(name => {
    if (takenNames.has(name)) return;
    const opt = document.createElement('option');
    opt.value = 'known:' + name;
    opt.textContent = name;
    opt.dataset.name = name;
    opt.dataset.known = '1';
    sel.appendChild(opt);
  });

  const customOpt = document.createElement('option');
  customOpt.value = '_custom';
  customOpt.textContent = '+ Custom / New Agent…';
  sel.appendChild(customOpt);

  if (selectedId && ($(`option[value="${selectedId}"]`, sel) || selectedId === '_custom')) {
    sel.value = selectedId;
  }
}

/* "Enter your agent" — opens the studio in custom-agent mode with the
   submission-issue button visible, so outsiders register their own chip
   and generate a pre-filled GitHub issue in one flow. */
function enterAgentFlow() {
  openPromptStudio();
  $('#agentSelect').value = '_custom';
  $('#customAgentName').value = '';
  $('#promptSubmitBtn').hidden = false;
  $('#submitPanel').hidden = false;
  $('#promptFootHint').textContent = 'Enter your agent\u2019s name, pick a chip color, copy the prompt — then paste the JSON and publish live.';
  updatePromptStudio({ isAgentSwitch: true, focusCustom: true });
  const toggle = $('#submitPanelToggle');
  if (toggle && toggle.getAttribute('aria-expanded') !== 'true') toggleSubmitPanel();
}

function jumpToPublishPanel() {
  $('#submitPanel').hidden = false;
  const toggle = $('#submitPanelToggle');
  if (toggle.getAttribute('aria-expanded') !== 'true') toggleSubmitPanel();
  const box = $('#submitItemsInput');
  if (box) box.focus();
  toast('Paste the JSON your agent returned, then Publish live.');
}

function openSubmissionIssue() {
  const sel = $('#agentSelect');
  let name = sel.value === '_custom' ? $('#customAgentName').value.trim() : (sel.selectedOptions[0] || {}).dataset.name || (sel.selectedOptions[0] || {}).textContent || 'Agent';
  if (!name) name = 'My Agent';
  const color = $('#agentColorPicker').value || '#818cf8';
  const prompt = $('#promptPreviewText').value;

  const title = `Agent entry: ${name}`;
  const body = [
    `**Agent**: ${name}`,
    `**Chip color**: ${color}`,
    '',
    '---',
    '**Prompt used** (paste this into your agent):',
    '```',
    prompt,
    '```',
    '',
    '**What I added** (paste your agent\u2019s finished list here):',
    '- ',
    '',
    'Read CONTRIBUTING.md for the submission rules — the CI gate validates every PR.',
    'My fork branch is ready at: <paste your PR link here>'
  ].join('\n');

  const url = 'https://github.com/MRWillisT/DesignLab/issues/new?title='
    + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
  window.open(url, '_blank', 'noopener');
  toast('Submission issue opened — fill in your additions and hit submit.');
}

/* ---------- submit panel: paste validated items → GitHub issue ---------- */

let validatedItems = null;

/* One-shot entrance on the very first render — cards "march in" once,
   then stay still so filters/sorts/votes never replay it. */
let didFirstRender = false;
function entranceClass() {
  if (didFirstRender) return '';
  didFirstRender = true;
  return ' is-entering';
}

function toggleSubmitPanel() {
  const body = $('#submitPanelBody');
  const toggle = $('#submitPanelToggle');
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  body.hidden = expanded;
  const icon = toggle.querySelector('.submit-panel-icon');
  if (icon) icon.textContent = expanded ? '▸' : '▾';
}

function validateSubmitItems() {
  const raw = $('#submitItemsInput').value.trim();
  const status = $('#submitItemsStatus');
  const submitBtn = $('#submitIssueBtn');

  if (!raw) {
    status.hidden = false;
    status.className = 'submit-items-status submit-items-status--err';
    status.textContent = 'Paste your items first.';
    submitBtn.disabled = true;
    const liveBtn0 = $('#submitLiveBtn');
    if (liveBtn0) liveBtn0.disabled = true;
    validatedItems = null;
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    status.hidden = false;
    status.className = 'submit-items-status submit-items-status--err';
    status.textContent = 'Invalid JSON — ' + e.message;
    submitBtn.disabled = true;
    const liveBtnErr = $('#submitLiveBtn');
    if (liveBtnErr) liveBtnErr.disabled = true;
    validatedItems = null;
    return;
  }

  const items = Array.isArray(parsed) ? parsed : [parsed];
  const errors = [];
  const knownSections = new Set(LIB.sections.map(s => s.id));
  const seenIds = new Set();

  items.forEach((item, i) => {
    const tag = item.id || '(item ' + (i + 1) + ')';
    if (!item.id) errors.push(tag + ': missing id');
    else if (seenIds.has(item.id)) errors.push(tag + ': duplicate id in batch');
    else seenIds.add(item.id);
    if (!item.section) errors.push(tag + ': missing section');
    else if (!knownSections.has(item.section)) errors.push(tag + ': unknown section "' + item.section + '"');
    if (!item.name) errors.push(tag + ': missing name');
    if (!item.creator) errors.push(tag + ': missing creator');
    else if (item.creator === 'me') errors.push(tag + ': creator "me" is reserved');
    if (!item.code || typeof item.code !== 'string') errors.push(tag + ': missing or invalid code');
    else if (item.code.length < 20) errors.push(tag + ': code must be at least 20 characters');
  });

  if (items.length > 8) errors.push('Publish at most 8 specimens at a time.');

  if (errors.length) {
    status.hidden = false;
    status.className = 'submit-items-status submit-items-status--err';
    status.innerHTML = errors.map(e => '⚠ ' + escapeHtml(e)).join('<br>');
    submitBtn.disabled = true;
    const liveBtnBad = $('#submitLiveBtn');
    if (liveBtnBad) liveBtnBad.disabled = true;
    validatedItems = null;
    return;
  }

  status.hidden = false;
  status.className = 'submit-items-status submit-items-status--ok';
  status.textContent = '✓ Valid — ' + items.length + ' item' + (items.length === 1 ? '' : 's') + ' ready to publish live.';
  submitBtn.disabled = false;
  const liveBtn = $('#submitLiveBtn');
  if (liveBtn) liveBtn.disabled = false;
  validatedItems = items;
}

function renderItemsPreview() {
  const raw = $('#submitItemsInput').value.trim();
  const preview = $('#submitItemsPreview');
  if (!raw) { preview.hidden = true; preview.innerHTML = ''; return; }

  let parsed;
  try { parsed = JSON.parse(raw); } catch (_) { preview.hidden = true; preview.innerHTML = ''; return; }

  const items = Array.isArray(parsed) ? parsed : [parsed];
  if (!items.length) { preview.hidden = true; preview.innerHTML = ''; return; }

  const sectionMap = {};
  LIB.sections.forEach(s => { sectionMap[s.id] = s; });

  preview.hidden = false;
  preview.innerHTML = items.map(item => {
    const sec = sectionMap[item.section];
    const secName = sec ? sec.name : (item.section || '?');
    const secCode = sec ? sec.code : (item.section || '').slice(0, 2).toUpperCase();
    const hasCode = !!(item.code && typeof item.code === 'string' && item.code.length > 20);
    const tweakCount = Array.isArray(item.tweaks) ? item.tweaks.length : 0;
    return '<div class="submit-preview-card">'
      + '<span class="submit-preview-id">' + escapeHtml(item.id || '?') + '</span>'
      + '<span class="submit-preview-name">' + escapeHtml(item.name || '(unnamed)') + '</span>'
      + '<span class="submit-preview-section">' + escapeHtml(secName) + '</span>'
      + '<span class="submit-preview-meta">'
      + (hasCode ? '<span class="submit-preview-check" title="Has code">✓ code</span>' : '<span class="submit-preview-warn" title="Missing code">✗ no code</span>')
      + (tweakCount ? '<span class="submit-preview-check" title="' + tweakCount + ' tweak(s)">' + tweakCount + ' tweak' + (tweakCount > 1 ? 's' : '') + '</span>' : '')
      + '</span>'
      + '</div>';
  }).join('');
}

function toggleSubmitGuide() {
  const tip = $('#submitGuideTip');
  tip.hidden = !tip.hidden;
}

function submitItemsAsIssue() {
  if (!validatedItems) return;

  const sel = $('#agentSelect');
  let name = sel.value === '_custom' ? $('#customAgentName').value.trim() : (sel.selectedOptions[0] || {}).dataset.name || (sel.selectedOptions[0] || {}).textContent || 'Agent';
  if (!name) name = 'My Agent';
  const color = $('#agentColorPicker').value || '#818cf8';
  const prompt = $('#promptPreviewText').value;

  const itemList = validatedItems.map(item => {
    return '- **' + item.id + '** (' + item.section + '): ' + (item.name || '(unnamed)');
  }).join('\n');

  const body = [
    '**Agent**: ' + name,
    '**Chip color**: ' + color,
    '**Items**: ' + validatedItems.length,
    '',
    '---',
    '',
    '### Items submitted',
    itemList,
    '',
    '### Specimen code',
    '```json',
    JSON.stringify(validatedItems, null, 2),
    '```',
    '',
    '### Prompt used',
    '```',
    prompt,
    '```',
    '',
    'Read CONTRIBUTING.md for the submission rules — the CI gate validates every PR.',
    'My fork branch is ready at: <paste your PR link here>'
  ].join('\n');

  const title = 'Agent entry: ' + name + ' (' + validatedItems.map(i => i.id).join(', ') + ')';
  const url = 'https://github.com/MRWillisT/DesignLab/issues/new?title='
    + encodeURIComponent(title) + '&body=' + encodeURIComponent(body);
  window.open(url, '_blank', 'noopener');
  toast('GitHub issue opened — optional path. Publish live is faster and needs no review.');
}

async function publishItemsLive() {
  if (!validatedItems || !validatedItems.length) {
    toast('Validate your JSON first.');
    return;
  }
  if (!window.DesignLabLive) {
    toast('Live ingest is not loaded.');
    return;
  }

  const sel = $('#agentSelect');
  let name = sel.value === '_custom' ? $('#customAgentName').value.trim() : (sel.selectedOptions[0] || {}).dataset.name || (sel.selectedOptions[0] || {}).textContent || 'Agent';
  if (!name) name = 'Agent';
  const color = $('#agentColorPicker').value || '#818cf8';
  let creatorId = '';
  if (sel.value === '_custom') {
    creatorId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'agent';
  } else if (sel.value && sel.value.startsWith('known:')) {
    creatorId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'agent';
  } else {
    creatorId = sel.value || validatedItems[0].creator;
  }

  // Identity protection: claiming a registered creator id needs the human at
  // the panel to confirm — the paste-and-publish flow is the proof step.
  const claimedRegs = new Set([creatorId].concat(validatedItems.map(i => i.creator).filter(Boolean))
    .map(id => registeredCreatorOf(id)).filter(Boolean));
  if (claimedRegs.size) {
    const names = [...claimedRegs].map(r => r.name).join(', ');
    if (!window.confirm('You are publishing as the registered identity \u201C' + names + '\u201D. If you are not the real ' + names + ' agent, pick a unique identity instead. Continue?')) {
      return;
    }
  }

  const status = $('#submitItemsStatus');
  const liveBtn = $('#submitLiveBtn');
  if (liveBtn) liveBtn.disabled = true;
  status.hidden = false;
  status.className = 'submit-items-status';
  status.textContent = 'Publishing…';

  const sectionCode = {};
  LIB.sections.forEach(s => { sectionCode[s.id] = s.code; });
  const taken = new Set(allItems().map(i => i.id));

  const result = await DesignLabLive.publish(validatedItems, {
    creatorId: creatorId,
    creatorName: name,
    creatorColor: color,
    takenIds: taken,
    sectionCode: sectionCode
  });

  if (!result.ok) {
    if (result.error === 'missing-table') {
      status.className = 'submit-items-status submit-items-status--err';
      status.innerHTML = 'Live ingest is not enabled yet. Owner: run <code>supabase/live.sql</code> once in the Supabase SQL editor. GitHub issue still works as a fallback.';
      if (liveBtn) liveBtn.disabled = false;
      return;
    }
    status.className = 'submit-items-status submit-items-status--err';
    status.textContent = 'Publish failed — ' + (result.error || 'unknown error');
    if (liveBtn) liveBtn.disabled = false;
    return;
  }

  status.className = 'submit-items-status submit-items-status--ok';
  status.textContent = 'Live — ' + result.added.map(id => '#' + id).join(', ') + ' now in the library.';
  stampLiveNew();
  render();
  closePromptStudio();
  toast('Published ' + result.added.length + ' live specimen' + (result.added.length === 1 ? '' : 's') + '.');
}

function openPromptStudio() {
  loadCustomAgents();
  const dSel = $('#targetDrawerSelect');

  let savedAgent = 'gemini';
  try {
    const lastAg = localStorage.getItem(LS_PROMPT_AGENT);
    if (lastAg) savedAgent = lastAg;
  } catch (e) {}

  populateAgentDropdown(savedAgent);

  // Populate drawers
  dSel.innerHTML = '<option value="all">Any Drawer (General Expansion)</option>';
  LIB.sections.forEach(sec => {
    const opt = document.createElement('option');
    opt.value = sec.id;
    const nextId = nextIdFor(sec.id);
    opt.textContent = `Drawer ${drawerNumber(sec.id)} — ${sec.name} (Next ID: #${nextId})`;
    dSel.appendChild(opt);
  });

  try {
    const lastDr = localStorage.getItem(LS_PROMPT_DRAWER);
    if (lastDr && $(`option[value="${lastDr}"]`, dSel)) dSel.value = lastDr;
  } catch (e) {}

  updatePromptStudio();
  $('#promptOverlay').hidden = false;
}

function closePromptStudio() {
  $('#promptOverlay').hidden = true;
}

function updatePromptStudio(opts = {}) {
  const { isAgentSwitch = false, focusCustom = false } = opts;
  const sel = $('#agentSelect');
  const dSel = $('#targetDrawerSelect');
  const isCustom = sel.value === '_custom';
  $('#customNameField').hidden = !isCustom;

  if (isCustom && focusCustom) {
    setTimeout(() => $('#customAgentName').focus(), 50);
  }

  let agentName = '';
  let agentId = '';

  if (isCustom) {
    const v = validateAgentName($('#customAgentName').value);
    agentName = v.ok ? v.name : 'Custom Agent';
    agentId = agentName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
  } else if (sel.value && sel.value.startsWith('known:')) {
    agentName = sel.value.slice(6);
    agentId = agentName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
    // Known agents have no registered chip color; leave the picker as the
    // human chose it so the color they picked is what ships.
  } else {
    const agent = allAvailableAgents().find(c => c.id === sel.value) || { name: 'Gemini', color: '#818cf8', id: 'gemini' };
    agentName = agent.name;
    agentId = agent.id;
    // Always sync the chip-color picker to the selected identity's color —
    // registered creators (registry chip) and custom agents (their saved
    // chip) alike — so what the prompt says matches the chip the card gets.
    if (isAgentSwitch && agent.color) {
      $('#agentColorPicker').value = agent.color;
    }
  }

  const agentColor = $('#agentColorPicker').value || '#818cf8';
  $('#agentColorHex').textContent = agentColor;

  const targetDrawer = dSel.value;
  let taskText = `TASK:\nReview the ${LIB.sections.length} drawers in the library and add new, visually distinct specimens to whichever drawers you feel have gaps — finished work people would copy and use.`;
  let badgeText = 'All Drawers (Open Choice)';

  if (targetDrawer !== 'all') {
    const sec = sectionOf(targetDrawer);
    if (sec) {
      const nextId = nextIdFor(sec.id);
      badgeText = `${sec.name} · Next: #${nextId}`;
      taskText = `TARGET DRAWER:\nDrawer ${drawerNumber(sec.id)} — ${sec.name} (Drawer code: "${sec.code}")\n`
        + `Brief: "${sec.brief}"\n`
        + `Next free specimen ID to start with: #${nextId}\n\n`
        + `TASK:\nExpand this specific drawer with 2–4 visually distinct specimens — familiar patterns are fine if they look like their own card on the grid.`;
    }
  }

  $('#promptTargetBadge').textContent = badgeText;

  let prompt = AGENT_PROMPT
    .replace(/You are \[AGENT NAME\]\. Everything you add to DESIGN LAB appears under a \[COLOR\] credit chip\./g,
      `You are ${agentName}. Everything you add to DESIGN LAB appears under a ${agentColor} credit chip (creator id: "${agentId}").`)
    .replace(/FILL-IN SLOTS[\s\S]*?Expand the section \(drawer\) of the library that I specify with new specimens\./g, taskText);

  prompt = prompt
    .replace(/\[AGENT NAME\]/g, agentName)
    .replace(/\[COLOR\]/g, agentColor);

  $('#promptPreviewText').value = prompt.trim();
}

async function copyPromptStudio(btn, successMsg) {
  const sel = $('#agentSelect');
  const dSel = $('#targetDrawerSelect');
  const text = $('#promptPreviewText').value;

  let chosenId = sel.value;

  if (sel.value === '_custom') {
    const name = $('#customAgentName').value.trim();
    const color = $('#agentColorPicker').value;
    const v = validateAgentName(name);
    if (!v.ok) {
      toast('Pick a clean agent name — letters, numbers, spaces, hyphens only, and no profanity.');
      return;
    }
    const id = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
    chosenId = id;
    const existingIdx = customAgents.findIndex(a => a.id === id);
    if (existingIdx >= 0) {
      customAgents[existingIdx].color = color;
      customAgents[existingIdx].name = v.name;
    } else {
      customAgents.push({ id, name: v.name, color });
    }
    saveCustomAgents();
    populateAgentDropdown(id);
  }

  if (sel.value && sel.value.startsWith('known:')) {
    chosenId = sel.value.slice(6).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  try {
    localStorage.setItem(LS_PROMPT_AGENT, chosenId);
    localStorage.setItem(LS_PROMPT_DRAWER, dSel.value);
  } catch (e) {}

  // Remember this identity as "recent" for the header switcher.
  let histName = chosenId, histColor = '#818cf8';
  if (sel.value === '_custom') {
    const cv = validateAgentName($('#customAgentName').value);
    histName = cv.ok ? cv.name : ($('#customAgentName').value.trim() || chosenId);
    histColor = $('#agentColorPicker').value || '#818cf8';
  } else if (sel.value && sel.value.startsWith('known:')) {
    histName = sel.value.slice(6);
    histColor = '#818cf8';
  } else {
    const ag = allAvailableAgents().find(a => a.id === chosenId);
    if (ag) { histName = ag.name; histColor = ag.color; }
  }
  recordPromptHistory({ id: (sel.value && sel.value.startsWith('known:')) ? sel.value : chosenId, name: histName, color: histColor });

  const ok = await copyText(text);
  if (ok) {
    if (btn) flashButton(btn, 'Copied ✓');
    toast(successMsg || 'Customized agent prompt copied — ready to paste!');
    closePromptStudio();
  } else {
    toast('Copy blocked by browser — select and copy manually.');
  }
}

/* ---------- one-tap quick dispatch ---------- */

const QUICK_CODENAMES = ['Drift', 'Ember', 'Volt', 'Echo', 'Frost', 'Rift', 'Halo', 'Vega', 'Iris', 'Flux', 'Onyx', 'Pulse', 'Nimbus', 'Cinder', 'Sol', 'Zenith', 'Quill', 'Pixel'];
const QUICK_PALETTE = ['#22d3ee', '#f472b6', '#a3e635', '#fb923c', '#c084fc', '#34d399', '#facc15', '#60a5fa', '#f87171', '#2dd4bf'];

/* Reuse the last-used identity when we can, so an agent keeps its chip and
   leaderboard row across dispatches; mint a fresh stable one otherwise. */
function quickDispatchIdentity() {
  loadCustomAgents();
  let lastId = '';
  try { lastId = localStorage.getItem(LS_PROMPT_AGENT) || ''; } catch (e) { /* ignore */ }
  if (lastId) {
    const custom = customAgents.find(c => c.id === lastId);
    if (custom) return custom;
    const reg = LIB.creators.find(c => c.id === lastId && c.id !== ME_ID);
    if (reg) return reg;
    const known = KNOWN_AGENT_CHOICES.find(n => n.toLowerCase().replace(/[^a-z0-9]+/g, '-') === lastId);
    if (known) return { id: 'known:' + known, name: known, color: '#818cf8' };
  }
  const taken = new Set([...LIB.creators.map(c => c.id), ...customAgents.map(c => c.id)]);
  let name = '', id = '', color = QUICK_PALETTE[Math.floor(Math.random() * QUICK_PALETTE.length)];
  for (let i = 0; i < 40; i++) {
    const base = QUICK_CODENAMES[Math.floor(Math.random() * QUICK_CODENAMES.length)];
    const num = Math.floor(Math.random() * 90) + 10;
    id = (base + '-' + num).toLowerCase();
    if (!taken.has(id)) { name = base + ' ' + num; break; }
  }
  if (!name) { name = 'Rival ' + Math.floor(Math.random() * 999); id = 'rival-' + name.split(' ')[1]; }
  customAgents.push({ id, name, color });
  saveCustomAgents();
  return { id, name, color };
}

/* Weighted-random drawer: emptier drawers get picked more often so the
   library grows evenly instead of piling into whatever's trending. */
function quickDrawerId() {
  const counts = {};
  LIB.items.forEach(it => { counts[it.section] = (counts[it.section] || 0) + 1; });
  const weights = LIB.sections.map(s => 1 / ((counts[s.id] || 0) + 2));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < LIB.sections.length; i++) {
    r -= weights[i];
    if (r <= 0) return LIB.sections[i].id;
  }
  return LIB.sections[0].id;
}

/* Skip the form entirely: auto identity + weighted-random drawer, build the
   prompt, copy it, close. One tap, ready to paste into any agent. Pass an
   explicit identity (from the header switcher) to dispatch as that agent. */
function quickDispatch(prefIdent) {
  openPromptStudio();
  const ident = (prefIdent && prefIdent.id) ? prefIdent : quickDispatchIdentity();
  const sel = $('#agentSelect');
  if (customAgents.some(c => c.id === ident.id)) {
    sel.value = '_custom';
    $('#customAgentName').value = ident.name;
  } else if (LIB.creators.some(c => c.id === ident.id)) {
    sel.value = ident.id;
  } else {
    sel.value = 'known:' + ident.name;
  }
  $('#agentColorPicker').value = ident.color;
  const drawerId = quickDrawerId();
  $('#targetDrawerSelect').value = drawerId;
  updatePromptStudio({ isAgentSwitch: true });
  const drawerName = sectionOf(drawerId) ? sectionOf(drawerId).name : drawerId;
  copyPromptStudio(null, '⚡ Prompt copied — dispatched as ' + ident.name + ' · ' + drawerName
    + '. When your agent returns JSON, open Customize → Publish live and paste it.');
}

/* ---------- prompt studio: credit chip color pills ---------- */

function populateColorPills() {
  const wrap = $('#colorPresetPills');
  if (!wrap) return;
  const taken = new Set(LIB.creators.map(c => String(c.color || '').trim().toLowerCase().replace(/^#/, '')));
  const pick = [];
  const seen = new Set();
  const add = (c) => {
    const key = c.hex.toLowerCase().replace(/^#/, '');
    if (taken.has(key) || seen.has(key)) return;
    seen.add(key);
    pick.push(c);
  };
  COLOR_PRESETS.forEach(add);
  COLOR_FRESH.forEach(add);
  wrap.innerHTML = '';
  pick.slice(0, 12).forEach(c => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'color-pill-btn';
    btn.dataset.color = c.hex;
    btn.title = `${c.label} (${c.hex})`;
    btn.setAttribute('aria-label', `Pick ${c.label}`);
    btn.style.background = c.hex;
    btn.addEventListener('click', () => {
      $('#agentColorPicker').value = c.hex;
      $('#agentColorHex').textContent = c.hex;
      updatePromptStudio({ isAgentSwitch: false });
    });
    wrap.appendChild(btn);
  });
}

/* ---------- specimen inspect modal ---------- */

let currentInspectItem = null;
let inspectCanvasMode = 'dark';

function mountInspectFrame(item) {
  const stage = $('#inspectStage');
  if (!stage || !item) return null;
  const oldFrame = $('#inspectFrame');
  if (oldFrame) oldFrame.remove();

  const frame = document.createElement('iframe');
  frame.id = 'inspectFrame';
  frame.className = 'inspect-frame';
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.setAttribute('title', escapeHtml(item.name) + ' full preview');

  const hasTweaks = !!(item.tweaks && item.tweaks.length);
  frame.srcdoc = hasTweaks
    ? previewDoc(String(item.code || ''), currentValues(item), inspectCanvasMode)
    : previewDoc(String(item.code || ''), null, inspectCanvasMode);

  stage.appendChild(frame);
  return frame;
}

function openInspectModal(item) {
  if (!item) return;
  currentInspectItem = item;
  const overlay = $('#inspectOverlay');
  if (!overlay) return;

  const cr = creatorOf(item.creator);
  const isFav = favorites.has(item.id);

  $('#inspectId').textContent = '#' + item.id;
  $('#inspectTitle').textContent = item.name;

  const chip = $('#inspectCreatorChip');
  chip.textContent = cr ? cr.name : item.creator;
  chip.style.setProperty('--chip', cr ? cr.color : '#8a8f98');

  $('#inspectDesc').textContent = item.description || '';

  const tagsEl = $('#inspectTags');
  tagsEl.innerHTML = (item.tags || []).map(t => '<span class="inspect-tag-pill">#' + escapeHtml(t) + '</span>').join('');

  const stage = $('#inspectStage');
  stage.style.maxWidth = '100%';
  inspectCanvasMode = 'dark';
  stage.style.setProperty('--stage-bg', '#0d0f13');

  $$('.inspect-vp-btn').forEach(b => b.classList.toggle('is-active', b.dataset.vp === 'full'));
  $$('.inspect-canvas-btn').forEach(b => b.classList.toggle('is-active', b.dataset.canvas === 'dark'));

  // Mount clean fresh iframe
  mountInspectFrame(item);

  const tweaksCol = $('#inspectTweaksCol');
  const tweaksList = $('#inspectTweaksList');
  const hasTweaks = !!(item.tweaks && item.tweaks.length);
  if (hasTweaks) {
    tweaksCol.hidden = false;
    tweaksList.innerHTML = buildTrayRows(item);
    const inputs = $$('input', tweaksList);
    inputs.forEach((input, i) => {
      const t = item.tweaks[i];
      const cur = (draftVars.get(item.id) || {})[t.varName] || t.default;
      input.value = cur;
      const out = input.closest('.tweak-row').querySelector('output');
      if (out) out.textContent = t.type === 'range' ? cur + (t.unit || '') : cur;
      input.addEventListener('input', () => {
        const draft = Object.assign({}, draftVars.get(item.id));
        draft[t.varName] = formatVal(t, input.value);
        draftVars.set(item.id, draft);
        if (out) out.textContent = t.type === 'range' ? input.value + (t.unit || '') : input.value;
        const currentFrame = $('#inspectFrame');
        if (currentFrame) pushVars(currentFrame, currentValues(item));
        const card = document.querySelector('.card[data-id="' + item.id + '"]');
        if (card) {
          const cardFrame = $('.stage-frame', card);
          if (cardFrame) pushVars(cardFrame, currentValues(item));
          refreshTweakUi(card, item);
        }
      });
    });
  } else {
    tweaksCol.hidden = true;
    tweaksList.innerHTML = '';
  }

  const starBtn = $('#inspectStarBtn');
  starBtn.textContent = isFav ? '★ Favorited' : '☆ Favorite';

  overlay.hidden = false;
}

function closeInspectModal() {
  const overlay = $('#inspectOverlay');
  if (overlay) overlay.hidden = true;
  const oldFrame = $('#inspectFrame');
  if (oldFrame) oldFrame.remove();
  currentInspectItem = null;
}

/* ---------- preview stage ---------- */

function canvasBg(canvas) {
  if (canvas === 'light') return { bg: '#f8fafc', color: '#0f172a' };
  if (canvas === 'neutral') return { bg: '#1e232d', color: '#f1f5f9' };
  return { bg: '#0d0f13', color: '#ebe9e2' };
}

function previewDoc(code, vars, canvas = state.canvas) {
  const c = canvasBg(canvas);
  const entries = vars ? Object.entries(vars) : [];
  const overrides = entries.length
    ? '<style>:root{' + entries.map(([k, v]) => k + ':' + v).join(';') + '}</style>'
    : '';
  return '<!doctype html><html><head><meta charset="utf-8"><style>'
    + 'html,body{height:100%;margin:0;overflow:hidden}'
    + 'body{display:flex;align-items:center;justify-content:center;padding:6px 8px;'
    + 'background:' + c.bg + ';color:' + c.color + ';font-family:system-ui,-apple-system,"Segoe UI",sans-serif;'
    + 'overflow:hidden;scrollbar-width:none;}'
    + 'body::-webkit-scrollbar{display:none}'
    + '*{box-sizing:border-box}'
    + '</style></head><body>' + overrides + code
    + '<scr' + 'ipt>'
    + 'addEventListener("message",function(e){var d=e.data;if(!d)return;'
    + 'if(d.type==="dl-vars"){var s=document.documentElement.style,v=d.vars||{};for(var k in v){s.setProperty(k,v[k]);}}'
    + 'if(d.type==="dl-canvas"){var b=document.body;if(d.canvas==="light"){b.style.background="#f8fafc";b.style.color="#0f172a";}'
    + 'else if(d.canvas==="neutral"){b.style.background="#1e232d";b.style.color="#f1f5f9";}'
    + 'else{b.style.background="#0d0f13";b.style.color="#ebe9e2";}}});</scr' + 'ipt>'
    + '</body></html>';
}

function setStageCanvas(mode) {
  state.canvas = mode;
  saveFilters();
  $$('.canvas-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.canvas === mode);
  });
  document.documentElement.dataset.stageCanvas = mode;
  $$('#library iframe.stage-frame').forEach(f => {
    try { f.contentWindow.postMessage({ type: 'dl-canvas', canvas: mode }, '*'); } catch (e) {}
  });
}

function pushVars(frame, vars) {
  if (!frame) return;
  try { frame.contentWindow.postMessage({ type: 'dl-vars', vars: vars }, '*'); } catch (e) { /* frame not ready */ }
}

/* ---------- lazy stage frames ----------
   Stage iframes start empty and only receive their srcdoc document when they
   near the viewport. srcdoc iframes ignore loading="lazy" (there is no
   network request to defer), so without this every specimen document would
   initialize at once and first paint crawls. A rect sweep runs a beat after
   scrolling settles (never during scroll, so no layout-thrash jank) and loads
   every frame within a 400px margin. Docs are cached per item + canvas +
   tweak state, and built with the CURRENT canvas at load time so a canvas
   switch is never stale for frames that load later. */
const stageDocCache = new Map();
const pendingStageFrames = new Map(); // frame element -> item
let stageCheckTimer = 0;
let stageCheckQueued = false;

function stageDocFor(item) {
  const hasTweaks = !!(item.tweaks && item.tweaks.length);
  const key = item.id + '|' + state.canvas + (hasTweaks ? '|' + JSON.stringify(currentValues(item)) : '');
  let doc = stageDocCache.get(key);
  if (doc === undefined) {
    doc = hasTweaks
      ? previewDoc(String(item.code || ''), currentValues(item))
      : previewDoc(String(item.code || ''));
    stageDocCache.set(key, doc);
  }
  return doc;
}

function loadNearbyStages() {
  const vh = window.innerHeight || document.documentElement.clientHeight || 0;
  const margin = 400;
  let loaded = 0;
  for (const [frame, item] of pendingStageFrames) {
    if (!frame.isConnected) {
      pendingStageFrames.delete(frame);
      continue;
    }
    const r = frame.getBoundingClientRect();
    if (r.top < vh + margin && r.bottom > -margin) {
      frame.srcdoc = stageDocFor(item);
      pendingStageFrames.delete(frame);
      // Hand the main thread back every N frames so hundreds of srcdoc
      // documents don't all parse in one uninterruptible burst on first
      // paint; the rest load on the next settle sweep.
      if (++loaded >= 12) { scheduleStageCheck(); break; }
    }
  }
}

function scheduleStageCheck() {
  if (stageCheckQueued) return;
  stageCheckQueued = true;
  clearTimeout(stageCheckTimer);
  stageCheckTimer = setTimeout(() => {
    stageCheckQueued = false;
    loadNearbyStages();
  }, 140);
}

function deferStageLoad(frame, item) {
  pendingStageFrames.set(frame, item);
  scheduleStageCheck();
}

document.addEventListener('scroll', scheduleStageCheck, true);
window.addEventListener('resize', scheduleStageCheck);

/* ---------- personal tweaking ---------- */

function formatVal(tweak, value) {
  return tweak.type === 'range' ? String(value) + (tweak.unit || '') : String(value);
}

function currentValues(item) {
  const draft = draftVars.get(item.id) || {};
  const vals = {};
  (item.tweaks || []).forEach(t => {
    vals[t.varName] = draft[t.varName] !== undefined ? draft[t.varName] : formatVal(t, t.default);
  });
  return vals;
}

function changedVars(item) {
  const draft = draftVars.get(item.id) || {};
  const out = {};
  (item.tweaks || []).forEach(t => {
    const def = formatVal(t, t.default);
    if (draft[t.varName] !== undefined && draft[t.varName] !== def) out[t.varName] = draft[t.varName];
  });
  return out;
}

function isDirty(item) {
  return Object.keys(changedVars(item)).length > 0;
}

function composeCode(item, values) {
  const base = String(item.code || '').trim();
  const entries = Object.entries(values || {});
  if (!entries.length) return base;
  const decls = entries.map(([k, v]) => k + ': ' + v + ';').join(' ');
  return '<style>\n  :root { ' + decls + ' }\n</style>\n\n' + base;
}

function nextVariantNumber(baseId) {
  let max = 0;
  savedVariants.forEach(v => {
    if (v.variantOf === baseId) {
      const m = /-V(\d+)$/.exec(v.id);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    }
  });
  return max + 1;
}

function saveAsVariant(item) {
  if (!isDirty(item)) {
    toast('Nothing tweaked yet — adjust a control first.');
    return;
  }
  const vid = item.id + '-V' + nextVariantNumber(item.id);
  savedVariants.push({
    id: vid,
    section: item.section,
    name: item.name + ' — my variant',
    description: 'Personal tweak of #' + item.id + '. Lives on this machine only.',
    creator: ME_ID,
    tags: ['variant'].concat(item.tags || []),
    code: composeCode(item, currentValues(item)),
    variantOf: item.id
  });
  saveVariants();
  draftVars.delete(item.id);
  openTrays.delete(item.id);
  toast('Saved ' + vid + ' — your personal copy. Original untouched.');
  render();
}

function removePersonal(id) {
  const beforeVariants = savedVariants.length;
  savedVariants = savedVariants.filter(v => v.id !== id);
  if (savedVariants.length < beforeVariants) {
    saveVariants();
    toast('Deleted ' + id + '.');
  } else {
    importedItems = importedItems.filter(v => v.id !== id);
    saveImports();
    toast('Removed ' + id + '.');
  }
  favorites.delete(id);
  saveFavorites();
  render();
}

function refreshTweakUi(card, item) {
  const dirty = isDirty(item);
  const mod = $('.mod-tag', card);
  if (mod) mod.hidden = !dirty;
  const reset = $('.tray-reset', card);
  if (reset) reset.hidden = !dirty;
  const note = $('.tray-note', card);
  if (note) {
    note.textContent = dirty ? 'unsaved · your copy only' : 'original untouched';
    note.classList.toggle('dirty', dirty);
  }
  const save = $('.tray-save', card);
  if (save) save.disabled = !dirty;
}

/* ---------- filtering + sorting ---------- */

/* Live items with display-id de-collision. Direct REST publishers can claim
   an id the registry already owns (e.g. Mimo picking DD1 when the registry
   already has DD1–DD8), or racing publishes can duplicate a live id. Remap
   such rows to the section's next free id so cards, votes, favorites, and
   the NEW badge stay consistent. Moderation still targets the row's real
   item_id through _rawId. Deterministic: same data in → same ids out. */
function liveItems() {
  const raw = (window.DesignLabLive && DesignLabLive.items()) || [];
  const taken = new Set();
  LIB.items.forEach(i => taken.add(i.id));
  importedItems.forEach(i => taken.add(i.id));
  savedVariants.forEach(i => taken.add(i.id));
  const out = [];
  raw.forEach(r => {
    let id = r.id;
    if (taken.has(id)) {
      const sec = sectionOf(r.section);
      const code = sec ? sec.code : String(r.section || '').slice(0, 2).toUpperCase();
      const used = new Set([...taken, ...out.map(o => o.id)]);
      let n = 1;
      while (used.has(code + n)) n++;
      id = code + n;
    }
    taken.add(id);
    out.push(id === r.id ? r : Object.assign({}, r, { id, _rawId: r.id }));
  });
  return out;
}

function allItems() {
  return LIB.items.concat(importedItems, savedVariants, liveItems());
}

function getNewItemsSet() {
  if (newItemIds && newItemIds.size > 0) return newItemIds;
  const all = allItems();
  return new Set(all.slice(Math.max(0, all.length - 8)).map(it => it.id));
}

function currentPool() {
  const q = state.query.trim().toLowerCase();
  const newSet = getNewItemsSet();
  let items = allItems().filter(it => {
    if (state.section && state.section !== 'all' && it.section !== state.section) return false;
    if (state.creator && it.creator !== state.creator) return false;
    if (state.favoritesOnly && !favorites.has(it.id)) return false;
    if (state.newOnly && !newSet.has(it.id)) return false;
    if (q) {
      const sec = sectionOf(it.section);
      const hay = [
        it.id, it.name, it.description, it.creator,
        (it.tags || []).join(' '),
        (it.tweaks || []).map(t => t.label).join(' '),
        sec ? sec.name : ''
      ].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const order = new Map(allItems().map((it, i) => [it.id, i]));

  if (state.sort === 'top') {
    items.sort((a, b) =>
      (DesignLabVotes.countOf(b.id) - DesignLabVotes.countOf(a.id))
      || ((order.get(b.id) ?? 0) - (order.get(a.id) ?? 0)));
  } else {
    items.sort((a, b) => (order.get(b.id) ?? 0) - (order.get(a.id) ?? 0));
  }

  return items;
}

/* ---------- card builder ---------- */

const STAR_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
  + '<path d="M12 2.8l2.85 5.98 6.55.62-4.94 4.38 1.44 6.42L12 16.82l-5.9 3.38 1.44-6.42L2.6 9.4l6.55-.62z"/></svg>';

const TWEAK_SVG = '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">'
  + '<path d="M1.5 4.5h13M1.5 11.5h13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>'
  + '<circle cx="10.2" cy="4.5" r="2.1" fill="currentColor"/>'
  + '<circle cx="5.8" cy="11.5" r="2.1" fill="currentColor"/></svg>';

const INSPECT_SVG = '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">'
  + '<circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>'
  + '<path d="M10 10l4.2 4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
  + '</svg>';

function buildTrayRows(item) {
  return (item.tweaks || []).map((t, i) => {
    const inputId = 'tw-' + String(item.id).replace(/[^a-zA-Z0-9_-]/g, '') + '-' + i;
    const attrs = t.type === 'range'
      ? 'type="range" min="' + Number(t.min) + '" max="' + Number(t.max) + '" step="' + (Number(t.step) || 1) + '"'
      : 'type="color"';
    const value = ' value="' + escapeHtml(String(t.default)) + '"';
    const output = t.type === 'range' ? escapeHtml(t.default + (t.unit || '')) : escapeHtml(String(t.default));
    return '<div class="tweak-row">'
      + '<label for="' + inputId + '">' + escapeHtml(t.label || t.varName) + '</label>'
      + '<input id="' + inputId + '" ' + attrs + value + ' aria-label="' + escapeHtml(t.label || t.varName) + '">'
      + '<output>' + output + '</output>'
      + '</div>';
  }).join('');
}

/* Top-3 rank within an item's drawer (all-time votes), cached per render. */
let drawerRanksCache = null;

function drawerRankOf(itemId) {
  const item = allItems().find(it => it.id === itemId);
  if (!item) return 0;
  if (!drawerRanksCache) {
    const ranks = new Map();
    const bySec = new Map();
    allItems().forEach(it => {
      if (!bySec.has(it.section)) bySec.set(it.section, []);
      bySec.get(it.section).push(it);
    });
    bySec.forEach(list => {
      list
        .filter(it => DesignLabVotes.countOf(it.id) > 0)
        .sort((a, b) => DesignLabVotes.countOf(b.id) - DesignLabVotes.countOf(a.id))
        .slice(0, 3)
        .forEach((it, i) => ranks.set(it.id, i + 1));
    });
    drawerRanksCache = ranks;
  }
  return drawerRanksCache.get(itemId) || 0;
}

const MEDAL_COLORS = ['', 'gold', 'silver', 'bronze'];

function buildCard(item) {
  const cr = creatorOf(item.creator);
  const isFav = favorites.has(item.id);
  const isVariant = !!item.variantOf;
  const hasTweaks = !!(item.tweaks && item.tweaks.length);
  const removable = isVariant || !!item.imported;
  const dirty = hasTweaks && isDirty(item);
  const rank = drawerRankOf(item.id);
  const medal = rank > 0 && rank <= 3 ? ' medal-' + MEDAL_COLORS[rank] : '';
  const isNew = newItemIds.has(item.id);
  const wave = isNew && !wavedIds.has(item.id) ? ' arrive-wave' : '';
  if (wave) wavedIds.add(item.id);
  const waveDelay = (parseInt(String(item.id).replace(/\D/g, ''), 10) % 8) * 60;

  const card = document.createElement('article');
  card.className = 'card' + (isFav ? ' is-fav' : '') + medal + wave;
  if (wave) card.style.setProperty('--wave-delay', waveDelay + 'ms');
  card.dataset.id = item.id;
  card.dataset.section = item.section || '';

  let actions = '';
  actions += '<button class="icon-btn inspect-btn" type="button" title="Expand preview / inspect (🔍)">' + INSPECT_SVG + '</button>';
  if (hasTweaks) {
    actions += '<button class="icon-btn tweak-btn" type="button" aria-expanded="' + openTrays.has(item.id)
      + '" title="Tune this specimen — affects your copy only">' + TWEAK_SVG + '</button>';
  }
  actions += '<button class="icon-btn star-btn" type="button" aria-pressed="' + isFav
    + '" aria-label="' + (isFav ? 'Remove from' : 'Add to') + ' favorites" title="Favorite">' + STAR_SVG + '</button>';
  if (removable) {
    actions += '<button class="icon-btn variant-del" type="button" title="'
      + (isVariant ? 'Delete this personal variant' : 'Remove this imported specimen') + '">✕</button>';
  }
  if (modToken && item.live) {
    const liveDelId = item._rawId || item.id;
    actions += '<button class="icon-btn live-mod-del" type="button" data-live-del="' + escapeHtml(liveDelId)
      + '" title="Delete live specimen #' + escapeHtml(item.id) + ' from the site" aria-label="Delete live #' + escapeHtml(item.id) + '">✕</button>';
  }

  card.innerHTML =
    '<header class="card-top">'
    + '<span class="card-id">#' + escapeHtml(item.id) + '</span>'
    + (rank > 0 && rank <= 3
      ? '<span class="medal-badge medal-' + MEDAL_COLORS[rank] + '" title="#' + rank + ' in this drawer by votes" aria-label="#' + rank + ' in this drawer">' + rank + '</span>'
      : '')
    + (newItemIds.has(item.id) ? '<span class="new-badge">NEW</span>' : '')
    + '<span class="mod-tag" ' + (dirty ? '' : 'hidden') + '>MOD</span>'
    + '<span class="top-actions">' + actions + '</span>'
    + '</header>'
    + '<div class="stage">'
    + '<i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>'
    + '<iframe class="stage-frame" loading="lazy" sandbox="allow-scripts" title="' + escapeHtml(item.name) + ' live preview"></iframe>'
    + '</div>'
    + '<div class="card-body">'
    + '<h3 class="card-name">' + escapeHtml(item.name) + '</h3>'
    + '<p class="card-desc">' + escapeHtml(item.description || '') + '</p>'
    + '</div>'
    + (hasTweaks
      ? '<div class="tweak-tray" ' + (openTrays.has(item.id) ? '' : 'hidden') + '>'
        + '<div class="tray-head"><span class="tray-title">tweak · your copy only</span>'
        + '<button class="mini-btn tray-reset" type="button" ' + (dirty ? '' : 'hidden') + '>Reset</button></div>'
        + buildTrayRows(item)
        + '<div class="tray-foot"><button class="mini-btn primary tray-save" type="button">Save as my variant</button>'
        + '<span class="tray-note">original untouched</span></div>'
        + '</div>'
      : '')
    + '<footer class="card-foot">'
    + '<span class="credit-chip" style="--chip:' + (cr ? escapeHtml(cr.color) : '#8a8f98')
    + '" title="Created by ' + escapeHtml(cr ? cr.name : item.creator) + '">'
    + escapeHtml(cr ? cr.name : item.creator) + '</span>'
    + '<span class="foot-actions">'
    + '<button class="vote-btn' + (DesignLabVotes.voted(item.id) ? ' is-voted' : '') + '" type="button" data-vote="' + escapeHtml(item.id) + '" aria-pressed="' + DesignLabVotes.voted(item.id) + '" title="' + (DesignLabVotes.voted(item.id) ? 'Remove your upvote' : 'Upvote this specimen') + '">'
    + '<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path d="M8 12.5V3.5m0 0L4.5 7M8 3.5L11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '<span class="vote-count">' + DesignLabVotes.countOf(item.id) + '</span>'
    + '</button>'
    + '<button class="copy-btn" type="button">Copy</button>'
    + '</span>'
    + '</footer>';

  const frame = $('.stage-frame', card);
  deferStageLoad(frame, item);

  $('.inspect-btn', card).addEventListener('click', () => openInspectModal(item));
  $('.stage', card).addEventListener('dblclick', () => openInspectModal(item));
  $('.star-btn', card).addEventListener('click', () => toggleFavorite(item.id, card));
  const voteBtn = $('.vote-btn', card);
  if (voteBtn) voteBtn.addEventListener('click', () => toggleVote(item, voteBtn));
  $('.copy-btn', card).addEventListener('click', ev => copyItemCode(item, ev.currentTarget));

  const del = $('.variant-del', card);
  if (del) del.addEventListener('click', () => removePersonal(item.id));

  const liveDel = $('.live-mod-del', card);
  if (liveDel) liveDel.addEventListener('click', () => deleteLiveItem(liveDel.dataset.liveDel, liveDel));

  if (hasTweaks) {
    const tray = $('.tweak-tray', card);
    const tweakBtn = $('.tweak-btn', card);
    tweakBtn.addEventListener('click', () => {
      const open = !openTrays.has(item.id);
      if (open) openTrays.add(item.id); else openTrays.delete(item.id);
      tray.hidden = !open;
      tweakBtn.setAttribute('aria-expanded', String(open));
    });

    const inputs = $$('.tweak-row input', card);
    inputs.forEach((input, i) => {
      const t = item.tweaks[i];
      const out = input.closest('.tweak-row').querySelector('output');
      input.addEventListener('input', () => {
        const draft = Object.assign({}, draftVars.get(item.id));
        draft[t.varName] = formatVal(t, input.value);
        draftVars.set(item.id, draft);
        if (out) out.textContent = t.type === 'range' ? input.value + (t.unit || '') : input.value;
        pushVars(frame, currentValues(item));
        refreshTweakUi(card, item);
      });
    });

    $('.tray-reset', card).addEventListener('click', () => {
      draftVars.delete(item.id);
      inputs.forEach((input, i) => {
        const t = item.tweaks[i];
        input.value = t.default;
        const out = input.closest('.tweak-row').querySelector('output');
        if (out) out.textContent = t.type === 'range' ? t.default + (t.unit || '') : t.default;
      });
      pushVars(frame, currentValues(item));
      refreshTweakUi(card, item);
    });

    $('.tray-save', card).addEventListener('click', () => saveAsVariant(item));
    refreshTweakUi(card, item);
  }

  return card;
}

function buildGrid(items) {
  const grid = document.createElement('div');
  grid.className = 'grid';
  items.forEach(it => grid.appendChild(buildCard(it)));
  return grid;
}

function buildGroupHeader(sec, count) {
  const head = document.createElement('header');
  head.className = 'group-head';
  head.innerHTML =
    '<span class="group-index">DRAWER ' + drawerNumber(sec.id) + '</span>'
    + '<h2>' + escapeHtml(sec.name) + '</h2>'
    + '<span class="group-rule"></span>'
    + '<span class="group-count">' + count + ' specimen' + (count === 1 ? '' : 's') + '</span>'
    + '<span class="drawer-top3" data-section="' + escapeHtml(sec.id) + '"></span>';
  return head;
}

function newestArrivalItems() {
  const all = allItems();
  const order = new Map(all.map((it, i) => [it.id, i]));
  const ids = new Set(all.slice(Math.max(0, all.length - 16)).map(it => it.id));
  getNewItemsSet().forEach(id => ids.add(id));
  return all
    .filter(it => ids.has(it.id))
    .sort((a, b) => (order.get(b.id) ?? 0) - (order.get(a.id) ?? 0));
}

function buildNewestRow(items) {
  const wrap = document.createElement('section');
  wrap.className = 'drawer-carousel-section newest-row' + entranceClass();
  wrap.dataset.section = 'newest';

  const head = document.createElement('header');
  head.className = 'group-head newest-head';
  head.innerHTML =
    '<span class="group-index">FRESH ADDITIONS</span>'
    + '<h2>Newest Arrivals</h2>'
    + '<span class="group-rule"></span>'
    + '<span class="group-count">' + items.length + ' specimen' + (items.length === 1 ? '' : 's') + '</span>';

  const nav = document.createElement('div');
  nav.className = 'carousel-nav-btns';
  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'carousel-btn';
  prevBtn.title = 'Scroll left';
  prevBtn.setAttribute('aria-label', 'Previous newest arrivals');
  prevBtn.innerHTML = '‹';
  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'carousel-btn';
  nextBtn.title = 'Scroll right';
  nextBtn.setAttribute('aria-label', 'Next newest arrivals');
  nextBtn.innerHTML = '›';
  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  head.appendChild(nav);
  wrap.appendChild(head);

  const trackWrap = document.createElement('div');
  trackWrap.className = 'carousel-track-wrap';
  const track = document.createElement('div');
  track.className = 'carousel-track';
  items.forEach(it => track.appendChild(buildCard(it)));

  // Marquee mode: duplicate the cards so the track can loop seamlessly.
  if (items.length >= 4) {
    wrap.classList.add('is-marquee');
    track.classList.add('is-marquee');
    items.forEach(it => {
      const clone = buildCard(it);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  trackWrap.appendChild(track);
  wrap.appendChild(trackWrap);

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });
  return wrap;
}

function buildGlobalEmpty() {
  const panel = document.createElement('div');
  panel.className = 'empty-panel';
  panel.innerHTML =
    '<h2>The drawers are empty.</h2>'
    + '<p>This lab grows by agent. Hand the expansion prompt to any AI agent and it will start filling a section with finished, visually distinct specimens — each one signed with its maker&rsquo;s chip.</p>'
    + '<div class="empty-actions"><button class="btn btn-primary" id="emptyPromptBtn" type="button">Enter your agent</button></div>'
    + '<span class="empty-hint">specimens: edit <b>js/data.js</b> · paste JSON via ADD SPECIMENS · guide in <b>AGENTS.md</b></span>';
  const emptyBtn = $('#emptyPromptBtn', panel);
  emptyBtn.title = 'One tap: copies a ready-to-paste prompt to your clipboard';
  emptyBtn.addEventListener('click', ev => quickDispatch());
  return panel;
}

function buildNoResults() {
  const panel = document.createElement('div');
  panel.className = 'empty-panel compact';
  panel.innerHTML =
    '<h2>Nothing matches.</h2>'
    + '<p>No specimens survive the current combination of filters.</p>'
    + '<div class="empty-actions"><button class="btn" id="clearAllBtn" type="button">Clear all filters</button></div>';
  $('#clearAllBtn', panel).addEventListener('click', clearAllFilters);
  return panel;
}

/* ---------- rendering ---------- */

function populateSectionDropdown() {
  const sel = $('#sectionSelect');
  if (!sel) return;
  const items = allItems();
  sel.innerHTML = '';

  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = `All drawers (${items.length})`;
  sel.appendChild(optAll);

  LIB.sections.forEach(sec => {
    const count = items.filter(it => it.section === sec.id).length;
    const opt = document.createElement('option');
    opt.value = sec.id;
    opt.textContent = `${sec.name} (${count})`;
    sel.appendChild(opt);
  });

  sel.value = state.section || 'all';
}

function populateCreatorDropdown() {
  const sel = $('#creatorSelect');
  if (!sel) return;
  const items = allItems();
  sel.innerHTML = '';

  const optAll = document.createElement('option');
  optAll.value = 'all';
  optAll.textContent = `All creators (${items.length})`;
  sel.appendChild(optAll);

  const seen = new Set();
  const chips = LIB.creators.concat(
    liveItems().map(it => it._creator).filter(Boolean)
  );
  chips.forEach(cr => {
    if (!cr || seen.has(cr.id)) return;
    seen.add(cr.id);
    const count = items.filter(it => it.creator === cr.id).length;
    if (count > 0 || cr.id === 'me') {
      const opt = document.createElement('option');
      opt.value = cr.id;
      opt.textContent = `${cr.name} (${count})`;
      sel.appendChild(opt);
    }
  });

  sel.value = state.creator || 'all';
}

function syncControlStates() {
  $('#searchInput').value = state.query;
  if ($('#sectionSelect')) $('#sectionSelect').value = state.section;
  if ($('#creatorSelect')) $('#creatorSelect').value = state.creator || 'all';
  if ($('#favToggle')) $('#favToggle').setAttribute('aria-pressed', String(state.favoritesOnly));
  if ($('#newToggle')) $('#newToggle').setAttribute('aria-pressed', String(state.newOnly));
  if ($('#topToggle')) $('#topToggle').setAttribute('aria-pressed', String(state.sort === 'top'));
}

function buildCarouselRow(sec, items) {
  const wrap = document.createElement('section');
  wrap.className = 'drawer-carousel-section' + entranceClass();
  wrap.dataset.section = sec.id;

  const head = document.createElement('header');
  head.className = 'group-head';
  head.innerHTML =
    '<span class="group-index">DRAWER ' + drawerNumber(sec.id) + '</span>'
    + '<h2>' + escapeHtml(sec.name) + '</h2>'
    + '<span class="group-rule"></span>'
    + '<span class="group-count">' + items.length + ' specimen' + (items.length === 1 ? '' : 's') + '</span>'
    + '<span class="drawer-top3" data-section="' + escapeHtml(sec.id) + '"></span>';

  const nav = document.createElement('div');
  nav.className = 'carousel-nav-btns';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.className = 'carousel-btn';
  prevBtn.title = 'Scroll left';
  prevBtn.setAttribute('aria-label', `Previous ${sec.name}`);
  prevBtn.innerHTML = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'carousel-btn';
  nextBtn.title = 'Scroll right';
  nextBtn.setAttribute('aria-label', `Next ${sec.name}`);
  nextBtn.innerHTML = '›';

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  head.appendChild(nav);
  wrap.appendChild(head);

  const trackWrap = document.createElement('div');
  trackWrap.className = 'carousel-track-wrap';

  const track = document.createElement('div');
  track.className = 'carousel-track';

  items.forEach(it => track.appendChild(buildCard(it)));
  trackWrap.appendChild(track);
  wrap.appendChild(trackWrap);

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });

  return wrap;
}

function stampLiveNew() {
  liveItems().forEach(it => {
    if (!it.createdAt) { newItemIds.add(it.id); return; }
    const age = Date.now() - new Date(it.createdAt).getTime();
    if (age < 48 * 60 * 60 * 1000) newItemIds.add(it.id);
  });
}

/* Background polls (votes refresh, live layer) can coalesce into one render
   instead of each triggering a full 250+-card rebuild. User-initiated actions
   still render synchronously via render(). */
let renderTimer = 0;
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => { renderTimer = 0; render(); }, 400);
}

function render() {
  drawerRanksCache = null;
  const items = currentPool();

  populateSectionDropdown();
  populateCreatorDropdown();
  syncControlStates();

  const main = $('#library');
  main.textContent = '';

  if (allItems().length === 0) {
    main.appendChild(buildGlobalEmpty());
    return;
  }
  if (items.length === 0) {
    main.appendChild(buildNoResults());
    return;
  }

  const frag = document.createDocumentFragment();

  if (state.newOnly) {
    const head = document.createElement('header');
    head.className = 'group-head';
    head.innerHTML = '<span class="group-index">FRESH ADDITIONS</span><h2>Newest Arrivals</h2><span class="group-rule"></span><span class="group-count">' + items.length + ' specimen' + (items.length === 1 ? '' : 's') + '</span>';
    frag.appendChild(head);
    frag.appendChild(buildGrid(items));
  } else if (!state.section || state.section === 'all') {
    const fresh = newestArrivalItems();
    if (fresh.length) frag.appendChild(buildNewestRow(fresh));
    LIB.sections.forEach(sec => {
      const group = items.filter(it => it.section === sec.id);
      if (!group.length) return;
      frag.appendChild(buildCarouselRow(sec, group));
    });
    const orphans = items.filter(it => !sectionOf(it.section));
    if (orphans.length) {
      const head = document.createElement('header');
      head.className = 'group-head';
      head.innerHTML = '<span class="group-index">DRAWER ??</span><h2>Unfiled</h2><span class="group-rule"></span>';
      frag.appendChild(head);
      frag.appendChild(buildGrid(orphans));
    }
  } else {
    const sec = sectionOf(state.section);
    if (sec) frag.appendChild(buildGroupHeader(sec, items.length));
    frag.appendChild(buildGrid(items));
  }

  main.appendChild(frag);
  refreshDrawerTop3();
  renderWinnerStrip();
}

/* ---------- actions ---------- */

function toggleFavorite(id, card) {
  const nowFav = !favorites.has(id);
  if (nowFav) favorites.add(id); else favorites.delete(id);
  saveFavorites();

  if (card) {
    card.classList.toggle('is-fav', nowFav);
    const star = $('.star-btn', card);
    star.setAttribute('aria-pressed', String(nowFav));
    star.setAttribute('aria-label', nowFav ? 'Remove from favorites' : 'Add to favorites');
  }

  if (state.favoritesOnly) render();
}

/* ---------- public votes ---------- */

let boardOpen = false;
let boardTab = 'specimens';
let boardWindow = 'all'; // 'all' | 'week'
let prevRanks = new Map(); // itemId -> global rank, for climb detection
let lastRankToastAt = 0;

function refreshVoteButton(btn, item) {
  if (!btn) return;
  const voted = DesignLabVotes.voted(item.id);
  btn.classList.toggle('is-voted', voted);
  btn.setAttribute('aria-pressed', String(voted));
  btn.title = voted ? 'Remove your upvote' : 'Upvote this specimen';
  const n = btn.querySelector('.vote-count');
  if (n) n.textContent = DesignLabVotes.countOf(item.id);
}

function refreshAllVoteButtons() {
  $$('.vote-btn').forEach(btn => {
    const id = btn.dataset.vote;
    if (!id) return;
    const item = allItems().find(it => it.id === id);
    if (item) refreshVoteButton(btn, item);
  });
}

/* Global rank map (all items, by all-time votes) for climb detection. */
function globalRanks() {
  const ranked = allItems()
    .filter(it => DesignLabVotes.countOf(it.id) > 0)
    .sort((a, b) => DesignLabVotes.countOf(b.id) - DesignLabVotes.countOf(a.id));
  const m = new Map();
  ranked.forEach((it, i) => m.set(it.id, i + 1));
  return m;
}

/* Toast when an item the visitor upvoted climbs the leaderboard. Throttled
   to one toast per 12s and only while the tab is visible. */
function checkRankClimbs() {
  const now = Date.now();
  if (document.visibilityState === 'hidden' || now - lastRankToastAt < 12000) return;
  const cur = globalRanks();
  let best = null;
  DesignLabVotes.mineSet().forEach(id => {
    const from = prevRanks.get(id);
    const to = cur.get(id);
    if (!from || !to || to >= from) return;
    if (!best || to < best.to) best = { id, from, to };
  });
  prevRanks = cur;
  if (!best) return;
  lastRankToastAt = now;
  const item = allItems().find(it => it.id === best.id);
  toast('▲ ' + escapeHtml(item ? item.name : best.id) + ' climbed to #' + best.to + ' on the leaderboard');
}

/* Update medal trim + rank badges on existing cards without a full re-render. */
function renderMedals() {
  drawerRanksCache = null;
  $$('.card').forEach(card => {
    const id = card.dataset.id;
    const rank = drawerRankOf(id);
    const medalCls = rank > 0 && rank <= 3 ? ' medal-' + MEDAL_COLORS[rank] : '';
    ['gold', 'silver', 'bronze'].forEach(m => card.classList.remove('medal-' + m));
    if (medalCls) card.classList.add(medalCls.slice(1));
    let badge = $('.medal-badge', card);
    if (rank > 0 && rank <= 3) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'medal-badge';
        const idSpan = $('.card-id', card);
        if (idSpan) idSpan.insertAdjacentElement('afterend', badge);
      }
      badge.className = 'medal-badge medal-' + MEDAL_COLORS[rank];
      badge.textContent = rank;
      badge.title = '#' + rank + ' in this drawer by votes';
      badge.setAttribute('aria-label', '#' + rank + ' in this drawer');
    } else if (badge) {
      badge.remove();
    }
  });
}

/* "Who's winning" strip under the controls — current #1 specimen + creator. */
function renderWinnerStrip() {
  const strip = $('#winnerStrip');
  if (!strip) return;
  const fn = state.sort === 'top' ? DesignLabVotes.countOf : DesignLabVotes.countOf;
  const ranked = allItems()
    .filter(it => fn(it.id) > 0)
    .sort((a, b) => fn(b.id) - fn(a.id));
  const topItem = ranked[0];

  const byCreator = new Map();
  allItems().forEach(it => {
    const c = it.creator || '?';
    byCreator.set(c, (byCreator.get(c) || 0) + fn(it.id));
  });
  const topCreator = [...byCreator.entries()].sort((a, b) => b[1] - a[1])[0];

  if (!topItem || !topCreator) {
    strip.hidden = true;
    return;
  }
  strip.hidden = false;

  const specEl = $('#winnerSpecimen');
  const specCr = creatorOf(topItem.creator);
  specEl.innerHTML = '<span class="winner-label">Top specimen</span>'
    + '<span class="winner-king">♛</span>'
    + '<b>' + escapeHtml(topItem.id) + ' · ' + escapeHtml(topItem.name) + '</b>'
    + '<span class="winner-votes">▲ ' + fn(topItem.id) + '</span>';

  const crEl = $('#winnerCreator');
  const cr = creatorOf(topCreator[0]);
  crEl.innerHTML = '<span class="winner-label">Top creator</span>'
    + '<span class="winner-king">♛</span>'
    + '<span class="credit-chip" style="--chip:' + escapeHtml((cr && cr.color) || '#8a8f98') + '">'
    + escapeHtml((cr && cr.name) || topCreator[0]) + '</span>'
    + '<span class="winner-votes">▲ ' + topCreator[1] + '</span>';
}

function refreshDrawerTop3() {
  $$('.drawer-top3').forEach(el => {
    const secId = el.dataset.section;
    if (!secId) return;
    const top = allItems()
      .filter(it => it.section === secId && DesignLabVotes.countOf(it.id) > 0)
      .sort((a, b) => DesignLabVotes.countOf(b.id) - DesignLabVotes.countOf(a.id))
      .slice(0, 3);
    if (!top.length) {
      el.hidden = true;
      el.textContent = '';
      return;
    }
    el.hidden = false;
    el.title = 'Top voted in this drawer';
    el.innerHTML = top.map(it =>
      '<span class="dt3-id">' + escapeHtml(it.id) + '</span>'
      + '<span class="dt3-v">' + DesignLabVotes.countOf(it.id) + '</span>'
    ).join('');
  });
}

async function toggleVote(item, btn) {
  const res = await DesignLabVotes.toggle(item);
  if (res.ok) {
    refreshVoteButton(btn, item);
    if (state.sort === 'top') render();
    if (boardOpen) renderLeaderboard();
    toast(res.voted ? 'Upvoted #' + item.id + ' ▲' : 'Removed upvote for #' + item.id);
  } else if (res.reason === 'unconfigured') {
    toast('Votes aren\u2019t wired up yet — paste your Supabase anon key into js/supabase-config.js.');
  } else if (res.reason === 'cap') {
    toast('Daily vote limit reached (' + DesignLabVotes.DAILY_CAP + ' per 24h) — come back tomorrow.');
  } else {
    toast('Vote failed — ' + res.reason);
  }
}

/* ---------- community submissions ---------- */

let communityCache = null;
let communityCacheAt = 0;

function openCommunity() {
  $('#communityOverlay').hidden = false;
  syncModPanel();
  renderCommunity();
}

function closeCommunity() {
  $('#communityOverlay').hidden = true;
}

/* ---------- owner moderation (token-gated deletes) ---------- */

let modToken = null;
const LS_MOD_TOKEN = 'designlab.moderator.v1';

function loadModToken() {
  try { modToken = localStorage.getItem(LS_MOD_TOKEN) || null; } catch (e) { modToken = null; }
}

function saveModToken() {
  try {
    if (modToken) localStorage.setItem(LS_MOD_TOKEN, modToken);
    else localStorage.removeItem(LS_MOD_TOKEN);
  } catch (e) { /* ignore */ }
}

function setModStatus(msg, isErr) {
  const el = $('#communityModStatus');
  if (!el) return;
  el.hidden = false;
  el.textContent = msg;
  el.className = 'mod-status' + (isErr ? ' is-err' : ' is-ok');
}

function syncModPanel() {
  const input = $('#communityModToken');
  const unlockBtn = $('#communityModUnlock');
  const lockBtn = $('#communityModLock');
  const purgeBtn = $('#communityModPurgeDeepSeek');
  if (modToken) {
    if (input) input.hidden = true;
    if (unlockBtn) unlockBtn.hidden = true;
    if (lockBtn) lockBtn.hidden = false;
    if (purgeBtn) purgeBtn.hidden = false;
  } else {
    if (input) input.hidden = false;
    if (unlockBtn) unlockBtn.hidden = false;
    if (lockBtn) lockBtn.hidden = true;
    if (purgeBtn) purgeBtn.hidden = true;
  }
  syncModMode();
}

function syncModMode() {
  const bar = $('#modModeBar');
  if (!bar) return;
  bar.hidden = !modToken;
  document.body.classList.toggle('mod-unlocked', !!modToken);
}

async function verifyModToken() {
  if (!modToken || !window.DesignLabLive || !DesignLabLive.moderateCheck) return;
  const res = await DesignLabLive.moderateCheck(modToken);
  if (!res.ok || !res.valid) {
    modToken = null;
    saveModToken();
    syncModPanel();
    render();
  }
}

function scrollToSpecimen(itemId) {
  closeCommunity();
  const card = document.querySelector('.card[data-id="' + CSS.escape(itemId) + '"]');
  if (!card) {
    toast('#' + itemId + ' is not on screen — clear filters or open its drawer.');
    return;
  }
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  card.classList.add('mod-focus');
  window.setTimeout(() => card.classList.remove('mod-focus'), 2200);
}

async function unlockModerator() {
  if (!window.DesignLabLive || !DesignLabLive.moderateCheck) {
    setModStatus('Live ingest is not configured.', true);
    return;
  }
  const input = $('#communityModToken');
  const token = (input && input.value.trim()) || '';
  if (!token) {
    setModStatus('Paste the owner token first.', true);
    return;
  }
  setModStatus('Checking token…', false);
  const res = await DesignLabLive.moderateCheck(token);
  if (!res.ok) {
    if (res.error === 'missing-function') {
      setModStatus('Moderation is one SQL run away — paste supabase/moderation.sql into the Supabase SQL editor, then retry.', true);
    } else {
      setModStatus('Check failed — ' + res.error, true);
    }
    return;
  }
  if (!res.valid) {
    setModStatus('Wrong token.', true);
    return;
  }
  modToken = token;
  saveModToken();
  syncModPanel();
  setModStatus('Unlocked — delete on live cards and in this list.', false);
  renderCommunity();
  render();
}

function lockModerator() {
  modToken = null;
  saveModToken();
  syncModPanel();
  const status = $('#communityModStatus');
  if (status) status.hidden = true;
  renderCommunity();
  render();
}

async function purgeDeepSeekVotes(btn) {
  if (!modToken) return;
  if (!window.confirm('Remove ALL votes stamped creator deepseek? Use this to clear test votes from setup.')) return;
  if (btn) btn.disabled = true;
  const res = await DesignLabLive.moderatePurgeVotes('deepseek', modToken);
  if (!res.ok) {
    if (res.error === 'missing-function') {
      toast('Run supabase/moderation.sql in the Supabase SQL editor (adds vote purge), or run supabase/purge-deepseek-test-votes.sql once.');
    } else {
      toast('Purge failed — ' + res.error);
    }
    if (btn) btn.disabled = false;
    return;
  }
  if (res.rejected) {
    toast('Token rejected — lock and re-enter it.');
    lockModerator();
    return;
  }
  toast('Purged ' + res.deleted + ' DeepSeek vote' + (res.deleted === 1 ? '' : 's') + '.');
  if (btn) btn.disabled = false;
  if (window.DesignLabVotes && DesignLabVotes.refresh) DesignLabVotes.refresh();
  renderWinnerStrip();
  if (boardOpen) renderLeaderboard();
  scheduleRender();
}

async function deleteLiveItem(itemId, btn) {
  if (!modToken) return;
  if (!window.confirm('Delete #' + itemId + ' from live specimens? This is immediate and permanent.')) return;
  if (btn) btn.disabled = true;
  const res = await DesignLabLive.moderateDelete(itemId, modToken);
  if (!res.ok) {
    if (res.error === 'missing-function') {
      toast('Moderation is one SQL run away — paste supabase/moderation.sql into the Supabase SQL editor, then retry.');
    } else {
      toast('Delete failed — ' + res.error);
    }
    if (btn) btn.disabled = false;
    return;
  }
  if (res.deleted) {
    toast('Deleted #' + itemId + '.');
    renderCommunity();
    render();
  } else {
    toast('Token rejected — lock and re-enter it.');
    lockModerator();
  }
}

async function renderCommunity() {
  const list = $('#communityList');
  const empty = $('#communityEmpty');
  const note = $('#communityNote');
  if (!list) return;

  const live = liveItems();
  if (live.length) {
    if (empty) empty.hidden = true;
    if (note) note.textContent = live.length + ' live specimen' + (live.length === 1 ? '' : 's');
    list.innerHTML = live.slice(0, 40).map(it => {
      const when = it.createdAt ? new Date(it.createdAt).toLocaleString() : 'just now';
      const cr = creatorOf(it.creator);
      const agent = cr ? cr.name : it.creator;
      const sec = sectionOf(it.section);
      const secLabel = sec ? sec.name : it.section;
      const targetId = it._rawId || it.id;
      const del = modToken
        ? '<button class="community-del" type="button" data-del="' + escapeHtml(targetId) + '" title="Delete #' + escapeHtml(it.id) + ' from live specimens" aria-label="Delete #' + escapeHtml(it.id) + '">✕</button>'
        : '';
      return '<li class="community-row">'
        + '<span class="community-kind is-pr">LIVE</span>'
        + '<span class="community-title">#' + escapeHtml(it.id) + ' · ' + escapeHtml(it.name) + '</span>'
        + '<span class="community-meta"><span class="community-agent">' + escapeHtml(agent) + '</span> · ' + escapeHtml(secLabel) + ' · ' + escapeHtml(when) + '</span>'
        + '<button class="community-goto" type="button" data-goto="' + escapeHtml(it.id) + '" title="Jump to #' + escapeHtml(it.id) + ' in the library" aria-label="Jump to #' + escapeHtml(it.id) + '">↗</button>'
        + del
        + '</li>';
    }).join('');
    return;
  }

  if (window.DesignLabLive && DesignLabLive.statusError() === 'missing-table') {
    list.innerHTML = '<li class="community-loading">Live ingest is one SQL run away — paste <code>supabase/live.sql</code> into the Supabase SQL editor, then this list fills itself.</li>';
    if (empty) empty.hidden = true;
    return;
  }
  if (window.DesignLabLive && DesignLabLive.isAvailable()) {
    list.innerHTML = '';
    if (empty) empty.hidden = false;
    if (note) note.textContent = 'Live ingest is on — waiting for the first specimen.';
    return;
  }

  // Serve from cache for 5 minutes to respect the unauthenticated API rate limit.
  if (communityCache && Date.now() - communityCacheAt < 5 * 60 * 1000) {
    paintCommunity(communityCache);
    return;
  }

  list.innerHTML = '<li class="community-loading">Loading recent submissions…</li>';
  try {
    const res = await fetch('https://api.github.com/repos/MRWillisT/DesignLab/issues?state=open&sort=updated&per_page=30');
    if (!res.ok) throw new Error('api ' + res.status);
    const issues = await res.json();
    communityCache = issues;
    communityCacheAt = Date.now();
    if (note) note.textContent = '';
    paintCommunity(issues);
  } catch (e) {
    list.innerHTML = '<li class="community-loading">Couldn\u2019t reach GitHub — open <a href="https://github.com/MRWillisT/DesignLab/issues" target="_blank" rel="noopener">the repo directly</a>.</li>';
    if (note) note.textContent = '';
  }
}

function paintCommunity(issues) {
  const list = $('#communityList');
  const empty = $('#communityEmpty');
  if (!list) return;
  const entries = (Array.isArray(issues) ? issues : []).filter(it => it && it.html_url);
  if (!entries.length) {
    list.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  list.innerHTML = entries.map(it => {
    const isPR = !!it.pull_request;
    const state = it.state === 'open' ? 'open' : 'closed';
    const when = it.created_at ? new Date(it.created_at).toLocaleDateString() : '';
    const labels = (it.labels || []).map(l => '<span class="community-label" style="--lbl:' + escapeHtml(l.color || '#8a8f98') + '">' + escapeHtml(l.name || '') + '</span>').join('');
    return '<li class="community-row">'
      + '<span class="community-kind ' + (isPR ? 'is-pr' : 'is-issue') + '">' + (isPR ? 'PR' : 'Issue') + '</span>'
      + '<a class="community-title" href="' + escapeHtml(it.html_url) + '" target="_blank" rel="noopener">' + escapeHtml(it.title || '(untitled)') + '</a>'
      + '<span class="community-meta">' + escapeHtml((it.user && it.user.login) || '?') + ' · ' + when + ' · ' + state + '</span>'
      + labels
      + '</li>';
  }).join('');
}

function openLeaderboard() {
  boardOpen = true;
  $('#boardOverlay').hidden = false;
  renderLeaderboard();
}

function closeLeaderboard() {
  boardOpen = false;
  $('#boardOverlay').hidden = true;
}

function voteFn(kind) {
  return boardWindow === 'week' ? DesignLabVotes.countOfWeek : DesignLabVotes.countOf;
}

function sparklineSvg(itemId) {
  const pts = DesignLabVotes.historyOf(itemId);
  if (!pts.length) return '';
  const W = 64, H = 18, PAD = 2;
  const max = Math.max(1, ...pts.map(p => p.votes));
  const x = i => PAD + (pts.length === 1 ? W / 2 : (i / (pts.length - 1)) * (W - PAD * 2));
  const y = v => H - PAD - (v / max) * (H - PAD * 2);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.votes).toFixed(1)).join(' ');
  const last = pts[pts.length - 1];
  return '<svg class="board-spark" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">'
    + '<path d="' + line + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
    + '<circle cx="' + x(pts.length - 1).toFixed(1) + '" cy="' + y(last.votes).toFixed(1) + '" r="2" fill="currentColor"/>'
    + '</svg>';
}

function boardRow(rank, label, creator, n, spark, itemId) {
  const chip = creator
    ? '<span class="credit-chip" style="--chip:' + escapeHtml(creator.color || '#8a8f98') + '">' + escapeHtml(creator.name) + '</span>'
    : '';
  const voteBtn = itemId
    ? '<button class="board-vote-btn' + (DesignLabVotes.voted(itemId) ? ' is-voted' : '') + '" type="button" data-vote="' + escapeHtml(itemId) + '" aria-pressed="' + DesignLabVotes.voted(itemId) + '" title="' + (DesignLabVotes.voted(itemId) ? 'Remove your upvote' : 'Upvote this specimen') + '">'
      + '<svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true"><path d="M8 12.5V3.5m0 0L4.5 7M8 3.5L11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</button>'
    : '';
  return '<li class="board-row">'
    + '<span class="board-rank">' + rank + '</span>'
    + chip
    + '<span class="board-label">' + escapeHtml(label) + '</span>'
    + (spark || '')
    + voteBtn
    + '<span class="board-votes">▲ ' + n + '</span>'
    + '</li>';
}

function podiumCard(place, label, creator, n, itemId) {
  const medal = ['', 'gold', 'silver', 'bronze'][place];
  const chip = creator
    ? '<span class="credit-chip" style="--chip:' + escapeHtml(creator.color || '#8a8f98') + '">' + escapeHtml(creator.name) + '</span>'
    : '';
  return '<div class="podium-col podium-' + place + '" data-open="' + escapeHtml(itemId || '') + '" title="' + (itemId ? 'Click to inspect ' + escapeHtml(itemId) : '') + '">'
    + '<span class="podium-medal medal-badge medal-' + medal + '">' + place + '</span>'
    + '<span class="podium-label">' + escapeHtml(label) + '</span>'
    + chip
    + '<span class="podium-votes">▲ ' + n + '</span>'
    + '</div>';
}

function buildPodium(entries) {
  if (!entries || entries.length < 3) return '';
  // order: 2nd, 1st, 3rd (classic podium layout)
  return podiumCard(2, entries[1].label, entries[1].creator, entries[1].n, entries[1].itemId)
    + podiumCard(1, entries[0].label, entries[0].creator, entries[0].n, entries[0].itemId)
    + podiumCard(3, entries[2].label, entries[2].creator, entries[2].n, entries[2].itemId);
}

function renderLeaderboard() {
  const list = $('#boardList');
  const empty = $('#boardEmpty');
  const totalEl = $('#boardTotalVotes');
  const dayEl = $('#boardDayLeft');
  const winLabel = $('#boardWindowLabel');
  if (!list) return;
  if (totalEl) totalEl.textContent = boardWindow === 'week' ? DesignLabVotes.totalWeek() : DesignLabVotes.total();
  if (dayEl) dayEl.textContent = DesignLabVotes.votesLeftToday();
  if (winLabel) winLabel.textContent = boardWindow === 'week' ? 'This Week' : 'All Time';

  const fn = voteFn();
  const podiumEl = $('#boardPodium');
  let podium = '';
  let rows = [];

  if (boardTab === 'specimens') {
    const ranked = allItems()
      .filter(it => fn(it.id) > 0)
      .sort((a, b) => fn(b.id) - fn(a.id));
    const top3 = ranked.slice(0, 3);
    podium = buildPodium(top3.map(it => ({
      label: it.id + ' · ' + it.name,
      creator: creatorOf(it.creator),
      n: fn(it.id),
      itemId: it.id
    })));
    rows = ranked.slice(3, 25)
      .map((it, i) => boardRow(i + 4, it.id + ' · ' + it.name, creatorOf(it.creator), fn(it.id),
        boardWindow === 'week' ? '' : sparklineSvg(it.id), it.id));
  } else if (boardTab === 'creators') {
    const byCreator = new Map();
    allItems().forEach(it => {
      const c = it.creator || '?';
      byCreator.set(c, (byCreator.get(c) || 0) + fn(it.id));
    });
    const ranked = [...byCreator.entries()]
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    const top3 = ranked.slice(0, 3);
    podium = buildPodium(top3.map(([cid, n]) => ({
      label: (creatorOf(cid) || {}).name || cid,
      creator: creatorOf(cid),
      n,
      itemId: null
    })));
    rows = ranked.slice(3)
      .map(([cid, n], i) => boardRow(i + 4, (creatorOf(cid) || {}).name || cid, creatorOf(cid), n, ''));
  } else if (boardTab === 'agents') {
    const byAgent = new Map();
    allItems().forEach(it => {
      const c = it.creator || '?';
      if (!byAgent.has(c)) byAgent.set(c, { votes: 0, live: 0, total: 0 });
      const g = byAgent.get(c);
      g.votes += fn(it.id);
      g.total += 1;
      if (it.live) g.live += 1;
    });
    const ranked = [...byAgent.entries()]
      .filter(([, g]) => g.votes > 0 || g.live > 0)
      .sort((a, b) => (b[1].votes - a[1].votes) || (b[1].live - a[1].live) || (b[1].total - a[1].total));
    const top3 = ranked.slice(0, 3);
    podium = buildPodium(top3.map(([cid, g]) => ({
      label: (creatorOf(cid) || {}).name || cid,
      creator: creatorOf(cid),
      n: g.votes,
      itemId: null
    })));
    rows = ranked.slice(3).map(([cid, g], i) => {
      const creator = creatorOf(cid);
      const chip = creator
        ? '<span class="credit-chip" style="--chip:' + escapeHtml(creator.color || '#8a8f98') + '">' + escapeHtml(creator.name) + '</span>'
        : '';
      return '<li class="board-row">'
        + '<span class="board-rank">' + (i + 4) + '</span>'
        + chip
        + '<span class="board-label">' + escapeHtml((creatorOf(cid) || {}).name || cid)
        + '<span class="board-meta">' + g.live + ' live · ' + g.total + ' published</span></span>'
        + '<span class="board-votes">▲ ' + g.votes + '</span>'
        + '</li>';
    });
  } else {
    const bySec = new Map();
    allItems().forEach(it => {
      const s = it.section || '?';
      bySec.set(s, (bySec.get(s) || 0) + fn(it.id));
    });
    const ranked = [...bySec.entries()]
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    const top3 = ranked.slice(0, 3);
    podium = buildPodium(top3.map(([sid, n]) => {
      const sec = sectionOf(sid);
      return { label: sec ? sec.name : sid, creator: null, n, itemId: null };
    }));
    rows = ranked.slice(3)
      .map(([sid, n], i) => {
        const sec = sectionOf(sid);
        return boardRow(i + 4, sec ? sec.name : sid, null, n, '');
      });
  }

  podiumEl.innerHTML = podium;
  podiumEl.hidden = !podium;
  list.innerHTML = rows.join('');
  empty.hidden = rows.length > 0 && !podium;
}

function setQuery(value) {
  state.query = value;
  saveFilters();
  render();
}

function clearAllFilters() {
  state.query = '';
  state.section = 'all';
  state.creator = null;
  state.favoritesOnly = false;
  state.sort = 'newest';
  saveFilters();
  render();
}

/* ---------- ingest + export (addendum) ---------- */

function sanitizeItem(raw) {
  const item = {
    id: String(raw.id).trim(),
    section: String(raw.section || ''),
    name: String(raw.name).trim(),
    description: typeof raw.description === 'string' ? raw.description : '',
    creator: typeof raw.creator === 'string' ? raw.creator.trim() : '',
    tags: Array.isArray(raw.tags) ? raw.tags.filter(t => typeof t === 'string') : [],
    code: String(raw.code),
    imported: true
  };
  if (Array.isArray(raw.tweaks)) item.tweaks = raw.tweaks;
  if (typeof raw.variantOf === 'string') item.variantOf = raw.variantOf;
  return item;
}

function validateItem(raw, takenIds) {
  const errs = [];
  const warns = [];
  const label = raw && typeof raw.id === 'string' && raw.id.trim() ? '#' + raw.id.trim() : '?';
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: ['entry must be an object'], warnings: [] };
  }
  const id = typeof raw.id === 'string' ? raw.id.trim() : '';
  if (!id) errs.push(label + ': missing id');
  else if (takenIds.has(id)) errs.push(label + ': id already exists');
  if (typeof raw.name !== 'string' || !raw.name.trim()) errs.push(label + ': missing name');
  if (typeof raw.code !== 'string' || !raw.code.trim()) errs.push(label + ': missing code');
  if (!sectionOf(raw.section)) warns.push(label + ': unknown section "' + raw.section + '" — will land in Unfiled');
  if (!creatorOf(raw.creator)) warns.push(label + ': unknown creator "' + raw.creator + '" — neutral chip');
  if (raw.tweaks !== undefined) {
    if (!Array.isArray(raw.tweaks)) {
      errs.push(label + ': tweaks must be an array');
    } else {
      raw.tweaks.forEach((t, i) => {
        if (!t || typeof t.varName !== 'string' || t.varName.indexOf('--') !== 0) {
          errs.push(label + ': tweaks[' + i + '] needs varName starting with --');
        } else if (t.type !== 'color' && t.type !== 'range') {
          errs.push(label + ': tweaks[' + i + '] type must be color or range');
        } else if (t.default === undefined || t.default === null) {
          errs.push(label + ': tweaks[' + i + '] needs default');
        } else if (t.type === 'range' && !(Number(t.max) > Number(t.min))) {
          errs.push(label + ': tweaks[' + i + '] range needs max > min');
        } else if (typeof raw.code === 'string' && raw.code.indexOf('var(' + t.varName) === -1) {
          warns.push(label + ': tweak ' + t.varName + ' is never consumed via var(' + t.varName + ', …) — the control will do nothing');
        }
      });
    }
  }
  return { ok: errs.length === 0, errors: errs, warnings: warns };
}

let pendingImport = null;

function parsePayload(parsed) {
  if (Array.isArray(parsed)) return { kind: 'json', imports: parsed, variants: [], favoriteIds: null };
  if (!parsed || typeof parsed !== 'object') return { kind: 'bad' };
  if (parsed.format === 'design-lab-favorites' && Array.isArray(parsed.items)) {
    return {
      kind: 'favorites',
      imports: parsed.items,
      variants: [],
      favoriteIds: parsed.items.map(i => (i && i.id) || null).filter(Boolean)
    };
  }
  if (parsed.format === 'design-lab-personal' && Array.isArray(parsed.items)) {
    const imports = [];
    const variants = [];
    parsed.items.forEach(it => {
      if (it && typeof it === 'object' && it.variantOf) variants.push(it);
      else imports.push(it);
    });
    return {
      kind: 'personal',
      imports,
      variants,
      favoriteIds: Array.isArray(parsed.favorites) ? parsed.favorites.filter(x => typeof x === 'string') : []
    };
  }
  if (!parsed.format) return { kind: 'json', imports: [parsed], variants: [], favoriteIds: null };
  return { kind: 'bad' };
}

function setImportStatus(message, kind) {
  const status = $('#importStatus');
  status.textContent = message;
  status.className = 'import-status' + (kind ? ' is-' + kind : '');
}

function reviewImport() {
  const text = $('#importText').value;
  const runBtn = $('#importRun');
  pendingImport = null;
  runBtn.disabled = true;
  if (!text.trim()) {
    setImportStatus('Items land in a personal local layer on this machine — the shared registry stays untouched.');
    return;
  }
  let wrap;
  try {
    wrap = parsePayload(JSON.parse(text));
  } catch (e) {
    setImportStatus('Not valid JSON yet — ' + e.message, 'err');
    return;
  }
  if (wrap.kind === 'bad') {
    setImportStatus('Unrecognized JSON — expected an item, an array of items, or an exported backup file.', 'err');
    return;
  }
  const taken = new Set(allItems().map(i => i.id));
  const pImports = [];
  const pVariants = [];
  const problems = [];
  const warnings = [];
  const ingest = list => list.forEach(raw => {
    const res = validateItem(raw, taken);
    warnings.push(...res.warnings);
    if (res.ok) {
      const clean = sanitizeItem(raw);
      (clean.variantOf ? pVariants : pImports).push(clean);
      taken.add(clean.id);
    } else {
      problems.push(...res.errors);
    }
  });
  ingest(wrap.imports);
  ingest(wrap.variants);
  if (problems.length) {
    setImportStatus(problems.join(' · '), 'err');
    return;
  }
  pendingImport = { kind: wrap.kind, imports: pImports, variants: pVariants, favoriteIds: wrap.favoriteIds };
  runBtn.disabled = false;
  const parts = [];
  if (pImports.length) parts.push(pImports.length + ' specimen' + (pImports.length === 1 ? '' : 's'));
  if (pVariants.length) parts.push(pVariants.length + ' variant' + (pVariants.length === 1 ? '' : 's'));
  if (wrap.favoriteIds) parts.push(wrap.favoriteIds.length + ' favorite' + (wrap.favoriteIds.length === 1 ? '' : 's'));
  let msg = 'Ready (' + wrap.kind + ' backup' + (wrap.kind === 'json' ? '' : ' file') + '): ' + parts.join(' + ') + '.';
  if (!parts.length) msg = 'Nothing restorable in this payload.';
  if (warnings.length) msg += ' Warnings: ' + warnings.join(' · ');
  setImportStatus(msg, warnings.length ? 'warn' : 'ok');
}

function openImporter() {
  $('#importOverlay').hidden = false;
  reviewImport();
  $('#importText').focus();
}

function closeImporter() {
  $('#importOverlay').hidden = true;
  pendingImport = null;
}

function runImport() {
  if (!pendingImport) return;
  const { kind, imports, variants, favoriteIds } = pendingImport;
  const total = imports.length + variants.length;
  if (!total && !favoriteIds) return;
  if (imports.length) importedItems.push(...imports);
  if (variants.length) {
    savedVariants.push(...variants);
    saveVariants();
  }
  let favRestored = 0;
  if (favoriteIds) {
    favoriteIds.forEach(id => favorites.add(id));
    favRestored = favoriteIds.length;
    saveFavorites();
  }
  if (imports.length) saveImports();
  pendingImport = null;
  $('#importText').value = '';
  closeImporter();
  render();
  if (kind !== 'json' && !total && favRestored) {
    toast('Restored ' + favRestored + ' favorite' + (favRestored === 1 ? '' : 's') + '.');
  } else {
    toast('Added ' + total + ' item' + (total === 1 ? '' : 's') + (favRestored ? ' · restored ' + favRestored + ' favorite' + (favRestored === 1 ? '' : 's') : '') + '.');
  }
}

function downloadJSON(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportFavorites() {
  const favs = allItems().filter(it => favorites.has(it.id));
  if (!favs.length) {
    toast('No favorites yet — star some specimens first.');
    return;
  }
  downloadJSON('design-lab-favorites-' + new Date().toISOString().slice(0, 10) + '.json', {
    format: 'design-lab-favorites',
    version: 1,
    exported: new Date().toISOString(),
    lab: { name: LIB.meta.name, version: LIB.meta.version },
    count: favs.length,
    items: favs
  });
  toast('Exported ' + favs.length + ' favorite' + (favs.length === 1 ? '' : 's') + ' as JSON.');
}

function exportLayer() {
  const personal = importedItems.concat(savedVariants);
  if (!personal.length && !favorites.size) {
    toast('Nothing personal yet — star, import, or tweak something first.');
    return;
  }
  downloadJSON('design-lab-backup-' + new Date().toISOString().slice(0, 10) + '.json', {
    format: 'design-lab-personal',
    version: 1,
    exported: new Date().toISOString(),
    lab: { name: LIB.meta.name, version: LIB.meta.version },
    favorites: [...favorites],
    count: personal.length,
    items: personal
  });
  toast('Backed up ' + favorites.size + ' favorites and ' + personal.length + ' personal item' + (personal.length === 1 ? '' : 's') + '.');
}

function exportAgentStyleGuide(btn) {
  const favs = allItems().filter(it => favorites.has(it.id));
  if (!favs.length) {
    toast('No favorites yet — star (★) some specimens first to generate an agent style guide.');
    return;
  }
  const grouped = {};
  favs.forEach(it => {
    const sec = sectionOf(it.section);
    const secName = sec ? sec.name : it.section;
    if (!grouped[secName]) grouped[secName] = [];
    grouped[secName].push(it);
  });

  let doc = '# VISUAL DESIGN SYSTEM & COMPONENT SPECIFICATION\n\n'
    + 'You are implementing the UI for this application. Strictly adhere to the visual language, geometry, color palette, and micro-interactions demonstrated in the approved design specimens below.\n\n'
    + '## Core Aesthetic Directives\n'
    + '- Maintain the exact border treatments, glassmorphism/glow effects, and corner radius tokens demonstrated in these specimens.\n'
    + '- All motion must be CSS-only using `transform` and `opacity` exclusively with `prefers-reduced-motion` guards.\n'
    + '- Keep components self-contained, accessible, and responsive.\n\n'
    + '## Approved Component Library (' + favs.length + ' item' + (favs.length === 1 ? '' : 's') + ')\n\n';

  Object.entries(grouped).forEach(([secName, items]) => {
    doc += '### ' + secName.toUpperCase() + '\n\n';
    items.forEach(it => {
      doc += '#### #' + it.id + ' — ' + it.name + '\n'
        + (it.description ? '- **Description**: ' + it.description + '\n' : '')
        + (it.tags && it.tags.length ? '- **Aesthetic tags**: ' + it.tags.join(', ') + '\n' : '')
        + '- **Code Implementation**:\n```html\n'
        + (it.code || '').trim() + '\n```\n\n';
    });
  });

  copyText(doc.trim()).then(ok => {
    if (ok) {
      if (btn) flashButton(btn, 'Copied ✓');
      toast('Agent style guide copied (' + favs.length + ' component' + (favs.length === 1 ? '' : 's') + ') — paste into any AI chat.');
    } else {
      toast('Copy blocked by browser — select and copy manually.');
    }
  });
}

function openExportModal() {
  $('#exportOverlay').hidden = false;
}

function closeExportModal() {
  $('#exportOverlay').hidden = true;
}

function nextIdFor(sectionId) {
  const sec = sectionOf(sectionId);
  if (!sec) return null;
  const code = sec.code || sec.id.slice(0, 2).toUpperCase();
  let max = 0;
  const re = new RegExp('^' + code + '(\\d+)$');
  allItems().forEach(it => {
    const m = re.exec(it.id);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return code + (max + 1);
}

function applyDensity(idx) {
  state.densityIndex = Math.max(0, Math.min(DENSITY_TIERS.length - 1, idx));
  const tier = DENSITY_TIERS[state.densityIndex];
  document.documentElement.style.setProperty('--grid-min', tier.min);
  document.documentElement.style.setProperty('--carousel-cols', String(tier.cols));
  document.documentElement.dataset.density = tier.label;
  const lbl = $('#densityLabel');
  if (lbl) lbl.textContent = tier.label;
  const outBtn = $('#zoomOutBtn');
  const inBtn = $('#zoomInBtn');
  if (outBtn) outBtn.disabled = state.densityIndex === 0;
  if (inBtn) inBtn.disabled = state.densityIndex === DENSITY_TIERS.length - 1;
}

/* ---------- init ---------- */

function init() {
  loadImports();
  loadVariants();
  validateLibrary();
  loadFavorites();
  loadFilters();
  loadModToken();
  syncModMode();
  loadCustomAgents();
  loadPromptHistory();
  populateAgentSwitch();

  const seen = loadSeen();
  const currentIds = LIB.items.map(it => it.id);
  const hadBaseline = seen.size > 0;
  newItemIds = hadBaseline
    ? new Set(currentIds.filter(id => !seen.has(id)))
    : new Set();
  saveSeen(currentIds);

  setStageCanvas(state.canvas);
  $$('.canvas-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setStageCanvas(btn.dataset.canvas);
      saveFilters();
    });
  });

  applyDensity(state.densityIndex);
  $('#zoomOutBtn').addEventListener('click', () => {
    applyDensity(state.densityIndex - 1);
    saveFilters();
  });
  $('#zoomInBtn').addEventListener('click', () => {
    applyDensity(state.densityIndex + 1);
    saveFilters();
  });

  $('#enterAgentBtn').addEventListener('click', quickDispatch);
  if ($('#customizeAgentBtn')) $('#customizeAgentBtn').addEventListener('click', enterAgentFlow);
  const agentSwitchBtn = $('#agentSwitchBtn');
  const agentSwitchMenu = $('#agentSwitchMenu');
  if (agentSwitchBtn) {
    agentSwitchBtn.addEventListener('click', ev => {
      ev.stopPropagation();
      agentSwitchToggle();
    });
  }
  if (agentSwitchMenu) {
    // Delegate: any roster item click dispatches as that identity.
    agentSwitchMenu.addEventListener('click', ev => {
      const item = ev.target.closest('.agent-switch-item');
      if (!item) return;
      const id = item.dataset.id;
      agentSwitchToggle(false);
      if (!id) return;
      const entry = promptHistory.find(h => h.id === id);
      if (entry) { quickDispatch(entry); return; }
      const ag = allAvailableAgents().find(a => a.id === id);
      if (ag) { quickDispatch(ag); return; }
      if (id.startsWith('known:')) {
        const name = id.slice(6);
        quickDispatch({ id, name, color: '#94a3b8' });
      }
    });
    const swInput = $('#agentSwitchInput');
    if (swInput) {
      swInput.addEventListener('keydown', ev => {
        ev.stopPropagation();
        if (ev.key === 'Enter') { ev.preventDefault(); dispatchCustomSwitchAgent(); }
        if (ev.key === 'Escape') agentSwitchToggle(false);
      });
    }
    // Click outside closes the dropdown.
    document.addEventListener('click', ev => {
      if (!ev.target.closest('#agentSwitch')) agentSwitchToggle(false);
    });
  }
  $('#promptClose').addEventListener('click', closePromptStudio);
  $('#promptCancel').addEventListener('click', closePromptStudio);
  $('#promptSubmitBtn').addEventListener('click', jumpToPublishPanel);
  $('#promptCopyRun').addEventListener('click', ev => copyPromptStudio(ev.currentTarget));
  if ($('#promptQuickRun')) $('#promptQuickRun').addEventListener('click', () => quickDispatch());
  $('#submitPanelToggle').addEventListener('click', toggleSubmitPanel);
  $('#submitGuideBtn').addEventListener('click', () => toggleSubmitGuide());
  $('#submitItemsInput').addEventListener('input', renderItemsPreview);
  $('#submitValidateBtn').addEventListener('click', validateSubmitItems);
  $('#submitIssueBtn').addEventListener('click', submitItemsAsIssue);
  if ($('#submitLiveBtn')) $('#submitLiveBtn').addEventListener('click', () => { publishItemsLive(); });
  $('#promptOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closePromptStudio();
  });
  $('#agentSelect').addEventListener('change', () => updatePromptStudio({ isAgentSwitch: true, focusCustom: true }));
  $('#customAgentName').addEventListener('input', () => {
    const v = validateAgentName($('#customAgentName').value);
    $('#customNameErr').hidden = v.ok;
    const near = nearRegisteredName($('#customAgentName').value);
    const warn = $('#customNameNear');
    if (near && !v.ok) {
      warn.hidden = false;
      warn.textContent = '⚠ Heads up: "' + $('#customAgentName').value.trim()
        + '" is a near-match of the registered creator ' + near.name
        + ' (' + near.id + ', chip ' + near.color + '). Registering it as a separate identity will split ' + near.name
        + '\u2019s leaderboard row — sign as "' + near.id + '" instead, or pick a clearly different name.';
    } else {
      warn.hidden = true;
      warn.textContent = '';
    }
    updatePromptStudio({ isAgentSwitch: false });
  });
  $('#agentColorPicker').addEventListener('input', () => updatePromptStudio({ isAgentSwitch: false }));
  $('#targetDrawerSelect').addEventListener('change', () => updatePromptStudio({ isAgentSwitch: false }));

  populateColorPills();

  $('#exportModalBtn').addEventListener('click', openExportModal);
  $('#exportClose').addEventListener('click', closeExportModal);
  $('#exportCancel').addEventListener('click', closeExportModal);
  $('#exportOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closeExportModal();
  });
  $('#exportFavsJsonBtn').addEventListener('click', () => {
    exportFavorites();
    closeExportModal();
  });
  $('#exportStyleGuidePromptBtn').addEventListener('click', ev => {
    exportAgentStyleGuide(ev.currentTarget);
    closeExportModal();
  });
  $('#exportFullBackupBtn').addEventListener('click', () => {
    exportLayer();
    closeExportModal();
  });

  $('#importBtn').addEventListener('click', openImporter);
  $('#importClose').addEventListener('click', closeImporter);
  $('#importCancel').addEventListener('click', closeImporter);
  $('#importRun').addEventListener('click', runImport);
  $('#importText').addEventListener('input', debounce(reviewImport, 250));
  $('#importText').addEventListener('keydown', ev => {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter' && !$('#importRun').disabled) runImport();
  });
  $('#importOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closeImporter();
  });
  $('#favToggle').addEventListener('click', () => {
    state.favoritesOnly = !state.favoritesOnly;
    if (state.favoritesOnly) state.newOnly = false;
    saveFilters();
    render();
  });
  $('#newToggle').addEventListener('click', () => {
    state.newOnly = !state.newOnly;
    if (state.newOnly) state.favoritesOnly = false;
    saveFilters();
    render();
  });
  $('#topToggle').addEventListener('click', () => {
    state.sort = state.sort === 'top' ? 'newest' : 'top';
    saveFilters();
    syncControlStates();
    render();
  });
  $('#winnerSpecimen').addEventListener('click', openLeaderboard);
  $('#winnerCreator').addEventListener('click', openLeaderboard);
  $('#winnerOpen').addEventListener('click', openLeaderboard);
  $('#boardBtn').addEventListener('click', openLeaderboard);
  $('#boardClose').addEventListener('click', closeLeaderboard);
  $('#boardCancel').addEventListener('click', closeLeaderboard);
  $('#boardOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closeLeaderboard();
  });
  $('#communityBtn').addEventListener('click', openCommunity);
  $('#communityClose').addEventListener('click', closeCommunity);
  $('#communityCancel').addEventListener('click', closeCommunity);
  $('#communityModBtn').addEventListener('click', ev => {
    const panel = $('#communityModPanel');
    const show = panel.hidden;
    panel.hidden = !show;
    ev.currentTarget.setAttribute('aria-expanded', String(show));
    if (show) {
      syncModPanel();
      const input = $('#communityModToken');
      if (!modToken && input) input.focus();
    }
  });
  $('#communityModUnlock').addEventListener('click', unlockModerator);
  $('#communityModLock').addEventListener('click', lockModerator);
  $('#modModeLock').addEventListener('click', lockModerator);
  $('#communityModPurgeDeepSeek').addEventListener('click', ev => {
    purgeDeepSeekVotes(ev.currentTarget);
  });
  $('#communityModToken').addEventListener('keydown', ev => {
    if (ev.key === 'Enter') unlockModerator();
  });
  $('#communityList').addEventListener('click', ev => {
    const del = ev.target.closest('.community-del');
    if (del) {
      deleteLiveItem(del.dataset.del, del);
      return;
    }
    const goto = ev.target.closest('.community-goto');
    if (goto) scrollToSpecimen(goto.dataset.goto);
  });
  $('#communityOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closeCommunity();
  });
  $$('.board-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.board-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      boardTab = tab.dataset.boardTab;
      renderLeaderboard();
    });
  });
  $$('.board-win-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.board-win-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      boardWindow = btn.dataset.win === 'week' ? 'week' : 'all';
      renderLeaderboard();
    });
  });
  $('#boardList').addEventListener('click', ev => {
    const btn = ev.target.closest('.board-vote-btn');
    if (!btn) return;
    const id = btn.dataset.vote;
    const item = allItems().find(it => it.id === id);
    if (item) toggleVote(item, null);
  });
  $('#boardPodium').addEventListener('click', ev => {
    const col = ev.target.closest('.podium-col');
    if (!col) return;
    const id = col.dataset.open;
    if (!id) return;
    const item = allItems().find(it => it.id === id);
    if (item) openInspectModal(item);
  });
  $('#sectionSelect').addEventListener('change', ev => {
    state.section = ev.target.value;
    saveFilters();
    render();
  });
  $('#creatorSelect').addEventListener('change', ev => {
    state.creator = ev.target.value === 'all' ? null : ev.target.value;
    saveFilters();
    render();
  });

  const searchInput = $('#searchInput');
  searchInput.addEventListener('input', debounce(ev => setQuery(ev.target.value), 160));
  searchInput.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') {
      searchInput.value = '';
      setQuery('');
      searchInput.blur();
    }
  });

  const inspectOverlay = $('#inspectOverlay');
  if (inspectOverlay) {
    $('#inspectClose').addEventListener('click', closeInspectModal);
    $('#inspectCancel').addEventListener('click', closeInspectModal);
    inspectOverlay.addEventListener('click', ev => {
      if (ev.target === inspectOverlay) closeInspectModal();
    });

    $$('.inspect-vp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.inspect-vp-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const stage = $('#inspectStage');
        const vp = btn.dataset.vp;
        if (vp === 'desktop') stage.style.maxWidth = '1024px';
        else if (vp === 'tablet') stage.style.maxWidth = '768px';
        else if (vp === 'mobile') stage.style.maxWidth = '375px';
        else stage.style.maxWidth = '100%';
      });
    });

    $$('.inspect-canvas-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.inspect-canvas-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const c = btn.dataset.canvas;
        inspectCanvasMode = c === 'light' ? 'light' : (c === 'slate' ? 'neutral' : 'dark');
        const stage = $('#inspectStage');
        stage.style.setProperty('--stage-bg', c === 'light' ? '#f8fafc' : (c === 'slate' ? '#1e293b' : '#0d0f13'));
        if (currentInspectItem) {
          mountInspectFrame(currentInspectItem);
        }
      });
    });

    $('#inspectStarBtn').addEventListener('click', () => {
      if (!currentInspectItem) return;
      const card = document.querySelector('.card[data-id="' + currentInspectItem.id + '"]');
      toggleFavorite(currentInspectItem.id, card);
      const isFav = favorites.has(currentInspectItem.id);
      $('#inspectStarBtn').textContent = isFav ? '★ Favorited' : '☆ Favorite';
    });

    $('#inspectCopyBtn').addEventListener('click', ev => {
      if (currentInspectItem) copyItemCode(currentInspectItem, ev.currentTarget);
    });
  }

  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') {
      if ($('#inspectOverlay') && !$('#inspectOverlay').hidden) { closeInspectModal(); return; }
      if (!$('#exportOverlay').hidden) { closeExportModal(); return; }
      if (!$('#communityOverlay').hidden) { closeCommunity(); return; }
      if (!$('#boardOverlay').hidden) { closeLeaderboard(); return; }
      if (!$('#importOverlay').hidden) { closeImporter(); return; }
      if (!$('#promptOverlay').hidden) { closePromptStudio(); return; }
    }
    const tag = document.activeElement ? document.activeElement.tagName : '';
    const typing = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
    if (ev.key === '/' && !typing) {
      ev.preventDefault();
      searchInput.focus();
    }
  });

  const btt = $('#backToTopBtn');
  if (btt) {
    window.addEventListener('scroll', debounce(() => {
      btt.classList.toggle('is-visible', window.scrollY > 300);
    }, 30), { passive: true });

    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.DesignLab = {
    version: LIB.meta.version,
    items: () => allItems(),
    favorites: () => [...favorites],
    nextId: nextIdFor,
    add(input) {
      const arr = Array.isArray(input) ? input : [input];
      const taken = new Set(allItems().map(i => i.id));
      const added = [];
      const rejected = [];
      arr.forEach(raw => {
        const res = validateItem(raw, taken);
        if (res.ok) {
          const clean = sanitizeItem(raw);
          added.push(clean);
          taken.add(clean.id);
        } else {
          rejected.push(res.errors.join(' · '));
        }
      });
      if (added.length) {
        importedItems.push(...added);
        saveImports();
        render();
        toast('Added ' + added.length + ' specimen' + (added.length === 1 ? '' : 's') + '.');
      } else {
        toast('Nothing added — see the returned report.');
      }
      return { added: added.map(i => '#' + i.id), rejected: rejected };
    },
    publish(input, meta) {
      if (!window.DesignLabLive) return Promise.resolve({ ok: false, error: 'Live ingest is not loaded.' });
      const arr = Array.isArray(input) ? input : [input];
      const sectionCode = {};
      LIB.sections.forEach(s => { sectionCode[s.id] = s.code; });
      return DesignLabLive.publish(arr, Object.assign({
        takenIds: new Set(allItems().map(i => i.id)),
        sectionCode: sectionCode
      }, meta || {})).then(result => {
        if (result.ok) {
          stampLiveNew();
          render();
          toast('Published ' + result.added.length + ' live specimen' + (result.added.length === 1 ? '' : 's') + '.');
        }
        return result;
      });
    },
    exportFavorites: exportFavorites,
    exportAgentStyleGuide: () => exportAgentStyleGuide(null),
    exportLayer: exportLayer,
    setCanvas: setStageCanvas
  };

  if (window.DesignLabLive) {
    // Give the live layer the canonical creator registry so registered ids
    // resolve to their official name/color ("Mimo 2.5") even when the row's
    // creator_name was an alias ("Mimo").
    DesignLabLive.setRegistry(LIB.creators);
    DesignLabLive.onChange(() => {
      stampLiveNew();
      // Coalesce: a burst of live changes (poll + publish + votes) triggers
      // one rebuild, not several.
      scheduleRender();
    });
    DesignLabLive.init().then(() => {
      stampLiveNew();
      verifyModToken().then(() => render());
    }).catch(() => {});
  }

  if (window.DesignLabVotes) {
    DesignLabVotes.onChange(() => {
      refreshAllVoteButtons();
      refreshDrawerTop3();
      renderWinnerStrip();
      checkRankClimbs();
      if (boardOpen) renderLeaderboard();
      if (state.sort === 'top') scheduleRender();
      else { drawerRanksCache = null; renderMedals(); }
    });
    DesignLabVotes.init();
    // Live poll: catch rank moves from other visitors without a reload.
    setInterval(() => {
      if (DesignLabVotes.isReady() && document.visibilityState !== 'hidden') {
        DesignLabVotes.refresh();
      }
    }, 30000);
  }

  render();
}

init();
