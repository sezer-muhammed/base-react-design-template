import { FileQuestion } from "lucide-react";
import { StateBlock } from "@/components/ui/state-block";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <StateBlock
          action={<ButtonLink href="/" size="sm">Return home</ButtonLink>}
          color="var(--ds-gray-1000)"
          componentId="not-found-state"
          description="The page may have moved, or you may not have access to it."
          icon={FileQuestion}
          title="Page not found"
        />
      </div>
    </div>
  );
}
