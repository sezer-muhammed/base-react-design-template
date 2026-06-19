import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from "base-react-design-template";

export function WithAction() {
  return (
    <Card style={{ width: 340 }}>
      <CardHeader action={<Badge tone="green">Live</Badge>}>
        <CardTitle>Production deployment</CardTitle>
        <CardDescription>
          Serving traffic from three regions with automatic failover.
        </CardDescription>
      </CardHeader>
      <p
        style={{
          fontSize: 13,
          lineHeight: "20px",
          color: "var(--ds-gray-900)",
        }}
      >
        Last shipped 4 hours ago from the main branch. No incidents reported in
        the current window.
      </p>
    </Card>
  );
}

export function Plain() {
  return (
    <Card style={{ width: 340 }}>
      <CardHeader>
        <CardTitle>Usage this month</CardTitle>
        <CardDescription>
          Metered across all environments in your organization.
        </CardDescription>
      </CardHeader>
      <p
        style={{
          fontSize: 13,
          lineHeight: "20px",
          color: "var(--ds-gray-900)",
        }}
      >
        842,000 requests processed of your 1,000,000 monthly allowance.
      </p>
    </Card>
  );
}
