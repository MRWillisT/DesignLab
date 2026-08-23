/* Design Lab — public upvotes & leaderboard engine (v2: per-user identity).
   Talks to Supabase PostgREST via fetch (no SDK, works over file:// too).
   Each visitor signs in anonymously (Auth /v1/signup) and gets a real
   server-side user id, so RLS scopes reads/deletes to auth.uid() — clearing
   browser storage cannot resurrect old votes or touch someone else's.

   A daily cap (25 votes per rolling 24h) is enforced twice: server-side by
   the votes_daily_cap trigger in supabase/schema.sql, and mirrored here so
   the UI can warn before the server rejects. Toggling is optimistic with
   rollback. If SUPABASE_CONFIG is not wired up yet, everything degrades to
   a no-op / zero counts. */

window.DesignLabVotes = (function () {
  'use strict';

  const CFG = window.SUPABASE_CONFIG || {};
  const BASE = (CFG.url || '').replace(/\/+$/, '');
  const KEY = CFG.anonKey || '';

  const DAILY_CAP = 25;
  const WEEK_DAYS = 7;
  const LS_SESSION = 'designlab.votes.session.v1';
  const LS_COUNTS = 'designlab.votes.counts.v1';
  const LS_COUNTS_WEEK = 'designlab.votes.counts.week.v1';
  const LS_MINE = 'designlab.votes.mine.v1';
  const LS_DAY = 'designlab.votes.day.v1';

  let counts = new Map();   // itemId -> all-time vote count
  let countsWeek = new Map(); // itemId -> votes in the last 7 days
  let history = new Map();  // itemId -> [{ day: 'YYYY-MM-DD', votes: n }] sorted asc
  let mine = new Set();     // item ids this user has upvoted
  let ready = false;
  const subs = new Set();   // change listeners
  let session = null;       // { access_token, refresh_token, expires_at, user_id }

  /* ---------- helpers ---------- */

  function configured() {
    return !!(BASE && KEY);
  }

  function authHeaders() {
    const h = { apikey: KEY, 'Content-Type': 'application/json' };
    if (session && session.access_token) h['Authorization'] = 'Bearer ' + session.access_token;
    return h;
  }

  function countOf(id) { return counts.get(id) || 0; }
  function countOfWeek(id) { return countsWeek.get(id) || 0; }
  function historyOf(id) { return history.get(id) || []; }
  function voted(id) { return mine.has(id); }
  function isReady() { return ready; }
  function total() { let n = 0; counts.forEach(v => { n += v; }); return n; }
  function totalWeek() { let n = 0; countsWeek.forEach(v => { n += v; }); return n; }

  function onChange(fn) { subs.add(fn); return () => subs.delete(fn); }
  function emit() { subs.forEach(fn => { try { fn(); } catch (e) { /* never let a listener break the app */ } }); }

  /* ---------- anonymous auth session ---------- */

  function loadSession() {
    try {
      const s = JSON.parse(localStorage.getItem(LS_SESSION) || 'null');
      if (s && s.access_token && s.user_id) session = s;
    } catch (e) { /* ignore */ }
  }

  function saveSession() {
    try { localStorage.setItem(LS_SESSION, JSON.stringify(session)); } catch (e) { /* ignore */ }
  }

  function clearSession() {
    session = null;
    try { localStorage.removeItem(LS_SESSION); } catch (e) { /* ignore */ }
  }

  async function ensureSession() {
    if (session && session.access_token && session.user_id && session.expires_at > Date.now()) return true;
    // Try refreshing an expired session first.
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
          saveSession();
          return true;
        }
      } catch (e) { /* fall through to fresh signup */ }
      clearSession();
    }
    // Anonymous signup — creates a real user id server-side.
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
    saveSession();
    return true;
  }

  /* ---------- daily cap (client mirror of the SQL trigger) ---------- */

  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function dayState() {
    try {
      const d = JSON.parse(localStorage.getItem(LS_DAY) || 'null');
      if (d && d.date === todayKey() && typeof d.count === 'number') return d;
    } catch (e) { /* ignore */ }
    return { date: todayKey(), count: 0 };
  }

  function votesLeftToday() {
    if (!configured()) return 0;
    return Math.max(0, DAILY_CAP - dayState().count);
  }

  function bumpDay(delta) {
    const d = dayState();
    d.count = Math.max(0, d.count + delta);
    try { localStorage.setItem(LS_DAY, JSON.stringify(d)); } catch (e) { /* ignore */ }
  }

  /* ---------- persistence ---------- */

  function saveCounts() { try { localStorage.setItem(LS_COUNTS, JSON.stringify([...counts])); } catch (e) { /* ignore */ } }
  function saveWeek() { try { localStorage.setItem(LS_COUNTS_WEEK, JSON.stringify([...countsWeek])); } catch (e) { /* ignore */ } }
  function saveMine() { try { localStorage.setItem(LS_MINE, JSON.stringify([...mine])); } catch (e) { /* ignore */ } }

  function loadCached() {
    try {
      const c = JSON.parse(localStorage.getItem(LS_COUNTS) || '[]');
      if (Array.isArray(c)) counts = new Map(c);
      const w = JSON.parse(localStorage.getItem(LS_COUNTS_WEEK) || '[]');
      if (Array.isArray(w)) countsWeek = new Map(w);
      const m = JSON.parse(localStorage.getItem(LS_MINE) || '[]');
      if (Array.isArray(m)) mine = new Set(m);
    } catch (e) { /* ignore */ }
  }

  /* ---------- network ---------- */

  async function loadCounts() {
    const [resAll, resWeek, resHist] = await Promise.all([
      fetch(BASE + '/rest/v1/vote_counts?select=item_id,votes', { headers: authHeaders() }),
      fetch(BASE + '/rest/v1/vote_counts_week?select=item_id,votes', { headers: authHeaders() }),
      fetch(BASE + '/rest/v1/vote_history?select=item_id,day,votes', { headers: authHeaders() })
    ]);
    if (!resAll.ok) throw new Error('counts ' + resAll.status);
    const rowsAll = await resAll.json();
    counts = new Map((rowsAll || []).map(r => [r.item_id, Number(r.votes) || 0]));
    saveCounts();

    if (resWeek.ok) {
      const rowsWeek = await resWeek.json();
      countsWeek = new Map((rowsWeek || []).map(r => [r.item_id, Number(r.votes) || 0]));
    }
    saveWeek();

    if (resHist.ok) {
      const rowsHist = await resHist.json();
      const h = new Map();
      (rowsHist || []).forEach(r => {
        const arr = h.get(r.item_id) || [];
        arr.push({ day: String(r.day), votes: Number(r.votes) || 0 });
        h.set(r.item_id, arr);
      });
      h.forEach((arr, id) => h.set(id, arr.sort((a, b) => a.day < b.day ? -1 : a.day > b.day ? 1 : 0)));
      history = h;
    }
  }

  async function loadMine() {
    if (!session || !session.user_id) return;
    const uid = encodeURIComponent(session.user_id);
    const res = await fetch(BASE + '/rest/v1/votes?select=item_id&user_id=eq.' + uid, { headers: authHeaders() });
    if (!res.ok) throw new Error('mine ' + res.status);
    const rows = await res.json();
    mine = new Set((rows || []).map(r => r.item_id));
    saveMine();
  }

  async function init() {
    loadCached();
    if (!configured()) { emit(); return; }
    try {
      await ensureSession();
      await Promise.all([loadCounts(), loadMine()]);
      ready = true;
    } catch (e) {
      // offline or not configured — keep the cached snapshot
    }
    emit();
  }

  /* Lightweight re-sync for live polling — used to catch rank moves from
     other visitors without a full page reload. */
  async function refresh() {
    if (!configured()) return;
    try {
      await ensureSession();
      await Promise.all([loadCounts(), loadMine()]);
      ready = true;
    } catch (e) { /* keep last known */ }
    emit();
  }

  /* Toggle an upvote on/off for one specimen. Returns { ok, voted, reason }.
     Reasons: 'unconfigured' | 'cap' | network error message. Optimistic, with
     rollback — and the server (trigger + RLS) is the final authority. */
  async function toggle(item) {
    if (!configured()) return { ok: false, reason: 'unconfigured' };
    const id = item.id;
    const wasVoted = mine.has(id);

    if (!wasVoted && votesLeftToday() <= 0) return { ok: false, reason: 'cap' };

    // optimistic flip
    if (wasVoted) {
      mine.delete(id);
      counts.set(id, Math.max(0, countOf(id) - 1));
    } else {
      mine.add(id);
      counts.set(id, countOf(id) + 1);
    }
    saveCounts(); saveMine(); emit();

    try {
      await ensureSession();
      if (!session || !session.user_id) throw new Error('no session');

      if (wasVoted) {
        const q = 'item_id=eq.' + encodeURIComponent(id)
          + '&user_id=eq.' + encodeURIComponent(session.user_id);
        const res = await fetch(BASE + '/rest/v1/votes?' + q, { method: 'DELETE', headers: authHeaders() });
        if (res.status !== 204 && !res.ok) throw new Error('delete ' + res.status);
        bumpDay(-1);
      } else {
        const res = await fetch(BASE + '/rest/v1/votes', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ item_id: id, creator_id: item.creator || '' })
        });
        if (res.status === 400) {
          // the SQL trigger rejected the insert (daily cap)
          throw { cap: true };
        }
        if (!res.ok && res.status !== 201 && res.status !== 200) {
          throw new Error('vote ' + res.status);
        }
        bumpDay(1);
      }
      await loadCounts(); // re-sync the authoritative count
      emit();
      return { ok: true, voted: !wasVoted };
    } catch (e) {
      // rollback
      if (wasVoted) {
        mine.add(id);
        counts.set(id, countOf(id) + 1);
      } else {
        mine.delete(id);
        counts.set(id, Math.max(0, countOf(id) - 1));
      }
      saveCounts(); saveMine(); emit();
      return { ok: false, reason: e && e.cap ? 'cap' : String((e && e.message) || e) };
    }
  }

  return {
    configured, isReady, init, refresh, toggle,
    countOf, countOfWeek, historyOf, voted, onChange, total, totalWeek,
    votesLeftToday, DAILY_CAP, WEEK_DAYS,
    countsMap: () => counts,
    countsWeekMap: () => countsWeek,
    mineSet: () => mine
  };
})();
