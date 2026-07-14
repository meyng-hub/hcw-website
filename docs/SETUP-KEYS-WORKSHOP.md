# HCW — Beginner workshop: make donations, forms & CI work

Four small workshops. Each is independent — do them in any order, but **A and B
unblock the live site**. Total time: ~45 minutes plus DNS wait.

**Golden rule: secret keys are passwords.** Paste them only into the Stripe,
Resend, Vercel or GitHub dashboards. Never into a chat, an email, or a file in
this repository.

---

## Workshop A — Stripe: make the donate button work (~15 min)

Today, clicking "Payer par carte" on h-cw.org fails because the server has no
Stripe key.

1. **Log into Stripe** at https://dashboard.stripe.com with HCW's account
   (create one if needed — you'll need the association's details and bank IBAN
   to activate live payments).
2. **Check the mode switch** (top-right of the dashboard): "Test mode" vs
   "Live mode". Start in **Test mode** — you can try everything with a fake
   card and switch to Live later by repeating steps 3–5 in Live mode.
3. **Create a restricted key** (safer than the full secret key):
   Developers → API keys → **Create restricted key** → name it `hcw-website`
   → find **Checkout Sessions** in the list and set it to **Write** → Create
   key → **copy it** (starts with `rk_test_` or `rk_live_`).
4. **Give it to the website**: https://vercel.com → team *meyng-web's
   projects* → project **hcw-website** → **Settings → Environment Variables**
   → Add New:
   - Key: `STRIPE_SECRET_KEY`
   - Value: *(paste the key)*
   - Environment: **Production** ✓
   → Save.
5. **Redeploy** so the running site picks up the new variable:
   project **hcw-website** → **Deployments** → top entry → "…" menu →
   **Redeploy**. (Or tell Claude: *"redeploy production"*.)
6. **Test it**: open https://h-cw.org/fr/donner → choose €20 → "Payer par
   carte" → you should land on a Stripe payment page. In Test mode, pay with
   card number `4242 4242 4242 4242`, any future date, any CVC. In Live mode a
   real card is charged for real — do a small €5 test and refund it from the
   Stripe dashboard (Payments → ⋯ → Refund) if you like.
7. **Apple Pay / Google Pay**: nothing to do — they appear automatically on
   the Stripe payment page when the donor's device supports them. You can see
   the toggles under Settings → Payment methods.

---

## Workshop B — Resend: make the contact & volunteer forms send email (~15 min + DNS wait)

Today the forms say "sent!" but nothing is delivered anywhere.

1. **Create a Resend account** at https://resend.com (free plan: 100
   emails/day — plenty).
2. **Verify the domain** so emails can legally come from `@h-cw.org`:
   Resend dashboard → **Domains** → **Add Domain** → enter `h-cw.org` →
   Resend shows you 3–4 **DNS records** (TXT and MX lines).
3. **Add those DNS records** — two options:
   - *Easy option:* copy each record and tell Claude *"add these Resend DNS
     records"* and paste them — DNS records are public information, not
     secrets, so this is safe to paste in chat. Claude adds them to Vercel DNS.
   - *Yourself:* https://vercel.com → team → **Domains** tab → `h-cw.org` →
     **DNS Records** → add each record exactly as Resend shows (Type, Name,
     Value, Priority for MX).
4. **Wait for "Verified"** on the Resend Domains page (usually minutes, can
   take an hour). Click "Verify" to re-check.
5. **Create the API key**: Resend → **API Keys** → Create → name
   `hcw-website`, permission **Sending access**, domain `h-cw.org` → copy it
   (starts with `re_`).
6. **Give it to the website**: same as Workshop A step 4, but:
   - Key: `RESEND_API_KEY` — Environment: **Production**.
7. **Tell Claude**: *"wire the Resend emails"*. The sending code is currently
   commented out — Claude will connect it (contact + volunteer forms →
   `contact@h-cw.org`), deploy, and test end-to-end with you.

---

## Workshop C — Fix CI: automatic deploys from GitHub (~5 min)

Today every push shows a red ✗ on GitHub because the stored Vercel token
expired. Deploys currently only work from Claude's machine.

1. **Create a new token**: https://vercel.com/account/settings/tokens →
   **Create** → name `github-actions-hcw`, scope: *meyng-web's projects*,
   expiration: 1 year → Create → copy it.
2. **Store it in GitHub**: https://github.com/meyng-hub/hcw-website →
   **Settings → Secrets and variables → Actions** → `VERCEL_TOKEN` →
   **Update secret** → paste → Save.
3. **Tell Claude**: *"re-run CI"* — it should turn green, and from then on
   every merge to `main` deploys itself.

*(The old `hcw-association` repo has the same broken token — skip it; that
project is being retired.)*

---

## Workshop D — GitHub token for the admin panel (Phase 2) (~5 min)

The future admin panel saves content by writing to this repository. It needs
its own key.

1. https://github.com → your profile photo → **Settings** → **Developer
   settings** (bottom left) → **Personal access tokens** → **Fine-grained
   tokens** → **Generate new token**.
2. Fill in:
   - Name: `hcw-admin` · Expiration: 1 year
   - Resource owner: **meyng-hub**
   - Repository access: **Only select repositories** → `meyng-hub/hcw-website`
   - Permissions → Repository permissions → **Contents: Read and write**
     (leave everything else "No access")
3. Generate → copy → add it in Vercel (like Workshop A step 4) as
   `GITHUB_CONTENT_PAT`, Production.
4. Then tell Claude: *"start Phase 2"*.

---

## Checklist

| Done | Key | Where | Unblocks |
| --- | --- | --- | --- |
| ☐ | `STRIPE_SECRET_KEY` | Vercel env | Donations |
| ☐ | `RESEND_API_KEY` (+ domain verified) | Vercel env | Contact & volunteer forms (+ Claude wires the code) |
| ☐ | `VERCEL_TOKEN` | GitHub secret | Automatic deploys |
| ☐ | `GITHUB_CONTENT_PAT` | Vercel env | Phase 2 admin panel |
