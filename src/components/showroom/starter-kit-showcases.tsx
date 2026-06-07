"use client";

import {
  BarChart3,
  CheckCircle2,
  FilePenLine,
  LayoutDashboard,
  ListChecks,
  PanelRight,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { ActionBar } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { StatusSignal } from "@/components/ui/status-signal";
import { ToggleCell } from "@/components/ui/toggle-cell";
import { cn } from "@/lib/cn";

const inputClass =
  "h-9 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-[13px] text-[var(--ds-gray-1000)] outline-none transition placeholder:text-[var(--ds-gray-700)] focus:shadow-[var(--ds-focus-ring)]";

const textareaClass = cn(inputClass, "min-h-24 resize-none py-2");

const workflowRows = [
  {
    id: "wf-001",
    name: "Webhook intake",
    owner: "Platform",
    progress: 82,
    risk: "Low",
    status: "Active",
  },
  {
    id: "wf-002",
    name: "Catalog sync",
    owner: "Data",
    progress: 64,
    risk: "Medium",
    status: "Queued",
  },
  {
    id: "wf-003",
    name: "Release approval",
    owner: "Ops",
    progress: 43,
    risk: "High",
    status: "Review",
  },
] as const;

type WorkflowId = (typeof workflowRows)[number]["id"];

const workflowColumns: RecordTableColumn<(typeof workflowRows)[number]>[] = [
  {
    header: "Workflow",
    key: "name",
    render: (row) => (
      <span className="min-w-0">
        <span className="block truncate font-semibold">{row.name}</span>
        <span className="mt-0.5 block font-mono text-[11px] text-[var(--ds-gray-700)]">
          {row.id}
        </span>
      </span>
    ),
  },
  { header: "Owner", key: "owner", render: (row) => row.owner },
  {
    header: "Risk",
    key: "risk",
    render: (row) => (
      <StatusSignal
        color={
          row.risk === "High"
            ? "var(--ds-pink-700)"
            : row.risk === "Medium"
              ? "var(--ds-amber-700)"
              : "var(--ds-green-700)"
        }
        variant="cell"
      >
        {row.risk}
      </StatusSignal>
    ),
  },
  {
    align: "right",
    className: "w-[150px]",
    header: "Progress",
    key: "progress",
    render: (row) => (
      <ProgressCell
        className="ml-auto"
        color="var(--ds-gray-1000)"
        showValue
        value={row.progress}
      />
    ),
  },
];

export function FormsShowcase() {
  const [publish, setPublish] = useState(true);
  const [notify, setNotify] = useState(false);

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Surface className="overflow-hidden" data-component-id="FORM-01" id="form-01-fields" tone="flat">
        <SectionHeader
          action={<ComponentIdBadge id="FORM-01" />}
          eyebrow="Form primitives"
          summary="Field rhythm, helper copy, validation, switches, and submit actions."
          title="Create workflow form"
        />
        <form className="grid gap-3 p-4 md:grid-cols-2">
          <Field label="Workflow name">
            <input className={inputClass} placeholder="Customer import sync" />
          </Field>
          <Field label="Owner">
            <select className={inputClass} defaultValue="platform">
              <option value="platform">Platform</option>
              <option value="ops">Operations</option>
              <option value="product">Product</option>
            </select>
          </Field>
          <Field label="Source">
            <input className={inputClass} placeholder="https://api.example.com/events" />
          </Field>
          <Field label="Schedule">
            <input className={inputClass} type="datetime-local" />
          </Field>
          <Field className="md:col-span-2" label="Notes">
            <textarea className={textareaClass} placeholder="Retry window, filters, downstream target..." />
          </Field>
          <div className="grid gap-2 md:col-span-2">
            <ToggleRow
              checked={publish}
              detail="Expose the workflow in runtime navigation."
              label="Publish workflow"
              onChange={() => setPublish((value) => !value)}
            />
            <ToggleRow
              checked={notify}
              detail="Send a digest when the next run completes."
              label="Notify owners"
              onChange={() => setNotify((value) => !value)}
            />
          </div>
          <ActionBar className="md:col-span-2">
            <Button icon={CheckCircle2} type="button" variant="primary">
              Save workflow
            </Button>
            <Button type="button" variant="secondary">
              Save draft
            </Button>
          </ActionBar>
        </form>
      </Surface>

      <Card data-component-id="FORM-02" id="form-02-validation">
        <CardHeader action={<ComponentIdBadge id="FORM-02" />}>
          <CardTitle>Validation panel</CardTitle>
          <CardDescription>
            Keep validation close to the form without turning the page into a warning surface.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-2">
          {[
            ["Name", "Ready", "var(--ds-green-700)"],
            ["Source URL", "Needs review", "var(--ds-amber-700)"],
            ["Schedule", "Ready", "var(--ds-green-700)"],
          ].map(([label, state, color]) => (
            <div
              className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2"
              key={label}
            >
              <span className="text-[13px] font-medium">{label}</span>
              <StatusSignal color={color} variant="pill">
                {state}
              </StatusSignal>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function PageTemplatesShowcase() {
  const templates = [
    {
      color: "var(--ds-blue-700)",
      icon: LayoutDashboard,
      label: "Overview",
      title: "Dashboard overview",
    },
    {
      color: "var(--ds-green-700)",
      icon: PanelRight,
      label: "Detail",
      title: "List with detail panel",
    },
    {
      color: "var(--ds-amber-700)",
      icon: FilePenLine,
      label: "Editor",
      title: "Create/edit form",
    },
    {
      color: "var(--ds-purple-700)",
      icon: BarChart3,
      label: "Analytics",
      title: "Metrics and charts",
    },
  ] as const;

  return (
    <div className="catalog-adaptive-grid">
      {templates.map((template) => {
        const Icon = template.icon;

        return (
          <Surface
            className="overflow-hidden"
            data-component-id={`TPL-${template.label.toUpperCase()}`}
            id={`tpl-${template.label.toLowerCase()}`}
            key={template.label}
            tone="flat"
          >
            <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-300)] p-3">
              <span className="flex items-center gap-2 text-[13px] font-semibold">
                <StatusSignal color={template.color} variant="dot" />
                {template.title}
              </span>
              <Icon aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
            </div>
            <div className="grid min-h-[220px] grid-rows-[44px_1fr] bg-[var(--ds-background-200)]">
              <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-300)] px-3">
                <span className="h-2 w-24 rounded-full bg-[var(--ds-gray-alpha-300)]" />
                <span className="h-6 w-16 rounded-[6px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)]" />
              </div>
              <div className="grid gap-2 p-3">
                <div className="grid gap-2 sm:grid-cols-3">
                  <PreviewBlock />
                  <PreviewBlock />
                  <PreviewBlock />
                </div>
                <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_120px]">
                  <PreviewBlock tall />
                  <PreviewBlock tall />
                </div>
              </div>
            </div>
          </Surface>
        );
      })}
    </div>
  );
}

export function WorkflowShowcase() {
  const [selectedId, setSelectedId] = useState<WorkflowId>(workflowRows[0].id);
  const selected = workflowRows.find((row) => row.id === selectedId) ?? workflowRows[0];

  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Surface className="overflow-hidden" data-component-id="FLOW-01" id="flow-01-table-detail" tone="flat">
        <SectionHeader
          action={<ComponentIdBadge id="FLOW-01" />}
          eyebrow="Workflow"
          summary="Table, selected row, detail panel, bulk actions, and status feedback as one reusable page pattern."
          title="Table to detail workflow"
        />
        <div className="border-b border-[var(--ds-gray-alpha-300)] p-3">
          <ActionBar align="split">
            <div className="flex flex-wrap gap-2">
              <Button icon={ListChecks} size="sm" type="button" variant="primary">
                Run selected
              </Button>
              <Button size="sm" type="button" variant="secondary">
                Export
              </Button>
            </div>
            <Badge tone="gray">{workflowRows.length} records</Badge>
          </ActionBar>
        </div>
        <RecordTable
          columns={workflowColumns}
          getRowId={(row) => row.id}
          minWidth={760}
          onRowClick={(row) => setSelectedId(row.id)}
          rowClassName={(row) =>
            row.id === selectedId ? "bg-[var(--ds-background-200)]" : undefined
          }
          rows={workflowRows}
        />
      </Surface>

      <Card data-component-id="FLOW-02" id="flow-02-detail-panel">
        <CardHeader action={<ComponentIdBadge id="FLOW-02" />}>
          <CardTitle>{selected.name}</CardTitle>
          <CardDescription>
            Detail panel content can become drawer content without changing the table.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-2">
          {[
            ["Owner", selected.owner],
            ["Status", selected.status],
            ["Risk", selected.risk],
          ].map(([label, value]) => (
            <div
              className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2"
              key={label}
            >
              <span className="text-[12px] text-[var(--ds-gray-700)]">{label}</span>
              <span className="font-mono text-[12px]">{value}</span>
            </div>
          ))}
          <ProgressCell color="var(--ds-gray-1000)" showValue value={selected.progress} />
        </div>
      </Card>
    </div>
  );
}

export function ThemeConfigShowcase() {
  const [compact, setCompact] = useState(true);
  const [preview, setPreview] = useState(false);

  return (
    <div className="grid gap-3 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Card data-component-id="THEME-01" id="theme-01-controls">
        <CardHeader action={<Settings2 aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />}>
          <CardTitle>Theme controls</CardTitle>
          <CardDescription>
            Template-level knobs for density, radius, accent, and preview behavior.
          </CardDescription>
        </CardHeader>
        <div className="grid gap-2">
          <ToggleRow
            checked={compact}
            detail="Compact rhythm for dashboard and admin pages."
            label="Compact density"
            onChange={() => setCompact((value) => !value)}
          />
          <ToggleRow
            checked={preview}
            detail="Expose experimental page patterns in the catalog."
            label="Preview patterns"
            onChange={() => setPreview((value) => !value)}
          />
        </div>
      </Card>

      <Surface className="overflow-hidden" data-component-id="THEME-02" id="theme-02-preview" tone="flat">
        <SectionHeader
          action={<ComponentIdBadge id="THEME-02" />}
          eyebrow="Preview"
          summary="Configuration should preview realistic product surfaces, not only token swatches."
          title="Configuration preview"
        />
        <div className="catalog-adaptive-grid p-3">
          {[
            ["Density", compact ? "Compact" : "Comfortable", "var(--ds-blue-700)"],
            ["Radius", "7px / 8px", "var(--ds-gray-1000)"],
            ["Accent", "Blue 700", "var(--ds-blue-700)"],
            ["Preview", preview ? "On" : "Off", "var(--ds-amber-700)"],
          ].map(([label, value, color]) => (
            <div
              className="rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3"
              key={label}
            >
              <StatusSignal color={color} variant="dot" />
              <p className="mt-3 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {label}
              </p>
              <p className="mt-1 text-[18px] font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

export function UsageDocsShowcase() {
  return (
    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_380px]">
      <Surface className="overflow-hidden" data-component-id="DOC-01" id="doc-01-usage" tone="flat">
        <SectionHeader
          action={<ComponentIdBadge id="DOC-01" />}
          eyebrow="Usage"
          summary="Each mature primitive should document intent, expected props, and common mistakes."
          title="Component usage notes"
        />
        <div className="grid gap-3 p-3 md:grid-cols-3">
          <DocColumn
            color="var(--ds-green-700)"
            icon={<CheckCircle2 />}
            title="Use when"
            values={["Repeated operational records", "Dense admin surfaces", "Clear action hierarchy"]}
          />
          <DocColumn
            color="var(--ds-amber-700)"
            icon={<ShieldCheck />}
            title="Avoid"
            values={["Decorative color blocks", "Nested cards inside cards", "Viewport-scaled type"]}
          />
          <DocColumn
            color="var(--ds-blue-700)"
            icon={<SlidersHorizontal />}
            title="Props"
            values={["tone", "density", "variant", "layout profile"]}
          />
        </div>
      </Surface>

      <Card data-component-id="DOC-02" id="doc-02-code-preview">
        <CardHeader action={<Sparkles aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />}>
          <CardTitle>Code preview</CardTitle>
          <CardDescription>Small code samples make the catalog usable as project docs.</CardDescription>
        </CardHeader>
        <pre className="overflow-x-auto rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3 font-mono text-[11px] leading-5 text-[var(--ds-gray-900)]">
{`<DataPanel title="Runtime">
  <RecordTable rows={rows} />
</DataPanel>`}
        </pre>
      </Card>
    </div>
  );
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

function DocColumn({
  color,
  icon,
  title,
  values,
}: {
  color: string;
  icon: React.ReactNode;
  title: string;
  values: string[];
}) {
  return (
    <div className="rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] text-[var(--ds-gray-800)] [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
        <StatusSignal color={color} variant="dot" />
      </div>
      <p className="mt-3 text-[14px] font-semibold">{title}</p>
      <div className="mt-2 grid gap-1.5">
        {values.map((value) => (
          <p className="text-[12px] leading-5 text-[var(--ds-gray-800)]" key={value}>
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}

function Field({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <label className={cn("grid gap-1.5", className)}>
      <span className="text-[12px] font-medium text-[var(--ds-gray-900)]">{label}</span>
      {children}
    </label>
  );
}

function PreviewBlock({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-2",
        tall ? "min-h-28" : "min-h-16",
      )}
    >
      <div className="h-2 w-2/3 rounded-full bg-[var(--ds-gray-alpha-300)]" />
      <div className="mt-2 h-2 w-1/2 rounded-full bg-[var(--ds-gray-alpha-200)]" />
    </div>
  );
}

function ToggleRow({
  checked,
  detail,
  label,
  onChange,
}: {
  checked: boolean;
  detail: string;
  label: string;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2.5">
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold">{label}</span>
        <span className="mt-0.5 block text-[12px] leading-5 text-[var(--ds-gray-700)]">
          {detail}
        </span>
      </span>
      <ToggleCell checked={checked} onChange={onChange} />
    </div>
  );
}
