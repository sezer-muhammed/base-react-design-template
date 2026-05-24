import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProgressCell } from "@/components/ui/progress-cell";
import { StatusSignal } from "@/components/ui/status-signal";
import { cn } from "@/lib/cn";

export function StateBlock({
  action,
  children,
  color,
  componentId,
  description,
  icon: Icon,
  loading = false,
  title,
}: {
  action?: ReactNode;
  children?: ReactNode;
  color: string;
  componentId: string;
  description: string;
  icon: LucideIcon;
  loading?: boolean;
  title: string;
}) {
  return (
    <Card data-component-id={componentId} depth="base" id={componentId.toLowerCase()}>
      <div className="flex items-start justify-between gap-3">
        {children}
        <StatusSignal color={color} variant="pill">
          {action ?? "state"}
        </StatusSignal>
      </div>
      <div className="mt-5 grid h-11 w-11 place-items-center rounded-[8px] border border-[var(--ds-gray-alpha-300)] bg-[var(--ds-background-200)]">
        <Icon
          aria-hidden="true"
          className={cn("h-5 w-5 text-[var(--ds-gray-800)]", loading && "animate-spin")}
        />
      </div>
      <CardTitle className="mt-4">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {loading ? (
        <div className="mt-4 grid gap-2">
          <ProgressCell color="var(--ds-gray-alpha-600)" value={78} />
          <ProgressCell color="var(--ds-gray-alpha-500)" value={96} />
          <ProgressCell color="var(--ds-gray-alpha-500)" value={54} />
        </div>
      ) : (
        <Button className="mt-4" size="sm" type="button" variant="secondary">
          {action}
        </Button>
      )}
    </Card>
  );
}
