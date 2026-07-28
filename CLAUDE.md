@AGENTS.md

# CLAUDE.md — hcw-website

Bilingual (**FR default / EN**) website for **HCW**, an education & culture charity operating in the
Central African Republic. **HCW is the initials of Hervé-Charles Wenezoui** — a CAR Doctor of Law and
diplomat; the association was founded in 2009 by his son in his memory.

> **In THIS repo, do not expand HCW as "Humanity, Culture & Welfare."** `START-HERE.md` states the
> rule directly: *"HCW = Hervé-Charles Wenezoui (never 'Humanity, Culture & Welfare')."* The live
> site follows it — `h-cw.org/fr` returns the title `HCW — Hervé-Charles Wenezoui` (verified
> 2026-07-28).
>
> **Context, so you don't "fix" the other repo by mistake:** the older `C:\HCW` (`hcw-association`)
> project uses the expansion deliberately as a double meaning, and says so on its about page — *"the
> association carries both the values 'Humanity, Culture & Welfare' and its founder's initials. This
> double meaning is no coincidence."* The two repos genuinely disagree. **This repo's rule governs
> this repo.** Do not propagate either version into the other without asking.

## The one thing that breaks if you get it wrong

**This site publishes claims about real people and a real charity.** In July 2026 a fabricated
executive team went live here — including a person who does not exist, named as *director of
publication* on the legal page — alongside the invented org-name expansion above. It shipped because
the pipeline gates syntax, not truth, and it was caught only when the founder read the rendered page.

**Any name, role, title, statistic or legal designation requires a named primary source before it
ships.** Placeholder content is indistinguishable from verified content once it is in a file. If you
cannot source it, write `TODO(unverified)` and leave it visible — do not invent a plausible value.

## Stack (verified from package.json, 2026-07-28)

- **Next.js 16.2.6** (App Router, `src/app/[locale]/...`) · React 19.2.4 · TypeScript 5 · Tailwind 4
- **next-intl 4.12** — FR default, localized pathnames
- **Stripe 22** (donation checkout) · **Resend 6** (contact + volunteer email) · **Leaflet** (project
  map) · **Zod 4** (validation)
- **Sanity is NOT installed.** `@sanity/client` and `@sanity/image-url` are absent from
  `package.json` as of 2026-07-28. Older session notes describing a "half-installed Sanity CMS" are
  stale — content is file-based.

## Where content lives

| Content | Path |
|---|---|
| UI strings, both locales | `messages/en.json`, `messages/fr.json` |
| Impact counters / statistics | `content/stats.json` |
| Shared constants | `src/lib/constants.ts` |
| Pages | `src/app/[locale]/` |

**Numbers come from `content/stats.json`.** When fixing how a counter *renders*, do not change the
value. Those two are separate concerns, and conflating them has already shipped a 10× error.

## Deploy path

- **Repo:** `github.com/meyng-hub/hcw-website`, default branch **`main`** (not `master` — this repo
  differs from the SangoAI convention).
- **Production deploys happen only via `.github/workflows/deploy.yml`** on a push to `main`. There is
  also `production-smoke-test.yml`.
- ⚠️ **Two Vercel projects have pointed at `h-cw.org`** (`hcw-association` and `hcw-website`). A green
  CI run on this repo proves nothing about what the domain serves. **Always check which project the
  domain is aliased to before claiming a deploy landed.**

## Definition of done for a change here

1. `npx tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds.
2. **Verify on the live surface, not the repo.** `curl -sI -L https://h-cw.org/fr` — and read the
   *content*, not just the status code. HTTP 200 was returned for weeks while the domain served a
   maintenance page from a different project.
3. **Both locales checked.** A change verified only in FR is half-verified; `/en` renders from a
   different message file.
4. Any factual claim about a person, role, or number traced to a source — see the rule above.

## Non-obvious gotchas

- **Read a file before editing it.** Six consecutive `Edit` failures happened in this repo from
  editing files that had not been read in-session.
- Windows: `MSYS_NO_PATHCONV=1` on `git show <rev>:<path>`; for a suspicious diff, check for CRLF
  phantoms with `git diff --ignore-cr-at-eol --ignore-all-space` before acting on it.
- `.claude/settings.local.json` is gitignored here (verified 2026-07-28) — permission rules you want
  to keep belong in a tracked `.claude/settings.json`.

## Pointers (do NOT inline these)

- Next.js version warnings → `AGENTS.md` (imported above)
- Charity context, history, Vercel topology → `C:\HCW\CLAUDE.md` and `C:\HCW\START-HERE.md`
- Strategy and funder material → `C:\hcw-strategy`
- Cross-project standards → `~/.claude/CLAUDE.md`
