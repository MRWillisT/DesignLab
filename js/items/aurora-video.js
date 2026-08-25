'use strict';

/* Codebuff — "Aurora": a soft aurora-borealis video-platform theme, style-set expansion (rounds 1-4).
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
  },

  {
    id: "BU34",
    section: "buttons",
    set: "aurora",
    name: "Aurora Generate",
    description: "Gradient CTA with sparkle mark and a ghost Queue twin.",
    creator: "codebuff",
    tags: ["generate", "cta", "primary", "sparkle", "queue", "video", "aurora"],
    code: `<style>
  .abu34{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;align-items:center;gap:12px;padding:16px 18px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .abu34::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:abu34-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(110px 80px at 12% 0%,rgba(124,245,192,.16),transparent 70%),
               radial-gradient(120px 80px at 90% 100%,rgba(168,155,247,.14),transparent 70%)}
  @keyframes abu34-wash{from{opacity:.3}to{opacity:.65}}
  .abu34-row{position:relative;z-index:1;display:flex;align-items:center;gap:10px}
  .abu34-btn{position:relative;display:inline-flex;align-items:center;gap:9px;padding:13px 26px;border:0;border-radius:14px;cursor:pointer;
    font-family:inherit;font-size:14px;font-weight:700;letter-spacing:.01em;color:#07150f;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 55%,#a89bf7);box-shadow:0 8px 22px rgba(79,216,212,.28);
    transition:transform .16s ease}
  .abu34-btn svg{width:16px;height:16px}
  .abu34-btn::after{content:"";position:absolute;inset:0;border-radius:14px;opacity:0;transition:opacity .16s ease;
    background:linear-gradient(115deg,rgba(255,255,255,.35),rgba(255,255,255,.05) 55%,rgba(255,255,255,.28))}
  .abu34-btn:hover{transform:translateY(-2px)}
  .abu34-btn:hover::after{opacity:1}
  .abu34-btn:active{transform:translateY(0)}
  .abu34-ghost{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:14px;cursor:pointer;
    font-family:inherit;font-size:13px;font-weight:600;color:#cfe9e0;background:rgba(255,255,255,.03);
    border:1px solid rgba(165,214,200,.22);transition:transform .16s ease}
  .abu34-ghost svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .abu34-ghost:hover{transform:translateY(-1px)}
  .abu34-cap{position:relative;z-index:1;font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--aur-dim)}
  @media (prefers-reduced-motion:reduce){.abu34::before{animation:none}.abu34-btn,.abu34-ghost{transition:none}}
</style>
<div class="abu34">
  <div class="abu34-row">
    <button class="abu34-btn"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.6c.7 5.2 2.9 7.4 8 8.1-5.1.7-7.3 2.9-8 8.1-.7-5.2-2.9-7.4-8-8.1 5.1-.7 7.3-2.9 8-8.1z"/><path d="M18.8 16.2c.3 2.2 1.2 3.1 3.4 3.4-2.2.3-3.1 1.2-3.4 3.4-.3-2.2-1.2-3.1-3.4-3.4 2.2-.3 3.1-1.2 3.4-3.4z"/></svg>Generate</button>
    <button class="abu34-ghost"><svg viewBox="0 0 24 24"><path d="M5 6.5h14M5 12h14M5 17.5h8"/></svg>Queue</button>
  </div>
  <span class="abu34-cap">LTX · 2K · 12 sec</span>
</div>`
  },

  {
    id: "LO23",
    section: "loaders",
    set: "aurora",
    name: "Aurora Render Ring",
    description: "Gradient arc spinner orbiting a breathing percentage.",
    creator: "codebuff",
    tags: ["render", "spinner", "ring", "progress", "loading", "percentage", "aurora"],
    code: `<style>
  .alo23{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;align-items:center;gap:13px;padding:18px 22px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .alo23::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:alo23-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(110px 80px at 88% 0%,rgba(79,216,212,.15),transparent 70%),
               radial-gradient(110px 80px at 10% 100%,rgba(168,155,247,.13),transparent 70%)}
  @keyframes alo23-wash{from{opacity:.3}to{opacity:.65}}
  .alo23-ring{position:relative;width:92px;height:92px}
  .alo23-ring svg{width:92px;height:92px;animation:alo23-spin 1.5s linear infinite}
  @keyframes alo23-spin{to{transform:rotate(360deg)}}
  .alo23-track{fill:none;stroke:rgba(159,215,200,.14);stroke-width:5}
  .alo23-arc{fill:none;stroke:url(#alo23-grad);stroke-width:5;stroke-linecap:round;stroke-dasharray:118 121}
  .alo23-pct{position:absolute;inset:0;display:grid;place-items:center;font-size:19px;font-weight:700;font-variant-numeric:tabular-nums;color:var(--aur-txt)}
  .alo23-pct small{font-size:10px;font-weight:500;color:var(--aur-dim)}
  .alo23-pct em{font-style:normal;animation:alo23-breathe 2s ease-in-out infinite}
  @keyframes alo23-breathe{50%{opacity:.45}}
  .alo23-cap{display:flex;align-items:center;gap:7px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--aur-dim)}
  .alo23-dot{width:6px;height:6px;border-radius:50%;background:var(--aur-g);box-shadow:0 0 7px rgba(124,245,192,.9);animation:alo23-breathe 1.4s ease-in-out infinite}
  @media (prefers-reduced-motion:reduce){.alo23::before,.alo23-ring svg,.alo23-pct em,.alo23-dot{animation:none}}
</style>
<div class="alo23">
  <div class="alo23-ring">
    <svg viewBox="0 0 92 92">
      <defs><linearGradient id="alo23-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cf5c0"/><stop offset=".55" stop-color="#4fd8d4"/><stop offset="1" stop-color="#a89bf7"/></linearGradient></defs>
      <circle class="alo23-track" cx="46" cy="46" r="38"/>
      <circle class="alo23-arc" cx="46" cy="46" r="38" transform="rotate(-90 46 46)"/>
    </svg>
    <div class="alo23-pct"><em>42<small>%</small></em></div>
  </div>
  <div class="alo23-cap"><span class="alo23-dot"></span>Rendering · pass 6 of 14</div>
</div>`
  },

  {
    id: "BA15",
    section: "badges",
    set: "aurora",
    name: "Aurora Model Badges",
    description: "Pill cluster of model tags and live status with glow dots.",
    creator: "codebuff",
    tags: ["badges", "model", "ltx", "wan", "h3", "status", "pill", "aurora"],
    code: `<style>
  .aba15{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;padding:16px 18px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .aba15::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aba15-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(120px 80px at 90% 0%,rgba(124,245,192,.14),transparent 70%),
               radial-gradient(110px 70px at 5% 100%,rgba(168,155,247,.13),transparent 70%)}
  @keyframes aba15-wash{from{opacity:.3}to{opacity:.65}}
  .aba15-pill{position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;font-size:10.5px;font-weight:600;letter-spacing:.09em;
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.18);color:#cfe9e0}
  .aba15-pill i{width:6px;height:6px;border-radius:50%;background:var(--aur-g);box-shadow:0 0 6px rgba(124,245,192,.8)}
  .aba15-pill--t i{background:var(--aur-t);box-shadow:0 0 6px rgba(79,216,212,.8)}
  .aba15-pill--v i{background:var(--aur-v);box-shadow:0 0 6px rgba(168,155,247,.8)}
  .aba15-pill--live{border-color:rgba(124,245,192,.45);color:#eafff6}
  .aba15-pill--live i{animation:aba15-pulse 1.4s ease-in-out infinite}
  @keyframes aba15-pulse{50%{opacity:.3;transform:scale(.7)}}
  .aba15-pill--dim{color:#8fa8a2;border-style:dashed}
  @media (prefers-reduced-motion:reduce){.aba15::before,.aba15-pill--live i{animation:none}}
</style>
<div class="aba15">
  <span class="aba15-pill aba15-pill--live"><i></i>Rendering</span>
  <span class="aba15-pill"><i></i>LTX</span>
  <span class="aba15-pill aba15-pill--t"><i></i>WAN</span>
  <span class="aba15-pill aba15-pill--v"><i></i>H3</span>
  <span class="aba15-pill aba15-pill--dim"><i></i>Queued</span>
</div>`
  },

  {
    id: "AL18",
    section: "alerts",
    set: "aurora",
    name: "Aurora Render Toast",
    description: "Slide-in render-complete toast with gradient check badge.",
    creator: "codebuff",
    tags: ["toast", "alert", "complete", "render", "notification", "aurora"],
    code: `<style>
  .aal18{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;align-items:center;gap:13px;padding:13px 15px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.92),rgba(10,19,26,.96));
    border:1px solid rgba(124,245,192,.28);color:var(--aur-txt);
    box-shadow:0 14px 34px rgba(0,0,0,.45);animation:aal18-in .5s cubic-bezier(.2,.7,.3,1) both}
  @keyframes aal18-in{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}
  .aal18::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;
    background:radial-gradient(120px 80px at 0% 0%,rgba(124,245,192,.14),transparent 70%)}
  .aal18-ico{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;color:#07150f;flex:none;
    background:linear-gradient(135deg,#7cf5c0,#4fd8d4 60%,#a89bf7);box-shadow:0 4px 14px rgba(79,216,212,.3)}
  .aal18-ico svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
  .aal18-body{display:flex;flex-direction:column;gap:3px;min-width:0}
  .aal18-title{font-size:12.5px;font-weight:700}
  .aal18-meta{font-size:10px;color:var(--aur-dim);font-variant-numeric:tabular-nums;letter-spacing:.02em}
  .aal18-act{display:flex;align-items:center;gap:6px;margin-left:4px}
  .aal18-btn{padding:7px 13px;border-radius:10px;font-size:11px;font-weight:600;cursor:pointer;color:#cfe9e0;
    background:rgba(255,255,255,.04);border:1px solid rgba(165,214,200,.22);transition:transform .15s ease}
  .aal18-btn:hover{transform:translateY(-1px)}
  .aal18-x{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;cursor:pointer;color:var(--aur-dim);
    background:transparent;border:0;transition:transform .15s ease}
  .aal18-x:hover{transform:rotate(90deg);color:#eafff6}
  .aal18-x svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
  @media (prefers-reduced-motion:reduce){.aal18{animation:none}.aal18-btn,.aal18-x{transition:none}}
</style>
<div class="aal18" role="status">
  <span class="aal18-ico"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
  <div class="aal18-body">
    <span class="aal18-title">Render complete</span>
    <span class="aal18-meta">LTX · 2K · 12 sec · 42 MB</span>
  </div>
  <div class="aal18-act">
    <button class="aal18-btn">View</button>
    <button class="aal18-x" aria-label="Dismiss"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  </div>
</div>`
  },

  {
    id: "DD10",
    section: "dragdrop",
    set: "aurora",
    name: "Aurora Dropzone",
    description: "Dashed upload zone with real file input and browse pill.",
    creator: "codebuff",
    tags: ["dropzone", "upload", "drag", "drop", "footage", "file", "aurora"],
    code: `<style>
  .add10{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:320px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .add10::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:add10-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(120px 80px at 90% 0%,rgba(79,216,212,.15),transparent 70%),
               radial-gradient(110px 70px at 5% 100%,rgba(124,245,192,.13),transparent 70%)}
  @keyframes add10-wash{from{opacity:.3}to{opacity:.65}}
  .add10-drop{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:9px;padding:30px 20px;border-radius:12px;cursor:pointer;
    border:1.5px dashed rgba(124,245,192,.35);background:rgba(124,245,192,.03);transition:border-color .16s ease,background .16s ease}
  .add10-drop:hover{border-color:rgba(124,245,192,.65);background:rgba(124,245,192,.06)}
  .add10-ico{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:#d9fff0;
    background:linear-gradient(135deg,rgba(124,245,192,.16),rgba(79,216,212,.09));border:1px solid rgba(124,245,192,.3)}
  .add10-ico svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
  .add10-title{font-size:12.5px;font-weight:700}
  .add10-sub{font-size:10px;color:var(--aur-dim);text-align:center;line-height:1.5}
  .add10-sub b{color:#bfffe3;font-weight:600}
  .add10-btn{margin-top:4px;padding:8px 16px;border-radius:10px;font-size:11px;font-weight:600;color:#07150f;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 60%,#a89bf7);transition:transform .15s ease}
  .add10-drop:hover .add10-btn{transform:translateY(-1px)}
  .add10-file{position:absolute;opacity:0;pointer-events:none}
  @media (prefers-reduced-motion:reduce){.add10::before{animation:none}.add10-drop,.add10-btn{transition:none}}
</style>
<div class="add10">
  <label class="add10-drop">
    <input type="file" class="add10-file" multiple>
    <span class="add10-ico"><svg viewBox="0 0 24 24"><path d="M12 16V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/><path d="M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3"/></svg></span>
    <span class="add10-title">Drop your footage</span>
    <span class="add10-sub">MP4, MOV, WAV · <b>up to 2GB</b></span>
    <span class="add10-btn">Browse files</span>
  </label>
</div>`
  },

  {
    id: "CA18",
    section: "cards",
    set: "aurora",
    name: "Aurora Output Card",
    description: "Rendered-clip card: aurora thumbnail, play overlay, export row.",
    creator: "codebuff",
    tags: ["card", "gallery", "output", "thumbnail", "render", "clip", "aurora"],
    code: `<style>
  .aca18{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:280px;border-radius:16px;padding:10px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .aca18::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aca18-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(120px 70px at 90% 0%,rgba(168,155,247,.14),transparent 70%)}
  @keyframes aca18-wash{from{opacity:.3}to{opacity:.6}}
  .aca18-thumb{position:relative;z-index:1;height:132px;border-radius:11px;overflow:hidden;
    background:radial-gradient(60px 40px at 72% 26%,rgba(124,245,192,.9),rgba(124,245,192,0) 70%),
               radial-gradient(120px 60px at 30% 0%,rgba(79,216,212,.35),transparent 70%),
               radial-gradient(90px 50px at 88% 100%,rgba(168,155,247,.4),transparent 70%),
               linear-gradient(180deg,#0a1620,#101f2c 55%,#0d1722)}
  .aca18-thumb::after{content:"";position:absolute;left:0;right:0;bottom:0;height:52%;border-radius:0 0 11px 11px;
    background:linear-gradient(180deg,rgba(10,22,32,0),rgba(7,14,20,.85))}
  .aca18-play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:42px;height:42px;border-radius:50%;z-index:2;
    display:grid;place-items:center;color:#07150f;background:linear-gradient(135deg,#7cf5c0,#4fd8d4 60%,#a89bf7);
    box-shadow:0 6px 18px rgba(79,216,212,.4);transition:transform .16s ease}
  .aca18-thumb:hover .aca18-play{transform:translate(-50%,-50%) scale(1.07)}
  .aca18-play svg{width:15px;height:15px;margin-left:2px}
  .aca18-dur{position:absolute;right:9px;bottom:9px;z-index:2;padding:3px 7px;border-radius:6px;font-size:9px;font-weight:600;font-variant-numeric:tabular-nums;
    color:#eafff6;background:rgba(7,14,20,.72);border:1px solid rgba(165,214,200,.2)}
  .aca18-body{position:relative;z-index:1;display:flex;flex-direction:column;gap:8px;padding:11px 8px 7px}
  .aca18-title{font-size:12px;font-weight:700}
  .aca18-meta{display:flex;align-items:center;gap:6px;font-size:9.5px;color:var(--aur-dim);font-variant-numeric:tabular-nums}
  .aca18-tag{padding:2px 7px;border-radius:5px;font-size:8.5px;font-weight:700;letter-spacing:.1em;color:#bfffe3;
    background:linear-gradient(135deg,rgba(124,245,192,.16),rgba(168,155,247,.12));border:1px solid rgba(124,245,192,.3)}
  .aca18-act{display:flex;gap:7px;margin-top:2px}
  .aca18-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 0;border-radius:10px;font-size:10.5px;font-weight:600;cursor:pointer;
    color:#cfe9e0;background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.2);transition:transform .15s ease}
  .aca18-btn:hover{transform:translateY(-1px)}
  .aca18-btn svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .aca18-btn--go{color:#07150f;background:linear-gradient(115deg,#7cf5c0,#4fd8d4 60%,#a89bf7);border-color:transparent}
  @media (prefers-reduced-motion:reduce){.aca18::before{animation:none}.aca18-play,.aca18-btn{transition:none}}
</style>
<div class="aca18">
  <div class="aca18-thumb">
    <span class="aca18-play"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg></span>
    <span class="aca18-dur">00:12</span>
  </div>
  <div class="aca18-body">
    <span class="aca18-title">Aurora Bloom — 042</span>
    <div class="aca18-meta"><span class="aca18-tag">LTX</span>2K · 12 sec · 42 MB</div>
    <div class="aca18-act">
      <button class="aca18-btn"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z"/></svg>Preview</button>
      <button class="aca18-btn aca18-btn--go"><svg viewBox="0 0 24 24"><path d="M12 16V4"/><path d="M7.5 8.5L12 4l4.5 4.5"/><path d="M4 16v3a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3"/></svg>Export</button>
    </div>
  </div>
</div>`
  },

  {
    id: "FO21",
    section: "forms",
    set: "aurora",
    name: "Aurora Prompt Field",
    description: "Generation textarea with aurora glow ring and sparkle enhance chip.",
    creator: "codebuff",
    tags: ["prompt", "textarea", "field", "form", "input", "generate", "aurora"],
    code: `<style>
  .afo21{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:330px;padding:15px 16px 12px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .afo21::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:afo21-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(120px 80px at 88% 0%,rgba(79,216,212,.15),transparent 70%),
               radial-gradient(100px 70px at 5% 100%,rgba(168,155,247,.12),transparent 70%)}
  @keyframes afo21-wash{from{opacity:.3}to{opacity:.65}}
  .afo21-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}
  .afo21-label{font-size:11px;font-weight:700;letter-spacing:.02em}
  .afo21-count{font-size:9.5px;color:var(--aur-dim);font-variant-numeric:tabular-nums}
  .afo21-field{position:relative;z-index:1}
  .afo21-field::after{content:"";position:absolute;inset:-1px;border-radius:11px;opacity:0;transition:opacity .16s ease;pointer-events:none;
    box-shadow:0 0 0 2px rgba(124,245,192,.35),0 0 18px rgba(124,245,192,.18)}
  .afo21-field:focus-within::after{opacity:1}
  .afo21-input{width:100%;box-sizing:border-box;min-height:74px;resize:none;padding:10px 12px;border-radius:10px;font-family:inherit;font-size:12px;line-height:1.5;color:var(--aur-txt);
    background:rgba(6,13,18,.55);border:1px solid rgba(165,214,200,.2);outline:none}
  .afo21-input::placeholder{color:#5f7a72}
  .afo21-foot{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;margin-top:9px}
  .afo21-hint{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--aur-dim)}
  .afo21-enh{display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border-radius:9px;font-size:10px;font-weight:600;cursor:pointer;color:#07150f;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 60%,#a89bf7);border:0;transition:transform .15s ease}
  .afo21-enh:hover{transform:translateY(-1px)}
  .afo21-enh svg{width:11px;height:11px}
  @media (prefers-reduced-motion:reduce){.afo21::before{animation:none}.afo21-field::after,.afo21-enh{transition:none}}
</style>
<div class="afo21">
  <div class="afo21-head"><span class="afo21-label">Prompt</span><span class="afo21-count">0 / 240</span></div>
  <div class="afo21-field">
    <textarea class="afo21-input" rows="3" placeholder="A lone skater drifting under the aurora…" aria-label="Generation prompt"></textarea>
  </div>
  <div class="afo21-foot">
    <span class="afo21-hint">Enter to queue</span>
    <button class="afo21-enh"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3.2c.6 4.4 2.5 6.3 6.8 6.9-4.3.6-6.2 2.5-6.8 6.9-.6-4.4-2.5-6.3-6.8-6.9 4.3-.6 6.2-2.5 6.8-6.9z"/></svg>Enhance</button>
  </div>
</div>`
  },

  {
    id: "TO19",
    section: "toggles",
    set: "aurora",
    name: "Aurora Quality Toggles",
    description: "Slider switches with gradient fill for upscale and loop options.",
    creator: "codebuff",
    tags: ["toggle", "switch", "upscale", "quality", "settings", "aurora"],
    code: `<style>
  .ato19{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;gap:2px;padding:7px 16px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .ato19::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:ato19-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(110px 70px at 90% 0%,rgba(124,245,192,.13),transparent 70%),
               radial-gradient(100px 70px at 5% 100%,rgba(168,155,247,.12),transparent 70%)}
  @keyframes ato19-wash{from{opacity:.3}to{opacity:.65}}
  .ato19-row{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 0;border-bottom:1px solid rgba(165,214,200,.12)}
  .ato19-row:last-child{border-bottom:0}
  .ato19-txt{display:flex;flex-direction:column;gap:2px;min-width:0}
  .ato19-name{font-size:11.5px;font-weight:600}
  .ato19-cap{font-size:9.5px;color:var(--aur-dim)}
  .ato19-sw{position:relative;width:38px;height:22px;flex:none;cursor:pointer}
  .ato19-sw input{position:absolute;opacity:0;pointer-events:none}
  .ato19-track{position:absolute;inset:0;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(165,214,200,.25)}
  .ato19-track::before{content:"";position:absolute;inset:0;border-radius:999px;opacity:0;transition:opacity .16s ease;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 55%,#a89bf7)}
  .ato19-knob{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#cfe9e0;box-shadow:0 1px 4px rgba(0,0,0,.4);transition:transform .16s ease}
  .ato19-sw input:checked ~ .ato19-track::before{opacity:1}
  .ato19-sw input:checked ~ .ato19-knob{transform:translateX(18px);background:#07150f}
  @media (prefers-reduced-motion:reduce){.ato19::before{animation:none}.ato19-track::before,.ato19-knob{transition:none}}
</style>
<div class="ato19">
  <div class="ato19-row">
    <div class="ato19-txt"><span class="ato19-name">Upscale 2×</span><span class="ato19-cap">Enhance detail</span></div>
    <label class="ato19-sw"><input type="checkbox" checked aria-label="Upscale 2x"><span class="ato19-track"></span><span class="ato19-knob"></span></label>
  </div>
  <div class="ato19-row">
    <div class="ato19-txt"><span class="ato19-name">Loop output</span><span class="ato19-cap">Seamless playback</span></div>
    <label class="ato19-sw"><input type="checkbox" aria-label="Loop output"><span class="ato19-track"></span><span class="ato19-knob"></span></label>
  </div>
</div>`
  },

  {
    id: "NA18",
    section: "navigation",
    set: "aurora",
    name: "Aurora Queue Tabs",
    description: "Render-queue tab bar with gradient counts and a new-job button.",
    creator: "codebuff",
    tags: ["tabs", "navigation", "queue", "rendering", "count", "aurora"],
    code: `<style>
  .ana18{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;align-items:center;gap:4px;padding:8px;border-radius:14px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .ana18::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:ana18-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(120px 70px at 88% 0%,rgba(79,216,212,.14),transparent 70%)}
  @keyframes ana18-wash{from{opacity:.3}to{opacity:.65}}
  .ana18-tab{position:relative;z-index:1;cursor:pointer;padding:8px 13px;border-radius:9px;font-size:11px;font-weight:600;color:var(--aur-dim)}
  .ana18-tab input{position:absolute;opacity:0;pointer-events:none}
  .ana18-tab span{display:inline-flex;align-items:center;gap:7px;pointer-events:none}
  .ana18-n{min-width:16px;height:16px;padding:0 4px;box-sizing:border-box;border-radius:6px;display:grid;place-items:center;font-size:8.5px;font-weight:700;color:var(--aur-dim);
    background:rgba(255,255,255,.05);border:1px solid rgba(165,214,200,.18)}
  .ana18-tab::after{content:"";position:absolute;left:11px;right:11px;bottom:2px;height:2px;border-radius:2px;opacity:0;
    background:linear-gradient(90deg,#7cf5c0,#4fd8d4 55%,#a89bf7);box-shadow:0 0 8px rgba(124,245,192,.6)}
  .ana18-tab:has(input:checked){color:var(--aur-txt);background:rgba(124,245,192,.05)}
  .ana18-tab:has(input:checked)::after{opacity:1}
  .ana18-tab:has(input:checked) .ana18-n{color:#07150f;background:linear-gradient(115deg,#7cf5c0,#4fd8d4 60%,#a89bf7);border-color:transparent}
  .ana18-new{position:relative;z-index:1;display:inline-flex;align-items:center;gap:5px;margin-left:4px;padding:8px 13px;border-radius:9px;font-size:11px;font-weight:700;cursor:pointer;color:#07150f;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 60%,#a89bf7);border:0;transition:transform .15s ease}
  .ana18-new:hover{transform:translateY(-1px)}
  @media (prefers-reduced-motion:reduce){.ana18::before{animation:none}.ana18-new{transition:none}}
</style>
<div class="ana18">
  <label class="ana18-tab"><input type="radio" name="ana18tab" checked><span>Queue <b class="ana18-n">3</b></span></label>
  <label class="ana18-tab"><input type="radio" name="ana18tab"><span>Rendering <b class="ana18-n">2</b></span></label>
  <label class="ana18-tab"><input type="radio" name="ana18tab"><span>Done <b class="ana18-n">14</b></span></label>
  <button class="ana18-new">+ New</button>
</div>`
  },

  {
    id: "MO17",
    section: "modals",
    set: "aurora",
    name: "Aurora Job Modal",
    description: "Backdrop dialog with model and resolution pickers, cancel and start render.",
    creator: "codebuff",
    tags: ["modal", "dialog", "settings", "job", "render", "model", "resolution", "aurora"],
    code: `<style>
  .amo17{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    position:fixed;inset:0;display:grid;place-items:center;color:var(--aur-txt);
    background:radial-gradient(400px 260px at 50% 0%,rgba(79,216,212,.08),transparent 60%),rgba(4,9,13,.74);
    animation:amo17-in .3s ease both}
  @keyframes amo17-in{from{opacity:0}to{opacity:1}}
  .amo17-dlg{width:340px;border-radius:18px;padding:18px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(23,38,48,.98),rgba(12,22,30,.98));
    border:1px solid rgba(124,245,192,.25);
    box-shadow:0 24px 60px rgba(0,0,0,.55),0 0 40px rgba(79,216,212,.08);animation:amo17-up .32s cubic-bezier(.2,.7,.3,1) both}
  @keyframes amo17-up{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
  .amo17-dlg::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.5;
    background:radial-gradient(140px 90px at 90% 0%,rgba(168,155,247,.16),transparent 70%)}
  .amo17-head{position:relative;display:flex;align-items:center;justify-content:space-between;margin-bottom:15px}
  .amo17-title{font-size:13px;font-weight:700}
  .amo17-x{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;cursor:pointer;color:var(--aur-dim);
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.16);transition:transform .15s ease}
  .amo17-x:hover{transform:rotate(90deg);color:#eafff6}
  .amo17-x svg{width:11px;height:11px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round}
  .amo17-sec{position:relative;margin-bottom:13px}
  .amo17-cap{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--aur-dim);margin-bottom:7px}
  .amo17-row{display:flex;gap:7px}
  .amo17-opt{position:relative;flex:1;cursor:pointer}
  .amo17-opt input{position:absolute;opacity:0;pointer-events:none}
  .amo17-opt span{display:flex;align-items:center;justify-content:center;gap:6px;padding:8px 0;border-radius:9px;font-size:10.5px;font-weight:600;color:var(--aur-dim);
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.16)}
  .amo17-opt span i{width:5px;height:5px;border-radius:50%;background:currentColor;opacity:0}
  .amo17-opt input:checked ~ span{color:#eafff6;border-color:rgba(124,245,192,.5);background:linear-gradient(180deg,rgba(124,245,192,.1),rgba(79,216,212,.04))}
  .amo17-opt input:checked ~ span i{opacity:1}
  .amo17-foot{position:relative;display:flex;gap:9px;margin-top:17px}
  .amo17-btn{flex:1;padding:10px 0;border-radius:11px;font-size:11.5px;font-weight:700;cursor:pointer;color:#cfe9e0;
    background:rgba(255,255,255,.03);border:1px solid rgba(165,214,200,.2);transition:transform .15s ease}
  .amo17-btn:hover{transform:translateY(-1px)}
  .amo17-btn--go{color:#07150f;background:linear-gradient(115deg,#7cf5c0,#4fd8d4 55%,#a89bf7);border-color:transparent}
  @media (prefers-reduced-motion:reduce){.amo17,.amo17-dlg{animation:none}.amo17-x,.amo17-btn{transition:none}}
</style>
<div class="amo17">
  <div class="amo17-dlg">
    <div class="amo17-head"><span class="amo17-title">Job settings</span><button class="amo17-x" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
    <div class="amo17-sec">
      <div class="amo17-cap">Model</div>
      <div class="amo17-row">
        <label class="amo17-opt"><input type="radio" name="amo17model" checked><span>LTX<i></i></span></label>
        <label class="amo17-opt"><input type="radio" name="amo17model"><span>WAN<i></i></span></label>
        <label class="amo17-opt"><input type="radio" name="amo17model"><span>H3<i></i></span></label>
      </div>
    </div>
    <div class="amo17-sec">
      <div class="amo17-cap">Resolution</div>
      <div class="amo17-row">
        <label class="amo17-opt"><input type="radio" name="amo17res"><span>2K<i></i></span></label>
        <label class="amo17-opt"><input type="radio" name="amo17res" checked><span>4K<i></i></span></label>
        <label class="amo17-opt"><input type="radio" name="amo17res"><span>8K<i></i></span></label>
      </div>
    </div>
    <div class="amo17-foot">
      <button class="amo17-btn">Cancel</button>
      <button class="amo17-btn amo17-btn--go">Start render</button>
    </div>
  </div>
</div>`
  },

  {
    id: "ST6",
    section: "steps",
    set: "aurora",
    name: "Aurora Pipeline Steps",
    description: "Four-stage render tracker with pulsing active ring.",
    creator: "codebuff",
    tags: ["steps", "pipeline", "tracker", "wizard", "render", "progress", "aurora"],
    code: `<style>
  .ast6{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;gap:14px;padding:18px 20px 15px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .ast6::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:ast6-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(120px 80px at 88% 0%,rgba(79,216,212,.15),transparent 70%)}
  @keyframes ast6-wash{from{opacity:.3}to{opacity:.65}}
  .ast6-steps{position:relative;z-index:1;display:flex;align-items:flex-start}
  .ast6-step{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;flex:1}
  .ast6-step + .ast6-step::before{content:"";position:absolute;top:14px;left:-50%;width:100%;height:2px;background:rgba(165,214,200,.16)}
  .ast6-step--done + .ast6-step::before{background:linear-gradient(90deg,#7cf5c0,#4fd8d4)}
  .ast6-dot{position:relative;z-index:1;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;
    background:linear-gradient(180deg,rgba(26,44,56,.98),rgba(15,27,36,.98));border:1px solid rgba(165,214,200,.25)}
  .ast6-dot svg{width:12px;height:12px}
  .ast6-step--done .ast6-dot{background:linear-gradient(135deg,#7cf5c0,#4fd8d4 60%,#a89bf7);border-color:transparent;color:#07150f}
  .ast6-step--active .ast6-dot{border-color:rgba(124,245,192,.65)}
  .ast6-step--active .ast6-dot::after{content:"";position:absolute;inset:-5px;border-radius:50%;border:1px solid rgba(124,245,192,.55);animation:ast6-ping 1.8s ease-out infinite}
  @keyframes ast6-ping{from{transform:scale(.8);opacity:.8}to{transform:scale(1.4);opacity:0}}
  .ast6-step--active .ast6-dot i{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#7cf5c0,#4fd8d4 60%,#a89bf7);box-shadow:0 0 8px rgba(124,245,192,.8)}
  .ast6-lbl{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--aur-dim)}
  .ast6-step--active .ast6-lbl{color:var(--aur-txt)}
  .ast6-step--done .ast6-lbl{color:#bfffe3}
  .ast6-cap{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:7px;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--aur-dim)}
  .ast6-cap i{width:5px;height:5px;border-radius:50%;background:var(--aur-g);box-shadow:0 0 6px rgba(124,245,192,.9)}
  @media (prefers-reduced-motion:reduce){.ast6::before,.ast6-step--active .ast6-dot::after{animation:none}}
</style>
<div class="ast6">
  <div class="ast6-steps">
    <div class="ast6-step ast6-step--done">
      <span class="ast6-dot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
      <span class="ast6-lbl">Prompt</span>
    </div>
    <div class="ast6-step ast6-step--active">
      <span class="ast6-dot"><i></i></span>
      <span class="ast6-lbl">Generate</span>
    </div>
    <div class="ast6-step">
      <span class="ast6-dot"></span>
      <span class="ast6-lbl">Review</span>
    </div>
    <div class="ast6-step">
      <span class="ast6-dot"></span>
      <span class="ast6-lbl">Export</span>
    </div>
  </div>
  <div class="ast6-cap"><i></i>Step 2 of 4 · Rendering</div>
</div>`
  },

  {
    id: "EM8",
    section: "empty",
    set: "aurora",
    name: "Aurora Empty State",
    description: "No-renders-yet panel with film glyph and start CTA.",
    creator: "codebuff",
    tags: ["empty", "state", "no-renders", "first-run", "placeholder", "zero-data", "aurora"],
    code: `<style>
  .aem8{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:330px;padding:34px 24px 30px;border-radius:18px;position:relative;overflow:hidden;text-align:center;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .aem8::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aem8-wash 5.5s ease-in-out infinite alternate;
    background:radial-gradient(130px 90px at 85% 0%,rgba(168,155,247,.14),transparent 70%),
               radial-gradient(110px 70px at 10% 100%,rgba(124,245,192,.13),transparent 70%)}
  @keyframes aem8-wash{from{opacity:.3}to{opacity:.65}}
  .aem8-ico{position:relative;z-index:1;width:58px;height:58px;margin:0 auto 15px;border-radius:19px;display:grid;place-items:center;color:#d9fff0;
    background:linear-gradient(135deg,rgba(124,245,192,.16),rgba(79,216,212,.09));border:1px solid rgba(124,245,192,.32);
    box-shadow:0 0 24px rgba(124,245,192,.12)}
  .aem8-ico svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
  .aem8-title{position:relative;z-index:1;font-size:13.5px;font-weight:700}
  .aem8-sub{position:relative;z-index:1;font-size:10.5px;line-height:1.6;color:var(--aur-dim);margin:6px auto 16px;max-width:230px}
  .aem8-btn{position:relative;z-index:1;display:inline-flex;align-items:center;gap:7px;padding:10px 18px;border-radius:12px;font-size:11.5px;font-weight:700;cursor:pointer;color:#07150f;
    background:linear-gradient(115deg,#7cf5c0,#4fd8d4 55%,#a89bf7);border:0;box-shadow:0 6px 18px rgba(79,216,212,.26);transition:transform .16s ease}
  .aem8-btn:hover{transform:translateY(-1px)}
  .aem8-btn svg{width:12px;height:12px}
  @media (prefers-reduced-motion:reduce){.aem8::before{animation:none}.aem8-btn{transition:none}}
</style>
<div class="aem8">
  <span class="aem8-ico"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 8.5h18M3 15.5h18M8.5 4v4.5M15.5 4v4.5M8.5 15.5V20M15.5 15.5V20"/></svg></span>
  <div class="aem8-title">No renders yet</div>
  <p class="aem8-sub">Your generated clips will appear here. Describe a scene and start your first render.</p>
  <button class="aem8-btn"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.6c.7 5.2 2.9 7.4 8 8.1-5.1.7-7.3 2.9-8 8.1-.7-5.2-2.9-7.4-8-8.1 5.1-.7 7.3-2.9 8-8.1z"/></svg>Start your first render</button>
</div>`
  },

  {
    id: "FD6",
    section: "feeds",
    set: "aurora",
    name: "Aurora Render History",
    description: "Job feed with mini thumbnails and status chips.",
    creator: "codebuff",
    tags: ["feed", "history", "activity", "render", "jobs", "status", "aurora"],
    code: `<style>
  .afd6{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    width:360px;padding:14px 16px 10px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .afd6::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:afd6-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(120px 80px at 90% 0%,rgba(79,216,212,.14),transparent 70%)}
  @keyframes afd6-wash{from{opacity:.3}to{opacity:.65}}
  .afd6-head{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
  .afd6-title{font-size:11.5px;font-weight:700}
  .afd6-link{font-size:9.5px;font-weight:600;color:#bfffe3;cursor:pointer;background:none;border:0;padding:0;font-family:inherit}
  .afd6-row{position:relative;z-index:1;display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid rgba(165,214,200,.1)}
  .afd6-row:last-child{border-bottom:0}
  .afd6-thumb{width:38px;height:38px;border-radius:10px;flex:none;display:grid;place-items:center;color:#eafff6;overflow:hidden;
    background:radial-gradient(24px 16px at 70% 30%,rgba(124,245,192,.85),transparent 70%),
               radial-gradient(30px 18px at 20% 0%,rgba(79,216,212,.4),transparent 70%),
               linear-gradient(180deg,#14252f,#0d1a24)}
  .afd6-thumb svg{width:11px;height:11px}
  .afd6-thumb--fail{filter:grayscale(.5) brightness(.85);color:#f0c9c9}
  .afd6-txt{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}
  .afd6-name{font-size:11px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .afd6-meta{font-size:9.5px;color:var(--aur-dim);font-variant-numeric:tabular-nums}
  .afd6-chip{padding:3px 8px;border-radius:999px;font-size:8.5px;font-weight:700;letter-spacing:.08em;flex:none;color:#bfffe3;
    background:linear-gradient(135deg,rgba(124,245,192,.14),rgba(79,216,212,.08));border:1px solid rgba(124,245,192,.3)}
  .afd6-chip--bad{color:#f0c9c9;background:rgba(245,170,170,.08);border-color:rgba(245,170,170,.3)}
  .afd6-chip--dim{color:#8fa8a2;border-style:dashed}
  @media (prefers-reduced-motion:reduce){.afd6::before{animation:none}}
</style>
<div class="afd6">
  <div class="afd6-head"><span class="afd6-title">History</span><button class="afd6-link">View all</button></div>
  <div class="afd6-row">
    <span class="afd6-thumb"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z"/></svg></span>
    <div class="afd6-txt"><span class="afd6-name">Aurora Bloom — 042</span><span class="afd6-meta">LTX · 2K · done · 2h ago</span></div>
    <span class="afd6-chip">Done</span>
  </div>
  <div class="afd6-row">
    <span class="afd6-thumb"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z"/></svg></span>
    <div class="afd6-txt"><span class="afd6-name">Night Drive — 041</span><span class="afd6-meta">WAN · 4K · done · yesterday</span></div>
    <span class="afd6-chip">Done</span>
  </div>
  <div class="afd6-row">
    <span class="afd6-thumb afd6-thumb--fail"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z"/></svg></span>
    <div class="afd6-txt"><span class="afd6-name">Ember Tides — 040</span><span class="afd6-meta">H3 · 2K · failed · 2d ago</span></div>
    <span class="afd6-chip afd6-chip--bad">Failed</span>
  </div>
  <div class="afd6-row">
    <span class="afd6-thumb"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5.5v13l11-6.5z"/></svg></span>
    <div class="afd6-txt"><span class="afd6-name">Glass City — 039</span><span class="afd6-meta">LTX · 2K · queued</span></div>
    <span class="afd6-chip afd6-chip--dim">Queued</span>
  </div>
</div>`
  },

  {
    id: "AV6",
    section: "avatars",
    set: "aurora",
    name: "Aurora Creator Stacks",
    description: "Overlapping gradient-initial avatars with overflow count.",
    creator: "codebuff",
    tags: ["avatars", "stack", "team", "initials", "presence", "aurora"],
    code: `<style>
  .aav6{--aur-g:#7cf5c0;--aur-t:#4fd8d4;--aur-v:#a89bf7;--aur-txt:#e6f5ef;--aur-dim:#9db8b0;
    font-family:ui-sans-serif,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
    display:inline-flex;flex-direction:column;gap:11px;padding:17px 19px;border-radius:16px;position:relative;overflow:hidden;
    background:linear-gradient(180deg,rgba(21,35,44,.88),rgba(10,19,26,.94));
    border:1px solid rgba(124,245,192,.2);color:var(--aur-txt)}
  .aav6::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.45;animation:aav6-wash 6s ease-in-out infinite alternate;
    background:radial-gradient(110px 70px at 88% 0%,rgba(168,155,247,.14),transparent 70%),
               radial-gradient(100px 70px at 8% 100%,rgba(124,245,192,.12),transparent 70%)}
  @keyframes aav6-wash{from{opacity:.3}to{opacity:.65}}
  .aav6-stack{position:relative;z-index:1;display:flex;align-items:center}
  .aav6-av{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-weight:700;letter-spacing:.02em;
    color:#07150f;border:2px solid #0e1921;box-shadow:0 0 0 1px rgba(124,245,192,.25)}
  .aav6-av + .aav6-av{margin-left:-9px}
  .aav6-av--g{background:linear-gradient(135deg,#7cf5c0,#4fd8d4)}
  .aav6-av--t{background:linear-gradient(135deg,#4fd8d4,#a89bf7)}
  .aav6-av--v{background:linear-gradient(135deg,#a89bf7,#7cf5c0)}
  .aav6-av--dim{background:linear-gradient(135deg,#2a3f4c,#1b2c38);color:#cfe9e0;border-color:rgba(124,245,192,.35)}
  .aav6-more{width:34px;height:34px;margin-left:-9px;border-radius:50%;display:grid;place-items:center;font-size:9.5px;font-weight:700;color:#bfffe3;
    background:rgba(124,245,192,.08);border:2px solid #0e1921;box-shadow:0 0 0 1px rgba(124,245,192,.25)}
  .aav6-cap{position:relative;z-index:1;font-size:10px;color:var(--aur-dim)}
  .aav6-cap b{color:#bfffe3;font-weight:600}
  @media (prefers-reduced-motion:reduce){.aav6::before{animation:none}}
</style>
<div class="aav6">
  <div class="aav6-stack">
    <span class="aav6-av aav6-av--g">AV</span>
    <span class="aav6-av aav6-av--t">MK</span>
    <span class="aav6-av aav6-av--v">LN</span>
    <span class="aav6-av aav6-av--dim">SO</span>
    <span class="aav6-more">+3</span>
  </div>
  <div class="aav6-cap">Rendered by <b>your team</b> · 4 active creators</div>
</div>`
  }
);
