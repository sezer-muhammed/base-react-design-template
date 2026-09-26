import type { ApiFailure, ApiSuccess } from "@/server/contracts/http";

export function requestIdFrom(request: Request): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export function jsonOk<T>(
  data: T,
  options: { requestId?: string; status?: number } = {},
): Response {
  const body: ApiSuccess<T> = {
    ok: true,
    data,
    ...(options.requestId ? { requestId: options.requestId } : {}),
  };

  return Response.json(body, {
    status: options.status ?? 200,
    headers: {
      "Cache-Control": "no-store",
      ...(options.requestId ? { "x-request-id": options.requestId } : {}),
    },
  });
}

export function jsonError(
  code: string,
  message: string,
  options: {
    requestId?: string;
    status?: number;
    details?: Record<string, unknown>;
  } = {},
): Response {
  const body: ApiFailure = {
    ok: false,
    error: {
      code,
      message,
      ...(options.details ? { details: options.details } : {}),
    },
    ...(options.requestId ? { requestId: options.requestId } : {}),
  };

  return Response.json(body, {
    status: options.status ?? 500,
    headers: {
      "Cache-Control": "no-store",
      ...(options.requestId ? { "x-request-id": options.requestId } : {}),
    },
  });
}
