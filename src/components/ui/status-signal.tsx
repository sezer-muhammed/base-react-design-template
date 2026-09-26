import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatusSignalVariant = "dot" | "inline" | "pill" | "cell" | "glass";

export function StatusSignal({
  children,
  className,
  color,
  pulse = false,
  variant = "inline",
}: {
  children?: ReactNode;
  className?: string;
  color: string;
  pulse?: boolean;
  variant?: StatusSignalVariant;
}) {
  const dot = (
    <span
      className={cn(
        "ds-dot inline-block h-[1em] w-[1em] shrink-0 rounded-full",
        pulse && "animate-pulse",
      )}
      style={{ background: color }}
    />
  );

  if (variant === "dot") {
    // Wrap so the dot self-centers against adjacent text without caller margin
    // hacks (e.g. mt-1.5). `h-[1lh]` matches the surrounding line box.
    return (
      <span
        className={cn(
          "inline-flex h-[1lh] items-center align-text-bottom",
          className,
        )}
      >
        {dot}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-medium text-[var(--ds-gray-1000)]",
        variant === "inline" && "text-[13px]",
        variant === "pill" &&
          "badge-frost h-6 rounded-[6px] border px-2 text-[12px]",
        variant === "cell" && "text-[13px]",
        variant === "glass" && "glass-frost h-7 rounded-[6px] border px-2.5 text-[12px]",
        className,
      )}
    >
      {dot}
      {children}
    </span>
  );
}
