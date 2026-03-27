import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import {
  GALLERY_EXTERNAL,
  GALLERY_VIEWING_REQUEST_MAILTO,
  SITE_CONFIG,
  SOCIAL_LINKS,
  SITE_HOURS,
  SSD_LANDING,
  SSD_QUICK_LINKS,
} from '@/lib/constants'
import { SimpleThemeToggle } from '@/components/theme/SimpleThemeToggle'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook },
    { name: 'Instagram', icon: Instagram, url: SOCIAL_LINKS.instagram },
    { name: 'Twitter', icon: Twitter, url: SOCIAL_LINKS.twitter },
    { name: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  ]

  return (
    <footer className="bg-shell-footer text-[#f5ede0]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand + Address */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-shell-footer-muted leading-relaxed mb-4">
              Estate dining, live music, and farmhouse accommodation on a 30-acre Victoria estate. Backyard Small Second Home enquiries now open. Creative programs in development.
            </p>
            <p className="text-shell-footer-muted leading-relaxed mb-2">
              365 Purves Road,
            </p>
            <p className="text-shell-footer-muted leading-relaxed">
              Main Ridge, Victoria 3928
            </p>
          </div>

          {/* Column 2: Tickets & Hours */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
              Visit
            </h4>
            <ul className="space-y-2 mb-8">
              <li>
                <Link href="/cellar-door" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Cellar Door
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <a href={SITE_CONFIG.pigAndWhistleUrl} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Restaurant
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-bold tracking-widest uppercase mb-4">
              Hours
            </h4>
            <div className="text-shell-footer-muted text-base space-y-1">
              <p>{SITE_HOURS.summary}</p>
              <p className="italic text-shell-footer-muted/80 mt-2">
                Closed Christmas Day
              </p>
            </div>
          </div>

          {/* Column 3: Experiences */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
              Experiences
            </h4>
            <ul className="space-y-2">
              <li>
                <a href={GALLERY_EXTERNAL.base} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Arts Gallery — Online
                </a>
              </li>
              <li>
                <Link href="/workshops" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/edible-gardens" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Edible Gardens
                </Link>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/what-s-on" target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  The Shed Music
                </a>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/accommodation" target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Accommodation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Programs */}
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase mb-5">
              Programs
            </h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/partners" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Founding Partners
                </Link>
              </li>
              <li>
                <Link href={SSD_LANDING.overview} className="text-shell-footer-muted hover:text-accent transition-colors">
                  Backyard Small Second Home
                </Link>
              </li>
              <li>
                <Link href="/invest" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Invest
                </Link>
              </li>
            </ul>

            <h4 className="text-sm font-bold tracking-widest uppercase mb-3">
              Small Second Home paths
            </h4>
            <ul className="space-y-2 mb-8">
              {SSD_QUICK_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-shell-footer-muted hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-bold tracking-widest uppercase mb-4">
              Gallery
            </h4>
            <ul className="space-y-2">
              <li>
                <a href={GALLERY_EXTERNAL.openYourWall} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Private Viewing
                </a>
              </li>
              <li>
                <a href={GALLERY_EXTERNAL.passportRegister} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Open Your Wall — register a work
                </a>
              </li>
              <li>
                <a href={GALLERY_VIEWING_REQUEST_MAILTO} className="text-shell-footer-muted hover:text-accent transition-colors">
                  Request private viewing access
                </a>
              </li>
              <li>
                <a href={GALLERY_EXTERNAL.archive} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Browse collection
                </a>
              </li>
              <li>
                <a href={GALLERY_EXTERNAL.submit} target="_blank" rel="noopener noreferrer" className="text-shell-footer-muted hover:text-accent transition-colors">
                  Submit artwork
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preferences - Simple inline */}
      <div className="border-t border-shell-footer-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-base">
            {/* Language */}
            <div className="flex items-center gap-2">
              <span className="text-shell-footer-muted/70">Language:</span>
              <Link href="/" className="text-shell-footer-muted hover:text-accent transition-colors">
                EN
              </Link>
              <span className="text-shell-footer-muted/50">/</span>
              <Link href="/zh" className="text-shell-footer-muted hover:text-accent transition-colors">
                中文
              </Link>
            </div>
            {/* Theme */}
            <div className="flex items-center gap-2">
              <span className="text-shell-footer-muted/70">Theme:</span>
              <SimpleThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Links Bar */}
      <div className="border-t border-shell-footer-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-base">
            <Link href="/partners" className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              Partners
            </Link>
            <Link href="/visit" className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              Visit
            </Link>
            <Link href="/site-map" className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              Site Map
            </Link>
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-shell-footer-muted hover:text-accent transition-colors tracking-wide uppercase">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-shell-footer-border bg-shell-footer-deep">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-shell-footer-border flex items-center justify-center text-shell-footer-muted hover:text-accent hover:border-accent transition-colors"
                    aria-label={platform.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-wrap justify-center gap-4 text-base text-shell-footer-muted">
              <span>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="mt-6 pt-6 border-t border-shell-footer-border">
            <p className="text-sm text-shell-footer-muted/85 text-center leading-relaxed max-w-3xl mx-auto">
              Bayview Hub acknowledges the Bunurong / Boon Wurrung people of the Kulin Nation as the Traditional Custodians of the lands and waters of the Mornington Peninsula, and pays respect to Elders past and present.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
