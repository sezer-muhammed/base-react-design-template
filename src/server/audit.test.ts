import { describe, expect, it } from "vitest";
import { createAuditEvent, systemActor } from "@/server/audit";
import type { EntityId } from "@/server/contracts/platform";

describe("audit events", () => {
  it("creates deterministic events when identifiers are supplied", () => {
    const event = createAuditEvent({
      action: "project.created",
      actor: systemActor("test"),
      id: "audit_test" as EntityId,
      occurredAt: "2026-01-01T00:00:00.000Z",
    });

    expect(event).toEqual({
      action: "project.created",
      actor: { type: "system", label: "test" },
      id: "audit_test",
      occurredAt: "2026-01-01T00:00:00.000Z",
    });
  });
});
