/** Shared chart theming tokens.
 *
 * Pairs with `components/ui/interactive-charts.tsx` and Recharts usage so charts
 * stay visually consistent with the rest of the system. Axis/grid colors hook
 * into the `--ds-*` token scale; the categorical palette is a fixed, accessible
 * rotation for multi-series and category charts.
 */
export const CHART_ACCENT = "var(--ds-blue-700)";
export const AXIS_TICK = "var(--ds-gray-700)";
export const GRID_STROKE = "var(--ds-gray-alpha-300)";

export const CATEGORICAL_PALETTE = [
  "#0ea5e9",
  "#22c55e",
  "#8b5cf6",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#eab308",
  "#ef4444",
  "#84cc16",
  "#06b6d4",
  "#64748b",
] as const;

/** Pick a categorical color by position, wrapping if the list is long. */
export const categorical = (index: number) =>
  CATEGORICAL_PALETTE[index % CATEGORICAL_PALETTE.length];
