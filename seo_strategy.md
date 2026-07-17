# SEO Strategy

## In scope
- Public marketing pages in `artifacts/michelle-piper`
- Public recruitment and editorial pages in `artifacts/panther-brand`
- Static public assets that behave like landing pages or linked content (for example `public/portfolio-web.html`)

## Out of scope
- Authenticated admin dashboard and admin APIs (`/admin`, `/api/admin/**`)
- Development-only sandbox artifact (`artifacts/mockup-sandbox/**`)

## Target audience
- Michelle Piper prospects seeking communication coaching, public speaking training, digital skills training, and creative services
- Employers and candidates using the recruitment site for remote talent and virtual assistant hiring

## Primary keywords
- Unknown — infer from current page copy and metadata where possible

## Dismissed categories
- (None yet)

## Notes
- `artifacts/michelle-piper` is a React + Vite SPA using Wouter with client-rendered routes.
- `artifacts/panther-brand` is a React + Vite SPA using Wouter with client-rendered routes.
- For both SPAs, social bots and AI crawlers only receive the static `index.html` head unless pages are pre-rendered or migrated to SSR/SSG.
