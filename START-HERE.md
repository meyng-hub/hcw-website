# 👋 START HERE — HCW website: status & next steps

**Last updated: 2026-07-14** · The single doc to read first when resuming.
Open a Claude Code session in `C:\hcw-website` and say *"read START-HERE.md"*.

---

## ⚡ Quick status

- **Live site:** https://h-cw.org — bilingual FR/EN, content corrected & owner-verified.
- **Admin panel:** https://h-cw.org/admin — login with `contact@h-cw.org` (magic link by email). Edits news, campaign, images; every save auto-publishes in 2–3 min.
- **Forms:** contact + volunteer deliver to `contact@h-cw.org` (Resend). ✅ tested.
- **Donations:** Stripe wired with the LIVE key; **blocked only by Stripe's account review** (the "Multiple capabilities paused" task in the Stripe dashboard).
- **CI:** every merge to `main` deploys itself (GitHub Actions → Vercel). ✅ green.

## 🔑 Key facts & access

|  |  |
| --- | --- |
| Repo | `meyng-hub/hcw-website` (branch `main`) — this folder |
| Hosting | Vercel project `hcw-website`, team `meyng-webs-projects` |
| Admin login | `contact@h-cw.org` (allowlist env `ADMIN_ALLOWED_EMAILS`) |
| Email sending | Resend, domain `h-cw.org` verified (DNS in Vercel) |
| Incoming email | Google Workspace — untouched, MX intact |
| DNS | Vercel nameservers; `n8n.h-cw.org` → 38.143.19.195 preserved |
| Registration | RNA W602001421 · SIREN 841 629 157 · founded 09/03/2009 |
| Name | **HCW = Hervé-Charles Wenezoui** (never "Humanity, Culture & Welfare") |
| Old site | Vercel project `hcw-association` + `C:\HCW` — dormant, keep until design salvage done |
| Secrets | All in Vercel env (sensitive): Stripe, Resend, GitHub PAT, session secret |

## ✅ Done (July 12–14, 2026)

Domain switched off maintenance → content system (`content/*.json` + Zod) →
all copy in `messages/*.json` → owner-verified corrections (9,000 students,
real team, no fabricated news/testimonials, softened tax claim, real RNA) →
Stripe + Resend + CI + admin PAT workshops → **Phase 2 admin shipped and
E2E-verified** (magic-link login → image upload → commit `0899cd7` → auto-deploy).

## 📋 Next tasks — who does what

| # | Task | Michel's move | Claude's move |
| --- | --- | --- | --- |
| 1 | **Unblock real donations** | Finish Stripe's "View task" (association verification, Live mode) | Verify live checkout the moment you say the banner is gone |
| 2 | **First real article** | Write it (FR + EN) in the admin → Actualités | Nothing — it publishes itself. Ask if you want proofreading |
| 3 | **Real impact figures** | Find the true numbers for *800 prizes* and *€70,000 raised* | Update `content/stats.json` (or teach you to, via admin Phase 4) |
| 4 | **HelloAsso** | Create the donation form — guide: `C:\HCW\HELLOASSO-SETUP.md` | Wire the form URL into the donate page (HelloAsso-primary decision) |
| 5 | **Tax receipt 66%** | Confirm *intérêt général* status with the tax authority | Restore the firm wording site-wide (currently softened) |
| 6 | **Phase 3** — Stripe-fed campaign totals | Tell Claude which channels donations really use (Stripe? HelloAsso? bank?) | Build `/api/campaign` computing totals live from Stripe |
| 7 | **Phase 4** — full admin | Say *"start Phase 4"* | Projects, shop, partners, gallery, stats editors in the admin |
| 8 | **Old site retirement** | Compare designs via your bypass link (in `C:\HCW\START-HERE.md`); pick what to port (founder manifesto?) | Port chosen elements, then delete project `hcw-association` |
| 9 | Workflow debts | — | PR-comment permission + Node version bump (next code touch) |

## ▶️ How to resume (beginner steps)

1. Open **Claude Code** in the folder `C:\hcw-website`.
2. Say: *"read START-HERE.md"* — Claude reloads full context (this file + its memory).
3. Pick a task from the table above and say its trigger phrase, e.g.
   *"Stripe review is done"* · *"start Phase 4"* · *"here's the HelloAsso link: …"*.
4. **Secrets rule** (unchanged): keys go in dashboards or files that Claude
   blind-pipes — never in chat. DNS records and URLs are safe to paste.
5. If anything looks broken on the live site: say *"investigate h-cw.org"*.

## 📚 Where the detail lives

| Doc | What |
| --- | --- |
| `START-HERE.md` | ← you are here |
| `docs/ADMIN-ARCHITECTURE.md` | how the admin works (auth, git write-path, phases) |
| `docs/SETUP-KEYS-WORKSHOP.md` | the key-setup workshops (done, kept as reference) |
| `SESSION-HANDOFF.md` | crash-recovery snapshot of the last session |
| `C:\HCW\START-HERE.md` | the OLD site's status doc (bypass link, HelloAsso guide) |
