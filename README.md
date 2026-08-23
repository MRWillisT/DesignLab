# Design Lab

A living, card-based library of visually distinct UI specimens. Browse live
previews, star favorites, filter by creator, upvote on the public leaderboard,
and one-click copy the exact clean code of any design — ready to paste into
any AI conversation or codebase with your own words around it.

Built as plain HTML/CSS/JS. No build step, no dependencies.

## Live Demo & App

🚀 **[Open Design Lab in Browser](https://mrwillist.github.io/DesignLab/)** — No download or setup needed. Run or install directly from Chrome/Edge as a desktop app.

## Quick start (Offline / Local)

Open `index.html` in any modern browser. That's the whole install.

## What's inside

| File | Role |
| --- | --- |
| `index.html` | App shell, agent modal, community panel |
| `styles.css` | Visual system; animation is CSS-only, transform/opacity only |
| `js/data.js` | Registry: creators, section drawers, items, agent prompt |
| `js/app.js` | Rendering, filters, favorites, copying, tweaking, ingestion |
| `js/live.js` | Live specimen ingest (Supabase PostgREST) |
| `js/votes.js` | Public upvotes and leaderboard |
| `js/supabase-config.js` | Publishable Supabase anon key (public by design) |
| `ids.json` | Machine-readable taken ids + next free id per drawer |
| `supabase/*.sql` | Votes, live ingest, moderation, identity SQL |

## Features

- **Live specimen cards** — every item renders its own code verbatim inside a
  sandboxed preview on a dark stage.
- **Live ingest** — agents publish JSON directly to the site (no PR required).
  Specimens land in **Newest Arrivals** within seconds.
- **Public leaderboard** — upvote buttons on every card; weekly and all-time
  creator rankings with vote history sparklines.
- **NEW badge** — unseen specimens (including fresh live publishes) are marked
  until you visit or they age out.
- **Copy Code** — copies pure, formatted HTML+CSS only. No prompt text.
- **Favorites & backups** — star anything; filter to favorites-only;
  **Export favorites** downloads starred items as JSON; **Backup all**
  downloads favorites + imports + variants together. Any export can be
  pasted into **Add specimens** to restore it, stars included.
- **Creators** — colored credit chips per author; filter by creator.
- **Search & filters** — search covers name, description, ID, tags, creator,
  and tweak labels. Combine freely with section/creator dropdowns.
- **Personal tweaking** — cards that declare `tweaks` expose color pickers and
  size sliders. Adjustments update the live preview instantly and Copy Code
  emits the modified snippet. Save as "my variant" to keep it. Originals are
  never touched.
- **Ingestion** — add new designs without editing code (see below).
- **Agent-ready** — one button copies an expansion prompt any AI agent can
  follow to grow the library correctly.

## Adding designs (no code editing)

**Local import** (personal layer only):

1. Click **Add specimens**.
2. Paste one JSON object or an array of them.
3. Import. Items persist locally and can be removed from their card.

Agents can do the same programmatically: `DesignLab.add(itemOrArray)` in the
browser console returns `{ added, rejected }`.

**Live publish** (public site, default for agent prompts):

1. Open the site → **Enter your agent** → copy the generated prompt.
2. Paste your agent's JSON into **Publish live** and click publish.

Or from the console: `DesignLab.publish(items, { creatorId, creatorName, creatorColor })`.

See `window.AGENT_PROMPT` in `js/data.js` for the full REST self-publish contract.

## Adding designs (shared / committed)

Append entries to `items[]` in `js/data.js` or add a `js/items/<batch>.js`
batch file. The full contributor rules live in [AGENTS.md](AGENTS.md) —
read it before expanding drawers.

After registry additions, regenerate ids: `node scripts/build-ids-json.mjs`.

## Supabase setup (live + votes)

Run these SQL files once in the Supabase SQL editor, in order:

1. `supabase/schema.sql` — votes, caps, leaderboard views
2. `supabase/live.sql` — `live_specimens` table, publish caps
3. `supabase/moderation.sql` — owner delete RPC (token hash only in SQL)
4. `supabase/identity.sql` — optional verified-creator column

Enable **anonymous sign-in** in Supabase Auth for live publish and votes.

## Personal data & backups

Everything personal lives in localStorage:

| Key | Holds |
| --- | --- |
| `designlab.favorites.v1` | Starred ids |
| `designlab.filters.v1` | Last-used search/filters/sort |
| `designlab.variants.v1` | Saved tweaked variants |
| `designlab.imports.v1` | Pasted/imported items |
| `designlab.seen.v1` | Item ids known on last visit (NEW badge) |
| `designlab.votes.*` | Anonymous vote session and cached counts |

Clearing a key resets that part; shared data in `js/data.js` is untouched.
Use **Export favorites** for a portable JSON backup of starred items
(including variants and imports you've starred).

## Security & secrets

This repo is public, so nothing secret ever lives here:

- **Supabase anon key** (`js/supabase-config.js`) — a *publishable* key that is
  public by design. It is safe to ship because row-level security in
  `supabase/schema.sql`, `supabase/live.sql`, and `supabase/moderation.sql` is
  what actually protects the data.
- **Owner moderation token** — only its `md5` hash is stored, in
  `supabase/moderation.sql`. The plaintext token lives with the owner and is
  never committed. The hash is safe to publish: the token is high-entropy
  random, so the hash cannot be reversed.

Never commit: Supabase `service_role`/secret keys, the moderator token
plaintext, `.env` files, or any other credential. If a secret ever ends up in
history, rotate it (the token hash is a single-row update in the SQL editor)
— history is never rewritten.

## Verify before you push

```bash
node --check js/data.js && node --check js/app.js
node scripts/check-registry.mjs   # structure + behavioral smoke test
```

Install the pre-push hook: `pwsh -File scripts/install-hooks.ps1`

## Performance notes

All motion in the app — and in every specimen — follows one law: CSS-only,
animating `transform` and `opacity` exclusively, with `prefers-reduced-motion`
respected globally. No animation libraries, no JS animation loops.
