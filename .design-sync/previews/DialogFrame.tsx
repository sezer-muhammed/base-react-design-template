import * as Dialog from "@radix-ui/react-dialog";
import { Button, DefaultDialogFooter, DialogFrame } from "base-react-design-template";

export function Confirm() {
  return (
    <div style={{ position: "relative", minHeight: 340 }}>
      <Dialog.Root modal={false} open>
        <DialogFrame
          description="This permanently removes the project and all 1,284 deployments. This action cannot be undone."
          footer={<DefaultDialogFooter />}
          title="Delete project"
        />
      </Dialog.Root>
    </div>
  );
}

export function WithBody() {
  return (
    <div style={{ position: "relative", minHeight: 340 }}>
      <Dialog.Root modal={false} open>
        <DialogFrame
          footer={
            <Button type="button" variant="primary">
              Send invite
            </Button>
          }
          title="Invite teammate"
        >
          <div style={{ padding: 16, fontSize: 13, lineHeight: "20px", color: "var(--ds-gray-900)" }}>
            They&rsquo;ll get access to all projects in this workspace and can deploy to
            production.
          </div>
        </DialogFrame>
      </Dialog.Root>
    </div>
  );
}
