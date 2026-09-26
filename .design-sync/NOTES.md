# design-sync notes — base-react-design-template

This repo is a **Next.js App-Router showroom**, not a published component library.
The sync treats `src/components/ui/` as the design system (31 components).

## Build approach (important — non-default)
- **No published `dist/`.** The bundle is built from source via a self-written
  re-export entry: `--entry .design-sync/ds-entry.ts` (re-exports every `ui/`
  module; `@/` alias resolves through `cfg.tsconfig`). `synthEntry` discovery is
  bypassed, so the component list comes entirely from `cfg.componentSrcMap`
  (31 entries) and props from `cfg.dtsPropsFor` (hand-written, concise — cleaner
  than auto-expanding HTML attribute unions).
- **Do NOT create a `node_modules/base-react-design-template` junction.** An earlier
  attempt symlinked the repo into its own `node_modules` so `PKG_DIR` would resolve;
  it caused ts-morph to recurse infinitely through the self-reference and OOM. The
  `--entry` approach (walk-up to repo-root package.json) is the fix — keep it.
- **CSS is pre-compiled.** Components use Tailwind v4 utility classes + arbitrary
  values + `var(--ds-*)` tokens. `cfg.buildCmd` = `node .design-sync/compile-css.mjs`
  compiles `src/app/globals.css` → `.design-sync/compiled.css` (the `cfg.cssEntry`,
  which becomes `_ds_bundle.css`). **Re-run `compile-css.mjs` before each build.**
- **Fonts:** Geist / Geist Mono are injected at runtime by `next/font` in the app, so
  the source CSS never defines `--font-geist-sans/-mono`. `compile-css.mjs` appends a
  Google Fonts `@import` + defines those vars → `[FONT_REMOTE]` (loads at runtime).
- **Radix dialogs:** `DialogFrame` / `DefaultDialogFooter` render Radix Dialog parts
  that need `Dialog.Root` context. `cfg.extraEntries: ["@radix-ui/react-dialog"]`
  merges the dialog primitives onto `window.SezerDS` so the previews' `Dialog.Root`
  shares the bundled instance. Their previews wrap in `<Dialog.Root open modal={false}>`.

## cfg.overrides (card presentation)
- `cardMode: "column"` on all wide components (tables, surfaces, charts, card
  sub-parts, section/data headers) — they overflow the default grid cell.
- `DialogFrame: { cardMode: "single", viewport: "480x360" }` — the dialog is
  `position: fixed` centered, so it needs a single full-card cell.

## Known render warns (triaged — legitimate, not new)
- `[TOKENS_MISSING]` for `--ds-shadow-lg`, `--ds-shadow-menu`, `--ds-amber-500`:
  genuinely **undefined in the app's `globals.css`** (the app falls back too). Left
  as-is for parity. `--ds-shadow-lg` affects `InfoTooltip`'s (hover-only) tooltip shadow.
- `[FONT_REMOTE]` "Geist"/"Geist Mono": expected (see Fonts above).
- **InfoTooltip**: its tooltip body is hover/focus-revealed (`opacity-0` by default),
  so static captures show only the dot+label buttons. Previews are built as legends so
  the dot rows are meaningful alone.

## Component composition gotchas
- Card sub-parts (`CardHeader/Title/Description/Footer`) only render inside `<Card>`;
  `SectionHeader` inside `<Surface>` — previews compose them that way.
- `DataTable` enforces `min-w-[760px]`; preview wrappers use width ≥ 760 to avoid scroll.
- `RecordCard` sets DOM `id = componentId.toLowerCase()` — give distinct `componentId`s.
- Charts (`Interactive*`) need a fixed-width parent + a `height` prop (recharts
  ResponsiveContainer). ConfusionMatrix needs ≥ ~560px wide; GroupedBar `barSize` ~28.

## Design preference applied
- `Badge` was changed (by request) from colored filled boxes to a **grayscale box +
  colored dot** (`tone` colors the dot; `dot={false}` for neutral). General rule: no
  colorful filled boxes — use colored dots for status. Card `accent`/`warning` tones
  still carry subtle color tints (left as-is — flag to user if they want those neutralized too).

## Upload mechanics — RESOLVED
- **Gotcha:** `finalize_plan` with a long explicit `writes`/`deletes` glob list
  returned **no `planId`** ("completed with no output"). The fix that works:
  `writes: ["**"], deletes: []` (a single broad write glob) — it returns the
  `planId` normally. Control what actually uploads via the `write_files` calls,
  not the plan globs.
- `write_files` needs both `path` and `localPath` per file (both = the bundle-relative
  path). Enumerate the bundle (excluding dot-prefixed root files and `_screenshots/`),
  chunk into ≤256, upload sentinel `_ds_needs_recompile` first, then content, then
  re-arm the sentinel, then `_ds_sync.json` last.
- First upload (2026-06-18) pushed 163 files into project
  `ba64bcf8-9653-4287-afa2-7d6b46ffe3a9` successfully.

## Re-sync risks (watch-list)
- **Inlined data**: `cfg.dtsPropsFor` are hand-written prop contracts; if a component's
  real props change in source, the contract won't auto-update — re-check on API changes.
- **componentSrcMap is explicit**: new `ui/` components are NOT auto-discovered (we use
  `--entry`, not synth discovery). Add new components to BOTH `ds-entry.ts` and
  `componentSrcMap` (+ a `dtsPropsFor` body + a `previews/<Name>.tsx`).
- **Google Fonts @import** needs network at render time; offline → Geist falls back.
- **Tailwind compile** depends on the repo's `@tailwindcss/postcss` v4 — a major Tailwind
  bump could change `compiled.css` output.
