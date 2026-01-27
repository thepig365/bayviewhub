import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-neutral-500 mb-6 leading-relaxed text-sm">
              A curated sanctuary where architecture meets theology. Asset optimization. Soul restoration.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">Navigate</h4>
            <ul className="space-y-3">
              {[
                { label: 'Experiences', href: '/experiences' },
                { label: 'Gardens', href: '/gardens' },
                { label: 'Gallery', href: '/experiences/gallery' },
                { label: 'Workshops', href: '/workshops' },
                { label: 'Events', href: '/events' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">Strategic</h4>
            <ul className="space-y-3">
              {[
                { label: 'SSD Feasibility Tool', href: '/backyard-second-home/feasibility-checklist' },
                { label: 'Second Home', href: '/second-home' },
                { label: 'Partners', href: '/partners' },
                { label: 'Founding Gallery', href: '/partners/founding' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-1" />
                <span className="text-neutral-400 text-sm">
                  {SITE_CONFIG.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-sm">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-500 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-neutral-500 hover:text-white transition-colors">
                Terms
              </Link>
              <a href="/llms.txt" className="text-gold hover:text-white transition-colors">
                LLM Access: /llms.txt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
