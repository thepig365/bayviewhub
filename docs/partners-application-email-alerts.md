# Founding Partners form — email alerts

Submissions from `/partners#apply` hit **`POST /api/partners`**. When configured, Resend sends:

1. **Owner alert** — you get the full application (reply-to = applicant).
2. **Applicant auto-reply** — confirmation to the address they entered.

## What you need in production (e.g. Vercel)

| Variable | Purpose |
|----------|---------|
| **`RESEND_API_KEY`** | Resend API key ([resend.com](https://resend.com)). Without it, **no mail is sent** (`emailedOwner` / `emailedApplicant` stay false). |
| **`RESEND_FROM`** | Verified sender, e.g. `Bayview Hub <hello@bayviewhub.me>`. Must use a domain you verified in Resend. |
| **`PARTNERS_NOTIFY_EMAIL`** | Where owner alerts go. **Comma-separated** = first address is `to`, the rest are `bcc` (same idea as `FEASIBILITY_NOTIFY_TO`). If **unset**, alerts go to **`leonzh@bayviewestate.com.au`** (legacy default). |

Supabase (`partner_applications`) is separate from email: rows can save even if Resend is missing.

## Quick checks

- After a test submit, open the **Network** tab: response JSON includes `emailedOwner` and `emailedApplicant` (both should be `true` when Resend accepted the sends).
- **Vercel → Logs**: `[resend] skipped: missing env` means `RESEND_API_KEY` or `RESEND_FROM` is not set for that deployment.
- **Resend dashboard → Emails**: delivery / bounces for debugging.
- **Spam**: if alerts land in spam, set up **SPF/DKIM** for your sending domain in Resend and prefer addresses on that domain in `PARTNERS_NOTIFY_EMAIL`.
