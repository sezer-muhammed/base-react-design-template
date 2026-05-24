import type { ReactNode } from "react";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { cn } from "@/lib/cn";

export function DataPanel({
  action,
  children,
  className,
  componentId,
  contentClassName,
  eyebrow,
  id,
  padded = false,
  summary,
  title,
  tone = "flat",
}: {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  componentId?: string;
  contentClassName?: string;
  eyebrow?: string;
  id?: string;
  padded?: boolean;
  summary?: string;
  title: string;
  tone?: "flat" | "raised" | "sunken";
}) {
  return (
    <Surface
      className={cn("overflow-hidden", className)}
      data-component-id={componentId}
      id={id}
      tone={tone}
    >
      <SectionHeader action={action} eyebrow={eyebrow} summary={summary} title={title} />
      <div className={cn(padded && "p-3", contentClassName)}>{children}</div>
    </Surface>
  );
}
