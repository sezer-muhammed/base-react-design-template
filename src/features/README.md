# Feature modules

Product-specific capabilities belong under `src/features/<domain>`.

Each feature should be easy to own, test, and remove. A feature may contain:

```text
features/projects/
  components/       UI composition specific to projects
  contracts.ts      Input and output types
  service.ts        Server-side use cases
  permissions.ts    Feature permission mapping
  index.ts          Public feature boundary
```

Keep generic controls in `src/components/ui`. Keep provider-specific code in `src/server/adapters`. Route files should compose feature APIs rather than contain business logic.
