export function SkipLink() {
  return (
    <a
      className="sr-only z-50 rounded-md bg-[var(--ds-background-100)] px-3 py-2 text-sm font-medium text-[var(--ds-gray-1000)] shadow-lg outline-none focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus-visible:ring-2 focus-visible:ring-[var(--ds-focus-color)]"
      href="#main-content"
    >
      Skip to main content
    </a>
  );
}
