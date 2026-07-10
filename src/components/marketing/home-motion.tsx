"use client";

/**
 * Home-page motion primitives (Framer Motion).
 *
 * Scoped to the marketing landing page: springy entrances, a pointer-tilt card,
 * a magnetic CTA, and a scroll-parallax panel. Section-level scroll reveals for
 * the lower page stay on the free CSS `animation-timeline: view()` path in
 * globals.css — these primitives are for the hero and interactive moments only.
 *
 * Brand rule is preserved: motion never tints a box. Boxes stay grayscale; a
 * colored dot still carries state. All transforms collapse to a plain fade (or
 * nothing) under `prefers-reduced-motion`.
 */

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { cn } from "@/lib/cn";

const SPRING = { type: "spring", stiffness: 230, damping: 26, mass: 0.9 } as const;

/* ---------------------------------------------------------------- reveal --- */

type Trigger = "mount" | "view";

/**
 * Spring-rise + fade for a single block. `trigger="mount"` plays immediately
 * (hero); `trigger="view"` waits until the block scrolls into frame.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  trigger?: Trigger;
}) {
  const reduce = useReducedMotion();
  const hidden = { opacity: 0, y: reduce ? 0 : y };
  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      {...(trigger === "mount"
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-12% 0px" } })}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------- stagger --- */

const containerVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

/**
 * Container that cascades its <StaggerItem> children. Use `trigger="mount"` for
 * above-the-fold groups (hero), `"view"` for anything below the fold.
 */
export function Stagger({
  children,
  className,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  trigger?: Trigger;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: { once: true, margin: "-12% 0px" } })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    shown: { opacity: 1, y: 0, transition: SPRING },
  };
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- tilt card --- */

/**
 * Pointer-reactive 3D tilt + lift. Wrap a <Card>. The tilt is subtle (max ~7°)
 * and springs back to flat when the pointer leaves.
 */
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 260,
    damping: 22,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 260,
    damping: 22,
  });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: rx, rotateY: ry, perspective: 900 }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      whileHover={{ y: -5, transition: { ...SPRING, damping: 20 } }}
    >
      <div style={{ transform: "translateZ(24px)" }}>{children}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------- magnetic button --- */

/**
 * The child is pulled toward the pointer while hovered, then springs home.
 * Wrap a single interactive element (button / link).
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  if (reduce) {
    return <span className={cn("inline-flex", className)}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------- parallax panel --- */

/**
 * Scroll-linked parallax wrapper for the hero visual. The panel drifts up as
 * the page scrolls and eases in on mount.
 */
export function ParallaxPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), {
    stiffness: 120,
    damping: 30,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y }}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...SPRING, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
