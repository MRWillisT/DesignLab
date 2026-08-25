'use strict';

/* Codebuff — "Aurora": a soft aurora-borealis video-platform theme, style-set expansion round 1.
   Every snippet shares the same design tokens so the set reads as one product:
     --aur-g   #7cf5c0   aurora green   (primary)
     --aur-t   #4fd8d4   borealis teal  (secondary)
     --aur-v   #a89bf7   night violet   (tertiary)
     --aur-txt #e6f5ef   soft white text
     --aur-dim #9db8b0   muted text
   Motifs: deep night-glass panels, green/teal/violet hairline borders, a slow cross-fading
   aurora wash behind every panel, rounded 16px chrome, gentle lift-on-hover. Nothing flashy —
   low-saturation glows and slow drift. All motion is CSS-only on transform/opacity, wrapped
   in prefers-reduced-motion. */

window.DESIGN_LAB.items.push(
  {
    id: "PL18",
    section: "players",
    set: "aurora",
    name: "Aurora Transport",
    description: "Glass play/stop cluster with a soft aurora disc and pulsing play ring.",
    creator: "codebuff",
    tags: ["transport", "play", "pause", "stop", "skip", "player", "video", "aurora"],
    code: `<style>
  .apl18{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;align-items:center;gap:16px;padding:13px 16px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .apl18::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:apl18-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(110px 80px at 10% 0%,rgba(124,245,192,.18),transparent 70%),
               radial-gradient(130px 90px at 90% 100%,rgba(168,155,247,.16),transparent 70%)}
  @keyframes apl18-wash{from{opacity:.3}to{opacity:.7}}
  .apl18-time{position:relative;z-index:1;font-size:12.5px;font-variant-numeric:tabular-nums;letter-spacing:.03em}
  .apl18-time b{font-weight:600}
  .apl18-time span{color:var(--aur-dim)}
  .apl18-cluster{position:relative;z-index:1;display:flex;align-items:center;gap:9px}
  .apl18-btn{position:relative;width:35px;height:35px;border-radius:50%;border:1px solid rgba(165,214,200,.2);
    background:rgba(255,255,255,.03);color:#cfe9e0;display:grid;place-items:center;padding:0;cursor:pointer;
    transition:transform .16s ease}
  .apl18-btn svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .apl18-btn::after{content:"";position:absolute;inset:-3px;border-radius:50%;opacity:0;transition:opacity .16s ease;
    background:radial-gradient(circle,rgba(124,245,192,.25),transparent 70%)}
  .apl18-btn:hover{transform:translateY(-1px)}
  .apl18-btn:hover::after{opacity:1}
  .apl18-playwrap{position:relative;z-index:1;display:grid;place-items:center;cursor:pointer}
  .apl18-toggle{position:absolute;opacity:0;pointer-events:none}
  .apl18-play{position:relative;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:#07150f;
    background:linear-gradient(135deg,#7cf5c0,#4fd8d4 52%,#a89bf7);box-shadow:0 6px 16px rgba(79,216,212,.26);
    transition:transform .16s ease}
  .apl18-play svg{width:17px;height:17px}
  .apl18-play .apl18-pause{display:none}
  .apl18-toggle:checked ~ .apl18-play .apl18-tri{display:none}
  .apl18-toggle:checked ~ .apl18-play .apl18-pause{display:block}
  .apl18-playwrap:hover .apl18-play{transform:translateY(-1px)}
  .apl18-play::after{content:"";position:absolute;inset:-7px;border-radius:50%;border:1px solid rgba(124,245,192,.55);opacity:0}
  .apl18-toggle:checked ~ .apl18-play::after{animation:apl18-ring 2.4s ease-out infinite}
  @keyframes apl18-ring{from{transform:scale(.72);opacity:.8}to{transform:scale(1.45);opacity:0}}
  .apl18-stop{color:#f5b8b8}
  .apl18-meta{position:relative;z-index:1;display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--aur-dim);font-variant-numeric:tabular-nums}
  .apl18-res{font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 7px;border-radius:6px;color:#bfffe3;
    background:linear-gradient(135deg,rgba(124,245,192,.18),rgba(168,155,247,.14));border:1px solid rgba(124,245,192,.35)}
  @media (prefers-reduced-motion:reduce){.apl18::before,.apl18-play::after{animation:none}.apl18-btn,.apl18-play{transition:none}}
</style>
<div class="apl18">
  <div class="apl18-time"><b>00:42</b> <span>/ 03:17</span></div>
  <div class="apl18-cluster">
    <button class="apl18-btn" aria-label="Skip back"><svg viewBox="0 0 24 24"><path d="M4.5 5.5v13"/><path d="M19.5 5.5v13L9.5 12z"/></svg></button>
    <label class="apl18-playwrap">
      <input type="checkbox" class="apl18-toggle" checked aria-label="Play / pause">
      <span class="apl18-play">
        <svg class="apl18-tri" viewBox="0 0 24 24"><path d="M7.5 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/></svg>
        <svg class="apl18-pause" viewBox="0 0 24 24"><rect x="6" y="4.5" width="4.2" height="15" rx="1.3" fill="currentColor" stroke="none"/><rect x="13.8" y="4.5" width="4.2" height="15" rx="1.3" fill="currentColor" stroke="none"/></svg>
      </span>
    </label>
    <button class="apl18-btn" aria-label="Skip forward"><svg viewBox="0 0 24 24"><path d="M19.5 5.5v13"/><path d="M4.5 5.5v13L14.5 12z"/></svg></button>
    <button class="apl18-btn apl18-stop" aria-label="Stop"><svg viewBox="0 0 24 24"><rect x="6.5" y="6.5" width="11" height="11" rx="2.4"/></svg></button>
  </div>
  <div class="apl18-meta"><span class="apl18-res">4K</span>03:17</div>
</div>`
  },

  {
    id: "SL15",
    section: "sliders",
    set: "aurora",
    name: "Aurora Timeline",
    description: "Segmented clip scrubber with glowing playhead and IN/OUT marks.",
    creator: "codebuff",
    tags: ["timeline", "scrubber", "video", "clip", "playhead", "in-out", "aurora"],
    code: `<style>
  .asl15{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:430px;padding:14px 16px 12px;border-radius:16px;color:var(--aur-txt);position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2)}
  .asl15::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:asl15-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(150px 90px at 85% 0%,rgba(79,216,212,.14),transparent 70%),
               radial-gradient(120px 80px at 8% 100%,rgba(168,155,247,.13),transparent 70%)}
  @keyframes asl15-wash{from{opacity:.3}to{opacity:.65}}
  .asl15-top{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
  .asl15-name{display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:600;color:var(--aur-txt)}
  .asl15-led{width:6px;height:6px;border-radius:50%;background:var(--aur-g);box-shadow:0 0 7px rgba(124,245,192,.9);animation:asl15-breathe 2s ease-in-out infinite}
  @keyframes asl15-breathe{50%{opacity:.35}}
  .asl15-pos{font-size:11px;font-variant-numeric:tabular-nums;color:var(--aur-dim)}
  .asl15-pos b{color:var(--aur-txt);font-weight:600}
  .asl15-track{position:relative;height:44px;margin-top:18px}
  .asl15-segs{position:absolute;inset:0;border-radius:10px;border:1px solid rgba(165,214,200,.18);
    background:
      repeating-linear-gradient(90deg,rgba(214,240,232,.1) 0 1px,transparent 1px 12.5%),
      linear-gradient(90deg,rgba(124,245,192,.4) 0 23%,rgba(13,24,31,.92) 23% 30%,
        rgba(79,216,212,.38) 30% 54%,rgba(13,24,31,.92) 54% 62%,
        rgba(168,155,247,.36) 62% 85%,rgba(13,24,31,.92) 85% 90%,
        rgba(124,245,192,.26) 90% 100%)}
  .asl15-scrub{-webkit-appearance:none;appearance:none;position:relative;z-index:2;width:100%;height:44px;margin:0;background:transparent;cursor:pointer}
  .asl15-scrub::-webkit-slider-runnable-track{height:44px;background:transparent}
  .asl15-scrub::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:44px;margin-top:0;border:0;
    background:radial-gradient(circle at 50% 9px,#f2fffa 0 4px,rgba(242,255,250,0) 5px),
      linear-gradient(90deg,rgba(242,255,250,0) 7px,#eafff6 7px 9px,rgba(242,255,250,0) 9px);
    box-shadow:0 0 12px rgba(226,255,246,.55)}
  .asl15-scrub::-moz-range-track{height:44px;background:transparent}
  .asl15-scrub::-moz-range-thumb{width:18px;height:44px;border:0;border-radius:0;
    background:radial-gradient(circle at 50% 9px,#f2fffa 0 4px,rgba(242,255,250,0) 5px),
      linear-gradient(90deg,rgba(242,255,250,0) 7px,#eafff6 7px 9px,rgba(242,255,250,0) 9px);
    box-shadow:0 0 12px rgba(226,255,246,.55)}
  .asl15-scrub:focus-visible{outline:none}
  .asl15-scrub:focus-visible::-webkit-slider-thumb{outline:2px solid rgba(124,245,192,.7);outline-offset:3px}
  .asl15-mark{position:absolute;top:-16px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;z-index:3;pointer-events:none}
  .asl15-mark i{width:7px;height:7px;transform:rotate(45deg);background:rgba(8,16,22,.95);border:1px solid rgba(124,245,192,.75)}
  .asl15-mark em{font-style:normal;font-size:8px;letter-spacing:.14em;color:#bfd8d0}
  .asl15-bot{position:relative;z-index:1;display:flex;justify-content:space-between;margin-top:10px;font-size:9.5px;font-variant-numeric:tabular-nums;color:var(--aur-dim)}
  @media (prefers-reduced-motion:reduce){.asl15::before,.asl15-led{animation:none}}
</style>
<div class="asl15">
  <div class="asl15-top">
    <span class="asl15-name"><i class="asl15-led"></i>Sequence 01</span>
    <span class="asl15-pos"><b>00:42</b> / 03:17</span>
  </div>
  <div class="asl15-track">
    <div class="asl15-segs"></div>
    <span class="asl15-mark" style="left:20%"><i></i><em>IN</em></span>
    <span class="asl15-mark" style="left:78%"><i></i><em>OUT</em></span>
    <input type="range" class="asl15-scrub" min="0" max="197" value="42" aria-label="Timeline scrubber">
  </div>
  <div class="asl15-bot"><span>00:00</span><span>00:45</span><span>01:30</span><span>02:15</span><span>03:17</span></div>
</div>`
  },

  {
    id: "IC22",
    section: "icons",
    set: "aurora",
    name: "Aurora Formats",
    description: "Model and file-type glyph tiles: LTX, WAN, H3, MP4, WAV, MP3, WEBM.",
    creator: "codebuff",
    tags: ["ltx", "wan", "h3", "mp4", "wav", "mp3", "webm", "formats", "models", "glyphs", "aurora"],
    code: `<style>
  .aic22{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;gap:13px;padding:15px 16px;border-radius:16px;color:var(--aur-txt);position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2)}
  .aic22::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aic22-wash 5s ease-in-out infinite alternate;
    background:radial-gradient(130px 90px at 90% 0%,rgba(168,155,247,.15),transparent 70%),
               radial-gradient(120px 80px at 5% 100%,rgba(124,245,192,.14),transparent 70%)}
  @keyframes aic22-wash{from{opacity:.3}to{opacity:.65}}
  .aic22-group{position:relative;z-index:1;display:flex;flex-direction:column;gap:7px}
  .aic22-cap{font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:var(--aur-dim);display:flex;align-items:center;gap:8px}
  .aic22-cap::after{content:"";height:1px;flex:1;background:linear-gradient(90deg,rgba(124,245,192,.35),transparent)}
  .aic22-row{display:flex;gap:9px;flex-wrap:wrap}
  .aic22-tile{display:flex;flex-direction:column;align-items:center;gap:7px;padding:9px 13px 8px;border-radius:12px;cursor:pointer;
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.16);transition:transform .16s ease}
  .aic22-tile:hover{transform:translateY(-2px)}
  .aic22-ico{width:36px;height:36px;border-radius:11px;display:grid;place-items:center;color:#d9fff0;
    background:linear-gradient(135deg,rgba(124,245,192,.16),rgba(79,216,212,.09));border:1px solid rgba(124,245,192,.28)}
  .aic22-tile--v .aic22-ico{color:#e2d9ff;background:linear-gradient(135deg,rgba(168,155,247,.16),rgba(79,216,212,.09));border-color:rgba(168,155,247,.32)}
  .aic22-ico svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
  .aic22-name{font-size:9.5px;font-weight:700;letter-spacing:.18em;background:linear-gradient(115deg,#8ff9cd,#5fe3d8 55%,#b3a6ff);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  .aic22-tile--v .aic22-name{background:linear-gradient(115deg,#b3a6ff,#5fe3d8 60%,#8ff9cd);-webkit-background-clip:text;background-clip:text;color:transparent}
  @media (prefers-reduced-motion:reduce){.aic22::before{animation:none}.aic22-tile{transition:none}}
</style>
<div class="aic22">
  <div class="aic22-group">
    <div class="aic22-cap">Models</div>
    <div class="aic22-row">
      <div class="aic22-tile"><span class="aic22-ico"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18M3 15.5h18M8.5 4v4.5M15.5 4v4.5M8.5 15.5V20M15.5 15.5V20"/></svg></span><span class="aic22-name">LTX</span></div>
      <div class="aic22-tile"><span class="aic22-ico"><svg viewBox="0 0 24 24"><path d="M2.5 12.5c3-8.5 6-8.5 9.5 0s6.5 8.5 9.5 0"/></svg></span><span class="aic22-name">WAN</span></div>
      <div class="aic22-tile aic22-tile--v"><span class="aic22-ico"><svg viewBox="0 0 24 24"><path d="M4.5 17.5V8M10 17.5V4.5M15.5 17.5v-9" stroke-linecap="round"/></svg></span><span class="aic22-name">H3</span></div>
    </div>
  </div>
  <div class="aic22-group">
    <div class="aic22-cap">Files</div>
    <div class="aic22-row">
      <div class="aic22-tile"><span class="aic22-ico"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M10 8.8v6.4l5.6-3.2z" fill="currentColor" stroke="none"/></svg></span><span class="aic22-name">MP4</span></div>
      <div class="aic22-tile aic22-tile--v"><span class="aic22-ico"><svg viewBox="0 0 24 24"><path d="M4 13.2v-2.4M8 16v-8M12 17.6V6.4M16 16V8M20 13.2v-2.4" stroke-linecap="round"/></svg></span><span class="aic22-name">WAV</span></div>
      <div class="aic22-tile"><span class="aic22-ico"><svg viewBox="0 0 24 24"><path d="M9.5 17.5V6.2l9-2v11.3"/><circle cx="7" cy="17.5" r="2.5"/><circle cx="16" cy="15.5" r="2.5"/></svg></span><span class="aic22-name">MP3</span></div>
      <div class="aic22-tile aic22-tile--v"><span class="aic22-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/></svg></span><span class="aic22-name">WEBM</span></div>
    </div>
  </div>
</div>`
  },

  {
    id: "EF18",
    section: "effects",
    set: "aurora",
    name: "Aurora FX Rack",
    description: "Selectable video-effect tiles — glow, blur, grain, speed, chroma, vignette.",
    creator: "codebuff",
    tags: ["effects", "fx", "glow", "blur", "grain", "speed", "chroma", "vignette", "editing", "aurora"],
    tweaks: [
      { type: "color", label: "Aurora accent", varName: "--aef18-accent", default: "#7cf5c0" }
    ],
    code: `<style>
  .aef18{--aur-g:var(--aef18-accent,#7cf5c0);--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:390px;padding:14px 16px 12px;border-radius:16px;color:var(--aur-txt);position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2)}
  .aef18::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aef18-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(140px 90px at 8% 0%,rgba(124,245,192,.15),transparent 70%),
               radial-gradient(130px 90px at 95% 100%,rgba(168,155,247,.14),transparent 70%)}
  @keyframes aef18-wash{from{opacity:.3}to{opacity:.65}}
  .aef18-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;margin-bottom:11px}
  .aef18-title{font-size:12px;font-weight:700;letter-spacing:.02em}
  .aef18-count{font-size:9px;font-weight:700;letter-spacing:.14em;padding:3px 8px;border-radius:7px;color:#bfffe3;
    background:linear-gradient(135deg,rgba(124,245,192,.16),rgba(168,155,247,.12));border:1px solid rgba(124,245,192,.3)}
  .aef18-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  .aef18-tile{position:relative;cursor:pointer}
  .aef18-tile input{position:absolute;opacity:0;pointer-events:none}
  .aef18-fx{display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 6px 9px;border-radius:12px;opacity:.74;
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.15);transition:opacity .15s ease,transform .15s ease}
  .aef18-tile:hover .aef18-fx{opacity:.95;transform:translateY(-1px)}
  .aef18-ico{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;color:var(--aur-g);
    background:linear-gradient(135deg,rgba(124,245,192,.12),rgba(79,216,212,.06));border:1px solid rgba(124,245,192,.22)}
  .aef18-ico svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  .aef18-ico svg[fill]{fill:currentColor;stroke:none}
  .aef18-name{font-size:10px;font-weight:600;letter-spacing:.06em;color:var(--aur-dim);transition:color .15s ease}
  .aef18-tile input:checked + .aef18-fx{opacity:1;border-color:var(--aur-g);
    background:linear-gradient(180deg,rgba(124,245,192,.09),rgba(79,216,212,.03));
    box-shadow:0 0 0 3px rgba(124,245,192,.07),0 0 16px rgba(124,245,192,.12)}
  .aef18-tile input:checked + .aef18-fx .aef18-ico{color:#0c1f18;background:linear-gradient(135deg,var(--aur-g),var(--aur-t) 55%,var(--aur-v));
    box-shadow:0 4px 14px rgba(124,245,192,.3)}
  .aef18-tile input:checked + .aef18-fx .aef18-name{color:#eafff6}
  .aef18-tile input:focus-visible + .aef18-fx{outline:2px solid rgba(124,245,192,.7);outline-offset:2px}
  .aef18-hint{position:relative;z-index:1;display:flex;justify-content:space-between;margin-top:11px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--aur-dim)}
  @media (prefers-reduced-motion:reduce){.aef18::before{animation:none}.aef18-fx{transition:none}}
</style>
<div class="aef18">
  <div class="aef18-head"><span class="aef18-title">Effects</span><span class="aef18-count">6 presets</span></div>
  <div class="aef18-grid">
    <label class="aef18-tile"><input type="radio" name="aef18fx" checked><span class="aef18-fx"><span class="aef18-ico"><svg viewBox="0 0 24 24"><path d="M12 2.8c.7 5.1 2.9 7.3 8 8-5.1.7-7.3 2.9-8 8-.7-5.1-2.9-7.3-8-8 5.1-.7 7.3-2.9 8-8z"/></svg></span><span class="aef18-name">Glow</span></span></label>
    <label class="aef18-tile"><input type="radio" name="aef18fx"><span class="aef18-fx"><span class="aef18-ico" style="color:var(--aur-t)"><svg viewBox="0 0 24 24"><circle cx="8.5" cy="14" r="4.2" opacity=".45"/><circle cx="15.5" cy="12.5" r="4.2" opacity=".75"/><circle cx="12" cy="17" r="3.4" opacity=".3"/></svg></span><span class="aef18-name">Blur</span></span></label>
    <label class="aef18-tile"><input type="radio" name="aef18fx"><span class="aef18-fx"><span class="aef18-ico" style="color:var(--aur-t)"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="6" cy="6.5" r="1.1"/><circle cx="11.5" cy="5.5" r="1.4"/><circle cx="17.5" cy="7" r="1"/><circle cx="8" cy="12" r="1"/><circle cx="14.5" cy="12.5" r="1.25"/><circle cx="6.5" cy="17.5" r="1.1"/><circle cx="12" cy="18" r="1"/><circle cx="17.5" cy="16.5" r="1.2"/></svg></span><span class="aef18-name">Grain</span></span></label>
    <label class="aef18-tile"><input type="radio" name="aef18fx"><span class="aef18-fx"><span class="aef18-ico" style="color:var(--aur-v)"><svg viewBox="0 0 24 24"><path d="M4 14.5a8 8 0 1 1 16 0"/><path d="M12 14.5l4.6-4.1"/><circle cx="12" cy="14.5" r="1.5" fill="currentColor" stroke="none"/></svg></span><span class="aef18-name">Speed</span></span></label>
    <label class="aef18-tile"><input type="radio" name="aef18fx"><span class="aef18-fx"><span class="aef18-ico" style="color:var(--aur-v)"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="8.8" cy="14.8" r="4.6" opacity=".8"/><circle cx="15.2" cy="14.8" r="4.6" opacity=".8"/><circle cx="12" cy="9.8" r="4.6" opacity=".8"/></svg></span><span class="aef18-name">Chroma</span></span></label>
    <label class="aef18-tile"><input type="radio" name="aef18fx"><span class="aef18-fx"><span class="aef18-ico"><svg viewBox="0 0 24 24"><defs><radialGradient id="aef18-vg" cx="50%" cy="50%" r="70%"><stop offset="52%" stop-color="currentColor" stop-opacity="0"/><stop offset="100%" stop-color="currentColor" stop-opacity=".85"/></radialGradient></defs><rect x="3.5" y="3.8" width="17" height="16.4" rx="3" fill="url(#aef18-vg)" stroke="none"/></svg></span><span class="aef18-name">Vignette</span></span></label>
  </div>
  <div class="aef18-hint"><span>Select effect</span><span>applies to selected clip</span></div>
</div>`
  }
);
