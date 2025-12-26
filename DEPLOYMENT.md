# Bayview Hub - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Bayview Hub website"
```

2. **Push to GitHub**:
```bash
# Create a new repository on GitHub first
git remote add origin https://github.com/yourusername/bayviewhub.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended for beginners)

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **"Add New..." → "Project"**
4. **Import** your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: (your account)
# - Link to existing project: N
# - Project name: bayviewhub
# - Directory: ./
# - Override settings: N
```

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to **Project Settings → Environment Variables**
2. Add the following variables:

#### Required:
```
NEXT_PUBLIC_BASE_URL = https://your-domain.vercel.app
```

#### Email Service (choose one):
```
# Mailchimp
MAILCHIMP_API_KEY = your_mailchimp_api_key
MAILCHIMP_LIST_ID = your_list_id
MAILCHIMP_SERVER_PREFIX = us1

# OR SendGrid
SENDGRID_API_KEY = your_sendgrid_api_key
```

#### Analytics (optional but recommended):
```
NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID = your_fb_pixel_id
```

#### Social Media (optional):
```
INSTAGRAM_ACCESS_TOKEN = your_instagram_token
```

3. Click **"Save"**
4. **Redeploy** for variables to take effect

### Step 4: Custom Domain Setup

1. In Vercel Dashboard, go to **Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain: `bayviewhub.com.au`
4. Follow DNS configuration instructions:

#### For Domain Registrar DNS:
Add these records to your DNS provider:

```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Or use Vercel Nameservers (easier):
Point your domain's nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

5. Wait for DNS propagation (can take 24-48 hours)
6. SSL certificate is automatically provisioned by Vercel

### Step 5: Verify Deployment

1. **Visit your site**: `https://your-project.vercel.app`
2. **Test all pages**:
   - Home: `/`
   - Experiences: `/experiences`
   - Partners: `/partners`
   - Gardens: `/gardens`
   - Workshops: `/workshops`
   - Events: `/events`
   - Visit: `/visit`
   - Invest: `/invest`

3. **Test forms**:
   - Newsletter signup
   - Partner application
   - Contact forms

4. **Check SEO**:
   - View page source and verify meta tags
   - Test social sharing on Facebook/Twitter
   - Check `/robots.txt`
   - Check `/sitemap.xml`

5. **Mobile responsiveness**: Test on various devices

## 🔧 Post-Deployment Tasks

### 1. Content Updates

#### Add Images
Upload images to `/public/images/`:
- `gallery.jpg`
- `workshops.jpg`
- `gardens.jpg`
- `restaurant.jpg`
- `cellar.jpg`
- `music.jpg`
- `functions.jpg`
- `stay.jpg`
- `og-image.jpg` (1200x630px for social sharing)
- `favicon.ico`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`

#### Update Contact Information
Edit `/lib/constants.ts`:
```typescript
export const SITE_CONFIG = {
  phone: '+61 (0)X XXXX XXXX',  // Update this
  address: 'Your actual address',  // Update this
  // ... other config
}
```

### 2. Email Integration

#### Mailchimp Setup:
1. Create account at mailchimp.com
2. Create audience list
3. Go to Account → Extras → API keys
4. Generate new API key
5. Add to Vercel environment variables
6. Uncomment Mailchimp code in `/app/api/newsletter/route.ts`
7. Redeploy

#### SendGrid Setup:
1. Create account at sendgrid.com
2. Verify sender email
3. Create API key
4. Add to environment variables
5. Implement SendGrid integration in newsletter route

### 3. Social Media Setup

#### Instagram Feed:
**Option 1**: Use SnapWidget
1. Go to snapwidget.com
2. Create Instagram grid widget
3. Copy embed code
4. Replace `/components/social/InstagramFeed.tsx` with embed

**Option 2**: Instagram Basic Display API
1. Create Facebook Developer account
2. Create app and get Instagram Basic Display
3. Get access token
4. Implement in InstagramFeed component

#### Social Accounts:
Create accounts and update links in `/lib/constants.ts`:
```typescript
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/your-page',
  instagram: 'https://instagram.com/your-account',
  twitter: 'https://twitter.com/your-account',
  linkedin: 'https://linkedin.com/company/your-company',
}
```

### 4. Analytics Setup

#### Google Analytics:
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables
4. Add tracking script to `/app/layout.tsx`:

```typescript
import Script from 'next/script'

// In layout, after <body>:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
</Script>
```

#### Facebook Pixel:
Similar process for Facebook tracking

### 5. Reviews Integration

Choose a service:
- **Trustpilot**: trustpilot.com
- **Birdeye**: birdeye.com
- **Podium**: podium.com
- **Google Business Profile**: Directly via API

Update `/components/social/ReviewsWidget.tsx` with your chosen service.

### 6. SEO Optimization

1. **Google Search Console**:
   - Add property for your domain
   - Verify ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Bing Webmaster Tools**:
   - Add and verify site
   - Submit sitemap

3. **Update robots.txt** if needed:
   - Already configured at `/app/robots.ts`

## 🎨 Customization

### Brand Colors
Edit `/tailwind.config.ts`:
```typescript
colors: {
  primary: { /* Your green shades */ },
  accent: { /* Your orange shades */ },
  natural: { /* Your neutral tones */ },
}
```

### Typography
Update font in `/app/layout.tsx` if needed

### Content
Most content is in `/lib/constants.ts` - easy to update without touching code

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Vercel automatically builds and deploys
```

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Run `npm run build` locally first

### Environment Variables Not Working
- Ensure they're added in Vercel Dashboard
- Prefix client-side variables with `NEXT_PUBLIC_`
- Redeploy after adding variables

### Images Not Loading
- Ensure images are in `/public/` directory
- Update image paths in constants
- Use Next.js Image component for optimization

### Forms Not Working
- Check API routes are deployed
- Verify environment variables for email service
- Check browser console for errors

## 📊 Monitoring

### Vercel Analytics
- Automatically enabled in Vercel Dashboard
- Shows pageviews, performance, and more

### Performance
- Check Lighthouse scores
- Optimize images (use WebP format)
- Monitor Core Web Vitals in Search Console

## 🆘 Support

If you encounter issues:
1. Check Vercel documentation: vercel.com/docs
2. Check Next.js documentation: nextjs.org/docs
3. Contact Vercel support (available even on free plan)

## 📝 Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] Custom domain added and DNS configured
- [ ] SSL certificate active
- [ ] All pages tested
- [ ] Forms working
- [ ] Newsletter integration complete
- [ ] Images uploaded
- [ ] Contact info updated
- [ ] Social media accounts created and linked
- [ ] Analytics set up
- [ ] Search Console verified
- [ ] Reviews integration configured
- [ ] Mobile responsiveness verified
- [ ] Performance tested

## 🎉 You're Live!

Once all steps are complete, your Bayview Hub website is live and ready to accept visitors, bookings, and applications!

