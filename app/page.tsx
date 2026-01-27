import React from 'react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export const metadata = genMeta({
  title: `Mend: The Art of Restoration | ${SITE_CONFIG.name}`,
  description: 'A curated sanctuary where architecture meets theology. We optimize assets and restore souls.',
  path: '/',
})

const pillars = [
  {
    id: 'physical',
    title: 'Physical',
    subtitle: 'Tactile Reality',
    description: 'The Pig & Whistle, Gardens, Gallery. Where matter meets meaning.',
    links: [
      { label: 'Gardens', href: '/gardens' },
      { label: 'Gallery', href: '/experiences/gallery' },
      { label: 'Restaurant', href: 'https://www.thepigandwhistle.com.au', external: true },
    ],
  },
  {
    id: 'digital',
    title: 'Digital',
    subtitle: 'Cognitive Healing',
    description: 'Mend Writing, App. Where thought finds form.',
    links: [
      { label: 'Workshops', href: '/workshops' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    id: 'strategic',
    title: 'Strategic',
    subtitle: 'Asset Optimization',
    description: 'SSD, Second Home. Where constraint creates opportunity.',
    links: [
      { label: 'SSD Tool', href: '/backyard-second-home/feasibility-checklist' },
      { label: 'Second Home', href: '/second-home' },
    ],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sanctuary">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sanctuary via-sanctuary to-neutral-900/50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold/80 text-sm font-sans tracking-[0.3em] uppercase mb-8">
              Mornington Peninsula
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Mend: The Art of Restoration.
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              A curated sanctuary where architecture meets theology. We optimize assets and restore souls.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-neutral-600 text-white hover:border-white transition-colors text-sm tracking-wide uppercase"
              >
                Explore the Hub
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/backyard-second-home/feasibility-checklist"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-sanctuary hover:bg-gold/90 transition-colors text-sm tracking-wide uppercase font-medium"
              >
                SSD Feasibility Tool
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      </section>

      {/* Proof Bar */}
      <section className="py-16 border-y border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-2">50k+</div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Annual Visitors</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-2">30</div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Acre Estate</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-2">VC253</div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">SSD Compliant</div>
            </div>
            <div>
              <div className="text-4xl font-serif font-bold text-white mb-2">10</div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">Day VicSmart</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-gold/80 text-sm font-sans tracking-[0.3em] uppercase mb-4">
              The Framework
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Three Pillars
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Physical presence. Digital cognition. Strategic optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-800">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="group bg-sanctuary p-10 hover:bg-neutral-900 transition-colors"
              >
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">
                  {pillar.subtitle}
                </p>
                <h3 className="text-3xl font-serif font-bold text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="space-y-2">
                  {pillar.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm"
                    >
                      <span className="w-4 h-px bg-current" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSD Authority Section */}
      <section className="py-24 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-gold/80 text-sm tracking-[0.3em] uppercase mb-4">
                  Victorian SSD Framework
                </p>
                <h2 className="text-4xl font-serif font-bold text-white mb-6">
                  The Path to Approval
                </h2>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  We navigate Victorian SSD regulations (VC253/VC282) to deliver planning certainty. 
                  60 sqm. No permit. 10-day VicSmart.
                </p>
                <Link
                  href="/second-home"
                  className="inline-flex items-center gap-3 text-gold hover:text-white transition-colors text-sm tracking-wide uppercase"
                >
                  Enter the Framework
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Max Floor Area', value: '≤ 60 sqm' },
                  { label: 'Siting', value: 'Behind front wall' },
                  { label: 'Energy', value: 'All-electric only' },
                  { label: 'Ownership', value: 'No subdivision' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-neutral-800 pb-4">
                    <span className="text-neutral-500 text-sm uppercase tracking-wider">{item.label}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Partners */}
      <section className="py-24 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold/80 text-sm tracking-[0.3em] uppercase mb-4">
              Join Us
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Founding Partnerships
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              We seek operators who build, not applicants who occupy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-neutral-800 max-w-4xl mx-auto">
            {[
              { title: 'Gallery Partner', href: '/experiences/gallery' },
              { title: 'Gardens Partner', href: '/partners/edible-gardens' },
              { title: 'Workshop Partner', href: '/workshops' },
            ].map((role) => (
              <Link
                key={role.title}
                href={role.href}
                className="bg-sanctuary p-8 hover:bg-neutral-900 transition-colors group"
              >
                <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {role.title}
                </h3>
                <span className="text-neutral-500 text-sm flex items-center gap-2">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/partners"
              className="inline-flex items-center gap-3 px-8 py-4 border border-neutral-600 text-white hover:border-gold hover:text-gold transition-colors text-sm tracking-wide uppercase"
            >
              View All Partnerships
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="py-16 border-t border-neutral-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">Contact</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-white hover:text-gold transition-colors">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div>
              <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">Location</p>
              <p className="text-white">Mornington Peninsula, Victoria</p>
            </div>
            <div>
              <p className="text-neutral-500 text-sm uppercase tracking-wider mb-2">Authority</p>
              <a href="/llms.txt" className="text-white hover:text-gold transition-colors">
                /llms.txt
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
