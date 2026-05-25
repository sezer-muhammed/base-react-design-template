"use client";

import Image from "next/image";
import {
  ArrowRight,
  Boxes,
  Braces,
  Cable,
  Gauge,
  GitBranch,
  Layers3,
  Route,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ActionBar } from "@/components/ui/action-bar";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPanel } from "@/components/ui/data-panel";
import { GlassTag } from "@/components/ui/glass-tag";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { StatusSignal } from "@/components/ui/status-signal";
import { platformCapabilities } from "@/config/capabilities";
import { frameworkBadges, siteConfig } from "@/config/site";
import { operationRows } from "@/data/operations";
import { assetDemo } from "@/data/showroom";
import { ProofSection } from "./proof-section";

const featureCards = [
  {
    color: "var(--ds-gray-1000)",
    description: "Reusable surface, card, status, table, overlay, state, and action primitives.",
    icon: Boxes,
    title: "Composable UI core",
  },
  {
    color: "var(--ds-blue-700)",
    description: "API, push, pull, trigger, realtime, and transport contracts have clear slots.",
    icon: Route,
    title: "Runtime-ready structure",
  },
  {
    color: "var(--ds-green-700)",
    description: "Showroom stays available as a living component inventory for future feedback.",
    icon: Sparkles,
    title: "Inspectable system",
  },
] as const;

const structureRows = [
  {
    id: "dir-app",
    layer: "app",
    purpose: "Routes, pages, layouts",
    status: "Active",
    color: "var(--ds-gray-1000)",
  },
  {
    id: "dir-layout",
    layer: "components/layout",
    purpose: "Header, footer, shell",
    status: "Ready",
    color: "var(--ds-blue-700)",
  },
  {
    id: "dir-ui",
    layer: "components/ui",
    purpose: "Reusable primitives",
    status: "Ready",
    color: "var(--ds-green-700)",
  },
  {
    id: "dir-showroom",
    layer: "components/showroom",
    purpose: "Component demos",
    status: "Review",
    color: "var(--ds-amber-700)",
  },
  {
    id: "dir-server",
    layer: "server/contracts",
    purpose: "Runtime envelopes",
    status: "Slot",
    color: "var(--ds-purple-700)",
  },
] as const;

const structureColumns: RecordTableColumn<(typeof structureRows)[number]>[] = [
  {
    header: "Layer",
    key: "layer",
    render: (row) => (
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-semibold">
          <StatusSignal color={row.color} variant="dot" />
          {row.layer}
        </span>
        <span className="mt-0.5 block font-mono text-[11px] text-[var(--ds-gray-700)]">
          {row.id}
        </span>
      </span>
    ),
  },
  {
    header: "Purpose",
    key: "purpose",
    render: (row) => row.purpose,
  },
  {
    className: "w-[110px]",
    header: "Status",
    key: "status",
    render: (row) => (
      <StatusSignal color={row.color} variant="pill">
        {row.status}
      </StatusSignal>
    ),
  },
];

const componentCards = [
  {
    body: "Dot, pill, cell and glass states",
    color: "var(--ds-blue-700)",
    icon: Layers3,
    title: "StatusSignal",
  },
  {
    body: "Dense table rhythm without new styles",
    color: "var(--ds-green-700)",
    icon: Braces,
    title: "RecordTable",
  },
  {
    body: "Section shell with header and action",
    color: "var(--ds-gray-1000)",
    icon: Boxes,
    title: "DataPanel",
  },
  {
    body: "Modal frame with standard footer",
    color: "var(--ds-purple-700)",
    icon: ShieldCheck,
    title: "OverlayFrame",
  },
  {
    body: "Nested navigation for product maps",
    color: "var(--ds-amber-700)",
    icon: GitBranch,
    title: "RecursiveMenu",
  },
] as const;

export function HomePage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-[1360px] space-y-8 py-4">
        <Hero />
        <PlatformSection />
        <ComponentsSection />
        <RuntimeSection />
        <ProofSection />
        <StructureSection />
        <FinalCta />
      </div>
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="grid min-h-[calc(100svh-104px)] gap-4 py-4 xl:grid-cols-[1fr_520px] xl:items-center">
      <div className="max-w-3xl">
        <p className="font-mono text-[12px] uppercase text-[var(--ds-gray-700)]">
          Production base / design system / runtime slots
        </p>
        <h1 className="mt-3 text-[42px] font-semibold leading-[1.03] sm:text-[58px]">
          A compact foundation for serious web products.
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--ds-gray-900)]">
          {siteConfig.name} is a neutral Next.js template with a real site shell,
          a living component showroom, and runtime-ready structure for APIs,
          jobs, streams, triggers, and future transport adapters.
        </p>
        <ActionBar className="mt-6">
          <ButtonLink href="/showroom" icon={ArrowRight} variant="primary">
            Open showroom
          </ButtonLink>
          <ButtonLink href="#structure" icon={GitBranch} variant="secondary">
            View structure
          </ButtonLink>
        </ActionBar>
        <div className="mt-6 flex flex-wrap gap-2">
          {frameworkBadges.map((badge) => (
            <StatusSignal color={badge.color} key={badge.label} variant="pill">
              {badge.label}
            </StatusSignal>
          ))}
          <StatusSignal color="var(--ds-amber-700)" variant="pill">
            Recharts
          </StatusSignal>
        </div>
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-1000)] shadow-[0_18px_38px_-28px_rgb(0_0_0_/_0.82)]">
        <Image
          alt="Template visual preview"
          className="object-cover object-center opacity-90"
          fill
          priority
          sizes="(min-width: 1280px) 520px, 100vw"
          src={assetDemo.media.image02}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,transparent_32%,rgb(0_0_0_/_0.20)_66%,rgb(0_0_0_/_0.62)_100%)]" />
        <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
          <GlassTag>visual system</GlassTag>
          <GlassTag>showroom linked</GlassTag>
        </div>
        <div className="absolute inset-x-4 bottom-4 rounded-[10px] border border-white/28 bg-white/[0.57] p-4 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.74),0_18px_40px_-28px_rgb(0_0_0_/_0.88)] backdrop-blur-md">
          <div className="grid gap-4 sm:grid-cols-[1fr_220px] sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                Website shell
              </p>
              <h2 className="mt-2 text-[24px] font-semibold leading-7">
                Header, navigation, content, and showroom routes now coexist.
              </h2>
            </div>
            <div className="grid gap-2">
              <Metric label="Components" value="15+" />
              <Metric label="Runtime slots" value="6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="scroll-mt-24 reveal" id="platform">
      <div className="stagger grid gap-3 lg:grid-cols-3">
        {featureCards.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card depth="lifted" key={feature.title}>
              <CardHeader
                action={<StatusSignal color={feature.color} variant="pill">base</StatusSignal>}
              >
                <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[var(--ds-gray-800)]" />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function ComponentsSection() {
  return (
    <section className="scroll-mt-24 reveal" id="components">
      <DataPanel
        action={<ButtonLink href="/showroom" icon={ArrowRight} size="sm">Showroom</ButtonLink>}
        eyebrow="Components"
        padded
        summary="The landing page consumes the same primitives that the showroom documents."
        title="Reusable pieces, already used in the website."
      >
        <div className="stagger grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {componentCards.map((component) => {
            const Icon = component.icon;

            return (
              <Card depth="base" key={component.title}>
                <CardHeader action={<StatusSignal color={component.color} variant="pill">ready</StatusSignal>}>
                <Icon aria-hidden="true" className="h-5 w-5 text-[var(--ds-gray-700)]" />
                  <CardTitle className="mt-3">{component.title}</CardTitle>
                  <CardDescription>{component.body}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </DataPanel>
    </section>
  );
}

function RuntimeSection() {
  return (
    <section className="scroll-mt-24 reveal" id="runtime">
      <div className="grid gap-3 xl:grid-cols-[1fr_380px]">
        <DataPanel
          action={<StatusSignal color="var(--ds-green-700)" variant="pill">runtime map</StatusSignal>}
          eyebrow="Runtime"
          summary="The project is still frontend-first, but the server-facing contracts have named slots."
          title="Built to accept push, pull, jobs and streams."
        >
          <div className="stagger grid gap-3 p-3 md:grid-cols-2 xl:grid-cols-3">
            {platformCapabilities.map((capability) => (
              <Card depth="base" key={capability.id}>
                <CardHeader action={<StatusSignal color={capability.color} variant="pill">{capability.mode}</StatusSignal>}>
                  <CardTitle>{capability.title}</CardTitle>
                  <CardDescription>{capability.items.join(" / ")}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </DataPanel>

        <Card depth="lifted">
          <CardHeader action={<Gauge className="h-4 w-4 text-[var(--ds-gray-700)]" />}>
            <CardTitle>Operational readiness</CardTitle>
            <CardDescription>
              Demo records below are the same data family used in the showroom tables.
            </CardDescription>
          </CardHeader>
          <div className="grid gap-3">
            {operationRows.slice(0, 4).map((row) => (
              <div
                className="grid gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3"
                key={row.id}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13px] font-semibold">{row.module}</span>
                  <StatusSignal
                    color={row.risk === "High" ? "var(--ds-pink-700)" : row.risk === "Medium" ? "var(--ds-amber-700)" : "var(--ds-green-700)"}
                    variant="dot"
                  />
                </div>
                <ProgressCell color="var(--ds-gray-1000)" showValue value={row.readiness} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function StructureSection() {
  return (
    <section className="scroll-mt-24 reveal" id="structure">
      <DataPanel
        action={<StatusSignal color="var(--ds-gray-1000)" variant="pill">file system</StatusSignal>}
        eyebrow="Structure"
        summary="The folder layout separates app routes, layout shell, generic primitives, showroom demos, data, and server contracts."
        title="A project shape that can evolve."
      >
        <RecordTable
          columns={structureColumns}
          getRowId={(row) => row.id}
          minWidth={680}
          rows={structureRows}
        />
      </DataPanel>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-5">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            Ready for iteration
          </p>
          <h2 className="mt-2 text-[26px] font-semibold leading-8">
            The website is real; the showroom remains the workshop.
          </h2>
        </div>
        <ActionBar align="right">
          <ButtonLink href="/showroom" icon={Workflow} variant="primary">
            Review components
          </ButtonLink>
          <ButtonLink href="#platform" icon={Cable} variant="secondary">
            Back to top
          </ButtonLink>
        </ActionBar>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3">
      <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">{label}</p>
      <p className="mt-1 text-[20px] font-semibold">{value}</p>
    </div>
  );
}
