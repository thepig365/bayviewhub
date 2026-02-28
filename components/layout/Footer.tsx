import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { SITE_CONFIG, SOCIAL_LINKS, SITE_HOURS } from '@/lib/constants'
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
    <footer className="bg-[#1a2332] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand + Address */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-2">
              365 Purves Road,
            </p>
            <p className="text-gray-400 leading-relaxed">
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
                <Link href="/cellar-door" className="text-gray-400 hover:text-white transition-colors">
                  Cellar Door
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <a href={SITE_CONFIG.pigAndWhistleUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Restaurant
                </a>
              </li>
            </ul>

            <h4 className="text-sm font-bold tracking-widest uppercase mb-4">
              Hours
            </h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>{SITE_HOURS.summary}</p>
              <p className="italic text-gray-500 mt-2">
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
                <a href="https://gallery.bayviewhub.me" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Arts Gallery
                </a>
              </li>
              <li>
                <Link href="/workshops" className="text-gray-400 hover:text-white transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/edible-gardens" className="text-gray-400 hover:text-white transition-colors">
                  Edible Gardens
                </Link>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/what-s-on" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  The Shed Music
                </a>
              </li>
              <li>
                <a href="https://www.thepigandwhistle.com.au/accommodation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
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
            <ul className="space-y-2 mb-8">
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-white transition-colors">
                  Founding Partners
                </Link>
              </li>
              <li>
                <Link href="/backyard-small-second-home" className="text-gray-400 hover:text-white transition-colors">
                  Second Home
                </Link>
              </li>
              <li>
                <Link href="/invest" className="text-gray-400 hover:text-white transition-colors">
                  Invest
                </Link>
              </li>
            </ul>

            <h4 className="text-sm font-bold tracking-widest uppercase mb-4">
              Gallery
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://gallery.bayviewhub.me/archive" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Browse Collection
                </a>
              </li>
              <li>
                <a href="https://gallery.bayviewhub.me/submit" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Submit Artwork
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preferences - Simple inline */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm">
            {/* Language */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Language:</span>
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                EN
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/zh" className="text-gray-400 hover:text-white transition-colors">
                中文
              </Link>
            </div>
            {/* Theme */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Theme:</span>
              <SimpleThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Links Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm">
            <Link href="/partners" className="text-gray-400 hover:text-white transition-colors tracking-wide uppercase">
              Partners
            </Link>
            <Link href="/visit" className="text-gray-400 hover:text-white transition-colors tracking-wide uppercase">
              Visit
            </Link>
            <Link href="/site-map" className="text-gray-400 hover:text-white transition-colors tracking-wide uppercase">
              Site Map
            </Link>
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-gray-400 hover:text-white transition-colors tracking-wide uppercase">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-[#141b26]">
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
                    className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors"
                    aria-label={platform.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="hidden md:inline">|</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-xs text-gray-500 text-center leading-relaxed max-w-3xl mx-auto">
              Bayview Hub acknowledges the Bunurong / Boon Wurrung people of the Kulin Nation as the Traditional Custodians of the lands and waters of the Mornington Peninsula, and pays respect to Elders past and present.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
