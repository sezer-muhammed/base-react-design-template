"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react";
import { ProgressCell } from "@/components/ui/progress-cell";
import { FilterButton, SearchFilterHeader } from "@/components/ui/search-filter-header";
import { StatusSignal } from "@/components/ui/status-signal";
import { cn } from "@/lib/cn";
import { componentRows, type ComponentRow } from "@/data/showroom";
import { operationRows, type OperationRow } from "@/data/operations";

type SortDirection = "asc" | "desc";
type SortState<T> = {
  direction: SortDirection;
  key: keyof T;
};

type InteractiveColumn<T> = {
  align?: "left" | "right";
  className?: string;
  header: string;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => number | string;
};

type HierarchyRank = "domain" | "group" | "module" | "endpoint";

type HierarchyRow = {
  childCount: number;
  depth: number;
  hasChildren: boolean;
  id: string;
  label: string;
  parent: string;
  rank: HierarchyRank;
  status: "Active" | "Ready" | "Review";
};

const hierarchyData = [
  {
    name: "Runtime",
    groups: [
      {
        name: "Events",
        modules: [
          { name: "Webhook Intake", endpoints: ["POST /events", "GET /events/:id"] },
          { name: "Realtime Stream", endpoints: ["GET /stream", "POST /broadcast"] },
        ],
      },
      {
        name: "Jobs",
        modules: [
          { name: "Pull Sync", endpoints: ["POST /jobs/sync", "GET /jobs/:id"] },
        ],
      },
    ],
  },
  {
    name: "Interface",
    groups: [
      {
        name: "Components",
        modules: [
          { name: "Showroom", endpoints: ["GET /showroom", "GET /showroom#tables"] },
          { name: "Navigation", endpoints: ["GET /navigation"] },
        ],
      },
    ],
  },
  {
    name: "Adapters",
    groups: [
      {
        name: "Transport",
        modules: [
          { name: "HTTP", endpoints: ["GET /health", "POST /proxy"] },
          { name: "TCP / UDP", endpoints: ["CONNECT /socket"] },
        ],
      },
    ],
  },
] as const;

const hierarchyRankColor: Record<HierarchyRank, string> = {
  domain: "var(--ds-gray-1000)",
  endpoint: "var(--ds-amber-700)",
  group: "var(--ds-blue-700)",
  module: "var(--ds-green-700)",
};

const allHierarchyExpandableIds = hierarchyData.flatMap((domain) => {
  const domainId = `domain:${domain.name}`;
  return [
    domainId,
    ...domain.groups.flatMap((group) => {
      const groupId = `${domainId}/group:${group.name}`;
      return [
        groupId,
        ...group.modules.map((module) => `${groupId}/module:${module.name}`),
      ];
    }),
  ];
});

const componentColumns: InteractiveColumn<ComponentRow>[] = [
  {
    header: "Component",
    key: "component",
    render: (row) => (
      <div>
        <p className="font-medium">{row.component}</p>
        <p className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</p>
      </div>
    ),
  },
  { header: "Owner", key: "owner" },
  {
    header: "State",
    key: "state",
    render: (row) => (
      <StatusSignal
        color={row.state === "Ready" ? "var(--ds-green-700)" : row.state === "Review" ? "var(--ds-amber-700)" : "var(--ds-gray-1000)"}
        variant="cell"
      >
        {row.state}
      </StatusSignal>
    ),
  },
  {
    header: "Density",
    key: "density",
    render: (row) => <span className="font-mono text-[12px]">{row.density}</span>,
  },
  { header: "Usage", key: "usage" },
];

const operationColumns: InteractiveColumn<OperationRow>[] = [
  {
    header: "Module",
    key: "module",
    render: (row) => (
      <div>
        <p className="font-medium">{row.module}</p>
        <p className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</p>
      </div>
    ),
  },
  { header: "Audience", key: "cohort" },
  { header: "Lead", key: "lead" },
  {
    header: "Risk",
    key: "risk",
    render: (row) => (
      <StatusSignal color={row.risk === "High" ? "var(--ds-pink-700)" : row.risk === "Medium" ? "var(--ds-amber-700)" : "var(--ds-green-700)"} variant="cell">
        {row.risk}
      </StatusSignal>
    ),
  },
  {
    align: "right",
    header: "Readiness",
    key: "readiness",
    render: (row) => <Readiness value={row.readiness} />,
    sortValue: (row) => row.readiness,
  },
  {
    header: "Status",
    key: "status",
    render: (row) => (
      <StatusSignal color={row.status === "Active" ? "var(--ds-blue-700)" : row.status === "Done" ? "var(--ds-green-700)" : "var(--ds-gray-1000)"} variant="cell">
        {row.status}
      </StatusSignal>
    ),
  },
];

export function ComponentInventoryTable() {
  return (
    <InteractiveTable
      columns={componentColumns}
      defaultSort={{ direction: "asc", key: "component" }}
      filterKey="state"
      filterLabel="State"
      rows={componentRows}
      searchPlaceholder="Search component, owner, usage"
    />
  );
}

export function OperationTable() {
  return (
    <InteractiveTable
      columns={operationColumns}
      defaultSort={{ direction: "desc", key: "readiness" }}
      filterKey="status"
      filterLabel="Status"
      rows={operationRows.slice(0, 10)}
      searchPlaceholder="Search module, audience, lead"
    />
  );
}

export function NestedHierarchyTable() {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(["domain:Runtime", "domain:Runtime/group:Events"]),
  );

  const rows = useMemo(() => {
    const nextRows: HierarchyRow[] = [];

    hierarchyData.forEach((domain) => {
      const domainId = `domain:${domain.name}`;
      const domainEndpointCount = domain.groups.reduce(
        (groupTotal, group) =>
          groupTotal + group.modules.reduce((moduleTotal, module) => moduleTotal + module.endpoints.length, 0),
        0,
      );

      nextRows.push({
        childCount: domainEndpointCount,
        depth: 0,
        hasChildren: true,
        id: domainId,
        label: domain.name,
        parent: "-",
        rank: "domain",
        status: "Active",
      });

      if (!expanded.has(domainId)) return;

      domain.groups.forEach((group) => {
        const groupId = `${domainId}/group:${group.name}`;
        const groupEndpointCount = group.modules.reduce((total, module) => total + module.endpoints.length, 0);

        nextRows.push({
          childCount: groupEndpointCount,
          depth: 1,
          hasChildren: true,
          id: groupId,
          label: group.name,
          parent: domain.name,
          rank: "group",
          status: "Ready",
        });

        if (!expanded.has(groupId)) return;

        group.modules.forEach((module) => {
          const moduleId = `${groupId}/module:${module.name}`;

          nextRows.push({
            childCount: module.endpoints.length,
            depth: 2,
            hasChildren: true,
            id: moduleId,
            label: module.name,
            parent: group.name,
            rank: "module",
            status: "Ready",
          });

          if (!expanded.has(moduleId)) return;

          module.endpoints.forEach((endpoint) => {
            nextRows.push({
              childCount: 0,
              depth: 3,
              hasChildren: false,
              id: `${moduleId}/endpoint:${endpoint}`,
              label: endpoint,
              parent: module.name,
              rank: "endpoint",
              status: "Review",
            });
          });
        });
      });
    });

    return nextRows;
  }, [expanded]);

  function toggle(row: HierarchyRow) {
    if (!row.hasChildren) return;
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(row.id)) {
        next.delete(row.id);
      } else {
        next.add(row.id);
      }
      return next;
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
        <div className="flex flex-wrap gap-2">
          <FilterButton
            active={expanded.size === allHierarchyExpandableIds.length}
            onClick={() => setExpanded(new Set(allHierarchyExpandableIds))}
          >
            Expand
          </FilterButton>
          <FilterButton active={expanded.size === 0} onClick={() => setExpanded(new Set())}>
            Collapse
          </FilterButton>
        </div>
        <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
          {rows.length} visible nodes
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]">
              <th className="h-9 px-3 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-700)]">Node</th>
              <th className="h-9 px-3 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-700)]">Rank</th>
              <th className="h-9 px-3 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-700)]">Parent</th>
              <th className="h-9 px-3 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-700)]">State</th>
              <th className="h-9 px-3 text-right font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-700)]">Leafs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isOpen = expanded.has(row.id);

              return (
                <tr
                  className="border-b border-[var(--ds-gray-alpha-300)] last:border-b-0 hover:bg-[var(--ds-gray-100)]"
                  key={row.id}
                >
                  <td className="h-10 px-3 text-[var(--ds-gray-1000)]">
                    <div className="flex min-w-0 items-center gap-2" style={{ paddingLeft: row.depth * 22 }}>
                      {row.hasChildren ? (
                        <button
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px] border border-[var(--ds-gray-alpha-300)] hover:bg-[var(--ds-background-200)]"
                          onClick={() => toggle(row)}
                          type="button"
                        >
                          {isOpen ? <ChevronDown aria-hidden="true" className="h-4 w-4" /> : <ChevronRight aria-hidden="true" className="h-4 w-4" />}
                        </button>
                      ) : (
                        <span className="grid h-7 w-7 shrink-0 place-items-center font-mono text-[10px] uppercase text-[var(--ds-gray-700)]">
                          ep
                        </span>
                      )}
                      <button
                        className="min-w-0 truncate text-left font-medium"
                        onClick={() => toggle(row)}
                        type="button"
                      >
                        {row.label}
                      </button>
                    </div>
                  </td>
                  <td className="h-10 px-3">
                    <StatusSignal color={hierarchyRankColor[row.rank]} variant="pill">
                      {row.rank}
                    </StatusSignal>
                  </td>
                  <td className="h-10 px-3 text-[var(--ds-gray-700)]">{row.parent}</td>
                  <td className="h-10 px-3">
                    <StatusSignal
                      color={row.status === "Ready" ? "var(--ds-green-700)" : row.status === "Review" ? "var(--ds-amber-700)" : "var(--ds-blue-700)"}
                      variant="cell"
                    >
                      {row.status}
                    </StatusSignal>
                  </td>
                  <td className="h-10 px-3 text-right tabular-nums">{row.childCount || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InteractiveTable<T extends { id: string }>({
  columns,
  defaultSort,
  filterKey,
  filterLabel,
  rows,
  searchPlaceholder,
}: {
  columns: InteractiveColumn<T>[];
  defaultSort: SortState<T>;
  filterKey: keyof T;
  filterLabel: string;
  rows: T[];
  searchPlaceholder: string;
}) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sort, setSort] = useState<SortState<T>>(defaultSort);

  const filterOptions = useMemo(
    () =>
      Array.from(new Set(rows.map((row) => String(row[filterKey])))).sort((a, b) =>
        a.localeCompare(b, "en"),
      ),
    [filterKey, rows],
  );

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("en");
    const sortedRows = [...rows]
      .filter((row) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          Object.values(row).join(" ").toLocaleLowerCase("en").includes(normalizedQuery);
        const matchesFilter =
          selectedFilters.length === 0 ||
          selectedFilters.includes(String(row[filterKey]));

        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => {
        const column = columns.find((item) => item.key === sort.key);
        const aValue = column?.sortValue ? column.sortValue(a) : a[sort.key];
        const bValue = column?.sortValue ? column.sortValue(b) : b[sort.key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
        }

        return sort.direction === "asc"
          ? String(aValue).localeCompare(String(bValue), "en")
          : String(bValue).localeCompare(String(aValue), "en");
      });

    return sortedRows;
  }, [columns, filterKey, query, rows, selectedFilters, sort]);

  function toggleFilter(option: string) {
    setSelectedFilters((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  function toggleSort(column: InteractiveColumn<T>) {
    setSort((current) => {
      if (current.key !== column.key) {
        return { direction: "asc", key: column.key };
      }

      return {
        direction: current.direction === "asc" ? "desc" : "asc",
        key: column.key,
      };
    });
  }

  return (
    <div>
      <SearchFilterHeader
        onQueryChange={setQuery}
        placeholder={searchPlaceholder}
        query={query}
      >
          <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            {filterLabel}
          </span>
          {filterOptions.map((option) => {
            const active = selectedFilters.includes(option);

            return (
              <FilterButton
                active={active}
                key={option}
                onClick={() => toggleFilter(option)}
              >
                {option}
              </FilterButton>
            );
          })}
      </SearchFilterHeader>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]">
              {columns.map((column) => {
                const active = sort.key === column.key;
                const SortIcon = active
                  ? sort.direction === "asc"
                    ? ArrowUp
                    : ArrowDown
                  : ChevronsUpDown;

                return (
                  <th
                    className={cn(
                      "h-9 px-3 font-mono text-[11px] font-medium uppercase tracking-normal text-[var(--ds-gray-700)]",
                      column.align === "right" && "text-right",
                      column.className,
                    )}
                    key={String(column.key)}
                    scope="col"
                  >
                    <button
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-[5px] py-1 outline-none hover:text-[var(--ds-gray-1000)] focus-visible:shadow-[var(--ds-focus-ring)]",
                        column.align === "right" && "ml-auto",
                      )}
                      onClick={() => toggleSort(column)}
                      type="button"
                    >
                      {column.header}
                      <SortIcon aria-hidden="true" className="h-3 w-3" />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                className="border-b border-[var(--ds-gray-alpha-300)] last:border-b-0 hover:bg-[var(--ds-gray-100)]"
                key={row.id}
              >
                {columns.map((column) => (
                  <td
                    className={cn(
                      "h-10",
                      "px-3 text-[var(--ds-gray-1000)]",
                      column.align === "right" && "text-right tabular-nums",
                      column.className,
                    )}
                    key={String(column.key)}
                  >
                    {column.render ? column.render(row) : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--ds-gray-alpha-300)] px-3 py-2 text-[12px] text-[var(--ds-gray-700)]">
        <span>
          {visibleRows.length} / {rows.length} visible
        </span>
        <span className="font-mono">
          sort: {String(sort.key)} {sort.direction}
        </span>
      </div>
    </div>
  );
}

function Readiness({ value }: { value: number }) {
  return (
    <ProgressCell
      className="ml-auto"
      color="var(--ds-gray-1000)"
      showValue
      value={value}
    />
  );
}
