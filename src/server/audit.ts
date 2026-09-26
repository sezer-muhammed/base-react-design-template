import type {
  AuditActor,
  AuditEvent,
  EntityId,
} from "@/server/contracts/platform";

type AuditEventInput = Omit<AuditEvent, "id" | "occurredAt"> & {
  id?: EntityId;
  occurredAt?: string;
};

export function createAuditEvent(input: AuditEventInput): AuditEvent {
  return {
    ...input,
    id: input.id ?? (`audit_${crypto.randomUUID()}` as EntityId),
    occurredAt: input.occurredAt ?? new Date().toISOString(),
  };
}

export function systemActor(label = "system"): AuditActor {
  return { type: "system", label };
}
