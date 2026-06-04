# QAVerse

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](package.json)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Release](https://img.shields.io/badge/release-public%20demo-orange.svg)](RELEASE_MEMORY.md)

AI-assisted QA command center for managing devices, firmware, bugs, incidents, and replay concepts across app/platform testing workflows.

> **Status:** Public demo-ready · build verified · real production requires auth, persistence, platform integrations, and release-readiness workflows

## Contents

1. [Why This Exists](#why-this-exists)
2. [Status](#status)
3. [Key Technical Decisions](#key-technical-decisions)
4. [Features](#features)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [Verification](#verification)
9. [Known Limits](#known-limits)
10. [Author](#author)

## Why This Exists

QA work is spread across devices, firmware, incidents, bug reports, and visual evidence. QAVerse collects those concepts into one browser-first demo so a release team can inspect the kind of operational workflow a real QA lab would need.

## Status

| Item | State |
|---|---|
| Release type | Public demo |
| Production app | Not yet |
| Data model | In-memory demo data |
| Deployment target | Cloudflare Pages |
| Last verified | 2026-06-04 |

Verified checks:

```bash
pnpm build
pnpm typecheck
```

## Key Technical Decisions

**Next.js App Router keeps pages and API routes together.** The demo needs both UI screens and lightweight API behavior, so the repo stays simple without a separate backend.

**In-memory data is intentional for the first demo.** It makes the app easy to run publicly while avoiding premature database, auth, and operational complexity.

**AI providers are optional.** The app documents Anthropic/OpenAI variables, but the public demo scope does not require promoting full AI production behavior yet.

**Cloudflare Pages is the first deployment target.** The repo includes a `build:cloudflare` script, `.nvmrc`, and static headers for a repeatable demo deployment path.

## Features

- device inventory concepts
- bug-report workflow
- firmware route concepts
- incident creation and detail pages
- replay route concept
- optional AI provider configuration
- Cloudflare Pages demo deployment setup

## Getting Started

```bash
pnpm install
pnpm dev
```

Open:

```txt
http://localhost:3000
```

## Environment Variables

```env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

## Deployment

Release scope: public demo.

Cloudflare Pages settings:

| Setting | Value |
|---|---|
| Framework preset | `Next.js` |
| Build command | `pnpm build:cloudflare` |
| Build output directory | `.vercel/output/static` |
| Node version | `20.19.6` |
| Production branch | `main` |

## Verification

```bash
pnpm build
pnpm typecheck
```

Before promoting beyond demo, smoke-test devices, bugs, firmware, incidents, new incident, and replay routes.

## Known Limits

- No persistent database yet.
- No authentication or role model yet.
- No real platform integrations yet.
- API routes need runtime smoke tests before production claims.

## Author

Built by **Sudarshan Chaudhari** — SudarshanTechLabs.

## License

MIT
