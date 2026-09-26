import { InteractiveSingleBarChart } from "base-react-design-template";

export function Bars() {
  return (
    <div style={{ width: 520 }}>
      <InteractiveSingleBarChart
        data={[
          { label: "us-east", value: 1842, color: "var(--ds-blue-700)" },
          { label: "us-west", value: 1376, color: "var(--ds-blue-700)" },
          { label: "eu-central", value: 1521, color: "var(--ds-green-700)" },
          { label: "ap-south", value: 988, color: "var(--ds-amber-700)" },
          { label: "sa-east", value: 642, color: "var(--ds-amber-700)" },
        ]}
        height={240}
        barSize={40}
      />
    </div>
  );
}
