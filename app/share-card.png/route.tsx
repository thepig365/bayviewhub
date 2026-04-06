import { renderShareCard } from '@/lib/share-card'
import { decodeShareCardPayload } from '@/lib/share-pack'

export const runtime = 'edge'

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const payload = decodeShareCardPayload(searchParams.get('payload'))
  const title = payload?.title || searchParams.get('title') || 'Bayview Hub'
  const summary =
    payload?.summary ||
    searchParams.get('summary') ||
    'A place for art, music, gardens, food, wine, workshops, beauty, and shared experience — shaped by gathering, community, and slower forms of connection on the Bayview Estate.'
  const eyebrow = payload?.eyebrow || searchParams.get('eyebrow') || 'Bayview Hub'
  const footer = payload?.footer || searchParams.get('footer') || 'Victoria'
  const theme = payload?.theme || (searchParams.get('theme') === 'mendpress' ? 'mendpress' : 'bayview')

  return renderShareCard({
    title,
    summary,
    eyebrow,
    footer,
    theme,
  })
}
