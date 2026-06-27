"use client";

// LiveTrainingTerminal — a light "lab instrument" card for a long-running job
// (ML training, a deploy, a batch). It answers two questions at a glance:
// "is it healthy?" and "when does it finish?". Hero = a live LOSS waveform; a
// health verdict drives one accent color (color is signal only); a heartbeat
// proves liveness; the raw stdout line stays as the authentic terminal artifact.
//
// Self-contained: keyframes injected inline, tokens carry fallbacks, color stays
// a signal (numbers are near-black; green/amber/red mean something). Drop in a
// `live` object, or use `useSimulatedTraining()` for a backend-free demo.
//
//   const live = useSimulatedTraining();
//   <LiveTrainingTerminal live={live} />
import { useEffect, useId, useMemo, useRef, useState } from "react";

// ---------------------------------------------------------------- types
export type LiveTraining = {
  /** literal stdout / tqdm line, rendered verbatim under the bar */
  raw?: string;
  epoch?: number;
  totalEpochs?: number;
  /** percent within the current epoch, 0–100 */
  pct?: number;
  step?: number;
  totalSteps?: number;
  /** "mm:ss" elapsed within the epoch */
  elapsed?: string;
  /** "mm:ss" eta within the epoch */
  eta?: string;
  /** iterations per second */
  its?: number;
  loss?: number | string;
  lr?: number | string;
} | null;

// ---------------------------------------------------------------- tokens (with fallbacks)
const T = {
  surface: "var(--ds-gray-100, #f2f2f2)",
  raised: "var(--ds-background-100, #ffffff)",
  sunken: "var(--ds-background-200, #fafafa)",
  line: "var(--ds-gray-alpha-300, rgba(0,0,0,0.10))",
  hair: "var(--ds-gray-alpha-200, rgba(0,0,0,0.06))",
  track: "var(--ds-gray-alpha-200, rgba(0,0,0,0.08))",
  muted: "var(--ds-gray-900, #3a3a3a)",
  text: "var(--ds-gray-900, #3a3a3a)",
  ink: "var(--ds-gray-1000, #171717)",
  red: "var(--ds-red-700, #e5484d)",
  amber: "var(--ds-amber-700, #f5a623)",
  green: "var(--ds-green-700, #46a758)",
  blue: "var(--ds-blue-700, #0072f5)",
  teal: "var(--ds-teal-700, #14b8a6)",
  mono: "var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
};

const KEYFRAMES = `
@keyframes lttBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
@keyframes lttShimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes lttPing { 0%{transform:scale(1);opacity:.5} 80%,100%{transform:scale(2.6);opacity:0} }
@keyframes lttTick { 0%{transform:translateY(0)} 50%{transform:translateY(-1px)} 100%{transform:translateY(0)} }
.ltt-blink{ animation: lttBlink 1s step-end infinite; }
.ltt-shimmer{ animation: lttShimmer 2.4s linear infinite; }
.ltt-ping{ animation: lttPing .95s ease-out; }
.ltt-tick{ animation: lttTick .4s ease; }
@media (prefers-reduced-motion: reduce){ .ltt-blink,.ltt-shimmer,.ltt-ping,.ltt-tick{ animation:none } }
`;

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

function fmtDur(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return "—";
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const p = (x: number) => String(x).padStart(2, "0");
  return d > 0 ? `${d}d ${p(h)}:${p(m)}` : `${p(h)}:${p(m)}:${p(s)}`;
}

// ---------------------------------------------------------------- loss waveform
// The hero. A number tells you "where"; the line tells you "which way" — the only
// question that matters while training. High loss sits high; a healthy run slopes
// down toward the floor.
function LossWave({ data, color }: { data: number[]; color: string }) {
  const gid = useId().replace(/[:]/g, "");
  const W = 260;
  const H = 56;
  const P = 5;

  if (data.length < 2) {
    return (
      <div className="h-14 w-full">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
          <line
            x1={0}
            y1={H - P}
            x2={W}
            y2={H - P}
            stroke={T.hair}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = P + (i / (data.length - 1)) * (W - 2 * P);
    const y = P + (1 - (v - min) / span) * (H - 2 * P);
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${P},${H - P} ${line} ${W - P},${H - P}`;
  const [lx, ly] = pts[pts.length - 1];

  // The line/area stretch to fill the width (preserveAspectRatio="none"), which
  // would squash an SVG circle into an ellipse — so the end marker is a plain
  // HTML dot positioned by percentage: always perfectly round.
  return (
    <div className="relative h-14 w-full">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`g${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#g${gid})`} />
        <polyline
          points={line}
          fill="none"
          stroke={color}
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${(lx / W) * 100}%`,
          top: `${(ly / H) * 100}%`,
          background: color,
          boxShadow: `0 0 0 3px ${color}24`,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------- component
export function LiveTrainingTerminal({
  live,
  host = "trainer@gpu0",
  itsTarget = "2–3",
}: {
  live: LiveTraining;
  host?: string;
  itsTarget?: string;
}) {
  const paused = !live || live.epoch === undefined;
  const its = num(live?.its) ?? 0;
  const epoch = num(live?.epoch) ?? 0;
  const totalEpochs = num(live?.totalEpochs) ?? 0;
  const step = num(live?.step) ?? 0;
  const totalSteps = num(live?.totalSteps) ?? 0;
  const pct = num(live?.pct) ?? 0;
  const loss = num(live?.loss);

  // ---- loss history (drives the waveform + trend verdict)
  const [lossHist, setLossHist] = useState<number[]>([]);
  useEffect(() => {
    if (loss !== null) {
      setLossHist((h) => {
        const n = [...h, loss];
        return n.length > 56 ? n.slice(-56) : n;
      });
    }
  }, [loss]);

  // ---- loss delta arrow
  const prevLoss = useRef<number | null>(null);
  const [lossDelta, setLossDelta] = useState(0);
  useEffect(() => {
    if (loss !== null && prevLoss.current !== null) setLossDelta(loss - prevLoss.current);
    if (loss !== null) prevLoss.current = loss;
  }, [loss]);

  // ---- liveness: a long-running panel must prove it isn't frozen
  const lastUpdate = useRef(0);
  const [stale, setStale] = useState(false);
  useEffect(() => {
    lastUpdate.current = typeof performance !== "undefined" ? performance.now() : 0;
    setStale(false);
  }, [step, loss, its]);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const now = typeof performance !== "undefined" ? performance.now() : 0;
      setStale(now - lastUpdate.current > 3500);
    }, 1000);
    return () => clearInterval(id);
  }, [paused]);

  // ---- est. finish odometer: re-synced to telemetry, ticking down locally
  const serverEta = useMemo(() => {
    if (paused || its <= 0 || totalSteps <= 0) return null;
    const stepsLeft = (totalEpochs - epoch - 1) * totalSteps + (totalSteps - step);
    return Math.max(0, stepsLeft) / its;
  }, [paused, its, totalEpochs, epoch, totalSteps, step]);
  const [eta, setEta] = useState<number | null>(serverEta);
  useEffect(() => setEta(serverEta), [serverEta]);
  useEffect(() => {
    if (eta === null) return;
    const id = setInterval(() => setEta((e) => (e === null ? null : Math.max(0, e - 1))), 1000);
    return () => clearInterval(id);
  }, [eta === null]);

  // ---- health verdict (the one thing color is allowed to say)
  const [lo, hi] = useMemo<[number | null, number | null]>(() => {
    const m = itsTarget.match(/([\d.]+)\s*[–-]\s*([\d.]+)/);
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : [null, null];
  }, [itsTarget]);

  const itsOk = lo === null || hi === null || (its >= lo && its <= hi);
  const trendDown =
    lossHist.length >= 5 && lossHist[lossHist.length - 1] < lossHist[lossHist.length - 5];
  const diverging =
    (loss !== null && !Number.isFinite(loss)) ||
    (lossHist.length >= 6 && lossHist[lossHist.length - 1] > lossHist[0] * 1.03 && !trendDown);

  const health = paused
    ? { c: T.muted, label: "paused" }
    : stale
      ? { c: T.red, label: "stalled" }
      : diverging
        ? { c: T.red, label: "diverging" }
        : !itsOk || (lossHist.length >= 5 && !trendDown)
          ? { c: T.amber, label: "watch" }
          : { c: T.green, label: "healthy" };

  const overallPct = totalEpochs > 0 ? ((epoch + pct / 100) / totalEpochs) * 100 : 0;
  const finishAt = eta !== null ? new Date(Date.now() + eta * 1000) : null;
  const cleanRaw = live?.raw ? live.raw.replace(/\^\[?\[?[A-Z]|\^\[O[A-Z]/g, "").trim() : "";

  return (
    <div
      className="relative isolate overflow-hidden rounded-xl border p-5 sm:p-6"
      style={{
        background: T.surface,
        borderColor: T.line,
        fontFamily: T.mono,
        opacity: paused ? 0.7 : 1,
        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.6)`,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* instrument atmosphere — a faint hairline grid that fades from the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(${T.hair} 1px, transparent 1px), linear-gradient(90deg, ${T.hair} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          WebkitMaskImage: "radial-gradient(130% 90% at 50% -10%, #000 35%, transparent 100%)",
          maskImage: "radial-gradient(130% 90% at 50% -10%, #000 35%, transparent 100%)",
        }}
      />
      {/* a soft wash of the health color behind the hero, so the verdict is felt before it's read */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(70% 60% at 14% 34%, ${health.c}1f, transparent 60%)` }}
      />

      {/* ── chrome ── */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {[T.red, T.amber, T.green].map((c) => (
            <span key={c} className="h-3 w-3 rounded-full" style={{ background: c, opacity: 0.55 }} />
          ))}
          {/* heartbeat — pings on every telemetry tick; if it stops, the run is frozen */}
          <span className="relative ml-1 inline-flex h-2.5 w-2.5 shrink-0">
            {!paused && (
              <span
                key={step}
                className="ltt-ping absolute inset-0 rounded-full"
                style={{ background: health.c }}
              />
            )}
            <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: health.c }} />
          </span>
          <span className="ml-1 truncate text-[12px]" style={{ color: T.text }}>
            {host} · epoch {epoch}/{totalEpochs || "—"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium tracking-wide"
            style={{ borderColor: `${health.c}55`, color: health.c, background: `${health.c}12` }}
          >
            {health.label}
          </span>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
              est. finish
            </div>
            <div className="text-[15px] font-semibold tabular-nums" style={{ color: T.ink }}>
              {paused ? "paused" : fmtDur(eta ?? 0)}
            </div>
          </div>
        </div>
      </div>

      {/* ── hero: loss number + live waveform ── */}
      <div className="mb-5 grid grid-cols-1 items-end gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
            loss
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className="font-semibold tabular-nums text-5xl leading-none sm:text-6xl"
              style={{ color: T.ink }}
            >
              {loss !== null ? loss.toFixed(3) : "—"}
            </span>
            {lossDelta !== 0 && (
              <span
                className="text-[13px] font-medium tabular-nums"
                style={{ color: lossDelta < 0 ? T.green : T.red }}
              >
                {lossDelta < 0 ? "▼" : "▲"} {Math.abs(lossDelta).toFixed(3)}
              </span>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <LossWave data={lossHist} color={health.c} />
        </div>
      </div>

      {/* ── secondary telemetry strip ── */}
      <div
        className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y py-2.5 text-[12px]"
        style={{ borderColor: T.hair, color: T.text }}
      >
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
            it/s
          </span>
          <span
            className={`font-semibold tabular-nums ${!paused ? "ltt-tick" : ""}`}
            key={`its-${step}`}
            style={{ color: itsOk ? T.ink : T.amber }}
          >
            {its.toFixed(2)}
          </span>
          <span style={{ color: T.muted }}>· target {itsTarget}</span>
        </span>
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
            lr
          </span>
          <span className="tabular-nums" style={{ color: T.text }}>
            {String(live?.lr ?? "—")}
          </span>
        </span>
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
            elapsed
          </span>
          <span className="tabular-nums">{live?.elapsed ?? "—"}</span>
        </span>
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>
            eta/epoch
          </span>
          <span className="tabular-nums">{live?.eta ?? "—"}</span>
        </span>
      </div>

      {/* ── progress: this epoch (loud) over the whole run (quiet) ── */}
      <div className="mb-4 space-y-2">
        <div>
          <div
            className="relative h-[10px] w-full overflow-hidden rounded-full"
            style={{ background: T.track }}
          >
            <div
              className="ltt-shimmer absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${T.blue}, ${T.teal})`,
                backgroundSize: "200% 100%",
                transition: "width 700ms ease",
              }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px]" style={{ color: T.text }}>
            <span>{paused ? "idle" : `epoch step ${step}/${totalSteps}`}</span>
            <span className="tabular-nums">{pct.toFixed(1)}%</span>
          </div>
        </div>

        <div>
          <div className="relative h-[3px] w-full overflow-hidden rounded-full" style={{ background: T.track }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${overallPct}%`, background: T.muted, transition: "width 700ms ease" }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[11px]" style={{ color: T.muted }}>
            <span className="tabular-nums">overall {overallPct.toFixed(1)}%</span>
            <span>
              finish ≈{" "}
              <span style={{ color: T.text }}>
                {finishAt
                  ? finishAt.toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ── raw stdout — the authentic artifact, kept verbatim ── */}
      <div
        className="overflow-x-auto whitespace-pre rounded-md px-3 py-2 text-[12px] leading-relaxed"
        style={{ background: T.sunken, border: `1px solid ${T.hair}`, color: T.muted }}
      >
        <span style={{ color: T.green }}>❯ </span>
        {cleanRaw || "waiting for stdout…"}
        {!paused && (
          <span className="ltt-blink" style={{ color: T.ink }}>
            ▋
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- demo driver
/**
 * Drives a LiveTrainingTerminal with no backend — emits realistic, smoothly-updating
 * telemetry (advancing steps/epochs, jittering it/s, decaying loss). For demos / catalogs.
 */
export function useSimulatedTraining(opts?: { totalEpochs?: number; totalSteps?: number }): LiveTraining {
  const totalEpochs = opts?.totalEpochs ?? 999;
  const totalSteps = opts?.totalSteps ?? 425;
  const [state, setState] = useState({ epoch: 2, step: 0, its: 2.1, loss: 0.42, t: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setState((s) => {
        let step = s.step + 1;
        let epoch = s.epoch;
        if (step > totalSteps) {
          step = 1;
          epoch += 1;
        }
        // it/s wobbles around 2.1; loss decays with a little noise (deterministic-ish)
        const its = 2.1 + 0.18 * Math.sin(s.t / 3);
        const loss = Math.max(0.06, s.loss - 0.0009 + 0.0016 * Math.sin(s.t / 1.7));
        return { epoch, step, its, loss, t: s.t + 1 };
      });
    }, 700);
    return () => clearInterval(id);
  }, [totalSteps]);

  const { epoch, step, its, loss } = state;
  const pct = (step / totalSteps) * 100;
  const secLeftEpoch = (totalSteps - step) / its;
  const secElapsedEpoch = step / its;
  const mmss = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const bar = (() => {
    const w = 24,
      filled = Math.round((pct / 100) * w);
    return "█".repeat(filled) + " ".repeat(w - filled);
  })();
  return {
    epoch,
    totalEpochs,
    step,
    totalSteps,
    pct,
    its,
    loss,
    lr: "2.0e-04",
    elapsed: mmss(secElapsedEpoch),
    eta: mmss(secLeftEpoch),
    raw: `epoch ${epoch}/${totalEpochs}: ${pct.toFixed(0).padStart(3)}%|${bar}| ${step}/${totalSteps} [${mmss(secElapsedEpoch)}<${mmss(secLeftEpoch)}, ${its.toFixed(2)}it/s, loss=${loss.toFixed(3)}, lr=2.0e-04]`,
  };
}
