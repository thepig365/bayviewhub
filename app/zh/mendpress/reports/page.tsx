import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress 项目发布 中文入口',
  description: '以中文进入 Mendpress 的项目发布栏目；发布札记、邀请函与项目简报在具备中文内容时会直接显示中文版本。',
  path: '/zh/mendpress/reports',
})

export default function ChineseMendpressProgrammePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="项目发布"
      intro="这一栏聚焦发布札记、邀请函、项目简报与更贴近项目发布语境的材料。只要条目已有中文标题、摘要或正文，它就会在这里直接以中文方式呈现。"
      types={['dispatch', 'invitation', 'project_brief']}
      activeSection="reports"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: '评论', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: '对话', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: '视觉叙事', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: '项目发布', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="项目发布栏目尚未发布内容"
      emptyBody="当第一篇发布札记、邀请函或项目简报发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收项目发布更新"
      subscribeBody="如果你想跟进 Mendpress 的项目发布、邀请函与公开材料，可以从这里进入通讯页。"
      subscribeCtaLabel="进入通讯页"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
