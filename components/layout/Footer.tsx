import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG, SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialPlatforms = [
    { name: 'Facebook', icon: Facebook, url: SOCIAL_LINKS.facebook },
    { name: 'Instagram', icon: Instagram, url: SOCIAL_LINKS.instagram },
    { name: 'Twitter', icon: Twitter, url: SOCIAL_LINKS.twitter },
    { name: 'LinkedIn', icon: Linkedin, url: SOCIAL_LINKS.linkedin },
  ]

  return (
    <footer className="bg-primary-900 text-natural-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4 text-white">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-natural-300 mb-4 leading-relaxed">
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
                    className="p-2 bg-primary-800 hover:bg-primary-700 rounded-full transition-colors"
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
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-natural-300 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Experiences</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/art-gallery" className="text-natural-300 hover:text-primary-400 transition-colors">
                  Arts Gallery
                </Link>
              </li>
              <li>
                <a
                  href="https://www.thepigandwhistle.com.au/what-s-on"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-natural-300 hover:text-primary-400 transition-colors"
                >
                  The Shed Music
                </a>
              </li>
              <li>
                <Link href="/workshops" className="text-natural-300 hover:text-primary-400 transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/edible-gardens" className="text-natural-300 hover:text-primary-400 transition-colors">
                  Edible Gardens
                </Link>
              </li>
              <li>
                <Link href="/cellar-door" className="text-natural-300 hover:text-primary-400 transition-colors">
                  Wine Tasting
                </Link>
              </li>
              <li>
                <a 
                  href={SITE_CONFIG.pigAndWhistleUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-natural-300 hover:text-primary-400 transition-colors"
                >
                  Pig & Whistle Restaurant
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-natural-300 text-sm">
                  {SITE_CONFIG.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-natural-300 hover:text-primary-400 transition-colors text-sm"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-natural-300 hover:text-primary-400 transition-colors text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-natural-400 text-sm">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-natural-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-natural-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <a href="/llms.txt" className="text-natural-400 hover:text-primary-400 transition-colors">
                LLM Access: /llms.txt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

