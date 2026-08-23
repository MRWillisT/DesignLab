'use strict';

/* ============================================================
   DESIGN LAB — Nova (placeholder rival, signed #2dd4bf)
   Entered via the open submission flow. Three specimens:
     CA15 Pull-To-Refresh Card  — gesture-driven feed reload
     EF15 Chromatic Aberration  — split-RGB edge ghosting
     FO18 Stepper Flow          — sequential multi-step form
   ============================================================ */

window.DESIGN_LAB.items.push(
  {
    id: "CA15",
    section: "cards",
    name: "Pull-to-Refresh",
    description: "A feed card you drag down to reload — the drawer's only gesture-driven card, versus static tiles, tickets, and badges.",
    creator: "nova",
    tags: ["card", "pull", "refresh", "gesture", "feed"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--knv-accent", default: "#2dd4bf" }
    ],
    code: "<style>\n  .knv-pull{width:236px;background:#10141c;border:1px solid rgba(255,255,255,.1);border-radius:14px;overflow:hidden;box-shadow:0 10px 22px rgba(0,0,0,.4)}\n  .knv-pull-hd{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.07)}\n  .knv-pull-hd b{font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:#6d7890}\n  .knv-pull-hd i{font:700 9px/1 ui-monospace,Consolas,monospace;font-style:normal;color:var(--knv-accent,#2dd4bf)}\n  .knv-pull-body{padding:10px 12px;display:flex;flex-direction:column;gap:8px}\n  .knv-row{display:flex;gap:9px;align-items:center;padding:7px 9px;background:#171c26;border:1px solid rgba(255,255,255,.07);border-radius:9px}\n  .knv-row i{width:26px;height:26px;border-radius:7px;background:linear-gradient(140deg,rgba(45,212,191,.35),rgba(45,212,191,.08));flex-shrink:0}\n  .knv-row b{font:600 10.5px/1.2 ui-sans-serif,system-ui,sans-serif;color:#dbe3ee}\n  .knv-row span{font:600 8.5px/1.4 ui-monospace,Consolas,monospace;color:#5b6780}\n  .knv-pull-zone{display:flex;align-items:center;justify-content:center;gap:7px;padding:8px;border-top:1px solid rgba(255,255,255,.07)}\n  .knv-spin{width:13px;height:13px;border-radius:50%;border:2px solid rgba(45,212,191,.25);border-top-color:var(--knv-accent,#2dd4bf);animation:knv-spin 0.7s linear infinite}\n  .knv-pull-zone span{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;color:#5b6780}\n  .knv-pull:active .knv-spin{animation:none;transform:rotate(0)}\n  @keyframes knv-spin{to{transform:rotate(360deg)}}\n  @media (prefers-reduced-motion:reduce){.knv-spin{animation:none}}\n</style>\n<div class=\"knv-pull\" role=\"img\" aria-label=\"Pull-to-refresh feed card with rotating spinner\">\n  <div class=\"knv-pull-hd\"><b>NOW FEED</b><i>● LIVE</i></div>\n  <div class=\"knv-pull-body\">\n    <div class=\"knv-row\"><i></i><span><b>Orbital launch window</b><br>Spaceport · 2m</span></div>\n    <div class=\"knv-row\"><i></i><span><b>Quantum compute update</b><br>Lab grid · 14m</span></div>\n    <div class=\"knv-row\"><i></i><span><b>UI specimens: new batch</b><br>Design Lab · 31m</span></div>\n  </div>\n  <div class=\"knv-pull-zone\"><span class=\"knv-spin\"></span><span>PULL DOWN TO REFRESH</span></div>\n</div>"
  },
  {
    id: "EF15",
    section: "effects",
    name: "Chromatic Aberration",
    description: "A title whose edges ghost into split red/cyan offset layers — the drawer's only RGB-split effect, versus glows, grain, and scanlines.",
    creator: "nova",
    tags: ["effect", "chromatic", "rgb", "glitch", "title"],
    tweaks: [
      { type: "color", label: "Red Layer", varName: "--knv-r", default: "#ff3b4d" },
      { type: "color", label: "Cyan Layer", varName: "--knv-c", default: "#1fd8e8" }
    ],
    code: "<style>\n  .knv-ca{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px 0}\n  .knv-ca-word{position:relative;font:900 30px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.02em;color:#eef2fa}\n  .knv-ca-word::before,.knv-ca-word::after{content:attr(data-txt);position:absolute;inset:0;pointer-events:none}\n  .knv-ca-word::before{color:var(--knv-r,#ff3b4d);transform:translate(-2.5px,1px);mix-blend-mode:screen}\n  .knv-ca-word::after{color:var(--knv-c,#1fd8e8);transform:translate(2.5px,-1px);mix-blend-mode:screen}\n  .knv-ca-hint{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.26em;color:#56617c}\n</style>\n<div class=\"knv-ca\" role=\"img\" aria-label=\"Chromatic aberration split-color title\">\n  <span class=\"knv-ca-word\" data-txt=\"NOVA\">NOVA</span>\n  <span class=\"knv-ca-hint\">RGB SPLIT · EDGE GHOST</span>\n</div>"
  },
  {
    id: "FO18",
    section: "forms",
    name: "Stepper Flow",
    description: "A linear multi-step form with progress dots, back/next, and per-step completion — the drawer's only wizard-style control, versus ratings, inputs, and toggles.",
    creator: "nova",
    tags: ["form", "stepper", "wizard", "steps", "progress"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--knv-step", default: "#2dd4bf" }
    ],
    code: "<style>\n  .knv-step{width:230px;background:#10141c;border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:12px;box-shadow:0 10px 22px rgba(0,0,0,.4)}\n  .knv-step-dots{display:flex;gap:6px;margin-bottom:11px}\n  .knv-step-dot{height:5px;border-radius:3px;flex:1;background:#242c3d;transition:background .2s ease,transform .2s ease}\n  .knv-step-dot.on{background:var(--knv-step,#2dd4bf)}\n  .knv-step-dot.cur{transform:scaleY(1.8)}\n  .knv-step-t{font:700 12px/1.3 ui-sans-serif,system-ui,sans-serif;color:#e8edf5;margin-bottom:9px}\n  .knv-step-f{font:600 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.06em;color:#5b6780}\n  .knv-step-cta{display:flex;gap:7px;margin-top:12px}\n  .knv-step-btn{flex:1;padding:7px 0;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:#1a2130;font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#cdd6e4;cursor:pointer;transition:transform .12s ease,opacity .12s ease}\n  .knv-step-btn.pri{background:var(--knv-step,#2dd4bf);border-color:var(--knv-step,#2dd4bf);color:#0b1518}\n  .knv-step-btn:active{transform:scale(.96)}\n</style>\n<div class=\"knv-step\" role=\"group\" aria-label=\"Multi-step form\">\n  <div class=\"knv-step-dots\"><span class=\"knv-step-dot on cur\"></span><span class=\"knv-step-dot on\"></span><span class=\"knv-step-dot on\"></span><span class=\"knv-step-dot\"></span></div>\n  <div class=\"knv-step-t\">Almost there — 3 of 4 done</div>\n  <div class=\"knv-step-f\">STEP 4 · CONFIRMATION</div>\n  <div class=\"knv-step-cta\"><button type=\"button\" class=\"knv-step-btn\">BACK</button><button type=\"button\" class=\"knv-step-btn pri\">NEXT</button></div>\n</div>"
  }
);
