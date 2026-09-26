import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Braces,
  Check,
  GitBranch,
  Layers3,
  Play,
  Route,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ActionBar } from "@/components/ui/action-bar";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPanel } from "@/components/ui/data-panel";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { platformCapabilities } from "@/config/capabilities";
import { frameworkBadges, platformConfig, siteConfig } from "@/config/site";
import { componentDocs } from "@/data/component-docs";

const architectureLayers = [
  { path: "src/app", purpose: "Routes, metadata, loading, and error boundaries", color: "var(--ds-gray-1000)" },
  { path: "src/components", purpose: "Shell, UI primitives, marketing, catalog, and examples", color: "var(--ds-blue-700)" },
  { path: "src/features", purpose: "Product modules owned by a domain", color: "var(--ds-green-700)" },
  { path: "src/config", purpose: "Brand, feature flags, navigation, and safe defaults", color: "var(--ds-amber-700)" },
  { path: "src/server/contracts", purpose: "Vendor-neutral platform and runtime interfaces", color: "var(--ds-teal-700)" },
  { path: "src/server/adapters", purpose: "Provider implementations that stay behind contracts", color: "var(--ds-red-700)" },
] as const;

const examples = [
  { href: "/examples/dashboard", label: "Dashboard", description: "Metrics, activity, filters, and a focused overview surface.", icon: Layers3, color: "var(--ds-blue-700)" },
  { href: "/examples/admin", label: "Admin", description: "Record management, permissions, bulk actions, and audit context.", icon: ShieldCheck, color: "var(--ds-green-700)" },
  { href: "/examples/realtime", label: "Realtime", description: "Streams, connection state, event inspection, and live controls.", icon: Route, color: "var(--ds-teal-700)" },
  { href: "/examples/workflows", label: "Workflows", description: "Jobs, triggers, retries, and detail-oriented operations.", icon: Workflow, color: "var(--ds-amber-700)" },
] as const;

export function SystemHomePage() {
  return (
    <SiteShell>
      <div className="w-full space-y-12 px-3 py-5 sm:px-5 lg:px-8 2xl:px-10">
        <Hero />
        <SystemOverview />
        <DesignLanguage />
        <Architecture />
        <Examples />
        <GettingStarted />
      </div>
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="grid gap-8 border-b border-[var(--ds-gray-alpha-300)] pb-12 pt-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,500px)] xl:items-center">
      <div className="max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--ds-gray-700)]">App factory base / design system / runtime contracts</p>
        <h1 className="mt-4 max-w-4xl text-[46px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[68px]">Build the product surface before you build the product.</h1>
        <p className="mt-5 max-w-2xl text-[16px] leading-7 text-[var(--ds-gray-900)]">{siteConfig.name} is a reusable Next.js foundation for dashboards, admin tools, content systems, and operational web applications. It gives teams a coherent shell, composable primitives, and vendor-neutral server boundaries to start from.</p>
        <ActionBar className="mt-7">
          <ButtonLink href="/components/docs" icon={BookOpen} variant="primary">Read component docs</ButtonLink>
          <ButtonLink href="/examples" icon={Play} variant="secondary">Explore examples</ButtonLink>
        </ActionBar>
        <div className="mt-6 flex flex-wrap gap-2">
          {frameworkBadges.map((badge) => <StatusSignal color={badge.color} key={badge.label} variant="pill">{badge.label}</StatusSignal>)}
          <StatusSignal color="var(--ds-purple-700)" variant="pill">React 19 / Next.js 16</StatusSignal>
        </div>
      </div>
      <Surface className="overflow-hidden bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]" tone="raised">
        <div className="border-b border-white/15 px-4 py-3"><p className="font-mono text-[10px] uppercase text-white/55">Foundation manifest</p><p className="mt-1 text-[15px] font-semibold">{siteConfig.tagline}</p></div>
        <div className="grid gap-2 p-4">
          {[
            ["UI primitives", `${componentDocs.length} documented`],
            ["Runtime slots", `${platformCapabilities.length} contract families`],
            ["Release channel", platformConfig.release.channel],
            ["Locale default", platformConfig.defaults.locale],
          ].map(([label, value]) => <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2 last:border-0" key={label}><span className="font-mono text-[11px] text-white/55">{label}</span><span className="text-right text-[13px] font-medium">{value}</span></div>)}
        </div>
        <div className="border-t border-white/15 px-4 py-3"><span className="flex items-center gap-2 font-mono text-[11px] text-white/70"><span className="h-2 w-2 rounded-full bg-[var(--ds-green-500)]" /> Configuration-driven by default</span></div>
      </Surface>
    </section>
  );
}

function SystemOverview() {
  const items = [
    { icon: Boxes, title: "Composable interface", description: `${componentDocs.length} documented primitives with shared tokens, states, and layout rules.`, color: "var(--ds-blue-700)" },
    { icon: Server, title: "Runtime-ready boundaries", description: "HTTP, push, pull, trigger, realtime, and transport slots defined as platform contracts.", color: "var(--ds-teal-700)" },
    { icon: Braces, title: "Product assembly", description: "Branding, navigation, capabilities, and deployment-safe defaults live in configuration.", color: "var(--ds-green-700)" },
  ] as const;

  return <section><SectionIntro eyebrow="What this is" title="A system for composing real product surfaces." summary="The homepage is intentionally factual: it describes the codebase and points to the places where the system becomes tangible." /><div className="grid gap-3 lg:grid-cols-3">{items.map(({ icon: Icon, ...item }) => <Card className="h-full" key={item.title}><CardHeader action={<StatusSignal color={item.color} variant="dot" />}><div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]"><Icon aria-hidden="true" className="h-5 w-5 text-[var(--ds-gray-800)]" /></div><CardTitle className="mt-4">{item.title}</CardTitle><CardDescription>{item.description}</CardDescription></CardHeader></Card>)}</div></section>;
}

function DesignLanguage() {
  const principles = [
    "Neutral surfaces create hierarchy before color does.",
    "Status color stays in dots and signals rather than large filled boxes.",
    "Typography, spacing, radius, and depth are controlled through shared tokens.",
    "Every important state has a deliberate empty, loading, error, or unauthorized path.",
  ];

  return <section id="design-language"><SectionIntro eyebrow="Design language" title="Quiet structure, visible state." summary="The visual system is optimized for dense operational products where users need to scan, compare, and act without visual noise." /><div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(340px,460px)]"><DataPanel eyebrow="Principles" title="The rules behind the surface"><div className="grid divide-y divide-[var(--ds-gray-alpha-300)] p-1">{principles.map((principle) => <div className="flex gap-3 px-3 py-3 text-[14px] leading-6 text-[var(--ds-gray-900)]" key={principle}><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--ds-green-700)]" />{principle}</div>)}</div></DataPanel><DataPanel action={<ButtonLink href="/foundation" size="sm" variant="secondary">View tokens</ButtonLink>} eyebrow="Foundation" title="Tokens are the API"><div className="grid gap-2 p-3">{["--ds-gray-*", "--ds-blue-*", "--ds-green-*", "--ds-focus-ring", "--layout-max-w"].map((token) => <code className="rounded-[6px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-2.5 py-2 text-[12px] text-[var(--ds-gray-900)]" key={token}>{token}</code>)}</div></DataPanel></div></section>;
}

function Architecture() {
  return <section id="architecture"><SectionIntro eyebrow="Architecture" title="Clear seams for future product code." summary="The platform layer keeps UI composition, product features, and provider implementations separate so a new application can grow without rewriting its foundation." /><DataPanel action={<ButtonLink href="/blueprint" icon={GitBranch} size="sm" variant="secondary">Open blueprint</ButtonLink>} eyebrow="Repository structure" title="Where things belong"><div className="divide-y divide-[var(--ds-gray-alpha-300)]">{architectureLayers.map((layer) => <div className="grid gap-2 px-4 py-3 sm:grid-cols-[250px_minmax(0,1fr)] sm:items-center" key={layer.path}><span className="flex items-center gap-2 font-mono text-[12px] font-medium"><StatusSignal color={layer.color} variant="dot" />{layer.path}</span><span className="text-[13px] leading-5 text-[var(--ds-gray-900)]">{layer.purpose}</span></div>)}</div></DataPanel></section>;
}

function Examples() {
  return <section id="examples"><SectionIntro eyebrow="Example applications" title="See the primitives become products." summary="Examples are composed screens with explicit product context. They are where tables, actions, states, and runtime surfaces work together." /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{examples.map(({ icon: Icon, ...example }) => <Link className="group" href={example.href} key={example.href}><Card className="h-full transition group-hover:-translate-y-0.5" depth="base"><CardHeader action={<StatusSignal color={example.color} variant="dot" />}><Icon aria-hidden="true" className="h-5 w-5 text-[var(--ds-gray-700)]" /><CardTitle className="mt-3">{example.label}</CardTitle><CardDescription>{example.description}</CardDescription></CardHeader><span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--ds-gray-700)]">Open example <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" /></span></Card></Link>)}</div></section>;
}

function GettingStarted() {
  return <section className="border-t border-[var(--ds-gray-alpha-300)] pt-8"><div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end"><div><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Start with the system</p><h2 className="mt-2 max-w-2xl text-[32px] font-semibold leading-tight">Choose a component, then compose a real screen around it.</h2><p className="mt-3 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">Read the component contract, inspect the live state, and use the example pages as patterns for product assembly. Configuration belongs in <code className="font-mono text-[12px]">src/config</code>; domain behavior belongs in <code className="font-mono text-[12px]">src/features</code>.</p></div><ActionBar align="right"><ButtonLink href="/components/docs" icon={BookOpen} variant="primary">Browse component docs</ButtonLink><ButtonLink href="/examples" icon={ArrowRight} variant="secondary">View examples</ButtonLink></ActionBar></div></section>;
}

function SectionIntro({ eyebrow, summary, title }: { eyebrow: string; summary: string; title: string }) {
  return <div className="mb-4 grid gap-2 xl:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] xl:items-end"><div><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">{eyebrow}</p><h2 className="mt-1 text-[28px] font-semibold leading-tight sm:text-[34px]">{title}</h2></div><p className="max-w-xl text-[14px] leading-6 text-[var(--ds-gray-900)]">{summary}</p></div>;
}
