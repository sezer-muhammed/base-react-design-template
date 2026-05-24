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
  className,
  columns,
  rows,
}: {
  className?: string;
  columns: TableColumn<T>[];
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
              className="border-b border-[var(--ds-gray-alpha-300)] last:border-b-0 hover:bg-[var(--ds-gray-100)]"
              key={row.id}
            >
              {columns.map((column) => (
                <td
                  className={cn(
                    "h-11 px-3 text-[var(--ds-gray-1000)]",
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
