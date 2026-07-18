# Contributing

## Before opening a change

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Keep shared UI vendor-neutral and use the existing `--ds-*` tokens instead of adding one-off colors. New primitives belong in `src/components/ui`; product-specific behavior belongs in `src/features`.

## Pull request checklist

- The change has a clear owner and a short usage example.
- Loading, empty, error, and mobile states are covered where relevant.
- Interactive controls have an accessible name and keyboard behavior.
- Server mutations validate authorization at the organization boundary.
- Meaningful state changes emit an audit event.
- Public configuration and secrets are separated.
- The README or architecture documentation is updated when conventions change.
