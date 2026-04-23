# Threat Model

## Project Overview

This project is a pnpm monorepo for a production Michelle Piper marketing site. The production application consists of a React + Vite frontend in `artifacts/michelle-piper`, an Express 5 API in `artifacts/api-server`, shared OpenAPI/Zod client libraries in `lib/api-*`, and a PostgreSQL database accessed through Drizzle in `lib/db`. Public visitors can submit contact forms, enrollments, newsletter subscriptions, testimonials, and free-call bookings, and can chat with an AI assistant. An `/admin` page exposes all submitted data and testimonial deletion.

Production assumptions for this scan: Replit deployment terminates TLS for client/server traffic, `NODE_ENV` is `production`, and `artifacts/mockup-sandbox` is a development-only surface unless production reachability is demonstrated.

## Assets

- **Admin-only submission data** — contact enquiries, enrollments, newsletter subscribers, bookings, and testimonials. These records contain personal data including names, emails, phone numbers, free-text messages, and scheduling details.
- **Business communications channels** — the Resend email account and outbound notification flows in `artifacts/api-server/src/lib/notifications.ts`. Abuse could spam Michelle, spam third parties, or damage sender reputation.
- **Paid AI credentials and budget** — Anthropic credentials referenced by `artifacts/api-server/src/routes/chat.ts`. Abuse can create direct financial cost and degrade service availability.
- **Public site integrity** — visitor-visible testimonials and booking availability. Abuse here can deface public content or deny legitimate visitors access to limited booking slots.
- **Application secrets** — `ADMIN_PASSWORD`, `DATABASE_URL`, `RESEND_API_KEY`, and Anthropic integration secrets. Compromise would expose privileged data or enable service abuse.

## Trust Boundaries

- **Browser to API** — every form submission, booking request, chat request, and admin request crosses from an untrusted client into the Express API. The client must be treated as fully attacker-controlled.
- **API to database** — the API persists visitor submissions and reads all admin data from PostgreSQL. Queries must remain scoped and safe.
- **API to third-party services** — the server sends outbound email through Resend and paid model requests through Anthropic. Public endpoints that reach these integrations must resist abuse.
- **Public to admin boundary** — `/` is public, while `/admin` and `/api/admin/*` are privileged. That boundary must be enforced server-side and must not rely on frontend state alone.
- **Production to dev-only boundary** — `artifacts/mockup-sandbox` is treated as dev-only and out of scope unless evidence shows it is reachable in production.

## Scan Anchors

- **Production entry points:** `artifacts/michelle-piper/src/main.tsx`, `artifacts/michelle-piper/src/App.tsx`, `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`.
- **Highest-risk code areas:** `artifacts/api-server/src/routes/admin.ts`, `chat.ts`, `bookings.ts`, `testimonials.ts`, and `artifacts/api-server/src/lib/notifications.ts`.
- **Public surfaces:** `/api/contact`, `/api/enrollments`, `/api/testimonials`, `/api/newsletter`, `/api/chat`, `/api/bookings`, `/api/bookings/taken`.
- **Privileged surfaces:** `/admin`, `/api/admin/login`, `/api/admin/submissions`, `/api/admin/testimonials/:id`.
- **Usually ignore as dev-only:** `artifacts/mockup-sandbox/**` unless production routing to it is demonstrated.

## Threat Categories

### Spoofing

The admin area is the only privileged surface and is protected by a shared secret (`ADMIN_PASSWORD`) rather than per-user accounts. The system must ensure that only authorized operators can reach `/api/admin/*`, that brute-force guessing is impractical, and that privileged access is not granted purely because a caller can replay a static secret from an arbitrary client.

### Tampering

Public visitors can create records and some of those records affect what the public site displays or what staff sees operationally. The system must prevent unauthenticated users from altering public-facing content or operational resources in ways that exceed the intended product flow, such as publishing arbitrary testimonials or monopolizing limited booking inventory.

### Information Disclosure

The admin API returns all collected visitor data in one response. The system must keep those records behind robust server-side authorization and must avoid exposing secrets or sensitive headers through logs, error messages, or permissive cross-origin behavior that weakens the admin boundary.

### Denial of Service

Several public endpoints trigger expensive or finite resources: paid Anthropic completions, Resend emails, database writes, and uniquely constrained booking slots. The system must apply abuse controls so unauthenticated callers cannot drive financial cost, consume booking inventory, or flood staff workflows through automation.

### Elevation of Privilege

The public/admin separation is narrow and concentrated in `artifacts/api-server/src/routes/admin.ts`. The system must enforce authorization entirely on the server, use controls that are stronger than a reusable shared bearer secret where feasible, and ensure privileged operations such as viewing submissions and deleting testimonials cannot be reached through guessing, replay, or client-side state manipulation.
