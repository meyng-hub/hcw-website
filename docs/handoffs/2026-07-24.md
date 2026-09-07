# SESSION HANDOFF — 2026-07-24

**Objective:** strategic-partner engagement on h-cw.org — (1) site audit, (2) admin redesign,
(3) logo/brand system — then execute audit Phase 0 fixes.

**Branch:** `main`. `origin/main` HEAD = the cleanup commit (`fdf6f68` or later), all deployed.

## Deliverables (complete)

1. **Audit** → `docs/SITE-AUDIT.md` (P0–P3 table).
2. **Admin redesign** → `docs/ADMIN-REDESIGN.md`.
3. **Brand** → mark "Le H-Porte", live-wired. Guide artifacts (private, claude.ai) — URLs in transcript.

## LIVE on origin/main (deployed, verified)

- **Brand mark** in header/footer + SVG favicon. Replaced off-brand blue PNG.
- **HelloAsso removed** (audit P0 #1) — dead CTAs gone; privacy line corrected to Stripe only.
- **Analytics** (audit #3) — Vercel Analytics + Speed Insights, cookieless. Confirmed live
  (endpoints 200 + deployed bundle references the module). Confirm data in Vercel dashboard.
- **Newsletter** (audit #14) — footer + /news forms wired to Brevo via `/api/newsletter`, with
  GDPR consent checkbox + privacy link. Footer fake-success bug fixed. **Currently degrades
  gracefully:** shows "coming soon — follow us on Facebook" on 503, because Brevo isn't fully
  configured yet (see below). No fake success, no error, no diagnostic leak.

## ⚠️ ONE OPEN THREAD — finish the newsletter (Brevo key placement)

The newsletter code is done and live. It only needs **`BREVO_API_KEY` on the LIVE Vercel project**,
then one deploy. This got stuck for ~20 rounds on a **duplicate-project trap**:

- The project that deploys h-cw.org is **`meyng-webs-projects/hcw-website`**,
  projectId **`prj_y2qDK8CPWqG4x6NA9Wp5DfYu5Lif`** (this repo's `.vercel/project.json`).
- **`BREVO_LIST_ID=3` is correctly on it** (added via CLI from `/c/hcw-website`, verified live).
- **`BREVO_API_KEY` kept landing on a DECOY project** (another "hcw-website", likely personal
  account) — every dashboard/CLI add by the user showed success + appeared in *their* `env pull`,
  but never on `prj_y2qDK8`. Confirmed absent 5+ ways (my `env ls`, `env pull`, the live runtime
  function diagnostic — all agreed).
- **Prime suspect for the decoy:** a `VERCEL_PROJECT_ID` / `VERCEL_ORG_ID` env override in the
  user's shell, or their terminal sitting in a different checkout (e.g. `C:\HCW`).

**To finish (2 min):**
1. Get `BREVO_API_KEY` onto `prj_y2qDK8`. Verify from `/c/hcw-website`:
   `npx vercel env pull --environment=production .env.check` → must contain `BREVO_API_KEY`.
   (If it doesn't, the write went to the decoy again — check `echo $VERCEL_PROJECT_ID` and
   `npx vercel env ls` header line for the real project.)
2. Push any commit (Vercel redeploys). The graceful "coming soon" auto-flips to a working form.
3. Verify: `curl -s -XPOST https://www.h-cw.org/api/newsletter -H 'Content-Type: application/json'
   -d '{"email":"test@example.com","consent":true}'` → expect `{"success":true}` (a real Brevo
   contact is created; delete the test contact after).
   Optional: enable double opt-in in Brevo, then change `newsletter_success` copy to "check email".

## Also pending (not blocking)

- **Audit decision #2:** HCW fiscal status (*intérêt général* / art. 200 CGI?) → rewrite the
  tax-receipt donate copy. Biggest untapped FR-donor conversion lever.
- **favicon.ico** legacy binary still holds the old mark (modern browsers use the new icon.svg).
- **Remaining audit P1s:** #4 Organization JSON-LD, #5 OG image, #6 impact-claim consistency,
  #7 sitemap/robots, #8 gray-400 contrast. Then admin Phase 1 (Carmen content autonomy).

## Key decisions this session

- Custom JSON+GitHub admin kept over a CMS; shop = print-on-demand; roles = two-tier + git history.
- Analytics = cookieless (Vercel) to stay banner-free.
- Newsletter shipped with graceful degradation rather than held, so the live form is clean while
  the Brevo key placement is sorted out of band.
