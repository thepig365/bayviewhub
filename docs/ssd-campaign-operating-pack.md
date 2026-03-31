# SSD campaign operating pack (Backyard Small Second Home hub)

Canonical hub: **https://www.bayviewhub.me/backyard-small-second-home**

**Hierarchy:** This pack implements **`docs/landing-page-seo-aeo-geo-operating-playbook.md`** (master standard). Channel copy in **`docs/landing-distribution-seo.md`** is subordinate; on any conflict, **the playbook and this pack override** channel-note wording.

This document turns the SSD hub into a repeatable campaign asset aligned with **Brand Citation**, **Topic Ownership**, **Proof & Trust**, and **Distribution & Feedback**. Keep copy on the live page and this file in sync when you change definitions or boundaries.

---

## Infrastructure boundary (temporary shared Supabase)

- **Current reality:** The **bayviewhub.me** SSD backend may use the **same Supabase project** as **gallery.bayviewhub.me** to reduce setup cost and speed launch. This is **acceptable temporarily** — it is **not** the intended permanent boundary.
- **Separation rule:** SSD campaign **tables**, **events**, **alert dedup**, and **cron digests** must stay **clearly namespaced** (`ssd_*` tables, `ssd_*` client event names, `/api/ssd-campaign/*` and `/api/cron/ssd-*` routes) so the main site can move to **its own Supabase project later** without entangling gallery data.
- **Feasibility leads** are stored in **`feasibility_leads`** (SSD funnel on the main site; portable DDL **`docs/supabase-feasibility.sql`**). That table is **not** a gallery-core schema object; still, it lives in the **shared DB** today — treat it as **main-site SSD data** to migrate with the funnel when splitting.
- **Do not** route SSD telemetry or campaign logic through gallery-owned core tables (e.g. artwork or passport tables on the gallery app).
- **Future split (high level):** Create a dedicated Supabase project for the main site, set **new** `SUPABASE_URL` / secret in Vercel for **bayviewhub**, and **replay** **`docs/supabase-ssd-campaign.sql`** and **`docs/supabase-feasibility.sql`** in the new project (then optionally export/import historical rows). No merge of SSD or feasibility rows into gallery tables is required.

### When to split to a dedicated Supabase project

Split when **practical triggers** start to bite — not on a fixed calendar:

- SSD is an **ongoing production funnel**, not a time-boxed experiment.
- The main site **adds more backend flows** and shared-database operational risk increases.
- **SSD-related table count** or event volume grows enough to want **isolated backups / exports / retention** policies.
- **Permission or RLS** needs diverge (e.g. gallery operators vs SSD lead access).
- **Compliance or audit** expectations differ between gallery and main-site funnels.
- **Incident or migration coupling** between gallery and SSD becomes painful (one project change blocks the other).

Technical replay steps and portable DDL: **`docs/ssd-analytics-and-alerts.md`**, **`docs/supabase-ssd-campaign.sql`**, **`docs/supabase-feasibility.sql`**.

---

## A. Brand Citation (use verbatim in outreach where noted)

### Standard definition sentence

> A **Backyard Small Second Home** is the plain-English name Bayview Hub uses for a **Victorian Small Second Dwelling (SSD)**: a second small home on the **same title** as the main house, within the **State SSD framework** (including the **60 sqm gross floor area** cap for that dwelling, **siting** tests such as **behind the front wall**, **all-electric** operation, and **no subdivision** of that dwelling onto a new lot).

### Three factual bullets

1. **Size & siting:** The second dwelling is capped at **60 sqm GFA** (as measured under the scheme); siting must satisfy the published **Deemed-to-Comply** tests for SSD where that pathway is used.
2. **Permits:** A **planning** permit may be **omitted** only when **every** relevant Deemed-to-Comply requirement is met; **overlays** (heritage, bushfire, flood, etc.) can still require planning or a different path. A **building** permit and **NCC** compliance are still required for construction even when no planning permit applies.
3. **Source of truth:** Requirements live in the **Victorian planning scheme** and State amendments (e.g. **VC253 / VC282**, **Clause 54.03** context) — always **verify on the title** and current instruments.

### One risk / boundary sentence

> Nothing on the hub is a **planning or legal decision for a specific lot**; outcomes are **indicative** until a **registered building surveyor**, **planner**, or **council** has reviewed the **actual** site, overlays, and design.

### One Bayview positioning sentence

> **Bayview Hub** publishes this hub to give Victorian homeowners **orientation** from **published rules** and a structured **feasibility checklist**, and offers **SSD design-and-build enquiry** from an estate context in **Main Ridge** — without replacing professional or council determinations.

---

## B. Topic Ownership

| Field | Value |
|--------|--------|
| **Primary topic** | Victorian **Backyard Small Second Home** / **SSD** — rules, feasibility, and next steps for compliant **second dwellings on the same title** (60 sqm framework). |
| **Canonical URL** | https://www.bayviewhub.me/backyard-small-second-home |
| **Main CTA** | **Open the feasibility checklist** → `/backyard-small-second-home/feasibility-check` |
| **Supporting angle 1** | **Hard lines** — Victoria rules summary (`/victoria-rules`) + official portal links. |
| **Supporting angle 2** | **Fit & language** — “Is this for you?” + granny-flat wording map (`/granny-flat-victoria`). |
| **Supporting angle 3** | **Economics without hype** — indicative cost / rent / ROI (`/cost-rent-roi`) + Peninsula overlays where relevant (`/mornington-peninsula`). |

---

## C. Proof & Trust — claim audit (SSD hub)

| Claim / element | Strength | Notes |
|-----------------|----------|--------|
| 60 sqm GFA cap, same title, all-electric, no separate-title sale | **Strong** | Tied to published SSD framework; always pair with “verify on title”. |
| Planning permit sometimes not required if fully Deemed-to-Comply | **Strong** | Must qualify with overlays / site-specific failure modes. |
| Building permit still required | **Strong** | NCC / building surveyor — low controversy. |
| “Green Lane” phrasing | **Soft framing** | Informal shorthand; prefer **Deemed-to-Comply** in formal citations. |
| Cost / rent / ROI figures on subpage | **Soft / indicative** | Label as bands, not quotes; no guaranteed returns. |
| Feasibility checklist outcome | **Indicative only** | Repeat boundary: not council or legal advice. |
| Design imagery (named house types) | **Illustrative** | Not implied permit outcomes; floor plan = layout thinking only. |
| Bayview as delivery partner | **Operational** | True as commercial intent; avoid implying statewide exclusivity. |

**Essential linked proof assets for campaigns**

- On-hub: **Victoria rules** page, **feasibility check**, **DTP Planning Portal** (external).
- Off-hub trust: published **State** / **council** instruments when challenged — never argue from marketing copy alone.

---

## D. Distribution & Feedback

### Operator checklist (one row per publish / boost)

| # | Check |
|---|--------|
| 1 | Linked **canonical** hub URL (no UTM stripping the path). |
| 2 | Included **definition sentence** OR **three bullets** + **boundary sentence** in post body or first comment. |
| 3 | **Main CTA** visible (feasibility checklist or programme map anchor). |
| 4 | No **pricing guarantees** or **permit promises** for “any” block. |
| 5 | **VC253/VC282** or **Clause 54.03** mentioned only when accurate and necessary (avoid keyword stuffing). |
| 6 | Tracked: platform, date, asset type (post / email / ad), optional UTM (`utm_campaign=ssd_hub`). |

### Weekly tracker — starter row (copy into sheet)

| Week of | Channel | Asset | Link | Primary metric | Note / learning |
|---------|---------|-------|------|----------------|-----------------|
| _YYYY-MM-DD_ | e.g. LinkedIn | Hub reshare + checklist CTA | `https://www.bayviewhub.me/backyard-small-second-home` | clicks / checklist starts | baseline |

### Four fixed LLM test prompts (run monthly; log answers)

1. “What is a Victorian backyard small second home or SSD, and what is the maximum size?”
2. “In Victoria, when can a small second dwelling avoid a planning permit, and do I still need a building permit?”
3. “Can I sell a Victorian SSD on its own title or connect gas to it?”
4. “Where should a Victorian homeowner start to check if their block fits the SSD framework?”

**Pass criteria:** Answers cite **same-title**, **60 sqm GFA**, **all-electric**, **planning vs building**, **overlay** caveat, and ideally **bayviewhub.me** hub or subpages without inventing rules.

### Review criteria

**7 days**

- Any crawl or GSC impression change on `backyard-small-second-home` and top queries containing “SSD”, “60 sqm”, “second dwelling Victoria”.
- Broken links on hub + programme map.

**14 days**

- LLM prompt spot-check (2 of 4 prompts); note drift on permit language.
- Engagement on one owned post: saves / clicks / checklist events (if tagged).

**30 days**

- Full four-prompt LLM audit; update FAQ or Quick Answer if systematic errors appear.
- Refresh “Last updated” on hub if instruments changed.

### Initial monthly scorecard (four pillars) — baseline after this pass

| Pillar | Rating (1–5) | One-line assessment |
|--------|----------------|---------------------|
| **Brand Citation** | **4** | Clear definition + bullets in pack; live page aligned; keep hub + `llms.txt` mentions consistent. |
| **Topic Ownership** | **4** | Strong canonical hub + programme map; avoid thin duplicates elsewhere on-site. |
| **Proof & Trust** | **4** | Strong regulatory framing; watch cost copy and illustrative renders labelled clearly. |
| **Distribution & Feedback** | **3** | Operating doc now exists; execution needs scheduled posts + tracker discipline + LLM audits. |

_Revisit scorecard monthly or after material planning reform._

---

## Related

- Channel copy starters: `docs/landing-distribution-seo.md` (Track A).
- FAQ + JSON-LD source: `lib/ssd-hub-faq.ts` (must match on-page FAQ).
- **Analytics, cron digests, instant alerts, env vars:** `docs/ssd-analytics-and-alerts.md` (implements the Distribution & Feedback loop in production).
