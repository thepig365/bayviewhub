import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 中文入口',
  description:
    'Mendpress 是 Bayview Hub 面向公众思考与发布的编辑层。中文模式会优先呈现已有的中文标题、摘要与正文；缺失处则保留明确回退。',
  path: '/zh/mendpress',
})

export default function ChineseMendpressPage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Bayview Hub"
      title="Mendpress"
      intro="Mendpress 是 Bayview Hub 面向公众思考的发布层。在中文模式下，已具备双语内容的文章会直接显示中文标题、摘要与正文；仍未完成中文稿本的文章，则会保留清晰的英文原页入口与说明。"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'programme', label: '项目', href: '/zh/mendpress/programme' },
      ]}
      sectionEyebrow="Mendpress 中文入口"
      viewSectionLabel="进入栏目"
      emptyTitle="Mendpress 正在持续发布中"
      emptyBody="当前栏目还没有已发布内容。新的内容发布后，这里会保留中文栏目入口与英文原文通道。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="订阅 Bayview Notes"
      subscribeBody="接收精选 Mendpress 文章、邀请函与 Bayview Hub 庄园更新。有值得分享的内容时，我们才发送。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="浏览 Mendpress"
    />
  )
}
