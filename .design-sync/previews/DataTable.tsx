import { DataTable, Badge } from "base-react-design-template";
import type { TableColumn } from "base-react-design-template";

type Deployment = {
  id: string;
  environment: string;
  branch: string;
  status: "Healthy" | "Building" | "Degraded";
  requests: number;
  p95: string;
};

const deploymentTone: Record<Deployment["status"], "green" | "amber" | "blue"> = {
  Healthy: "green",
  Building: "blue",
  Degraded: "amber",
};

const deploymentColumns: TableColumn<Deployment>[] = [
  {
    key: "environment",
    header: "Environment",
    render: (row) => (
      <span style={{ fontWeight: 500 }}>{row.environment}</span>
    ),
  },
  {
    key: "branch",
    header: "Branch",
    render: (row) => (
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>
        {row.branch}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => <Badge tone={deploymentTone[row.status]}>{row.status}</Badge>,
  },
  {
    key: "requests",
    header: "Requests / min",
    align: "right",
    render: (row) => row.requests.toLocaleString(),
  },
  {
    key: "p95",
    header: "p95 latency",
    align: "right",
    render: (row) => row.p95,
  },
];

const deployments: Deployment[] = [
  {
    id: "dep-prod",
    environment: "Production",
    branch: "main",
    status: "Healthy",
    requests: 18420,
    p95: "112 ms",
  },
  {
    id: "dep-stage",
    environment: "Staging",
    branch: "release/4.2",
    status: "Building",
    requests: 2310,
    p95: "148 ms",
  },
  {
    id: "dep-preview",
    environment: "Preview",
    branch: "feat/checkout-redesign",
    status: "Degraded",
    requests: 640,
    p95: "421 ms",
  },
  {
    id: "dep-edge",
    environment: "Edge cache",
    branch: "main",
    status: "Healthy",
    requests: 9870,
    p95: "38 ms",
  },
];

type Endpoint = {
  id: string;
  path: string;
  method: string;
  status: "Operational" | "Rate limited";
  calls: number;
  errorRate: string;
};

const endpointColumns: TableColumn<Endpoint>[] = [
  {
    key: "method",
    header: "Method",
    render: (row) => (
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>
        {row.method}
      </span>
    ),
  },
  {
    key: "path",
    header: "Endpoint",
    render: (row) => (
      <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12 }}>
        {row.path}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge tone={row.status === "Operational" ? "green" : "amber"}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: "calls",
    header: "Calls (24h)",
    align: "right",
    render: (row) => row.calls.toLocaleString(),
  },
  {
    key: "errorRate",
    header: "Error rate",
    align: "right",
    render: (row) => row.errorRate,
  },
];

const endpoints: Endpoint[] = [
  {
    id: "ep-checkout",
    path: "/v2/checkout/session",
    method: "POST",
    status: "Operational",
    calls: 84210,
    errorRate: "0.04%",
  },
  {
    id: "ep-catalog",
    path: "/v2/catalog/items",
    method: "GET",
    status: "Operational",
    calls: 312940,
    errorRate: "0.01%",
  },
  {
    id: "ep-webhook",
    path: "/v2/webhooks/stripe",
    method: "POST",
    status: "Rate limited",
    calls: 12080,
    errorRate: "1.32%",
  },
];

export function Default() {
  return (
    <div style={{ width: 760 }}>
      <DataTable columns={deploymentColumns} rows={deployments} />
    </div>
  );
}

export function ApiEndpoints() {
  return (
    <div style={{ width: 760 }}>
      <DataTable columns={endpointColumns} rows={endpoints} />
    </div>
  );
}
