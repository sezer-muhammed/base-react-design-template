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
        "ds-dot inline-block h-2.5 w-2.5 shrink-0 rounded-full",
        pulse && "animate-pulse",
      )}
      style={{ background: color }}
    />
  );

  if (variant === "dot") {
    return dot;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-medium text-[var(--ds-gray-1000)]",
        variant === "inline" && "text-[13px]",
        variant === "pill" &&
          "badge-frost h-6 rounded-full border px-2.5 text-[12px]",
        variant === "cell" && "text-[13px]",
        variant === "glass" && "glass-frost h-7 rounded-full border px-2.5 text-[12px]",
        className,
      )}
    >
      {dot}
      {children}
    </span>
  );
}
