'use strict';

/* DeepSeek — "Neon Deck": a matching retro sci-fi HUD theme, one specimen per drawer (26 items).
   Every snippet shares the same design tokens so the set reads as one product:
     --rt-void  #04070d   deep space void
     --rt-deep  #0a1120   panel base
     --rt-panel #0c1424   raised panel
     --rt-cyan  #2ee6ff   primary phosphor
     --rt-mag   #ff3dc8   secondary / alert
     --rt-amber #ffb44a   warning
     --rt-dim   #5d7d9c   muted mono text
   Motifs: uppercase letterspaced labels, corner brackets, scanlines, glow, chunky 1px chrome.
   All motion is CSS-only on transform/opacity, wrapped in prefers-reduced-motion. */

window.DESIGN_LAB.items.push(
  {
    id: "AN23",
    section: "animations",
    name: "Radar Sweep",
    description: "Rotating radar scope with range rings and pulsing contact blips.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["radar", "sweep", "hud", "scan", "sci-fi"],
    code: `<style>
  .kan23{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:inline-flex;flex-direction:column;align-items:center;gap:10px;padding:18px 22px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.22);border-radius:6px}
  .kan23-screen{position:relative;width:148px;height:148px;border-radius:50%;border:1px solid rgba(46,230,255,.4);background:radial-gradient(circle,rgba(46,230,255,.14) 0%,rgba(46,230,255,.03) 58%,transparent 72%);overflow:hidden}
  .kan23-screen::before,.kan23-screen::after{content:"";position:absolute;background:rgba(46,230,255,.22)}
  .kan23-screen::before{left:50%;top:0;bottom:0;width:1px;transform:translateX(-50%)}
  .kan23-screen::after{top:50%;left:0;right:0;height:1px;transform:translateY(-50%)}
  .kan23-ring{position:absolute;border:1px dashed rgba(46,230,255,.35);border-radius:50%}
  .kan23-r1{inset:16%}
  .kan23-r2{inset:30%}
  .kan23-r3{inset:42%}
  .kan23-sweep{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,rgba(46,230,255,.5) 0deg,rgba(46,230,255,.12) 46deg,transparent 92deg);animation:kan23-spin 2.8s linear infinite}
  @keyframes kan23-spin{to{transform:rotate(360deg)}}
  .kan23-blip{position:absolute;width:6px;height:6px;border-radius:50%;background:#eafcff;box-shadow:0 0 8px #2ee6ff,0 0 16px rgba(46,230,255,.7);animation:kan23-blink 2.4s ease-in-out infinite}
  .kan23-b2{left:30%;top:62%;animation-delay:.8s}
  .kan23-b3{left:22%;top:24%;animation-delay:1.6s}
  @keyframes kan23-blink{0%,100%{opacity:.15;transform:scale(.55)}50%{opacity:1;transform:scale(1.2)}}
  .kan23-core{position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 10px #2ee6ff;transform:translate(-50%,-50%)}
  .kan23-cap{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.22em;color:#7fb3cc;text-transform:uppercase}
  .kan23-led{width:7px;height:7px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kan23-led 1.1s steps(2) infinite}
  @keyframes kan23-led{50%{opacity:.25}}
  @media (prefers-reduced-motion:reduce){.kan23-sweep,.kan23-blip,.kan23-led{animation:none}}
</style>
<div class="kan23">
  <div class="kan23-screen">
    <div class="kan23-ring kan23-r1"></div>
    <div class="kan23-ring kan23-r2"></div>
    <div class="kan23-ring kan23-r3"></div>
    <div class="kan23-sweep"></div>
    <div class="kan23-blip" style="left:60%;top:28%"></div>
    <div class="kan23-blip kan23-b2"></div>
    <div class="kan23-blip kan23-b3"></div>
    <div class="kan23-core"></div>
  </div>
  <div class="kan23-cap"><span class="kan23-led"></span>Radar · Sector 07</div>
</div>`
  },

  {
    id: "LO22",
    section: "loaders",
    name: "Orbital Core",
    description: "Three satellites orbit a pulsing reactor core on dashed tracks.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["orbit", "spinner", "core", "loading", "sci-fi"],
    code: `<style>
  .klo22{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:inline-flex;flex-direction:column;align-items:center;gap:10px;padding:18px 22px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.22);border-radius:6px}
  .klo22-field{position:relative;width:120px;height:120px}
  .klo22-core{position:absolute;left:50%;top:50%;width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#bff4ff,#2ee6ff 45%,#0a5f7a);box-shadow:0 0 14px #2ee6ff,0 0 34px rgba(46,230,255,.55);transform:translate(-50%,-50%);animation:klo22-pulse 1.8s ease-in-out infinite}
  @keyframes klo22-pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1}50%{transform:translate(-50%,-50%) scale(1.18);opacity:.85}}
  .klo22-orbit{position:absolute;border:1px dashed rgba(46,230,255,.3);border-radius:50%}
  .klo22-orbit::after{content:"";position:absolute;width:8px;height:8px;border-radius:50%;top:-4px;left:50%;transform:translateX(-50%);background:#eafcff;box-shadow:0 0 8px #2ee6ff}
  .klo22-o1{inset:6px;animation:klo22-spin 2.6s linear infinite}
  .klo22-o2{inset:22px;border-color:rgba(255,61,200,.35);animation:klo22-spin 3.4s linear infinite reverse}
  .klo22-o2::after{width:6px;height:6px;background:#ffd2f2;box-shadow:0 0 8px #ff3dc8}
  .klo22-o3{inset:38px;border-color:rgba(255,180,74,.35);animation:klo22-spin 4.2s linear infinite}
  .klo22-o3::after{width:5px;height:5px;background:#ffe3bf;box-shadow:0 0 8px #ffb44a}
  @keyframes klo22-spin{to{transform:rotate(360deg)}}
  .klo22-cap{font-size:10px;letter-spacing:.22em;color:#7fb3cc;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.klo22-core,.klo22-o1,.klo22-o2,.klo22-o3{animation:none}}
</style>
<div class="klo22">
  <div class="klo22-field">
    <div class="klo22-core"></div>
    <div class="klo22-orbit klo22-o1"></div>
    <div class="klo22-orbit klo22-o2"></div>
    <div class="klo22-orbit klo22-o3"></div>
  </div>
  <span class="klo22-cap">Calibrating core</span>
</div>`
  },

  {
    id: "BA14",
    section: "badges",
    name: "Status Pills",
    description: "LED telemetry pills with corner brackets and blink rates per state.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["status", "pill", "led", "system", "sci-fi"],
    code: `<style>
  .kba14{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;flex-wrap:wrap;gap:8px;max-width:340px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px}
  .kba14-pill{position:relative;display:inline-flex;align-items:center;gap:7px;padding:5px 12px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;background:#070d18;border:1px solid rgba(46,230,255,.35);color:#9fe9ff;border-radius:2px}
  .kba14-pill::before,.kba14-pill::after{content:"";position:absolute;width:5px;height:5px}
  .kba14-pill::before{top:-1px;left:-1px;border-top:1px solid #2ee6ff;border-left:1px solid #2ee6ff}
  .kba14-pill::after{bottom:-1px;right:-1px;border-bottom:1px solid #2ee6ff;border-right:1px solid #2ee6ff}
  .kba14-dot{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff}
  .kba14-blink{animation:kba14-b 1.2s steps(2) infinite}
  .kba14-fast{animation:kba14-b .5s steps(2) infinite}
  @keyframes kba14-b{50%{opacity:.15}}
  .kba14-amb{border-color:rgba(255,180,74,.45);color:#ffe0b3}
  .kba14-amb::before,.kba14-amb::after{border-color:#ffb44a}
  .kba14-amb .kba14-dot{background:#ffb44a;box-shadow:0 0 8px #ffb44a}
  .kba14-mag{border-color:rgba(255,61,200,.45);color:#ffb9e8}
  .kba14-mag::before,.kba14-mag::after{border-color:#ff3dc8}
  .kba14-mag .kba14-dot{background:#ff3dc8;box-shadow:0 0 8px #ff3dc8}
  .kba14-dim{border-color:rgba(127,179,204,.28);color:#6e8ba0}
  .kba14-dim::before,.kba14-dim::after{border-color:#5d7d9c}
  .kba14-dim .kba14-dot{background:#5d7d9c;box-shadow:none}
  @media (prefers-reduced-motion:reduce){.kba14-blink,.kba14-fast{animation:none}}
</style>
<div class="kba14">
  <span class="kba14-pill"><span class="kba14-dot"></span>Nominal</span>
  <span class="kba14-pill"><span class="kba14-dot kba14-blink"></span>Scanning</span>
  <span class="kba14-pill kba14-amb"><span class="kba14-dot kba14-blink"></span>Warning</span>
  <span class="kba14-pill kba14-mag"><span class="kba14-dot kba14-fast"></span>Critical</span>
  <span class="kba14-pill kba14-dim"><span class="kba14-dot"></span>Offline</span>
</div>`
  },

  {
    id: "BU33",
    section: "buttons",
    name: "Laser Slab",
    description: "Armored button with glowing light slits and a traveling energy sweep on hover.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["button", "laser", "glow", "sci-fi", "cta"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--bu33-accent", default: "#2ee6ff" }
    ],
    code: `<style>
  .kbu33{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:inline-block;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px}
  .kbu33-btn{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:9px;min-width:170px;padding:13px 24px 12px;background:linear-gradient(180deg,#101a30,#080d1a);border:1px solid rgba(46,230,255,.4);border-bottom-width:3px;border-bottom-color:rgba(46,230,255,.15);color:var(--bu33-accent,#2ee6ff);cursor:pointer;transition:transform .12s ease,color .15s ease,border-color .15s ease}
  .kbu33-slits{width:76px;height:22px;background-image:linear-gradient(180deg,transparent 0 6px,var(--bu33-accent,#2ee6ff) 6px 8px,transparent 8px 15px,var(--bu33-accent,#2ee6ff) 15px 17px,transparent 17px);opacity:.85;filter:drop-shadow(0 0 4px var(--bu33-accent,#2ee6ff));transition:opacity .15s ease}
  .kbu33-txt{font-size:11px;font-weight:600;letter-spacing:.26em;text-transform:uppercase}
  .kbu33-btn::before{content:"";position:absolute;top:0;bottom:0;left:-40%;width:34%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-18deg);opacity:0;transition:transform .55s ease,opacity .3s ease}
  .kbu33-btn:hover::before{transform:translateX(430%) skewX(-18deg);opacity:1}
  .kbu33-btn:hover .kbu33-slits{opacity:1}
  .kbu33-btn:active{transform:translateY(2px) scale(.98);border-bottom-width:1px}
  @media (prefers-reduced-motion:reduce){.kbu33-btn{transition:none}.kbu33-btn::before{transition:none;opacity:0}}
</style>
<div class="kbu33">
  <button type="button" class="kbu33-btn">
    <span class="kbu33-slits" aria-hidden="true"></span>
    <span class="kbu33-txt">Execute</span>
  </button>
</div>`
  },

  {
    id: "FO20",
    section: "forms",
    name: "Terminal Command",
    description: "Command-line field with prompt arrow, block caret, and an expanding focus beam.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["input", "terminal", "command", "mono", "sci-fi"],
    code: `<style>
  .kfo20{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;width:280px;padding:16px 18px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px}
  .kfo20-lbl{display:flex;align-items:center;gap:6px;margin-bottom:8px;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .kfo20-lbl::before{content:"";width:7px;height:7px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kfo20-led 1.2s steps(2) infinite}
  @keyframes kfo20-led{50%{opacity:.2}}
  .kfo20-field{position:relative;display:flex;align-items:center;gap:8px;padding:10px 12px;background:#05090f;border:1px solid rgba(46,230,255,.3);border-radius:3px;transition:border-color .15s ease,box-shadow .15s ease}
  .kfo20-field:focus-within{border-color:#2ee6ff;box-shadow:0 0 0 1px rgba(46,230,255,.25),0 0 18px rgba(46,230,255,.18)}
  .kfo20-field::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:#2ee6ff;box-shadow:0 0 10px #2ee6ff;transform:scaleX(0);transform-origin:left;transition:transform .2s ease}
  .kfo20-field:focus-within::after{transform:scaleX(1)}
  .kfo20-prompt{color:#2ee6ff;font-weight:600;text-shadow:0 0 8px rgba(46,230,255,.8)}
  .kfo20-input{flex:1;min-width:0;background:transparent;border:none;outline:none;color:#d8f4ff;font:inherit;font-size:12px;caret-color:#2ee6ff}
  .kfo20-input::placeholder{color:#41617c}
  .kfo20-caret{display:none;width:7px;height:13px;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kfo20-c 1s steps(2) infinite}
  .kfo20-input:placeholder-shown ~ .kfo20-caret{display:block}
  @keyframes kfo20-c{50%{opacity:0}}
  .kfo20-meta{display:flex;justify-content:space-between;margin-top:8px;font-size:9px;letter-spacing:.14em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.kfo20-lbl::before,.kfo20-caret{animation:none}.kfo20-field::after{transition:none}}
</style>
<div class="kfo20">
  <div class="kfo20-lbl">Enter command</div>
  <div class="kfo20-field">
    <span class="kfo20-prompt" aria-hidden="true">&gt;</span>
    <input class="kfo20-input" type="text" placeholder="transmit message…" aria-label="Command input">
    <span class="kfo20-caret" aria-hidden="true"></span>
  </div>
  <div class="kfo20-meta"><span>tx · ready</span><span>0x4f // uart</span></div>
</div>`
  },

  {
    id: "TO18",
    section: "toggles",
    name: "Reactor Breaker",
    description: "Vertical breaker switch that slides between ON and OFF with glowing captions.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["toggle", "switch", "breaker", "power", "sci-fi"],
    code: `<style>
  .kto18{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:inline-flex;flex-direction:column;align-items:center;gap:7px;padding:16px 20px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px}
  .kto18-label{font-size:10px;letter-spacing:.22em;color:#7fb3cc;text-transform:uppercase}
  .kto18-input{position:absolute;opacity:0;pointer-events:none}
  .kto18-switch{position:relative;width:54px;height:86px;background:#05090f;border:1px solid rgba(46,230,255,.3);border-radius:4px;cursor:pointer}
  .kto18-knob{position:absolute;left:7px;right:7px;top:8px;height:34px;background:linear-gradient(180deg,#16233f,#0b1322);border:1px solid rgba(46,230,255,.55);border-radius:3px;box-shadow:0 0 12px rgba(46,230,255,.35);transition:transform .18s ease,border-color .15s ease}
  .kto18-knob::before,.kto18-knob::after{content:"";position:absolute;left:8px;right:8px;height:1px;background:rgba(46,230,255,.6)}
  .kto18-knob::before{top:12px}
  .kto18-knob::after{top:19px}
  .kto18-caption{font-size:9px;letter-spacing:.2em;text-transform:uppercase;transition:color .15s ease,text-shadow .15s ease}
  .kto18-caption-on{color:#2f4457}
  .kto18-caption-off{color:#2f4457}
  .kto18-input:checked ~ .kto18-caption-on{color:#2ee6ff;text-shadow:0 0 8px rgba(46,230,255,.7)}
  .kto18-input:checked ~ .kto18-caption-off{color:#3a4a5e}
  .kto18-input:not(:checked) ~ .kto18-caption-off{color:#ff3dc8;text-shadow:0 0 8px rgba(255,61,200,.7)}
  .kto18-input:not(:checked) ~ .kto18-caption-on{color:#3a4a5e}
  .kto18-input:checked ~ .kto18-switch .kto18-knob{transform:translateY(0)}
  .kto18-input:not(:checked) ~ .kto18-switch .kto18-knob{transform:translateY(36px);border-color:rgba(255,61,200,.6);box-shadow:0 0 12px rgba(255,61,200,.4)}
  .kto18-input:not(:checked) ~ .kto18-switch .kto18-knob::before,.kto18-input:not(:checked) ~ .kto18-switch .kto18-knob::after{background:rgba(255,61,200,.7)}
  .kto18-state{font-size:9px;letter-spacing:.18em;color:#41617c;text-transform:uppercase}
  .kto18-input:checked ~ .kto18-state{color:#2ee6ff}
  .kto18-input:not(:checked) ~ .kto18-state{color:#ff3dc8}
  @media (prefers-reduced-motion:reduce){.kto18-knob{transition:none}.kto18-caption{transition:none}}
</style>
<div class="kto18">
  <span class="kto18-label">Reactor</span>
  <input type="checkbox" class="kto18-input" id="kto18x" checked>
  <span class="kto18-caption kto18-caption-on">On</span>
  <label class="kto18-switch" for="kto18x" aria-label="Toggle reactor">
    <span class="kto18-knob" aria-hidden="true"></span>
  </label>
  <span class="kto18-caption kto18-caption-off">Off</span>
  <span class="kto18-state">Breaker live</span>
</div>`
  },

  {
    id: "SL14",
    section: "sliders",
    name: "Segment Fuel Gauge",
    description: "Twelve-cell power meter that pops in segment by segment with a frontier pulse.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["slider", "gauge", "fuel", "energy", "progress"],
    code: `<style>
  .ksl14{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:inline-flex;flex-direction:column;gap:10px;width:290px;padding:16px 18px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px}
  .ksl14-head{display:flex;justify-content:space-between;align-items:baseline;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .ksl14-pct{font-size:12px;color:#2ee6ff;text-shadow:0 0 8px rgba(46,230,255,.6)}
  .ksl14-track{display:flex;gap:4px}
  .ksl14-seg{flex:1;height:26px;background:#05090f;border:1px solid rgba(46,230,255,.16);border-radius:2px;transform:scaleY(.4);opacity:.5;transform-origin:bottom;animation:ksl14-pop .45s ease-out forwards}
  .ksl14-seg.on{background:linear-gradient(180deg,#2ee6ff,#0a8fb0);border-color:rgba(46,230,255,.7);box-shadow:0 0 10px rgba(46,230,255,.5)}
  .ksl14-seg:nth-child(2){animation-delay:.05s}
  .ksl14-seg:nth-child(3){animation-delay:.1s}
  .ksl14-seg:nth-child(4){animation-delay:.15s}
  .ksl14-seg:nth-child(5){animation-delay:.2s}
  .ksl14-seg:nth-child(6){animation-delay:.25s}
  .ksl14-seg:nth-child(7){animation-delay:.3s}
  .ksl14-seg:nth-child(8){animation-delay:.35s}
  .ksl14-seg:nth-child(9){animation-delay:.4s}
  .ksl14-seg:nth-child(10){animation-delay:.45s}
  .ksl14-front{animation-name:ksl14-pop,ksl14-front;animation-duration:.45s,1.4s;animation-timing-function:ease-out,ease-in-out;animation-delay:.45s,.45s;animation-iteration-count:1,infinite;animation-fill-mode:forwards,none}
  @keyframes ksl14-pop{to{transform:scaleY(1);opacity:1}}
  @keyframes ksl14-front{0%,100%{opacity:1}50%{opacity:.4}}
  .ksl14-cap{display:flex;justify-content:space-between;font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.ksl14-seg,.ksl14-front{animation:none;transform:none;opacity:1}}
</style>
<div class="ksl14">
  <div class="ksl14-head"><span>Power cells</span><span class="ksl14-pct">78%</span></div>
  <div class="ksl14-track">
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on"></div>
    <div class="ksl14-seg on ksl14-front"></div>
    <div class="ksl14-seg"></div>
    <div class="ksl14-seg"></div>
    <div class="ksl14-seg"></div>
  </div>
  <div class="ksl14-cap"><span>drain 0.42</span><span>cell 07 / 10</span></div>
</div>`
  },

  {
    id: "CA17",
    section: "cards",
    name: "HUD Panel",
    description: "Bracketed telemetry card with LED header, spec rows, and a bar sparkline.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["card", "hud", "telemetry", "panel", "sci-fi"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--ca17-accent", default: "#2ee6ff" }
    ],
    code: `<style>
  .kca17{position:relative;width:252px;padding:14px;background:linear-gradient(180deg,#0c1424,#070b15),repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px);background-blend-mode:normal,normal;border:1px solid rgba(46,230,255,.28);border-radius:4px}
  .kca17::before,.kca17::after{content:"";position:absolute;width:13px;height:13px}
  .kca17::before{top:-1px;left:-1px;border-top:2px solid var(--ca17-accent,#2ee6ff);border-left:2px solid var(--ca17-accent,#2ee6ff)}
  .kca17::after{bottom:-1px;right:-1px;border-bottom:2px solid var(--ca17-accent,#2ee6ff);border-right:2px solid var(--ca17-accent,#2ee6ff)}
  .kca17-scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px);pointer-events:none}
  .kca17-head{display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px dashed rgba(46,230,255,.25);font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kca17-led{width:7px;height:7px;border-radius:50%;background:var(--ca17-accent,#2ee6ff);box-shadow:0 0 8px var(--ca17-accent,#2ee6ff);animation:kca17-led 1.4s steps(2) infinite}
  @keyframes kca17-led{50%{opacity:.25}}
  .kca17-title{font-size:11px;font-weight:600;letter-spacing:.2em;color:#d8f4ff;text-transform:uppercase}
  .kca17-tag{margin-left:auto;font-size:9px;letter-spacing:.16em;color:var(--ca17-accent,#2ee6ff);text-transform:uppercase}
  .kca17-row{display:flex;justify-content:space-between;padding:7px 0;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;border-bottom:1px dotted rgba(46,230,255,.14)}
  .kca17-k{color:#5d7d9c;letter-spacing:.06em}
  .kca17-v{color:var(--ca17-accent,#2ee6ff);text-shadow:0 0 6px rgba(46,230,255,.5)}
  .kca17-v.amb{color:#ffb44a;text-shadow:0 0 6px rgba(255,180,74,.5)}
  .kca17-spark{display:flex;align-items:flex-end;gap:4px;height:34px;padding-top:10px}
  .kca17-bar{flex:1;background:linear-gradient(180deg,var(--ca17-accent,#2ee6ff),rgba(46,230,255,.15));border-radius:1px;opacity:.9}
  .kca17-foot{display:flex;justify-content:space-between;padding-top:9px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.kca17-led{animation:none}}
</style>
<div class="kca17">
  <div class="kca17-scan" aria-hidden="true"></div>
  <div class="kca17-head">
    <span class="kca17-led"></span>
    <span class="kca17-title">Mech · Unit 07</span>
    <span class="kca17-tag">SYS OK</span>
  </div>
  <div class="kca17-row"><span class="kca17-k">REACTOR</span><span class="kca17-v">98%</span></div>
  <div class="kca17-row"><span class="kca17-k">HULL</span><span class="kca17-v">INTACT</span></div>
  <div class="kca17-row"><span class="kca17-k">SHIELD</span><span class="kca17-v amb">23%</span></div>
  <div class="kca17-spark">
    <div class="kca17-bar" style="height:45%"></div>
    <div class="kca17-bar" style="height:62%"></div>
    <div class="kca17-bar" style="height:38%"></div>
    <div class="kca17-bar" style="height:74%"></div>
    <div class="kca17-bar" style="height:56%"></div>
    <div class="kca17-bar" style="height:88%"></div>
    <div class="kca17-bar" style="height:64%"></div>
    <div class="kca17-bar" style="height:100%"></div>
  </div>
  <div class="kca17-foot"><span>uplink stable</span><span>t+04:12</span></div>
</div>`
  },

  {
    id: "NA17",
    section: "navigation",
    name: "Deck Tabs",
    description: "Radio-driven mission tabs with a glowing active beam and corner tick.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["tabs", "navigation", "radio", "mission", "sci-fi"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--na17-accent", default: "#2ee6ff" }
    ],
    code: `<style>
  .kna17{display:flex;gap:2px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kna17-in{position:absolute;opacity:0;pointer-events:none}
  .kna17-tab{position:relative;padding:9px 14px 11px;font-size:10px;letter-spacing:.14em;color:#5d7d9c;cursor:pointer;text-transform:uppercase;transition:color .15s ease}
  .kna17-tab:hover{color:#9fe9ff}
  .kna17-tab::after{content:"";position:absolute;left:10px;right:10px;bottom:3px;height:2px;background:var(--na17-accent,#2ee6ff);box-shadow:0 0 8px var(--na17-accent,#2ee6ff);transform:scaleX(0);transform-origin:left;transition:transform .18s ease}
  .kna17-in:checked + .kna17-tab{color:var(--na17-accent,#2ee6ff);text-shadow:0 0 8px rgba(46,230,255,.6)}
  .kna17-in:checked + .kna17-tab::after{transform:scaleX(1)}
  .kna17-in:checked + .kna17-tab::before{content:"";position:absolute;left:6px;top:5px;width:5px;height:5px;border-left:1px solid var(--na17-accent,#2ee6ff);border-top:1px solid var(--na17-accent,#2ee6ff)}
  @media (prefers-reduced-motion:reduce){.kna17-tab{transition:none}.kna17-tab::after{transition:none}}
</style>
<div class="kna17">
  <input type="radio" name="kna17" id="kna17-1" class="kna17-in" checked>
  <label class="kna17-tab" for="kna17-1">01 // Scan</label>
  <input type="radio" name="kna17" id="kna17-2" class="kna17-in">
  <label class="kna17-tab" for="kna17-2">02 // Map</label>
  <input type="radio" name="kna17" id="kna17-3" class="kna17-in">
  <label class="kna17-tab" for="kna17-3">03 // Cargo</label>
  <input type="radio" name="kna17" id="kna17-4" class="kna17-in">
  <label class="kna17-tab" for="kna17-4">04 // Crew</label>
</div>`
  },

  {
    id: "AL17",
    section: "alerts",
    name: "Hazard Callout",
    description: "Warning banner with hazard-stripe rail, blinking status dot, and ack action.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["alert", "warning", "hazard", "toast", "sci-fi"],
    tweaks: [
      { type: "color", label: "Warning", varName: "--al17-warn", default: "#ffb44a" }
    ],
    code: `<style>
  .kal17{position:relative;display:flex;gap:12px;align-items:flex-start;max-width:340px;padding:12px 14px 12px 34px;background:linear-gradient(180deg,#12100a,#0a0a08);border:1px solid rgba(255,180,74,.4);border-radius:4px;overflow:hidden;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kal17::before{content:"";position:absolute;left:0;top:0;bottom:0;width:16px;background:repeating-linear-gradient(45deg,var(--al17-warn,#ffb44a) 0 6px,#0d0a04 6px 12px);opacity:.9}
  .kal17::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.02) 0 1px,transparent 1px 3px);pointer-events:none}
  .kal17-dot{width:7px;height:7px;border-radius:50%;background:var(--al17-warn,#ffb44a);box-shadow:0 0 10px var(--al17-warn,#ffb44a);margin-top:4px;flex-shrink:0;animation:kal17-b 1s steps(2) infinite}
  @keyframes kal17-b{50%{opacity:.15}}
  .kal17-body{display:flex;flex-direction:column;gap:4px}
  .kal17-title{font-size:11px;font-weight:600;letter-spacing:.14em;color:var(--al17-warn,#ffb44a);text-transform:uppercase;text-shadow:0 0 8px rgba(255,180,74,.5)}
  .kal17-sub{font-size:10px;color:#8a6d3f;line-height:1.5}
  .kal17-ack{margin-left:auto;align-self:center;padding:6px 12px;font:inherit;font-size:9px;letter-spacing:.18em;color:var(--al17-warn,#ffb44a);background:transparent;border:1px solid rgba(255,180,74,.45);border-radius:2px;cursor:pointer;text-transform:uppercase;transition:transform .12s ease,color .15s ease,background .15s ease}
  .kal17-ack:hover{background:rgba(255,180,74,.12)}
  .kal17-ack:active{transform:scale(.96)}
  @media (prefers-reduced-motion:reduce){.kal17-dot{animation:none}}
</style>
<div class="kal17" role="alert">
  <span class="kal17-dot" aria-hidden="true"></span>
  <div class="kal17-body">
    <span class="kal17-title">Warning · Shield integrity 23%</span>
    <span class="kal17-sub">Recalibrate deflectors before the next jump window.</span>
  </div>
  <button type="button" class="kal17-ack">Ack</button>
</div>`
  },

  {
    id: "IC21",
    section: "icons",
    name: "HUD Glyphs",
    description: "Five stroked line glyphs in bracket tiles with micro labels.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["icons", "glyph", "hud", "svg", "sci-fi"],
    code: `<style>
  .kic21{display:flex;gap:8px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kic21-tile{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;width:52px;padding:10px 0 8px;background:#070d18;border:1px solid rgba(46,230,255,.22);border-radius:3px;color:#9fe9ff}
  .kic21-tile::before,.kic21-tile::after{content:"";position:absolute;width:6px;height:6px}
  .kic21-tile::before{top:-1px;left:-1px;border-top:1px solid #2ee6ff;border-left:1px solid #2ee6ff}
  .kic21-tile::after{bottom:-1px;right:-1px;border-bottom:1px solid #2ee6ff;border-right:1px solid #2ee6ff}
  .kic21-tile svg{width:22px;height:22px;filter:drop-shadow(0 0 4px rgba(46,230,255,.5))}
  .kic21-lbl{font-size:8px;letter-spacing:.18em;color:#5d7d9c;text-transform:uppercase}
</style>
<div class="kic21">
  <div class="kic21-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/></svg><span class="kic21-lbl">Tgt</span></div>
  <div class="kic21-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l7 3v5.2c0 4.4-3 7.6-7 8.8-4-1.2-7-4.4-7-8.8V6z"/></svg><span class="kic21-lbl">Shd</span></div>
  <div class="kic21-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L5 13.5h5L11 22l8-11.5h-5z"/></svg><span class="kic21-lbl">Pwr</span></div>
  <div class="kic21-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 16a8.5 8.5 0 0116 0M7.8 19a4.5 4.5 0 018.4 0"/><circle cx="12" cy="20.5" r="1.2" fill="currentColor" stroke="none"/></svg><span class="kic21-lbl">Sig</span></div>
  <div class="kic21-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14a8 8 0 0116 0"/><path d="M12 14l4-4.5"/><path d="M4 17h16"/></svg><span class="kic21-lbl">Fuel</span></div>
</div>`
  },

  {
    id: "PL17",
    section: "players",
    name: "Cassette Deck",
    description: "Tape transport with spinning reels, transport keys, timecode, and a VU meter.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["player", "cassette", "tape", "retro", "audio"],
    code: `<style>
  .kpl17{display:flex;flex-direction:column;gap:10px;width:300px;padding:14px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.22);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kpl17-head{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .kpl17-led{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kpl17-b 1s steps(2) infinite}
  @keyframes kpl17-b{50%{opacity:.2}}
  .kpl17-window{position:relative;height:62px;border:1px solid rgba(46,230,255,.35);background:#04070d;border-radius:3px;display:flex;align-items:center;justify-content:space-between;padding:0 26px;overflow:hidden}
  .kpl17-window::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(46,230,255,.04) 0 1px,transparent 1px 3px);pointer-events:none}
  .kpl17-reel{position:relative;width:34px;height:34px;border-radius:50%;border:2px solid rgba(46,230,255,.5);animation:kpl17-spin 3s linear infinite}
  .kpl17-reel::before,.kpl17-reel::after{content:"";position:absolute;background:rgba(46,230,255,.5)}
  .kpl17-reel::before{left:50%;top:4px;bottom:4px;width:2px;transform:translateX(-50%)}
  .kpl17-reel::after{top:50%;left:4px;right:4px;height:2px;transform:translateY(-50%)}
  .kpl17-r2{animation-direction:reverse;animation-duration:2.4s}
  .kpl17-tape{position:absolute;left:50%;top:50%;width:96px;height:3px;transform:translate(-50%,-50%);background:linear-gradient(90deg,transparent,rgba(46,230,255,.6),transparent)}
  @keyframes kpl17-spin{to{transform:rotate(360deg)}}
  .kpl17-time{display:flex;justify-content:space-between;font-size:10px;color:#5d7d9c;letter-spacing:.1em}
  .kpl17-time b{color:#9fe9ff;font-weight:600}
  .kpl17-keys{display:flex;gap:6px}
  .kpl17-key{flex:1;padding:8px 0;background:#070d18;border:1px solid rgba(46,230,255,.25);border-bottom-width:3px;border-bottom-color:rgba(46,230,255,.1);border-radius:3px;color:#9fe9ff;font:inherit;font-size:10px;letter-spacing:.12em;cursor:pointer;text-transform:uppercase;transition:transform .12s ease,color .15s ease}
  .kpl17-key:hover{color:#2ee6ff}
  .kpl17-key:active{transform:translateY(2px);border-bottom-width:1px}
  .kpl17-vu{display:flex;gap:3px;height:12px;align-items:flex-end}
  .kpl17-vu i{flex:1;background:#2ee6ff;box-shadow:0 0 6px rgba(46,230,255,.5);animation:kpl17-vu 1.1s ease-in-out infinite;transform-origin:bottom}
  .kpl17-vu i:nth-child(2){animation-delay:.12s}
  .kpl17-vu i:nth-child(3){animation-delay:.24s}
  .kpl17-vu i:nth-child(4){animation-delay:.36s}
  .kpl17-vu i:nth-child(5){animation-delay:.48s}
  @keyframes kpl17-vu{0%,100%{transform:scaleY(.3);opacity:.4}50%{transform:scaleY(1);opacity:1}}
  @media (prefers-reduced-motion:reduce){.kpl17-led,.kpl17-reel,.kpl17-vu i{animation:none}}
</style>
<div class="kpl17">
  <div class="kpl17-head"><span class="kpl17-led"></span>Deck · Cassette 01</div>
  <div class="kpl17-window">
    <div class="kpl17-reel"></div>
    <div class="kpl17-tape" aria-hidden="true"></div>
    <div class="kpl17-reel kpl17-r2"></div>
  </div>
  <div class="kpl17-time"><span>track <b>02</b></span><span><b>00:04:32</b> / 00:18:00</span></div>
  <div class="kpl17-keys">
    <button type="button" class="kpl17-key" aria-label="Rewind">◀◀</button>
    <button type="button" class="kpl17-key" aria-label="Play">▶</button>
    <button type="button" class="kpl17-key" aria-label="Pause">❚❚</button>
    <button type="button" class="kpl17-key" aria-label="Fast forward">▶▶</button>
  </div>
  <div class="kpl17-vu" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
</div>`
  },

  {
    id: "MO16",
    section: "modals",
    name: "Uplink Dialog",
    description: "Terminal confirm dialog on a grid backdrop with a blinking block cursor.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["modal", "dialog", "terminal", "confirm", "sci-fi"],
    code: `<style>
  .kmo16{width:320px;padding:20px;background:linear-gradient(rgba(46,230,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,230,255,.05) 1px,transparent 1px),#04070d;background-size:22px 22px;border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kmo16-dialog{position:relative;background:linear-gradient(180deg,#0c1424,#070b15);border:1px solid rgba(46,230,255,.35);border-radius:4px;padding:16px}
  .kmo16-dialog::before,.kmo16-dialog::after{content:"";position:absolute;width:12px;height:12px}
  .kmo16-dialog::before{top:-1px;left:-1px;border-top:2px solid #2ee6ff;border-left:2px solid #2ee6ff}
  .kmo16-dialog::after{bottom:-1px;right:-1px;border-bottom:2px solid #2ee6ff;border-right:2px solid #2ee6ff}
  .kmo16-head{display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:1px dashed rgba(46,230,255,.25)}
  .kmo16-led{width:7px;height:7px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kmo16-b 1.2s steps(2) infinite}
  @keyframes kmo16-b{50%{opacity:.2}}
  .kmo16-title{font-size:11px;letter-spacing:.2em;color:#d8f4ff;text-transform:uppercase}
  .kmo16-ver{margin-left:auto;font-size:9px;color:#41617c;letter-spacing:.1em}
  .kmo16-msg{font-size:11px;line-height:1.65;color:#9fe9ff;padding:12px 0}
  .kmo16-cursor{display:inline-block;width:7px;height:12px;background:#2ee6ff;vertical-align:-2px;margin-left:2px;box-shadow:0 0 8px #2ee6ff;animation:kmo16-b .9s steps(2) infinite}
  .kmo16-foot{display:flex;gap:8px;justify-content:flex-end;padding-top:4px}
  .kmo16-btn{padding:7px 16px;font:inherit;font-size:10px;letter-spacing:.18em;background:transparent;border:1px solid rgba(46,230,255,.35);color:#7fb3cc;border-radius:2px;cursor:pointer;text-transform:uppercase;transition:transform .12s ease,color .15s ease,border-color .15s ease}
  .kmo16-btn:hover{color:#d8f4ff}
  .kmo16-btn:active{transform:scale(.97)}
  .kmo16-ok{border-color:#2ee6ff;color:#2ee6ff;background:rgba(46,230,255,.08);box-shadow:0 0 14px rgba(46,230,255,.18)}
  @media (prefers-reduced-motion:reduce){.kmo16-led,.kmo16-cursor{animation:none}}
</style>
<div class="kmo16">
  <div class="kmo16-dialog" role="dialog" aria-modal="true" aria-label="Uplink authorization">
    <div class="kmo16-head">
      <span class="kmo16-led"></span>
      <span class="kmo16-title">Sys://Uplink</span>
      <span class="kmo16-ver">v2.4.1</span>
    </div>
    <p class="kmo16-msg">Incoming transmission — authorize drone network uplink?<span class="kmo16-cursor" aria-hidden="true"></span></p>
    <div class="kmo16-foot">
      <button type="button" class="kmo16-btn">Abort</button>
      <button type="button" class="kmo16-btn kmo16-ok">Confirm</button>
    </div>
  </div>
</div>`
  },

  {
    id: "EF17",
    section: "effects",
    name: "CRT Phosphor",
    description: "Scanline screen treatment with chromatic glow, vignette, and phosphor type.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["effect", "crt", "phosphor", "scanline", "glow"],
    code: `<style>
  .kef17{position:relative;display:inline-block;padding:26px 30px;background:#03060b;border:1px solid rgba(46,230,255,.25);border-radius:6px;overflow:hidden;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kef17::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 1px,transparent 1px 3px);pointer-events:none}
  .kef17::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 40%,transparent 55%,rgba(0,0,0,.55) 100%);pointer-events:none}
  .kef17-word{margin:0;font-size:30px;font-weight:600;letter-spacing:.14em;color:#d9fbff;text-shadow:0 0 6px #2ee6ff,0 0 22px rgba(46,230,255,.85),2px 0 0 rgba(255,61,200,.35),-2px 0 0 rgba(46,230,255,.4)}
  .kef17-sub{display:flex;align-items:center;gap:7px;margin-top:10px;font-size:9px;letter-spacing:.3em;color:#41617c;text-transform:uppercase}
  .kef17-dot{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kef17-b 1.3s steps(2) infinite}
  @keyframes kef17-b{50%{opacity:.15}}
  @media (prefers-reduced-motion:reduce){.kef17-dot{animation:none}}
</style>
<div class="kef17">
  <p class="kef17-word">NEON DECK</p>
  <div class="kef17-sub"><span class="kef17-dot"></span>Phosphor · 60hz · v1</div>
</div>`
  },

  {
    id: "DD9",
    section: "dragdrop",
    name: "Cargo Hold",
    description: "Grabbable cargo pods with grip handles and a pulsing drop zone.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["drag", "drop", "reorder", "cargo", "sci-fi"],
    code: `<style>
  .kdd9{display:flex;flex-direction:column;gap:9px;width:272px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kdd9-head{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .kdd9-led{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kdd9-b 1.4s steps(2) infinite}
  @keyframes kdd9-b{50%{opacity:.2}}
  .kdd9-pod{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#070d18;border:1px solid rgba(46,230,255,.18);border-radius:3px;cursor:grab;transition:transform .15s ease,border-color .15s ease}
  .kdd9-pod:hover{transform:translateX(5px);border-color:rgba(46,230,255,.55)}
  .kdd9-grip{color:#41617c;font-size:12px;line-height:1;letter-spacing:-1px}
  .kdd9-name{font-size:11px;color:#cfeef7;letter-spacing:.05em}
  .kdd9-mass{margin-left:auto;font-size:10px;color:#5d7d9c}
  .kdd9-zone{margin-top:2px;padding:13px;border:1px dashed rgba(46,230,255,.45);border-radius:3px;text-align:center;font-size:9px;letter-spacing:.22em;color:#7fb3cc;text-transform:uppercase;animation:kdd9-pulse 2s ease-in-out infinite}
  @keyframes kdd9-pulse{0%,100%{opacity:.55}50%{opacity:1}}
  @media (prefers-reduced-motion:reduce){.kdd9-led{animation:none}.kdd9-zone{animation:none}}
</style>
<div class="kdd9">
  <div class="kdd9-head"><span class="kdd9-led"></span>Cargo hold · bay 03</div>
  <div class="kdd9-pod"><span class="kdd9-grip" aria-hidden="true">⋮⋮</span><span class="kdd9-name">Ion drive</span><span class="kdd9-mass">4.2t</span></div>
  <div class="kdd9-pod"><span class="kdd9-grip" aria-hidden="true">⋮⋮</span><span class="kdd9-name">Hull plate</span><span class="kdd9-mass">1.8t</span></div>
  <div class="kdd9-pod"><span class="kdd9-grip" aria-hidden="true">⋮⋮</span><span class="kdd9-name">O₂ canister</span><span class="kdd9-mass">0.6t</span></div>
  <div class="kdd9-zone">Drop pod here ▾</div>
</div>`
  },

  {
    id: "TT9",
    section: "tooltips",
    name: "Datalink Tip",
    description: "Bracket-framed hover tooltip with a rotated caret and live telemetry rows.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["tooltip", "hover", "datalink", "popover", "sci-fi"],
    code: `<style>
  .ktt9{position:relative;display:inline-block;padding:26px 10px 10px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .ktt9-chip{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;background:#070d18;border:1px solid rgba(46,230,255,.4);border-radius:3px;color:#9fe9ff;font-size:11px;letter-spacing:.1em;cursor:default}
  .ktt9-chip b{color:#2ee6ff;text-shadow:0 0 8px rgba(46,230,255,.7);font-weight:600}
  .ktt9-tip{position:absolute;bottom:calc(100% + 9px);left:50%;width:172px;padding:11px 12px;background:#0d1628;border:1px solid rgba(46,230,255,.45);border-radius:3px;opacity:0;transform:translate(-50%,7px);pointer-events:none;transition:opacity .16s ease,transform .16s ease}
  .ktt9:hover .ktt9-tip{opacity:1;transform:translate(-50%,0)}
  .ktt9-tip::before,.ktt9-tip::after{content:"";position:absolute;width:7px;height:7px}
  .ktt9-tip::before{top:-1px;left:-1px;border-top:1px solid #2ee6ff;border-left:1px solid #2ee6ff}
  .ktt9-tip::after{bottom:-1px;right:-1px;border-bottom:1px solid #2ee6ff;border-right:1px solid #2ee6ff}
  .ktt9-arrow{position:absolute;top:100%;left:50%;width:9px;height:9px;margin-left:-4.5px;background:#0d1628;border-right:1px solid rgba(46,230,255,.45);border-bottom:1px solid rgba(46,230,255,.45);transform:rotate(45deg)}
  .ktt9-t{font-size:10px;letter-spacing:.16em;color:#d8f4ff;text-transform:uppercase;margin-bottom:7px}
  .ktt9-row{display:flex;justify-content:space-between;font-size:9px;color:#5d7d9c;letter-spacing:.08em;padding:2px 0}
  .ktt9-row b{color:#9fe9ff;font-weight:600}
  .ktt9-dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 6px #2ee6ff;margin-right:4px;vertical-align:1px}
  @media (prefers-reduced-motion:reduce){.ktt9-tip{transition:none}}
</style>
<div class="ktt9">
  <div class="ktt9-chip">PWR CORE · <b>87%</b></div>
  <div class="ktt9-tip" role="tooltip">
    <span class="ktt9-arrow" aria-hidden="true"></span>
    <div class="ktt9-t"><span class="ktt9-dot"></span>Pwr core 07</div>
    <div class="ktt9-row"><span>VOLTAGE</span><b>412 V</b></div>
    <div class="ktt9-row"><span>TEMP</span><b>62°C</b></div>
    <div class="ktt9-row"><span>STATUS</span><b>STABLE</b></div>
  </div>
</div>`
  },

  {
    id: "SB5",
    section: "sidebars",
    name: "Station Rail",
    description: "Icon rail with active beam, hover caret markers, and a magenta power slot.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["sidebar", "rail", "icons", "nav", "sci-fi"],
    code: `<style>
  .ksb5{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;width:52px;padding:12px 0;background:linear-gradient(180deg,#0c1424,#060a14);border:1px solid rgba(46,230,255,.22);border-radius:5px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .ksb5-item{position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;color:#41617c;cursor:pointer;border-radius:3px;transition:color .15s ease,background .15s ease}
  .ksb5-item svg{width:17px;height:17px}
  .ksb5-item:hover{color:#9fe9ff;background:rgba(46,230,255,.07)}
  .ksb5-item.active{color:#2ee6ff;background:rgba(46,230,255,.1);text-shadow:0 0 8px rgba(46,230,255,.7)}
  .ksb5-item.active::before{content:"";position:absolute;left:-12px;top:9px;bottom:9px;width:2px;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff}
  .ksb5-item::after{content:"▸";position:absolute;right:-9px;top:50%;transform:translateY(-50%);font-size:8px;color:#2ee6ff;opacity:0;transition:opacity .15s ease}
  .ksb5-item:hover::after{opacity:1}
  .ksb5-sep{width:22px;height:1px;background:rgba(46,230,255,.18);margin:6px 0}
  .ksb5-power{color:#ff3dc8}
  .ksb5-power:hover{color:#ff3dc8;background:rgba(255,61,200,.1)}
  @media (prefers-reduced-motion:reduce){.ksb5-item{transition:none}}
</style>
<div class="ksb5" role="navigation" aria-label="Station rail">
  <div class="ksb5-item active" title="Grid"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg></div>
  <div class="ksb5-item" title="Sensors"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg></div>
  <div class="ksb5-item" title="Cargo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 8l-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8"/></svg></div>
  <div class="ksb5-sep"></div>
  <div class="ksb5-item" title="Comms"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 16a8.5 8.5 0 0116 0M7.8 19a4.5 4.5 0 018.4 0"/><circle cx="12" cy="20.5" r="1.2" fill="currentColor" stroke="none"/></svg></div>
  <div class="ksb5-item ksb5-power" title="Power"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v9"/><path d="M6.2 5.5a8 8 0 1011.6 0"/></svg></div>
</div>`
  },

  {
    id: "CH5",
    section: "charts",
    name: "Telemetry Wave",
    description: "SVG signal chart with animated draw-in, gradient fill, and gridlines.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["chart", "signal", "waveform", "svg", "telemetry"],
    tweaks: [
      { type: "color", label: "Signal", varName: "--ch5-line", default: "#2ee6ff" }
    ],
    code: `<style>
  .kch5{position:relative;width:300px;padding:14px;background:linear-gradient(180deg,#0c1424,#070b15);border:1px solid rgba(46,230,255,.25);border-radius:4px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kch5::before,.kch5::after{content:"";position:absolute;width:11px;height:11px}
  .kch5::before{top:-1px;left:-1px;border-top:2px solid var(--ch5-line,#2ee6ff);border-left:2px solid var(--ch5-line,#2ee6ff)}
  .kch5::after{bottom:-1px;right:-1px;border-bottom:2px solid var(--ch5-line,#2ee6ff);border-right:2px solid var(--ch5-line,#2ee6ff)}
  .kch5-head{display:flex;justify-content:space-between;align-items:baseline;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .kch5-read{font-size:12px;color:var(--ch5-line,#2ee6ff);text-shadow:0 0 8px rgba(46,230,255,.6)}
  .kch5-svg{display:block;width:100%;margin-top:10px}
  .kch5-grid{stroke:rgba(46,230,255,.12);stroke-width:1}
  .kch5-line{fill:none;stroke:var(--ch5-line,#2ee6ff);stroke-width:2;stroke-linecap:round;stroke-dasharray:420;stroke-dashoffset:420;animation:kch5-draw 1.6s ease-out forwards}
  @keyframes kch5-draw{to{stroke-dashoffset:0}}
  .kch5-g1{stop-color:var(--ch5-line,#2ee6ff);stop-opacity:.45}
  .kch5-g2{stop-color:var(--ch5-line,#2ee6ff);stop-opacity:0}
  .kch5-foot{display:flex;justify-content:space-between;margin-top:8px;font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.kch5-line{animation:none;stroke-dashoffset:0}}
</style>
<div class="kch5">
  <div class="kch5-head"><span>Signal · Ch 07</span><span class="kch5-read">0.87</span></div>
  <svg class="kch5-svg" viewBox="0 0 300 96" aria-hidden="true">
    <defs>
      <linearGradient id="kch5grad" x1="0" y1="0" x2="0" y2="1">
        <stop class="kch5-g1" offset="0%"/>
        <stop class="kch5-g2" offset="100%"/>
      </linearGradient>
    </defs>
    <line class="kch5-grid" x1="0" y1="24" x2="300" y2="24"/>
    <line class="kch5-grid" x1="0" y1="48" x2="300" y2="48"/>
    <line class="kch5-grid" x1="0" y1="72" x2="300" y2="72"/>
    <path class="kch5-fill" d="M0,64 L28,58 L56,68 L84,40 L112,50 L140,22 L168,36 L196,18 L224,30 L252,48 L280,26 L300,34 L300,96 L0,96 Z" fill="url(#kch5grad)"/>
    <path class="kch5-line" d="M0,64 L28,58 L56,68 L84,40 L112,50 L140,22 L168,36 L196,18 L224,30 L252,48 L280,26 L300,34"/>
  </svg>
  <div class="kch5-foot"><span>sample 02s</span><span>gain 4×</span></div>
</div>`
  },

  {
    id: "TB5",
    section: "tables",
    name: "Manifest Table",
    description: "Cargo manifest with LED status cells, tabular masses, and row-hover glow.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["table", "manifest", "data", "cargo", "sci-fi"],
    code: `<style>
  .ktb5{width:320px;padding:14px;background:linear-gradient(180deg,#0c1424,#070b15);border:1px solid rgba(46,230,255,.22);border-radius:4px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .ktb5 table{width:100%;border-collapse:collapse;font-size:10px}
  .ktb5 th{font-size:9px;letter-spacing:.18em;color:#5d7d9c;text-transform:uppercase;text-align:left;font-weight:600;padding:0 8px 8px;border-bottom:1px solid rgba(46,230,255,.35)}
  .ktb5 td{padding:8px;border-bottom:1px dotted rgba(46,230,255,.14);color:#7fb3cc;letter-spacing:.04em}
  .ktb5 tr:last-child td{border-bottom:none}
  .ktb5 tbody tr{transition:background .15s ease}
  .ktb5 tbody tr:hover{background:rgba(46,230,255,.06)}
  .ktb5 td:first-child{color:#41617c}
  .ktb5 td:nth-child(2){color:#cfeef7}
  .ktb5 td:nth-child(3){text-align:right;color:#9fe9ff;font-variant-numeric:tabular-nums}
  .ktb5-st{display:inline-flex;align-items:center;gap:5px;font-size:9px;letter-spacing:.12em;text-transform:uppercase}
  .ktb5-dot{width:5px;height:5px;border-radius:50%}
  .ktb5-ok{color:#2ee6ff}
  .ktb5-ok .ktb5-dot{background:#2ee6ff;box-shadow:0 0 6px #2ee6ff}
  .ktb5-lo{color:#ffb44a}
  .ktb5-lo .ktb5-dot{background:#ffb44a;box-shadow:0 0 6px #ffb44a}
  .ktb5-cr{color:#ff3dc8}
  .ktb5-cr .ktb5-dot{background:#ff3dc8;box-shadow:0 0 6px #ff3dc8}
  .ktb5-cap{display:flex;justify-content:space-between;margin-top:9px;font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.ktb5 tbody tr{transition:none}}
</style>
<div class="ktb5">
  <table>
    <thead>
      <tr><th>Unit</th><th>Cargo</th><th>Mass</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>X-041</td><td>Ion drive</td><td>4.2t</td><td><span class="ktb5-st ktb5-ok"><span class="ktb5-dot"></span>Ok</span></td></tr>
      <tr><td>X-042</td><td>Hull plate</td><td>1.8t</td><td><span class="ktb5-st ktb5-lo"><span class="ktb5-dot"></span>Low</span></td></tr>
      <tr><td>X-043</td><td>O₂ canister</td><td>0.6t</td><td><span class="ktb5-st ktb5-ok"><span class="ktb5-dot"></span>Ok</span></td></tr>
      <tr><td>X-044</td><td>Nav core</td><td>0.9t</td><td><span class="ktb5-st ktb5-cr"><span class="ktb5-dot"></span>Crit</span></td></tr>
      <tr><td>X-045</td><td>Heat sink</td><td>2.3t</td><td><span class="ktb5-st ktb5-ok"><span class="ktb5-dot"></span>Ok</span></td></tr>
    </tbody>
  </table>
  <div class="ktb5-cap"><span>manifest 05</span><span>bay 03</span></div>
</div>`
  },

  {
    id: "AC5",
    section: "accordions",
    name: "Hull Systems",
    description: "Engineering disclosure panels with rotating markers and spec rows.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["accordion", "disclosure", "systems", "engineering", "sci-fi"],
    code: `<style>
  .kac5{display:flex;flex-direction:column;gap:8px;width:300px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kac5 details{background:#070d18;border:1px solid rgba(46,230,255,.2);border-radius:3px;overflow:hidden}
  .kac5 details[open]{border-color:rgba(46,230,255,.5);box-shadow:0 0 14px rgba(46,230,255,.12)}
  .kac5 summary{list-style:none;display:flex;align-items:center;gap:9px;padding:10px 12px;cursor:pointer;font-size:10px;letter-spacing:.16em;color:#9fe9ff;text-transform:uppercase;user-select:none}
  .kac5 summary::-webkit-details-marker{display:none}
  .kac5-plus{flex-shrink:0;width:16px;height:16px;border:1px solid rgba(46,230,255,.45);border-radius:2px;display:grid;place-items:center;color:#2ee6ff;font-size:12px;line-height:1;transition:transform .18s ease,color .15s ease,border-color .15s ease}
  .kac5 details[open] .kac5-plus{transform:rotate(45deg);color:#ff3dc8;border-color:rgba(255,61,200,.5)}
  .kac5-led{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 6px #2ee6ff}
  .kac5 details[open] .kac5-led{background:#ff3dc8;box-shadow:0 0 6px #ff3dc8}
  .kac5-st{margin-left:auto;font-size:8px;letter-spacing:.16em;color:#41617c}
  .kac5-body{padding:0 12px 11px 37px;display:flex;flex-direction:column;gap:5px;font-size:10px;color:#7fb3cc}
  .kac5-body div{display:flex;justify-content:space-between;letter-spacing:.04em}
  .kac5-body b{color:#cfeef7;font-weight:600}
  @media (prefers-reduced-motion:reduce){.kac5-plus{transition:none}}
</style>
<div class="kac5">
  <details>
    <summary><span class="kac5-plus">+</span><span class="kac5-led"></span>Hull integrity<span class="kac5-st">OK</span></summary>
    <div class="kac5-body">
      <div><span>PLATING</span><b>92%</b></div>
      <div><span>PRESSURE</span><b>1.01 atm</b></div>
      <div><span>PATCHES</span><b>3</b></div>
    </div>
  </details>
  <details open>
    <summary><span class="kac5-plus">+</span><span class="kac5-led"></span>Power grid<span class="kac5-st">LIVE</span></summary>
    <div class="kac5-body">
      <div><span>REACTOR</span><b>98%</b></div>
      <div><span>BATTERIES</span><b>CHARGE</b></div>
      <div><span>DRAIN</span><b>0.42</b></div>
    </div>
  </details>
</div>`
  },

  {
    id: "PS5",
    section: "pages",
    name: "Hero Band",
    description: "Terminal hero with grid backdrop, glowing headline, blinking cursor, and CTA pair.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["hero", "page", "landing", "cta", "terminal"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--ps5-accent", default: "#2ee6ff" }
    ],
    code: `<style>
  .kps5{position:relative;width:100%;max-width:560px;padding:42px 36px;background:radial-gradient(120% 90% at 50% 0%,rgba(46,230,255,.12),transparent 55%),linear-gradient(rgba(46,230,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(46,230,255,.05) 1px,transparent 1px),linear-gradient(180deg,#0c1424,#060a14);background-size:auto,26px 26px,26px 26px,auto;border:1px solid rgba(46,230,255,.25);border-radius:6px;overflow:hidden;text-align:left;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kps5-kicker{margin:0 0 12px;font-size:10px;letter-spacing:.3em;color:#7fb3cc;text-transform:uppercase}
  .kps5-kicker::before{content:"// ";color:var(--ps5-accent,#2ee6ff)}
  .kps5-title{margin:0;font-size:32px;font-weight:700;letter-spacing:.08em;color:#d9fbff;text-shadow:0 0 10px rgba(46,230,255,.55),0 0 34px rgba(46,230,255,.3)}
  .kps5-cursor{display:inline-block;width:9px;height:22px;margin-left:3px;background:var(--ps5-accent,#2ee6ff);vertical-align:-3px;box-shadow:0 0 10px var(--ps5-accent,#2ee6ff);animation:kps5-b 1s steps(2) infinite}
  @keyframes kps5-b{50%{opacity:0}}
  .kps5-sub{margin:14px 0 22px;font-size:11px;line-height:1.7;color:#5d7d9c;max-width:360px}
  .kps5-actions{display:flex;gap:10px}
  .kps5-btn{padding:10px 20px;font:inherit;font-size:10px;letter-spacing:.2em;background:transparent;border:1px solid rgba(46,230,255,.4);color:#9fe9ff;border-radius:2px;cursor:pointer;text-transform:uppercase;transition:transform .12s ease,color .15s ease,background .15s ease}
  .kps5-btn:hover{color:#d9fbff;background:rgba(46,230,255,.08)}
  .kps5-btn:active{transform:scale(.97)}
  .kps5-primary{background:rgba(46,230,255,.12);border-color:var(--ps5-accent,#2ee6ff);color:var(--ps5-accent,#2ee6ff);box-shadow:0 0 18px rgba(46,230,255,.25)}
  .kps5-foot{margin-top:26px;font-size:9px;letter-spacing:.24em;color:#41617c;text-transform:uppercase}
  @media (prefers-reduced-motion:reduce){.kps5-cursor{animation:none}}
</style>
<div class="kps5">
  <p class="kps5-kicker">Deploying to grid 09</p>
  <h1 class="kps5-title">Enter the grid<span class="kps5-cursor" aria-hidden="true"></span></h1>
  <p class="kps5-sub">A retro sci-fi UI kit for interfaces that feel like hardware — one palette, every component, all systems nominal.</p>
  <div class="kps5-actions">
    <button type="button" class="kps5-btn kps5-primary">Launch</button>
    <button type="button" class="kps5-btn">View schematics</button>
  </div>
  <div class="kps5-foot">Neon deck · v1.0 · 26 modules</div>
</div>`
  },

  {
    id: "AV5",
    section: "avatars",
    name: "Crew Tags",
    description: "Hexagonal crew roster tags with initials, rank, and presence LEDs.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["avatar", "hex", "crew", "presence", "initials"],
    code: `<style>
  .kav5{display:flex;gap:18px;padding:16px 20px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kav5-tag{display:flex;flex-direction:column;align-items:center;gap:7px}
  .kav5-hex{position:relative;width:54px;height:60px;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);background:rgba(46,230,255,.55);display:grid;place-items:center}
  .kav5-hex::before{content:"";position:absolute;inset:2px;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);background:linear-gradient(180deg,#12203c,#0a1120)}
  .kav5-ini{position:relative;font-size:16px;font-weight:700;color:#2ee6ff;text-shadow:0 0 8px rgba(46,230,255,.8)}
  .kav5-name{font-size:10px;letter-spacing:.12em;color:#cfeef7;text-transform:uppercase}
  .kav5-rank{font-size:8px;letter-spacing:.18em;color:#41617c;text-transform:uppercase}
  .kav5-dot{width:5px;height:5px;border-radius:50%}
  .kav5-a .kav5-dot{background:#2ee6ff;box-shadow:0 0 6px #2ee6ff;animation:kav5-b 1.6s steps(2) infinite}
  .kav5-b .kav5-hex{background:rgba(255,61,200,.55)}
  .kav5-b .kav5-ini{color:#ff3dc8;text-shadow:0 0 8px rgba(255,61,200,.8)}
  .kav5-b .kav5-dot{background:#ff3dc8;box-shadow:0 0 6px #ff3dc8}
  .kav5-c .kav5-hex{background:rgba(255,180,74,.55)}
  .kav5-c .kav5-ini{color:#ffb44a;text-shadow:0 0 8px rgba(255,180,74,.8)}
  .kav5-c .kav5-dot{background:#ffb44a;box-shadow:0 0 6px #ffb44a}
  @keyframes kav5-b{50%{opacity:.2}}
  @media (prefers-reduced-motion:reduce){.kav5-a .kav5-dot{animation:none}}
</style>
<div class="kav5">
  <div class="kav5-tag kav5-a">
    <div class="kav5-hex"><span class="kav5-ini">KO</span></div>
    <span class="kav5-name">Kai Okada</span>
    <span class="kav5-rank">Pilot · 07</span>
    <span class="kav5-dot"></span>
  </div>
  <div class="kav5-tag kav5-b">
    <div class="kav5-hex"><span class="kav5-ini">NV</span></div>
    <span class="kav5-name">Nova Vex</span>
    <span class="kav5-rank">Eng · 03</span>
    <span class="kav5-dot"></span>
  </div>
  <div class="kav5-tag kav5-c">
    <div class="kav5-hex"><span class="kav5-ini">MI</span></div>
    <span class="kav5-name">Mimi Ren</span>
    <span class="kav5-rank">Nav · 11</span>
    <span class="kav5-dot"></span>
  </div>
</div>`
  },

  {
    id: "FD5",
    section: "feeds",
    name: "Comms Log",
    description: "Monospace comms transcript with timestamps, tagged senders, and a typing indicator.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["feed", "chat", "comms", "log", "messages"],
    code: `<style>
  .kfd5{display:flex;flex-direction:column;gap:11px;width:300px;padding:14px 16px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kfd5-head{display:flex;align-items:center;gap:8px;font-size:10px;letter-spacing:.2em;color:#7fb3cc;text-transform:uppercase}
  .kfd5-led{width:6px;height:6px;border-radius:50%;background:#2ee6ff;box-shadow:0 0 8px #2ee6ff;animation:kfd5-b 1.3s steps(2) infinite}
  @keyframes kfd5-b{50%{opacity:.2}}
  .kfd5-line{display:flex;gap:8px;font-size:10px;line-height:1.5}
  .kfd5-time{color:#2f4457;flex-shrink:0}
  .kfd5-sender{flex-shrink:0;letter-spacing:.06em}
  .kfd5-sys{color:#41617c}
  .kfd5-cy{color:#2ee6ff;text-shadow:0 0 6px rgba(46,230,255,.5)}
  .kfd5-mg{color:#ff3dc8;text-shadow:0 0 6px rgba(255,61,200,.5)}
  .kfd5-msg{color:#cfeef7}
  .kfd5-typing{display:flex;align-items:center;gap:7px;font-size:9px;letter-spacing:.18em;color:#41617c;text-transform:uppercase}
  .kfd5-dots{display:inline-flex;gap:3px}
  .kfd5-dots i{width:4px;height:4px;border-radius:50%;background:#2ee6ff;animation:kfd5-d 1.2s ease-in-out infinite}
  .kfd5-dots i:nth-child(2){animation-delay:.18s}
  .kfd5-dots i:nth-child(3){animation-delay:.36s}
  @keyframes kfd5-d{0%,100%{opacity:.15;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
  @media (prefers-reduced-motion:reduce){.kfd5-led{animation:none}.kfd5-dots i{animation:none}}
</style>
<div class="kfd5">
  <div class="kfd5-head"><span class="kfd5-led"></span>Comms · channel 09</div>
  <div class="kfd5-line"><span class="kfd5-time">09:41</span><span class="kfd5-sys">SYS · channel open</span></div>
  <div class="kfd5-line"><span class="kfd5-time">09:42</span><span class="kfd5-sender kfd5-cy">KAI</span><span class="kfd5-msg">reactor at 98%, ready for burn</span></div>
  <div class="kfd5-line"><span class="kfd5-time">09:43</span><span class="kfd5-sender kfd5-mg">NOVA</span><span class="kfd5-msg">copy — course locked to grid 09</span></div>
  <div class="kfd5-typing"><span class="kfd5-dots"><i></i><i></i><i></i></span>Mimi is transmitting</div>
</div>`
  },

  {
    id: "CL5",
    section: "calendars",
    name: "Stardate Grid",
    description: "Month grid with duty-shift markers, weekend tint, and a glowing today cell.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["calendar", "grid", "schedule", "stardate", "sci-fi"],
    code: `<style>
  .kcl5{position:relative;width:302px;padding:14px;background:linear-gradient(180deg,#0c1424,#070b15);border:1px solid rgba(46,230,255,.22);border-radius:4px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kcl5::before,.kcl5::after{content:"";position:absolute;width:11px;height:11px}
  .kcl5::before{top:-1px;left:-1px;border-top:2px solid #2ee6ff;border-left:2px solid #2ee6ff}
  .kcl5::after{bottom:-1px;right:-1px;border-bottom:2px solid #2ee6ff;border-right:2px solid #2ee6ff}
  .kcl5-head{display:flex;justify-content:space-between;align-items:baseline;font-size:10px;letter-spacing:.2em;color:#d8f4ff;text-transform:uppercase}
  .kcl5-head b{color:#2ee6ff;font-weight:600;text-shadow:0 0 8px rgba(46,230,255,.6)}
  .kcl5-week{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin:12px 0 6px;font-size:8px;letter-spacing:.14em;color:#41617c;text-align:center;text-transform:uppercase}
  .kcl5-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
  .kcl5-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:10px;color:#41617c;background:rgba(255,255,255,.015);border:1px solid transparent;border-radius:2px;position:relative}
  .kcl5-day.off{color:#2f4457}
  .kcl5-day.duty{color:#ffb9e8;background:rgba(255,61,200,.1);border-color:rgba(255,61,200,.3)}
  .kcl5-day.duty::after{content:"";position:absolute;top:2px;right:2px;width:4px;height:4px;border-radius:50%;background:#ff3dc8;box-shadow:0 0 5px #ff3dc8}
  .kcl5-day.today{color:#d9fbff;border-color:#2ee6ff;box-shadow:0 0 10px rgba(46,230,255,.35);background:rgba(46,230,255,.08);font-weight:600}
  .kcl5-day.today::before{content:"";position:absolute;top:-1px;left:-1px;width:5px;height:5px;border-top:1px solid #2ee6ff;border-left:1px solid #2ee6ff}
  .kcl5-foot{display:flex;justify-content:space-between;margin-top:10px;font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
</style>
<div class="kcl5">
  <div class="kcl5-head"><span>Stardate <b>2267.04</b></span><span>Feb 2267</span></div>
  <div class="kcl5-week"><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span></div>
  <div class="kcl5-grid">
    <span class="kcl5-day off">1</span>
    <span class="kcl5-day off">2</span>
    <span class="kcl5-day">3</span>
    <span class="kcl5-day">4</span>
    <span class="kcl5-day">5</span>
    <span class="kcl5-day off">6</span>
    <span class="kcl5-day off">7</span>
    <span class="kcl5-day">8</span>
    <span class="kcl5-day">9</span>
    <span class="kcl5-day duty">10</span>
    <span class="kcl5-day">11</span>
    <span class="kcl5-day">12</span>
    <span class="kcl5-day off">13</span>
    <span class="kcl5-day today">14</span>
    <span class="kcl5-day">15</span>
    <span class="kcl5-day">16</span>
    <span class="kcl5-day duty">17</span>
    <span class="kcl5-day">18</span>
    <span class="kcl5-day">19</span>
    <span class="kcl5-day off">20</span>
    <span class="kcl5-day off">21</span>
    <span class="kcl5-day">22</span>
    <span class="kcl5-day">23</span>
    <span class="kcl5-day duty">24</span>
    <span class="kcl5-day">25</span>
    <span class="kcl5-day">26</span>
    <span class="kcl5-day off">27</span>
    <span class="kcl5-day off">28</span>
    <span class="kcl5-day">29</span>
    <span class="kcl5-day">30</span>
    <span class="kcl5-day">31</span>
    <span class="kcl5-day off">32</span>
    <span class="kcl5-day off">33</span>
    <span class="kcl5-day">34</span>
    <span class="kcl5-day">35</span>
  </div>
  <div class="kcl5-foot"><span>duty · 3 shifts</span><span>window 04</span></div>
</div>`
  },

  {
    id: "ST5",
    section: "steps",
    name: "Launch Sequence",
    description: "Vertical launch checklist with lit rail segments and a pulsing current step.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["steps", "launch", "checklist", "timeline", "sci-fi"],
    code: `<style>
  .kst5{display:flex;flex-direction:column;padding:16px 18px;background:linear-gradient(180deg,#0b1322,#060a14);border:1px solid rgba(46,230,255,.18);border-radius:6px;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kst5-row{position:relative;display:flex;gap:12px;padding:0 0 18px}
  .kst5-row::before{content:"";position:absolute;left:11px;top:24px;bottom:-4px;width:2px;background:rgba(46,230,255,.18)}
  .kst5-row:last-child::before{display:none}
  .kst5-badge{position:relative;z-index:1;flex-shrink:0;width:24px;height:24px;border:1px solid rgba(46,230,255,.4);border-radius:3px;display:grid;place-items:center;font-size:10px;background:#070d18;color:#5d7d9c}
  .kst5-done .kst5-badge{background:rgba(46,230,255,.15);border-color:#2ee6ff;color:#2ee6ff;text-shadow:0 0 8px rgba(46,230,255,.8)}
  .kst5-now .kst5-badge{border-color:#ffb44a;color:#ffb44a;text-shadow:0 0 8px rgba(255,180,74,.8);animation:kst5-pulse 1.2s ease-in-out infinite}
  @keyframes kst5-pulse{0%,100%{opacity:1}50%{opacity:.45}}
  .kst5-body{display:flex;flex-direction:column;gap:3px;padding-top:3px}
  .kst5-name{font-size:11px;letter-spacing:.12em;color:#cfeef7;text-transform:uppercase}
  .kst5-st{font-size:9px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  .kst5-done .kst5-name{color:#5d7d9c}
  .kst5-done .kst5-st{color:#2e5a6e}
  .kst5-now .kst5-st{color:#ffb44a}
  .kst5-done::after{content:"";position:absolute;left:11px;top:24px;bottom:-4px;width:2px;background:#2ee6ff;box-shadow:0 0 6px rgba(46,230,255,.7)}
  @media (prefers-reduced-motion:reduce){.kst5-now .kst5-badge{animation:none}}
</style>
<div class="kst5">
  <div class="kst5-row kst5-done">
    <span class="kst5-badge">✓</span>
    <div class="kst5-body"><span class="kst5-name">Calibrate nav</span><span class="kst5-st">Complete</span></div>
  </div>
  <div class="kst5-row kst5-done">
    <span class="kst5-badge">✓</span>
    <div class="kst5-body"><span class="kst5-name">Pressurize tanks</span><span class="kst5-st">Complete</span></div>
  </div>
  <div class="kst5-row kst5-now">
    <span class="kst5-badge">▸</span>
    <div class="kst5-body"><span class="kst5-name">Ignition</span><span class="kst5-st">In progress</span></div>
  </div>
  <div class="kst5-row">
    <span class="kst5-badge">04</span>
    <div class="kst5-body"><span class="kst5-name">Liftoff</span><span class="kst5-st">Pending</span></div>
  </div>
</div>`
  },

  {
    id: "EM7",
    section: "empty",
    name: "Signal Lost",
    description: "No-signal screen with flickering static, a broken-link glyph, and a retry action.",
    creator: "deepseek",
    set: "neon-deck",
    tags: ["empty", "error", "signal", "static", "retry"],
    code: `<style>
  .kem7{position:relative;width:300px;padding:30px 20px;background:#04070d;border:1px solid rgba(46,230,255,.2);border-radius:6px;text-align:center;overflow:hidden;font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
  .kem7-noise{position:absolute;inset:0;background-image:radial-gradient(rgba(46,230,255,.14) 1px,transparent 1.6px);background-size:5px 5px;animation:kem7-flicker 1.4s steps(3) infinite;pointer-events:none}
  @keyframes kem7-flicker{0%,100%{opacity:.4}50%{opacity:.75}}
  .kem7-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:12px}
  .kem7-glyph{width:46px;height:46px;color:#5d7d9c}
  .kem7-title{margin:0;font-size:17px;font-weight:700;letter-spacing:.24em;color:#d9fbff;text-transform:uppercase;text-shadow:0 0 10px rgba(46,230,255,.5)}
  .kem7-sub{margin:0;font-size:10px;letter-spacing:.16em;color:#41617c;text-transform:uppercase}
  .kem7-btn{margin-top:4px;padding:9px 20px;font:inherit;font-size:10px;letter-spacing:.2em;background:transparent;border:1px solid rgba(46,230,255,.45);color:#2ee6ff;border-radius:2px;cursor:pointer;text-transform:uppercase;transition:transform .12s ease,color .15s ease,background .15s ease}
  .kem7-btn:hover{background:rgba(46,230,255,.1)}
  .kem7-btn:active{transform:scale(.97)}
  @media (prefers-reduced-motion:reduce){.kem7-noise{animation:none}}
</style>
<div class="kem7">
  <div class="kem7-noise" aria-hidden="true"></div>
  <div class="kem7-inner">
    <svg class="kem7-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M1 21h22M8 9l3 3-3 3M16 9l-3 3 3 3"/></svg>
    <p class="kem7-title">Signal lost</p>
    <p class="kem7-sub">Uplink failed · check array 07</p>
    <button type="button" class="kem7-btn">Retry</button>
  </div>
</div>`
  }
);
