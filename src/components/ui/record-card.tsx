import type { ReactNode } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function RecordCard({
  action,
  children,
  componentId,
  description,
  eyebrow,
  footer,
  title,
}: {
  action?: ReactNode;
  children?: ReactNode;
  componentId: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  title: ReactNode;
}) {
  return (
    <Card data-component-id={componentId} depth="base" id={componentId.toLowerCase()}>
      <CardHeader action={action} className="mb-3">
        {eyebrow ? <div>{eyebrow}</div> : null}
        <CardTitle className="mt-2">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      {children}
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
