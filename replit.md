# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## The Michelle Piper artifact

- Public site at `/` (`artifacts/michelle-piper/src/pages/home.tsx`).
- Password-protected admin dashboard at `/admin` (`artifacts/michelle-piper/src/pages/admin.tsx`) — uses `ADMIN_PASSWORD` secret, sent via `X-Admin-Password` header.
- Backend tables: `contact_submissions`, `enrollment_submissions`, `testimonials`, `newsletter_subscribers` (`lib/db/src/schema/`).
- API endpoints (`artifacts/api-server/src/routes/`): `POST /api/contact`, `POST /api/enrollments`, `GET|POST /api/testimonials`, `POST /api/newsletter`, `POST /api/chat`, `POST /api/admin/login`, `GET /api/admin/submissions`, `DELETE /api/admin/testimonials/:id`.
- Visitor-submitted testimonials auto-publish (no moderation queue); admin can delete from `/admin`.
- Pricing & payment: prices and bank transfer details (Moniepoint · Michelle Piper · 7064346878) are constants at the top of `home.tsx`. Enrollment dialog has two steps: form → payment instructions + WhatsApp.
- AI chat assistant: `chat-widget.tsx` floating button calls `/api/chat`, which uses Anthropic via Replit AI Integrations (`AI_INTEGRATIONS_ANTHROPIC_*` env vars, model `claude-haiku-4-5`). System prompt in `routes/chat.ts` contains all service/pricing facts — update it whenever those change.
- Admin dashboard at `/admin` has four tabs: Contacts, Enrollments, Testimonials, Subscribers (with "Email all (BCC)" mailto link).
