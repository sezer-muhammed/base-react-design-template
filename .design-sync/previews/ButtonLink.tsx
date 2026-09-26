import { ButtonLink } from "base-react-design-template";
import { ArrowUpRight } from "lucide-react";

export function Variants() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <ButtonLink href="#" variant="primary">
        View documentation
      </ButtonLink>
      <ButtonLink href="#" variant="secondary">
        Browse releases
      </ButtonLink>
      <ButtonLink href="#" variant="ghost">
        Skip for now
      </ButtonLink>
    </div>
  );
}

export function WithIcon() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <ButtonLink href="#" variant="primary" icon={ArrowUpRight}>
        Open dashboard
      </ButtonLink>
      <ButtonLink href="#" variant="secondary" size="sm" icon={ArrowUpRight}>
        Read changelog
      </ButtonLink>
    </div>
  );
}
