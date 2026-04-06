import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 视觉叙事 中文入口',
  description: '以中文进入 Mendpress 的视觉叙事栏目；视觉随笔、图像故事与作品解读在具备中文内容时会直接显示中文版本。',
  path: '/zh/mendpress/visual-narrative',
})

export default function ChineseMendpressVisualNarrativePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="视觉叙事"
      intro="这一栏聚焦以图像、场所、节奏与氛围推进的写作，包括视觉随笔、图像故事与作品解读。凡已准备中文标题、摘要与正文的条目，都会在这里以中文阅读模式呈现。"
      types={['visual_essay', 'photo_story', 'artwork_reading']}
      activeSection="visual_narrative"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'programme', label: '项目', href: '/zh/mendpress/programme' },
      ]}
      emptyTitle="视觉叙事栏目尚未发布内容"
      emptyBody="当第一篇视觉随笔、图像故事或作品解读发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收视觉叙事更新"
      subscribeBody="如果你想跟进 Mendpress 中更偏图像与场所感的发布，可以从这里进入通讯页。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
