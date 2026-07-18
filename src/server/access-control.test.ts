import { describe, expect, it } from "vitest";
import {
  assertPermission,
  AuthorizationError,
  hasPermission,
  permissionsForRole,
} from "@/server/access-control";

describe("platform access control", () => {
  it("gives owners the complete platform permission set", () => {
    expect(permissionsForRole("owner")).toContain("billing:manage");
    expect(permissionsForRole("owner")).toContain("project:delete");
  });

  it("keeps viewers read-only", () => {
    expect(hasPermission("viewer", "project:read")).toBe(true);
    expect(hasPermission("viewer", "project:write")).toBe(false);
  });

  it("throws a typed authorization error for missing permissions", () => {
    expect(() => assertPermission("member", "billing:manage")).toThrow(
      AuthorizationError,
    );
  });
});
