# HCW Admin — Content-Editing Architecture

Decided 2026-07-12. This document is the canonical reference for the thin custom admin.

## Decision

**Thin custom admin** over the alternatives considered:

- ~~Git-based CMS (Sveltia/Decap)~~ — rejected: editors could break the production build (schema drift between CMS config and TypeScript loaders fails CI silently for them), 2–3 min publish latency with no editor-visible feedback, still requires an OAuth gateway deployment.
- ~~Finish the half-wired Sanity~~ — rejected: external SaaS dependency, content leaves the repo. The dead Sanity scaffolding (client, schemas, deps) was removed in Phase 1.

## Principles

1. **The admin writes git commits, not database rows.** Content is canonical in this repo under `content/*.json`. Full audit trail, `git revert` undoes anything, no database.
2. **Validation before commit, not after.** The same Zod schemas validate content in three places: page loaders (build), admin forms (client), admin API (server, before committing). An editor cannot produce a payload that breaks the build.
3. **Frequently-changing numbers are computed, not edited.** Campaign totals come from Stripe at request time plus a manual offset for offline donations. Editors never hand-maintain the progress bar.

## Components

| Piece | Choice |
| --- | --- |
| Content store | `content/*.json` — news, projects, campaign, shop, partners, gallery, stats. Bilingual fields as `{ fr, en }` objects |
| Schemas | `src/lib/content/schemas.ts` (Zod). Loaders in `src/lib/content/index.ts` use tolerant parsing: invalid content degrades (empty list + logged error), never fails the build |
| Write path | Admin API routes validate with Zod → commit to `main` via GitHub Contents API. Fine-grained PAT (this repo only, Contents read/write) in Vercel env `GITHUB_CONTENT_PAT`. Handle 409 (concurrent edit) with re-fetch + retry. Commit message records editor identity |
| Publish | The commit triggers the existing GitHub Actions → Vercel production deploy (~2–3 min) |
| Auth | Magic link via Resend: email allowlist in env `ADMIN_ALLOWED_EMAILS`, short-lived signed JWT session cookie (httpOnly, secure). No passwords stored. `/admin` + `/api/admin/*` guarded in middleware, rate-limited |
| Admin UI | French only. react-hook-form + Zod (already dependencies) |
| Campaign totals | Client fetches `/api/campaign`: sums completed Stripe Checkout sessions (metadata `source: hcw_website`) + `manualOffset` from `content/campaign.json` |
| Images | Admin upload commits to `public/images/` via the same GitHub API path. Server-side type/dimension/size checks. Videos stay on YouTube (URLs only) |

## Phases

- **Phase 0** ✅ 2026-07-12 — `h-cw.org` + `www` moved from the old `hcw-association` Vercel project to `hcw-website`; maintenance mode ended.
- **Phase 1** — content consolidation: `content/*.json` + Zod loaders, fold inline `locale === "fr"` ternaries into `messages/*.json`, remove Sanity. *(this commit)*
- **Phase 2** — admin MVP: magic-link auth, news editor, campaign settings.
- **Phase 3** — Stripe-fed campaign totals (`/api/campaign`). Prerequisite: confirm which channels donations actually arrive through (Stripe checkout vs HelloAsso/bank transfer) — that decides how much the manual offset carries.
- **Phase 4** — remaining collections + image upload.

## Env vars (Vercel, project `hcw-website`)

| Var | Used by | Status |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | metadata, Stripe redirect URLs | ✅ set |
| `STRIPE_SECRET_KEY` | `/api/stripe/checkout` | ❌ pending (restricted key, Checkout Sessions write) |
| `RESEND_API_KEY` | contact + volunteer routes (currently commented out), later magic-link auth | ❌ pending; also verify `h-cw.org` sending domain in Resend |
| `GITHUB_CONTENT_PAT` | Phase 2 admin write path | ❌ pending |
| `ADMIN_ALLOWED_EMAILS` | Phase 2 auth | ❌ pending |

## Known risks

- GitHub-commit write path: ~2–3 min publish latency; concurrent edits need 409 retry handling. Wrong design if HCW ever needs many editors or instant publish.
- The PAT can write to this repo — most sensitive credential in the system.
- Old `hcw-association` Vercel project may hold real content (news, photos, figures) to migrate before it is deleted. Its source is not on this machine — migration pending access.
