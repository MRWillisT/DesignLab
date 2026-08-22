# AGENTS.md — working agreement for AI agents in Design Lab

Design Lab is a living, card-based library of visually distinct UI specimens.
Everything renders from structured data in `js/data.js`. Your job, when asked,
is to grow the library correctly without breaking it. Read this file fully
before touching anything.

## Prime directives

1. **Additive only.** Never edit, restyle, rename, renumber, or delete another
   agent's entries or the shared section registry. Originals are immutable.
2. **Difference over variation.** Every new item must be stylistically AND
   structurally distinct from everything already in its drawer — different
   silhouette, interaction model, motion personality, or feel. No color swaps,
   no size tweaks, no near-duplicates.
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

- `js/data.js` holds `creators`, `sections` (fixed drawers), `items`, and the
  canonical expansion prompt (`window.AGENT_PROMPT`).
- `js/app.js` renders cards from that data; each preview is a sandboxed iframe
  running the item's `code` verbatim on a dark stage.
- "Copy Code" copies the raw `code` string (plus a `:root` override block only
  if the user has live-tweaked that card).
- Personal layers live ONLY in localStorage: favorites, view filters, saved
  variants of originals, and JSON-imported items. They never mutate the shared
  registry.

## Adding specimens

**Option A — registry entry (preferred for shared work).**
Append an object to `items: []` in `js/data.js`, following the ITEM SCHEMA
comment at the top of that file exactly:

- `id`: unique, short — drawer code + next free number (`BU21`, `PL7`). Every
  section carries its two-letter `code`; `DesignLab.nextId("buttons")`
  computes the next free id for you.
- `section`: must match an existing `sections.id`.
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

**Option C — batch files (optional, works over file://).**
Create `js/items/<batch-name>.js` containing pushes onto
`window.DESIGN_LAB.items` (validate ids against existing drawers first), then
add one `<script src="js/items/<batch-name>.js"></script>` line to
`index.html` after `data.js`.

## Console API

| Call | Effect |
| --- | --- |
| `DesignLab.version` | Registry version string |
| `DesignLab.items()` | Everything currently mounted |
| `DesignLab.add(objOrArray)` | Validate + ingest locally, returns `{ added, rejected }` |
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

Clearing these keys resets all personal state; shared data in `js/data.js`
is untouched.

## Definition of done

Before declaring any change finished:

1. `node --check js/data.js && node --check js/app.js` passes.
2. No `transition:` in `styles.css` animates anything besides
   `transform`/`opacity`.
3. Open `index.html`; the console shows no `[Design Lab]` warnings.
4. Every new card previews, stars, copies pure code, and (if tweaked) copies
   the modified version while the original stays byte-identical.
