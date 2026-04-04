import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 评论 中文入口',
  description: '以中文进入 Mendpress 的评论栏目；已具备双语内容的评论、随笔与音频评论会直接显示中文版本。',
  path: '/zh/mendpress/editorial',
})

export default function ChineseMendpressEditorialPage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="评论"
      intro="这一栏聚焦 Mendpress 的评论文章、随笔与音频评论。凡已整理出中文标题、摘要、正文或稿本的条目，都会在这里直接以中文阅读模式出现。"
      types={['editorial', 'essay', 'audio_essay']}
      activeSection="editorial"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: '项目发布', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="评论栏目尚未发布内容"
      emptyBody="当第一篇评论、随笔或音频评论发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="订阅 Mendpress 更新"
      subscribeBody="如果你想追踪 Mendpress 的评论、随笔与音频发布，可以从这里进入通讯页。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
