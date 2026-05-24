import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DialogFrame({
  children,
  description,
  footer,
  title,
}: {
  children?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  title: string;
}) {
  return (
    <Dialog.Content className="depth-surface fixed left-1/2 top-1/2 z-50 w-[min(420px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2 rounded-[8px] border border-[var(--ds-gray-alpha-400)] bg-[var(--ds-background-100)]">
      <div className="flex items-center justify-between border-b border-[var(--ds-gray-alpha-400)] p-4">
        <Dialog.Title className="text-[16px] font-semibold">{title}</Dialog.Title>
        <Dialog.Close className="rounded-[5px] p-1 hover:bg-[var(--ds-gray-100)]">
          <X aria-hidden="true" className="h-4 w-4" />
        </Dialog.Close>
      </div>
      {description ? (
        <Dialog.Description className="p-4 text-[13px] leading-5 text-[var(--ds-gray-900)]">
          {description}
        </Dialog.Description>
      ) : null}
      {children}
      {footer ? (
        <div className="flex justify-end gap-2 border-t border-[var(--ds-gray-alpha-300)] p-3">
          {footer}
        </div>
      ) : null}
    </Dialog.Content>
  );
}

export function DefaultDialogFooter() {
  return (
    <>
      <Dialog.Close asChild>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close asChild>
        <Button type="button" variant="primary">
          Confirm
        </Button>
      </Dialog.Close>
    </>
  );
}
