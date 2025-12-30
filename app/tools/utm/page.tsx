import React from 'react'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { UtmBuilder } from './UtmBuilder'

export const metadata = {
  ...genMeta({
    title: `UTM Link Builder | ${SITE_CONFIG.name}`,
    description: 'Generate trackable campaign links (UTM) for Bayview Hub pages.',
    path: '/tools/utm',
  }),
  robots: { index: false, follow: false },
}

export default function UtmToolsPage() {
  return (
    <div className="min-h-screen dark:bg-primary-900">
      <section className="py-16 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-natural-900 dark:text-natural-50">
              UTM Link Builder
            </h1>
            <p className="mt-4 text-natural-700 leading-relaxed dark:text-natural-200">
              Create trackable links for posts and ads. UTMs are captured on the site and included in Edible Gardens EOI
              submissions.
            </p>
            <div className="mt-10">
              <UtmBuilder />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


