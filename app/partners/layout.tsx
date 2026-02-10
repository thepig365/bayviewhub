import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata = genMeta({
  title: `Founding Partners | ${SITE_CONFIG.name}`,
  description:
    'Founding partners wanted. Gallery, Art Programs, Edible Gardens. Bayview Hub offers land, infrastructure, and 50k+ annual visitors. Base compensation + revenue share.',
  path: '/partners',
})

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
