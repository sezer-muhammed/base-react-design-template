// Renders a word letter-by-letter across the design-system palette, ordered by
// visible-light wavelength (long → short: red → violet). Each letter gently
// bobs on a wave, evoking frequency. Honours prefers-reduced-motion via the
// global .srt-wave animation (disabled under the reduce query in globals.css).

const SPECTRUM = ["red", "orange", "amber", "green", "teal", "sky", "indigo", "purple"] as const;

export function SpectralText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={className} aria-label={children}>
      {children.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="srt-wave"
          style={{
            color: `var(--ds-${SPECTRUM[i % SPECTRUM.length]}-700)`,
            display: "inline-block",
            fontWeight: 720,
            animationDelay: `${(i % SPECTRUM.length) * 0.11}s`,
          }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
