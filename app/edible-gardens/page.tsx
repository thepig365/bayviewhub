import React from 'react'
import type { Metadata } from 'next'
import { buildSharePack, metadataFromSharePack } from '@/lib/share-pack'
import { EdibleGardensClient } from './EdibleGardensClient'

const EDIBLE_GARDENS_DESCRIPTION =
  'A subscription-based edible gardens program is coming to Bayview Hub. Join the Founding Families waitlist for seasonal harvest boxes, garden days, and hands-on growing experiences.'

const edibleGardensSharePack = buildSharePack({
  title: 'Edible Gardens',
  summary: EDIBLE_GARDENS_DESCRIPTION,
  path: '/edible-gardens',
  eyebrow: 'Bayview Hub',
  footer: 'Victoria',
  theme: 'bayview',
  type: 'website',
})

export const metadata: Metadata = {
  ...metadataFromSharePack(edibleGardensSharePack, {
    title: { absolute: 'Edible Gardens | Bayview Hub' },
    description: EDIBLE_GARDENS_DESCRIPTION,
    robots: {
      index: false,
      follow: false,
    },
  }),
  title: { absolute: 'Edible Gardens | Bayview Hub' },
  description: EDIBLE_GARDENS_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
}

export default function EdibleGardensPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary-50 to-natural-50 dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-bold tracking-wide uppercase text-primary-600 dark:text-primary-400 mb-4">
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
