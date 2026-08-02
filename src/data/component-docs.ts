export type ComponentPreviewKind =
  | "action-bar"
  | "badge"
  | "button"
  | "calendar"
  | "card"
  | "data-panel"
  | "data-table"
  | "gauge"
  | "info-tooltip"
  | "progress-cell"
  | "record-card"
  | "record-table"
  | "recursive-menu"
  | "search-filter-header"
  | "state-block"
  | "status-signal"
  | "surface"
  | "toggle-cell";

export type ComponentDoc = {
  api: string[];
  category: string;
  color: string;
  description: string;
  name: string;
  preview: ComponentPreviewKind;
  slug: string;
  source: string;
  usage: string;
  whenToUse: string;
};

export const componentDocs = [
  {
    api: ["variant: primary | secondary | ghost", "size: sm | md", "icon?: LucideIcon"],
    category: "Inputs & actions",
    color: "var(--ds-blue-700)",
    description: "A compact action primitive with consistent focus, disabled, and icon treatment.",
    name: "Button",
    preview: "button",
    slug: "button",
    source: "src/components/ui/button.tsx",
    usage: "Use primary buttons for the main action in a surface and secondary or ghost buttons for supporting actions.",
    whenToUse: "Use for an intentional user action such as save, create, confirm, or navigate.",
  },
  {
    api: ["tone: gray | blue | green | amber | red | teal", "children: ReactNode"],
    category: "Foundations",
    color: "var(--ds-gray-1000)",
    description: "A small status label that keeps the container neutral and carries color through a signal dot.",
    name: "Badge",
    preview: "badge",
    slug: "badge",
    source: "src/components/ui/badge.tsx",
    usage: "Use badges for compact metadata, state labels, and filters that need to scan without dominating the surface.",
    whenToUse: "Use when a short label needs a small amount of visual emphasis.",
  },
  {
    api: ["tone: default | muted | accent | warning | dark", "depth: flat | base | lifted | deep | glass", "density: compact | md | spacious"],
    category: "Foundations",
    color: "var(--ds-gray-1000)",
    description: "The standard content surface for grouping related information, actions, and states.",
    name: "Card",
    preview: "card",
    slug: "card",
    source: "src/components/ui/card.tsx",
    usage: "Use cards inside a page layout when a group of information needs a clear boundary and internal rhythm.",
    whenToUse: "Use for a focused unit of information or a small product workflow.",
  },
  {
    api: ["tone: flat | raised | sunken", "HTML section attributes"],
    category: "Foundations",
    color: "var(--ds-gray-1000)",
    description: "A lower-level semantic surface for page regions that should not read as a floating card.",
    name: "Surface",
    preview: "surface",
    slug: "surface",
    source: "src/components/ui/surface.tsx",
    usage: "Use for large page sections, table frames, panels, and compositions that contain their own hierarchy.",
    whenToUse: "Use when the container is a structural region rather than a single content card.",
  },
  {
    api: ["variant: dot | inline | pill | cell | glass", "color: string", "pulse?: boolean"],
    category: "Foundations",
    color: "var(--ds-green-700)",
    description: "The shared signal language for health, status, mode, and activity across the system.",
    name: "Status Signal",
    preview: "status-signal",
    slug: "status-signal",
    source: "src/components/ui/status-signal.tsx",
    usage: "Use color as a signal only: keep the surrounding surface neutral and pair the dot with a readable label.",
    whenToUse: "Use for active, ready, degraded, queued, or live state communication.",
  },
  {
    api: ["align: left | right | split", "children: ReactNode"],
    category: "Inputs & actions",
    color: "var(--ds-blue-700)",
    description: "A shared row rhythm for grouping actions without inventing local spacing rules.",
    name: "Action Bar",
    preview: "action-bar",
    slug: "action-bar",
    source: "src/components/ui/action-bar.tsx",
    usage: "Use at the end of headers, forms, and detail panels to establish predictable action alignment.",
    whenToUse: "Use whenever two or more actions need a deliberate relationship.",
  },
  {
    api: ["title: string", "eyebrow?: string", "summary?: string", "action?: ReactNode", "padded?: boolean"],
    category: "Layout",
    color: "var(--ds-teal-700)",
    description: "A titled surface with a consistent section header and optional content padding.",
    name: "Data Panel",
    preview: "data-panel",
    slug: "data-panel",
    source: "src/components/ui/data-panel.tsx",
    usage: "Use as the primary wrapper for tables, charts, settings groups, and runtime panels.",
    whenToUse: "Use when content needs a title, description, and action area above its body.",
  },
  {
    api: ["value: number", "color?: string", "showValue?: boolean"],
    category: "Data display",
    color: "var(--ds-teal-700)",
    description: "A quiet inline progress bar designed for dense tables and operational lists.",
    name: "Progress Cell",
    preview: "progress-cell",
    slug: "progress-cell",
    source: "src/components/ui/progress-cell.tsx",
    usage: "Use for completion, capacity, rollout, or throughput values where a full chart would be excessive.",
    whenToUse: "Use for a bounded 0–100 value that benefits from a quick visual scan.",
  },
  {
    api: ["checked: boolean", "onChange: () => void"],
    category: "Inputs & actions",
    color: "var(--ds-green-700)",
    description: "A compact binary control that works well inside settings rows and data tables.",
    name: "Toggle Cell",
    preview: "toggle-cell",
    slug: "toggle-cell",
    source: "src/components/ui/toggle-cell.tsx",
    usage: "Use for immediate on/off settings where the current value should remain visible in context.",
    whenToUse: "Use for a reversible boolean preference or capability.",
  },
  {
    api: ["columns: TableColumn<T>[]", "rows: T[]", "getRowId: (row) => string", "onRowClick?: (row) => void"],
    category: "Data display",
    color: "var(--ds-gray-1000)",
    description: "An interaction-ready table with keyboard row activation, hover treatment, and explicit column rendering.",
    name: "Record Table",
    preview: "record-table",
    slug: "record-table",
    source: "src/components/ui/record-table.tsx",
    usage: "Use for operational records where selection, sorting, and row-level actions are part of the workflow.",
    whenToUse: "Use when table rows represent actionable product records.",
  },
  {
    api: ["columns: TableColumn<T>[]", "rows: T[]", "row.id: string"],
    category: "Data display",
    color: "var(--ds-gray-1000)",
    description: "A presentation-focused table for stable data where row interaction is handled elsewhere.",
    name: "Data Table",
    preview: "data-table",
    slug: "data-table",
    source: "src/components/ui/data-table.tsx",
    usage: "Use for read-only summaries, comparison lists, and compact data blocks.",
    whenToUse: "Use when the table is primarily for scanning rather than selecting records.",
  },
  {
    api: ["componentId: string", "title: ReactNode", "description?: ReactNode", "footer?: ReactNode"],
    category: "Data display",
    color: "var(--ds-blue-700)",
    description: "A record-oriented card with a stable eyebrow, title, description, content, and footer anatomy.",
    name: "Record Card",
    preview: "record-card",
    slug: "record-card",
    source: "src/components/ui/record-card.tsx",
    usage: "Use when a record needs a responsive card representation alongside or instead of a table.",
    whenToUse: "Use for mobile-first record summaries or heterogeneous data.",
  },
  {
    api: ["label?: string", "unit?: string", "value: number", "color?: string", "size?: number"],
    category: "Data display",
    color: "var(--ds-amber-700)",
    description: "A compact 270-degree gauge for a single bounded health or capacity value.",
    name: "Gauge",
    preview: "gauge",
    slug: "gauge",
    source: "src/components/ui/gauge.tsx",
    usage: "Use sparingly for one high-value percentage where a number plus arc improves recognition.",
    whenToUse: "Use for capacity, uptime, budget, or health summaries.",
  },
  {
    api: ["label: string", "description: string", "color: string", "side?: top | bottom"],
    category: "Feedback",
    color: "var(--ds-blue-700)",
    description: "An accessible, focusable explanation affordance for dense labels and unfamiliar terms.",
    name: "Info Tooltip",
    preview: "info-tooltip",
    slug: "info-tooltip",
    source: "src/components/ui/info-tooltip.tsx",
    usage: "Use when additional context is helpful but would make the primary layout noisy.",
    whenToUse: "Use for definitions, units, or operational context that is not essential to every scan.",
  },
  {
    api: ["componentId: string", "title: string", "description: string", "icon: LucideIcon", "loading?: boolean"],
    category: "Feedback",
    color: "var(--ds-amber-700)",
    description: "A consistent empty, loading, or recoverable-error block with a clear next action.",
    name: "State Block",
    preview: "state-block",
    slug: "state-block",
    source: "src/components/ui/state-block.tsx",
    usage: "Use when a product surface has no content yet, is loading, or needs the user to recover.",
    whenToUse: "Use instead of leaving a blank region or writing one-off state markup.",
  },
  {
    api: ["children?: ReactNode", "onQueryChange: (query) => void", "placeholder: string", "query: string"],
    category: "Inputs & actions",
    color: "var(--ds-blue-700)",
    description: "A search and filter header that keeps query input and secondary controls aligned across layouts.",
    name: "Search Filter Header",
    preview: "search-filter-header",
    slug: "search-filter-header",
    source: "src/components/ui/search-filter-header.tsx",
    usage: "Use above tables, lists, and catalogs where search and filters are part of the first interaction.",
    whenToUse: "Use for collection views with more than a few records.",
  },
  {
    api: ["items: RecursiveMenuItem[]", "children?: RecursiveMenuItem[]", "status?: active | draft | ready"],
    category: "Navigation",
    color: "var(--ds-teal-700)",
    description: "A nested navigation tree with expandable branches and status signals.",
    name: "Recursive Menu",
    preview: "recursive-menu",
    slug: "recursive-menu",
    source: "src/components/ui/recursive-menu.tsx",
    usage: "Use for product maps, workspace navigation, taxonomies, and nested configuration areas.",
    whenToUse: "Use when navigation has meaningful hierarchy rather than a flat list.",
  },
  {
    api: ["mode: single | range", "value?: Date", "range?: DateRange", "onChange?: (date) => void"],
    category: "Inputs & actions",
    color: "var(--ds-purple-700)",
    description: "A compact keyboard-friendly calendar for single dates and date ranges.",
    name: "Calendar",
    preview: "calendar",
    slug: "calendar",
    source: "src/components/ui/calendar.tsx",
    usage: "Use for scheduling, date filters, reporting windows, and time-bounded workflows.",
    whenToUse: "Use when dates are a primary part of a form or query.",
  },
] as const satisfies readonly ComponentDoc[];

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug);
}
