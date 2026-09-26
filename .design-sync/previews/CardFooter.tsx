import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from "base-react-design-template";

export function Default() {
  return (
    <Card style={{ width: 340 }}>
      <CardTitle>Invoice #2048</CardTitle>
      <CardDescription>
        Your subscription renews automatically on the first of each month.
      </CardDescription>
      <CardFooter>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "var(--ds-gray-700)" }}>
            Due Jul 1, 2026
          </span>
          <Button size="sm" variant="secondary" onClick={() => {}}>
            Download PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
