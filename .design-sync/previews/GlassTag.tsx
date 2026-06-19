import { GlassTag } from "base-react-design-template";

export function OnDark() {
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
      <GlassTag tone="light">Production</GlassTag>
      <GlassTag tone="light">v2.4.0</GlassTag>
      <GlassTag tone="light">us-east-1</GlassTag>
    </div>
  );
}

export function OnGradient() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--ds-blue-700), var(--ds-purple-700))",
        padding: 20,
        borderRadius: 10,
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
      }}
    >
      <GlassTag tone="light">Featured</GlassTag>
      <GlassTag tone="light">Limited</GlassTag>
    </div>
  );
}

export function ToneDark() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--ds-amber-400), var(--ds-teal-400))",
        padding: 20,
        borderRadius: 10,
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
      }}
    >
      <GlassTag tone="dark">Early access</GlassTag>
      <GlassTag tone="dark">Beta</GlassTag>
    </div>
  );
}
