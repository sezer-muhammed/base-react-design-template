import { Badge } from "base-react-design-template";

export function Tones() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <Badge tone="gray">Draft</Badge>
      <Badge tone="blue">Active</Badge>
      <Badge tone="green">Ready</Badge>
      <Badge tone="amber">In review</Badge>
      <Badge tone="teal">Beta</Badge>
      <Badge tone="purple">Internal</Badge>
      <Badge tone="pink">Blocked</Badge>
    </div>
  );
}

export function WithoutDot() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <Badge dot={false} tone="gray">
        v1.4.0
      </Badge>
      <Badge dot={false} tone="blue">
        SSR
      </Badge>
      <Badge dot={false} tone="green">
        Passing
      </Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ds-gray-1000)" }}>
      <span style={{ fontWeight: 600 }}>checkout-service</span>
      <Badge tone="green">Healthy</Badge>
      <Badge tone="amber">2 warnings</Badge>
    </div>
  );
}
