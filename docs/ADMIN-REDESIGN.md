# HCW Admin / Back-office — Redesign Plan

_Status: proposal, 2026-07-24. Author: strategy/eng session. Supersedes ad-hoc admin work._

## Context

- **Users:** 2. Michel (network engineer + fullstack dev — full access). Carmen (content writer / community manager — **non-technical**, must never see git or JSON).
- **Sole maintainer:** Michel. Optimise for minimal moving parts and near-zero recurring cost.
- **North star:** _Carmen can update the entire public site without touching git or raw JSON._

## Current state (verified from code)

- **Auth:** passwordless magic-link (Resend) + email allowlist + HMAC session cookie (12h). Appropriate — keep.
- **Storage:** edits commit to `content/*.json` on `main` via GitHub Contents API → Vercel redeploy (~2–3 min). Zod-validated. No DB.
- **Editable today:** News + Campaign + image upload only (~30% of content).
- **NOT editable (hand-edit JSON + git):** Projects, Impact stats, Shop, Partners, Gallery. **This is the daily pain.**

## Architecture verdict

**Keep the custom JSON + GitHub-commit admin. Do NOT adopt a headless CMS.**

- Git-backed model already gives validated, attributed, revertible edits = free audit log + backup.
- A CMS adds a monthly bill, a second system, a second login for Carmen, and lock-in — to replace something already 30% built well.
- Remaining work is shallow: generalise the News editor to the other 5 content types (forms → Zod → JSON → commit). All pieces already exist (`github.ts`, `schemas.ts`, `[collection]` API).
- **Fix the one real risk** (direct-to-`main` deploy, no preview) with a **live preview pane + explicit "Publier" confirmation**, not a CMS.

## Cut from original brief (over-scope)

| Requested | Decision | Why |
|---|---|---|
| Donor & donation reporting | **Cut — Stripe Dashboard** | Stripe does it better; confirmed sufficient. |
| Shop orders / order mgmt | **Don't build — buy** | Custom commerce = cart/inventory/fulfillment/CGV/returns. Too much for solo maintainer. |
| RBAC roles & permissions | **Two-tier flag only** | 2 trusted users. `admin` vs `editor` boolean suffices. |
| Audit logging | **Git history** | Every change already a signed commit with diff + revert. |
| Newsletter sending infra | **Buy (Brevo free tier)** | Don't build delivery/opt-in/unsubscribe/consent records. |

## Modules to build

1. **Content editors — Projects, Impact stats, Partners, Gallery, Shop catalog.** Generalise `[collection]` API `COLLECTIONS` from `{news, campaign}` to all, each Zod-guarded. Impact stats = 4-field form (highest value / lowest effort). **BUILD. Phase 1.**
2. **Bilingual FR/EN editing (cross-cutting).** Every text field = side-by-side FR | EN, both required, "EN missing" warning to protect parity. **BUILD. Phase 1.**
3. **Media library.** Browse `public/images/` via existing `github.ts listDir`; grid + select; enforce 3 MB cap + compression warning. **BUILD-light. Phase 1.**
4. **Live preview + Publish confirmation.** Render real section component with pending data; distinct "Publier" button; "live in ~2 min" toast; optional revert-last-change. **BUILD. Phase 1.**
5. **Newsletter + consent — BUY.** Wire dead footer form to **Brevo** (double-opt-in, unsubscribe, consent records). Add consent checkbox + privacy link. ~20 lines of glue. **Phase 2.**
6. **Shop — reframe to BUY.** Prefer **print-on-demand (Printful/Printify)** — matches existing "printed on demand, shipped worldwide" copy; zero inventory/fulfillment code. Interim: **Stripe Payment Links per product.** Never build custom cart. Admin keeps only a catalog editor. Requires CGV + SIREN in mentions légales once live. **Phase 3, only if merch is a real channel.**
7. **Auth / roles / audit.** Keep magic-link. Add cosmetic `role` field. Audit = git history. **Phase 1 trivial.**
8. **Volunteer & contact inbox — DEFER (round 2).** Stays email-via-Resend now.

## Roadmap

| Phase | Goal | Modules | Effort |
|---|---|---|---|
| 0 — this week | Stop bleeding | Remove dead HelloAsso; wire/hide inert newsletter | ~0.5d |
| 1 — Carmen autonomy | Edit whole site, no git | 1 + 2 + 3 + 4 + 7 | ~3–5d |
| 2 — reach & ops | Grow list, handle inbound | 5 + 8 + campaign total from Stripe webhook | ~2–3d |
| 3 — merch (optional) | Sell without a store | 6 | ~1–2d |

## Cost / dependency risk

- Custom admin: €0 recurring; low maintenance (forms→JSON→git). Risk: Carmen live-commits — mitigated by preview+validation.
- Brevo: €0 free tier (verify current limits before wiring). Offloads GDPR-heavy email.
- Print-on-demand: €0 fixed, revenue-share. No inventory risk.
- Net new dependencies: 2 (Brevo, Printful), both optional, both replacing code otherwise maintained forever.

## Open decisions

- Shop path: print-on-demand vs Payment Links vs keep email-catalog.
- Confirm Brevo free-tier limits + double-opt-in before Phase 2.
