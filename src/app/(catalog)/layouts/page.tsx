import { ShowroomPage } from "@/components/showroom/showroom-page";
import { Surface } from "@/components/ui/surface";
import { GlassTag } from "@/components/ui/glass-tag";

function LayoutsHero() {
  return (
    <section className="reveal grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <div className="py-4">
        <p className="font-mono text-[12px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          Catalog · Layouts
        </p>
        <h1 className="mt-2 max-w-3xl text-[38px] font-semibold leading-[1.05] sm:text-[48px]">
          Page-level patterns and an extensible runtime blueprint.
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[var(--ds-gray-900)]">
          Starter templates, table-and-detail workflows, and adapter slots that
          structure a whole screen — not a single widget. The skeleton each
          product grows into.
        </p>
      </div>
      <Surface className="overflow-hidden" tone="flat">
        <div className="grid grid-cols-3 divide-x divide-[var(--ds-gray-alpha-300)]">
          {[
            ["Sections", "3"],
            ["Patterns", "Pages"],
            ["Type", "Structure"],
          ].map(([label, value]) => (
            <div className="p-4" key={label}>
              <p className="font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
                {label}
              </p>
              <p className="mt-2 text-[22px] font-semibold">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--ds-gray-alpha-400)] p-3">
          <div className="flex flex-wrap gap-2">
            <GlassTag>Templates</GlassTag>
            <GlassTag>Workflows</GlassTag>
            <GlassTag>Blueprint</GlassTag>
          </div>
        </div>
      </Surface>
    </section>
  );
}

export default function Page() {
  return <ShowroomPage introSlot={<LayoutsHero />} sections={["templates", "workflows", "blueprint"]} />;
}
