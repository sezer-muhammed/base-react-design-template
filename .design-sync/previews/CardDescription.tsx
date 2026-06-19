import {
  Card,
  CardTitle,
  CardDescription,
} from "base-react-design-template";

export function Default() {
  return (
    <Card style={{ width: 340 }}>
      <CardTitle>Audit log</CardTitle>
      <CardDescription>
        Every configuration change, deployment, and access event is recorded
        with a timestamp and the acting member, retained for 90 days.
      </CardDescription>
    </Card>
  );
}

export function Short() {
  return (
    <Card style={{ width: 340 }}>
      <CardTitle>Status</CardTitle>
      <CardDescription>All systems operational.</CardDescription>
    </Card>
  );
}
