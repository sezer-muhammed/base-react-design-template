import { InfoTooltip } from "base-react-design-template";

export function Legend() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: 220 }}>
      <InfoTooltip
        color="var(--ds-green-700)"
        description="Requests served successfully with a 2xx status code."
        label="Successful"
        side="bottom"
      />
      <InfoTooltip
        color="var(--ds-blue-700)"
        description="Requests redirected to another endpoint (3xx)."
        label="Redirected"
        side="bottom"
      />
      <InfoTooltip
        color="var(--ds-amber-700)"
        description="Client errors such as 404 or 429 (4xx)."
        label="Client errors"
        side="bottom"
      />
      <InfoTooltip
        color="var(--ds-red-700)"
        description="Server failures returning a 5xx status code."
        label="Server errors"
        side="bottom"
      />
    </div>
  );
}

export function Row() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <InfoTooltip
        color="var(--ds-teal-700)"
        description="Average uptime measured across all monitored regions."
        label="Uptime"
        side="bottom"
      />
      <InfoTooltip
        color="var(--ds-purple-700)"
        description="P95 latency for inbound API requests this hour."
        label="Latency"
        side="bottom"
      />
    </div>
  );
}
