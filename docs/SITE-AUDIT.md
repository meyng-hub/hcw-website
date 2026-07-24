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
| 2 | Tax-receipt copy ambiguous (*"sous réserve d'éligibilité"*) — kills the 66% (art. 200 CGI) conversion lever and mildly over-promises | Home + /donate | P0/P1 | Biggest untapped FR-donor lever; legal exposure | Case B (not confirmed): strip tax framing, honest transparency copy | S | ✅ Case B live 2026-07-24 — **Case A pending, see Follow-ups** |
| 3 | No web analytics installed | Site-wide | P1 | Flying blind; can't measure funnel | Add cookieless analytics (Vercel/Plausible) — stays banner-free | S | ✅ Live 2026-07-24 (Vercel Analytics + Speed Insights) |
| 4 | No Organization/NonprofitOrganization JSON-LD | Site-wide | P1 | Weaker SEO, lower machine trust | Add JSON-LD in root layout (name, RNA, address, logo, sameAs) | S | ✅ Live 2026-07-24 (NGO + WebSite schema, RNA + SIREN) |
| 5 | No OG share image | Site-wide | P1 | Blank cards on WhatsApp/FB shares | Add 1200×630 OG image | S/M | ✅ Live 2026-07-24 (branded next/og image, FR/EN, + twitter-image) |
| 6 | Conflicting impact claims (€20 = "kit" vs "1 mois de fournitures") | Home vs /donate | P1 | Credibility | Single source of truth for impact tiers | S | ✅ Done 2026-07-24 (donate aligned to canonical tiers) |
| 7 | No sitemap.ts / robots.ts | Site-wide | P1/P2 | Crawlability | Add both (App Router native) | S | ✅ Live 2026-07-24 (20 localized URLs + hreflang, robots) |
| 8 | Low-contrast text — `text-gray-400` (~2.5:1 on white) fails WCAG AA | /donate, site-wide | P2 | RGAA/AA failure; readability | Bump to gray-500 | S | ✅ Done 2026-07-24 (24× gray-400→gray-500; Footer/dark left as-is) |
| 9 | Heavy source images (endara-students.png ~2.5 MB, hero ~1.9 MB) | Home, About | P2 | LCP on mobile data | Pre-compress to WebP; confirm priority+sizes | M | Open |
| 10 | Dead partner link — WEIRAM logo `href="#"` | Home, /partners | P2 | Broken trust-row link | Real URL or remove anchor | S | Open |
| 11 | Payment badges are decorative text; Apple/Google Pay claimed unverified | /donate, Home | P2/P3 | Over-claim | Verify wallets enabled in Stripe; real marks or drop | S | Open |
| 12 | Legal page has no SIREN; Boutique is transactional-intended with no CGV | /legal, /shop | P2 | Compliance gap once shop sells | Add SIREN 841 629 157; CGV when POD shop live | S/M | Open (shop = print-on-demand) |
| 13 | Localized FR slugs declared in routing.ts but unused (nav uses /fr/projects not /fr/projets) | Site-wide | P3 | Cosmetic SEO/URL polish | Align nav to localized slugs or drop them | S | De-escalated (switcher works) |
| 14 | Footer newsletter form was **inert / fake-success** | Home footer, /news | P2; P1 consent on activation | Dead feature; GDPR consent | Wire to Brevo + consent checkbox + privacy link | S | ✅ Live 2026-07-24, degrades gracefully; needs BREVO_API_KEY on live project (see SESSION-HANDOFF) |
| 15 | Header nav omits Boutique & Partenaires (footer-only) | Site-wide | P3 | Minor discoverability | Leave unless shop matters commercially | — | Open |
| 16 | Personal mobile exposed site-wide | Site-wide | P3 | Privacy (founder's call) | Consider association line | S | Open |
| 17 | Orphan routing (/campaign declared, no page; /legal not in pathnames; unused DONATION_IMPACT presets) | Config | P3 | Latent 404 / hygiene | Prune | S | Open |
| 18 | `Dl` fragment key warning | /privacy | P3 | Console noise | Wrap in keyed element | S | Open |

## Verify-items resolved (2026-07-24)

- **#8 Contrast** — CONFIRMED failure: `tailwind.config.ts` doesn't override `gray`, so `text-gray-400` = `#9ca3af` ≈ 2.5:1 on white.
- **#13 Language switch** — de-escalated to P3: the switcher preserves the path and nav uses uniform English slugs; only issue is localized FR slugs configured-but-unused.
- **#14 Newsletter** — re-characterized: form is inert (no storage), so no live GDPR breach; it's a dead feature, and consent becomes mandatory the moment it's wired.

## Decisions (resolved)

1. **Fiscal status (#2):** HCW is **not confirmed** *d'intérêt général* → **Case B implemented 2026-07-24**: all "reçu fiscal / tax receipt, subject to eligibility" promises removed (donate page, thank-you page); trust card leads with founder-funded transparency; the three donation "100%" claims aligned to "l'intégralité de votre don (hors frais bancaires)".
2. **Shop** = print-on-demand; needs SIREN + CGV when live (#12).

## Follow-ups

- **#2 → Case A (high value, when eligible):** If HCW confirms *d'intérêt général* status (via a **rescrit fiscal** or accountant), switch to Case A — *"réduction d'impôt de 66% (art. 200 CGI), dans la limite de 20% du revenu imposable; un don de 50 € ne coûte réellement que 17 €"* + trust badge "66% déductible / Reçu fiscal envoyé" (FR + EN). This is the single biggest untapped French-donor conversion lever. Drafted copy (both locales) is ready — see the 2026-07-24 session transcript.
- **#12:** add SIREN 841 629 157 + CGV once the print-on-demand shop transacts.
- **Newsletter (#14):** finish by placing `BREVO_API_KEY` on the live Vercel project `prj_y2qDK8…` (see SESSION-HANDOFF.md).

## Recommended order

Phase 0 + P1s (done 2026-07-24): #1 HelloAsso, #2 tax copy (Case B), #3 analytics, #4 JSON-LD, #5 OG image, #6 impact consistency, #7 sitemap/robots, #8 contrast, #14 newsletter (graceful, Brevo key pending). **Remaining (P2/P3):** #9 image compression, #10 WEIRAM dead link, #11 payment badges, #12 SIREN/CGV (when shop live), #13 unused FR slugs, #16 personal phone, #17 orphan routing, #18 privacy fragment key.
