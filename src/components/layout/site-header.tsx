"use client";

import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { RecursiveMenu } from "@/components/ui/recursive-menu";
import { StatusSignal } from "@/components/ui/status-signal";
import { siteConfig } from "@/config/site";
import { siteNavigationTree } from "@/data/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/buttons", label: "Buttons" },
  { href: "/tables", label: "Tables" },
  { href: "/charts", label: "Charts" },
] as const;

export function SiteHeader() {
  return (
    <header className="depth-surface sticky top-2 z-30 grid min-h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3 xl:hidden">
      <NavigationTreeDropdown compact />

      <BrandLink />

      <div className="hidden items-center gap-1 md:flex">
        <PrimaryNav orientation="horizontal" />
        <StatusSignal color="var(--ds-green-700)" variant="pill">
          template
        </StatusSignal>
      </div>

      <div className="md:hidden" />
    </header>
  );
}

export function SiteSidebar() {
  return (
    <aside
      aria-label="Site navigation"
      className="hidden h-screen min-h-screen min-w-0 flex-col border-r border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-100)] xl:sticky xl:top-0 xl:flex"
    >
      <div className="border-b border-[var(--ds-gray-alpha-300)] p-3">
        <BrandLink />
      </div>

      <div className="border-b border-[var(--ds-gray-alpha-300)] p-2">
        <PrimaryNav orientation="vertical" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <NavigationTreePanel />
      </div>

      <div className="border-t border-[var(--ds-gray-alpha-300)] p-3">
        <StatusSignal color="var(--ds-green-700)" variant="pill">
          template
        </StatusSignal>
        <p className="mt-2 text-[12px] leading-5 text-[var(--ds-gray-700)]">
          Open navigation stays visible on dashboard-width screens.
        </p>
      </div>
    </aside>
  );
}

function BrandLink() {
  return (
    <Link
      className="flex min-w-0 items-center gap-3 rounded-[7px] px-1 py-1 transition hover:bg-[var(--ds-gray-100)]"
      href="/"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[7px] border border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] font-mono text-[12px] font-semibold text-[var(--ds-background-100)]">
        {siteConfig.shortName}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold leading-5">
          {siteConfig.name}
        </span>
        <span className="block truncate font-mono text-[11px] text-[var(--ds-gray-700)]">
          {siteConfig.tagline}
        </span>
      </span>
    </Link>
  );
}

function PrimaryNav({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  return (
    <nav
      aria-label="Primary"
      className={
        orientation === "vertical"
          ? "grid gap-1"
          : "flex items-center gap-1"
      }
    >
      {navItems.map((item) => (
        <Link
          className={
            orientation === "vertical"
              ? "rounded-[7px] px-3 py-2 text-[13px] font-medium text-[var(--ds-gray-900)] transition hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
              : "rounded-[6px] px-2.5 py-2 text-[13px] font-medium text-[var(--ds-gray-900)] transition hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
          }
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function NavigationTreeDropdown({ compact = false }: { compact?: boolean }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex h-9 cursor-pointer items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3 text-[13px] font-medium text-[var(--ds-gray-1000)] outline-none transition hover:bg-[var(--ds-gray-100)] focus-visible:shadow-[var(--ds-focus-ring)] data-[state=open]:bg-[var(--ds-gray-100)]">
        {compact ? <Menu aria-hidden="true" className="h-4 w-4" /> : null}
        {compact ? "Menu" : "Navigate"}
        <ChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 text-[var(--ds-gray-700)] transition duration-200 [[data-state=open]_&]:rotate-180"
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="depth-surface z-50 w-[min(430px,calc(100vw-24px))] overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] data-[state=open]:animate-[fade-in_0.15s_ease] data-[state=closed]:animate-[fade-out_0.1s_ease]"
          sideOffset={10}
        >
          <NavigationTreePanel />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function NavigationTreePanel() {
  return (
    <>
      <div className="border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
        <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
          Site navigation
        </p>
      </div>
      <RecursiveMenu items={siteNavigationTree} />
    </>
  );
}
