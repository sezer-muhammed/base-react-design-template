"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
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
