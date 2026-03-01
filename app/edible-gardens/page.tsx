import React from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { EdibleGardensClient } from './EdibleGardensClient'

export const metadata = genMeta({
  title: `Edible Gardens — Coming Soon | ${SITE_CONFIG.name}`,
  description:
    'A subscription-based edible gardens program is coming to Bayview Hub. Join the Founding Families waitlist for seasonal harvest boxes, garden days, and hands-on growing experiences.',
  path: '/edible-gardens',
})

export default function EdibleGardensPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-bg">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-50 to-natural-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold tracking-wide uppercase text-primary-600 dark:text-primary-400 mb-4">
              Coming Soon
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-6">
              Edible Gardens
            </h1>
            <p className="text-xl text-muted leading-relaxed mb-8">
              A subscription-based edible gardens program is being developed at Bayview Hub.
              Join the Founding Families waitlist to be first in line when we launch.
            </p>
          </div>
        </div>
      </section>
      <EdibleGardensClient />
    </main>
  )
}
