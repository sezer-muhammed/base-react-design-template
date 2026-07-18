import type { EntityId } from "@/server/contracts/platform";

export type Permission =
  | "organization:read"
  | "organization:manage"
  | "member:read"
  | "member:manage"
  | "billing:read"
  | "billing:manage"
  | "audit:read"
  | "project:read"
  | "project:write"
  | "project:delete";

export type PlatformRole = "owner" | "admin" | "member" | "viewer";

const rolePermissions: Record<PlatformRole, readonly Permission[]> = {
  owner: [
    "organization:read",
    "organization:manage",
    "member:read",
    "member:manage",
    "billing:read",
    "billing:manage",
    "audit:read",
    "project:read",
    "project:write",
    "project:delete",
  ],
  admin: [
    "organization:read",
    "member:read",
    "member:manage",
    "billing:read",
    "audit:read",
    "project:read",
    "project:write",
    "project:delete",
  ],
  member: ["organization:read", "member:read", "project:read", "project:write"],
  viewer: ["organization:read", "member:read", "project:read"],
};

export function permissionsForRole(role: PlatformRole) {
  return rolePermissions[role];
}

export function hasPermission(
  role: PlatformRole,
  permission: Permission,
): boolean {
  return rolePermissions[role].includes(permission);
}

export class AuthorizationError extends Error {
  readonly code = "FORBIDDEN" as const;

  constructor(
    public readonly permission: Permission,
    public readonly organizationId?: EntityId,
  ) {
    super(`Missing permission: ${permission}`);
    this.name = "AuthorizationError";
  }
}

export function assertPermission(
  role: PlatformRole,
  permission: Permission,
  organizationId?: EntityId,
): void {
  if (!hasPermission(role, permission)) {
    throw new AuthorizationError(permission, organizationId);
  }
}
