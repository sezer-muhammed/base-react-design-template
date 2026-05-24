export type RuntimeMode = "api" | "push" | "pull" | "trigger" | "realtime";

export type TriggerKind = "manual" | "webhook" | "schedule" | "queue";

export type TransportKind =
  | "http"
  | "sse"
  | "websocket"
  | "tcp"
  | "udp";

export type RuntimeEnvelope<TPayload = unknown> = {
  id: string;
  mode: RuntimeMode;
  payload: TPayload;
  receivedAt: string;
  source: string;
  transport: TransportKind;
};

export type RuntimeHandler<TPayload = unknown, TResult = unknown> = (
  envelope: RuntimeEnvelope<TPayload>,
) => Promise<TResult>;
