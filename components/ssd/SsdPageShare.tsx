import { SITE_CONFIG } from '@/lib/constants'
import { SSD_FUNNEL_SHARE, type SsdFunnelSharePath } from '@/lib/ssd-funnel-share'
import { ShareStrip } from '@/components/ui/ShareStrip'

/** Wraps site-wide ShareStrip for SSD URLs (expanded share row + “More” menu on all funnel pages). */
export function SsdPageShare({
  path,
  className = 'mt-6',
}: {
  path: SsdFunnelSharePath
  className?: string
}) {
  const cfg = SSD_FUNNEL_SHARE[path]
  const url = `${SITE_CONFIG.url}${path}`
  return (
    <ShareStrip
      className={className}
      url={url}
      mailtoSubject={cfg.subject}
      mailtoIntro={cfg.intro}
    />
  )
}
