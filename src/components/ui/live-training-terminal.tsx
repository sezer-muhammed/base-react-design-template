"use client";

// LiveTrainingTerminal — a faux-terminal "mission-control" card for a long-running
// job (ML training, a deploy, a batch). Shows a live it/s · loss telemetry row, a
// shimmering progress bar, a stat strip, the raw stdout line with a blinking cursor,
// and a smoothly-counting-down "est. finish" odometer.
//
// Fully self-contained: keyframes are injected inline, design tokens carry hex
// fallbacks so it renders correctly even outside this design system. Drop in a `live`
// object, or use `useSimulatedTraining()` for a live demo with no backend.
//
//   const live = useSimulatedTraining();        // or your real telemetry
//   <LiveTrainingTerminal live={live} />
import { useEffect, useMemo, useRef, useState } from "react";

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
  surface: "var(--ds-gray-100, #0c0c0c)",
  line: "var(--ds-gray-alpha-300, rgba(255,255,255,0.10))",
  track: "var(--ds-gray-alpha-400, rgba(255,255,255,0.14))",
  muted: "var(--ds-gray-600, #8f8f8f)",
  text: "var(--ds-gray-700, #a0a0a0)",
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
.ltt-blink{ animation: lttBlink 1s step-end infinite; }
.ltt-shimmer{ animation: lttShimmer 2.4s linear infinite; }
@media (prefers-reduced-motion: reduce){ .ltt-blink,.ltt-shimmer{ animation:none } }
`;

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

function fmtDur(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return "—";
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  const p = (x: number) => String(x).padStart(2, "0");
  return d > 0 ? `${d}d ${p(h)}:${p(m)}` : `${p(h)}:${p(m)}:${p(s)}`;
}

// ---------------------------------------------------------------- telemetry cell
function Cell({ label, value, color, target, delta, small }: {
  label: string; value: string; color: string; target?: string; delta?: number; small?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>{label}</div>
      <div className={`font-semibold tabular-nums ${small ? "text-xl" : "text-4xl sm:text-5xl"}`} style={{ color }}>
        {value}
      </div>
      <div className="mt-0.5 h-4 text-[11px]">
        {target && <span style={{ color: T.muted }}>target {target}</span>}
        {delta !== undefined && delta !== 0 && (
          <span style={{ color: delta < 0 ? T.green : T.red }}>
            {delta < 0 ? " ▼" : " ▲"} {Math.abs(delta).toFixed(3)}
          </span>
        )}
      </div>
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

  // overall ETA to the final epoch, re-synced to telemetry, ticking locally each second
  const serverEta = useMemo(() => {
    if (paused || its <= 0 || totalSteps <= 0) return null;
    const stepsLeft = (totalEpochs - epoch - 1) * totalSteps + (totalSteps - step);
    return Math.max(0, stepsLeft) / its;
  }, [paused, its, totalEpochs, epoch, totalSteps, step]);

  const [eta, setEta] = useState<number | null>(serverEta);
  const prevLoss = useRef<number | null>(null);
  const [lossDelta, setLossDelta] = useState(0);

  useEffect(() => { setEta(serverEta); }, [serverEta]);
  useEffect(() => {
    if (eta === null) return;
    const id = setInterval(() => setEta((e) => (e === null ? null : Math.max(0, e - 1))), 1000);
    return () => clearInterval(id);
  }, [eta === null]);
  useEffect(() => {
    if (loss !== null && prevLoss.current !== null) setLossDelta(loss - prevLoss.current);
    if (loss !== null) prevLoss.current = loss;
  }, [loss]);

  const finishAt = eta !== null ? new Date(Date.now() + eta * 1000) : null;
  const cleanRaw = live?.raw ? live.raw.replace(/\^\[?\[?[A-Z]|\^\[O[A-Z]/g, "").trim() : "";

  return (
    <div
      className="relative overflow-hidden rounded-xl border p-5 sm:p-6"
      style={{ background: T.surface, borderColor: T.line, fontFamily: T.mono, opacity: paused ? 0.6 : 1, boxShadow: `inset 0 1px 0 0 ${T.line}` }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* chrome */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {[T.red, T.amber, T.green].map((c) => (
            <span key={c} className="h-3 w-3 rounded-full" style={{ background: c, opacity: 0.6 }} />
          ))}
          <span className="ml-2 truncate text-[12px]" style={{ color: T.text }}>
            {host} — epoch {epoch}/{totalEpochs || "—"}
          </span>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: T.muted }}>est. finish</div>
          <div className="text-[15px] font-semibold tabular-nums" style={{ color: T.teal }}>
            {paused ? "paused" : fmtDur(eta ?? 0)}
          </div>
        </div>
      </div>

      {/* telemetry */}
      <div className="mb-5 grid grid-cols-3 gap-4">
        <Cell label="it / s" value={its.toFixed(2)} color={T.green} target={itsTarget} />
        <Cell label="loss" value={loss !== null ? loss.toFixed(3) : "—"} color={T.blue} delta={lossDelta} />
        <Cell label="lr" value={String(live?.lr ?? "—")} color={T.text} small />
      </div>

      {/* progress bar */}
      <div className="mb-3">
        <div className="relative h-[10px] w-full overflow-hidden rounded-full" style={{ background: T.track }}>
          <div
            className="ltt-shimmer absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${T.blue}, ${T.teal})`,
              backgroundSize: "200% 100%",
              boxShadow: `0 0 10px 0 ${T.teal}`,
              transition: "width 700ms ease",
            }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px]" style={{ color: T.text }}>
          <span>{paused ? "idle" : `step ${step}/${totalSteps}`}</span>
          <span className="tabular-nums">{pct.toFixed(1)}%</span>
        </div>
      </div>

      {/* stat strip */}
      <div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px]" style={{ color: T.text }}>
        <span>elapsed {live?.elapsed ?? "—"}</span><span style={{ color: T.muted }}>│</span>
        <span>eta/epoch {live?.eta ?? "—"}</span><span style={{ color: T.muted }}>│</span>
        <span>{its.toFixed(2)} it/s</span><span style={{ color: T.muted }}>│</span>
        <span>finish ≈ {finishAt ? finishAt.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "—"}</span>
      </div>

      {/* raw echo */}
      <div className="overflow-x-auto whitespace-pre text-[12px] leading-relaxed" style={{ color: T.muted }}>
        <span style={{ color: T.green }}>❯ </span>
        {cleanRaw || "waiting for stdout…"}
        {!paused && <span className="ltt-blink">▋</span>}
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
        if (step > totalSteps) { step = 1; epoch += 1; }
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
  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const bar = (() => {
    const w = 24, filled = Math.round((pct / 100) * w);
    return "█".repeat(filled) + " ".repeat(w - filled);
  })();
  return {
    epoch, totalEpochs, step, totalSteps, pct, its, loss, lr: "2.0e-04",
    elapsed: mmss(secElapsedEpoch), eta: mmss(secLeftEpoch),
    raw: `epoch ${epoch}/${totalEpochs}: ${pct.toFixed(0).padStart(3)}%|${bar}| ${step}/${totalSteps} [${mmss(secElapsedEpoch)}<${mmss(secLeftEpoch)}, ${its.toFixed(2)}it/s, loss=${loss.toFixed(3)}, lr=2.0e-04]`,
  };
}
