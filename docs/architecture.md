# App Factory Architecture

This repository is the platform layer for products built by the app factory. It should make a new product mostly a composition and configuration exercise, not an infrastructure rewrite.

## Layers

```text
app/             Route composition, metadata, loading and error boundaries
components/      UI primitives, application shell, marketing and catalog views
providers/       Client-side session and platform context boundaries
features/        Product modules owned by a domain (future product work)
config/          Brand, feature flags, navigation and deployment-safe defaults
lib/             Framework-agnostic utilities and client-safe helpers
server/contracts Vendor-neutral types and adapter interfaces
server/services  Business use cases and orchestration
server/adapters  Provider implementations (database, auth, email, storage, etc.)
```

## Dependency rules

1. UI components may depend on `lib`, `config`, and shared types.
2. Route handlers may depend on server services and contracts.
3. Server adapters may implement contracts but should not leak into UI components.
4. Product features own their use cases; shared primitives stay generic.
5. Environment variables are read at the server boundary and validated before use.
6. API responses use `src/server/http.ts` so clients receive a predictable envelope and request correlation id.

## Multi-tenant defaults

Products should treat the organization/workspace as the authorization boundary. Every organization-scoped query and mutation should receive an explicit organization id, derive permissions from the membership role, and emit an audit event for meaningful state changes.

The platform contracts in `src/server/contracts/platform.ts` and the permission helpers in `src/server/access-control.ts` are intentionally vendor-neutral. Add a concrete auth or database adapter without changing the consuming feature APIs.

## Operational endpoints

- `GET /api/health` reports process and release metadata.
- `GET /api/ready` reports whether the application is ready to serve traffic.

Deployment-specific checks (database, queues, external APIs) should be added to `/api/ready` through server-side adapters, not hard-coded into the route.

All server logs should be structured through `src/server/logger.ts`. Include a request id and organization id when available, and never log secrets, access tokens, or full request bodies by default.

## Product assembly

When starting a new product:

1. Copy or configure branding in `src/config/site.ts`.
2. Add a domain module under `src/features/<domain>`.
3. Define contracts before choosing a provider implementation.
4. Add navigation entries and page composition under `src/app`.
5. Add loading, empty, error, and unauthorized states.
6. Add a smoke test for the primary user journey before release.
