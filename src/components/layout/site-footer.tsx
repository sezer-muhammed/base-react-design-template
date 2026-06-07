import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--ds-gray-alpha-300)] py-5 text-[12px] text-[var(--ds-gray-700)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 {siteConfig.name} - Extensible Next.js starter</p>
        <nav className="flex flex-wrap gap-3 font-mono" aria-label="Footer">
          <Link className="hover:text-[var(--ds-gray-1000)]" href="/buttons">
            components
          </Link>
          <a className="hover:text-[var(--ds-gray-1000)]" href="#runtime">
            runtime
          </a>
          <a className="hover:text-[var(--ds-gray-1000)]" href="#structure">
            structure
          </a>
        </nav>
      </div>
    </footer>
  );
}
