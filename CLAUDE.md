# True Heartland site

Marketing site for True Heartland Consulting, with an assessment tool today and a client portal planned.

## Stack
- Next.js (App Router) on Vercel
- Sanity for content, with Studio embedded at `/studio`
- Supabase for app data and auth (assessment results now, portal data later)
- GitHub Actions for CI; Vercel builds previews for every pull request

## Who owns what
- Content (copy, services, about, blog) is owned by Ryan and lives in Sanity. Do not hard-code page copy that belongs in Sanity.
- Code, infrastructure, database, and secrets are owned by the site engineer. Ryan has no access to GitHub, Vercel, or Supabase.
- Privacy policy and terms live in this repository, not in Sanity. Edit them only when explicitly asked.

## Layout
- `app/(marketing)` public site; `app/(portal)` reserved for the future portal
- `sanity/` content schema and Studio config
- `supabase/migrations/` every database change, as a migration file
- `e2e/` browser smoke tests
- `public/assessment.html` the Readiness Assessment, served at `/assessment`; self-contained, scoring runs in the browser and nothing is stored. Its copy and scoring are code, not Sanity content.
- Home-page sections: one Sanity type per section in `sanity/schemaTypes/blocks/`, rendered by `app/(marketing)/_components/sections/`

## Commands
- `npm run dev` start the local dev server
- `npm run lint` run ESLint
- `npm run typecheck` generate route types, then run `tsc --noEmit`
- `npm run build` production build
- `npm start` serve the production build
- `npm run typegen` regenerate `sanity/extract.json` and `sanity/types.ts` after any schema or query change; CI fails if they are stale
- Node 22.12 or newer is required (see `.nvmrc`)
- Not yet added: `npm test` (unit tests) and `npm run test:e2e` (browser smoke tests)

## Rules
- Never push to `main`. Work on `feat/`, `fix/`, or `model/` branches and open a pull request.
- Never commit secrets. Environment variables live in Vercel; keep `.env.example` current and `.env*.local` ignored.
- Database changes are migration files only. Default to the staging Supabase project and never edit production data directly.
- Every new client-facing table gets an `org_id` column and a row-level security policy before it holds data, plus a test showing one organization cannot read another's rows.
- A content-model change ships as one pull request containing the Sanity schema and the page code, with generated types updated.
- Do not weaken the `/api/revalidate` route: it must verify the Sanity webhook secret.
- No client names or figures in Sanity schema, fixtures, tests, or analytics events. PostHog never receives client financial data.
- Prefer small pull requests. Describe what changed, link the preview, and say whether it includes a migration or a content-model change.
