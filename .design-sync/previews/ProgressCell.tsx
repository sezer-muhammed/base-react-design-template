import { ProgressCell } from "base-react-design-template";

export function Values() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <ProgressCell showValue value={18} />
      <ProgressCell showValue value={47} />
      <ProgressCell showValue value={73} />
      <ProgressCell showValue value={96} />
    </div>
  );
}

export function Colored() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <ProgressCell color="var(--ds-green-700)" showValue value={84} />
      <ProgressCell color="var(--ds-blue-700)" showValue value={56} />
      <ProgressCell color="var(--ds-amber-700)" showValue value={32} />
      <ProgressCell color="var(--ds-red-700)" showValue value={12} />
    </div>
  );
}

export function Labeled() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
      {[
        { label: "Storage", value: 62, color: "var(--ds-blue-700)" },
        { label: "Bandwidth", value: 41, color: "var(--ds-teal-700)" },
        { label: "Build minutes", value: 88, color: "var(--ds-amber-700)" },
      ].map((row) => (
        <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 90, color: "var(--ds-gray-900)" }}>{row.label}</span>
          <ProgressCell color={row.color} showValue value={row.value} />
        </div>
      ))}
    </div>
  );
}
