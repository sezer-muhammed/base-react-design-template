import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type RecursiveMenuItem = {
  children?: RecursiveMenuItem[];
  label: string;
  meta?: ReactNode;
  status?: "active" | "draft" | "ready";
};

const statusColor = {
  active: "var(--ds-blue-700)",
  draft: "var(--ds-gray-1000)",
  ready: "var(--ds-green-700)",
} as const;

export function RecursiveMenu({
  className,
  items,
}: {
  className?: string;
  items: RecursiveMenuItem[];
}) {
  return (
    <ul className={cn("divide-y divide-[var(--ds-gray-alpha-300)]", className)}>
      {items.map((item) => (
        <RecursiveMenuNode item={item} key={item.label} level={0} />
      ))}
    </ul>
  );
}

function RecursiveMenuNode({
  item,
  level,
}: {
  item: RecursiveMenuItem;
  level: number;
}) {
  const hasChildren = Boolean(item.children?.length);

  return (
    <li>
      <div
        className={cn(
          "grid min-h-10 grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 hover:bg-[var(--ds-gray-100)]",
          level > 0 && "relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-[var(--ds-gray-alpha-300)]",
        )}
        style={{ paddingLeft: `${12 + level * 10}px` }}
      >
        <div className="flex min-w-0 items-center gap-2">
          {hasChildren ? (
            <ChevronRight
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 text-[var(--ds-gray-700)]"
            />
          ) : (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-gray-alpha-600)]" />
          )}
          <span className="truncate text-[13px] font-medium text-[var(--ds-gray-1000)]">
            {item.label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.meta ? (
            <span className="hidden font-mono text-[11px] text-[var(--ds-gray-700)] sm:inline">
              {item.meta}
            </span>
          ) : null}
          {item.status ? (
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-[var(--ds-gray-1000)]">
              <span
                className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-500)]"
                style={{ background: statusColor[item.status] }}
              />
              {item.status}
            </span>
          ) : null}
        </div>
      </div>
      {hasChildren ? (
        <ul className="ml-5 border-l border-t border-[var(--ds-gray-alpha-300)]">
          {item.children?.map((child) => (
            <RecursiveMenuNode item={child} key={child.label} level={level + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
