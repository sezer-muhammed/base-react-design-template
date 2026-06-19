import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "amber" | "blue" | "gray" | "green" | "pink" | "purple" | "teal";

// The box is always neutral; color is carried only by the dot.
const toneDotColor: Record<BadgeTone, string | null> = {
  amber: "var(--ds-amber-700)",
  blue: "var(--ds-blue-700)",
  gray: null,
  green: "var(--ds-green-700)",
  pink: "var(--ds-pink-700)",
  purple: "var(--ds-purple-700)",
  teal: "var(--ds-teal-700)",
};

export function Badge({
  children,
  className,
  tone = "gray",
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  const dotColor = toneDotColor[tone];

  return (
    <span
      className={cn(
        "badge-frost inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[6px] border px-2 text-[11px] font-medium leading-none text-[var(--ds-gray-1000)]",
        className,
      )}
    >
      {dotColor ? (
        <span
          aria-hidden="true"
          className="ds-dot h-2 w-2 shrink-0 rounded-full"
          style={{ background: dotColor }}
        />
      ) : null}
      {children}
    </span>
  );
}
