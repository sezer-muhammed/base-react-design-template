import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const cardVariants = cva(
  "relative overflow-hidden rounded-[8px] border transition",
  {
    defaultVariants: {
      density: "md",
      depth: "base",
      tone: "default",
    },
    variants: {
      density: {
        compact: "p-3",
        md: "p-4",
        spacious: "p-5",
      },
      depth: {
        base: "shadow-[0_1px_1px_rgb(0_0_0_/_0.03)]",
        deep: "depth-surface",
        flat: "shadow-none",
        lifted:
          "shadow-[0_1px_1px_rgb(0_0_0_/_0.04),0_16px_32px_-24px_rgb(0_0_0_/_0.5)]",
      },
      tone: {
        accent:
          "border-[var(--ds-blue-400)] bg-[var(--ds-blue-100)] text-[var(--ds-blue-1000)]",
        dark: "border-white/15 bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]",
        default:
          "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)]",
        muted:
          "border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] text-[var(--ds-gray-1000)]",
        warning:
          "border-[var(--ds-amber-400)] bg-[var(--ds-amber-100)] text-[var(--ds-amber-1000)]",
      },
    },
  },
);

export function Card({
  children,
  className,
  density,
  depth,
  tone,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return (
    <div className={cn(cardVariants({ density, depth, tone }), className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({
  action,
  children,
  className,
}: {
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-[15px] font-semibold leading-5", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-1 text-[13px] leading-5 text-[var(--ds-gray-900)]", className)}>
      {children}
    </p>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "-mx-4 -mb-4 mt-4 border-t border-[var(--ds-gray-alpha-300)] px-4 py-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
