'use strict';

/* ============================================================
   DESIGN LAB — app logic
   Renders the registry onto cards; owns filters, favorites,
   copying, random mode, and personal tweaking. Data lives in
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
const RANDOM_PICKS = 12;
const RENDER_DEFAULT = 60;
const RENDER_STEP = 60;
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
  sort: 'newest',
  random: false,
  randomSeed: 1,
  renderLimit: RENDER_DEFAULT
};

let favorites = new Set();
let savedVariants = [];
let importedItems = [];
let newItemIds = new Set();
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

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, seed) {
  const rng = mulberry32(seed);
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function sectionOf(id) {
  return LIB.sections.find(s => s.id === id) || null;
}

function creatorOf(id) {
  return LIB.creators.find(c => c.id === id) || null;
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

let customAgents = [];

function loadCustomAgents() {
  try {
    const raw = localStorage.getItem(LS_CUSTOM_AGENTS);
    if (raw) customAgents = JSON.parse(raw);
  } catch (e) { customAgents = []; }
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
    opt.textContent = c.name;
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
    agentName = $('#customAgentName').value.trim() || 'Custom Agent';
    agentId = agentName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
  } else {
    const agent = allAvailableAgents().find(c => c.id === sel.value) || { name: 'Gemini', color: '#818cf8', id: 'gemini' };
    agentName = agent.name;
    agentId = agent.id;
    if (isAgentSwitch) {
      $('#agentColorPicker').value = agent.color;
    }
  }

  const agentColor = $('#agentColorPicker').value || '#818cf8';
  $('#agentColorHex').textContent = agentColor;

  const targetDrawer = dSel.value;
  let taskText = `TASK:\nReview the ${LIB.sections.length} drawers in the library and add new, structurally distinct specimens to whichever drawers you feel have gaps or can be expanded with fresh aesthetics and interaction models.`;
  let badgeText = 'All Drawers (Open Choice)';

  if (targetDrawer !== 'all') {
    const sec = sectionOf(targetDrawer);
    if (sec) {
      const nextId = nextIdFor(sec.id);
      badgeText = `${sec.name} · Next: #${nextId}`;
      taskText = `TARGET DRAWER:\nDrawer ${drawerNumber(sec.id)} — ${sec.name} (Drawer code: "${sec.code}")\n`
        + `Brief: "${sec.brief}"\n`
        + `Next free specimen ID to start with: #${nextId}\n\n`
        + `TASK:\nExpand this specific drawer with 2–4 structurally distinct specimens.`;
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

async function copyPromptStudio(btn) {
  const sel = $('#agentSelect');
  const dSel = $('#targetDrawerSelect');
  const text = $('#promptPreviewText').value;

  let chosenId = sel.value;

  if (sel.value === '_custom') {
    const name = $('#customAgentName').value.trim();
    const color = $('#agentColorPicker').value;
    if (name) {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom';
      chosenId = id;
      const existingIdx = customAgents.findIndex(a => a.id === id);
      if (existingIdx >= 0) {
        customAgents[existingIdx].color = color;
        customAgents[existingIdx].name = name;
      } else {
        customAgents.push({ id, name, color });
      }
      saveCustomAgents();
      populateAgentDropdown(id);
    }
  }

  try {
    localStorage.setItem(LS_PROMPT_AGENT, chosenId);
    localStorage.setItem(LS_PROMPT_DRAWER, dSel.value);
  } catch (e) {}

  const ok = await copyText(text);
  if (ok) {
    if (btn) flashButton(btn, 'Copied ✓');
    toast('Customized agent prompt copied — ready to paste!');
    closePromptStudio();
  } else {
    toast('Copy blocked by browser — select and copy manually.');
  }
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

function allItems() {
  return LIB.items.concat(importedItems, savedVariants);
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
  items.sort((a, b) => (order.get(b.id) ?? 0) - (order.get(a.id) ?? 0));

  if (state.random) items = seededShuffle(items, state.randomSeed).slice(0, RANDOM_PICKS);
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

function buildCard(item) {
  const cr = creatorOf(item.creator);
  const isFav = favorites.has(item.id);
  const isVariant = !!item.variantOf;
  const hasTweaks = !!(item.tweaks && item.tweaks.length);
  const removable = isVariant || !!item.imported;
  const dirty = hasTweaks && isDirty(item);

  const card = document.createElement('article');
  card.className = 'card' + (isFav ? ' is-fav' : '');
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

  card.innerHTML =
    '<header class="card-top">'
    + '<span class="card-id">#' + escapeHtml(item.id) + '</span>'
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
    + '<button class="copy-btn" type="button">Copy</button>'
    + '</footer>';

  const frame = $('.stage-frame', card);
  frame.srcdoc = hasTweaks
    ? previewDoc(String(item.code || ''), currentValues(item))
    : previewDoc(String(item.code || ''));

  $('.inspect-btn', card).addEventListener('click', () => openInspectModal(item));
  $('.stage', card).addEventListener('dblclick', () => openInspectModal(item));
  $('.star-btn', card).addEventListener('click', () => toggleFavorite(item.id, card));
  $('.copy-btn', card).addEventListener('click', ev => copyItemCode(item, ev.currentTarget));

  const del = $('.variant-del', card);
  if (del) del.addEventListener('click', () => removePersonal(item.id));

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
    + '<span class="group-count">' + count + ' specimen' + (count === 1 ? '' : 's') + '</span>';
  return head;
}

function buildNewestHeader(count) {
  const head = document.createElement('header');
  head.className = 'group-head newest-head';
  head.innerHTML =
    '<span class="group-index">FRESH</span>'
    + '<h2>Newest additions</h2>'
    + '<span class="group-rule"></span>'
    + '<span class="group-count">' + count + ' specimen' + (count === 1 ? '' : 's') + '</span>';
  return head;
}

function buildGlobalEmpty() {
  const panel = document.createElement('div');
  panel.className = 'empty-panel';
  panel.innerHTML =
    '<h2>The drawers are empty.</h2>'
    + '<p>This lab grows by agent. Hand the expansion prompt to any AI agent and it will start filling a section with structurally distinct specimens — each one signed with its maker&rsquo;s chip.</p>'
    + '<div class="empty-actions"><button class="btn btn-primary" id="emptyPromptBtn" type="button">Copy agent prompt</button></div>'
    + '<span class="empty-hint">specimens: edit <b>js/data.js</b> · paste JSON via ADD SPECIMENS · guide in <b>AGENTS.md</b></span>';
  $('#emptyPromptBtn', panel).addEventListener('click', ev => copyAgentPrompt(ev.currentTarget));
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

function renderStats(shownCount) {
  const el = $('#statline');
  if (!el) return;
  const total = allItems().length;
  const mine = savedVariants.length;
  const mineCount = savedVariants.length + importedItems.length;
  const mineNote = mineCount > 0 ? ' \u00b7 <b>' + mineCount + '</b> personal' : '';
  let text = '';
  if (hasActiveFilters()) {
    text = 'showing <b>' + shownCount + '</b> of ' + total + ' specimens' + mineNote;
  } else {
    text = 'showing <b>' + shownCount + '</b> of ' + total + ' specimens \u00b7 <b>' + LIB.sections.length + '</b> drawers' + mineNote;
  }
  el.innerHTML = text;
}

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

  LIB.creators.forEach(cr => {
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

function hasActiveFilters() {
  return !!(state.query.trim() || (state.section !== 'newest' && state.section !== 'all') || state.creator || state.favoritesOnly || state.newOnly || state.random);
}

function syncControlStates() {
  $('#searchInput').value = state.query;
  if ($('#sectionSelect')) $('#sectionSelect').value = state.section;
  if ($('#creatorSelect')) $('#creatorSelect').value = state.creator || 'all';
  if ($('#favToggle')) $('#favToggle').setAttribute('aria-pressed', String(state.favoritesOnly));
  if ($('#newToggle')) $('#newToggle').setAttribute('aria-pressed', String(state.newOnly));
}

function buildShowMore(hidden) {
  const wrap = document.createElement('div');
  wrap.className = 'show-more';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn';
  btn.textContent = 'Show ' + Math.min(RENDER_STEP, hidden) + ' more \u00b7 ' + hidden + ' hidden';
  btn.addEventListener('click', () => {
    state.renderLimit += RENDER_STEP;
    render();
  });
  wrap.appendChild(btn);
  return wrap;
}

function resetRenderLimit() {
  state.renderLimit = RENDER_DEFAULT;
}

function buildCarouselRow(sec, items) {
  const wrap = document.createElement('section');
  wrap.className = 'drawer-carousel-section';
  wrap.dataset.section = sec.id;

  const head = document.createElement('header');
  head.className = 'group-head';
  head.innerHTML =
    '<span class="group-index">DRAWER ' + drawerNumber(sec.id) + '</span>'
    + '<h2>' + escapeHtml(sec.name) + '</h2>'
    + '<span class="group-rule"></span>'
    + '<span class="group-count">' + items.length + ' specimen' + (items.length === 1 ? '' : 's') + '</span>';

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

function render() {
  const items = currentPool();

  populateSectionDropdown();
  populateCreatorDropdown();
  syncControlStates();

  const main = $('#library');
  main.textContent = '';

  if (allItems().length === 0) {
    renderStats(0);
    main.appendChild(buildGlobalEmpty());
    return;
  }
  if (items.length === 0) {
    renderStats(0);
    main.appendChild(buildNoResults());
    return;
  }

  const frag = document.createDocumentFragment();

  if (state.random) {
    frag.appendChild(buildGrid(items));
  } else if (state.newOnly) {
    const head = document.createElement('header');
    head.className = 'group-head';
    head.innerHTML = '<span class="group-index">FRESH ADDITIONS</span><h2>Newest Arrivals</h2><span class="group-rule"></span><span class="group-count">' + items.length + ' specimen' + (items.length === 1 ? '' : 's') + '</span>';
    frag.appendChild(head);
    frag.appendChild(buildGrid(items));
  } else if (!state.section || state.section === 'all') {
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

  renderStats(items.length);
  main.appendChild(frag);
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

function setQuery(value) {
  resetRenderLimit();
  state.query = value;
  saveFilters();
  render();
}

function rerollRandom() {
  state.randomSeed = Math.floor(Math.random() * 2147483647) || 1;
  render();
  toast('Rolled again.');
}

function enterRandom() {
  if (allItems().length === 0) {
    toast('Nothing to roll yet — the registry is empty.');
    return;
  }
  resetRenderLimit();
  state.random = true;
  state.randomSeed = Math.floor(Math.random() * 2147483647) || 1;
  render();
  toast('Random mix: up to ' + RANDOM_PICKS + ' specimens.');
}

function exitRandom() {
  state.random = false;
  resetRenderLimit();
  render();
}

function clearAllFilters() {
  resetRenderLimit();
  state.query = '';
  state.section = 'all';
  state.creator = null;
  state.favoritesOnly = false;
  state.sort = 'newest';
  state.random = false;
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

  $('#agentPromptBtn').addEventListener('click', openPromptStudio);
  $('#promptClose').addEventListener('click', closePromptStudio);
  $('#promptCancel').addEventListener('click', closePromptStudio);
  $('#promptCopyRun').addEventListener('click', ev => copyPromptStudio(ev.currentTarget));
  $('#promptOverlay').addEventListener('click', ev => {
    if (ev.target === ev.currentTarget) closePromptStudio();
  });
  $('#agentSelect').addEventListener('change', () => updatePromptStudio({ isAgentSwitch: true, focusCustom: true }));
  $('#customAgentName').addEventListener('input', () => updatePromptStudio({ isAgentSwitch: false }));
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
    resetRenderLimit();
    state.favoritesOnly = !state.favoritesOnly;
    if (state.favoritesOnly) state.newOnly = false;
    saveFilters();
    render();
  });
  $('#newToggle').addEventListener('click', () => {
    resetRenderLimit();
    state.newOnly = !state.newOnly;
    if (state.newOnly) state.favoritesOnly = false;
    saveFilters();
    render();
  });
  $('#sectionSelect').addEventListener('change', ev => {
    resetRenderLimit();
    state.section = ev.target.value;
    saveFilters();
    render();
  });
  $('#creatorSelect').addEventListener('change', ev => {
    resetRenderLimit();
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
    exportFavorites: exportFavorites,
    exportAgentStyleGuide: () => exportAgentStyleGuide(null),
    exportLayer: exportLayer,
    setCanvas: setStageCanvas
  };

  render();
}

init();
