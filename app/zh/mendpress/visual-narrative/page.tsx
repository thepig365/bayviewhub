import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Visual Narrative 中文入口',
  description: '以中文进入 Mendpress 的 Visual Narrative 栏目；field notes 与图像主导的条目在具备中文内容时会直接显示中文版本。',
  path: '/zh/mendpress/visual-narrative',
})

export default function ChineseMendpressVisualNarrativePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="Visual Narrative"
      intro="这一栏聚焦以图像、场所、节奏与 atmosphere 推进的写作。凡已准备中文标题、摘要与正文的条目，都会在这里以中文阅读模式呈现。"
      types={['field_note']}
      activeSection="visual_narrative"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: 'Editorial', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: 'Dialogue', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: 'Visual Narrative', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: 'Programme', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="Visual Narrative 栏目尚未发布内容"
      emptyBody="当第一篇 visual narrative 或 field note 发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收 Visual Narrative 更新"
      subscribeBody="如果你想跟进 Mendpress 里更偏图像与场所感的发布，可以从这里进入 Newsletter。"
      subscribeCtaLabel="进入 Newsletter"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
