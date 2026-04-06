import { renderShareCard } from '@/lib/share-card'

export const runtime = 'edge'

export function GET() {
  return renderShareCard({
    title: 'Bayview Hub',
    summary:
      'A place for art, music, gardens, food, wine, workshops, beauty, and shared experience — shaped by gathering, community, and slower forms of connection on the Bayview Estate.',
    eyebrow: 'Bayview Hub',
    footer: 'Victoria',
    theme: 'bayview',
  })
}
