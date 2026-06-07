# Base System Template

A compact, extensible Next.js starter for dashboards, content systems, and operational web apps. Built on a Geist-inspired design language with a strict design-token system, a layered surface model, and typed server adapter slots.

---

## Purpose

Most starters give you a blank page or an overwhelming kitchen-sink. This template sits in between: it ships with a fully realised design system and direct component catalog pages so you can immediately see every primitive in context, then delete what you don't need and extend from a clean foundation.

The component pages, such as `/buttons`, `/tables`, and `/charts`, act as a living inventory - they stay in the repo so future contributors can inspect every variant at a glance before reaching for something new.

---

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS v4 | 4.x |
| Variant API | class-variance-authority (CVA) | 0.7 |
| Primitives | Radix UI (Avatar, Dialog, Popover, Toast, Slot) | latest |
| Icons | Lucide React | 1.x |
| Charts | Recharts | 3.x |
| Font | Geist Sans + Geist Mono (Next.js built-in) | — |

---

## Design language

### Philosophy

The system follows three rules:

1. **Neutral first.** The base palette is white and black. Color appears only when a status, action, or category needs a signal — never for decoration.
2. **Compact density.** UI targets information-rich screens. Default body text is 13 px, captions are 11 px mono, section headers are 18 px semibold. Nothing is padded generously by default.
3. **Depth through light, not shadows.** Elevation is expressed by subtle inset highlights, hairline borders, and layered backgrounds — not large drop shadows.

### Token system

All colors are referenced via CSS custom properties named `--ds-{color}-{step}`. Values are stored as raw HSL tuples (`--ds-{color}-{step}-value`) and resolved through `hsla()` — this makes alpha variants trivially composable.

**Color ramps available:** gray (100–1000), blue, red, amber, green, teal, purple, pink.

**Background slots:**
- `--ds-background-100` — elevated surface (white in light, near-black in dark)
- `--ds-background-200` — page/sunken surface (off-white in light, true black in dark)

**Alpha gray series** (`--ds-gray-alpha-100` through `--ds-gray-alpha-1000`): transparent grays for borders, overlays, and hover states that work on any background.

**Focus ring:** `--ds-focus-ring` — a two-layer outline (background gap + blue accent) applied via `focus-visible`.

Dark mode is handled by `@media (prefers-color-scheme: dark)` — no class toggle required. Only the HSL values are overridden; all semantic tokens resolve automatically.

### Page background

The `<body>` renders a 72 px grid pattern using two overlaid CSS `linear-gradient` layers, softened by a radial gradient at the top. The grid line color is `--page-grid-line` (very subtle in both light and dark). This gives pages an architectural feel without requiring any extra components.

### Surface model

Three surface tones encode elevation:

| Tone | When to use | CSS |
|---|---|---|
| `raised` (default) | Cards, panels, dialogs | `depth-surface` + `background-100` |
| `flat` | Inline sections, sidebars | `background-100`, no elevation |
| `sunken` | Code blocks, inset areas, inner wells | `background-200` + inset shadow |

The `.depth-surface` utility class (defined in `globals.css`) layers three effects: an inset top highlight, an inset bottom shadow, a faint drop shadow, and a `::after` pseudo-element adding a 1 px inner border. This gives raised surfaces a subtle 3D quality without explicit box-shadow tokens.

### Glass effects

Two components implement a frosted-glass aesthetic for use on colored or image backgrounds:

- **`GlassTag`** — a small label with `backdrop-blur-xl`, `backdrop-saturate-200`, white border, inset highlights, and a decorative light streak via `::after`.
- **`StatusSignal` with `variant="glass"`** — the same treatment applied to a status pill with a colored dot.

These are intentionally the only components using glass — it's a deliberate accent, not a system-wide style.

### Typography conventions

| Use | Size | Weight | Font |
|---|---|---|---|
| Section heading | 18 px | 600 | Geist Sans |
| Body / table cells | 13 px | 400–500 | Geist Sans |
| Captions / eyebrows | 11 px | 400 | Geist Mono, uppercase |
| Code / mono labels | 12–13 px | 400 | Geist Mono |

Eyebrow labels (category tags above section titles) always use `font-mono text-[11px] uppercase tracking-normal text-[var(--ds-gray-700)]`.

---

## Component inventory

### Layout

| Component | Path | Notes |
|---|---|---|
| `SiteShell` | `components/layout/site-shell.tsx` | Root wrapper: header + main + footer |
| `SiteHeader` | `components/layout/site-header.tsx` | Top nav with logo, links, and actions |
| `SiteFooter` | `components/layout/site-footer.tsx` | Minimal footer |

### Primitives

| Component | Path | Variants / props |
|---|---|---|
| `Button` | `components/ui/button.tsx` | `variant`: primary, secondary, ghost · `size`: md, sm · `icon` prop for Lucide icons |
| `ButtonLink` | `components/ui/button.tsx` | Same API as Button, renders `<a>` |
| `Badge` | `components/ui/badge.tsx` | Small inline label |
| `Card` + `CardHeader` + `CardTitle` + `CardDescription` + `CardFooter` | `components/ui/card.tsx` | Shadcn-style card slots |
| `Surface` | `components/ui/surface.tsx` | `tone`: flat, raised, sunken |
| `SectionHeader` | `components/ui/surface.tsx` | Paired with Surface; accepts `eyebrow`, `title`, `summary`, `action` |

### Data display

| Component | Path | Notes |
|---|---|---|
| `DataTable` | `components/ui/data-table.tsx` | Generic typed table; column definitions via `TableColumn<T>[]` |
| `RecordTable` | `components/ui/record-table.tsx` | Richer table with status, actions per row; `RecordTableColumn<T>[]` |
| `RecordCard` | `components/ui/record-card.tsx` | Compact card for a single record with a status signal |
| `DataPanel` | `components/ui/data-panel.tsx` | Key-value grid for metadata or stats |
| `ProgressCell` | `components/ui/progress-cell.tsx` | Inline progress bar for table cells |
| `ToggleCell` | `components/ui/toggle-cell.tsx` | Boolean toggle for table cells |

### Status & signals

| Component | Path | Variants |
|---|---|---|
| `StatusSignal` | `components/ui/status-signal.tsx` | dot, inline, pill, cell, glass |
| `GlassTag` | `components/ui/glass-tag.tsx` | tone: light, dark |

### Navigation & menus

| Component | Path | Notes |
|---|---|---|
| `RecursiveMenu` | `components/ui/recursive-menu.tsx` | Nested menu tree from a data array |

### Overlays

| Component | Path | Notes |
|---|---|---|
| `DialogFrame` | `components/ui/overlay-frame.tsx` | Radix Dialog wrapper with consistent sizing and animation |
| `DefaultDialogFooter` | `components/ui/overlay-frame.tsx` | Cancel + confirm button row for dialogs |

### Actions & search

| Component | Path | Notes |
|---|---|---|
| `ActionBar` | `components/ui/action-bar.tsx` | Contextual action strip (bulk actions, etc.) |
| `SearchFilterHeader` | `components/ui/search-filter-header.tsx` | Search input + `FilterButton` slot |

### State feedback

| Component | Path | Notes |
|---|---|---|
| `StateBlock` | `components/ui/state-block.tsx` | Empty, loading, and error states with an icon, title, and message |

---

## Pages

### `/` — Marketing home

`src/components/marketing/home-page.tsx`

Full-page marketing layout showcasing the system to external visitors or stakeholders. Demonstrates every UI primitive in a realistic product context: hero with capabilities grid, feature cards, live data table, record cards, dialogs, progress cells, toggle cells, and a realtime-style state block.

### Component catalog pages

`src/components/showroom/showroom-page.tsx`

Internal design references are split into direct pages:

| Page | What it shows |
|---|---|
| `/foundation` | Full Geist token shelf |
| `/buttons` | Button variants, icon buttons, badges, action bars |
| `/tables` | DataTable, RecordTable, OperationTable with live sorting |
| `/charts` | Recharts area, bar, line, scatter, matrix, and donut examples |
| `/cards` | Card tones, media cards, and wide data cards |
| `/auth`, `/jobs`, `/realtime`, `/settings` | Runtime-oriented shelves |

---

## Server architecture

The template is structured so UI stays transport-agnostic. Server-side code lives under `src/server/`:

```
src/server/
  contracts/
    runtime.ts        ← TypeScript interfaces for all adapter types
  adapters/
    README.md         ← Slot descriptions
    api/              ← REST / RPC route handlers
    push/             ← Webhook intake, signed events
    pull/             ← Scheduled sync, cursor pagination
    trigger/          ← Manual, cron, queue triggers
    realtime/         ← SSE, WebSocket, broadcast
```

Each adapter slot maps to a `platformCapabilities` entry in `src/config/capabilities.ts`. Concrete adapters implement the contracts from `runtime.ts` — components never import adapter implementations directly.

---

## Project structure

```
src/
  app/
    globals.css         ← Design tokens + global utilities
    layout.tsx          ← Root layout (Geist font, metadata)
    page.tsx            ← Marketing home route
    (catalog)/
      buttons/page.tsx  - Direct component category routes
      tables/page.tsx
      charts/page.tsx
    showroom/
      page.tsx          - Redirects old showroom URL to /buttons
  components/
    layout/             ← SiteShell, SiteHeader, SiteFooter
    marketing/          ← HomePage
    showroom/           ← ShowroomPage + section components
    ui/                 ← All reusable primitives
  config/
    capabilities.ts     ← Platform capability definitions
    site.ts             ← Site name, tagline, framework badges
  data/
    navigation.ts       ← Nav tree data
    operations.ts       ← Sample operation rows + capability areas
    showroom.ts         ← Token table, card samples, menu data
  lib/
    cn.ts               ← clsx + tailwind-merge helper
  server/
    contracts/
      runtime.ts        ← Adapter contracts
    adapters/           ← Adapter slots (empty, ready to fill)
```

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the marketing home.  
Open [http://localhost:3000/buttons](http://localhost:3000/buttons), [http://localhost:3000/tables](http://localhost:3000/tables), or [http://localhost:3000/charts](http://localhost:3000/charts) for the component references.

```bash
npm run build   # production build
npm run lint    # ESLint
```

---

## Extending the template

- **Add a new page** — create a route under `src/app/`, wrap its content in `SiteShell`, and use `Surface` + `SectionHeader` for the content structure.
- **Add a new primitive** — create it in `src/components/ui/`, keep all color references on `--ds-*` tokens, and add a demo block to the relevant component page.
- **Add a server adapter** — implement the relevant contract from `src/server/contracts/runtime.ts` and place the file in the matching `src/server/adapters/<slot>/` directory.
- **Add a design token** — declare the HSL value tuple in `:root` in `globals.css`, then add the resolved `hsla()` alias below the existing aliases. Dark-mode override goes in the `@media (prefers-color-scheme: dark)` block.
