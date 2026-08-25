# AGENTS.md — working agreement for AI agents in Design Lab

Design Lab is a living, card-based library of visually distinct UI specimens.
Everything renders from structured data in `js/data.js`. Your job, when asked,
is to grow the library correctly without breaking it. Read this file fully
before touching anything.

## Prime directives

1. **Additive only.** Never edit, restyle, rename, renumber, or delete another
   agent's entries or the shared section registry. Originals are immutable.
2. **Visual variety over lazy clones (live publish).** Each new item must
   look visually distinct from its neighbors at a glance — silhouette,
   palette, motion feel, texture, or layout. Familiar patterns are welcome;
   lone color swaps and near-clones are not. **Registry/git PRs** hold a
   higher bar: stylistically and structurally distinct (see `window.AGENT_PROMPT`
   vs git sections below).
3. **Sign your work.** Add yourself to `creators` (id + chip color) if you are
   new, then set `creator` on every item you add. The reserved id `me` belongs
   to the local user's personal variants — never sign with it.
4. **Pure copy.** An item's `code` is the entire deliverable: self-contained,
   clean, formatted HTML + scoped CSS. No prompt text, no commentary inside it.
5. **Performance law.** All motion in snippets and app code is CSS-only.
   Animate `transform` and `opacity` exclusively. No animation libraries, no
   JS animation loops, no Lottie/GSAP. Wrap snippet animations in a
   `prefers-reduced-motion` media query.
6. **Quality bar.** Each snippet must look finished centered on a dark stage,
   need zero external assets or frameworks, and survive pasting anywhere.

## How the app works (30 seconds)

- `js/data.js` holds `creators`, `sections` (fixed drawers), `sets` (matching
  style families), `items`, and the canonical expansion prompt
  (`window.AGENT_PROMPT`).
- `js/app.js` renders cards from that data; each preview is a sandboxed iframe
  running the item's `code` verbatim on a dark stage.
- "Copy Code" copies the raw `code` string (plus a `:root` override block only
  if the user has live-tweaked that card).
- Personal layers live ONLY in localStorage: favorites, view filters, saved
  variants of originals, and JSON-imported items. They never mutate the shared
  registry.

## Drawers (sections)

The `sections` array in `js/data.js` is the source of truth. **Append** new
drawers at the tail; never reorder, rename, or renumber existing ones. Every
specimen's `section` must match a `sections.id`; its `id` must start with that
drawer's two-letter `code`. Empty drawers are valid — fill them via live
publish; do not invent placeholder items.

| id | code | name | Belongs here |
| --- | --- | --- | --- |
| `animations` | AN | Animations | Motion demos where the movement is the design |
| `loaders` | LO | Loaders & Skeletons | Spinners, shimmer, waiting — not empty/zero-data |
| `badges` | BA | Badges & Tags | Status dots, counters, pills — not avatars |
| `buttons` | BU | Buttons | Click targets |
| `forms` | FO | Form Controls | Inputs, selects, textareas — not full calendars |
| `toggles` | TO | Toggles & Switches | Binary controls |
| `sliders` | SL | Sliders & Progress | Scrubbers and progress — not wizards/timelines |
| `cards` | CA | Cards & Panels | Self-contained surfaces — not tables or page sections |
| `navigation` | NA | Navigation | Menus, tabs, breadcrumbs, paginators — not sidebars |
| `alerts` | AL | Alerts & Toasts | Inline callouts and toasts — not 404/empty pages |
| `icons` | IC | Icons & Glyphs | Glyph sets |
| `players` | PL | Media Players | Audio/video transport |
| `modals` | MO | Modals & Overlays | Dialogs, sheets, off-canvas drawers |
| `effects` | EF | Effects & Styles | Glass, grain, glow, gradients |
| `dragdrop` | DD | Drag & Drop | Grab, reorder, transfer |
| `tooltips` | TT | Tooltips & Popovers | Anchored context |
| `sidebars` | SB | Sidebars & Rails | Persistent left/right chrome, icon rails |
| `charts` | CH | Charts & Data Viz | Designed CSS/SVG charts — not a charting library |
| `tables` | TB | Tables & Data | Tabular data, sticky columns, invoices |
| `accordions` | AC | Accordions & Disclosure | FAQ / expand-collapse |
| `pages` | PS | Page Sections | One hero/pricing/footer/CTA block — not a full page |
| `avatars` | AV | Avatars & Presence | Identity stacks, rings, initials |
| `feeds` | FD | Feeds & Chat | Activity, comments, message bubbles |
| `calendars` | CL | Calendars & Scheduling | Month grids, booking slots |
| `steps` | ST | Steps & Timelines | Wizards, onboarding, history |
| `empty` | EM | Empty & Error | Zero-data, 404, no-results, first-run |

`window.AGENT_PROMPT` must list every `id` + `code` pair (the registry gate
fails the push if a drawer is missing from the prompt). After adding a
drawer, regenerate `ids.json`.

## Style sets

A **set** is a matching style family: one cohesive design language (palette,
type, chrome, texture, motion feel) worn across many drawers. The `sets`
array in `js/data.js` is the source of truth — same rules as `sections`:
append new sets at the tail, never rename or renumber existing ones.

- Any item may join a set by declaring `set: "<set id>"` (e.g. `"neon-deck"`).
  The goal state for a set is one specimen in EVERY drawer, so visitors can
  mix a card, button, badge, and table from a single look.
- The site filters by set (Set dropdown), tags cards with a clickable set
  chip, and shows a coverage banner (e.g. **26/26 drawers**) when a set is
  selected. `ids.json`'s `sets` block lists each set's coverage for agents
  that fetch ids without parsing JS.
- **Style-expansion mode** (the intended way to grow a set): add 3–4 matching
  specimens at a time, each in a *different* drawer the set does not yet
  cover, matching the set's design language exactly. Keep going across
  rounds until the set spans every drawer. The prompt studio's Target Drawer
  menu includes a `Style Set — …` option that generates this mode; the
  expansion instructions also live in `window.AGENT_PROMPT` (STYLE EXPANSION).

## Adding specimens

**Option A — registry entry (preferred for shared work).**
Append an object to `items: []` in `js/data.js`, following the ITEM SCHEMA
comment at the top of that file exactly:

- `id`: unique, short — drawer code + next free number (`BU21`, `PL7`, `SB1`).
  Every section carries its two-letter `code`; `DesignLab.nextId("buttons")`
  (or `"sidebars"`, `"charts"`, …) computes the next free id for you.
- `section`: must match an existing `sections.id`.
- `set`: optional — id of a matching style family from the `sets` registry
  (e.g. `"neon-deck"`); items in a set must share its design language.
- `name` / `description`: 2–4 words; one line on what makes it structurally
  distinct.
- `creator`: your creator id.
- `tags`: optional lowercase search keywords.
- `tweaks`: optional array of 1–3 simple controls (`color` pickers, `range`
  sliders) bound to CSS custom properties. Your snippet MUST consume each
  `varName` via `var(--name, fallback)` so it looks complete with no
  overrides. Users' adjustments only ever touch their own copies.
- `code`: the specimen itself. Use scoped class names prefixed to avoid
  collisions with sibling specimens when users paste several together.

**Option B — runtime ingestion (no file editing).**
Open the app → "Add specimens" → paste one object or an array of them as JSON.
Or drive it from the console / automation:

```js
DesignLab.add({ id: "B9", section: "buttons", name: "…", creator: "you",
                 description: "…", tags: [], code: "<style>…</style><button>…</button>" });
// → { added: ["#B9"], rejected: [] }
```

Imported items persist locally (`designlab.imports.v1`) and can be removed via
the ✕ on their card.

**Option D — live publish (default for agent expansion prompts).**
Ship via the site's **Publish live** panel, `DesignLab.publish()`, or direct
REST to `live_specimens` — see `window.AGENT_PROMPT` for the full contract.
Live specimens appear on the public site within seconds and do **not** require
a git commit. Git/PR (Options A/C) is only when explicitly asked to land in
the canonical registry.

**Option C — batch files (preferred for large batches, works over file://).**
Create `js/items/<batch-name>.js` containing pushes onto
`window.DESIGN_LAB.items` (validate ids against existing drawers first), then
add one `<script src="js/items/<batch-name>.js"></script>` line to
`index.html` after `data.js` (new batches before `app.js`, or alongside
`dd.js` if present). Batch files are checked by the pre-push gate exactly like
`data.js`, so a broken batch blocks the push with the batch named in the
error. Keep each batch under ~40 items for legible diffs.

## Console API

| Call | Effect |
| --- | --- |
| `DesignLab.version` | Registry version string |
| `DesignLab.items()` | Everything currently mounted |
| `DesignLab.add(objOrArray)` | Validate + ingest locally, returns `{ added, rejected }` |
| `DesignLab.publish(items, meta?)` | Publish to live_specimens (site leaderboard); pass `{ creatorId, creatorName, creatorColor }` in meta |
| `DesignLab.nextId(sectionId)` | Next free item id for a drawer (e.g. `"BU21"`) |
| `DesignLab.favorites()` | Current favorite ids |
| `DesignLab.exportFavorites()` | Download starred items as JSON |
| `DesignLab.exportLayer()` | Download favorites + imports + variants as one backup |

Backups are restorable: paste any export (favorites or full layer) into
"Add specimens" — items come back and their favorites are re-starred.

## Storage map

| Key | Contents |
| --- | --- |
| `designlab.favorites.v1` | Starred item ids |
| `designlab.filters.v1` | Last-used search/filters/sort |
| `designlab.variants.v1` | User-saved tweaked variants |
| `designlab.imports.v1` | Items ingested via UI/console |
| `designlab.seen.v1` | Item ids known on last visit (drives the NEW badge) |
| `designlab.votes.session.v1` | Anonymous-auth session (access/refresh token, user id) for public upvotes |
| `designlab.votes.counts.v1` | Cached public vote counts (refreshed from Supabase) |
| `designlab.votes.mine.v1` | Item ids this user has upvoted |
| `designlab.votes.day.v1` | Rolling daily vote counter (mirror of the SQL cap) |

Clearing these keys resets all personal state; shared data in `js/data.js`
is untouched. Public votes live in the Supabase project (`supabase/schema.sql`)
and are keyed by anonymous user id (RLS scopes to `auth.uid()`), so clearing
local storage merely signs the visitor in as a fresh user — it cannot touch
anyone else's votes, and a SQL trigger caps each user at 25 votes per 24h.

## Git protocol

Committing your additions is part of finishing the job — an entry that exists
only on your machine does not exist.

**Before you edit**

```
git pull --rebase origin main
```

Build on the latest registry; someone may have shipped while you were reading.
(Already edited? Commit your work first, then `git pull --rebase origin main`
before pushing — rebase refuses to run across uncommitted changes.)

**When your work passes the definition of done**

```
git add js/data.js
git commit -m "buttons: add BU21-BU23 (Hex Pulse, Ember Slab, Quiet Capsule)"
git push
```

- Stage deliberately. Normally only `js/data.js` changes; check `git status`
  so nothing unrelated rides along.
- Subject format: `<drawer-code>: add <ids> (<short names>)`. One batch,
  one commit. No force-pushes, no `--no-verify`, no history rewriting.
- Do not change git identity or config.

**If the push is rejected**

Another agent shipped first. `git pull --rebase origin main`. A conflict
inside `items[]` means both of you appended at the array's tail: resolve by
keeping **both** blocks of entries (additions merge; order within the array
is presentation-only), fix trailing commas until the file parses, run
`node --check js/data.js`, then `git rebase --continue` and push again.

If anything goes sideways, `git rebase --abort` returns you to your
pre-pull state — then stop and report instead of improvising.

## Pre-push gate

A `pre-push` hook runs `scripts/check-registry.mjs` before every push and
**blocks the push** if anything is broken. It checks, in order:

1. `js/data.js`, `js/app.js`, `scripts/check-registry.mjs`, and every
   `js/items/*.js` batch parse (`node --check`).
2. The registry loads (with batch files evaluated in order) and is
   structurally valid: unique item/creator ids (duplicates cite their source
   batch), known `section`/`creator` refs, no `"me"` signatures, valid
   `tweaks` (range min/max/step/unit/default sanity, color defaults as
   strings), every tweak's `var(--name, …)` actually consumed in the snippet,
   and `tags` entries non-empty strings. Batches pushing >40 items warn.
   `set` fields must reference a known `sets[]` id; set ids are unique,
   kebab-case, and named. `window.AGENT_PROMPT` must list every drawer as
   `id CODE` (e.g. `sidebars SB`) so agent prompts cannot drift from
   `sections[]`, and must mention every `sets[]` id so style-expansion
   prompts cannot drift either.
3. **Behavioral smoke test** — `scripts/smoke-test.mjs` mounts every
   specimen's inline `<script>` blocks in a sandboxed fake DOM (no runtime
   deps), fires every listener registered at mount plus every inline
   `on*=""` handler with a plausible fake event, and statically verifies
   that every id/class a script targets actually exists in the snippet's
   own markup. Reference errors, null derefs, and handlers that throw are
   reported with the exact item id and **block the push**. If a snippet
   needs a DOM API the fake doesn't implement, extend the fake — it is the
   contract. Run it standalone with
   `node scripts/smoke-test.mjs js/data.js js/items/*.js`.
4. Creator chip colors are unique (collisions warn — fix by picking a fresh
   color when you register).
5. `styles.css` `transition:` lines only animate `transform`/`opacity`.

If the push is blocked, the hook prints the exact errors — fix them and push
again. Do **not** use `--no-verify` to bypass it. Run the same check manually
anytime with `node scripts/check-registry.mjs`.

The hook lives outside version control (`.git/hooks/`). After a fresh clone,
reinstall it with `pwsh -File scripts/install-hooks.ps1`.

## Definition of done

**Live-ingest path** (agent prompts, Publish live, `DesignLab.publish`, REST):
success is a confirmed publish — HTTP 201 from `live_specimens` or
`{ ok: true, added: [...] }` from `DesignLab.publish`. Skip git steps.

**Registry/git path** (explicit PR or `js/data.js` work):

Before declaring any change finished:

1. `node --check js/data.js && node --check js/app.js` passes.
2. No `transition:` in `styles.css` animates anything besides
   `transform`/`opacity`.
3. Open `index.html`; the console shows no `[Design Lab]` warnings.
4. Every new card previews, stars, copies pure code, and (if tweaked) copies
   the modified version while the original stays byte-identical.
5. Your batch is committed and pushed per Git protocol.
6. If you added items to the registry, regenerate `ids.json`
   (`node scripts/build-ids-json.mjs`) and commit it — direct-REST agents
   fetch it to pick valid specimen ids, and the pre-push gate warns when
   it's stale.
