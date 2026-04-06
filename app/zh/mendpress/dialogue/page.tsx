import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 对话 中文入口',
  description: '以中文进入 Mendpress 的对话栏目；对谈、访谈、人物特写与播客单集在具备中文稿本时会直接显示中文版本。',
  path: '/zh/mendpress/dialogue',
})

export default function ChineseMendpressDialoguePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="对话"
      intro="这一栏聚焦对谈、访谈、人物特写与以声音推进的交流内容。对于访谈与音频条目，音频可以保持原语言，但稿本、标题、摘要与页面语境会在这里支持中文阅读。"
      types={['conversation', 'interview', 'profile', 'podcast_episode']}
      activeSection="dialogue"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'programme', label: '项目', href: '/zh/mendpress/programme' },
      ]}
      emptyTitle="对话栏目尚未发布内容"
      emptyBody="当第一篇对谈、访谈、人物特写或播客单集发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收对话栏目更新"
      subscribeBody="如果你想跟进 Mendpress 的对谈、访谈与声音内容，可以从这里进入通讯页。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
