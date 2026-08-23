'use strict';

/* ============================================================
   DESIGN LAB — DATA REGISTRY
   ------------------------------------------------------------
   This library grows by agent. To add specimens, append entries
   to ITEMS below. Read the schema first; the web app renders
   everything automatically from this file.

   RULES OF THE LAB
   - Additive only: never edit, restyle, or remove other agents' entries.
   - Structural difference beats variation. No color swaps, no
     near-duplicates. Every item must feel distinctly new.
   - Every entry is signed with its creator id.
   ============================================================ */

window.DESIGN_LAB = {

  meta: {
    name: "Design Lab",
    version: "0.5.0"
  },

  /* ----------------------------------------------------------
     CREATORS — { id, name, color }
     `color` is any CSS color; it drives the credit chip.
     Add yourself here before signing items with your id.
     ---------------------------------------------------------- */
  creators: [
    { id: "ox-alpha", name: "Ox Alpha", color: "#22d3ee" },
    { id: "gemini",   name: "Gemini",   color: "#818cf8" },
    { id: "claude",   name: "Claude",   color: "#f97316" },
    { id: "chatgpt",  name: "ChatGPT",  color: "#10a37f" },
    { id: "deepseek", name: "DeepSeek", color: "#3b82f6" },
    // reserved for the local user's saved variants — agents must not sign with it
    { id: "me",       name: "My Variants", color: "#f472b6" },
    { id: "mimo-2-5", name: "Mimo 2.5",    color: "#04ff00" },
    { id: "nemotron", name: "Nemotron", color: "#f97316" },
    { id: "opus",     name: "Opus",     color: "#f5323c" },
    { id: "sonnet",   name: "Sonnet",   color: "#f04c54" },
    { id: "gpt-oss",  name: "GPT-OSS",  color: "#7a00f5" }
  ],

  /* ----------------------------------------------------------
     SECTIONS — fixed registry of drawers. Reference by id.
     `code` is the two-letter prefix every item id in that drawer
     must use (BU1, PL7, ...). `brief` tells agents what belongs.
     Do not reorder or renumber existing drawers.
     ---------------------------------------------------------- */
  sections: [
    { id: "animations",  code: "AN", name: "Animations",                   brief: "Motion demos where the movement IS the design." },
    { id: "loaders",     code: "LO", name: "Loaders & Skeletons",          brief: "Spinners, shimmer placeholders, waiting states." },
    { id: "badges",      code: "BA", name: "Badges & Tags",                brief: "Status dots, counters, labels, pills." },
    { id: "buttons",     code: "BU", name: "Buttons",                      brief: "Click targets. Vary silhouette, anatomy, feedback." },
    { id: "forms",       code: "FO", name: "Form Controls",                brief: "Inputs, selects, textareas, steppers, comboboxes." },
    { id: "toggles",     code: "TO", name: "Toggles & Switches",           brief: "Binary controls: switches, check-states, segmented binaries." },
    { id: "sliders",     code: "SL", name: "Sliders & Progress",           brief: "Value scrubbers, range inputs, progress indicators." },
    { id: "cards",       code: "CA", name: "Cards & Panels",               brief: "Self-contained surfaces: profiles, tiles, content panels." },
    { id: "navigation",  code: "NA", name: "Navigation",                   brief: "Menus, tab bars, breadcrumbs, paginators." },
    { id: "alerts",      code: "AL", name: "Alerts & Toasts",              brief: "Inline callouts and transient notifications." },
    { id: "icons",       code: "IC", name: "Icons & Glyphs",               brief: "Glyph sets and icon systems with a unified voice." },
    { id: "players",     code: "PL", name: "Media Players",                brief: "Audio/video transport, scrubbing, volume UI." },
    { id: "modals",      code: "MO", name: "Modals & Overlays",            brief: "Dialogs, sheets, popovers, overlay patterns." },
    { id: "effects",     code: "EF", name: "Effects & Styles",             brief: "Reusable visual treatments: glass, grain, glow, gradients." }
  ],

  /* ----------------------------------------------------------
     ITEM SCHEMA — every entry in ITEMS follows this shape:

     {
       id:          "BU21",         // unique short id: drawer code + next free number
                                   // (sections carry their code; DesignLab.nextId("buttons")
                                   // returns the next free one)
       section:     "buttons",     // must match a sections.id above
       name:        "",            // 2-4 words
       description: "",            // one line: what makes it structurally distinct
       creator:     "ox-alpha",    // must match a creators.id above
       tags:        [],            // optional search keywords
       tweaks:      [],            // OPTIONAL live controls for personal tweaking. Each:
                                   //   { type:"color", label:"Accent", varName:"--b1-accent", default:"#22d3ee" }
                                   //   { type:"range", label:"Radius", varName:"--b1-radius",
                                   //     min:0, max:40, step:1, unit:"px", default:16 }
                                   // The snippet MUST consume each varName via var(--name, fallback)
                                   // so it looks finished with zero overrides. User adjustments only
                                   // ever affect a personal copy; shared originals stay immutable.
       code:        ""             // self-contained HTML + scoped CSS (a <style>
                                   // block plus markup). Must look finished on a
                                   // dark stage, need no external assets, and be
                                   // safe to paste anywhere.
     }

     EXAMPLE (adapt, do not ship verbatim):

     {
       id: "B1",
       section: "buttons",
       name: "Example Button",
       description: "One line on what makes it structurally distinct.",
       creator: "ox-alpha",
       tags: ["example"],
       code: "<style>\n  .ex-btn { padding: 10px 22px; border-radius: 999px; }\n</style>\n<button class=\"ex-btn\">Press me</button>"
     }

     SEEDED: the 48-specimen Aurora Design Kit export (Imagine Studio,
     extracted 2026-08-22) fills eight drawers below. Grow from there.
     ---------------------------------------------------------- */
  items: [

    /* ---- Seeded: Aurora Design Kit export (Imagine Studio, 2026-08-22). 48 specimens ported verbatim; shared kit CSS inlined per snippet; two motions converted to transform/opacity per the performance law. ---- */

    {
      id: "PL1",
      section: "players",
      name: "Ultra-Slim Studio Capsule",
      description: "Sleek 32px pill player with interactive play/pause toggle and glowing playhead.",
      creator: "gemini",
      tags: ["player","audio","pill","violet","interactive"],
      code: "<style>\n  .kpl1d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n  .kpl1-btn{width:26px;height:26px;border-radius:50%;background:#8b5cf6;border:none;color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .12s ease}\n  .kpl1-btn:active{transform:scale(0.92)}\n  @media (prefers-reduced-motion:reduce){.kpl1-btn{transition:none}}\n</style>\n<div class=\"kpl1d\" style=\"background: rgba(30, 27, 75, 0.6); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 9999px;\">\n<button type=\"button\" class=\"kpl1-btn\" onclick=\"this.textContent=this.textContent==='▶'?'❚❚':'▶'\">▶</button>\n<span style=\"font-size:11px; font-weight:600; color:#c4b5fd; font-variant-numeric:tabular-nums;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:4px; background:rgba(255,255,255,0.15); border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#8b5cf6; border-radius:2px;\"></div>\n<div style=\"position:absolute; left:28%; top:-4px; width:12px; height:12px; border-radius:50%; background:#fff; box-shadow:0 0 6px #8b5cf6; transform:translateX(-50%);\"></div>\n</div>\n<span style=\"font-size:12px; opacity:0.8;\">🔊</span>\n</div>"
    },

    {
      id: "PL2",
      section: "players",
      name: "Hardware Console Deck",
      description: "Tactile gunmetal hardware finish with interactive play toggle and LED level meter.",
      creator: "gemini",
      tags: ["player","hardware","gunmetal","led","interactive"],
      code: "<style>\n  .kpl2d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n  .kpl2-btn{width:26px;height:26px;border-radius:4px;background:#2e3440;border:1px solid #4c566a;color:#88c0d0;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .12s ease}\n  .kpl2-btn:active{transform:scale(0.92)}\n  @media (prefers-reduced-motion:reduce){.kpl2-btn{transition:none}}\n</style>\n<div class=\"kpl2d\" style=\"background: linear-gradient(180deg, #242933 0%, #171a21 100%); border: 1px solid #3b4252; border-bottom: 2px solid #0f1219; border-radius: 6px;\">\n<button type=\"button\" class=\"kpl2-btn\" onclick=\"this.textContent=this.textContent==='▶'?'❚❚':'▶'\">▶</button>\n<span style=\"font-size:11px; font-family:monospace; color:#88c0d0;\">00:04</span>\n<div style=\"flex:1; height:6px; background:#12141a; border-radius:3px; border:1px solid #2e3440; overflow:hidden; position:relative;\">\n<div style=\"width:30%; height:100%; background:linear-gradient(90deg, #a3be8c 0%, #ebcb8b 80%, #bf616a 100%);\"></div>\n</div>\n<span style=\"font-size:11px; font-family:monospace; color:#616e88;\">15.0s</span>\n<span style=\"font-size:11px; color:#88c0d0;\">🎚</span>\n</div>"
    },

    {
      id: "PL3",
      section: "players",
      name: "Floating Cyber Glass",
      description: "Translucent frosted acrylic with electric cyan timeline glow and interactive transport.",
      creator: "gemini",
      tags: ["player","glass","cyan","glow","interactive"],
      code: "<style>\n  .kpl3d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n  .kpl3-btn{width:24px;height:24px;border-radius:50%;background:rgba(56,189,248,0.15);border:1px solid #38bdf8;color:#38bdf8;font-size:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .12s ease}\n  .kpl3-btn:active{transform:scale(0.92)}\n  @media (prefers-reduced-motion:reduce){.kpl3-btn{transition:none}}\n</style>\n<div class=\"kpl3d\" style=\"background: rgba(15, 23, 42, 0.8); border: 1px solid #38bdf8; box-shadow: 0 0 10px rgba(56,189,248,0.2); border-radius: 8px;\">\n<button type=\"button\" class=\"kpl3-btn\" onclick=\"this.textContent=this.textContent==='▶'?'❚❚':'▶'\">▶</button>\n<span style=\"font-size:11px; color:#38bdf8; font-weight:600;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:3px; background:rgba(56,189,248,0.2); border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#38bdf8; box-shadow:0 0 8px #38bdf8;\"></div>\n</div>\n<span style=\"font-size:11px; color:#38bdf8;\">⚡</span>\n</div>"
    },

    {
      id: "PL4",
      section: "players",
      name: "Neomorphic Soft Dock",
      description: "Soft debossed track slot with tactile physical play toggle button.",
      creator: "gemini",
      tags: ["player","neumorphic","soft","indigo","interactive"],
      code: "<style>\n  .kpl4d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n  .kpl4-btn{width:26px;height:26px;border-radius:6px;background:#282e3d;border:1px solid rgba(255,255,255,0.08);color:#f1f5f9;font-size:10px;box-shadow:2px 2px 4px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .12s ease}\n  .kpl4-btn:active{transform:scale(0.92)}\n  @media (prefers-reduced-motion:reduce){.kpl4-btn{transition:none}}\n</style>\n<div class=\"kpl4d\" style=\"background: #1e222d; border: 1px solid rgba(255,255,255,0.06); box-shadow: inset 1px 1px 3px rgba(0,0,0,0.5); border-radius: 8px;\">\n<button type=\"button\" class=\"kpl4-btn\" onclick=\"this.textContent=this.textContent==='▶'?'❚❚':'▶'\">▶</button>\n<span style=\"font-size:11px; color:#e2e8f0; font-weight:500;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:6px; background:#141720; border-radius:3px; box-shadow: inset 1px 1px 2px #000; position:relative;\">\n<div style=\"width:28%; height:100%; background:#6366f1; border-radius:3px;\"></div>\n</div>\n<span style=\"font-size:11px; color:#94a3b8;\">🔊</span>\n</div>"
    },

    {
      id: "PL6",
      section: "players",
      name: "Retro Amber Hi-Fi",
      description: "Vintage studio receiver aesthetic with interactive play toggle and glowing amber display.",
      creator: "gemini",
      tags: ["player","retro","amber","hifi","interactive"],
      code: "<style>\n  .kpl6d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n  .kpl6-btn{width:26px;height:26px;border-radius:50%;background:#78350f;border:1px solid #f59e0b;color:#fbbf24;font-size:10px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform .12s ease}\n  .kpl6-btn:active{transform:scale(0.92)}\n  @media (prefers-reduced-motion:reduce){.kpl6-btn{transition:none}}\n</style>\n<div class=\"kpl6d\" style=\"background: #14120e; border: 1px solid #d97706; border-radius: 6px; box-shadow: 0 0 8px rgba(217,119,6,0.2);\">\n<button type=\"button\" class=\"kpl6-btn\" onclick=\"this.textContent=this.textContent==='▶'?'❚❚':'▶';this.nextElementSibling.textContent=this.textContent==='▶'?'0:04 [PAUSE]':'0:04 [PLAY]'\">▶</button>\n<span style=\"font-size:12px; font-family:monospace; color:#fbbf24; text-shadow:0 0 6px #f59e0b;\">0:04 [PLAY]</span>\n<div style=\"flex:1; height:5px; background:#291e0d; border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#f59e0b; box-shadow:0 0 6px #f59e0b;\"></div>\n</div>\n<span style=\"font-size:11px; color:#fbbf24;\">📻</span>\n</div>"
    },

    {
      id: "IC1",
      section: "icons",
      name: "Hairline Minimal Line Glyphs",
      description: "Ultra-crisp 1.5px monochromatic hairline SVG icons with unified grid voice for minimal toolbars.",
      creator: "gemini",
      tags: ["icon", "svg", "hairline", "minimal", "outline"],
      tweaks: [
        { type: "color", label: "Stroke Color", varName: "--ic1-color", default: "#e2e8f0" }
      ],
      code: "<style>\n  .kic1-row{display:flex;align-items:center;gap:14px;color:var(--ic1-color,#e2e8f0)}\n  .kic1-row svg{width:20px;height:20px}\n</style>\n<div class='kic1-row'>\n  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polygon points='5 3 19 12 5 21 5 3'/></svg>\n  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18V5l12-2v13'/><circle cx='6' cy='18' r='3'/><circle cx='18' cy='16' r='3'/></svg>\n  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='2.18'/><line x1='7' y1='2' x2='7' y2='22'/><line x1='17' y1='2' x2='17' y2='22'/><line x1='2' y1='12' x2='22' y2='12'/></svg>\n  <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'/></svg>\n</div>"
    },

    {
      id: "IC2",
      section: "icons",
      name: "Neon Cyber Dual-Tone",
      description: "Electroluminescent vector iconography with glowing neon outline and ambient diffused backdrop bloom.",
      creator: "gemini",
      tags: ["icon", "neon", "cyber", "glow", "dualtone"],
      tweaks: [
        { type: "color", label: "Neon Glow", varName: "--ic2-glow", default: "#38bdf8" }
      ],
      code: "<style>\n  .kic2-row{display:flex;align-items:center;gap:14px}\n  .kic2-icon{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;background:rgba(56,189,248,0.06);border:1px solid color-mix(in srgb,var(--ic2-glow,#38bdf8) 40%,transparent);color:var(--ic2-glow,#38bdf8);box-shadow:0 0 14px color-mix(in srgb,var(--ic2-glow,#38bdf8) 35%,transparent);transition:transform .15s,box-shadow .15s}\n  .kic2-icon:hover{transform:translateY(-2px);box-shadow:0 0 20px var(--ic2-glow,#38bdf8)}\n  .kic2-icon svg{width:18px;height:18px}\n  @media (prefers-reduced-motion:reduce){.kic2-icon{transition:none}}\n</style>\n<div class='kic2-row'>\n  <div class='kic2-icon'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='5 3 19 12 5 21 5 3'/></svg></div>\n  <div class='kic2-icon'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/></svg></div>\n  <div class='kic2-icon'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg></div>\n  <div class='kic2-icon'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/></svg></div>\n</div>"
    },

    {
      id: "IC3",
      section: "icons",
      name: "Frosted Glass Badge Icons",
      description: "Translucent frosted acrylic rounded tile badges with refractive borders and floating glossy glyphs.",
      creator: "gemini",
      tags: ["icon", "glass", "badge", "frosted", "tile"],
      tweaks: [
        { type: "color", label: "Glass Tint", varName: "--ic3-tint", default: "#c4b5fd" }
      ],
      code: "<style>\n  .kic3-row{display:flex;align-items:center;gap:12px}\n  .kic3-tile{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;color:var(--ic3-tint,#c4b5fd);box-shadow:0 6px 16px rgba(0,0,0,0.4),inset 0 1px 1px rgba(255,255,255,0.3)}\n  .kic3-tile svg{width:18px;height:18px}\n</style>\n<div class='kic3-row'>\n  <div class='kic3-tile'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'/><line x1='4' y1='22' x2='4' y2='15'/></svg></div>\n  <div class='kic3-tile'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg></div>\n  <div class='kic3-tile'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20h9'/><path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'/></svg></div>\n  <div class='kic3-tile'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'/><path d='M13.73 21a2 2 0 0 1-3.46 0'/></svg></div>\n</div>"
    },

    {
      id: "IC4",
      section: "icons",
      name: "Hardware Stamped & Engraved",
      description: "Debossed dark gunmetal chassis with chiseled bevels, recessed inset shadows, and top lighting relief.",
      creator: "gemini",
      tags: ["icon", "hardware", "engraved", "gunmetal", "debossed"],
      tweaks: [
        { type: "color", label: "Bevel Tone", varName: "--ic4-tone", default: "#94a3b8" }
      ],
      code: "<style>\n  .kic4-row{display:flex;align-items:center;gap:12px;background:#141720;padding:8px 12px;border-radius:10px;border:1px solid #232a3b;box-shadow:inset 0 2px 4px rgba(0,0,0,0.8)}\n  .kic4-stamp{width:32px;height:32px;border-radius:6px;background:linear-gradient(180deg,#1c212d 0%,#0f1219 100%);border:1px solid #2b3347;border-bottom:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--ic4-tone,#94a3b8);box-shadow:inset 0 1px 3px rgba(0,0,0,0.9),0 1px 0 rgba(255,255,255,0.08)}\n  .kic4-stamp svg{width:16px;height:16px;filter:drop-shadow(0 1px 0 rgba(255,255,255,0.15)) drop-shadow(0 -1px 0 #000)}\n</style>\n<div class='kic4-row'>\n  <div class='kic4-stamp'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg></div>\n  <div class='kic4-stamp'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><polyline points='14 2 14 8 20 8'/><line x1='16' y1='13' x2='8' y2='13'/><line x1='16' y1='17' x2='8' y2='17'/><polyline points='10 9 9 9 8 9'/></svg></div>\n  <div class='kic4-stamp'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='11' width='18' height='11' rx='2' ry='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/></svg></div>\n  <div class='kic4-stamp'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'/></svg></div>\n</div>"
    },

    {
      id: "IC5",
      section: "icons",
      name: "Sunset Gradient Duotone Vector",
      description: "Warm sunset saturated SVG vectors featuring deep filled silhouettes with crisp highlighted foreground paths.",
      creator: "gemini",
      tags: ["icon", "gradient", "sunset", "warm", "duotone"],
      tweaks: [
        { type: "color", label: "Sunset Primary", varName: "--ic5-primary", default: "#f43f5e" }
      ],
      code: "<style>\n  .kic5-row{display:flex;align-items:center;gap:14px}\n  .kic5-box{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,color-mix(in srgb,var(--ic5-primary,#f43f5e) 25%,transparent),rgba(251,146,60,0.15));border:1px solid color-mix(in srgb,var(--ic5-primary,#f43f5e) 40%,transparent);display:flex;align-items:center;justify-content:center;color:var(--ic5-primary,#f43f5e);box-shadow:0 4px 12px color-mix(in srgb,var(--ic5-primary,#f43f5e) 20%,transparent)}\n  .kic5-box svg{width:20px;height:20px}\n</style>\n<div class='kic5-row'>\n  <div class='kic5-box'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg></div>\n  <div class='kic5-box'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/></svg></div>\n  <div class='kic5-box'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='5'/><line x1='12' y1='1' x2='12' y2='3'/><line x1='12' y1='21' x2='12' y2='23'/><line x1='4.22' y1='4.22' x2='5.64' y2='5.64'/><line x1='18.36' y1='18.36' x2='19.78' y2='19.78'/><line x1='1' y1='12' x2='3' y2='12'/><line x1='21' y1='12' x2='23' y2='12'/><line x1='4.22' y1='19.78' x2='5.64' y2='18.36'/><line x1='18.36' y1='5.64' x2='19.78' y2='4.22'/></svg></div>\n  <div class='kic5-box'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><polyline points='3.27 6.96 12 12.01 20.73 6.96'/><line x1='12' y1='22.08' x2='12' y2='12'/></svg></div>\n</div>"
    },

    {
      id: "IC6",
      section: "icons",
      name: "Emerald Studio Segment Matrix",
      description: "Segmented mint and emerald precision pro audio/video iconography with angular vector cuts.",
      creator: "gemini",
      tags: ["icon", "emerald", "mint", "studio", "matrix"],
      tweaks: [
        { type: "color", label: "Emerald Accent", varName: "--ic6-accent", default: "#10b981" }
      ],
      code: "<style>\n  .kic6-row{display:flex;align-items:center;gap:12px}\n  .kic6-seg{width:34px;height:34px;border-radius:6px;background:#06140d;border:1px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;color:var(--ic6-accent,#10b981);box-shadow:0 0 10px rgba(16,185,129,0.15)}\n  .kic6-seg svg{width:18px;height:18px}\n</style>\n<div class='kic6-row'>\n  <div class='kic6-seg'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='3' width='20' height='14' rx='2' ry='2'/><line x1='8' y1='21' x2='16' y2='21'/><line x1='12' y1='17' x2='12' y2='21'/></svg></div>\n  <div class='kic6-seg'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M23 7l-7 5 7 5V7z'/><rect x='1' y='5' width='15' height='14' rx='2' ry='2'/></svg></div>\n  <div class='kic6-seg'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'/><path d='M19 10v2a7 7 0 0 1-14 0v-2'/><line x1='12' y1='19' x2='12' y2='23'/><line x1='8' y1='23' x2='16' y2='23'/></svg></div>\n  <div class='kic6-seg'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5'/><path d='M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07'/></svg></div>\n</div>"
    },



    {
      id: "BU2",
      section: "buttons",
      name: "Slim Studio Pill",
      description: "Ultra-sleek 30px compact capsule (~25% less space).",
      creator: "gemini",
      tags: ["button","pill","slim","indigo"],
      code: "<button type=\"button\" style=\"background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px; font-weight: 600; font-size: 12px; letter-spacing: 0.02em; padding: 0 16px; height: 30px; box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3); cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU3",
      section: "buttons",
      name: "Neon Cyber Rim",
      description: "Dark glass with electric cyan outline and glow.",
      creator: "gemini",
      tags: ["button","neon","cyan","outline"],
      code: "<button type=\"button\" style=\"background: rgba(15, 23, 42, 0.88); color: #38bdf8; border: 1px solid #38bdf8; border-radius: 8px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; box-shadow: 0 0 12px rgba(56, 189, 248, 0.35); cursor: pointer;\">Generate Media</button>"
    },



    {
      id: "BU10",
      section: "buttons",
      name: "Glow Dot Minimal Capsule",
      description: "Translucent purple pill with glowing active dot.",
      creator: "gemini",
      tags: ["button","pill","dot","translucent"],
      code: "<button type=\"button\" style=\"background: rgba(139, 92, 246, 0.12); color: #c4b5fd; border: 1px solid rgba(139, 92, 246, 0.45); border-radius: 9999px; font-weight: 600; font-size: 12px; padding: 0 16px; height: 32px; display: inline-flex; align-items: center; gap: 7px; cursor: pointer;\"><span style=\"display:inline-block; width:6px; height:6px; border-radius:50%; background:#a855f7; box-shadow:0 0 6px #a855f7;\"></span>Generate Media</button>"
    },

    {
      id: "BU12",
      section: "buttons",
      name: "Circle FAB",
      description: "Floating action button — 56px circle with soft lift shadow. One icon, one job.",
      creator: "ox-alpha",
      tags: ["button","fab","circle","floating"],
      code: "<style>\n  .kbu12:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu12\" style=\"width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#8b5cf6,#6366f1); color:#fff; font-size:28px; font-weight:300; line-height:1; border:none; cursor:pointer; box-shadow:0 8px 20px rgba(139,92,246,.45);\">+</button>"
    },

    {
      id: "BU13",
      section: "buttons",
      name: "Skewed Slant",
      description: "Parallelogram via skewX — italic geometry without an italic font.",
      creator: "ox-alpha",
      tags: ["button","skew","parallelogram","italic"],
      code: "<style>\n  .kbu13:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu13\" style=\"transform:skewX(-14deg); background:#f43f5e; color:#fff; border:none; padding:13px 30px; font-weight:800; font-size:13px; letter-spacing:.1em; cursor:pointer; box-shadow:0 4px 14px rgba(244,63,94,.4);\"><span style=\"display:inline-block; transform:skewX(14deg);\">RENDER</span></button>"
    },



    {
      id: "BU16",
      section: "buttons",
      name: "Leaf / Petal Play",
      description: "One sharp corner, three round — rotated petal with a counter-rotated play glyph.",
      creator: "ox-alpha",
      tags: ["button","leaf","petal","rotated"],
      code: "<style>\n  .kbu16:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu16\" style=\"width:48px; height:48px; border:none; background:linear-gradient(135deg,#10b981,#059669); border-radius:4px 50% 50% 50%; transform:rotate(-45deg); cursor:pointer; box-shadow:0 6px 16px rgba(16,185,129,.4);\"><span style=\"display:inline-flex; align-items:center; justify-content:center; width:100%; height:100%; transform:rotate(45deg); color:#fff; font-size:18px;\">▶</span></button>"
    },



    {
      id: "BU20",
      section: "buttons",
      name: "Underline Ghost",
      description: "No button at all — just text whose gradient underline grows on hover. Quietest action in the room.",
      creator: "ox-alpha",
      tags: ["button","ghost","underline","text"],
      code: "<style>\n  .kbu20g{background:none;border:none;color:#e2e8f0;font-weight:600;font-size:13px;cursor:pointer;padding:6px 2px;position:relative;letter-spacing:.03em}\n  .kbu20g::after{content:\"\";position:absolute;left:0;bottom:0;height:2px;width:100%;background:linear-gradient(90deg,#8b5cf6,#38bdf8);transform:scaleX(.3);transform-origin:left;transition:transform .22s ease}\n  .kbu20g:hover::after{transform:scaleX(1)}\n</style>\n<button type=\"button\" class=\"kbu20g\">Save to Library</button>"
    },

    {
      id: "NA1",
      section: "navigation",
      name: "Segmented Control",
      description: "Interactive capsule segmented switcher where clicking moves the active illuminated pill.",
      creator: "ox-alpha",
      tags: ["navigation","segmented","tabs","capsule","interactive"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--na1-accent", default: "#7c3aed" }
      ],
      code: "<style>\n  .kna1-seg{display:inline-flex;max-width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:9999px;padding:3px;gap:2px}\n  .kna1-btn{padding:5px 12px;font-size:11px;font-weight:600;color:#94a3b8;border:none;background:transparent;border-radius:9999px;cursor:pointer;user-select:none;transition:background .18s ease,color .18s ease}\n  .kna1-btn:hover{color:#e2e8f0}\n  .kna1-btn.active{color:#fff;background:linear-gradient(135deg,var(--na1-accent,#7c3aed),#4f46e5);font-weight:700;box-shadow:0 2px 8px rgba(124,58,237,.35)}\n  @media (prefers-reduced-motion:reduce){.kna1-btn{transition:none}}\n</style>\n<div class=\"kna1-seg\">\n  <button type=\"button\" class=\"kna1-btn\" onclick=\"this.parentElement.querySelectorAll('.kna1-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">Draft</button>\n  <button type=\"button\" class=\"kna1-btn active\" onclick=\"this.parentElement.querySelectorAll('.kna1-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">Render</button>\n  <button type=\"button\" class=\"kna1-btn\" onclick=\"this.parentElement.querySelectorAll('.kna1-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">Export</button>\n</div>"
    },

    {
      id: "BA1",
      section: "badges",
      name: "Diamond Badge",
      description: "Rotated squircle — reads as a gem/achievement rather than an action rectangle.",
      creator: "ox-alpha",
      tags: ["badge","diamond","achievement","gem"],
      code: "<style>\n  .kba1:hover{filter:brightness(1.18)}\n</style>\n<span class=\"kba1\" style=\"display:inline-block; width:52px; height:52px; transform:rotate(45deg); background:linear-gradient(135deg,#38bdf8,#6366f1); border-radius:10px; cursor:pointer; box-shadow:0 6px 16px rgba(56,189,248,.35);\"><span style=\"display:flex; align-items:center; justify-content:center; width:100%; height:100%; transform:rotate(-45deg); color:#fff; font-size:19px;\">✦</span></span>"
    },

    {
      id: "IC7",
      section: "icons",
      name: "Hairline Vector Stroke",
      description: "True 1.6px SVG strokes — infinitely crisp at any size, recolorable with one CSS variable. The professional default.",
      creator: "ox-alpha",
      tags: ["icon","svg","stroke","hairline"],
      code: "<span style=\"display:flex; align-items:center; color:#e2e8f0; flex-wrap:wrap; gap:0;\"><span title=\"play\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 5v14l12-7z\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"film\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"image\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"2\"/><path d=\"M21 16l-5-5-6 6-2-2-5 5\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"sliders\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h9M17 7h3M13 4v6M4 17h3M11 17h9M7 14v6\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"spark\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"save\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z\"/><path d=\"M7 21v-7h10v7M8 3v4h6\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"trash\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7\"/></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"mic\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0 0 14 0M12 18v3\"/></svg></span></span>"
    },

    {
      id: "IC9",
      section: "icons",
      name: "Pixel Blocks",
      description: "Retro 5×5 pixel-grid icons built from pure CSS cells — playful 8-bit personality for easter eggs and empty states.",
      creator: "ox-alpha",
      tags: ["icon","pixel","retro","8bit"],
      code: "<style>\n  .kic9i i{display:block}\n</style>\n<span style=\"display:flex; align-items:center; gap:18px;\">\n<span class=\"kic9i\" style=\"display:inline-grid; grid-template-columns:repeat(5,4px); grid-auto-rows:4px; gap:1px;\"><i style=\"background:#a78bfa;\"></i><i></i><i></i><i></i><i></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i></i><i></i><i></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i></i><i></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i style=\"background:#a78bfa;\"></i><i></i><i></i></span><span class=\"kic9i\" style=\"display:inline-grid; grid-template-columns:repeat(5,4px); grid-auto-rows:4px; gap:1px;\"><i></i><i></i><i style=\"background:#fbbf24;\"></i><i></i><i></i><i></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i style=\"background:#fbbf24;\"></i><i></i><i style=\"background:#fbbf24;\"></i><i></i><i style=\"background:#fbbf24;\"></i><i></i><i style=\"background:#fbbf24;\"></i></span><span class=\"kic9i\" style=\"display:inline-grid; grid-template-columns:repeat(5,4px); grid-auto-rows:4px; gap:1px;\"><i></i><i style=\"background:#fb7185;\"></i><i></i><i style=\"background:#fb7185;\"></i><i></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i style=\"background:#fb7185;\"></i><i></i><i></i><i></i><i style=\"background:#fb7185;\"></i><i></i><i></i></span><span class=\"kic9i\" style=\"display:inline-grid; grid-template-columns:repeat(5,4px); grid-auto-rows:4px; gap:1px;\"><i></i><i></i><i style=\"background:#34d399;\"></i><i></i><i></i><i></i><i></i><i style=\"background:#34d399;\"></i><i></i><i></i><i style=\"background:#34d399;\"></i><i style=\"background:#34d399;\"></i><i style=\"background:#34d399;\"></i><i style=\"background:#34d399;\"></i><i style=\"background:#34d399;\"></i><i></i><i></i><i style=\"background:#34d399;\"></i><i></i><i></i><i></i><i></i><i style=\"background:#34d399;\"></i><i></i><i></i></span>\n</span>"
    },

    {
      id: "IC10",
      section: "icons",
      name: "Terminal ASCII",
      description: "Monospace text-glyph icons — hacker/phosphor aesthetic. Zero assets, perfect baseline alignment.",
      creator: "ox-alpha",
      tags: ["icon","ascii","terminal","mono"],
      code: "<span style=\"font-family:'Cascadia Mono',Consolas,monospace; font-size:13px; color:#4ade80; letter-spacing:6px; white-space:nowrap;\">[&gt;] &lt;/&gt; [img] [~] [*] [x] [^] $_</span>"
    },

    {
      id: "IC11",
      section: "icons",
      name: "Gradient Squircle Badges",
      description: "White vector glyphs inside colored superellipse badges — app-icon treatment, each tool gets its own hue.",
      creator: "ox-alpha",
      tags: ["icon","squircle","app-badge","gradient"],
      code: "<span style=\"display:flex; align-items:center; flex-wrap:wrap; gap:10px;\"><span title=\"play\" style=\"display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:30%; background:linear-gradient(135deg,#f43f5e,#f97316); color:#fff; box-shadow:0 3px 10px #f43f5e55;\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 5v14l12-7z\"/></svg></span><span title=\"film\" style=\"display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:30%; background:linear-gradient(135deg,#8b5cf6,#6366f1); color:#fff; box-shadow:0 3px 10px #8b5cf655;\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4\"/></svg></span><span title=\"image\" style=\"display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:30%; background:linear-gradient(135deg,#06b6d4,#3b82f6); color:#fff; box-shadow:0 3px 10px #06b6d455;\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"2\"/><path d=\"M21 16l-5-5-6 6-2-2-5 5\"/></svg></span><span title=\"sliders\" style=\"display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:30%; background:linear-gradient(135deg,#10b981,#059669); color:#fff; box-shadow:0 3px 10px #10b98155;\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h9M17 7h3M13 4v6M4 17h3M11 17h9M7 14v6\"/></svg></span><span title=\"spark\" style=\"display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:30%; background:linear-gradient(135deg,#eab308,#f97316); color:#fff; box-shadow:0 3px 10px #eab30855;\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z\"/></svg></span></span>"
    },

    {
      id: "AN1",
      section: "animations",
      name: "Animated Micro Icons",
      description: "Living glyphs — recording pulse, render spinner, EQ bars, breathing sparkle. State you can feel at a glance.",
      creator: "ox-alpha",
      tags: ["micro-interaction","animated","state","living-glyph"],
      code: "<style>\n  @keyframes kan1kf-spin{to{transform:rotate(360deg)}}\n  @keyframes kan1kf-eq{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}\n  @keyframes kan1kf-bl{50%{opacity:0}}\n  @keyframes kan1kf-brz{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}\n  @keyframes kan1kf-ring{0%{transform:scale(.55);opacity:.8}75%,100%{transform:scale(1.9);opacity:0}}\n  .kan1s{width:20px;height:20px;border-radius:50%;border:3px solid rgba(139,92,246,.2);border-top-color:#a78bfa;animation:kan1kf-spin .9s linear infinite}\n  .kan1e{width:4px;height:20px;border-radius:2px;background:linear-gradient(180deg,#a78bfa,#38bdf8);transform-origin:center;animation:kan1kf-eq 1s ease-in-out infinite}\n  .kan1bl{animation:kan1kf-bl 1.1s steps(1) infinite}\n  .kan1br{animation:kan1kf-brz 2s ease-in-out infinite;display:inline-block}\n  .kan1r{position:relative;width:14px;height:14px;border-radius:50%;background:#f43f5e}\n  .kan1r::after{content:\"\";position:absolute;inset:0;border-radius:50%;border:2px solid #f43f5e;animation:kan1kf-ring 1.6s ease-out infinite}\n  @media (prefers-reduced-motion:reduce){.kan1s,.kan1e,.kan1bl,.kan1br{animation:none}.kan1r::after{animation:none;content:none}}\n</style>\n<span style=\"display:flex; align-items:center; gap:22px;\">\n<span class=\"kan1r\" title=\"recording\"></span>\n<span class=\"kan1s\" title=\"rendering\"></span>\n<span style=\"display:inline-flex; align-items:center; gap:3px; height:22px;\"><i class=\"kan1e\" style=\"animation-delay:0s;\"></i><i class=\"kan1e\" style=\"animation-delay:.18s;\"></i><i class=\"kan1e\" style=\"animation-delay:.36s;\"></i></span>\n<span class=\"kan1br\" style=\"color:#c4b5fd; font-size:17px;\" title=\"thinking\">✦</span>\n<span class=\"kan1bl\" style=\"font-family:monospace; color:#4ade80; font-size:14px;\" title=\"busy\">▮</span>\n</span>"
    },

    {
      id: "TO1",
      section: "toggles",
      name: "Classic Pill Switch",
      description: "iOS-style track + knob, interactive clickable toggle with smooth slide state.",
      creator: "ox-alpha",
      tags: ["switch","ios","pill","on-state","interactive"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--to1-accent", default: "#8b5cf6" }
      ],
      code: "<style>\n  .kto1-lbl{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto1-in{position:absolute;opacity:0;pointer-events:none}\n  .kto1-track{display:inline-block;width:46px;height:26px;border-radius:9999px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.1);position:relative;box-shadow:inset 0 1px 3px rgba(0,0,0,.4);transition:background .2s ease}\n  .kto1-knob{position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#cbd5e1;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:transform .2s cubic-bezier(.2,1,.3,1),background .2s ease}\n  .kto1-txt{font-size:12px;color:#94a3b8;font-weight:600;transition:color .2s ease}\n  .kto1-in:checked + .kto1-track{background:linear-gradient(135deg,var(--to1-accent,#8b5cf6),#6366f1);border-color:transparent}\n  .kto1-in:checked + .kto1-track .kto1-knob{transform:translateX(20px);background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.4)}\n  .kto1-in:checked ~ .kto1-txt{color:#c4b5fd}\n  @media (prefers-reduced-motion:reduce){.kto1-track,.kto1-knob{transition:none}}\n</style>\n<label class=\"kto1-lbl\">\n  <input type=\"checkbox\" class=\"kto1-in\" checked onchange=\"this.nextElementSibling.nextElementSibling.textContent=this.checked?'Face lock · ON':'Face lock · OFF'\">\n  <span class=\"kto1-track\"><i class=\"kto1-knob\"></i></span>\n  <span class=\"kto1-txt\">Face lock · ON</span>\n</label>"
    },

    {
      id: "TO2",
      section: "toggles",
      name: "Neon Glow Switch",
      description: "Interactive switch where clicking turns on/off the electric cyan halo and glowing core.",
      creator: "ox-alpha",
      tags: ["switch","neon","glow","interactive"],
      tweaks: [
        { type: "color", label: "Neon Color", varName: "--to2-neon", default: "#38bdf8" }
      ],
      code: "<style>\n  .kto2-lbl{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto2-in{position:absolute;opacity:0;pointer-events:none}\n  .kto2-track{display:inline-block;width:46px;height:26px;border-radius:9999px;background:#0f172a;border:1px solid rgba(56,189,248,.35);box-shadow:inset 0 0 6px rgba(56,189,248,.15);position:relative;transition:box-shadow .2s ease,border-color .2s ease}\n  .kto2-knob{position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#38bdf8;box-shadow:0 0 4px #38bdf8;transition:transform .2s cubic-bezier(.2,1,.3,1),box-shadow .2s ease}\n  .kto2-txt{font-size:12px;color:#64748b;font-weight:600;transition:color .2s ease}\n  .kto2-in:checked + .kto2-track{border-color:var(--to2-neon,#38bdf8);box-shadow:0 0 12px color-mix(in srgb,var(--to2-neon,#38bdf8) 60%,transparent),inset 0 0 8px color-mix(in srgb,var(--to2-neon,#38bdf8) 30%,transparent)}\n  .kto2-in:checked + .kto2-track .kto2-knob{transform:translateX(20px);box-shadow:0 0 10px var(--to2-neon,#38bdf8),0 0 18px var(--to2-neon,#38bdf8)}\n  .kto2-in:checked ~ .kto2-txt{color:#38bdf8}\n  @media (prefers-reduced-motion:reduce){.kto2-track,.kto2-knob{transition:none}}\n</style>\n<label class=\"kto2-lbl\">\n  <input type=\"checkbox\" class=\"kto2-in\" onchange=\"this.nextElementSibling.nextElementSibling.textContent=this.checked?'Upscale · ON':'Upscale · OFF'\">\n  <span class=\"kto2-track\"><i class=\"kto2-knob\"></i></span>\n  <span class=\"kto2-txt\">Upscale · OFF</span>\n</label>"
    },

    {
      id: "TO3",
      section: "toggles",
      name: "Industrial Square Toggle",
      description: "Tactile gunmetal rocker switch with illuminated LED status pip on click.",
      creator: "ox-alpha",
      tags: ["switch","industrial","rocker","led","interactive"],
      tweaks: [
        { type: "color", label: "LED Color", varName: "--to3-led", default: "#a3be8c" }
      ],
      code: "<style>\n  .kto3-lbl{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto3-in{position:absolute;opacity:0;pointer-events:none}\n  .kto3-track{display:inline-block;width:48px;height:26px;background:linear-gradient(180deg,#2d3342,#171a21);border:1px solid #4c566a;border-radius:5px;position:relative;padding:3px}\n  .kto3-rocker{display:block;width:20px;height:18px;background:linear-gradient(180deg,#4c566a,#3b4252);border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,.5);transition:transform .18s ease,background .18s ease}\n  .kto3-led{position:absolute;left:6px;bottom:-8px;width:5px;height:5px;border-radius:50%;background:#4c566a;transition:background .18s ease,box-shadow .18s ease}\n  .kto3-txt{font-size:12px;color:#64748b;font-family:monospace;font-weight:700}\n  .kto3-in:checked + .kto3-track .kto3-rocker{transform:translateX(20px);background:linear-gradient(180deg,#88c0d0,#5e81ac)}\n  .kto3-in:checked + .kto3-track .kto3-led{background:var(--to3-led,#a3be8c);box-shadow:0 0 8px var(--to3-led,#a3be8c)}\n  .kto3-in:checked ~ .kto3-txt{color:#88c0d0}\n  @media (prefers-reduced-motion:reduce){.kto3-rocker{transition:none}}\n</style>\n<label class=\"kto3-lbl\">\n  <input type=\"checkbox\" class=\"kto3-in\" checked onchange=\"this.nextElementSibling.nextElementSibling.textContent=this.checked?'CHAIN [ON]':'CHAIN [OFF]'\">\n  <span class=\"kto3-track\"><span class=\"kto3-rocker\"></span><i class=\"kto3-led\"></i></span>\n  <span class=\"kto3-txt\">CHAIN [ON]</span>\n</label>"
    },

    {
      id: "SL1",
      section: "sliders",
      name: "Progress Ring",
      description: "SVG ring gauge — job progress that beats a flat bar for round cards and avatars.",
      creator: "ox-alpha",
      tags: ["progress","ring","svg","gauge"],
      code: "<span style=\"display:inline-flex; align-items:center; gap:12px;\"><svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\"><circle cx=\"26\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"rgba(255,255,255,.1)\" stroke-width=\"5\"/><circle cx=\"26\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#8b5cf6\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-dasharray=\"125.7\" stroke-dashoffset=\"44.0\" transform=\"rotate(-90 26 26)\"/><text x=\"26\" y=\"31\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-size=\"13\" font-weight=\"700\">65%</text></svg><span style=\"font-size:12px; color:#94a3b8;\">Rendering beat 3/5…</span></span>"
    },

    {
      id: "SL2",
      section: "sliders",
      name: "Intensity LED Dots",
      description: "Ten-dot intensity meter — heat climbs toward red. For Director/Action intensity pickers.",
      creator: "ox-alpha",
      tags: ["meter","led","intensity","dots"],
      code: "<span style=\"display:inline-flex; align-items:center; gap:5px;\"><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#34d399; box-shadow:0 0 6px #34d399;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#34d399; box-shadow:0 0 6px #34d399;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#34d399; box-shadow:0 0 6px #34d399;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#34d399; box-shadow:0 0 6px #34d399;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#fbbf24; box-shadow:0 0 6px #fbbf24;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#fbbf24; box-shadow:0 0 6px #fbbf24;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:#fbbf24; box-shadow:0 0 6px #fbbf24;\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.12);\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.12);\"></i><i style=\"display:inline-block; width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,.12);\"></i></span>"
    },

    {
      id: "TO4",
      section: "toggles",
      name: "Chip Toggle Group",
      description: "Interactive quality selector chips with raised selected glow state on click.",
      creator: "ox-alpha",
      tags: ["chips","selector","segmented","quality","interactive"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--to4-accent", default: "#8b5cf6" }
      ],
      code: "<style>\n  .kto4-group{display:inline-flex;gap:6px;flex-wrap:wrap}\n  .kto4-chip{padding:6px 12px;font-size:11.5px;font-weight:600;border-radius:6px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#94a3b8;cursor:pointer;user-select:none;transition:background .15s ease,color .15s ease,border-color .15s ease}\n  .kto4-chip:hover{background:rgba(255,255,255,.09);color:#e2e8f0}\n  .kto4-chip.active{background:rgba(139,92,246,.2);border-color:var(--to4-accent,#8b5cf6);color:#ddd6fe;font-weight:700;box-shadow:0 0 10px rgba(139,92,246,.25)}\n  @media (prefers-reduced-motion:reduce){.kto4-chip{transition:none}}\n</style>\n<div class=\"kto4-group\">\n  <button type=\"button\" class=\"kto4-chip\" onclick=\"this.parentElement.querySelectorAll('.kto4-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')\">Draft</button>\n  <button type=\"button\" class=\"kto4-chip active\" onclick=\"this.parentElement.querySelectorAll('.kto4-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')\">HD ✓</button>\n  <button type=\"button\" class=\"kto4-chip\" onclick=\"this.parentElement.querySelectorAll('.kto4-chip').forEach(c=>c.classList.remove('active'));this.classList.add('active')\">Ultra</button>\n</div>"
    },

    {
      id: "TO5",
      section: "toggles",
      name: "Slide Switch",
      description: "Interactive horizontally sliding binary toggle with smooth thumb transition.",
      creator: "nemotron",
      tags: ["toggle","switch","slide","binary","interactive"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--to5-accent", default: "#f97316" }
      ],
      code: "<style>\n  .kto5-wrap{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto5-in{position:absolute;opacity:0;pointer-events:none}\n  .kto5-track{position:relative;width:52px;height:28px;background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid rgba(255,255,255,.12);border-radius:9999px;transition:border-color .2s ease,box-shadow .2s ease}\n  .kto5-knob{position:absolute;top:3px;left:3px;width:20px;height:20px;background:#ffffff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.5);transition:transform .2s cubic-bezier(.2,1,.3,1),background .2s ease}\n  .kto5-txt{font-size:12px;color:#94a3b8;font-weight:600}\n  .kto5-in:checked + .kto5-track{border-color:var(--to5-accent,#f97316);box-shadow:0 0 10px color-mix(in srgb,var(--to5-accent,#f97316) 35%,transparent)}\n  .kto5-in:checked + .kto5-track .kto5-knob{transform:translateX(24px);background:var(--to5-accent,#f97316);box-shadow:0 0 8px var(--to5-accent,#f97316)}\n  .kto5-in:checked ~ .kto5-txt{color:#f8fafc}\n  @media (prefers-reduced-motion:reduce){.kto5-knob{transition:none}}\n</style>\n<label class=\"kto5-wrap\">\n  <input type=\"checkbox\" class=\"kto5-in\" onchange=\"this.nextElementSibling.nextElementSibling.textContent=this.checked?'Active · ON':'Muted · OFF'\">\n  <span class=\"kto5-track\"><i class=\"kto5-knob\"></i></span>\n  <span class=\"kto5-txt\">Muted · OFF</span>\n</label>"
    },

    {
      id: "SL3",
      section: "sliders",
      name: "Glow-Thumb Slider",
      description: "Range slider with a halo thumb and gradient fill up to the handle — drag it, it's live.",
      creator: "ox-alpha",
      tags: ["slider","range","glow","thumb"],
      code: "<style>\n  .ksl3r{-webkit-appearance:none;appearance:none;width:190px;height:5px;border-radius:3px;background:linear-gradient(90deg,#8b5cf6 65%,rgba(255,255,255,.14) 65%);outline:none;cursor:pointer}\n  .ksl3r::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #8b5cf6;box-shadow:0 0 8px rgba(139,92,246,.8)}\n</style>\n<input type=\"range\" class=\"ksl3r\" min=\"0\" max=\"100\" value=\"65\" style=\"accent-color:#8b5cf6;\">"
    },

    {
      id: "BA2",
      section: "badges",
      name: "Status Pills",
      description: "Queue-state vocabulary as pills — queued / rendering / done, each with its own signal.",
      creator: "ox-alpha",
      tags: ["status","pills","queue","states"],
      code: "<style>\n  @keyframes kba2kf-br{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}\n  .kba2br{animation:kba2kf-br 2s ease-in-out infinite;display:inline-block}\n  @media (prefers-reduced-motion:reduce){.kba2br{animation:none}}\n</style>\n<span style=\"display:inline-flex; align-items:center; gap:5px; flex-wrap:nowrap; max-width:100%; white-space:nowrap;\"><span style=\"display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:9999px; font-size:10px; font-weight:700; background:rgba(251,191,36,.12); border:1px solid rgba(251,191,36,.4); color:#fcd34d;\"><i style=\"width:6px; height:6px; border-radius:50%; background:#fbbf24;\"></i>QUEUED</span><span style=\"display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:9999px; font-size:10px; font-weight:700; background:rgba(56,189,248,.12); border:1px solid rgba(56,189,248,.4); color:#7dd3fc;\"><i class=\"kba2br\" style=\"width:6px; height:6px; border-radius:50%; background:#38bdf8;\"></i>RENDERING</span><span style=\"display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border-radius:9999px; font-size:10px; font-weight:700; background:rgba(52,211,153,.12); border:1px solid rgba(52,211,153,.4); color:#6ee7b7;\"><i style=\"width:6px; height:6px; border-radius:50%; background:#34d399;\"></i>DONE</span></span>"
    },

    /* ---- Gemini Drawer Expansions: Forms, Loaders, Alerts, Cards, Navigation, Modals, Effects ---- */

    {
      id: "FO1",
      section: "forms",
      name: "Floating Label Cyber Input",
      description: "Neon cyan outline glass input with smooth floating label elevation.",
      creator: "gemini",
      tags: ["form","input","cyber","neon","glass"],
      code: "<style>\n  .kfo1-wrap{position:relative;width:min(100%,190px);margin:0 auto}\n  .kfo1-in{width:100%;background:rgba(15,23,42,0.85);border:1px solid #38bdf8;border-radius:8px;padding:15px 10px 5px;color:#f8fafc;font-size:11.5px;outline:none;box-shadow:0 0 10px rgba(56,189,248,0.2)}\n  .kfo1-lbl{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:11px;color:#38bdf8;pointer-events:none;transition:transform 0.18s ease,opacity 0.18s ease}\n  .kfo1-in:focus + .kfo1-lbl, .kfo1-in:not(:placeholder-shown) + .kfo1-lbl{transform:translateY(-15px) scale(0.82);transform-origin:left;opacity:0.85}\n  @media (prefers-reduced-motion:reduce){.kfo1-lbl{transition:none}}\n</style>\n<div class=\"kfo1-wrap\">\n  <input class=\"kfo1-in\" placeholder=\" \" type=\"text\" value=\"prompt://v2.cyber\">\n  <label class=\"kfo1-lbl\">Model Endpoint</label>\n</div>"
    },

    {
      id: "FO2",
      section: "forms",
      name: "Gunmetal Hardware Stepper",
      description: "Chiseled hardware console number stepper with tactile +/- triggers.",
      creator: "gemini",
      tags: ["form","stepper","hardware","gunmetal","number"],
      code: "<style>\n  .kfo2-wrap{display:inline-flex;align-items:center;background:linear-gradient(180deg,#242933,#171a21);border:1px solid #3b4252;border-radius:6px;padding:3px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5)}\n  .kfo2-btn{width:24px;height:24px;border-radius:4px;background:#2e3440;border:1px solid #4c566a;color:#88c0d0;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none}\n  .kfo2-btn:hover{filter:brightness(1.2)}\n  .kfo2-val{width:42px;text-align:center;font-family:monospace;font-size:12px;font-weight:600;color:#88c0d0;background:transparent;border:none;outline:none}\n</style>\n<div class=\"kfo2-wrap\">\n  <button type=\"button\" class=\"kfo2-btn\">−</button>\n  <input class=\"kfo2-val\" type=\"text\" value=\"0.75\" readonly>\n  <button type=\"button\" class=\"kfo2-btn\">+</button>\n</div>"
    },

    {
      id: "FO3",
      section: "forms",
      name: "Tag Chip Pill Input",
      description: "Compact capsule input with embedded removable gradient pill chips.",
      creator: "gemini",
      tags: ["form","tags","chips","pill","input"],
      code: "<style>\n  .kfo3-box{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:9999px;padding:3px 8px;width:min(100%,185px)}\n  .kfo3-chip{display:inline-flex;align-items:center;gap:3px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:9999px;white-space:nowrap}\n  .kfo3-in{flex:1;background:transparent;border:none;outline:none;color:#e2e8f0;font-size:11px;min-width:35px}\n</style>\n<div class=\"kfo3-box\">\n  <span class=\"kfo3-chip\">Sci-Fi <i style=\"cursor:pointer;font-style:normal;opacity:0.7\">✕</i></span>\n  <input class=\"kfo3-in\" type=\"text\" placeholder=\"Add…\">\n</div>"
    },

    {
      id: "FO4",
      section: "forms",
      name: "Segmented Studio Dropdown",
      description: "Deep violet glass select with custom illuminated chevron indicator.",
      creator: "gemini",
      tags: ["form","select","dropdown","violet","glass"],
      code: "<style>\n  .kfo4-sel{background:linear-gradient(135deg,rgba(30,27,75,0.8),rgba(15,23,42,0.9));border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:#c4b5fd;font-size:11.5px;font-weight:600;padding:7px 26px 7px 10px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a78bfa' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 8px center;box-shadow:0 0 10px rgba(139,92,246,0.25);width:min(100%,185px)}\n</style>\n<select class=\"kfo4-sel\">\n  <option>4K Ultra Render (Pro)</option>\n  <option>1080p Studio Preview</option>\n  <option>720p Fast Draft</option>\n</select>"
    },

    {
      id: "FO5",
      section: "forms",
      name: "Range Preview Input",
      description: "Number input with live gradient fill visualizing the numeric value range.",
      creator: "nemotron",
      tags: ["form","input","range","visual"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--kfo5-color", default: "#f97316" }
      ],
      code: "<style>\n  .kfo5-card{width:210px;background:#141720;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 12px;box-shadow:0 8px 20px rgba(0,0,0,0.5)}\n  .kfo5-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}\n  .kfo5-lbl{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#94a3b8}\n  .kfo5-badge{font-size:10px;font-weight:700;color:var(--kfo5-color,#f97316);background:color-mix(in srgb,var(--kfo5-color,#f97316) 15%,transparent);padding:2px 6px;border-radius:4px}\n  .kfo5-row{display:flex;align-items:center;gap:8px}\n  .kfo5-in{width:100%;box-sizing:border-box;background:#0d0f14;border:1px solid rgba(255,255,255,0.14);border-radius:6px;padding:6px 10px;color:#f8fafc;font-size:14px;font-weight:700;outline:none;font-family:monospace;transition:border-color .15s ease}\n  .kfo5-in:focus{border-color:var(--kfo5-color,#f97316);box-shadow:0 0 10px color-mix(in srgb,var(--kfo5-color,#f97316) 35%,transparent)}\n  .kfo5-meter{position:relative;height:5px;background:rgba(255,255,255,0.08);border-radius:3px;margin-top:8px;overflow:hidden}\n  .kfo5-fill{height:100%;width:72%;background:linear-gradient(90deg,var(--kfo5-color,#f97316),#fb923c);border-radius:3px;box-shadow:0 0 8px var(--kfo5-color,#f97316)}\n  @media (prefers-reduced-motion:reduce){.kfo5-in{transition:none}}\n</style>\n<div class=\"kfo5-card\">\n  <div class=\"kfo5-head\">\n    <span class=\"kfo5-lbl\">Render Quality</span>\n    <span class=\"kfo5-badge\">72%</span>\n  </div>\n  <div class=\"kfo5-row\">\n    <input class=\"kfo5-in\" type=\"number\" value=\"72\" min=\"0\" max=\"100\">\n  </div>\n  <div class=\"kfo5-meter\">\n    <div class=\"kfo5-fill\"></div>\n  </div>\n</div>"
    },

    {
      id: "LO1",
      section: "loaders",
      name: "Aurora Wave Shimmer",
      description: "Fluid dual-glow shimmer wave across structured skeleton placeholders.",
      creator: "gemini",
      tags: ["loader","skeleton","shimmer","aurora","wave"],
      code: "<style>\n  @keyframes klo1-shim{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}\n  .klo1-card{width:200px;padding:10px;border-radius:10px;background:#141720;border:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;gap:8px}\n  .klo1-bar{position:relative;overflow:hidden;background:rgba(255,255,255,0.06);border-radius:4px}\n  .klo1-bar::after{content:\"\";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(168,85,247,0.25),rgba(56,189,248,0.25),transparent);animation:klo1-shim 1.6s infinite}\n  @media (prefers-reduced-motion:reduce){.klo1-bar::after{animation:none}}\n</style>\n<div class=\"klo1-card\">\n  <div class=\"klo1-bar\" style=\"height:12px;width:55%\"></div>\n  <div class=\"klo1-bar\" style=\"height:7px;width:100%\"></div>\n  <div class=\"klo1-bar\" style=\"height:7px;width:75%\"></div>\n</div>"
    },

    {
      id: "LO2",
      section: "loaders",
      name: "Orbit Ring Particle Spinner",
      description: "Dual-tone orbital ring with glowing core center pip.",
      creator: "gemini",
      tags: ["loader","spinner","ring","orbit","glow"],
      code: "<style>\n  @keyframes klo2-rot{to{transform:rotate(360deg)}}\n  .klo2-wrap{position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center}\n  .klo2-ring{position:absolute;inset:0;border-radius:50%;border:2px solid transparent;border-top-color:#38bdf8;border-right-color:#818cf8;animation:klo2-rot 0.9s cubic-bezier(0.4,0,0.2,1) infinite;box-shadow:0 0 10px rgba(56,189,248,0.3)}\n  .klo2-dot{width:7px;height:7px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}\n  @media (prefers-reduced-motion:reduce){.klo2-ring{animation:none}}\n</style>\n<div class=\"klo2-wrap\">\n  <div class=\"klo2-ring\"></div>\n  <div class=\"klo2-dot\"></div>\n</div>"
    },

    {
      id: "LO3",
      section: "loaders",
      name: "Terminal Phosphor Pulse",
      description: "Hacker-style green phosphor block cadence for AI synthesis states.",
      creator: "gemini",
      tags: ["loader","terminal","phosphor","green","retro"],
      code: "<style>\n  @keyframes klo3-pulse{0%,100%{opacity:0.25}50%{opacity:1}}\n  .klo3-box{display:flex;align-items:center;gap:5px;background:#051408;border:1px solid #22c55e;border-radius:4px;padding:6px 10px;font-family:monospace;font-size:11px;color:#4ade80}\n  .klo3-seg{width:7px;height:11px;background:#22c55e;border-radius:1px}\n  .klo3-seg:nth-child(1){animation:klo3-pulse 1.2s infinite 0s}\n  .klo3-seg:nth-child(2){animation:klo3-pulse 1.2s infinite 0.2s}\n  .klo3-seg:nth-child(3){animation:klo3-pulse 1.2s infinite 0.4s}\n  .klo3-seg:nth-child(4){animation:klo3-pulse 1.2s infinite 0.6s}\n  @media (prefers-reduced-motion:reduce){.klo3-seg{animation:none}}\n</style>\n<div class=\"klo3-box\">\n  <span>SYNTHESIZING</span>\n  <span style=\"display:flex;gap:3px;margin-left:5px\">\n    <i class=\"klo3-seg\"></i><i class=\"klo3-seg\"></i><i class=\"klo3-seg\"></i><i class=\"klo3-seg\"></i>\n  </span>\n</div>"
    },

    {
      id: "LO4",
      section: "loaders",
      name: "Neural Synapse Pulse Dots",
      description: "Three harmonic gradient bounce dots with warm ambient glow.",
      creator: "gemini",
      tags: ["loader","dots","neural","synapse","pink"],
      code: "<style>\n  @keyframes klo4-bounce{0%,100%{transform:translateY(0);opacity:0.35}50%{transform:translateY(-6px);opacity:1}}\n  .klo4-row{display:inline-flex;align-items:center;gap:7px}\n  .klo4-dot{width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#8b5cf6);box-shadow:0 0 8px rgba(236,72,153,0.6)}\n  .klo4-dot:nth-child(1){animation:klo4-bounce 0.8s ease-in-out infinite 0s}\n  .klo4-dot:nth-child(2){animation:klo4-bounce 0.8s ease-in-out infinite 0.15s}\n  .klo4-dot:nth-child(3){animation:klo4-bounce 0.8s ease-in-out infinite 0.3s}\n  @media (prefers-reduced-motion:reduce){.klo4-dot{animation:none}}\n</style>\n<div class=\"klo4-row\">\n  <i class=\"klo4-dot\"></i><i class=\"klo4-dot\"></i><i class=\"klo4-dot\"></i>\n</div>"
    },

    {
      id: "LO5",
      section: "loaders",
      name: "Bounce Pulse Loader",
      description: "Two dots bounce rhythmically toward each other and apart — rhythmic feedback for async operations.",
      creator: "nemotron",
      tags: ["loader","bounce","rhythm","feedback"],
      code: "<style>\n  @keyframes klo5-bounce{0%,100%{transform:translateX(100%)}50%{transform:translateX(-100%)}}\n  .klo5-wrap{display:inline-flex;gap:24px}\n  .klo5-dot{width:12px;height:12px;border-radius:50;background:var(--klo5-color,#f97316);box-shadow:0 0 8px var(--klo5-color,#f97316);animation:klo5-bounce 1.5s ease-in-out infinite}\n  .klo5-dot.left{animation-delay:0s}\n  .klo5-dot.right{animation-delay:.75s}\n  @media (prefers-reduced-motion:reduce){.klo5-dot{animation:none}}\n</style>\n<div class=\"klo5-wrap\">\n  <div class=\"klo5-dot left\"></div>\n  <div class=\"klo5-dot right\"></div>\n</div>"
    },

    {
      id: "AL1",
      section: "alerts",
      name: "Frosted Glass Pill Toast",
      description: "Translucent acrylic pill toast with emerald success pip.",
      creator: "gemini",
      tags: ["alert","toast","glass","frosted","success"],
      code: "<style>\n  .kal1-toast{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.18);border-radius:9999px;padding:6px 14px;box-shadow:0 8px 24px -6px rgba(0,0,0,0.5)}\n  .kal1-icon{width:18px;height:18px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}\n  .kal1-txt{font-size:12px;font-weight:500;color:#f8fafc}\n</style>\n<div class=\"kal1-toast\">\n  <span class=\"kal1-icon\">✓</span>\n  <span class=\"kal1-txt\">Export complete · Saved to assets</span>\n</div>"
    },

    {
      id: "AL2",
      section: "alerts",
      name: "Tactical Amber Warning Banner",
      description: "High-contrast tactical amber perimeter banner for memory and queue alerts.",
      creator: "gemini",
      tags: ["alert","banner","warning","amber","tactical"],
      code: "<style>\n  .kal2-banner{display:flex;align-items:center;gap:10px;background:rgba(245,158,11,0.08);border:1px solid #f59e0b;border-radius:6px;padding:8px 12px;width:220px}\n  .kal2-sign{color:#f59e0b;font-size:14px;font-weight:700}\n  .kal2-content{font-size:11.5px;color:#fde68a;line-height:1.3}\n</style>\n<div class=\"kal2-banner\">\n  <span class=\"kal2-sign\">⚠</span>\n  <div class=\"kal2-content\">\n    <strong>VRAM at 88%</strong>\n    <div style=\"opacity:0.8;font-size:10.5px\">Queued tasks may slow down</div>\n  </div>\n</div>"
    },

    {
      id: "AL3",
      section: "alerts",
      name: "Neon Cyber Rim Notification",
      description: "Dark carbon surface with electric cyan accent edge and indicator dot.",
      creator: "gemini",
      tags: ["alert","cyber","neon","notification","cyan"],
      code: "<style>\n  .kal3-box{display:flex;align-items:center;gap:10px;background:#090d16;border:1px solid #38bdf8;border-left-width:4px;border-radius:6px;padding:8px 12px;box-shadow:0 0 14px rgba(56,189,248,0.25)}\n  .kal3-dot{width:8px;height:8px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}\n  .kal3-title{font-size:12px;font-weight:600;color:#e0f2fe}\n</style>\n<div class=\"kal3-box\">\n  <i class=\"kal3-dot\"></i>\n  <span class=\"kal3-title\">Audio Track Rendered (0:15)\n</span>\n</div>"
    },

    {
      id: "AL4",
      section: "alerts",
      name: "Dismissible Status Alert",
      description: "Closeable warning alert with recurring transfer progress bar and click-to-dismiss (✕).",
      creator: "nemotron",
      tags: ["alert","dismissible","warning","progress","animated"],
      tweaks: [
        { type: "color", label: "Accent Color", varName: "--al4-accent", default: "#f97316" }
      ],
      code: "<style>\n  @keyframes kla4-pulse-bar{0%{transform:scaleX(0);opacity:.8}60%{transform:scaleX(1);opacity:1}80%,100%{transform:scaleX(1);opacity:0}}\n  .kla4-alert{position:relative;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:10px 14px;color:#e2e8f0;cursor:default;width:210px;overflow:hidden}\n  .kla4-alert[kind=\"warning\"]{border-color:var(--al4-accent,#f97316)}\n  .kla4-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:6px}\n  .kla4-title{font-weight:600;font-size:12px}\n  .kla4-close{width:18px;height:18px;border:none;border-radius:50%;background:transparent;color:#64748b;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:color .15s ease}\n  .kla4-close:hover{color:#fff}\n  .kla4-progress{position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--al4-accent,#f97316);border-radius:2px;transform-origin:left;animation:kla4-pulse-bar 3.5s ease-in-out infinite}\n  @media (prefers-reduced-motion:reduce){.kla4-progress{animation:none;transform:scaleX(1);opacity:1}}\n</style>\n<div class=\"kla4-alert\" kind=\"warning\">\n  <div class=\"kla4-head\">\n    <span class=\"kla4-title\">Download Complete</span>\n    <button type=\"button\" class=\"kla4-close\" onclick=\"this.closest('.kla4-alert').style.opacity='0'\">✕</button>\n  </div>\n  <p style=\"font-size:10.5px;color:#94a3b8;line-height:1.4;margin:0\">File ready in assets · <span style=\"color:var(--al4-accent,#f97316);font-weight:700\">12.7 MB</span></p>\n  <div class=\"kla4-progress\"></div>\n</div>"
    },

    {
      id: "CA1",
      section: "cards",
      name: "Sleek Metric Stat Tile",
      description: "Violet gradient card surface with numeric readout and live trend indicator.",
      creator: "gemini",
      tags: ["card","surface","metric","stats","violet"],
      code: "<style>\n  .kca1-card{background:linear-gradient(145deg,rgba(30,27,75,0.7),rgba(15,23,42,0.85));border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:12px;width:200px;box-shadow:0 8px 24px -8px rgba(0,0,0,0.6)}\n  .kca1-hdr{display:flex;justify-content:space-between;align-items:center;font-size:10.5px;color:#a78bfa;font-weight:600;letter-spacing:0.04em}\n  .kca1-num{font-size:20px;font-weight:800;color:#fff;margin:5px 0 2px;letter-spacing:-0.02em}\n  .kca1-sub{font-size:10.5px;color:#34d399;font-weight:500}\n</style>\n<div class=\"kca1-card\">\n  <div class=\"kca1-hdr\"><span>GPU THROUGHPUT</span><span>⚡ LIVE</span></div>\n  <div class=\"kca1-num\">142.8 fps</div>\n  <div class=\"kca1-sub\">↑ +18.4% faster batch</div>\n</div>"
    },

    {
      id: "CA2",
      section: "cards",
      name: "Frosted Glass Profile Badge",
      description: "Floating frosted glass tile with cyan avatar gradient and badge hierarchy.",
      creator: "gemini",
      tags: ["card","glass","profile","avatar","cyan"],
      code: "<style>\n  .kca2-tile{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.06);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:10px 12px;width:200px}\n  .kca2-ava{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#06b6d4,#3b82f6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;box-shadow:0 4px 10px rgba(6,182,212,0.4)}\n  .kca2-name{font-size:12.5px;font-weight:600;color:#f1f5f9}\n  .kca2-role{font-size:10.5px;color:#94a3b8}\n</style>\n<div class=\"kca2-tile\">\n  <div class=\"kca2-ava\">AI</div>\n  <div>\n    <div class=\"kca2-name\">Studio Engine</div>\n    <div class=\"kca2-role\">v2.4 · High Fidelity</div>\n  </div>\n</div>"
    },

    {
      id: "CA3",
      section: "cards",
      name: "Hardware Console DSP Module",
      description: "Gunmetal equipment surface with LED active power pip and technical specs.",
      creator: "gemini",
      tags: ["card","hardware","module","gunmetal","dsp"],
      code: "<style>\n  .kca3-mod{background:linear-gradient(180deg,#242933,#171a21);border:1px solid #3b4252;border-radius:8px;padding:10px 12px;width:200px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.1)}\n  .kca3-top{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #2e3440;padding-bottom:5px;margin-bottom:6px}\n  .kca3-lbl{font-family:monospace;font-size:9.5px;color:#88c0d0;font-weight:600;letter-spacing:0.06em}\n  .kca3-led{width:6px;height:6px;border-radius:50%;background:#a3be8c;box-shadow:0 0 6px #a3be8c}\n  .kca3-body{font-family:monospace;font-size:11px;color:#d8dee9;line-height:1.4}\n</style>\n<div class=\"kca3-mod\">\n  <div class=\"kca3-top\"><span class=\"kca3-lbl\">MODULE_DSP</span><i class=\"kca3-led\"></i></div>\n  <div class=\"kca3-body\">SAMPLERATE: 48kHz<br>STEREO PAN: +0.22</div>\n</div>"
    },

    {
      id: "NA2",
      section: "navigation",
      name: "Floating Capsule Dock",
      description: "Interactive glass pill dock where clicking icons moves the illuminated indicator.",
      creator: "gemini",
      tags: ["navigation","dock","capsule","floating","glass","interactive"],
      tweaks: [
        { type: "color", label: "Active Accent", varName: "--na2-accent", default: "#6366f1" }
      ],
      code: "<style>\n  .kna2-dock{display:inline-flex;align-items:center;gap:4px;background:rgba(15,23,42,0.85);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:4px 8px;box-shadow:0 12px 30px -8px rgba(0,0,0,0.7)}\n  .kna2-item{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;color:#94a3b8;font-size:13px;border:none;background:transparent;cursor:pointer;transition:transform 0.16s ease,color 0.16s ease,background 0.16s ease}\n  .kna2-item:hover{transform:translateY(-2px);color:#fff}\n  .kna2-item.active{background:linear-gradient(135deg,var(--na2-accent,#6366f1),#8b5cf6);color:#fff;box-shadow:0 4px 12px rgba(99,102,241,0.4)}\n  @media (prefers-reduced-motion:reduce){.kna2-item{transition:none}}\n</style>\n<nav class=\"kna2-dock\">\n  <button type=\"button\" class=\"kna2-item active\" onclick=\"this.parentElement.querySelectorAll('.kna2-item').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">⊞</button>\n  <button type=\"button\" class=\"kna2-item\" onclick=\"this.parentElement.querySelectorAll('.kna2-item').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">⚡</button>\n  <button type=\"button\" class=\"kna2-item\" onclick=\"this.parentElement.querySelectorAll('.kna2-item').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">⚙</button>\n  <button type=\"button\" class=\"kna2-item\" onclick=\"this.parentElement.querySelectorAll('.kna2-item').forEach(b=>b.classList.remove('active'));this.classList.add('active')\">✦</button>\n</nav>"
    },

    {
      id: "NA3",
      section: "navigation",
      name: "Minimalist Breadcrumb Trail",
      description: "Clean hierarchical navigation path with glowing violet chevron delimiters.",
      creator: "gemini",
      tags: ["navigation","breadcrumb","hierarchy","minimal"],
      code: "<style>\n  .kna3-trail{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:500;color:#94a3b8;max-width:100%;white-space:nowrap}\n  .kna3-crumb{cursor:pointer;transition:opacity 0.15s ease}\n  .kna3-crumb:hover{color:#e2e8f0}\n  .kna3-chev{color:#8b5cf6;font-size:9px;font-weight:700}\n  .kna3-cur{color:#fff;font-weight:650}\n</style>\n<div class=\"kna3-trail\">\n  <span class=\"kna3-crumb\">Projects</span>\n  <span class=\"kna3-chev\">›</span>\n  <span class=\"kna3-crumb\">Aurora</span>\n  <span class=\"kna3-chev\">›</span>\n  <span class=\"kna3-cur\">Timeline</span>\n</div>"
    },

    {
      id: "NA4",
      section: "navigation",
      name: "Underline Glow Segmented Tabs",
      description: "Minimalist text tab row with interactive electric cyan active indicator halo.",
      creator: "gemini",
      tags: ["navigation","tabs","underline","glow","cyan","interactive"],
      tweaks: [
        { type: "color", label: "Glow Color", varName: "--na4-glow", default: "#38bdf8" }
      ],
      code: "<style>\n  .kna4-tabs{display:inline-flex;gap:16px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:2px}\n  .kna4-tab{font-size:12px;font-weight:600;color:#64748b;padding:6px 2px;position:relative;background:none;border:none;cursor:pointer;transition:color .18s ease}\n  .kna4-tab:hover{color:#cbd5e1}\n  .kna4-tab.is-on{color:var(--na4-glow,#38bdf8)}\n  .kna4-tab.is-on::after{content:\"\";position:absolute;left:0;bottom:-3px;width:100%;height:2px;background:var(--na4-glow,#38bdf8);box-shadow:0 0 8px var(--na4-glow,#38bdf8);border-radius:1px}\n  @media (prefers-reduced-motion:reduce){.kna4-tab{transition:none}}\n</style>\n<div class=\"kna4-tabs\">\n  <button type=\"button\" class=\"kna4-tab is-on\" onclick=\"this.parentElement.querySelectorAll('.kna4-tab').forEach(b=>b.classList.remove('is-on'));this.classList.add('is-on')\">Specs</button>\n  <button type=\"button\" class=\"kna4-tab\" onclick=\"this.parentElement.querySelectorAll('.kna4-tab').forEach(b=>b.classList.remove('is-on'));this.classList.add('is-on')\">Code</button>\n  <button type=\"button\" class=\"kna4-tab\" onclick=\"this.parentElement.querySelectorAll('.kna4-tab').forEach(b=>b.classList.remove('is-on'));this.classList.add('is-on')\">Exports</button>\n</div>"
    },

    {
      id: "NA5",
      section: "navigation",
      name: "Vertical Step Nav",
      description: "Vertical stepper trail with connected status pips, check states, and active halo glow.",
      creator: "nemotron",
      tags: ["navigation","vertical","step","workflow"],
      tweaks: [
        { type: "color", label: "Active Step", varName: "--kna5-accent", default: "#f97316" }
      ],
      code: "<style>\n  .kna5-stepper{position:relative;display:flex;flex-direction:column;gap:6px;width:175px}\n  .kna5-line{position:absolute;left:10px;top:10px;bottom:10px;width:1px;background:rgba(255,255,255,0.12);z-index:0}\n  .kna5-step{position:relative;z-index:1;display:flex;align-items:center;gap:8px;padding:3px 6px;border-radius:6px;cursor:pointer;transition:background .15s ease}\n  .kna5-step:hover{background:rgba(255,255,255,0.05)}\n  .kna5-pip{width:20px;height:20px;border-radius:50%;background:#0e1117;border:1px solid rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:#64748b;flex-shrink:0}\n  .kna5-step.is-done .kna5-pip{background:#10b981;border-color:#10b981;color:#fff}\n  .kna5-step.is-active .kna5-pip{background:var(--kna5-accent,#f97316);border-color:var(--kna5-accent,#f97316);color:#fff;box-shadow:0 0 10px var(--kna5-accent,#f97316)}\n  .kna5-txt{display:flex;flex-direction:column}\n  .kna5-title{font-size:11px;font-weight:600;color:#cbd5e1}\n  .kna5-step.is-active .kna5-title{color:#fff;font-weight:700}\n  .kna5-step.is-done .kna5-title{color:#94a3b8}\n  @media (prefers-reduced-motion:reduce){.kna5-step{transition:none}}\n</style>\n<div class=\"kna5-stepper\">\n  <div class=\"kna5-line\"></div>\n  <div class=\"kna5-step is-done\">\n    <div class=\"kna5-pip\">✓</div>\n    <div class=\"kna5-txt\"><span class=\"kna5-title\">Setup Pipeline</span></div>\n  </div>\n  <div class=\"kna5-step is-active\">\n    <div class=\"kna5-pip\">2</div>\n    <div class=\"kna5-txt\"><span class=\"kna5-title\">Model Tuning</span></div>\n  </div>\n  <div class=\"kna5-step\">\n    <div class=\"kna5-pip\">3</div>\n    <div class=\"kna5-txt\"><span class=\"kna5-title\">Deploy API</span></div>\n  </div>\n</div>"
    },

    {
      id: "MO1",
      section: "modals",
      name: "Studio Action Sheet Dialog",
      description: "Compact dark glass confirmation sheet with dual action hierarchy.",
      creator: "gemini",
      tags: ["modal","dialog","action-sheet","confirm"],
      code: "<style>\n  .kmo1-sheet{background:#13151b;border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:12px;width:210px;box-shadow:0 16px 36px -10px rgba(0,0,0,0.85)}\n  .kmo1-title{font-size:12.5px;font-weight:700;color:#f8fafc;margin-bottom:3px}\n  .kmo1-desc{font-size:10.5px;color:#94a3b8;line-height:1.35;margin-bottom:10px}\n  .kmo1-acts{display:flex;gap:8px}\n  .kmo1-btn{flex:1;padding:6px;font-size:11px;font-weight:600;border-radius:6px;border:none;cursor:pointer}\n  .kmo1-btn.primary{background:#7c3aed;color:#fff}\n  .kmo1-btn.ghost{background:rgba(255,255,255,0.08);color:#cbd5e1}\n</style>\n<div class=\"kmo1-sheet\">\n  <div class=\"kmo1-title\">Publish Specimen?</div>\n  <div class=\"kmo1-desc\">Changes will be added to the shared registry.</div>\n  <div class=\"kmo1-acts\">\n    <button type=\"button\" class=\"kmo1-btn ghost\">Cancel</button>\n    <button type=\"button\" class=\"kmo1-btn primary\">Publish</button>\n  </div>\n</div>"
    },

    {
      id: "MO2",
      section: "modals",
      name: "Command Palette HUD",
      description: "Spotlight-style floating command input with keyboard shortcut tags.",
      creator: "gemini",
      tags: ["modal","palette","hud","command","spotlight"],
      code: "<style>\n  .kmo2-hud{background:rgba(15,23,42,0.92);backdrop-filter:blur(14px);border:1px solid #38bdf8;border-radius:10px;padding:8px 10px;width:210px;box-shadow:0 0 20px rgba(56,189,248,0.25)}\n  .kmo2-inrow{display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:5px;margin-bottom:5px}\n  .kmo2-icon{color:#38bdf8;font-size:11px}\n  .kmo2-in{background:transparent;border:none;outline:none;color:#fff;font-size:11.5px;width:100%}\n  .kmo2-item{font-size:10.5px;color:#94a3b8;padding:4px 6px;border-radius:4px;display:flex;justify-content:space-between}\n  .kmo2-item.sel{background:rgba(56,189,248,0.15);color:#38bdf8}\n</style>\n<div class=\"kmo2-hud\">\n  <div class=\"kmo2-inrow\"><span class=\"kmo2-icon\">⌘</span><input class=\"kmo2-in\" type=\"text\" value=\"Export...\" readonly></div>\n  <div class=\"kmo2-item sel\"><span>Export JSON</span><span style=\"opacity:0.6\">↵</span></div>\n  <div class=\"kmo2-item\"><span>Copy Code</span><span style=\"opacity:0.6\">⌥C</span></div>\n</div>"
    },

    {
      id: "EF1",
      section: "effects",
      name: "Cyber Grain Ambient Mesh",
      description: "Diffused atmospheric multi-point glow mesh for ambient card backdrops.",
      creator: "gemini",
      tags: ["effect","ambient","mesh","glow","violet"],
      code: "<style>\n  .kef1-mesh{position:relative;width:190px;height:65px;border-radius:10px;background:linear-gradient(135deg,#1e1b4b,#0f172a);overflow:hidden;border:1px solid rgba(139,92,246,0.3);display:flex;align-items:center;justify-content:center}\n  .kef1-glow{position:absolute;width:80px;height:80px;border-radius:50%;background:#8b5cf6;filter:blur(22px);opacity:0.55}\n  .kef1-lbl{position:relative;z-index:1;font-weight:700;font-size:11px;letter-spacing:0.12em;color:#e0e7ff}\n</style>\n<div class=\"kef1-mesh\">\n  <div class=\"kef1-glow\"></div>\n  <span class=\"kef1-lbl\">AMBIENT MESH</span>\n</div>"
    },

    {
      id: "EF2",
      section: "effects",
      name: "Prismatic Glass Specular Rim",
      description: "Layered specular top highlight with frosted backdrop diffusion.",
      creator: "gemini",
      tags: ["effect","glass","specular","prismatic","frosted"],
      code: "<style>\n  .kef2-glass{position:relative;width:190px;height:65px;border-radius:10px;background:rgba(255,255,255,0.05);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.2);box-shadow:inset 0 1px 0 rgba(255,255,255,0.4),0 8px 20px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center}\n  .kef2-txt{font-size:11px;font-weight:600;color:#fff;text-shadow:0 0 10px rgba(255,255,255,0.5)}\n</style>\n<div class=\"kef2-glass\">\n  <span class=\"kef2-txt\">PRISMATIC GLASS</span>\n</div>"
    },

    /* ---- Mimo 2.5 additions: Badges, Modals, Effects, Sliders ---- */

    {
      id: "BA3",
      section: "badges",
      name: "Spin Gem",
      description: "Rotating diamond gem with trailing glow orbit — achievement badge with continuous rotation.",
      creator: "mimo-2-5",
      tags: ["badge","gem","spin","rotation"],
      tweaks: [
        { type: "color", label: "Gem Color", varName: "--ba3-color", default: "#04ff00" },
      ],
      code: "<style>\n  @keyframes kba3-spin{to{transform:translate(-50%,-50%) rotate(405deg)}}\n  .kba3-wrap{position:relative;width:56px;height:56px;display:flex;align-items:center;justify-content:center;cursor:pointer}\n  .kba3-trail{position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:10px;border:2px solid var(--ba3-color,#04ff00);opacity:.25;animation:kba3-spin 3s linear infinite;transform:translate(-50%,-50%) rotate(45deg)}\n  .kba3-core{transform:rotate(45deg);width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,var(--ba3-color,#04ff00),#065f46);box-shadow:0 0 14px var(--ba3-color,#04ff00);display:flex;align-items:center;justify-content:center;transition:transform .2s ease}\n  .kba3-wrap:hover .kba3-core{transform:rotate(45deg) scale(1.12)}\n  .kba3-inner{transform:rotate(-45deg);color:#fff;font-size:15px;font-weight:800;line-height:1}\n  @media (prefers-reduced-motion:reduce){.kba3-trail{animation:none}}\n</style>\n<div class=\"kba3-wrap\">\n  <div class=\"kba3-trail\"></div>\n  <div class=\"kba3-core\"><span class=\"kba3-inner\">✦</span></div>\n</div>"
    },

    {
      id: "BA4",
      section: "badges",
      name: "Floating Pill",
      description: "Animated pill badge that gently bobs up and down — alive, attention-grabbing, non-aggressive.",
      creator: "mimo-2-5",
      tags: ["badge","pill","float","animated"],
      tweaks: [
        { type: "color", label: "Badge Color", varName: "--ba4-color", default: "#04ff00" },
      ],
      code: "<style>\n  @keyframes kba4-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}\n  .kba4-pill{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:9999px;background:rgba(4,255,0,0.1);border:1px solid var(--ba4-color,#04ff00);color:var(--ba4-color,#04ff00);font-size:11px;font-weight:700;letter-spacing:.04em;animation:kba4-float 2.8s ease-in-out infinite;box-shadow:0 4px 14px rgba(4,255,0,0.18);cursor:default;white-space:nowrap}\n  .kba4-pip{width:7px;height:7px;border-radius:50%;background:var(--ba4-color,#04ff00);box-shadow:0 0 6px var(--ba4-color,#04ff00);flex-shrink:0}\n  @media (prefers-reduced-motion:reduce){.kba4-pill{animation:none}}\n</style>\n<span class=\"kba4-pill\">\n  <i class=\"kba4-pip\"></i>NEW\n</span>"
    },

    {
      id: "BA5",
      section: "badges",
      name: "Circle Gauge",
      description: "SVG circular progress ring with continuous gauge level pulse and percentage readout.",
      creator: "mimo-2-5",
      tags: ["badge","gauge","progress","circular","animated"],
      tweaks: [
        { type: "color", label: "Ring Color", varName: "--ba5-color", default: "#04ff00" }
      ],
      code: "<style>\n  @keyframes kba5-gauge{0%,100%{stroke-dashoffset:88}50%{stroke-dashoffset:28}}\n  .kba5-ring{animation:kba5-gauge 3.6s ease-in-out infinite;transform:rotate(-90deg);transform-origin:center}\n  @media (prefers-reduced-motion:reduce){.kba5-ring{animation:none;stroke-dashoffset:38}}\n</style>\n<svg width=\"48\" height=\"48\" viewBox=\"0 0 48 48\" style=\"cursor:pointer;filter:drop-shadow(0 0 6px var(--ba5-color,#04ff00))\">\n  <circle cx=\"24\" cy=\"24\" r=\"20\" fill=\"none\" stroke=\"rgba(255,255,255,0.08)\" stroke-width=\"5\" />\n  <circle class=\"kba5-ring\" cx=\"24\" cy=\"24\" r=\"20\" fill=\"none\" stroke=\"var(--ba5-color,#04ff00)\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-dasharray=\"126\" stroke-dashoffset=\"38\" />\n  <text x=\"24\" y=\"28\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-size=\"12\" font-weight=\"700\">70</text>\n</svg>"
    },

    {
      id: "BA6",
      section: "badges",
      name: "Progress Tracker Badge",
      description: "Multi-step progress badge — each step activates with distinct silhouette, shows numeric state, and reveals detail on hover.",
      creator: "nemotron",
      tags: ["badge","progress","tracker","multi-step"],
      tweaks: [
        { type: "color", label: "Accent Color", varName: "--ba6-color", default: "#f97316" },
      ],
      code: "<style>\n  @keyframes kba6-step-on{0%{background:var(--ba6-color,#f97316);transform:scale(1)}50%{transform:scale(1.12)}100%{background:var(--ba6-color,#f97316);transform:scale(1)}}\n  .kba6-badge{display:inline-flex;flex-direction:column;align-items:center;width:56px;padding:6px 0;gap:6px;cursor:pointer}\n  .kba6-ring{width:32px;height:32px;border-radius:50%;border:2px solid var(--ba6-color,#f97316);display:flex;align-items:center;justify-content:center}\n  .kba6-step{width:8px;height:8px;border-radius:50%;background:var(--ba6-color,#f97316);margin:2px auto;animation:kba6-step-on 1.5s ease-in-out infinite;box-shadow:0 0 10px var(--ba6-color,#f97316)}\n  .kba6-label{font-size:10px;font-weight:700;color:var(--ba6-color,#f97316);letter-spacing:.04em}\n  .kba6-desc{font-size:8px;color:#64748b;text-align:center;margin-top:2px}\n  @media (prefers-reduced-motion:reduce){.kba6-step{animation:none}}\n</style>\n<div class=\"kba6-badge\">\n  <div class=\"kba6-ring\"><div class=\"kba6-step\"></div></div>\n  <span class=\"kba6-label\">3/5</span>\n  <span class=\"kba6-desc\">Active steps</span>\n</div>"
    },

    {
      id: "MO3",
      section: "modals",
      name: "Drawer Sheet",
      description: "Bottom-anchored slide-up panel with drag handle grip — natural mobile-native action surface.",
      creator: "mimo-2-5",
      tags: ["modal","drawer","sheet","bottom","slide-up"],
      code: "<style>\n  .kmo3-bg{position:relative;width:220px;height:140px;background:#080a10;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)}\n  .kmo3-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.6)}\n  .kmo3-sheet{position:absolute;bottom:0;left:0;right:0;background:#141720;border-top:1px solid rgba(255,255,255,0.1);border-radius:12px 12px 0 0;padding:10px 14px 14px}\n  .kmo3-grip{width:32px;height:4px;background:rgba(255,255,255,0.18);border-radius:2px;margin:0 auto 10px;cursor:grab}\n  .kmo3-title{font-size:12px;font-weight:700;color:#f8fafc;margin-bottom:8px}\n  .kmo3-item{font-size:11px;color:#94a3b8;padding:6px 8px;border-radius:6px;display:flex;align-items:center;gap:7px;cursor:pointer;transition:background .15s ease,transform .15s ease}\n  .kmo3-item:hover{background:rgba(255,255,255,0.06);transform:translateX(3px)}\n  @media (prefers-reduced-motion:reduce){.kmo3-item{transition:none}}\n</style>\n<div class=\"kmo3-bg\">\n  <div class=\"kmo3-backdrop\"></div>\n  <div class=\"kmo3-sheet\">\n    <div class=\"kmo3-grip\"></div>\n    <div class=\"kmo3-title\">Share Recording</div>\n    <div class=\"kmo3-item\">📋 Copy Link</div>\n    <div class=\"kmo3-item\">💬 Send as Message</div>\n  </div>\n</div>"
    },

    {
      id: "MO4",
      section: "modals",
      name: "Lightbox Overlay",
      description: "Full dark scrim with frosted glass center card and soft accent top border.",
      creator: "mimo-2-5",
      tags: ["modal","lightbox","overlay","glass","centered"],
      tweaks: [
        { type: "color", label: "Accent Line", varName: "--mo4-accent", default: "#8b5cf6" },
      ],
      code: "<style>\n  .kmo4-bg{position:relative;width:220px;height:130px;background:#050710;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}\n  .kmo4-scrim{position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px)}\n  .kmo4-card{position:relative;background:rgba(20,23,32,0.95);border:1px solid rgba(255,255,255,0.1);border-top:2px solid var(--mo4-accent,#8b5cf6);border-radius:10px;padding:14px;width:170px;box-shadow:0 20px 50px -10px rgba(0,0,0,0.8)}\n  .kmo4-title{font-size:12px;font-weight:700;color:#f8fafc;margin-bottom:4px}\n  .kmo4-desc{font-size:10.5px;color:#94a3b8;line-height:1.35;margin-bottom:10px}\n  .kmo4-btns{display:flex;gap:6px}\n  .kmo4-btn{flex:1;padding:6px;border-radius:6px;border:none;font-size:11px;font-weight:600;cursor:pointer;text-align:center}\n  .kmo4-btn.primary{background:var(--mo4-accent,#8b5cf6);color:#fff}\n  .kmo4-btn.ghost{background:rgba(255,255,255,0.08);color:#cbd5e1}\n</style>\n<div class=\"kmo4-bg\">\n  <div class=\"kmo4-scrim\"></div>\n  <div class=\"kmo4-card\">\n    <div class=\"kmo4-title\">Delete Specimen?</div>\n    <div class=\"kmo4-desc\">This action cannot be undone.</div>\n    <div class=\"kmo4-btns\">\n      <button type=\"button\" class=\"kmo4-btn ghost\">Cancel</button>\n      <button type=\"button\" class=\"kmo4-btn primary\">Delete</button>\n    </div>\n  </div>\n</div>"
    },

    {
      id: "MO5",
      section: "modals",
      name: "Toast Stack",
      description: "Stacked notification toasts that cascade into view in a 5s recurring cycle — pause on hover or click to dismiss.",
      creator: "mimo-2-5",
      tags: ["modal","toast","stack","notification","transient","animated"],
      code: "<style>\n  @keyframes kmo5-cycle{0%{transform:translateX(105%);opacity:0}6%{transform:translateX(0);opacity:1}82%{transform:translateX(0);opacity:1}88%,100%{transform:translateX(105%);opacity:0}}\n  .kmo5-stack{display:flex;flex-direction:column;gap:6px;width:210px}\n  .kmo5-stack:hover .kmo5-toast{animation-play-state:paused}\n  .kmo5-toast{display:flex;align-items:center;gap:8px;background:#141720;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:8px 10px;box-shadow:0 8px 20px -6px rgba(0,0,0,0.7);animation:kmo5-cycle 5s ease-in-out infinite both;cursor:pointer;transition:transform .15s ease,opacity .15s ease}\n  .kmo5-toast:nth-child(1){animation-delay:0s}\n  .kmo5-toast:nth-child(2){animation-delay:.14s}\n  .kmo5-toast:nth-child(3){animation-delay:.28s}\n  .kmo5-toast:hover{transform:translateX(-4px);opacity:.92}\n  .kmo5-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}\n  .kmo5-msg{font-size:11px;color:#e2e8f0;font-weight:500}\n  @media (prefers-reduced-motion:reduce){.kmo5-toast{animation:none;transform:none;opacity:1}}\n</style>\n<div class=\"kmo5-stack\">\n  <div class=\"kmo5-toast\" onclick=\"this.style.opacity='0';this.style.transform='translateX(120%)'\"><i class=\"kmo5-dot\" style=\"background:#10b981;box-shadow:0 0 5px #10b981\"></i><span class=\"kmo5-msg\">Export finished</span></div>\n  <div class=\"kmo5-toast\" onclick=\"this.style.opacity='0';this.style.transform='translateX(120%)'\"><i class=\"kmo5-dot\" style=\"background:#38bdf8;box-shadow:0 0 5px #38bdf8\"></i><span class=\"kmo5-msg\">Rendering beat 2/4</span></div>\n  <div class=\"kmo5-toast\" onclick=\"this.style.opacity='0';this.style.transform='translateX(120%)'\"><i class=\"kmo5-dot\" style=\"background:#fbbf24;box-shadow:0 0 5px #fbbf24\"></i><span class=\"kmo5-msg\">Queue position: 3</span></div>\n</div>"
    },

    {
      id: "EF3",
      section: "effects",
      name: "Aurora Ribbons",
      description: "Flowing vertical gradient bands that sway left and right — atmospheric sky-glow backdrop.",
      creator: "mimo-2-5",
      tags: ["effect","aurora","ribbons","gradient","flowing"],
      tweaks: [
        { type: "color", label: "Tint", varName: "--ef3-tint", default: "#00e5a0" },
      ],
      code: "<style>\n  @keyframes kef3-sway{0%,100%{transform:translateX(0) scaleY(1)}50%{transform:translateX(10px) scaleY(1.05)}}\n  .kef3-wrap{position:relative;width:190px;height:80px;border-radius:10px;background:#080a10;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}\n  .kef3-band{position:absolute;width:40%;height:100%;border-radius:50%;filter:blur(16px);animation:kef3-sway 4s ease-in-out infinite}\n  .kef3-band:nth-child(1){left:-5%;background:var(--ef3-tint,#00e5a0);opacity:.4;animation-delay:0s}\n  .kef3-band:nth-child(2){left:25%;background:var(--ef3-tint,#00e5a0);mix-blend-mode:screen;opacity:.25;animation-delay:-1.5s;width:35%}\n  .kef3-band:nth-child(3){left:55%;background:#818cf8;opacity:.3;animation-delay:-3s;width:30%}\n  .kef3-lbl{position:relative;z-index:1;font-weight:700;font-size:11px;letter-spacing:.12em;color:#fff;text-shadow:0 0 14px rgba(255,255,255,.3)}\n  @media (prefers-reduced-motion:reduce){.kef3-band{animation:none}}\n</style>\n<div class=\"kef3-wrap\">\n  <div class=\"kef3-band\"></div><div class=\"kef3-band\"></div><div class=\"kef3-band\"></div>\n  <span class=\"kef3-lbl\">AURORA</span>\n</div>"
    },

    {
      id: "EF4",
      section: "effects",
      name: "Neon Bloom",
      description: "Deep neon radial glow pulsing behind content — mood-setting ambient light source.",
      creator: "mimo-2-5",
      tags: ["effect","neon","bloom","glow","pulsing"],
      tweaks: [
        { type: "color", label: "Bloom Color", varName: "--ef4-color", default: "#04ff00" },
      ],
      code: "<style>\n  @keyframes kef4-pulse{0%,100%{opacity:.45;transform:scale(1)}50%{opacity:.7;transform:scale(1.08)}}\n  .kef4-box{position:relative;width:190px;height:70px;border-radius:10px;background:#060810;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}\n  .kef4-glow{position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,var(--ef4-color,#04ff00) 0%,transparent 70%);animation:kef4-pulse 3s ease-in-out infinite;filter:blur(20px)}\n  .kef4-txt{position:relative;z-index:1;font-weight:700;font-size:11px;letter-spacing:.12em;color:#fff;text-shadow:0 0 18px rgba(255,255,255,.35)}\n  @media (prefers-reduced-motion:reduce){.kef4-glow{animation:none}}\n</style>\n<div class=\"kef4-box\">\n  <div class=\"kef4-glow\"></div>\n  <span class=\"kef4-txt\">NEON BLOOM</span>\n</div>"
    },

    {
      id: "EF5",
      section: "effects",
      name: "Film Grain",
      description: "Animated monochromatic noise texture — analog film grain overlay for cinematic warmth.",
      creator: "mimo-2-5",
      tags: ["effect","grain","film","noise","cinematic"],
      tweaks: [
        { type: "range", label: "Opacity", varName: "--ef5-opacity", min: 3, max: 18, step: 1, unit: "", default: "8" },
      ],
      code: "<style>\n  @keyframes kef5-drift{0%{background-position:0 0}100%{background-position:200px 200px}}\n  .kef5-frame{position:relative;width:190px;height:70px;border-radius:10px;background:#181c24;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}\n  .kef5-frame::after{content:\"\";position:absolute;inset:0;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");opacity:calc(var(--ef5-opacity,8)/100);animation:kef5-drift .6s steps(3) infinite;pointer-events:none;border-radius:inherit}\n  .kef5-lbl{position:relative;z-index:1;font-weight:700;font-size:11px;letter-spacing:.12em;color:#d4d4d8;text-shadow:0 1px 2px rgba(0,0,0,.5)}\n  @media (prefers-reduced-motion:reduce){.kef5-frame::after{animation:none}}\n</style>\n<div class=\"kef5-frame\">\n  <span class=\"kef5-lbl\">FILM GRAIN</span>\n</div>"
    },

    {
      id: "SL4",
      section: "sliders",
      name: "Tiered Track",
      description: "Three-segment stepped progress bar — visual hierarchy from faint to vivid as value climbs.",
      creator: "mimo-2-5",
      tags: ["slider","progress","tiered","segmented"],
      tweaks: [
        { type: "color", label: "Fill Color", varName: "--sl4-color", default: "#04ff00" },
      ],
      code: "<style>\n  .kbar4-wrap{display:flex;align-items:center;gap:10px;width:200px}\n  .kbar4-track{display:flex;gap:4px;flex:1;height:10px}\n  .kbar4-seg{flex:1;border-radius:4px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);overflow:hidden;position:relative}\n  .kbar4-fill{position:absolute;inset:0;border-radius:4px;background:var(--sl4-color,#04ff00)}\n  .kbar4-seg:nth-child(1) .kbar4-fill{box-shadow:0 0 10px var(--sl4-color,#04ff00);opacity:1}\n  .kbar4-seg:nth-child(2) .kbar4-fill{box-shadow:0 0 6px var(--sl4-color,#04ff00);opacity:.65}\n  .kbar4-seg:nth-child(3) .kbar4-fill{box-shadow:0 0 3px var(--sl4-color,#04ff00);opacity:.35}\n  .kbar4-val{font-size:12px;font-weight:700;color:var(--sl4-color,#04ff00);font-variant-numeric:tabular-nums;width:28px;text-align:right}\n</style>\n<div class=\"kbar4-wrap\">\n  <div class=\"kbar4-track\">\n    <div class=\"kbar4-seg\"><div class=\"kbar4-fill\"></div></div>\n    <div class=\"kbar4-seg\"><div class=\"kbar4-fill\"></div></div>\n    <div class=\"kbar4-seg\"><div class=\"kbar4-fill\"></div></div>\n  </div>\n  <span class=\"kbar4-val\">3/3</span>\n</div>"
    },

    {
      id: "SL5",
      section: "sliders",
      name: "Vertical Gauge",
      description: "Upright illuminated level meter with liquid fluid tube, graduation ticks, and live readout.",
      creator: "mimo-2-5",
      tags: ["slider","vertical","gauge","intensity"],
      tweaks: [
        { type: "color", label: "Track Color", varName: "--sl5-color", default: "#04ff00" },
      ],
      code: "<style>\n  .ksl5-card{display:inline-flex;align-items:center;gap:14px;background:#141720;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 16px;box-shadow:0 8px 24px rgba(0,0,0,0.6)}\n  .ksl5-gauge{position:relative;width:16px;height:100px;background:#090b0f;border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:2px;overflow:hidden;box-shadow:inset 0 2px 6px rgba(0,0,0,0.8)}\n  .ksl5-tube{position:relative;width:100%;height:100%;border-radius:5px;overflow:hidden;background:rgba(255,255,255,0.03)}\n  .ksl5-fill{position:absolute;bottom:0;left:0;width:100%;height:68%;background:linear-gradient(180deg,color-mix(in srgb,var(--sl5-color,#04ff00) 70%,#fff),var(--sl5-color,#04ff00));border-radius:4px;box-shadow:0 0 12px var(--sl5-color,#04ff00);animation:ksl5-pulse 2s ease-in-out infinite alternate}\n  .ksl5-ticks{display:flex;flex-direction:column;justify-content:space-between;height:100px;padding:2px 0}\n  .ksl5-tick{width:6px;height:1px;background:rgba(255,255,255,0.2)}\n  .ksl5-tick.major{width:10px;background:rgba(255,255,255,0.45)}\n  .ksl5-info{display:flex;flex-direction:column;gap:2px}\n  .ksl5-val{font-size:16px;font-weight:800;color:var(--sl5-color,#04ff00);letter-spacing:-.02em}\n  .ksl5-sub{font-size:9.5px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:.05em}\n  @keyframes ksl5-pulse{0%{opacity:0.85;transform:scaleY(0.98)}100%{opacity:1;transform:scaleY(1)}}\n  @media (prefers-reduced-motion:reduce){.ksl5-fill{animation:none}}\n</style>\n<div class=\"ksl5-card\">\n  <div class=\"ksl5-gauge\">\n    <div class=\"ksl5-tube\">\n      <div class=\"ksl5-fill\"></div>\n    </div>\n  </div>\n  <div class=\"ksl5-ticks\">\n    <span class=\"ksl5-tick major\"></span>\n    <span class=\"ksl5-tick\"></span>\n    <span class=\"ksl5-tick major\"></span>\n    <span class=\"ksl5-tick\"></span>\n    <span class=\"ksl5-tick major\"></span>\n  </div>\n  <div class=\"ksl5-info\">\n    <span class=\"ksl5-val\">68%</span>\n    <span class=\"ksl5-sub\">Output Level</span>\n  </div>\n</div>"
    },

    {
      id: "SL6",
      section: "sliders",
      name: "Stepped Notch",
      description: "Horizontal track with interactive draggable range and snap notch ticks for quality presets.",
      creator: "mimo-2-5",
      tags: ["slider","stepped","notch","discrete","quality"],
      code: "<style>\n  .ksl6-wrap{width:220px;padding:8px 0}\n  .ksl6-labels{display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8;font-weight:600;letter-spacing:.04em;margin-bottom:6px}\n  .ksl6-track-box{position:relative;height:24px;display:flex;align-items:center}\n  .ksl6-in{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:3;margin:0}\n  .ksl6-rail{position:absolute;left:0;right:0;height:4px;background:rgba(255,255,255,0.12);border-radius:2px}\n  .ksl6-notches{position:absolute;left:0;right:0;display:flex;justify-content:space-between;pointer-events:none;padding:0 2px}\n  .ksl6-notch{width:2px;height:10px;background:rgba(255,255,255,0.25);border-radius:1px;transform:translateY(-3px)}\n  .ksl6-thumb-sim{position:absolute;left:75%;width:16px;height:16px;border-radius:50%;background:#ffffff;box-shadow:0 0 12px rgba(255,255,255,0.8),0 2px 6px rgba(0,0,0,0.5);transform:translate(-50%,0);pointer-events:none;transition:transform .15s ease}\n  .ksl6-track-box:hover .ksl6-thumb-sim{transform:translate(-50%,0) scale(1.15)}\n  .ksl6-in:focus ~ .ksl6-thumb-sim{box-shadow:0 0 16px #38bdf8,0 0 0 2px #38bdf8}\n  @media (prefers-reduced-motion:reduce){.ksl6-thumb-sim{transition:none}}\n</style>\n<div class=\"ksl6-wrap\">\n  <div class=\"ksl6-labels\"><span>Draft</span><span>HD</span><span>4K</span><span>8K</span><span>Cinema</span></div>\n  <div class=\"ksl6-track-box\">\n    <input class=\"ksl6-in\" type=\"range\" min=\"0\" max=\"4\" step=\"1\" value=\"3\" oninput=\"this.nextElementSibling.nextElementSibling.nextElementSibling.style.left=(this.value*25)+'%'\">\n    <div class=\"ksl6-rail\"></div>\n    <div class=\"ksl6-notches\">\n      <span class=\"ksl6-notch\"></span>\n      <span class=\"ksl6-notch\"></span>\n      <span class=\"ksl6-notch\"></span>\n      <span class=\"ksl6-notch\"></span>\n      <span class=\"ksl6-notch\"></span>\n    </div>\n    <div class=\"ksl6-thumb-sim\"></div>\n  </div>\n</div>"
    },

    {
      id: "SL7",
      section: "sliders",
      name: "Dual-Range Track",
      description: "Dual-thumb band selector card with highlighted range fill and min/max frequency readouts.",
      creator: "nemotron",
      tags: ["slider","range","dual","dual-handle","band"],
      tweaks: [
        { type: "color", label: "Thumb Color", varName: "--sl7-color", default: "#f97316" }
      ],
      code: "<style>\n  .ksl7-card{width:200px;background:#141720;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 12px;box-shadow:0 8px 20px -6px rgba(0,0,0,0.6)}\n  .ksl7-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}\n  .ksl7-lbl{font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:.05em;text-transform:uppercase}\n  .ksl7-val{font-size:11px;font-weight:700;color:var(--sl7-color,#f97316);font-variant-numeric:tabular-nums}\n  .ksl7-track-wrap{position:relative;height:20px;display:flex;align-items:center}\n  .ksl7-rail{position:absolute;left:0;right:0;height:6px;background:rgba(255,255,255,0.1);border-radius:3px}\n  .ksl7-fill{position:absolute;left:25%;right:25%;height:6px;background:var(--sl7-color,#f97316);border-radius:3px;box-shadow:0 0 8px var(--sl7-color,#f97316)}\n  .ksl7-thumb{position:absolute;width:16px;height:16px;background:#fff;border:3px solid var(--sl7-color,#f97316);border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.5);transform:translateX(-50%);cursor:pointer;transition:transform .15s ease}\n  .ksl7-thumb:hover{transform:translateX(-50%) scale(1.2)}\n  .ksl7-thumb.left{left:25%}\n  .ksl7-thumb.right{left:75%}\n  @media (prefers-reduced-motion:reduce){.ksl7-thumb{transition:none}}\n</style>\n<div class=\"ksl7-card\">\n  <div class=\"ksl7-top\">\n    <span class=\"ksl7-lbl\">Frequency Band</span>\n    <span class=\"ksl7-val\">250Hz – 4.5kHz</span>\n  </div>\n  <div class=\"ksl7-track-wrap\">\n    <div class=\"ksl7-rail\"></div>\n    <div class=\"ksl7-fill\"></div>\n    <div class=\"ksl7-thumb left\" title=\"Min Frequency\"></div>\n    <div class=\"ksl7-thumb right\" title=\"Max Frequency\"></div>\n  </div>\n</div>"
    },

    /* ---- Mimo 2.5 additions: Cards, Modals ---- */

    {
      id: "CA4",
      section: "cards",
      name: "Pricing Tier Card",
      description: "Highlighted plan card with featured gradient border, price readout, and vertical feature checklist.",
      creator: "mimo-2-5",
      tags: ["card","pricing","tier","plan","cta"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--ca4-accent", default: "#8b5cf6" },
      ],
      code: "<style>\n  .kca4-card{background:#141720;border:1px solid rgba(255,255,255,0.1);border-top:2px solid var(--ca4-accent,#8b5cf6);border-radius:10px;padding:10px 12px;width:190px;box-shadow:0 8px 20px -6px rgba(0,0,0,0.6)}\n  .kca4-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}\n  .kca4-tag{padding:1px 6px;border-radius:4px;font-size:8.5px;font-weight:700;letter-spacing:.06em;color:var(--ca4-accent,#8b5cf6);background:color-mix(in srgb,var(--ca4-accent,#8b5cf6) 18%,transparent)}\n  .kca4-price{font-size:18px;font-weight:800;color:#fff;letter-spacing:-.02em}\n  .kca4-price span{font-size:10px;font-weight:500;color:#64748b}\n  .kca4-feats{margin:6px 0 8px;font-size:10px;color:#94a3b8;line-height:1.5}\n  .kca4-btn{width:100%;padding:5px 8px;border-radius:6px;border:none;background:var(--ca4-accent,#8b5cf6);color:#fff;font-size:10px;font-weight:700;cursor:pointer;transition:opacity .15s ease}\n  .kca4-btn:hover{opacity:.88}\n  @media (prefers-reduced-motion:reduce){.kca4-btn{transition:none}}\n</style>\n<div class=\"kca4-card\">\n  <div class=\"kca4-head\">\n    <div class=\"kca4-tag\">PRO PLAN</div>\n    <div class=\"kca4-price\">$29<span>/mo</span></div>\n  </div>\n  <div class=\"kca4-feats\">✓ Unlimited renders<br>✓ Priority 4K queue</div>\n  <button type=\"button\" class=\"kca4-btn\">Upgrade Now</button>\n</div>"
    },

    {
      id: "CA5",
      section: "cards",
      name: "Weather Widget",
      description: "Temperature display with condition glyph and horizontal forecast row — compact daily glance.",
      creator: "mimo-2-5",
      tags: ["card","weather","widget","temperature","forecast"],
      tweaks: [
        { type: "color", label: "Sky Tint", varName: "--ca5-sky", default: "#38bdf8" },
      ],
      code: "<style>\n  .kca5-card{background:linear-gradient(160deg,rgba(15,23,42,0.9),rgba(30,58,138,0.6));border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:16px;width:200px;box-shadow:0 8px 24px -8px rgba(0,0,0,0.6)}\n  .kca5-now{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}\n  .kca5-temp{font-size:32px;font-weight:800;color:#fff;letter-spacing:-.03em}\n  .kca5-icon{font-size:28px;line-height:1}\n  .kca5-cond{font-size:11px;color:var(--ca5-sky,#38bdf8);font-weight:500}\n  .kca5-row{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,0.08);padding-top:10px}\n  .kca5-day{text-align:center;font-size:9px;color:#64748b}\n  .kca5-day b{display:block;font-size:10px;color:#e2e8f0;margin-top:2px;font-weight:600}\n</style>\n<div class=\"kca5-card\">\n  <div class=\"kca5-now\">\n    <div><div class=\"kca5-temp\">72°</div><div class=\"kca5-cond\">Partly Cloudy</div></div>\n    <div class=\"kca5-icon\">⛅</div>\n  </div>\n  <div class=\"kca5-row\">\n    <div class=\"kca5-day\">Mon<b>68°</b></div>\n    <div class=\"kca5-day\">Tue<b>71°</b></div>\n    <div class=\"kca5-day\">Wed<b>65°</b></div>\n    <div class=\"kca5-day\">Thu<b>73°</b></div>\n    <div class=\"kca5-day\">Fri<b>70°</b></div>\n  </div>\n</div>"
    },

    {
      id: "CA6",
      section: "cards",
      name: "Music Track Card",
      description: "Album art placeholder, track info, and inline transport controls — compact now-playing surface.",
      creator: "mimo-2-5",
      tags: ["card","music","track","player","now-playing"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--ca6-accent", default: "#ec4899" },
      ],
      code: "<style>\n  .kca6-card{display:flex;align-items:center;gap:10px;background:#141720;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:8px 10px;width:200px;box-shadow:0 8px 20px -6px rgba(0,0,0,0.6)}\n  .kca6-art{width:40px;height:40px;border-radius:6px;background:linear-gradient(135deg,var(--ca6-accent,#ec4899),#8b5cf6);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 3px 10px color-mix(in srgb,var(--ca6-accent,#ec4899) 30%,transparent)}\n  .kca6-info{flex:1;min-width:0}\n  .kca6-title{font-size:11px;font-weight:600;color:#f1f5f9;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kca6-artist{font-size:9.5px;color:#64748b;margin-top:1px}\n  .kca6-prog{height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin-top:5px;position:relative}\n  .kca6-fill{height:100%;width:45%;background:var(--ca6-accent,#ec4899);border-radius:2px}\n  .kca6-btn{width:26px;height:26px;border-radius:50%;background:var(--ca6-accent,#ec4899);border:none;color:#fff;font-size:10px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:opacity .15s ease}\n  .kca6-btn:hover{opacity:.85}\n  @media (prefers-reduced-motion:reduce){.kca6-btn{transition:none}}\n</style>\n<div class=\"kca6-card\">\n  <div class=\"kca6-art\">♫</div>\n  <div class=\"kca6-info\">\n    <div class=\"kca6-title\">Midnight Synth</div>\n    <div class=\"kca6-artist\">Neon Pulse</div>\n    <div class=\"kca6-prog\"><div class=\"kca6-fill\"></div></div>\n  </div>\n  <button type=\"button\" class=\"kca6-btn\">▶</button>\n</div>"
    },

    {
      id: "CA7",
      section: "cards",
      name: "Flipping Concept Card",
      description: "Dual-sided 3D card that flips on hover — front shows summary, back reveals detailed spec readout.",
      creator: "nemotron",
      tags: ["card","flip","hover","dual-sided"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--kca7-accent", default: "#f97316" }
      ],
      code: "<style>\n  .kca7-scene{width:220px;height:124px;perspective:800px}\n  .kca7-card{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.2,1,.3,1);cursor:pointer}\n  .kca7-scene:hover .kca7-card{transform:rotateY(180deg)}\n  .kca7-front,.kca7-back{position:absolute;inset:0;width:100%;height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;padding:12px 14px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 8px 24px rgba(0,0,0,.6)}\n  .kca7-front{background:linear-gradient(145deg,#141720,#0d0f14);border:1px solid rgba(255,255,255,.1)}\n  .kca7-back{background:linear-gradient(145deg,#1a1d28,#12141c);border:1px solid var(--kca7-accent,#f97316);transform:rotateY(180deg);box-shadow:0 0 16px color-mix(in srgb,var(--kca7-accent,#f97316) 20%,transparent)}\n  .kca7-top{display:flex;justify-content:space-between;align-items:center}\n  .kca7-badge{width:24px;height:24px;border-radius:6px;background:color-mix(in srgb,var(--kca7-accent,#f97316) 18%,transparent);color:var(--kca7-accent,#f97316);font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center}\n  .kca7-flip-hint{font-size:9.5px;color:#64748b;font-weight:600}\n  .kca7-title{font-size:13px;font-weight:700;color:#f8fafc;margin:0}\n  .kca7-desc{font-size:10px;color:#94a3b8;margin:2px 0 0}\n  .kca7-back-text{font-size:10.5px;line-height:1.4;color:#cbd5e1;margin:0}\n  .kca7-foot{display:flex;justify-content:space-between;align-items:center;font-size:9px;color:var(--kca7-accent,#f97316);font-weight:700}\n  @media (prefers-reduced-motion:reduce){.kca7-card{transition:none}}\n</style>\n<div class=\"kca7-scene\">\n  <div class=\"kca7-card\">\n    <div class=\"kca7-front\">\n      <div class=\"kca7-top\">\n        <div class=\"kca7-badge\">✦</div>\n        <span class=\"kca7-flip-hint\">Hover to flip ↻</span>\n      </div>\n      <div>\n        <h3 class=\"kca7-title\">Concept Shader</h3>\n        <p class=\"kca7-desc\">Real-time volumetric lighting surface</p>\n      </div>\n    </div>\n    <div class=\"kca7-back\">\n      <p class=\"kca7-back-text\">3D hardware accelerated perspective with zero external dependencies.</p>\n      <div class=\"kca7-foot\">\n        <span>STATUS: READY</span>\n        <span>SPEC v2.4</span>\n      </div>\n    </div>\n  </div>\n</div>"
    },

    {
      id: "MO6",
      section: "modals",
      name: "Fullscreen Takeover",
      description: "Viewport-spanning dark overlay with centered content card and close action — immersive focus mode.",
      creator: "mimo-2-5",
      tags: ["modal","fullscreen","takeover","overlay","immersive"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--mo6-accent", default: "#6366f1" },
      ],
      code: "<style>\n  .kmo6-wrap{position:relative;width:220px;height:140px;background:#060810;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)}\n  .kmo6-scrim{position:absolute;inset:0;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}\n  .kmo6-close{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;color:#94a3b8;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s ease,color .15s ease}\n  .kmo6-close:hover{background:rgba(255,255,255,0.18);color:#fff}\n  .kmo6-icon{font-size:28px;margin-bottom:2px}\n  .kmo6-title{font-size:14px;font-weight:700;color:#f8fafc}\n  .kmo6-desc{font-size:10px;color:#64748b;text-align:center;max-width:160px;line-height:1.4}\n  .kmo6-btn{margin-top:4px;padding:6px 18px;border-radius:8px;border:none;background:var(--mo6-accent,#6366f1);color:#fff;font-size:11px;font-weight:600;cursor:pointer;transition:opacity .15s ease}\n  .kmo6-btn:hover{opacity:.85}\n  @media (prefers-reduced-motion:reduce){.kmo6-close,.kmo6-btn{transition:none}}\n</style>\n<div class=\"kmo6-wrap\">\n  <div class=\"kmo6-scrim\">\n    <button type=\"button\" class=\"kmo6-close\">✕</button>\n    <div class=\"kmo6-icon\">🎬</div>\n    <div class=\"kmo6-title\">Rendering Complete</div>\n    <div class=\"kmo6-desc\">Your 4K export is ready for download.</div>\n    <button type=\"button\" class=\"kmo6-btn\">Download</button>\n  </div>\n</div>"
    },

    {
      id: "MO7",
      section: "modals",
      name: "Tooltip Popover",
      description: "Arrow-anchored floating panel that appears on hover — contextual hint without blocking interaction.",
      creator: "mimo-2-5",
      tags: ["modal","tooltip","popover","contextual","hover"],
      tweaks: [
        { type: "color", label: "Arrow Color", varName: "--mo7-color", default: "#8b5cf6" },
      ],
      code: "<style>\n  .kmo7-area{position:relative;width:220px;height:140px;background:#080a10;border-radius:10px;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center}\n  .kmo7-trigger{padding:6px 14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#e2e8f0;font-size:11px;font-weight:600;cursor:pointer}\n  .kmo7-pop{position:absolute;top:22px;left:50%;transform:translateX(-50%);background:#1e222d;border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:8px 10px;box-shadow:0 8px 20px -4px rgba(0,0,0,0.7);width:160px}\n  .kmo7-pop::before{content:\"\";position:absolute;top:-5px;left:50%;transform:translateX(-50%) rotate(45deg);width:10px;height:10px;background:#1e222d;border-top:1px solid var(--mo7-color,#8b5cf6);border-left:1px solid var(--mo7-color,#8b5cf6)}\n  .kmo7-title{font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:3px}\n  .kmo7-desc{font-size:10px;color:#94a3b8;line-height:1.35}\n</style>\n<div class=\"kmo7-area\">\n  <span class=\"kmo7-trigger\">Hover me</span>\n  <div class=\"kmo7-pop\">\n    <div class=\"kmo7-title\">Quick Tip</div>\n    <div class=\"kmo7-desc\">Hold Shift while dragging to snap to grid alignment.</div>\n  </div>\n</div>"
    },

    {
      id: "MO8",
      section: "modals",
      name: "Confirmation Chain",
      description: "Multi-step wizard dialog with numbered progress dots — guided destructive-action flow.",
      creator: "mimo-2-5",
      tags: ["modal","confirmation","chain","wizard","progress"],
      tweaks: [
        { type: "color", label: "Active Dot", varName: "--mo8-accent", default: "#f43f5e" },
      ],
      code: "<style>\n  .kmo8-card{background:#141720;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;width:210px;box-shadow:0 16px 36px -10px rgba(0,0,0,0.85)}\n  .kmo8-dots{display:flex;justify-content:center;gap:8px;margin-bottom:14px}\n  .kmo8-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.12);transition:background .2s ease,transform .2s ease}\n  .kmo8-dot.on{background:var(--mo8-accent,#f43f5e);box-shadow:0 0 8px var(--mo8-accent,#f43f5e);transform:scale(1.3)}\n  .kmo8-dot.done{background:rgba(255,255,255,0.35)}\n  .kmo8-label{font-size:9px;color:#64748b;text-align:center;margin-bottom:4px;letter-spacing:.05em;font-weight:600}\n  .kmo8-title{font-size:13px;font-weight:700;color:#f8fafc;margin-bottom:3px}\n  .kmo8-desc{font-size:10.5px;color:#94a3b8;line-height:1.35;margin-bottom:12px}\n  .kmo8-btns{display:flex;gap:8px}\n  .kmo8-btn{flex:1;padding:6px;border-radius:6px;border:none;font-size:11px;font-weight:600;cursor:pointer;text-align:center;transition:opacity .15s ease}\n  .kmo8-btn.next{background:var(--mo8-accent,#f43f5e);color:#fff}\n  .kmo8-btn.back{background:rgba(255,255,255,0.08);color:#cbd5e1}\n  .kmo8-btn:hover{opacity:.85}\n  @media (prefers-reduced-motion:reduce){.kmo8-dot,.kmo8-btn{transition:none}}\n</style>\n<div class=\"kmo8-card\">\n  <div class=\"kmo8-dots\">\n    <div class=\"kmo8-dot done\"></div>\n    <div class=\"kmo8-dot on\"></div>\n    <div class=\"kmo8-dot\"></div>\n  </div>\n  <div class=\"kmo8-label\">STEP 2 OF 3</div>\n  <div class=\"kmo8-title\">Confirm Removal</div>\n  <div class=\"kmo8-desc\">Select which dependencies to keep alongside the primary item.</div>\n  <div class=\"kmo8-btns\">\n    <button type=\"button\" class=\"kmo8-btn back\">Back</button>\n    <button type=\"button\" class=\"kmo8-btn next\">Continue</button>\n  </div>\n</div>"
    },

    /* ---- Mimo 2.5 additions: Animations ---- */

    {
      id: "AN2",
      section: "animations",
      name: "Morphing Blob",
      description: "Continuous organic shape-shift via animated border-radius — form is never the same twice.",
      creator: "mimo-2-5",
      tags: ["animation","morph","blob","organic","border-radius"],
      tweaks: [
        { type: "color", label: "Blob Color", varName: "--an2-color", default: "#8b5cf6" },
      ],
      code: "<style>\n  @keyframes kan2-morph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}50%{border-radius:50% 60% 30% 60%/30% 40% 70% 60%}75%{border-radius:40% 60% 50% 40%/60% 50% 40% 60%}}\n  @keyframes kan2-drift{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(3px,-2px) rotate(2deg)}50%{transform:translate(-2px,3px) rotate(-1deg)}75%{transform:translate(2px,1px) rotate(1.5deg)}}\n  .kan2-blob{width:56px;height:56px;background:linear-gradient(135deg,var(--an2-color,#8b5cf6),#ec4899);animation:kan2-morph 8s ease-in-out infinite,kan2-drift 12s ease-in-out infinite;box-shadow:0 0 24px rgba(139,92,246,0.45)}\n  @media (prefers-reduced-motion:reduce){.kan2-blob{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan2-blob\"></div>\n</div>"
    },

    {
      id: "AN3",
      section: "animations",
      name: "Text Cascade",
      description: "Words slide up and fade in with staggered delays — choreographed entrance from below.",
      creator: "mimo-2-5",
      tags: ["animation","text","cascade","reveal","stagger"],
      tweaks: [
        { type: "color", label: "Text Color", varName: "--an3-color", default: "#a78bfa" },
      ],
      code: "<style>\n  @keyframes kan3-loop{0%,10%{opacity:0;transform:translateY(14px)}20%,80%{opacity:1;transform:translateY(0)}90%,100%{opacity:0;transform:translateY(-10px)}}\n  .kan3-wrap{display:flex;align-items:center;justify-content:center;gap:6px;font-size:15px;font-weight:700;letter-spacing:.02em;color:var(--an3-color,#a78bfa);white-space:nowrap;max-width:100%}\n  .kan3-word{display:inline-block;opacity:0;animation:kan3-loop 3.2s ease-in-out infinite}\n  .kan3-word:nth-child(1){animation-delay:0s}\n  .kan3-word:nth-child(2){animation-delay:.2s}\n  .kan3-word:nth-child(3){animation-delay:.4s}\n  .kan3-word:nth-child(4){animation-delay:.6s}\n  @media (prefers-reduced-motion:reduce){.kan3-word{animation:none;opacity:1;transform:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan3-wrap\">\n    <span class=\"kan3-word\">Motion</span>\n    <span class=\"kan3-word\">is</span>\n    <span class=\"kan3-word\">the</span>\n    <span class=\"kan3-word\">design.</span>\n  </div>\n</div>"
    },

    {
      id: "AN4",
      section: "animations",
      name: "Orbital Rings",
      description: "Multiple elements orbiting a center at different speeds and radii — solar-system choreography.",
      creator: "mimo-2-5",
      tags: ["animation","orbit","rings","circular","rotating"],
      tweaks: [
        { type: "color", label: "Center Color", varName: "--an4-center", default: "#38bdf8" },
      ],
      code: "<style>\n  @keyframes kan4-orbit{to{transform:rotate(360deg)}}\n  @keyframes kan4-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.2);opacity:.8}}\n  @media (prefers-reduced-motion:reduce){.kan4-orb,.kan4-center,.kan4-ring{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;position:relative\">\n  <div style=\"position:absolute;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,0.12)\"></div>\n  <div style=\"position:absolute;width:68px;height:68px;border-radius:50%;border:1px solid rgba(255,255,255,0.08)\"></div>\n  <div class=\"kan4-center\" style=\"width:14px;height:14px;border-radius:50%;background:var(--an4-center,#38bdf8);box-shadow:0 0 12px var(--an4-center,#38bdf8);position:relative;z-index:2;animation:kan4-pulse 3s ease-in-out infinite\"></div>\n  <div class=\"kan4-orb\" style=\"position:absolute;width:40px;height:40px;border-radius:50%;animation:kan4-orbit 3.5s linear infinite;transform-origin:center\">\n    <div style=\"width:7px;height:7px;border-radius:50%;background:#f43f5e;position:absolute;top:-3.5px;left:calc(50% - 3.5px);box-shadow:0 0 6px #f43f5e\"></div>\n  </div>\n  <div class=\"kan4-orb\" style=\"position:absolute;width:68px;height:68px;border-radius:50%;animation:kan4-orbit 7s linear infinite;transform-origin:center\">\n    <div style=\"width:6px;height:6px;border-radius:50%;background:#10b981;position:absolute;top:-3px;left:calc(50% - 3px);box-shadow:0 0 6px #10b981\"></div>\n  </div>\n</div>"
    },

    {
      id: "AN5",
      section: "animations",
      name: "Wave Pulse",
      description: "Vertical bars undulate with staggered phase — the wave IS the visualization.",
      creator: "mimo-2-5",
      tags: ["animation","wave","bars","pulse","audio"],
      tweaks: [
        { type: "color", label: "Bar Color", varName: "--an5-color", default: "#8b5cf6" },
      ],
      code: "<style>\n  @keyframes kan5-wave{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}\n  .kan5-bar{width:4px;border-radius:2px;background:var(--an5-color,#8b5cf6);transform-origin:center;animation:kan5-wave 1.2s ease-in-out infinite}\n  .kan5-bar:nth-child(1){animation-delay:0s}\n  .kan5-bar:nth-child(2){animation-delay:.08s}\n  .kan5-bar:nth-child(3){animation-delay:.16s}\n  .kan5-bar:nth-child(4){animation-delay:.24s}\n  .kan5-bar:nth-child(5){animation-delay:.32s}\n  .kan5-bar:nth-child(6){animation-delay:.4s}\n  .kan5-bar:nth-child(7){animation-delay:.48s}\n  .kan5-bar:nth-child(8){animation-delay:.56s}\n  .kan5-bar:nth-child(9){animation-delay:.64s}\n  .kan5-bar:nth-child(10){animation-delay:.72s}\n  .kan5-bar:nth-child(11){animation-delay:.8s}\n  .kan5-bar:nth-child(12){animation-delay:.88s}\n  @media (prefers-reduced-motion:reduce){.kan5-bar{animation:none;transform:scaleY(1)}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:200px;height:60px\">\n  <div style=\"display:flex;align-items:center;gap:5px;height:40px\">\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n    <div class=\"kan5-bar\" style=\"height:40px\"></div>\n  </div>\n</div>"
    },

    {
      id: "AN6",
      section: "animations",
      name: "Quantum Lattice",
      description: "Floating node matrix with cross-phase geometric oscillation and pulsing connecting energy ripples.",
      creator: "gemini",
      tags: ["animation", "quantum", "matrix", "lattice", "grid", "pulse"],
      tweaks: [
        { type: "color", label: "Lattice Accent", varName: "--an6-accent", default: "#818cf8" }
      ],
      code: "<style>\n  @keyframes kan6-float-1{0%,100%{transform:translateY(0px) scale(1);opacity:.9}50%{transform:translateY(-8px) scale(1.15);opacity:1}}\n  @keyframes kan6-float-2{0%,100%{transform:translateY(0px) scale(1.15);opacity:1}50%{transform:translateY(8px) scale(.85);opacity:.65}}\n  @keyframes kan6-pulse-ring{0%{transform:scale(.6);opacity:.8}100%{transform:scale(2.2);opacity:0}}\n  .kan6-grid{display:grid;grid-template-columns:repeat(3,20px);grid-gap:12px;position:relative}\n  .kan6-node{width:20px;height:20px;border-radius:6px;background:var(--an6-accent,#818cf8);position:relative;box-shadow:0 0 12px color-mix(in srgb,var(--an6-accent,#818cf8) 60%,transparent)}\n  .kan6-node:nth-child(odd){animation:kan6-float-1 2.4s ease-in-out infinite}\n  .kan6-node:nth-child(even){animation:kan6-float-2 2.4s ease-in-out infinite}\n  .kan6-node:nth-child(1){animation-delay:0s}\n  .kan6-node:nth-child(2){animation-delay:.2s}\n  .kan6-node:nth-child(3){animation-delay:.4s}\n  .kan6-node:nth-child(4){animation-delay:.6s}\n  .kan6-node:nth-child(5){animation-delay:.8s}\n  .kan6-node:nth-child(6){animation-delay:1s}\n  .kan6-node:nth-child(7){animation-delay:1.2s}\n  .kan6-node:nth-child(8){animation-delay:1.4s}\n  .kan6-node:nth-child(9){animation-delay:1.6s}\n  .kan6-ripple{position:absolute;inset:-4px;border:1.5px solid var(--an6-accent,#818cf8);border-radius:8px;animation:kan6-pulse-ring 2s ease-out infinite;pointer-events:none}\n  @media (prefers-reduced-motion:reduce){.kan6-node,.kan6-ripple{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan6-grid\">\n    <div class=\"kan6-node\"><span class=\"kan6-ripple\"></span></div>\n    <div class=\"kan6-node\"></div>\n    <div class=\"kan6-node\"><span class=\"kan6-ripple\" style=\"animation-delay:.7s\"></span></div>\n    <div class=\"kan6-node\"></div>\n    <div class=\"kan6-node\"><span class=\"kan6-ripple\" style=\"animation-delay:1.4s\"></span></div>\n    <div class=\"kan6-node\"></div>\n    <div class=\"kan6-node\"><span class=\"kan6-ripple\" style=\"animation-delay:.35s\"></span></div>\n    <div class=\"kan6-node\"></div>\n    <div class=\"kan6-node\"><span class=\"kan6-ripple\" style=\"animation-delay:1.05s\"></span></div>\n  </div>\n</div>"
    },

    {
      id: "AN7",
      section: "animations",
      name: "Tesseract Wireframe",
      description: "Nested 3D geometric cubes counter-rotating through perspective dimensions with a glowing singularity core.",
      creator: "gemini",
      tags: ["animation", "tesseract", "3d", "cube", "geometry", "isometric"],
      tweaks: [
        { type: "color", label: "Wireframe Color", varName: "--an7-color", default: "#22d3ee" }
      ],
      code: "<style>\n  @keyframes kan7-spin-outer{0%{transform:rotateX(45deg) rotateY(45deg) rotateZ(0deg)}100%{transform:rotateX(45deg) rotateY(45deg) rotateZ(360deg)}}\n  @keyframes kan7-spin-inner{0%{transform:rotateX(-35deg) rotateY(35deg) rotateZ(360deg)}100%{transform:rotateX(-35deg) rotateY(35deg) rotateZ(0deg)}}\n  .kan7-stage{perspective:500px;display:flex;align-items:center;justify-content:center;width:64px;height:64px;position:relative}\n  .kan7-outer{position:absolute;width:44px;height:44px;border:1.5px solid var(--an7-color,#22d3ee);border-radius:7px;transform-style:preserve-3d;box-shadow:0 0 14px color-mix(in srgb,var(--an7-color,#22d3ee) 40%,transparent);animation:kan7-spin-outer 6s linear infinite}\n  .kan7-inner{position:absolute;width:24px;height:24px;border:1.5px dashed color-mix(in srgb,var(--an7-color,#22d3ee) 75%,white);border-radius:4px;transform-style:preserve-3d;animation:kan7-spin-inner 3.5s linear infinite}\n  .kan7-core{position:absolute;width:6px;height:6px;background:#fff;border-radius:50%;box-shadow:0 0 8px #fff}\n  @media (prefers-reduced-motion:reduce){.kan7-outer,.kan7-inner{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan7-stage\">\n    <div class=\"kan7-outer\"></div>\n    <div class=\"kan7-inner\"></div>\n    <div class=\"kan7-core\"></div>\n  </div>\n</div>"
    },

    {
      id: "AN8",
      section: "animations",
      name: "Sonar Ping",
      description: "Tactical rotating radar sweep with expanding sonar echo wave rings and transient target blips.",
      creator: "gemini",
      tags: ["animation", "radar", "sonar", "sweep", "echo", "ping"],
      tweaks: [
        { type: "color", label: "Sonar Beam", varName: "--an8-beam", default: "#10b981" }
      ],
      code: "<style>\n  @keyframes kan8-radar-sweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\n  @keyframes kan8-sonar-echo{0%{transform:scale(.2);opacity:.9}80%{opacity:.4}100%{transform:scale(2.4);opacity:0}}\n  @keyframes kan8-blip-fade{0%,100%{opacity:.1;transform:scale(.8)}30%{opacity:1;transform:scale(1.3)}60%{opacity:.2;transform:scale(.9)}}\n  .kan8-scope{position:relative;width:62px;height:62px;border-radius:50%;border:1px solid color-mix(in srgb,var(--an8-beam,#10b981) 30%,transparent);background:radial-gradient(circle,color-mix(in srgb,var(--an8-beam,#10b981) 8%,transparent) 0%,transparent 70%);display:flex;align-items:center;justify-content:center;overflow:hidden}\n  .kan8-sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,color-mix(in srgb,var(--an8-beam,#10b981) 50%,transparent) 0deg,transparent 65deg,transparent 360deg);animation:kan8-radar-sweep 3s linear infinite;transform-origin:center}\n  .kan8-wave{position:absolute;width:28px;height:28px;border:1px solid var(--an8-beam,#10b981);border-radius:50%;animation:kan8-sonar-echo 2.8s ease-out infinite;pointer-events:none}\n  .kan8-blip{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--an8-beam,#10b981);box-shadow:0 0 6px var(--an8-beam,#10b981);animation:kan8-blip-fade 3s ease-in-out infinite}\n  @media (prefers-reduced-motion:reduce){.kan8-sweep,.kan8-wave,.kan8-blip{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan8-scope\">\n    <div class=\"kan8-sweep\"></div>\n    <div class=\"kan8-wave\"></div>\n    <div class=\"kan8-wave\" style=\"animation-delay:1.4s\"></div>\n    <div class=\"kan8-blip\" style=\"top:14px;right:16px;animation-delay:.8s\"></div>\n    <div class=\"kan8-blip\" style=\"bottom:18px;left:14px;animation-delay:2.1s\"></div>\n  </div>\n</div>"
    },

    {
      id: "AN9",
      section: "animations",
      name: "Liquid Pendulum",
      description: "Harmonic pendulum with natural physics ease curve and a pulsing chromatic fluid bob.",
      creator: "gemini",
      tags: ["animation", "pendulum", "physics", "harmonic", "metronome", "glow"],
      tweaks: [
        { type: "color", label: "Pendulum Glow", varName: "--an9-glow", default: "#f43f5e" }
      ],
      code: "<style>\n  @keyframes kan9-swing{0%{transform:rotate(36deg)}50%{transform:rotate(-36deg)}100%{transform:rotate(36deg)}}\n  @keyframes kan9-glow-pulse{0%,100%{opacity:.7;transform:scale(.95)}50%{opacity:1;transform:scale(1.15)}}\n  .kan9-pendulum{width:3px;height:44px;background:linear-gradient(180deg,rgba(255,255,255,.15) 0%,var(--an9-glow,#f43f5e) 100%);transform-origin:top center;position:relative;animation:kan9-swing 2.2s cubic-bezier(.45,.05,.55,.95) infinite}\n  .kan9-bob{position:absolute;bottom:-7px;left:-6.5px;width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff 0%,var(--an9-glow,#f43f5e) 65%,#881337 100%);box-shadow:0 0 14px var(--an9-glow,#f43f5e);animation:kan9-glow-pulse 1.1s ease-in-out infinite}\n  .kan9-pivot{position:absolute;top:-3px;left:-2px;width:7px;height:7px;border-radius:50%;background:#cbd5e1}\n  @media (prefers-reduced-motion:reduce){.kan9-pendulum,.kan9-bob{animation:none;transform:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%;padding-top:4px\">\n  <div class=\"kan9-pendulum\">\n    <div class=\"kan9-pivot\"></div>\n    <div class=\"kan9-bob\"></div>\n  </div>\n</div>"
    },

    /* ---- Opus additions: structurally distinct specimens across underserved drawers ---- */

    {
      id: "FO6",
      section: "forms",
      name: "Inline Editable Field",
      description: "Click-to-edit text field with hover dashed cues, edit icon, and commit checkmark on focus.",
      creator: "opus",
      tags: ["form","inline","editable","click-to-edit"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--fo6-accent", default: "#f5323c" }
      ],
      code: "<style>\n  .kfo6-box{display:inline-flex;flex-direction:column;gap:6px;padding:8px 12px;background:#141720;border:1px solid rgba(255,255,255,0.08);border-radius:10px}\n  .kfo6-tag{font-size:9.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#64748b}\n  .kfo6-wrap{display:inline-flex;align-items:center;gap:8px;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px dashed rgba(255,255,255,0.18);transition:border-color .18s ease}\n  .kfo6-wrap:hover{border-color:var(--fo6-accent,#f5323c);background:rgba(255,255,255,0.07)}\n  .kfo6-wrap:focus-within{border-style:solid;border-color:var(--fo6-accent,#f5323c);box-shadow:0 0 10px color-mix(in srgb,var(--fo6-accent,#f5323c) 30%,transparent)}\n  .kfo6-val{font-size:13px;font-weight:600;color:#f1f5f9;background:transparent;border:none;outline:none;padding:2px 0;width:120px}\n  .kfo6-ico{color:#64748b;font-size:11px;transition:color .18s ease;pointer-events:none}\n  .kfo6-wrap:hover .kfo6-ico{color:var(--fo6-accent,#f5323c)}\n  .kfo6-ok{width:20px;height:20px;border-radius:50%;background:var(--fo6-accent,#f5323c);border:none;color:#fff;font-size:10px;font-weight:800;cursor:pointer;display:none;align-items:center;justify-content:center}\n  .kfo6-wrap:focus-within .kfo6-ico{display:none}\n  .kfo6-wrap:focus-within .kfo6-ok{display:flex}\n  @media (prefers-reduced-motion:reduce){.kfo6-wrap,.kfo6-ico{transition:none}}\n</style>\n<div class=\"kfo6-box\">\n  <span class=\"kfo6-tag\">Filename (Click to edit)</span>\n  <div class=\"kfo6-wrap\">\n    <input class=\"kfo6-val\" type=\"text\" value=\"Project Alpha\" spellcheck=\"false\">\n    <span class=\"kfo6-ico\">✎</span>\n    <button type=\"button\" class=\"kfo6-ok\" title=\"Save\">✓</button>\n  </div>\n</div>"
    },

    {
      id: "FO7",
      section: "forms",
      name: "Textarea with Counter",
      description: "Multi-line text area with live character count and subtle gradient focus ring — structurally distinct from single-line inputs.",
      creator: "opus",
      tags: ["form","textarea","counter","multiline"],
      tweaks: [
        { type: "color", label: "Border Glow", varName: "--fo7-glow", default: "#f5323c" }
      ],
      code: "<style>\n  .kfo7-wrap{position:relative;width:min(100%,200px)}\n  .kfo7-ta{width:100%;height:64px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:8px 10px;color:#e2e8f0;font-size:11px;line-height:1.5;resize:none;outline:none;transition:border-color .15s ease,box-shadow .15s ease}\n  .kfo7-ta:focus{border-color:var(--fo7-glow,#f5323c);box-shadow:0 0 0 2px color-mix(in srgb,var(--fo7-glow,#f5323c) 25%,transparent)}\n  .kfo7-count{position:absolute;bottom:6px;right:8px;font-size:9px;color:#475569;font-variant-numeric:tabular-nums}\n  @media (prefers-reduced-motion:reduce){.kfo7-ta{transition:none}}\n</style>\n<div class=\"kfo7-wrap\">\n  <textarea class=\"kfo7-ta\" maxlength=\"280\" spellcheck=\"false\">Describe the scene you want to generate…</textarea>\n  <span class=\"kfo7-count\">42 / 280</span>\n</div>"
    },

    {
      id: "TO6",
      section: "toggles",
      name: "Day Night Toggle",
      description: "Interactive themed toggle with sun/moon icons that swap and animate on click.",
      creator: "opus",
      tags: ["toggle","theme","day-night","icon","interactive"],
      tweaks: [
        { type: "color", label: "Day Color", varName: "--to6-day", default: "#fbbf24" },
        { type: "color", label: "Night Color", varName: "--to6-night", default: "#6366f1" }
      ],
      code: "<style>\n  .kto6-lbl{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto6-in{position:absolute;opacity:0;pointer-events:none}\n  .kto6-track{display:inline-flex;align-items:center;width:52px;height:28px;border-radius:9999px;background:linear-gradient(135deg,var(--to6-night,#6366f1),#1e1b4b);position:relative;box-shadow:inset 0 1px 3px rgba(0,0,0,.4);border:1px solid rgba(255,255,255,0.08);transition:background .25s ease}\n  .kto6-knob{position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:linear-gradient(145deg,#f1f5f9,#e2e8f0);box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:12px;transition:transform .22s cubic-bezier(.2,1,.3,1)}\n  .kto6-in:checked + .kto6-track{background:linear-gradient(135deg,var(--to6-day,#fbbf24),#f97316)}\n  .kto6-in:checked + .kto6-track .kto6-knob{transform:translateX(24px)}\n  @media (prefers-reduced-motion:reduce){.kto6-track,.kto6-knob{transition:none}}\n</style>\n<label class=\"kto6-lbl\">\n  <input type=\"checkbox\" class=\"kto6-in\" onchange=\"this.nextElementSibling.querySelector('.kto6-knob').textContent=this.checked?'☀️':'🌙'\">\n  <span class=\"kto6-track\">\n    <span class=\"kto6-knob\">🌙</span>\n  </span>\n  <span style=\"font-size:12px;color:#c4b5fd;font-weight:600\">Theme</span>\n</label>"
    },

    {
      id: "AL5",
      section: "alerts",
      name: "Inline Error Shake",
      description: "Compact inline error with a red left accent and a CSS shake keyframe on hover — physicality communicates urgency without a full banner.",
      creator: "opus",
      tags: ["alert","error","inline","shake"],
      tweaks: [
        { type: "color", label: "Error Color", varName: "--al5-err", default: "#f5323c" }
      ],
      code: "<style>\n  @keyframes kal5-shake{0%,100%{transform:translateX(0)}15%{transform:translateX(-4px)}30%{transform:translateX(4px)}45%{transform:translateX(-3px)}60%{transform:translateX(2px)}75%{transform:translateX(-1px)}}\n  .kal5-box{display:flex;align-items:center;gap:8px;background:rgba(245,50,60,0.06);border:1px solid rgba(245,50,60,0.25);border-left:3px solid var(--al5-err,#f5323c);border-radius:6px;padding:6px 10px;width:220px;cursor:default}\n  .kal5-box:hover{animation:kal5-shake .45s ease}\n  .kal5-icon{color:var(--al5-err,#f5323c);font-size:13px;font-weight:700;flex-shrink:0}\n  .kal5-msg{font-size:11px;color:#fca5a5;line-height:1.3}\n  .kal5-msg strong{color:#fef2f2;font-weight:700}\n  @media (prefers-reduced-motion:reduce){.kal5-box:hover{animation:none}}\n</style>\n<div class=\"kal5-box\">\n  <span class=\"kal5-icon\">✕</span>\n  <div class=\"kal5-msg\"><strong>GPU out of memory.</strong> Reduce batch size or resolution.</div>\n</div>"
    },

    {
      id: "AL6",
      section: "alerts",
      name: "Countdown Autodismiss",
      description: "Toast with an autodismissing progress bar that counts down and loops every 5s — hover to pause.",
      creator: "opus",
      tags: ["alert","toast","countdown","autodismiss","timer","animated"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--al6-accent", default: "#10b981" }
      ],
      code: "<style>\n  @keyframes kal6-cycle{0%{transform:translateY(12px);opacity:0}6%{transform:translateY(0);opacity:1}84%{transform:translateY(0);opacity:1}90%,100%{transform:translateY(-12px);opacity:0}}\n  @keyframes kal6-deplete{0%,6%{transform:scaleX(1)}84%{transform:scaleX(0)}100%{transform:scaleX(0)}}\n  .kal6-toast{display:flex;align-items:center;gap:8px;background:#141720;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 12px;width:220px;position:relative;overflow:hidden;box-shadow:0 8px 20px -6px rgba(0,0,0,.6);animation:kal6-cycle 5s ease-in-out infinite}\n  .kal6-toast:hover,.kal6-toast:hover .kal6-bar{animation-play-state:paused}\n  .kal6-bar{position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--al6-accent,#10b981);transform-origin:left;animation:kal6-deplete 5s linear infinite;box-shadow:0 0 6px var(--al6-accent,#10b981)}\n  .kal6-pip{width:18px;height:18px;border-radius:50%;background:var(--al6-accent,#10b981);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0}\n  .kal6-txt{font-size:11px;color:#e2e8f0;font-weight:500;flex:1}\n  .kal6-time{font-size:10px;color:#64748b;font-variant-numeric:tabular-nums;font-family:monospace}\n  @media (prefers-reduced-motion:reduce){.kal6-toast,.kal6-bar{animation:none;transform:none;opacity:1}}\n</style>\n<div class=\"kal6-toast\">\n  <span class=\"kal6-pip\">✓</span>\n  <span class=\"kal6-txt\">Saved to library</span>\n  <span class=\"kal6-time\">5s</span>\n  <div class=\"kal6-bar\"></div>\n</div>"
    },

    {
      id: "CA8",
      section: "cards",
      name: "Notification Feed Card",
      description: "Stacked activity feed with avatar initials, timestamps and action types — a timeline surface distinct from single-metric tiles.",
      creator: "opus",
      tags: ["card","feed","notification","activity","timeline"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--ca8-accent", default: "#f5323c" }
      ],
      code: "<style>\n  .kca8-card{background:#141720;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:12px;width:210px;box-shadow:0 8px 24px -8px rgba(0,0,0,.6)}\n  .kca8-hdr{font-size:11px;font-weight:700;color:#f8fafc;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}\n  .kca8-badge{font-size:9px;padding:2px 6px;border-radius:9999px;background:var(--ca8-accent,#f5323c);color:#fff;font-weight:700}\n  .kca8-item{display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid rgba(255,255,255,0.05)}\n  .kca8-ava{width:24px;height:24px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0}\n  .kca8-body{flex:1;min-width:0}\n  .kca8-act{font-size:10px;color:#cbd5e1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kca8-time{font-size:9px;color:#475569}\n</style>\n<div class=\"kca8-card\">\n  <div class=\"kca8-hdr\"><span>Activity</span><span class=\"kca8-badge\">3</span></div>\n  <div class=\"kca8-item\"><span class=\"kca8-ava\" style=\"background:#8b5cf6\">JK</span><div class=\"kca8-body\"><div class=\"kca8-act\">Exported 4K render</div><div class=\"kca8-time\">2m ago</div></div></div>\n  <div class=\"kca8-item\"><span class=\"kca8-ava\" style=\"background:#10b981\">AI</span><div class=\"kca8-body\"><div class=\"kca8-act\">Upscaled batch complete</div><div class=\"kca8-time\">8m ago</div></div></div>\n  <div class=\"kca8-item\"><span class=\"kca8-ava\" style=\"background:var(--ca8-accent,#f5323c)\">MR</span><div class=\"kca8-body\"><div class=\"kca8-act\">Commented on Timeline</div><div class=\"kca8-time\">14m ago</div></div></div>\n</div>"
    },

    {
      id: "NA6",
      section: "navigation",
      name: "Sidebar Icon Rail",
      description: "Vertical icon-only rail with tooltip-style labels — structurally different from horizontal docks, breadcrumbs, and tab bars.",
      creator: "opus",
      tags: ["navigation","sidebar","rail","vertical","icon"],
      tweaks: [
        { type: "color", label: "Active Accent", varName: "--na6-accent", default: "#f5323c" }
      ],
      code: "<style>\n  .kna6-rail{display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(15,23,42,0.9);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:6px;width:40px}\n  .kna6-item{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#64748b;cursor:pointer;position:relative;transition:background .15s ease,color .15s ease}\n  .kna6-item:hover{background:rgba(255,255,255,0.06);color:#e2e8f0}\n  .kna6-item.on{background:color-mix(in srgb,var(--na6-accent,#f5323c) 18%,transparent);color:var(--na6-accent,#f5323c)}\n  .kna6-item.on::after{content:\"\";position:absolute;left:-6px;top:50%;transform:translateY(-50%);width:3px;height:14px;border-radius:0 3px 3px 0;background:var(--na6-accent,#f5323c)}\n  .kna6-sep{width:20px;height:1px;background:rgba(255,255,255,0.08);margin:2px 0}\n  @media (prefers-reduced-motion:reduce){.kna6-item{transition:none}}\n</style>\n<nav class=\"kna6-rail\">\n  <span class=\"kna6-item on\">⊞</span>\n  <span class=\"kna6-item\">⚡</span>\n  <span class=\"kna6-item\">♫</span>\n  <div class=\"kna6-sep\"></div>\n  <span class=\"kna6-item\">⚙</span>\n</nav>"
    },

    {
      id: "LO6",
      section: "loaders",
      name: "DNA Helix Spinner",
      description: "Twin counter-rotating dot chains that interleave like a DNA strand — organic double-helix motion distinct from rings, bars, and dots.",
      creator: "opus",
      tags: ["loader","dna","helix","spinner","organic"],
      tweaks: [
        { type: "color", label: "Strand A", varName: "--lo6-a", default: "#f5323c" },
        { type: "color", label: "Strand B", varName: "--lo6-b", default: "#38bdf8" }
      ],
      code: "<style>\n  @keyframes klo6-spin{to{transform:rotate(360deg)}}\n  @keyframes klo6-pulse{0%,100%{opacity:.4;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}\n  .klo6-helix{position:relative;width:40px;height:40px;animation:klo6-spin 2.4s linear infinite}\n  .klo6-dot{position:absolute;width:7px;height:7px;border-radius:50%;animation:klo6-pulse 1.2s ease-in-out infinite}\n  .klo6-a{background:var(--lo6-a,#f5323c);box-shadow:0 0 6px var(--lo6-a,#f5323c)}\n  .klo6-b{background:var(--lo6-b,#38bdf8);box-shadow:0 0 6px var(--lo6-b,#38bdf8)}\n  @media (prefers-reduced-motion:reduce){.klo6-helix,.klo6-dot{animation:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center\">\n  <div class=\"klo6-helix\">\n    <div class=\"klo6-dot klo6-a\" style=\"top:0;left:50%;transform:translateX(-50%)\"></div>\n    <div class=\"klo6-dot klo6-b\" style=\"top:0;right:0;animation-delay:.6s\"></div>\n    <div class=\"klo6-dot klo6-a\" style=\"top:50%;right:0;transform:translateY(-50%);animation-delay:.3s\"></div>\n    <div class=\"klo6-dot klo6-b\" style=\"bottom:0;right:0;left:50%;transform:translateX(-50%);animation-delay:.9s\"></div>\n    <div class=\"klo6-dot klo6-a\" style=\"bottom:0;left:0;animation-delay:.6s\"></div>\n    <div class=\"klo6-dot klo6-b\" style=\"top:50%;left:0;transform:translateY(-50%);animation-delay:.15s\"></div>\n  </div>\n</div>"
    },

    {
      id: "AN10",
      section: "animations",
      name: "Typewriter Cursor",
      description: "Text appears character-by-character with a blinking block cursor — a typing/terminal reveal animation unlike any existing motion specimen.",
      creator: "opus",
      tags: ["animation","typewriter","cursor","text","reveal"],
      tweaks: [
        { type: "color", label: "Text Color", varName: "--an10-color", default: "#f5323c" }
      ],
      code: "<style>\n  @keyframes kan10-type{from{width:0}to{width:13ch}}\n  @keyframes kan10-blink{50%{opacity:0}}\n  .kan10-wrap{display:inline-flex;align-items:center;font-family:'Cascadia Mono',Consolas,monospace;font-size:14px;font-weight:600;color:var(--an10-color,#f5323c)}\n  .kan10-text{overflow:hidden;white-space:nowrap;border-right:2px solid var(--an10-color,#f5323c);animation:kan10-type 2.5s steps(13) infinite,kan10-blink .6s step-end infinite;width:13ch;letter-spacing:.04em}\n  @media (prefers-reduced-motion:reduce){.kan10-text{animation:none;width:auto;border-right:2px solid var(--an10-color,#f5323c)}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan10-wrap\">\n    <span class=\"kan10-text\">Hello, world.</span>\n  </div>\n</div>"
    },

    {
      id: "SL8",
      section: "sliders",
      name: "Radial Dial",
      description: "SVG arc gauge controlled like a volume knob — a radial interface structurally unlike every linear track and dot meter in the drawer.",
      creator: "opus",
      tags: ["slider","dial","radial","knob","arc"],
      tweaks: [
        { type: "color", label: "Arc Color", varName: "--sl8-arc", default: "#f5323c" },
        { type: "range", label: "Value", varName: "--sl8-val", min: 0, max: 100, step: 5, unit: "%", default: 72 }
      ],
      code: "<style>\n  .ksl8-dial{position:relative;width:72px;height:72px;cursor:pointer}\n  .ksl8-dial:hover .ksl8-thumb{transform:scale(1.15)}\n  .ksl8-bg{fill:none;stroke:rgba(255,255,255,0.08);stroke-width:6}\n  .ksl8-arc{fill:none;stroke:var(--sl8-arc,#f5323c);stroke-width:6;stroke-linecap:round;filter:drop-shadow(0 0 4px var(--sl8-arc,#f5323c))}\n  .ksl8-val{font-size:14px;font-weight:800;fill:#f1f5f9}\n  .ksl8-label{font-size:8px;fill:#64748b;letter-spacing:.06em}\n  .ksl8-thumb{transition:transform .15s ease}\n  @media (prefers-reduced-motion:reduce){.ksl8-thumb{transition:none}}\n</style>\n<div style=\"display:inline-flex;align-items:center;gap:14px\">\n  <svg class=\"ksl8-dial\" viewBox=\"0 0 72 72\">\n    <circle class=\"ksl8-bg\" cx=\"36\" cy=\"36\" r=\"28\" stroke-dasharray=\"132\" stroke-dashoffset=\"-44\" transform=\"rotate(135 36 36)\"/>\n    <circle class=\"ksl8-arc\" cx=\"36\" cy=\"36\" r=\"28\" stroke-dasharray=\"132\" stroke-dashoffset=\"calc(132 - 132 * var(--sl8-val,72) / 100)\" transform=\"rotate(135 36 36)\"/>\n    <text class=\"ksl8-val\" x=\"36\" y=\"38\" text-anchor=\"middle\" dominant-baseline=\"middle\">72</text>\n    <text class=\"ksl8-label\" x=\"36\" y=\"50\" text-anchor=\"middle\">VOL</text>\n  </svg>\n</div>"
    },

    {
      id: "EF6",
      section: "effects",
      name: "Scan Lines CRT",
      description: "Retro CRT scanline overlay with subtle flicker — analog TV distortion that no other effect replicates.",
      creator: "opus",
      tags: ["effect","crt","scanlines","retro","distortion"],
      tweaks: [
        { type: "range", label: "Intensity", varName: "--ef6-int", min: 2, max: 15, step: 1, unit: "", default: 6 }
      ],
      code: "<style>\n  @keyframes kef6-flicker{0%,100%{opacity:calc(var(--ef6-int,6)/100)}50%{opacity:calc(var(--ef6-int,6)/100 + 0.02)}}\n  .kef6-crt{position:relative;width:190px;height:70px;border-radius:10px;background:#0a0c12;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}\n  .kef6-crt::after{content:\"\";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px);animation:kef6-flicker .08s linear infinite;pointer-events:none;border-radius:inherit}\n  .kef6-lbl{position:relative;z-index:1;font-weight:700;font-size:11px;letter-spacing:.12em;color:#4ade80;text-shadow:0 0 8px rgba(74,222,128,.6);font-family:'Cascadia Mono',Consolas,monospace}\n  @media (prefers-reduced-motion:reduce){.kef6-crt::after{animation:none}}\n</style>\n<div class=\"kef6-crt\">\n  <span class=\"kef6-lbl\">SIGNAL LOCKED</span>\n</div>"
    },

    {
      id: "BA7",
      section: "badges",
      name: "Ribbon Corner Badge",
      description: "Folded ribbon badge anchored to a corner — a structural silhouette unlike any circular, pill, or diamond badge in the drawer.",
      creator: "opus",
      tags: ["badge","ribbon","corner","folded","label"],
      tweaks: [
        { type: "color", label: "Ribbon Color", varName: "--ba7-ribbon", default: "#f5323c" }
      ],
      code: "<style>\n  .kba7-wrap{position:relative;width:80px;height:80px;background:#141720;border-radius:10px;border:1px solid rgba(255,255,255,0.08);overflow:hidden}\n  .kba7-ribbon{position:absolute;top:12px;right:-28px;width:100px;padding:3px 0;background:var(--ba7-ribbon,#f5323c);color:#fff;font-size:9px;font-weight:800;letter-spacing:.06em;text-align:center;transform:rotate(45deg);box-shadow:0 2px 8px rgba(0,0,0,.4)}\n</style>\n<div class=\"kba7-wrap\">\n  <div class=\"kba7-ribbon\">NEW</div>\n</div>"
    },

    {
      id: "MO9",
      section: "modals",
      name: "Side Panel Drawer",
      description: "Right-edge slide-in panel with header and list — structurally unlike centered dialogs, bottom sheets, and toasts.",
      creator: "opus",
      tags: ["modal","side-panel","drawer","slide-in","settings"],
      tweaks: [
        { type: "color", label: "Header Accent", varName: "--mo9-accent", default: "#f5323c" }
      ],
      code: "<style>\n  .kmo9-bg{position:relative;width:220px;height:140px;background:#080a10;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)}\n  .kmo9-scrim{position:absolute;inset:0;background:rgba(0,0,0,0.5)}\n  .kmo9-panel{position:absolute;top:0;right:0;bottom:0;width:140px;background:#141720;border-left:1px solid rgba(255,255,255,0.1);display:flex;flex-direction:column}\n  .kmo9-hdr{padding:10px;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between}\n  .kmo9-title{font-size:11px;font-weight:700;color:#f8fafc}\n  .kmo9-close{width:18px;height:18px;border-radius:4px;background:rgba(255,255,255,0.06);border:none;color:#64748b;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center}\n  .kmo9-list{padding:6px 8px;flex:1}\n  .kmo9-item{font-size:10px;color:#94a3b8;padding:5px 6px;border-radius:4px;cursor:pointer;transition:background .12s ease}\n  .kmo9-item:hover{background:rgba(255,255,255,0.05)}\n  .kmo9-item.sel{color:var(--mo9-accent,#f5323c);font-weight:600}\n  .kmo9-bar{height:2px;background:var(--mo9-accent,#f5323c);margin:0 10px}\n  @media (prefers-reduced-motion:reduce){.kmo9-item{transition:none}}\n</style>\n<div class=\"kmo9-bg\">\n  <div class=\"kmo9-scrim\"></div>\n  <div class=\"kmo9-panel\">\n    <div class=\"kmo9-hdr\"><span class=\"kmo9-title\">Settings</span><button type=\"button\" class=\"kmo9-close\">✕</button></div>\n    <div class=\"kmo9-bar\"></div>\n    <div class=\"kmo9-list\">\n      <div class=\"kmo9-item sel\">General</div>\n      <div class=\"kmo9-item\">Rendering</div>\n      <div class=\"kmo9-item\">Export</div>\n      <div class=\"kmo9-item\">Shortcuts</div>\n    </div>\n  </div>\n</div>"
    },

    {
      id: "BU21",
      section: "buttons",
      name: "Split Action Button",
      description: "Primary action + dropdown trigger fused into one compound button — two-zone click target unlike any single-action button.",
      creator: "opus",
      tags: ["button","split","dropdown","compound","action"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--bu21-accent", default: "#f5323c" }
      ],
      code: "<style>\n  .kbu21-wrap{display:inline-flex;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(245,50,60,.3)}\n  .kbu21-main{background:var(--bu21-accent,#f5323c);color:#fff;border:none;padding:0 16px;height:36px;font-weight:700;font-size:12px;cursor:pointer;transition:opacity .12s ease}\n  .kbu21-drop{background:color-mix(in srgb,var(--bu21-accent,#f5323c) 80%,#000);color:#fff;border:none;border-left:1px solid rgba(255,255,255,0.2);width:32px;height:36px;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:opacity .12s ease}\n  .kbu21-main:hover,.kbu21-drop:hover{opacity:.85}\n  @media (prefers-reduced-motion:reduce){.kbu21-main,.kbu21-drop{transition:none}}\n</style>\n<div class=\"kbu21-wrap\">\n  <button type=\"button\" class=\"kbu21-main\">Deploy</button>\n  <button type=\"button\" class=\"kbu21-drop\">▾</button>\n</div>"
    },

    /* ---- Sonnet additions: structurally distinct specimens across underserved drawers ---- */

    {
      id: "BU22",
      section: "buttons",
      name: "Magnetic Border Trace",
      description: "An animated gradient border that continuously traces the button perimeter — motion IS the chrome, no static border exists.",
      creator: "sonnet",
      tags: ["button","animated","border","gradient","magnetic"],
      tweaks: [
        { type: "color", label: "Trace Color", varName: "--bu22-trace", default: "#f04c54" }
      ],
      code: "<style>\n  @keyframes kbu22-trace{to{--kbu22-angle:360deg}}\n  @property --kbu22-angle{syntax:\"<angle>\";inherits:false;initial-value:0deg}\n  .kbu22-btn{position:relative;background:#0d0f13;color:#f1f5f9;border:none;border-radius:9px;padding:0 22px;height:38px;font-weight:700;font-size:12px;letter-spacing:.04em;cursor:pointer;z-index:0}\n  .kbu22-btn::before{content:\"\";position:absolute;inset:-1.5px;border-radius:10px;background:conic-gradient(from var(--kbu22-angle),var(--bu22-trace,#f04c54),#f97316,#fbbf24,var(--bu22-trace,#f04c54));z-index:-1;animation:kbu22-trace 2.2s linear infinite}\n  .kbu22-btn::after{content:\"\";position:absolute;inset:1.5px;border-radius:8px;background:#0d0f13;z-index:-1}\n  .kbu22-btn:hover{color:#fff}\n  @media (prefers-reduced-motion:reduce){.kbu22-btn::before{animation:none;background:var(--bu22-trace,#f04c54)}}\n</style>\n<button type=\"button\" class=\"kbu22-btn\">Generate</button>"
    },

    {
      id: "TO7",
      section: "toggles",
      name: "Animated Check Box",
      description: "Interactive checkbox with an animated SVG stroke-dashoffset checkmark that draws itself on activation.",
      creator: "sonnet",
      tags: ["toggle","checkbox","check","svg","animate","interactive"],
      tweaks: [
        { type: "color", label: "Check Color", varName: "--to7-color", default: "#f04c54" }
      ],
      code: "<style>\n  @keyframes kto7-draw{to{stroke-dashoffset:0}}\n  .kto7-wrap{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kto7-in{position:absolute;opacity:0;pointer-events:none}\n  .kto7-box{width:22px;height:22px;border-radius:6px;border:2px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:border-color .18s ease,background .18s ease}\n  .kto7-wrap:hover .kto7-box{border-color:var(--to7-color,#f04c54)}\n  .kto7-check{stroke-dasharray:18;stroke-dashoffset:18;transition:stroke-dashoffset .25s ease}\n  .kto7-in:checked + .kto7-box{background:var(--to7-color,#f04c54);border-color:var(--to7-color,#f04c54);box-shadow:0 0 10px color-mix(in srgb,var(--to7-color,#f04c54) 40%,transparent)}\n  .kto7-in:checked + .kto7-box .kto7-check{stroke-dashoffset:0}\n  .kto7-lbl{font-size:12px;color:#cbd5e1;font-weight:500}\n  @media (prefers-reduced-motion:reduce){.kto7-check{transition:none}.kto7-box{transition:none}}\n</style>\n<label class=\"kto7-wrap\">\n  <input type=\"checkbox\" class=\"kto7-in\" checked>\n  <span class=\"kto7-box\">\n    <svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\" fill=\"none\">\n      <path class=\"kto7-check\" d=\"M2 6l3 3 5-5\" stroke=\"#fff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    </svg>\n  </span>\n  <span class=\"kto7-lbl\">Enable upscaling</span>\n</label>"
    },

    {
      id: "TO8",
      section: "toggles",
      name: "Heart Favorite Morph",
      description: "Interactive tap-to-favorite toggle where clicking morphs from outline to filled heart with a scale burst.",
      creator: "sonnet",
      tags: ["toggle","favorite","heart","morph","icon","interactive"],
      tweaks: [
        { type: "color", label: "Heart Color", varName: "--to8-heart", default: "#f04c54" }
      ],
      code: "<style>\n  @keyframes kto8-burst{0%{transform:scale(1)}40%{transform:scale(1.35)}70%{transform:scale(.9)}100%{transform:scale(1)}}\n  .kto8-wrap{display:inline-flex;align-items:center;gap:8px;cursor:pointer;user-select:none}\n  .kto8-in{position:absolute;opacity:0;pointer-events:none}\n  .kto8-heart{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);transition:border-color .18s ease,background .18s ease}\n  .kto8-wrap:hover .kto8-heart{border-color:var(--to8-heart,#f04c54)}\n  .kto8-svg-fill{fill:none;stroke:rgba(255,255,255,0.4);stroke-width:1.8;transition:fill .18s ease,stroke .18s ease}\n  .kto8-lbl{font-size:11.5px;color:#94a3b8;font-weight:600;transition:color .18s ease}\n  .kto8-in:checked + .kto8-heart{background:color-mix(in srgb,var(--to8-heart,#f04c54) 15%,transparent);border-color:var(--to8-heart,#f04c54);animation:kto8-burst .35s ease}\n  .kto8-in:checked + .kto8-heart .kto8-svg-fill{fill:var(--to8-heart,#f04c54);stroke:var(--to8-heart,#f04c54)}\n  .kto8-in:checked ~ .kto8-lbl{color:#f8fafc}\n  @media (prefers-reduced-motion:reduce){.kto8-in:checked + .kto8-heart{animation:none}.kto8-svg-fill,.kto8-heart{transition:none}}\n</style>\n<label class=\"kto8-wrap\">\n  <input type=\"checkbox\" class=\"kto8-in\" checked onchange=\"this.nextElementSibling.nextElementSibling.textContent=this.checked?'Saved ✓':'Save'\">\n  <span class=\"kto8-heart\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\">\n      <path class=\"kto8-svg-fill\" d=\"M12 21C12 21 3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 13-9 13z\"/>\n    </svg>\n  </span>\n  <span class=\"kto8-lbl\">Saved ✓</span>\n</label>"
    },

    {
      id: "FO8",
      section: "forms",
      name: "OTP Pin Input",
      description: "Six isolated single-digit boxes that auto-advance focus — structurally a grid of atomic inputs unlike any text field, stepper, or dropdown in the drawer.",
      creator: "sonnet",
      tags: ["form","otp","pin","code","input","boxes"],
      tweaks: [
        { type: "color", label: "Active Border", varName: "--fo8-active", default: "#f04c54" }
      ],
      code: "<style>\n  .kfo8-wrap{display:inline-flex;gap:6px;align-items:center}\n  .kfo8-cell{width:32px;height:40px;border-radius:8px;border:1.5px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#f1f5f9;font-size:18px;font-weight:700;text-align:center;outline:none;caret-color:var(--fo8-active,#f04c54);transition:border-color .15s ease,box-shadow .15s ease;font-variant-numeric:tabular-nums}\n  .kfo8-cell:focus{border-color:var(--fo8-active,#f04c54);box-shadow:0 0 0 2px color-mix(in srgb,var(--fo8-active,#f04c54) 25%,transparent)}\n  .kfo8-cell.filled{border-color:rgba(255,255,255,0.25)}\n  .kfo8-sep{width:8px;height:1.5px;background:rgba(255,255,255,0.15);border-radius:1px;margin:0 1px}\n  @media (prefers-reduced-motion:reduce){.kfo8-cell{transition:none}}\n</style>\n<div class=\"kfo8-wrap\" aria-label=\"Enter verification code\">\n  <input class=\"kfo8-cell filled\" type=\"text\" maxlength=\"1\" value=\"4\" inputmode=\"numeric\" aria-label=\"Digit 1\">\n  <input class=\"kfo8-cell filled\" type=\"text\" maxlength=\"1\" value=\"2\" inputmode=\"numeric\" aria-label=\"Digit 2\">\n  <input class=\"kfo8-cell filled\" type=\"text\" maxlength=\"1\" value=\"7\" inputmode=\"numeric\" aria-label=\"Digit 3\">\n  <div class=\"kfo8-sep\"></div>\n  <input class=\"kfo8-cell\" type=\"text\" maxlength=\"1\" value=\"\" inputmode=\"numeric\" aria-label=\"Digit 4\">\n  <input class=\"kfo8-cell\" type=\"text\" maxlength=\"1\" value=\"\" inputmode=\"numeric\" aria-label=\"Digit 5\">\n  <input class=\"kfo8-cell\" type=\"text\" maxlength=\"1\" value=\"\" inputmode=\"numeric\" aria-label=\"Digit 6\">\n</div>"
    },

    {
      id: "PL7",
      section: "players",
      name: "Waveform Spectrum Player",
      description: "Frequency-bar waveform replaces the scrubber track — played bars are lit, unplayed are dim, giving spatial audio position at a glance unlike any existing pill/slider player.",
      creator: "sonnet",
      tags: ["player","audio","waveform","spectrum","bars"],
      tweaks: [
        { type: "color", label: "Waveform Color", varName: "--pl7-wave", default: "#f04c54" }
      ],
      code: "<style>\n  .kpl7-wrap{display:flex;flex-direction:column;gap:8px;background:#0d0f13;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;width:220px}\n  .kpl7-top{display:flex;align-items:center;justify-content:space-between}\n  .kpl7-title{font-size:11px;font-weight:700;color:#f1f5f9}\n  .kpl7-time{font-size:10px;font-family:monospace;color:#64748b;font-variant-numeric:tabular-nums}\n  .kpl7-bars{display:flex;align-items:flex-end;gap:2px;height:32px;cursor:pointer}\n  .kpl7-bar{border-radius:2px 2px 0 0;flex-shrink:0;width:3px;transition:opacity .1s ease}\n  .kpl7-bar.played{background:var(--pl7-wave,#f04c54);opacity:1}\n  .kpl7-bar.unplayed{background:rgba(255,255,255,0.15);opacity:1}\n  .kpl7-bar.cursor{background:var(--pl7-wave,#f04c54);box-shadow:0 0 6px var(--pl7-wave,#f04c54)}\n  .kpl7-controls{display:flex;align-items:center;gap:8px}\n  .kpl7-play{width:26px;height:26px;border-radius:50%;background:var(--pl7-wave,#f04c54);border:none;color:#fff;font-size:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}\n  .kpl7-vol{font-size:11px;color:#64748b;margin-left:auto}\n  @media (prefers-reduced-motion:reduce){.kpl7-bar{transition:none}}\n</style>\n<div class=\"kpl7-wrap\">\n  <div class=\"kpl7-top\">\n    <span class=\"kpl7-title\">Midnight Pulse</span>\n    <span class=\"kpl7-time\">0:42 / 3:15</span>\n  </div>\n  <div class=\"kpl7-bars\">\n    <div class=\"kpl7-bar played\" style=\"height:40%\"></div><div class=\"kpl7-bar played\" style=\"height:60%\"></div><div class=\"kpl7-bar played\" style=\"height:90%\"></div><div class=\"kpl7-bar played\" style=\"height:50%\"></div><div class=\"kpl7-bar played\" style=\"height:75%\"></div><div class=\"kpl7-bar played\" style=\"height:35%\"></div><div class=\"kpl7-bar played\" style=\"height:80%\"></div><div class=\"kpl7-bar played\" style=\"height:55%\"></div><div class=\"kpl7-bar played\" style=\"height:65%\"></div><div class=\"kpl7-bar played\" style=\"height:45%\"></div><div class=\"kpl7-bar played\" style=\"height:70%\"></div><div class=\"kpl7-bar played\" style=\"height:85%\"></div><div class=\"kpl7-bar played\" style=\"height:40%\"></div><div class=\"kpl7-bar played\" style=\"height:95%\"></div><div class=\"kpl7-bar cursor\" style=\"height:70%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:60%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:80%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:45%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:70%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:55%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:85%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:40%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:65%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:30%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:75%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:50%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:60%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:88%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:42%\"></div><div class=\"kpl7-bar unplayed\" style=\"height:55%\"></div>\n  </div>\n  <div class=\"kpl7-controls\">\n    <button type=\"button\" class=\"kpl7-play\">▶</button>\n    <span class=\"kpl7-vol\">🔊</span>\n  </div>\n</div>"
    },

    {
      id: "NA7",
      section: "navigation",
      name: "Dot Paginator",
      description: "Compact dot-row paginator with an active pill that slides between positions — spatial page metaphor completely unlike tabs, breadcrumbs, docks, and vertical step navs.",
      creator: "sonnet",
      tags: ["navigation","pagination","dots","pages"],
      tweaks: [
        { type: "color", label: "Active Dot", varName: "--na7-active", default: "#f04c54" }
      ],
      code: "<style>\n  .kna7-wrap{display:inline-flex;align-items:center;gap:12px}\n  .kna7-dots{display:inline-flex;align-items:center;gap:6px}\n  .kna7-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.18);cursor:pointer;transition:background .18s ease,transform .18s ease}\n  .kna7-dot:hover{background:rgba(255,255,255,0.4)}\n  .kna7-dot.on{width:18px;border-radius:3px;background:var(--na7-active,#f04c54);box-shadow:0 0 8px var(--na7-active,#f04c54)}\n  .kna7-btn{width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:#94a3b8;font-size:11px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .15s ease,color .15s ease}\n  .kna7-btn:hover{border-color:var(--na7-active,#f04c54);color:#fff}\n  @media (prefers-reduced-motion:reduce){.kna7-dot,.kna7-btn{transition:none}}\n</style>\n<div class=\"kna7-wrap\">\n  <button type=\"button\" class=\"kna7-btn\">‹</button>\n  <div class=\"kna7-dots\">\n    <div class=\"kna7-dot\"></div>\n    <div class=\"kna7-dot\"></div>\n    <div class=\"kna7-dot on\"></div>\n    <div class=\"kna7-dot\"></div>\n    <div class=\"kna7-dot\"></div>\n  </div>\n  <button type=\"button\" class=\"kna7-btn\">›</button>\n</div>"
    },

    {
      id: "EF7",
      section: "effects",
      name: "Holographic Foil",
      description: "Iridescent rainbow sheen that shifts hue across the surface via a diagonal moving gradient — spectral color play unlike any glow, grain, or glass effect in the drawer.",
      creator: "sonnet",
      tags: ["effect","holographic","iridescent","foil","rainbow","sheen"],
      tweaks: [
        { type: "range", label: "Speed", varName: "--ef7-speed", min: 1, max: 8, step: 1, unit: "s", default: 3 }
      ],
      code: "<style>\n  @keyframes kef7-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}\n  .kef7-foil{position:relative;width:190px;height:70px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.15)}\n  .kef7-base{position:absolute;inset:0;background:linear-gradient(120deg,#0a0a0f,#1a1020,#0a1020);}\n  .kef7-sheen{position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,0,128,0.45),rgba(255,180,0,0.4),rgba(0,255,180,0.45),rgba(0,128,255,0.4),rgba(180,0,255,0.45),rgba(255,0,128,0.45));background-size:300% 300%;animation:kef7-shift var(--ef7-speed,3s) ease infinite;mix-blend-mode:screen}\n  .kef7-lbl{position:relative;z-index:1;font-weight:800;font-size:12px;letter-spacing:.16em;color:#fff;text-shadow:0 0 20px rgba(255,255,255,0.6)}\n  @media (prefers-reduced-motion:reduce){.kef7-sheen{animation:none}}\n</style>\n<div class=\"kef7-foil\">\n  <div class=\"kef7-base\"></div>\n  <div class=\"kef7-sheen\"></div>\n  <span class=\"kef7-lbl\">HOLOGRAPHIC</span>\n</div>"
    },

    {
      id: "EF8",
      section: "effects",
      name: "Blueprint Grid",
      description: "Technical drafting grid with fine crosshatch lines and axis markers — architectural/engineering aesthetic distinct from all organic glow, grain, and glass effects.",
      creator: "sonnet",
      tags: ["effect","grid","blueprint","technical","drafting"],
      tweaks: [
        { type: "color", label: "Grid Color", varName: "--ef8-grid", default: "#38bdf8" }
      ],
      code: "<style>\n  .kef8-wrap{position:relative;width:190px;height:70px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;border:1px solid rgba(56,189,248,0.2);background:#030d1a}\n  .kef8-grid{position:absolute;inset:0;background-image:linear-gradient(var(--ef8-grid,#38bdf8) 1px,transparent 1px),linear-gradient(90deg,var(--ef8-grid,#38bdf8) 1px,transparent 1px),linear-gradient(rgba(56,189,248,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,0.08) 1px,transparent 1px);background-size:40px 40px,40px 40px,8px 8px,8px 8px;background-position:-1px -1px,-1px -1px,-1px -1px,-1px -1px;opacity:0.35}\n  .kef8-cross{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}\n  .kef8-cross::before{content:\"\";position:absolute;left:0;right:0;height:1px;background:color-mix(in srgb,var(--ef8-grid,#38bdf8) 60%,transparent)}\n  .kef8-cross::after{content:\"\";position:absolute;top:0;bottom:0;width:1px;background:color-mix(in srgb,var(--ef8-grid,#38bdf8) 60%,transparent)}\n  .kef8-lbl{position:relative;z-index:1;font-size:10px;font-family:monospace;font-weight:600;color:var(--ef8-grid,#38bdf8);letter-spacing:.18em;text-shadow:0 0 10px var(--ef8-grid,#38bdf8)}\n</style>\n<div class=\"kef8-wrap\">\n  <div class=\"kef8-grid\"></div>\n  <div class=\"kef8-cross\"></div>\n  <span class=\"kef8-lbl\">BLUEPRINT</span>\n</div>"
    },

    {
      id: "AN11",
      section: "animations",
      name: "Confetti Burst",
      description: "Particles radiate outward from center with rotation, opacity fade, and staggered delays — celebratory burst motion unlike orbital rings, wave bars, or cascading text.",
      creator: "sonnet",
      tags: ["animation","confetti","burst","particles","celebrate"],
      tweaks: [
        { type: "color", label: "Accent Color", varName: "--an11-color", default: "#f04c54" }
      ],
      code: "<style>\n  @keyframes kan11-fly{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1}100%{opacity:0}}\n  .kan11-stage{position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center}\n  .kan11-pip{position:absolute;width:6px;height:6px;border-radius:1px;animation:kan11-fly 1.4s ease-out infinite}\n  .kan11-center{width:10px;height:10px;border-radius:50%;background:var(--an11-color,#f04c54);box-shadow:0 0 10px var(--an11-color,#f04c54);z-index:1}\n  @media (prefers-reduced-motion:reduce){.kan11-pip{animation:none;opacity:0}.kan11-center{box-shadow:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kan11-stage\">\n    <div class=\"kan11-center\"></div>\n    <div class=\"kan11-pip\" style=\"background:var(--an11-color,#f04c54);animation-delay:0s;animation-duration:1.4s\" data-style=\"transform:translate(0,-36px) rotate(20deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#fbbf24;animation-delay:.1s;animation-duration:1.3s\" data-style=\"transform:translate(28px,-26px) rotate(-30deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#34d399;animation-delay:.05s;animation-duration:1.5s\" data-style=\"transform:translate(36px,0) rotate(10deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#818cf8;animation-delay:.15s;animation-duration:1.4s\" data-style=\"transform:translate(26px,28px) rotate(-20deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#f97316;animation-delay:.08s;animation-duration:1.2s\" data-style=\"transform:translate(0,36px) rotate(40deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#38bdf8;animation-delay:.2s;animation-duration:1.6s\" data-style=\"transform:translate(-28px,26px) rotate(-10deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:var(--an11-color,#f04c54);animation-delay:.12s;animation-duration:1.3s\" data-style=\"transform:translate(-36px,0) rotate(25deg) scale(0)\"></div>\n    <div class=\"kan11-pip\" style=\"background:#a78bfa;animation-delay:.18s;animation-duration:1.5s\" data-style=\"transform:translate(-26px,-28px) rotate(-35deg) scale(0)\"></div>\n    <style>\n      .kan11-pip:nth-child(2){--tx:0px;--ty:-36px;--r:20deg}\n      .kan11-pip:nth-child(3){--tx:28px;--ty:-26px;--r:-30deg}\n      .kan11-pip:nth-child(4){--tx:36px;--ty:0px;--r:10deg}\n      .kan11-pip:nth-child(5){--tx:26px;--ty:28px;--r:-20deg}\n      .kan11-pip:nth-child(6){--tx:0px;--ty:36px;--r:40deg}\n      .kan11-pip:nth-child(7){--tx:-28px;--ty:26px;--r:-10deg}\n      .kan11-pip:nth-child(8){--tx:-36px;--ty:0px;--r:25deg}\n      .kan11-pip:nth-child(9){--tx:-26px;--ty:-28px;--r:-35deg}\n      @keyframes kan11-fly{\n        0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1}\n        100%{transform:translate(var(--tx,0),var(--ty,-36px)) rotate(var(--r,0deg)) scale(0.3);opacity:0}\n      }\n    </style>\n  </div>\n</div>"
    },

    /* ---- GPT-OSS additions: specimens signed under #7a00f5 ---- */

    {
      id: "FO9",
      section: "forms",
      name: "Pill Float Input",
      description: "Floating label capsule input with focus glow ring and prefix identifier.",
      creator: "gpt-oss",
      tags: ["pill", "float", "input"],
      tweaks: [
        { type: "color", label: "Focus Accent", varName: "--fo9-accent", default: "#7a00f5" }
      ],
      code: "<style>\n  .kfo9-wrap{position:relative;width:210px;padding-top:10px}\n  .kfo9-box{position:relative;display:flex;align-items:center;background:#141720;border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:0 14px;transition:border-color .2s ease,box-shadow .2s ease}\n  .kfo9-box:focus-within{border-color:var(--fo9-accent,#7a00f5);box-shadow:0 0 14px color-mix(in srgb,var(--fo9-accent,#7a00f5) 40%,transparent)}\n  .kfo9-ico{color:#64748b;font-size:12px;margin-right:8px}\n  .kfo9-in{width:100%;height:38px;background:transparent;border:none;color:#f8fafc;font-size:12.5px;font-weight:600;outline:none}\n  .kfo9-lbl{position:absolute;left:34px;top:20px;font-size:11.5px;color:#64748b;font-weight:500;pointer-events:none;transform-origin:left center;transition:transform .2s ease,color .2s ease,background .2s ease}\n  .kfo9-in:focus ~ .kfo9-lbl,\n  .kfo9-in:not(:placeholder-shown) ~ .kfo9-lbl{transform:translateY(-20px) scale(.85);color:var(--fo9-accent,#7a00f5);font-weight:700;background:#141720;padding:0 6px;border-radius:4px}\n  @media (prefers-reduced-motion:reduce){.kfo9-box,.kfo9-lbl{transition:none}}\n</style>\n<div class=\"kfo9-wrap\">\n  <div class=\"kfo9-box\">\n    <span class=\"kfo9-ico\">@</span>\n    <input class=\"kfo9-in\" type=\"text\" placeholder=\" \" value=\"alex.rivera\">\n    <label class=\"kfo9-lbl\">Username</label>\n  </div>\n</div>"
    },

    {
      id: "TO9",
      section: "toggles",
      name: "Pulse Ring Toggle",
      description: "Checkbox toggle that pulses an expanding ring on activate",
      creator: "gpt-oss",
      tags: ["pulse", "ring", "toggle"],
      tweaks: [
        { type: "color", label: "Ring Glow", varName: "--to9-glow", default: "#7a00f5" }
      ],
      code: "<style>\n  .tog-to9 { display:inline-block; position:relative; }\n  .tog-to9 input { display:none; }\n  .tog-to9 .btn { width:24px; height:24px; border:2px solid var(--to9-glow,#7a00f5); border-radius:50%; display:block; cursor:pointer; position:relative; }\n  .tog-to9 .btn::after { content:''; position:absolute; inset:0; border-radius:50%; border:2px solid var(--to9-glow,#7a00f5); opacity:0; }\n  .tog-to9 input:checked + .btn::after { animation:to9-pulse 0.6s ease-out; }\n  .tog-to9 input:checked + .btn { background:var(--to9-glow,#7a00f5); }\n  @keyframes to9-pulse { 0%{transform:scale(1); opacity:1;} 100%{transform:scale(2.5); opacity:0;} }\n  @media (prefers-reduced-motion:reduce){ .tog-to9 .btn::after{animation:none;} }\n</style>\n<label class='tog-to9'><input type='checkbox'/><span class='btn'></span></label>"
    },

    {
      id: "SL9",
      section: "sliders",
      name: "Dotted Progress Track",
      description: "Progress track divided into discrete dots",
      creator: "gpt-oss",
      tags: ["dots", "progress", "slider"],
      tweaks: [
        { type: "color", label: "Dot Color", varName: "--sl9-dot", default: "#7a00f5" }
      ],
      code: "<style>\n  .prog-sl9 { display:flex; gap:4px; }\n  .prog-sl9 div { width:8px; height:8px; border-radius:50%; background:#444; transition:background 0.3s; }\n  .prog-sl9 div.active { background:var(--sl9-dot,#7a00f5); }\n</style>\n<div class='prog-sl9'><div class='active'></div><div class='active'></div><div class='active'></div><div></div><div></div></div>"
    },

    {
      id: "NA8",
      section: "navigation",
      name: "Circular Radial Menu",
      description: "Radial navigation layout with items positioned in a circle",
      creator: "gpt-oss",
      tags: ["radial", "menu", "circular", "nav"],
      tweaks: [
        { type: "color", label: "Menu Ring", varName: "--na8-ring", default: "#7a00f5" }
      ],
      code: "<style>\n  .nav-na8 { position:relative; width:100px; height:100px; border-radius:50%; border:2px dashed var(--na8-ring,#7a00f5); }\n  .nav-na8 .item { position:absolute; width:20px; height:20px; background:var(--na8-ring,#7a00f5); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:10px; cursor:pointer; }\n  .nav-na8 .item:nth-child(1){ top:0; left:40px; }\n  .nav-na8 .item:nth-child(2){ top:40px; right:0; }\n  .nav-na8 .item:nth-child(3){ bottom:0; left:40px; }\n  .nav-na8 .item:nth-child(4){ top:40px; left:0; }\n</style>\n<div class='nav-na8'><div class='item'>1</div><div class='item'>2</div><div class='item'>3</div><div class='item'>4</div></div>"
    },

    {
      id: "BA8",
      section: "badges",
      name: "Notification Ping Badge",
      description: "Badge with a pinging ring animation to signal new updates",
      creator: "gpt-oss",
      tags: ["ping", "notification", "badge"],
      tweaks: [
        { type: "color", label: "Ping Color", varName: "--ba8-ping", default: "#7a00f5" }
      ],
      code: "<style>\n  .badge-ba8 { position:relative; display:inline-block; padding:4px 8px; background:#222; border-radius:4px; color:#fff; }\n  .badge-ba8::after { content:''; position:absolute; top:-2px; right:-2px; width:6px; height:6px; background:var(--ba8-ping,#7a00f5); border-radius:50%; animation:ba8-ping 1.5s infinite; }\n  @keyframes ba8-ping { 0%{transform:scale(1); opacity:1;} 100%{transform:scale(2.5); opacity:0;} }\n  @media (prefers-reduced-motion:reduce){ .badge-ba8::after{animation:none;} }\n</style>\n<div class='badge-ba8'>Inbox</div>"
    },

    {
      id: "AL7",
      section: "alerts",
      name: "Slide-In Toast Alert",
      description: "Glassmorphic floating toast notification with live status dot, action context, and timer countdown.",
      creator: "gpt-oss",
      tags: ["toast", "slide", "alert", "notification", "glass"],
      tweaks: [
        { type: "color", label: "Toast Accent", varName: "--al7-toast", default: "#7a00f5" }
      ],
      code: "<style>\n  @keyframes kal7-enter{0%{transform:translateY(16px) scale(.96);opacity:0}100%{transform:translateY(0) scale(1);opacity:1}}\n  @keyframes kal7-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}\n  @keyframes kal7-bar{0%{transform:scaleX(1)}100%{transform:scaleX(0)}}\n  .kal7-toast{position:relative;display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(24,24,27,.88);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.12);border-left:3px solid var(--al7-toast,#7a00f5);border-radius:8px;box-shadow:0 12px 28px -8px rgba(0,0,0,.75),0 0 16px color-mix(in srgb,var(--al7-toast,#7a00f5) 25%,transparent);color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;animation:kal7-enter .35s cubic-bezier(.16,1,.3,1) forwards;overflow:hidden;max-width:240px}\n  .kal7-icon-wrap{width:24px;height:24px;border-radius:6px;background:color-mix(in srgb,var(--al7-toast,#7a00f5) 20%,transparent);border:1px solid color-mix(in srgb,var(--al7-toast,#7a00f5) 45%,transparent);display:flex;align-items:center;justify-content:center;color:var(--al7-toast,#7a00f5);flex:none}\n  .kal7-dot{width:8px;height:8px;border-radius:50%;background:var(--al7-toast,#7a00f5);box-shadow:0 0 8px var(--al7-toast,#7a00f5);animation:kal7-pulse 1.8s ease-in-out infinite}\n  .kal7-content{flex:1;min-width:0}\n  .kal7-title{font-size:11.5px;font-weight:600;line-height:1.2;color:#fafafa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kal7-desc{font-size:10px;color:#a1a1aa;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kal7-progress{position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--al7-toast,#7a00f5);transform-origin:left;animation:kal7-bar 4s linear infinite}\n  @media (prefers-reduced-motion:reduce){.kal7-toast,.kal7-dot,.kal7-progress{animation:none;transform:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kal7-toast\">\n    <div class=\"kal7-icon-wrap\"><div class=\"kal7-dot\"></div></div>\n    <div class=\"kal7-content\">\n      <div class=\"kal7-title\">Changes Deployed</div>\n      <div class=\"kal7-desc\">Production sync active · 2m ago</div>\n    </div>\n    <div class=\"kal7-progress\"></div>\n  </div>\n</div>"
    },

    {
      id: "LO7",
      section: "loaders",
      name: "Morphing Shape Loader",
      description: "Square morphs into circle via border-radius and transform",
      creator: "gpt-oss",
      tags: ["morph", "loader", "shape"],
      tweaks: [
        { type: "color", label: "Loader Color", varName: "--lo7-shape", default: "#7a00f5" }
      ],
      code: "<style>\n  .loader-lo7 { width:30px; height:30px; background:var(--lo7-shape,#7a00f5); animation:lo7-morph 2s infinite ease-in-out; }\n  @keyframes lo7-morph { 0%{transform:rotate(0deg); border-radius:0;} 50%{transform:rotate(180deg); border-radius:50%;} 100%{transform:rotate(360deg); border-radius:0;} }\n  @media (prefers-reduced-motion:reduce){ .loader-lo7{animation:none;} }\n</style>\n<div class='loader-lo7'></div>"
    },

    {
      id: "IC12",
      section: "icons",
      name: "Pulsing Glow Glyph",
      description: "Icon glyph pulsing with box-shadow luminescence",
      creator: "gpt-oss",
      tags: ["icon", "glyph", "glow"],
      tweaks: [
        { type: "color", label: "Glow Color", varName: "--ic12-glow", default: "#7a00f5" }
      ],
      code: "<style>\n  .icon-ic12 { width:32px; height:32px; border-radius:50%; background:var(--ic12-glow,#7a00f5); display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; box-shadow:0 0 8px var(--ic12-glow,#7a00f5); animation:ic12-pulse 2s infinite; }\n  @keyframes ic12-pulse { 0%,100%{box-shadow:0 0 8px var(--ic12-glow,#7a00f5);} 50%{box-shadow:0 0 18px var(--ic12-glow,#7a00f5);} }\n  @media (prefers-reduced-motion:reduce){ .icon-ic12{animation:none;} }\n</style>\n<div class='icon-ic12'>★</div>"
    },

    {
      id: "PL8",
      section: "players",
      name: "Volume Knob Dial",
      description: "Circular volume knob dial with rotation angle indicator",
      creator: "gpt-oss",
      tags: ["volume", "knob", "dial", "player"],
      tweaks: [
        { type: "color", label: "Knob Accent", varName: "--pl8-knob", default: "#7a00f5" }
      ],
      code: "<style>\n  .player-pl8 { width:40px; height:40px; border:2px solid var(--pl8-knob,#7a00f5); border-radius:50%; position:relative; cursor:pointer; }\n  .player-pl8 .indicator { position:absolute; width:2px; height:16px; background:var(--pl8-knob,#7a00f5); top:8px; left:19px; transform-origin:bottom; transform:rotate(45deg); transition:transform 0.2s; }\n  @media (prefers-reduced-motion:reduce){ .indicator{transition:none;} }\n</style>\n<div class='player-pl8'><div class='indicator'></div></div>"
    },

    {
      id: "MO10",
      section: "modals",
      name: "Centered Action Modal",
      description: "Centered authorization dialog card with glowing status badge, descriptive context, and interactive action buttons.",
      creator: "gpt-oss",
      tags: ["modal", "dialog", "center", "action", "card"],
      tweaks: [
        { type: "color", label: "Modal Accent", varName: "--mo10-border", default: "#7a00f5" }
      ],
      code: "<style>\n  @keyframes kmo10-pop{0%{transform:scale(.94) translateY(6px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}\n  .kmo10-card{width:220px;background:#18181b;border:1px solid rgba(255,255,255,.1);box-shadow:0 16px 36px -12px rgba(0,0,0,.8),0 0 20px color-mix(in srgb,var(--mo10-border,#7a00f5) 20%,transparent);border-radius:12px;padding:14px 14px 12px;color:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;position:relative;animation:kmo10-pop .3s cubic-bezier(.16,1,.3,1) forwards}\n  .kmo10-top{display:flex;align-items:center;gap:8px;margin-bottom:8px}\n  .kmo10-badge{width:22px;height:22px;border-radius:6px;background:color-mix(in srgb,var(--mo10-border,#7a00f5) 22%,transparent);border:1px solid var(--mo10-border,#7a00f5);display:flex;align-items:center;justify-content:center;color:var(--mo10-border,#7a00f5);font-size:11px;font-weight:700;flex:none}\n  .kmo10-title{font-size:12px;font-weight:650;letter-spacing:-.01em;color:#fff}\n  .kmo10-body{font-size:10px;line-height:1.4;color:#a1a1aa;margin-bottom:12px}\n  .kmo10-actions{display:flex;gap:6px;justify-content:flex-end}\n  .kmo10-btn{padding:4px 9px;border-radius:6px;font-size:9.5px;font-weight:600;cursor:pointer;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);color:#d4d4d8;transition:transform .15s ease,opacity .15s ease}\n  .kmo10-btn:hover{transform:translateY(-1px);color:#fff}\n  .kmo10-btn-primary{background:var(--mo10-border,#7a00f5);border-color:var(--mo10-border,#7a00f5);color:#fff;box-shadow:0 0 10px color-mix(in srgb,var(--mo10-border,#7a00f5) 45%,transparent)}\n  .kmo10-btn-primary:hover{opacity:.92}\n  @media (prefers-reduced-motion:reduce){.kmo10-card,.kmo10-btn{animation:none;transition:none;transform:none}}\n</style>\n<div style=\"display:flex;align-items:center;justify-content:center;width:100%;height:100%\">\n  <div class=\"kmo10-card\">\n    <div class=\"kmo10-top\">\n      <div class=\"kmo10-badge\">⚡</div>\n      <div class=\"kmo10-title\">Confirm Push</div>\n    </div>\n    <div class=\"kmo10-body\">Deploy build #894 to production? This operation is immediate.</div>\n    <div class=\"kmo10-actions\">\n      <button type=\"button\" class=\"kmo10-btn\">Dismiss</button>\n      <button type=\"button\" class=\"kmo10-btn kmo10-btn-primary\">Approve</button>\n    </div>\n  </div>\n</div>"
    },

    {
      id: "AN12",
      section: "animations",
      name: "Orbiting Dots System",
      description: "Multiple dots orbit a center using transform rotation",
      creator: "gpt-oss",
      tags: ["orbit", "dots", "animation"],
      tweaks: [
        { type: "color", label: "Dot Color", varName: "--an12-dot", default: "#7a00f5" }
      ],
      code: "<style>\n  .anim-an12 { position:relative; width:80px; height:80px; }\n  .anim-an12 .dot { position:absolute; width:8px; height:8px; background:var(--an12-dot,#7a00f5); border-radius:50%; top:36px; left:36px; animation:an12-rotate 2s linear infinite; }\n  .anim-an12 .dot:nth-child(2){ animation-delay:0.5s; }\n  .anim-an12 .dot:nth-child(3){ animation-delay:1s; }\n  @keyframes an12-rotate { from{transform:rotate(0deg) translateX(30px);} to{transform:rotate(360deg) translateX(30px);} }\n  @media (prefers-reduced-motion:reduce){ .dot{animation:none;} }\n</style>\n<div class='anim-an12'><div class='dot'></div><div class='dot'></div><div class='dot'></div></div>"
    },

    {
      id: "EF9",
      section: "effects",
      name: "Neon Glow Box",
      description: "Box with neon glow using box-shadow and opacity pulse",
      creator: "gpt-oss",
      tags: ["neon", "glow", "effects"],
      tweaks: [
        { type: "color", label: "Glow Color", varName: "--ef9-glow", default: "#7a00f5" }
      ],
      code: "<style>\n  .effect-ef9 { width:120px; height:80px; background:#000; border:2px solid var(--ef9-glow,#7a00f5); box-shadow:0 0 8px var(--ef9-glow,#7a00f5); animation:ef9-pulse 2s infinite; display:flex; align-items:center; justify-content:center; color:#fff; font-size:12px; font-weight:700; }\n  @keyframes ef9-pulse { 0%,100%{box-shadow:0 0 8px var(--ef9-glow,#7a00f5);} 50%{box-shadow:0 0 16px var(--ef9-glow,#7a00f5);} }\n  @media (prefers-reduced-motion:reduce){ .effect-ef9{animation:none;} }\n</style>\n<div class='effect-ef9'>NEON BOX</div>"
    }

  ]
};

/* ------------------------------------------------------------
   AGENT EXPANSION PROMPT
   The "Copy agent prompt" button hands this to any AI agent so
   it can grow the library correctly on its own.
   ------------------------------------------------------------ */
window.AGENT_PROMPT = [
  "You are [AGENT NAME]. Everything you add to DESIGN LAB appears under a [COLOR] credit chip.",
  "",
  "FILL-IN SLOTS",
  "[AGENT NAME] and [COLOR] are placeholders that I fill in before sending this prompt to you. [COLOR] should be a hex code (e.g. #f97316) - it drives your credit chip in the UI. If either slot is still an unfilled placeholder when you receive this, stop and ask me who you are before adding anything. Do not guess at your own identity, and do not sign any work until I answer.",
  "",
  "TASK",
  "Expand the section (drawer) of the library that I specify with new specimens.",
  "",
  "NON-NEGOTIABLE RULES",
  "1. Study the drawer first. Read everything already in the section I named before inventing anything.",
  "2. Difference over variation. Add only items that are stylistically AND structurally different from everything already there: distinct silhouette, unique interaction model and states (hover, press, focus, drag), motion personality, overall feel and visual personality.",
  "3. No near-duplicates. Never a simple color swap, size tweak, radius change, or minor restyle of an existing entry. If your idea is superficially similar to anything already in the drawer, invent something structurally new instead.",
  "4. Sign every new item with the name and chip color listed above. Before adding anything, register yourself in the creators array at the top of js/data.js ({ id, name, color }) using a short lowercase id derived from your name. The reserved id \"me\" belongs to the local user - never sign with it.",
  "5. Follow the existing data and card structure. Match the ITEM SCHEMA documented at the top of js/data.js exactly: unique short id (section initial(s) + next free number), section id, 2-4 word name, one-line description of what makes it structurally distinct, creator id, optional tags, and a self-contained clean code snippet.",
  "6. Finished quality. Each snippet must be formatted HTML plus scoped, prefixed CSS (no external assets, no frameworks), look complete centered on a dark stage, and survive being pasted anywhere.",
  "7. Make it tweakable where it fits naturally. One to three simple controls declared in the tweaks array (a color picker or radius/size sliders), backed by CSS custom properties that your snippet consumes via var(--name, fallback), so it still looks complete with zero overrides.",
  "8. Motion stays cheap by law: CSS-only; animate transform and opacity exclusively; wrap any animation in a prefers-reduced-motion media query.",
  "9. Additive only. Never modify, restyle, rename, renumber, or delete existing entries or the section registry.",
  "",
  "WHEN YOU ARE FINISHED",
  "List the new items you added with their IDs and names, and give one sentence per item on why it is structurally distinct from its neighbors.",
  "",
  "THEN SHIP IT (required)",
  "Once node --check js/data.js && node --check js/app.js pass:",
  "  git pull --rebase origin main",
  "  git add js/data.js",
  "  git commit -m \"<drawer-code>: add <IDs> (<short names>)\"",
  "  git push",
  "If the rebase conflicts inside items[], another agent appended at the same spot: keep BOTH blocks of entries, fix commas until the file parses, node --check again, then git rebase --continue and push. Never force-push, never amend or delete other agents' commits, and if anything goes sideways run git rebase --abort and report back instead of improvising.",
  "",
  "The complete working agreement (storage map, console API, definition of done) lives in AGENTS.md next to js/data.js."
].join("\n");
