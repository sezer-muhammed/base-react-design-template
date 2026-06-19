import {
  Card,
  CardTitle,
  CardDescription,
} from "base-react-design-template";

export function Default() {
  return (
    <Card style={{ width: 340 }}>
      <CardTitle>Edge network</CardTitle>
      <CardDescription>
        Globally distributed compute that runs close to your users.
      </CardDescription>
    </Card>
  );
}

export function LongTitle() {
  return (
    <Card style={{ width: 340 }}>
      <CardTitle>Automatic preview deployments for every commit</CardTitle>
      <CardDescription>
        Each push gets its own isolated URL for review.
      </CardDescription>
    </Card>
  );
}
