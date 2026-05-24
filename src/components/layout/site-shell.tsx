import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen text-[var(--ds-gray-1000)]">
      <div className="px-3 py-3">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </main>
  );
}
