"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Geist-style switch: pill track, sliding knob, instant feedback. */
export function Toggle({
  checked,
  className,
  disabled,
  label,
  onChange,
}: {
  checked: boolean;
  className?: string;
  disabled?: boolean;
  label: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-150 outline-none focus-visible:shadow-[var(--ds-focus-ring)]",
        checked
          ? "border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)]"
          : "border-[var(--ds-gray-alpha-400)] bg-[var(--ds-gray-300)]",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      )}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={cn(
          "absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-150",
          checked ? "translate-x-[18px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}

/** A settings row: title + hint on the left, a control slot on the right. */
export function PreferenceRow({
  control,
  hint,
  title,
}: {
  control: ReactNode;
  hint: string;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--ds-gray-alpha-300)] py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[14px] font-medium leading-5 text-[var(--ds-gray-1000)]">{title}</p>
        <p className="mt-0.5 text-[12px] leading-4 text-[var(--ds-gray-700)]">{hint}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

/** Segmented control for small enumerations (theme, font size, view mode). */
export function Segmented<T extends string | number>({
  className,
  onChange,
  options,
  value,
}: {
  className?: string;
  onChange: (next: T) => void;
  options: { label: string; value: T }[];
  value: T;
}) {
  return (
    <div
      className={cn(
        "inline-flex rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] p-0.5",
        className,
      )}
    >
      {options.map((option) => (
        <button
          className={cn(
            "rounded-[5px] px-2.5 py-1 text-[12px] font-medium transition-colors outline-none focus-visible:shadow-[var(--ds-focus-ring)]",
            option.value === value
              ? "bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)] shadow-sm"
              : "text-[var(--ds-gray-700)] hover:text-[var(--ds-gray-1000)]",
          )}
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
