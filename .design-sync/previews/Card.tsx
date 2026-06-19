import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "base-react-design-template";

export function Default() {
  return (
    <Card style={{ width: 360 }}>
      <CardHeader action={<Badge tone="green">Live</Badge>}>
        <CardTitle>Deployment summary</CardTitle>
        <CardDescription>
          Shipped 4 minutes ago to production from the main branch.
        </CardDescription>
      </CardHeader>
      <p style={{ fontSize: 13, lineHeight: "20px", color: "var(--ds-gray-900)", margin: 0 }}>
        All 24 checks passed. Edge functions deployed across 18 regions with zero
        downtime.
      </p>
      <CardFooter>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "var(--ds-gray-700)",
          }}
        >
          <span>Build #2,481</span>
          <Button size="sm" variant="secondary">
            View logs
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Tones() {
  const tones = ["default", "muted", "accent", "warning"] as const;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 190px)", gap: 12 }}>
      {tones.map((tone) => (
        <Card density="compact" key={tone} tone={tone}>
          <CardTitle>{tone}</CardTitle>
          <CardDescription>Surface tone &ldquo;{tone}&rdquo;.</CardDescription>
        </Card>
      ))}
    </div>
  );
}

export function Depths() {
  const depths = ["flat", "base", "lifted", "deep"] as const;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 190px)", gap: 16, padding: 6 }}>
      {depths.map((depth) => (
        <Card density="compact" depth={depth} key={depth}>
          <CardTitle>{depth}</CardTitle>
          <CardDescription>depth=&ldquo;{depth}&rdquo;</CardDescription>
        </Card>
      ))}
    </div>
  );
}

export function Dark() {
  return (
    <Card style={{ width: 320 }} tone="dark">
      <CardTitle>Usage this month</CardTitle>
      <CardDescription>You&rsquo;re on track to stay within plan limits.</CardDescription>
      <div style={{ marginTop: 16, fontSize: 30, fontWeight: 600 }}>1.2M</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>requests / 5M included</div>
    </Card>
  );
}
