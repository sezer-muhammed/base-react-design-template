import { DataPanel, DataTable, Badge, Button } from "base-react-design-template";
import type { TableColumn } from "base-react-design-template";
import { Download } from "lucide-react";

type Usage = {
  id: string;
  metric: string;
  used: string;
  status: "Within plan" | "Near limit";
};

const usageColumns: TableColumn<Usage>[] = [
  {
    key: "metric",
    header: "Metric",
    render: (row) => <span style={{ fontWeight: 500 }}>{row.metric}</span>,
  },
  {
    key: "used",
    header: "Used",
    align: "right",
    render: (row) => row.used,
  },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => (
      <Badge tone={row.status === "Within plan" ? "green" : "amber"}>
        {row.status}
      </Badge>
    ),
  },
];

const usage: Usage[] = [
  { id: "u-bandwidth", metric: "Bandwidth", used: "812 GB / 1 TB", status: "Within plan" },
  { id: "u-builds", metric: "Build minutes", used: "4,210 / 5,000", status: "Near limit" },
  { id: "u-functions", metric: "Edge invocations", used: "2.1 M / 5 M", status: "Within plan" },
];

export function Default() {
  return (
    <div style={{ width: 560 }}>
      <DataPanel
        eyebrow="Billing period"
        summary="Usage across your Pro plan for June 2026."
        title="Resource usage"
      >
        <DataTable columns={usageColumns} rows={usage} />
      </DataPanel>
    </div>
  );
}

export function WithAction() {
  return (
    <div style={{ width: 560 }}>
      <DataPanel
        action={
          <Button icon={Download} size="sm">
            Export
          </Button>
        }
        eyebrow="Billing period"
        summary="Download a CSV of this month's metered usage."
        title="Resource usage"
        tone="raised"
      >
        <DataTable columns={usageColumns} rows={usage} />
      </DataPanel>
    </div>
  );
}
