import Image from "next/image";
import { SiteShell } from "@/components/layout/site-shell";
import { ActionShowcase } from "@/components/showroom/action-showcase";
import { ChartShowcase } from "@/components/showroom/chart-showcase";
import { FileUploadShowcase } from "@/components/showroom/file-upload-showcase";
import {
  NestedHierarchyTable,
  OperationTable,
} from "@/components/showroom/interactive-tables";
import {
  AuthShellShelf,
  CommandShelf,
  JobMonitorShelf,
  RealtimeShelf,
  SettingsShelf,
  StateShelf,
} from "@/components/showroom/runtime-shelves";
import { platformCapabilities } from "@/config/capabilities";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GlassTag } from "@/components/ui/glass-tag";
import { RecursiveMenu } from "@/components/ui/recursive-menu";
import { StatusSignal } from "@/components/ui/status-signal";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";
import {
  catalogLayoutProfiles,
  catalogSectionLayouts,
  type CatalogLayoutProfile,
} from "@/config/catalog-layout";
import {
  menuShowcase,
  tokenRows,
  cardSamples,
  assetDemo,
} from "@/data/showroom";
import { capabilityAreas } from "@/data/operations";

export const catalogSectionKeys = [
  "foundation",
  "buttons",
  "charts",
  "cards",
  "media",
  "tables",
  "uploads",
  "menus",
  "command",
  "states",
  "auth",
  "jobs",
  "realtime",
  "settings",
  "blueprint",
] as const;

export type CatalogSectionKey = (typeof catalogSectionKeys)[number];

export function ShowroomPage({
  intro = true,
  sections = catalogSectionKeys,
}: {
  intro?: boolean;
  sections?: readonly CatalogSectionKey[];
}) {
  const visibleSections = new Set<CatalogSectionKey>(sections);
  const overview = intro && sections.length > 1;

  return (
    <SiteShell>
      <div className="catalog-page flex w-full flex-col gap-4 py-3">
        <div
          className={cn(
            "min-w-0",
            overview ? "catalog-overview-grid" : "space-y-8",
          )}
        >
            {intro ? <IntroPanel /> : null}

            {visibleSections.has("foundation") ? (
            <ShowcaseSection
              componentId="S-01"
              id="foundation"
              kicker="01 / Foundation"
              layout={catalogSectionLayouts.foundation}
              title="Geist token shelf"
              summary="A white and black foundation, low-contrast borders, and color only when status needs a signal."
            >
              <FoundationTokenTable />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("buttons") ? (
            <ShowcaseSection
              componentId="S-02"
              id="buttons"
              kicker="02 / Buttons"
              layout={catalogSectionLayouts.buttons}
              title="Button, badge, toolbar"
              summary="Fast scanning on compact surfaces: icon, short label, and status signal."
            >
              <ActionShowcase />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("charts") ? (
            <ShowcaseSection
              componentId="S-03"
              id="charts"
              kicker="03 / Charts"
              layout={catalogSectionLayouts.charts}
              title="Graph and chart system"
              summary="Recharts is the primary fit for this design: crisp SVG, composable React primitives, and CSS-variable theming."
            >
              <ChartShowcase />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("cards") ? (
            <ShowcaseSection
              componentId="S-04"
              id="cards"
              kicker="04 / Cards"
              layout={catalogSectionLayouts.cards}
              title="Card system"
              summary="The same card skeleton, with tone, density, and depth controlled separately."
            >
              <div className="space-y-3">
                <div className="stagger catalog-adaptive-grid">
                  {cardSamples.map((card) => (
                    <Card depth="lifted" key={card.title} tone="default">
                      <CardHeader>
                        <p className="flex items-center gap-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                          <StatusDot color={card.dot} />
                          {card.eyebrow}
                        </p>
                        <CardTitle className="mt-3">{card.title}</CardTitle>
                      </CardHeader>
                      <CardDescription>{card.body}</CardDescription>
                    </Card>
                  ))}
                </div>

                <AssetSpecCard />

                <div className="grid gap-3">
                  <AssetWideVisualCard />
                  <AssetWideDataCard />
                </div>
              </div>
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("media") ? (
            <ShowcaseSection
              componentId="S-05"
              id="media"
              kicker="05 / Media"
              layout={catalogSectionLayouts.media}
              title="Visual frame tests"
              summary="The same image tested with two frame languages: one product-like, one more editorial."
            >
              <div className="catalog-adaptive-grid">
                <ImageFrame
                  caption="Full visual surface / light glass / edge-safe metadata"
                  componentId="MEDIA-01"
                  mode="soft"
                  title="Calm visual inside the border"
                />
                <ImageFrame
                  caption="Full visual surface / soft overlay / metadata flags"
                  componentId="MEDIA-02"
                  mode="editorial"
                  title="A wider visual area with room to breathe"
                />
              </div>
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("tables") ? (
            <ShowcaseSection
              componentId="S-06"
              id="tables"
              kicker="06 / Tables"
              layout={catalogSectionLayouts.tables}
              title="Table showcase"
              summary="A compact table system with filters and sortable column headers."
            >
              <div className="space-y-3">
                <Surface
                  className="overflow-hidden"
                  data-component-id="TABLE-01"
                  id="table-01-nested-hierarchy"
                  tone="flat"
                >
                  <SectionHeader
                    action={
                      <>
                        <ComponentIdBadge id="TABLE-01" />
                        <DotLabel color="var(--ds-blue-700)">nested</DotLabel>
                      </>
                    }
                    eyebrow="Hierarchy table"
                    summary="Expandable rows for taxonomy, folders, routes, permissions, or any parent-child record set."
                    title="Nested hierarchy table"
                  />
                  <NestedHierarchyTable />
                </Surface>
                <Surface
                  className="overflow-hidden"
                  data-component-id="TABLE-02"
                  id="table-02-operations"
                  tone="flat"
                >
                  <SectionHeader
                    action={
                      <>
                        <ComponentIdBadge id="TABLE-02" />
                        <DotLabel color="var(--ds-gray-1000)">demo data</DotLabel>
                      </>
                    }
                    eyebrow="Template runtime"
                    summary="A dense operations table with filters, sorting, risk signals, and progress."
                    title="Runtime operations table"
                  />
                  <OperationTable />
                </Surface>
              </div>
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("uploads") ? (
            <ShowcaseSection
              componentId="S-07"
              id="uploads"
              kicker="07 / Uploads"
              layout={catalogSectionLayouts.uploads}
              title="File upload"
              summary="A compact dropzone, queue, and import summary for personal dashboards and website admin flows."
            >
              <FileUploadShowcase />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("menus") ? (
            <ShowcaseSection
              componentId="S-08"
              id="menus"
              kicker="08 / Menus"
              layout={catalogSectionLayouts.menus}
              title="Recursive menu and lists"
              summary="The same data shape for sidebars, content trees, and nested information structures."
            >
              <div className="grid gap-3 xl:grid-cols-[420px_1fr]">
                <Surface className="overflow-hidden" tone="flat">
                  <SectionHeader
                    eyebrow="Recursive"
                    summary="A tree menu example with unlimited depth."
                    title="Navigation tree"
                  />
                  <RecursiveMenu items={menuShowcase} />
                </Surface>

                <Surface className="overflow-hidden" tone="flat">
                  <SectionHeader
                    action={
                      <DotLabel color="var(--ds-teal-700)">
                        {capabilityAreas.length} items
                      </DotLabel>
                    }
                    eyebrow="Dense List"
                    summary="A thin border rhythm instead of card clutter for long lists."
                    title="Capability areas"
                  />
                  <div className="grid md:grid-cols-2">
                    {capabilityAreas.slice(0, 10).map((area, index) => {
                      const color = listAccentColors[index % listAccentColors.length];

                      return (
                        <div
                          className="group grid min-h-14 grid-cols-[64px_minmax(0,1fr)] items-center gap-3 border-b border-r border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] px-3 py-2 transition hover:bg-[var(--ds-gray-100)]"
                          key={area}
                        >
                          <span className="inline-flex items-center gap-2 font-mono text-[11px] text-[var(--ds-gray-700)]">
                            <StatusDot color={color} />
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 text-[13px] font-medium text-[var(--ds-gray-1000)]">
                            {area}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Surface>
              </div>
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("command") ? (
            <ShowcaseSection
              componentId="S-09"
              id="command"
              kicker="09 / Command"
              layout={catalogSectionLayouts.command}
              title="Command menu"
              summary="A searchable command layer for navigation, runtime records, and global actions."
            >
              <CommandShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("states") ? (
            <ShowcaseSection
              componentId="S-10"
              id="states"
              kicker="10 / States"
              layout={catalogSectionLayouts.states}
              title="Empty, loading and error"
              summary="Neutral state surfaces with small signal dots instead of colored panels."
            >
              <StateShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("auth") ? (
            <ShowcaseSection
              componentId="S-11"
              id="auth"
              kicker="11 / Auth"
              layout={catalogSectionLayouts.auth}
              title="Auth shell"
              summary="A compact authentication and permission surface that can become sign-in, invite, or role review."
            >
              <AuthShellShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("jobs") ? (
            <ShowcaseSection
              componentId="S-12"
              id="jobs"
              kicker="12 / Job monitor"
              layout={catalogSectionLayouts.jobs}
              title="Pull and worker jobs"
              summary="A future-ready shelf for scheduled sync, queues, retry windows, and manual triggers."
            >
              <JobMonitorShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("realtime") ? (
            <ShowcaseSection
              componentId="S-13"
              id="realtime"
              kicker="13 / Realtime"
              layout={catalogSectionLayouts.realtime}
              title="Realtime stream"
              summary="A feed pattern for SSE, WebSocket, broadcast channels, and local event previews."
            >
              <RealtimeShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("settings") ? (
            <ShowcaseSection
              componentId="S-14"
              id="settings"
              kicker="14 / Settings"
              layout={catalogSectionLayouts.settings}
              title="Settings and config"
              summary="Toggle rows, summary cards, and environment-aware config slots."
            >
              <SettingsShelf />
            </ShowcaseSection>
            ) : null}

            {visibleSections.has("blueprint") ? (
            <ShowcaseSection
              componentId="S-15"
              id="blueprint"
              kicker="15 / Blueprint"
              layout={catalogSectionLayouts.blueprint}
              title="Extensible runtime blueprint"
              summary="Adapter slots for API, push, pull, triggers, realtime, and future TCP / UDP transport support."
            >
              <SystemBlueprint />
            </ShowcaseSection>
            ) : null}

        </div>
      </div>
    </SiteShell>
  );
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function ComponentIdBadge({ id }: { id: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-800)]"
      data-component-id={id}
    >
      {id}
    </span>
  );
}

function StatusDot({ className, color }: { className?: string; color: string }) {
  return <StatusSignal className={className} color={color} variant="dot" />;
}

const listAccentColors = [
  "var(--ds-blue-700)",
  "var(--ds-green-700)",
  "var(--ds-amber-700)",
  "var(--ds-red-700)",
  "var(--ds-teal-700)",
  "var(--ds-purple-700)",
] as const;

const assetChannelColors = [
  "var(--ds-blue-700)",
  "var(--ds-teal-700)",
  "var(--ds-amber-700)",
  "var(--ds-purple-700)",
] as const;

function DotLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <StatusSignal color={color} variant="pill">
      {children}
    </StatusSignal>
  );
}


function FoundationTokenTable() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="FOUND-01"
      id="found-01-token-table"
      tone="flat"
    >
      <SectionHeader
        action={
          <>
            <ComponentIdBadge id="FOUND-01" />
            <Badge tone="gray">{tokenRows.length} families</Badge>
          </>
        }
        eyebrow="Color tokens"
        summary="The table language matches the data surfaces below: header, row rhythm, hover, and swatch area."
        title="Foundation color table"
      />
      <div className="grid border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)] px-3 py-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)] md:grid-cols-[160px_minmax(0,1fr)_300px]">
        <span>Family</span>
        <span className="hidden md:block">Scale</span>
        <span className="hidden md:block pl-1">Use</span>
      </div>
      <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
        {tokenRows.map((row) => (
          <div
            className="grid items-center gap-3 px-3 py-3 text-[13px] transition hover:bg-[var(--ds-gray-100)] md:grid-cols-[160px_minmax(0,1fr)_300px]"
            key={row.family}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-400)]"
                style={{ background: row.swatches[row.swatches.length - 1][1] }}
              />
              <span className="font-medium">{row.family}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {row.swatches.map(([label, value]) => (
                <div
                  className="flex min-w-0 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] px-2 py-1.5 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.72)]"
                  key={`${row.family}-${label}`}
                >
                  <span
                    className="h-5 w-5 shrink-0 rounded-[5px] border border-[var(--ds-gray-alpha-400)]"
                    style={{ background: value }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[12px] font-medium leading-4">
                      {label}
                    </span>
                    <code className="block truncate font-mono text-[10px] leading-4 text-[var(--ds-gray-700)]">
                      {value}
                    </code>
                  </span>
                </div>
              ))}
            </div>
            <p className="flex min-h-11 items-center pl-1 text-[13px] leading-5 text-[var(--ds-gray-900)]">
              {row.role}
            </p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function AssetSpecCard() {
  const channels = assetDemo.channels;

  return (
    <Card
      data-component-id="CARD-01"
      depth="lifted"
      id="card-01-asset-data"
      tone="default"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <div>
          <CardHeader
            className="flex-col items-start"
            action={
              <div className="flex w-full flex-wrap justify-start gap-1.5">
                <ComponentIdBadge id="CARD-01" />
                <DotLabel color="var(--ds-gray-1000)">
                  {assetDemo.identity.market}
                </DotLabel>
                <DotLabel color="var(--ds-blue-700)">
                  {assetDemo.identity.version}
                </DotLabel>
                <DotLabel color="var(--ds-amber-700)">
                  {assetDemo.identity.category}
                </DotLabel>
              </div>
            }
          >
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Flag-heavy data card
            </p>
            <CardTitle className="mt-3 text-[26px] leading-8">
              {assetDemo.identity.name} · {assetDemo.identity.label}
            </CardTitle>
            <CardDescription>
              A domain-neutral record card with flag space, a mini table, and a
              note area for operational metrics, channels, and runtime context.
            </CardDescription>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <DotLabel color="var(--ds-purple-700)">
                {assetDemo.identity.label}
              </DotLabel>
              <DotLabel color="var(--ds-green-700)">healthy</DotLabel>
              <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                Updated 2026.05
              </span>
            </div>
          </CardHeader>

          <div className="grid gap-2 sm:grid-cols-3">
            <SpecPill label="Reliability" value={assetDemo.metrics.reliability} />
            <SpecPill label="Latency" value={`${assetDemo.metrics.latencyMs} ms`} />
            <SpecPill label="Events" value={`${assetDemo.metrics.throughput}k`} />
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[
              ["Mode", assetDemo.metrics.transport],
              ["Push", "webhook intake ready"],
              ["Pull", "scheduled sync slot"],
              ["Transport", "HTTP / TCP / UDP adapters"],
            ].map(([label, value]) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2.5"
                key={label}
              >
                <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  {label}
                </p>
                <p className="mt-1 text-[13px] font-medium leading-5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
          <div className="border-b border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] px-3 py-3">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Runtime budget
            </p>
            <p className="mt-2 text-[24px] font-semibold leading-7">
              {formatUsd(assetDemo.notes.budget)}
            </p>
            <p className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-800)]">
              Monthly placeholder for transport, event volume, and automation cost.
            </p>
          </div>
          <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
            {channels.map((channel, index) => (
              <div className="flex h-10 items-center justify-between px-3" key={channel.name}>
                <span className="flex items-center gap-2 text-[13px] font-medium">
                  <StatusDot color={assetChannelColors[index % assetChannelColors.length]} />
                  {channel.name}
                </span>
                <span className="font-mono text-[12px] text-[var(--ds-gray-900)]">
                  {channel.monthlyVolume.toLocaleString("en-US")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardFooter>
        <div className="flex flex-wrap items-center gap-2">
          {assetDemo.stack.map((item) => (
            <Badge key={item} tone="gray">
              {item}
            </Badge>
          ))}
        </div>
        <p className="mt-2 text-[12px] leading-5 text-[var(--ds-gray-700)]">
          {assetDemo.notes.text}
        </p>
      </CardFooter>
    </Card>
  );
}

function AssetWideVisualCard() {
  return (
    <Card
      className="mx-auto w-full max-w-[1040px] p-0"
      data-component-id="CARD-03"
      depth="base"
      id="card-03-asset-wide-visual"
      tone="default"
    >
      <div className="catalog-ratio-guard relative min-h-[440px] overflow-hidden bg-[var(--ds-gray-1000)]">
        <Image
          alt="Wide motion asset card sample"
          className="object-cover object-center"
          fill
          sizes="(min-width: 1280px) 1320px, 100vw"
          src={assetDemo.media.image}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,transparent_36%,rgb(0_0_0_/_0.22)_72%,rgb(0_0_0_/_0.58)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-black/12" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <ComponentIdBadge id="CARD-03" />
          <GlassTag>wide visual</GlassTag>
        </div>
        <div className="absolute inset-x-4 bottom-4 grid gap-4 rounded-[10px] border border-white/18 bg-white/[0.26] p-4 text-[var(--ds-gray-1000)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.42),0_18px_40px_-28px_rgb(0_0_0_/_0.88)] backdrop-blur-md sm:p-5 lg:grid-cols-[1fr_430px] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="gray">Horizontal</Badge>
              <Badge tone="blue">{assetDemo.identity.version}</Badge>
              <Badge tone="amber">{assetDemo.identity.category}</Badge>
            </div>
            <h3 className="mt-4 text-[26px] font-semibold leading-8 text-[var(--ds-gray-1000)]">
              Wide media record card
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-1000)]">
              For records that need to feel more premium in a list: strong visual
              presence, short copy, metrics, and reusable flag space.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ["Budget", formatUsd(assetDemo.notes.budget)],
              ["Latency", `${assetDemo.metrics.latencyMs}ms`],
              ["Events", `${assetDemo.metrics.throughput}k`],
              ["Mode", assetDemo.metrics.transport],
            ].map(([label, value]) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3 text-[var(--ds-gray-1000)]"
                key={label}
              >
                <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                  {label}
                </p>
                <p className="mt-1 truncate text-[15px] font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function AssetWideDataCard() {
  return (
    <Card
      data-component-id="CARD-04"
      depth="base"
      id="card-04-asset-wide-data"
      tone="default"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <ComponentIdBadge id="CARD-04" />
            <Badge tone="gray">wide data</Badge>
            <Badge tone="green">runtime ready</Badge>
          </div>
          <h3 className="mt-4 text-[24px] font-semibold leading-7">
            Wide runtime decision card
          </h3>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
            When no image is needed, the horizontal card feels more operational.
            It can summarize channels, adapter readiness, and rollout state in one row family.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {assetDemo.channels.map((channel) => (
            <div
              className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2.5"
              key={channel.name}
            >
              <span className="text-[13px] font-semibold">{channel.name}</span>
              <span className="font-mono text-[12px] text-[var(--ds-gray-900)]">
                {channel.monthlyVolume.toLocaleString("en-US")}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          <Badge tone="blue">REST API</Badge>
          <Badge tone="teal">Webhook ready</Badge>
          <Badge tone="purple">Pull sync</Badge>
          <Badge tone="amber">transport adapters</Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3">
      <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">{label}</p>
      <p className="mt-1 text-[15px] font-semibold">{value}</p>
    </div>
  );
}

function ImageFrame({
  caption,
  componentId,
  mode,
  title,
}: {
  caption: string;
  componentId: string;
  mode: "soft" | "editorial";
  title: string;
}) {
  const soft = mode === "soft";
  const frameTitle = soft ? "Soft metadata surface" : title;
  const transparentTagClass =
    "border-white/35 bg-white/[0.68] text-[var(--ds-gray-1000)] shadow-[0_10px_24px_-18px_rgb(0_0_0_/_0.72)] before:bg-transparent after:bg-transparent";

  return (
    <Surface
      className="mx-auto w-full max-w-[920px] overflow-hidden self-start"
      data-component-id={componentId}
      id={componentId.toLowerCase()}
      tone="raised"
    >
      <div className={cn("catalog-ratio-guard relative min-h-[420px] bg-[var(--ds-gray-1000)]", soft ? "max-h-[520px]" : "max-h-[540px]")}>
        <Image
          alt="Motion asset scene used for visual frame testing"
          className={cn(
            "object-cover",
            soft ? "object-[54%_50%] opacity-95" : "opacity-90",
          )}
          fill
          priority={false}
          sizes="(min-width: 1280px) 650px, 100vw"
          src={assetDemo.media.image}
        />
        {soft ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,transparent_34%,rgb(0_0_0_/_0.16)_68%,rgb(0_0_0_/_0.5)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/36 via-transparent to-black/58" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/44 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_38%,rgb(0_0_0_/_0.18)_68%,rgb(0_0_0_/_0.56)_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-black/10" />
          </>
        )}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <ComponentIdBadge id={componentId} />
          <GlassTag className={transparentTagClass} tone="dark">{soft ? "soft glass" : "2026-05-24"}</GlassTag>
        </div>
        <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
          <GlassTag className={transparentTagClass} tone="dark">{assetDemo.identity.name}</GlassTag>
          <GlassTag className={transparentTagClass} tone="dark">{soft ? assetDemo.identity.version : assetDemo.media.color}</GlassTag>
        </div>
        <div className="absolute inset-x-0 bottom-0 grid gap-3 p-4 text-white sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <GlassTag className={transparentTagClass} tone="dark">{soft ? "crop-safe" : "full bleed"}</GlassTag>
              <GlassTag className={transparentTagClass} tone="dark">{soft ? "edge meta" : "vignette"}</GlassTag>
            </div>
            <h3 className="text-[22px] font-semibold leading-7">{frameTitle}</h3>
            <p className="mt-2 max-w-md text-[13px] leading-5 text-white/70">{caption}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:max-w-[280px] sm:justify-end">
            <GlassTag className={transparentTagClass} tone="dark">mode: {assetDemo.media.trim}</GlassTag>
            <GlassTag className={transparentTagClass} tone="dark">scope: {assetDemo.identity.market}</GlassTag>
            <GlassTag className={transparentTagClass} tone="dark">latency: {assetDemo.metrics.latencyMs}ms</GlassTag>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function SystemBlueprint() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="BLUE-01"
      id="blue-01-runtime-capabilities"
      tone="flat"
    >
      <SectionHeader
        action={<ComponentIdBadge id="BLUE-01" />}
        eyebrow="Architecture slots"
        summary="These are intentionally contract-level placeholders: enough structure to extend later without hard-coding infrastructure today."
        title="Runtime capability map"
      />
      <div className="stagger grid gap-3 p-3 md:grid-cols-2 xl:grid-cols-3">
        {platformCapabilities.map((capability) => (
          <Card
            data-component-id={capability.id}
            depth="base"
            id={capability.id.toLowerCase()}
            key={capability.id}
            tone="default"
          >
            <CardHeader
              action={<ComponentIdBadge id={capability.id} />}
              className="mb-3"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                <StatusDot color={capability.color} />
                {capability.mode}
              </p>
              <CardTitle className="mt-2">{capability.title}</CardTitle>
            </CardHeader>
            <div className="grid gap-2">
              {capability.items.map((item) => (
                <div
                  className="flex min-h-9 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-2.5 text-[13px]"
                  key={item}
                >
                  <StatusDot color={capability.color} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Surface>
  );
}

function IntroPanel() {
  return (
    <section className="reveal grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] min-[1800px]:grid-cols-[minmax(0,1fr)_minmax(420px,520px)]">
      <div className="py-4">
        <p className="font-mono text-[12px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          Component catalog
        </p>
        <h1 className="mt-2 max-w-3xl text-[38px] font-semibold leading-[1.05] sm:text-[48px]">
          A production-minded base for any web product.
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
          Random placeholder content, real component pressure, active navigation,
          and a file structure prepared for APIs, jobs, triggers, and realtime growth.
        </p>
      </div>
      <Surface className="overflow-hidden" tone="flat">
        <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
          {[
            ["Sections", "15"],
            ["Runtime", "6"],
            ["Tokens", "Geist"],
          ].map(([label, value]) => (
            <div className="p-4" key={label}>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {label}
              </p>
              <p className="mt-2 text-[22px] font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--ds-gray-alpha-400)] p-3">
          <div className="flex flex-wrap gap-2">
            <DotLabel color="var(--ds-gray-1000)">white/black</DotLabel>
            <DotLabel color="var(--ds-blue-700)">compact</DotLabel>
            <DotLabel color="var(--ds-amber-700)">depth test</DotLabel>
          </div>
        </div>
      </Surface>
    </section>
  );
}

function ShowcaseSection({
  children,
  className,
  componentId,
  id,
  kicker,
  layout = "default",
  summary,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  componentId: string;
  id: string;
  kicker: string;
  layout?: CatalogLayoutProfile;
  summary: string;
  title: string;
}) {
  const layoutProfile = catalogLayoutProfiles[layout];

  return (
    <section
      className={cn(
        "catalog-section scroll-mt-[var(--showroom-scroll-mt)] reveal",
        className,
      )}
      data-component-id={componentId}
      data-layout={layout}
      id={id}
    >
      <div
        className={cn(
          layoutProfile.bodyClassName,
          "mb-3 flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-300)] pt-5 sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        <div>
          <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-normal text-[var(--ds-gray-700)]">
            <ComponentIdBadge id={componentId} />
            <span>{kicker}</span>
          </p>
          <h2 className="mt-1 text-[24px] font-semibold leading-7">{title}</h2>
        </div>
        <p className="max-w-xl text-[13px] leading-5 text-[var(--ds-gray-900)]">
          {summary}
        </p>
      </div>
      <div className={layoutProfile.bodyClassName}>{children}</div>
    </section>
  );
}
