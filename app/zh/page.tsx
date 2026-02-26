import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { EXPERIENCES, FOUNDING_ROLES, SITE_CONFIG } from '@/lib/constants'
import { generateMetadata as genMeta } from '@/lib/utils'

export const metadata = genMeta({
  title: `${SITE_CONFIG.name} - 吃、住、连接、创造、修复`,
  description: '一个目的地Hub：酒庄餐饮、住宿、艺术空间、健康项目和可食花园。',
  path: '/zh',
})

export default function ChineseHomePage() {
  return (
    <div className="min-h-screen dark:bg-primary-900">
      {/* Language Switcher */}
      <div className="bg-natural-100 border-b border-border dark:bg-primary-900 dark:border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end space-x-4 text-sm">
            <Link href="/" className="text-muted hover:text-fg">
              English
            </Link>
            <span className="text-primary-700 font-bold dark:text-primary-200">中文</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-natural-50 to-accent-50 py-20 md:py-32 dark:from-primary-900 dark:via-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-fg mb-6 ">
              吃、住、连接、创造、修复
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-10 leading-relaxed ">
              一个目的地Hub：酒庄餐饮、住宿、艺术空间、健康项目和可食花园。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/partners" variant="primary" size="lg">
                成为合作伙伴
              </Button>
              <Button href="/edible-gardens#subscribe" variant="secondary" size="lg">
                订阅花园
              </Button>
              <Button href="/backyard-small-second-home#register" variant="accent" size="lg">
                建造第二居所
              </Button>
              <Button href="/workshops" variant="primary" size="lg">
                预订工作坊
              </Button>
              <Button href="/events" variant="outline" size="lg">
                活动日历
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Bar */}
      <section className="bg-white py-12 border-y border-border dark:bg-primary-900 dark:border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">50k+</div>
              <div className="text-sm text-muted ">年度访客</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🍷</div>
              <div className="text-sm text-muted ">酒庄餐厅</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🎵</div>
              <div className="text-sm text-muted ">周末现场音乐</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-700 mb-2">🌏</div>
              <div className="text-sm text-muted ">国际目的地</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 bg-natural-50 dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-4 ">
              Bayview Hub 体验项目
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto ">
              探索我们的餐饮、艺术、音乐和自然体验
            </p>
          </div>

          {/* New Additions */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-fg mb-6 ">
              新增项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                title="Bayview 艺术画廊"
                description="策展展览、开幕式和收藏作品。"
                image="/images/gallery.jpg"
                cta={{ label: '探索画廊', href: 'https://gallery.bayviewhub.me', external: true }}
                prelaunch
                variant="highlight"
              />
              <Card
                title="艺术工作坊与艺术疗愈"
                description="由专业人士指导的表达性艺术健康项目。"
                image="/images/workshops.jpg"
                cta={{ label: '预订工作坊', href: '/workshops' }}
                prelaunch
                variant="highlight"
              />
              <Card
                title="可食花园订阅"
                description="季节性收获、家庭花园日和会员体验。"
                image="/images/gardens.jpg"
                cta={{ label: '订阅', href: '/edible-gardens' }}
                prelaunch
                variant="highlight"
              />
              <Card
                title="小型第二居所建设"
                description="将您的后院改造成美丽的小房子或附属住宅，供家人、客人使用或出租收入。"
                image="/images/stay.jpg"
                cta={{ label: '探索选项', href: '/backyard-small-second-home' }}
                variant="highlight"
              />
            </div>
          </div>

          {/* Core Anchors */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-fg mb-6">
              核心项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <Card
                title="酒庄餐厅"
                description="庄园葡萄酒和时令农产品的农场到餐桌餐饮。"
                image="/images/restaurant.jpg"
                cta={{ label: '在Pig & Whistle预订', href: SITE_CONFIG.pigAndWhistleUrl, external: true }}
              />
              <Card
                title="酒窖品酒室"
                description="品酒和酒窖体验。"
                image="/images/cellar.jpg"
                cta={{ label: '品酒与参观', href: '/visit#cellar' }}
                prelaunch
              />
              <Card
                title="The Shed 音乐"
                description="周末现场音乐，本地和巡演艺术家。"
                image="/images/music.jpg"
                cta={{ label: '在Pig & Whistle购票', href: `${SITE_CONFIG.pigAndWhistleUrl}/music`, external: true }}
              />
              <Card
                title="活动与团体"
                description="私人活动、婚礼和企业聚会。"
                image="/images/functions.jpg"
                cta={{ label: '咨询', href: `${SITE_CONFIG.pigAndWhistleUrl}/function-bookings`, external: true }}
              />
              <Card
                title="住宿"
                description="Bayview的住宿和延长体验。"
                image="/images/stay.jpg"
                cta={{ label: '查看住宿', href: `${SITE_CONFIG.pigAndWhistleUrl}/accommodation`, external: true }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Now Building - Recruitment */}
      <section className="py-20 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-primary-900 dark:to-primary-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg mb-6 ">
              我们正在建造 Bayview Hub 的下一章
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto ">
              我们正在寻找创始领导者来建立我们的画廊、艺术项目和可食花园运营。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full dark:bg-primary-900/60 dark:border dark:border-border">
              <h3 className="text-xl font-serif font-bold text-fg mb-4 ">
                创始策展人 / 画廊总监
              </h3>
              <p className="text-muted mb-6 leading-relaxed  flex-1">
                建立展览、艺术家关系和销售运营。
              </p>
              <Button href="/partners/curator" variant="accent" size="sm" className="w-full mt-6">
                查看职位
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full dark:bg-primary-900/60 dark:border dark:border-border">
              <h3 className="text-xl font-serif font-bold text-fg mb-4 ">
                创始艺术疗愈项目负责人
              </h3>
              <p className="text-muted mb-6 leading-relaxed  flex-1">
                设计安全、符合道德的项目和可扩展的工作坊系统。
              </p>
              <Button href="/partners/art-therapy" variant="accent" size="sm" className="w-full mt-6">
                查看职位
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full dark:bg-primary-900/60 dark:border dark:border-border">
              <h3 className="text-xl font-serif font-bold text-fg mb-4 ">
                创始可食花园运营负责人
              </h3>
              <p className="text-muted mb-6 leading-relaxed  flex-1">
                将花园转变为具有可靠交付的订阅模式。
              </p>
              <Button href="/partners/garden-ops" variant="accent" size="sm" className="w-full mt-6">
                查看职位
              </Button>
            </div>
          </div>

          <div className="text-center">
            <Button href="/partners" variant="primary" size="lg">
              立即申请
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-4 ">
                与 Bayview Hub 保持联系
              </h2>
              <p className="text-muted ">
                获取根据您的兴趣定制的更新
              </p>
            </div>
            <div className="bg-natural-50 rounded-2xl p-8 dark:bg-primary-900/60 dark:border dark:border-border">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>

      {/* Back to English */}
      <section className="py-8 bg-natural-100 dark:bg-primary-900">
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="text-primary-700 hover:text-primary-800 font-medium dark:text-primary-200 dark:hover:text-primary-100">
            ← Switch to English
          </Link>
        </div>
      </section>
    </div>
  )
}

