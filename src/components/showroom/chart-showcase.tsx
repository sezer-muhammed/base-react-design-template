"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Activity, Layers3 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { StatusSignal } from "@/components/ui/status-signal";
import {
  InteractiveConfusionMatrix,
  InteractiveGroupedBarChart,
  InteractiveLineChart,
  InteractiveScatterChart,
  chartPalette,
} from "@/components/ui/interactive-charts";

type SignalKey = "inbound" | "queued" | "resolved";

type SignalDatum = {
  inbound: number;
  label: string;
  queued: number;
  resolved: number;
  [key: string]: number | string;
};

type SignalRange = "30d" | "90d" | "12m";

const signalDataByRange: Record<SignalRange, SignalDatum[]> = {
  "30d": [
    { label: "W1", inbound: 48, resolved: 41, queued: 16 },
    { label: "W2", inbound: 55, resolved: 49, queued: 14 },
    { label: "W3", inbound: 62, resolved: 54, queued: 19 },
    { label: "W4", inbound: 68, resolved: 61, queued: 13 },
  ],
  "90d": [
    { label: "Apr", inbound: 51, resolved: 49, queued: 11 },
    { label: "May", inbound: 78, resolved: 61, queued: 22 },
    { label: "Jun", inbound: 83, resolved: 72, queued: 19 },
    { label: "Jul", inbound: 74, resolved: 68, queued: 13 },
  ],
  "12m": [
    { label: "Jan", inbound: 42, resolved: 28, queued: 14 },
    { label: "Feb", inbound: 58, resolved: 44, queued: 18 },
    { label: "Mar", inbound: 64, resolved: 52, queued: 16 },
    { label: "Apr", inbound: 51, resolved: 49, queued: 11 },
    { label: "May", inbound: 78, resolved: 61, queued: 22 },
    { label: "Jun", inbound: 83, resolved: 72, queued: 19 },
    { label: "Jul", inbound: 74, resolved: 68, queued: 13 },
    { label: "Aug", inbound: 82, resolved: 75, queued: 17 },
    { label: "Sep", inbound: 88, resolved: 79, queued: 15 },
    { label: "Oct", inbound: 81, resolved: 77, queued: 12 },
    { label: "Nov", inbound: 91, resolved: 84, queued: 14 },
    { label: "Dec", inbound: 86, resolved: 82, queued: 10 },
  ],
};

const signalRangeOptions: Array<{ label: string; value: SignalRange }> = [
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "12M", value: "12m" },
];

const signalSeries = [
  { area: true, color: chartPalette.blue, key: "inbound", label: "Inbound" },
  { area: true, color: chartPalette.teal, key: "resolved", label: "Resolved" },
  { color: chartPalette.gray, dash: "5 6", key: "queued", label: "Queued" },
] satisfies Array<{
  area?: boolean;
  color: string;
  dash?: string;
  key: SignalKey;
  label: string;
}>;

const barData = [
  { label: "API", planned: 34, live: 25 },
  { label: "Push", planned: 26, live: 21 },
  { label: "Pull", planned: 31, live: 18 },
  { label: "Jobs", planned: 22, live: 16 },
  { label: "RT", planned: 19, live: 12 },
];

const latencyData = [
  { label: "00", p50: 112, p95: 241 },
  { label: "04", p50: 128, p95: 260 },
  { label: "08", p50: 98, p95: 214 },
  { label: "12", p50: 134, p95: 278 },
  { label: "16", p50: 118, p95: 249 },
  { label: "20", p50: 104, p95: 226 },
];

const scatterData = [
  { actual: -4, name: "case-001.nii", predicted: -2 },
  { actual: 6, name: "case-014.nii", predicted: 9 },
  { actual: 18, name: "case-021.nii", predicted: 16 },
  { actual: 24, name: "case-034.nii", predicted: 31 },
  { actual: 39, name: "case-052.nii", predicted: 35 },
  { actual: 46, name: "case-063.nii", predicted: 56 },
  { actual: 58, name: "case-077.nii", predicted: 51 },
  { actual: 73, name: "case-088.nii", predicted: 79 },
  { actual: 86, name: "case-101.nii", predicted: 91 },
  { actual: 102, name: "case-117.nii", predicted: 96 },
  { actual: 116, name: "case-128.nii", predicted: 124 },
  { actual: 127, name: "case-144.nii", predicted: 119 },
];

const confusionLabels = ["Low", "Border", "High"];

const confusionMatrix = [
  [42, 4, 1],
  [6, 38, 3],
  [1, 5, 31],
];

export function ChartShowcase() {
  const [signalRange, setSignalRange] = useState<SignalRange>("12m");
  const [visibleSignals, setVisibleSignals] = useState<SignalKey[]>([
    "inbound",
    "resolved",
    "queued",
  ]);
  const activeSignalData = signalDataByRange[signalRange];
  const activeSignalSeries = useMemo(
    () => signalSeries.filter((item) => visibleSignals.includes(item.key)),
    [visibleSignals],
  );
  const signalDomain = useMemo(
    () => getSignalDomain(activeSignalData, activeSignalSeries),
    [activeSignalData, activeSignalSeries],
  );
  const toggleSignal = (key: SignalKey) => {
    setVisibleSignals((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((item) => item !== key);
      }

      return [...current, key];
    });
  };

  return (
    <div className="grid gap-3 xl:grid-cols-[1fr_380px]">
      <Surface
        className="overflow-hidden"
        data-component-id="CHART-01"
        id="chart-01-composed-signal"
        tone="flat"
      >
        <SectionHeader
          action={
            <>
                <ComponentIdBadge id="CHART-01" />
                <SignalPill color={chartPalette.blue}>Recharts primary</SignalPill>
            </>
          }
          eyebrow="Charts"
          summary="Responsive Recharts primitives with soft gridlines, neutral surfaces, custom tooltip, and status color as signal only."
          title="Operational signal chart"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ds-gray-alpha-300)] px-4 py-2">
          <div className="flex items-center gap-1 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-1">
            {signalRangeOptions.map((option) => (
              <button
                aria-pressed={signalRange === option.value}
                className={`h-7 rounded-[5px] px-2.5 font-mono text-[11px] font-medium transition ${
                  signalRange === option.value
                    ? "bg-[var(--ds-gray-1000)] text-[var(--ds-background-100)]"
                    : "text-[var(--ds-gray-700)] hover:bg-[var(--ds-gray-100)] hover:text-[var(--ds-gray-1000)]"
                }`}
                key={option.value}
                onClick={() => setSignalRange(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {signalSeries.map((item) => {
              const isActive = visibleSignals.includes(item.key);

              return (
                <button
                  aria-pressed={isActive}
                  className={`inline-flex h-7 items-center gap-1.5 rounded-[6px] border px-2 font-mono text-[11px] transition ${
                    isActive
                      ? "border-[var(--ds-gray-alpha-500)] bg-[var(--ds-background-100)] text-[var(--ds-gray-1000)]"
                      : "border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] text-[var(--ds-gray-600)] opacity-70"
                  }`}
                  key={item.key}
                  onClick={() => toggleSignal(item.key)}
                  type="button"
                >
                  <StatusDot color={item.color} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="p-4">
          <div className="h-[390px] min-w-0 overflow-hidden">
            <InteractiveLineChart
              ariaLabel="Operational signal chart"
              data={activeSignalData}
              height={390}
              maxValue={signalDomain[1]}
              minValue={signalDomain[0]}
              series={activeSignalSeries}
              showLegend
            />
          </div>
        </div>
      </Surface>

      <div className="grid gap-3">
        <ChartDecisionCard />
        <Card data-component-id="CHART-02" depth="base" id="chart-02-latency-line">
          <CardHeader
            action={
              <div className="flex items-center gap-2">
                <ComponentIdBadge id="CHART-02" />
                <Activity aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
              </div>
            }
          >
            <CardTitle>Compact latency line</CardTitle>
            <CardDescription>
              Small charts should stay quiet: no loud fills, no oversized legend.
            </CardDescription>
          </CardHeader>
          <div className="h-[150px] min-w-0 overflow-hidden">
            <InteractiveLineChart
              ariaLabel="Compact latency line chart"
              data={latencyData}
              height={150}
              maxValue={300}
              series={[
                { color: chartPalette.amber, key: "p95", label: "p95" },
                { color: chartPalette.gray, key: "p50", label: "p50" },
              ]}
              hideYAxis
              valueFormatter={(value) => `${value} ms`}
            />
          </div>
        </Card>
      </div>

      <Surface
        className="overflow-hidden xl:col-span-2"
        data-component-id="CHART-03"
        id="chart-03-bar-matrix"
        tone="flat"
      >
        <div className="grid gap-4 p-4 lg:grid-cols-[360px_1fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ComponentIdBadge id="CHART-03" />
              <SignalPill color={chartPalette.purple}>bar matrix</SignalPill>
            </div>
            <h3 className="mt-4 text-[18px] font-semibold">Bar graph direction</h3>
            <p className="mt-1 max-w-md text-[13px] leading-5 text-[var(--ds-gray-900)]">
              Bars should feel like measured instrumentation, not black blocks.
              Use neutral rails, one primary signal, and a softer comparison series.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalPill color={chartPalette.green}>live</SignalPill>
              <SignalPill color={chartPalette.blue}>planned</SignalPill>
              <SignalPill color={chartPalette.green}>interactive</SignalPill>
            </div>
          </div>
          <div className="h-[240px] min-w-0 overflow-hidden">
            <InteractiveGroupedBarChart
              ariaLabel="Planned versus live bar chart"
              data={barData}
              height={240}
              maxValue={38}
              series={[
                { color: chartPalette.blue, key: "planned", label: "Planned" },
                { color: chartPalette.green, key: "live", label: "Live" },
              ]}
            />
          </div>
        </div>
      </Surface>

      <div className="grid gap-3 xl:col-span-2 xl:grid-cols-2">
        <Surface
          className="overflow-hidden"
          data-component-id="CHART-05"
          id="chart-05-scatter"
          tone="flat"
        >
          <SectionHeader
            action={
              <>
                <ComponentIdBadge id="CHART-05" />
                <SignalPill color={chartPalette.green}>scatter</SignalPill>
              </>
            }
            eyebrow="Model diagnostics"
            summary="Recharts scatter with custom point coloring, reference line, and hover tooltip."
            title="Predicted vs actual"
          />
          <div className="p-4">
            <InteractiveScatterChart
              ariaLabel="Predicted versus actual scatter chart"
              data={scatterData}
              domain={[-20, 130]}
              height={300}
              valueFormatter={(value) =>
                typeof value === "number" ? `${value.toFixed(1)} CL` : value
              }
            />
          </div>
        </Surface>

        <Surface
          className="overflow-hidden"
          data-component-id="CHART-06"
          id="chart-06-confusion-matrix"
          tone="flat"
        >
          <SectionHeader
            action={
              <>
                <ComponentIdBadge id="CHART-06" />
                <SignalPill color={chartPalette.amber}>matrix</SignalPill>
              </>
            }
            eyebrow="Classification"
            summary="Confusion matrix heatmap using the MRI analysis grid pattern for dense class comparison."
            title="Confusion matrix"
          />
          <div className="overflow-x-auto p-6">
            <InteractiveConfusionMatrix
              ariaLabel="Classification confusion matrix"
              labels={confusionLabels}
              matrix={confusionMatrix}
            />
          </div>
        </Surface>
      </div>
    </div>
  );
}

function getSignalDomain(
  data: SignalDatum[],
  series: typeof signalSeries,
): [number, number] {
  const values = data.flatMap((row) => series.map((item) => Number(row[item.key])));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = Math.max(4, (max - min) * 0.1);

  return [
    Math.max(0, Math.floor(min - padding)),
    Math.ceil(max + padding),
  ];
}

function ChartDecisionCard() {
  const rows = [
    ["Primary", "Recharts", "Best fit for this template now.", chartPalette.green],
    ["Bar system", "Geist 700", "Colored bars with black borders.", chartPalette.blue],
    ["Matrix heatmap", "Recharts", "Use custom scatter cells for dense class comparison.", chartPalette.purple],
  ] as const;

  return (
    <Card data-component-id="CHART-04" depth="base" id="chart-04-library-decision">
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <ComponentIdBadge id="CHART-04" />
            <Layers3 aria-hidden="true" className="h-4 w-4 text-[var(--ds-gray-700)]" />
          </div>
        }
      >
        <CardTitle>Library decision</CardTitle>
        <CardDescription>
          Keep chart primitives local, theme them through Geist CSS variables, and
          avoid a second dashboard design system.
        </CardDescription>
      </CardHeader>
      <div className="grid gap-2">
        {rows.map(([label, value, detail, color]) => (
          <div
            className="grid grid-cols-[86px_minmax(0,1fr)] gap-3 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] p-2.5"
            key={label}
          >
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
              <StatusDot color={color} />
              {label}
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold">{value}</span>
              <span className="block text-[12px] leading-5 text-[var(--ds-gray-800)]">
                {detail}
              </span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ComponentIdBadge({ id }: { id: string }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-[5px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] px-2 font-mono text-[11px] font-medium uppercase text-[var(--ds-gray-800)]"
      data-component-id={id}
    >
      {id}
    </span>
  );
}

function SignalPill({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <StatusSignal color={color} variant="pill">
      {children}
    </StatusSignal>
  );
}

function StatusDot({ className, color }: { className?: string; color: string }) {
  return <StatusSignal className={className} color={color} variant="dot" />;
}
