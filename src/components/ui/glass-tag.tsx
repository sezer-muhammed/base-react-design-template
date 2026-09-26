import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function GlassTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  // Accepted for backwards compatibility; text is now always black with a
  // white halo so it stays readable on any background.
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "glass-frost inline-flex h-7 items-center rounded-[7px] border px-2.5 text-[12px] font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
