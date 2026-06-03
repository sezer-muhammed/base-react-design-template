import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader, SiteSidebar } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen text-[var(--ds-gray-1000)]">
      <div className="min-h-screen xl:grid xl:grid-cols-[280px_minmax(0,1fr)]">
        <SiteSidebar />
        <div className="min-w-0">
          <div className="px-2 py-2 sm:px-3 xl:hidden">
            <SiteHeader />
          </div>
          <div className="min-w-0 px-2 pb-3 pt-2 sm:px-3 xl:px-3 2xl:px-4">
            {children}
            <SiteFooter />
          </div>
        </div>
      </div>
    </main>
  );
}
