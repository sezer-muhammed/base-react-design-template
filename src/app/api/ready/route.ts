import { jsonOk, requestIdFrom } from "@/server/http";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestId = requestIdFrom(request);

  return jsonOk(
    {
      status: "ready",
      checks: { application: "ok" },
      timestamp: new Date().toISOString(),
    },
    { requestId },
  );
}
