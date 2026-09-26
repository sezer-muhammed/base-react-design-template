import { StateBlock } from "base-react-design-template";
import { Activity, RefreshCw } from "lucide-react";

export function Ready() {
  return (
    <div style={{ width: 280 }}>
      <StateBlock
        action="Live"
        color="var(--ds-green-700)"
        componentId="STATE-01"
        description="All systems operational across 18 regions."
        icon={Activity}
        title="Pipeline healthy"
      />
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ width: 280 }}>
      <StateBlock
        action="Working"
        color="var(--ds-blue-700)"
        componentId="STATE-02"
        description="Re-indexing 1.2M records from the warehouse."
        icon={RefreshCw}
        loading
        title="Syncing data"
      />
    </div>
  );
}
