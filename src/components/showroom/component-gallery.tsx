"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import * as Toast from "@radix-ui/react-toast";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Inbox,
  LayoutDashboard,
  Loader2,
  Mail,
  Menu,
  Search,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

const graphData = [
  { color: "var(--ds-blue-700)", label: "Vision", value: 72 },
  { color: "var(--ds-green-700)", label: "Empathy", value: 88 },
  { color: "var(--ds-teal-700)", label: "Risk", value: 54 },
  { color: "var(--ds-amber-700)", label: "AI", value: 91 },
  { color: "var(--ds-purple-700)", label: "Trust", value: 67 },
];

const listItems = [
  ["RAG discovery", "Knowledge assistant scope", "Ready"],
  ["Agent workflow", "Research to report chain", "Active"],
  ["Governance", "Approval and risk policy", "Draft"],
];

const dateOptions = ["2026-05-24", "2026-05-29", "2026-06-03"];

export function ComponentGallery() {
  const [toastOpen, setToastOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0]);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="space-y-3">
        <ShowroomBand
          componentId="C-01"
          eyebrow="Application structure"
          summary="Small layout studies for AppShell, Header, Sidebar, PageHeader, Section, and Footer."
          title="Shell and layout"
        >
          <div className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
            <MiniAppShell />
            <div className="grid gap-3">
              <PageHeaderExample />
              <FooterExample />
            </div>
          </div>
        </ShowroomBand>

        <ShowroomBand
          componentId="C-02"
          eyebrow="Core UI"
          summary="Button, Badge, Alert, inline action, and avatar examples in the same contrast language."
          title="Actions, flags and inline"
        >
          <div className="grid gap-3 lg:grid-cols-3">
            <CoreActionsCard />
            <AlertStack />
            <AvatarInlineCard />
          </div>
        </ShowroomBand>

        <ShowroomBand
          componentId="C-03"
          eyebrow="Forms"
          summary="Form, Datepicker, inline validation, and compact submit areas."
          title="Input patterns"
        >
          <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
            <FormExample selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <DatePickerCard selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
        </ShowroomBand>

        <ShowroomBand
          componentId="C-04"
          eyebrow="Overlays"
          summary="Modal and toast examples that feel light, controlled, and dashboard-ready."
          title="Modal and toast"
        >
          <Surface
            className="p-4"
            data-component-id="OVER-01"
            id="over-01-modal-toast"
            tone="flat"
          >
            <div className="flex flex-wrap items-center gap-2">
              <ComponentIdBadge id="OVER-01" />
              <DialogExample />
              <ComponentIdBadge id="OVER-02" />
              <Button
                data-component-id="OVER-02"
                icon={Bell}
                onClick={() => setToastOpen(true)}
                type="button"
              >
                Show toast
              </Button>
              <Badge tone="gray">Radix powered</Badge>
            </div>
          </Surface>
        </ShowroomBand>

        <ShowroomBand
          componentId="C-05"
          eyebrow="Data display"
          summary="Bar graph, stats/metrics, list, pagination, and grid examples."
          title="Data and navigation"
        >
          <div className="grid gap-3 xl:grid-cols-[1fr_380px]">
            <GraphCard />
            <StatsGrid />
          </div>
          <div className="mt-3 grid gap-3 xl:grid-cols-[1fr_380px]">
            <ListExample />
            <PaginationExample />
          </div>
        </ShowroomBand>

        <ShowroomBand
          componentId="C-06"
          eyebrow="States"
          summary="EmptyState, LoadingState, and ErrorState for the three gaps product surfaces need most often."
          title="Empty, loading and error"
        >
          <div className="grid gap-3 lg:grid-cols-3">
            <StateCard
              description="No segment is selected yet. Start by adding a filter."
              componentId="STATE-01"
              icon={<Inbox aria-hidden="true" className="h-5 w-5" />}
              title="EmptyState"
            />
            <LoadingStateCard componentId="STATE-02" />
            <StateCard
              description="The source did not respond. Try again or use fallback data."
              componentId="STATE-03"
              icon={<ShieldAlert aria-hidden="true" className="h-5 w-5" />}
              title="ErrorState"
              tone="error"
            />
          </div>
        </ShowroomBand>
      </div>

      <Toast.Root
        className="depth-surface fixed bottom-4 right-4 z-50 w-[320px] rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 shadow-[var(--ds-shadow-menu)]"
        data-component-id="OVER-02"
        duration={3000}
        onOpenChange={setToastOpen}
        open={toastOpen}
      >
        <div className="flex items-start gap-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] bg-[var(--ds-green-100)] text-[var(--ds-green-900)]">
            <Check aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <Toast.Title className="text-[13px] font-semibold">
              Component saved
            </Toast.Title>
            <Toast.Description className="mt-1 text-[12px] leading-5 text-[var(--ds-gray-900)]">
              The toast surface is compact, readable, and calm for states without actions.
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

function ShowroomBand({
  children,
  componentId,
  eyebrow,
  summary,
  title,
}: {
  children: React.ReactNode;
  componentId: string;
  eyebrow: string;
  summary: string;
  title: string;
}) {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id={componentId}
      id={componentId.toLowerCase()}
      tone="flat"
    >
      <SectionHeader
        action={<ComponentIdBadge id={componentId} />}
        eyebrow={eyebrow}
        summary={summary}
        title={title}
      />
      <div className="p-3">{children}</div>
    </Surface>
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

function MiniAppShell() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="APP-01"
      id="app-01-mini-shell"
      tone="raised"
    >
      <div className="flex h-10 items-center justify-between border-b border-[var(--ds-gray-alpha-400)] px-3">
        <div className="flex items-center gap-2">
          <Menu aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
          <span className="text-[13px] font-semibold">Header</span>
        </div>
        <div className="flex items-center gap-2">
          <ComponentIdBadge id="APP-01" />
          <Badge tone="gray">AppShell</Badge>
        </div>
      </div>
      <div className="grid min-h-[240px] grid-cols-[160px_1fr]">
        <aside className="border-r border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] p-3">
          <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            Sidebar
          </p>
          <div className="mt-3 space-y-1">
            {["Overview", "Workflows", "Reports"].map((item) => (
              <div
                className="rounded-[6px] px-2 py-1.5 text-[12px] font-medium hover:bg-[var(--ds-background-100)]"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </aside>
        <section className="p-4">
          <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            PageHeader
          </p>
          <h3 className="mt-1 text-[20px] font-semibold">Operations dashboard</h3>
          <p className="mt-2 max-w-md text-[13px] leading-5 text-[var(--ds-gray-900)]">
            Section surfaces carry table, card, and form blocks inside the same grid.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {["Card", "Table", "Form"].map((item) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-3 text-[13px] font-medium"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Surface>
  );
}

function PageHeaderExample() {
  return (
    <Card
      data-component-id="APP-02"
      depth="base"
      id="app-02-page-header"
      tone="default"
    >
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <ComponentIdBadge id="APP-02" />
            <Button icon={Sparkles} size="sm">Create</Button>
          </div>
        }
      >
        <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
          PageHeader
        </p>
        <CardTitle className="mt-2">Compact but descriptive</CardTitle>
        <CardDescription>
          The title speaks to the user; the mono description explains the system.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function FooterExample() {
  return (
    <Card data-component-id="APP-03" depth="flat" id="app-03-footer" tone="muted">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
        <span className="flex items-center gap-2 font-medium">
          <ComponentIdBadge id="APP-03" />
          Footer
        </span>
        <span className="font-mono text-[var(--ds-gray-700)]">
          © 2025 · Terms · Privacy
        </span>
      </div>
    </Card>
  );
}

function CoreActionsCard() {
  return (
    <Card data-component-id="CORE-01" id="core-01-actions">
      <CardHeader action={<ComponentIdBadge id="CORE-01" />}>
        <CardTitle>Button + Badge</CardTitle>
        <CardDescription>Two or three variants stress-tested in the same row.</CardDescription>
      </CardHeader>
      <div className="flex flex-wrap gap-2">
        <Button icon={Send} variant="primary">Send</Button>
        <Button icon={FileText} variant="secondary">Draft</Button>
        <Button icon={Search} variant="ghost">Search</Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="blue">Active</Badge>
        <Badge tone="amber">Review</Badge>
        <Badge tone="pink">Blocked</Badge>
      </div>
    </Card>
  );
}

function AlertStack() {
  return (
    <div className="grid gap-2">
      <Alert componentId="ALERT-01" tone="info" title="Alert">
        System information should read short and direct.
      </Alert>
      <Alert componentId="ALERT-02" tone="success" title="Saved">
        Form validation and save feedback.
      </Alert>
      <Alert componentId="ALERT-03" tone="danger" title="Error">
        Critical error color should be minimal but clear.
      </Alert>
    </div>
  );
}

function Alert({
  children,
  componentId,
  title,
  tone,
}: {
  children: React.ReactNode;
  componentId: string;
  title: string;
  tone: "danger" | "info" | "success";
}) {
  const toneClass = {
    danger: "border-[var(--ds-red-400)] bg-[var(--ds-red-100)] text-[var(--ds-red-900)]",
    info: "border-[var(--ds-blue-400)] bg-[var(--ds-blue-100)] text-[var(--ds-blue-900)]",
    success:
      "border-[var(--ds-green-400)] bg-[var(--ds-green-100)] text-[var(--ds-green-900)]",
  }[tone];

  return (
    <div
      className={cn("rounded-[8px] border p-3", toneClass)}
      data-component-id={componentId}
      id={componentId.toLowerCase()}
    >
      <div className="flex items-start gap-2">
        <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
            <ComponentIdBadge id={componentId} />
            {title}
          </p>
          <p className="mt-1 text-[12px] leading-5 opacity-80">{children}</p>
        </div>
      </div>
    </div>
  );
}

function AvatarInlineCard() {
  return (
    <Card data-component-id="CORE-02" id="core-02-avatar-inline">
      <CardHeader action={<ComponentIdBadge id="CORE-02" />}>
        <CardTitle>Avatar + inline</CardTitle>
        <CardDescription>A compact identity and inline action example.</CardDescription>
      </CardHeader>
      <div className="flex items-center gap-3">
        <AvatarPrimitive.Root className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]">
          <AvatarPrimitive.Fallback className="text-[13px] font-semibold">
            IH
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold">Isil Hasdemir</p>
          <p className="truncate text-[12px] text-[var(--ds-gray-700)]">
            Runtime owner · Core cohort
          </p>
        </div>
      </div>
      <button
        className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--ds-gray-1000)]"
        type="button"
      >
        Open profile <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
      </button>
    </Card>
  );
}

function FormExample({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}) {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="FORM-01"
      id="form-01-request"
      tone="flat"
    >
      <SectionHeader
        action={<ComponentIdBadge id="FORM-01" />}
        eyebrow="Form"
        summary="Label, helper text, and validation density."
        title="Runtime request form"
      />
      <form className="grid gap-3 p-4 md:grid-cols-2">
        <Field label="Name">
          <input className={inputClass} placeholder="Operations cohort" />
        </Field>
        <Field label="Email">
          <input className={inputClass} placeholder="team@example.com" type="email" />
        </Field>
        <Field label="Track">
          <select className={inputClass} defaultValue="ai">
            <option value="api">API platform</option>
            <option value="runtime">Runtime workflow</option>
            <option value="coaching">Coaching</option>
          </select>
        </Field>
        <Field label="Start date">
          <input
            className={inputClass}
            onChange={(event) => setSelectedDate(event.target.value)}
            type="date"
            value={selectedDate}
          />
        </Field>
        <Field className="md:col-span-2" label="Notes">
          <textarea
            className={cn(inputClass, "min-h-24 resize-none py-2")}
            placeholder="Company goal, team size, expected outcome..."
          />
        </Field>
        <div className="flex flex-wrap items-center gap-2 md:col-span-2">
          <Button icon={Mail} type="button" variant="primary">Request</Button>
          <Button type="button" variant="secondary">Save draft</Button>
          <span className="text-[12px] text-[var(--ds-gray-700)]">
            Selected: {selectedDate}
          </span>
        </div>
      </form>
    </Surface>
  );
}

function DatePickerCard({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}) {
  return (
    <Card data-component-id="FORM-02" depth="base" id="form-02-datepicker" tone="default">
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <ComponentIdBadge id="FORM-02" />
            <CalendarDays className="h-4 w-4 text-[var(--ds-gray-700)]" />
          </div>
        }
      >
        <CardTitle>Datepicker</CardTitle>
        <CardDescription>Compact date selection powered by a popover.</CardDescription>
      </CardHeader>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button icon={CalendarDays} variant="secondary">
            {selectedDate}
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            className="depth-surface z-50 mt-2 w-[240px] rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-2"
          >
            <div className="grid gap-1">
              {dateOptions.map((date) => (
                <Popover.Close asChild key={date}>
                  <button
                    className={cn(
                      "flex h-9 items-center justify-between rounded-[6px] px-2 text-[13px] hover:bg-[var(--ds-gray-100)]",
                      selectedDate === date && "bg-[var(--ds-gray-100)] font-semibold",
                    )}
                    onClick={() => setSelectedDate(date)}
                    type="button"
                  >
                    {date}
                    {selectedDate === date ? <Check className="h-4 w-4" /> : null}
                  </button>
                </Popover.Close>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <CardFooter>
        <p className="text-[12px] text-[var(--ds-gray-700)]">
          Native date input and popover picker are tested together.
        </p>
      </CardFooter>
    </Card>
  );
}

function DialogExample() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          data-component-id="OVER-01"
          icon={LayoutDashboard}
          type="button"
          variant="primary"
        >
          Open modal
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35" />
        <Dialog.Content className="depth-surface fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
          <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] p-4">
            <Dialog.Title className="text-[16px] font-semibold">
              Modal
            </Dialog.Title>
            <Dialog.Close className="rounded-[5px] p-1 hover:bg-[var(--ds-gray-100)]">
              <X aria-hidden="true" className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="p-4 text-[13px] leading-5 text-[var(--ds-gray-900)]">
            A small, dense, and calm modal for non-critical confirmations. When the
            content stays short, the visual system remains intact.
          </Dialog.Description>
          <div className="flex justify-end gap-2 border-t border-[var(--ds-gray-alpha-300)] p-3">
            <Dialog.Close asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button type="button" variant="primary">Confirm</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function GraphCard() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="DATA-01"
      id="data-01-bar-graph"
      tone="flat"
    >
      <SectionHeader
        action={
          <>
            <ComponentIdBadge id="DATA-01" />
            <Badge tone="blue">Bar Graph</Badge>
          </>
        }
        eyebrow="Charts"
        summary="Recharts ile data visualization tonu."
        title="Capability scores"
      />
      <div className="overflow-x-auto p-4">
        <BarChart
          data={graphData}
          height={230}
          margin={{ bottom: 0, left: -24, right: 8, top: 8 }}
          width={560}
        >
          <CartesianGrid stroke="var(--ds-gray-alpha-300)" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            fontSize={12}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "var(--ds-background-100)",
              border: "1px solid var(--ds-gray-alpha-400)",
              borderRadius: 8,
              color: "var(--ds-gray-1000)",
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="value"
            fill="var(--ds-blue-700)"
            radius={[6, 6, 0, 0]}
            stroke="var(--ds-gray-1000)"
            strokeWidth={1}
          >
            {graphData.map((entry) => (
              <Cell fill={entry.color} key={entry.label} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </Surface>
  );
}

function StatsGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
      {[
        ["MET-01", "92%", "Readiness", "green"],
        ["MET-02", "18", "Workflows", "blue"],
        ["MET-03", "04", "Risks", "amber"],
      ].map(([componentId, value, label, tone]) => (
        <Card
          data-component-id={componentId}
          depth="base"
          id={componentId.toLowerCase()}
          key={label}
          tone="default"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {label}
              </p>
              <p className="mt-2 text-[28px] font-semibold leading-8">{value}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <ComponentIdBadge id={componentId} />
              <Badge tone={tone as "amber" | "blue" | "green"}>metric</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ListExample() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="LIST-01"
      id="list-01-workflow"
      tone="flat"
    >
      <SectionHeader
        action={<ComponentIdBadge id="LIST-01" />}
        eyebrow="List"
        summary="For moments when a row list works better than cards."
        title="Workflow list"
      />
      <div className="divide-y divide-[var(--ds-gray-alpha-300)]">
        {listItems.map(([title, description, status]) => (
          <div className="flex items-center gap-3 px-4 py-3" key={title}>
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] bg-[var(--ds-gray-100)]">
              <Clock aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold">{title}</p>
              <p className="truncate text-[12px] text-[var(--ds-gray-700)]">
                {description}
              </p>
            </div>
            <Badge tone={status === "Ready" ? "green" : status === "Active" ? "blue" : "gray"}>
              {status}
            </Badge>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function PaginationExample() {
  return (
    <Card data-component-id="NAV-01" id="nav-01-pagination">
      <CardHeader action={<ComponentIdBadge id="NAV-01" />}>
        <CardTitle>Pagination</CardTitle>
        <CardDescription>Compact pagination for dense tables.</CardDescription>
      </CardHeader>
      <div className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] p-2">
        <Button icon={ChevronLeft} size="sm" variant="ghost">Prev</Button>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((page) => (
            <button
              className={cn(
                "grid h-8 w-8 place-items-center rounded-[6px] border text-[12px] font-medium",
                page === 2
                  ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
                  : "border-transparent hover:bg-[var(--ds-gray-100)]",
              )}
              key={page}
              type="button"
            >
              {page}
            </button>
          ))}
        </div>
        <Button icon={ChevronRight} size="sm" variant="ghost">Next</Button>
      </div>
    </Card>
  );
}

function StateCard({
  componentId,
  description,
  icon,
  title,
  tone = "default",
}: {
  componentId: string;
  description: string;
  icon: React.ReactNode;
  title: string;
  tone?: "default" | "error";
}) {
  return (
    <Card
      data-component-id={componentId}
      depth="base"
      id={componentId.toLowerCase()}
      tone={tone === "error" ? "warning" : "default"}
    >
      <div className="mb-3">
        <ComponentIdBadge id={componentId} />
      </div>
      <div className="grid h-10 w-10 place-items-center rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
        {icon}
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <Button className="mt-4" size="sm" type="button" variant="secondary">
        Action
      </Button>
    </Card>
  );
}

function LoadingStateCard({ componentId }: { componentId: string }) {
  return (
    <Card data-component-id={componentId} depth="base" id={componentId.toLowerCase()} tone="default">
      <div className="mb-3">
        <ComponentIdBadge id={componentId} />
      </div>
      <div className="flex items-center gap-2">
        <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin text-[var(--ds-gray-700)]" />
        <CardTitle>LoadingState</CardTitle>
      </div>
      <div className="mt-5 space-y-2">
        <div className="h-3 w-3/4 rounded-full bg-[var(--ds-gray-alpha-300)]" />
        <div className="h-3 w-full rounded-full bg-[var(--ds-gray-alpha-300)]" />
        <div className="h-3 w-2/3 rounded-full bg-[var(--ds-gray-alpha-300)]" />
      </div>
      <CardDescription className="mt-5">
        Skeleton lines reduce layout shift.
      </CardDescription>
    </Card>
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

const inputClass =
  "h-9 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-[13px] text-[var(--ds-gray-1000)] outline-none transition placeholder:text-[var(--ds-gray-700)] focus:shadow-[var(--ds-focus-ring)]";
