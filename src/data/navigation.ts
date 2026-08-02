import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";
import { componentDocs } from "@/data/component-docs";

const componentNavItems: RecursiveMenuItem[] = componentDocs.slice(0, 8).map((component) => ({
  href: `/components/${component.slug}`,
  label: component.name,
  meta: component.category,
  status: "ready",
}));

export const siteNavigationTree: RecursiveMenuItem[] = [
  {
    href: "/",
    label: "Home",
    meta: "system overview",
    status: "active",
    children: [
      { href: "/#design-language", label: "Design language", meta: "principles", status: "ready" },
      { href: "/#architecture", label: "Architecture", meta: "structure", status: "ready" },
      { href: "/#examples", label: "Examples", meta: "composed apps", status: "ready" },
    ],
  },
  {
    href: "/components",
    label: "Components",
    meta: `${componentDocs.length} docs`,
    status: "active",
    children: [
      ...componentNavItems,
      { href: "/components", label: "All component docs", meta: "index", status: "ready" },
    ],
  },
  {
    href: "/examples",
    label: "Examples",
    meta: "product surfaces",
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
    status: "ready",
    children: [
      { href: "/foundation", label: "Color tokens", meta: "palette", status: "ready" },
      { href: "/theme", label: "Theme controls", meta: "configuration", status: "ready" },
    ],
  },
  {
    href: "/blueprint",
    label: "Architecture blueprint",
    meta: "runtime slots",
    status: "ready",
  },
  {
    href: "/showroom",
    label: "Full showroom",
    meta: "legacy catalog",
    status: "ready",
  },
];
