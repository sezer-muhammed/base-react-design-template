import { ToggleCell } from "base-react-design-template";

export function Off() {
  return <ToggleCell checked={false} onChange={() => {}} />;
}

export function On() {
  return <ToggleCell checked onChange={() => {}} />;
}

export function LabeledRow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 220 }}>
        <span style={{ color: "var(--ds-gray-1000)", fontWeight: 500 }}>
          Email notifications
        </span>
        <ToggleCell checked onChange={() => {}} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 220 }}>
        <span style={{ color: "var(--ds-gray-1000)", fontWeight: 500 }}>
          Two-factor auth
        </span>
        <ToggleCell checked={false} onChange={() => {}} />
      </div>
    </div>
  );
}
