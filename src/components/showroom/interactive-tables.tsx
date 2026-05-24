"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { componentRows, type ComponentRow } from "@/data/showroom";
import { programRows, type ProgramRow } from "@/data/leadership";

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
      <DotLabel
        color={row.state === "Ready" ? "var(--ds-green-700)" : row.state === "Review" ? "var(--ds-amber-700)" : "var(--ds-gray-1000)"}
      >
        {row.state}
      </DotLabel>
    ),
  },
  {
    header: "Density",
    key: "density",
    render: (row) => <span className="font-mono text-[12px]">{row.density}</span>,
  },
  { header: "Usage", key: "usage" },
];

const programColumns: InteractiveColumn<ProgramRow>[] = [
  {
    header: "Modül",
    key: "module",
    render: (row) => (
      <div>
        <p className="font-medium">{row.module}</p>
        <p className="font-mono text-[11px] text-[var(--ds-gray-700)]">{row.id}</p>
      </div>
    ),
  },
  { header: "Kitle", key: "cohort" },
  { header: "Lider", key: "lead" },
  {
    header: "Risk",
    key: "risk",
    render: (row) => (
      <DotLabel color={row.risk === "Yüksek" ? "var(--ds-pink-700)" : row.risk === "Orta" ? "var(--ds-amber-700)" : "var(--ds-green-700)"}>
        {row.risk}
      </DotLabel>
    ),
  },
  {
    align: "right",
    header: "Hazırlık",
    key: "readiness",
    render: (row) => <Readiness value={row.readiness} />,
    sortValue: (row) => row.readiness,
  },
  {
    header: "Durum",
    key: "status",
    render: (row) => (
      <DotLabel color={row.status === "Aktif" ? "var(--ds-blue-700)" : row.status === "Tamam" ? "var(--ds-green-700)" : "var(--ds-gray-1000)"}>
        {row.status}
      </DotLabel>
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
      searchPlaceholder="Component, owner, usage ara"
    />
  );
}

export function ProgramOperationTable() {
  return (
    <InteractiveTable
      columns={programColumns}
      defaultSort={{ direction: "desc", key: "readiness" }}
      filterKey="status"
      filterLabel="Durum"
      rows={programRows.slice(0, 10)}
      searchPlaceholder="Modül, kitle, lider ara"
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
        a.localeCompare(b, "tr"),
      ),
    [filterKey, rows],
  );

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("tr");
    const sortedRows = [...rows]
      .filter((row) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          Object.values(row).join(" ").toLocaleLowerCase("tr").includes(normalizedQuery);
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
          ? String(aValue).localeCompare(String(bValue), "tr")
          : String(bValue).localeCompare(String(aValue), "tr");
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
      <div className="flex flex-col gap-3 border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex h-9 min-w-0 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 text-[13px] text-[var(--ds-gray-700)] xl:w-[310px]">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[var(--ds-gray-1000)] outline-none placeholder:text-[var(--ds-gray-700)]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            type="search"
            value={query}
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            {filterLabel}
          </span>
          {filterOptions.map((option) => {
            const active = selectedFilters.includes(option);

            return (
              <button
                className={cn(
                  "h-7 rounded-[6px] border px-2 text-[12px] font-medium transition",
                  active
                    ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
                    : "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)]",
                )}
                key={option}
                onClick={() => toggleFilter(option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

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
    <div className="ml-auto flex w-[104px] items-center justify-end gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-[var(--ds-gray-alpha-300)]">
        <div
          className="h-full rounded-full bg-[var(--ds-gray-1000)]"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 font-mono text-[11px] text-[var(--ds-gray-900)]">
        {value}%
      </span>
    </div>
  );
}

function DotLabel({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--ds-gray-1000)]">
      <span
        className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-500)]"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}
