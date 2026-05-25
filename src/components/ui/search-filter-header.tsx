"use client";

import type { ReactNode } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

export function SearchFilterHeader({
  children,
  onQueryChange,
  placeholder,
  query,
}: {
  children?: ReactNode;
  onQueryChange: (query: string) => void;
  placeholder: string;
  query: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 xl:flex-row xl:items-center xl:justify-between">
      <label className="flex h-9 min-w-0 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 text-[13px] text-[var(--ds-gray-700)] xl:w-[310px]">
        <Search aria-hidden="true" className="h-4 w-4 shrink-0" />
        <input
          className="min-w-0 flex-1 bg-transparent text-[var(--ds-gray-1000)] outline-none placeholder:text-[var(--ds-gray-700)]"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={query}
        />
      </label>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function FilterButton({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "h-7 rounded-[6px] border px-2 text-[12px] font-medium transition",
        active
          ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
          : "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)]",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
