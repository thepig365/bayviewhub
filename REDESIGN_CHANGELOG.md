# Bayview Hub Website Redesign Documentation

**Date:** February 27, 2026  
**Baseline:** `v1.0-pre-redesign` (git tag)  
**Branch:** `backup/pre-redesign-feb27`

This document details all UI/UX changes made to bayviewhub.me, intended as a reference for applying consistent design patterns to sub-domain sites (e.g., gallery.bayviewhub.me).

---

## Summary of Changes

| Area | Change | Impact |
|------|--------|--------|
| Header Navigation | Reduced from 8 items to 6 visitor-focused items | Cleaner UX |
| Homepage Hero | Split layout (color left, image right) carousel | The Broad-inspired design |
| Plan Your Visit | New info box section with 3 columns | Better visitor guidance |
| Stay In Touch | Simplified newsletter signup | Cleaner conversion |
| Footer | Restructured with 4 columns + simplified preferences | Professional layout |
| Theme Toggle | Simplified to 3 icon buttons | Less intrusive |

---

## 1. Header Navigation Update

### Files Changed:
- `lib/constants.ts`
- `components/layout/Header.tsx`

### Before:
```typescript
export const NAV_ITEMS = [
  { label: 'Overview', href: '/' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Cellar Door', href: '/cellar-door' },
  { label: 'Events', href: '/events' },
  { label: 'Backyard Small Second Home', href: '/backyard-small-second-home' },
  { label: 'Partners', href: '/partners' },
  { label: 'Invest', href: '/invest' },
  { label: 'Visit', href: '/visit' },
]
```

### After:
```typescript
export const NAV_ITEMS: { label: string; href: string; external?: boolean }[] = [
  { label: 'Visit', href: '/visit' },
  { label: "What's On", href: '/events' },
  { label: 'Food/Wine', href: 'https://www.thepigandwhistle.com.au/', external: true },
  { label: 'Gallery', href: 'https://gallery.bayviewhub.me/archive', external: true },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Gardens', href: '/edible-gardens' },
]
```

### Key Changes:
- Added `external` flag for external links
- External links use `target="_blank"` and `rel="nofollow noopener noreferrer"`
- Removed B2B items (Partners, Invest, Second Home) from main nav - still accessible via URL and footer
- Visitor-focused navigation only

---

## 2. Homepage Redesign (The Broad-Inspired)

### File Changed:
- `app/page.tsx`

### Design Pattern: Split Hero Carousel
```
┌─────────────────────────────────────────────────────────────────┐
│  ████████████████████  │                                        │
│  █ CATEGORY LABEL    █  │                                        │
│  █                   █  │         [FULL HEIGHT IMAGE]            │
│  █ Hero Title        █  │                                        │
│  █                   █  │                                        │
│  █ Description text  █  │                                        │
│  █                   █  │                                        │
│  █ [CTA BUTTON]      █  │                                        │
│  █                   █  │                                        │
│  ████████████████████  │                                        │
│       40% width         │           60% width                     │
└─────────────────────────────────────────────────────────────────┘
```

### Hero Slides Structure:
```typescript
const heroSlides = [
  {
    id: 1,
    category: 'Now Open',           // Small uppercase label
    title: 'Bayview Arts Gallery',  // Large serif heading
    description: 'Description...',   // Body text
    cta: { label: 'Explore Gallery', href: '...', external: true },
    image: '/images/gallery.jpg',
  },
  // ... more slides
]
```

### Color Scheme:
- Left panel: `bg-accent` (teal #5EB1BF)
- Text: White on colored background
- CTA button: White with accent text

### Auto-advance: 6 seconds per slide

---

## 3. Plan Your Visit Section

### Design Pattern:
```
PLAN
YOUR VISIT
MORE INFO →

┌─────────────────────────────────────────────────────────────────┐
│  BAYVIEW HUB          │ KNOW BEFORE YOU    │ EXPERIENCES        │
│  365 Purves Road,     │ GO & FAQ           │                    │
│  Main Ridge, VIC      │                    │ Description...     │
│                       │ Description...     │                    │
│  [📞] [✉️] [📍]        │                    │                    │
│                       │ LEARN MORE →       │ LEARN MORE →       │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation:
- Section header with line break in title
- Bordered info box with 3-column grid
- Contact icons in circular buttons
- "Learn More" links in accent color

---

## 4. Stay In Touch Section

### Before:
- Dark background
- Centered layout
- Full NewsletterForm component with checkboxes

### After:
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   STAY                         [email input    ] [SIGN UP]      │
│   IN TOUCH                                                      │
│                                                                 │
│   Sign up to get the latest news...                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation:
- Light gray background (`bg-gray-100`)
- White card with border
- 2-column grid: text left, simple form right
- Single email input + teal button (no checkboxes)

---

## 5. Footer Restructure

### File Changed:
- `components/layout/Footer.tsx`

### New Structure:
```
┌─────────────────────────────────────────────────────────────────┐
│  BAYVIEW HUB        VISIT           EXPERIENCES    PROGRAMS     │
│  Address...         Links...        Links...       Links...     │
│                     HOURS           GALLERY                     │
│                     Schedule...     Links...                    │
├─────────────────────────────────────────────────────────────────┤
│  Language: EN / 中文    Theme: [☀️] [🌙] [💻]                     │
├─────────────────────────────────────────────────────────────────┤
│           PARTNERS    VISIT    SITE MAP    CONTACT              │
├─────────────────────────────────────────────────────────────────┤
│  [Social Icons]           © 2026 Bayview Hub | Privacy | Terms  │
│                                                                 │
│        Acknowledgement of Country...                            │
└─────────────────────────────────────────────────────────────────┘
```

### Color Palette:
- Main footer: `bg-[#1a2332]`
- Bottom bar: `bg-[#141b26]`
- Text: `text-gray-400` (links), `text-gray-500` (labels)
- Hover: `hover:text-white`

---

## 6. Simple Theme Toggle Component

### New File:
- `components/theme/SimpleThemeToggle.tsx`

### Purpose:
Replaces the large ThemeMenu with minimal icon buttons.

### Implementation:
```tsx
const themes = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'system', icon: Monitor, label: 'Auto' },
]
```

### Styling:
- Active: `text-white bg-gray-600`
- Inactive: `text-gray-500 hover:text-white`
- Size: `p-1.5` padding, `w-4 h-4` icons

---

## 7. CSS/Dark Mode Fix

### File Changed:
- `app/globals.css`

### Issue:
Navigation text was invisible (white on white) due to global dark mode rule overriding link colors.

### Fix:
```css
/* Before */
.dark body, .dark p, .dark span, .dark li, .dark a {
  color: var(--fg);
}

/* After - removed .dark a to allow component-specific colors */
.dark body, .dark p, .dark span, .dark li {
  color: var(--fg);
}
```

### Header Link Fix:
```tsx
// Changed from
className="text-black hover:text-accent dark:text-fg"

// To
className="text-gray-900 hover:text-accent dark:text-gray-100"
```

---

## Design Tokens Reference

### Colors:
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--accent` | #5EB1BF | #7DD3C4 | Primary brand, CTAs |
| `--accent-hover` | #3D8A96 | #5EB1BF | Hover states |
| `--fg` | #111827 | #F9FAFB | Primary text |
| `--muted` | #374151 | #D1D5DB | Secondary text |
| `--bg` | #FAFAF8 | #0F172A | Page background |
| `--surface` | #FFFFFF | #1E293B | Card/section backgrounds |

### Typography:
- Headings: `font-serif` (Georgia fallback)
- Body: `font-sans` (system-ui fallback)
- Nav links: `text-sm` (13px on desktop)
- Section labels: `tracking-widest uppercase`

### Spacing:
- Section padding: `py-16 md:py-20`
- Container: `container mx-auto px-4`
- Card padding: `p-8 md:p-12`
- Grid gaps: `gap-6` or `gap-8`

---

## Files Modified (Complete List)

| File | Type | Change |
|------|------|--------|
| `lib/constants.ts` | Modified | NAV_ITEMS updated |
| `app/page.tsx` | Replaced | Full homepage redesign |
| `app/globals.css` | Modified | Dark mode selector fix |
| `components/layout/Header.tsx` | Modified | External link handling, text colors |
| `components/layout/Footer.tsx` | Replaced | New structure, inline preferences |
| `components/theme/SimpleThemeToggle.tsx` | **New** | Minimal theme toggle |

---

## Pages NOT Deleted (Still Accessible)

These pages were removed from main navigation but remain fully functional:

- `/cellar-door` - Wine tastings page
- `/partners` - Founding partners application
- `/invest` - Investment information
- `/backyard-small-second-home` - SSD builder service
- `/experiences` - Full experiences listing
- All API routes remain intact

---

## Applying to Sub-Domains

When applying this design to sub-domains (e.g., gallery.bayviewhub.me):

1. **Copy design tokens** from `globals.css` and `tailwind.config.ts`
2. **Use the split hero pattern** for feature pages
3. **Implement SimpleThemeToggle** for consistent theme switching
4. **Follow the footer structure** with appropriate links
5. **Use the same color palette** (accent teal, dark navy footer)
6. **Apply external link rules** (`target="_blank"`, `rel="nofollow noopener noreferrer"`)

---

## Revert Instructions

To revert to pre-redesign state:

```bash
# Switch to backup branch
git checkout backup/pre-redesign-feb27

# Or reset main to tag
git reset --hard v1.0-pre-redesign
git push --force
```

See `REVERT_POINTS.md` for full revert documentation.
