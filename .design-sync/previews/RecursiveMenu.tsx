import { RecursiveMenu } from "base-react-design-template";

export function Default() {
  return (
    <div style={{ width: 300 }}>
      <RecursiveMenu
        items={[
          {
            label: "Getting started",
            status: "ready",
            children: [
              { label: "Installation", href: "#", status: "ready", meta: "2 min" },
              { label: "Project structure", href: "#", status: "ready" },
              { label: "Configuration", href: "#", status: "draft", meta: "Draft" },
            ],
          },
          {
            label: "Components",
            status: "active",
            meta: "24",
            children: [
              {
                label: "Inputs",
                status: "active",
                children: [
                  { label: "Toggle", href: "#", status: "ready" },
                  { label: "Slider", href: "#", status: "draft" },
                ],
              },
              { label: "Navigation", href: "#", status: "ready" },
              { label: "Overlays", href: "#", status: "active", meta: "New" },
            ],
          },
          {
            label: "Guides",
            status: "draft",
            children: [
              { label: "Theming", href: "#", status: "draft" },
              { label: "Accessibility", href: "#", status: "ready" },
            ],
          },
        ]}
      />
    </div>
  );
}

export function ProjectTree() {
  return (
    <div style={{ width: 300 }}>
      <RecursiveMenu
        items={[
          {
            label: "src",
            status: "active",
            children: [
              {
                label: "components",
                status: "active",
                children: [
                  { label: "Button.tsx", href: "#", status: "ready" },
                  { label: "Card.tsx", href: "#", status: "ready" },
                  { label: "Chart.tsx", href: "#", status: "draft", meta: "WIP" },
                ],
              },
              { label: "lib", href: "#", status: "ready" },
              { label: "app", href: "#", status: "active" },
            ],
          },
          { label: "package.json", href: "#", status: "ready" },
          { label: "tsconfig.json", href: "#", status: "ready" },
        ]}
      />
    </div>
  );
}
