import { ShowroomPage } from "@/components/showroom/showroom-page";
import { Surface } from "@/components/ui/surface";
import { GlassTag } from "@/components/ui/glass-tag";

function FoundationHero() {
  return (
    <section className="reveal grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <div className="py-4">
        <p className="font-mono text-[12px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          Catalog · Foundation
        </p>
        <h1 className="mt-2 max-w-3xl text-[38px] font-semibold leading-[1.05] sm:text-[48px]">
          The groundwork every component is built on.
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
          Foundation defines the design system&apos;s base layer — color and
          spacing tokens, theming, and the usage docs that keep everything
          consistent from the ground up.
        </p>
      </div>
      <Surface className="overflow-hidden" tone="flat">
        <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
          <div className="p-4">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Sections
            </p>
            <p className="mt-2 text-[22px] font-semibold">3</p>
          </div>
          <div className="p-4">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Tokens
            </p>
            <p className="mt-2 text-[22px] font-semibold">Geist</p>
          </div>
          <div className="p-4">
            <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              Type
            </p>
            <p className="mt-2 text-[22px] font-semibold">Docs</p>
          </div>
        </div>
        <div className="border-t border-[var(--ds-gray-alpha-400)] p-3">
          <div className="flex flex-wrap gap-2">
            <GlassTag>Foundation tokens</GlassTag>
            <GlassTag>Theme</GlassTag>
            <GlassTag>Usage</GlassTag>
          </div>
        </div>
      </Surface>
    </section>
  );
}

export default function Page() {
  return (
    <ShowroomPage
      introSlot={<FoundationHero />}
      sections={["foundation", "theme", "usage"]}
    />
  );
}
