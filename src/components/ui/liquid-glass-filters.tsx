// Global liquid-glass refraction filters. Rendered once in the root layout so
// any element can reference them from CSS via `backdrop-filter: url(#id)`.
// fractalNoise + feDisplacementMap warps (refracts) the backdrop through the
// glass — the part a plain blur can't do. Two scales because the displacement
// must be proportional to the element: chips are tiny, panels are large.
export function LiquidGlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0"
    >
      <defs>
        {/* Small chips: badges, glass tags, pills. Gentle edge refraction. */}
        <filter
          id="srt-liquid-chip"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Large surfaces: panels and on-image card overlays. */}
        <filter
          id="srt-liquid-panel"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.013"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.4" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="44"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
