# 🎨 Bayview Hub - Visual Design Guide

## Color Palette

### Primary Colors (Green - Nature/Growth)
```
Primary 700: #15803d - Main green for CTAs and accents
Primary 600: #16a34a - Hover states
Primary 500: #22c55e - Lighter accent
Primary 100: #dcfce7 - Backgrounds and highlights
Primary 50:  #f0fdf4 - Subtle backgrounds
```

### Accent Colors (Orange - Energy/Destination)
```
Accent 600: #ea580c - Important CTAs
Accent 500: #f97316 - Highlights
Accent 100: #ffedd5 - Backgrounds
Accent 50:  #fff7ed - Subtle backgrounds
```

### Natural/Neutral (Earth Tones)
```
Natural 900: #1c1917 - Dark text
Natural 800: #292524 - Footer background
Natural 700: #44403c - Body text
Natural 600: #57534e - Secondary text
Natural 200: #e7e5e4 - Borders
Natural 100: #f5f5f4 - Light backgrounds
Natural 50:  #fafaf9 - Page background
```

## Typography

### Headings (Serif)
- Font: Georgia, Cambria, Times New Roman
- Creates: Elegant, established, trustworthy feel
- Used for: H1, H2, H3, brand name

### Body (Sans-serif)
- Font: Inter, System UI
- Creates: Modern, clean, readable
- Used for: Paragraphs, buttons, UI elements

### Scale
```
H1: 3rem - 4.5rem (48px - 72px) - Hero titles
H2: 2.25rem - 3rem (36px - 48px) - Section titles
H3: 1.5rem - 1.875rem (24px - 30px) - Card titles
H4: 1.25rem (20px) - Subsection titles
Body: 1rem (16px) - Regular text
Small: 0.875rem (14px) - Captions, metadata
```

## Component Styles

### Buttons

#### Primary Button
- Background: Green (Primary 700)
- Text: White
- Hover: Darker green (Primary 800)
- Use for: Main actions (Subscribe, Book, Apply)

#### Secondary Button
- Background: Dark neutral (Natural 800)
- Text: White
- Hover: Darker (Natural 900)
- Use for: Secondary actions

#### Accent Button
- Background: Orange (Accent 600)
- Text: White
- Hover: Darker orange (Accent 700)
- Use for: Special attention (New features, urgent)

#### Outline Button
- Border: Dark neutral
- Text: Dark neutral
- Hover: Filled with dark background
- Use for: Tertiary actions, less emphasis

### Cards

#### Standard Card
```
Background: White
Border Radius: 1rem (16px) - rounded-2xl
Shadow: Soft shadow
Hover: Elevated shadow + slight scale
Padding: 1.5rem (24px)
```

#### Highlight Card (New Features)
```
Background: White
Ring: 2px Orange ring
"New" Badge: Orange background, white text
Hover: Enhanced shadow
```

### Forms

#### Input Fields
```
Border: Light neutral
Border Radius: 0.5rem (8px)
Padding: 0.75rem 1rem
Focus: 2px Primary ring, no border
```

#### Checkboxes
```
Color: Primary green when checked
Size: 1rem (16px)
Border Radius: 0.25rem
```

## Layout Structure

### Desktop (1024px+)
```
Container: Max 1280px, centered
Padding: 1rem (16px) sides
Grid: 3-4 columns for cards
Navigation: Horizontal
Menu: Full display
```

### Tablet (768px - 1023px)
```
Container: Full width with padding
Padding: 1rem sides
Grid: 2 columns for cards
Navigation: Horizontal, condensed
Menu: Responsive
```

### Mobile (< 768px)
```
Container: Full width
Padding: 1rem sides
Grid: 1 column
Navigation: Hamburger menu
Cards: Full width stacked
```

## Page Sections

### Hero Section
```
Background: Gradient (Primary 50 to Accent 50)
Text: Centered
Padding: 5rem vertical (80px)
Mobile: 3rem vertical (48px)
```

### Content Sections
```
Background: Alternating (White / Natural 50)
Padding: 5rem vertical (80px)
Mobile: 3rem vertical (48px)
```

### Proof/Stats Bar
```
Background: White
Border: Top & bottom border
Padding: 3rem vertical (48px)
Grid: 2-4 columns
Icons or numbers: Large, Primary color
```

## Icons

- Library: Lucide React
- Size: Usually 1.5rem (24px) for features
- Size: 1rem (16px) for inline icons
- Color: Match text or Primary/Accent
- Style: Outlined (not filled)

## Images

### Aspect Ratios
```
Cards: 16:9 (landscape)
Hero: Wide panoramic
Gallery: Square (1:1) optional
Profile/Logo: Square
```

### Optimization
- Format: WebP with fallback
- Sizes: Multiple breakpoints
- Loading: Lazy load below fold
- Alt tags: Always descriptive

## Spacing System

Using Tailwind's spacing scale (1 unit = 0.25rem = 4px):

```
Tight: 0.25rem - 0.5rem (1-2 units) - Between related elements
Normal: 1rem - 1.5rem (4-6 units) - Between components
Loose: 2rem - 3rem (8-12 units) - Between sections
Extra: 4rem - 5rem (16-20 units) - Section padding
```

## Animations & Transitions

### Hover Effects
```
Duration: 200-300ms
Easing: ease-in-out
Transform: scale(1.05) for images
Shadow: Elevation increase
Color: Subtle color shift
```

### Page Transitions
```
Fade in: Subtle on load
Scroll: Smooth
Links: Instant for internal
```

## Accessibility

### Contrast Ratios
- Body text: Minimum 4.5:1
- Large text: Minimum 3:1
- Interactive elements: Clear focus states

### Focus States
```
Ring: 2px Primary color ring
Offset: 2px from element
Always visible on keyboard nav
```

### Touch Targets
```
Minimum: 44px x 44px (iOS guidelines)
Buttons: Generous padding
Links: Adequate spacing
```

## Responsive Breakpoints

```typescript
sm: '640px'   // Larger phones, portrait tablets
md: '768px'   // Tablets, landscape phones
lg: '1024px'  // Small laptops, large tablets
xl: '1280px'  // Desktops
2xl: '1536px' // Large desktops
```

## Design Patterns

### Navigation
- Sticky header: Always accessible
- Mobile menu: Hamburger icon
- CTAs: Always visible in header
- Active state: Underline or color change

### Cards
- Consistent structure: Image → Title → Description → CTA
- Hover: Scale up image, elevate card
- Mobile: Full width, proper touch targets

### Forms
- Labels: Above inputs
- Validation: Inline errors
- Success: Clear confirmation
- Loading: Disabled state with spinner

### Modals/Overlays
- Background: Semi-transparent dark
- Content: Centered, white card
- Close: X button top-right
- Mobile: Full-screen option

## Common UI Patterns

### Call-to-Action (CTA)
```
Structure:
- Compelling headline
- Supporting text (1-2 lines)
- Primary button
- Optional secondary action

Example:
"Ready to Begin?"
"Join us for a creative journey"
[Primary Button] [Secondary Button]
```

### Feature Grid
```
Structure:
- Icon or image
- Title
- Short description
- Optional link/button

Layout:
- Desktop: 3-4 columns
- Tablet: 2 columns
- Mobile: 1 column
```

### Pricing Cards
```
Structure:
- Highlight: Popular option
- Title: Plan name
- Price: Large, bold
- Features: Checkmark list
- CTA: Button at bottom

Visual:
- Equal height cards
- Highlighted: Scale/ring/shadow
- Hover: Subtle elevation
```

## Brand Voice in Design

### Destination
- Large hero images
- Spacious layouts
- Clear CTAs to "Visit"

### Natural
- Earthy color palette
- Organic shapes (rounded corners)
- Garden/nature imagery

### Aesthetic
- Beautiful typography
- Generous whitespace
- High-quality images

### Restrained
- Clean layouts
- No clutter
- Purposeful animations

### Trustworthy
- Professional polish
- Clear information hierarchy
- Consistent patterns

## Do's and Don'ts

### ✅ Do
- Use consistent spacing
- Maintain color palette
- Keep animations subtle
- Ensure mobile responsiveness
- Use semantic HTML
- Optimize images
- Test accessibility

### ❌ Don't
- Mix too many colors
- Use tiny text
- Overcomplicate layouts
- Ignore mobile users
- Skip alt tags
- Use flash animations
- Overload pages

## Quick Reference

### Most Common Classes

```css
/* Containers */
.container mx-auto px-4

/* Sections */
py-20 bg-white

/* Hero */
text-5xl md:text-6xl font-serif font-bold

/* Cards */
rounded-2xl p-8 shadow-lg hover:shadow-xl

/* Buttons */
px-6 py-3 rounded-lg bg-primary-700 text-white

/* Grids */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
```

## Need to Change Something?

### Brand Colors
→ Edit `tailwind.config.ts`

### Typography
→ Edit `app/layout.tsx` (font imports)
→ Edit `tailwind.config.ts` (font families)

### Component Styles
→ Edit individual components in `components/`

### Global Styles
→ Edit `app/globals.css`

---

**This visual system ensures consistency across all pages while remaining flexible for future growth.**

