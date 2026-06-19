import { ActionBar, Button, Badge } from "base-react-design-template";

export function Left() {
  return (
    <ActionBar align="left">
      <Button variant="primary" onClick={() => {}}>
        Save changes
      </Button>
      <Button variant="secondary" onClick={() => {}}>
        Cancel
      </Button>
    </ActionBar>
  );
}

export function Right() {
  return (
    <ActionBar align="right">
      <Button variant="ghost" onClick={() => {}}>
        Discard
      </Button>
      <Button variant="primary" onClick={() => {}}>
        Publish
      </Button>
    </ActionBar>
  );
}

export function Split() {
  return (
    <ActionBar align="split">
      <Badge tone="amber">Unsaved draft</Badge>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="secondary" onClick={() => {}}>
          Preview
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Deploy
        </Button>
      </div>
    </ActionBar>
  );
}
