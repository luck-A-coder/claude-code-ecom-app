# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Turbopack, per Next.js 16 default) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint via the flat config in `eslint.config.mjs`

There is no test runner configured in this repo yet (no test script in `package.json`, no test files present).

## Architecture

This is a fresh `create-next-app` scaffold (App Router) for what will become an e-commerce app — currently only the default landing page exists, no e-commerce domain code has been written yet.

- App Router lives under `src/app`; the `@/*` path alias maps to `src/*` (see `tsconfig.json`).
- Styling is Tailwind CSS v4, wired through `@tailwindcss/postcss` in `postcss.config.mjs` (no `tailwind.config.*` file — v4 is CSS-first, configured via `src/app/globals.css`).
- `src/app/layout.tsx` is the root layout; it loads the Geist Sans/Mono fonts via `next/font/google` and sets them as CSS variables consumed by Tailwind.
- TypeScript is in `strict` mode; `next.config.ts` currently has no custom options set.

## Working with this version of Next.js

`next` is pinned to `16.2.12`, which is newer than most training data and has real breaking changes vs. the Next.js most tooling/docs assume. Before writing routing, caching, data-fetching, or middleware-style code, check the matching guide under `node_modules/next/dist/docs/01-app/` (getting-started for fundamentals, api-reference for exact APIs) rather than relying on prior knowledge. Two changes that are easy to get wrong from memory:

- **Middleware is now Proxy.** The convention is a root-level `proxy.ts` exporting `proxy()` (or a default export), not `middleware.ts`/`middleware()`. See `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.
- **Caching has two models.** The new default is Cache Components (opt-in via `cacheComponents: true` in `next.config.ts`), where data/UI must be explicitly cached with the `"use cache"` directive or wrapped in `<Suspense>`, and uncached dynamic reads outside `<Suspense>` throw a build error. This project has not enabled `cacheComponents`, so the previous fetch-cache model still applies unless that flag is added — check `next.config.ts` before assuming which model is active. See `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md` and `.../02-guides/caching-without-cache-components.md`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
