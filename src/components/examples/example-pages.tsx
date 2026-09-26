"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, GitBranch, RefreshCw, ShieldCheck, SquareTerminal, Wifi } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ActionBar } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPanel } from "@/components/ui/data-panel";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { Gauge } from "@/components/ui/gauge";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { ToggleCell } from "@/components/ui/toggle-cell";
import { platformCapabilities } from "@/config/capabilities";

const exampleLinks = [
  { href: "/examples/dashboard", label: "Dashboard" },
  { href: "/examples/admin", label: "Admin" },
  { href: "/examples/realtime", label: "Realtime" },
  { href: "/examples/workflows", label: "Workflows" },
] as const;

type ExampleKey = (typeof exampleLinks)[number]["href"];

type OverviewRow = { id: string; surface: string; owner: string; state: string; progress: number };
const overviewRows: OverviewRow[] = [
  { id: "OV-101", surface: "Inbound events", owner: "Platform", progress: 78, state: "Healthy" },
  { id: "OV-102", surface: "Scheduled sync", owner: "Operations", progress: 46, state: "Queued" },
  { id: "OV-103", surface: "Realtime channel", owner: "Runtime", progress: 92, state: "Live" },
];

const adminRows = [
  { id: "usr-001", name: "Platform team", role: "Owner", access: "Full", state: "Active" },
  { id: "usr-014", name: "Operations team", role: "Editor", access: "Scoped", state: "Active" },
  { id: "usr-028", name: "External reviewer", role: "Viewer", access: "Read only", state: "Invited" },
];

const adminColumns: TableColumn<(typeof adminRows)[number]>[] = [
  { header: "Workspace member", key: "name", render: (row) => <span><span className="block font-medium">{row.name}</span><span className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</span></span> },
  { header: "Role", key: "role", render: (row) => row.role },
  { header: "Access", key: "access", render: (row) => row.access },
  { header: "State", key: "state", render: (row) => <StatusSignal color={row.state === "Active" ? "var(--ds-green-700)" : "var(--ds-amber-700)"} variant="pill">{row.state}</StatusSignal> },
];

const workflowRows = [
  { id: "job-042", name: "Nightly workspace sync", trigger: "Cron", state: "Running", age: "02:14" },
  { id: "job-041", name: "Webhook reconciliation", trigger: "Push", state: "Succeeded", age: "18:42" },
  { id: "job-040", name: "Transport health check", trigger: "Manual", state: "Needs review", age: "1h 04m" },
];

const workflowColumns: RecordTableColumn<(typeof workflowRows)[number]>[] = [
  { header: "Job", key: "name", render: (row) => <span><span className="block font-medium">{row.name}</span><span className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</span></span> },
  { header: "Trigger", key: "trigger", render: (row) => row.trigger },
  { header: "State", key: "state", render: (row) => <StatusSignal color={row.state === "Succeeded" ? "var(--ds-green-700)" : row.state === "Needs review" ? "var(--ds-amber-700)" : "var(--ds-blue-700)"} variant="pill">{row.state}</StatusSignal> },
  { align: "right", header: "Age", key: "age", render: (row) => <span className="font-mono text-[12px]">{row.age}</span> },
];

export function ExamplesIndex() {
  return (
    <SiteShell>
      <div className="w-full space-y-8 px-3 py-5 sm:px-5 lg:px-8 2xl:px-10">
        <header className="max-w-4xl border-b border-[var(--ds-gray-alpha-300)] pb-8">
          <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Composed product surfaces</p>
          <h1 className="mt-3 text-[44px] font-semibold leading-[1.04] sm:text-[58px]">Examples that show the system working together.</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ds-gray-900)]">These screens are intentionally more opinionated than the component docs. They demonstrate how the primitives combine into familiar product workflows. The records are deterministic scenario data, not platform claims.</p>
        </header>
        <div className="grid gap-3 md:grid-cols-2">
          {exampleLinks.map((example) => <Link className="group" href={example.href} key={example.href}><Card className="h-full transition group-hover:-translate-y-0.5" depth="base"><CardHeader action={<ArrowRight aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)] transition group-hover:translate-x-0.5" />}><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Example surface</p><CardTitle className="mt-2">{example.label}</CardTitle><CardDescription>{exampleDescription(example.href)}</CardDescription></CardHeader></Card></Link>)}
        </div>
      </div>
    </SiteShell>
  );
}

export function ExamplePage({ kind }: { kind: Exclude<ExampleKey, "/examples/dashboard"> | "/examples/dashboard" }) {
  const content = kind === "/examples/admin" ? <AdminExample /> : kind === "/examples/realtime" ? <RealtimeExample /> : kind === "/examples/workflows" ? <WorkflowExample /> : <DashboardExample />;
  const title = kind === "/examples/admin" ? "Admin workspace" : kind === "/examples/realtime" ? "Realtime operations" : kind === "/examples/workflows" ? "Workflow monitor" : "Product dashboard";
  const summary = kind === "/examples/admin" ? "A permission-aware management surface built around records, filters, and audit context." : kind === "/examples/realtime" ? "A live event surface that makes connection state, stream health, and incoming events visible." : kind === "/examples/workflows" ? "A job-oriented operations surface for triggers, retries, and selected execution details." : "A calm overview surface for product health, activity, and the next action.";

  return <SiteShell><div className="w-full space-y-6 px-3 py-5 sm:px-5 lg:px-8 2xl:px-10"><ExampleHeader kind={kind} summary={summary} title={title} />{content}</div></SiteShell>;
}

function ExampleHeader({ kind, summary, title }: { kind: string; summary: string; title: string }) {
  return <header className="grid gap-5 border-b border-[var(--ds-gray-alpha-300)] pb-7 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end"><div><Link className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)] hover:text-[var(--ds-gray-1000)]" href="/examples">Examples / back to index</Link><h1 className="mt-3 text-[42px] font-semibold leading-[1.04] sm:text-[54px]">{title}</h1><p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--ds-gray-900)]">{summary}</p></div><Surface className="p-3" tone="sunken"><div className="flex flex-wrap gap-2">{exampleLinks.map((example) => <Link className={`rounded-[6px] px-2 py-1.5 font-mono text-[11px] transition ${example.href === kind ? "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]" : "text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)]"}`} href={example.href} key={example.href}>{example.label}</Link>)}</div></Surface></header>;
}

function DashboardExample() {
  const overviewColumns: RecordTableColumn<OverviewRow>[] = [
    { header: "Surface", key: "surface", render: (row) => <span><span className="block font-medium">{row.surface}</span><span className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</span></span> },
    { header: "Owner", key: "owner", render: (row) => row.owner },
    { header: "State", key: "state", render: (row) => <StatusSignal color={row.state === "Healthy" || row.state === "Live" ? "var(--ds-green-700)" : "var(--ds-amber-700)"} variant="pill">{row.state}</StatusSignal> },
    { align: "right", header: "Progress", key: "progress", render: (row) => <ProgressCell showValue value={row.progress} /> },
  ];

  return <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]"><div className="grid gap-3"><DataPanel action={<ActionBar><Button size="sm" type="button" variant="secondary">Last 30 days</Button><Button size="sm" type="button" variant="primary">Create surface</Button></ActionBar>} eyebrow="Overview" summary="A dashboard header gives the user a clear timeframe and a clear next action." title="System overview"><div className="grid gap-3 p-3 sm:grid-cols-3">{[["Active surfaces", "18", "var(--ds-blue-700)"], ["Healthy now", "16", "var(--ds-green-700)"], ["Needs review", "02", "var(--ds-amber-700)"]].map(([label, value, color]) => <Card key={label} tone="muted"><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]"><StatusSignal color={color} variant="dot" /> {label}</p><p className="mt-3 text-[28px] font-semibold tabular-nums">{value}</p><p className="mt-1 text-[12px] text-[var(--ds-gray-800)]">Scenario metric for this example surface.</p></Card>)}</div></DataPanel><DataPanel action={<ButtonLink href="/components/record-table" size="sm" variant="secondary">Read table docs</ButtonLink>} eyebrow="Data display" summary="The same record table primitive is now carrying product context." title="Active surfaces"><RecordTable columns={overviewColumns} getRowId={(row) => row.id} rows={overviewRows} /></DataPanel></div><div className="grid gap-3"><Card><CardHeader action={<StatusSignal color="var(--ds-green-700)" variant="pill">nominal</StatusSignal>}><CardTitle>System posture</CardTitle><CardDescription>Single-value signals stay compact and legible.</CardDescription></CardHeader><div className="flex justify-center pb-2"><Gauge color="var(--ds-green-700)" label="Readiness" unit="%" value={86} /></div></Card><DataPanel eyebrow="Next action" title="Keep the path obvious"><div className="grid gap-2 p-3 text-[13px] leading-5 text-[var(--ds-gray-900)]"><p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-green-700)]" />Inspect the active surfaces.</p><p className="flex gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-blue-700)]" />Review the queued sync.</p><p className="flex gap-2"><ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ds-gray-700)]" />Open the realtime view.</p></div></DataPanel></div></div>;
}

function AdminExample() {
  const [enabled, setEnabled] = useState(true);
  return <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]"><DataPanel action={<ActionBar><Button size="sm" type="button" variant="secondary">Export</Button><Button size="sm" type="button" variant="primary">Invite member</Button></ActionBar>} eyebrow="Workspace administration" summary="A management surface combines stable table anatomy with permission context." title="Members and access"><DataTable columns={adminColumns} rows={adminRows} /></DataPanel><div className="grid gap-3"><Card><CardHeader action={<ShieldCheck className="h-4 w-4 text-[var(--ds-gray-700)]" />}><CardTitle>Workspace policy</CardTitle><CardDescription>Settings stay close to the people and records they affect.</CardDescription></CardHeader><div className="grid gap-2 text-[13px]"><div className="flex items-center justify-between rounded-[7px] bg-[var(--ds-background-200)] px-3 py-2.5"><span><span className="block font-medium">Audit logging</span><span className="block text-[12px] text-[var(--ds-gray-700)]">Record meaningful changes.</span></span><ToggleCell checked={enabled} onChange={() => setEnabled((current) => !current)} /></div><div className="flex items-center justify-between rounded-[7px] bg-[var(--ds-background-200)] px-3 py-2.5"><span><span className="block font-medium">Default role</span><span className="block text-[12px] text-[var(--ds-gray-700)]">Viewer for new invites.</span></span><Badge tone="gray">Viewer</Badge></div></div></Card><DataPanel eyebrow="Audit context" title="Recent changes"><div className="grid gap-2 p-3">{["Role updated for Operations team", "Reviewer invite created", "Workspace policy saved"].map((item, index) => <div className="flex gap-2 text-[12px] leading-5" key={item}><StatusSignal color={index === 0 ? "var(--ds-blue-700)" : "var(--ds-green-700)"} variant="dot" /><span>{item}</span></div>)}</div></DataPanel></div></div>;
}

function RealtimeExample() {
  const [connected, setConnected] = useState(true);
  const [eventCount, setEventCount] = useState(18);
  const events = useMemo(() => ["workspace.connected", "surface.updated", "sync.progressed", "audit.recorded", "stream.heartbeat"], []);
  return <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_340px]"><DataPanel action={<ActionBar><Button icon={RefreshCw} onClick={() => setEventCount((count) => count + 1)} size="sm" type="button" variant="secondary">Replay event</Button><Button onClick={() => setConnected((current) => !current)} size="sm" type="button" variant={connected ? "primary" : "secondary"}>{connected ? "Disconnect" : "Connect"}</Button></ActionBar>} eyebrow="Realtime stream" summary="Connection state is explicit, events are inspectable, and the controls demonstrate a real interaction loop." title="Incoming events"><div className="divide-y divide-[var(--ds-gray-alpha-300)]">{events.map((event, index) => <div className="flex items-center justify-between gap-3 px-4 py-3" key={`${event}-${index}`}><div className="flex min-w-0 items-center gap-3"><StatusSignal color={connected ? "var(--ds-green-700)" : "var(--ds-gray-600)"} variant="dot" /><span className="min-w-0 truncate font-mono text-[12px]">{event}</span></div><span className="font-mono text-[11px] text-[var(--ds-gray-700)]">{`00:${String(12 + index).padStart(2, "0")}`}</span></div>)}</div></DataPanel><div className="grid gap-3"><Card><CardHeader action={<Wifi className="h-4 w-4 text-[var(--ds-gray-700)]" />}><CardTitle>Connection</CardTitle><CardDescription>Live status should be visible before the event payload.</CardDescription></CardHeader><StatusSignal color={connected ? "var(--ds-green-700)" : "var(--ds-red-700)"} variant="pill">{connected ? "Connected" : "Disconnected"}</StatusSignal><div className="mt-4 grid grid-cols-2 gap-2"><div className="rounded-[7px] bg-[var(--ds-background-200)] p-2.5"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Events</span><span className="mt-1 block text-[18px] font-semibold tabular-nums">{eventCount}</span></div><div className="rounded-[7px] bg-[var(--ds-background-200)] p-2.5"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Channel</span><span className="mt-1 block text-[13px] font-semibold">SSE</span></div></div></Card><DataPanel eyebrow="Contract families" title="Available runtime slots"><div className="grid gap-2 p-3">{platformCapabilities.map((capability) => <div className="flex items-center justify-between gap-3 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-2.5 py-2" key={capability.id}><span className="flex items-center gap-2 text-[12px]"><StatusSignal color={capability.color} variant="dot" />{capability.mode}</span><span className="font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">{capability.id}</span></div>)}</div></DataPanel></div></div>;
}

function WorkflowExample() {
  const [selected, setSelected] = useState(workflowRows[0]);
  return <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]"><DataPanel action={<ActionBar><Button size="sm" type="button" variant="secondary">Filter</Button><Button size="sm" type="button" variant="primary">Run workflow</Button></ActionBar>} eyebrow="Jobs and triggers" summary="A workflow screen turns status, retries, and selection into one connected operating loop." title="Execution monitor"><RecordTable columns={workflowColumns} getRowId={(row) => row.id} onRowClick={setSelected} rowClassName={(row) => row.id === selected.id ? "bg-[var(--ds-gray-100)]" : undefined} rows={workflowRows} /></DataPanel><Card><CardHeader action={<StatusSignal color={selected.state === "Succeeded" ? "var(--ds-green-700)" : "var(--ds-blue-700)"} variant="pill">{selected.state}</StatusSignal>}><p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">Selected execution / {selected.id}</p><CardTitle className="mt-2">{selected.name}</CardTitle><CardDescription>Detail stays adjacent to the list so the user can inspect without losing context.</CardDescription></CardHeader><div className="grid gap-2 text-[13px]"><div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-300)] py-2"><span className="text-[var(--ds-gray-700)]">Trigger</span><span className="font-medium">{selected.trigger}</span></div><div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-300)] py-2"><span className="text-[var(--ds-gray-700)]">Age</span><span className="font-mono">{selected.age}</span></div><div className="flex items-center justify-between py-2"><span className="text-[var(--ds-gray-700)]">Next step</span><span className="flex items-center gap-1 font-medium">Inspect logs <ChevronRight className="h-3.5 w-3.5" /></span></div></div><div className="mt-4 grid gap-2"><Button icon={SquareTerminal} type="button" variant="secondary">Open execution logs</Button><Button icon={GitBranch} type="button" variant="ghost">View workflow definition</Button></div></Card></div>;
}

function exampleDescription(href: string) {
  return href === "/examples/admin" ? "A permission-aware management surface with member records, policy controls, and audit context." : href === "/examples/realtime" ? "A live event surface with explicit connection state and inspectable incoming events." : href === "/examples/workflows" ? "A job monitor that connects triggers, execution state, selection, and detail." : "A composed overview page for health, activity, metrics, and the next action.";
}
