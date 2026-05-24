# Runtime Adapter Slots

This folder is intentionally light. The template is prepared for adapters without
committing to an infrastructure choice too early.

- `api`: REST or RPC route handlers.
- `push`: webhooks, signed event intake, third-party callbacks.
- `pull`: scheduled sync jobs, cursor-based imports, polling workers.
- `trigger`: manual, cron, queue, and rule-based workflow starts.
- `realtime`: SSE, WebSocket, broadcast, and future TCP / UDP bridges.

Concrete adapters can implement the contracts in `src/server/contracts` and keep
UI components independent from transport details.
