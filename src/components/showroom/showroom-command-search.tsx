"use client";

import { Command, Search } from "lucide-react";
import { commandPaletteOpenEvent } from "@/config/events";

export function ShowroomCommandSearch() {
  return (
    <section className="px-3 sm:px-8 lg:px-12 2xl:px-20">
      <button
        aria-label="Open component search"
        className="depth-surface flex h-12 w-full cursor-pointer items-center gap-3 rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-4 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.86),0_12px_34px_-30px_rgb(0_0_0_/_0.62)] transition hover:border-[var(--ds-gray-alpha-500)] hover:bg-[var(--ds-gray-100)] focus-visible:shadow-[var(--ds-focus-ring)] sm:h-[52px] sm:px-5"
        onClick={() => window.dispatchEvent(new Event(commandPaletteOpenEvent))}
        type="button"
      >
        <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--ds-gray-700)]" />
        <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-[var(--ds-gray-700)]">
          Search
        </span>
        <span className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2.5 font-mono text-[11px] text-[var(--ds-gray-800)]">
          <Command aria-hidden="true" className="h-3.5 w-3.5" />
          Ctrl K
        </span>
      </button>
    </section>
  );
}
