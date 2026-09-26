import * as Dialog from "@radix-ui/react-dialog";
import { DefaultDialogFooter } from "base-react-design-template";

// DefaultDialogFooter renders Cancel/Confirm buttons wired to Dialog.Close,
// so it must live inside a Radix Dialog.Root to render.
export function Buttons() {
  return (
    <Dialog.Root modal={false} open>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          padding: 12,
          border: "1px solid var(--ds-gray-alpha-300)",
          borderRadius: 8,
          width: 320,
        }}
      >
        <DefaultDialogFooter />
      </div>
    </Dialog.Root>
  );
}
