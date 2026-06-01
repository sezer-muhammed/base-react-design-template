"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  AlertTriangle,
  BellRing,
  CircleDashed,
  Clock3,
  Command,
  Database,
  FileSearch,
  Gauge,
  Inbox,
  KeyRound,
  Loader2,
  LockKeyhole,
  Play,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  TerminalSquare,
  UserRound,
  Webhook,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataPanel } from "@/components/ui/data-panel";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordCard } from "@/components/ui/record-card";
import { RecordTable, type RecordTableColumn } from "@/components/ui/record-table";
import { SearchFilterHeader } from "@/components/ui/search-filter-header";
import { StateBlock } from "@/components/ui/state-block";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { ToggleCell } from "@/components/ui/toggle-cell";

const commandItems = [
  {
    color: "var(--ds-blue-700)",
    description: "Open the API route handler blueprint.",
    group: "Navigation",
    id: "cmd-api",
    icon: TerminalSquare,
    title: "Go to API Surface",
  },
  {
    color: "var(--ds-teal-700)",
    description: "Inspect signed webhook intake events.",
    group: "Runtime",
    id: "cmd-push",
    icon: Webhook,
    title: "Open Push Inbox",
  },
  {
    color: "var(--ds-purple-700)",
    description: "Review cursor sync jobs and retry windows.",
    group: "Jobs",
    id: "cmd-jobs",
    icon: RefreshCw,
    title: "Review Pull Jobs",
  },
  {
    color: "var(--ds-amber-700)",
    description: "Find risky config and feature flag drift.",
    group: "Search",
    id: "cmd-search",
    icon: FileSearch,
    title: "Search Runtime Records",
  },
  {
    color: "var(--ds-green-700)",
    description: "Open realtime stream diagnostics.",
    group: "Realtime",
    id: "cmd-stream",
    icon: Radio,
    title: "Watch Event Stream",
  },
];

const jobRows = [
  {
    color: "var(--ds-green-700)",
    id: "job-sync-001",
    label: "Catalog pull sync",
    nextRun: "04:30",
    progress: 86,
    status: "Healthy",
  },
  {
    color: "var(--ds-blue-700)",
    id: "job-index-002",
    label: "Search index refresh",
    nextRun: "08:00",
    progress: 64,
    status: "Running",
  },
  {
    color: "var(--ds-amber-700)",
    id: "job-risk-003",
    label: "Policy drift scan",
    nextRun: "12:15",
    progress: 48,
    status: "Watch",
  },
  {
    color: "var(--ds-purple-700)",
    id: "job-mail-004",
    label: "Digest delivery",
    nextRun: "18:00",
    progress: 72,
    status: "Queued",
  },
];

const streamRows = [
  {
    channel: "Webhook",
    color: "var(--ds-teal-700)",
    event: "webhook.received",
    handled: 92,
    id: "evt-001",
    lag: "128ms",
    payload: "evt_8ks23",
    source: "Signed intake",
    status: "Received",
    time: "09:42:18",
  },
  {
    channel: "Worker",
    color: "var(--ds-blue-700)",
    event: "job.started",
    handled: 64,
    id: "evt-002",
    lag: "241ms",
    payload: "job_29a71",
    source: "Pull queue",
    status: "Running",
    time: "09:42:21",
  },
  {
    channel: "Cache",
    color: "var(--ds-green-700)",
    event: "cache.revalidated",
    handled: 100,
    id: "evt-003",
    lag: "84ms",
    payload: "tag_runtime",
    source: "Route handler",
    status: "Done",
    time: "09:42:29",
  },
  {
    channel: "Adapter",
    color: "var(--ds-amber-700)",
    event: "adapter.warning",
    handled: 38,
    id: "evt-004",
    lag: "412ms",
    payload: "tcp_slot",
    source: "TCP slot",
    status: "Watch",
    time: "09:42:34",
  },
  {
    channel: "Broadcast",
    color: "var(--ds-purple-700)",
    event: "broadcast.sent",
    handled: 78,
    id: "evt-005",
    lag: "176ms",
    payload: "channel_ops",
    source: "Realtime bus",
    status: "Sent",
    time: "09:42:41",
  },
] as const;

const stateRows = [
  {
    action: "Create record",
    color: "var(--ds-gray-1000)",
    description: "Use when a surface has no records yet but the user can start.",
    icon: Inbox,
    id: "STATE-01",
    title: "Empty state",
  },
  {
    action: "Loading",
    color: "var(--ds-blue-700)",
    description: "Skeleton rhythm keeps the layout stable while data arrives.",
    icon: Loader2,
    id: "STATE-02",
    title: "Loading state",
  },
  {
    action: "Retry",
    color: "var(--ds-pink-700)",
    description: "Error surfaces stay neutral; urgency lives in the signal dot.",
    icon: AlertTriangle,
    id: "STATE-03",
    title: "Error state",
  },
];

type CommandItem = (typeof commandItems)[number];
type JobRow = (typeof jobRows)[number];
type StreamRow = (typeof streamRows)[number];
type SettingKey = "audit" | "compact" | "preview" | "realtime";
type SettingsState = Record<SettingKey, boolean>;

const settingRows: Array<{
  color: string;
  description: string;
  id: SettingKey;
  label: string;
  scope: string;
}> = [
  {
    color: "var(--ds-green-700)",
    description: "Store replayable event history for sensitive operations.",
    id: "audit",
    label: "Audit trail",
    scope: "Governance",
  },
  {
    color: "var(--ds-blue-700)",
    description: "Enable stream surfaces for live dashboards and console previews.",
    id: "realtime",
    label: "Realtime channels",
    scope: "Runtime",
  },
  {
    color: "var(--ds-gray-1000)",
    description: "Prefer dense tables, smaller buttons, and tighter vertical rhythm.",
    id: "compact",
    label: "Compact density",
    scope: "Interface",
  },
  {
    color: "var(--ds-amber-700)",
    description: "Expose experimental adapter slots before they are production-ready.",
    id: "preview",
    label: "Preview adapters",
    scope: "Adapters",
  },
];

const commandColumns: RecordTableColumn<CommandItem>[] = [
  {
    header: "Command",
    key: "command",
    render: (item) => {
      const Icon = item.icon;

      return (
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
            <Icon aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-800)]" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 font-semibold">
              <StatusSignal color={item.color} variant="dot" />
              {item.title}
            </span>
            <span className="mt-0.5 block truncate text-[12px] text-[var(--ds-gray-700)]">
              {item.description}
            </span>
          </span>
        </span>
      );
    },
  },
  {
    className: "w-[120px]",
    header: "Group",
    key: "group",
    render: (item) => (
      <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
        {item.group}
      </span>
    ),
  },
  {
    className: "w-[100px]",
    header: "Signal",
    key: "signal",
    render: (item) => <StatusSignal color={item.color} variant="pill">ready</StatusSignal>,
  },
];

const jobColumns: RecordTableColumn<JobRow>[] = [
  {
    header: "Job",
    key: "job",
    render: (job) => (
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-semibold">
          <StatusSignal color={job.color} variant="dot" />
          {job.label}
        </span>
        <span className="mt-1 block truncate font-mono text-[11px] text-[var(--ds-gray-700)]">
          {job.id}
        </span>
      </span>
    ),
  },
  {
    className: "w-[150px]",
    header: "Readiness",
    key: "readiness",
    render: (job) => <ProgressCell color={job.color} value={job.progress} />,
  },
  {
    className: "w-[118px]",
    header: "Status",
    key: "status",
    render: (job) => <StatusSignal color={job.color} variant="pill">{job.status}</StatusSignal>,
  },
  {
    align: "right",
    className: "w-[90px]",
    header: "Next",
    key: "next",
    render: (job) => (
      <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
        {job.nextRun}
      </span>
    ),
  },
];

function getStreamColumns(live: boolean): RecordTableColumn<StreamRow>[] {
  return [
    {
      className: "w-[22%]",
      header: "Event",
      key: "time",
      render: (row) => (
        <span className="min-w-0">
          <span className="flex min-w-0 items-center gap-2 font-medium">
            <StatusSignal color={row.color} pulse={live} variant="dot" />
            <span className="truncate">{row.event}</span>
          </span>
          <span className="mt-0.5 block truncate font-mono text-[11px] text-[var(--ds-gray-700)]">
            {row.time}
          </span>
        </span>
      ),
    },
    {
      className: "w-[20%]",
      header: "Source",
      key: "event",
      render: (row) => (
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">
            {row.source}
          </span>
          <span className="mt-0.5 block truncate text-[12px] text-[var(--ds-gray-700)]">
            {row.channel}
          </span>
        </span>
      ),
    },
    {
      className: "w-[15%]",
      header: "State",
      key: "channel",
      render: (row) => <StatusSignal color={row.color} variant="pill">{row.status}</StatusSignal>,
    },
    {
      className: "w-[20%]",
      header: "Health",
      key: "handled",
      render: (row) => (
        <span className="grid gap-1">
          <ProgressCell className="w-full" color={row.color} value={row.handled} />
          <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
            {row.lag}
          </span>
        </span>
      ),
    },
    {
      align: "right",
      className: "w-[23%]",
      header: "Payload",
      key: "payload",
      render: (row) => (
        <span className="block truncate font-mono text-[11px] text-[var(--ds-gray-800)]">
          {row.payload}
        </span>
      ),
    },
  ];
}

function getSettingColumns({
  onToggle,
  settings,
}: {
  onToggle: (id: SettingKey) => void;
  settings: SettingsState;
}): RecordTableColumn<(typeof settingRows)[number]>[] {
  return [
    {
      header: "Config",
      key: "config",
      render: (row) => (
        <span className="min-w-0">
          <span className="flex items-center gap-2 font-semibold">
            <StatusSignal color={row.color} variant="dot" />
            {row.label}
          </span>
          <span className="mt-0.5 block text-[12px] leading-5 text-[var(--ds-gray-700)]">
            {row.description}
          </span>
        </span>
      ),
    },
    {
      className: "w-[130px]",
      header: "Scope",
      key: "scope",
      render: (row) => (
        <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
          {row.scope}
        </span>
      ),
    },
    {
      className: "w-[104px]",
      header: "State",
      key: "state",
      render: (row) => (
        <StatusSignal color={settings[row.id] ? row.color : "var(--ds-gray-700)"} variant="pill">
          {settings[row.id] ? "on" : "off"}
        </StatusSignal>
      ),
    },
    {
      align: "right",
      className: "w-[96px]",
      header: "Toggle",
      key: "toggle",
      render: (row) => (
        <ToggleCell
          checked={settings[row.id]}
          onChange={() => onToggle(row.id)}
        />
      ),
    },
  ];
}

export function CommandShelf() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filteredCommands = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return commandItems;
    }

    return commandItems.filter((item) =>
      `${item.title} ${item.description} ${item.group}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <DataPanel
      action={
        <>
          <ComponentIdBadge id="CMD-01" />
          <StatusSignal color="var(--ds-gray-1000)" variant="pill">palette</StatusSignal>
        </>
      }
      componentId="CMD-01"
      contentClassName="grid gap-3 p-3 xl:grid-cols-[1fr_360px]"
      eyebrow="Command menu"
      id="cmd-01-command-menu"
      summary="A searchable command surface for navigation, records, and runtime actions."
      title="Command palette pattern"
    >
        <div className="rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] p-3">
          <SearchFilterHeader
            onQueryChange={setQuery}
            placeholder="Search commands, jobs, adapters..."
            query={query}
          >
            <kbd className="rounded-[4px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ds-gray-700)]">
              CMD K
            </kbd>
          </SearchFilterHeader>
          <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)]">
            <RecordTable
              columns={commandColumns}
              getRowId={(item) => item.id}
              minWidth={620}
              rows={filteredCommands}
            />
          </div>
        </div>

        <RecordCard
          action={<ComponentIdBadge id="CMD-02" />}
          componentId="CMD-02"
          description={
            <>
              Same data, overlay mode. Good for app-wide actions without adding
              a permanent side panel.
            </>
          }
          title="Modal command launcher"
        >
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <Button icon={Command} type="button" variant="primary">
                Open command menu
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35" />
              <Dialog.Content className="depth-surface fixed left-1/2 top-[18vh] z-50 w-[min(620px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
                <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] px-4 py-3">
                  <Dialog.Title className="text-[15px] font-semibold">
                    Command menu
                  </Dialog.Title>
                  <Dialog.Close className="rounded-[5px] p-1 hover:bg-[var(--ds-gray-100)]">
                    <X aria-hidden="true" className="h-4 w-4" />
                  </Dialog.Close>
                </div>
                <div className="p-3">
                  <div className="flex h-10 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] px-3">
                    <Search aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
                    <input
                      className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[var(--ds-gray-700)]"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Type to filter..."
                      value={query}
                    />
                  </div>
                  <div className="mt-3 overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)]">
                    <RecordTable
                      columns={commandColumns}
                      getRowId={(item) => item.id}
                      minWidth={620}
                      rows={filteredCommands.slice(0, 4)}
                    />
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </RecordCard>
    </DataPanel>
  );
}

export function StateShelf() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {stateRows.map((state) => (
        <StateBlock
          action={state.action}
          color={state.color}
          componentId={state.id}
          description={state.description}
          icon={state.icon}
          key={state.id}
          loading={state.id === "STATE-02"}
          title={state.title}
        >
          <ComponentIdBadge id={state.id} />
        </StateBlock>
      ))}
    </div>
  );
}

export function AuthShellShelf() {
  return (
    <Surface
      className="overflow-hidden"
      data-component-id="AUTH-01"
      id="auth-01-shell"
      tone="flat"
    >
      <div className="grid lg:grid-cols-[360px_1fr]">
        <aside className="border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3">
            <ComponentIdBadge id="AUTH-01" />
            <SignalPill color="var(--ds-green-700)">session ready</SignalPill>
          </div>
          <div className="mt-8 grid h-12 w-12 place-items-center rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[15px] font-semibold">
            BS
          </div>
          <h3 className="mt-4 text-[24px] font-semibold leading-7">
            Auth shell with role context.
          </h3>
          <p className="mt-2 text-[13px] leading-5 text-[var(--ds-gray-900)]">
            The shell can become sign-in, invite, two-factor, or permission review
            without changing the surrounding layout.
          </p>
          <div className="mt-5 grid gap-2">
            {[
              ["Owner", "Full workspace controls", "var(--ds-gray-1000)"],
              ["Operator", "Jobs, streams, and tables", "var(--ds-blue-700)"],
              ["Viewer", "Read-only observability", "var(--ds-purple-700)"],
            ].map(([label, detail, color]) => (
              <div
                className="rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3"
                key={label}
              >
                <p className="flex items-center gap-2 text-[13px] font-semibold">
                  <StatusDot color={color} />
                  {label}
                </p>
                <p className="mt-1 text-[12px] text-[var(--ds-gray-800)]">{detail}</p>
              </div>
            ))}
          </div>
        </aside>
        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Email">
              <input className={inputClass} placeholder="team@example.com" type="email" />
            </Field>
            <Field label="Workspace">
              <input className={inputClass} placeholder="base-system" />
            </Field>
            <Field label="Password">
              <input className={inputClass} placeholder="Password" type="password" />
            </Field>
            <Field label="Access mode">
              <select className={inputClass} defaultValue="operator">
                <option value="owner">Owner</option>
                <option value="operator">Operator</option>
                <option value="viewer">Viewer</option>
              </select>
            </Field>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button icon={LockKeyhole} type="button" variant="primary">
              Continue
            </Button>
            <Button icon={KeyRound} type="button" variant="secondary">
              Use passkey
            </Button>
            <SignalPill color="var(--ds-blue-700)">2FA slot</SignalPill>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <SocialAuthButton icon={<GoogleLogo />} provider="Google" />
            <SocialAuthButton icon={<AppleLogo />} provider="Apple" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <MetricTile color="var(--ds-green-700)" icon={<ShieldCheck />} label="Trust" value="98%" />
            <MetricTile color="var(--ds-blue-700)" icon={<UserRound />} label="Users" value="24" />
            <MetricTile color="var(--ds-amber-700)" icon={<BellRing />} label="Alerts" value="03" />
          </div>
        </div>
      </div>
    </Surface>
  );
}

function SocialAuthButton({
  icon,
  provider,
}: {
  icon: ReactNode;
  provider: "Apple" | "Google";
}) {
  return (
    <button
      className="inline-flex h-10 items-center justify-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3 text-[13px] font-medium text-[var(--ds-gray-1000)] outline-none transition hover:border-[var(--ds-gray-alpha-500)] hover:bg-[var(--ds-gray-100)] focus-visible:shadow-[var(--ds-focus-ring)]"
      type="button"
    >
      <span className="grid h-5 w-5 place-items-center [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </span>
      Sign in with {provider}
    </button>
  );
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M17.05 12.02c-.02-2.2 1.8-3.25 1.88-3.3-1.03-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.79-3.32.79-.69 0-1.75-.77-2.88-.75-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.1 8.79.73 1.06 1.6 2.25 2.75 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.28-.87-2.3-3.56ZM14.86 5.58c.6-.73 1.01-1.75.9-2.76-.87.04-1.93.58-2.56 1.31-.56.65-1.06 1.69-.92 2.68.97.08 1.97-.49 2.58-1.23Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function JobMonitorShelf() {
  const [selectedJob, setSelectedJob] = useState(jobRows[0].id);

  return (
    <DataPanel
      action={
        <>
          <ComponentIdBadge id="JOB-01" />
          <StatusSignal color="var(--ds-green-700)" variant="pill">4 monitored</StatusSignal>
        </>
      }
      componentId="JOB-01"
      contentClassName="grid gap-3 p-3 xl:grid-cols-[1fr_340px]"
      eyebrow="Job monitor"
      id="job-01-monitor"
      summary="Scheduled pull jobs, retry windows, and queue-like records in one compact board."
      title="Worker and sync monitor"
    >
        <div className="overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)]">
          <RecordTable
            columns={jobColumns}
            getRowId={(job) => job.id}
            minWidth={720}
            onRowClick={(job) => setSelectedJob(job.id)}
            rowClassName={(job) =>
              selectedJob === job.id ? "bg-[var(--ds-background-200)]" : undefined
            }
            rows={jobRows}
          />
        </div>
        <RecordCard
          action={<ComponentIdBadge id="JOB-02" />}
          componentId="JOB-02"
          description={
            <>
              Selected: {selectedJob}. This card can become logs, retries, or
              manual trigger controls.
            </>
          }
          title="Runner detail"
        >
          <div className="grid gap-2">
            {[
              ["Last run", "2026-05-24 09:32"],
              ["Retry policy", "3 attempts / 15 min"],
              ["Cursor", "page_84 / stable"],
            ].map(([label, value]) => (
              <div
                className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2"
                key={label}
              >
                <span className="text-[12px] text-[var(--ds-gray-700)]">{label}</span>
                <span className="font-mono text-[12px]">{value}</span>
              </div>
            ))}
          </div>
          <Button className="mt-4" icon={Play} size="sm" type="button" variant="primary">
            Run now
          </Button>
        </RecordCard>
    </DataPanel>
  );
}

export function RealtimeShelf() {
  const [live, setLive] = useState(true);

  return (
    <DataPanel
      action={
        <>
          <ComponentIdBadge id="RT-01" />
          <StatusSignal color={live ? "var(--ds-green-700)" : "var(--ds-gray-700)"} variant="pill">
            {live ? "live" : "paused"}
          </StatusSignal>
        </>
      }
      componentId="RT-01"
      contentClassName="grid gap-3 p-3 xl:grid-cols-[1fr_340px]"
      eyebrow="Realtime stream"
      id="rt-01-realtime-stream"
      summary="A neutral event stream for SSE, WebSocket, broadcast channel, or local preview feeds."
      title="Realtime event surface"
    >
        <div className="overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)]">
          <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
            <span className="flex items-center gap-2 text-[13px] font-semibold">
              <Radio aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
              Event feed
            </span>
            <Button
              icon={live ? CircleDashed : Zap}
              onClick={() => setLive((value) => !value)}
              size="sm"
              type="button"
              variant="secondary"
            >
              {live ? "Pause" : "Resume"}
            </Button>
          </div>
          <RecordTable
            columns={getStreamColumns(live)}
            fit
            getRowId={(row) => row.id}
            rows={streamRows}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <MetricTile color="var(--ds-green-700)" icon={<Gauge />} label="Uptime" value="99.9%" />
          <MetricTile color="var(--ds-blue-700)" icon={<Database />} label="Events" value="18.4k" />
          <MetricTile color="var(--ds-amber-700)" icon={<Clock3 />} label="Lag" value="241ms" />
        </div>
    </DataPanel>
  );
}

export function SettingsShelf() {
  const [settings, setSettings] = useState<SettingsState>({
    audit: true,
    compact: true,
    preview: false,
    realtime: true,
  });
  const settingColumns = getSettingColumns({
    onToggle: (id) => setSettings((value) => ({ ...value, [id]: !value[id] })),
    settings,
  });

  return (
    <div className="grid gap-3 xl:grid-cols-[1fr_380px]">
      <DataPanel
        action={<ComponentIdBadge id="SET-01" />}
        componentId="SET-01"
        eyebrow="Settings"
        id="set-01-settings-panel"
        summary="Compact settings surface with toggle rows, segmented choices, and future env-aware config."
        title="Workspace settings"
      >
        <RecordTable
          columns={settingColumns}
          getRowId={(row) => row.id}
          minWidth={720}
          rows={settingRows}
        />
      </DataPanel>

      <RecordCard
        action={
            <div className="flex items-center gap-2">
              <ComponentIdBadge id="SET-02" />
              <Settings aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
            </div>
        }
        componentId="SET-02"
        description={
          <>
            This compact summary can later bind to env files, feature flags,
            remote config, or organization policy.
          </>
        }
        title="Config summary"
      >
        <div className="grid gap-2">
          {Object.entries(settings).map(([key, value], index) => (
            <div
              className="flex items-center justify-between rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2"
              key={key}
            >
              <span className="flex items-center gap-2 text-[13px] font-medium capitalize">
                <StatusSignal color={listColors[index % listColors.length]} variant="dot" />
                {key}
              </span>
              <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {value ? "on" : "off"}
              </span>
            </div>
          ))}
        </div>
      </RecordCard>
    </div>
  );
}

function MetricTile({
  color,
  icon,
  label,
  value,
}: {
  color: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] text-[var(--ds-gray-800)] [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
        <StatusSignal color={color} variant="dot" />
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
        {label}
      </p>
      <p className="mt-1 text-[22px] font-semibold leading-7">{value}</p>
    </div>
  );
}

function Field({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-medium text-[var(--ds-gray-900)]">{label}</span>
      {children}
    </label>
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

function SignalPill({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <StatusSignal color={color} variant="pill">
      {children}
    </StatusSignal>
  );
}

function StatusDot({ className, color }: { className?: string; color: string }) {
  return <StatusSignal className={className} color={color} variant="dot" />;
}

const inputClass =
  "h-9 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 text-[13px] text-[var(--ds-gray-1000)] outline-none transition placeholder:text-[var(--ds-gray-700)] focus:shadow-[var(--ds-focus-ring)]";

const listColors = [
  "var(--ds-green-700)",
  "var(--ds-blue-700)",
  "var(--ds-gray-1000)",
  "var(--ds-amber-700)",
] as const;
