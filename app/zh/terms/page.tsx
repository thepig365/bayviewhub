import type { Metadata } from 'next'
import { LAST_UPDATED } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: '服务条款',
  description: '阅读 Bayview Hub 的服务条款，了解预订、参与、订阅、使用限制与责任边界。',
  path: '/zh/terms',
})

export default function ChineseTermsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-serif font-bold text-fg">服务条款</h1>
          <p className="mt-4 text-fg/75 dark:text-white/75">最后更新：{LAST_UPDATED}</p>

          <div className="mt-10 space-y-10 text-base leading-8 text-fg/80 dark:text-white/80">
            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">适用范围</h2>
              <p className="mt-4">
                当你访问 Bayview Hub 网站、提交预订、订阅通讯、申请合作、参与活动或使用与本网站相关的公开服务时，即表示你同意遵守本页所列条款，以及适用的澳大利亚法律与法规。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">预订、参与与订阅</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>所有预订、参与名额与订阅资格均以实际可用性与最终确认结果为准。</li>
                <li>不同项目可能适用不同的取消、改期或退款条件；若有单独说明，应以该页面或确认邮件中的具体说明为准。</li>
                <li>部分工作坊、花园项目或现场活动可能因天气、安全、人数不足或运营安排而调整。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">网站使用与行为规范</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>不得将网站或表单用于非法、欺诈、骚扰、滥发或破坏性目的。</li>
                <li>不得尝试未经授权访问网站系统、后台或第三方服务接口。</li>
                <li>不得发布或传输有害、侮辱、侵权或明显不适当的内容。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">知识产权与内容使用</h2>
              <p className="mt-4">
                本网站中的文本、图片、品牌元素、编辑内容、作品图像与其他资料，除非另有说明，均属于 Bayview Hub 或相关授权方。未经许可，不得擅自复制、再发布或用于商业用途。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">责任边界</h2>
              <p className="mt-4">
                我们会尽合理努力维护网站信息与服务可用性，但不保证所有内容始终完整、无误或不中断。在法律允许范围内，Bayview Hub 不对因网站使用、活动参与或第三方链接服务引起的间接损失承担责任。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">条款更新与联系</h2>
              <p className="mt-4">
                我们可在需要时更新本条款，更新后的版本将在网站发布后生效。如有问题，请联系：
              </p>
              <p className="mt-4">
                Bayview Hub
                <br />
                邮箱：{SITE_CONFIG.email}
                <br />
                电话：{SITE_CONFIG.phone}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
