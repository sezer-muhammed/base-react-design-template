import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function GlassTag({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "relative inline-flex h-7 items-center overflow-hidden rounded-[7px] border border-white/30 bg-white/[0.07] px-2.5 text-[12px] font-medium shadow-[inset_0_1px_0_rgb(255_255_255_/_0.76),inset_0_-1px_0_rgb(255_255_255_/_0.12),0_10px_24px_-18px_rgb(0_0_0_/_0.72)] backdrop-blur-xl backdrop-brightness-110 backdrop-saturate-200 before:pointer-events-none before:absolute before:inset-x-1 before:top-px before:h-px before:bg-white/70 before:content-[''] after:pointer-events-none after:absolute after:-left-6 after:top-0 after:h-full after:w-10 after:rotate-12 after:bg-white/[0.10] after:blur-[1px] after:content-['']",
        tone === "dark" ? "text-[var(--ds-gray-1000)]" : "text-white",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}
