# SESSION HANDOFF — 2026-07-14

**Objective:** ship the HCW site + admin (Phases 0–2). ✅ Done and owner-verified.

## State at close

- `main` = `0899cd7` (an admin-made image-upload commit — proof the admin works).
- Live: https://h-cw.org (site) + https://h-cw.org/admin (admin, allowlist `contact@h-cw.org`).
- CI green; all secrets in Vercel env (sensitive). No uncommitted work. No open PRs.

## Next step when resuming

Read `START-HERE.md` → "Next tasks" table. Most likely first moves:
Stripe review completion (Michel) → live-donation verification (Claude),
or "start Phase 4" (remaining admin editors).

## Key decisions this session

- Admin UI bilingual FR/EN (changed from FR-only mid-build); images editor pulled into MVP.
- Admin allowlist = `contact@h-cw.org` only.
- Payment methods are Stripe-Dashboard-managed (no `payment_method_types` in code).
- Forms fail honestly (503 + direct email) if `RESEND_API_KEY` ever disappears.

## Claude's memory

Cross-session facts live in Claude's project memory (auto-loaded):
name meaning, content verification rules, deploy topology, admin architecture.
This file + `START-HERE.md` are the human-readable mirror.
