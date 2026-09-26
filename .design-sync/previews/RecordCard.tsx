import { RecordCard, Badge, Button } from "base-react-design-template";
import { ArrowUpRight } from "lucide-react";

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0",
        fontSize: 13,
        borderTop: "1px solid var(--ds-gray-alpha-300)",
      }}
    >
      <span style={{ color: "var(--ds-gray-700)" }}>{label}</span>
      <span style={{ fontWeight: 500, color: "var(--ds-gray-1000)" }}>{value}</span>
    </div>
  );
}

export function Default() {
  return (
    <div style={{ width: 320 }}>
      <RecordCard
        componentId="RECORD-01"
        description="Primary production cluster serving the EU region."
        eyebrow={<Badge tone="green">Healthy</Badge>}
        title="eu-west-1 cluster"
      >
        <div style={{ marginTop: 4 }}>
          <MetricRow label="Nodes" value="12 / 12" />
          <MetricRow label="CPU" value="48%" />
          <MetricRow label="Memory" value="61%" />
        </div>
      </RecordCard>
    </div>
  );
}

export function WithFooter() {
  return (
    <div style={{ width: 320 }}>
      <RecordCard
        action={<Badge tone="amber">Trial</Badge>}
        componentId="RECORD-02"
        description="Workspace billing summary for the current cycle."
        eyebrow={
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 11,
              textTransform: "uppercase",
              color: "var(--ds-gray-700)",
            }}
          >
            Workspace
          </span>
        }
        footer={
          <Button icon={ArrowUpRight} size="sm" variant="primary">
            View invoices
          </Button>
        }
        title="Northwind Labs"
      >
        <div style={{ marginTop: 4 }}>
          <MetricRow label="Seats" value="8 active" />
          <MetricRow label="Next invoice" value="Jul 1, 2026" />
          <MetricRow label="Balance" value="$240.00" />
        </div>
      </RecordCard>
    </div>
  );
}
