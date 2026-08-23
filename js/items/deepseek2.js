'use strict';

/* ============================================================
   DESIGN LAB — DeepSeek round 2 (creator id: "deepseek", #3b82f6)
   One structurally distinct specimen per drawer. Motion is
   CSS-only (transform/opacity), wrapped in prefers-reduced-motion.
   All tweaks consumed via var(--name, fallback).
   ============================================================ */

window.DESIGN_LAB.items.push(

  /* ---------- ANIMATIONS ---------- */
  {
    id: "AN16",
    section: "animations",
    name: "Coin Toss",
    description: "A gold coin flips end-over-end through a hop and lands with a squash — a 3D coin-flip-and-bounce no animation in the drawer attempts, versus pendulums, cascades, and pulses.",
    creator: "deepseek",
    tags: ["animation", "coin", "flip", "toss", "3d", "bounce"],
    tweaks: [
      { type: "color", label: "Coin Glow", varName: "--kds-coin-accent", default: "#fbbf24" }
    ],
    code: "<style>\n  .kds-coin{display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:26px}\n  .kds-coin-coin{position:relative;width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 34% 28%,#fff3c4,#f2c14e 52%,#b47a14);border:2px solid #d9a832;box-shadow:0 6px 14px rgba(0,0,0,.5),0 0 18px var(--kds-coin-accent,#fbbf24);animation:kds-coin-flip 2.6s cubic-bezier(.45,0,.55,1) infinite;display:flex;align-items:center;justify-content:center;will-change:transform}\n  .kds-coin-face{font:900 19px/1 ui-sans-serif,system-ui,sans-serif;color:#8a5b12;text-shadow:0 1px 0 rgba(255,255,255,.45)}\n  .kds-coin-coin::after{content:\"\";position:absolute;inset:7px;border:1.5px solid rgba(138,91,18,.55);border-radius:50%}\n  .kds-coin-shadow{width:34px;height:7px;border-radius:50%;background:rgba(0,0,0,.5);filter:blur(2px);animation:kds-coin-shadow 2.6s cubic-bezier(.45,0,.55,1) infinite}\n  .kds-coin-cap{margin-top:-6px;font:800 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.24em;color:#56617c}\n  @keyframes kds-coin-flip{0%{transform:rotateY(0) translateY(0)}10%{transform:rotateY(160deg) translateY(-22px)}28%{transform:rotateY(340deg) translateY(-26px)}44%{transform:rotateY(520deg) translateY(-8px)}56%{transform:rotateY(700deg) translateY(0)}60%{transform:rotateY(720deg) translateY(0) scaleY(.86)}64%{transform:rotateY(720deg) translateY(0) scaleY(1.04)}70%{transform:rotateY(720deg) translateY(0) scaleY(1)}100%{transform:rotateY(720deg) translateY(0)}}\n  @keyframes kds-coin-shadow{0%,56%{opacity:.9;transform:scaleX(1)}60%{opacity:.55;transform:scaleX(.6)}64%{opacity:.9;transform:scaleX(1.06)}70%{opacity:.9;transform:scaleX(1)}}\n  @media (prefers-reduced-motion:reduce){.kds-coin-coin,.kds-coin-shadow{animation:none}}\n</style>\n<div class=\"kds-coin\" role=\"img\" aria-label=\"A gold coin flipping end over end and landing\">\n  <i class=\"kds-coin-coin\"><span class=\"kds-coin-face\">$</span></i>\n  <i class=\"kds-coin-shadow\"></i>\n  <span class=\"kds-coin-cap\">HEADS OR TAILS</span>\n</div>"
  },

  /* ---------- LOADERS ---------- */
  {
    id: "LO12",
    section: "loaders",
    name: "Marble Roll",
    description: "A marble rolls along a track while the fill races behind it — a rolling-ball loader unlike spinners, dots, reels, and traces.",
    creator: "deepseek",
    tags: ["loader", "marble", "roll", "track", "ball", "fill"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-mb-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-marble{display:flex;flex-direction:column;align-items:center;gap:9px;width:190px}\n  .kds-mb-track{position:relative;width:190px;height:15px;background:#10141d;border:1px solid rgba(255,255,255,.12);border-radius:999px;box-shadow:inset 0 2px 4px rgba(0,0,0,.6)}\n  .kds-mb-fill{position:absolute;left:1px;top:1px;bottom:1px;width:calc(100% - 2px);border-radius:999px;background:linear-gradient(90deg,color-mix(in srgb,var(--kds-mb-accent,#3b82f6) 55%,transparent),var(--kds-mb-accent,#3b82f6));transform-origin:left center;transform:scaleX(0);animation:kds-mb-fill 1.9s cubic-bezier(.3,.7,.3,1) infinite}\n  .kds-mb-ball{position:absolute;top:50%;left:1px;width:13px;height:13px;border-radius:50%;margin-top:-6.5px;background:radial-gradient(circle at 32% 28%,#f6f9fd,#b9c4d6 55%,#56617c);box-shadow:0 2px 6px rgba(0,0,0,.55);z-index:2;animation:kds-mb-ball 1.9s cubic-bezier(.3,.7,.3,1) infinite;will-change:transform}\n  .kds-mb-cap{font:800 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.24em;color:#56617c}\n  @keyframes kds-mb-fill{0%{transform:scaleX(0)}70%{transform:scaleX(1)}100%{transform:scaleX(1)}}\n  @keyframes kds-mb-ball{0%{transform:translateX(0) rotate(0)}70%{transform:translateX(176px) rotate(775deg)}100%{transform:translateX(176px) rotate(775deg)}}\n  @media (prefers-reduced-motion:reduce){.kds-mb-fill,.kds-mb-ball{animation:none}}\n</style>\n<div class=\"kds-marble\" role=\"img\" aria-label=\"A marble rolling along a loading track\">\n  <div class=\"kds-mb-track\"><span class=\"kds-mb-fill\"></span><i class=\"kds-mb-ball\"></i></div>\n  <span class=\"kds-mb-cap\">ROLLING…</span>\n</div>"
  },

  /* ---------- BADGES ---------- */
  /* ---------- BUTTONS ---------- */
  {
    id: "BU30",
    section: "buttons",
    name: "Hold to Confirm",
    description: "Press and hold while a progress bar charges and the ring spins; release early cancels, full hold commits — a sustained-press interaction model unlike click, drag, and press-latch buttons.",
    creator: "deepseek",
    tags: ["button", "hold", "confirm", "press", "progress", "charge"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-hold-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-hold{display:flex;flex-direction:column;align-items:center;gap:10px}\n  .kds-hold-btn{position:relative;width:168px;height:48px;background:#161c2a;border:1px solid rgba(255,255,255,.16);border-radius:10px;cursor:pointer;overflow:hidden;box-shadow:0 6px 14px rgba(0,0,0,.4)}\n  .kds-hold-prog{position:absolute;left:0;top:0;bottom:0;width:100%;background:var(--kds-hold-accent,#3b82f6);transform-origin:left center;transform:scaleX(0);opacity:.16}\n  .kds-hold-btn.charging .kds-hold-prog{transform:scaleX(1);transition:transform 1.15s linear}\n  .kds-hold-ring{position:absolute;right:11px;top:50%;width:16px;height:16px;margin-top:-8px;border-radius:50%;border:2px solid rgba(255,255,255,.15);border-top-color:var(--kds-hold-accent,#3b82f6);opacity:0}\n  .kds-hold-btn.charging .kds-hold-ring{opacity:1;animation:kds-hold-spin .7s linear infinite}\n  .kds-hold-lbl{position:relative;z-index:2;font:800 10.5px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.14em;color:#dde5f2;transition:color .12s ease}\n  .kds-hold-btn.done{background:var(--kds-hold-accent,#3b82f6);border-color:transparent}\n  .kds-hold-btn.done .kds-hold-lbl{color:#04101f}\n  .kds-hold-btn.done .kds-hold-prog{transform:scaleX(1);opacity:1;transition:none}\n  .kds-hold-hint{font:600 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:#56617c}\n  @keyframes kds-hold-spin{to{transform:rotate(360deg)}}\n  @media (prefers-reduced-motion:reduce){.kds-hold-btn.charging .kds-hold-prog{transition-duration:.3s}.kds-hold-btn.charging .kds-hold-ring{animation:none}}\n</style>\n<div class=\"kds-hold\" role=\"group\" aria-label=\"Hold to confirm button\">\n  <button type=\"button\" class=\"kds-hold-btn\" id=\"kds-hold-btn\" aria-live=\"polite\">\n    <span class=\"kds-hold-prog\"></span>\n    <span class=\"kds-hold-ring\"></span>\n    <span class=\"kds-hold-lbl\" id=\"kds-hold-lbl\">HOLD TO CONFIRM</span>\n  </button>\n  <span class=\"kds-hold-hint\">PRESS &amp; HOLD · RELEASE TO CANCEL</span>\n</div>\n<script>\n(function(){\n  var btn=document.getElementById('kds-hold-btn'),lbl=document.getElementById('kds-hold-lbl'),prog=btn.querySelector('.kds-hold-prog');\n  var done=false;\n  function commit(){if(done)return;done=true;btn.classList.add('done');lbl.textContent='CONFIRMED ✓';}\n  btn.addEventListener('pointerdown',function(e){if(done)return;btn.classList.add('charging');lbl.textContent='KEEP HOLDING…';if(e.preventDefault)e.preventDefault();});\n  btn.addEventListener('pointerup',function(){if(done)return;btn.classList.remove('charging');lbl.textContent='HOLD TO CONFIRM';});\n  btn.addEventListener('pointerleave',function(){if(done)return;btn.classList.remove('charging');lbl.textContent='HOLD TO CONFIRM';});\n  prog.addEventListener('transitionend',function(e){if(e.target!==prog)return;commit();});\n})();\n</script>"
  },

  /* ---------- FORMS ---------- */
  {
    id: "FO16",
    section: "forms",
    name: "Live Validate",
    description: "An email field that grades itself as you type — neutral, invalid, or valid with inline verdicts — a validation-state control distinct from entropy meters, steppers, and pickers.",
    creator: "deepseek",
    tags: ["form", "validate", "email", "input", "inline", "feedback"],
    tweaks: [
      { type: "color", label: "Valid Green", varName: "--kds-valid-ok", default: "#34d399" }
    ],
    code: "<style>\n  .kds-valid{display:flex;flex-direction:column;gap:7px;width:206px}\n  .kds-valid-field{position:relative;display:flex;align-items:center}\n  .kds-valid-lbl{position:absolute;top:-8px;left:10px;padding:0 4px;background:#10141c;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;color:#56617c}\n  .kds-valid-in{width:100%;padding:12px 34px 12px 12px;background:#131926;border:1px solid rgba(255,255,255,.16);border-radius:9px;font:600 11px/1 ui-sans-serif,system-ui,sans-serif;color:#eef2fa;outline:none;transition:border-color .14s ease,box-shadow .14s ease}\n  .kds-valid-in:focus{border-color:rgba(255,255,255,.4);box-shadow:0 0 0 3px rgba(255,255,255,.06)}\n  .kds-valid.ok .kds-valid-in{border-color:var(--kds-valid-ok,#34d399);box-shadow:0 0 0 3px color-mix(in srgb,var(--kds-valid-ok,#34d399) 16%,transparent)}\n  .kds-valid.err .kds-valid-in{border-color:#f87171;box-shadow:0 0 0 3px rgba(248,113,113,.14)}\n  .kds-valid-ic{position:absolute;right:11px;font:800 12px/1 ui-monospace,Consolas,monospace;color:#56617c}\n  .kds-valid.ok .kds-valid-ic{color:var(--kds-valid-ok,#34d399)}\n  .kds-valid.err .kds-valid-ic{color:#f87171}\n  .kds-valid-msg{min-height:12px;margin:0;font:600 9.5px/1.3 ui-sans-serif,system-ui,sans-serif;color:#7d8aa6}\n  .kds-valid.ok .kds-valid-msg{color:var(--kds-valid-ok,#34d399)}\n  .kds-valid.err .kds-valid-msg{color:#f87171}\n  @media (prefers-reduced-motion:reduce){.kds-valid-in{transition:none}}\n</style>\n<div class=\"kds-valid\" id=\"kds-valid\">\n  <label class=\"kds-valid-field\">\n    <span class=\"kds-valid-lbl\">WORK EMAIL</span>\n    <input type=\"email\" class=\"kds-valid-in\" id=\"kds-valid-in\" placeholder=\"you@studio.dev\" autocomplete=\"off\" spellcheck=\"false\">\n    <span class=\"kds-valid-ic\" id=\"kds-valid-ic\">·</span>\n  </label>\n  <p class=\"kds-valid-msg\" id=\"kds-valid-msg\">Type an email address…</p>\n</div>\n<script>\n(function(){\n  var root=document.getElementById('kds-valid'),inp=document.getElementById('kds-valid-in'),ic=document.getElementById('kds-valid-ic'),msg=document.getElementById('kds-valid-msg');\n  inp.addEventListener('input',function(){\n    var v=inp.value.trim();\n    root.classList.remove('ok','err');\n    if(v===''){ic.textContent='·';msg.textContent='Type an email address…';return;}\n    if(/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(v)){root.classList.add('ok');ic.textContent='✓';msg.textContent='Looks good — we will not spam.';}\n    else{root.classList.add('err');ic.textContent='✕';msg.textContent='Need a valid address like you@site.dev.';}\n  });\n})();\n</script>"
  },

  /* ---------- TOGGLES ---------- */
  {
    id: "TO15",
    section: "toggles",
    name: "Padlock Toggle",
    description: "A padlock whose shackle pops open and the keyhole shifts when unlocked — a hardware-security silhouette unlike blinds, latches, and rockers.",
    creator: "deepseek",
    tags: ["toggle", "lock", "padlock", "security", "shackle"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-lock-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-lock{display:flex;flex-direction:column;align-items:center;gap:9px;cursor:pointer;user-select:none}\n  .kds-lock-in{position:absolute;opacity:0;pointer-events:none}\n  .kds-lock-body{position:relative;width:56px;height:46px}\n  .kds-lock-shackle{position:absolute;left:11px;top:0;width:34px;height:26px;border:5px solid #c9d2e2;border-bottom:none;border-radius:17px 17px 0 0;box-shadow:0 3px 8px rgba(0,0,0,.4);transition:transform .28s cubic-bezier(.4,0,.2,1),opacity .2s ease}\n  .kds-lock-face{position:absolute;left:4px;top:10px;width:48px;height:36px;background:linear-gradient(180deg,#232b3f,#141a28);border:1px solid rgba(255,255,255,.18);border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 16px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.08)}\n  .kds-lock-hole{position:relative;width:9px;height:9px;border-radius:50%;background:#0b0e16;border:2px solid #4d5a78}\n  .kds-lock-hole::after{content:\"\";position:absolute;left:2.5px;top:7px;width:3px;height:9px;background:#4d5a78;border-radius:2px}\n  .kds-lock-in:checked ~ .kds-lock-body .kds-lock-shackle{transform:translate(8px,-9px) rotate(14deg);opacity:.85}\n  .kds-lock-in:checked ~ .kds-lock-body .kds-lock-hole{background:var(--kds-lock-accent,#3b82f6);border-color:transparent;box-shadow:0 0 8px var(--kds-lock-accent,#3b82f6)}\n  .kds-lock-cap{font:800 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.2em;color:#56617c;transition:color .2s ease}\n  .kds-lock-in:checked ~ .kds-lock-cap{color:var(--kds-lock-accent,#3b82f6)}\n  @media (prefers-reduced-motion:reduce){.kds-lock-shackle{transition:none}.kds-lock-cap{transition:none}}\n</style>\n<label class=\"kds-lock\">\n  <input type=\"checkbox\" class=\"kds-lock-in\">\n  <span class=\"kds-lock-body\">\n    <span class=\"kds-lock-shackle\"></span>\n    <span class=\"kds-lock-face\"><i class=\"kds-lock-hole\"></i></span>\n  </span>\n  <span class=\"kds-lock-cap\">UNLOCK</span>\n</label>"
  },

  /* ---------- CARDS ---------- */
  {
    id: "CA13",
    section: "cards",
    name: "Console Card",
    description: "A terminal card whose log lines arrive in sequence under a live prompt — a deploy-log surface unlike specs, feeds, and documents.",
    creator: "deepseek",
    tags: ["card", "console", "terminal", "log", "deploy", "bash"],
    tweaks: [
      { type: "color", label: "Prompt Accent", varName: "--kds-console-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-console{width:212px;background:#0d1117;border:1px solid rgba(255,255,255,.12);border-radius:9px;overflow:hidden;box-shadow:0 12px 26px rgba(0,0,0,.45)}\n  .kds-console-bar{display:flex;align-items:center;gap:6px;padding:8px 10px;background:#161c26;border-bottom:1px solid rgba(255,255,255,.08)}\n  .kds-console-dot{width:9px;height:9px;border-radius:50%}\n  .kds-console-dot.r{background:#f87171}.kds-console-dot.y{background:#fbbf24}.kds-console-dot.g{background:#34d399}\n  .kds-console-t{margin-left:6px;font:600 9px/1 ui-monospace,Consolas,monospace;color:#7d8aa6}\n  .kds-console-body{padding:11px 12px 8px;display:flex;flex-direction:column;gap:6px;min-height:92px}\n  .kds-console-line{margin:0;font:600 9.5px/1.4 ui-monospace,Consolas,monospace;color:#9aa6b8;opacity:0;transform:translateY(4px);animation:kds-console-in .3s ease forwards;animation-delay:var(--d)}\n  .kds-console-line.ok{color:#34d399}\n  .kds-console-line.run{color:var(--kds-console-accent,#3b82f6)}\n  .kds-console-prompt{padding:8px 12px 10px;border-top:1px solid rgba(255,255,255,.07);font:700 10px/1 ui-monospace,Consolas,monospace;color:#e2e8f0}\n  .kds-console-prompt b{color:var(--kds-console-accent,#3b82f6);font-weight:700}\n  .kds-console-cursor{display:inline-block;width:7px;height:12px;background:var(--kds-console-accent,#3b82f6);vertical-align:-2px;margin-left:3px;animation:kds-console-blink 1s steps(2) infinite}\n  @keyframes kds-console-in{to{opacity:1;transform:translateY(0)}}\n  @keyframes kds-console-blink{50%{opacity:0}}\n  @media (prefers-reduced-motion:reduce){.kds-console-line{animation:none;opacity:1;transform:none}.kds-console-cursor{animation:none}}\n</style>\n<div class=\"kds-console\" role=\"img\" aria-label=\"Deploy console with arriving log lines\">\n  <div class=\"kds-console-bar\"><i class=\"kds-console-dot r\"></i><i class=\"kds-console-dot y\"></i><i class=\"kds-console-dot g\"></i><span class=\"kds-console-t\">deploy — bash</span></div>\n  <div class=\"kds-console-body\">\n    <p class=\"kds-console-line ok\" style=\"--d:.2s\">✓ build passed (2.4s)</p>\n    <p class=\"kds-console-line run\" style=\"--d:.9s\">▸ deploying to staging…</p>\n    <p class=\"kds-console-line run\" style=\"--d:1.6s\">▸ uploading bundle (64%)</p>\n    <p class=\"kds-console-line run\" style=\"--d:2.3s\">▸ health check…</p>\n    <p class=\"kds-console-line ok\" style=\"--d:3s\">✓ live at staging.app</p>\n  </div>\n  <div class=\"kds-console-prompt\">$ <b>git push</b><i class=\"kds-console-cursor\"></i></div>\n</div>"
  },

  /* ---------- NAVIGATION ---------- */
  {
    id: "NA13",
    section: "navigation",
    name: "Bottom App Bar",
    description: "A mobile-style bottom bar with a raised center action and a sliding active indicator — the only bottom-anchored app navigation in the drawer.",
    creator: "deepseek",
    tags: ["navigation", "appbar", "bottom", "mobile", "tab", "fab"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-ab-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-appbar{display:flex;align-items:center;justify-content:space-around;width:232px;padding:8px 8px 10px;background:linear-gradient(180deg,#171d2c,#10141d);border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 14px 30px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06)}\n  .kds-ab-btn{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 8px;background:none;border:none;border-radius:9px;cursor:pointer;font-size:15px;color:#5d6a86;position:relative;transition:color .14s ease,transform .14s ease}\n  .kds-ab-btn span{font:700 7.5px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.1em}\n  .kds-ab-btn.active{color:#eef2fa}\n  .kds-ab-btn.active::before{content:\"\";position:absolute;top:-6px;left:50%;transform:translateX(-50%);width:16px;height:3px;border-radius:2px;background:var(--kds-ab-accent,#3b82f6);box-shadow:0 0 8px var(--kds-ab-accent,#3b82f6)}\n  .kds-ab-btn.active span{color:var(--kds-ab-accent,#3b82f6)}\n  .kds-ab-fab{width:42px;height:42px;border-radius:14px;border:none;background:linear-gradient(135deg,var(--kds-ab-accent,#3b82f6),#1d4ed8);color:#eef4ff;font-size:19px;font-weight:800;cursor:pointer;box-shadow:0 8px 16px color-mix(in srgb,var(--kds-ab-accent,#3b82f6) 45%,transparent);transform:translateY(-14px);transition:transform .14s ease}\n  .kds-ab-fab:hover{transform:translateY(-17px)}\n  @media (prefers-reduced-motion:reduce){.kds-ab-btn{transition:none}.kds-ab-fab{transition:none}}\n</style>\n<div class=\"kds-appbar\" role=\"toolbar\" aria-label=\"App navigation\">\n  <button type=\"button\" class=\"kds-ab-btn active\" onclick=\"var s=this.parentElement.querySelectorAll('.kds-ab-btn');s.forEach(b=>b.classList.remove('active'));this.classList.add('active')\"><span>🏠</span><span>Home</span></button>\n  <button type=\"button\" class=\"kds-ab-btn\" onclick=\"var s=this.parentElement.querySelectorAll('.kds-ab-btn');s.forEach(b=>b.classList.remove('active'));this.classList.add('active')\"><span>🔍</span><span>Search</span></button>\n  <button type=\"button\" class=\"kds-ab-fab\" aria-label=\"New\">+</button>\n  <button type=\"button\" class=\"kds-ab-btn\" onclick=\"var s=this.parentElement.querySelectorAll('.kds-ab-btn');s.forEach(b=>b.classList.remove('active'));this.classList.add('active')\"><span>⚙</span><span>Settings</span></button>\n  <button type=\"button\" class=\"kds-ab-btn\" onclick=\"var s=this.parentElement.querySelectorAll('.kds-ab-btn');s.forEach(b=>b.classList.remove('active'));this.classList.add('active')\"><span>👤</span><span>Profile</span></button>\n</div>"
  },

  /* ---------- ALERTS ---------- */
  {
    id: "AL13",
    section: "alerts",
    name: "Sync Toast",
    description: "A status toast whose badge spins while syncing, a bar charges, and a check resolves the state — a live-activity toast unlike countdowns, undos, and tickers.",
    creator: "deepseek",
    tags: ["alert", "toast", "sync", "status", "live", "activity"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-sync-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-sync{position:relative;display:flex;align-items:center;gap:10px;width:218px;padding:11px 13px;background:#161c2a;border:1px solid rgba(255,255,255,.14);border-radius:12px;box-shadow:0 14px 30px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.06);overflow:hidden}\n  .kds-sync-badge{flex:0 0 auto;width:26px;height:26px;border-radius:50%;background:color-mix(in srgb,var(--kds-sync-accent,#3b82f6) 16%,transparent);border:1px solid color-mix(in srgb,var(--kds-sync-accent,#3b82f6) 45%,transparent);display:flex;align-items:center;justify-content:center;color:var(--kds-sync-accent,#3b82f6);font-size:13px;animation:kds-sync-spin 1.1s linear infinite;animation-play-state:paused}\n  .kds-sync-txt{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}\n  .kds-sync-txt b{font:700 10.5px/1.2 ui-sans-serif,system-ui,sans-serif;color:#eef2fa}\n  .kds-sync-txt span{font:600 8.5px/1 ui-monospace,Consolas,monospace;color:#7d8aa6}\n  .kds-sync-bar{position:absolute;left:0;bottom:0;height:3px;width:100%;background:var(--kds-sync-accent,#3b82f6);transform-origin:left center;transform:scaleX(0);animation:kds-sync-fill 4.2s linear infinite}\n  .kds-sync-done{position:absolute;right:13px;font:800 14px/1 ui-sans-serif,system-ui,sans-serif;color:#34d399;opacity:0;transform:scale(.6);animation:kds-sync-pop 4.2s linear infinite}\n  @keyframes kds-sync-spin{to{transform:rotate(360deg)}}\n  @keyframes kds-sync-fill{0%{transform:scaleX(0)}68%{transform:scaleX(1)}100%{transform:scaleX(1)}}\n  @keyframes kds-sync-pop{0%,68%{opacity:0;transform:scale(.6)}76%{opacity:1;transform:scale(1)}88%,100%{opacity:0;transform:scale(.8)}}\n  @media (prefers-reduced-motion:reduce){.kds-sync-badge{animation:none}.kds-sync-bar,.kds-sync-done{animation:none;opacity:1;transform:none}}\n</style>\n<div class=\"kds-sync\" role=\"status\" aria-live=\"polite\">\n  <span class=\"kds-sync-badge\">⟳</span>\n  <div class=\"kds-sync-txt\"><b>Syncing workspace</b><span>12 files remaining…</span></div>\n  <span class=\"kds-sync-done\">✓</span>\n  <i class=\"kds-sync-bar\"></i>\n</div>"
  },

  /* ---------- ICONS ---------- */
  {
    id: "IC18",
    section: "icons",
    name: "Weather Icons",
    description: "A consistent duotone weather set — sun, cloud, rain, storm, snow — vector glyphs in one voice, unlike hairline, blueprint, pixel, and hazard sets.",
    creator: "deepseek",
    tags: ["icon", "weather", "sun", "cloud", "rain", "forecast"],
    tweaks: [
      { type: "color", label: "Sun Gold", varName: "--kds-wx-accent", default: "#fbbf24" }
    ],
    code: "<style>\n  .kds-wx{display:flex;align-items:center;gap:12px}\n  .kds-wx svg{width:30px;height:30px;overflow:visible}\n  .kds-wx .kds-wx-sun{color:var(--kds-wx-accent,#fbbf24)}\n  .kds-wx .kds-wx-cloud{color:#c9d2e2}\n  .kds-wx .kds-wx-drop{color:#38bdf8}\n  .kds-wx .kds-wx-bolt{color:var(--kds-wx-accent,#fbbf24)}\n  .kds-wx .kds-wx-flake{color:#a5c8ff}\n</style>\n<div class=\"kds-wx\" role=\"img\" aria-label=\"Weather icon set: sun, cloud, rain, storm, snow\">\n  <svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" class=\"kds-wx-sun\"><circle cx=\"16\" cy=\"16\" r=\"5.5\" fill=\"currentColor\" stroke=\"none\"/><path d=\"M16 3v3M16 26v3M3 16h3M26 16h3M6.5 6.5l2 2M23.5 23.5l2 2M25.5 6.5l-2 2M8.5 23.5l-2 2\"/></svg>\n  <svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"kds-wx-cloud\"><path d=\"M9 24a5 5 0 0 1-1-9.9A7 7 0 0 1 22 11a5.5 5.5 0 0 1-1.5 10.8H9z\" fill=\"rgba(201,210,226,.18)\"/></svg>\n  <svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"kds-wx-cloud\" d=\"M9 17a4 4 0 0 1-.8-7.9A5.5 5.5 0 0 1 19 8.6 4.4 4.4 0 0 1 18 17H9z\" fill=\"rgba(201,210,226,.18)\"/><path class=\"kds-wx-drop\" d=\"M10 21l-1.6 3.2M16 21l-1.6 3.2M22 21l-1.6 3.2\"/></svg>\n  <svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"kds-wx-cloud\" d=\"M9 19a4 4 0 0 1-.8-7.9A5.5 5.5 0 0 1 19 10.6 4.4 4.4 0 0 1 18 19H9z\" fill=\"rgba(201,210,226,.18)\"/><path class=\"kds-wx-bolt\" d=\"M16 21l-3 5h4l-1.5 4 5-7h-4l2-4z\" fill=\"currentColor\" stroke=\"none\"/></svg>\n  <svg viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path class=\"kds-wx-cloud\" d=\"M9 19a4 4 0 0 1-.8-7.9A5.5 5.5 0 0 1 19 10.6 4.4 4.4 0 0 1 18 19H9z\" fill=\"rgba(201,210,226,.18)\"/><path class=\"kds-wx-flake\" d=\"M11 23l-.9 1.8M15 23l-.9 1.8M13 21.6v2.8M13 24.2l-1 1M13 24.2l1 1M10.8 24.6l-.6.8M15.2 24.6l.6.8M20 23l-.9 1.8M22 21.6v2.8M21.1 24.2l-1 1M21.1 24.2l1 1\"/></svg>\n</div>"
  },

  /* ---------- PLAYERS ---------- */
  {
    id: "PL14",
    section: "players",
    name: "Radio Tuner",
    description: "An FM band with tick marks and station dots whose needle sweeps and settles — an analog tuner dial unlike projectors, tapes, discs, and VU meters.",
    creator: "deepseek",
    tags: ["player", "radio", "tuner", "fm", "dial", "needle"],
    tweaks: [
      { type: "color", label: "Needle Accent", varName: "--kds-tuner-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-tuner{display:flex;flex-direction:column;align-items:center;gap:9px;width:212px}\n  .kds-tuner-band{position:relative;width:212px;height:52px;background:linear-gradient(180deg,#10141d,#171d2c);border:1px solid rgba(255,255,255,.14);border-radius:8px;box-shadow:inset 0 2px 8px rgba(0,0,0,.6);overflow:hidden}\n  .kds-tuner-scale{position:absolute;left:8px;right:8px;top:14px;height:16px;background:repeating-linear-gradient(90deg,#3b455e 0 1px,transparent 1px 12px);opacity:.7}\n  .kds-tuner-freq{position:absolute;bottom:5px;font:600 7px/1 ui-monospace,Consolas,monospace;color:#56617c}\n  .kds-tuner-freq.f1{left:6px}.kds-tuner-freq.f2{left:62px}.kds-tuner-freq.f3{left:118px}.kds-tuner-freq.f4{right:30px}.kds-tuner-freq.f5{right:6px}\n  .kds-tuner-st{position:absolute;top:9px;width:5px;height:5px;border-radius:50%;background:var(--kds-tuner-accent,#3b82f6);box-shadow:0 0 6px var(--kds-tuner-accent,#3b82f6);opacity:.9}\n  .kds-tuner-st.s1{left:24%}.kds-tuner-st.s2{left:48%}.kds-tuner-st.s3{left:71%}.kds-tuner-st.s4{left:88%}\n  .kds-tuner-needle{position:absolute;left:8px;top:6px;bottom:6px;width:1.5px;background:var(--kds-tuner-accent,#3b82f6);box-shadow:0 0 6px var(--kds-tuner-accent,#3b82f6);animation:kds-tuner-sweep 7s ease-in-out infinite;will-change:transform}\n  .kds-tuner-needle::after{content:\"\";position:absolute;left:50%;bottom:-4px;transform:translateX(-50%);border:4px solid transparent;border-top:5px solid var(--kds-tuner-accent,#3b82f6)}\n  .kds-tuner-cap{font:800 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.22em;color:#56617c}\n  @keyframes kds-tuner-sweep{0%,100%{transform:translateX(0)}18%{transform:translateX(24px)}34%{transform:translateX(48px)}55%{transform:translateX(100px)}72%{transform:translateX(140px)}88%{transform:translateX(164px)}}\n  @media (prefers-reduced-motion:reduce){.kds-tuner-needle{animation:none}}\n</style>\n<div class=\"kds-tuner\" role=\"img\" aria-label=\"FM radio tuner with sweeping needle\">\n  <div class=\"kds-tuner-band\">\n    <span class=\"kds-tuner-scale\"></span>\n    <span class=\"kds-tuner-freq f1\">88</span><span class=\"kds-tuner-freq f2\">93</span><span class=\"kds-tuner-freq f3\">98</span><span class=\"kds-tuner-freq f4\">104</span><span class=\"kds-tuner-freq f5\">108</span>\n    <i class=\"kds-tuner-st s1\"></i><i class=\"kds-tuner-st s2\"></i><i class=\"kds-tuner-st s3\"></i><i class=\"kds-tuner-st s4\"></i>\n    <span class=\"kds-tuner-needle\"></span>\n  </div>\n  <span class=\"kds-tuner-cap\">FM 88–108</span>\n</div>"
  },

  /* ---------- EFFECTS ---------- */
  {
    id: "EF13",
    section: "effects",
    name: "Bokeh Drift",
    description: "Soft out-of-focus light discs drift and breathe on a dark field — a photographic depth-of-field backdrop unlike bloom, grain, foil, and marquee surfaces.",
    creator: "deepseek",
    tags: ["effect", "bokeh", "blur", "lights", "ambient", "depth"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-bokeh-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-bokeh{position:relative;width:230px;height:128px;border-radius:12px;overflow:hidden;background:radial-gradient(120% 90% at 30% 20%,#16203a,#0a0d16 70%);box-shadow:0 12px 26px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center}\n  .kds-bk-d{position:absolute;border-radius:50%;filter:blur(7px);opacity:.55;will-change:transform}\n  .kds-bk-d.d1{width:34px;height:34px;left:14%;top:22%;background:radial-gradient(circle at 35% 30%,#fff,var(--kds-bokeh-accent,#3b82f6) 70%,transparent);animation:kds-bk-a 9s ease-in-out infinite}\n  .kds-bk-d.d2{width:22px;height:22px;left:62%;top:14%;background:radial-gradient(circle at 35% 30%,#fff,color-mix(in srgb,var(--kds-bokeh-accent,#3b82f6) 65%,#fbbf24) 75%,transparent);animation:kds-bk-b 7.5s ease-in-out infinite}\n  .kds-bk-d.d3{width:44px;height:44px;left:70%;top:52%;background:radial-gradient(circle at 35% 30%,#ffe9c4,#fbbf24 70%,transparent);animation:kds-bk-c 11s ease-in-out infinite}\n  .kds-bk-d.d4{width:18px;height:18px;left:30%;top:66%;background:radial-gradient(circle at 35% 30%,#fff,#a78bfa 75%,transparent);animation:kds-bk-b 8.5s ease-in-out infinite reverse}\n  .kds-bk-d.d5{width:26px;height:26px;left:46%;top:34%;background:radial-gradient(circle at 35% 30%,#fff,color-mix(in srgb,var(--kds-bokeh-accent,#3b82f6) 80%,white) 72%,transparent);animation:kds-bk-a 10s ease-in-out infinite reverse}\n  .kds-bk-d.d6{width:14px;height:14px;left:12%;top:8%;background:radial-gradient(circle at 35% 30%,#fff,#34d399 75%,transparent);animation:kds-bk-c 6.5s ease-in-out infinite}\n  .kds-bk-cap{position:relative;z-index:2;font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.3em;color:rgba(226,232,240,.85);text-shadow:0 1px 6px rgba(0,0,0,.7)}\n  @keyframes kds-bk-a{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(14px,-16px) scale(1.25)}}\n  @keyframes kds-bk-b{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-12px,12px) scale(.8)}}\n  @keyframes kds-bk-c{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-16px,-10px) scale(1.35)}}\n  @media (prefers-reduced-motion:reduce){.kds-bk-d{animation:none}}\n</style>\n<div class=\"kds-bokeh\" role=\"img\" aria-label=\"Soft drifting bokeh light discs\">\n  <i class=\"kds-bk-d d1\"></i><i class=\"kds-bk-d d2\"></i><i class=\"kds-bk-d d3\"></i><i class=\"kds-bk-d d4\"></i><i class=\"kds-bk-d d5\"></i><i class=\"kds-bk-d d6\"></i>\n  <span class=\"kds-bk-cap\">BOKEH</span>\n</div>"
  },

  /* ---------- DRAG & DROP ---------- */
  {
    id: "DD5",
    section: "dragdrop",
    name: "Swipe to Dismiss",
    description: "Drag a notification row left to reveal a delete lane; release past the threshold and it flies out — a swipe-gesture dismissal beside reorder, transfer, snap, and resize.",
    creator: "deepseek",
    tags: ["dragdrop", "swipe", "dismiss", "delete", "notification", "gesture"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-swipe-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-swipe{display:flex;flex-direction:column;align-items:center;gap:9px}\n  .kds-swipe-lane{position:relative;width:216px;height:46px;border-radius:10px;overflow:hidden;background:linear-gradient(90deg,#7f1d2d,#e11d48);box-shadow:0 8px 18px rgba(0,0,0,.4)}\n  .kds-swipe-bg{position:absolute;right:14px;top:50%;transform:translateY(-50%);font-size:16px;color:rgba(255,255,255,.85)}\n  .kds-swipe-row{position:absolute;inset:0;display:flex;align-items:center;gap:9px;padding:0 12px;background:#161c2a;border:1px solid rgba(255,255,255,.14);border-radius:10px;cursor:grab;user-select:none;transition:transform .28s cubic-bezier(.3,.7,.3,1.2),background .2s ease;will-change:transform;touch-action:none}\n  .kds-swipe-row.gone{transform:translateX(-130%)!important;transition:transform .34s cubic-bezier(.4,0,.2,1)}\n  .kds-swipe-ic{font-size:14px}\n  .kds-swipe-txt{flex:1;font:600 10.5px/1.2 ui-sans-serif,system-ui,sans-serif;color:#dde5f2}\n  .kds-swipe-time{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#56617c}\n  .kds-swipe-cap{font:600 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:#56617c}\n  .kds-swipe.done .kds-swipe-cap{color:var(--kds-swipe-accent,#3b82f6)}\n  @media (prefers-reduced-motion:reduce){.kds-swipe-row{transition:none}}\n</style>\n<div class=\"kds-swipe\" id=\"kds-swipe\" role=\"group\" aria-label=\"Swipe to dismiss notification\">\n  <div class=\"kds-swipe-lane\">\n    <span class=\"kds-swipe-bg\">✕</span>\n    <div class=\"kds-swipe-row\" id=\"kds-swipe-row\"><span class=\"kds-swipe-ic\">🔔</span><span class=\"kds-swipe-txt\">Design review at 3pm</span><span class=\"kds-swipe-time\">NOW</span></div>\n  </div>\n  <span class=\"kds-swipe-cap\" id=\"kds-swipe-cap\">DRAG ROW LEFT TO DISMISS</span>\n</div>\n<script>\n(function(){\n  var row=document.getElementById('kds-swipe-row'),root=document.getElementById('kds-swipe'),cap=document.getElementById('kds-swipe-cap');\n  var dragging=false,startX=0,startDX=0;\n  row.addEventListener('pointerdown',function(e){dragging=true;startX=e.clientX;startDX=0;row.style.transition='none';if(e.preventDefault)e.preventDefault();});\n  document.addEventListener('pointermove',function(e){if(!dragging)return;var dx=Math.min(0,e.clientX-startX+startDX);row.style.transform='translateX('+dx+'px)';});\n  document.addEventListener('pointerup',function(){if(!dragging)return;dragging=false;row.style.transition='';if(row.style.transform&&parseFloat(row.style.transform.replace(/[^0-9.-]/g,''))<-80){row.classList.add('gone');root.classList.add('done');cap.textContent='DISMISSED ✓';}else{row.style.transform='';}});\n})();\n</script>"
  },

  /* ---------- TOOLTIPS ---------- */
  {
    id: "TT5",
    section: "tooltips",
    name: "Link Preview",
    description: "Hover a URL and a rich media card — thumbnail, title, domain, excerpt — rises above the link; a content preview distinct from definitions, loupes, checklists, and selection bars.",
    creator: "deepseek",
    tags: ["tooltip", "preview", "link", "card", "hover", "unfurl"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kds-lp-accent", default: "#3b82f6" }
    ],
    code: "<style>\n  .kds-lp{position:relative;width:214px;padding-top:56px}\n  .kds-lp-card{position:absolute;top:0;left:0;right:0;display:flex;gap:9px;padding:9px;background:#171d2c;border:1px solid rgba(255,255,255,.16);border-radius:10px;box-shadow:0 14px 28px rgba(0,0,0,.55);opacity:0;transform:translateY(6px);transition:opacity .16s ease,transform .16s ease;pointer-events:none;z-index:5}\n  .kds-lp-card::after{content:\"\";position:absolute;left:22px;bottom:-5px;width:9px;height:9px;background:#171d2c;border-right:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.16);transform:rotate(45deg)}\n  .kds-lp-thumb{flex:0 0 auto;width:44px;height:44px;border-radius:7px;background:linear-gradient(135deg,var(--kds-lp-accent,#3b82f6),#1d4ed8);display:flex;align-items:center;justify-content:center;font:900 15px/1 ui-sans-serif,system-ui,sans-serif;color:#eef4ff}\n  .kds-lp-meta{min-width:0;display:flex;flex-direction:column;justify-content:center;gap:2px}\n  .kds-lp-meta b{font:700 10.5px/1.2 ui-sans-serif,system-ui,sans-serif;color:#eef2fa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kds-lp-meta span{font:600 8px/1 ui-monospace,Consolas,monospace;color:var(--kds-lp-accent,#3b82f6)}\n  .kds-lp-meta p{margin:0;font:600 8.5px/1.35 ui-sans-serif,system-ui,sans-serif;color:#7d8aa6;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}\n  .kds-lp-prose{font:500 11.5px/1.65 ui-sans-serif,system-ui,sans-serif;color:#9aa6b8;margin:0}\n  .kds-lp-link{color:var(--kds-lp-accent,#3b82f6);font-weight:700;text-decoration:none;border-bottom:1px dotted color-mix(in srgb,var(--kds-lp-accent,#3b82f6) 60%,transparent);cursor:pointer;outline:none;position:relative}\n  .kds-lp-link:hover .kds-lp-card,.kds-lp-link:focus-visible .kds-lp-card{opacity:1;transform:translateY(0)}\n  .kds-lp-hint{margin-top:9px;font:600 8.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#46506a;display:block}\n  @media (prefers-reduced-motion:reduce){.kds-lp-card{transition:none}}\n</style>\n<div class=\"kds-lp\">\n  <a class=\"kds-lp-link\" href=\"#\" tabindex=\"0\">designlabs.dev<span class=\"kds-lp-card\"><span class=\"kds-lp-thumb\">◈</span><span class=\"kds-lp-meta\"><b>Design Lab</b><span>designlabs.dev</span><p>A living specimen library — every snippet self-contained, pasted anywhere.</p></span></span></a>\n  <p class=\"kds-lp-prose\">Built inside a living specimen library — hover the link to see it unfurl.</p>\n  <span class=\"kds-lp-hint\">HOVER THE LINK</span>\n</div>"
  }
);