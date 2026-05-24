import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const showroomNav = [
  { href: "#foundation", label: "Foundation" },
  { href: "#actions", label: "Actions" },
  { href: "#charts", label: "Charts" },
  { href: "#cards", label: "Cards" },
  { href: "#media", label: "Media" },
  { href: "#tables", label: "Tables" },
  { href: "#menus", label: "Menus" },
  { href: "#command", label: "Command" },
  { href: "#states", label: "States" },
  { href: "#auth", label: "Auth" },
  { href: "#jobs", label: "Jobs" },
  { href: "#realtime", label: "Realtime" },
  { href: "#settings", label: "Settings" },
  { href: "#blueprint", label: "Blueprint" },
] as const;

export const tokenRows = [
  {
    family: "Neutral",
    role: "Page, card, border and text depth",
    swatches: [
      ["Surface", "var(--ds-background-100)"],
      ["Muted", "var(--ds-background-200)"],
      ["Line", "var(--ds-gray-alpha-400)"],
      ["Text", "var(--ds-gray-1000)"],
    ],
  },
  {
    family: "Blue",
    role: "Active state, focus and primary system signal",
    swatches: [
      ["100", "var(--ds-blue-100)"],
      ["400", "var(--ds-blue-400)"],
      ["700", "var(--ds-blue-700)"],
      ["900", "var(--ds-blue-900)"],
    ],
  },
  {
    family: "Green",
    role: "Success, complete and positive state",
    swatches: [
      ["100", "var(--ds-green-100)"],
      ["400", "var(--ds-green-400)"],
      ["700", "var(--ds-green-700)"],
      ["900", "var(--ds-green-900)"],
    ],
  },
  {
    family: "Amber",
    role: "Warning, review and medium-risk state",
    swatches: [
      ["100", "var(--ds-amber-100)"],
      ["400", "var(--ds-amber-400)"],
      ["700", "var(--ds-amber-700)"],
      ["900", "var(--ds-amber-900)"],
    ],
  },
  {
    family: "Red / Pink",
    role: "Error, blocked and high-risk state",
    swatches: [
      ["Red 100", "var(--ds-red-100)"],
      ["Red 400", "var(--ds-red-400)"],
      ["Pink 400", "var(--ds-pink-400)"],
      ["Pink 900", "var(--ds-pink-900)"],
    ],
  },
  {
    family: "Purple / Teal",
    role: "Semantic tags, judgment and empathy signals",
    swatches: [
      ["Purple 100", "var(--ds-purple-100)"],
      ["Purple 400", "var(--ds-purple-400)"],
      ["Teal 400", "var(--ds-teal-400)"],
      ["Teal 900", "var(--ds-teal-900)"],
    ],
  },
] as const;

export const cardSamples = [
  {
    eyebrow: "01 / Signal",
    title: "Live Event Inbox",
    body: "A compact record card for webhook events, queue jobs, alerts, or approval items.",
    dot: "var(--ds-gray-1000)",
  },
  {
    eyebrow: "02 / Advisory",
    title: "Sync Health",
    body: "Summarizes pull windows, stale records, retry counts, and the next scheduled run.",
    dot: "var(--ds-teal-700)",
  },
  {
    eyebrow: "03 / Accent",
    title: "Release Gate",
    body: "Shows launch readiness, blockers, ownership, and environment-specific checks.",
    dot: "var(--ds-blue-700)",
  },
  {
    eyebrow: "04 / Risk",
    title: "Transport Watch",
    body: "Flags adapter drift, packet loss, schema mismatch, and unhandled edge states.",
    dot: "var(--ds-amber-700)",
  },
] as const;

export const componentRows = [
  {
    id: "cmp-001",
    component: "Button",
    owner: "Core",
    state: "Ready",
    density: "sm / md",
    usage: "CTA, toolbar, table action",
  },
  {
    id: "cmp-002",
    component: "Badge",
    owner: "Core",
    state: "Ready",
    density: "compact",
    usage: "Status, category, risk",
  },
  {
    id: "cmp-003",
    component: "Card",
    owner: "Surface",
    state: "Review",
    density: "compact / md / spacious",
    usage: "Feature, metric, content preview",
  },
  {
    id: "cmp-004",
    component: "DataTable",
    owner: "Data",
    state: "Ready",
    density: "dense",
    usage: "Operational lists",
  },
  {
    id: "cmp-005",
    component: "RecursiveMenu",
    owner: "Navigation",
    state: "Draft",
    density: "dense",
    usage: "Content trees, sidebar maps",
  },
  {
    id: "cmp-006",
    component: "Surface",
    owner: "Foundation",
    state: "Ready",
    density: "flat / raised / sunken",
    usage: "Section shell",
  },
];

export type ComponentRow = (typeof componentRows)[number];

export const assetDemo = {
  channels: [
    { name: "Core", monthlyVolume: 34590 },
    { name: "Edge", monthlyVolume: 39080 },
    { name: "Realtime", monthlyVolume: 42480 },
  ],
  identity: {
    category: "visual / operations demo",
    label: "Motion Asset",
    market: "Global",
    name: "Signal Runner",
    version: "2026.05",
  },
  media: {
    color: "Moonstone Gray",
    image: "/showroom/pexels-vahapdmr-14436192.jpg",
    image02: "/showroom/image-02.jpg",
    trim: "Preview",
  },
  metrics: {
    latencyMs: 241,
    reliability: "99.97%",
    throughput: 273,
    transport: "event-driven",
  },
  notes: {
    budget: 34590,
    text: "Placeholder metrics are intentionally generic so the template can fit products, dashboards, admin tools, or content systems.",
  },
  stack: [
    "REST API",
    "Webhook ready",
    "Pull sync",
    "Realtime channel",
  ],
};

export const menuShowcase: RecursiveMenuItem[] = [
  {
    label: "Base Template",
    meta: "root",
    status: "active",
    children: [
      {
        label: "Foundation",
        meta: "tokens",
        status: "ready",
        children: [
          { label: "Colors", meta: "Geist scale", status: "ready" },
          { label: "Typography", meta: "Geist Sans", status: "ready" },
          { label: "Depth", meta: "4 levels", status: "active" },
        ],
      },
      {
        label: "Interfaces",
        meta: "ui",
        status: "active",
        children: [
          { label: "Actions", meta: "3 variants", status: "ready" },
          { label: "Cards", meta: "review", status: "active" },
          { label: "Tables", meta: "dense", status: "ready" },
        ],
      },
      {
        label: "Runtime",
        meta: "future",
        status: "draft",
        children: [
          { label: "Push events", meta: "webhooks", status: "ready" },
          { label: "Pull jobs", meta: "scheduler", status: "draft" },
          { label: "TCP / UDP", meta: "adapter slots", status: "draft" },
        ],
      },
    ],
  },
];
