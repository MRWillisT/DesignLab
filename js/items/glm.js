'use strict';

/* ------------------------------------------------------------
   DESIGN LAB — GLM-5.2 batch (chip #eab308)
   Original data.js items migrated here via AGENTS.md Option C
   so the shared registry file stays lean. Loaded after data.js.
   ------------------------------------------------------------ */

window.DESIGN_LAB.items.push(
    {
      id: "AN14",
      section: "animations",
      name: "Domino Cascade",
      description: "Physical dominoes topple left-to-right in a staggered falling wave, then spring back upright — a mechanical cascade unlike every pulse, blob, orbit, and flip in the drawer.",
      creator: "glm-5-2",
      tags: ["animation","domino","topple","wave","mechanical","cascade"],
      tweaks: [
        { type: "color", label: "Tile Face", varName: "--glm-an14", default: "#eab308" }
      ],
      code: "<style>\n  @keyframes kglm-dom-fall{0%{transform:rotate(0deg)}18%{transform:rotate(96deg)}28%{transform:rotate(96deg) translateY(2px)}46%{transform:rotate(0deg)}100%{transform:rotate(0deg)}}\n  .kglm-dom{display:inline-flex;align-items:flex-end;gap:3px;height:66px;padding:0 4px 10px;border-bottom:2px solid rgba(255,255,255,.12)}\n  .kglm-dom i{width:9px;height:40px;border-radius:2px 2px 1px 1px;background:linear-gradient(180deg,var(--glm-an14,#eab308) 0%,color-mix(in srgb,var(--glm-an14,#eab308) 40%,#150e06) 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.25);transform-origin:50% 100%;animation:kglm-dom-fall 5s cubic-bezier(.45,.05,.4,1) infinite}\n  .kglm-dom i:nth-child(2){animation-delay:.11s}\n  .kglm-dom i:nth-child(3){animation-delay:.22s}\n  .kglm-dom i:nth-child(4){animation-delay:.33s}\n  .kglm-dom i:nth-child(5){animation-delay:.44s}\n  .kglm-dom i:nth-child(6){animation-delay:.55s}\n  .kglm-dom i:nth-child(7){animation-delay:.66s}\n  .kglm-dom i:nth-child(8){animation-delay:.77s}\n  .kglm-dom i:nth-child(9){animation-delay:.88s}\n  .kglm-dom i:nth-child(10){animation-delay:.99s}\n  @media (prefers-reduced-motion:reduce){.kglm-dom i{animation:none}}\n</style>\n<div class=\"kglm-dom\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>"
    },

    {
      id: "BA10",
      section: "badges",
      name: "Hex Seal",
      description: "Six-sided classified-grade hex badge with inner dark panel and engraved lettering — the only polygonal silhouette in a drawer of pills, diamonds, ribbons, and tickets.",
      creator: "glm-5-2",
      tags: ["badge","hexagon","seal","polygon","military"],
      tweaks: [
        { type: "color", label: "Seal Gold", varName: "--glm-ba10", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-hex{position:relative;width:76px;height:86px;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:linear-gradient(160deg,color-mix(in srgb,var(--glm-ba10,#eab308) 88%,#fff),var(--glm-ba10,#eab308) 40%,color-mix(in srgb,var(--glm-ba10,#eab308) 50%,#000));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:default;box-shadow:0 10px 20px rgba(0,0,0,.45);transition:transform .18s ease}\n  .kglm-hex:hover{transform:translateY(-3px)}\n  .kglm-hex::before{content:\"\";position:absolute;inset:7px;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:#151821}\n  .kglm-hex b{position:relative;font:800 12px/1 ui-monospace,Consolas,monospace;letter-spacing:.16em;color:var(--glm-ba10,#eab308);text-shadow:0 0 10px color-mix(in srgb,var(--glm-ba10,#eab308) 60%,transparent)}\n  .kglm-hex small{position:relative;font:700 6.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.3em;color:#64748b}\n  @media (prefers-reduced-motion:reduce){.kglm-hex{transition:none}}\n</style>\n<div class=\"kglm-hex\"><b>GLM-52</b><small>SECURE</small></div>"
    },

    {
      id: "BU28",
      section: "buttons",
      name: "Swipe to Confirm",
      description: "A gate you operate by dragging a handle across a pill until it latches — the only drag-driven button in the drawer, versus every click, hover, and press model.",
      creator: "glm-5-2",
      tags: ["button","swipe","drag","confirm","gate","slide"],
      tweaks: [
        { type: "color", label: "Accent", varName: "--glm-bu28", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-swipe{position:relative;width:232px;height:46px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:999px;overflow:hidden;box-shadow:inset 0 1px 3px rgba(0,0,0,.35)}\n  .kglm-swipe input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0;cursor:pointer;z-index:4}\n  .kglm-swipe .fill{position:absolute;left:0;top:0;bottom:0;width:0%;background:linear-gradient(90deg,color-mix(in srgb,var(--glm-bu28,#eab308) 65%,transparent),color-mix(in srgb,var(--glm-bu28,#eab308) 30%,transparent));border-radius:999px}\n  .kglm-swipe .lbl{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:700 10px/1 ui-monospace,Consolas,monospace;letter-spacing:.22em;color:#aab4c3;z-index:1;pointer-events:none}\n  .kglm-swipe .k{position:absolute;top:4px;left:4px;width:38px;height:38px;border-radius:50%;background:linear-gradient(160deg,#ffe9a3,var(--glm-bu28,#eab308) 75%);display:flex;align-items:center;justify-content:center;font-size:15px;color:#3b2b00;z-index:2;box-shadow:0 3px 8px rgba(0,0,0,.5);pointer-events:none}\n  .kglm-swipe.armed .fill{background:linear-gradient(90deg,#10b981,#34d399)}\n  .kglm-swipe.armed .k{background:linear-gradient(160deg,#d1fae5,#10b981);color:#053b2a}\n  .kglm-swipe.armed .lbl{color:#6ee7b7}\n</style>\n<div class=\"kglm-swipe\">\n  <input type=\"range\" min=\"0\" max=\"100\" value=\"0\" oninput=\"var s=this.closest('.kglm-swipe');s.querySelector('.fill').style.width=this.value+'%';s.querySelector('.k').style.left=(4+this.value*1.64)+'px';if(+this.value>65){s.classList.add('armed');s.querySelector('.lbl').textContent='CONFIRMED'}else{s.classList.remove('armed');s.querySelector('.lbl').textContent='SWIPE TO CONFIRM'}\">\n  <span class=\"fill\"></span>\n  <span class=\"lbl\">SWIPE TO CONFIRM</span>\n  <span class=\"k\">→</span>\n</div>"
    },

    {
      id: "FO13",
      section: "forms",
      name: "Vault Field",
      description: "A passphrase field with reveal-eye toggle and a live three-bar entropy meter that re-grades as you type — a diagnostic control unlike every single-line input in the drawer.",
      creator: "glm-5-2",
      tags: ["form","password","vault","reveal","entropy","meter"],
      tweaks: [
        { type: "color", label: "Focus Accent", varName: "--glm-fo13", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-vault{width:min(100%,210px);background:#131720;border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:10px 12px}\n  .kglm-vault .tag{font:700 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b;margin-bottom:7px}\n  .kglm-vault .row{display:flex;align-items:center;gap:6px;background:#0c0f15;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:0 6px 0 11px;transition:border-color .18s ease,box-shadow .18s ease}\n  .kglm-vault .row:focus-within{border-color:var(--glm-fo13,#eab308);box-shadow:0 0 12px color-mix(in srgb,var(--glm-fo13,#eab308) 25%,transparent)}\n  .kglm-vault input{flex:1;min-width:0;height:34px;background:none;border:none;outline:none;color:#f1f5f9;font:600 12.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.04em}\n  .kglm-vault .eye{border:none;background:none;font-size:14px;line-height:1;color:#94a3b8;cursor:pointer;padding:4px 2px}\n  .kglm-vault .meter{display:flex;gap:4px;margin-top:7px}\n  .kglm-vault .meter i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.09);transition:background .18s ease}\n  .kglm-vault.has1 .meter i:nth-child(1){background:#f87171}\n  .kglm-vault.has2 .meter i:nth-child(-n+2){background:var(--glm-fo13,#fbbf24)}\n  .kglm-vault.has3 .meter i{background:#34d399}\n  .kglm-vault .grade{display:flex;justify-content:space-between;margin-top:6px;font:700 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b}\n  .kglm-vault .grade b{color:#94a3b8}\n  @media (prefers-reduced-motion:reduce){.kglm-vault .row{transition:none}}\n</style>\n<div class=\"kglm-vault has1 has2\">\n  <div class=\"tag\">PASSPHRASE · PROTECTED</div>\n  <div class=\"row\">\n    <input type=\"password\" value=\"aurora7\" oninput=\"var v=this.closest('.kglm-vault'),n=this.value.length;v.classList.toggle('has1',n>0);v.classList.toggle('has2',n>=4);v.classList.toggle('has3',n>=8);v.querySelector('.grade b').textContent=n>=8?'STRONG':n>=4?'MEDIUM':'WEAK'\">\n    <button type=\"button\" class=\"eye\" onclick=\"var i=this.previousElementSibling;i.type=i.type==='password'?'text':'password';this.textContent=i.type==='password'?'👁':'🙈'\">👁</button>\n  </div>\n  <div class=\"meter\"><i></i><i></i><i></i></div>\n  <div class=\"grade\"><span>ENTROPY</span><b>MEDIUM</b></div>\n</div>"
    },

    {
      id: "FO14",
      section: "forms",
      name: "Palette Picker",
      description: "A grid of gradient swatches that reports the selection back in hex — a pick-by-color interaction model no other form control in the drawer has.",
      creator: "glm-5-2",
      tags: ["form","palette","swatch","color","picker"],
      code: "<style>\n  .kglm-swat{width:min(100%,210px);background:#131720;border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:10px 12px}\n  .kglm-swat .tag{font:700 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b;margin-bottom:8px}\n  .kglm-swat .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}\n  .kglm-swat .sw{height:30px;border-radius:8px;cursor:pointer;position:relative;transition:transform .15s ease}\n  .kglm-swat .sw:hover{transform:scale(1.08)}\n  .kglm-swat .sw.on::after{content:\"✓\";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:800;text-shadow:0 1px 2px rgba(0,0,0,.8)}\n  .kglm-swat .foot{display:flex;justify-content:space-between;align-items:center;margin-top:9px;font:700 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.1em;color:#64748b}\n  .kglm-swat .foot b{color:#f1f5f9;letter-spacing:.02em}\n  @media (prefers-reduced-motion:reduce){.kglm-swat .sw{transition:none}}\n</style>\n<div class=\"kglm-swat\">\n  <div class=\"tag\">STROKE · PICK A TONE</div>\n  <div class=\"grid\">\n    <span class=\"sw on\" data-hex=\"#EAB308\" style=\"background:linear-gradient(135deg,#eab308,#b45309)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#F43F5E\" style=\"background:linear-gradient(135deg,#f43f5e,#be123c)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#38BDF8\" style=\"background:linear-gradient(135deg,#38bdf8,#0369a1)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#10B981\" style=\"background:linear-gradient(135deg,#10b981,#047857)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#8B5CF6\" style=\"background:linear-gradient(135deg,#8b5cf6,#6d28d9)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#F97316\" style=\"background:linear-gradient(135deg,#f97316,#9a3412)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#22D3EE\" style=\"background:linear-gradient(135deg,#22d3ee,#0e7490)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n    <span class=\"sw\" data-hex=\"#E2E8F0\" style=\"background:linear-gradient(135deg,#e2e8f0,#64748b)\" onclick=\"var p=this.parentElement;p.querySelectorAll('.sw').forEach(function(s){s.classList.remove('on')});this.classList.add('on');document.getElementById('kglm-swat-out').textContent=this.getAttribute('data-hex')\"></span>\n  </div>\n  <div class=\"foot\"><span>SELECTED</span><b id=\"kglm-swat-out\">#EAB308</b></div>\n</div>"
    },

    {
      id: "TO13",
      section: "toggles",
      name: "Push Latch",
      description: "An aviation-style switch you push in: the dome sinks, the lamp flares, and a ping ring radiates — a press-latch state model unlike every slide, rocker, flip, and crank in the drawer.",
      creator: "glm-5-2",
      tags: ["toggle","push","latch","arm","physical","press"],
      tweaks: [
        { type: "color", label: "Arm Light", varName: "--glm-to13", default: "#f43f5e" }
      ],
      code: "<style>\n  @keyframes kglm-latch-ping{0%{transform:scale(.8);opacity:.9}70%{transform:scale(1.4);opacity:0}100%{transform:scale(1.4);opacity:0}}\n  .kglm-latch{display:inline-flex;align-items:center;gap:10px;cursor:pointer;user-select:none}\n  .kglm-latch input{position:absolute;opacity:0;pointer-events:none}\n  .kglm-latch .cap{position:relative;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#454d5e,#1b2029 72%);border:1px solid rgba(255,255,255,.16);box-shadow:0 6px 0 #0a0d12,0 10px 16px rgba(0,0,0,.5),inset 0 1px 1px rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;transition:transform .12s ease,box-shadow .12s ease}\n  .kglm-latch .lamp{width:12px;height:12px;border-radius:50%;background:#232936;border:1px solid rgba(255,255,255,.08);transition:background .15s ease}\n  .kglm-latch .ring{position:absolute;inset:5px;border-radius:50%;border:2px solid var(--glm-to13,#f43f5e);opacity:0;pointer-events:none}\n  .kglm-latch input:checked + .cap{transform:translateY(4px);box-shadow:0 2px 0 #0a0d13,0 6px 10px rgba(0,0,0,.4),inset 0 1px 1px rgba(255,255,255,.2)}\n  .kglm-latch input:checked + .cap .lamp{background:var(--glm-to13,#f43f5e);box-shadow:0 0 10px var(--glm-to13,#f43f5e)}\n  .kglm-latch input:checked + .cap .ring{animation:kglm-latch-ping 1.6s ease-out infinite}\n  .kglm-latch .txt{font:700 11px/1 ui-monospace,Consolas,monospace;letter-spacing:.18em;color:#475569;transition:color .18s ease}\n  .kglm-latch input:checked ~ .txt{color:var(--glm-to13,#f43f5e)}\n  @media (prefers-reduced-motion:reduce){.kglm-latch .cap{transition:none}.kglm-latch .ring{animation:none}.kglm-latch .txt{transition:none}}\n</style>\n<label class=\"kglm-latch\">\n  <input type=\"checkbox\">\n  <span class=\"cap\"><i class=\"lamp\"></i><i class=\"ring\"></i></span>\n  <span class=\"txt\">ARM</span>\n</label>"
    },

    {
      id: "SL11",
      section: "sliders",
      name: "Fader Bank",
      description: "Four independent vertical faders with glow-fill, knob travel, and per-channel readouts — a mixer strip unlike every single-axis track, ring, dial, and thermometer.",
      creator: "glm-5-2",
      tags: ["slider","fader","mixer","bank","channel","vertical"],
      tweaks: [
        { type: "color", label: "Level Glow", varName: "--glm-sl11", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-mix{display:inline-flex;gap:10px;background:#10141c;border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:10px 12px}\n  .kglm-m{width:40px;display:flex;flex-direction:column;align-items:center;gap:5px}\n  .kglm-m .ch{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#64748b}\n  .kglm-m .slot{position:relative;width:34px;height:84px;background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.1);border-radius:5px;box-shadow:inset 0 2px 4px rgba(0,0,0,.7)}\n  .kglm-m .rail{position:absolute;left:50%;transform:translateX(-50%);bottom:8px;width:3px;height:68px;background:rgba(255,255,255,.08);border-radius:2px}\n  .kglm-m .glow{position:absolute;left:50%;transform:translateX(-50%);bottom:8px;width:3px;height:calc(var(--f,50)*0.68px);background:var(--glm-sl11,#eab308);border-radius:2px;box-shadow:0 0 6px var(--glm-sl11,#eab308)}\n  .kglm-m .k{position:absolute;left:50%;top:calc(76px - var(--f,50)*0.68px - 7px);transform:translateX(-50%);width:28px;height:14px;background:linear-gradient(180deg,#edf2f7,#a8b3c2);border-radius:3px;box-shadow:0 2px 4px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.85)}\n  .kglm-m input{position:absolute;left:50%;top:50%;width:130px;height:100%;transform:translate(-50%,-50%) rotate(-90deg);opacity:0;cursor:ns-resize;margin:0;z-index:2}\n  .kglm-m .v{font:700 9px/1 ui-monospace,Consolas,monospace;color:var(--glm-sl11,#eab308);font-variant-numeric:tabular-nums}\n</style>\n<div class=\"kglm-mix\">\n  <div class=\"kglm-m\" style=\"--f:30\"><span class=\"ch\">L</span><div class=\"slot\"><div class=\"rail\"></div><div class=\"glow\"></div><div class=\"k\"></div><input type=\"range\" min=\"0\" max=\"100\" value=\"30\" oninput=\"var m=this.closest('.kglm-m');m.style.setProperty('--f',this.value);m.querySelector('.v').textContent=this.value\"></div><span class=\"v\">30</span></div>\n  <div class=\"kglm-m\" style=\"--f:55\"><span class=\"ch\">R</span><div class=\"slot\"><div class=\"rail\"></div><div class=\"glow\"></div><div class=\"k\"></div><input type=\"range\" min=\"0\" max=\"100\" value=\"55\" oninput=\"var m=this.closest('.kglm-m');m.style.setProperty('--f',this.value);m.querySelector('.v').textContent=this.value\"></div><span class=\"v\">55</span></div>\n  <div class=\"kglm-m\" style=\"--f:75\"><span class=\"ch\">E</span><div class=\"slot\"><div class=\"rail\"></div><div class=\"glow\"></div><div class=\"k\"></div><input type=\"range\" min=\"0\" max=\"100\" value=\"75\" oninput=\"var m=this.closest('.kglm-m');m.style.setProperty('--f',this.value);m.querySelector('.v').textContent=this.value\"></div><span class=\"v\">75</span></div>\n  <div class=\"kglm-m\" style=\"--f:20\"><span class=\"ch\">A</span><div class=\"slot\"><div class=\"rail\"></div><div class=\"glow\"></div><div class=\"k\"></div><input type=\"range\" min=\"0\" max=\"100\" value=\"20\" oninput=\"var m=this.closest('.kglm-m');m.style.setProperty('--f',this.value);m.querySelector('.v').textContent=this.value\"></div><span class=\"v\">20</span></div>\n</div>"
    },

    {
      id: "CA11",
      section: "cards",
      name: "Sparkline Card",
      description: "A metric tile with an SVG area sparkline, end-point marker, and delta chip — the only charting surface in a drawer of profiles, tiles, passes, and polaroids.",
      creator: "glm-5-2",
      tags: ["card","sparkline","chart","metric","delta","svg"],
      tweaks: [
        { type: "color", label: "Chart Accent", varName: "--glm-ca11", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-spark{width:190px;background:#131720;border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:10px 12px 8px;box-shadow:0 8px 20px -8px rgba(0,0,0,.6)}\n  .kglm-spark .top{display:flex;justify-content:space-between;align-items:center}\n  .kglm-spark .top>span{font:700 9px/1 ui-monospace,Consolas,monospace;letter-spacing:.14em;color:#64748b}\n  .kglm-spark .chip{font:800 9px/1 ui-monospace,Consolas,monospace;color:#34d399;background:rgba(52,211,153,.13);padding:2px 6px;border-radius:999px}\n  .kglm-spark .num{font:800 22px/1.1 ui-sans-serif,system-ui,sans-serif;color:#f8fafc;letter-spacing:-.02em;margin:3px 0 6px}\n  .kglm-spark .num small{font-size:11px;color:#64748b;font-weight:600}\n  .kglm-spark svg{display:block;width:100%;height:44px}\n  .kglm-spark .foot{display:flex;justify-content:space-between;margin-top:5px;font:600 7.5px/1 ui-monospace,Consolas,monospace;color:#475569;letter-spacing:.08em}\n</style>\n<div class=\"kglm-spark\">\n  <div class=\"top\"><span>RENDER THROUGHPUT</span><span class=\"chip\">▲ 12.4%</span></div>\n  <div class=\"num\">142.8 <small>fps</small></div>\n  <svg viewBox=\"0 0 200 44\" preserveAspectRatio=\"none\">\n    <defs><linearGradient id=\"kglm-sg1\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"var(--glm-ca11,#eab308)\" stop-opacity=\"0.35\"/><stop offset=\"1\" stop-color=\"var(--glm-ca11,#eab308)\" stop-opacity=\"0\"/></linearGradient></defs>\n    <polygon points=\"2,37 26,30 50,33 74,24 98,27 122,17 146,21 170,12 198,7 198,44 2,44\" fill=\"url(#kglm-sg1)\"/>\n    <polyline points=\"2,37 26,30 50,33 74,24 98,27 122,17 146,21 170,12 198,7\" fill=\"none\" stroke=\"var(--glm-ca11,#eab308)\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <circle cx=\"198\" cy=\"7\" r=\"3.2\" fill=\"#fff\" stroke=\"var(--glm-ca11,#eab308)\" stroke-width=\"2\"/>\n  </svg>\n  <div class=\"foot\"><span>00:00</span><span>00:06</span><span>00:12</span><span>00:18</span><span>NOW</span></div>\n</div>"
    },

    {
      id: "NA11",
      section: "navigation",
      name: "File Tree",
      description: "An expandable folder hierarchy with rotating carets and an indented rail — the only disclosure-tree nav in a drawer of tabs, docks, breadcrumbs, and pagers.",
      creator: "glm-5-2",
      tags: ["navigation","tree","folder","files","expand","hierarchy"],
      tweaks: [
        { type: "color", label: "Active Row", varName: "--glm-na11", default: "#eab308" }
      ],
      code: "<style>\n  @keyframes kglm-tree-in{from{opacity:0}to{opacity:1}}\n  .kglm-tree{background:#10141c;border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:8px 10px;width:min(100%,200px);font-family:ui-monospace,Consolas,monospace}\n  .kglm-tree .row{display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:5px;cursor:pointer;font-size:10.5px;color:#94a3b8;transition:background .15s ease,color .15s ease}\n  .kglm-tree .row:hover{background:rgba(255,255,255,.06);color:#e2e8f0}\n  .kglm-tree .caret{display:inline-flex;width:12px;height:12px;align-items:center;justify-content:center;font-size:8px;color:#64748b;transition:transform .18s ease}\n  .kglm-tree .node.open>.row .caret{transform:rotate(90deg)}\n  .kglm-tree .drop{display:none}\n  .kglm-tree .node.open>.drop{display:block;animation:kglm-tree-in .18s ease}\n  .kglm-tree .kids{padding-left:16px;margin-left:6px;border-left:1px dashed rgba(255,255,255,.1)}\n  .kglm-tree .act{background:rgba(234,179,8,.12);color:var(--glm-na11,#eab308);font-weight:700}\n  @media (prefers-reduced-motion:reduce){.kglm-tree .row,.kglm-tree .caret{transition:none}.kglm-tree .node.open>.drop{animation:none}}\n</style>\n<div class=\"kglm-tree\">\n  <div class=\"node open\">\n    <div class=\"row\" onclick=\"this.parentElement.classList.toggle('open')\"><span class=\"caret\">▶</span><span>📁 src</span></div>\n    <div class=\"drop kids\">\n      <div class=\"node open\">\n        <div class=\"row\" onclick=\"this.parentElement.classList.toggle('open')\"><span class=\"caret\">▶</span><span>📁 components</span></div>\n        <div class=\"drop kids\">\n          <div class=\"row act\"><span>▸</span><span>Button.vue</span></div>\n          <div class=\"row\"><span>▸</span><span>Slider.vue</span></div>\n        </div>\n      </div>\n      <div class=\"row\"><span>▸</span><span>main.js</span></div>\n    </div>\n  </div>\n  <div class=\"node\">\n    <div class=\"row\" onclick=\"this.parentElement.classList.toggle('open')\"><span class=\"caret\">▶</span><span>📁 specs</span></div>\n    <div class=\"drop kids\">\n      <div class=\"row\"><span>▸</span><span>queries.sql</span></div>\n    </div>\n  </div>\n</div>"
    },

    {
      id: "AL11",
      section: "alerts",
      name: "Ticker Tape",
      description: "A newswire-style strip of status pips that scrolls continuously and pauses on hover — the only scrolling motion in a drawer of toasts, banners, and callouts.",
      creator: "glm-5-2",
      tags: ["alert","ticker","tape","scrolling","status","wire"],
      tweaks: [
        { type: "color", label: "Queue Pip", varName: "--glm-al11", default: "#eab308" }
      ],
      code: "<style>\n  @keyframes kglm-tick{to{transform:translateX(-50%)}}\n  .kglm-tick{position:relative;width:230px;overflow:hidden;background:#10141c;border:1px solid rgba(255,255,255,.09);border-radius:7px;padding:8px 0;box-shadow:inset 0 1px 3px rgba(0,0,0,.5)}\n  .kglm-tick .run{display:inline-flex;white-space:nowrap;animation:kglm-tick 18s linear infinite}\n  .kglm-tick:hover .run{animation-play-state:paused}\n  .kglm-tick .item{display:inline-flex;align-items:center;gap:6px;font:600 10px/1 ui-monospace,Consolas,monospace;color:#cbd5e1;letter-spacing:.02em;margin-right:26px}\n  .kglm-tick .item i{width:6px;height:6px;border-radius:50%;flex-shrink:0}\n  @media (prefers-reduced-motion:reduce){.kglm-tick .run{animation:none}}\n</style>\n<div class=\"kglm-tick\">\n  <div class=\"run\">\n    <span class=\"item\" style=\"color:#6ee7b7\"><i style=\"background:#34d399\"></i>RENDER 4K DONE</span>\n    <span class=\"item\"><i style=\"background:var(--glm-al11,#eab308);box-shadow:0 0 5px var(--glm-al11,#eab308)\"></i>QUEUE 3 JOBS</span>\n    <span class=\"item\"><i style=\"background:#38bdf8\"></i>UPSCALE 2X</span>\n    <span class=\"item\" style=\"color:#fca5a5\"><i style=\"background:#f87171\"></i>VRAM 88%</span>\n    <span class=\"item\" style=\"color:#6ee7b7\"><i style=\"background:#34d399\"></i>RENDER 4K DONE</span>\n    <span class=\"item\"><i style=\"background:var(--glm-al11,#eab308);box-shadow:0 0 5px var(--glm-al11,#eab308)\"></i>QUEUE 3 JOBS</span>\n    <span class=\"item\"><i style=\"background:#38bdf8\"></i>UPSCALE 2X</span>\n    <span class=\"item\" style=\"color:#fca5a5\"><i style=\"background:#f87171\"></i>VRAM 88%</span>\n  </div>\n</div>"
    },

    {
      id: "IC16",
      section: "icons",
      name: "Hazard Set",
      description: "Filled warning glyphs — triangle, no-entry, hex, chevrons — parked on a striped safety plate, a caution voice opposed to every hairline, glass, pixel, and LED set.",
      creator: "glm-5-2",
      tags: ["icon","hazard","warning","danger","safety","stripe"],
      tweaks: [
        { type: "color", label: "Hazard Stripe", varName: "--glm-ic16", default: "#eab308" }
      ],
      code: "<style>\n  .kglm-haz{display:inline-flex;align-items:center;gap:14px;background:#0d111a;border:1px solid rgba(255,255,255,.09);border-radius:11px;padding:10px 12px 12px}\n  .kglm-haz svg{width:26px;height:26px;display:block}\n  .kglm-haz .tile{position:relative;padding-bottom:5px}\n  .kglm-haz .tile::after{content:\"\";position:absolute;left:2px;right:2px;bottom:-1px;height:3px;border-radius:1px;background:repeating-linear-gradient(-45deg,var(--glm-ic16,#eab308) 0 4px,transparent 4px 8px)}\n</style>\n<div class=\"kglm-haz\">\n  <span class=\"tile\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 3.2 22.6 20H1.4Z\" fill=\"#fbbf24\" stroke=\"#0b0d13\" stroke-width=\"1.4\" stroke-linejoin=\"round\"/><path d=\"M12 9.6v4.4\" stroke=\"#0b0d13\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"12\" cy=\"16.9\" r=\"1.1\" fill=\"#0b0d13\"/></svg></span>\n  <span class=\"tile\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"8.6\" fill=\"none\" stroke=\"#f43f5e\" stroke-width=\"2.2\"/><path d=\"M6.6 17.4 17.4 6.6\" stroke=\"#f43f5e\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><rect x=\"9.2\" y=\"10\" width=\"5.6\" height=\"4\" rx=\"1\" fill=\"#f1f5f9\"/></svg></span>\n  <span class=\"tile\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 2.6 21 7.8v8.4l-9 5.2-9-5.2V7.8Z\" fill=\"#fbbf24\" stroke=\"#0b0d13\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/><path d=\"M12 9v4.2\" stroke=\"#0b0d13\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"12\" cy=\"16.1\" r=\"1\" fill=\"#0b0d13\"/></svg></span>\n  <span class=\"tile\"><svg viewBox=\"0 0 24 24\"><path d=\"M4.5 7l7 5-7 5M11.5 7l7 5-7 5\" fill=\"none\" stroke=\"var(--glm-ic16,#eab308)\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></span>\n</div>"
    },

    {
      id: "PL12",
      section: "players",
      name: "Studio VU Meter",
      description: "Stereo needle meters whose indicators swing and peak lamps flash under the brand plate — analog metering motion unlike every transport, knob, vinyl, and waveform player.",
      creator: "glm-5-2",
      tags: ["player","vu","meter","needle","analog","stereo"],
      tweaks: [
        { type: "color", label: "Needle Tone", varName: "--glm-pl12", default: "#8b93a5" }
      ],
      code: "<style>\n  @keyframes kglm-vu1{0%,100%{transform:rotate(-32deg)}22%{transform:rotate(8deg)}36%{transform:rotate(-16deg)}52%{transform:rotate(4deg)}64%{transform:rotate(-10deg)}78%{transform:rotate(-2deg)}}\n  @keyframes kglm-peak{0%,78%,100%{opacity:.25}88%{opacity:1}}\n  .kglm-vu{width:200px;background:linear-gradient(180deg,#161a23,#10131a);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 10px;box-shadow:inset 0 1px 2px rgba(0,0,0,.6),0 8px 16px rgba(0,0,0,.4)}\n  .kglm-vu .head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}\n  .kglm-vu .head b{font:800 8px/1 ui-monospace,Consolas,monospace;letter-spacing:.3em;color:#64748b}\n  .kglm-vu .head i{width:7px;height:7px;border-radius:50%;background:#f43f5e;animation:kglm-peak 2.4s step-end infinite;box-shadow:0 0 6px #f43f5e}\n  .kglm-vu .meters{display:flex;gap:8px}\n  .kglm-vu .m{position:relative;flex:1;height:52px;background:radial-gradient(circle at 50% 30%,#1c2331,#0b0e13);border:1px solid rgba(255,255,255,.07);border-radius:5px;overflow:hidden}\n  .kglm-vu .m i{position:absolute;bottom:6px;width:1.5px;height:4px;background:rgba(255,255,255,.22)}\n  .kglm-vu .m .needle{position:absolute;left:50%;bottom:4px;width:2px;height:36px;border-radius:1px;background:linear-gradient(180deg,#f4f6fa,var(--glm-pl12,#8b93a5));transform-origin:50% 100%;box-shadow:0 0 4px rgba(255,255,255,.5)}\n  .kglm-vu .m.l .needle{transform:rotate(-20deg);animation:kglm-vu1 3.2s ease-in-out infinite}\n  .kglm-vu .m.r .needle{transform:rotate(-20deg);animation:kglm-vu1 3.2s ease-in-out infinite;animation-delay:-1.4s}\n  .kglm-vu .m .plat{position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:14px;height:4px;border-radius:2px;background:#3d4657}\n  .kglm-vu .foot{display:flex;justify-content:space-between;margin-top:6px;font:700 7px/1 ui-monospace,Consolas,monospace;letter-spacing:.2em;color:#475569}\n  @media (prefers-reduced-motion:reduce){.kglm-vu .m.l .needle,.kglm-vu .m.r .needle,.kglm-vu .head i{animation:none}}\n</style>\n<div class=\"kglm-vu\">\n  <div class=\"head\"><b>STEREO · VU</b><i></i></div>\n  <div class=\"meters\">\n    <div class=\"m l\"><i style=\"left:14%\"></i><i style=\"left:30%\"></i><i style=\"left:46%\"></i><i style=\"left:62%\"></i><i style=\"left:78%\"></i><i style=\"left:90%\"></i><i class=\"needle\"></i><i class=\"plat\"></i></div>\n    <div class=\"m r\"><i style=\"left:14%\"></i><i style=\"left:30%\"></i><i style=\"left:46%\"></i><i style=\"left:62%\"></i><i style=\"left:78%\"></i><i style=\"left:90%\"></i><i class=\"needle\"></i><i class=\"plat\"></i></div>\n  </div>\n  <div class=\"foot\"><span>-20</span><span>-10</span><span>-6</span><span>0</span><span>+3</span></div>\n</div>"
    },

    {
      id: "MO13",
      section: "modals",
      name: "Window Frame",
      description: "A dialog dressed as an OS window — traffic-light dots, title bar, monospace command block, and deploy actions — the only chrome-and-chassis silhouette among raw centered cards",
      creator: "glm-5-2",
      tags: ["modal","window","frame","chrome","deploy","terminal"],
      tweaks: [
        { type: "color", label: "Confirm Color", varName: "--glm-mo13", default: "#10b981" }
      ],
      code: "<style>\n  .kglm-win{width:230px;background:#181c26;border:1px solid rgba(255,255,255,.13);border-radius:10px;overflow:hidden;box-shadow:0 22px 44px -14px rgba(0,0,0,.85)}\n  .kglm-win .bar{display:flex;align-items:center;gap:6px;background:#10131b;border-bottom:1px solid rgba(255,255,255,.08);padding:8px 10px}\n  .kglm-win .bar i{width:9px;height:9px;border-radius:50%;transition:transform .15s ease}\n  .kglm-win .bar i:hover{transform:scale(1.25)}\n  .kglm-win .bar i.r{background:#f43f5e}\n  .kglm-win .bar i.y{background:#fbbf24}\n  .kglm-win .bar i.g{background:#34d399}\n  .kglm-win .bar span{margin-left:6px;font:600 9.5px/1 ui-monospace,Consolas,monospace;letter-spacing:.12em;color:#7c8698;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n  .kglm-win .body{padding:12px}\n  .kglm-win .code{background:#0b0d12;border:1px solid rgba(255,255,255,.07);border-radius:6px;padding:8px 10px;font:600 10.5px/1.7 ui-monospace,Consolas,monospace;color:#cdd6e4;margin-bottom:11px}\n  .kglm-win .code b{color:#eab308;font-weight:700}\n  .kglm-win .q{font-size:10.5px;color:#94a3b8;line-height:1.4;margin-bottom:11px}\n  .kglm-win .acts{display:flex;gap:6px}\n  .kglm-win .acts button{flex:1;padding:6px 0;border-radius:6px;border:none;font:700 10.5px/1;cursor:pointer;transition:transform .12s ease,opacity .12s ease}\n  .kglm-win .acts button:hover{opacity:.88}\n  .kglm-win .acts button:active{transform:translateY(1px)}\n  .kglm-win .cancel{background:rgba(255,255,255,.08);color:#cbd5e1}\n  .kglm-win .go{background:var(--glm-mo13,#10b981);color:#03291e}\n  @media (prefers-reduced-motion:reduce){.kglm-win .bar i,.kglm-win .acts button{transition:none}}\n</style>\n<div class=\"kglm-win\">\n  <div class=\"bar\"><i class=\"r\"></i><i class=\"y\"></i><i class=\"g\"></i><span>deploy — build #4189</span></div>\n  <div class=\"body\">\n    <div class=\"code\">$ npm run deploy -- --env=prod<br>▲ <b>12 services</b> will restart</div>\n    <div class=\"q\">Push this release to production? Estimated downtime under 10 seconds.</div>\n    <div class=\"acts\"><button type=\"button\" class=\"cancel\">Cancel</button><button type=\"button\" class=\"go\">Deploy</button></div>\n  </div>\n</div>"
    },

    );
