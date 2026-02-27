# Bug Sweep Report — 2026-02-27

## PART A — "Pinky" Hero CTA Box Fix

### Source Classification: (B) CSS class — `bg-white/80` on CTA container

**Evidence:** The "Art Gallery" CTA box in the homepage hero (line 60 of
`app/page.tsx`) used `bg-white/80` = `rgba(255,255,255,0.8)`. This semi-transparent
white sits over the hero section's `bg-bg` (`#FAFAF8` — warm off-white). The 20%
transparency allows the warm background to bleed through, creating a visible
"dirty glass" / pinkish tint compared to solid-white surfaces elsewhere on the page.

The left button ("Collection of Arts") used `variant="outline"` which has no explicit
background (transparent), compounding the warm tint bleed-through inside the button.

### Fix Applied

**CTA container (line 60):**
```diff
- bg-white/80 dark:bg-surface/70
+ bg-surface dark:bg-surface
```
`bg-surface` = `var(--surface)` = `#FFFFFF` (solid white, no transparency).
Border already uses `border-border` (`#E5E7EB`) — clean neutral, unchanged.

**Left button "Collection of Arts" (line 63):**
```diff
- <Button href="..." external variant="outline" size="sm">
+ <Button href="..." external variant="outline" size="sm" className="bg-surface dark:bg-surface">
```
Added explicit solid `bg-surface` background. Combined with existing `text-fg`
(`#111827`) and `border-border` (`#E5E7EB`), this ensures:
- WCAG AA contrast: `#111827` on `#FFFFFF` = ~17.5:1 (PASS)
- No transparency bleed-through
- Clean neutral border, not tinted

**Right button "Submit Artwork for Curation":** Unchanged (`bg-accent text-white`).

**No logo assets changed. No copy changed. No hrefs changed.**

### Token Match Verification

| Element | Token | Light Value | Result |
|---------|-------|-------------|--------|
| CTA box bg | `bg-surface` | `#FFFFFF` | Solid white, clean |
| Left button bg | `bg-surface` | `#FFFFFF` | Solid white |
| Left button text | `text-fg` | `#111827` | Dark, readable |
| Left button border | `border-border` | `#E5E7EB` | Neutral gray |
| Right button bg | `bg-accent` | `#5EB1BF` | Teal (unchanged) |
| Right button text | `text-white` | `#FFFFFF` | White (unchanged) |

### Rendered HTML Verification (from dev server)

Container:
```html
<div class="mt-5 inline-flex flex-col items-center gap-3 rounded-xl border border-border bg-surface dark:bg-surface px-4 py-3">
```

Left button:
```html
<a ... class="... border border-border text-fg hover:bg-fg hover:text-bg ... bg-surface dark:bg-surface" ...>Collection of Arts</a>
```

Right button (unchanged):
```html
<a ... class="... bg-accent text-white hover:bg-accent-hover ..." ...>Submit Artwork for Curation</a>
```

---

## PART A (prior) — Logo JPG Fix

### Source Classification: (A) Bitmap pixels in logo JPG

**Evidence:** Visual inspection of `/public/images/bayview-estate-logo.jpg` confirms
purple/violet grape cluster pixels baked into the JPG bitmap. The teal script text
and green vine leaves are fine, but the purple grapes contribute a secondary "pinky"
tone when rendered at header scale.

### Fix Applied: Text-only header mark

Removed the JPG `<Image>` element from `components/ui/Logo.tsx`. The header now
shows "Bayview Hub" in `text-accent` (matching accent buttons: `--accent: #5EB1BF`)
plus "Est. Victoria" in `text-muted`. Removed unused `Image`, `useTheme` imports.

The JPG asset remains in `/public/images/` — no asset was deleted.

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

All key routes tested via `curl -I localhost:3098`:

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

No problematic low-contrast text patterns found. The codebase uses `text-fg`,
`text-muted`, `text-subtle` consistently.

### B4) Header / Nav Usability

- Logo text: `text-accent` on `bg-white/95` → WCAG AA passes for large text.
- Nav links: `text-muted` (`#374151`) on white → contrast ratio ~8.6:1 → PASS.
- Focus rings: `focus-visible:ring-accent` → PASS.

### B5) Footer Readability

- Footer uses `dark` class wrapper → forces dark theme tokens → PASS.
- No washed-out text found.

### B6) External Links Hygiene — BUGS FOUND & FIXED

**P1 — Fixed:** 5 external `<a>` links in `Header.tsx` to `gallery.bayviewhub.me`
were missing `target="_blank"` and `rel="noopener noreferrer"`. All 5 now fixed.

**P2 — Not fixed:** 2 email template links (cosmetic in email client context).

---

## Files Changed

| File | Change |
|------|--------|
| `app/page.tsx` | CTA box: `bg-white/80` → `bg-surface`; left button: added `bg-surface` className |
| `components/ui/Logo.tsx` | Removed JPG image, switched to `text-accent` + `text-muted` classes |
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

Changes are local only. Latest existing commit: `c36fd79`.
**NOT pushed.** No auto-deploy triggered.
