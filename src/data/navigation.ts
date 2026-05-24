import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const siteNavigationTree: RecursiveMenuItem[] = [
  {
    href: "/",
    label: "Website",
    meta: "home",
    status: "active",
    children: [
      { href: "/#platform", label: "Platform", meta: "section", status: "ready" },
      { href: "/#components", label: "Components", meta: "section", status: "ready" },
      { href: "/#runtime", label: "Runtime", meta: "section", status: "active" },
      { href: "/#proof", label: "Proof console", meta: "section", status: "ready" },
      { href: "/#structure", label: "Structure", meta: "section", status: "ready" },
    ],
  },
  {
    href: "/showroom",
    label: "Showroom",
    meta: "lab",
    status: "active",
    children: [
      { href: "/showroom#foundation", label: "Foundation", meta: "S-01", status: "ready" },
      { href: "/showroom#actions", label: "Actions", meta: "S-02", status: "ready" },
      { href: "/showroom#charts", label: "Charts", meta: "S-03", status: "ready" },
      { href: "/showroom#cards", label: "Cards", meta: "S-04", status: "active" },
      { href: "/showroom#tables", label: "Tables", meta: "S-06", status: "ready" },
      { href: "/showroom#runtime", label: "Runtime", meta: "S-14", status: "active" },
    ],
  },
];
