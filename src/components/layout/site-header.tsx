import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { RecursiveMenu } from "@/components/ui/recursive-menu";
import { StatusSignal } from "@/components/ui/status-signal";
import { siteConfig } from "@/config/site";
import { siteNavigationTree } from "@/data/navigation";

const navItems = [
  { href: "#platform", label: "Platform" },
  { href: "#components", label: "Components" },
  { href: "#runtime", label: "Runtime" },
  { href: "#proof", label: "Proof" },
  { href: "#structure", label: "Structure" },
] as const;

export function SiteHeader() {
  return (
    <header className="depth-surface sticky top-3 z-30 mx-auto grid min-h-14 w-full max-w-[1360px] grid-cols-[1fr_auto] items-center gap-3 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3">
      <Link className="flex min-w-0 items-center gap-3" href="/">
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

      <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
        {navItems.map((item) => (
          <a
            className="rounded-[6px] px-2.5 py-2 text-[13px] font-medium text-[var(--ds-gray-900)] transition hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
        <NavigationTreeDropdown />
        <StatusSignal color="var(--ds-green-700)" variant="pill">
          template
        </StatusSignal>
      </nav>

      <div className="flex items-center gap-2 md:hidden">
        <NavigationTreeDropdown compact />
      </div>
    </header>
  );
}

function NavigationTreeDropdown({ compact = false }: { compact?: boolean }) {
  return (
    <details className="group relative">
      <summary className="flex h-9 cursor-pointer list-none items-center justify-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-3 text-[13px] font-medium text-[var(--ds-gray-1000)] transition hover:bg-[var(--ds-gray-100)] [&::-webkit-details-marker]:hidden">
        {compact ? <Menu aria-hidden="true" className="h-4 w-4" /> : null}
        {compact ? "Menu" : "Navigate"}
        <ChevronDown
          aria-hidden="true"
          className="h-3.5 w-3.5 text-[var(--ds-gray-700)] transition group-open:rotate-180"
        />
      </summary>
      <div className="depth-surface absolute right-0 top-[calc(100%+10px)] z-50 w-[min(430px,calc(100vw-24px))] overflow-hidden rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
        <div className="border-b border-[var(--ds-gray-alpha-300)] px-3 py-2">
          <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
            Site navigation
          </p>
        </div>
        <RecursiveMenu items={siteNavigationTree} />
      </div>
    </details>
  );
}
