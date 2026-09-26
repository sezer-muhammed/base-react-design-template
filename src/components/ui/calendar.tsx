"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type DateRange = { start: Date | null; end: Date | null };

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function sameDay(a: Date | null | undefined, b: Date | null | undefined) {
  return Boolean(
    a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate(),
  );
}
function isBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

type CalendarProps = {
  className?: string;
  maxDate?: Date;
  minDate?: Date;
  mode?: "single" | "range";
  onChange?: (date: Date) => void;
  onRangeChange?: (range: DateRange) => void;
  range?: DateRange;
  value?: Date | null;
};

export function Calendar({
  className,
  maxDate,
  minDate,
  mode = "single",
  onChange,
  onRangeChange,
  range,
  value,
}: CalendarProps) {
  const anchor = value ?? range?.start ?? new Date();
  const [view, setView] = useState(
    () => new Date(anchor.getFullYear(), anchor.getMonth(), 1),
  );
  const today = new Date();

  const firstDow = view.getDay();
  const daysInMonth = new Date(
    view.getFullYear(),
    view.getMonth() + 1,
    0,
  ).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(new Date(view.getFullYear(), view.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const isDisabled = (d: Date) =>
    Boolean((minDate && isBefore(d, minDate)) || (maxDate && isBefore(maxDate, d)));

  const start = range?.start ?? null;
  const end = range?.end ?? null;

  const isSelected = (d: Date) =>
    mode === "single" ? sameDay(d, value) : sameDay(d, start) || sameDay(d, end);
  const isRangeStart = (d: Date) => mode === "range" && sameDay(d, start) && Boolean(end);
  const isRangeEnd = (d: Date) => mode === "range" && sameDay(d, end);
  const isInRange = (d: Date) =>
    mode === "range" &&
    Boolean(start && end) &&
    isBefore(start as Date, d) &&
    isBefore(d, end as Date);

  function handleClick(d: Date) {
    if (isDisabled(d)) return;
    if (mode === "single") {
      onChange?.(d);
      return;
    }
    if (!start || (start && end)) {
      onRangeChange?.({ start: d, end: null });
    } else if (isBefore(d, start)) {
      onRangeChange?.({ start: d, end: start });
    } else {
      onRangeChange?.({ start, end: d });
    }
  }

  const navButton =
    "grid h-7 w-7 place-items-center rounded-[6px] text-[var(--ds-gray-700)] outline-none transition hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)] focus-visible:shadow-[var(--ds-focus-ring)]";

  return (
    <div className={cn("w-[252px] select-none", className)}>
      <div className="mb-2 flex items-center justify-between">
        <button
          aria-label="Previous month"
          className={navButton}
          onClick={() => setView(addMonths(view, -1))}
          type="button"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </button>
        <span className="text-[13px] font-semibold text-[var(--ds-gray-1000)]">
          {MONTHS[view.getMonth()]} {view.getFullYear()}
        </span>
        <button
          aria-label="Next month"
          className={navButton}
          onClick={() => setView(addMonths(view, 1))}
          type="button"
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7">
        {WEEKDAYS.map((w) => (
          <span
            className="grid h-7 place-items-center font-mono text-[10px] uppercase text-[var(--ds-gray-600)]"
            key={w}
          >
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          if (!d) return <span className="h-8" key={`empty-${i}`} />;
          const selected = isSelected(d);
          const mid = isInRange(d);
          const disabled = isDisabled(d);
          return (
            <button
              aria-pressed={selected}
              className={cn(
                "grid h-8 w-full place-items-center text-[13px] outline-none transition focus-visible:shadow-[var(--ds-focus-ring)]",
                !selected && !mid && "rounded-[6px] text-[var(--ds-gray-1000)]",
                !disabled && !selected && !mid && "hover:bg-[var(--ds-gray-100)]",
                mid && "bg-[var(--ds-gray-100)] text-[var(--ds-gray-1000)]",
                selected &&
                  "bg-[var(--ds-gray-1000)] font-semibold text-[var(--ds-background-100)]",
                selected && mode === "single" && "rounded-[6px]",
                isRangeStart(d) && "rounded-l-[6px]",
                isRangeEnd(d) && "rounded-r-[6px]",
                selected && mode === "range" && !end && "rounded-[6px]",
                disabled && "pointer-events-none opacity-30",
              )}
              disabled={disabled}
              key={d.toISOString()}
              onClick={() => handleClick(d)}
              type="button"
            >
              <span
                className={cn(
                  "relative",
                  sameDay(d, today) &&
                    !selected &&
                    "after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-[var(--ds-blue-700)] after:content-['']",
                )}
              >
                {d.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
