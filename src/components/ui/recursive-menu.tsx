"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type RecursiveMenuItem = {
  children?: RecursiveMenuItem[];
  href?: string;
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
  const [isOpen, setIsOpen] = useState(level === 0);

  const indicator = hasChildren ? (
    <button
      aria-expanded={isOpen}
      aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
      className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-[6px] text-[var(--ds-gray-700)] transition hover:bg-[var(--ds-gray-alpha-200)] focus-visible:shadow-[var(--ds-focus-ring)]"
      onClick={() => setIsOpen((current) => !current)}
      type="button"
    >
      <ChevronRight
        aria-hidden="true"
        className={cn(
          "h-3.5 w-3.5 transition duration-150",
          isOpen && "rotate-90",
        )}
      />
    </button>
  ) : (
    <span className="grid h-6 w-6 shrink-0 place-items-center">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ds-gray-alpha-600)]" />
    </span>
  );

  const label = item.href ? (
    <a
      className="min-w-0 truncate rounded-[5px] text-[13px] font-medium text-[var(--ds-gray-1000)] outline-none focus-visible:shadow-[var(--ds-focus-ring)]"
      href={item.href}
    >
      {item.label}
    </a>
  ) : (
    <span className="min-w-0 truncate text-[13px] font-medium text-[var(--ds-gray-1000)]">
      {item.label}
    </span>
  );

  return (
    <li>
      <div
        className={cn(
          "grid min-h-10 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 hover:bg-[var(--ds-gray-100)]",
          level > 0 && "relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-[var(--ds-gray-alpha-300)]",
        )}
        style={{ paddingLeft: `${8 + level * 10}px` }}
      >
        {indicator}
        {label}
        <div className="grid shrink-0 grid-cols-[74px_76px] items-center gap-2">
          {item.meta ? (
            <span className="hidden justify-self-end font-mono text-[11px] text-[var(--ds-gray-700)] sm:inline">
              {item.meta}
            </span>
          ) : (
            <span className="hidden sm:inline" />
          )}
          {item.status ? (
            <span className="inline-grid w-[76px] grid-cols-[10px_1fr] items-center gap-2 text-[12px] font-medium text-[var(--ds-gray-1000)]">
              <span
                className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-500)]"
                style={{ background: statusColor[item.status] }}
              />
              <span>{item.status}</span>
            </span>
          ) : (
            <span />
          )}
        </div>
      </div>
      {hasChildren && isOpen ? (
        <ul className="ml-5 border-l border-t border-[var(--ds-gray-alpha-300)]">
          {item.children?.map((child) => (
            <RecursiveMenuNode item={child} key={child.label} level={level + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
