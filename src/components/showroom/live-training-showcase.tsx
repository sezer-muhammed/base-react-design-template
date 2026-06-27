"use client";

import { Surface, SectionHeader } from "@/components/ui/surface";
import { LiveTrainingTerminal, useSimulatedTraining } from "@/components/ui/live-training-terminal";

// Live demo of the LiveTrainingTerminal card, driven by useSimulatedTraining (no backend).
// The bar creeps, it/s wobbles, loss decays, the cursor blinks and the ETA counts down.
export function LiveTrainingShowcase() {
  const live = useSimulatedTraining();
  return (
    <Surface tone="raised" className="overflow-hidden">
      <SectionHeader
        eyebrow="Realtime / Job"
        title="Live training terminal"
        summary="A mission-control card for a long-running job: it/s · loss telemetry, a shimmering progress bar, raw stdout with a blinking cursor, and an est-finish odometer that counts down between updates. Self-contained — drop in a live object or use the simulated driver."
      />
      <div className="p-4">
        <LiveTrainingTerminal live={live} host="trainer@gpu0" />
      </div>
    </Surface>
  );
}
