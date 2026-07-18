import { describe, expect, it } from "vitest";
import { jsonError, jsonOk, requestIdFrom } from "@/server/http";

describe("HTTP platform helpers", () => {
  it("preserves a caller request id", () => {
    const request = new Request("http://localhost/api", {
      headers: { "x-request-id": "req_test" },
    });

    expect(requestIdFrom(request)).toBe("req_test");
  });

  it("returns a consistent success envelope", async () => {
    const response = jsonOk({ status: "ok" }, { requestId: "req_test" });

    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toBe("req_test");
    await expect(response.json()).resolves.toEqual({
      ok: true,
      data: { status: "ok" },
      requestId: "req_test",
    });
  });

  it("returns a consistent failure envelope", async () => {
    const response = jsonError("VALIDATION_ERROR", "Invalid input", {
      requestId: "req_test",
      status: 422,
    });

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: { code: "VALIDATION_ERROR", message: "Invalid input" },
      requestId: "req_test",
    });
  });
});
