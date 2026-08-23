'use strict';

/* ------------------------------------------------------------
   DESIGN LAB — Grok round 2 (chip #e879f9)
   Structural expansions across remaining gaps: kaleidoscope,
   film leader, wax seal, pull cord, signature pad, privacy iris,
   battery cells, thermal receipt, mega menu, push banner,
   origami glyphs, cinema stage, crop overlay, VHS tracking,
   trash chute, jigsaw snap, chart probe, identity hover-card.
   Loaded after js/data.js (AGENTS.md Option C).
   ------------------------------------------------------------ */

window.DESIGN_LAB.items.push(
  {
    id: "AN22",
    section: "animations",
    name: "Kaleidoscope Hex",
    description: "Six mirrored shards of a gradient rotate as a hexagonal kaleidoscope — a reflective fold unlike tesseracts, lattices, glitches, or pendulums.",
    creator: "grok",
    tags: ["animation","kaleidoscope","hex","mirror","rotate"],
    tweaks: [
      {
        "type": "color",
        "label": "Shard Tint",
        "varName": "--an22-tint",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  @keyframes kan22-spin{to{transform:rotate(360deg)}}\n  @keyframes kan22-ctr{to{transform:rotate(-360deg)}}\n  .kan22{width:86px;height:86px;border-radius:50%;position:relative;overflow:hidden;border:2px solid rgba(255,255,255,.14);box-shadow:0 0 18px color-mix(in srgb,var(--an22-tint,#e879f9) 35%,transparent),inset 0 0 12px rgba(0,0,0,.45)}\n  .kan22-spin{position:absolute;inset:-20%;animation:kan22-spin 9s linear infinite}\n  .kan22-shard{position:absolute;inset:18%;clip-path:polygon(50% 50%,50% 0,93% 25%);background:conic-gradient(from 0deg,var(--an22-tint,#e879f9),#f472b6,#38bdf8,#fbbf24,var(--an22-tint,#e879f9))}\n  .kan22-shard:nth-child(2){transform:rotate(60deg)}\n  .kan22-shard:nth-child(3){transform:rotate(120deg)}\n  .kan22-shard:nth-child(4){transform:rotate(180deg)}\n  .kan22-shard:nth-child(5){transform:rotate(240deg)}\n  .kan22-shard:nth-child(6){transform:rotate(300deg)}\n  .kan22-core{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--an22-tint,#e879f9));box-shadow:0 0 10px var(--an22-tint,#e879f9);animation:kan22-ctr 9s linear infinite;z-index:2}\n  @media (prefers-reduced-motion:reduce){.kan22-spin,.kan22-core{animation:none}}\n</style>\n<div class=\"kan22\">\n  <div class=\"kan22-spin\">\n    <i class=\"kan22-shard\"></i><i class=\"kan22-shard\"></i><i class=\"kan22-shard\"></i>\n    <i class=\"kan22-shard\"></i><i class=\"kan22-shard\"></i><i class=\"kan22-shard\"></i>\n  </div>\n  <i class=\"kan22-core\"></i>\n</div>"
  },
  {
    id: "LO14",
    section: "loaders",
    name: "Film Countdown",
    description: "A 3-2-1 leader with sprocket holes and stacked scale-pop numerals — a cinema countdown unlike reels, marbles, hourglasses, or coffee fills.",
    creator: "grok",
    tags: ["loader","film","countdown","leader","cinema"],
    tweaks: [
      {
        "type": "color",
        "label": "Leader Color",
        "varName": "--lo14-ink",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  @keyframes klo14-pop{0%,22%{opacity:1;transform:scale(1)}28%,100%{opacity:0;transform:scale(1.35)}}\n  .klo14{width:72px;height:72px;background:#141018;border:2px solid #2a2430;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:inset 0 0 16px #000}\n  .klo14-n{position:absolute;font:800 34px/1 ui-monospace,Consolas,monospace;color:var(--lo14-ink,#e879f9);opacity:0;animation:klo14-pop 3.6s ease-in infinite}\n  .klo14-n:nth-child(1){animation-delay:0s}\n  .klo14-n:nth-child(2){animation-delay:1.2s}\n  .klo14-n:nth-child(3){animation-delay:2.4s}\n  .klo14-h{position:absolute;top:0;bottom:0;width:8px;display:flex;flex-direction:column;justify-content:space-evenly}\n  .klo14-h.l{left:2px}.klo14-h.r{right:2px}\n  .klo14-h i{width:6px;height:5px;background:#0a0a0c;border-radius:1px;box-shadow:0 0 0 1px #3a3340}\n  @media (prefers-reduced-motion:reduce){.klo14-n{animation:none;opacity:1}.klo14-n:nth-child(n+2){display:none}}\n</style>\n<div class=\"klo14\">\n  <span class=\"klo14-n\">3</span><span class=\"klo14-n\">2</span><span class=\"klo14-n\">1</span>\n  <div class=\"klo14-h l\"><i></i><i></i><i></i><i></i><i></i></div>\n  <div class=\"klo14-h r\"><i></i><i></i><i></i><i></i><i></i></div>\n</div>"
  },
  {
    id: "BA14",
    section: "badges",
    name: "Wax Seal",
    description: "Embossed circular wax with hanging ribbon tails — a signet silhouette unlike hex seals, medals, hang tags, tickets, or gems.",
    creator: "grok",
    tags: ["badge","wax","seal","ribbon","signet"],
    tweaks: [
      {
        "type": "color",
        "label": "Wax Color",
        "varName": "--ba14-wax",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kba14{display:flex;flex-direction:column;align-items:center;width:64px}\n  .kba14-seal{width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--ba14-wax,#e879f9) 80%,#fff),var(--ba14-wax,#e879f9) 55%,color-mix(in srgb,var(--ba14-wax,#e879f9) 55%,#4a0433));box-shadow:0 6px 0 color-mix(in srgb,var(--ba14-wax,#e879f9) 45%,#000),0 10px 16px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;position:relative;z-index:1}\n  .kba14-seal span{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font:800 11px/1 Palatino,Georgia,serif;color:#3b0728;letter-spacing:.04em}\n  .kba14-r{display:flex;gap:4px;margin-top:-6px}\n  .kba14-r i{width:12px;height:28px;background:linear-gradient(180deg,var(--ba14-wax,#e879f9),#9d174d);clip-path:polygon(0 0,100% 0,85% 100%,15% 100%);opacity:.9}\n  .kba14-r i:last-child{transform:rotate(8deg);opacity:.75}\n</style>\n<div class=\"kba14\">\n  <div class=\"kba14-seal\"><span>GX</span></div>\n  <div class=\"kba14-r\"><i></i><i></i></div>\n</div>"
  },
  {
    id: "BU32",
    section: "buttons",
    name: "Pull Cord",
    description: "A hanging bead chain you yank to toggle a lamp — pull-to-actuate, unlike click, hold-to-confirm, swipe-gates, or mushroom stops.",
    creator: "grok",
    tags: ["button","pull","cord","chain","lamp","yank"],
    tweaks: [
      {
        "type": "color",
        "label": "Lamp Color",
        "varName": "--bu32-lamp",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kbu32{display:flex;flex-direction:column;align-items:center;width:48px;cursor:pointer;user-select:none}\n  .kbu32-lamp{width:28px;height:28px;border-radius:50%;background:#1a1d24;border:2px solid #6b7280;box-shadow:inset 0 2px 4px #000,0 0 0 3px #2a2e36;transition:opacity .18s ease,transform .18s ease}\n  .kbu32.on .kbu32-lamp{background:radial-gradient(circle at 40% 35%,#fff,var(--bu32-lamp,#e879f9));box-shadow:0 0 16px var(--bu32-lamp,#e879f9);border-color:transparent}\n  .kbu32-chain{display:flex;flex-direction:column;align-items:center;gap:2px;margin-top:2px;transition:transform .18s cubic-bezier(.2,.8,.2,1)}\n  .kbu32:active .kbu32-chain{transform:translateY(10px)}\n  .kbu32-chain i{width:6px;height:6px;border-radius:50%;background:#94a3b8;box-shadow:0 1px 0 #0b0d12}\n  .kbu32-chain i:last-child{width:10px;height:10px;background:#cbd5e1}\n  @media (prefers-reduced-motion:reduce){.kbu32-chain,.kbu32-lamp{transition:none}}\n</style>\n<div class=\"kbu32\" role=\"button\" tabindex=\"0\" aria-pressed=\"false\">\n  <div class=\"kbu32-lamp\"></div>\n  <div class=\"kbu32-chain\"><i></i><i></i><i></i><i></i><i></i></div>\n</div>\n<script>\n(function(){\n  var r=document.querySelector('.kbu32'); if(!r) return;\n  function tog(){ var on=r.classList.toggle('on'); r.setAttribute('aria-pressed', on?'true':'false'); }\n  r.addEventListener('click', tog);\n  r.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') tog(); });\n})();\n</script>"
  },
  {
    id: "FO19",
    section: "forms",
    name: "Signature Pad",
    description: "A dotted-baseline pad that records a pointer-drawn polyline you can clear — a handwriting capture control unlike ratings, calendars, or masked inputs.",
    creator: "grok",
    tags: ["form","signature","pad","draw","pointer"],
    tweaks: [
      {
        "type": "color",
        "label": "Ink Color",
        "varName": "--fo19-ink",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kfo19{width:188px;background:#141820;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 8px 6px}\n  .kfo19-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b}\n  .kfo19-clr{border:none;background:transparent;color:var(--fo19-ink,#e879f9);font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;cursor:pointer}\n  .kfo19-pad{position:relative;height:72px;background:#0c0f14;border-radius:6px;border:1px dashed rgba(255,255,255,.14);cursor:crosshair;touch-action:none}\n  .kfo19-pad svg{position:absolute;inset:0;width:100%;height:100%}\n  .kfo19-line{position:absolute;left:10px;right:10px;bottom:14px;border-bottom:1px dotted rgba(255,255,255,.2);pointer-events:none}\n  .kfo19-hint{margin-top:5px;font:600 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#45506a}\n</style>\n<div class=\"kfo19\">\n  <div class=\"kfo19-hd\"><span>SIGN HERE</span><button type=\"button\" class=\"kfo19-clr\">CLEAR</button></div>\n  <div class=\"kfo19-pad\">\n    <svg viewBox=\"0 0 172 72\" preserveAspectRatio=\"none\"><polyline class=\"kfo19-pl\" fill=\"none\" stroke=\"var(--fo19-ink,#e879f9)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" points=\"\"></polyline></svg>\n    <i class=\"kfo19-line\"></i>\n  </div>\n  <div class=\"kfo19-hint\">DRAW WITH POINTER</div>\n</div>\n<script>\n(function(){\n  var pad=document.querySelector('.kfo19-pad'); var pl=document.querySelector('.kfo19-pl'); var clr=document.querySelector('.kfo19-clr');\n  if(!pad||!pl) return;\n  var pts=[], drawing=false;\n  function rel(e){ var r=pad.getBoundingClientRect(); return {x:((e.clientX-r.left)/r.width)*172, y:((e.clientY-r.top)/r.height)*72}; }\n  function paint(){ try{ pl.setAttribute('points', pts.map(function(p){return p.x.toFixed(1)+','+p.y.toFixed(1)}).join(' ')); }catch(_){} }\n  pad.addEventListener('pointerdown', function(e){ drawing=true; var p=rel(e); pts.push(p); paint(); });\n  pad.addEventListener('pointermove', function(e){ if(!drawing) return; pts.push(rel(e)); paint(); });\n  pad.addEventListener('pointerup', function(){ drawing=false; });\n  pad.addEventListener('pointerleave', function(){ drawing=false; });\n  if(clr) clr.addEventListener('click', function(){ pts=[]; drawing=false; paint(); });\n})();\n</script>"
  },
  {
    id: "TO17",
    section: "toggles",
    name: "Privacy Iris",
    description: "A camera aperture whose blades scale shut to cover the lens — a privacy shutter unlike blinds, padlocks, knife switches, or dip banks.",
    creator: "grok",
    tags: ["toggle","iris","camera","privacy","aperture"],
    tweaks: [
      {
        "type": "color",
        "label": "Ring Accent",
        "varName": "--to17-ring",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kto17{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;user-select:none}\n  .kto17-body{width:56px;height:56px;border-radius:50%;background:linear-gradient(160deg,#2a2e36,#12141a);border:3px solid #3a3f48;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 2px 4px rgba(255,255,255,.08),0 6px 12px rgba(0,0,0,.4);position:relative}\n  .kto17-hole{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#7dd3fc,#0c4a6e 70%);box-shadow:0 0 0 2px var(--to17-ring,#e879f9),inset 0 0 8px #022;transition:transform .28s cubic-bezier(.2,.8,.2,1)}\n  .kto17.shut .kto17-hole{transform:scale(0.08);background:#111}\n  .kto17-lab{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:#94a3b8}\n  .kto17.shut .kto17-lab{color:var(--to17-ring,#e879f9)}\n  @media (prefers-reduced-motion:reduce){.kto17-hole{transition:none}}\n</style>\n<div class=\"kto17\" role=\"switch\" aria-checked=\"false\" tabindex=\"0\">\n  <div class=\"kto17-body\"><div class=\"kto17-hole\"></div></div>\n  <span class=\"kto17-lab\">LENS OPEN</span>\n</div>\n<script>\n(function(){\n  var r=document.querySelector('.kto17'); if(!r) return;\n  var lab=r.querySelector('.kto17-lab');\n  function tog(){ var on=r.classList.toggle('shut'); r.setAttribute('aria-checked', on?'true':'false'); if(lab) lab.textContent=on?'LENS SHUT':'LENS OPEN'; }\n  r.addEventListener('click', tog);\n  r.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') tog(); });\n})();\n</script>"
  },
  {
    id: "SL13",
    section: "sliders",
    name: "Battery Cells",
    description: "A battery silhouette whose discrete cells fill left-to-right as you scrub — a power-pack meter unlike rings, thermometers, faders, or LED dots.",
    creator: "grok",
    tags: ["slider","battery","cells","charge","power"],
    tweaks: [
      {
        "type": "color",
        "label": "Charge Color",
        "varName": "--sl13-cell",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .ksl13{display:flex;align-items:center;gap:8px}\n  .ksl13-pack{position:relative;display:flex;align-items:center;gap:3px;padding:6px 8px;background:#141820;border:2px solid #3a4150;border-radius:8px}\n  .ksl13-pack::after{content:\"\";position:absolute;right:-7px;width:6px;height:12px;background:#3a4150;border-radius:0 3px 3px 0}\n  .ksl13-pack i{width:16px;height:22px;border-radius:3px;background:rgba(255,255,255,.06);transition:opacity .12s ease,transform .12s ease}\n  .ksl13-pack i.on{background:var(--sl13-cell,#e879f9);box-shadow:0 0 8px var(--sl13-cell,#e879f9);transform:scaleY(1.04)}\n  .ksl13-in{width:110px;accent-color:var(--sl13-cell,#e879f9);cursor:pointer}\n  .ksl13-n{font:700 11px/1 ui-monospace,Consolas,monospace;color:var(--sl13-cell,#e879f9);width:32px}\n  @media (prefers-reduced-motion:reduce){.ksl13-pack i{transition:none}}\n</style>\n<div class=\"ksl13\">\n  <div class=\"ksl13-pack\"><i class=\"on\"></i><i class=\"on\"></i><i class=\"on\"></i><i></i><i></i></div>\n  <input class=\"ksl13-in\" type=\"range\" min=\"0\" max=\"100\" value=\"60\">\n  <span class=\"ksl13-n\">60%</span>\n</div>\n<script>\n(function(){\n  var pack=document.querySelector('.ksl13-pack'); var inn=document.querySelector('.ksl13-in'); var n=document.querySelector('.ksl13-n');\n  if(!pack||!inn) return;\n  var cells=pack.querySelectorAll('i');\n  function paint(){ var v=parseInt(inn.value,10)||0; if(n) n.textContent=v+'%'; for(var i=0;i<cells.length;i++){ if(v>i*20) cells[i].classList.add('on'); else cells[i].classList.remove('on'); } }\n  inn.addEventListener('input', paint);\n})();\n</script>"
  },
  {
    id: "CA16",
    section: "cards",
    name: "Thermal Receipt",
    description: "A zigzag-cut thermal slip with monospace line items and a total — a printout surface unlike boarding passes, business cards, consoles, or grids.",
    creator: "grok",
    tags: ["card","receipt","thermal","printout","commerce"],
    tweaks: [
      {
        "type": "color",
        "label": "Stamp Color",
        "varName": "--ca16-stamp",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kca16{width:148px;background:#f3eee3;color:#1c1712;padding:12px 12px 10px;font:500 9px/1.45 ui-monospace,Consolas,monospace;clip-path:polygon(0 6px,6px 0,12px 6px,18px 0,24px 6px,30px 0,36px 6px,42px 0,48px 6px,54px 0,60px 6px,66px 0,72px 6px,78px 0,84px 6px,90px 0,96px 6px,102px 0,108px 6px,114px 0,120px 6px,126px 0,132px 6px,138px 0,144px 6px,148px 0,148px calc(100% - 6px),142px 100%,136px calc(100% - 6px),130px 100%,124px calc(100% - 6px),118px 100%,112px calc(100% - 6px),106px 100%,100px calc(100% - 6px),94px 100%,88px calc(100% - 6px),82px 100%,76px calc(100% - 6px),70px 100%,64px calc(100% - 6px),58px 100%,52px calc(100% - 6px),46px 100%,40px calc(100% - 6px),34px 100%,28px calc(100% - 6px),22px 100%,16px calc(100% - 6px),10px 100%,4px calc(100% - 6px),0 100%);box-shadow:0 10px 18px rgba(0,0,0,.4)}\n  .kca16-h{text-align:center;font-weight:800;letter-spacing:.16em;font-size:10px;margin-bottom:2px}\n  .kca16-sub{text-align:center;font-size:8px;color:#5b5348;margin-bottom:8px}\n  .kca16-row{display:flex;justify-content:space-between}\n  .kca16-hr{border:none;border-top:1px dashed #b9b09f;margin:6px 0}\n  .kca16-tot{display:flex;justify-content:space-between;font-weight:800}\n  .kca16-ok{margin-top:6px;text-align:center;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;color:var(--ca16-stamp,#e879f9)}\n</style>\n<div class=\"kca16\">\n  <div class=\"kca16-h\">GROK MART</div>\n  <div class=\"kca16-sub\">22 AUG 26 · #4096</div>\n  <div class=\"kca16-row\"><span>NEON TEA</span><span>4.00</span></div>\n  <div class=\"kca16-row\"><span>WAX SEAL</span><span>2.50</span></div>\n  <div class=\"kca16-row\"><span>FILM LEADER</span><span>1.25</span></div>\n  <hr class=\"kca16-hr\">\n  <div class=\"kca16-tot\"><span>TOTAL</span><span>7.75</span></div>\n  <div class=\"kca16-ok\">★ APPROVED ★</div>\n</div>"
  },
  {
    id: "NA15",
    section: "navigation",
    name: "Mega Menu",
    description: "A top-nav item that drops a two-column panel of grouped links on hover — a mega-panel unlike trees, tab strips, hamburgers, or bottom bars.",
    creator: "grok",
    tags: ["navigation","mega","menu","dropdown","panel"],
    tweaks: [
      {
        "type": "color",
        "label": "Active Link",
        "varName": "--na15-hot",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kna15{position:relative;width:210px;background:#141820;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px 10px 10px}\n  .kna15-bar{display:flex;gap:12px;font:700 11px/1 ui-sans-serif,system-ui,sans-serif;color:#94a3b8}\n  .kna15-tr{position:relative;color:#e2e8f0;cursor:pointer;padding:6px 0}\n  .kna15-tr::after{content:\"\";position:absolute;left:0;right:0;bottom:-8px;height:10px}\n  .kna15-panel{position:absolute;left:8px;right:8px;top:36px;background:#1c2230;border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .16s ease,transform .16s ease;z-index:3;box-shadow:0 14px 28px rgba(0,0,0,.45)}\n  .kna15-tr:hover + .kna15-panel,.kna15-panel:hover{opacity:1;transform:translateY(0);pointer-events:auto}\n  .kna15-panel b{grid-column:1/-1;font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--na15-hot,#e879f9)}\n  .kna15-panel a{font:600 11px/1.3 ui-sans-serif,system-ui,sans-serif;color:#cbd5e1;text-decoration:none}\n  .kna15-panel a:hover{color:var(--na15-hot,#e879f9)}\n  .kna15-hint{margin-top:8px;font:600 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#45506a}\n  @media (prefers-reduced-motion:reduce){.kna15-panel{transition:none}}\n</style>\n<div class=\"kna15\">\n  <div class=\"kna15-bar\">\n    <span class=\"kna15-tr\">Products ▾</span>\n    <div class=\"kna15-panel\">\n      <b>LAB</b>\n      <a href=\"#\">Specimens</a><a href=\"#\">Playground</a>\n      <a href=\"#\">Drawers</a><a href=\"#\">Compare</a>\n    </div>\n    <span>Docs</span><span>Pricing</span>\n  </div>\n  <div class=\"kna15-hint\">HOVER PRODUCTS</div>\n</div>"
  },
  {
    id: "AL16",
    section: "alerts",
    name: "Push Banner",
    description: "A lock-screen push with app icon, title, body, and timestamp that dismisses on click — a system-notification silhouette unlike toasts, cookies, or snackbars.",
    creator: "grok",
    tags: ["alert","push","notification","ios","banner"],
    tweaks: [
      {
        "type": "color",
        "label": "App Icon",
        "varName": "--al16-app",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kal16{width:210px;background:rgba(28,32,44,.92);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:10px 12px;display:flex;gap:10px;box-shadow:0 12px 24px rgba(0,0,0,.45);cursor:pointer;transition:opacity .2s ease,transform .2s ease}\n  .kal16-ic{width:32px;height:32px;border-radius:9px;background:var(--al16-app,#e879f9);color:#1a0a22;font:800 11px/32px ui-sans-serif,system-ui,sans-serif;text-align:center;flex-shrink:0}\n  .kal16-body{flex:1;min-width:0}\n  .kal16-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px}\n  .kal16-top b{font:700 11px/1.2 ui-sans-serif,system-ui,sans-serif;color:#f1f5f9}\n  .kal16-top i{font:600 9px/1 ui-sans-serif,system-ui,sans-serif;font-style:normal;color:#64748b}\n  .kal16-msg{font:500 11px/1.35 ui-sans-serif,system-ui,sans-serif;color:#cbd5e1}\n  .kal16.gone{opacity:0;transform:translateY(-8px);pointer-events:none}\n  @media (prefers-reduced-motion:reduce){.kal16{transition:none}}\n</style>\n<div class=\"kal16\">\n  <div class=\"kal16-ic\">GX</div>\n  <div class=\"kal16-body\">\n    <div class=\"kal16-top\"><b>Design Lab</b><i>now</i></div>\n    <div class=\"kal16-msg\">Grok shipped a new batch — 18 specimens just landed.</div>\n  </div>\n</div>\n<script>\n(function(){\n  var r=document.querySelector('.kal16'); if(!r) return;\n  r.addEventListener('click', function(){ r.classList.toggle('gone'); setTimeout(function(){ r.classList.remove('gone'); }, 1600); });\n})();\n</script>"
  },
  {
    id: "IC20",
    section: "icons",
    name: "Origami Folds",
    description: "Four paper-fold glyphs built from shaded polygonal faces — an origami voice unlike isometric cubes, sketch strokes, dice, or seven-segment LEDs.",
    creator: "grok",
    tags: ["icon","origami","fold","paper","polygon"],
    tweaks: [
      {
        "type": "color",
        "label": "Paper Tint",
        "varName": "--ic20-paper",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kic20{display:flex;align-items:flex-end;gap:16px}\n  .kic20 i{display:block;position:relative}\n  .kic20-pl{width:28px;height:18px}\n  .kic20-pl::before{content:\"\";position:absolute;left:0;top:6px;border-style:solid;border-width:6px 20px 6px 0;border-color:transparent var(--ic20-paper,#e879f9) transparent transparent}\n  .kic20-pl::after{content:\"\";position:absolute;left:8px;top:0;border-style:solid;border-width:0 0 12px 16px;border-color:transparent transparent color-mix(in srgb,var(--ic20-paper,#e879f9) 65%,#fff) transparent}\n  .kic20-bt{width:26px;height:16px;background:linear-gradient(135deg,var(--ic20-paper,#e879f9) 50%,color-mix(in srgb,var(--ic20-paper,#e879f9) 55%,#fff) 50%);clip-path:polygon(50% 0,100% 40%,80% 100%,20% 100%,0 40%)}\n  .kic20-fx{width:22px;height:22px;background:var(--ic20-paper,#e879f9);clip-path:polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%);position:relative}\n  .kic20-fx::after{content:\"\";position:absolute;inset:0;background:color-mix(in srgb,var(--ic20-paper,#e879f9) 50%,#fff);clip-path:polygon(50% 0,50% 100%,18% 100%,0 38%)}\n  .kic20-cr{width:24px;height:20px;background:linear-gradient(90deg,color-mix(in srgb,var(--ic20-paper,#e879f9) 70%,#000) 50%,var(--ic20-paper,#e879f9) 50%);clip-path:polygon(10% 100%,0 55%,40% 0,100% 35%,70% 100%,40% 70%)}\n</style>\n<div class=\"kic20\">\n  <i class=\"kic20-pl\" title=\"plane\"></i>\n  <i class=\"kic20-bt\" title=\"boat\"></i>\n  <i class=\"kic20-fx\" title=\"fox\"></i>\n  <i class=\"kic20-cr\" title=\"crane\"></i>\n</div>"
  },
  {
    id: "PL16",
    section: "players",
    name: "Cinema Stage",
    description: "A 16:9 letterboxed stage with a giant play overlay and a sweeping playhead — a movie-screen transport unlike projectors, boomboxes, tapes, or tuners.",
    creator: "grok",
    tags: ["player","cinema","video","letterbox","stage"],
    tweaks: [
      {
        "type": "color",
        "label": "Play Accent",
        "varName": "--pl16-acc",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  @keyframes kpl16-scan{from{transform:scaleX(0)}to{transform:scaleX(1)}}\n  .kpl16{width:196px}\n  .kpl16-stage{position:relative;width:196px;height:110px;background:linear-gradient(180deg,#0b0c10,#1a1030 60%,#2a1450);border-radius:6px;overflow:hidden;cursor:pointer;box-shadow:0 8px 18px rgba(0,0,0,.5)}\n  .kpl16-bar{position:absolute;left:0;right:0;height:8px;background:#000}\n  .kpl16-bar.t{top:0}.kpl16-bar.b{bottom:0}\n  .kpl16-play{position:absolute;left:50%;top:50%;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;background:var(--pl16-acc,#e879f9);color:#1a0a22;display:flex;align-items:center;justify-content:center;font-size:13px;transition:opacity .18s ease,transform .18s ease}\n  .kpl16.on .kpl16-play{opacity:0;transform:scale(.6)}\n  .kpl16-scan{position:absolute;left:0;right:0;top:8px;bottom:8px;background:color-mix(in srgb,var(--pl16-acc,#e879f9) 18%,transparent);transform-origin:left center;transform:scaleX(0);pointer-events:none}\n  .kpl16.on .kpl16-scan{animation:kpl16-scan 8s linear infinite}\n  .kpl16-tc{margin-top:6px;display:flex;justify-content:space-between;font:700 9px/1 ui-monospace,Consolas,monospace;color:#64748b}\n  @media (prefers-reduced-motion:reduce){.kpl16-scan,.kpl16-play{animation:none;transition:none}}\n</style>\n<div class=\"kpl16\">\n  <div class=\"kpl16-stage\">\n    <i class=\"kpl16-bar t\"></i><i class=\"kpl16-bar b\"></i>\n    <i class=\"kpl16-scan\"></i>\n    <span class=\"kpl16-play\">▶</span>\n  </div>\n  <div class=\"kpl16-tc\"><span>01:24</span><span>NEON DUSK</span><span>12:00</span></div>\n</div>\n<script>\n(function(){\n  var r=document.querySelector('.kpl16'); if(!r) return;\n  var st=r.querySelector('.kpl16-stage'); var btn=r.querySelector('.kpl16-play');\n  function tog(){ var on=r.classList.toggle('on'); if(btn) btn.textContent=on?'❚❚':'▶'; }\n  if(st) st.addEventListener('click', tog);\n})();\n</script>"
  },
  {
    id: "MO15",
    section: "modals",
    name: "Crop Overlay",
    description: "A photo with a dimmed field, rule-of-thirds crop window, and click-cycled aspect — an image-crop overlay unlike lightboxes, coach marks, or share sheets.",
    creator: "grok",
    tags: ["modal","crop","overlay","photo","thirds"],
    tweaks: [
      {
        "type": "color",
        "label": "Handle Color",
        "varName": "--mo15-handle",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kmo15{width:188px}\n  .kmo15-pic{position:relative;width:188px;height:112px;background:linear-gradient(180deg,#120c28,#2a1458 40%,var(--mo15-handle,#e879f9) 72%,#fbbf24);border-radius:8px;overflow:hidden;cursor:pointer;box-shadow:0 8px 18px rgba(0,0,0,.4)}\n  .kmo15-dim{position:absolute;inset:0;box-shadow:inset 0 0 0 999px rgba(0,0,0,.45);pointer-events:none}\n  .kmo15-win{position:absolute;left:18%;top:12%;width:64%;height:76%;box-shadow:0 0 0 999px rgba(0,0,0,.5);outline:1px solid #fff;pointer-events:none;transform-origin:center center;transition:transform .2s ease}\n  .kmo15[data-mode=\"1\"] .kmo15-win{transform:scale(.9,1.08)}\n  .kmo15[data-mode=\"2\"] .kmo15-win{transform:scale(1.28,.72)}\n  .kmo15-g{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px);background-size:33.33% 33.33%;pointer-events:none}\n  .kmo15-h{position:absolute;width:8px;height:8px;background:var(--mo15-handle,#e879f9);box-shadow:0 0 0 1px #fff}\n  .kmo15-h.tl{top:-4px;left:-4px}.kmo15-h.tr{top:-4px;right:-4px}.kmo15-h.bl{bottom:-4px;left:-4px}.kmo15-h.br{bottom:-4px;right:-4px}\n  .kmo15-cap{margin-top:6px;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b;text-align:center}\n  @media (prefers-reduced-motion:reduce){.kmo15-win{transition:none}}\n</style>\n<div class=\"kmo15\" data-mode=\"0\">\n  <div class=\"kmo15-pic\">\n    <div class=\"kmo15-win\">\n      <i class=\"kmo15-g\"></i>\n      <i class=\"kmo15-h tl\"></i><i class=\"kmo15-h tr\"></i><i class=\"kmo15-h bl\"></i><i class=\"kmo15-h br\"></i>\n    </div>\n  </div>\n  <div class=\"kmo15-cap\">CLICK TO CYCLE CROP · 4:3</div>\n</div>\n<script>\n(function(){\n  var r=document.querySelector('.kmo15'); if(!r) return;\n  var cap=r.querySelector('.kmo15-cap');\n  var labels=['4:3','1:1','16:9'];\n  var pic=r.querySelector('.kmo15-pic');\n  if(!pic) return;\n  pic.addEventListener('click', function(){\n    var m=(parseInt(r.getAttribute('data-mode'),10)||0)+1; if(m>2) m=0;\n    r.setAttribute('data-mode', String(m));\n    if(cap) cap.textContent='CLICK TO CYCLE CROP · '+labels[m];\n  });\n})();\n</script>"
  },
  {
    id: "EF16",
    section: "effects",
    name: "VHS Tracking",
    description: "Horizontal tracking bands drift down a noisy field with a TRACKING OSD — analog tape distortion unlike CRT scanlines, RGB glitch, or neon signs.",
    creator: "grok",
    tags: ["effect","vhs","tracking","analog","tape"],
    tweaks: [
      {
        "type": "color",
        "label": "OSD Color",
        "varName": "--ef16-osd",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  @keyframes kef16-drift{from{transform:translateY(-20px)}to{transform:translateY(90px)}}\n  @keyframes kef16-jitter{0%,100%{transform:translateX(0)}30%{transform:translateX(1px)}60%{transform:translateX(-1px)}}\n  .kef16{position:relative;width:168px;height:92px;background:repeating-linear-gradient(180deg,#141018 0 2px,#1a1520 2px 4px);border-radius:4px;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#d6c7b0;font:800 13px/1 ui-monospace,Consolas,monospace;letter-spacing:.2em}\n  .kef16-txt{animation:kef16-jitter 0.2s step-end infinite;position:relative;z-index:1}\n  .kef16-band{position:absolute;left:-10%;right:-10%;height:10px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.18),transparent);opacity:.7;animation:kef16-drift 2.4s linear infinite;pointer-events:none}\n  .kef16-band.b{animation-delay:-1.2s;height:7px;opacity:.45}\n  .kef16-osd{position:absolute;left:8px;bottom:8px;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--ef16-osd,#e879f9);z-index:2}\n  @media (prefers-reduced-motion:reduce){.kef16-band,.kef16-txt{animation:none}}\n</style>\n<div class=\"kef16\">\n  <span class=\"kef16-txt\">SIGNAL</span>\n  <i class=\"kef16-band\"></i><i class=\"kef16-band b\"></i>\n  <span class=\"kef16-osd\">TRACKING ▬▬▭</span>\n</div>"
  },
  {
    id: "DD7",
    section: "dragdrop",
    name: "Trash Chute",
    description: "Drag a file chip onto a hinged trash whose lid rotates open and consumes the chip — a destroy-on-drop well unlike reorder, hoppers, snap trays, or swipes.",
    creator: "grok",
    tags: ["drag","drop","trash","delete","consume","lid"],
    tweaks: [
      {
        "type": "color",
        "label": "Lid Accent",
        "varName": "--dd7-lid",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .kdd7{width:200px;display:flex;align-items:flex-end;justify-content:space-between;gap:12px}\n  .kdd7-bank{display:flex;flex-direction:column;gap:6px}\n  .kdd7-file{padding:6px 10px;background:#1a2130;border:1px solid rgba(255,255,255,.12);border-radius:8px;font:700 10px/1 ui-sans-serif,system-ui,sans-serif;color:#e2e8f0;cursor:grab;transition:opacity .15s ease,transform .15s ease}\n  .kdd7-file.dragging{opacity:.3;transform:scale(.95)}\n  .kdd7-file.gone{opacity:0;transform:scale(.6);pointer-events:none}\n  .kdd7-can{width:54px;display:flex;flex-direction:column;align-items:center}\n  .kdd7-lid{width:48px;height:8px;background:var(--dd7-lid,#e879f9);border-radius:3px 3px 0 0;transform-origin:8% 80%;transition:transform .18s ease}\n  .kdd7-can.open .kdd7-lid{transform:rotate(-42deg)}\n  .kdd7-body{width:40px;height:44px;background:#1c2230;border:2px solid #3a4150;border-top:none;border-radius:0 0 6px 6px;display:flex;align-items:center;justify-content:center;font:800 8px/1 ui-monospace,Consolas,monospace;color:#64748b}\n  .kdd7-hint{width:100%;margin-top:8px;font:600 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#45506a}\n  @media (prefers-reduced-motion:reduce){.kdd7-lid,.kdd7-file{transition:none}}\n</style>\n<div class=\"kdd7-wrap\">\n  <div class=\"kdd7\">\n    <div class=\"kdd7-bank\">\n      <div class=\"kdd7-file\" draggable=\"true\">draft_v3.mov</div>\n      <div class=\"kdd7-file\" draggable=\"true\">scratch.wav</div>\n      <div class=\"kdd7-file\" draggable=\"true\">old_poster.png</div>\n    </div>\n    <div class=\"kdd7-can\">\n      <div class=\"kdd7-lid\"></div>\n      <div class=\"kdd7-body\">BIN</div>\n    </div>\n  </div>\n  <div class=\"kdd7-hint\">DRAG A FILE ONTO THE BIN</div>\n</div>\n<script>\n(function(){\n  var root=document.querySelector('.kdd7-wrap'); if(!root) return;\n  var can=root.querySelector('.kdd7-can'); var cur=null;\n  root.addEventListener('dragstart', function(e){\n    var t=e.target.closest('.kdd7-file'); if(!t) return; cur=t; t.classList.add('dragging');\n    try{ e.dataTransfer.setData('text/plain','file'); }catch(_){}\n  });\n  root.addEventListener('dragend', function(){ if(cur){ cur.classList.remove('dragging'); cur=null; } if(can) can.classList.remove('open'); });\n  if(can){\n    can.addEventListener('dragover', function(e){ e.preventDefault(); can.classList.add('open'); });\n    can.addEventListener('dragleave', function(){ can.classList.remove('open'); });\n    can.addEventListener('drop', function(e){ e.preventDefault(); can.classList.remove('open'); if(cur){ cur.classList.add('gone'); cur.classList.remove('dragging'); cur=null; } });\n  }\n})();\n</script>"
  },
  {
    id: "DD8",
    section: "dragdrop",
    name: "Jigsaw Snap",
    description: "Drag a tabbed puzzle piece onto a matching ghost silhouette where it snaps home — a shape-fit drop unlike generic slot trays or bin transfers.",
    creator: "grok",
    tags: ["drag","drop","puzzle","jigsaw","snap","fit"],
    tweaks: [
      {
        "type": "color",
        "label": "Piece Color",
        "varName": "--dd8-piece",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  @keyframes kdd8-pop{0%{transform:scale(.7);opacity:.4}100%{transform:scale(1);opacity:1}}\n  .kdd8{width:200px;display:flex;align-items:center;gap:16px}\n  .kdd8-board{width:88px;height:72px;background:#141820;border:1px dashed rgba(255,255,255,.16);border-radius:8px;display:flex;align-items:center;justify-content:center;transition:border-color .15s ease,background .15s ease}\n  .kdd8-board.over{border-color:var(--dd8-piece,#e879f9);background:rgba(232,121,249,.08)}\n  .kdd8-ghost,.kdd8-piece{width:56px;height:44px;clip-path:polygon(0 8px,18px 8px,18px 0,34px 0,34px 8px,48px 8px,56px 22px,48px 36px,34px 36px,34px 44px,18px 44px,18px 36px,0 36px);background:rgba(255,255,255,.06)}\n  .kdd8-piece{background:linear-gradient(135deg,var(--dd8-piece,#e879f9),#a21caf);cursor:grab;box-shadow:0 4px 10px rgba(0,0,0,.35)}\n  .kdd8-piece.dragging{opacity:.3}\n  .kdd8-board .kdd8-piece{animation:kdd8-pop .25s ease;cursor:default}\n  .kdd8-cap{font:700 8px/1.4 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#64748b;margin-top:8px}\n  @media (prefers-reduced-motion:reduce){.kdd8-piece{animation:none}.kdd8-board{transition:none}}\n</style>\n<div class=\"kdd8-wrap\">\n  <div class=\"kdd8\">\n    <div class=\"kdd8-board\"><div class=\"kdd8-ghost\"></div></div>\n    <div class=\"kdd8-piece\" draggable=\"true\"></div>\n  </div>\n  <div class=\"kdd8-cap\">FIT THE PIECE TO THE GHOST</div>\n</div>\n<script>\n(function(){\n  var root=document.querySelector('.kdd8-wrap'); if(!root) return;\n  var board=root.querySelector('.kdd8-board'); var piece=root.querySelector('.kdd8-piece'); var cur=null;\n  if(piece) piece.addEventListener('dragstart', function(e){ cur=piece; piece.classList.add('dragging'); try{ e.dataTransfer.setData('text/plain','piece'); }catch(_){} });\n  root.addEventListener('dragend', function(){ if(piece) piece.classList.remove('dragging'); if(board) board.classList.remove('over'); cur=null; });\n  if(board){\n    board.addEventListener('dragover', function(e){ e.preventDefault(); board.classList.add('over'); });\n    board.addEventListener('dragleave', function(){ board.classList.remove('over'); });\n    board.addEventListener('drop', function(e){ e.preventDefault(); board.classList.remove('over'); if(!cur) return; var g=board.querySelector('.kdd8-ghost'); if(g) g.remove(); board.appendChild(cur); cur.classList.remove('dragging'); cur=null; var cap=root.querySelector('.kdd8-cap'); if(cap) cap.textContent='SNAPPED · FIT'; });\n  }\n})();\n</script>"
  },
  {
    id: "TT7",
    section: "tooltips",
    name: "Chart Probe",
    description: "Hover a sparkline and a hairline plus value tag track the nearest bar — a data-probe tooltip unlike loupes, definitions, link previews, or shortcut lists.",
    creator: "grok",
    tags: ["tooltip","chart","probe","sparkline","datapoint"],
    tweaks: [
      {
        "type": "color",
        "label": "Bar Color",
        "varName": "--tt7-bar",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .ktt7{width:200px;position:relative}\n  .ktt7-chart{position:relative;height:78px;background:#141820;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 10px 8px;display:flex;align-items:flex-end;gap:6px;cursor:crosshair}\n  .ktt7-chart b{flex:1;background:color-mix(in srgb,var(--tt7-bar,#e879f9) 55%,#1e293b);border-radius:3px 3px 0 0;transform-origin:bottom center;transition:opacity .12s ease}\n  .ktt7-chart b.on{background:var(--tt7-bar,#e879f9);box-shadow:0 0 8px var(--tt7-bar,#e879f9)}\n  .ktt7-tip{position:absolute;top:4px;left:0;background:#1c2230;border:1px solid rgba(255,255,255,.12);border-radius:6px;padding:3px 6px;font:700 9px/1 ui-monospace,Consolas,monospace;color:var(--tt7-bar,#e879f9);opacity:0;pointer-events:none;transform:translateX(-50%);transition:opacity .12s ease,transform .12s ease;z-index:2}\n  .ktt7-chart:hover .ktt7-tip{opacity:1}\n  .ktt7-hint{margin-top:6px;font:600 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#45506a}\n  @media (prefers-reduced-motion:reduce){.ktt7-tip,.ktt7-chart b{transition:none}}\n</style>\n<div class=\"ktt7\">\n  <div class=\"ktt7-chart\">\n    <span class=\"ktt7-tip\">0</span>\n    <b style=\"height:28%\"></b><b style=\"height:46%\"></b><b style=\"height:62%\"></b><b style=\"height:40%\"></b><b style=\"height:78%\"></b><b style=\"height:54%\"></b><b style=\"height:88%\"></b>\n  </div>\n  <div class=\"ktt7-hint\">HOVER BARS FOR VALUES</div>\n</div>\n<script>\n(function(){\n  var chart=document.querySelector('.ktt7-chart'); if(!chart) return;\n  var tip=chart.querySelector('.ktt7-tip'); var bars=chart.querySelectorAll('b');\n  var vals=[28,46,62,40,78,54,88];\n  chart.addEventListener('mousemove', function(e){\n    var r=chart.getBoundingClientRect(); var x=e.clientX-r.left; var i=Math.max(0, Math.min(bars.length-1, Math.floor((x/r.width)*bars.length)));\n    for(var n=0;n<bars.length;n++){ if(n===i) bars[n].classList.add('on'); else bars[n].classList.remove('on'); }\n    if(tip){ tip.textContent=vals[i]+'%'; tip.style.left=x+'px'; }\n  });\n  chart.addEventListener('mouseleave', function(){ for(var n=0;n<bars.length;n++) bars[n].classList.remove('on'); });\n})();\n</script>"
  },
  {
    id: "TT8",
    section: "tooltips",
    name: "Identity Card",
    description: "Hover a handle and a follow-card with avatar, name, and action lifts out — a person hover-card unlike URL unfurls, definition pops, or checklist menus.",
    creator: "grok",
    tags: ["tooltip","hover-card","identity","profile","follow"],
    tweaks: [
      {
        "type": "color",
        "label": "Follow Color",
        "varName": "--tt8-acc",
        "default": "#e879f9"
      }
    ],
    code: "<style>\n  .ktt8{position:relative;width:200px;min-height:88px}\n  .ktt8-who{display:inline-flex;align-items:center;gap:8px;cursor:pointer}\n  .ktt8-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--tt8-acc,#e879f9),#7c3aed);display:flex;align-items:center;justify-content:center;font:800 9px/1 ui-sans-serif,system-ui,sans-serif;color:#1a0a22}\n  .ktt8-who b{font:700 12px/1 ui-sans-serif,system-ui,sans-serif;color:#e2e8f0}\n  .ktt8-card{position:absolute;left:0;top:40px;width:188px;background:#161a24;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px;box-shadow:0 16px 32px rgba(0,0,0,.5);opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .16s ease,transform .16s ease;z-index:4}\n  .ktt8-who:hover + .ktt8-card,.ktt8-card:hover{opacity:1;transform:translateY(0);pointer-events:auto}\n  .ktt8-card .row{display:flex;align-items:center;gap:10px;margin-bottom:8px}\n  .ktt8-av.lg{width:36px;height:36px;font-size:11px}\n  .ktt8-meta b{display:block;font:700 12px/1.2 ui-sans-serif,system-ui,sans-serif;color:#f1f5f9}\n  .ktt8-meta i{font:600 10px/1.3 ui-sans-serif,system-ui,sans-serif;font-style:normal;color:#64748b}\n  .ktt8-go{width:100%;border:none;border-radius:999px;padding:7px 0;background:var(--tt8-acc,#e879f9);color:#1a0a22;font:800 11px/1 ui-sans-serif,system-ui,sans-serif;cursor:pointer}\n  .ktt8-go.on{background:#1e293b;color:#e2e8f0;border:1px solid rgba(255,255,255,.12)}\n  @media (prefers-reduced-motion:reduce){.ktt8-card{transition:none}}\n</style>\n<div class=\"ktt8\">\n  <div class=\"ktt8-who\"><span class=\"ktt8-av\">GX</span><b>@grok</b></div>\n  <div class=\"ktt8-card\">\n    <div class=\"row\"><span class=\"ktt8-av lg\">GX</span><span class=\"ktt8-meta\"><b>Grok</b><i>@grok · xAI</i></span></div>\n    <button type=\"button\" class=\"ktt8-go\">Follow</button>\n  </div>\n</div>\n<script>\n(function(){\n  var btn=document.querySelector('.ktt8-go'); if(!btn) return;\n  btn.addEventListener('click', function(e){ e.preventDefault(); var on=btn.classList.toggle('on'); btn.textContent=on?'Following':'Follow'; });\n})();\n</script>"
  }
);
