"use client";

import type { ReactNode } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const chartPalette = {
  amber: "var(--ds-amber-700)",
  blue: "var(--ds-blue-700)",
  gray: "var(--ds-gray-1000)",
  green: "var(--ds-green-700)",
  purple: "var(--ds-purple-700)",
  red: "var(--ds-red-700)",
  teal: "var(--ds-teal-700)",
} as const;

type ChartDatum = {
  label: string;
  [key: string]: number | string;
};

type ChartSeries<T extends ChartDatum> = {
  area?: boolean;
  color: string;
  dash?: string;
  key: Extract<keyof T, string>;
  label: string;
};

type ScatterDatum = {
  actual: number;
  name: string;
  predicted: number;
};

type SingleBarDatum = {
  color?: string;
  label: string;
  value: number;
};

type MatrixCellDatum = {
  actualIndex: number;
  actualLabel: string;
  distance: number;
  fill: string;
  percent: string;
  predIndex: number;
  predLabel: string;
  value: number;
};

type ChartMargin = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

type ValueFormatter = (value: number | string) => string;

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{
    color?: string;
    dataKey?: string | number;
    name?: string | number;
    payload?: MatrixCellDatum | ScatterDatum;
    value?: string | number;
  }>;
  valueFormatter?: ValueFormatter;
};

type ScatterPointProps = {
  cx?: number;
  cy?: number;
  payload?: ScatterDatum;
};

type MatrixCellProps = {
  cx?: number;
  cy?: number;
  payload?: MatrixCellDatum;
};

const axisStyle = {
  fill: "var(--ds-gray-700)",
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: 11,
};

const defaultChartMargin: ChartMargin = {
  bottom: 8,
  left: 0,
  right: 8,
  top: 8,
};

const matrixMargin: ChartMargin = {
  bottom: 30,
  left: 12,
  right: 20,
  top: 16,
};

const defaultValueFormatter: ValueFormatter = (value) =>
  typeof value === "number" ? value.toLocaleString() : String(value);

export function InteractiveLineChart<T extends ChartDatum>({
  ariaLabel = "Line chart",
  data,
  height,
  hideYAxis = false,
  margin,
  maxValue,
  series,
  showLegend = false,
  valueFormatter = defaultValueFormatter,
}: {
  ariaLabel?: string;
  data: T[];
  height: number;
  hideYAxis?: boolean;
  margin?: ChartMargin;
  maxValue?: number;
  series: ChartSeries<T>[];
  showLegend?: boolean;
  valueFormatter?: ValueFormatter;
}) {
  if (!data.length || !series.length) {
    return <ChartEmptyState ariaLabel={ariaLabel} height={height} />;
  }

  return (
    <ChartFrame ariaLabel={ariaLabel}>
      <ResponsiveContainer height={height} width="100%">
        <ComposedChart
          accessibilityLayer
          data={data}
          margin={margin ?? { ...defaultChartMargin, top: showLegend ? 18 : 8 }}
        >
          <CartesianGrid
            stroke="var(--ds-gray-alpha-300)"
            strokeDasharray="3 6"
            vertical={false}
          />
          <XAxis
            axisLine={{ stroke: "var(--ds-gray-alpha-400)" }}
            dataKey="label"
            tick={axisStyle}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[0, maxValue ?? "auto"]}
            hide={hideYAxis}
            tick={axisStyle}
            tickFormatter={valueFormatter}
            tickLine={false}
            width={hideYAxis ? 0 : 34}
          />
          <Tooltip
            content={<ChartTooltip valueFormatter={valueFormatter} />}
            cursor={{ stroke: "var(--ds-gray-alpha-500)" }}
          />
          {showLegend ? <Legend content={<ChartLegend />} verticalAlign="top" /> : null}
          {series.map((item) =>
            item.area ? (
              <Area
                activeDot={{ r: 5, stroke: "var(--ds-background-100)", strokeWidth: 2 }}
                dataKey={item.key}
                dot={false}
                fill={item.color}
                fillOpacity={0.12}
                isAnimationActive={false}
                key={item.key}
                name={item.label}
                stroke={item.color}
                strokeWidth={2.4}
                type="monotone"
              />
            ) : (
              <Line
                activeDot={{ r: 5, stroke: "var(--ds-background-100)", strokeWidth: 2 }}
                dataKey={item.key}
                dot={false}
                isAnimationActive={false}
                key={item.key}
                name={item.label}
                stroke={item.color}
                strokeDasharray={item.dash}
                strokeWidth={2.4}
                type="monotone"
              />
            ),
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function InteractiveGroupedBarChart<T extends ChartDatum>({
  ariaLabel = "Grouped bar chart",
  barSize = 44,
  data,
  height,
  margin = defaultChartMargin,
  maxValue,
  series,
  showLegend = false,
  valueFormatter = defaultValueFormatter,
}: {
  ariaLabel?: string;
  barSize?: number;
  data: T[];
  height: number;
  margin?: ChartMargin;
  maxValue?: number;
  series: ChartSeries<T>[];
  showLegend?: boolean;
  valueFormatter?: ValueFormatter;
}) {
  if (!data.length || !series.length) {
    return <ChartEmptyState ariaLabel={ariaLabel} height={height} />;
  }

  return (
    <ChartFrame ariaLabel={ariaLabel}>
      <ResponsiveContainer height={height} width="100%">
        <ComposedChart accessibilityLayer data={data} margin={margin}>
          <CartesianGrid
            stroke="var(--ds-gray-alpha-300)"
            strokeDasharray="3 6"
            vertical={false}
          />
          <XAxis
            axisLine={{ stroke: "var(--ds-gray-alpha-400)" }}
            dataKey="label"
            tick={axisStyle}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            domain={[0, maxValue ?? "auto"]}
            tick={axisStyle}
            tickFormatter={valueFormatter}
            tickLine={false}
            width={34}
          />
          <Tooltip
            content={<ChartTooltip valueFormatter={valueFormatter} />}
            cursor={{ fill: "var(--ds-gray-alpha-200)" }}
          />
          {showLegend ? <Legend content={<ChartLegend />} verticalAlign="top" /> : null}
          {series.map((item) => (
            <Bar
              barSize={barSize}
              dataKey={item.key}
              fill={item.color}
              isAnimationActive={false}
              key={item.key}
              name={item.label}
              radius={[6, 6, 0, 0]}
              stroke="var(--ds-gray-1000)"
              strokeWidth={1}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function InteractiveSingleBarChart({
  ariaLabel = "Bar chart",
  barSize = 42,
  data,
  height,
  margin = defaultChartMargin,
  maxValue,
  valueFormatter = defaultValueFormatter,
}: {
  ariaLabel?: string;
  barSize?: number;
  data: SingleBarDatum[];
  height: number;
  margin?: ChartMargin;
  maxValue?: number;
  valueFormatter?: ValueFormatter;
}) {
  if (!data.length) {
    return <ChartEmptyState ariaLabel={ariaLabel} height={height} />;
  }

  return (
    <ChartFrame ariaLabel={ariaLabel}>
      <ResponsiveContainer height={height} width="100%">
        <ComposedChart accessibilityLayer data={data} margin={margin}>
          <CartesianGrid stroke="var(--ds-gray-alpha-300)" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="label"
            tick={axisStyle}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            domain={[0, maxValue ?? "auto"]}
            tick={axisStyle}
            tickFormatter={valueFormatter}
            tickLine={false}
            width={34}
          />
          <Tooltip
            content={<ChartTooltip valueFormatter={valueFormatter} />}
            cursor={{ fill: "var(--ds-gray-alpha-200)" }}
          />
          <Bar
            barSize={barSize}
            dataKey="value"
            fill={chartPalette.blue}
            isAnimationActive={false}
            name="Value"
            radius={[6, 6, 0, 0]}
            stroke="var(--ds-gray-1000)"
            strokeWidth={1}
          >
            {data.map((item) => (
              <Cell fill={item.color ?? chartPalette.blue} key={item.label} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function InteractiveScatterChart({
  ariaLabel = "Scatter chart",
  data,
  domain,
  height,
  valueFormatter = (value) =>
    typeof value === "number" ? value.toFixed(1) : String(value),
}: {
  ariaLabel?: string;
  data: ScatterDatum[];
  domain: [number, number];
  height: number;
  valueFormatter?: ValueFormatter;
}) {
  if (!data.length) {
    return <ChartEmptyState ariaLabel={ariaLabel} height={height} />;
  }

  const referenceData = [
    { actual: domain[0], predicted: domain[0], name: "reference-min" },
    { actual: domain[1], predicted: domain[1], name: "reference-max" },
  ];

  return (
    <ChartFrame ariaLabel={ariaLabel}>
      <ResponsiveContainer height={height} width="100%">
        <ScatterChart accessibilityLayer margin={{ bottom: 28, left: 8, right: 20, top: 8 }}>
          <CartesianGrid stroke="var(--ds-gray-alpha-300)" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="actual"
            domain={domain}
            label={{ value: "Actual", position: "insideBottom", offset: -18, fontSize: 11 }}
            name="Actual"
            tick={axisStyle}
            tickFormatter={valueFormatter}
            tickLine={false}
            tickMargin={10}
            type="number"
          />
          <YAxis
            axisLine={false}
            dataKey="predicted"
            domain={domain}
            label={{
              value: "Predicted",
              angle: -90,
              position: "insideLeft",
              offset: 14,
              fontSize: 11,
            }}
            name="Predicted"
            tick={axisStyle}
            tickFormatter={valueFormatter}
            tickLine={false}
            type="number"
          />
          <Tooltip
            content={<ScatterTooltip valueFormatter={valueFormatter} />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            data={referenceData}
            isAnimationActive={false}
            legendType="none"
            line={{
              stroke: chartPalette.green,
              strokeDasharray: "5 4",
              strokeWidth: 1.5,
            }}
            name="y=x"
            shape={() => <g />}
          />
          <Scatter
            data={data}
            isAnimationActive={false}
            name="Results"
            shape={(props: ScatterPointProps) => <ScatterPoint {...props} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-center justify-end gap-2 font-mono text-[10px] text-[var(--ds-gray-600)]">
        <span>low error</span>
        <div className="h-2 w-24 rounded-full border border-[var(--ds-gray-alpha-400)] bg-[linear-gradient(90deg,hsl(145_72%_38%),hsl(55_72%_40%),hsl(0_72%_42%))]" />
        <span>high error</span>
      </div>
    </ChartFrame>
  );
}

export function InteractiveConfusionMatrix({
  ariaLabel = "Confusion matrix",
  height = 320,
  labels,
  matrix,
}: {
  ariaLabel?: string;
  height?: number;
  labels: string[];
  matrix: number[][];
}) {
  const total = matrix.flat().reduce((sum, value) => sum + value, 0);
  const size = matrix.length;

  if (!labels.length || !matrix.length || total === 0) {
    return <ChartEmptyState ariaLabel={ariaLabel} height={height} />;
  }

  const pct = (value: number) => `${((value / total) * 100).toFixed(1)}%`;
  const cells = matrix.flatMap((row, actualIndex) =>
    row.map((value, predIndex) => {
      const distance = Math.abs(actualIndex - predIndex);

      return {
        actualIndex,
        actualLabel: labels[actualIndex],
        distance,
        fill: diagonalDistanceColor(distance, size - 1),
        percent: pct(value),
        predIndex,
        predLabel: labels[predIndex],
        value,
      };
    }),
  );

  return (
    <ChartFrame ariaLabel={ariaLabel}>
      <ResponsiveContainer height={height} minWidth={520} width="100%">
        <ScatterChart accessibilityLayer margin={matrixMargin}>
          <CartesianGrid stroke="var(--ds-gray-alpha-300)" vertical={false} />
          <XAxis
            allowDecimals={false}
            axisLine={false}
            dataKey="predIndex"
            domain={[-0.5, size - 0.5]}
            interval={0}
            label={{ value: "Predicted", position: "insideBottom", offset: -16, fontSize: 11 }}
            name="Predicted"
            tick={axisStyle}
            tickFormatter={(value) => labels[Number(value)] ?? ""}
            tickLine={false}
            tickMargin={10}
            ticks={labels.map((_, index) => index)}
            type="number"
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            dataKey="actualIndex"
            domain={[size - 0.5, -0.5]}
            interval={0}
            label={{
              value: "Actual",
              angle: -90,
              position: "insideLeft",
              offset: 6,
              fontSize: 11,
            }}
            name="Actual"
            tick={axisStyle}
            tickFormatter={(value) => labels[Number(value)] ?? ""}
            tickLine={false}
            ticks={labels.map((_, index) => index)}
            type="number"
            width={72}
          />
          <Tooltip content={<MatrixTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter
            data={cells}
            isAnimationActive={false}
            name="Confusion"
            shape={(props: MatrixCellProps) => <MatrixCell {...props} />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function ChartTooltip({
  active,
  label,
  payload,
  valueFormatter = defaultValueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <ChartTip>
      <div className="mb-1 font-mono text-[11px] uppercase text-[var(--ds-gray-700)]">
        {label}
      </div>
      <div className="grid gap-1">
        {payload.map((item) => (
          <div className="flex min-w-[130px] items-center justify-between gap-4" key={item.dataKey}>
            <span className="flex items-center gap-2 text-[var(--ds-gray-800)]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: item.color }}
              />
              {item.name}
            </span>
            <span className="font-mono font-semibold text-[var(--ds-gray-1000)]">
              {valueFormatter(item.value ?? "")}
            </span>
          </div>
        ))}
      </div>
    </ChartTip>
  );
}

function ScatterTooltip({
  active,
  payload,
  valueFormatter = defaultValueFormatter,
}: ChartTooltipProps) {
  const item = payload?.[0]?.payload;

  if (!active || !item || !("actual" in item)) {
    return null;
  }

  const error = Math.abs(item.actual - item.predicted);

  return (
    <ChartTip>
      <p className="max-w-[160px] truncate font-mono text-[var(--ds-gray-700)]">
        {item.name}
      </p>
      <p className="mt-1">
        Actual: <strong>{valueFormatter(item.actual)}</strong>
      </p>
      <p>
        Predicted: <strong>{valueFormatter(item.predicted)}</strong>
      </p>
      <p>
        Error: <strong>+/-{valueFormatter(error)}</strong>
      </p>
    </ChartTip>
  );
}

function MatrixTooltip({ active, payload }: ChartTooltipProps) {
  const item = payload?.[0]?.payload;

  if (!active || !item || !("actualLabel" in item)) {
    return null;
  }

  return (
    <ChartTip>
      <p className="font-mono text-[var(--ds-gray-700)]">
        {`Actual ${item.actualLabel} -> Pred ${item.predLabel}`}
      </p>
      <p className="mt-1">
        Count: <strong>{item.value.toLocaleString()}</strong>
      </p>
      <p>
        Share: <strong>{item.percent}</strong>
      </p>
      <p>
        Distance: <strong>{item.distance === 0 ? "OK" : `D${item.distance}`}</strong>
      </p>
    </ChartTip>
  );
}

function ChartLegend({
  payload,
}: {
  payload?: Array<{ color?: string; value?: string }>;
}) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 pb-2 text-[12px] text-[var(--ds-gray-800)]">
      {payload.map((item) => (
        <span className="inline-flex items-center gap-2" key={item.value}>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: item.color }}
          />
          {item.value}
        </span>
      ))}
    </div>
  );
}

function ScatterPoint({ cx, cy, payload }: ScatterPointProps) {
  if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
    return <g />;
  }

  const error = Math.abs(payload.actual - payload.predicted);

  return (
    <circle
      cx={cx}
      cy={cy}
      fill={scatterErrorColor(error)}
      opacity={0.78}
      r={4.5}
      stroke="var(--ds-background-100)"
      strokeWidth={0.75}
    />
  );
}

function MatrixCell({ cx, cy, payload }: MatrixCellProps) {
  if (typeof cx !== "number" || typeof cy !== "number" || !payload) {
    return <g />;
  }

  const lightRatio = Math.max(0, Math.min(1, payload.distance / 2));
  const width = 96;
  const height = 58;

  return (
    <g>
      <rect
        fill={`color-mix(in srgb, ${payload.fill} ${18 + lightRatio * 22}%, var(--ds-background-100))`}
        height={height}
        rx={6}
        stroke={payload.fill}
        width={width}
        x={cx - width / 2}
        y={cy - height / 2}
      />
      <text
        fill="var(--ds-gray-900)"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        textAnchor="middle"
        x={cx}
        y={cy - 14}
      >
        {payload.distance === 0 ? "OK" : `D${payload.distance}`}
      </text>
      <text
        fill="var(--ds-gray-1000)"
        fontSize="22"
        fontWeight="600"
        textAnchor="middle"
        x={cx}
        y={cy + 6}
      >
        {payload.value}
      </text>
      <text
        fill="var(--ds-gray-800)"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        textAnchor="middle"
        x={cx}
        y={cy + 22}
      >
        {payload.percent}
      </text>
    </g>
  );
}

function ChartFrame({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <div aria-label={ariaLabel} className="h-full w-full min-w-0" role="group">
      {children}
    </div>
  );
}

function ChartEmptyState({
  ariaLabel,
  height,
}: {
  ariaLabel: string;
  height: number;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="grid w-full place-items-center rounded-[7px] border border-dashed border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-200)] font-mono text-[11px] uppercase text-[var(--ds-gray-600)]"
      role="img"
      style={{ height }}
    >
      No data
    </div>
  );
}

function ChartTip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[6px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)] p-2 text-[11px] shadow-sm">
      {children}
    </div>
  );
}

function scatterErrorColor(error: number) {
  const ratio = Math.max(0, Math.min(1, error / 70));
  return geistScaleColor(ratio);
}

function diagonalDistanceColor(distance: number, maxDistance: number) {
  const ratio = maxDistance > 0 ? Math.max(0, Math.min(1, distance / maxDistance)) : 0;
  return geistScaleColor(ratio);
}

function geistScaleColor(ratio: number) {
  const t = Math.max(0, Math.min(1, ratio));

  if (t <= 0.5) {
    return `color-mix(in srgb, ${chartPalette.green} ${(1 - t * 2) * 100}%, ${chartPalette.amber})`;
  }

  return `color-mix(in srgb, ${chartPalette.amber} ${(1 - (t - 0.5) * 2) * 100}%, ${chartPalette.red})`;
}
