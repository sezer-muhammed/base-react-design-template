"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Inbox, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataPanel } from "@/components/ui/data-panel";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { DefaultDialogFooter, DialogFrame } from "@/components/ui/overlay-frame";
import { ProgressCell } from "@/components/ui/progress-cell";
import { RecordCard } from "@/components/ui/record-card";
import { FilterButton, SearchFilterHeader } from "@/components/ui/search-filter-header";
import { StateBlock } from "@/components/ui/state-block";
import { StatusSignal } from "@/components/ui/status-signal";
import { Surface } from "@/components/ui/surface";
import { ToggleCell } from "@/components/ui/toggle-cell";

const consoleRows = [
  {
    id: "flow-intake",
    flow: "Intake router",
    kind: "Push",
    owner: "Platform",
    status: "Live",
    color: "var(--ds-blue-700)",
    load: 82,
  },
  {
    id: "flow-sync",
    flow: "Source sync",
    kind: "Pull",
    owner: "Data",
    status: "Queued",
    color: "var(--ds-amber-700)",
    load: 48,
  },
  {
    id: "flow-review",
    flow: "Review gate",
    kind: "Human",
    owner: "Ops",
    status: "Ready",
    color: "var(--ds-green-700)",
    load: 64,
  },
  {
    id: "flow-stream",
    flow: "Live stream",
    kind: "Realtime",
    owner: "Runtime",
    status: "Live",
    color: "var(--ds-purple-700)",
    load: 91,
  },
] as const;

type ConsoleRow = (typeof consoleRows)[number];

const consoleColumns: TableColumn<ConsoleRow>[] = [
  {
    header: "Flow",
    key: "flow",
    render: (row) => (
      <span className="flex min-w-0 items-center gap-2 font-semibold">
        <StatusSignal color={row.color} variant="dot" />
        <span className="truncate">{row.flow}</span>
      </span>
    ),
  },
  {
    header: "Kind",
    key: "kind",
    render: (row) => row.kind,
  },
  {
    header: "Owner",
    key: "owner",
    render: (row) => row.owner,
  },
  {
    header: "Load",
    key: "load",
    render: (row) => <ProgressCell color="var(--ds-gray-1000)" showValue value={row.load} />,
  },
  {
    className: "w-[108px]",
    header: "Status",
    key: "status",
    render: (row) => (
      <StatusSignal color={row.color} variant="pill">
        {row.status}
      </StatusSignal>
    ),
  },
];

export function ProofSection() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("All");
  const [liveMode, setLiveMode] = useState(true);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return consoleRows.filter((row) => {
      const matchesKind = kind === "All" || row.kind === kind;
      const matchesQuery =
        !normalizedQuery ||
        [row.flow, row.kind, row.owner, row.status].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );

      return matchesKind && matchesQuery;
    });
  }, [kind, query]);

  return (
    <section className="scroll-mt-24 reveal" id="proof">
      <DataPanel
        action={<StatusSignal color="var(--ds-blue-700)" variant="pill">site proof</StatusSignal>}
        eyebrow="Component proof"
        summary="Showroom primitives are used here as a real product console: search, filters, toggles, cards, state blocks, modal frame, and table composition."
        title="The site uses the system it documents."
      >
        <div className="grid gap-3 p-3 xl:grid-cols-[1fr_380px]">
          <Surface className="overflow-hidden" tone="flat">
            <SearchFilterHeader
              onQueryChange={setQuery}
              placeholder="Search flows, owners, or status"
              query={query}
            >
              {["All", "Push", "Pull", "Realtime", "Human"].map((option) => (
                <FilterButton
                  active={kind === option}
                  key={option}
                  onClick={() => setKind(option)}
                >
                  {option}
                </FilterButton>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[12px] font-medium text-[var(--ds-gray-900)]">
                  Live
                </span>
                <ToggleCell checked={liveMode} onChange={() => setLiveMode((value) => !value)} />
              </div>
            </SearchFilterHeader>
            <DataTable columns={consoleColumns} rows={filteredRows} />
          </Surface>

          <div className="grid gap-3">
            <RecordCard
              action={<Badge tone="gray">{filteredRows.length} visible</Badge>}
              componentId="SITE-RECORD"
              description="A reusable record container for dense product summaries."
              eyebrow={<StatusSignal color="var(--ds-green-700)" variant="pill">record</StatusSignal>}
              footer={
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                    source: local preview
                  </span>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <Button size="sm" type="button" variant="secondary">
                        Open modal
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35" />
                      <DialogFrame
                        description="This modal uses the same neutral overlay frame from the showroom, now attached to the real website flow."
                        footer={<DefaultDialogFooter />}
                        title="Runtime action"
                      />
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              }
              title="Runtime control card"
            >
              <div className="grid gap-2">
                {["Webhook intake", "Pull scheduler", "Realtime channel"].map((item, index) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-3 py-2"
                    key={item}
                  >
                    <span className="truncate text-[13px] font-medium">{item}</span>
                    <StatusSignal
                      color={index === 1 ? "var(--ds-amber-700)" : "var(--ds-green-700)"}
                      variant="dot"
                    />
                  </div>
                ))}
              </div>
            </RecordCard>

            <StateBlock
              action={liveMode ? "Monitoring" : "Paused"}
              color={liveMode ? "var(--ds-blue-700)" : "var(--ds-amber-700)"}
              componentId="SITE-STATE"
              description="A state primitive can carry loading, empty, paused, and error moments without changing the page language."
              icon={liveMode ? Loader2 : Inbox}
              loading={liveMode}
              title={liveMode ? "Live preview running" : "Preview paused"}
            >
              <Badge tone="gray">StateBlock</Badge>
            </StateBlock>
          </div>
        </div>
      </DataPanel>
    </section>
  );
}
