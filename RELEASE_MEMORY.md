# Release Memory: QAVerse
_Last updated: 2026-06-04_

## Current Status

QAVerse is a Next.js QA/test lab app with routes for devices, bugs, firmware, incidents, and replay concepts.

Known verification: `pnpm build` and `pnpm typecheck` passed on 2026-06-04.

## Release Target

Public demo first. Real production requires auth, persistence, and platform integrations.

## Success Criteria

- `pnpm build` passes.
- `pnpm typecheck` passes.
- README has real setup instructions instead of “Coming soon.”
- Main routes load and demo data/API behavior is understandable.
- Deployment target and env vars are documented.

## Ordered Plan

1. Run `pnpm build` and `pnpm typecheck`.
2. Verify devices, bugs, firmware, incidents, new incident, and replay routes.
3. Update README quick start and environment setup.
4. Add demo-data explanation and prototype scope.
5. Deploy to Cloudflare Pages using `pnpm build:cloudflare` and `.vercel/output/static`.
6. For real production, add persistence, auth, platform integrations, and release-readiness reporting.

## Risks

- README still says “Coming soon.”
- Cloudflare Pages deployment uses Next server support, not static export, because API routes are required.
- API routes need runtime smoke tests, not just build verification.
- Full product requires real QA lab/device workflows.

## First Task

Run typecheck and smoke-test the API routes locally.

## Latest Prep Notes

- Added `build:cloudflare` for Cloudflare Pages Next deployment.
- Added `.nvmrc` and static `_headers`.
- Updated README with quick start, demo scope, env vars, and Cloudflare Pages setup.
- Re-ran `pnpm build` and `pnpm typecheck`; both passed.
- Updated README and `.env.example` secret examples to use `YOUR_*` placeholders.
- Re-ran `pnpm build` after placeholder cleanup; passed.
- Polished README with public-demo status, technical decisions, Cloudflare deployment settings, verification, known limits, and author section.
