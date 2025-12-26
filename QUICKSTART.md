# 🚀 Bayview Hub - Quick Start Guide

Get your website running locally in 5 minutes!

## Prerequisites

- **Node.js 18+** installed ([download here](https://nodejs.org/))
- A code editor (VS Code recommended)
- Terminal/Command Prompt access

## Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages (Next.js, React, Tailwind CSS, etc.)

## Step 2: Set Up Environment Variables

```bash
cp .env.example .env
```

Open `.env` and add your base URL:
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

(Other variables are optional for local development)

## Step 3: Run Development Server

```bash
npm run dev
```

## Step 4: Open Your Browser

Visit: **http://localhost:3000**

You should see your Bayview Hub website! 🎉

## What You'll See

- ✅ Beautiful homepage with hero section
- ✅ Experiences grid (Gallery, Workshops, Gardens, etc.)
- ✅ Founding partners recruitment section
- ✅ Newsletter signup form
- ✅ All navigation working
- ✅ Responsive design (test on mobile!)

## Available Pages

- **Home**: http://localhost:3000
- **Experiences**: http://localhost:3000/experiences
- **Partners**: http://localhost:3000/partners
- **Gardens**: http://localhost:3000/gardens
- **Workshops**: http://localhost:3000/workshops
- **Events**: http://localhost:3000/events
- **Visit**: http://localhost:3000/visit
- **Invest**: http://localhost:3000/invest

## Making Changes

### Update Content

Most content is in `/lib/constants.ts`:

```typescript
// Edit site information
export const SITE_CONFIG = {
  name: 'Bayview Hub',
  tagline: 'Eat. Listen. Create. Grow.',
  // Update these:
  phone: '+61 (0)X XXXX XXXX',
  address: 'Your address',
  email: 'hello@bayviewhub.com.au',
}

// Edit experiences, roles, etc.
```

Changes appear instantly in your browser!

### Add Images

1. Add your images to `/public/images/`
2. Update paths in `/lib/constants.ts`
3. Recommended images:
   - `gallery.jpg` (Gallery experience)
   - `workshops.jpg` (Workshops)
   - `gardens.jpg` (Gardens)
   - `restaurant.jpg` (Restaurant)
   - `music.jpg` (Music venue)
   - `og-image.jpg` (Social sharing - 1200x630px)

### Change Colors

Edit `/tailwind.config.ts`:

```typescript
colors: {
  primary: { 
    700: '#15803d',  // Your main green
    // ... other shades
  },
}
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Check for errors
npm run lint
```

## Next Steps

1. **Customize Content**: Update text in `constants.ts`
2. **Add Images**: Place real images in `/public/images/`
3. **Test Forms**: Try newsletter signup
4. **Mobile Check**: Test on phone/tablet
5. **Deploy**: Follow `DEPLOYMENT.md` to go live on Vercel

## Need Help?

- **README.md**: Comprehensive documentation
- **DEPLOYMENT.md**: Step-by-step deployment guide
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Features Included

✅ Modern, fast Next.js 14 website
✅ Fully responsive design
✅ SEO optimized (meta tags, sitemap, robots.txt)
✅ Social media ready (Open Graph, Twitter Cards)
✅ Newsletter integration ready
✅ Forms for bookings and applications
✅ Events calendar
✅ Partner recruitment pages
✅ Gardens subscription system
✅ Workshop booking system
✅ Beautiful UI with Tailwind CSS
✅ TypeScript for type safety
✅ Ready for Vercel deployment

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

**Styling not working?**
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

**TypeScript errors?**
```bash
# Rebuild TypeScript
npm run build
```

## You're All Set! 🎉

Your Bayview Hub website is running locally. Start customizing and make it yours!

When ready to go live, follow the **DEPLOYMENT.md** guide.

