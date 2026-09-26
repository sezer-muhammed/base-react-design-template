import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";
import { componentDocs } from "@/data/component-docs";

const componentDocItems: RecursiveMenuItem[] = componentDocs.map((component) => ({
  href: `/components/${component.slug}`,
  label: component.name,
  meta: component.category,
  status: "ready",
}));

export const siteNavigationTree: RecursiveMenuItem[] = [
  {
    href: "/",
    label: "Home",
    meta: "page",
    status: "active",
    children: [
      { href: "/overview", label: "System overview", meta: "architecture", status: "ready" },
      { href: "/#platform", label: "Platform", meta: "section", status: "ready" },
      { href: "/#components", label: "Components", meta: "section", status: "ready" },
      { href: "/#runtime", label: "Runtime", meta: "section", status: "active" },
      { href: "/#proof", label: "Proof console", meta: "section", status: "ready" },
      { href: "/#structure", label: "Structure", meta: "section", status: "ready" },
    ],
  },
  {
    href: "/components",
    label: "All components",
    meta: "comprehensive showroom",
    status: "active",
    children: [
      { href: "/components", label: "Full component showroom", meta: "all live demos", status: "active" },
      { href: "/components/docs", label: "Focused component docs", meta: `${componentDocs.length} docs`, status: "ready" },
      ...componentDocItems,
    ],
  },
  {
    href: "/examples",
    label: "Examples",
    meta: "composed products",
    status: "active",
    children: [
      { href: "/examples/dashboard", label: "Dashboard", meta: "overview", status: "ready" },
      { href: "/examples/admin", label: "Admin", meta: "permissions", status: "ready" },
      { href: "/examples/realtime", label: "Realtime", meta: "events", status: "active" },
      { href: "/examples/workflows", label: "Workflows", meta: "jobs", status: "ready" },
    ],
  },
  {
    href: "/foundation",
    label: "Foundation",
    meta: "tokens",
    status: "active",
    children: [
      { href: "/foundation", label: "Foundation tokens", meta: "tokens", status: "ready" },
      { href: "/theme", label: "Theme", meta: "config", status: "ready" },
      { href: "/usage", label: "Usage", meta: "docs", status: "ready" },
    ],
  },
  {
    href: "/inputs",
    label: "Inputs & Actions",
    meta: "actions",
    status: "active",
    children: [
      { href: "/buttons", label: "Buttons", meta: "actions", status: "active" },
      { href: "/forms", label: "Forms", meta: "inputs", status: "ready" },
      { href: "/command", label: "Command", meta: "search", status: "ready" },
      { href: "/menus", label: "Menus", meta: "nav", status: "ready" },
      { href: "/primitives", label: "Primitives", meta: "controls", status: "active" },
    ],
  },
  {
    href: "/data",
    label: "Data",
    meta: "data",
    status: "active",
    children: [
      { href: "/tables", label: "Tables", meta: "data", status: "active" },
      { href: "/charts", label: "Charts", meta: "graphs", status: "ready" },
      { href: "/cards", label: "Cards", meta: "surfaces", status: "ready" },
    ],
  },
  {
    href: "/media",
    label: "Media & Files",
    meta: "visuals",
    status: "ready",
    children: [
      { href: "/media", label: "Media frames", meta: "visuals", status: "ready" },
      { href: "/uploads", label: "Uploads", meta: "files", status: "ready" },
    ],
  },
  {
    href: "/layouts",
    label: "Layouts",
    meta: "pages",
    status: "ready",
    children: [
      { href: "/templates", label: "Templates", meta: "pages", status: "ready" },
      { href: "/workflows", label: "Workflows", meta: "patterns", status: "ready" },
      { href: "/blueprint", label: "Blueprint", meta: "runtime", status: "ready" },
    ],
  },
  {
    href: "/runtime",
    label: "Runtime / System",
    meta: "system",
    status: "active",
    children: [
      { href: "/states", label: "States", meta: "feedback", status: "ready" },
      { href: "/auth", label: "Auth", meta: "shell", status: "ready" },
      { href: "/jobs", label: "Jobs", meta: "workers", status: "ready" },
      { href: "/realtime", label: "Realtime", meta: "stream", status: "active" },
      { href: "/settings", label: "Settings", meta: "config", status: "ready" },
    ],
  },
  {
    href: "/motion",
    label: "Motion",
    meta: "motion",
    status: "active",
    children: [
      { href: "/motion", label: "Motion lab", meta: "motion", status: "active" },
      { href: "/animation", label: "Animation", meta: "utilities", status: "active" },
    ],
  },
  {
    href: "/showroom",
    label: "Showroom mirror",
    meta: "complete catalog",
    status: "ready",
  },
];
