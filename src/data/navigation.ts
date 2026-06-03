import type { RecursiveMenuItem } from "@/components/ui/recursive-menu";

export const siteNavigationTree: RecursiveMenuItem[] = [
  {
    href: "/",
    label: "Home",
    meta: "page",
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
    meta: "page",
    status: "active",
    children: [
      { href: "/showroom#foundation", label: "Foundation", meta: "S-01", status: "ready" },
      { href: "/showroom#actions", label: "Actions", meta: "S-02", status: "ready" },
      { href: "/showroom#charts", label: "Charts", meta: "S-03", status: "ready" },
      { href: "/showroom#cards", label: "Cards", meta: "S-04", status: "active" },
      { href: "/showroom#media", label: "Media", meta: "S-05", status: "ready" },
      { href: "/showroom#tables", label: "Tables", meta: "S-06", status: "ready" },
      { href: "/showroom#uploads", label: "Uploads", meta: "S-07", status: "ready" },
      { href: "/showroom#menus", label: "Menus", meta: "S-08", status: "ready" },
      { href: "/showroom#command", label: "Command", meta: "S-09", status: "ready" },
      { href: "/showroom#states", label: "States", meta: "S-10", status: "ready" },
      { href: "/showroom#auth", label: "Auth", meta: "S-11", status: "ready" },
      { href: "/showroom#jobs", label: "Jobs", meta: "S-12", status: "ready" },
      { href: "/showroom#realtime", label: "Realtime", meta: "S-13", status: "active" },
      { href: "/showroom#settings", label: "Settings", meta: "S-14", status: "ready" },
      { href: "/showroom#blueprint", label: "Blueprint", meta: "S-15", status: "ready" },
    ],
  },
];
