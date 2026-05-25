"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function ToggleCell({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      aria-pressed={checked}
      className={cn(
        "relative inline-flex h-7 w-12 rounded-full border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] transition",
        checked && "bg-[var(--ds-gray-1000)]",
      )}
      onClick={onChange}
      type="button"
    >
      <span
        className={cn(
          "absolute left-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--ds-background-100)] shadow-[0_1px_2px_rgb(0_0_0_/_0.22)] transition",
          checked && "translate-x-5",
        )}
      >
        {checked ? <Check aria-hidden="true" className="h-3 w-3" /> : null}
      </span>
    </button>
  );
}
