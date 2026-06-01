"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Command,
  Layers,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { ActionBar } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlassTag } from "@/components/ui/glass-tag";
import { DefaultDialogFooter, DialogFrame } from "@/components/ui/overlay-frame";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";

const alertRows = [
  ["ALERT-01", "Info", "System notes stay neutral and use a small signal dot instead of a colored surface.", "var(--ds-blue-700)"],
  ["ALERT-02", "Saved", "Successful states keep the same surface; only the signal color changes.", "var(--ds-green-700)"],
  ["ALERT-03", "Risk", "Critical messages stay noticeable without shouting.", "var(--ds-pink-700)"],
] as const;

const graphRows = [
  {
    color: "var(--ds-blue-700)",
    description: "Baseline product direction signal. Use it when a row needs calm but visible priority context.",
    id: "graph-vision",
    label: "Vision",
    stage: "Baseline",
    value: 72,
  },
  {
    color: "var(--ds-teal-700)",
    description: "Live customer or user-experience signal. Good for records that need empathy and feedback context.",
    id: "graph-empathy",
    label: "Empathy",
    stage: "Live",
    value: 88,
  },
  {
    color: "var(--ds-amber-700)",
    description: "Review-needed signal. It marks attention without turning the whole row into a warning block.",
    id: "graph-risk",
    label: "Risk",
    stage: "Review",
    value: 54,
  },
  {
    color: "var(--ds-purple-700)",
    description: "Judgment or confidence signal for decisions that need human review before shipping.",
    id: "graph-trust",
    label: "Trust",
    stage: "Ready",
    value: 67,
  },
] as const;

const graphColumns: RecordTableColumn<(typeof graphRows)[number]>[] = [
  {
    header: "Signal",
    key: "signal",
    render: (row) => (
      <InfoTooltip
        color={row.color}
        description={row.description}
        label={row.label}
      />
    ),
  },
  {
    className: "w-[112px]",
    header: "Stage",
    key: "stage",
    render: (row) => (
      <StatusSignal color={row.color} variant="pill">
        {row.stage}
      </StatusSignal>
    ),
  },
  {
    className: "w-[180px]",
    header: "Value",
    key: "value",
    render: (row) => <ProgressCell color="var(--ds-gray-1000)" showValue value={row.value} />,
  },
];

const badgeRows = [
  ["Retail", "var(--ds-gray-1000)"],
  ["Active", "var(--ds-blue-700)"],
  ["Done", "var(--ds-green-700)"],
  ["Medium Risk", "var(--ds-amber-700)"],
  ["High Risk", "var(--ds-pink-700)"],
  ["Judgment", "var(--ds-purple-700)"],
  ["Empathy", "var(--ds-teal-700)"],
] as const;

export function ActionShowcase() {
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="grid items-start gap-3 xl:grid-cols-[1fr_360px]">
        <Surface
          className="p-4"
          data-component-id="ACTION-01"
          id="action-01-toolbar"
          tone="flat"
        >
          <div className="mb-3">
            <ComponentIdBadge id="ACTION-01" />
          </div>
          <ActionBar>
            <Button icon={BookOpen} variant="primary">
              Explore flows
            </Button>
            <Button icon={ArrowUpRight} variant="secondary">
              Runtime detail
            </Button>
            <Button icon={Search} variant="ghost">
              Search
            </Button>
            <Button icon={Menu} size="sm" variant="secondary">
              Menu
            </Button>
          </ActionBar>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {badgeRows.map(([label, color]) => (
              <StatusSignal color={color} key={label} variant="pill">
                {label}
              </StatusSignal>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <GlassTag tone="dark">glass tag</GlassTag>
            <GlassTag tone="dark">blur edge</GlassTag>
            <GlassTag tone="dark">soft light</GlassTag>
          </div>
        </Surface>

        <Surface
          className="overflow-hidden self-start"
          data-component-id="ACTION-02"
          id="action-02-compact-toolbar"
          tone="flat"
        >
          <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] px-3 py-2">
            <div className="flex items-center gap-2">
              <Command aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
              <span className="text-[13px] font-medium">Compact toolbar</span>
            </div>
            <div className="flex items-center gap-2">
              <ComponentIdBadge id="ACTION-02" />
              <Badge tone="gray">3 actions</Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
            {["Analysis", "Priority", "Path"].map((item, index) => (
              <button
                className="flex h-20 flex-col items-center justify-center gap-2 text-[13px] font-medium hover:bg-[var(--ds-gray-100)]"
                key={item}
                type="button"
              >
                <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                  0{index + 1}
                </span>
                {item}
              </button>
            ))}
          </div>
        </Surface>

        <div className="grid gap-3 lg:grid-cols-3 xl:col-span-2">
          {alertRows.map(([id, title, body, color]) => (
            <NeutralAlert body={body} color={color} id={id} key={id} title={title} />
          ))}
        </div>

        <Surface
          className="overflow-hidden xl:col-span-2"
          data-component-id="GRAPH-01"
          id="graph-01-signal-bars"
          tone="flat"
        >
          <div className="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <ComponentIdBadge id="GRAPH-01" />
                <Badge tone="gray">bar alternative</Badge>
              </div>
              <h3 className="mt-4 text-[18px] font-semibold">Signal bars</h3>
              <p className="mt-1 max-w-xl text-[13px] leading-5 text-[var(--ds-gray-900)]">
                The same signal data expressed with the reusable table primitive.
              </p>
              <div className="mt-4 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)]">
                <RecordTable
                  columns={graphColumns}
                  fit
                  getRowId={(row) => row.id}
                  rows={graphRows}
                />
              </div>
            </div>
            <Card depth="flat" tone="muted">
              <CardHeader action={<Sparkles className="h-4 w-4 text-[var(--ds-gray-700)]" />}>
                <CardTitle>Badge rail</CardTitle>
                <CardDescription>
                  The same badge family, slightly more decorative, while staying aligned with the table language.
                </CardDescription>
              </CardHeader>
              <div className="flex flex-wrap gap-2">
                <StatusSignal color="var(--ds-blue-700)" variant="pill">AI Ready</StatusSignal>
                <StatusSignal color="var(--ds-green-700)" variant="pill">Governed</StatusSignal>
                <StatusSignal color="var(--ds-purple-700)" variant="pill">Judgment</StatusSignal>
                <StatusSignal color="var(--ds-amber-700)" variant="pill">Review</StatusSignal>
                <GlassTag tone="dark">glass</GlassTag>
              </div>
            </Card>
          </div>
        </Surface>

        <Surface
          className="p-4 xl:col-span-2"
          data-component-id="OVER-01"
          id="over-01-modal-toast"
          tone="flat"
        >
          <div className="flex flex-wrap items-center gap-2">
            <ComponentIdBadge id="OVER-01" />
            <DialogExample />
            <ComponentIdBadge id="OVER-02" />
            <Button icon={Bell} onClick={() => setToastOpen(true)} type="button">
              Show toast
            </Button>
            <Badge tone="gray">Radix powered</Badge>
          </div>
        </Surface>
      </div>

      <Toast.Root
        className="depth-surface fixed bottom-4 right-4 z-50 w-[320px] rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3"
        data-component-id="OVER-02"
        duration={3000}
        onOpenChange={setToastOpen}
        open={toastOpen}
      >
        <div className="flex items-start gap-3">
          <StatusSignal className="mt-2" color="var(--ds-green-700)" variant="dot" />
          <div className="min-w-0">
            <Toast.Title className="text-[13px] font-semibold">
              Component saved
            </Toast.Title>
            <Toast.Description className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-900)]">
              Toast is working; the surface stays neutral and the signal comes from a small color dot.
            </Toast.Description>
          </div>
          <Toast.Close className="ml-auto rounded-[5px] p-1 text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)]">
            <X aria-hidden="true" className="h-4 w-4" />
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function DialogExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button data-component-id="OVER-01" icon={Layers} type="button" variant="primary">
          Open modal
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35" />
        <DialogFrame
          description={
            <>
            Neutral modal surface. No colored decision block, just a clear frame and short action.
            </>
          }
          footer={<DefaultDialogFooter />}
          title="Modal"
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NeutralAlert({
  body,
  color,
  id,
  title,
}: {
  body: string;
  color: string;
  id: string;
  title: string;
}) {
  return (
    <div
      className="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.76),0_1px_1px_rgb(0_0_0_/_0.04)]"
      data-component-id={id}
      id={id.toLowerCase()}
    >
      <div className="flex items-start gap-2">
        <StatusSignal className="mt-1.5" color={color} variant="dot" />
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
            <ComponentIdBadge id={id} />
            {title}
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-900)]">{body}</p>
        </div>
      </div>
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
