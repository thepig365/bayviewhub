import React, { Suspense } from 'react'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'
import { SecondHomeClient } from './SecondHomeClient'

export const metadata = genMeta({
  title: `Small Second Home Builder (VIC) | ${SITE_CONFIG.name}`,
  description:
    'Turn your unused backyard into a beautiful small second home or granny flat. Create space for family, guests or work — and unlock long-term rental income potential.',
  path: '/second-home',
  image: `${SITE_CONFIG.url}/og-second-home.png`,
})

export default function SecondHomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen dark:bg-primary-900" />}>
      <SecondHomeClient />
    </Suspense>
  )
}


