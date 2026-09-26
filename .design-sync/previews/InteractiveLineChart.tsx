import { InteractiveLineChart } from "base-react-design-template";

const weekly = [
  { label: "Mon", visitors: 1240, signups: 210 },
  { label: "Tue", visitors: 1480, signups: 268 },
  { label: "Wed", visitors: 1390, signups: 244 },
  { label: "Thu", visitors: 1720, signups: 312 },
  { label: "Fri", visitors: 1980, signups: 358 },
  { label: "Sat", visitors: 1610, signups: 296 },
  { label: "Sun", visitors: 1450, signups: 254 },
];

export function TwoSeries() {
  return (
    <div style={{ width: 560 }}>
      <InteractiveLineChart
        data={weekly}
        height={240}
        series={[
          { key: "visitors", label: "Visitors", color: "var(--ds-blue-700)", area: true },
          { key: "signups", label: "Signups", color: "var(--ds-green-700)" },
        ]}
        showLegend
      />
    </div>
  );
}

export function SingleTrend() {
  return (
    <div style={{ width: 480 }}>
      <InteractiveLineChart
        data={weekly}
        height={200}
        hideYAxis
        series={[{ key: "visitors", label: "Visitors", color: "var(--ds-gray-1000)" }]}
      />
    </div>
  );
}
