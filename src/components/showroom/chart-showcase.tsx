"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Layers3 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader, Surface } from "@/components/ui/surface";
import { StatusSignal } from "@/components/ui/status-signal";

const signalData = [
  { label: "Jan", inbound: 42, resolved: 28, queued: 14 },
  { label: "Feb", inbound: 58, resolved: 44, queued: 18 },
  { label: "Mar", inbound: 64, resolved: 52, queued: 16 },
  { label: "Apr", inbound: 51, resolved: 49, queued: 11 },
  { label: "May", inbound: 78, resolved: 61, queued: 22 },
  { label: "Jun", inbound: 83, resolved: 72, queued: 19 },
  { label: "Jul", inbound: 74, resolved: 68, queued: 13 },
];

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

const channelShareData = [
  { label: "API", value: 34, color: "var(--ds-blue-700)" },
  { label: "Jobs", value: 21, color: "var(--ds-amber-700)" },
  { label: "Realtime", value: 18, color: "var(--ds-teal-700)" },
  { label: "UI", value: 16, color: "var(--ds-green-700)" },
  { label: "Adapters", value: 11, color: "var(--ds-purple-700)" },
] as const;

const barColors = [
  "var(--ds-blue-700)",
  "var(--ds-green-700)",
  "var(--ds-teal-700)",
  "var(--ds-amber-700)",
  "var(--ds-purple-700)",
] as const;

export function ChartShowcase() {
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
              <SignalPill color="var(--ds-blue-700)">Recharts primary</SignalPill>
            </>
          }
          eyebrow="Charts"
          summary="SVG charts with soft gridlines, neutral surfaces, custom tooltip, and status color as signal only."
          title="Operational signal chart"
        />
        <div className="h-[310px] p-4">
          <ResponsiveContainer
            height="100%"
            initialDimension={{ height: 310, width: 760 }}
            width="100%"
          >
            <AreaChart
              accessibilityLayer
              data={signalData}
              margin={{ bottom: 0, left: -18, right: 10, top: 12 }}
            >
              <defs>
                <linearGradient id="inboundFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--ds-blue-700)" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="var(--ds-blue-700)" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="resolvedFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--ds-teal-700)" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="var(--ds-teal-700)" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="var(--ds-gray-alpha-300)"
                strokeDasharray="3 6"
                vertical={false}
              />
              <XAxis
                axisLine={false}
                dataKey="label"
                fontSize={12}
                stroke="var(--ds-gray-700)"
                tickLine={false}
                tickMargin={12}
              />
              <YAxis
                axisLine={false}
                fontSize={12}
                stroke="var(--ds-gray-700)"
                tickLine={false}
                width={42}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--ds-gray-alpha-500)" }} />
              <Area
                dataKey="inbound"
                fill="url(#inboundFill)"
                name="Inbound"
                stroke="var(--ds-blue-700)"
                strokeWidth={2}
                type="monotone"
              />
              <Area
                dataKey="resolved"
                fill="url(#resolvedFill)"
                name="Resolved"
                stroke="var(--ds-teal-700)"
                strokeWidth={2}
                type="monotone"
              />
              <Line
                dataKey="queued"
                dot={false}
                name="Queued"
                stroke="var(--ds-gray-1000)"
                strokeDasharray="4 5"
                strokeWidth={1.8}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Surface>

      <div className="grid gap-3">
        <ChartDecisionCard />
        <DonutChartCard />
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
          <div className="h-[150px]">
            <ResponsiveContainer
              height="100%"
              initialDimension={{ height: 150, width: 340 }}
              width="100%"
            >
              <LineChart
                accessibilityLayer
                data={latencyData}
                margin={{ bottom: 0, left: -24, right: 4, top: 4 }}
              >
                <CartesianGrid stroke="var(--ds-gray-alpha-300)" vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  fontSize={11}
                  stroke="var(--ds-gray-700)"
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  dataKey="p95"
                  dot={false}
                  name="p95"
                  stroke="var(--ds-amber-700)"
                  strokeWidth={2}
                  type="monotone"
                />
                <Line
                  dataKey="p50"
                  dot={false}
                  name="p50"
                  stroke="var(--ds-gray-1000)"
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
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
              <SignalPill color="var(--ds-purple-700)">bar matrix</SignalPill>
            </div>
            <h3 className="mt-4 text-[18px] font-semibold">Bar graph direction</h3>
            <p className="mt-1 max-w-md text-[13px] leading-5 text-[var(--ds-gray-900)]">
              Bars should feel like measured instrumentation, not black blocks.
              Use neutral rails, one primary signal, and a softer comparison series.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <SignalPill color="var(--ds-green-700)">live</SignalPill>
              <SignalPill color="var(--ds-blue-700)">planned</SignalPill>
              <SignalPill color="var(--ds-green-700)">accessible SVG</SignalPill>
            </div>
          </div>
          <div className="h-[240px] min-w-0">
            <ResponsiveContainer
              height="100%"
              initialDimension={{ height: 240, width: 760 }}
              width="100%"
            >
              <BarChart
                accessibilityLayer
                barCategoryGap="24%"
                data={barData}
                margin={{ bottom: 0, left: -22, right: 8, top: 8 }}
              >
                <CartesianGrid
                  stroke="var(--ds-gray-alpha-300)"
                  strokeDasharray="3 6"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  fontSize={12}
                  stroke="var(--ds-gray-700)"
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  fontSize={12}
                  stroke="var(--ds-gray-700)"
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--ds-gray-alpha-100)" }} />
                <Bar
                  dataKey="planned"
                  fill="var(--ds-blue-700)"
                  name="Planned"
                  radius={[6, 6, 2, 2]}
                  stroke="var(--ds-gray-1000)"
                  strokeWidth={1}
                >
                  {barData.map((entry, index) => (
                    <Cell fill={barColors[index % barColors.length]} key={`planned-${entry.label}`} />
                  ))}
                </Bar>
                <Bar
                  dataKey="live"
                  fill="var(--ds-green-700)"
                  name="Live"
                  radius={[6, 6, 2, 2]}
                  stroke="var(--ds-gray-1000)"
                  strokeWidth={1}
                >
                  {barData.map((entry, index) => (
                    <Cell fill={barColors[(index + 1) % barColors.length]} key={`live-${entry.label}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Surface>
    </div>
  );
}

function DonutChartCard() {
  const total = channelShareData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card data-component-id="CHART-05" depth="base" id="chart-05-donut">
      <CardHeader
        action={<ComponentIdBadge id="CHART-05" />}
      >
        <CardTitle>Channel share donut</CardTitle>
        <CardDescription>
          A compact pie variant for proportional category scans.
        </CardDescription>
      </CardHeader>
      <div className="grid gap-3 sm:grid-cols-[150px_1fr] sm:items-center">
        <div className="h-[150px]">
          <ResponsiveContainer
            height="100%"
            initialDimension={{ height: 150, width: 150 }}
            width="100%"
          >
            <PieChart accessibilityLayer>
              <Pie
                cx="50%"
                cy="50%"
                data={channelShareData}
                dataKey="value"
                innerRadius={42}
                outerRadius={66}
                paddingAngle={2}
                stroke="var(--ds-background-100)"
                strokeWidth={2}
              >
                {channelShareData.map((entry) => (
                  <Cell fill={entry.color} key={entry.label} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid gap-1.5">
          {channelShareData.map((item) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_52px] items-center gap-2 rounded-[7px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)] px-2.5 py-1.5"
              key={item.label}
            >
              <span className="flex min-w-0 items-center gap-2 text-[12px] font-medium">
                <StatusDot color={item.color} />
                <span className="truncate">{item.label}</span>
              </span>
              <span className="text-right font-mono text-[12px] text-[var(--ds-gray-900)]">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ChartDecisionCard() {
  const rows = [
    ["Primary", "Recharts", "Best fit for this template now.", "var(--ds-green-700)"],
    ["Bar system", "Geist 700", "Colored bars with black borders.", "var(--ds-blue-700)"],
    ["Custom viz", "Local SVG", "Use when charts become product logic.", "var(--ds-purple-700)"],
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

function ChartTooltip({
  active,
  label,
  payload,
}: {
  active?: boolean;
  label?: string;
  payload?: Array<{ color?: string; name?: string; value?: number | string }>;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="depth-surface rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-2.5 text-[12px]">
      <p className="mb-1 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
        {label}
      </p>
      <div className="grid gap-1">
        {payload.map((item) => (
          <div className="flex min-w-36 items-center justify-between gap-4" key={item.name}>
            <span className="flex items-center gap-2 text-[var(--ds-gray-900)]">
              <StatusDot color={item.color ?? "var(--ds-gray-1000)"} />
              {item.name}
            </span>
            <span className="font-mono font-medium text-[var(--ds-gray-1000)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
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
