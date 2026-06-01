import { useId } from "react";
import { cn } from "@/lib/cn";

type TooltipSide = "top" | "bottom";

const sideClasses: Record<TooltipSide, string> = {
  bottom: "left-0 top-full mt-2",
  top: "bottom-full left-0 mb-2",
};

export function InfoTooltip({
  className,
  color,
  description,
  label,
  side = "top",
}: {
  className?: string;
  color: string;
  description: string;
  label: string;
  side?: TooltipSide;
}) {
  const tooltipId = useId();

  return (
    <span className={cn("group relative inline-flex min-w-0", className)}>
      <button
        aria-describedby={tooltipId}
        className="inline-flex min-w-0 items-center gap-2 rounded-[6px] py-1 text-left font-semibold outline-none hover:text-[var(--ds-gray-1000)] focus-visible:shadow-[var(--ds-focus-ring)]"
        type="button"
      >
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--ds-gray-alpha-500)]"
          style={{ background: color }}
        />
        <span className="truncate">{label}</span>
      </button>
      <span
        className={cn(
          "pointer-events-none absolute z-30 w-64 rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-3 text-[12px] leading-5 text-[var(--ds-gray-900)] opacity-0 shadow-[var(--ds-shadow-lg)] transition group-focus-within:opacity-100 group-hover:opacity-100",
          sideClasses[side],
        )}
        id={tooltipId}
        role="tooltip"
      >
        <span className="mb-1 flex items-center gap-2 font-semibold text-[var(--ds-gray-1000)]">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full border border-[var(--ds-gray-alpha-500)]"
            style={{ background: color }}
          />
          {label}
        </span>
        {description}
      </span>
    </span>
  );
}
