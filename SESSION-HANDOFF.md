# SESSION HANDOFF — 2026-07-24

**Objective:** strategic-partner engagement on h-cw.org — (1) full site audit, (2) admin
redesign, (3) logo/brand system — then execute audit Phase 0 fixes.

**Branch:** `main`. **Git state at close:** local `main` is **ahead of `origin/main`** by the
held newsletter commit + this handoff. `origin/main` HEAD = `adefa9d` (analytics), deployed live.

## Deliverables (all three complete)

1. **Audit** → `docs/SITE-AUDIT.md` (P0–P3 table, decisions, order).
2. **Admin redesign** → `docs/ADMIN-REDESIGN.md` (keep custom JSON+GitHub admin; POD shop;
   two-tier roles + git-history audit; Phase 1 = "Carmen content autonomy").
3. **Brand** → new mark **"Le H-Porte"**, live-wired. Guide artifacts (private, claude.ai):
   concepts board + full system book (URLs in chat transcript).

## LIVE on `origin/main` (pushed, deployed, verified)

- **Brand mark** in header/footer + SVG favicon (`55e3c45`) — replaced off-brand blue PNG;
  fixed header/footer inconsistency. Files: `src/components/brand/HcwMark.tsx`,
  `src/app/icon.svg`, `public/brand/*.svg`.
- **HelloAsso removed** (`b7a0a5f`) — dead CTAs on home + /donate deleted; privacy policy
  payment line corrected to "Stripe" only. **Audit P0 #1 done.**
- **Analytics** (`adefa9d`) — Vercel Analytics + Speed Insights (cookieless). **Audit #3.**
  Verified live: endpoints 200 + deployed JS bundle references the analytics module.

## COMMITTED LOCALLY, HELD (not pushed) — `105f7b0`

- **Newsletter → Brevo** (audit #14): footer + /news forms wired to `/api/newsletter`,
  explicit GDPR consent checkbox + privacy link, footer **fake-success bug fixed**, honest 503
  until keys set. **HELD** so live visitors don't hit an error before Brevo exists.
  Do NOT push until Brevo is configured (pushing `105f7b0` deploys it).

## Next step when resuming — newsletter is the one open thread

1. **Michel:** create free Brevo account + contact list → set `BREVO_API_KEY` + `BREVO_LIST_ID`
   in Vercel env. (Optional: enable double opt-in — if so, update success copy to "check email".)
2. Then **push `105f7b0`** → verify a real test signup lands in the Brevo list.

## Also pending (not blocking)

- **Decision #2 (audit):** HCW fiscal status (*intérêt général* / art. 200 CGI?) → rewrite the
  tax-receipt donate copy decisively (biggest untapped FR-donor conversion lever).
- **Analytics dashboard:** Michel to confirm data landing in Vercel → Analytics (only he can see it).
- **favicon.ico** (legacy binary) still holds the old mark — regen whenever (modern browsers
  already use the new `icon.svg`).
- **Remaining audit P1s:** #4 Organization JSON-LD, #5 OG share image, #6 impact-claim
  consistency, #7 sitemap/robots, #8 gray-400 contrast. Then admin Phase 1.

## Key decisions this session

- Kept custom JSON+GitHub admin over a headless CMS (solo maintainer, cost, git = free audit log).
- Shop = print-on-demand, not custom commerce (talked back from initial "build custom store").
- Roles = simple two-tier, not RBAC (talked back from initial "formal roles + audit log").
- Analytics = cookieless (Vercel) to stay consent-banner-free.
- Newsletter split from analytics and held, so analytics could ship without a broken form.
