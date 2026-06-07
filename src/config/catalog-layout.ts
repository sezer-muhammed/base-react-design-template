export type CatalogLayoutProfile = "default" | "full" | "media" | "wide";

type CatalogLayoutProfileConfig = {
  bodyClassName: string;
};

export const catalogLayoutProfiles = {
  default: {
    bodyClassName: "catalog-section-body catalog-layout-default",
  },
  full: {
    bodyClassName: "catalog-section-body catalog-layout-full",
  },
  media: {
    bodyClassName: "catalog-section-body catalog-layout-media",
  },
  wide: {
    bodyClassName: "catalog-section-body catalog-layout-wide",
  },
} as const satisfies Record<CatalogLayoutProfile, CatalogLayoutProfileConfig>;

export const catalogSectionLayouts = {
  auth: "wide",
  blueprint: "wide",
  buttons: "wide",
  cards: "default",
  charts: "wide",
  command: "wide",
  foundation: "wide",
  jobs: "wide",
  media: "media",
  menus: "wide",
  realtime: "full",
  settings: "wide",
  states: "default",
  tables: "full",
  uploads: "full",
} as const satisfies Record<string, CatalogLayoutProfile>;
