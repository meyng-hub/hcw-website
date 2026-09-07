# SESSION HANDOFF — index

Crash-recovery pointers for hcw-website. **One dated file per session** in `docs/handoffs/`.

> ⚠️ **Do NOT append session notes to this file.** It is an index. The SangoAI equivalent grew to
> 8,759 lines / 618 KB before it had to be split into 48 files; this one was made an index on
> 2026-09-07 while it was still one document, to avoid repeating that.
> Add a row below, move the RESUME HERE pointer, and put the content in the dated file.

## 👉 RESUME HERE → [2026-09-07 — Google tag + GA4, consent, Ad Grants](docs/handoffs/2026-09-07-ga4-consent.md)

**First thing to do:** GA4 is still **off**, so Ad Grants still has no conversion data. Create the
GA4 property, set `NEXT_PUBLIC_GA_ID` with `printf` (never `echo`), **redeploy**, then do one
browser pass on the consent banner before trusting any numbers.

## Sessions

| Date                                                  | Focus                                                                          | Status / what it leaves open                                                                                                                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [2026-09-07](docs/handoffs/2026-09-07-ga4-consent.md) | Google tag + GA4, Consent Mode v2, privacy §6 correction; weekly Ad Grants log | 3 commits live (`5fa36cd`, `0d44d0c`, `bd35bd7`). **Open:** GA4 not switched on; consent banner never run in a browser; `donation_complete` fires on page view, not verified payment |
| [2026-07-24](docs/handoffs/2026-07-24.md)             | Site audit, admin redesign, brand mark, newsletter                             | **Open:** `BREVO_API_KEY` on the live Vercel project (duplicate-project trap — read the file before retrying); fiscal status / tax-receipt copy; favicon.ico; audit P1s              |

## Standing traps in this repo

- **Two Vercel projects have pointed at `h-cw.org`.** A green CI run proves nothing about what the
  domain serves. Check which project the domain is aliased to before claiming a deploy landed.
- **Verify on the live surface, both locales.** HTTP 200 was returned for weeks while the domain
  served a maintenance page from a different project. `/en` renders from a different message file.
- **Any name, role, title, statistic or legal designation needs a named primary source.** A
  fabricated executive team shipped here in July 2026; a false "we use Plausible Analytics" claim
  shipped and stayed live for months until 2026-09-07. The pipeline gates syntax, not truth.
