/* ============================================================
   DESIGN LAB — behavioral smoke test (no runtime dependencies)

   Mounts every specimen's inline <script> blocks in a sandboxed
   VM with a fake DOM, fires every event listener that got
   registered at mount, runs every inline on*="" handler, and
   verifies statically that every id/class a script targets
   actually exists in the snippet's own markup.

   Catches, with the exact item id named:
     - script syntax errors and mount-time reference errors
     - getElementById of an id that isn't in the markup
     - querySelector/closest selectors nothing in the markup can
       match (e.g. a handler driving a `.fill` element that was
       never in the snippet — the "drag threw on first move"
       class of bug)
     - handlers that throw when fired (interaction regressions)

   Deliberately NOT a real browser: layout, :checked CSS states
   and drag "feel" stay in the human/browser pass. If a snippet
   uses a DOM API the fake doesn't know, add it here — the fake
   is the contract.

   Usage: imported by scripts/check-registry.mjs (pre-push gate);
   also runnable directly:  node scripts/smoke-test.mjs < ../js/data.js
   ============================================================ */

import vm from 'node:vm';

/* Strip <style> and <script> blocks so the leftovers are pure markup. */
function extractMarkup(code) {
  return code
    .replace(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/gi, '')
    .replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, '');
}

/* ------------------------- fake DOM ---------------------------------- */

function makeFakeDom(allHandlers) {
  let gen = 0;

  const newClassList = () => {
    const s = new Set();
    return {
      add(c) { s.add(c); },
      remove(c) { s.delete(c); },
      contains(c) { return s.has(c); },
      toggle(c, force) {
        let on = force === undefined ? !s.has(c) : !!force;
        if (on) s.add(c); else s.delete(c);
        return on;
      },
      toString() { return [...s].join(' '); },
    };
  };

  const newStyle = () => {
    const store = {};
    return new Proxy({}, {
      get(t, k) {
        if (k === 'setProperty') return (p, v) => { store[p] = String(v); };
        if (k === 'removeProperty') return (p) => { delete store[p]; };
        if (k === 'getPropertyValue') return (p) => (p in store ? store[p] : '');
        if (k === 'cssText' || k === 'cssFloat') return '';
        return typeof k === 'string' && k in store ? store[k] : '';
      },
      set(t, k, v) { store[k] = v; return true; },
      deleteProperty(t, k) { delete store[k]; return true; },
    });
  };

  function makeEl() {
    const me = { id: 'el' + (gen++), attrs: new Map(), styleObj: newStyle() };
    return new Proxy(me, {
      get(t, k) {
        switch (k) {
          case 'addEventListener':
            return (ty, fn) => allHandlers.push({ type: String(ty).toLowerCase(), fn, el: null });
          case 'removeEventListener': return () => {};
          case 'setAttribute': return (k2, v) => { t.attrs.set(String(k2), String(v)); };
          case 'getAttribute': return (k2) => (t.attrs.has(String(k2)) ? t.attrs.get(String(k2)) : null);
          case 'hasAttribute': return (k2) => t.attrs.has(String(k2));
          case 'classList': return newClassList();
          case 'style': return t.styleObj;
          case 'dataset': return {};
          case 'querySelector': return () => makeEl();
          case 'querySelectorAll': return () => [makeEl(), makeEl()];
          case 'closest': return () => makeEl();
          case 'matches': return () => false;
          case 'contains': return () => true;
          case 'getBoundingClientRect':
            return () => ({ left: 0, top: 0, right: 160, bottom: 40, width: 160, height: 40, x: 0, y: 0 });
          case 'nextElementSibling': case 'previousElementSibling':
          case 'parentElement': case 'firstElementChild': case 'lastElementChild':
          case 'nextSibling': case 'previousSibling': case 'firstChild': case 'lastChild':
            return makeEl();
          case 'appendChild': case 'insertBefore': case 'prepend': case 'replaceChildren':
          case 'removeChild': case 'remove': case 'replaceWith': case 'before': case 'after':
            return (c) => (c === undefined ? undefined : c);
          case 'dispatchEvent': return () => true;
          case 'focus': case 'blur': case 'click': case 'reset': case 'submit':
          case 'scrollIntoView': case 'setPointerCapture': case 'releasePointerCapture':
          case 'reportValidity': case 'checkValidity': case 'select':
          case 'scrollTo': case 'setSelectionRange':
            return () => {};
          case 'toString': return () => '[object HTMLElement]';
          case 'valueOf': return () => t;
          case 'tagName': return 'DIV';
          case 'nodeName': return 'DIV';
          case 'nodeType': return 1;
          case 'value': return '50';
          case 'checked': return false;
          case 'textContent': case 'innerHTML': case 'innerText': case 'name':
          case 'placeholder': case 'src': case 'href': case 'type': case 'id':
            return '';
          case 'offsetWidth': case 'clientWidth': return 160;
          case 'offsetHeight': case 'clientHeight': return 40;
          case 'scrollTop': case 'scrollLeft': case 'selectedIndex': return 0;
          case 'files': case 'children': case 'childNodes': case 'options':
          case 'selectedOptions': case 'attributes': case 'length':
            return [];
          case 'dataset': case 'style': case 'classList': break; // handled above
          case 'form': case 'parentNode': return makeEl();
          default: return undefined;
        }
      },
      set(t, k, v) { t[k] = v; return true; },
      has() { return true; },
    });
  }

  const doc = {
    getElementById: () => makeEl(),
    querySelector: () => makeEl(),
    querySelectorAll: () => [makeEl(), makeEl()],
    createElement: () => makeEl(),
    createTextNode: () => makeEl(),
    addEventListener: (ty, fn) => allHandlers.push({ type: String(ty).toLowerCase(), fn, el: null }),
    removeEventListener: () => {},
    body: makeEl(),
    documentElement: makeEl(),
    head: makeEl(),
    title: '', readyState: 'complete', visibilityState: 'visible',
    contains: () => true,
    cookie: '',
  };

  return { doc, makeEl };
}

function makeEvent(type) {
  return {
    type,
    target: null,
    currentTarget: null,
    preventDefault() { this.defaultPrevented = true; },
    stopPropagation() {}, stopImmediatePropagation() {},
    clientX: 24, clientY: 16, pageX: 24, pageY: 16,
    screenX: 24, screenY: 16, offsetX: 4, offsetY: 4,
    buttons: 1, button: 0, detail: 1,
    key: 'Escape', keyCode: 27, which: 1, code: 'Escape',
    altKey: false, ctrlKey: false, shiftKey: false, metaKey: false,
    repeat: false, isComposing: false,
    relatedTarget: null, composedPath: () => [],
    dataTransfer: {
      types: [], items: [], files: [],
      setData() {}, clearData() {}, setDragImage() {},
      getData: () => '', getFiles: () => [],
      dropEffect: 'none', effectAllowed: 'all',
    },
    setPointerCapture() {}, releasePointerCapture() {},
    getCoalescedEvents: () => [], getModifierState: () => false,
  };
}

function makeWindowShim(doc, allHandlers) {
  return {
    innerWidth: 1280, innerHeight: 800, devicePixelRatio: 2,
    addEventListener: (ty, fn) => allHandlers.push({ type: String(ty).toLowerCase(), fn, el: null }),
    removeEventListener: () => {},
    matchMedia: () => ({
      matches: false,
      addEventListener() {}, removeEventListener() {},
      addListener() {}, removeListener() {},
    }),
    setTimeout: () => 0, setInterval: () => 0,
    clearTimeout() {}, clearInterval() {},
    requestAnimationFrame: () => 0, cancelAnimationFrame() {},
    scrollTo() {}, open() {}, close() {},
    getComputedStyle: () => ({ getPropertyValue: () => '', setProperty() {}, removeProperty() {} }),
    location: { href: 'about:blank' },
    navigator: { userAgent: 'smoke' },
    document: doc,
    getSelection: () => ({
      toString: () => 'DeepSeek',
      rangeCount: 1,
      removeAllRanges() {},
      getRangeAt: () => ({ getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 14 }) }),
    }),
  };
}

/* ------------------------- static checks ------------------------------ */

function markupHasId(markup, id) {
  const esc = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`id=["']${esc}["']`, 'i').test(markup);
}

/** Extract leading .class / #id tokens from a selector string. */
function selectorTokens(sel) {
  const clean = sel
    .replace(/\[[^\]]*\]/g, '')
    .replace(/::?[a-zA-Z-]+\s*\([^)]*\)/g, '')
    .replace(/::?[a-zA-Z-]+/g, '');
  return [...clean.matchAll(/[.#][a-zA-Z][\w-]*/g)].map(m => m[0]);
}

/* ------------------------- main entry -------------------------------- */

export function runSmoke(items, { verbose = false } = {}) {
  const errors = [];
  const stats = {
    itemsScanned: 0, scriptedItems: 0, scripts: 0,
    listenersRegistered: 0, listenersFired: 0, inlineHandlers: 0,
  };
  const seen = new Set();

  for (const item of items) {
    if (!item || typeof item.code !== 'string' || !item.code.includes('<')) continue;
    const label = item.id ? `#${item.id}` : '<unnamed>';
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    stats.itemsScanned++;

    const code = item.code;
    const markup = extractMarkup(code);

    /* classes the script itself toggles at runtime (state classes) */
    const dynamicClasses = new Set();
    for (const sb of code.matchAll(/<script(?:"[^"]*?|'[^']*?|[^"'])*?>([\s\S]*?)<\/script>/gi)) {
      for (const m of sb[1].matchAll(/classList\.(?:add|remove|toggle|contains)\(\s*["']([^"']+)["']/g)) {
        dynamicClasses.add(m[1]);
      }
    }

    /* ---- A. static: every queried id/class must exist in the markup ---- */
    for (const m of code.matchAll(/getElementById\(\s*["'`]([^"'`]*)["'`]/g)) {
      const id = m[1];
      if (!id) continue;
      const after = code[m.index + m[0].length];
      if (after === '+' || id.includes('$') || id.includes('`')) continue; // dynamically built
      if (!markupHasId(markup, id)) {
        errors.push(`${label}: getElementById('${id}') but no element id="${id}" in the snippet markup`);
      }
    }
    for (const m of code.matchAll(/\.(querySelector|querySelectorAll|closest|matches)\s*\(\s*["'`]([^"'`]*)["'`]/g)) {
      const sel = m[2];
      if (!sel || sel.includes('$') || sel.includes('`')) continue;
      const after = code[m.index + m[0].length];
      if (after === '+') continue; // dynamically built selector
      for (const tok of selectorTokens(sel)) {
        const name = tok.slice(1);
        if (tok[0] === '.') {
          if (!markup.includes(name) && !dynamicClasses.has(name)) {
            errors.push(`${label}: selector '${sel}' needs class "${name}" but it never appears in the markup nor is toggled by the script`);
          }
        } else if (!markupHasId(markup, name)) {
          errors.push(`${label}: selector '${sel}' needs id "${name}" but no element has it in the markup`);
        }
      }
    }

    /* ---- B. dynamic: mount the scripts (if any), then fire every handler ---- */
    const allHandlers = [];
    const { doc, makeEl } = makeFakeDom(allHandlers);
    const win = makeWindowShim(doc, allHandlers);
    const sandbox = {
      window: win, self: win, document: doc,
      getComputedStyle: (el) => win.getComputedStyle(el),
      console: { log() {}, warn() {}, error() {}, info() {}, debug() {} },
      setTimeout: () => 0, setInterval: () => 0,
      clearTimeout() {}, clearInterval() {},
      requestAnimationFrame: () => 0, cancelAnimationFrame() {},
      CSS: { escape: (s) => s },
      atob: (s) => s, btoa: (s) => s,
      performance: { now: () => 0 },
    };
    const ctx = vm.createContext(sandbox);

    const scriptBlocks = [...code.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
    if (scriptBlocks.length) {
      stats.scriptedItems++;
      stats.scripts += scriptBlocks.length;
      for (const sb of scriptBlocks) {
        try {
          vm.runInContext(sb[1], ctx, { filename: `#${item.id} script`, timeout: 1500 });
        } catch (e) {
          errors.push(`${label}: script threw at mount: ${e.message}`);
        }
      }
    }

    /* fire every listener registered at mount once, with a plausible fake event */
    stats.listenersRegistered += allHandlers.length;
    for (const rec of allHandlers.slice()) {
      const ev = makeEvent(rec.type);
      ev.target = makeEl();
      ev.currentTarget = ev.target;
      try {
        rec.fn(ev);
        stats.listenersFired++;
      } catch (e) {
        if (verbose) console.log(`  [smoke] ${label} '${rec.type}' → threw: ${e.message}`);
        errors.push(`${label}: handler for '${rec.type}' threw when fired: ${e.message}`);
      }
    }

    /* inline on*="" handlers in the markup itself */
    for (const m of code.matchAll(/<[a-zA-Z][^>]*?\s(on[a-zA-Z]+)=(["'])([\s\S]*?)\2/g)) {
      const handlerName = m[1];
      const body = m[3];
      if (!body.trim()) continue;
      stats.inlineHandlers++;
      let fn = null;
      try {
        fn = vm.runInContext(`(function(){ return function(event){ ${body} }; })()`, ctx, {
          filename: `${label}:${handlerName}`,
          timeout: 500,
        });
      } catch (e) {
        errors.push(`${label}: inline ${handlerName} handler did not compile: ${e.message}`);
        continue;
      }
      const el = makeEl();
      const ev = makeEvent(handlerName.replace(/^on/, ''));
      ev.target = el;
      ev.currentTarget = el;
      try {
        fn.call(el, ev);
      } catch (e) {
        if (verbose) console.log(`  [smoke] ${label} inline ${handlerName} → threw: ${e.message}`);
        errors.push(`${label}: inline ${handlerName} handler threw: ${e.message}`);
      }
    }
  }

  return { errors, stats };
}

/* Direct CLI usage: load registry file(s) (data.js and/or batches) and smoke them. */
import { pathToFileURL } from 'node:url';
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { readFileSync } = await import('node:fs');
  const { resolve } = await import('node:path');
  let items = [];
  for (const arg of process.argv.slice(2)) {
    const src = readFileSync(resolve(arg), 'utf8');
    const sandbox = { window: { DESIGN_LAB: { items: [] } } };
    vm.createContext(sandbox);
    vm.runInContext(src, sandbox, { filename: arg });
    items = items.concat(sandbox.window.DESIGN_LAB.items || []);
  }
  const { errors, stats } = runSmoke(items, { verbose: false });
  console.log(`Smoke: ${stats.itemsScanned} items · ${stats.scriptedItems} with <script> · ${stats.scripts} scripts · ` +
    `${stats.listenersRegistered} listeners · ${stats.listenersFired} fired · ${stats.inlineHandlers} inline handlers ${errors.length ? '· ERRORS ' + errors.length : '· clean'}`);
  if (verbose && errors.length) {
    for (const e of errors) console.log('  ✖ ' + e);
  }
  for (const e of errors) console.error('  ✖ ' + e);
  process.exit(errors.length ? 1 : 0);
}