import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const showroomNav = [
  { href: "#foundation", label: "Foundation" },
  { href: "#actions", label: "Actions" },
  { href: "#cards", label: "Cards" },
  { href: "#media", label: "Media" },
  { href: "#tables", label: "Tables" },
  { href: "#menus", label: "Menus" },
];

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
    title: "Stratejik Vizyon",
    body: "Veriye anlam katma ve uzun vadeli yön belirleme.",
    dot: "var(--ds-gray-1000)",
  },
  {
    eyebrow: "02 / Advisory",
    title: "AI Yol Haritası",
    body: "Darboğazları, veri uygunluğunu ve yatırım önceliğini birlikte netleştirir.",
    dot: "var(--ds-teal-700)",
  },
  {
    eyebrow: "03 / Accent",
    title: "Program Aktif",
    body: "Kritik liderlik modülleri pilot ekiplerle canlıda test edilir.",
    dot: "var(--ds-blue-700)",
  },
  {
    eyebrow: "04 / Risk",
    title: "Yönetişim Eksik",
    body: "Onay akışları ve kalite kontrolleri karar masasına taşınmalı.",
    dot: "var(--ds-amber-700)",
  },
] as const;

export const densityCards = [
  ["compact", "Kısa not", "Bir satırlık operasyon kartı."],
  ["md", "Standart kart", "Başlık, açıklama, meta ve aksiyon için dengeli ritim."],
  ["spacious", "Anlatı kartı", "Blog, vaka veya hizmet açıklaması için daha rahat nefes."],
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

export const vehicleDemo = {
  availableTrims: [
    { name: "S", startingMsrp: 34590 },
    { name: "SE", startingMsrp: 39080 },
    { name: "Autobahn", startingMsrp: 42480 },
  ],
  chassis: {
    adaptiveChassisControl: "DCC Adaptive Chassis Control",
    availability: "available",
  },
  media: {
    color: "Moonstone Gray",
    image: "/showroom/pexels-vahapdmr-14436192.jpg",
    trim: "Autobahn",
  },
  powertrain: {
    engine: "2.0L TSI turbocharged gas engine",
    horsepower: 241,
    torqueLbFt: 273,
    transmission: "automatic",
  },
  pricing: {
    amount: 34590,
    currency: "USD",
    note: "Starting MSRP excludes taxes, title, accessory installation costs, and dealer charges.",
  },
  source: {
    lastChecked: "2026-05-23",
    note: "Specifications, equipment, options, accessories, and prices are subject to change without notice.",
    primaryPage: "Volkswagen official Golf GTI model page",
  },
  technology: [
    "12.9 in touchscreen",
    "IQ.DRIVE standard",
    "Wireless App-Connect",
    "Wi-Fi hotspot",
  ],
  vehicle: {
    bodyStyle: "hatchback",
    category: "compact / hot hatch",
    make: "Volkswagen",
    market: "US",
    model: "Golf GTI",
    modelYear: 2026,
  },
};

export const menuShowcase: RecursiveMenuItem[] = [
  {
    label: "Base Design System",
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
        label: "Primitives",
        meta: "ui",
        status: "active",
        children: [
          { label: "Buttons", meta: "3 variants", status: "ready" },
          { label: "Cards", meta: "review", status: "active" },
          { label: "Tables", meta: "dense", status: "ready" },
        ],
      },
      {
        label: "Leadership Uncoded",
        meta: "demo data",
        status: "draft",
        children: [
          { label: "Eğitimler", meta: "retail", status: "draft" },
          { label: "Blog", meta: "content", status: "draft" },
          { label: "Danışmanlık", meta: "AI", status: "draft" },
        ],
      },
    ],
  },
];
