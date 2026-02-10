import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Map | Bayview Hub',
  description: 'An overview of all public pages on Bayview Hub.',
}

const siteMapData = [
  {
    heading: 'Experiences',
    links: [
      { label: 'Experiences Overview', href: '/experiences' },
      { label: 'Gallery', href: '/experiences/gallery' },
      { label: 'Workshops', href: '/workshops' },
      { label: 'Gardens', href: '/gardens' },
    ],
  },
  {
    heading: 'Events',
    links: [
      { label: 'Events', href: '/events' },
    ],
  },
  {
    heading: 'Visit',
    links: [
      { label: 'Visit', href: '/visit' },
      { label: 'Cellar Door', href: '/cellar-door' },
    ],
  },
  {
    heading: 'Partners',
    links: [
      { label: 'Partners Overview', href: '/partners' },
      { label: 'Founding Partnerships', href: '/partners/founding' },
      { label: 'Edible Gardens', href: '/partners/edible-gardens' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Backyard Small Second Home', href: '/backyard-small-second-home' },
      { label: 'Feasibility Check', href: '/backyard-small-second-home/feasibility-check' },
      { label: 'Invest', href: '/invest' },
    ],
  },
  {
    heading: 'About / Legal',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Visitor Traffic Evidence', href: '/evidence/visitor-traffic' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export default function SiteMapPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-primary-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
            Site Map
          </h1>
          <p className="text-natural-600 mb-12 dark:text-natural-300">
            This page provides an overview of Bayview Hub's public pages.
          </p>

          <div className="grid gap-10 md:grid-cols-2">
            {siteMapData.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-bold text-natural-900 mb-4 dark:text-natural-50">
                  {section.heading}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-primary-700 hover:text-primary-900 hover:underline dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
