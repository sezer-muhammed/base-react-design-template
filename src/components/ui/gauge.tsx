import { cn } from "@/lib/cn";

type GaugeProps = {
  className?: string;
  /** Arc colour. Defaults to the neutral foreground; pass a --ds-*-700 for a status gauge. */
  color?: string;
  label?: string;
  size?: number;
  strokeWidth?: number;
  /** Show the numeric value in the centre. */
  showValue?: boolean;
  unit?: string;
  /** 0–100 */
  value: number;
};

// A compact 270° speedometer-style gauge: neutral track + value arc.
export function Gauge({
  className,
  color = "var(--ds-gray-1000)",
  label,
  size = 96,
  strokeWidth = 8,
  showValue = true,
  unit,
  value,
}: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const sweep = 0.75; // 270° of the circle
  const track = circumference * sweep;
  const filled = track * (clamped / 100);

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div className="relative" style={{ height: size, width: size }}>
        <svg
          aria-hidden="true"
          className="-rotate-[135deg]"
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke="var(--ds-gray-alpha-300)"
            strokeDasharray={`${track} ${circumference}`}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke={color}
            strokeDasharray={`${filled} ${circumference}`}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.22,0.61,0.36,1)" }}
          />
        </svg>
        {showValue ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[20px] font-semibold leading-none text-[var(--ds-gray-1000)] [font-variant-numeric:tabular-nums]">
              {Math.round(clamped)}
              {unit ? (
                <span className="ml-0.5 text-[11px] font-medium text-[var(--ds-gray-700)]">
                  {unit}
                </span>
              ) : null}
            </span>
          </div>
        ) : null}
      </div>
      {label ? (
        <span className="mt-1 font-mono text-[11px] uppercase tracking-normal text-[var(--ds-gray-700)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
