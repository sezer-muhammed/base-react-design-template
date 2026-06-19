import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "gray" | "blue" | "green" | "amber" | "teal" | "purple" | "pink";

// Grayscale box + a colored dot that identifies the tone (same colored-circle
// idiom used across the site). The box stays neutral; color lives in the dot.
const toneDot: Record<BadgeTone, string> = {
  gray: "var(--ds-gray-500)",
  blue: "var(--ds-blue-700)",
  green: "var(--ds-green-700)",
  amber: "var(--ds-amber-700)",
  teal: "var(--ds-teal-700)",
  purple: "var(--ds-purple-700)",
  pink: "var(--ds-pink-700)",
};

export function Badge({
  children,
  className,
  dot = true,
  tone = "gray",
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[color-mix(in_srgb,var(--ds-gray-100)_72%,var(--ds-background-100))] px-2 text-[11px] font-medium leading-none text-[var(--ds-gray-1000)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.76),0_1px_1px_rgb(0_0_0_/_0.04)]",
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 shrink-0 rounded-full border border-[var(--ds-gray-alpha-500)]"
          style={{ background: toneDot[tone] }}
        />
      ) : null}
      {children}
    </span>
  );
}
