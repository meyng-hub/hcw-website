# HCW Website — Site Audit

_Audit date: 2026-07-24. Scope: public site (h-cw.org, FR/EN) — IA, donation funnel, trust, SEO/structured data, a11y (RGAA/WCAG 2.2 AA), GDPR, FR/EN parity, mobile/CWV, images._

## Method & confidence

- **Verified from primary source:** donation funnel code, metadata/SEO, GDPR + legal pages, content model, i18n, live rendered homepage + accessibility tree.
- **Heuristic (no field data):** conversion/drop-off — **no analytics is installed**, so funnel severities reflect standard NGO priors, not real traffic.
- **Audience optimised for (agreed):** primary = French-based individual donors + Central-African diaspora giving small one-off/recurring gifts; goal = complete a Stripe donation. Secondary = institutional/grant vetting (credibility spine).
- **Stack:** Next.js 16 (App Router), next-intl, Stripe Checkout (donations), content in `content/*.json`, no CMS, no analytics.

## Prioritized findings

| # | Issue | Page(s) | Sev | Impact | Fix | Effort | Status |
|---|-------|---------|-----|--------|-----|--------|--------|
| 1 | Dead HelloAsso CTAs (HelloAsso not live) routing donors to a dead end | Home + /donate | P0 | Donation leak + trust | Remove all HelloAsso CTAs/badges; Stripe only | S | ✅ Done 2026-07-24 |
| 2 | Tax-receipt copy ambiguous (*"sous réserve d'éligibilité"*) — kills the 66% (art. 200 CGI) conversion lever and mildly over-promises | Home + /donate | P0/P1 | Biggest untapped FR-donor lever; legal exposure | **Decision needed:** confirm fiscal status, then rewrite decisively | S | ⏳ Blocked on decision |
| 3 | No web analytics installed | Site-wide | P1 | Flying blind; can't measure funnel | Add cookieless analytics (Vercel/Plausible) — stays banner-free | S | Open |
| 4 | No Organization/NonprofitOrganization JSON-LD | Site-wide | P1 | Weaker SEO, lower machine trust | Add JSON-LD in root layout (name, RNA, address, logo, sameAs) | S | Open |
| 5 | No OG share image | Site-wide | P1 | Blank cards on WhatsApp/FB shares | Add 1200×630 OG image + per-page override for /donate | S/M | Open |
| 6 | Conflicting impact claims (€20 = "kit" vs "1 mois de fournitures") | Home vs /donate | P1 | Credibility | Single source of truth for impact tiers | S | Open |
| 7 | No sitemap.ts / robots.ts | Site-wide | P1/P2 | Crawlability | Add both (App Router native) | S | Open |
| 8 | Low-contrast text — `text-gray-400` (~2.5:1 on white) fails WCAG AA | /donate, site-wide | P2 | RGAA/AA failure; readability | Bump to gray-500/600; verify teal pairs | S | Confirmed (tailwind has no gray override) |
| 9 | Heavy source images (endara-students.png ~2.5 MB, hero ~1.9 MB) | Home, About | P2 | LCP on mobile data | Pre-compress to WebP; confirm priority+sizes | M | Open |
| 10 | Dead partner link — WEIRAM logo `href="#"` | Home, /partners | P2 | Broken trust-row link | Real URL or remove anchor | S | Open |
| 11 | Payment badges are decorative text; Apple/Google Pay claimed unverified | /donate, Home | P2/P3 | Over-claim | Verify wallets enabled in Stripe; real marks or drop | S | Open |
| 12 | Legal page has no SIREN; Boutique is transactional-intended with no CGV | /legal, /shop | P2 | Compliance gap once shop sells | Add SIREN 841 629 157; CGV when POD shop live | S/M | Open (shop = print-on-demand) |
| 13 | Localized FR slugs declared in routing.ts but unused (nav uses /fr/projects not /fr/projets) | Site-wide | P3 | Cosmetic SEO/URL polish | Align nav to localized slugs or drop them | S | De-escalated (switcher works) |
| 14 | Footer newsletter form is **inert** (preventDefault, no storage) | Home footer, /news | P2 (now); P1 consent on activation | Dead feature; GDPR consent needed when wired | Wire to Brevo + consent checkbox + privacy link | S | Re-characterized (not a live GDPR breach) |
| 15 | Header nav omits Boutique & Partenaires (footer-only) | Site-wide | P3 | Minor discoverability | Leave unless shop matters commercially | — | Open |
| 16 | Personal mobile exposed site-wide | Site-wide | P3 | Privacy (founder's call) | Consider association line | S | Open |
| 17 | Orphan routing (/campaign declared, no page; /legal not in pathnames; unused DONATION_IMPACT presets) | Config | P3 | Latent 404 / hygiene | Prune | S | Open |
| 18 | `Dl` fragment key warning | /privacy | P3 | Console noise | Wrap in keyed element | S | Open |

## Verify-items resolved (2026-07-24)

- **#8 Contrast** — CONFIRMED failure: `tailwind.config.ts` doesn't override `gray`, so `text-gray-400` = `#9ca3af` ≈ 2.5:1 on white.
- **#13 Language switch** — de-escalated to P3: the switcher preserves the path and nav uses uniform English slugs; only issue is localized FR slugs configured-but-unused.
- **#14 Newsletter** — re-characterized: form is inert (no storage), so no live GDPR breach; it's a dead feature, and consent becomes mandatory the moment it's wired.

## Decisions still needed from HCW

1. **Fiscal status (blocks #2):** is HCW *d'intérêt général* / able to issue *reçus fiscaux* (art. 200 CGI)? Yes → lead with "66% déductible". No → strip tax framing.
2. **(resolved)** Shop = print-on-demand; needs SIREN + CGV when live (#12).

## Recommended order

Phase 0 (this week): **#1 (done)**, #3 + #14 (analytics + consent), #2 (resolve tax framing), then #4 + #5 (schema + OG image). All P0/P1 ≈ one focused day. P2/P3 = follow-up sprint.
