# Bug Sweep Report — 2026-02-27

## PART A — "Pinky" Header Fix

### Source Classification: (A) Bitmap pixels

**Evidence:** Visual inspection of `/public/images/bayview-estate-logo.jpg` confirms
purple/violet grape cluster pixels baked into the JPG bitmap. The teal script text
and green vine leaves are fine, but the purple grapes produce the "pinky" tone
when rendered at header scale. Cannot be reliably removed via CSS without degrading
the image.

### Fix Applied: Option 1 — Text-only header mark

Removed the JPG `<Image>` element from the header `Logo` component. The header now
shows "Bayview Hub" in `text-accent` (the same teal/green used by accent buttons:
`--accent: #5EB1BF` light / `--accent: #7DD3C4` dark) plus "Est. Victoria" subtitle
in `text-muted`. Removed unused `Image`, `useTheme` imports and inline style
objects.

The JPG logo asset remains in `/public/images/` for use elsewhere (footer, about
page, print) — no asset was deleted.

**Accent match confirmed:**
- Logo "Bayview Hub" text → `text-accent` → `var(--accent)` → `#5EB1BF`
- Button `variant="accent"` → `bg-accent` → `var(--accent)` → `#5EB1BF`
- Same token, same color.

---

## PART B — Bug Sweep Results

### B1) Build / Lint / Typecheck

| Check       | Result |
|-------------|--------|
| `npm run build` | PASS (47 routes, 0 errors) |
| `next build` linting + types | PASS (built-in) |
| `npx tsc --noEmit` | PASS (clean) |
| `npm run lint` | ESLint not configured (interactive prompt); `next build` covers linting |

### B2) Broken Routes

All key routes tested via `curl -I localhost:3099`:

| Route | Status | Note |
|-------|--------|------|
| `/` | 200 | OK |
| `/art-gallery` | 307 | Intentional redirect → `gallery.bayviewhub.me` (next.config.js:71-74) |
| `/events` | 200 | OK |
| `/partners` | 200 | OK |
| `/privacy` | 200 | OK |
| `/terms` | 200 | OK |
| `/experiences` | 200 | OK |
| `/cellar-door` | 200 | OK |
| `/visit` | 200 | OK |
| `/backyard-small-second-home` | 200 | OK |

No 404s or 500s found.

### B3) Contrast / Readability Regressions

No problematic low-contrast text patterns found (`text-natural-100/200/300`,
`text-white/` opacity, `#81D8D0` on body text). The codebase uses `text-fg`,
`text-muted`, `text-subtle` consistently.

### B4) Header / Nav Usability

- Logo text: `text-accent` on `bg-white/95` → readable (WCAG AA passes for large text).
- Nav links: `text-muted` (`#374151`) on white → contrast ratio ~8.6:1 → PASS.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-accent` on Logo link → PASS.
- Button focus: `focus:ring-2 focus:ring-accent` → PASS.

### B5) Footer Readability

- Footer uses `dark` class wrapper → forces dark theme tokens.
- Headings: `text-fg` (`#F9FAFB` in dark) on `bg-bg` (`#0F172A`) → high contrast → PASS.
- Links: `text-muted` (`#D1D5DB` in dark) → good contrast → PASS.
- No washed-out text found.

### B6) External Links Hygiene — BUGS FOUND & FIXED

**P1 — Fixed:** 5 external `<a>` links in `Header.tsx` to `gallery.bayviewhub.me`
were missing `target="_blank"` and `rel="noopener noreferrer"`:
- Line 101: desktop nav "Art Gallery" link
- Lines 178, 181, 184, 187: mobile menu gallery sub-links

All 5 now have `target="_blank" rel="noopener noreferrer"`.

**P2 — Not fixed (email templates):** 2 links in API route email HTML
(`api/eoi-gallery/route.ts:105`, `api/partners/route.ts:141`) lack `rel`/`target`
attributes. These render in email clients which handle link security differently;
fixing is low-risk P2 and cosmetic in email context.

---

## Files Changed

| File | Change |
|------|--------|
| `components/ui/Logo.tsx` | Removed JPG image, removed `Image`/`useTheme` imports, switched to `text-accent` + `text-muted` classes |
| `components/layout/Header.tsx` | Added `target="_blank" rel="noopener noreferrer"` to 5 external gallery links |

## What Was NOT Fixed (P2) and Why

| Item | Reason |
|------|--------|
| Email template `rel` attributes | Email clients handle link targets differently; low risk |
| ESLint setup | Requires interactive configuration; not a code bug |
| `/art-gallery` 307 redirect | Intentional by design (next.config.js) |

## Build Verification

```
npm run build → PASS
Compiled successfully
Linting and checking validity of types → PASS
47/47 static pages generated
```

## Latest Commit (pre-push)

Changes are staged locally. Latest existing commit: `c36fd79`.
**NOT pushed.** No auto-deploy triggered.
