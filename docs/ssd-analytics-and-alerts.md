# SSD landing — analytics, digests, and instant alerts

This document complements **`docs/ssd-campaign-operating-pack.md`** with the technical layer: what is instrumented, where data lands, and what you must configure in Vercel / Supabase / Resend / GA4 or Plausible.

## Supabase project boundary (shared now, split later)

- The main site may **temporarily** share a Supabase **project** with **gallery.bayviewhub.me**. Policy and split triggers: **`docs/ssd-campaign-operating-pack.md`** → *Infrastructure boundary* / *When to split*.
- **SSD data isolation in code:** Campaign telemetry writes **only** to **`ssd_campaign_events`** and **`ssd_campaign_alert_dedup`**. It does **not** insert into gallery application tables.
- **Feasibility API** writes to **`feasibility_leads`** (SSD funnel; separate table — not gallery core). It uses the **same env-supplied Supabase client** as SSD telemetry today; splitting projects later means **moving both** SSD DDL and feasibility schema/data as you choose.
- **Portable DDL:** Campaign telemetry → **`docs/supabase-ssd-campaign.sql`**. Feasibility leads → **`docs/supabase-feasibility.sql`**. For a **dedicated project later**, create the project and **run both files** (order independent), then point Vercel env vars at the new URL/key; optionally backfill rows from export.

## What runs in production

| Layer | Purpose |
|--------|---------|
| **Plausible** (preferred) or **GA4** | Site-wide page views, sessions, engaged time, acquisition. Configure via `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_MEASUREMENT_ID`. |
| **`/api/ssd-campaign/event`** | Anonymous SSD funnel events stored in Supabase for **digests** and **threshold alerts** (no per-view email spam). |
| **Resend** | Instant alerts + daily/weekly digest emails to **`SSD_CAMPAIGN_OWNER_EMAIL`** (default `ileonzh@gmail.com`). |
| **Vercel Cron** | Hits secured routes `/api/cron/ssd-daily-digest` and `/api/cron/ssd-weekly-digest`. |

## Environment variables

| Variable | Required | Notes |
|----------|----------|--------|
| `RESEND_API_KEY` | For any email | Same as other Bayview forms. |
| `RESEND_FROM` | For any email | Verified sender domain in Resend. |
| `SSD_CAMPAIGN_OWNER_EMAIL` | Recommended | Instant alerts + digests. Default in code: `ileonzh@gmail.com`. |
| `FEASIBILITY_NOTIFY_TO` | Optional | Comma-separated list for feasibility submit (default includes `ileonzh@gmail.com`). |
| `SUPABASE_URL` + `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) | For event storage + digests + feasibility | Run `docs/supabase-ssd-campaign.sql` and `docs/supabase-feasibility.sql`. |
| `CRON_SECRET` | For Vercel Cron | Random string; Vercel sends `Authorization: Bearer <CRON_SECRET>`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Recommended | Client-side analytics. |
| `SSD_SPIKE_HUB_VIEWS_THRESHOLD` | Optional | Default ~28 hub views in ~45 minutes → spike email (hourly dedupe). |
| `SSD_CTA_BURST_THRESHOLD` | Optional | Default ~22 hub link clicks in ~12 minutes → burst email (hourly dedupe). |

## Supabase setup

1. Open Supabase SQL editor (same project as gallery is OK **temporarily** — see *Supabase project boundary* above).
2. Execute **`docs/supabase-ssd-campaign.sql`** — **full SSD campaign telemetry schema**; **replayable** into a new project when you split.
3. Execute **`docs/supabase-feasibility.sql`** — **`feasibility_leads`** for **`POST /api/feasibility`** (main-site SSD funnel; not gallery core). Same **replay** story as step 2.
4. Do **not** expose these tables to anonymous clients; only the Next.js API uses the service role / secret key.

**Feasibility form vs SSD telemetry:** `POST /api/feasibility` checks **`SUPABASE_URL`** and **`SUPABASE_SECRET_KEY`** only (not `NEXT_PUBLIC_SUPABASE_URL` alone). SSD `getSupabaseServer()` accepts `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`, and `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`. Easiest: set **`SUPABASE_URL`** + **`SUPABASE_SECRET_KEY`** (service role) in Vercel for both paths.

## Vercel Cron

`vercel.json` registers:

- **Daily digest** — `30 21 * * *` UTC (~morning Australia, adjust if needed).
- **Weekly digest** — `07:00 UTC Mondays`.

After deploy, confirm in Vercel → Project → Cron Jobs that jobs are active and `CRON_SECRET` is set.

Manual test (replace values):

```bash
curl -s -H "Authorization: Bearer YOUR_CRON_SECRET" \
  "https://www.bayviewhub.me/api/cron/ssd-daily-digest"
```

## Client events (allowlist)

Events accepted by `POST /api/ssd-campaign/event`:

- `ssd_hub_page_view`, `ssd_hub_scroll`, `ssd_hub_link_click`, `ssd_hub_share_click`, `ssd_hub_engagement`
- `ssd_feasibility_page_view`, `ssd_feasibility_form_start`, `ssd_feasibility_form_submit`

**Privacy:** No email, phone, or free-text fields are logged in this pipeline.

## Instant emails (not per page view)

Triggered when Supabase is configured:

1. **First hub view** after ~36h without hub views (single bucket).
2. **Traffic spike** on main hub (threshold in ~45m window, max once per hour bucket via dedup table).
3. **New `utm_source`** on hub (first occurrence in 30 days).
4. **High link-click burst** on hub pages (threshold in ~12m, hourly dedup).
5. **Feasibility form submit** — Resend notification to `FEASIBILITY_NOTIFY_TO` (includes campaign owner by default).

## Troubleshooting `insert_failed` on `/api/ssd-campaign/event`

Response shape: `{ "ok": true, "stored": false, "warn": "insert_failed" }` means the Supabase client is configured but **PostgREST rejected the insert**.

1. **See the real error (pick one):**
   - **Vercel:** Project → deployment → **Logs** (or Runtime Logs), trigger a test `POST`, find `[ssd-campaign] insert failed` — the object logs `message`, `code`, `details`, `hint`.
   - **One-off:** Set **`SSD_INSERT_DEBUG=1`** in Vercel (Production), redeploy, send a test `POST`; the JSON includes a **`debug`** object (`supabase_host`, `url_env_source`, `key_env_source`, `key_kind_guess`, `postgrest` with `message`/`code`/`details`/`hint` on failure). **Remove the env var after** debugging.

2. **Typical causes (by message feel):**
   - **`column ... does not exist` / PGRST204** — `ssd_campaign_events` was created **earlier** with fewer columns; `CREATE TABLE IF NOT EXISTS` did not upgrade it. Run **`docs/supabase-ssd-campaign-align-columns.sql`** in the SQL Editor, then retest.
   - **`permission denied` / RLS** — the key in Vercel is likely the **anon** key, not the **service_role** key. In Supabase → **Settings → API**, reset/copy **service_role** into `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` (never expose this to the client).
   - **`JWT` / invalid API key** — **URL and key must be from the same project**; fix `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` to match the project where the tables live.

3. **Confirm env names on Vercel (Production):** `getSupabaseServer()` uses `SUPABASE_URL` **or** `NEXT_PUBLIC_SUPABASE_URL`, and `SUPABASE_SECRET_KEY` **or** `SUPABASE_SERVICE_ROLE_KEY`. Empty or Preview-only vars will break Production.

## Dashboards (manual)

- **Plausible:** [plausible.io](https://plausible.io) → your domain → pages → `/backyard-small-second-home`.
- **GA4:** Reports → Engagement → Pages + Events; look for custom event names `ssd_*`.
- **Supabase:** Table `ssd_campaign_events` for raw rows used in digests.

## GA4 engaged sessions / engagement time

These are **native GA4 metrics** when `gtag` is enabled. The SSD beacon adds **custom `ssd_hub_engagement`** with `visible_seconds` (tab-visible time, flushed on hide/unmount) for first-party averages in email digests — use both together.
