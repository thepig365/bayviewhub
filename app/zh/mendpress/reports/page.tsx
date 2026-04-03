import type { Metadata } from 'next'
import { JournalCollectionPage } from '@/components/editorial/JournalCollectionPage'
import { generateMetadata as genMeta } from '@/lib/utils'

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: 'Mendpress Programme 中文入口',
  description: '以中文进入 Mendpress 的 Programme 栏目；dispatch、invitation 与 project brief 在具备中文内容时会直接显示中文版本。',
  path: '/zh/mendpress/reports',
})

export default function ChineseMendpressProgrammePage() {
  return (
    <JournalCollectionPage
      locale="zh"
      eyebrow="Mendpress"
      title="Programme"
      intro="这一栏聚焦 dispatch、invitation、project brief 与更贴近 programme 的发布材料。只要条目已有中文标题、摘要或正文，它就会在这里直接以中文方式呈现。"
      types={['dispatch', 'invitation', 'project_brief']}
      activeSection="reports"
      chips={[
        { id: 'all', label: '全部', href: '/zh/mendpress' },
        { id: 'editorial', label: 'Editorial', href: '/zh/mendpress/editorial' },
        { id: 'dialogue', label: 'Dialogue', href: '/zh/mendpress/dialogue' },
        { id: 'visual_narrative', label: 'Visual Narrative', href: '/zh/mendpress/visual-narrative' },
        { id: 'reports', label: 'Programme', href: '/zh/mendpress/reports' },
      ]}
      emptyTitle="Programme 栏目尚未发布内容"
      emptyBody="当第一篇 dispatch、invitation 或 project brief 发布后，这里会显示该栏目的中文阅读入口。"
      subscribeEyebrow="Bayview Notes"
      subscribeTitle="接收 Programme 更新"
      subscribeBody="如果你想跟进 Mendpress 的 programme、邀请函与公开发布材料，可以从这里进入 Newsletter。"
      subscribeCtaLabel="进入 Newsletter"
      subscribeSecondaryLabel="返回 Mendpress"
    />
  )
}
