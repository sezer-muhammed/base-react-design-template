import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ActionBar({
  align = "left",
  children,
  className,
}: {
  align?: "left" | "right" | "split";
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        align === "right" && "justify-end",
        align === "split" && "justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}
