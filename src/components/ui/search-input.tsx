"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/** Compact search box: icon-left, submit-button-right, focus ring.
 *
 * Transport-agnostic. Use uncontrolled (`defaultValue` + `onSubmit`) for a
 * search-and-navigate box, or controlled (`value` + `onChange`) to drive a
 * live filter. `onSubmit` fires on Enter / submit-button click.
 */
export function SearchInput({
  className,
  defaultValue = "",
  onChange,
  onSubmit,
  placeholder = "Search...",
  value,
}: {
  className?: string;
  defaultValue?: string;
  onChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
  placeholder?: string;
  value?: string;
}) {
  const [internal, setInternal] = useState(defaultValue);
  const controlled = value !== undefined;
  const query = controlled ? value : internal;

  function update(next: string) {
    if (!controlled) {
      setInternal(next);
    }
    onChange?.(next);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSubmit?.(query.trim());
  }

  return (
    <form className={cn("relative w-full max-w-md", className)} onSubmit={handleSubmit}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ds-gray-700)]" />
        <input
          className="h-10 w-full rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] pl-9 pr-11 text-[13px] text-[var(--ds-gray-1000)] outline-none transition placeholder:text-[var(--ds-gray-700)] focus-visible:shadow-[var(--ds-focus-ring)]"
          onChange={(event) => update(event.target.value)}
          placeholder={placeholder}
          type="text"
          value={query}
        />
        <button
          className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-[6px] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)] transition hover:opacity-90"
          type="submit"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}
