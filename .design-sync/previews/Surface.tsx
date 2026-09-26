import { Surface, SectionHeader } from "base-react-design-template";

export function Flat() {
  return (
    <Surface tone="flat" style={{ width: 420 }}>
      <SectionHeader
        eyebrow="Overview"
        title="Project activity"
        summary="A neutral, borderless panel for inline content blocks."
      />
      <p
        style={{
          padding: 16,
          fontSize: 13,
          lineHeight: "20px",
          color: "var(--ds-gray-900)",
        }}
      >
        Flat surfaces sit level with the page and work well for dense,
        list-heavy regions where extra elevation would add visual noise.
      </p>
    </Surface>
  );
}

export function Raised() {
  return (
    <Surface tone="raised" style={{ width: 420 }}>
      <SectionHeader
        eyebrow="Billing"
        title="Current plan"
        summary="A lifted card-like panel that draws focus to primary content."
      />
      <p
        style={{
          padding: 16,
          fontSize: 13,
          lineHeight: "20px",
          color: "var(--ds-gray-900)",
        }}
      >
        Raised surfaces carry a subtle shadow, signalling they hold the most
        important content in the view.
      </p>
    </Surface>
  );
}

export function Sunken() {
  return (
    <Surface tone="sunken" style={{ width: 420 }}>
      <SectionHeader
        eyebrow="Logs"
        title="Recent events"
        summary="A recessed panel for secondary or grouped supporting content."
      />
      <p
        style={{
          padding: 16,
          fontSize: 13,
          lineHeight: "20px",
          color: "var(--ds-gray-900)",
        }}
      >
        Sunken surfaces appear inset into the page, ideal for nested groups or
        muted background regions.
      </p>
    </Surface>
  );
}
