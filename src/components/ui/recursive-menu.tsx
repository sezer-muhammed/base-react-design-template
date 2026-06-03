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
  const dotColor = item.status ? statusColor[item.status] : "var(--ds-gray-alpha-600)";

  const indicator = hasChildren ? (
    <button
      aria-expanded={isOpen}
      aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
      className="relative z-10 grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-[6px] text-[var(--ds-gray-700)] transition hover:bg-[var(--ds-gray-alpha-200)] focus-visible:shadow-[var(--ds-focus-ring)]"
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
    <span className="h-7 w-7 shrink-0" />
  );

  return (
    <li>
      <div
        className={cn(
          "group relative grid min-h-10 grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-2 px-3 py-2 transition hover:bg-[var(--ds-gray-100)]",
          item.href && "cursor-pointer",
          level > 0 && "relative before:absolute before:left-0 before:top-1/2 before:h-px before:w-3 before:bg-[var(--ds-gray-alpha-300)]",
        )}
        style={{ paddingLeft: `${8 + level * 10}px` }}
      >
        {item.href ? (
          <a
            aria-label={item.label}
            className="absolute inset-0 rounded-[6px] outline-none focus-visible:shadow-[var(--ds-focus-ring)]"
            href={item.href}
          />
        ) : null}
        {indicator}
        <span
          className="relative z-[1] h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--ds-gray-alpha-500)]"
          style={{ background: dotColor }}
        />
        <span className="pointer-events-none relative z-[1] min-w-0 truncate text-[13px] font-medium text-[var(--ds-gray-1000)]">
          {item.label}
        </span>
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
