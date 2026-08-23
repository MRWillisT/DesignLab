/* Design Lab — live specimen ingest.
   Reads/writes public.live_specimens via PostgREST (no SDK).
   Shares the anonymous auth session with votes.js so a visitor
   who already voted can publish without a second signup.
   If the table hasn't been created yet, fetch/publish no-op with
   a clear status so the UI can fall back to GitHub issues. */

window.DesignLabLive = (function () {
  'use strict';

  const CFG = window.SUPABASE_CONFIG || {};
  const BASE = (CFG.url || '').replace(/\/+$/, '');
  const KEY = CFG.anonKey || '';
  const LS_SESSION = 'designlab.votes.session.v1';
  const LS_CACHE = 'designlab.live.v1';
  const POLL_MS = 40000;
  const MAX_BATCH = 8;
  const MAX_CODE = 80000;

  let rows = [];
  let ready = false;
  let available = false;
  let lastError = '';
  const subs = new Set();

  function configured() { return !!(BASE && KEY); }
  function isReady() { return ready; }
  function isAvailable() { return available; }
  function statusError() { return lastError; }
  function items() {
    return rows.map(rowToItem);
  }
  function newest(n) {
    return items().slice(0, n || 12);
  }

  function onChange(fn) { subs.add(fn); return () => subs.delete(fn); }
  function emit() { subs.forEach(fn => { try { fn(); } catch (e) { /* ignore */ } }); }

  function loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(LS_SESSION) || 'null');
      if (s && s.access_token && s.user_id) return s;
    } catch (e) { /* ignore */ }
    return null;
  }

  function saveSession(session) {
    try { localStorage.setItem(LS_SESSION, JSON.stringify(session)); } catch (e) { /* ignore */ }
  }

  function authHeaders(session) {
    const h = { apikey: KEY, 'Content-Type': 'application/json' };
    if (session && session.access_token) h['Authorization'] = 'Bearer ' + session.access_token;
    else h['Authorization'] = 'Bearer ' + KEY;
    return h;
  }

  async function ensureSession() {
    let session = loadSession();
    if (session && session.access_token && session.user_id && session.expires_at > Date.now()) return session;
    if (session && session.refresh_token) {
      try {
        const res = await fetch(BASE + '/auth/v1/token?grant_type=refresh_token', {
          method: 'POST',
          headers: { apikey: KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: session.refresh_token })
        });
        if (res.ok) {
          const j = await res.json();
          session = {
            access_token: j.access_token,
            refresh_token: j.refresh_token || session.refresh_token,
            expires_at: Date.now() + ((j.expires_in || 3600) * 1000),
            user_id: (j.user && j.user.id) || session.user_id
          };
          saveSession(session);
          return session;
        }
      } catch (e) { /* fall through */ }
    }
    const res = await fetch(BASE + '/auth/v1/signup', {
      method: 'POST',
      headers: { apikey: KEY, 'Content-Type': 'application/json' },
      body: '{}'
    });
    if (!res.ok) throw new Error('anon signup ' + res.status);
    const j = await res.json();
    session = {
      access_token: j.access_token,
      refresh_token: j.refresh_token,
      expires_at: Date.now() + ((j.expires_in || 3600) * 1000),
      user_id: j.user && j.user.id
    };
    saveSession(session);
    return session;
  }

  function rowToItem(r) {
    return {
      id: r.item_id,
      section: r.section,
      name: r.name,
      description: r.description || '',
      creator: r.creator_id,
      tags: Array.isArray(r.tags) ? r.tags : [],
      tweaks: Array.isArray(r.tweaks) ? r.tweaks : undefined,
      code: r.code,
      live: true,
      createdAt: r.created_at,
      _creator: { id: r.creator_id, name: r.creator_name, color: r.creator_color }
    };
  }

  function creatorOf(id) {
    const row = rows.find(r => r.creator_id === id);
    if (!row) return null;
    return { id: row.creator_id, name: row.creator_name, color: row.creator_color };
  }

  function loadCache() {
    try {
      const c = JSON.parse(localStorage.getItem(LS_CACHE) || 'null');
      if (c && Array.isArray(c.rows)) rows = c.rows;
    } catch (e) { /* ignore */ }
  }

  function saveCache() {
    try { localStorage.setItem(LS_CACHE, JSON.stringify({ rows: rows })); } catch (e) { /* ignore */ }
  }

  async function refresh() {
    if (!configured()) return false;
    const res = await fetch(
      BASE + '/rest/v1/live_specimens?select=item_id,section,name,description,creator_id,creator_name,creator_color,tags,tweaks,code,created_at&order=created_at.desc&limit=200',
      { headers: authHeaders(loadSession()) }
    );
    if (res.status === 404) {
      available = false;
      lastError = 'missing-table';
      ready = true;
      return false;
    }
    if (!res.ok) {
      lastError = 'fetch ' + res.status;
      throw new Error(lastError);
    }
    const data = await res.json();
    available = true;
    lastError = '';
    const prev = rows.map(r => r.item_id).join('|');
    rows = Array.isArray(data) ? data : [];
    saveCache();
    ready = true;
    const next = rows.map(r => r.item_id).join('|');
    if (prev !== next) emit();
    return prev !== next;
  }

  function slugId(sectionCode, taken) {
    let n = 1;
    while (taken.has(sectionCode + n)) n++;
    return sectionCode + n;
  }

  async function publish(rawItems, meta) {
    if (!configured()) return { ok: false, error: 'Supabase is not configured.' };
    const list = Array.isArray(rawItems) ? rawItems : [rawItems];
    if (!list.length) return { ok: false, error: 'Nothing to publish.' };
    if (list.length > MAX_BATCH) return { ok: false, error: 'Publish at most ' + MAX_BATCH + ' specimens at a time.' };

    const session = await ensureSession();
    await refresh();
    if (!available) {
      return { ok: false, error: 'missing-table' };
    }

    const taken = new Set((meta && meta.takenIds) || []);
    rows.forEach(r => taken.add(r.item_id));

    const payload = [];
    for (const raw of list) {
      if (!raw || typeof raw !== 'object') continue;
      const section = String(raw.section || '').trim();
      const name = String(raw.name || '').trim();
      const code = String(raw.code || '');
      if (!section || !name || code.length < 20) {
        return { ok: false, error: 'Each item needs section, name, and code.' };
      }
      if (code.length > MAX_CODE) {
        return { ok: false, error: name + ': code is too large.' };
      }
      let id = String(raw.id || '').trim();
      if (!id || taken.has(id) || !/^[A-Za-z][A-Za-z0-9_-]{1,23}$/.test(id)) {
        const codePrefix = (meta && meta.sectionCode && meta.sectionCode[section]) || section.slice(0, 2).toUpperCase();
        id = slugId(codePrefix, taken);
      }
      taken.add(id);
      const creatorId = String((raw.creator || (meta && meta.creatorId) || '')).trim();
      if (!creatorId || creatorId.toLowerCase() === 'me') {
        return { ok: false, error: 'Sign every item with a real creator id (not "me").' };
      }
      payload.push({
        item_id: id,
        section: section,
        name: name,
        description: String(raw.description || '').slice(0, 400),
        creator_id: creatorId.slice(0, 40),
        creator_name: String((meta && meta.creatorName) || raw.creatorName || creatorId).slice(0, 40),
        creator_color: String((meta && meta.creatorColor) || raw.creatorColor || '#94a3b8').slice(0, 24),
        tags: Array.isArray(raw.tags) ? raw.tags.filter(t => typeof t === 'string').slice(0, 12) : [],
        tweaks: Array.isArray(raw.tweaks) ? raw.tweaks.slice(0, 3) : null,
        code: code
      });
    }

    if (!payload.length) return { ok: false, error: 'Nothing valid to publish.' };

    const res = await fetch(BASE + '/rest/v1/live_specimens', {
      method: 'POST',
      headers: Object.assign({ Prefer: 'return=representation' }, authHeaders(session)),
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      let msg = 'publish ' + res.status;
      try {
        const err = await res.json();
        msg = err.message || err.hint || msg;
      } catch (e) { /* ignore */ }
      if (res.status === 404) return { ok: false, error: 'missing-table' };
      return { ok: false, error: msg };
    }
    const inserted = await res.json();
    await refresh();
    emit();
    return { ok: true, added: (inserted || []).map(r => r.item_id) };
  }

  async function init() {
    if (!configured()) {
      ready = true;
      return;
    }
    loadCache();
    try {
      await refresh();
    } catch (e) {
      lastError = e.message || 'fetch failed';
      ready = true;
    }
    setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      refresh().catch(() => {});
    }, POLL_MS);
  }

  return {
    init, refresh, publish, items, newest, creatorOf,
    isReady, isAvailable, statusError, onChange, configured
  };
})();
