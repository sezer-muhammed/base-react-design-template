import { Menu } from "lucide-react";
import Image from "next/image";
import { ActiveSectionNav } from "@/components/showroom/active-section-nav";
import { ActionShowcase } from "@/components/showroom/action-showcase";
import { ChartShowcase } from "@/components/showroom/chart-showcase";
import {
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
import { frameworkBadges, siteConfig } from "@/config/site";
import { platformCapabilities } from "@/config/capabilities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  menuShowcase,
  showroomNav,
  tokenRows,
  cardSamples,
  assetDemo,
} from "@/data/showroom";
import { capabilityAreas } from "@/data/operations";

export function ShowroomPage() {
  return (
    <main className="min-h-screen text-[var(--ds-gray-1000)]">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-4 px-3 py-3">
        <TopBar />
        <ActiveSectionNav items={showroomNav} />

          <div className="min-w-0 space-y-8">
            <IntroPanel />

            <ShowcaseSection
              componentId="S-01"
              id="foundation"
              kicker="01 / Foundation"
              title="Geist token shelf"
              summary="A white and black foundation, low-contrast borders, and color only when status needs a signal."
            >
              <FoundationTokenTable />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-02"
              id="actions"
              kicker="02 / Actions"
              title="Button, badge, toolbar"
              summary="Fast scanning on compact surfaces: icon, short label, and status signal."
            >
              <ActionShowcase />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-03"
              id="charts"
              kicker="03 / Charts"
              title="Graph and chart system"
              summary="Recharts is the primary fit for this design: crisp SVG, composable React primitives, and CSS-variable theming."
            >
              <ChartShowcase />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-04"
              id="cards"
              kicker="04 / Cards"
              title="Card system"
              summary="The same card skeleton, with tone, density, and depth controlled separately."
            >
              <div className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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

            <ShowcaseSection
              componentId="S-05"
              id="media"
              kicker="05 / Media"
              title="Visual frame tests"
              summary="The same image tested with two frame languages: one product-like, one more editorial."
            >
              <div className="grid gap-3 xl:grid-cols-[0.95fr_1.05fr]">
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

            <ShowcaseSection
              componentId="S-06"
              id="tables"
              kicker="06 / Tables"
              title="Table showcase"
              summary="A compact table system with filters and sortable column headers."
            >
              <div className="space-y-3">
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

            <ShowcaseSection
              componentId="S-07"
              id="menus"
              kicker="07 / Menus"
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

            <ShowcaseSection
              componentId="S-08"
              id="command"
              kicker="08 / Command"
              title="Command menu"
              summary="A searchable command layer for navigation, runtime records, and global actions."
            >
              <CommandShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-09"
              id="states"
              kicker="09 / States"
              title="Empty, loading and error"
              summary="Neutral state surfaces with small signal dots instead of colored panels."
            >
              <StateShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-10"
              id="auth"
              kicker="10 / Auth"
              title="Auth shell"
              summary="A compact authentication and permission surface that can become sign-in, invite, or role review."
            >
              <AuthShellShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-13"
              id="jobs"
              kicker="13 / Job monitor"
              title="Pull and worker jobs"
              summary="A future-ready shelf for scheduled sync, queues, retry windows, and manual triggers."
            >
              <JobMonitorShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-14"
              id="realtime"
              kicker="14 / Realtime"
              title="Realtime stream"
              summary="A feed pattern for SSE, WebSocket, broadcast channels, and local event previews."
            >
              <RealtimeShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-15"
              id="settings"
              kicker="15 / Settings"
              title="Settings and config"
              summary="Toggle rows, summary cards, and environment-aware config slots."
            >
              <SettingsShelf />
            </ShowcaseSection>

            <ShowcaseSection
              componentId="S-16"
              id="blueprint"
              kicker="16 / Blueprint"
              title="Extensible runtime blueprint"
              summary="Adapter slots for API, push, pull, triggers, realtime, and future TCP / UDP transport support."
            >
              <SystemBlueprint />
            </ShowcaseSection>

            <footer className="flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-300)] py-6 text-[12px] text-[var(--ds-gray-700)] sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 {siteConfig.name} · Extensible Next.js starter</p>
              <p className="font-mono">Geist tokens / Tailwind / CVA / Radix / runtime contracts</p>
            </footer>
          </div>
      </div>
    </main>
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

function GlassBadge({ children }: { children: React.ReactNode }) {
  return <GlassTag>{children}</GlassTag>;
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
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
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
            <CardTitle className="mt-3 text-[22px] leading-7">
              {assetDemo.identity.name} · {assetDemo.identity.label}
            </CardTitle>
            <CardDescription>
              A domain-neutral record card with flag space, a mini table, and a
              note area for operational metrics, channels, and runtime context.
            </CardDescription>
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
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3"
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

        <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
          <div className="border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Placeholder budget
            </p>
            <p className="mt-1 text-[20px] font-semibold">
              {formatUsd(assetDemo.notes.budget)}
            </p>
          </div>
          <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
            {channels.map((channel) => (
              <div className="flex h-9 items-center justify-between px-3" key={channel.name}>
                <span className="text-[13px] font-medium">{channel.name}</span>
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
      className="p-0"
      data-component-id="CARD-03"
      depth="base"
      id="card-03-asset-wide-visual"
      tone="default"
    >
      <div className="relative min-h-[410px] overflow-hidden bg-[var(--ds-gray-1000)]">
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
          <GlassBadge>wide visual</GlassBadge>
        </div>
        <div className="absolute inset-x-4 bottom-4 grid gap-4 rounded-[10px] border border-white/28 bg-white/[0.57] p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.74),0_18px_40px_-28px_rgb(0_0_0_/_0.88)] backdrop-blur-md sm:p-5 lg:grid-cols-[1fr_430px] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="gray">Horizontal</Badge>
              <Badge tone="blue">{assetDemo.identity.version}</Badge>
              <Badge tone="amber">{assetDemo.identity.category}</Badge>
            </div>
            <h3 className="mt-4 text-[26px] font-semibold leading-8">
              Wide media record card
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
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
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3"
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

  return (
    <Surface
      className="overflow-hidden self-start"
      data-component-id={componentId}
      id={componentId.toLowerCase()}
      tone="raised"
    >
      <div className={cn("relative bg-[var(--ds-gray-1000)]", soft ? "h-[420px]" : "h-[440px]")}>
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
          <GlassBadge>{soft ? "soft glass" : "2026-05-24"}</GlassBadge>
        </div>
        <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
          <GlassBadge>{assetDemo.identity.name}</GlassBadge>
          <GlassBadge>{soft ? assetDemo.identity.version : assetDemo.media.color}</GlassBadge>
        </div>
        <div className="absolute inset-x-0 bottom-0 grid gap-3 p-4 text-white sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <GlassBadge>{soft ? "crop-safe" : "full bleed"}</GlassBadge>
              <GlassBadge>{soft ? "edge meta" : "vignette"}</GlassBadge>
            </div>
            <h3 className="text-[22px] font-semibold leading-7">{frameTitle}</h3>
            <p className="mt-2 max-w-md text-[13px] leading-5 text-white/70">{caption}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:max-w-[280px] sm:justify-end">
            <GlassBadge>mode: {assetDemo.media.trim}</GlassBadge>
            <GlassBadge>scope: {assetDemo.identity.market}</GlassBadge>
            <GlassBadge>latency: {assetDemo.metrics.latencyMs}ms</GlassBadge>
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
      <div className="grid gap-3 p-3 md:grid-cols-2 xl:grid-cols-3">
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

function TopBar() {
  return (
    <header className="depth-surface sticky top-3 z-20 grid min-h-14 grid-cols-[1fr_auto] items-center gap-3 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] font-mono text-[12px] font-semibold text-[var(--ds-background-100)]">
          {siteConfig.shortName}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold leading-5">
            {siteConfig.name}
          </p>
          <p className="truncate font-mono text-[11px] text-[var(--ds-gray-700)]">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        {frameworkBadges.map((badge) => (
          <DotLabel color={badge.color} key={badge.label}>
            {badge.label}
          </DotLabel>
        ))}
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Button icon={Menu} size="sm" variant="secondary">
          Menu
        </Button>
      </div>
    </header>
  );
}

function IntroPanel() {
  return (
    <section className="grid gap-3 xl:grid-cols-[1fr_360px]">
      <div className="py-4">
        <p className="font-mono text-[12px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          Template showroom
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
            ["Sections", "14"],
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
  summary,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  componentId: string;
  id: string;
  kicker: string;
  summary: string;
  title: string;
}) {
  return (
    <section
      className={cn("scroll-mt-24", className)}
      data-component-id={componentId}
      id={id}
    >
      <div className="mb-3 flex flex-col gap-2 border-t border-[var(--ds-gray-alpha-300)] pt-5 sm:flex-row sm:items-end sm:justify-between">
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
      {children}
    </section>
  );
}
