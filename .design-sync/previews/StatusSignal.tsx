import { StatusSignal } from "base-react-design-template";

export function Inline() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <StatusSignal color="var(--ds-green-700)">Operational</StatusSignal>
      <StatusSignal color="var(--ds-blue-700)">Deploying</StatusSignal>
      <StatusSignal color="var(--ds-amber-700)">Degraded</StatusSignal>
      <StatusSignal color="var(--ds-gray-700)">Down</StatusSignal>
    </div>
  );
}

export function Pill() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
      <StatusSignal color="var(--ds-green-700)" variant="pill">
        Healthy
      </StatusSignal>
      <StatusSignal color="var(--ds-amber-700)" variant="pill">
        2 warnings
      </StatusSignal>
      <StatusSignal color="var(--ds-red-700)" variant="pill">
        1 failing
      </StatusSignal>
    </div>
  );
}

export function Dots() {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <StatusSignal color="var(--ds-green-700)" variant="dot" />
      <StatusSignal color="var(--ds-blue-700)" variant="dot" />
      <StatusSignal color="var(--ds-amber-700)" pulse variant="dot" />
      <StatusSignal color="var(--ds-gray-700)" variant="dot" />
    </div>
  );
}

export function Glass() {
  return (
    <div
      style={{
        background: "var(--ds-gray-1000)",
        padding: 20,
        borderRadius: 10,
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
      }}
    >
      <StatusSignal color="var(--ds-green-700)" variant="glass">
        Live
      </StatusSignal>
      <StatusSignal color="var(--ds-blue-700)" variant="glass">
        Streaming
      </StatusSignal>
    </div>
  );
}
