"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

export type SectionNavItem = {
  href: `#${string}`;
  label: string;
};

export function ActiveSectionNav({ items }: { items: readonly SectionNavItem[] }) {
  const sectionIds = useMemo(
    () => items.map((item) => item.href.replace("#", "")),
    [items],
  );
  const [activeId, setActiveId] = useState(sectionIds[0]);
  const itemRefs = useRef(new Map<string, HTMLAnchorElement>());

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    function updateActiveSection() {
      const nearPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 8;
      const probeY = window.innerHeight * 0.38;
      let nextActiveId = sections[0].id;

      if (nearPageEnd) {
        setActiveId(sections[sections.length - 1].id);
        return;
      }

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= probeY) {
          nextActiveId = section.id;
        }
      });

      setActiveId(nextActiveId);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  useEffect(() => {
    itemRefs.current.get(activeId)?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  return (
    <Surface className="sticky top-[76px] z-10 overflow-hidden xl:top-2" tone="flat">
      <nav
        aria-label="Showroom sections"
        className="flex flex-nowrap gap-1 overflow-x-auto p-2 lg:flex-wrap"
      >
        {items.map((item, index) => {
          const id = item.href.replace("#", "");
          const active = id === activeId;

          return (
            <a
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex h-8 shrink-0 items-center gap-2 rounded-[6px] border px-2.5 text-[12px] font-medium transition",
                active
                  ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
                  : "border-transparent text-[var(--ds-gray-900)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]",
              )}
              href={item.href}
              key={item.href}
              ref={(node) => {
                if (node) {
                  itemRefs.current.set(id, node);
                } else {
                  itemRefs.current.delete(id);
                }
              }}
            >
              <span
                className={cn(
                  "font-mono text-[11px]",
                  active ? "text-[var(--ds-background-100)]" : "text-[var(--ds-gray-700)]",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {item.label}
            </a>
          );
        })}
      </nav>
    </Surface>
  );
}
