import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 项目 中文入口',
  description: '以中文进入 Mendpress 的项目栏目；programme note、邀请函、项目报告与活动告示在具备中文内容时会直接显示中文版本。',
  path: '/zh/mendpress/programme',
})

export default function ChineseMendpressProgrammePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="项目"
      intro="这一栏聚焦 Mendpress 的 programme note、邀请函、项目报告与活动告示。只要条目已有中文标题、摘要或正文，它就会在这里直接以中文方式呈现。"
      types={['programme_note', 'invitation', 'report', 'event_notice']}
      activeSection="programme"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'programme', label: '项目', href: '/zh/mendpress/programme' },
      ]}
      emptyTitle="项目栏目尚未发布内容"
      emptyBody="当第一篇 programme note、邀请函、项目报告或活动告示发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收项目栏目更新"
      subscribeBody="如果你想跟进 Mendpress 的 programme、邀请与公开发布，可以从这里进入通讯页。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
