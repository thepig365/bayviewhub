# Founding Partners form — email alerts

Submissions from `/partners#apply` hit **`POST /api/partners`**. When configured, Resend sends:

1. **Owner alert** — you get the full application (reply-to = applicant).
2. **Applicant auto-reply** — confirmation to the address they entered.

## What you need in production (e.g. Vercel)

| Variable | Purpose |
|----------|---------|
| **`RESEND_API_KEY`** | Resend API key ([resend.com](https://resend.com)). Without it, **no mail is sent** (`emailedOwner` / `emailedApplicant` stay false). |
| **`RESEND_FROM`** | Verified sender, e.g. `Bayview Hub <hello@bayviewhub.me>`. Must use a domain you verified in Resend. |
| **`SSD_CAMPAIGN_OWNER_EMAIL`** | **Default** inbox for partner **owner** alerts — same as SSD campaign digests and instant alerts. If unset, code falls back to **`ileonzh@gmail.com`** (see `campaignOwnerEmail()` in `lib/ssd-campaign-server.ts`). |
| **`PARTNERS_NOTIFY_EMAIL`** | **Optional.** Comma-separated override for partner alerts only: first = Resend `to`, rest = `bcc`. If unset, **`SSD_CAMPAIGN_OWNER_EMAIL`** is used. |

Supabase (`partner_applications`) is separate from email: rows can save even if Resend is missing.

## Quick checks

- After a test submit, open the **Network** tab: response JSON includes `emailedOwner` and `emailedApplicant` (both should be `true` when Resend accepted the sends).
- **Vercel → Logs**: `[resend] skipped: missing env` means `RESEND_API_KEY` or `RESEND_FROM` is not set for that deployment.
- **Resend dashboard → Emails**: delivery / bounces for debugging.
- **Spam**: if alerts land in spam, set up **SPF/DKIM** for your sending domain in Resend.
