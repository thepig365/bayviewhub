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
| **`RESEND_FROM`** | Verified sender, e.g. `Bayview Hub <hello@bayviewhub.me>`. Must use a domain you verified in Resend. |
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
