"use client";

import { AlertTriangle } from "lucide-react";
import { StateBlock } from "@/components/ui/state-block";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <StateBlock
          action={<button onClick={reset} type="button">Try again</button>}
          color="var(--ds-red-700)"
          componentId="error-state"
          description={error.message || "Something went wrong loading this page."}
          icon={AlertTriangle}
          title="Something went wrong"
        />
      </div>
    </div>
  );
}
