import { InteractiveGroupedBarChart, chartPalette } from "base-react-design-template";

export function Grouped() {
  return (
    <div style={{ width: 560 }}>
      <InteractiveGroupedBarChart
        data={[
          { label: "Q1", revenue: 482, cost: 310 },
          { label: "Q2", revenue: 538, cost: 344 },
          { label: "Q3", revenue: 611, cost: 372 },
          { label: "Q4", revenue: 704, cost: 401 },
        ]}
        series={[
          { key: "revenue", label: "Revenue", color: chartPalette.blue },
          { key: "cost", label: "Cost", color: chartPalette.amber },
        ]}
        height={260}
        showLegend
        barSize={28}
      />
    </div>
  );
}
