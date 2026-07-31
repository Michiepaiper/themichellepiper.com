---
name: API URL construction in monorepo
description: How to correctly call the API from both the main site and recruitment site frontends
---

## Rule
Always use root-relative `/api/...` paths for API calls. Never prefix with `import.meta.env.BASE_URL`.

**Why:** The Replit proxy routes `/api/` to the API server (port 8080) regardless of which artifact makes the request. The generated `@workspace/api-client-react` hooks use `/api/...` (no prefix) and work correctly. Adding `BASE_URL` (e.g. `/recruitment/`) creates a path like `/recruitment/api/testimonials` which hits the static file server and returns HTML instead of JSON — a silent failure that only surfaces on the deployed site, not always in dev.

**How to apply:** When writing custom `useQuery` calls that bypass the generated hooks, use:
```ts
queryFn: () => fetch(`/api/testimonials?site=recruitment`).then(r => r.json())
```
Not:
```ts
queryFn: () => fetch(`${import.meta.env.BASE_URL.replace(/\/$/, "")}/api/testimonials?...`)
```

**Also applies to:** Any direct `fetch()` call in components, including admin panels and form submissions.
