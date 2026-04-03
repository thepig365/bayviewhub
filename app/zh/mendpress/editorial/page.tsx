import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Editorial 中文入口',
  description: '以中文进入 Mendpress 的 Editorial 栏目；已具备双语内容的 editorial、essay 与 audio essay 会直接显示中文版本。',
  path: '/zh/mendpress/editorial',
})

export default function ChineseMendpressEditorialPage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="Editorial"
      intro="这一栏聚焦 Mendpress 的主编式判断、essay 与 audio-led editorial pieces。凡已整理出中文标题、摘要、正文或 script/transcript 的条目，都会在这里直接以中文阅读模式出现。"
      types={['editorial', 'essay', 'audio_essay']}
      activeSection="editorial"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: 'Editorial', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: 'Dialogue', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: 'Visual Narrative', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: 'Programme', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="Editorial 栏目尚未发布内容"
      emptyBody="当第一篇 editorial、essay 或 audio essay 发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="订阅 Mendpress 更新"
      subscribeBody="如果你想追踪 Mendpress 的 editorial、essay 与音频发布，可以从这里进入 Newsletter。"
      subscribeCtaLabel="进入 Newsletter"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
