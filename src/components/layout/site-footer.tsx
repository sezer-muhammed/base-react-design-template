"use client";

import Link from "next/link";
import { Command } from "lucide-react";
import { commandPaletteOpenEvent } from "@/config/events";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--ds-gray-alpha-300)] py-5 text-[12px] text-[var(--ds-gray-700)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 {siteConfig.name} - Extensible Next.js starter</p>
        <div className="flex flex-wrap items-center gap-3">
          <nav className="flex flex-wrap gap-3 font-mono" aria-label="Footer">
            <Link className="hover:text-[var(--ds-gray-1000)]" href="/components">
              components
            </Link>
            <a className="hover:text-[var(--ds-gray-1000)]" href="#runtime">
              runtime
            </a>
            <a className="hover:text-[var(--ds-gray-1000)]" href="#structure">
              structure
            </a>
          </nav>
          <button
            aria-label="Open component command palette"
            className="hidden h-8 items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-2.5 font-medium text-[var(--ds-gray-1000)] outline-none transition hover:bg-[var(--ds-gray-100)] focus-visible:shadow-[var(--ds-focus-ring)] md:inline-flex"
            onClick={() => window.dispatchEvent(new Event(commandPaletteOpenEvent))}
            type="button"
          >
            <Command aria-hidden="true" className="h-3.5 w-3.5 text-[var(--ds-gray-700)]" />
            <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">Ctrl K</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
