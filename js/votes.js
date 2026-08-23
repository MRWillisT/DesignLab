/* Design Lab — public upvotes & leaderboard engine.
   Talks to Supabase PostgREST directly via fetch (no SDK, works over
   file:// too). Identity = a per-browser device id in localStorage,
   so one vote per device per specimen. Counts are cached locally and
   refreshed from the server; optimistic toggling keeps the UI snappy
   and rolls back if the network call fails. If SUPABASE_CONFIG is not
   wired up yet, every method degrades to a no-op / zero counts. */

window.DesignLabVotes = (function () {
  'use strict';

  const CFG = window.SUPABASE_CONFIG || {};
  const BASE = (CFG.url || '').replace(/\/+$/, '');
  const KEY = CFG.anonKey || '';

  const LS_DEVICE = 'designlab.votes.device.v1';
  const LS_COUNTS = 'designlab.votes.counts.v1';
  const LS_MINE = 'designlab.votes.mine.v1';

  let counts = new Map();   // itemId -> vote count
  let mine = new Set();     // item ids this device has upvoted
  let ready = false;
  const subs = new Set();   // change listeners

  /* ---------- helpers ---------- */

  function configured() {
    return !!(BASE && KEY);
  }

  function deviceId() {
    try {
      let d = localStorage.getItem(LS_DEVICE);
      if (!d) {
        d = (crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
        localStorage.setItem(LS_DEVICE, d);
      }
      return d;
    } catch (e) {
      return 'anon';
    }
  }

  function authHeaders() {
    const h = { apikey: KEY, 'Content-Type': 'application/json' };
    if (configured()) h['x-device-id'] = deviceId();
    return h;
  }

  function countOf(id) { return counts.get(id) || 0; }
  function voted(id) { return mine.has(id); }
  function isReady() { return ready; }
  function total() { let n = 0; counts.forEach(v => { n += v; }); return n; }

  function onChange(fn) { subs.add(fn); return () => subs.delete(fn); }
  function emit() { subs.forEach(fn => { try { fn(); } catch (e) { /* never let a listener break the app */ } }); }

  /* ---------- persistence ---------- */

  function saveCounts() { try { localStorage.setItem(LS_COUNTS, JSON.stringify([...counts])); } catch (e) { /* ignore */ } }
  function saveMine() { try { localStorage.setItem(LS_MINE, JSON.stringify([...mine])); } catch (e) { /* ignore */ } }

  function loadCached() {
    try {
      const c = JSON.parse(localStorage.getItem(LS_COUNTS) || '[]');
      if (Array.isArray(c)) counts = new Map(c);
      const m = JSON.parse(localStorage.getItem(LS_MINE) || '[]');
      if (Array.isArray(m)) mine = new Set(m);
    } catch (e) { /* ignore */ }
  }

  /* ---------- network ---------- */

  async function loadCounts() {
    const res = await fetch(BASE + '/rest/v1/vote_counts?select=item_id,votes', { headers: authHeaders() });
    if (!res.ok) throw new Error('counts ' + res.status);
    const rows = await res.json();
    counts = new Map((rows || []).map(r => [r.item_id, Number(r.votes) || 0]));
    saveCounts();
  }

  async function loadMine() {
    const dev = encodeURIComponent(deviceId());
    const res = await fetch(BASE + '/rest/v1/votes?select=item_id&device_id=eq.' + dev, { headers: authHeaders() });
    if (!res.ok) throw new Error('mine ' + res.status);
    const rows = await res.json();
    mine = new Set((rows || []).map(r => r.item_id));
    saveMine();
  }

  async function init() {
    loadCached();
    if (!configured()) { emit(); return; }
    try {
      await Promise.all([loadCounts(), loadMine()]);
      ready = true;
    } catch (e) {
      // offline or not configured — keep the cached snapshot
    }
    emit();
  }

  /* Toggle an upvote on/off for one specimen. Returns { ok, voted, reason }.
     Optimistic: flips local state immediately, then reconciles with the
     server, rolling back on failure. */
  async function toggle(item) {
    if (!configured()) return { ok: false, reason: 'unconfigured' };
    const id = item.id;
    const wasVoted = mine.has(id);

    if (wasVoted) {
      mine.delete(id);
      counts.set(id, Math.max(0, countOf(id) - 1));
    } else {
      mine.add(id);
      counts.set(id, countOf(id) + 1);
    }
    saveCounts(); saveMine(); emit();

    try {
      if (wasVoted) {
        const q = 'item_id=eq.' + encodeURIComponent(id)
          + '&device_id=eq.' + encodeURIComponent(deviceId());
        await fetch(BASE + '/rest/v1/votes?' + q, { method: 'DELETE', headers: authHeaders() });
      } else {
        await fetch(BASE + '/rest/v1/votes', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ item_id: id, creator_id: item.creator || '', device_id: deviceId() })
        });
      }
      await loadCounts(); // re-sync the authoritative count
      emit();
      return { ok: true, voted: !wasVoted };
    } catch (e) {
      if (wasVoted) {
        mine.add(id);
        counts.set(id, countOf(id) + 1);
      } else {
        mine.delete(id);
        counts.set(id, Math.max(0, countOf(id) - 1));
      }
      saveCounts(); saveMine(); emit();
      return { ok: false, reason: String((e && e.message) || e) };
    }
  }

  return {
    configured, isReady, init, toggle,
    countOf, voted, onChange, total,
    countsMap: () => counts,
    mineSet: () => mine
  };
})();
