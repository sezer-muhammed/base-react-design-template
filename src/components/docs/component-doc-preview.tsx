"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Layers3 } from "lucide-react";
import { ActionBar } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataPanel } from "@/components/ui/data-panel";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { Gauge } from "@/components/ui/gauge";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordCard } from "@/components/ui/record-card";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { RecursiveMenu } from "@/components/ui/recursive-menu";
import { SearchFilterHeader, FilterButton } from "@/components/ui/search-filter-header";
import { StateBlock } from "@/components/ui/state-block";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { ToggleCell } from "@/components/ui/toggle-cell";
import type { ComponentPreviewKind } from "@/data/component-docs";

type PreviewRecord = {
  id: string;
  name: string;
  owner: string;
  state: string;
  progress: number;
};

const previewRecords: PreviewRecord[] = [
  { id: "record-01", name: "Inbound webhook", owner: "Platform", progress: 78, state: "Ready" },
  { id: "record-02", name: "Nightly sync", owner: "Operations", progress: 46, state: "Queued" },
  { id: "record-03", name: "Realtime stream", owner: "Runtime", progress: 92, state: "Live" },
];

const tableColumns: RecordTableColumn<PreviewRecord>[] = [
  {
    header: "Record",
    key: "name",
    render: (row) => (
      <span>
        <span className="block font-medium">{row.name}</span>
        <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</span>
      </span>
    ),
  },
  { header: "Owner", key: "owner", render: (row) => row.owner },
  {
    header: "State",
    key: "state",
    render: (row) => (
      <StatusSignal color={row.state === "Live" ? "var(--ds-green-700)" : "var(--ds-blue-700)"} variant="pill">
        {row.state}
      </StatusSignal>
    ),
  },
  {
    align: "right",
    header: "Progress",
    key: "progress",
    render: (row) => <ProgressCell showValue value={row.progress} />,
  },
];

const dataTableColumns: TableColumn<PreviewRecord>[] = [
  { header: "Name", key: "name", render: (row) => row.name },
  { header: "Owner", key: "owner", render: (row) => row.owner },
  { header: "State", key: "state", render: (row) => row.state },
];

export function ComponentDocPreview({ kind }: { kind: ComponentPreviewKind }) {
  const [enabled, setEnabled] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 6, 15));

  switch (kind) {
    case "button":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button icon={ArrowRight} type="button" variant="primary">Primary action</Button>
          <Button type="button" variant="secondary">Secondary</Button>
          <Button type="button" variant="ghost">Ghost action</Button>
        </div>
      );
    case "badge":
      return (
        <div className="flex flex-wrap gap-2">
          <Badge tone="gray">Neutral metadata</Badge>
          <Badge tone="blue">In review</Badge>
          <Badge tone="green">Ready</Badge>
          <Badge tone="amber">Needs attention</Badge>
        </div>
      );
    case "card":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Card>
            <CardHeader action={<StatusSignal color="var(--ds-green-700)" variant="pill">ready</StatusSignal>}>
              <CardTitle>Operational surface</CardTitle>
              <CardDescription>Small, focused units of product information.</CardDescription>
            </CardHeader>
            <p className="text-[13px] leading-5 text-[var(--ds-gray-900)]">
              Cards provide boundary, spacing, and a quiet hierarchy for related content.
            </p>
          </Card>
          <Card depth="lifted" tone="muted">
            <CardHeader>
              <CardTitle>Lifted variant</CardTitle>
              <CardDescription>Use depth to clarify importance, not decorate everything.</CardDescription>
            </CardHeader>
            <Gauge label="Capacity" unit="%" value={68} size={86} />
          </Card>
        </div>
      );
    case "surface":
      return (
        <div className="grid gap-3 md:grid-cols-3">
          {(["flat", "raised", "sunken"] as const).map((tone) => (
            <Surface className="p-4" key={tone} tone={tone}>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">{tone}</p>
              <p className="mt-2 text-[13px] leading-5">Structural regions stay calm and legible.</p>
            </Surface>
          ))}
        </div>
      );
    case "status-signal":
      return (
        <div className="flex flex-wrap items-center gap-4">
          <StatusSignal color="var(--ds-green-700)" variant="dot" />
          <StatusSignal color="var(--ds-blue-700)" variant="inline">Connected</StatusSignal>
          <StatusSignal color="var(--ds-amber-700)" variant="pill">Degraded</StatusSignal>
          <StatusSignal color="var(--ds-red-700)" pulse variant="glass">Live incident</StatusSignal>
        </div>
      );
    case "action-bar":
      return (
        <ActionBar align="split" className="rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3">
          <div className="flex items-center gap-2 text-[13px] font-medium"><Layers3 className="h-4 w-4" /> Configuration</div>
          <div className="flex flex-wrap gap-2"><Button size="sm" type="button" variant="secondary">Cancel</Button><Button size="sm" type="button" variant="primary">Save changes</Button></div>
        </ActionBar>
      );
    case "data-panel":
      return (
        <DataPanel eyebrow="Runtime" padded summary="A titled region with shared header and body rhythm." title="Data panel">
          <div className="grid gap-2 sm:grid-cols-3">
            {["API", "Push", "Realtime"].map((item) => <div className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3 text-[13px]" key={item}>{item} channel</div>)}
          </div>
        </DataPanel>
      );
    case "progress-cell":
      return (
        <div className="grid max-w-sm gap-3">
          {[24, 62, 88].map((value) => <div className="flex items-center justify-between gap-3" key={value}><span className="text-[13px]">{value < 40 ? "Queued" : value < 80 ? "Processing" : "Complete"}</span><ProgressCell color={value > 80 ? "var(--ds-green-700)" : "var(--ds-blue-700)"} showValue value={value} /></div>)}
        </div>
      );
    case "toggle-cell":
      return (
        <div className="flex max-w-sm items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2.5">
          <span><span className="block text-[13px] font-medium">Realtime updates</span><span className="block text-[12px] text-[var(--ds-gray-700)]">Keep this workspace stream active.</span></span>
          <ToggleCell checked={enabled} onChange={() => setEnabled((current) => !current)} />
        </div>
      );
    case "record-table":
      return <RecordTable columns={tableColumns} getRowId={(row) => row.id} minWidth={680} rows={previewRecords} />;
    case "data-table":
      return <DataTable columns={dataTableColumns} rows={previewRecords} />;
    case "record-card":
      return (
        <div className="max-w-md">
          <RecordCard action={<Badge tone="green">ready</Badge>} componentId="DOC-RECORD" description="A responsive record representation for a workflow item." eyebrow={<StatusSignal color="var(--ds-blue-700)" variant="inline">Workflow</StatusSignal>} title="Inbound webhook">
            <div className="grid grid-cols-2 gap-2"><div className="rounded-[7px] bg-[var(--ds-background-200)] p-2.5"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Owner</span><span className="mt-1 block text-[13px]">Platform</span></div><div className="rounded-[7px] bg-[var(--ds-background-200)] p-2.5"><span className="block font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">Progress</span><span className="mt-1 block text-[13px]">78%</span></div></div>
          </RecordCard>
        </div>
      );
    case "gauge":
      return <div className="flex flex-wrap items-end justify-center gap-8"><Gauge label="Capacity" unit="%" value={68} /><Gauge color="var(--ds-amber-700)" label="Budget" unit="%" value={82} /><Gauge color="var(--ds-green-700)" label="Uptime" unit="%" value={99} /></div>;
    case "info-tooltip":
      return <div className="flex min-h-24 items-center gap-5"><InfoTooltip color="var(--ds-blue-700)" description="This extra context appears on hover or keyboard focus without adding noise to the default layout." label="Correlation ID" /><InfoTooltip color="var(--ds-amber-700)" description="Use this for terms that need explanation but are not essential to the first scan." label="Retry window" side="bottom" /></div>;
    case "state-block":
      return <div className="max-w-sm"><StateBlock action="Retry" color="var(--ds-amber-700)" componentId="DOC-STATE" description="The service did not respond in the expected window." icon={AlertCircle} title="Connection needs attention" /></div>;
    case "search-filter-header":
      return <SearchFilterHeader onQueryChange={setQuery} placeholder="Search records" query={query}><FilterButton active={!query} onClick={() => setQuery("")}>All</FilterButton><FilterButton onClick={() => setQuery("ready")}>Ready</FilterButton></SearchFilterHeader>;
    case "recursive-menu":
      return <div className="max-w-md overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)]"><RecursiveMenu items={[{ href: "#api", label: "API surface", meta: "docs", status: "ready", children: [{ href: "#routes", label: "Route handlers", meta: "server", status: "active" }, { href: "#envelopes", label: "Response envelopes", meta: "server", status: "ready" }] }, { href: "#runtime", label: "Runtime", meta: "system", status: "active" }]} /></div>;
    case "calendar":
      return <div className="flex justify-center"><Calendar onChange={setSelectedDate} value={selectedDate} /></div>;
    default:
      return <div className="text-[13px] text-[var(--ds-gray-800)]">Preview unavailable.</div>;
  }
}
