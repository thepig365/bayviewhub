import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants'
import { ThemeMenu } from '@/components/theme/ThemeMenu'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook },
    { name: 'Instagram', icon: Instagram, url: SOCIAL_LINKS.instagram },
    { name: 'Twitter', icon: Twitter, url: SOCIAL_LINKS.twitter },
    { name: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  ]

  return (
    <footer className="bg-bg dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-fg">
              <Link href="/" className="text-muted hover:text-fg transition-colors">
                {SITE_CONFIG.name}
              </Link>
            </h3>
            <p className="text-muted mb-4 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-3">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-surface hover:bg-surface/80 rounded-full text-muted hover:text-fg transition-colors"
                    aria-label={platform.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-fg transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/partners/founding"
                  className="text-muted hover:text-fg transition-colors"
                >
                  Founding Partner Brief
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/utm"
                  className="text-muted hover:text-fg transition-colors"
                >
                  UTM Link Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Experiences</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://gallery.bayviewhub.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                >
                  Arts Gallery
                </a>
              </li>
              <li>
                <Link href="/art-gallery/founding-partners" className="text-muted hover:text-fg transition-colors">
                  Gallery Founding Partners
                </Link>
              </li>
              <li>
                <a
                  href="https://gallery.bayviewhub.me"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                >
                  Gallery Library
                </a>
              </li>
              <li>
                <a
                  href="https://www.thepigandwhistle.com.au/what-s-on"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                >
                  The Shed Music
                </a>
              </li>
              <li>
                <Link href="/workshops" className="text-muted hover:text-fg transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/edible-gardens" className="text-muted hover:text-fg transition-colors">
                  Edible Gardens
                </Link>
              </li>
              <li>
                <Link href="/cellar-door" className="text-muted hover:text-fg transition-colors">
                  Wine Tasting
                </Link>
              </li>
              <li>
                <a 
                  href={SITE_CONFIG.pigAndWhistleUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                >
                  Pig & Whistle Restaurant
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-fg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                <span className="text-muted text-sm">
                  {SITE_CONFIG.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-muted hover:text-fg transition-colors text-sm"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-muted hover:text-fg transition-colors text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section className="mb-8 rounded-xl border border-border bg-surface/50 p-5">
          <h4 className="text-base font-semibold text-fg mb-3">Preferences</h4>
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            <div>
              <p className="text-sm font-medium text-fg mb-2">Language</p>
              <div className="flex items-center gap-3 text-sm">
                <Link href="/" className="text-muted hover:text-fg transition-colors">
                  EN
                </Link>
                <span className="text-subtle">/</span>
                <Link href="/zh" className="text-muted hover:text-fg transition-colors">
                  中文
                </Link>
              </div>
            </div>
            <div className="w-full md:max-w-md">
              <ThemeMenu />
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-border bg-surface/50 p-5">
          <h4 className="text-base font-semibold text-fg mb-2">About Bayview Hub</h4>
          <p className="text-sm leading-relaxed text-muted">
            Bayview Hub is a destination on the Mornington Peninsula bringing together winery dining, cellar door tastings, arts and workshops, live music, events, and edible garden programs.
          </p>
          <p className="text-sm leading-relaxed text-muted mt-3">
            This website shares practical details for visiting, current offerings, and getting in touch—key pages include Events, Partner Pathways, and Small Second Home resources.
          </p>
          <h4 className="text-base font-semibold text-fg mt-4 mb-2">Acknowledgement of Country</h4>
          <p className="text-sm leading-relaxed text-muted">
            Bayview Hub acknowledges the Bunurong / Boon Wurrung people of the Kulin Nation as the Traditional Custodians of the lands and waters of the Mornington Peninsula, and pays respect to Elders past and present.
          </p>
        </section>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted text-sm">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted hover:text-fg transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted hover:text-fg transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-muted hover:text-fg transition-colors">
                Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

