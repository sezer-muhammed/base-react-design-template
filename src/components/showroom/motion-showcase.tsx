"use client";

/**
 * Motion showcase — "The accent, in motion".
 *
 * A catalog of snappy (150–250ms) micro-animations for the design system.
 * Brand rule is respected: boxes stay grayscale, a single colored DOT carries
 * every change — and in the first three tiles the dot literally DRIVES the
 * box / page transform.
 *
 * Drop-in: place at src/components/showroom/motion-showcase.tsx and wire it
 * into the catalog (see HANDOFF prompt). Uses the same token language as the
 * rest of the showroom (var(--ds-*), Geist mono eyebrows, hairline borders).
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const SPRING = "cubic-bezier(0.34, 1.3, 0.5, 1)";

type Frames = Keyframe[];

function play(
  el: Element | null | undefined,
  frames: Frames,
  opts: KeyframeAnimationOptions = {},
) {
  if (!el) return null;
  return el.animate(frames, { easing: EASE, fill: "both", ...opts });
}

/* ------------------------------------------------------------------ shells */

function Stage({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex h-[150px] items-center justify-center overflow-hidden border-b border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function Frame({
  index,
  kind,
  title,
  hint,
  className,
  children,
}: {
  index: string;
  kind: string;
  title: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-[12px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]",
        className,
      )}
    >
      {children}
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-4 py-3.5">
        <p className="font-mono text-[11px] uppercase tracking-normal text-[var(--ds-gray-600)]">
          {index} · {kind}
        </p>
        <p className="text-[14px] font-medium text-[var(--ds-gray-1000)]">
          {title}
        </p>
        {hint ? (
          <p className="ml-auto text-[13px] text-[var(--ds-gray-600)]">{hint}</p>
        ) : null}
      </div>
    </article>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full mb-1 flex items-center gap-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--ds-gray-700)]">
        {children}
      </span>
      <span className="h-px flex-1 bg-[var(--ds-gray-alpha-300)]" />
    </div>
  );
}

/* -------------------------------------------------------- 17 · page reveal */

function PageRevealTile() {
  const [on, setOn] = useState(false);
  return (
    <Frame
      className="col-span-full"
      index="17"
      kind="Featured"
      title="Dot-driven page reveal"
      hint="Click Deploy — the dot wipes the box to a new view."
    >
      <Stage className="h-[196px]">
        {/* view A */}
        <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-8">
          <div className="flex items-center gap-2.5">
            <span className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--ds-gray-alpha-600)]" />
            <span className="text-[18px] font-semibold text-[var(--ds-gray-1000)]">
              build #4821 · ready
            </span>
          </div>
          <span className="pl-[19px] font-mono text-[13px] text-[var(--ds-gray-600)]">
            main · 2 commits ahead
          </span>
        </div>
        {/* view B — revealed by the dot */}
        <div
          className="absolute inset-0 flex flex-col justify-center gap-1.5 bg-[var(--ds-background-100)] px-8"
          style={{
            clipPath: on
              ? "circle(150% at 88% 50%)"
              : "circle(0% at 88% 50%)",
            transition: "clip-path 0.55s cubic-bezier(0.7, 0, 0.2, 1)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--ds-green-700)]" />
            <span className="text-[18px] font-semibold text-[var(--ds-gray-1000)]">
              Deployed to production
            </span>
          </div>
          <span className="pl-[19px] font-mono text-[13px] text-[var(--ds-gray-600)]">
            iad1 · live · 320ms
          </span>
        </div>
        {/* the dot-led action button */}
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className="absolute right-7 top-1/2 z-[2] inline-flex h-10 -translate-y-1/2 items-center gap-2.5 rounded-[10px] border border-[var(--ds-gray-alpha-500)] bg-[var(--ds-background-100)] pl-3.5 pr-[15px] font-sans shadow-[0_1px_2px_rgb(0_0_0_/_0.2),inset_0_1px_0_rgb(255_255_255_/_0.05)] outline-none transition hover:border-[var(--ds-gray-alpha-700)] focus-visible:shadow-[var(--ds-focus-ring)]"
        >
          <span
            className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full transition-colors duration-300"
            style={{
              background: on ? "var(--ds-green-700)" : "var(--ds-blue-700)",
            }}
          />
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--ds-gray-1000)]">
            {on ? "Live" : "Deploy"}
          </span>
          <span
            className="inline-flex text-[var(--ds-gray-700)]"
            style={{
              transform: `rotate(${on ? 180 : 0}deg)`,
              transition: `transform 0.42s ${EASE}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7 H10.5 M7.5 3.8 L11 7 L7.5 10.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </Stage>
    </Frame>
  );
}

/* ---------------------------------------------------------- 18 · dot morph */

function DotMorphTile() {
  const [on, setOn] = useState(false);
  return (
    <Frame index="18" kind="Transform" title="Dot → card morph">
      <Stage
        className="cursor-pointer select-none"
        onClick={() => setOn((v) => !v)}
      >
        <div
          className="overflow-hidden border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]"
          style={{
            width: on ? 214 : 132,
            height: on ? 112 : 32,
            borderRadius: on ? 13 : 16,
            boxShadow: on
              ? "0 10px 30px rgb(0 0 0 / 0.2)"
              : "0 1px 2px rgb(0 0 0 / 0.1)",
            transition: `width 0.44s ${SPRING}, height 0.44s ${SPRING}, border-radius 0.44s ${SPRING}, box-shadow 0.44s ease`,
          }}
        >
          <div className="flex h-8 flex-none items-center gap-2.5 px-3.5">
            <span className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--ds-blue-700)]" />
            <span className="whitespace-nowrap text-[13px] font-semibold text-[var(--ds-gray-1000)]">
              Region · iad1
            </span>
          </div>
          <div
            className="flex w-[214px] flex-col gap-2.5 pl-[31px] pr-3.5 pt-0.5"
            style={{
              opacity: on ? 1 : 0,
              transform: on
                ? "translateY(0) scale(1)"
                : "translateY(-7px) scale(0.95)",
              transformOrigin: "top left",
              transition: `opacity 0.3s ease 0.05s, transform 0.44s ${SPRING}`,
            }}
          >
            <div className="h-2 w-[74%] rounded-[5px] bg-[var(--ds-gray-alpha-300)]" />
            <div className="flex items-center gap-2">
              <span className="ds-dot h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--ds-green-700)]" />
              <span className="whitespace-nowrap font-mono text-[11px] text-[var(--ds-gray-700)]">
                all systems healthy
              </span>
            </div>
          </div>
        </div>
      </Stage>
    </Frame>
  );
}

/* --------------------------------------------------------- 19 · glide dot */

const GLIDE_ROWS = ["Overview", "Deployments", "Analytics"];

function GlideTile() {
  const [idx, setIdx] = useState(0);
  return (
    <Frame index="19" kind="Transform" title="Gliding selection dot">
      <Stage>
        <div className="relative w-[186px]">
          <span
            className="ds-dot absolute left-0 h-2 w-2 rounded-full bg-[var(--ds-blue-700)]"
            style={{
              top: idx * 30 + 11,
              transition: `top 0.26s ${SPRING}`,
            }}
          />
          {GLIDE_ROWS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setIdx(i)}
              className="flex h-[30px] w-full select-none items-center pl-[22px] text-left text-[13px] outline-none transition-colors duration-200"
              style={{
                color:
                  idx === i ? "var(--ds-gray-1000)" : "var(--ds-gray-600)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </Stage>
    </Frame>
  );
}

/* ----------------------------------------------------------- 01 · spinner */

function SpinnerTile() {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const trigger = () => {
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1800);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <Frame index="01" kind="Loader" title="Spinner → done">
      <Stage
        className="cursor-pointer select-none"
        onMouseEnter={trigger}
        onClick={trigger}
      >
        <div className="relative flex h-[42px] min-w-[96px] items-center justify-center">
          <div
            className="absolute h-[42px] w-[42px]"
            style={{
              opacity: done ? 0 : 1,
              transform: `scale(${done ? 0.5 : 1})`,
              transition: `opacity 0.25s ease, transform 0.25s ${EASE}`,
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-[var(--ds-gray-alpha-300)]" />
            <div className="absolute inset-0 [animation:ms-spin_0.9s_linear_infinite]">
              <span className="absolute left-1/2 top-[-4px] ml-[-4px] h-[9px] w-[9px] rounded-full bg-[var(--ds-blue-700)]" />
            </div>
          </div>
          <div
            className="absolute flex items-center gap-2.5"
            style={{
              opacity: done ? 1 : 0,
              transform: `translateX(${done ? 0 : -9}px)`,
              transition: `opacity 0.3s ease, transform 0.35s ${SPRING}`,
            }}
          >
            <span className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--ds-blue-700)]" />
            <span className="text-[14px] font-semibold text-[var(--ds-gray-1000)]">
              Done
            </span>
          </div>
        </div>
      </Stage>
    </Frame>
  );
}

/* ------------------------------------------------------------- 03 · pulse */

function PulseTile() {
  return (
    <Frame index="03" kind="Status" title="Pulse indicator">
      <Stage className="gap-2.5">
        <span className="relative h-[13px] w-[13px]">
          <span className="ds-dot absolute inset-0 rounded-full bg-[var(--ds-green-700)]" />
          <span className="absolute inset-0 rounded-full bg-[var(--ds-green-700)] [animation:ms-pulse_1.7s_ease-out_infinite]" />
        </span>
        <span className="font-mono text-[13px] tracking-[0.02em] text-[var(--ds-gray-900)]">
          Live
        </span>
      </Stage>
    </Frame>
  );
}

/* ----------------------------------------------------- 04 · indeterminate */

function IndeterminateTile() {
  return (
    <Frame index="04" kind="Loader" title="Indeterminate">
      <Stage>
        <div className="relative h-1 w-[74%] overflow-hidden rounded-[3px] bg-[var(--ds-gray-alpha-300)]">
          <span className="absolute inset-y-0 left-0 w-[36%] rounded-[3px] bg-[var(--ds-gray-1000)] [animation:ms-indet_1.35s_cubic-bezier(0.65,0,0.35,1)_infinite]" />
        </div>
      </Stage>
    </Frame>
  );
}

/* ---------------------------------------------------------- 05 · progress */

function ProgressTile() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number | undefined>(undefined);
  const trigger = () => {
    const target = 0.72;
    play(
      fillRef.current,
      [{ transform: "scaleX(0)" }, { transform: `scaleX(${target})` }],
      { duration: 700 },
    );
    const node = pctRef.current;
    if (node) {
      window.cancelAnimationFrame(raf.current ?? 0);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 700);
        const e = 1 - Math.pow(1 - p, 3);
        node.textContent = `${Math.round(e * 72)}%`;
        if (p < 1) raf.current = window.requestAnimationFrame(tick);
      };
      raf.current = window.requestAnimationFrame(tick);
    }
  };
  useEffect(() => () => window.cancelAnimationFrame(raf.current ?? 0), []);
  return (
    <Frame index="05" kind="Progress" title="Determinate fill">
      <Stage
        className="cursor-pointer select-none flex-col gap-3.5"
        onMouseEnter={trigger}
        onClick={trigger}
      >
        <div className="relative h-1.5 w-[196px] overflow-hidden rounded-[3px] bg-[var(--ds-gray-alpha-300)]">
          <span
            ref={fillRef}
            className="absolute inset-y-0 left-0 w-full origin-left rounded-[3px] bg-[var(--ds-gray-1000)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <div
          ref={pctRef}
          className="font-mono text-[13px] text-[var(--ds-gray-800)]"
        >
          0%
        </div>
      </Stage>
    </Frame>
  );
}

/* ------------------------------------------------------------- 06 · check */

function CheckTile() {
  const ringRef = useRef<SVGCircleElement>(null);
  const tickRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const trigger = () => {
    play(
      ringRef.current,
      [{ strokeDashoffset: 126 }, { strokeDashoffset: 0 }],
      { duration: 360 },
    );
    play(tickRef.current, [{ strokeDashoffset: 30 }, { strokeDashoffset: 0 }], {
      duration: 240,
      delay: 240,
    });
    play(
      haloRef.current,
      [
        { transform: "scale(0.4)", opacity: 0.5 },
        { transform: "scale(1.5)", opacity: 0 },
      ],
      { duration: 520, delay: 240 },
    );
  };
  return (
    <Frame index="06" kind="Status" title="Success check">
      <Stage
        className="cursor-pointer select-none"
        onMouseEnter={trigger}
        onClick={trigger}
      >
        <div className="relative flex h-[54px] w-[54px] items-center justify-center">
          <span
            ref={haloRef}
            className="absolute h-[54px] w-[54px] rounded-full bg-[var(--ds-green-700)] opacity-0"
          />
          <svg width="54" height="54" viewBox="0 0 44 44" className="relative">
            <circle
              ref={ringRef}
              cx="22"
              cy="22"
              r="20"
              fill="none"
              stroke="var(--ds-green-700)"
              strokeWidth="2"
              strokeDasharray="126"
              strokeDashoffset="0"
              transform="rotate(-90 22 22)"
            />
            <path
              ref={tickRef}
              d="M14 22.5 l5.5 5.5 l10.5 -13"
              fill="none"
              stroke="var(--ds-green-700)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="30"
              strokeDashoffset="0"
            />
          </svg>
        </div>
      </Stage>
    </Frame>
  );
}

/* -------------------------------------------------------------- 08 · copy */

function CopyTile() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const trigger = () => {
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1300);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <Frame index="08" kind="Micro" title="Copy confirm">
      <Stage>
        <button
          type="button"
          onClick={trigger}
          className="inline-flex items-center gap-2.5 rounded-lg border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-[15px] py-2.5 font-sans text-[13px] font-medium text-[var(--ds-gray-1000)] outline-none transition active:scale-[0.96] focus-visible:shadow-[var(--ds-focus-ring)]"
        >
          <span
            className="ds-dot h-2 w-2 shrink-0 rounded-full transition-colors duration-200"
            style={{
              background: copied
                ? "var(--ds-green-700)"
                : "var(--ds-gray-alpha-600)",
            }}
          />
          {copied ? "Copied" : "Copy token"}
        </button>
      </Stage>
    </Frame>
  );
}

/* ------------------------------------------------------------ 09 · dialog */

function DialogTile() {
  const [open, setOpen] = useState(false);
  return (
    <Frame index="09" kind="Transition" title="Dialog enter / exit">
      <Stage>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2.5 rounded-lg border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] px-[15px] py-2.5 font-sans text-[13px] font-medium text-[var(--ds-gray-1000)] outline-none transition focus-visible:shadow-[var(--ds-focus-ring)]"
        >
          Open dialog
        </button>
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 flex items-center justify-center bg-black/50"
          style={{
            opacity: open ? 1 : 0,
            pointerEvents: open ? "auto" : "none",
            transition: "opacity 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[210px] rounded-[11px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-[15px] shadow-[0_14px_40px_rgb(0_0_0_/_0.35)]"
            style={{
              opacity: open ? 1 : 0,
              transform: open
                ? "translateY(0) scale(1)"
                : "translateY(8px) scale(0.97)",
              transition: `transform 0.22s ${EASE}, opacity 0.2s ease`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="ds-dot h-[9px] w-[9px] shrink-0 rounded-full bg-[var(--ds-amber-700)]" />
              <span className="text-[14px] font-semibold text-[var(--ds-gray-1000)]">
                Delete branch?
              </span>
            </div>
            <p className="mb-3.5 mt-2.5 text-[13px] leading-[1.45] text-[var(--ds-gray-700)]">
              This removes{" "}
              <span className="font-mono">feat/motion</span> permanently.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-[7px] border border-[var(--ds-gray-alpha-400)] bg-transparent px-3 py-1.5 font-sans text-[13px] text-[var(--ds-gray-900)] transition hover:bg-[var(--ds-gray-100)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-[7px] border border-[var(--ds-gray-1000)] bg-[var(--ds-gray-1000)] px-3 py-1.5 font-sans text-[13px] font-medium text-[var(--ds-background-100)]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Stage>
    </Frame>
  );
}

/* --------------------------------------------------------- 11 · accordion */

function AccordionTile() {
  const [open, setOpen] = useState(false);
  return (
    <Frame index="11" kind="Transition" title="Expand / collapse">
      <Stage>
        <div className="w-[202px] overflow-hidden rounded-[9px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full select-none items-center gap-2.5 px-3.5 py-3 text-left"
          >
            <span
              className="ds-dot h-2 w-2 shrink-0 rounded-full transition-colors duration-200"
              style={{
                background: open
                  ? "var(--ds-blue-700)"
                  : "var(--ds-gray-alpha-500)",
              }}
            />
            <span className="flex-1 text-[13px] font-medium text-[var(--ds-gray-1000)]">
              Environment
            </span>
            <span
              className="text-[11px] leading-none text-[var(--ds-gray-600)]"
              style={{
                transform: `rotate(${open ? 90 : 0}deg)`,
                transition: `transform 0.22s ${EASE}`,
              }}
            >
              ▶
            </span>
          </button>
          <div
            className="overflow-hidden"
            style={{
              maxHeight: open ? 74 : 0,
              transition: `max-height 0.24s ${EASE}`,
            }}
          >
            <div className="flex flex-col gap-1.5 pb-3 pl-[31px] pr-3.5">
              <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                NODE_ENV = production
              </span>
              <span className="font-mono text-[11px] text-[var(--ds-gray-700)]">
                REGION = iad1
              </span>
            </div>
          </div>
        </div>
      </Stage>
    </Frame>
  );
}

/* ----------------------------------------------------------- 12 · reveal */

function SkeletonRevealTile() {
  const skelRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);
  const trigger = () => {
    play(
      skelRef.current,
      [
        { opacity: 1, offset: 0 },
        { opacity: 1, offset: 0.55 },
        { opacity: 0, offset: 1 },
      ],
      { duration: 1000 },
    );
    play(
      realRef.current,
      [
        { opacity: 0, transform: "translateY(6px)", offset: 0 },
        { opacity: 0, transform: "translateY(6px)", offset: 0.5 },
        { opacity: 1, transform: "translateY(0)", offset: 1 },
      ],
      { duration: 1000 },
    );
  };
  return (
    <Frame index="12" kind="Reveal" title="Skeleton → content">
      <Stage
        className="cursor-pointer select-none"
        onMouseEnter={trigger}
        onClick={trigger}
      >
        <div className="relative h-[42px] w-[196px]">
          <div ref={skelRef} className="absolute inset-0 flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--ds-gray-alpha-300)]">
              <span className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--ds-background-100)] to-transparent [animation:ms-shimmer_1.5s_ease-in-out_infinite]" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-[9px] w-[78%] rounded-[5px] bg-[var(--ds-gray-alpha-300)]" />
              <div className="h-[9px] w-[52%] rounded-[5px] bg-[var(--ds-gray-alpha-300)]" />
            </div>
          </div>
          <div
            ref={realRef}
            className="absolute inset-0 flex items-center gap-3 opacity-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ds-gray-alpha-200)]">
              <span className="ds-dot h-[9px] w-[9px] rounded-full bg-[var(--ds-blue-700)]" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-[13px] font-semibold text-[var(--ds-gray-1000)]">
                Ada Lovelace
              </span>
              <span className="font-mono text-[11px] text-[var(--ds-gray-600)]">
                ada · online
              </span>
            </div>
          </div>
        </div>
      </Stage>
    </Frame>
  );
}

/* ----------------------------------------------------------- 13 · countup */

function CountUpTile() {
  const numRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const raf = useRef<number | undefined>(undefined);
  const trigger = () => {
    const node = numRef.current;
    if (node) {
      window.cancelAnimationFrame(raf.current ?? 0);
      const target = 1284;
      const dur = 950;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(e * target).toLocaleString();
        if (p < 1) raf.current = window.requestAnimationFrame(tick);
      };
      raf.current = window.requestAnimationFrame(tick);
    }
    play(
      ringRef.current,
      [{ strokeDashoffset: 151 }, { strokeDashoffset: 42 }],
      { duration: 950 },
    );
  };
  useEffect(() => () => window.cancelAnimationFrame(raf.current ?? 0), []);
  return (
    <Frame index="13" kind="Data" title="Count up">
      <Stage
        className="cursor-pointer select-none gap-[15px]"
        onMouseEnter={trigger}
        onClick={trigger}
      >
        <div className="relative h-[50px] w-[50px]">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="24"
              fill="none"
              stroke="var(--ds-gray-alpha-300)"
              strokeWidth="2"
            />
            <circle
              ref={ringRef}
              cx="25"
              cy="25"
              r="24"
              fill="none"
              stroke="var(--ds-blue-700)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="151"
              strokeDashoffset="42"
              transform="rotate(-90 25 25)"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-px">
          <span
            ref={numRef}
            className="text-[26px] font-semibold leading-none text-[var(--ds-gray-1000)] [font-variant-numeric:tabular-nums]"
          >
            1,284
          </span>
          <span className="font-mono text-[11px] text-[var(--ds-gray-600)]">
            requests / s
          </span>
        </div>
      </Stage>
    </Frame>
  );
}

/* --------------------------------------------------------------- showcase */

export function MotionShowcase() {
  return (
    <div>
      <style>{`
        @keyframes ms-spin { to { transform: rotate(360deg); } }
        @keyframes ms-pulse { 0% { transform: scale(1); opacity: 0.45; } 100% { transform: scale(3.4); opacity: 0; } }
        @keyframes ms-indet { 0% { transform: translateX(-130%); } 100% { transform: translateX(360%); } }
        @keyframes ms-shimmer { 0% { transform: translateX(-170%); } 100% { transform: translateX(280%); } }
        @media (prefers-reduced-motion: reduce) {
          [class*="animation:ms-"] { animation: none !important; }
        }
      `}</style>
      <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
        <GroupLabel>Dot-driven transforms</GroupLabel>
        <PageRevealTile />
        <DotMorphTile />
        <GlideTile />

        <GroupLabel>The kit</GroupLabel>
        <SpinnerTile />
        <PulseTile />
        <IndeterminateTile />
        <ProgressTile />
        <CheckTile />
        <CopyTile />
        <DialogTile />
        <AccordionTile />
        <SkeletonRevealTile />
        <CountUpTile />
      </div>
    </div>
  );
}

export default MotionShowcase;
