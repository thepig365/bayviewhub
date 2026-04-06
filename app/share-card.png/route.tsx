import { renderShareCard } from '@/lib/share-card'

export const runtime = 'edge'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Bayview Hub'
  const summary =
    searchParams.get('summary') ||
    'A place for art, music, gardens, food, wine, workshops, beauty, and shared experience — shaped by gathering, community, and slower forms of connection on the Bayview Estate.'
  const eyebrow = searchParams.get('eyebrow') || 'Bayview Hub'
  const footer = searchParams.get('footer') || 'Victoria'
  const theme = searchParams.get('theme') === 'mendpress' ? 'mendpress' : 'bayview'

  return renderShareCard({
    title,
    summary,
    eyebrow,
    footer,
    theme,
  })
}
