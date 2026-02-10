# AI / LLM Referral Traffic Tracking in GA4

This document describes how to identify and track traffic from AI-powered search experiences (e.g., ChatGPT Search, Gemini, Perplexity, Claude, Copilot) in Google Analytics 4.

## Prerequisites

- GA4 property configured on the site (via `NEXT_PUBLIC_GA_MEASUREMENT_ID`)
- No credentials required for this documentation

---

## 1. Finding AI Referrals in GA4

### Traffic Acquisition > Session Source/Medium

1. Go to **Reports** → **Acquisition** → **Traffic acquisition**
2. Look at the **Session source** or **Session source/medium** dimension
3. Common AI referral sources may appear as:
   - `chatgpt.com`
   - `gemini.google.com`
   - `perplexity.ai`
   - `claude.ai`
   - `copilot.microsoft.com`
   - `bing.com` (with `chat` or similar in medium)

**Note:** AI referrals are not always consistently labeled. Some providers may not send referrer headers. UTM parameters help.

---

## 2. Filtering by UTM Source (chatgpt.com)

### Landing Page + Query String

1. Go to **Explore** → Create a new **Free form** exploration
2. Add dimensions: **Landing page**, **Session source**, **Session medium**, **Page path**
3. Add a filter: **Session source** = `chatgpt.com` (or use regex)
4. Alternatively, filter by **Event name** = `page_view` and add a secondary dimension for **Page path** to see which pages receive AI traffic

### Query String (UTM)

If you append UTM parameters to links shared in AI responses (e.g., `?utm_source=chatgpt.com`), you can:

1. In **Explore**, add a filter: **Event parameter** = `utm_source` **contains** `chatgpt`
2. Or filter **Session source** = `chatgpt.com` when available

---

## 3. Suggested GA4 Custom Channel Group (Regex)

Create a **Custom channel group** to group AI traffic:

1. Go to **Admin** → **Data display** → **Channel groups**
2. Create a new channel group
3. Add a rule for a custom channel, e.g. **"AI Search"**:
   - **Condition:** Session source **matches regex**
   - **Regex pattern:**  
     `chatgpt\.com|gemini\.google\.com|perplexity\.ai|copilot\.microsoft\.com|claude\.ai`

This groups traffic from these providers into a single "AI Search" channel for easier reporting.

---

## 4. Attribution Messiness

AI referrals can be inconsistent because:

- **Referrer policies:** Some AI providers may not send referrer headers
- **In-app browsers:** Users may open links in embedded browsers that report differently
- **Privacy:** Some providers may anonymize or alter referrer data
- **New providers:** New AI search products may not yet appear in standard reports

**Recommendation:** Use channel groups as a best-effort aggregate. Combine with UTM parameters when you control the link (e.g., in llms.txt or when sharing links with AI providers) to improve attribution.

---

## 5. Verification Steps

1. **Submit sitemap** in Google Search Console to ensure AI crawlers can discover pages
2. **Check GSC** for any AI-specific indexing (if available)
3. **Monitor GA4** weekly for new session sources that might be AI-related
4. **Update channel group regex** when new AI referral sources are identified

---

*Last updated: 2025-02-10*
