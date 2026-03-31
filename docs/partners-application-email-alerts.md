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
| **`RESEND_FROM_NOREPLY`** | **Optional.** If set, the **applicant** auto-reply uses this `From` (e.g. `Bayview Hub <noreply@bayviewhub.me>`). If unset, applicants see `RESEND_FROM` (same as today). Domain must be verified in Resend (see **Step 1** below). |
| **`SSD_CAMPAIGN_OWNER_EMAIL`** | **Default** inbox for partner **owner** alerts — same as SSD campaign digests and instant alerts. If unset, code falls back to **`ileonzh@gmail.com`** (see `campaignOwnerEmail()` in `lib/ssd-campaign-server.ts`). |
| **`PARTNERS_NOTIFY_EMAIL`** | **Optional.** Comma-separated override for partner alerts only: first = Resend `to`, rest = `bcc`. If unset, **`SSD_CAMPAIGN_OWNER_EMAIL`** is used. |

Supabase (`partner_applications`) is separate from email: rows can save even if Resend is missing.

### Baby steps: applicant mail from `noreply@`

#### Step 1 — Resend only (full detail; **finish this before Vercel**)

Goal: Resend must consider **`bayviewhub.me`** a **verified sending domain**. Then the API may use **`From: … <noreply@bayviewhub.me>`** the same way it already uses `alerts@…`.

1. **Sign in** at [resend.com](https://resend.com) with the **same Resend account** that owns the **`RESEND_API_KEY`** you use on Vercel (wrong account = domain verified but API still rejected).

2. Open **Domains**  
   - Sidebar: **Domains**, or go to [resend.com/domains](https://resend.com/domains).

3. **Find `bayviewhub.me`**  
   - If it is **already listed** and status is **Verified** (green): you are done with Step 1. Resend does **not** require a separate “add noreply” for each local-part: any address `@bayviewhub.me` is allowed for the API once the domain is verified (same reason `alerts@` works).  
   - If the domain is **missing**: click **Add domain** → enter `bayviewhub.me` → continue.

4. **If the domain is not verified yet**  
   - Click **`bayviewhub.me`** in the list. Resend shows the **DNS records** to add (typically **SPF** via TXT, **DKIM**, sometimes **MX** for bounce handling — exact names/values are **copy-paste from Resend**, do not guess).  
   - In your **DNS host** (Cloudflare, Vercel DNS, registrar, etc.): create **exactly** those records. Common pitfalls:  
     - **Typos** in host/name or value.  
     - **Duplicate SPF**: only one SPF TXT at root; merge with existing mail providers if needed ([Resend SPF docs](https://resend.com/docs/dashboard/domains/introduction)).  
     - **Propagation**: can take minutes to a few hours; Resend’s domain page usually has **Verify** / auto re-check.

5. **Confirm verification**  
   - Return until **`bayviewhub.me`** shows **Verified**.  
   - Official overview: [Resend — Domains](https://resend.com/docs/dashboard/domains/introduction).

6. **Sanity check (optional)**  
   - In Resend, open **Emails** (log). If you already send mail with `alerts@bayviewhub.me` successfully, the same domain verification covers **`noreply@`** — no extra Resend toggle for “noreply” in the typical setup.

**Stop after Step 1 until the domain is Verified.** Wrong or missing DNS cannot be fixed in Vercel or in this repo.

#### Step 2 — Vercel

- Project → **Settings** → **Environment Variables** → add  
  `RESEND_FROM_NOREPLY` = `Bayview Hub <noreply@bayviewhub.me>`  
  (same display-name style as `RESEND_FROM`.)

#### Step 3 — Redeploy

- Trigger a new **production** deployment so the server reads `RESEND_FROM_NOREPLY`.

#### Step 4 — Smoke test

- Submit `/partners#apply` with a test inbox. Applicant message **From** should be **`noreply@bayviewhub.me`**; internal alert should still use **`RESEND_FROM`** (e.g. `alerts@…`).

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
