import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Dialogue 中文入口',
  description: '以中文进入 Mendpress 的 Dialogue 栏目；conversation、interview、profile 与 podcast episode 在具备中文稿本时会直接显示中文版本。',
  path: '/zh/mendpress/dialogue',
})

export default function ChineseMendpressDialoguePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="Dialogue"
      intro="这一栏聚焦对话、访谈、profile 与 spoken exchange。对于 interview 与 audio pieces，音频可以保持原语言，但 transcript/script、标题、摘要与页面语境会在这里支持中文阅读。"
      types={['conversation', 'interview', 'profile', 'podcast_episode']}
      activeSection="dialogue"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: 'Editorial', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: 'Dialogue', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: 'Visual Narrative', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: 'Programme', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="Dialogue 栏目尚未发布内容"
      emptyBody="当第一篇 conversation、interview、profile 或 podcast episode 发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收 Dialogue 更新"
      subscribeBody="如果你想跟进 Mendpress 的 conversation、interview 与 spoken exchange，可以从这里进入 Newsletter。"
      subscribeCtaLabel="进入 Newsletter"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
