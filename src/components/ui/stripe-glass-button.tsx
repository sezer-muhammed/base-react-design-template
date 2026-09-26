import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

// A glass pill that floats on a sliding diagonal stripe track — the glass refracts
// the moving stripes as they slide past. Renders a Next <Link> for internal hrefs
// or an <a> for external ones. Requires the global #srt-liquid-chip filter, which
// the root layout already mounts via <LiquidGlassFilters />.
//
//   <StripeGlassButton href="/projects" accent>View work</StripeGlassButton>
export function StripeGlassButton({
  href,
  children,
  size = "md",
  accent = false,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  accent?: boolean;
  external?: boolean;
  className?: string;
}) {
  const pad =
    size === "lg"
      ? "px-6 py-3 text-[15px]"
      : size === "sm"
        ? "px-4 py-2 text-[13px]"
        : "px-5 py-2.5 text-[14px]";

  const face = cn("stripe-glass-face", accent && "stripe-glass-accent", pad);

  return (
    <span className={cn("stripe-glass", className)}>
      <span className="stripe-glass-track" aria-hidden="true" />
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={face}>
          {children}
        </a>
      ) : (
        <Link href={href} className={face}>
          {children}
        </Link>
      )}
    </span>
  );
}
