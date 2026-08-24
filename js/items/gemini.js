'use strict';

/* ============================================================
   DESIGN LAB — Gemini Batch (creator id: "gemini", #818cf8)
   Loaded after js/data.js (AGENTS.md Option C).
   Drawers 17–24: sidebars, charts, tables, accordions, pages,
   avatars, feeds, calendars.
   All motion CSS-only (transform/opacity) with prefers-reduced-motion.
   All tweaks consumed via var(--name, fallback).
   ============================================================ */

window.DESIGN_LAB.items.push(

  /* ==========================================================
     DRAWER 17: SIDEBARS & RAILS (SB)
     ========================================================== */

  {
    id: "SB2",
    section: "sidebars",
    name: "Floating Workspace Dock",
    description: "Glassmorphic floating panel sidebar with workspace switcher, nested status-badged channels, and a live audio-huddle dock.",
    creator: "gemini",
    tags: ["sidebar", "dock", "workspace", "glass", "channels", "navigation"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--gsb2-accent", default: "#818cf8" },
      { type: "range", label: "Width", varName: "--gsb2-w", min: 220, max: 280, step: 4, unit: "px", default: 248 }
    ],
    code: `<style>
  .gsb2-dock {
    width: var(--gsb2-w, 248px);
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
    user-select: none;
  }
  .gsb2-ws {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .gsb2-ws:hover { background: rgba(255, 255, 255, 0.06); }
  .gsb2-ws-brand { display: flex; align-items: center; gap: 8px; }
  .gsb2-ws-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: linear-gradient(135deg, var(--gsb2-accent, #818cf8), #4f46e5);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
    box-shadow: 0 2px 8px color-mix(in srgb, var(--gsb2-accent, #818cf8) 40%, transparent);
  }
  .gsb2-ws-name { font-size: 13px; font-weight: 700; color: #f1f5f9; }
  .gsb2-ws-caret { color: #64748b; font-size: 11px; }

  .gsb2-group-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #475569;
    padding: 0 6px;
    margin-bottom: -4px;
  }
  .gsb2-nav { display: flex; flex-direction: column; gap: 2px; }
  .gsb2-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    border-radius: 8px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
  }
  .gsb2-link-left { display: flex; align-items: center; gap: 8px; }
  .gsb2-hash { color: #475569; font-weight: 700; font-size: 13px; }
  .gsb2-link:hover { color: #e2e8f0; background: rgba(255, 255, 255, 0.04); }
  .gsb2-link.active {
    color: #fff;
    background: color-mix(in srgb, var(--gsb2-accent, #818cf8) 18%, transparent);
    font-weight: 600;
  }
  .gsb2-link.active .gsb2-hash { color: var(--gsb2-accent, #818cf8); }
  .gsb2-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 10px;
    background: var(--gsb2-accent, #818cf8);
    color: #0b0d17;
  }

  .gsb2-huddle {
    margin-top: auto;
    padding: 10px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gsb2-hud-user { display: flex; align-items: center; gap: 8px; }
  .gsb2-hud-av {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 700;
    color: #e2e8f0;
    position: relative;
  }
  .gsb2-hud-dot {
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    border: 1.5px solid #0f121d;
  }
  .gsb2-hud-meta { display: flex; flex-direction: column; }
  .gsb2-hud-name { font-size: 11px; font-weight: 600; color: #e2e8f0; }
  .gsb2-hud-status { font-size: 9px; color: #64748b; }
  .gsb2-mic {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: transparent;
    border: none;
    color: var(--gsb2-accent, #818cf8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  @media (prefers-reduced-motion: reduce) {
    .gsb2-ws, .gsb2-link { transition: none; }
  }
</style>
<aside class="gsb2-dock">
  <div class="gsb2-ws">
    <div class="gsb2-ws-brand">
      <div class="gsb2-ws-icon">Ω</div>
      <span class="gsb2-ws-name">Acme Studio</span>
    </div>
    <span class="gsb2-ws-caret">▼</span>
  </div>
  <div class="gsb2-group-title">Channels</div>
  <nav class="gsb2-nav">
    <div class="gsb2-link active">
      <span class="gsb2-link-left"><span class="gsb2-hash">#</span>design-system</span>
      <span class="gsb2-badge">3</span>
    </div>
    <div class="gsb2-link">
      <span class="gsb2-link-left"><span class="gsb2-hash">#</span>engineering</span>
    </div>
    <div class="gsb2-link">
      <span class="gsb2-link-left"><span class="gsb2-hash">#</span>product-sync</span>
      <span class="gsb2-badge" style="background:#334155;color:#94a3b8">12</span>
    </div>
    <div class="gsb2-link">
      <span class="gsb2-link-left"><span class="gsb2-hash">#</span>random</span>
    </div>
  </nav>
  <div class="gsb2-huddle">
    <div class="gsb2-hud-user">
      <div class="gsb2-hud-av">JD<span class="gsb2-hud-dot"></span></div>
      <div class="gsb2-hud-meta">
        <span class="gsb2-hud-name">Julian Diaz</span>
        <span class="gsb2-hud-status">Voice Connected</span>
      </div>
    </div>
    <button class="gsb2-mic" title="Audio on" aria-label="Mic on">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
    </button>
  </div>
</aside>`
  },

  {
    id: "SB3",
    section: "sidebars",
    name: "Tree Navigation Rail",
    description: "IDE-style collapsible file tree sidebar with Git status tags, nested indentation lines, and active node highlight.",
    creator: "gemini",
    tags: ["sidebar", "tree", "files", "explorer", "hierarchy", "git"],
    tweaks: [
      { type: "color", label: "Active Tint", varName: "--gsb3-accent", default: "#818cf8" },
      { type: "color", label: "Folder Amber", varName: "--gsb3-folder", default: "#fcd34d" }
    ],
    code: `<style>
  .gsb3-tree {
    width: 240px;
    background: #0d0f17;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    padding: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 11px;
    user-select: none;
    box-shadow: 0 12px 28px rgba(0,0,0,0.4);
  }
  .gsb3-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 8px;
    color: #64748b;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .gsb3-branch {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--gsb3-accent, #818cf8);
  }
  .gsb3-list { display: flex; flex-direction: column; gap: 1px; }
  .gsb3-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 8px;
    border-radius: 6px;
    color: #94a3b8;
    cursor: pointer;
    transition: background 0.12s ease, color 0.12s ease;
  }
  .gsb3-node:hover { background: rgba(255, 255, 255, 0.04); color: #f1f5f9; }
  .gsb3-node.active {
    background: color-mix(in srgb, var(--gsb3-accent, #818cf8) 15%, transparent);
    color: #fff;
    font-weight: 600;
  }
  .gsb3-left { display: flex; align-items: center; gap: 6px; }
  .gsb3-indent-1 { padding-left: 18px; position: relative; }
  .gsb3-indent-1::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.08);
  }
  .gsb3-indent-2 { padding-left: 30px; position: relative; }
  .gsb3-indent-2::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255,255,255,0.08);
  }
  .gsb3-ficon { color: var(--gsb3-folder, #fcd34d); }
  .gsb3-arrow { color: #475569; font-size: 9px; transition: transform 0.15s ease; }
  .gsb3-git-m { font-size: 9px; font-weight: 700; color: #fbbf24; }
  .gsb3-git-u { font-size: 9px; font-weight: 700; color: #34d399; }
  @media (prefers-reduced-motion: reduce) {
    .gsb3-node, .gsb3-arrow { transition: none; }
  }
</style>
<div class="gsb3-tree">
  <div class="gsb3-head">
    <span>Explorer</span>
    <span class="gsb3-branch">main*</span>
  </div>
  <div class="gsb3-list">
    <div class="gsb3-node">
      <span class="gsb3-left"><span class="gsb3-arrow">▼</span><span class="gsb3-ficon">📁</span> src</span>
    </div>
    <div class="gsb3-node gsb3-indent-1">
      <span class="gsb3-left"><span class="gsb3-arrow">▼</span><span class="gsb3-ficon">📁</span> components</span>
    </div>
    <div class="gsb3-node gsb3-indent-2 active">
      <span class="gsb3-left">⚛ Sidebar.tsx</span>
      <span class="gsb3-git-m">M</span>
    </div>
    <div class="gsb3-node gsb3-indent-2">
      <span class="gsb3-left">⚛ Header.tsx</span>
    </div>
    <div class="gsb3-node gsb3-indent-1">
      <span class="gsb3-left"><span class="gsb3-arrow">▶</span><span class="gsb3-ficon">📁</span> styles</span>
    </div>
    <div class="gsb3-node gsb3-indent-1">
      <span class="gsb3-left">⚡ App.tsx</span>
      <span class="gsb3-git-u">U</span>
    </div>
    <div class="gsb3-node">
      <span class="gsb3-left">⚙ package.json</span>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 18: CHARTS & DATA VIZ (CH)
     ========================================================== */

  {
    id: "CH2",
    section: "charts",
    name: "Neon Sparkline KPI",
    description: "Sleek SaaS metric card with glowing SVG gradient area curve, live delta pill, and interactive peak data markers.",
    creator: "gemini",
    tags: ["chart", "sparkline", "kpi", "svg", "gradient", "area", "saas"],
    tweaks: [
      { type: "color", label: "Glow Color", varName: "--gch2-glow", default: "#818cf8" },
      { type: "range", label: "Radius", varName: "--gch2-radius", min: 8, max: 24, step: 2, unit: "px", default: 16 }
    ],
    code: `<style>
  .gch2-card {
    width: 270px;
    background: #111420;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--gch2-radius, 16px);
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.45);
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gch2-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .gch2-label {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .gch2-val {
    font-size: 26px;
    font-weight: 800;
    color: #f8fafc;
    letter-spacing: -0.03em;
    margin-top: 2px;
  }
  .gch2-pill {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 8px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.12);
    border: 1px solid rgba(34, 197, 94, 0.25);
    color: #4ade80;
    font-size: 11px;
    font-weight: 700;
  }
  .gch2-chart {
    position: relative;
    width: 100%;
    height: 70px;
  }
  .gch2-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  .gch2-path-line {
    fill: none;
    stroke: var(--gch2-glow, #818cf8);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 6px var(--gch2-glow, #818cf8));
  }
  .gch2-foot {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    font-weight: 600;
    color: #475569;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 8px;
  }
</style>
<div class="gch2-card">
  <div class="gch2-top">
    <div>
      <div class="gch2-label">Net MRR Growth</div>
      <div class="gch2-val">$48,290</div>
    </div>
    <span class="gch2-pill">▲ 32.4%</span>
  </div>
  <div class="gch2-chart">
    <svg class="gch2-svg" viewBox="0 0 230 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gch2-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--gch2-glow, #818cf8)" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="var(--gch2-glow, #818cf8)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0,48 Q40,40 70,30 T130,22 T180,12 L230,4 L230,60 L0,60 Z" fill="url(#gch2-grad)"/>
      <path class="gch2-path-line" d="M0,48 Q40,40 70,30 T130,22 T180,12 L230,4"/>
      <circle cx="230" cy="4" r="4" fill="var(--gch2-glow, #818cf8)" stroke="#111420" stroke-width="2"/>
    </svg>
  </div>
  <div class="gch2-foot">
    <span>Aug 01</span>
    <span>Aug 12</span>
    <span>Today</span>
  </div>
</div>`
  },

  {
    id: "CH3",
    section: "charts",
    name: "Isometric Bar Matrix",
    description: "Multi-channel capacity histogram with staggered colored columns, benchmark target grid, and percentage load indicators.",
    creator: "gemini",
    tags: ["chart", "bars", "matrix", "histogram", "analytics", "capacity"],
    tweaks: [
      { type: "color", label: "Primary Bar", varName: "--gch3-bar", default: "#818cf8" },
      { type: "color", label: "Secondary Bar", varName: "--gch3-bar2", default: "#38bdf8" }
    ],
    code: `<style>
  .gch3-box {
    width: 280px;
    padding: 16px;
    background: #0e111a;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gch3-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gch3-title { font-size: 12px; font-weight: 700; color: #f1f5f9; }
  .gch3-legend { display: flex; gap: 8px; font-size: 10px; color: #64748b; }
  .gch3-leg-item { display: flex; align-items: center; gap: 4px; }
  .gch3-dot-a { width: 6px; height: 6px; border-radius: 2px; background: var(--gch3-bar, #818cf8); }
  .gch3-dot-b { width: 6px; height: 6px; border-radius: 2px; background: var(--gch3-bar2, #38bdf8); }
  
  .gch3-plot {
    position: relative;
    height: 90px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 4px;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  }
  .gch3-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    height: 100%;
    justify-content: flex-end;
  }
  .gch3-pair {
    display: flex;
    align-items: flex-end;
    gap: 3px;
  }
  .gch3-b {
    width: 10px;
    border-radius: 3px 3px 0 0;
    transition: transform 0.2s ease;
  }
  .gch3-b:hover { transform: scaleY(1.06); }
  .gch3-b.a { background: var(--gch3-bar, #818cf8); box-shadow: 0 0 10px color-mix(in srgb, var(--gch3-bar, #818cf8) 35%, transparent); }
  .gch3-b.b { background: var(--gch3-bar2, #38bdf8); box-shadow: 0 0 10px color-mix(in srgb, var(--gch3-bar2, #38bdf8) 35%, transparent); }
  .gch3-tag { font-size: 9px; font-weight: 600; color: #64748b; }
  @media (prefers-reduced-motion: reduce) {
    .gch3-b { transition: none; }
  }
</style>
<div class="gch3-box">
  <div class="gch3-head">
    <span class="gch3-title">Compute Cluster Load</span>
    <div class="gch3-legend">
      <span class="gch3-leg-item"><span class="gch3-dot-a"></span>GPU</span>
      <span class="gch3-leg-item"><span class="gch3-dot-b"></span>CPU</span>
    </div>
  </div>
  <div class="gch3-plot">
    <div class="gch3-col">
      <div class="gch3-pair">
        <div class="gch3-b a" style="height: 42px"></div>
        <div class="gch3-b b" style="height: 28px"></div>
      </div>
      <span class="gch3-tag">US-E</span>
    </div>
    <div class="gch3-col">
      <div class="gch3-pair">
        <div class="gch3-b a" style="height: 74px"></div>
        <div class="gch3-b b" style="height: 52px"></div>
      </div>
      <span class="gch3-tag">EU-W</span>
    </div>
    <div class="gch3-col">
      <div class="gch3-pair">
        <div class="gch3-b a" style="height: 56px"></div>
        <div class="gch3-b b" style="height: 64px"></div>
      </div>
      <span class="gch3-tag">AP-S</span>
    </div>
    <div class="gch3-col">
      <div class="gch3-pair">
        <div class="gch3-b a" style="height: 85px"></div>
        <div class="gch3-b b" style="height: 40px"></div>
      </div>
      <span class="gch3-tag">SA-E</span>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 19: TABLES & DATA (TB)
     ========================================================== */

  {
    id: "TB2",
    section: "tables",
    name: "Transaction Ledger",
    description: "Fintech cryptographic ledger with token iconography, transaction hash chips, and colored status pill badges.",
    creator: "gemini",
    tags: ["table", "ledger", "crypto", "transactions", "fintech", "data"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--gtb2-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gtb2-wrap {
    width: 100%;
    max-width: 380px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 14px 32px rgba(0,0,0,0.4);
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gtb2-tbl {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  .gtb2-tbl th {
    background: #151928;
    color: #64748b;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .gtb2-tbl td {
    padding: 10px 14px;
    color: #cbd5e1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    vertical-align: middle;
  }
  .gtb2-tbl tr:last-child td { border-bottom: none; }
  .gtb2-tbl tr:hover { background: rgba(255, 255, 255, 0.025); }
  .gtb2-token {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #f1f5f9;
  }
  .gtb2-sym {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--gtb2-accent, #818cf8) 20%, transparent);
    color: var(--gtb2-accent, #818cf8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: 800;
  }
  .gtb2-hash {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 10px;
    color: #64748b;
  }
  .gtb2-pill {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 999px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .gtb2-pill.done { background: rgba(34, 197, 94, 0.12); color: #4ade80; }
  .gtb2-pill.proc { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
</style>
<div class="gtb2-wrap">
  <table class="gtb2-tbl">
    <thead>
      <tr>
        <th>Asset</th>
        <th>Hash</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><div class="gtb2-token"><span class="gtb2-sym">Ξ</span>ETH</div></td>
        <td><span class="gtb2-hash">0x4a9f...e1c</span></td>
        <td style="font-weight:700;color:#f8fafc">+2.450</td>
        <td><span class="gtb2-pill done">Settled</span></td>
      </tr>
      <tr>
        <td><div class="gtb2-token"><span class="gtb2-sym" style="color:#38bdf8;background:rgba(56,189,248,0.15)">$</span>USDC</div></td>
        <td><span class="gtb2-hash">0x81b2...9f0</span></td>
        <td style="font-weight:700;color:#f8fafc">-1,200.00</td>
        <td><span class="gtb2-pill done">Settled</span></td>
      </tr>
      <tr>
        <td><div class="gtb2-token"><span class="gtb2-sym" style="color:#f59e0b;background:rgba(245,158,11,0.15)">₿</span>BTC</div></td>
        <td><span class="gtb2-hash">0x3c77...aa4</span></td>
        <td style="font-weight:700;color:#f8fafc">+0.184</td>
        <td><span class="gtb2-pill proc">Pending</span></td>
      </tr>
    </tbody>
  </table>
</div>`
  },

  {
    id: "TB3",
    section: "tables",
    name: "Comparison Spec Matrix",
    description: "SaaS feature matrix with highlighted champion tier column, interactive check icons, and sticky category dividers.",
    creator: "gemini",
    tags: ["table", "comparison", "pricing", "features", "matrix"],
    tweaks: [
      { type: "color", label: "Featured Color", varName: "--gtb3-feat", default: "#818cf8" }
    ],
    code: `<style>
  .gtb3-wrap {
    width: 100%;
    max-width: 360px;
    background: #0f121e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    overflow: hidden;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gtb3-tbl {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
  }
  .gtb3-tbl th {
    padding: 12px 10px;
    text-align: center;
    background: #141828;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 700;
  }
  .gtb3-tbl th:first-child { text-align: left; padding-left: 14px; }
  .gtb3-tbl th.feat {
    color: var(--gtb3-feat, #818cf8);
    background: color-mix(in srgb, var(--gtb3-feat, #818cf8) 12%, #141828);
    position: relative;
  }
  .gtb3-tbl td {
    padding: 8px 10px;
    text-align: center;
    color: #cbd5e1;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }
  .gtb3-tbl td:first-child {
    text-align: left;
    padding-left: 14px;
    font-weight: 500;
    color: #94a3b8;
  }
  .gtb3-tbl td.feat {
    background: color-mix(in srgb, var(--gtb3-feat, #818cf8) 6%, transparent);
    font-weight: 700;
    color: #f8fafc;
  }
  .gtb3-yes { color: #34d399; font-weight: 800; font-size: 12px; }
  .gtb3-no { color: #475569; font-weight: 800; font-size: 12px; }
</style>
<div class="gtb3-wrap">
  <table class="gtb3-tbl">
    <thead>
      <tr>
        <th>Capabilities</th>
        <th>Starter</th>
        <th class="feat">Pro ★</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>API Rate Limit</td>
        <td>10k/mo</td>
        <td class="feat">Unlimited</td>
      </tr>
      <tr>
        <td>Custom Webhooks</td>
        <td><span class="gtb3-no">✕</span></td>
        <td class="feat"><span class="gtb3-yes">✓</span></td>
      </tr>
      <tr>
        <td>Dedicated Nodes</td>
        <td><span class="gtb3-no">✕</span></td>
        <td class="feat"><span class="gtb3-yes">✓</span></td>
      </tr>
      <tr>
        <td>Audit Log Retention</td>
        <td>7 days</td>
        <td class="feat">365 days</td>
      </tr>
    </tbody>
  </table>
</div>`
  },

  /* ==========================================================
     DRAWER 20: ACCORDIONS & DISCLOSURE (AC)
     ========================================================== */

  {
    id: "AC2",
    section: "accordions",
    name: "Numbered Stepper Accordion",
    description: "Sequential onboarding disclosure list with illuminated glowing numerical badges and smooth CSS reveal transitions.",
    creator: "gemini",
    tags: ["accordion", "stepper", "numbered", "process", "timeline", "onboarding"],
    tweaks: [
      { type: "color", label: "Glow Step", varName: "--gac2-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gac2-wrap {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gac2-item {
    background: #111420;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s ease;
  }
  .gac2-item:has(.gac2-in:checked) {
    border-color: color-mix(in srgb, var(--gac2-accent, #818cf8) 50%, transparent);
  }
  .gac2-in { display: none; }
  .gac2-hdr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
  }
  .gac2-left { display: flex; align-items: center; gap: 10px; }
  .gac2-num {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.05);
    color: #64748b;
    font-size: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .gac2-in:checked + .gac2-hdr .gac2-num {
    background: var(--gac2-accent, #818cf8);
    color: #0b0d17;
    box-shadow: 0 0 10px color-mix(in srgb, var(--gac2-accent, #818cf8) 60%, transparent);
  }
  .gac2-title { font-size: 12px; font-weight: 600; color: #e2e8f0; }
  .gac2-chev {
    width: 14px;
    height: 14px;
    color: #64748b;
    transition: transform 0.2s ease;
  }
  .gac2-in:checked + .gac2-hdr .gac2-chev {
    transform: rotate(180deg);
    color: var(--gac2-accent, #818cf8);
  }
  .gac2-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease, padding 0.25s ease;
  }
  .gac2-in:checked ~ .gac2-body { max-height: 120px; }
  .gac2-content {
    padding: 0 14px 12px 46px;
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.5;
  }
  @media (prefers-reduced-motion: reduce) {
    .gac2-item, .gac2-num, .gac2-chev, .gac2-body { transition: none; }
  }
</style>
<div class="gac2-wrap">
  <div class="gac2-item">
    <input type="checkbox" class="gac2-in" id="gac2-c1" checked>
    <label class="gac2-hdr" for="gac2-c1">
      <div class="gac2-left">
        <span class="gac2-num">01</span>
        <span class="gac2-title">Configure Schema</span>
      </div>
      <svg class="gac2-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </label>
    <div class="gac2-body">
      <div class="gac2-content">Define database tables, relations, and row level security rules directly in the schema editor.</div>
    </div>
  </div>
  <div class="gac2-item">
    <input type="checkbox" class="gac2-in" id="gac2-c2">
    <label class="gac2-hdr" for="gac2-c2">
      <div class="gac2-left">
        <span class="gac2-num">02</span>
        <span class="gac2-title">Generate API Keys</span>
      </div>
      <svg class="gac2-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
    </label>
    <div class="gac2-body">
      <div class="gac2-content">Mint public publishable and secure service-role credentials for your backend microservices.</div>
    </div>
  </div>
</div>`
  },

  {
    id: "AC3",
    section: "accordions",
    name: "Bento Settings Drawer",
    description: "Modern system preferences accordion card with inline state badges, toggle icons, and segmented options.",
    creator: "gemini",
    tags: ["accordion", "settings", "bento", "disclosure", "cards", "preferences"],
    tweaks: [
      { type: "color", label: "Active Tint", varName: "--gac3-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gac3-card {
    width: 100%;
    max-width: 360px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    overflow: hidden;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gac3-row {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .gac3-row:last-child { border-bottom: none; }
  .gac3-chk { display: none; }
  .gac3-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    cursor: pointer;
    background: transparent;
    transition: background 0.15s ease;
  }
  .gac3-btn:hover { background: rgba(255, 255, 255, 0.03); }
  .gac3-lead { display: flex; align-items: center; gap: 8px; }
  .gac3-icon { color: var(--gac3-accent, #818cf8); font-size: 13px; }
  .gac3-label { font-size: 12px; font-weight: 600; color: #f1f5f9; }
  .gac3-state { font-size: 11px; color: #64748b; font-weight: 500; }
  .gac3-panel {
    max-height: 0;
    overflow: hidden;
    background: #0b0d16;
    transition: max-height 0.2s ease, padding 0.2s ease;
  }
  .gac3-chk:checked ~ .gac3-panel {
    max-height: 100px;
    padding: 10px 14px 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
  }
  .gac3-seg {
    display: flex;
    gap: 6px;
  }
  .gac3-opt {
    flex: 1;
    padding: 6px 0;
    text-align: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 6px;
    font-size: 10px;
    font-weight: 600;
    color: #94a3b8;
    cursor: pointer;
  }
  .gac3-opt.sel {
    background: color-mix(in srgb, var(--gac3-accent, #818cf8) 18%, transparent);
    border-color: var(--gac3-accent, #818cf8);
    color: #fff;
  }
  @media (prefers-reduced-motion: reduce) {
    .gac3-btn, .gac3-panel { transition: none; }
  }
</style>
<div class="gac3-card">
  <div class="gac3-row">
    <input type="checkbox" class="gac3-chk" id="gac3-t1" checked>
    <label class="gac3-btn" for="gac3-t1">
      <div class="gac3-lead"><span class="gac3-icon">🔒</span><span class="gac3-label">Security & Auth</span></div>
      <span class="gac3-state">Passkey Active</span>
    </label>
    <div class="gac3-panel">
      <div class="gac3-seg">
        <div class="gac3-opt sel">WebAuthn</div>
        <div class="gac3-opt">Authenticator</div>
        <div class="gac3-opt">SMS Fallback</div>
      </div>
    </div>
  </div>
  <div class="gac3-row">
    <input type="checkbox" class="gac3-chk" id="gac3-t2">
    <label class="gac3-btn" for="gac3-t2">
      <div class="gac3-lead"><span class="gac3-icon">🔔</span><span class="gac3-label">Alert Frequency</span></div>
      <span class="gac3-state">Instant ▼</span>
    </label>
    <div class="gac3-panel">
      <div class="gac3-seg">
        <div class="gac3-opt sel">Realtime</div>
        <div class="gac3-opt">Daily Digest</div>
        <div class="gac3-opt">Muted</div>
      </div>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 21: PAGE SECTIONS (PS)
     ========================================================== */

  {
    id: "PS2",
    section: "pages",
    name: "Bento Feature Grid",
    description: "High-contrast 3-cell asymmetrical Bento section with animated pulse radar, live token status, and code showcase.",
    creator: "gemini",
    tags: ["bento", "grid", "features", "marketing", "section", "hero"],
    tweaks: [
      { type: "color", label: "Neon Accent", varName: "--gps2-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gps2-bento {
    width: 100%;
    max-width: 380px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gps2-cell {
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .gps2-wide { grid-column: span 2; }
  .gps2-h { font-size: 13px; font-weight: 700; color: #f8fafc; margin-bottom: 2px; }
  .gps2-sub { font-size: 10px; color: #64748b; line-height: 1.4; }
  .gps2-radar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 10px;
    padding: 6px 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }
  .gps2-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--gps2-accent, #818cf8);
    box-shadow: 0 0 10px var(--gps2-accent, #818cf8);
  }
  .gps2-code {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 9px;
    color: #a5b4fc;
  }
  .gps2-val { font-size: 20px; font-weight: 800; color: var(--gps2-accent, #818cf8); margin-top: 8px; }
</style>
<div class="gps2-bento">
  <div class="gps2-cell gps2-wide">
    <div>
      <div class="gps2-h">Edge Vector Routing</div>
      <div class="gps2-sub">Sub-millisecond query execution across 300+ edge locations.</div>
    </div>
    <div class="gps2-radar">
      <span class="gps2-dot"></span>
      <span class="gps2-code">embed_query(dim: 1536) → 0.4ms</span>
    </div>
  </div>
  <div class="gps2-cell">
    <div class="gps2-h">Throughput</div>
    <div class="gps2-sub">Requests / sec</div>
    <div class="gps2-val">94.2k</div>
  </div>
  <div class="gps2-cell">
    <div class="gps2-h">Uptime SLA</div>
    <div class="gps2-sub">Global availability</div>
    <div class="gps2-val">99.99%</div>
  </div>
</div>`
  },

  {
    id: "PS3",
    section: "pages",
    name: "Tiered Pricing Switcher",
    description: "Compact dual-tier subscription component with recommended badge, feature checklist, and CTA action buttons.",
    creator: "gemini",
    tags: ["pricing", "cards", "tier", "subscription", "cta", "billing"],
    tweaks: [
      { type: "color", label: "Pro Accent", varName: "--gps3-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gps3-wrap {
    width: 100%;
    max-width: 380px;
    display: flex;
    gap: 10px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gps3-card {
    flex: 1;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .gps3-card.pro {
    border-color: color-mix(in srgb, var(--gps3-accent, #818cf8) 50%, transparent);
    background: linear-gradient(180deg, #131728 0%, #0e111a 100%);
    box-shadow: 0 10px 30px color-mix(in srgb, var(--gps3-accent, #818cf8) 15%, transparent);
  }
  .gps3-badge {
    position: absolute;
    top: -8px;
    right: 12px;
    background: var(--gps3-accent, #818cf8);
    color: #090b14;
    font-size: 8px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .gps3-name { font-size: 12px; font-weight: 700; color: #94a3b8; }
  .gps3-price { font-size: 22px; font-weight: 800; color: #fff; margin: 4px 0 8px; }
  .gps3-price span { font-size: 10px; color: #64748b; font-weight: 500; }
  .gps3-list { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
  .gps3-item { font-size: 10px; color: #cbd5e1; display: flex; align-items: center; gap: 5px; }
  .gps3-item span { color: #34d399; font-weight: 800; }
  .gps3-btn {
    margin-top: auto;
    width: 100%;
    padding: 7px 0;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent;
    color: #cbd5e1;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }
  .gps3-card.pro .gps3-btn {
    background: var(--gps3-accent, #818cf8);
    border: none;
    color: #0b0d17;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--gps3-accent, #818cf8) 35%, transparent);
  }
</style>
<div class="gps3-wrap">
  <div class="gps3-card">
    <div class="gps3-name">Community</div>
    <div class="gps3-price">$0 <span>/mo</span></div>
    <div class="gps3-list">
      <div class="gps3-item"><span>✓</span> 3 Projects</div>
      <div class="gps3-item"><span>✓</span> Community Support</div>
    </div>
    <button class="gps3-btn">Current</button>
  </div>
  <div class="gps3-card pro">
    <span class="gps3-badge">Popular</span>
    <div class="gps3-name" style="color:var(--gps3-accent,#818cf8)">Pro Plan</div>
    <div class="gps3-price">$29 <span>/mo</span></div>
    <div class="gps3-list">
      <div class="gps3-item"><span>✓</span> Unlimited Apps</div>
      <div class="gps3-item"><span>✓</span> Priority SLA</div>
      <div class="gps3-item"><span>✓</span> Custom Domains</div>
    </div>
    <button class="gps3-btn">Upgrade</button>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 22: AVATARS & PRESENCE (AV)
     ========================================================== */

  {
    id: "AV2",
    section: "avatars",
    name: "Hex Tactical Presence Ring",
    description: "Cyberpunk hexagonal avatar badge with rotating status orbit border and gamified experience level badge.",
    creator: "gemini",
    tags: ["avatar", "hex", "gaming", "presence", "cyberpunk", "ring"],
    tweaks: [
      { type: "color", label: "Ring Glow", varName: "--gav2-accent", default: "#818cf8" },
      { type: "color", label: "Shield Tag", varName: "--gav2-shield", default: "#06b6d4" }
    ],
    code: `<style>
  .gav2-box {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: #0d101a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gav2-av-wrap {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gav2-ring {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    animation: gav2-spin 8s linear infinite;
  }
  @keyframes gav2-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .gav2-hex-body {
    width: 44px;
    height: 44px;
    clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
    background: linear-gradient(135deg, #1e2438, #0f1322);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 800;
    color: #f1f5f9;
  }
  .gav2-lvl {
    position: absolute;
    bottom: -2px;
    right: -2px;
    background: var(--gav2-shield, #06b6d4);
    color: #07131b;
    font-size: 8px;
    font-weight: 900;
    padding: 1px 4px;
    border-radius: 4px;
    letter-spacing: 0.04em;
    box-shadow: 0 0 8px color-mix(in srgb, var(--gav2-shield, #06b6d4) 50%, transparent);
  }
  .gav2-info { display: flex; flex-direction: column; gap: 2px; }
  .gav2-name { font-size: 13px; font-weight: 700; color: #f8fafc; }
  .gav2-role { font-size: 10px; color: var(--gav2-accent, #818cf8); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
  .gav2-stat { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #64748b; margin-top: 2px; }
  .gav2-dot { width: 5px; height: 5px; border-radius: 50%; background: #22c55e; }
  @media (prefers-reduced-motion: reduce) {
    .gav2-ring { animation: none; }
  }
</style>
<div class="gav2-box">
  <div class="gav2-av-wrap">
    <svg class="gav2-ring" viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="27" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2"/>
      <circle cx="30" cy="30" r="27" fill="none" stroke="var(--gav2-accent, #818cf8)" stroke-width="2.5" stroke-dasharray="40 130" stroke-linecap="round"/>
    </svg>
    <div class="gav2-hex-body">NX</div>
    <span class="gav2-lvl">48</span>
  </div>
  <div class="gav2-info">
    <span class="gav2-name">Nexus Vanguard</span>
    <span class="gav2-role">Grandmaster Tier</span>
    <span class="gav2-stat"><span class="gav2-dot"></span>In Ranked Match</span>
  </div>
</div>`
  },

  {
    id: "AV3",
    section: "avatars",
    name: "Audio Wave Avatar",
    description: "Voice-huddle speaker avatar with CSS concentric ripple soundwaves and an active microphone status pip.",
    creator: "gemini",
    tags: ["avatar", "audio", "voice", "ripple", "speaker", "huddle"],
    tweaks: [
      { type: "color", label: "Wave Pulse", varName: "--gav3-wave", default: "#818cf8" }
    ],
    code: `<style>
  .gav3-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: #0f111a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gav3-wave-stage {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gav3-pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 1.5px solid var(--gav3-wave, #818cf8);
    animation: gav3-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .gav3-pulse:nth-child(2) { animation-delay: 0.7s; }
  @keyframes gav3-ping {
    0% { transform: scale(0.85); opacity: 0.8; }
    80%, 100% { transform: scale(1.4); opacity: 0; }
  }
  .gav3-core {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--gav3-wave, #818cf8), #4338ca);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 13px;
    color: #fff;
    box-shadow: 0 0 14px color-mix(in srgb, var(--gav3-wave, #818cf8) 50%, transparent);
  }
  .gav3-meta { display: flex; flex-direction: column; }
  .gav3-speaker { font-size: 12px; font-weight: 700; color: #f1f5f9; }
  .gav3-bar {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-top: 4px;
    height: 10px;
  }
  .gav3-meter {
    width: 2.5px;
    height: 8px;
    border-radius: 1px;
    background: var(--gav3-wave, #818cf8);
  }
  @media (prefers-reduced-motion: reduce) {
    .gav3-pulse { animation: none; opacity: 0.3; transform: scale(1.1); }
  }
</style>
<div class="gav3-wrap">
  <div class="gav3-wave-stage">
    <div class="gav3-pulse"></div>
    <div class="gav3-pulse"></div>
    <div class="gav3-core">SG</div>
  </div>
  <div class="gav3-meta">
    <span class="gav3-speaker">Sophia Green</span>
    <div class="gav3-bar">
      <div class="gav3-meter" style="height:4px"></div>
      <div class="gav3-meter" style="height:10px"></div>
      <div class="gav3-meter" style="height:7px"></div>
      <div class="gav3-meter" style="height:12px"></div>
      <div class="gav3-meter" style="height:5px"></div>
      <span style="font-size:9px;color:#64748b;margin-left:4px">Speaking…</span>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 23: FEEDS & CHAT (FD)
     ========================================================== */

  {
    id: "FD2",
    section: "feeds",
    name: "Git Activity Stream",
    description: "Developer release timeline stream with branch connection spine, commit hashes, and diff count chips.",
    creator: "gemini",
    tags: ["feed", "git", "activity", "timeline", "commits", "dev"],
    tweaks: [
      { type: "color", label: "Spine Color", varName: "--gfd2-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gfd2-stream {
    width: 100%;
    max-width: 360px;
    background: #0e111a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gfd2-item {
    display: flex;
    gap: 12px;
    position: relative;
  }
  .gfd2-item:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 11px;
    top: 24px;
    bottom: -14px;
    width: 2px;
    background: rgba(255, 255, 255, 0.08);
  }
  .gfd2-node {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #181d2e;
    border: 2px solid var(--gfd2-accent, #818cf8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
    flex-shrink: 0;
    z-index: 1;
  }
  .gfd2-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .gfd2-top { display: flex; align-items: center; justify-content: space-between; }
  .gfd2-title { font-size: 11px; font-weight: 600; color: #f1f5f9; }
  .gfd2-time { font-size: 9px; color: #64748b; }
  .gfd2-meta { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
  .gfd2-sha {
    font-family: ui-monospace, Consolas, monospace;
    font-size: 9px;
    padding: 1px 4px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
  }
  .gfd2-diff { font-size: 9px; font-weight: 700; color: #34d399; }
</style>
<div class="gfd2-stream">
  <div class="gfd2-item">
    <div class="gfd2-node">⑂</div>
    <div class="gfd2-body">
      <div class="gfd2-top">
        <span class="gfd2-title">Merged pull request #402</span>
        <span class="gfd2-time">2m ago</span>
      </div>
      <div class="gfd2-meta">
        <span class="gfd2-sha">f79a012</span>
        <span class="gfd2-diff">+142 -8</span>
      </div>
    </div>
  </div>
  <div class="gfd2-item">
    <div class="gfd2-node" style="border-color:#38bdf8">●</div>
    <div class="gfd2-body">
      <div class="gfd2-top">
        <span class="gfd2-title">Release v1.4.0-canary</span>
        <span class="gfd2-time">45m ago</span>
      </div>
      <div class="gfd2-meta">
        <span class="gfd2-sha">b229c11</span>
        <span class="gfd2-diff" style="color:#818cf8">tag</span>
      </div>
    </div>
  </div>
</div>`
  },

  {
    id: "FD3",
    section: "feeds",
    name: "Social Comment Thread",
    description: "Nested reply thread with author tier badges, upvote pill counters, and collapsible response branches.",
    creator: "gemini",
    tags: ["feed", "comment", "thread", "nested", "social", "reactions"],
    tweaks: [
      { type: "color", label: "Upvote Glow", varName: "--gfd3-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gfd3-card {
    width: 100%;
    max-width: 360px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gfd3-post { display: flex; gap: 10px; }
  .gfd3-av {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #312e81;
    color: #c7d2fe;
    font-size: 10px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .gfd3-content { flex: 1; display: flex; flex-direction: column; gap: 4px; }
  .gfd3-user-row { display: flex; align-items: center; gap: 6px; }
  .gfd3-author { font-size: 11px; font-weight: 700; color: #f8fafc; }
  .gfd3-op {
    font-size: 8px;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 4px;
    background: var(--gfd3-accent, #818cf8);
    color: #0a0d16;
  }
  .gfd3-msg { font-size: 11px; color: #cbd5e1; line-height: 1.4; }
  .gfd3-actions { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
  .gfd3-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    color: #64748b;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .gfd3-btn.up { color: var(--gfd3-accent, #818cf8); }
</style>
<div class="gfd3-card">
  <div class="gfd3-post">
    <div class="gfd3-av">MK</div>
    <div class="gfd3-content">
      <div class="gfd3-user-row">
        <span class="gfd3-author">Maya Lin</span>
        <span class="gfd3-op">AUTHOR</span>
      </div>
      <div class="gfd3-msg">Just deployed the zero-layout shift patch for fluid containers. Let me know if you hit any edge cases!</div>
      <div class="gfd3-actions">
        <button class="gfd3-btn up">▲ 42</button>
        <button class="gfd3-btn">Reply</button>
      </div>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 24: CALENDARS & SCHEDULING (CL)
     ========================================================== */

  {
    id: "CL2",
    section: "calendars",
    name: "Horizontal Agenda Strip",
    description: "Horizontal date carousel scrubber with highlighted active day card, time tracker bar, and event slot pill.",
    creator: "gemini",
    tags: ["calendar", "agenda", "strip", "schedule", "booking", "timeline"],
    tweaks: [
      { type: "color", label: "Active Tint", varName: "--gcl2-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gcl2-card {
    width: 100%;
    max-width: 360px;
    background: #0e111a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gcl2-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gcl2-title { font-size: 13px; font-weight: 700; color: #f1f5f9; }
  .gcl2-strip {
    display: flex;
    gap: 6px;
    justify-content: space-between;
  }
  .gcl2-day {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .gcl2-day:hover { background: rgba(255, 255, 255, 0.05); }
  .gcl2-day.active {
    background: color-mix(in srgb, var(--gcl2-accent, #818cf8) 15%, transparent);
    border-color: var(--gcl2-accent, #818cf8);
  }
  .gcl2-dw { font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; }
  .gcl2-dn { font-size: 14px; font-weight: 800; color: #cbd5e1; margin-top: 2px; }
  .gcl2-day.active .gcl2-dn { color: #fff; }
  
  .gcl2-event {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background: #141828;
    border-left: 3px solid var(--gcl2-accent, #818cf8);
    border-radius: 0 8px 8px 0;
  }
  .gcl2-ev-title { font-size: 11px; font-weight: 700; color: #f8fafc; }
  .gcl2-ev-time { font-size: 10px; color: #94a3b8; }
  @media (prefers-reduced-motion: reduce) {
    .gcl2-day { transition: none; }
  }
</style>
<div class="gcl2-card">
  <div class="gcl2-head">
    <span class="gcl2-title">August 2026</span>
    <span style="font-size:10px;font-weight:700;color:var(--gcl2-accent,#818cf8)">TODAY</span>
  </div>
  <div class="gcl2-strip">
    <div class="gcl2-day"><span class="gcl2-dw">Mon</span><span class="gcl2-dn">24</span></div>
    <div class="gcl2-day active"><span class="gcl2-dw">Tue</span><span class="gcl2-dn">25</span></div>
    <div class="gcl2-day"><span class="gcl2-dw">Wed</span><span class="gcl2-dn">26</span></div>
    <div class="gcl2-day"><span class="gcl2-dw">Thu</span><span class="gcl2-dn">27</span></div>
    <div class="gcl2-day"><span class="gcl2-dw">Fri</span><span class="gcl2-dn">28</span></div>
  </div>
  <div class="gcl2-event">
    <div>
      <div class="gcl2-ev-title">Design Systems Architecture Review</div>
      <div class="gcl2-ev-time">14:00 – 15:00 UTC • Google Meet</div>
    </div>
    <span style="font-size:9px;font-weight:800;color:var(--gcl2-accent,#818cf8);background:rgba(129,140,248,0.12);padding:2px 6px;border-radius:6px">IN 20M</span>
  </div>
</div>`
  },

  {
    id: "CL3",
    section: "calendars",
    name: "Time-Slot Scheduler Matrix",
    description: "Meeting appointment booking matrix with time-slot status buttons, timezone indicator, and direct booking CTA.",
    creator: "gemini",
    tags: ["calendar", "slots", "scheduler", "booking", "time", "availability"],
    tweaks: [
      { type: "color", label: "Booked Tint", varName: "--gcl3-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gcl3-wrap {
    width: 100%;
    max-width: 340px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gcl3-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .gcl3-sub { font-size: 10px; color: #64748b; font-weight: 600; }
  .gcl3-slots {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .gcl3-btn {
    padding: 8px 0;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    color: #cbd5e1;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .gcl3-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }
  .gcl3-btn.selected {
    background: var(--gcl3-accent, #818cf8);
    border-color: var(--gcl3-accent, #818cf8);
    color: #0b0d17;
    font-weight: 800;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--gcl3-accent, #818cf8) 35%, transparent);
  }
  @media (prefers-reduced-motion: reduce) {
    .gcl3-btn { transition: none; }
  }
</style>
<div class="gcl3-wrap">
  <div class="gcl3-top">
    <span style="font-size:12px;font-weight:700;color:#f1f5f9">Available Slots</span>
    <span class="gcl3-sub">GMT-4 (EDT)</span>
  </div>
  <div class="gcl3-slots">
    <button class="gcl3-btn">09:00 AM</button>
    <button class="gcl3-btn selected">10:30 AM ✓</button>
    <button class="gcl3-btn">01:15 PM</button>
    <button class="gcl3-btn">03:45 PM</button>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 25: STEPS & TIMELINES (ST)
     ========================================================== */

  {
    id: "ST3",
    section: "steps",
    name: "Horizontal Pill Stepper",
    description: "Horizontal checkout progress ribbon with glowing active step node, completed checks, and status connector line.",
    creator: "gemini",
    tags: ["steps", "stepper", "horizontal", "wizard", "checkout", "progress"],
    tweaks: [
      { type: "color", label: "Active Accent", varName: "--gst3-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gst3-wrap {
    width: 100%;
    max-width: 360px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gst3-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .gst3-track {
    position: absolute;
    top: 14px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: rgba(255, 255, 255, 0.08);
    z-index: 0;
  }
  .gst3-fill {
    position: absolute;
    top: 14px;
    left: 20px;
    width: 45%;
    height: 2px;
    background: var(--gst3-accent, #818cf8);
    box-shadow: 0 0 8px var(--gst3-accent, #818cf8);
    z-index: 0;
  }
  .gst3-step {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .gst3-pill {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #141828;
    border: 2px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    color: #64748b;
  }
  .gst3-step.done .gst3-pill {
    background: var(--gst3-accent, #818cf8);
    border-color: var(--gst3-accent, #818cf8);
    color: #090b14;
  }
  .gst3-step.active .gst3-pill {
    background: #0f121d;
    border-color: var(--gst3-accent, #818cf8);
    color: #fff;
    box-shadow: 0 0 14px color-mix(in srgb, var(--gst3-accent, #818cf8) 50%, transparent);
  }
  .gst3-label { font-size: 10px; font-weight: 700; color: #64748b; }
  .gst3-step.active .gst3-label { color: #f1f5f9; }
  .gst3-step.done .gst3-label { color: #cbd5e1; }
</style>
<div class="gst3-wrap">
  <div class="gst3-bar">
    <div class="gst3-track"></div>
    <div class="gst3-fill"></div>
    <div class="gst3-step done">
      <div class="gst3-pill">✓</div>
      <span class="gst3-label">Account</span>
    </div>
    <div class="gst3-step active">
      <div class="gst3-pill">2</div>
      <span class="gst3-label">Billing</span>
    </div>
    <div class="gst3-step">
      <div class="gst3-pill">3</div>
      <span class="gst3-label">Deploy</span>
    </div>
  </div>
</div>`
  },

  {
    id: "ST4",
    section: "steps",
    name: "Branching Milestone Tree",
    description: "Chronological release roadmap tree with status rings, canary badges, and descriptive task summaries.",
    creator: "gemini",
    tags: ["steps", "timeline", "milestone", "branch", "roadmap", "releases"],
    tweaks: [
      { type: "color", label: "Milestone Glow", varName: "--gst4-glow", default: "#818cf8" },
      { type: "color", label: "Canary Stage", varName: "--gst4-stage", default: "#f59e0b" }
    ],
    code: `<style>
  .gst4-tree {
    width: 100%;
    max-width: 360px;
    background: #0e111a;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gst4-row {
    display: flex;
    gap: 12px;
    position: relative;
  }
  .gst4-row:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 11px;
    top: 22px;
    bottom: -12px;
    width: 2px;
    background: rgba(255, 255, 255, 0.08);
  }
  .gst4-node {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #141828;
    border: 2px solid var(--gst4-glow, #818cf8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
    flex-shrink: 0;
    z-index: 1;
  }
  .gst4-node.stage { border-color: var(--gst4-stage, #f59e0b); }
  .gst4-node.queue { border-color: #475569; color: #64748b; }
  .gst4-content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
  .gst4-top { display: flex; align-items: center; justify-content: space-between; }
  .gst4-name { font-size: 11px; font-weight: 700; color: #f8fafc; }
  .gst4-tag {
    font-size: 8px;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 4px;
    background: rgba(129, 140, 248, 0.12);
    color: var(--gst4-glow, #818cf8);
  }
  .gst4-tag.st { background: rgba(245, 158, 11, 0.12); color: var(--gst4-stage, #f59e0b); }
  .gst4-sub { font-size: 10px; color: #64748b; line-height: 1.4; }
</style>
<div class="gst4-tree">
  <div class="gst4-row">
    <div class="gst4-node">●</div>
    <div class="gst4-content">
      <div class="gst4-top">
        <span class="gst4-name">v2.0 Core Engine</span>
        <span class="gst4-tag">SHIPPED</span>
      </div>
      <div class="gst4-sub">Zero-copy memory pipelines & WebAssembly runtime.</div>
    </div>
  </div>
  <div class="gst4-row">
    <div class="gst4-node stage">◈</div>
    <div class="gst4-content">
      <div class="gst4-top">
        <span class="gst4-name">Edge Mesh Routing</span>
        <span class="gst4-tag st">CANARY</span>
      </div>
      <div class="gst4-sub">Regional load balancer rollout across 42 zones.</div>
    </div>
  </div>
  <div class="gst4-row">
    <div class="gst4-node queue">○</div>
    <div class="gst4-content">
      <div class="gst4-top">
        <span class="gst4-name">Vector Indexing</span>
        <span class="gst4-tag" style="background:#1e293b;color:#64748b">QUEUED</span>
      </div>
      <div class="gst4-sub">HNSW graph compression and quantizer tuning.</div>
    </div>
  </div>
</div>`
  },

  /* ==========================================================
     DRAWER 26: EMPTY & ERROR (EM)
     ========================================================== */

  {
    id: "EM5",
    section: "empty",
    name: "Zero Keys Vault",
    description: "Security credentials zero-state featuring floating holographic padlock aperture and primary key creation action.",
    creator: "gemini",
    tags: ["empty", "vault", "keys", "security", "credentials", "zero-data"],
    tweaks: [
      { type: "color", label: "Vault Glow", varName: "--gem5-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gem5-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 20px;
    background: #0f121d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    width: 100%;
    max-width: 320px;
    gap: 14px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gem5-hologram {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--gem5-accent, #818cf8) 20%, transparent) 0%, transparent 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px dashed color-mix(in srgb, var(--gem5-accent, #818cf8) 40%, transparent);
  }
  .gem5-icon {
    font-size: 24px;
    color: var(--gem5-accent, #818cf8);
    filter: drop-shadow(0 0 10px var(--gem5-accent, #818cf8));
  }
  .gem5-title { font-size: 14px; font-weight: 800; color: #f1f5f9; }
  .gem5-desc { font-size: 11px; color: #64748b; line-height: 1.5; max-width: 240px; margin-top: -4px; }
  .gem5-btn {
    padding: 8px 18px;
    border-radius: 8px;
    border: none;
    background: var(--gem5-accent, #818cf8);
    color: #0a0d16;
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 14px color-mix(in srgb, var(--gem5-accent, #818cf8) 40%, transparent);
    transition: transform 0.15s ease;
  }
  .gem5-btn:hover { transform: translateY(-1px); }
  @media (prefers-reduced-motion: reduce) {
    .gem5-btn { transition: none; }
  }
</style>
<div class="gem5-box">
  <div class="gem5-hologram">
    <span class="gem5-icon">🔒</span>
  </div>
  <div>
    <div class="gem5-title">No API Keys Found</div>
    <div class="gem5-desc">Generate your first project secret key to start querying production database instances.</div>
  </div>
  <button class="gem5-btn">+ Create API Key</button>
</div>`
  },

  {
    id: "EM6",
    section: "empty",
    name: "Disconnected Radar Pulse",
    description: "Hardware telemetry lost zero-state with scanning conic radar sweep, error diagnostic pill, and retry CTA.",
    creator: "gemini",
    tags: ["empty", "error", "radar", "offline", "disconnect", "hardware"],
    tweaks: [
      { type: "color", label: "Radar Beam", varName: "--gem6-accent", default: "#818cf8" }
    ],
    code: `<style>
  .gem6-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px;
    background: #0d0f17;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    width: 100%;
    max-width: 320px;
    gap: 12px;
    font-family: ui-sans-serif, system-ui, sans-serif;
  }
  .gem6-radar {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, #131726 0%, #0d0f17 100%);
    overflow: hidden;
  }
  .gem6-sweep {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(from 0deg, color-mix(in srgb, var(--gem6-accent, #818cf8) 40%, transparent) 0deg, transparent 60deg, transparent 360deg);
    animation: gem6-spin 3s linear infinite;
  }
  @keyframes gem6-spin {
    to { transform: rotate(360deg); }
  }
  .gem6-ping {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--gem6-accent, #818cf8);
    box-shadow: 0 0 10px var(--gem6-accent, #818cf8);
    z-index: 1;
  }
  .gem6-title { font-size: 14px; font-weight: 800; color: #f1f5f9; }
  .gem6-desc { font-size: 11px; color: #64748b; line-height: 1.5; max-width: 220px; }
  .gem6-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.25);
    color: #f87171;
    font-size: 10px;
    font-weight: 700;
  }
  @media (prefers-reduced-motion: reduce) {
    .gem6-sweep { animation: none; opacity: 0.3; }
  }
</style>
<div class="gem6-card">
  <div class="gem6-radar">
    <div class="gem6-sweep"></div>
    <div class="gem6-ping"></div>
  </div>
  <div>
    <div class="gem6-title">Hardware Unreachable</div>
    <div class="gem6-desc">Telemetry link timed out after 3 retries. Check local gateway antenna connection.</div>
  </div>
  <span class="gem6-badge">⚠ ERR_CONN_LOST</span>
</div>`
  }

);

