import { Button } from "base-react-design-template";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
};

export function Variants() {
  return (
    <div style={row}>
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={row}>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="sm" variant="primary">
        Small
      </Button>
    </div>
  );
}

export function WithIcon() {
  return (
    <div style={row}>
      <Button icon={Plus} variant="primary">
        New project
      </Button>
      <Button icon={ArrowRight} variant="secondary">
        Continue
      </Button>
      <Button icon={Trash2} variant="ghost">
        Delete
      </Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={row}>
      <Button disabled variant="primary">
        Save changes
      </Button>
      <Button disabled variant="secondary">
        Cancel
      </Button>
    </div>
  );
}
