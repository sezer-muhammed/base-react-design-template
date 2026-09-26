import { runtimeEnv } from "@/lib/env";
import { jsonOk, requestIdFrom } from "@/server/http";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const requestId = requestIdFrom(request);

  return jsonOk(
    {
      status: "ok",
      service: "app-factory-base",
      version: runtimeEnv.releaseVersion,
      timestamp: new Date().toISOString(),
    },
    { requestId },
  );
}
