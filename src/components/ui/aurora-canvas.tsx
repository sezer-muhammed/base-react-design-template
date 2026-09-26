"use client";

import { useEffect, useRef } from "react";

// The design-system accent families (700-level RGB), used as a living colour field.
const COLORS = [
  [24, 119, 242], [99, 58, 237], [168, 85, 247], [236, 72, 153],
  [245, 158, 11], [20, 184, 166], [14, 165, 233], [34, 197, 94],
];

/**
 * AuroraCanvas — an animated metaball field in the design-system palette.
 * `dark` uses a screen blend (for dark surfaces); light uses multiply.
 * Fully honours prefers-reduced-motion (renders one static frame).
 */
export function AuroraCanvas({
  className,
  dark = true,
}: {
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

    let W = 0, H = 0, raf = 0;
    let blobs: {
      c: number[]; x: number; y: number; r: number; sx: number; sy: number; ph: number;
    }[] = [];

    const size = () => {
      const DPR = Math.min(2, devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      W = canvas.width = Math.max(1, Math.round(r.width * DPR));
      H = canvas.height = Math.max(1, Math.round(r.height * DPR));
    };
    const make = () => {
      blobs = COLORS.map((c, i) => ({
        c, x: Math.random(), y: Math.random(),
        r: 0.32 + Math.random() * 0.28,
        sx: 0.1 + Math.random() * 0.13, sy: 0.09 + Math.random() * 0.13,
        ph: i * 0.79,
      }));
    };
    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = dark ? "screen" : "multiply";
      const tt = t * 0.00009;
      for (const b of blobs) {
        const cx = (b.x + Math.sin(tt * 6.28 * b.sx + b.ph) * 0.3) * W;
        const cy = (b.y + Math.cos(tt * 6.28 * b.sy + b.ph * 1.3) * 0.3) * H;
        const rad = b.r * Math.min(W, H) * (dark ? 1.2 : 1.05);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const [r, gr, bl] = b.c;
        g.addColorStop(0, `rgba(${r},${gr},${bl},${dark ? 0.5 : 0.4})`);
        g.addColorStop(1, `rgba(${r},${gr},${bl},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, 6.2832);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      size(); make();
      if (raf) cancelAnimationFrame(raf);
      frame(0);
    };
    let to: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(to); to = setTimeout(start, 160); };
    addEventListener("resize", onResize);
    start();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); };
  }, [dark]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
