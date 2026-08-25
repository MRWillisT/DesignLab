'use strict';

/* DeepSeek — "Abyss": a deep-ocean workspace in DeepSeek's signature look, one specimen per drawer (26 items).
   Every snippet shares the same design tokens so the set reads as one product:
     --ab-void  #060a13   page void
     --ab-bg    #0b1220   panel base
     --ab-raise #101b30   raised panel
     --ab-line  rgba(126,157,207,.22)  hairline chrome
     --ab-blue  #3b82f6   deep-seek blue (primary accent)
     --ab-ice   #93c5fd   light accent text
     --ab-txt   #e7eefb   soft white text
     --ab-dim   #8ea0bd   muted text
   Motifs: layered ink-navy panels, hairline 1px borders, a single crisp blue
   accent, quiet minimal chrome, clean sans-serif type. Nothing glowy — depth
   comes from stacked navy planes, not bloom. All motion is CSS-only on
   transform/opacity, wrapped in prefers-reduced-motion. */

window.DESIGN_LAB.items.push(
  {
    id: "AN25",
    section: "animations",
    set: "abyss",
    name: "Tide Line",
    description: "A single current line with a comet that crosses the sea and leaves expanding ping rings — a calm, quiet motion unlike sweepers, drifters, and cascades.",
    creator: "deepseek",
    tags: ["animation", "tide", "current", "ping", "sonar", "line", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-an25-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-an25{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:196px;padding:14px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:9px}
  .kab-an25-cap{display:flex;justify-content:space-between;align-items:center;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-an25-cap b{color:var(--ice);font-weight:800}
  .kab-an25-sea{position:relative;height:34px;border-radius:8px;background:linear-gradient(180deg,rgba(59,130,246,.06),rgba(59,130,246,.16));border:1px solid var(--line);overflow:hidden}
  .kab-an25-line{position:absolute;left:6px;right:6px;top:50%;height:1px;background:var(--line)}
  .kab-an25-comet{position:absolute;top:50%;left:0;width:26px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,var(--kab-an25-accent,#3b82f6));transform:translateY(-1px);animation:kab-an25-run 3.2s cubic-bezier(.6,.05,.35,1) infinite}
  .kab-an25-ring{position:absolute;top:50%;left:0;width:8px;height:8px;margin:-4px 0 0 -4px;border:1.5px solid var(--kab-an25-accent,#3b82f6);border-radius:50%;opacity:0;transform:scale(.3);animation:kab-an25-ping 3.2s cubic-bezier(.6,.05,.35,1) infinite}
  .kab-an25-ring.r2{animation-delay:.5s}
  .kab-an25-ring.r3{animation-delay:1s}
  @keyframes kab-an25-run{0%{left:-26px;opacity:0}8%{opacity:1}88%{opacity:1}100%{left:100%;opacity:0}}
  @keyframes kab-an25-ping{0%{left:-4px;opacity:0;transform:scale(.3)}12%{opacity:.9}45%{opacity:0;transform:scale(3.2)}100%{left:100%}}
  @media (prefers-reduced-motion:reduce){.kab-an25-comet,.kab-an25-ring{animation:none;opacity:0}}
</style>
<div class="kab-an25">
  <div class="kab-an25-cap"><span>TIDE LINE</span><b>STN-07</b></div>
  <div class="kab-an25-sea"><i class="kab-an25-line"></i><i class="kab-an25-comet"></i><i class="kab-an25-ring"></i><i class="kab-an25-ring r2"></i><i class="kab-an25-ring r3"></i></div>
</div>`
  },

  {
    id: "LO24",
    section: "loaders",
    set: "abyss",
    name: "Buoy Bob",
    description: "A lamped buoy bobs on a rope above swelling wave arcs — an ocean-weather waiting state unlike reels, marbles, rings, and brews.",
    creator: "deepseek",
    tags: ["loader", "buoy", "bob", "waves", "ocean", "lamp", "abyss"],
    tweaks: [
      { type: "color", label: "Lamp", varName: "--kab-lo24-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-lo24{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:190px;padding:14px 14px 12px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:9px;align-items:center}
  .kab-lo24-cap{width:100%;display:flex;justify-content:space-between;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-lo24-cap b{color:var(--ice);font-weight:800}
  .kab-lo24-sea{position:relative;width:100%;height:56px;border-radius:9px;background:linear-gradient(180deg,rgba(59,130,246,.05),rgba(59,130,246,.14));border:1px solid var(--line);overflow:hidden}
  .kab-lo24-rope{position:absolute;left:50%;top:0;width:1px;height:26px;background:var(--dim);margin-left:-.5px;transform-origin:50% 100%;animation:kab-lo24-rope 1.8s ease-in-out infinite}
  .kab-lo24-buoy{position:absolute;left:50%;top:24px;width:30px;height:22px;margin-left:-15px;border-radius:6px;background:linear-gradient(180deg,#1c2c4d,#0e1830);border:1px solid var(--line);animation:kab-lo24-bob 1.8s ease-in-out infinite;transform-origin:50% 0}
  .kab-lo24-lamp{position:absolute;top:4px;left:50%;width:6px;height:6px;margin-left:-3px;border-radius:50%;background:var(--kab-lo24-accent,#3b82f6);box-shadow:0 0 8px var(--kab-lo24-accent,#3b82f6);animation:kab-lo24-blink 1.8s ease-in-out infinite}
  .kab-lo24-wave{position:absolute;left:-40px;right:-40px;height:14px;border-radius:50%;border:2px solid rgba(126,157,207,.28);animation:kab-lo24-swell 3.4s linear infinite}
  .kab-lo24-wave.w1{top:36px}
  .kab-lo24-wave.w2{top:46px;border-color:rgba(126,157,207,.16);animation-duration:4.6s}
  @keyframes kab-lo24-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
  @keyframes kab-lo24-rope{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.7)}}
  @keyframes kab-lo24-blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes kab-lo24-swell{0%{transform:translateX(0)}100%{transform:translateX(40px)}}
  @media (prefers-reduced-motion:reduce){.kab-lo24-rope,.kab-lo24-buoy,.kab-lo24-lamp,.kab-lo24-wave{animation:none}}
</style>
<div class="kab-lo24">
  <div class="kab-lo24-cap"><span>BUOY</span><b>ON STATION</b></div>
  <div class="kab-lo24-sea">
    <i class="kab-lo24-rope"></i>
    <i class="kab-lo24-buoy"><i class="kab-lo24-lamp"></i></i>
    <i class="kab-lo24-wave w1"></i><i class="kab-lo24-wave w2"></i>
  </div>
</div>`
  },

  {
    id: "BA16",
    section: "badges",
    set: "abyss",
    name: "Depth Tag",
    description: "A squared station tag with a lamp, wave divider, and depth readout — a marine equipment label next to pills, gems, and hanging tags.",
    creator: "deepseek",
    tags: ["badge", "tag", "depth", "station", "marine", "lamp", "abyss"],
    tweaks: [
      { type: "color", label: "Lamp", varName: "--kab-ba16-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ba16{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;display:inline-flex;align-items:center;gap:9px;padding:7px 11px;background:var(--bg);border:1px solid var(--line);border-radius:9px}
  .kab-ba16-lamp{width:7px;height:7px;border-radius:50%;background:var(--kab-ba16-accent,#3b82f6);box-shadow:0 0 9px var(--kab-ba16-accent,#3b82f6);animation:kab-ba16-pulse 2s ease-in-out infinite}
  .kab-ba16-id{font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--txt)}
  .kab-ba16-wave{width:16px;height:6px;border-top:1px solid var(--line)}
  .kab-ba16-depth{font:700 10px/1 ui-sans-serif,system-ui,sans-serif;color:var(--ice);font-variant-numeric:tabular-nums}
  @keyframes kab-ba16-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.82)}}
  @media (prefers-reduced-motion:reduce){.kab-ba16-lamp{animation:none}}
</style>
<div class="kab-ba16"><i class="kab-ba16-lamp"></i><span class="kab-ba16-id">STN-07</span><span class="kab-ba16-wave"></span><span class="kab-ba16-depth">−840 m</span></div>`
  },

  {
    id: "BU35",
    section: "buttons",
    set: "abyss",
    name: "Lamp Button",
    description: "A pill CTA whose lamp lights and swells on hover — a quiet signal-instead-of-shimmer button among glows, slates, and capsules.",
    creator: "deepseek",
    tags: ["button", "cta", "lamp", "pill", "primary", "dive", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-bu35-accent", default: "#3b82f6" },
      { type: "range", label: "Radius", varName: "--kab-bu35-radius", min: 4, max: 40, step: 1, unit: "px", default: 999 }
    ],
    code: `<style>
  .kab-bu35{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--kab-bu35-radius:999px;display:inline-flex;align-items:center;gap:9px;padding:9px 18px 9px 12px;border:1px solid rgba(126,157,207,.35);border-radius:var(--kab-bu35-radius);background:linear-gradient(180deg,#13203c,#0e1830);color:var(--txt);font:800 11px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.1em;cursor:pointer;transition:transform .15s ease,opacity .15s ease,border-color .15s ease;box-shadow:0 6px 16px rgba(2,6,14,.5)}
  .kab-bu35:hover{border-color:var(--kab-bu35-accent,#3b82f6)}
  .kab-bu35:active{transform:scale(.96)}
  .kab-bu35-lamp{width:9px;height:9px;border-radius:50%;background:var(--kab-bu35-accent,#3b82f6);box-shadow:0 0 0 0 rgba(59,130,246,.5);transition:box-shadow .2s ease,transform .2s ease}
  .kab-bu35:hover .kab-bu35-lamp{box-shadow:0 0 12px 2px var(--kab-bu35-accent,#3b82f6);transform:scale(1.15)}
  .kab-bu35:focus-visible{outline:2px solid var(--kab-bu35-accent,#3b82f6);outline-offset:2px}
  @media (prefers-reduced-motion:reduce){.kab-bu35{transition:none}}
</style>
<button type="button" class="kab-bu35"><i class="kab-bu35-lamp"></i>DIVE</button>`
  },

  {
    id: "FO22",
    section: "forms",
    set: "abyss",
    name: "Sounding Field",
    description: "A depth input with a unit suffix, a blue focus halo, and a measuring scale of ticks under the baseline — instrument-panel form unlike plain fields and steppers.",
    creator: "deepseek",
    tags: ["form", "input", "depth", "sounding", "field", "measure", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-fo22-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-fo22{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;width:190px;display:flex;flex-direction:column;gap:6px}
  .kab-fo22-label{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-fo22-field{display:flex;align-items:center;gap:8px;padding:9px 11px;background:var(--bg);border:1px solid var(--line);border-radius:9px;transition:border-color .15s ease,box-shadow .15s ease}
  .kab-fo22-field:focus-within{border-color:var(--kab-fo22-accent,#3b82f6);box-shadow:0 0 0 3px color-mix(in srgb,var(--kab-fo22-accent,#3b82f6) 18%,transparent)}
  .kab-fo22-input{flex:1;min-width:0;background:none;border:none;outline:none;color:var(--txt);font:600 12px/1 ui-sans-serif,system-ui,sans-serif;font-variant-numeric:tabular-nums}
  .kab-fo22-input::placeholder{color:var(--dim)}
  .kab-fo22-unit{font:700 10px/1 ui-monospace,Consolas,monospace;color:var(--dim)}
  .kab-fo22-scale{display:flex;align-items:flex-end;height:10px;padding:0 12px}
  .kab-fo22-scale i{flex:1;border-left:1px solid rgba(126,157,207,.28);height:4px}
  .kab-fo22-scale i:nth-child(5n){height:8px}
  @media (prefers-reduced-motion:reduce){.kab-fo22-field{transition:none}}
</style>
<div class="kab-fo22">
  <span class="kab-fo22-label">TARGET DEPTH</span>
  <label class="kab-fo22-field"><input class="kab-fo22-input" type="text" value="840" inputmode="numeric" aria-label="Target depth"><span class="kab-fo22-unit">m</span></label>
  <div class="kab-fo22-scale"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
</div>`
  },

  {
    id: "TO20",
    section: "toggles",
    set: "abyss",
    name: "Ballast Valve",
    description: "A manifold pipe whose fill floods blue while the valve wheel cranks — a machinery toggle unlike switches, slides, and blades.",
    creator: "deepseek",
    tags: ["toggle", "switch", "valve", "ballast", "pipe", "machinery", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-to20-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-to20{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:196px;display:flex;flex-direction:column;gap:9px}
  .kab-to20-cap{display:flex;justify-content:space-between;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-to20-cap b{color:var(--ice);font-weight:800}
  .kab-to20-rig{position:relative;display:flex;align-items:center;gap:10px;padding:11px;background:var(--bg);border:1px solid var(--line);border-radius:10px}
  .kab-to20-check{position:absolute;inset:0;opacity:0;cursor:pointer;margin:0;z-index:2}
  .kab-to20-pipe{position:relative;width:64px;height:12px;border-radius:6px;background:#0a1222;border:1px solid var(--line);overflow:hidden}
  .kab-to20-fill{position:absolute;left:0;top:0;bottom:0;width:100%;background:linear-gradient(90deg,color-mix(in srgb,var(--kab-to20-accent,#3b82f6) 55%,transparent),var(--kab-to20-accent,#3b82f6));transform-origin:left center;transform:scaleX(0);transition:transform .3s ease}
  .kab-to20-valve{position:relative;width:34px;height:34px;flex:none}
  .kab-to20-wheel{position:absolute;inset:2px;border-radius:50%;border:2px solid var(--line);background:radial-gradient(circle at 50% 50%,#16233f 55%,transparent 56%);transition:transform .3s ease}
  .kab-to20-wheel::before,.kab-to20-wheel::after{content:"";position:absolute;left:50%;top:50%;width:26px;height:1.5px;background:var(--line);transform:translate(-50%,-50%)}
  .kab-to20-wheel::after{transform:translate(-50%,-50%) rotate(90deg)}
  .kab-to20-status{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--dim);transition:color .15s ease}
  .kab-to20-check:checked ~ .kab-to20-pipe .kab-to20-fill{transform:scaleX(1)}
  .kab-to20-check:checked ~ .kab-to20-valve .kab-to20-wheel{transform:rotate(160deg)}
  .kab-to20-check:checked ~ .kab-to20-status{color:var(--ice)}
  @media (prefers-reduced-motion:reduce){.kab-to20-fill,.kab-to20-wheel,.kab-to20-status{transition:none}}
</style>
<div class="kab-to20">
  <div class="kab-to20-cap"><span>BALLAST</span><b>MANIFOLD 2</b></div>
  <div class="kab-to20-rig">
    <input type="checkbox" class="kab-to20-check" aria-label="Toggle ballast valve">
    <span class="kab-to20-pipe"><span class="kab-to20-fill"></span></span>
    <span class="kab-to20-valve"><span class="kab-to20-wheel"></span></span>
    <span class="kab-to20-status">SURFACE</span>
  </div>
</div>`
  },

  {
    id: "SL16",
    section: "sliders",
    set: "abyss",
    name: "Pressure Dial",
    description: "A semicircular dial with a gradient arc, tickless face, and gently swaying needle — a radial gauge among linear scrubbers and timelines.",
    creator: "deepseek",
    tags: ["slider", "gauge", "dial", "pressure", "needle", "radial", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-sl16-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-sl16{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:176px;padding:12px 14px 11px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:6px;align-items:center}
  .kab-sl16-cap{width:100%;display:flex;justify-content:space-between;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-sl16-cap b{color:var(--ice);font-weight:800}
  .kab-sl16-needle{transform-origin:60px 68px;animation:kab-sl16-sway 3.4s ease-in-out infinite}
  .kab-sl16-val{font:800 15px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt);font-variant-numeric:tabular-nums;margin-top:2px}
  .kab-sl16-val small{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--dim)}
  @keyframes kab-sl16-sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
  @media (prefers-reduced-motion:reduce){.kab-sl16-needle{animation:none}}
</style>
<div class="kab-sl16">
  <div class="kab-sl16-cap"><span>PRESSURE</span><b>MAX 400</b></div>
  <svg viewBox="0 0 120 72" width="120" height="72" role="img" aria-label="Pressure gauge at 240 bar">
    <path d="M10 68 A50 50 0 0 1 110 68" fill="none" stroke="rgba(126,157,207,.2)" stroke-width="6" stroke-linecap="round"/>
    <path d="M10 68 A50 50 0 0 1 110 68" fill="none" stroke="var(--kab-sl16-accent,#3b82f6)" stroke-width="6" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="55"/>
    <g class="kab-sl16-needle">
      <line x1="60" y1="68" x2="60" y2="32" stroke="#e7eefb" stroke-width="2" stroke-linecap="round" transform="rotate(22 60 68)"/>
      <circle cx="60" cy="68" r="3.4" fill="#93c5fd"/>
    </g>
  </svg>
  <div class="kab-sl16-val">240 <small>BAR</small></div>
</div>`
  },

  {
    id: "CA19",
    section: "cards",
    set: "abyss",
    name: "Sonde Card",
    description: "A telemetry card with a depth-profile trace and three hairline stats — instrument readout, not a media or profile tile.",
    creator: "deepseek",
    tags: ["card", "telemetry", "sonde", "depth", "profile", "stats", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ca19-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ca19{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:186px;background:var(--bg);border:1px solid var(--line);border-radius:12px;overflow:hidden}
  .kab-ca19-head{padding:9px 11px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line)}
  .kab-ca19-name{font:800 10px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-ca19-live{display:inline-flex;align-items:center;gap:5px;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:var(--ice)}
  .kab-ca19-live i{width:5px;height:5px;border-radius:50%;background:var(--kab-ca19-accent,#3b82f6);box-shadow:0 0 7px var(--kab-ca19-accent,#3b82f6);animation:kab-ca19-blink 1.6s ease-in-out infinite}
  .kab-ca19-chart{padding:10px 11px 8px;background:linear-gradient(180deg,rgba(59,130,246,.06),transparent);border-bottom:1px solid var(--line)}
  .kab-ca19-svg{display:block;width:100%}
  .kab-ca19-stats{display:flex}
  .kab-ca19-stat{flex:1;padding:8px 11px;border-right:1px solid var(--line)}
  .kab-ca19-stat:last-child{border-right:none}
  .kab-ca19-stat b{display:block;font:700 11px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt);font-variant-numeric:tabular-nums}
  .kab-ca19-stat span{display:block;margin-top:3px;font:700 7.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--dim)}
  @keyframes kab-ca19-blink{0%,100%{opacity:1}50%{opacity:.3}}
  @media (prefers-reduced-motion:reduce){.kab-ca19-live i{animation:none}}
</style>
<div class="kab-ca19">
  <div class="kab-ca19-head"><span class="kab-ca19-name">SONDE-04</span><span class="kab-ca19-live"><i></i>LIVE</span></div>
  <div class="kab-ca19-chart">
    <svg class="kab-ca19-svg" viewBox="0 0 164 40" width="164" height="40" aria-hidden="true">
      <g stroke="rgba(126,157,207,.14)" stroke-width="1"><line x1="0" y1="10" x2="164" y2="10"/><line x1="0" y1="20" x2="164" y2="20"/><line x1="0" y1="30" x2="164" y2="30"/></g>
      <polyline points="0,32 18,28 36,30 54,22 72,24 90,16 108,18 126,10 144,12 164,4" fill="none" stroke="var(--kab-ca19-accent,#3b82f6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="164" cy="4" r="3" fill="var(--kab-ca19-accent,#3b82f6)"/>
    </svg>
  </div>
  <div class="kab-ca19-stats">
    <div class="kab-ca19-stat"><b>8.4°</b><span>TEMP</span></div>
    <div class="kab-ca19-stat"><b>412 m</b><span>DEPTH</span></div>
    <div class="kab-ca19-stat"><b>3.1</b><span>O2</span></div>
  </div>
</div>`
  },

  {
    id: "NA19",
    section: "navigation",
    set: "abyss",
    name: "Ridge Tabs",
    description: "A segmented tab bar whose active tab carries a sonar ping dot — a station-switcher distinct from underline menus and queue tabs.",
    creator: "deepseek",
    tags: ["navigation", "tabs", "segmented", "sonar", "station", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-na19-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-na19{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;width:200px;display:flex;flex-direction:column;gap:8px}
  .kab-na19-cap{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-na19-bar{display:flex;gap:4px;padding:4px;background:var(--bg);border:1px solid var(--line);border-radius:10px}
  .kab-na19-tab{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:7px 2px 6px;border-radius:7px;font:700 8.5px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.04em;color:var(--dim);cursor:pointer;transition:color .15s ease,background .15s ease}
  .kab-na19-tab:hover{color:var(--txt)}
  .kab-na19-tab.on{color:var(--txt);background:rgba(59,130,246,.08)}
  .kab-na19-tab.on::after{content:"";position:absolute;bottom:2px;width:3px;height:3px;border-radius:50%;background:var(--kab-na19-accent,#3b82f6);box-shadow:0 0 6px var(--kab-na19-accent,#3b82f6);animation:kab-na19-ping 2s ease-in-out infinite}
  @keyframes kab-na19-ping{0%,100%{opacity:1}50%{opacity:.3}}
  @media (prefers-reduced-motion:reduce){.kab-na19-tab{transition:none}.kab-na19-tab.on::after{animation:none}}
</style>
<nav class="kab-na19" aria-label="Station sections">
  <span class="kab-na19-cap">STATION</span>
  <div class="kab-na19-bar">
    <span class="kab-na19-tab">Chart</span>
    <span class="kab-na19-tab on">Sonde</span>
    <span class="kab-na19-tab">Tides</span>
    <span class="kab-na19-tab">Log</span>
  </div>
</nav>`
  },

  {
    id: "AL19",
    section: "alerts",
    set: "abyss",
    name: "Deco Stop",
    description: "A dive-computer warning with a blinking lamp, countdown, and a bar that drains — an instrument alarm instead of a toast banner.",
    creator: "deepseek",
    tags: ["alert", "warning", "deco", "dive", "countdown", "alarm", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-al19-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-al19{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:216px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:11px;display:flex;flex-direction:column;gap:9px}
  .kab-al19-row{display:flex;align-items:center;justify-content:space-between}
  .kab-al19-lamp{width:8px;height:8px;border-radius:50%;background:var(--kab-al19-accent,#3b82f6);box-shadow:0 0 10px var(--kab-al19-accent,#3b82f6);animation:kab-al19-blink 1.4s ease-in-out infinite}
  .kab-al19-title{font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--txt)}
  .kab-al19-msg{font:600 10px/1 ui-sans-serif,system-ui,sans-serif;color:var(--dim)}
  .kab-al19-time{font:800 14px/1 ui-sans-serif,system-ui,sans-serif;color:var(--ice);font-variant-numeric:tabular-nums}
  .kab-al19-track{height:4px;border-radius:2px;background:rgba(126,157,207,.16);overflow:hidden}
  .kab-al19-bar{height:100%;width:100%;background:linear-gradient(90deg,var(--kab-al19-accent,#3b82f6),#93c5fd);transform-origin:left center;transform:scaleX(.62);animation:kab-al19-drain 6s linear infinite}
  @keyframes kab-al19-blink{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes kab-al19-drain{0%{transform:scaleX(1)}100%{transform:scaleX(0)}}
  @media (prefers-reduced-motion:reduce){.kab-al19-lamp,.kab-al19-bar{animation:none}}
</style>
<div class="kab-al19" role="status">
  <div class="kab-al19-row"><span class="kab-al19-title">DECO STOP</span><i class="kab-al19-lamp"></i></div>
  <div class="kab-al19-row"><span class="kab-al19-msg">Hold at 6 m</span><span class="kab-al19-time">3:12</span></div>
  <div class="kab-al19-track"><span class="kab-al19-bar"></span></div>
</div>`
  },

  {
    id: "IC23",
    section: "icons",
    set: "abyss",
    name: "Buoy Icons",
    description: "Six 2px round-cap line glyphs — whale, buoy, sonar, depth, current, fin — on tinted chips, one unified stroke voice.",
    creator: "deepseek",
    tags: ["icons", "glyphs", "line", "marine", "sonar", "whale", "buoy", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ic23-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ic23{--bg:#0b1220;--line:rgba(126,157,207,.22);--dim:#8ea0bd;--ice:#93c5fd;width:200px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .kab-ic23-chip{display:flex;flex-direction:column;align-items:center;gap:5px;padding:9px 4px 7px;border-radius:8px;background:rgba(59,130,246,.05);border:1px solid rgba(126,157,207,.14);color:var(--ice)}
  .kab-ic23-chip:first-child{color:var(--kab-ic23-accent,#3b82f6)}
  .kab-ic23-chip svg{display:block}
  .kab-ic23-chip span{font:700 7.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:var(--dim)}
</style>
<div class="kab-ic23" role="img" aria-label="Buoy line icon set">
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19c2-7 4-12 8-12s6 5 8 12"/><circle cx="12" cy="5.5" r="1.4"/></svg><span>whale</span></div>
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v2.4"/><circle cx="12" cy="9" r="3.4"/><path d="M5 15.5h14"/><path d="M7 19h10"/></svg><span>buoy</span></div>
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/><path d="M12 5V7M19 12h-2"/></svg><span>sonar</span></div>
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 4v11"/><path d="M8 11l4 4 4-4"/><path d="M5 21h14"/></svg><span>depth</span></div>
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9c2-1.2 3-1.2 5 0s3 1.2 5 0 3-1.2 5 0"/><path d="M3 15c2-1.2 3-1.2 5 0s3 1.2 5 0 3-1.2 5 0"/></svg><span>current</span></div>
  <div class="kab-ic23-chip"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 4c-1 7-4 10-9 13 1-6 4-9 9-13z"/></svg><span>fin</span></div>
</div>`
  },

  {
    id: "PL19",
    section: "players",
    set: "abyss",
    name: "Waveform Deck",
    description: "A mini player whose sonar bars dance while the play lamp toggles — a compact transport unlike discs, capsules, and consoles.",
    creator: "deepseek",
    tags: ["player", "audio", "waveform", "bars", "sonar", "transport", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-pl19-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-pl19{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:210px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;align-items:center;gap:11px}
  .kab-pl19-play{position:relative;width:38px;height:38px;flex:none;border-radius:50%;border:1px solid rgba(126,157,207,.35);background:linear-gradient(180deg,#13203c,#0e1830);display:flex;align-items:center;justify-content:center;color:var(--kab-pl19-accent,#3b82f6);cursor:pointer;transition:transform .15s ease,opacity .15s ease}
  .kab-pl19-play:hover{transform:scale(1.06)}
  .kab-pl19-play:active{transform:scale(.94)}
  .kab-pl19-bars{flex:1;display:flex;align-items:center;gap:2.5px;height:30px}
  .kab-pl19-bars i{flex:1;border-radius:1.5px;background:linear-gradient(180deg,var(--kab-pl19-accent,#3b82f6),rgba(59,130,246,.35));transform-origin:center;animation:kab-pl19-dance 1.1s ease-in-out infinite}
  .kab-pl19-bars i:nth-child(2n){animation-duration:.9s;animation-delay:-.3s}
  .kab-pl19-bars i:nth-child(3n){animation-duration:1.3s;animation-delay:-.6s}
  .kab-pl19-meta{display:flex;flex-direction:column;gap:4px;flex:none}
  .kab-pl19-time{font:700 9.5px/1 ui-monospace,Consolas,monospace;color:var(--ice);font-variant-numeric:tabular-nums}
  .kab-pl19-stn{font:700 7px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:var(--dim)}
  @keyframes kab-pl19-dance{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}
  @media (prefers-reduced-motion:reduce){.kab-pl19-bars i{animation:none;transform:scaleY(.5)}.kab-pl19-play{transition:none}}
</style>
<div class="kab-pl19">
  <button type="button" class="kab-pl19-play" aria-label="Play" onclick="this.textContent=this.textContent==='▶'?'❚❚':'▶'">▶</button>
  <div class="kab-pl19-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <div class="kab-pl19-meta"><span class="kab-pl19-time">0:42</span><span class="kab-pl19-stn">STN-04</span></div>
</div>`
  },

  {
    id: "MO18",
    section: "modals",
    set: "abyss",
    name: "Dive Log",
    description: "A compact dialog listing recent dives with a single export action — a data-light overlay distinct from prompts, jobs, and sheets.",
    creator: "deepseek",
    tags: ["modal", "dialog", "log", "dives", "export", "overlay", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-mo18-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-mo18{--bg:#0b1220;--raise:#101b30;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;width:224px;background:var(--bg);border:1px solid var(--line);border-radius:14px;box-shadow:0 18px 40px rgba(2,6,14,.6);overflow:hidden}
  .kab-mo18-head{padding:11px 13px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}
  .kab-mo18-title{font:800 11px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-mo18-x{border:none;background:none;color:var(--dim);font-size:13px;line-height:1;cursor:pointer;padding:2px 4px}
  .kab-mo18-x:hover{color:var(--txt)}
  .kab-mo18-body{padding:4px 13px;display:flex;flex-direction:column}
  .kab-mo18-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(126,157,207,.12)}
  .kab-mo18-row:last-child{border-bottom:none}
  .kab-mo18-d{font:700 10.5px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-mo18-s{font:600 9px/1 ui-monospace,Consolas,monospace;color:var(--dim);font-variant-numeric:tabular-nums}
  .kab-mo18-foot{padding:10px 13px;border-top:1px solid var(--line);display:flex;justify-content:flex-end}
  .kab-mo18-btn{padding:7px 14px;border:none;border-radius:8px;background:var(--kab-mo18-accent,#3b82f6);color:#04101f;font:800 10px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.06em;cursor:pointer;transition:transform .15s ease,opacity .15s ease}
  .kab-mo18-btn:hover{opacity:.92}
  .kab-mo18-btn:active{transform:scale(.96)}
  @media (prefers-reduced-motion:reduce){.kab-mo18-btn{transition:none}}
</style>
<div class="kab-mo18" role="dialog" aria-label="Dive log">
  <div class="kab-mo18-head"><span class="kab-mo18-title">DIVE LOG</span><button type="button" class="kab-mo18-x" aria-label="Close">✕</button></div>
  <div class="kab-mo18-body">
    <div class="kab-mo18-row"><span class="kab-mo18-d">Dive 12</span><span class="kab-mo18-s">38 m · 42 min</span></div>
    <div class="kab-mo18-row"><span class="kab-mo18-d">Dive 11</span><span class="kab-mo18-s">24 m · 31 min</span></div>
    <div class="kab-mo18-row"><span class="kab-mo18-d">Dive 10</span><span class="kab-mo18-s">17 m · 26 min</span></div>
  </div>
  <div class="kab-mo18-foot"><button type="button" class="kab-mo18-btn">Export log</button></div>
</div>`
  },

  {
    id: "EF19",
    section: "effects",
    set: "abyss",
    name: "Light Shafts",
    description: "Underwater god-rays that sway slowly while motes drift up — a volumetric depth field unlike ribbons, glass, and grain.",
    creator: "deepseek",
    tags: ["effect", "light", "shafts", "rays", "underwater", "depth", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ef19-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ef19{--bg:#0b1220;--line:rgba(126,157,207,.22);--ice:#93c5fd;width:210px;height:118px;border-radius:12px;border:1px solid var(--line);background:linear-gradient(180deg,#0a1426,#0b1220 70%,#0e1a30);overflow:hidden;position:relative}
  .kab-ef19-beam{position:absolute;top:-30%;width:34px;height:160%;background:linear-gradient(180deg,color-mix(in srgb,var(--kab-ef19-accent,#3b82f6) 55%,#93c5fd),color-mix(in srgb,var(--kab-ef19-accent,#3b82f6) 12%,transparent) 55%,transparent);filter:blur(6px);transform-origin:50% 0;animation:kab-ef19-sway 9s ease-in-out infinite}
  .kab-ef19-beam.b1{left:14%}
  .kab-ef19-beam.b2{left:42%;animation-delay:-3s}
  .kab-ef19-beam.b3{left:70%;animation-delay:-6s}
  .kab-ef19-mote{position:absolute;width:3px;height:3px;border-radius:50%;background:var(--ice);opacity:0;animation:kab-ef19-rise 7s linear infinite}
  .kab-ef19-mote.m1{left:24%;animation-delay:1s}
  .kab-ef19-mote.m2{left:58%;animation-delay:3.4s}
  .kab-ef19-mote.m3{left:80%;animation-delay:5.2s}
  @keyframes kab-ef19-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
  @keyframes kab-ef19-rise{0%{transform:translateY(0);opacity:0}12%{opacity:.8}88%{opacity:.4}100%{transform:translateY(-108px);opacity:0}}
  @media (prefers-reduced-motion:reduce){.kab-ef19-beam,.kab-ef19-mote{animation:none}}
</style>
<div class="kab-ef19" role="img" aria-label="Underwater light shafts">
  <i class="kab-ef19-beam b1"></i><i class="kab-ef19-beam b2"></i><i class="kab-ef19-beam b3"></i>
  <i class="kab-ef19-mote m1"></i><i class="kab-ef19-mote m2"></i><i class="kab-ef19-mote m3"></i>
</div>`
  },

  {
    id: "DD11",
    section: "dragdrop",
    set: "abyss",
    name: "Anchor List",
    description: "A reorderable dive plan with grab handles and a blue drop-line indicator — a marine queue, not a media playlist.",
    creator: "deepseek",
    tags: ["drag", "drop", "reorder", "list", "dive", "plan", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-dd11-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-dd11{--bg:#0b1220;--raise:#101b30;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:216px;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:10px}
  .kab-dd11-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
  .kab-dd11-hd b{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-dd11-hd i{font:800 8px/1 ui-monospace,Consolas,monospace;font-style:normal;letter-spacing:.12em;color:var(--kab-dd11-accent,#3b82f6)}
  .kab-dd11-list{display:flex;flex-direction:column;gap:5px}
  .kab-dd11-row{display:flex;align-items:center;gap:9px;background:var(--raise);border:1px solid rgba(126,157,207,.14);border-radius:8px;padding:7px 9px;cursor:grab;user-select:none;transition:transform .15s ease,opacity .15s ease,box-shadow .15s ease}
  .kab-dd11-row:active{cursor:grabbing}
  .kab-dd11-row.dragging{opacity:.35;transform:scale(.97)}
  .kab-dd11-row .g{cursor:grab;color:var(--dim);font-size:13px;line-height:1;letter-spacing:-2px;padding-right:2px}
  .kab-dd11-row .tt{flex:1;min-width:0}
  .kab-dd11-row .tt b{display:block;font:600 10.5px/1.2 ui-sans-serif,system-ui,sans-serif;color:var(--txt);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .kab-dd11-row .tt i{display:block;font:600 8px/1.6 ui-monospace,Consolas,monospace;font-style:normal;color:var(--dim);letter-spacing:.08em}
  .kab-dd11-line{height:0;border-top:2px solid var(--kab-dd11-accent,#3b82f6);border-radius:2px;margin:0 2px;opacity:0;transition:opacity .12s ease;box-shadow:0 0 10px var(--kab-dd11-accent,#3b82f6)}
  .kab-dd11-line.show{opacity:1}
  @media (prefers-reduced-motion:reduce){.kab-dd11-row,.kab-dd11-line{transition:none}}
</style>
<div class="kab-dd11">
  <div class="kab-dd11-hd"><b>DIVE PLAN</b><i>● REORDER</i></div>
  <div class="kab-dd11-list">
    <div class="kab-dd11-row" draggable="true"><span class="g">⠿</span><span class="tt"><b>Anchor line</b><i>0–6 M</i></span></div>
    <div class="kab-dd11-row" draggable="true"><span class="g">⠿</span><span class="tt"><b>Decompression</b><i>6 M HOLD</i></span></div>
    <div class="kab-dd11-row" draggable="true"><span class="g">⠿</span><span class="tt"><b>Reef survey</b><i>22 M</i></span></div>
    <div class="kab-dd11-row" draggable="true"><span class="g">⠿</span><span class="tt"><b>Wreck pass</b><i>38 M</i></span></div>
  </div>
</div>
<script>
(function(){
  var list=document.querySelector('.kab-dd11-list'),cur=null,line=document.createElement('div');
  line.className='kab-dd11-line';line.style.display='none';
  list.addEventListener('dragstart',function(e){var r=e.target.closest('.kab-dd11-row');if(!r)return;cur=r;cur.classList.add('dragging');try{e.dataTransfer.setData('text/plain','')}catch(_){}});
  list.addEventListener('dragover',function(e){e.preventDefault();if(!cur)return;try{e.dataTransfer.dropEffect='move'}catch(_){}
    var t=e.target.closest('.kab-dd11-row');
    if(t&&t!==cur){
      var r=t.getBoundingClientRect(),before=e.clientY<r.top+r.height/2;
      line.style.display='block';
      list.insertBefore(line,before?t:t.nextSibling);
      line.classList.add('show');
    }});
  list.addEventListener('dragleave',function(e){if(!cur)return;if(e.target===list&&!list.contains(e.relatedTarget))line.classList.remove('show')});
  list.addEventListener('drop',function(e){e.preventDefault();if(!cur)return;
    if(line.parentNode===list&&line.style.display!=='none'){list.insertBefore(cur,line)}else{list.appendChild(cur)}
    line.style.display='none';line.classList.remove('show')});
  list.addEventListener('dragend',function(){if(cur){cur.classList.remove('dragging');cur=null}line.style.display='none';line.classList.remove('show')});
})();
</script>`
  },

  {
    id: "TT11",
    section: "tooltips",
    set: "abyss",
    name: "Sounding Bubble",
    description: "A sonar marker on a chart grid that pings while its anchored bubble reveals station coordinates on hover.",
    creator: "deepseek",
    tags: ["tooltip", "popover", "sonar", "marker", "map", "hover", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-tt11-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-tt11{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;position:relative;width:200px;height:96px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;align-items:center;justify-content:center}
  .kab-tt11-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(126,157,207,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(126,157,207,.07) 1px,transparent 1px);background-size:18px 18px;border-radius:12px}
  .kab-tt11-tgt{position:relative;width:10px;height:10px;border-radius:50%;background:var(--kab-tt11-accent,#3b82f6);box-shadow:0 0 10px var(--kab-tt11-accent,#3b82f6);cursor:pointer}
  .kab-tt11-tgt::before{content:"";position:absolute;inset:-4px;border:1px solid var(--kab-tt11-accent,#3b82f6);border-radius:50%;opacity:.5;animation:kab-tt11-ping 2.4s ease-out infinite}
  .kab-tt11-bub{position:absolute;bottom:calc(50% + 16px);left:50%;transform:translate(-50%,6px);padding:6px 9px;background:#13203c;border:1px solid var(--line);border-radius:8px;font:700 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.1em;color:var(--txt);white-space:nowrap;opacity:0;transition:opacity .18s ease,transform .18s ease;pointer-events:none}
  .kab-tt11-bub::after{content:"";position:absolute;top:100%;left:50%;margin-left:-4px;border:4px solid transparent;border-top-color:#13203c}
  .kab-tt11:hover .kab-tt11-bub{opacity:1;transform:translate(-50%,0)}
  @keyframes kab-tt11-ping{0%{transform:scale(.5);opacity:.6}100%{transform:scale(2.2);opacity:0}}
  @media (prefers-reduced-motion:reduce){.kab-tt11-tgt::before{animation:none}.kab-tt11-bub{transition:none}}
</style>
<div class="kab-tt11">
  <i class="kab-tt11-grid"></i>
  <span class="kab-tt11-tgt" tabindex="0" aria-label="Station marker 07"></span>
  <div class="kab-tt11-bub">STN-07 · −1180 M</div>
</div>`
  },

  {
    id: "SB7",
    section: "sidebars",
    set: "abyss",
    name: "Bulkhead Rail",
    description: "A slim vertical rail of round instrument buttons with a glowing active indicator and a rotated station label.",
    creator: "deepseek",
    tags: ["sidebar", "rail", "vertical", "icons", "instruments", "nav", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-sb7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-sb7{--bg:#0b1220;--line:rgba(126,157,207,.22);--dim:#8ea0bd;--ice:#93c5fd;width:54px;padding:10px 7px;background:var(--bg);border:1px solid var(--line);border-radius:11px;display:flex;flex-direction:column;align-items:center;gap:9px}
  .kab-sb7-logo{width:26px;height:26px;border-radius:7px;background:var(--kab-sb7-accent,#3b82f6);display:flex;align-items:center;justify-content:center;color:#04101f;font:800 11px/1 ui-sans-serif,system-ui,sans-serif}
  .kab-sb7-sep{width:26px;height:1px;background:var(--line)}
  .kab-sb7-item{position:relative;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--dim);transition:color .15s ease,background .15s ease}
  .kab-sb7-item.on{color:var(--ice);background:rgba(59,130,246,.1)}
  .kab-sb7-item.on::after{content:"";position:absolute;right:-7px;top:50%;width:2px;height:14px;margin-top:-7px;border-radius:1px;background:var(--kab-sb7-accent,#3b82f6);box-shadow:0 0 7px var(--kab-sb7-accent,#3b82f6)}
  .kab-sb7-label{writing-mode:vertical-rl;font:700 7px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;color:var(--dim)}
  @media (prefers-reduced-motion:reduce){.kab-sb7-item{transition:none}}
</style>
<nav class="kab-sb7" aria-label="Bulkhead rail">
  <span class="kab-sb7-logo">D</span>
  <span class="kab-sb7-sep"></span>
  <span class="kab-sb7-item" title="Chart">⌖</span>
  <span class="kab-sb7-item on" title="Sonde">◉</span>
  <span class="kab-sb7-item" title="Log">☰</span>
  <span class="kab-sb7-item" title="Crew">◎</span>
  <span class="kab-sb7-sep"></span>
  <span class="kab-sb7-label">STN 07</span>
</nav>`
  },

  {
    id: "CH7",
    section: "charts",
    set: "abyss",
    name: "Bathymetry Chart",
    description: "An SVG depth-profile area chart with hairline grid and a deep-water trace — seabed mapping, not a KPI sparkline.",
    creator: "deepseek",
    tags: ["chart", "bathymetry", "depth", "profile", "svg", "area", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ch7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ch7{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:210px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:8px}
  .kab-ch7-cap{display:flex;justify-content:space-between;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-ch7-cap b{color:var(--ice);font-weight:800}
  .kab-ch7-svg{display:block;width:100%}
  .kab-ch7-leg{display:flex;justify-content:space-between;font:600 7.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.1em;color:var(--dim)}
</style>
<div class="kab-ch7">
  <div class="kab-ch7-cap"><span>BATHYMETRY</span><b>TRACE 4</b></div>
  <svg class="kab-ch7-svg" viewBox="0 0 186 64" width="186" height="64" role="img" aria-label="Depth profile chart">
    <g stroke="rgba(126,157,207,.14)" stroke-width="1"><line x1="0" y1="12" x2="186" y2="12"/><line x1="0" y1="30" x2="186" y2="30"/><line x1="0" y1="48" x2="186" y2="48"/></g>
    <line x1="0" y1="62" x2="186" y2="62" stroke="rgba(126,157,207,.3)"/>
    <path d="M0,14 L20,18 L40,12 L60,24 L80,20 L100,34 L120,30 L140,42 L160,38 L186,50 L186,62 L0,62 Z" fill="url(#kab-ch7-fill)" stroke="none"/>
    <path d="M0,14 L20,18 L40,12 L60,24 L80,20 L100,34 L120,30 L140,42 L160,38 L186,50" fill="none" stroke="var(--kab-ch7-accent,#3b82f6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="186" cy="50" r="3" fill="var(--kab-ch7-accent,#3b82f6)"/>
    <defs><linearGradient id="kab-ch7-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--kab-ch7-accent,#3b82f6)" stop-opacity=".35"/><stop offset="1" stop-color="var(--kab-ch7-accent,#3b82f6)" stop-opacity="0"/></linearGradient></defs>
  </svg>
  <div class="kab-ch7-leg"><span>0 m</span><span>−400 m</span></div>
</div>`
  },

  {
    id: "TB7",
    section: "tables",
    set: "abyss",
    name: "Dive Manifest",
    description: "A hairline dive roster with lamp status dots per row — instrument-panel tabular data, not an invoice or ledger.",
    creator: "deepseek",
    tags: ["table", "manifest", "dives", "roster", "rows", "status", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-tb7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-tb7{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;width:250px;background:var(--bg);border:1px solid var(--line);border-radius:12px;overflow:hidden}
  .kab-tb7-head{padding:9px 12px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
  .kab-tb7-head b{font:800 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--txt)}
  .kab-tb7-head span{font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:var(--dim)}
  .kab-tb7-row{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid rgba(126,157,207,.1)}
  .kab-tb7-row:last-child{border-bottom:none}
  .kab-tb7-row span{flex:1;font:600 9.5px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt);font-variant-numeric:tabular-nums}
  .kab-tb7-row span.mono{font:600 8.5px/1 ui-monospace,Consolas,monospace;color:var(--dim)}
  .kab-tb7-row i{width:6px;height:6px;border-radius:50%;background:var(--kab-tb7-accent,#3b82f6);box-shadow:0 0 6px var(--kab-tb7-accent,#3b82f6)}
  .kab-tb7-row i.off{background:var(--dim);box-shadow:none}
</style>
<div class="kab-tb7">
  <div class="kab-tb7-head"><b>MANIFEST</b><span>CRUISE 07</span></div>
  <div class="kab-tb7-row"><i></i><span>09:14</span><span class="mono">38 m</span><span class="mono">42′</span><span>SONDE-04</span></div>
  <div class="kab-tb7-row"><i></i><span>08:47</span><span class="mono">24 m</span><span class="mono">31′</span><span>SONDE-04</span></div>
  <div class="kab-tb7-row"><i></i><span>08:20</span><span class="mono">17 m</span><span class="mono">26′</span><span>SONDE-07</span></div>
  <div class="kab-tb7-row"><i class="off"></i><span>07:52</span><span class="mono">—</span><span class="mono">—</span><span>STANDBY</span></div>
</div>`
  },

  {
    id: "AC7",
    section: "accordions",
    set: "abyss",
    name: "Deck Log",
    description: "Native details/summary log entries with lamp markers and a rotating caret — a ship's log, not a settings panel.",
    creator: "deepseek",
    tags: ["accordion", "disclosure", "log", "dives", "details", "entries", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ac7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ac7{--bg:#0b1220;--raise:#101b30;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;width:230px;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:8px;display:flex;flex-direction:column;gap:6px}
  .kab-ac7 details{border:1px solid rgba(126,157,207,.14);border-radius:9px;background:var(--raise)}
  .kab-ac7 summary{list-style:none;display:flex;align-items:center;gap:8px;padding:9px 11px;cursor:pointer}
  .kab-ac7 summary::-webkit-details-marker{display:none}
  .kab-ac7-dot{width:6px;height:6px;border-radius:50%;background:var(--kab-ac7-accent,#3b82f6);flex:none}
  .kab-ac7-tt{flex:1;font:700 10px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-ac7-tm{font:600 8.5px/1 ui-monospace,Consolas,monospace;color:var(--dim)}
  .kab-ac7-caret{color:var(--dim);font-size:9px;transition:transform .18s ease}
  .kab-ac7 details[open] .kab-ac7-caret{transform:rotate(90deg)}
  .kab-ac7-body{margin:0;padding:8px 11px 10px;border-top:1px solid rgba(126,157,207,.1);font:600 9.5px/1.6 ui-sans-serif,system-ui,sans-serif;color:var(--dim)}
  @media (prefers-reduced-motion:reduce){.kab-ac7-caret{transition:none}}
</style>
<div class="kab-ac7">
  <details open>
    <summary><span class="kab-ac7-dot"></span><span class="kab-ac7-tt">Dive 12 · Reef wall</span><span class="kab-ac7-tm">38 m</span><span class="kab-ac7-caret">›</span></summary>
    <p class="kab-ac7-body">North face at −38 m. Visibility 12 m, mild current from the east. Gas: 120 bar in, 44 out.</p>
  </details>
  <details>
    <summary><span class="kab-ac7-dot"></span><span class="kab-ac7-tt">Dive 11 · Wreck pass</span><span class="kab-ac7-tm">24 m</span><span class="kab-ac7-caret">›</span></summary>
    <p class="kab-ac7-body">Crossed the forward deck of the Meridian. Silt on entry; moved along the rail line.</p>
  </details>
  <details>
    <summary><span class="kab-ac7-dot"></span><span class="kab-ac7-tt">Dive 10 · Training</span><span class="kab-ac7-tm">17 m</span><span class="kab-ac7-caret">›</span></summary>
    <p class="kab-ac7-body">Buoyancy workshop — mask clears and SMB deployment inside the training bay.</p>
  </details>
</div>`
  },

  {
    id: "PS7",
    section: "pages",
    set: "abyss",
    name: "Deep Dive Hero",
    description: "A landing hero with a blue glow bloom, contour floor, and twin CTAs — one marketing block in the Abyss voice.",
    creator: "deepseek",
    tags: ["page", "hero", "section", "cta", "ocean", "landing", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-ps7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-ps7{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;position:relative;width:290px;padding:26px 24px 22px;border-radius:16px;border:1px solid var(--line);background:linear-gradient(180deg,#0a1426,#0b1220 60%,#0d1830);overflow:hidden}
  .kab-ps7::before{content:"";position:absolute;top:-40%;right:-10%;width:200px;height:220px;background:radial-gradient(circle at 30% 20%,rgba(59,130,246,.28),transparent 62%);filter:blur(8px)}
  .kab-ps7::after{content:"";position:absolute;left:0;right:0;bottom:0;height:26px;background:repeating-linear-gradient(90deg,rgba(126,157,207,.14) 0 1px,transparent 1px 16px)}
  .kab-ps7-kicker{position:relative;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.22em;color:var(--ice)}
  .kab-ps7-h{position:relative;margin-top:10px;font:800 26px/1.05 ui-sans-serif,system-ui,sans-serif;letter-spacing:-.02em;color:var(--txt)}
  .kab-ps7-h em{font-style:normal;color:var(--kab-ps7-accent,#3b82f6)}
  .kab-ps7-p{position:relative;margin-top:8px;font:500 10.5px/1.55 ui-sans-serif,system-ui,sans-serif;color:var(--dim);max-width:230px}
  .kab-ps7-btns{position:relative;margin-top:16px;display:flex;gap:8px}
  .kab-ps7-primary{padding:9px 16px;border:none;border-radius:9px;background:var(--kab-ps7-accent,#3b82f6);color:#04101f;font:800 10.5px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.05em;cursor:pointer;transition:transform .15s ease,opacity .15s ease}
  .kab-ps7-primary:hover{opacity:.92}
  .kab-ps7-primary:active{transform:scale(.97)}
  .kab-ps7-ghost{padding:9px 16px;border:1px solid var(--line);border-radius:9px;background:transparent;color:var(--txt);font:700 10.5px/1 ui-sans-serif,system-ui,sans-serif;cursor:pointer;transition:opacity .15s ease}
  .kab-ps7-ghost:hover{opacity:.8}
  @media (prefers-reduced-motion:reduce){.kab-ps7-primary,.kab-ps7-ghost{transition:none}}
</style>
<section class="kab-ps7">
  <span class="kab-ps7-kicker">STATION 07 · EXPEDITION</span>
  <h2 class="kab-ps7-h">Go <em>deeper</em> than you thought possible.</h2>
  <p class="kab-ps7-p">Live ocean telemetry, dive plans, and sonar charts — one calm surface for everything below.</p>
  <div class="kab-ps7-btns"><button type="button" class="kab-ps7-primary">Begin descent</button><button type="button" class="kab-ps7-ghost">See the charts</button></div>
</section>`
  },

  {
    id: "AV7",
    section: "avatars",
    set: "abyss",
    name: "Sub Crew",
    description: "Initial rings with depth-tick hairlines, live lamps, and a duty pill — an identity stack for a bridge watch, not a social grid.",
    creator: "deepseek",
    tags: ["avatars", "crew", "stack", "rings", "presence", "duty", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-av7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-av7{--bg:#0b1220;--raise:#101b30;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:190px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;align-items:center;gap:11px}
  .kab-av7-stack{display:flex}
  .kab-av7-ring{position:relative;width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(126,157,207,.5);background:var(--raise);display:flex;align-items:center;justify-content:center;margin-left:-8px}
  .kab-av7-ring:first-child{margin-left:0}
  .kab-av7-ring b{font:800 10px/1 ui-sans-serif,system-ui,sans-serif;color:var(--ice)}
  .kab-av7-ring .dot{position:absolute;right:-2px;bottom:-2px;width:8px;height:8px;border-radius:50%;background:var(--kab-av7-accent,#3b82f6);border:2px solid var(--bg);box-shadow:0 0 6px var(--kab-av7-accent,#3b82f6)}
  .kab-av7-ring .dot.g{background:#4ade80;box-shadow:none}
  .kab-av7-meta{display:flex;flex-direction:column;gap:5px}
  .kab-av7-name{font:800 11px/1 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-av7-pill{display:inline-flex;align-items:center;gap:5px;width:fit-content;padding:3px 7px;border-radius:999px;border:1px solid rgba(126,157,207,.3);font:700 7.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:var(--ice)}
  .kab-av7-pill i{width:4px;height:4px;border-radius:50%;background:var(--kab-av7-accent,#3b82f6)}
</style>
<div class="kab-av7">
  <div class="kab-av7-stack">
    <span class="kab-av7-ring"><b>MK</b><i class="dot"></i></span>
    <span class="kab-av7-ring"><b>TS</b><i class="dot"></i></span>
    <span class="kab-av7-ring"><b>AO</b><i class="dot g"></i></span>
    <span class="kab-av7-ring"><b>+2</b></span>
  </div>
  <div class="kab-av7-meta"><span class="kab-av7-name">Sub crew</span><span class="kab-av7-pill"><i></i>3 ON DUTY</span></div>
</div>`
  },

  {
    id: "FD7",
    section: "feeds",
    set: "abyss",
    name: "Sounding Feed",
    description: "A hairline timeline of sonde events with pulsing lamps — a live instrument log, not a chat or notification inbox.",
    creator: "deepseek",
    tags: ["feed", "timeline", "sonde", "events", "log", "live", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-fd7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-fd7{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:232px;padding:12px 0;background:var(--bg);border:1px solid var(--line);border-radius:12px}
  .kab-fd7-head{padding:0 13px 9px;display:flex;justify-content:space-between;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-fd7-head b{color:var(--ice)}
  .kab-fd7-item{position:relative;display:flex;align-items:center;gap:10px;padding:8px 13px}
  .kab-fd7-item::before{content:"";position:absolute;left:17px;top:0;bottom:0;width:1px;background:rgba(126,157,207,.16)}
  .kab-fd7-item:first-of-type::before{top:50%}
  .kab-fd7-item:last-of-type::before{bottom:50%}
  .kab-fd7-dot{position:relative;z-index:1;width:7px;height:7px;border-radius:50%;background:var(--kab-fd7-accent,#3b82f6);box-shadow:0 0 7px var(--kab-fd7-accent,#3b82f6);flex:none;animation:kab-fd7-blink 2s ease-in-out infinite}
  .kab-fd7-dot.off{background:var(--dim);box-shadow:none;animation:none}
  .kab-fd7-tt{flex:1;font:600 10px/1.3 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-fd7-tt i{display:block;font:600 8px/1.4 ui-monospace,Consolas,monospace;font-style:normal;letter-spacing:.1em;color:var(--dim)}
  .kab-fd7-tm{font:600 8px/1 ui-monospace,Consolas,monospace;color:var(--dim)}
  @keyframes kab-fd7-blink{0%,100%{opacity:1}50%{opacity:.35}}
  @media (prefers-reduced-motion:reduce){.kab-fd7-dot{animation:none}}
</style>
<div class="kab-fd7">
  <div class="kab-fd7-head"><span>SONDE FEED</span><b>LIVE</b></div>
  <div class="kab-fd7-item"><i class="kab-fd7-dot"></i><span class="kab-fd7-tt">STN-07 · temp shift<i>−1.2 °C at 40 m</i></span><span class="kab-fd7-tm">09:14</span></div>
  <div class="kab-fd7-item"><i class="kab-fd7-dot"></i><span class="kab-fd7-tt">Current spike<i>east drift 2.4 kt</i></span><span class="kab-fd7-tm">09:02</span></div>
  <div class="kab-fd7-item"><i class="kab-fd7-dot off"></i><span class="kab-fd7-tt">Dive 12 logged<i>38 m · 42 min</i></span><span class="kab-fd7-tm">08:47</span></div>
  <div class="kab-fd7-item"><i class="kab-fd7-dot off"></i><span class="kab-fd7-tt">Buoy serviced<i>battery 98%</i></span><span class="kab-fd7-tm">08:20</span></div>
</div>`
  },

  {
    id: "CL7",
    section: "calendars",
    set: "abyss",
    name: "Tide Strip",
    description: "A seven-day window of mini tide curves with a lamp-marked selected day — a scheduling strip, not a month grid.",
    creator: "deepseek",
    tags: ["calendar", "tide", "week", "strip", "curves", "schedule", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-cl7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-cl7{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:244px;padding:11px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:9px}
  .kab-cl7-cap{display:flex;justify-content:space-between;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-cl7-cap b{color:var(--ice)}
  .kab-cl7-days{display:flex;gap:5px}
  .kab-cl7-day{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;gap:5px;padding:6px 2px 5px;border-radius:8px;border:1px solid transparent;cursor:pointer;transition:border-color .15s ease,background .15s ease}
  .kab-cl7-day:hover{border-color:rgba(126,157,207,.25)}
  .kab-cl7-day.on{border-color:var(--kab-cl7-accent,#3b82f6);background:rgba(59,130,246,.08)}
  .kab-cl7-day.on::after{content:"";position:absolute;top:3px;right:3px;width:4px;height:4px;border-radius:50%;background:var(--kab-cl7-accent,#3b82f6);box-shadow:0 0 6px var(--kab-cl7-accent,#3b82f6)}
  .kab-cl7-day b{font:700 8px/1 ui-monospace,Consolas,monospace;color:var(--dim);letter-spacing:.06em}
  .kab-cl7-day.on b{color:var(--ice)}
  .kab-cl7-day svg{display:block}
  @media (prefers-reduced-motion:reduce){.kab-cl7-day{transition:none}}
</style>
<div class="kab-cl7">
  <div class="kab-cl7-cap"><span>TIDE WINDOW</span><b>WEEK 32</b></div>
  <div class="kab-cl7-days">
    <span class="kab-cl7-day"><b>MO</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,7 C5,3 8,3 11,7 C14,11 17,11 21,7" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day"><b>TU</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,9 C5,12 9,12 12,8 C15,4 18,4 21,6" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day on"><b>WE</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,5 C5,9 9,9 12,5 C15,1 18,1 21,4" fill="none" stroke="rgba(147,197,253,.9)" stroke-width="1.8" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day"><b>TH</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,8 C5,4 8,4 11,8 C14,12 17,12 21,8" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day"><b>FR</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,6 C5,3 9,3 12,7 C15,11 18,11 21,8" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day"><b>SA</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,10 C5,7 8,7 11,10 C14,13 17,13 21,9" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
    <span class="kab-cl7-day"><b>SU</b><svg viewBox="0 0 22 14" width="22" height="14" aria-hidden="true"><path d="M1,4 C5,8 9,8 12,4 C15,0 18,0 21,3" fill="none" stroke="rgba(147,197,253,.55)" stroke-width="1.6" stroke-linecap="round"/></svg></span>
  </div>
</div>`
  },

  {
    id: "ST7",
    section: "steps",
    set: "abyss",
    name: "Dive Steps",
    description: "A five-node descent plan on a hairline track with a filled progress line and a pulsing current node — a checklist, not a wizard.",
    creator: "deepseek",
    tags: ["steps", "timeline", "dive", "checklist", "progress", "nodes", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-st7-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-st7{--bg:#0b1220;--raise:#101b30;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:262px;padding:14px 13px;background:var(--bg);border:1px solid var(--line);border-radius:12px;display:flex;flex-direction:column;gap:11px}
  .kab-st7-cap{display:flex;justify-content:space-between;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--dim)}
  .kab-st7-cap b{color:var(--ice)}
  .kab-st7-track{position:relative;display:flex}
  .kab-st7-line{position:absolute;left:10px;right:10px;top:10px;height:2px;background:rgba(126,157,207,.18);border-radius:1px}
  .kab-st7-fill{position:absolute;left:10px;top:10px;width:calc(50% - 10px);height:2px;background:var(--kab-st7-accent,#3b82f6);border-radius:1px;box-shadow:0 0 8px var(--kab-st7-accent,#3b82f6)}
  .kab-st7-step{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;gap:7px}
  .kab-st7-node{position:relative;width:20px;height:20px;border-radius:50%;background:var(--raise);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font:800 8px/1 ui-monospace,Consolas,monospace;color:var(--dim)}
  .kab-st7-step.done .kab-st7-node{background:var(--kab-st7-accent,#3b82f6);border-color:var(--kab-st7-accent,#3b82f6);color:#04101f}
  .kab-st7-step.now .kab-st7-node{border-color:var(--kab-st7-accent,#3b82f6);color:var(--ice);animation:kab-st7-pulse 2s ease-in-out infinite}
  .kab-st7-label{font:700 7.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.08em;color:var(--dim);text-align:center}
  .kab-st7-step.done .kab-st7-label{color:var(--ice)}
  @keyframes kab-st7-pulse{0%,100%{box-shadow:0 0 0 4px rgba(59,130,246,.15)}50%{box-shadow:0 0 0 6px rgba(59,130,246,.05)}}
  @media (prefers-reduced-motion:reduce){.kab-st7-step.now .kab-st7-node{animation:none}}
</style>
<div class="kab-st7">
  <div class="kab-st7-cap"><span>DESCENT PLAN</span><b>STEP 3/5</b></div>
  <div class="kab-st7-track">
    <span class="kab-st7-line"></span><span class="kab-st7-fill"></span>
    <span class="kab-st7-step done"><span class="kab-st7-node">✓</span><span class="kab-st7-label">BUDDY</span></span>
    <span class="kab-st7-step done"><span class="kab-st7-node">✓</span><span class="kab-st7-label">DESCENT</span></span>
    <span class="kab-st7-step now"><span class="kab-st7-node">3</span><span class="kab-st7-label">BOTTOM</span></span>
    <span class="kab-st7-step"><span class="kab-st7-node">4</span><span class="kab-st7-label">ASCENT</span></span>
    <span class="kab-st7-step"><span class="kab-st7-node">5</span><span class="kab-st7-label">DECO</span></span>
  </div>
</div>`
  },

  {
    id: "EM9",
    section: "empty",
    set: "abyss",
    name: "First Descent",
    description: "A centered gauge ring that slowly sweeps under a quiet empty-state message and one primary action — a first-run, not a disconnect screen.",
    creator: "deepseek",
    tags: ["empty", "first-run", "no-data", "dive", "gauge", "cta", "abyss"],
    tweaks: [
      { type: "color", label: "Accent", varName: "--kab-em9-accent", default: "#3b82f6" }
    ],
    code: `<style>
  .kab-em9{--bg:#0b1220;--line:rgba(126,157,207,.22);--txt:#e7eefb;--dim:#8ea0bd;--ice:#93c5fd;width:220px;padding:22px 20px;background:var(--bg);border:1px solid var(--line);border-radius:14px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
  .kab-em9-gauge{position:relative;width:44px;height:44px;border-radius:50%;border:2px solid rgba(126,157,207,.25);display:flex;align-items:center;justify-content:center}
  .kab-em9-gauge::after{content:"";position:absolute;inset:8px;border-radius:50%;border:2px solid var(--kab-em9-accent,#3b82f6);border-top-color:transparent;animation:kab-em9-spin 3s linear infinite}
  .kab-em9-gauge b{font:800 11px/1 ui-sans-serif,system-ui,sans-serif;color:var(--ice)}
  .kab-em9-h{font:800 15px/1.2 ui-sans-serif,system-ui,sans-serif;color:var(--txt)}
  .kab-em9-p{font:500 10px/1.55 ui-sans-serif,system-ui,sans-serif;color:var(--dim);max-width:170px}
  .kab-em9-btn{margin-top:4px;padding:8px 15px;border:none;border-radius:8px;background:var(--kab-em9-accent,#3b82f6);color:#04101f;font:800 10px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.05em;cursor:pointer;transition:transform .15s ease,opacity .15s ease}
  .kab-em9-btn:hover{opacity:.92}
  .kab-em9-btn:active{transform:scale(.96)}
  @keyframes kab-em9-spin{to{transform:rotate(360deg)}}
  @media (prefers-reduced-motion:reduce){.kab-em9-gauge::after{animation:none}.kab-em9-btn{transition:none}}
</style>
<div class="kab-em9">
  <div class="kab-em9-gauge"><b>0</b></div>
  <div class="kab-em9-h">No dives logged yet</div>
  <p class="kab-em9-p">Your first descent starts here — plan a dive and it will show up in this log.</p>
  <button type="button" class="kab-em9-btn">Log first dive</button>
</div>`
  }
);
