/** Central type scale for the design system.
 *
 * These are Tailwind class strings, not components, so they compose anywhere
 * (`className={text.pageTitle}`) without wrapping markup. Keeping the scale in
 * one place keeps headings, leads, and captions consistent across pages and
 * mirrors the conventions documented in the README ("Typography conventions").
 */
export const text = {
  eyebrow: "font-mono text-[13px] uppercase text-[var(--ds-gray-700)]",
  eyebrowSm: "font-mono text-[12px] uppercase text-[var(--ds-gray-700)]",
  display: "text-[42px] font-semibold leading-[1.03] sm:text-[58px]",
  pageTitle: "text-[34px] font-semibold leading-[1.08] sm:text-[42px]",
  bandTitle: "text-[28px] font-semibold leading-9",
  sectionTitle: "text-[18px] font-semibold leading-6 text-[var(--ds-gray-1000)]",
  lead: "text-[17px] leading-8 text-[var(--ds-gray-900)]",
  body: "text-[15px] leading-6 text-[var(--ds-gray-900)]",
  small: "text-[14px] leading-6 text-[var(--ds-gray-900)]",
  caption: "text-[13px] leading-5 text-[var(--ds-gray-700)]",
  meta: "font-mono text-[12px] text-[var(--ds-gray-700)]",
} as const;

export type TextScaleKey = keyof typeof text;
