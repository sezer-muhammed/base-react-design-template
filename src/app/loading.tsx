import { Loader2 } from "lucide-react";
import { StateBlock } from "@/components/ui/state-block";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <StateBlock
          color="var(--ds-gray-1000)"
          componentId="loading-state"
          description="Fetching page content…"
          icon={Loader2}
          loading
          title="Loading"
        />
      </div>
    </div>
  );
}
