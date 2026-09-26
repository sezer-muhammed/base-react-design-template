import type { ReactNode } from "react";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptyStateVariant = "empty" | "error" | "loading";

const iconMap = {
  empty: Search,
  error: AlertCircle,
  loading: Loader2,
} satisfies Record<EmptyStateVariant, typeof Search>;

/** Real-world empty / error / loading placeholder for content regions.
 *
 * A dashed neutral well with a built-in icon per variant (the loading icon
 * spins) plus an optional action slot. Distinct from the showroom `StateBlock`
 * gallery tile — this is the primitive you drop into a page when a list is
 * empty, a request fails, or data is loading.
 */
export function EmptyState({
  action,
  body,
  className,
  icon: Icon,
  title,
  variant = "empty",
}: {
  action?: ReactNode;
  body: string;
  className?: string;
  /** Override the default per-variant icon. */
  icon?: typeof Search;
  title: string;
  variant?: EmptyStateVariant;
}) {
  const Glyph = Icon ?? iconMap[variant];

  return (
    <div
      className={cn(
        "grid min-h-[220px] place-items-center rounded-[8px] border border-dashed border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-8 text-center",
        className,
      )}
    >
      <div>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
          <Glyph
            aria-hidden="true"
            className={cn(
              "h-5 w-5 text-[var(--ds-gray-700)]",
              variant === "loading" && "animate-spin",
            )}
          />
        </span>
        <h2 className="mt-4 text-[18px] font-semibold text-[var(--ds-gray-1000)]">{title}</h2>
        <p className="mt-2 max-w-md text-[13px] leading-5 text-[var(--ds-gray-700)]">{body}</p>
        {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
      </div>
    </div>
  );
}
