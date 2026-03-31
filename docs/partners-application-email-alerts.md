# Founding Partners form — email alerts & internal SOP

Submissions from `/partners#apply` hit **`POST /api/partners`**. When configured, Resend sends:

1. **Owner alert** — you get the full application (reply-to = applicant).
2. **Applicant auto-reply** — confirmation to the address they entered (copy aligned with the on-page success message).

**Database:** This playbook does **not** require any Supabase schema or migration changes. Existing table **`partner_applications`** (if already created in your project) is unchanged; email behaviour is API-only.

---

## Environment (e.g. Vercel)

| Variable | Purpose |
|----------|---------|
| **`RESEND_API_KEY`** | Resend API key ([resend.com](https://resend.com)). Without it, **no mail is sent** (`emailedOwner` / `emailedApplicant` stay false). |
| **`RESEND_FROM`** | Verified sender for **internal** mail (e.g. `alerts@…` or `hello@…`). Partner **owner** alerts use this. |
| **`RESEND_FROM_NOREPLY`** | **Optional.** If set, the **applicant** auto-reply uses this `From` (e.g. `Bayview Hub <noreply@bayviewhub.me>`). If unset, applicants see `RESEND_FROM` (same as today). Add the address in Resend (Domains → verify) like any other sender. |

### Baby steps: applicant mail from `noreply@` (do **step 1** first)

1. **Resend — prove you may send as `noreply@`**  
   In [Resend](https://resend.com): open your **domain** for `bayviewhub.me` (the same place `alerts@` was set up). Ensure **`noreply@bayviewhub.me`** is allowed — usually the whole domain is verified once, so any `@bayviewhub.me` address works; if Resend lists explicit senders, add `noreply` there. **Stop here until Resend shows the domain/sender as OK** (no code or Vercel change fixes a missing domain).

2. **Vercel — set the env var**  
   Project → Settings → Environment Variables → add  
   `RESEND_FROM_NOREPLY` = `Bayview Hub <noreply@bayviewhub.me>`  
   (match the exact format you use for `RESEND_FROM`.)

3. **Redeploy**  
   Trigger a new production deployment so the server reads the new variable.

4. **Smoke test**  
   Submit `/partners#apply` with a test address; the **applicant** email should show **From:** `noreply@…`. Your **internal** alert should still come from `RESEND_FROM` (e.g. `alerts@…`).
| **`SSD_CAMPAIGN_OWNER_EMAIL`** | **Default** inbox for partner **owner** alerts — same as SSD campaign digests and instant alerts. If unset, code falls back to **`ileonzh@gmail.com`** (see `campaignOwnerEmail()` in `lib/ssd-campaign-server.ts`). |
| **`PARTNERS_NOTIFY_EMAIL`** | **Optional.** Comma-separated override for partner alerts only: first = Resend `to`, rest = `bcc`. If unset, **`SSD_CAMPAIGN_OWNER_EMAIL`** is used. |

Supabase (`partner_applications`) is separate from email: rows can save even if Resend is missing.

---

## CC / BCC rules

- **Owner alert:** Resend **`to`** = first address in `PARTNERS_NOTIFY_EMAIL`, or `SSD_CAMPAIGN_OWNER_EMAIL` when the override is unset. Additional addresses in `PARTNERS_NOTIFY_EMAIL` are sent as **`bcc`** (each sees the same body; applicants are not copied on the internal alert).
- **Applicant:** Only the address they typed receives the auto-reply (no CC).
- **Reply:** Owner alert sets **`reply_to`** to the applicant’s email so you can hit Reply in your client.

---

## Response-time promise (edit to match your policy)

_Use this section as your internal SLA; update the bullets whenever your process changes._

- **Target first response:** _(e.g. within 5 business days)_
- **Who owns triage:** _(e.g. inbox monitored by …)_
- **If out of office:** _(e.g. alternate contact or auto-reply on the receiving mailbox)_

---

## Monitoring & reliability

- **API response:** After submit, check JSON for `emailedOwner` and `emailedApplicant`. The route **retries each send once** (~600 ms delay) if the first attempt fails; duplicates are unlikely unless Resend accepted the first request without returning success (rare).
- **Vercel logs:**  
  - `[resend] skipped: missing env` → set `RESEND_API_KEY` and `RESEND_FROM`.  
  - `[Application] partners resend first attempt failed, retrying` → transient issue; confirm second attempt in Resend dashboard.  
  - `[Application] partners resend summary` with either flag `false` → investigate that path (owner vs applicant).
- **Resend dashboard → Emails:** delivery, bounces, blocks.
- **Spam:** Prefer **SPF/DKIM** on your sending domain in Resend; ask applicants to check spam once if they report missing mail.

---

## Quick verification checklist

- [ ] Production env has `RESEND_API_KEY`, `RESEND_FROM`, and either `SSD_CAMPAIGN_OWNER_EMAIL` or `PARTNERS_NOTIFY_EMAIL`.
- [ ] Test submit from `/partners#apply`; both email flags `true` in the network response.
- [ ] Owner receives alert; **Reply** goes to the test applicant address.
- [ ] Applicant receives confirmation; wording matches on-page “Thank you — application received” intent.
