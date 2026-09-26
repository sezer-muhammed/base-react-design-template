import { Surface, SectionHeader, Button } from "base-react-design-template";

export function Default() {
  return (
    <Surface tone="raised" style={{ width: 420 }}>
      <SectionHeader
        eyebrow="Workspace"
        title="Team members"
        summary="Everyone with access to this project and their assigned roles."
      />
    </Surface>
  );
}

export function WithAction() {
  return (
    <Surface tone="raised" style={{ width: 420 }}>
      <SectionHeader
        eyebrow="API keys"
        title="Access tokens"
        summary="Manage the secrets used to authenticate requests to the API."
        action={
          <Button size="sm" variant="primary" onClick={() => {}}>
            New token
          </Button>
        }
      />
    </Surface>
  );
}

export function TitleOnly() {
  return (
    <Surface tone="flat" style={{ width: 420 }}>
      <SectionHeader title="Notification preferences" />
    </Surface>
  );
}
