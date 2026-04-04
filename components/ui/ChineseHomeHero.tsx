'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GALLERY_EXTERNAL, SSD_LANDING } from '@/lib/constants'
import { localizedHref } from '@/lib/language-routing'

type HeroCta = { label: string; href: string; external?: boolean }

const heroSlides: {
  id: number
  category: string
  title: string
  description: string
  cta: HeroCta
  secondaryCta?: HeroCta
  image: string
}[] = [
  {
    id: 1,
    category: '咨询已开放',
    title: '后院第二小住宅',
    description: '为家人、隐私、租金收入或长期价值，在你的土地上增加一个更安静、更灵活的空间。维州范围内现已开放场地评估咨询。',
    cta: { label: '查看我的物业是否适合', href: localizedHref(SSD_LANDING.overview, 'zh') },
    secondaryCta: { label: '开始可行性检查', href: localizedHref(SSD_LANDING.feasibility, 'zh') },
    image: '/images/stay.jpg',
  },
  {
    id: 2,
    category: '标志性体验',
    title: '酒窖葡萄酒品鉴',
    description: '品尝 Bayview Hub 的凉爽气候葡萄酒，从清爽的 Chardonnay 到优雅的 Pinot Noir，由现场团队带你进入更完整的风味体验。',
    cta: { label: '查看品鉴信息', href: localizedHref('/cellar-door', 'zh') },
    image: '/images/cellar.jpg',
  },
  {
    id: 3,
    category: '线上画廊已开放',
    title: 'Bayview 艺术画廊',
    description: '在线浏览策展作品，也可预约私人观看；同时保留一条更克制的路径，让作品进入私人墙面与真实生活空间。',
    cta: { label: '浏览作品收藏', href: GALLERY_EXTERNAL.archive, external: true },
    secondaryCta: { label: '私人观看', href: GALLERY_EXTERNAL.openYourWall, external: true },
    image: '/images/gallery.jpg',
  },
  {
    id: 4,
    category: '创作与修复',
    title: '艺术工作坊与修复性实践',
    description: '由专业人士带领的表达性艺术项目，帮助人慢下来、重新感受，并在创作与陪伴中与他人发生更真实的连接。',
    cta: { label: '查看工作坊', href: localizedHref('/workshops', 'zh') },
    image: '/images/workshops.jpg',
  },
  {
    id: 5,
    category: '每周现场呈现',
    title: 'The Shed 音乐',
    description: '本地与巡演音乐人带来的现场演出，在葡萄酒、食物与夜色里，构成 Bayview Hub 更公共也更有生命力的一面。',
    cta: { label: '查看近期安排', href: 'https://www.thepigandwhistle.com.au/what-s-on', external: true },
    image: '/images/music.jpg',
  },
]

export function ChineseHomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative flex flex-col md:flex-row md:min-h-[80vh]">
      <div className="relative h-[45vh] md:h-auto md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[60%] order-1 md:order-2">
        {heroSlides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <button
          onClick={() => {
            nextSlide()
            setIsAutoPlaying(false)
          }}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors drop-shadow-lg"
          aria-label="下一张"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="hidden md:flex absolute bottom-8 left-8 z-20 gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="rounded-full p-1.5 -m-1.5 transition-all"
              aria-label={`切换到第 ${index + 1} 张`}
            >
              <span
                className={`block rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-6 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="md:w-[40%] bg-accent flex items-center relative z-10 order-2 md:order-1">
        <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16">
          <p className="text-white/80 text-[15px] leading-6 md:text-base font-semibold tracking-widest uppercase mb-3 md:mb-4">
            {slide.category}
          </p>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
            {slide.title}
          </h1>

          <p className="text-[1.06rem] md:text-lg text-white/90 mb-6 md:mb-8 leading-8 md:leading-relaxed max-w-md">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold text-base tracking-wide uppercase hover:bg-white hover:text-accent transition-colors"
              >
                {slide.cta.label}
              </a>
            ) : (
              <Link
                href={slide.cta.href}
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold text-base tracking-wide uppercase hover:bg-white hover:text-accent transition-colors"
              >
                {slide.cta.label}
              </Link>
            )}
            {slide.secondaryCta &&
              (slide.secondaryCta.external ? (
                <a
                  href={slide.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-white font-semibold text-base tracking-wide uppercase border border-white/50 hover:bg-white/10 transition-colors"
                >
                  {slide.secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-white font-semibold text-base tracking-wide uppercase border border-white/50 hover:bg-white/10 transition-colors"
                >
                  {slide.secondaryCta.label}
                </Link>
              ))}
          </div>
        </div>

        <button
          onClick={() => {
            prevSlide()
            setIsAutoPlaying(false)
          }}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="上一张"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
    </section>
  )
}
