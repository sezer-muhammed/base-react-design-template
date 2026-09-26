export const siteConfig = {
  description:
    "A production-minded foundation for building dashboards, content systems, and operational web apps.",
  name: "App Factory Base",
  shortName: "AFB",
  tagline: "Composable product foundations for teams that ship often",
} as const;

/**
 * Product-level configuration belongs here so a generated application can
 * rebrand the shell without changing reusable components.
 */
export const platformConfig = {
  product: {
    name: siteConfig.name,
    shortName: siteConfig.shortName,
    tagline: siteConfig.tagline,
  },
  release: {
    version: "0.1.0",
    channel: "stable" as const,
  },
  defaults: {
    theme: "system" as const,
    locale: "en-US" as const,
    timeZone: "UTC" as const,
  },
  flags: {
    showCatalog: true,
    enableRealtime: true,
    enableAuditLog: true,
  },
} as const;

export const frameworkBadges = [
  { color: "var(--ds-gray-1000)", label: "Next.js" },
  { color: "var(--ds-blue-700)", label: "Tailwind" },
  { color: "var(--ds-green-700)", label: "CVA" },
] as const;
