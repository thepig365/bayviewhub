import type { Metadata } from 'next'
import { LAST_UPDATED } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: '隐私政策',
  description: '阅读 Bayview Hub 的隐私政策，了解我们如何收集、使用、保存与保护个人信息。',
  path: '/zh/privacy',
})

export default function ChinesePrivacyPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-serif font-bold text-fg">隐私政策</h1>
          <p className="mt-4 text-fg/75 dark:text-white/75">最后更新：{LAST_UPDATED}</p>

          <div className="mt-10 space-y-10 text-base leading-8 text-fg/80 dark:text-white/80">
            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">我们收集哪些信息</h2>
              <p className="mt-4">
                当你订阅通讯、提交合作意向、发送咨询、进行预订或参与 Bayview Hub 的公开项目时，我们可能会收集你主动提供的信息，例如姓名、邮箱、电话、项目描述或其他联系资料。
              </p>
              <p className="mt-4">
                网站也会在必要范围内记录基础访问数据，例如浏览器类型、设备信息、访问页面、来源链接与大致使用情况，用于站点维护、统计与安全。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">我们如何使用这些信息</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>回应你的咨询、预订、订阅或合作请求。</li>
                <li>发送你主动订阅的通讯与项目更新。</li>
                <li>改进网站体验、内容结构与站点安全。</li>
                <li>在法律要求或合理合规需要下保存与处理相关记录。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">信息共享与保存</h2>
              <p className="mt-4">
                我们不会出售你的个人信息。部分服务可能由第三方平台协助完成，例如网站托管、邮件发送、支付或表单处理。在这些场景中，相关数据只会在完成服务所需范围内被处理。
              </p>
              <p className="mt-4">
                我们会在合理必要的时间内保存相关信息，用于维持订阅、处理请求、履行法定义务或保留必要运营记录。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">你的权利</h2>
              <p className="mt-4">
                依据适用的澳大利亚隐私原则，你可以请求访问、更正或删除我们持有的相关个人信息，也可以随时退订营销类邮件。如需提出请求，请直接与我们联系。
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold text-fg">联系我们</h2>
              <p className="mt-4">
                如你对本政策有任何问题，可通过以下方式联系 Bayview Hub：
              </p>
              <p className="mt-4">
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
