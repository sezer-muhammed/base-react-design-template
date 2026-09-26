"use client";

import { AlertTriangle } from "lucide-react";
import { StateBlock } from "@/components/ui/state-block";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <StateBlock
          action={
            <button onClick={unstable_retry} type="button">
              Try again
            </button>
          }
          color="var(--ds-red-700)"
          componentId="error-state"
          description="We couldn't load this page. Try again, or contact support if the problem continues."
          icon={AlertTriangle}
          title="Something went wrong"
        />
        {error.digest ? (
          <p className="mt-3 text-center font-mono text-[11px] text-[var(--ds-gray-700)]">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
