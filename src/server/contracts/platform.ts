/** Vendor-neutral contracts shared by product features and adapters. */

export type EntityId = string & { readonly __brand: "EntityId" };

export type UserStatus = "active" | "invited" | "suspended" | "deleted";

export type PlatformUser = {
  id: EntityId;
  email: string;
  displayName: string;
  status: UserStatus;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlatformOrganization = {
  id: EntityId;
  name: string;
  slug: string;
  plan: "free" | "starter" | "growth" | "enterprise";
  createdAt: string;
  updatedAt: string;
};

export type PlatformMembership = {
  userId: EntityId;
  organizationId: EntityId;
  role: "owner" | "admin" | "member" | "viewer";
  createdAt: string;
};

export type PlatformSession = {
  user: PlatformUser;
  organization: PlatformOrganization;
  membership: PlatformMembership;
  expiresAt: string;
};

export type AuditActor = {
  type: "user" | "system" | "api-key";
  id?: EntityId;
  label?: string;
};

export type AuditEvent = {
  id: EntityId;
  action: string;
  actor: AuditActor;
  organizationId?: EntityId;
  resource?: { type: string; id: EntityId };
  metadata?: Record<string, unknown>;
  occurredAt: string;
  requestId?: string;
};

export interface UserRepository {
  findById(id: EntityId): Promise<PlatformUser | null>;
  findByEmail(email: string): Promise<PlatformUser | null>;
}

export interface OrganizationRepository {
  findById(id: EntityId): Promise<PlatformOrganization | null>;
  listForUser(userId: EntityId): Promise<PlatformOrganization[]>;
}

export interface AuditLogRepository {
  append(event: AuditEvent): Promise<void>;
  list(input: {
    organizationId: EntityId;
    cursor?: string;
    limit?: number;
  }): Promise<{ items: AuditEvent[]; nextCursor?: string }>;
}
