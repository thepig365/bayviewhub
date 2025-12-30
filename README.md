# Bayview Hub Website

A modern, SEO-optimized destination hub website built with Next.js 14, TypeScript, and Tailwind CSS. Designed for easy deployment on Vercel with comprehensive social media integration.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, Schema.org markup
- **Social Media Ready**: Share buttons, Instagram feed integration, reviews widgets
- **Responsive Design**: Beautiful UI that works perfectly on all devices
- **Performance Optimized**: Fast page loads, optimized images, efficient code splitting
- **Vercel Ready**: One-click deployment with proper configuration

## 📁 Project Structure

```
bayviewhub/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── experiences/         # Experiences pages
│   ├── partners/            # Partner recruitment pages
│   ├── gardens/             # Garden subscriptions
│   ├── workshops/           # Workshop bookings
│   ├── events/              # Events calendar
│   ├── visit/               # Visit information
│   ├── invest/              # Investment information
│   └── api/                 # API routes (newsletter, etc.)
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Reusable UI components
│   └── social/              # Social media components
├── lib/
│   ├── constants.ts         # Site-wide constants
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```
Edit `.env` with your actual values.

3. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📦 Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

### Environment Variables to Set in Vercel

Go to Project Settings → Environment Variables and add:

- `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., https://bayviewhub.com.au)
- Email service keys (Mailchimp, SendGrid, etc.)
- Analytics IDs (Google Analytics, Facebook Pixel)
- Instagram token (if using feed integration)

### Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., bayviewhub.com.au)
3. Follow DNS configuration instructions
4. Vercel handles SSL automatically

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.ts` to customize your color palette:

```typescript
colors: {
  primary: { ... },  // Green tones
  accent: { ... },   // Orange tones
  natural: { ... },  // Neutral tones
}
```

### Content Updates

Most content is managed in `/lib/constants.ts`:

- Site information
- Navigation items
- Experiences data
- Founding roles
- Social media links

### Images

Place images in `/public/images/` directory:

- `gallery.jpg`
- `workshops.jpg`
- `gardens.jpg`
- `restaurant.jpg`
- `music.jpg`
- etc.

Update image references in `constants.ts`.

## 📧 Email Newsletter Integration

### Option 1: Mailchimp

1. Create a Mailchimp account
2. Create an audience list
3. Generate API key
4. Add to environment variables
5. Uncomment Mailchimp code in `/app/api/newsletter/route.ts`

### Option 2: SendGrid

1. Create SendGrid account
2. Set up Marketing Campaigns
3. Generate API key
4. Add to environment variables
5. Implement SendGrid integration

## 📱 Social Media Integration

### Instagram Feed

**Option A: Instagram Basic Display API**
- Requires Facebook Developer account
- Follow [Instagram Basic Display API setup](https://developers.facebook.com/docs/instagram-basic-display-api)
- Update `/components/social/InstagramFeed.tsx`

**Option B: Third-Party Service**
- Use SnapWidget, EmbedSocial, or Flockler
- Much easier to set up, but may have costs
- Simply embed their widget code

### Reviews Integration

**Option A: Google Business Profile**
- Set up Google Business Profile
- Use [Google My Business API](https://developers.google.com/my-business/content/review-data)

**Option B: Aggregation Service**
- Use Trustpilot, Birdeye, Podium, or similar
- Aggregate reviews from multiple platforms
- Easier to manage

### Share Buttons

Already implemented! Social share buttons work out of the box for:
- Facebook
- Twitter
- LinkedIn
- WhatsApp
- Email
- Native share (mobile devices)

## 🔍 SEO Features

- ✅ Semantic HTML structure
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org JSON-LD markup (LocalBusiness)
- ✅ Sitemap generation (automatic with Next.js)
- ✅ Robots.txt configuration
- ✅ Canonical URLs
- ✅ Meta descriptions for all pages
- ✅ Alt tags for images

## 📊 Analytics Setup

### Plausible (preferred)

1. Create a Plausible account and add your site
2. Set this env var in Vercel:
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `bayviewhub.me` (or your canonical domain)

The Plausible script is automatically loaded site-wide in `app/layout.tsx` when this env var is set.

**Tracked events (current):**

- `eg_apply_click` (CTA click)
- `eg_book_call_click` (CTA click)
- `eg_form_submit_success` (EOI form success)
- `eg_form_submit_error` (EOI form error)

Event properties include attribution fields when present (e.g. `utm_source`, `utm_campaign`, `gclid`).

### Google Analytics (GA4) (optional fallback)

If you don't want Plausible, or you want GA4 as an additional sink, set:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`

GA4 is loaded site-wide from `app/layout.tsx` when the env var is set.

## 🔗 How to generate trackable links (UTM)

Use UTMs when sharing the Edible Gardens landing page:

Base URL:

- `https://www.bayviewhub.me/partners/edible-gardens`

Example (Facebook ad):

- `https://www.bayviewhub.me/partners/edible-gardens?utm_source=facebook&utm_medium=paid_social&utm_campaign=edible_gardens_founding_partner&utm_content=video_a`

**Supported attribution params (captured + included in EOI payload + events):**

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
- `gclid`, `fbclid`, `msclkid`

## 📈 How to view analytics

### Plausible

1. Open your Plausible dashboard
2. Filter by page: `/partners/edible-gardens`
3. View events: `eg_apply_click`, `eg_book_call_click`, `eg_form_submit_success`

### GA4

1. Open GA4 → Reports → Engagement → Events
2. Look for events: `eg_apply_click`, `eg_book_call_click`, `eg_form_submit_success`
3. Use Explorations to break down by UTM parameters (when present)

### Facebook Pixel

Similar process - add pixel ID to environment variables and implement tracking.

## 🛠 Build & Production

### Build for production:
```bash
npm run build
```

### Test production build locally:
```bash
npm run start
```

### Check for errors:
```bash
npm run lint
```

## 📝 To-Do After Deployment

- [ ] Add actual images to `/public/images/`
- [ ] Update contact information in `lib/constants.ts`
- [ ] Configure email service provider
- [ ] Set up Instagram feed
- [ ] Add Google Analytics
- [ ] Configure domain in Vercel
- [ ] Test all forms
- [ ] Set up SSL (automatic with Vercel)
- [ ] Create social media accounts
- [ ] Add real content to all pages
- [ ] Test mobile responsiveness
- [ ] Set up review collection system

## 🤝 Support

For questions or issues, contact: hello@bayviewhub.com.au

## 📄 License

Proprietary - © 2025 Bayview Hub. All rights reserved.

