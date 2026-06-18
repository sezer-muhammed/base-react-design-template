"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** Best-effort logo avatar with an initials fallback.
 *
 * Vendor-neutral: pass an explicit `src`, or a `resolveSrc(domain)` resolver
 * that maps a domain to an image URL (e.g. a logo CDN). The domain is taken
 * from `domain` when known, otherwise guessed from `name` ("Acme Inc" ->
 * "acme.com"). On any miss (no resolver, wrong guess, network error) it falls
 * back to a neutral initials chip — purely decorative, never breaks a row.
 *
 * Example wiring to a logo CDN:
 *   <CompanyLogo name="Acme" resolveSrc={(d) => `https://img.logo.dev/${d}?token=...`} />
 */
function guessDomain(name: string): string | null {
  const cleaned = (name || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned ? `${cleaned}.com` : null;
}

export function CompanyLogo({
  className,
  domain,
  name,
  resolveSrc,
  size = 28,
  src,
}: {
  className?: string;
  /** Pass when known (accurate); otherwise a domain is guessed from `name`. */
  domain?: string;
  name: string;
  /** Maps a resolved domain to an image URL. Ignored when `src` is provided. */
  resolveSrc?: (domain: string) => string;
  size?: number;
  /** Explicit image URL; takes priority over `resolveSrc`. */
  src?: string;
}) {
  const resolvedDomain = domain || guessDomain(name);
  const imageSrc =
    src ?? (resolveSrc && resolvedDomain ? resolveSrc(resolvedDomain) : null);

  const [failed, setFailed] = useState(false);
  // Re-sorted/filtered list rows reuse component positions, so the same slot
  // can re-render for a different entity. Reset the failed flag during render
  // whenever the source changes, otherwise a new entry wrongly shows initials.
  const [prevSrc, setPrevSrc] = useState(imageSrc);
  if (imageSrc !== prevSrc) {
    setPrevSrc(imageSrc);
    setFailed(false);
  }

  const initial = (name || "?").trim().charAt(0).toUpperCase() || "?";
  const box = { width: size, height: size };

  if (!imageSrc || failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-grid shrink-0 place-items-center rounded-[6px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] font-semibold text-[var(--ds-gray-800)]",
          className,
        )}
        style={{ ...box, fontSize: Math.round(size * 0.45) }}
      >
        {initial}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden="true"
      className={cn(
        "shrink-0 rounded-[6px] border border-[var(--ds-gray-alpha-300)] bg-white object-contain",
        className,
      )}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      src={imageSrc}
      style={box}
      width={size}
    />
  );
}
