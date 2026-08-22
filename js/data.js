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
    { id: "me",       name: "My Variants", color: "#f472b6" }
  ],

  /* ----------------------------------------------------------
     SECTIONS — fixed registry of drawers. Reference by id.
     `code` is the two-letter prefix every item id in that drawer
     must use (BU1, PL7, ...). `brief` tells agents what belongs.
     Do not reorder or renumber existing drawers.
     ---------------------------------------------------------- */
  sections: [
    { id: "buttons",     code: "BU", name: "Buttons",                      brief: "Click targets. Vary silhouette, anatomy, feedback." },
    { id: "forms",       code: "FO", name: "Form Controls",                brief: "Inputs, selects, textareas, steppers, comboboxes." },
    { id: "toggles",     code: "TO", name: "Toggles & Switches",           brief: "Binary controls: switches, check-states, segmented binaries." },
    { id: "sliders",     code: "SL", name: "Sliders & Progress",           brief: "Value scrubbers, range inputs, progress indicators." },
    { id: "cards",       code: "CA", name: "Cards & Panels",               brief: "Self-contained surfaces: profiles, tiles, content panels." },
    { id: "navigation",  code: "NA", name: "Navigation",                   brief: "Menus, tab bars, breadcrumbs, paginators." },
    { id: "badges",      code: "BA", name: "Badges, Chips & Tags",         brief: "Status dots, counters, labels, pills." },
    { id: "alerts",      code: "AL", name: "Alerts & Toasts",              brief: "Inline callouts and transient notifications." },
    { id: "loaders",     code: "LO", name: "Loaders & Skeletons",          brief: "Spinners, shimmer placeholders, waiting states." },
    { id: "icons",       code: "IC", name: "Icons & Glyph Systems",        brief: "Glyph sets and icon systems with a unified voice." },
    { id: "players",     code: "PL", name: "Media Players",                brief: "Audio/video transport, scrubbing, volume UI." },
    { id: "modals",      code: "MO", name: "Modals & Overlays",            brief: "Dialogs, sheets, popovers, overlay patterns." },
    { id: "animations",  code: "AN", name: "Animations & Micro-interactions", brief: "Motion demos where the movement IS the design." },
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
      description: "Sleek 32px pill player. Deep violet scrubber track with circular play toggle and glowing playhead.",
      creator: "gemini",
      tags: ["player","audio","pill","violet"],
      code: "<style>\n  .kpl1d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl1d\" style=\"background: rgba(30, 27, 75, 0.6); border: 1px solid rgba(139, 92, 246, 0.35); border-radius: 9999px;\">\n<button style=\"width:26px; height:26px; border-radius:50%; background:#8b5cf6; border:none; color:#fff; font-size:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:11px; font-weight:600; color:#c4b5fd; font-variant-numeric:tabular-nums;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:4px; background:rgba(255,255,255,0.15); border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#8b5cf6; border-radius:2px;\"></div>\n<div style=\"position:absolute; left:28%; top:-4px; width:12px; height:12px; border-radius:50%; background:#fff; box-shadow:0 0 6px #8b5cf6; transform:translateX(-50%);\"></div>\n</div>\n<span style=\"font-size:12px; opacity:0.8;\">🔊</span>\n</div>"
    },

    {
      id: "PL2",
      section: "players",
      name: "Hardware Console Deck",
      description: "Tactile gunmetal hardware finish with chiseled metallic play dial and green/amber LED level meter.",
      creator: "gemini",
      tags: ["player","hardware","gunmetal","led"],
      code: "<style>\n  .kpl2d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl2d\" style=\"background: linear-gradient(180deg, #242933 0%, #171a21 100%); border: 1px solid #3b4252; border-bottom: 2px solid #0f1219; border-radius: 6px;\">\n<button style=\"width:26px; height:26px; border-radius:4px; background:#2e3440; border:1px solid #4c566a; color:#88c0d0; font-size:11px; display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:11px; font-family:monospace; color:#88c0d0;\">00:04</span>\n<div style=\"flex:1; height:6px; background:#12141a; border-radius:3px; border:1px solid #2e3440; overflow:hidden; position:relative;\">\n<div style=\"width:30%; height:100%; background:linear-gradient(90deg, #a3be8c 0%, #ebcb8b 80%, #bf616a 100%);\"></div>\n</div>\n<span style=\"font-size:11px; font-family:monospace; color:#616e88;\">15.0s</span>\n<span style=\"font-size:11px; color:#88c0d0;\">🎚</span>\n</div>"
    },

    {
      id: "PL3",
      section: "players",
      name: "Floating Cyber Glass",
      description: "Translucent frosted acrylic with electric cyan timeline wave glow and minimalist controls.",
      creator: "gemini",
      tags: ["player","glass","cyan","glow"],
      code: "<style>\n  .kpl3d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl3d\" style=\"background: rgba(15, 23, 42, 0.8); border: 1px solid #38bdf8; box-shadow: 0 0 10px rgba(56,189,248,0.2); border-radius: 8px;\">\n<button style=\"width:24px; height:24px; border-radius:50%; background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; font-size:9px; display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:11px; color:#38bdf8; font-weight:600;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:3px; background:rgba(56,189,248,0.2); border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#38bdf8; box-shadow:0 0 8px #38bdf8;\"></div>\n</div>\n<span style=\"font-size:11px; color:#38bdf8;\">⚡</span>\n</div>"
    },

    {
      id: "PL4",
      section: "players",
      name: "Neomorphic Soft Dock",
      description: "Soft debossed track slot with tactile physical play button and warm white timecode.",
      creator: "gemini",
      tags: ["player","neumorphic","soft","indigo"],
      code: "<style>\n  .kpl4d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl4d\" style=\"background: #1e222d; border: 1px solid rgba(255,255,255,0.06); box-shadow: inset 1px 1px 3px rgba(0,0,0,0.5); border-radius: 8px;\">\n<button style=\"width:26px; height:26px; border-radius:6px; background:#282e3d; border:1px solid rgba(255,255,255,0.08); color:#f1f5f9; font-size:10px; box-shadow: 2px 2px 4px rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:11px; color:#e2e8f0; font-weight:500;\">0:04 / 0:15</span>\n<div style=\"flex:1; height:6px; background:#141720; border-radius:3px; box-shadow: inset 1px 1px 2px #000; position:relative;\">\n<div style=\"width:28%; height:100%; background:#6366f1; border-radius:3px;\"></div>\n</div>\n<span style=\"font-size:11px; color:#94a3b8;\">🔊</span>\n</div>"
    },

    {
      id: "PL5",
      section: "players",
      name: "Minimal Monochrome Line",
      description: "Pure stark high-contrast aesthetic with sharp geometry and ultra-clean wireframe borders.",
      creator: "gemini",
      tags: ["player","monochrome","black","minimal"],
      code: "<style>\n  .kpl5d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl5d\" style=\"background: #000000; border: 1px solid #ffffff; border-radius: 4px;\">\n<button style=\"width:22px; height:22px; background:#ffffff; border:none; color:#000000; font-size:10px; font-weight:700; display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:11px; color:#ffffff; font-family:monospace;\">0:04/0:15</span>\n<div style=\"flex:1; height:2px; background:#333; position:relative;\">\n<div style=\"width:28%; height:100%; background:#ffffff;\"></div>\n</div>\n<span style=\"font-size:10px; font-family:monospace; color:#fff;\">[VOL]</span>\n</div>"
    },

    {
      id: "PL6",
      section: "players",
      name: "Retro Amber Hi-Fi",
      description: "Classic vintage studio receiver aesthetic with glowing warm amber digits and brushed metallic accents.",
      creator: "gemini",
      tags: ["player","retro","amber","hifi"],
      code: "<style>\n  .kpl6d{width:100%;border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:10px}\n</style>\n<div class=\"kpl6d\" style=\"background: #14120e; border: 1px solid #d97706; border-radius: 6px; box-shadow: 0 0 8px rgba(217,119,6,0.2);\">\n<button style=\"width:26px; height:26px; border-radius:50%; background:#78350f; border:1px solid #f59e0b; color:#fbbf24; font-size:10px; display:flex; align-items:center; justify-content:center; cursor:pointer;\">▶</button>\n<span style=\"font-size:12px; font-family:monospace; color:#fbbf24; text-shadow:0 0 6px #f59e0b;\">0:04 [PLAY]</span>\n<div style=\"flex:1; height:5px; background:#291e0d; border-radius:2px; position:relative;\">\n<div style=\"width:28%; height:100%; background:#f59e0b; box-shadow:0 0 6px #f59e0b;\"></div>\n</div>\n<span style=\"font-size:11px; color:#fbbf24;\">📻</span>\n</div>"
    },

    {
      id: "IC1",
      section: "icons",
      name: "Crisp Minimal Line / Outline",
      description: "1.5px clean hairline monochrome strokes. Sophisticated, lightweight, professional.",
      creator: "gemini",
      tags: ["icon","emoji","outline","minimal"],
      code: "<span style=\"color: #e2e8f0; font-size: 16px; letter-spacing: 12px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "IC2",
      section: "icons",
      name: "Neon Cyber Dual-Tone",
      description: "Vibrant electric cyan/purple glow outline with ambient drop-shadow.",
      creator: "gemini",
      tags: ["icon","emoji","neon","cyan"],
      code: "<span style=\"color: #38bdf8; text-shadow: 0 0 8px rgba(56,189,248,0.7); font-size: 16px; letter-spacing: 12px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "IC3",
      section: "icons",
      name: "Frosted Glass Badge Icons",
      description: "Icons enclosed in individual semi-transparent rounded pill badges.",
      creator: "gemini",
      tags: ["icon","emoji","glass","badge"],
      code: "<span style=\"color: #c4b5fd; background: rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); font-size: 14px; letter-spacing: 8px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "IC4",
      section: "icons",
      name: "Hardware Stamped & Engraved",
      description: "Subtle debossed dark gunmetal finish with top lighting relief.",
      creator: "gemini",
      tags: ["icon","emoji","engraved","gunmetal"],
      code: "<span style=\"color: #94a3b8; text-shadow: 0 1px 0 rgba(255,255,255,0.15), 0 -1px 0 #000; font-size: 16px; letter-spacing: 12px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "IC5",
      section: "icons",
      name: "Vibrant Sunset Gradient Fill",
      description: "Warm energetic orange/red/violet saturation.",
      creator: "gemini",
      tags: ["icon","emoji","gradient","warm"],
      code: "<span style=\"color: #f43f5e; text-shadow: 0 0 8px rgba(244,63,94,0.5); font-size: 16px; letter-spacing: 12px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "IC6",
      section: "icons",
      name: "Emerald Studio Accent",
      description: "Crisp mint and emerald precision pro audio/video iconography.",
      creator: "gemini",
      tags: ["icon","emoji","emerald","mint"],
      code: "<span style=\"color: #10b981; text-shadow: 0 0 8px rgba(16,185,129,0.5); font-size: 16px; letter-spacing: 12px;\">▶ 🎵 🎬 🖼️ ⚙️ ✨ 💾 🗑️ 🪄</span>"
    },

    {
      id: "BU1",
      section: "buttons",
      name: "Classic Aurora Gradient",
      description: "Current standard purple-to-indigo gradient.",
      creator: "gemini",
      tags: ["button","gradient","purple","primary"],
      code: "<button type=\"button\" style=\"background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: #ffffff; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35); cursor: pointer;\">Generate Media</button>"
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
      id: "BU4",
      section: "buttons",
      name: "Frosted Glassmorphism",
      description: "Translucent frosted background with white border.",
      creator: "gemini",
      tags: ["button","glass","frosted","blur"],
      code: "<button type=\"button\" style=\"background: rgba(255, 255, 255, 0.09); backdrop-filter: blur(12px); color: #f8fafc; border: 1px solid rgba(255, 255, 255, 0.22); border-radius: 10px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU5",
      section: "buttons",
      name: "Neomorphic Tactile Bevel",
      description: "Physical studio button feel with soft dual-tone bevel.",
      creator: "gemini",
      tags: ["button","neumorphic","bevel","dark"],
      code: "<button type=\"button\" style=\"background: #1e222d; color: #f1f5f9; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; box-shadow: 3px 3px 8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18); cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU6",
      section: "buttons",
      name: "Brutalist Mono Stark",
      description: "Bold pure white on black with sharp 4px corners.",
      creator: "gemini",
      tags: ["button","brutalist","mono","contrast"],
      code: "<button type=\"button\" style=\"background: #ffffff; color: #000000; border: 2px solid #ffffff; border-radius: 4px; font-weight: 700; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; padding: 0 18px; height: 36px; cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU7",
      section: "buttons",
      name: "Sunset Ember Glow",
      description: "Vibrant warm ember gradient (orange/red/pink).",
      creator: "gemini",
      tags: ["button","ember","orange","gradient"],
      code: "<button type=\"button\" style=\"background: linear-gradient(135deg, #f97316 0%, #dc2626 50%, #db2777 100%); color: #ffffff; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; box-shadow: 0 2px 10px rgba(249, 115, 22, 0.4); cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU8",
      section: "buttons",
      name: "Hardware Console Deck",
      description: "Dark gunmetal industrial audio hardware finish.",
      creator: "gemini",
      tags: ["button","hardware","gunmetal","industrial"],
      code: "<button type=\"button\" style=\"background: linear-gradient(180deg, #2d3342 0%, #1a1e27 100%); color: #e2e8f0; border: 1px solid #434c5e; border-bottom: 2px solid #0f1219; border-radius: 6px; font-weight: 600; font-size: 12px; padding: 0 16px; height: 36px; cursor: pointer;\">Generate Media</button>"
    },

    {
      id: "BU9",
      section: "buttons",
      name: "Emerald Precision Pro",
      description: "Deep rich emerald green accent for studio precision.",
      creator: "gemini",
      tags: ["button","emerald","green","precision"],
      code: "<button type=\"button\" style=\"background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; border: 1px solid rgba(255,255,255,0.18); border-radius: 8px; font-weight: 600; font-size: 13px; padding: 0 18px; height: 38px; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35); cursor: pointer;\">Generate Media</button>"
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
      id: "BU11",
      section: "buttons",
      name: "Hexagon Cut",
      description: "clip-path hexagon — zero border-radius, all angles. Sci-fi console energy.",
      creator: "ox-alpha",
      tags: ["button","hexagon","clip-path","scifi"],
      code: "<style>\n  .kbu11:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu11\" style=\"clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%); background:linear-gradient(135deg,#7c3aed,#4f46e5); color:#fff; border:none; font-weight:800; font-size:12px; letter-spacing:.08em; padding:15px 30px; cursor:pointer;\">CREATE</button>"
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
      id: "BU14",
      section: "buttons",
      name: "Notched Octagon",
      description: "Two cut corners via clip-path — tactical HUD framing around a normal label.",
      creator: "ox-alpha",
      tags: ["button","octagon","notched","hud"],
      code: "<style>\n  .kbu14:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu14\" style=\"clip-path:polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px); background:linear-gradient(135deg,#0ea5e9,#6366f1); color:#fff; border:none; font-weight:700; font-size:12px; letter-spacing:.06em; padding:13px 26px; cursor:pointer;\">EXPORT CLIP</button>"
    },

    {
      id: "BU15",
      section: "buttons",
      name: "Ticket Stub",
      description: "Cinema-ticket punch holes on both edges — playful, collectible, memorable.",
      creator: "ox-alpha",
      tags: ["button","ticket","punch","playful"],
      code: "<style>\n  .kbu15:hover{filter:brightness(1.18)}\n</style>\n<span style=\"position:relative; display:inline-block;\"><button type=\"button\" class=\"kbu15\" style=\"background:linear-gradient(135deg,#f59e0b,#ef4444); color:#fff; border:none; padding:13px 34px; font-weight:800; font-size:12px; letter-spacing:.09em; cursor:pointer;\">ADMIT ONE</button><i style=\"position:absolute; left:-7px; top:50%; transform:translateY(-50%); width:14px; height:14px; border-radius:50%; background:#0d0f13;\"></i><i style=\"position:absolute; right:-7px; top:50%; transform:translateY(-50%); width:14px; height:14px; border-radius:50%; background:#0d0f13;\"></i></span>"
    },

    {
      id: "BU16",
      section: "buttons",
      name: "Leaf / Petal Play",
      description: "One sharp corner, three round — rotated petal with a counter-rotated play glyph.",
      creator: "ox-alpha",
      tags: ["button","leaf","petal","rotated"],
      code: "<style>\n  .kbu16:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu16\" style=\"width:58px; height:58px; border:none; background:linear-gradient(135deg,#10b981,#059669); border-radius:4px 50% 50% 50%; transform:rotate(-45deg); cursor:pointer; box-shadow:0 6px 16px rgba(16,185,129,.4);\"><span style=\"display:inline-flex; align-items:center; justify-content:center; width:100%; height:100%; transform:rotate(45deg); color:#fff; font-size:20px;\">▶</span></button>"
    },

    {
      id: "BU17",
      section: "buttons",
      name: "Chevron Ribbon",
      description: "Arrow banner pointing forward — motion baked into the silhouette.",
      creator: "ox-alpha",
      tags: ["button","chevron","arrow","ribbon"],
      code: "<style>\n  .kbu17:hover{filter:brightness(1.18)}\n</style>\n<button type=\"button\" class=\"kbu17\" style=\"clip-path:polygon(0 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,0 100%); background:linear-gradient(90deg,#8b5cf6,#ec4899); color:#fff; border:none; font-weight:800; font-size:12px; letter-spacing:.07em; padding:14px 34px 14px 22px; cursor:pointer;\">NEXT BEAT →</button>"
    },

    {
      id: "BU18",
      section: "buttons",
      name: "Speech Bubble Pill",
      description: "Pill with a little tail — makes the button talk. Great for AI-assist actions.",
      creator: "ox-alpha",
      tags: ["button","speech-bubble","tail","assist"],
      code: "<style>\n  .kbu18b{position:relative;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;border:none;border-radius:9999px;padding:11px 24px;font-weight:700;font-size:12px;cursor:pointer}\n  .kbu18b::after{content:\"\";position:absolute;left:28px;bottom:-8px;width:14px;height:14px;background:#ec4899;clip-path:polygon(0 0,100% 0,15% 100%)}\n</style>\n<button type=\"button\" class=\"kbu18b\">✨ Assist me</button>"
    },

    {
      id: "BU19",
      section: "buttons",
      name: "Squishy 3D Press",
      description: "Thick bottom lip physically sinks when clicked (:active). Toy-like tactility.",
      creator: "ox-alpha",
      tags: ["button","3d","press","tactile"],
      code: "<style>\n  .kbu19:hover{filter:brightness(1.18)}\n  .kbu19p{box-shadow:0 5px 0 #372a75,0 9px 18px rgba(0,0,0,.45)}\n  .kbu19p:active{transform:translateY(4px);box-shadow:0 1px 0 #372a75,0 3px 8px rgba(0,0,0,.4)}\n</style>\n<button type=\"button\" class=\"kbu19 kbu19p\" style=\"background:linear-gradient(180deg,#a78bfa,#7c3aed); color:#fff; border:none; border-radius:12px; font-weight:800; font-size:13px; padding:13px 28px; cursor:pointer;\">PRESS ME</button>"
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
      description: "Three actions sharing one capsule — active segment glows, siblings stay muted.",
      creator: "ox-alpha",
      tags: ["navigation","segmented","tabs","capsule"],
      code: "<div style=\"display:inline-flex; background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.14); border-radius:9999px; padding:3px;\"><span style=\"padding:7px 16px; font-size:12px; color:#94a3b8; cursor:pointer;\">Draft</span><span style=\"padding:7px 16px; font-size:12px; color:#fff; background:linear-gradient(135deg,#7c3aed,#4f46e5); border-radius:9999px; font-weight:700; cursor:pointer;\">Render</span><span style=\"padding:7px 16px; font-size:12px; color:#94a3b8; cursor:pointer;\">Export</span></div>"
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
      id: "IC8",
      section: "icons",
      name: "Duotone Depth",
      description: "Same vectors twice — a soft filled ghost underneath plus a vivid stroke on top. Adds depth without clutter.",
      creator: "ox-alpha",
      tags: ["icon","duotone","depth","vector"],
      code: "<span style=\"display:flex; align-items:center; color:#a78bfa; flex-wrap:wrap; gap:0;\"><span title=\"play\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><path d=\"M7 5v14l12-7z\"/></g><g><path d=\"M7 5v14l12-7z\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"film\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4\"/></g><g><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"image\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"2\"/><path d=\"M21 16l-5-5-6 6-2-2-5 5\"/></g><g><rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"3\"/><circle cx=\"9\" cy=\"10\" r=\"2\"/><path d=\"M21 16l-5-5-6 6-2-2-5 5\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"sliders\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><path d=\"M4 7h9M17 7h3M13 4v6M4 17h3M11 17h9M7 14v6\"/></g><g><path d=\"M4 7h9M17 7h3M13 4v6M4 17h3M11 17h9M7 14v6\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"spark\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><path d=\"M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z\"/></g><g><path d=\"M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"save\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><path d=\"M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z\"/><path d=\"M7 21v-7h10v7M8 3v4h6\"/></g><g><path d=\"M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z\"/><path d=\"M7 21v-7h10v7M8 3v4h6\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"trash\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><path d=\"M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7\"/></g><g><path d=\"M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7\"/></g></svg></span><span style=\"display:inline-block; width:14px;\"></span><span title=\"mic\" style=\"display:inline-flex;\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><g fill=\"currentColor\" stroke=\"none\" opacity=\".22\"><rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0 0 14 0M12 18v3\"/></g><g><rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0 0 14 0M12 18v3\"/></g></svg></span></span>"
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
      description: "iOS-style track + knob, ON state. Instantly readable at small sizes.",
      creator: "ox-alpha",
      tags: ["switch","ios","pill","on-state"],
      code: "<span style=\"display:inline-flex; align-items:center; gap:10px;\"><span style=\"display:inline-block; width:46px; height:26px; border-radius:9999px; background:linear-gradient(135deg,#8b5cf6,#6366f1); position:relative; box-shadow:inset 0 1px 3px rgba(0,0,0,.3);\"><i style=\"position:absolute; right:3px; top:3px; width:20px; height:20px; border-radius:50%; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,.35);\"></i></span><span style=\"font-size:12px; color:#c4b5fd;\">Face lock · ON</span></span>"
    },

    {
      id: "TO2",
      section: "toggles",
      name: "Neon Glow Switch",
      description: "Off-state switch where the track itself signals readiness — cyan halo when armed.",
      creator: "ox-alpha",
      tags: ["switch","neon","glow","off-state"],
      code: "<span style=\"display:inline-flex; align-items:center; gap:10px;\"><span style=\"display:inline-block; width:46px; height:26px; border-radius:9999px; background:#0f172a; border:1px solid #38bdf8; box-shadow:0 0 10px rgba(56,189,248,.5), inset 0 0 8px rgba(56,189,248,.25); position:relative;\"><i style=\"position:absolute; left:3px; top:3px; width:18px; height:18px; border-radius:50%; background:#38bdf8; box-shadow:0 0 8px #38bdf8;\"></i></span><span style=\"font-size:12px; color:#7dd3fc;\">Upscale · OFF</span></span>"
    },

    {
      id: "TO3",
      section: "toggles",
      name: "Industrial Square Toggle",
      description: "Hardware-console rocker with LED pip — matches the gunmetal player family.",
      creator: "ox-alpha",
      tags: ["switch","industrial","rocker","led"],
      code: "<span style=\"display:inline-flex; align-items:center; gap:10px;\"><span style=\"display:inline-block; width:48px; height:26px; background:linear-gradient(180deg,#2d3342,#171a21); border:1px solid #4c566a; border-radius:5px; position:relative; padding:3px;\"><span style=\"display:block; width:22px; height:18px; background:linear-gradient(180deg,#88c0d0,#5e81ac); border-radius:3px; margin-left:auto; box-shadow:0 1px 3px rgba(0,0,0,.5);\"></span><i style=\"position:absolute; left:6px; bottom:-9px; width:5px; height:5px; border-radius:50%; background:#a3be8c; box-shadow:0 0 5px #a3be8c;\"></i></span><span style=\"font-size:12px; color:#88c0d0; font-family:monospace;\">CHAIN [ON]</span></span>"
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
      description: "Rectangular chips with a raised selected state — quality/model pickers as tactile chips.",
      creator: "ox-alpha",
      tags: ["chips","selector","segmented","quality"],
      code: "<span style=\"display:inline-flex; gap:8px; flex-wrap:wrap;\"><span style=\"padding:7px 14px; font-size:12px; border-radius:8px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); color:#94a3b8; cursor:pointer;\">Draft</span><span style=\"padding:7px 14px; font-size:12px; border-radius:8px; background:rgba(139,92,246,.18); border:1px solid #8b5cf6; color:#ddd6fe; font-weight:700; cursor:pointer; box-shadow:0 0 10px rgba(139,92,246,.25);\">HD ✓</span><span style=\"padding:7px 14px; font-size:12px; border-radius:8px; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); color:#94a3b8; cursor:pointer;\">Ultra</span></span>"
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
      code: "<style>\n  @keyframes kba2kf-br{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.15)}}\n  .kba2br{animation:kba2kf-br 2s ease-in-out infinite;display:inline-block}\n  @media (prefers-reduced-motion:reduce){.kba2br{animation:none}}\n</style>\n<span style=\"display:inline-flex; gap:8px; flex-wrap:wrap;\"><span style=\"display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:9999px; font-size:11px; font-weight:700; background:rgba(251,191,36,.12); border:1px solid rgba(251,191,36,.4); color:#fcd34d;\"><i style=\"width:7px; height:7px; border-radius:50%; background:#fbbf24;\"></i>QUEUED</span><span style=\"display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:9999px; font-size:11px; font-weight:700; background:rgba(56,189,248,.12); border:1px solid rgba(56,189,248,.4); color:#7dd3fc;\"><i class=\"kba2br\" style=\"width:7px; height:7px; border-radius:50%; background:#38bdf8;\"></i>RENDERING</span><span style=\"display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:9999px; font-size:11px; font-weight:700; background:rgba(52,211,153,.12); border:1px solid rgba(52,211,153,.4); color:#6ee7b7;\"><i style=\"width:7px; height:7px; border-radius:50%; background:#34d399;\"></i>DONE</span></span>"
    },

    /* ---- Gemini Drawer Expansions: Forms, Loaders, Alerts, Cards, Navigation, Modals, Effects ---- */

    {
      id: "FO1",
      section: "forms",
      name: "Floating Label Cyber Input",
      description: "Neon cyan outline glass input with smooth floating label elevation.",
      creator: "gemini",
      tags: ["form","input","cyber","neon","glass"],
      code: "<style>\n  .kfo1-wrap{position:relative;width:220px;margin:0 auto}\n  .kfo1-in{width:100%;background:rgba(15,23,42,0.85);border:1px solid #38bdf8;border-radius:8px;padding:16px 12px 6px;color:#f8fafc;font-size:12px;outline:none;box-shadow:0 0 10px rgba(56,189,248,0.2)}\n  .kfo1-lbl{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:11.5px;color:#38bdf8;pointer-events:none;transition:transform 0.18s ease,opacity 0.18s ease}\n  .kfo1-in:focus + .kfo1-lbl, .kfo1-in:not(:placeholder-shown) + .kfo1-lbl{transform:translateY(-16px) scale(0.85);transform-origin:left;opacity:0.85}\n  @media (prefers-reduced-motion:reduce){.kfo1-lbl{transition:none}}\n</style>\n<div class=\"kfo1-wrap\">\n  <input class=\"kfo1-in\" placeholder=\" \" type=\"text\" value=\"prompt://v2.cyber\">\n  <label class=\"kfo1-lbl\">Model Endpoint</label>\n</div>"
    },

    {
      id: "FO2",
      section: "forms",
      name: "Gunmetal Hardware Stepper",
      description: "Chiseled hardware console number stepper with tactile +/- triggers.",
      creator: "gemini",
      tags: ["form","stepper","hardware","gunmetal","number"],
      code: "<style>\n  .kfo2-wrap{display:inline-flex;align-items:center;background:linear-gradient(180deg,#242933,#171a21);border:1px solid #3b4252;border-radius:6px;padding:3px;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5)}\n  .kfo2-btn{width:26px;height:26px;border-radius:4px;background:#2e3440;border:1px solid #4c566a;color:#88c0d0;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none}\n  .kfo2-btn:hover{filter:brightness(1.2)}\n  .kfo2-val{width:46px;text-align:center;font-family:monospace;font-size:12.5px;font-weight:600;color:#88c0d0;background:transparent;border:none;outline:none}\n</style>\n<div class=\"kfo2-wrap\">\n  <button type=\"button\" class=\"kfo2-btn\">−</button>\n  <input class=\"kfo2-val\" type=\"text\" value=\"0.75\" readonly>\n  <button type=\"button\" class=\"kfo2-btn\">+</button>\n</div>"
    },

    {
      id: "FO3",
      section: "forms",
      name: "Tag Chip Pill Input",
      description: "Compact capsule input with embedded removable gradient pill chips.",
      creator: "gemini",
      tags: ["form","tags","chips","pill","input"],
      code: "<style>\n  .kfo3-box{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:9999px;padding:4px 10px;width:220px}\n  .kfo3-chip{display:inline-flex;align-items:center;gap:4px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:9999px}\n  .kfo3-in{flex:1;background:transparent;border:none;outline:none;color:#e2e8f0;font-size:11.5px;min-width:40px}\n</style>\n<div class=\"kfo3-box\">\n  <span class=\"kfo3-chip\">Sci-Fi <i style=\"cursor:pointer;font-style:normal;opacity:0.7\">✕</i></span>\n  <input class=\"kfo3-in\" type=\"text\" placeholder=\"Add tag…\">\n</div>"
    },

    {
      id: "FO4",
      section: "forms",
      name: "Segmented Studio Dropdown",
      description: "Deep violet glass select with custom illuminated chevron indicator.",
      creator: "gemini",
      tags: ["form","select","dropdown","violet","glass"],
      code: "<style>\n  .kfo4-sel{background:linear-gradient(135deg,rgba(30,27,75,0.8),rgba(15,23,42,0.9));border:1px solid rgba(139,92,246,0.4);border-radius:8px;color:#c4b5fd;font-size:12px;font-weight:600;padding:8px 30px 8px 12px;outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23a78bfa' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 10px center;box-shadow:0 0 10px rgba(139,92,246,0.25)}\n</style>\n<select class=\"kfo4-sel\">\n  <option>4K Ultra Render (Pro)</option>\n  <option>1080p Studio Preview</option>\n  <option>720p Fast Draft</option>\n</select>"
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
      code: "<style>\n  .kal3-box{display:flex;align-items:center;gap:10px;background:#090d16;border:1px solid #38bdf8;border-left-width:4px;border-radius:6px;padding:8px 12px;box-shadow:0 0 14px rgba(56,189,248,0.25)}\n  .kal3-dot{width:8px;height:8px;border-radius:50%;background:#38bdf8;box-shadow:0 0 8px #38bdf8}\n  .kal3-title{font-size:12px;font-weight:600;color:#e0f2fe}\n</style>\n<div class=\"kal3-box\">\n  <i class=\"kal3-dot\"></i>\n  <span class=\"kal3-title\">Audio Track Rendered (0:15)</span>\n</div>"
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
      description: "Subtle blur glass pill dock with illuminated circular active state.",
      creator: "gemini",
      tags: ["navigation","dock","capsule","floating","glass"],
      code: "<style>\n  .kna2-dock{display:inline-flex;align-items:center;gap:4px;background:rgba(15,23,42,0.85);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:4px 8px;box-shadow:0 12px 30px -8px rgba(0,0,0,0.7)}\n  .kna2-item{display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;color:#94a3b8;font-size:13px;cursor:pointer;transition:transform 0.16s ease,opacity 0.16s ease}\n  .kna2-item:hover{transform:translateY(-2px);color:#fff}\n  .kna2-item.active{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;box-shadow:0 4px 12px rgba(99,102,241,0.4)}\n  @media (prefers-reduced-motion:reduce){.kna2-item{transition:none}}\n</style>\n<nav class=\"kna2-dock\">\n  <span class=\"kna2-item active\">⊞</span>\n  <span class=\"kna2-item\">⚡</span>\n  <span class=\"kna2-item\">⚙</span>\n  <span class=\"kna2-item\">✦</span>\n</nav>"
    },

    {
      id: "NA3",
      section: "navigation",
      name: "Minimalist Breadcrumb Trail",
      description: "Clean hierarchical navigation path with glowing violet chevron delimiters.",
      creator: "gemini",
      tags: ["navigation","breadcrumb","hierarchy","minimal"],
      code: "<style>\n  .kna3-trail{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:500;color:#94a3b8}\n  .kna3-crumb{cursor:pointer;transition:opacity 0.15s ease}\n  .kna3-crumb:hover{color:#e2e8f0}\n  .kna3-chev{color:#8b5cf6;font-size:10px;font-weight:700}\n  .kna3-cur{color:#fff;font-weight:650}\n</style>\n<div class=\"kna3-trail\">\n  <span class=\"kna3-crumb\">Projects</span>\n  <span class=\"kna3-chev\">›</span>\n  <span class=\"kna3-crumb\">Aurora</span>\n  <span class=\"kna3-chev\">›</span>\n  <span class=\"kna3-cur\">Timeline</span>\n</div>"
    },

    {
      id: "NA4",
      section: "navigation",
      name: "Underline Glow Segmented Tabs",
      description: "Minimalist text tab row with electric cyan active indicator halo.",
      creator: "gemini",
      tags: ["navigation","tabs","underline","glow","cyan"],
      code: "<style>\n  .kna4-tabs{display:inline-flex;gap:16px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:2px}\n  .kna4-tab{font-size:12px;font-weight:600;color:#64748b;padding:6px 2px;position:relative;cursor:pointer}\n  .kna4-tab.is-on{color:#38bdf8}\n  .kna4-tab.is-on::after{content:\"\";position:absolute;left:0;bottom:-3px;width:100%;height:2px;background:#38bdf8;box-shadow:0 0 8px #38bdf8;border-radius:1px}\n</style>\n<div class=\"kna4-tabs\">\n  <span class=\"kna4-tab is-on\">Specs</span>\n  <span class=\"kna4-tab\">Code</span>\n  <span class=\"kna4-tab\">Exports</span>\n</div>"
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
