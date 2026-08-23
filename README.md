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

## License

MIT

- [About](#about)

---

## About

I'm Sudarshan Chaudhari, a Senior Quality Engineer, Test Automation specialist, and AI systems builder based in Bangkok, Thailand.

I have 13+ years of experience in software quality engineering, working across SaaS, fintech, gaming, web, mobile, cloud, and digital signage platforms. My background combines hands-on test automation with QA leadership, test strategy, CI/CD, release quality, production investigation, and cross-platform validation.

Alongside my professional QA career, I run [SudarshanTechLabs](https://sudarshantechlabs.com/), my independent engineering and product lab where I design, build, test, and ship software across Android, web, AI, cybersecurity, developer tooling, and cross-platform applications.

### What I work on

- ⚙️ **Quality Engineering & Test Automation** — Playwright, Selenium, Cypress, Appium, API testing, automation frameworks, end-to-end testing, CI/CD, release gates, GitHub Actions, risk-based testing, and production validation
- 🤖 **AI Systems & Automation** — AI agents, multi-agent orchestration, MCP servers, AI-assisted QA, prompt tooling, developer workflows, automation systems, and Claude Code plugins
- 📱 **Mobile & Cross-Platform Applications** — Android applications built with Kotlin and Jetpack Compose, Google Play releases, automated build and publishing pipelines, and cross-platform development spanning iOS, web, Windows, and macOS
- 🌐 **Web Applications & Platforms** — Full-stack applications using Next.js, TypeScript, Firebase, Cloudflare, REST APIs, and modern web infrastructure
- 🛠️ **Developer Tooling & CLI Engineering** — Rust, Python, TypeScript, CLI utilities, multi-repository tooling, build automation, release tooling, and engineering productivity systems
- 🛡️ **Cybersecurity & Observability** — Threat detection, log analysis, security auditing, vulnerability assessment, monitoring, and security-focused developer tools
- 📺 **Digital Signage & Device Platforms** — Content validation, playback testing, device compatibility, production investigation, monitoring, and QA across diverse hardware and operating-system environments

My work sits at the intersection of quality engineering, automation, AI, and software development. I approach products with a QA mindset from the beginning: understanding failure modes, designing for testability, automating repetitive work, and building release confidence into the engineering process.

Through SudarshanTechLabs, I also build products and tools from idea to production, covering architecture, development, testing, CI/CD, release automation, monitoring, and ongoing maintenance.

🌐 [sudarshantechlabs.com](https://sudarshantechlabs.com/) · 💼 [LinkedIn](https://linkedin.com/in/sudarshan-chaudhari) · 🐙 [GitHub](https://github.com/SUDARSHANCHAUDHARI) · ✉️ [sunny.sudarshan@gmail.com](mailto:sunny.sudarshan@gmail.com)
