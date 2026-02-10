# IndexNow Manual Submission

This site is deployed on **Vercel** (static/SSR). IndexNow is supported via manual submission or a post-build script.

## What is IndexNow?

IndexNow allows you to notify search engines (Bing, Yandex, etc.) when content changes, so they can index updates faster.

## Manual Submission

### 1. Generate URLs to Submit

Run the script to output URLs:

```bash
node scripts/indexnow-urls.js
```

This prints one URL per line. Copy to a file or use in the next step.

### 2. Submit via API

1. **Create an IndexNow key file** (e.g., `indexnow-key.txt`) with a random string (e.g., 32 chars). Place it in `public/` so it's accessible at `https://www.bayviewhub.me/indexnow-key.txt`.

2. **Submit URLs** using the IndexNow API:

```bash
curl -X GET "https://api.indexnow.org/indexnow?url=https://www.bayviewhub.me&key=YOUR_KEY&keyLocation=https://www.bayviewhub.me/indexnow-key.txt"
```

For multiple URLs, use the IndexNow bulk endpoint (see [IndexNow docs](https://www.indexnow.org/documentation)).

### 3. Key File Location

- Store the key in `public/indexnow-key.txt`
- Ensure `NEXT_PUBLIC_INDEXNOW_KEY` or `INDEXNOW_KEY` is set in your deployment env if you use a script
- **Do not commit** the actual key to the repo if it's sensitive; generate it in CI/deploy

## Post-Build (Optional)

For a post-build hook to auto-submit after deploy:

1. Add a step in your deployment pipeline (e.g., GitHub Actions or Vercel deploy hook)
2. Run `node scripts/indexnow-ping.js` after a successful build
3. The script should read `INDEXNOW_KEY` from env and use the URLs from the sitemap

## References

- [IndexNow Protocol](https://www.indexnow.org/)
- [IndexNow API](https://www.indexnow.org/documentation)

---

*Last updated: {{LAST_UPDATED}}*
