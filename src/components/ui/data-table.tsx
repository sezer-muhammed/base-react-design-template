"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TableColumn<T> = {
  align?: "left" | "right";
  className?: string;
  header: string;
  key: string;
  render: (row: T) => ReactNode;
};

export function DataTable<T extends { id: string }>({
  cellHeight = "h-11",
  className,
  columns,
  onRowClick,
  rows,
}: {
  /** Tailwind height class for body cells — bump for roomier rows. */
  cellHeight?: string;
  className?: string;
  columns: TableColumn<T>[];
  /** Makes whole rows clickable; cells with interactive content should
      stopPropagation on their own clicks. */
  onRowClick?: (row: T) => void;
  rows: T[];
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-100)]">
            {columns.map((column) => (
              <th
                className={cn(
                  "h-9 px-3 font-mono text-[11px] font-medium uppercase tracking-normal text-[var(--ds-gray-700)]",
                  column.align === "right" && "text-right",
                  column.className,
                )}
                key={column.key}
                scope="col"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              className={cn(
                "border-b border-[var(--ds-gray-alpha-300)] last:border-b-0 hover:bg-[var(--ds-gray-100)]",
                onRowClick && "cursor-pointer",
              )}
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
            >
              {columns.map((column) => (
                <td
                  className={cn(
                    cellHeight,
                    "px-3 text-[var(--ds-gray-1000)]",
                    column.align === "right" && "text-right tabular-nums",
                    column.className,
                  )}
                  key={column.key}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
