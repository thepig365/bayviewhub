import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import Script from 'next/script'

const HOME_DESCRIPTION =
  'Bayview Hub is a place-based cultural estate on the Mornington Peninsula. Art, music, hospitality, workshops, edible gardens, and slow life — held together as one human ecology. Home of the Mendpress editorial publication and the Bayview Arts Gallery. Backyard second dwelling consultancy available across Victoria.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Bayview Hub | Cultural Estate, Mornington Peninsula — Art, Music, Hospitality & Mendpress',
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    'winery',
    'restaurant',
    'live music',
    'art gallery',
    'workshops',
    'edible gardens',
    'Victoria',
    'Mornington Peninsula',
    'destination',
    'experiences',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Bayview Hub — Cultural Estate on the Mornington Peninsula',
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bayview Hub — Cultural Estate on the Mornington Peninsula',
    description:
      'Bayview Hub is a place-based cultural estate on the Mornington Peninsula. Art, music, hospitality, workshops, edible gardens, and slow life — held together as one human ecology. Home of the Mendpress editorial publication and the Bayview Arts Gallery.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon',
    apple: '/icon',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  const structuredSameAs = Object.values(SOCIAL_LINKS).filter((url) => url !== 'https://www.linkedin.com/')

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      description: HOME_DESCRIPTION,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address,
        addressLocality: 'Main Ridge',
        addressRegion: 'VIC',
        addressCountry: 'AU',
      },
      sameAs: structuredSameAs,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: HOME_DESCRIPTION,
      publisher: { '@type': 'Organization', name: SITE_CONFIG.name, url: SITE_CONFIG.url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: SITE_CONFIG.name,
      description: HOME_DESCRIPTION,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address,
        addressLocality: 'Main Ridge',
        addressRegion: 'VIC',
        addressCountry: 'AU',
      },
      sameAs: structuredSameAs,
    },
  ]

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} font-sans`} suppressHydrationWarning>
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {googleSiteVerification ? (
          <meta name="google-site-verification" content={googleSiteVerification} />
        ) : null}

        {/* Analytics (Plausible preferred; GA4 optional fallback) */}
        {plausibleDomain ? (
          <>
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
            </Script>
            <Script
              strategy="afterInteractive"
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.js"
            />
          </>
        ) : null}

        {gaMeasurementId ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { send_page_view: true });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="min-h-screen flex flex-col bg-bg text-fg dark:bg-bg dark:text-fg transition-colors">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

