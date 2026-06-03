"use client";

import { ArrowUpRight, Command, Search } from "lucide-react";
import { commandPaletteOpenEvent } from "@/config/events";
import { StatusSignal } from "@/components/ui/status-signal";

export function ShowroomCommandSearch() {
  return (
    <section className="px-1 sm:px-2">
      <button
        aria-label="Open component search"
        className="group depth-surface grid w-full cursor-pointer gap-3 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 text-left transition hover:border-[var(--ds-gray-alpha-500)] hover:bg-[var(--ds-gray-100)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        onClick={() => window.dispatchEvent(new Event(commandPaletteOpenEvent))}
        type="button"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)]">
            <Search aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-800)]" />
          </span>
          <span className="min-w-0">
            <span className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="truncate text-[14px] font-semibold text-[var(--ds-gray-1000)]">
                Search registered components
              </span>
              <StatusSignal color="var(--ds-blue-700)" variant="pill">
                jump
              </StatusSignal>
            </span>
            <span className="mt-1 block truncate text-[12px] leading-5 text-[var(--ds-gray-700)]">
              Type ids like table-, chart-, auth-, or any unique component name.
            </span>
          </span>
        </span>
        <span className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span className="inline-flex h-7 items-center gap-1.5 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] text-[var(--ds-gray-800)]">
            <Command aria-hidden="true" className="h-3.5 w-3.5" />
            Ctrl K
          </span>
          <span className="inline-flex h-7 items-center gap-1.5 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 text-[12px] font-medium text-[var(--ds-gray-900)]">
            Open
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </span>
      </button>
    </section>
  );
}
