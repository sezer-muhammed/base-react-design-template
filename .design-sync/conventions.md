# Sezer Base React Design Template — build conventions

A Geist-inspired React design system. Components are imported from the bundle as
`window.SezerDS.<Name>` and are **pre-styled** — you compose them with real
content and use the design tokens below for any layout glue. Color is carried by
small **dots**, not filled boxes.

## Setup / wrapping
- **No global provider is needed** for most components — tokens, fonts, and
  component styles all ship in the bundle's stylesheet (`styles.css` → `_ds_bundle.css`).
- **Exception — dialogs:** `DialogFrame` and `DefaultDialogFooter` render Radix
  Dialog parts and MUST be wrapped in a `Dialog.Root` from `@radix-ui/react-dialog`
  (also exposed on the bundle). Example:
  `<Dialog.Root open><DialogFrame title="…" footer={<DefaultDialogFooter/>} /></Dialog.Root>`.
- **Icons:** props named `icon` expect a `lucide-react` icon component (e.g. `icon={Plus}`).

## Styling idiom — design tokens via `var(--*)`
Style with the DS CSS variables, never invented colors. Real names:
- **Surfaces:** `--ds-background-100` (cards), `--ds-background-200` (page/sunken).
- **Neutral scale:** `--ds-gray-100` … `--ds-gray-1000` (100 lightest → 1000 ink);
  translucent borders/dividers: `--ds-gray-alpha-100` … `--ds-gray-alpha-1000`.
- **Color families** (each with stops `100/400/700/900/1000`): `--ds-blue-*`,
  `--ds-red-*`, `--ds-amber-*`, `--ds-green-*`, `--ds-teal-*`, `--ds-purple-*`,
  `--ds-pink-*`. Use the **-700** stop for status dots, **-1000** for text on tints.
- **Focus ring:** `box-shadow: var(--ds-focus-ring)`.
- **Type scale:** `--text-hero` (42px) `--text-title` (26px) `--text-heading` (24px)
  `--text-section` (18px) `--text-body` (14px) `--text-small` (13px)
  `--text-caption` (12px) `--text-micro` (11px). Fonts: `--font-geist-sans`, `--font-geist-mono`.
- **Layout:** container cap `--layout-max-w` (1360px).
There are no DS utility classes to import — components are styled internally; your
own layout uses inline `style` (flex/grid/gap/width) plus the `var(--ds-*)` tokens.

## Color = dots, not fills (brand rule)
Keep boxes grayscale and indicate state with a **colored dot**. `Badge` is a
grayscale pill with a `tone`-colored dot (`tone="green"` → green dot); pass
`dot={false}` for a neutral pill. `StatusSignal` does the same with
`variant="dot" | "inline" | "pill"`. Charts are the only place color fills are
expected (data series via `chartPalette` or `var(--ds-*)`).

## Composition notes
- Card parts compose inside `Card`: `CardHeader` (has an `action` slot),
  `CardTitle`, `CardDescription`, `CardFooter`.
- `SectionHeader` goes inside `Surface` (`tone="flat|raised|sunken"`); `DataPanel`
  bundles Surface + SectionHeader + content.
- Tables (`DataTable`, `RecordTable`) take `columns` (with `render(row)`) + `rows`;
  charts (`Interactive*Chart`) need a fixed-width parent and a `height` prop.

## Where the truth lives
Read the bound `styles.css` (and its `@import`ed `_ds_bundle.css`) for the full
token list, and each component's `<Name>.d.ts` (its `<Name>Props` API) and
`<Name>.prompt.md` (usage) before composing.

## Idiomatic snippet
```tsx
const { Card, CardTitle, CardDescription, Badge, Button } = window.SezerDS;
<Card style={{ width: 360 }}>
  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
    <CardTitle>Deployment</CardTitle>
    <Badge tone="green">Live</Badge>
  </div>
  <CardDescription>Shipped 4 minutes ago to production.</CardDescription>
  <div style={{ marginTop: 16 }}>
    <Button variant="primary">View logs</Button>
  </div>
</Card>
```
