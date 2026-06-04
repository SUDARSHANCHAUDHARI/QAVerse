# QAverse

AI cross-platform testing lab manager

## What it is

Testing command center for teams managing apps across multiple platforms with AI-powered bug reporting, visual QA, and platform risk assessment.

## Features

- Cross-platform test matrix
- Device inventory management
- AI-generated bug reports
- Visual evidence analysis
- Platform risk scoring
- Release readiness reports

## Tech Stack

- Next.js 15
- React
- Tailwind CSS
- Node.js
- PostgreSQL
- Redis
- AI Vision API
- Multiple platform integrations

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Optional AI environment variables are documented in `.env.example`:

```bash
AI_PROVIDER=claude
ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

The current demo uses in-memory devices, firmware, incidents, and bug-report APIs. It is suitable for a public prototype, not a real production QA lab yet.

## Deployment

Release scope: public demo. Real production still needs auth, persistence, platform integrations, and release-readiness workflows.

Recommended first deployment target:

- Cloudflare Pages

Suggested environment:

- standalone project
- one deployment per repo
- production branch: `main`
- framework preset: `Next.js`
- build command: `pnpm build:cloudflare`
- build output directory: `.vercel/output/static`
- Node version: `20.19.6`

Use the normal `pnpm build` and `pnpm typecheck` commands for local verification before deployment.

## License

MIT
