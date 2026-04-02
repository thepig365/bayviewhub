'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { HomeModule } from '@/components/ui/HomeModule'
import { EXPERIENCES, GALLERY_EXTERNAL, SITE_CONFIG, SSD_LANDING, SSD_QUICK_LINKS } from '@/lib/constants'
import { CONTRAST_FORM_CONTROL_ROW_CLASS } from '@/lib/contrast-form-field-class'
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail } from 'lucide-react'

type HeroCta = { label: string; href: string; external?: boolean }

// Hero slides data - 5 slides
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
    category: 'Enquiries Open',
    title: 'Backyard Small Second Home',
    description: 'Create a calm, flexible space on your property — for family, privacy, rental income, or long-term value. Enquiries for site assessment are now open across Victoria.',
    cta: { label: 'Check If My Property Qualifies', href: SSD_LANDING.overview },
    secondaryCta: { label: 'Feasibility check', href: SSD_LANDING.feasibility },
    image: '/images/stay.jpg',
  },
  {
    id: 2,
    category: 'Signature Experience',
    title: 'Cellar Door Wine Tastings',
    description: 'Sample our award-winning cool-climate wines. From crisp Chardonnay to elegant Pinot Noir, guided by our passionate team.',
    cta: { label: 'Book Tasting', href: '/cellar-door' },
    image: '/images/cellar.jpg',
  },
  {
    id: 3,
    category: 'Online Gallery Live',
    title: 'Bayview Arts Gallery',
    description: 'Browse the curated collection online. Private viewing by arrangement — plus a discreet path for works on private walls.',
    cta: { label: 'Browse collection', href: GALLERY_EXTERNAL.archive, external: true },
    secondaryCta: { label: 'Private Viewing', href: GALLERY_EXTERNAL.openYourWall, external: true },
    image: '/images/gallery.jpg',
  },
  {
    id: 4,
    category: 'Creative Wellbeing',
    title: 'Art Workshops & Therapy',
    description: 'Expressive arts programs for wellbeing, guided by qualified professionals. Find calm, create meaning, and connect with others.',
    cta: { label: 'View Workshops', href: '/workshops' },
    image: '/images/workshops.jpg',
  },
  {
    id: 5,
    category: 'Live Every Weekend',
    title: 'The Shed Music',
    description: 'Live music featuring local and touring artists. Great wine, delicious food, and unforgettable performances under the stars.',
    cta: { label: 'See What\'s On', href: 'https://www.thepigandwhistle.com.au/what-s-on', external: true },
    image: '/images/music.jpg',
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterHoneypot, setNewsletterHoneypot] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          interests: [],
          website: newsletterHoneypot,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterEmail('')
        setNewsletterHoneypot('')
      } else {
        setNewsletterStatus('error')
        console.warn('[Newsletter home]', res.status, data)
      }
    } catch {
      setNewsletterStatus('error')
    }
  }

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

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, nextSlide])

  const slide = heroSlides[currentSlide]

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section - Mobile: Image Top, Text Bottom | Desktop: Text Left, Image Right */}
      <section className="relative flex flex-col md:flex-row md:min-h-[80vh]">
        {/* Image - Top on Mobile, Right on Desktop */}
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

          {/* Navigation Arrow - Right (Desktop only) */}
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors drop-shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Slide Indicators - Desktop */}
          <div className="hidden md:flex absolute bottom-8 left-8 z-20 gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-1.5 -m-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? ''
                    : ''
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <span className={`block rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-6 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Text Panel - Bottom on Mobile, Left on Desktop */}
        <div className="md:w-[40%] bg-accent flex items-center relative z-10 order-2 md:order-1">
          <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16">
            {/* Category Label */}
            <p className="text-white/80 text-sm md:text-base font-semibold tracking-widest uppercase mb-3 md:mb-4">
              {slide.category}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 leading-relaxed max-w-md">
              {slide.description}
            </p>

            {/* Primary + optional secondary CTA */}
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

          {/* Navigation Arrow - Left (Desktop only) */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-16 md:py-20 bg-bg">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <p className="eyebrow text-accent mb-3">About Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-fg mb-6 leading-tight">
              Why Bayview Hub exists
            </h2>
            <div className="max-w-3xl space-y-5 text-base md:text-lg leading-8 text-muted reading">
              <p>
                Bayview Hub exists because contemporary life has become increasingly efficient, connected, and accelerated
                {' '}yet often thinner in attention, place, beauty, and shared experience.
              </p>
              <p>
                We are building a living cultural place on the Mornington Peninsula where art, music, hospitality, gardens,
                workshops, and slow life form part of one larger human ecology.
              </p>
              <p>
                Here, these things belong together. The gallery is not an ornament. Music is not background. Gardens are not
                scenery. Hospitality is not merely service. Each element helps restore attention, conversation, memory, and a
                more grounded way of being with others.
              </p>
              <p>
                Bayview Hub also stands in relation to a wider body of work. Mend is the deeper inquiry into emotional life,
                meaning, repair, and reconciliation. Mendpress gives that inquiry language through essays, conversations, and
                editorial work. Bayview Hub gives it a physical setting {' '}a rare kind of place where such questions can be
                lived through art, non-clinical art therapeutic workshops, music, edible gardens, hospitality, beauty, and
                community.
              </p>
              <p>
                In an age shaped by screens, speed, isolation, and overstimulation, places like this matter. Not because they
                offer escape, but because they make another way of living visible again.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white font-semibold text-base tracking-wide uppercase rounded hover:bg-accent-hover transition-colors"
              >
                Explore Bayview Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Landing tracks — discoverability for SSD + Gallery / Private Viewing */}
      <section className="py-12 md:py-16 bg-natural-100 dark:bg-surface/30 border-y border-border">
        <div className="container mx-auto px-4">
          <p className="eyebrow text-accent text-center mb-2">Start here</p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-fg text-center mb-3">
            Two programmes to explore
          </h2>
          <p className="text-muted text-center max-w-2xl mx-auto mb-10 reading">
            Victorian small second dwelling guidance on-site — and the Bayview Arts Gallery with private viewing by arrangement.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-lg border border-border bg-surface p-6 md:p-8 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-serif font-bold text-fg mb-2">Backyard Small Second Home</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                For homeowners across Victoria — feasibility, rules, indicative costs, and registration.
              </p>
              <ul className="space-y-2 mb-6">
                {SSD_QUICK_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-accent font-medium hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={SSD_LANDING.overview}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-accent text-white font-semibold text-base tracking-wide uppercase rounded hover:bg-accent-hover transition-colors"
              >
                Go to overview
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-surface p-6 md:p-8 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-serif font-bold text-fg mb-2">Gallery &amp; Private Viewing</h3>
              <p className="text-muted text-sm leading-relaxed mb-5">
                For collectors and invited viewers, artists, and hosts — collection online; viewing by arrangement.
              </p>
              <ul className="space-y-2 mb-6">
                <li>
                  <a href={GALLERY_EXTERNAL.openYourWall} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                    Private Viewing (programme overview)
                  </a>
                </li>
                <li>
                  <a href={GALLERY_EXTERNAL.passportRegister} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                    Open Your Wall — register a work
                  </a>
                </li>
                <li>
                  <a href={GALLERY_EXTERNAL.archive} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                    Browse collection
                  </a>
                </li>
                <li>
                  <a href={GALLERY_EXTERNAL.submit} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                    Submit artwork for curation
                  </a>
                </li>
              </ul>
              <a
                href={GALLERY_EXTERNAL.archive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-accent text-white font-semibold text-base tracking-wide uppercase rounded hover:bg-accent-hover transition-colors"
              >
                Browse collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Visit Section */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="container mx-auto px-4">
          <HomeModule
            eyebrow="Visitor Information"
            title="Plan Your Visit"
            description="Everything you need for your day at the estate—directions, hours, tastings, and experiences."
            primaryCta={{ label: 'Get Directions', href: '/visit' }}
            secondaryCta={{ label: 'View FAQ', href: '/visit' }}
          />

          {/* Info Grid */}
          <div className="mt-12 border border-border rounded-lg p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Column 1: Location & Contact */}
              <div>
                <h3 className="eyebrow text-fg mb-4">Bayview Hub</h3>
                <p className="text-muted leading-relaxed mb-1">365 Purves Road,</p>
                <p className="text-muted leading-relaxed mb-6">Main Ridge, Victoria 3928</p>
                
                {/* Contact Icons */}
                <div className="flex gap-4">
                  <a 
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="w-10 h-10 rounded-full border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    aria-label="Call us"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="w-10 h-10 rounded-full border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    aria-label="Email us"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=365+Purves+Road,+Main+Ridge,+Victoria+3928"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-accent text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                    aria-label="Get directions"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Column 2: Know Before You Go */}
              <div>
                <h3 className="eyebrow text-fg mb-4">Know Before You Go</h3>
                <p className="text-muted leading-relaxed reading mb-4">
                  Opening hours, wine tasting bookings, and tips for planning your day.
                </p>
                <Link href="/visit" className="text-accent font-semibold text-base tracking-widest uppercase hover:underline">
                  Learn More
                </Link>
              </div>

              {/* Column 3: Experiences */}
              <div>
                <h3 className="eyebrow text-fg mb-4">Experiences</h3>
                <p className="text-muted leading-relaxed reading mb-4">
                  Wine, dining, art, workshops, live music, and gardens—all on 30 stunning acres.
                </p>
                <Link href="/experiences" className="text-accent font-semibold text-base tracking-widest uppercase hover:underline block mb-2">
                  Learn More
                </Link>
                <Link href={SSD_LANDING.overview} className="text-fg font-medium text-base hover:text-accent hover:underline">
                  Backyard Small Second Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Block */}
      <section id="newsletter" className="py-16 md:py-20 bg-natural-100 dark:bg-surface/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/images/functions.jpg"
                alt="Founding Partners"
                fill
                className="object-cover"
              />
            </div>
            {/* Content */}
            <div className="md:pl-4">
              <HomeModule
                eyebrow="Founding Partners Wanted"
                title="Build the Next Chapter with Us"
                description="Join a destination with 50k+ annual visitors. Lead our Gallery, Art Programs, or Edible Gardens."
                primaryCta={{ label: 'Apply Now', href: '/partners' }}
                secondaryCta={{ label: 'Learn More', href: '/partners/founding' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 md:py-20 bg-bg">
        <div className="container mx-auto px-4">
          <HomeModule
            eyebrow="Current Experiences"
            title="Now On View"
            description="Explore what's happening at Bayview Hub—exhibitions, tastings, and events."
            primaryCta={{ label: 'View All', href: '/experiences' }}
          />

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...EXPERIENCES.new].slice(0, 4).map((exp) => (
              <Link
                key={exp.id}
                href={exp.cta.href}
                className="group block"
              >
                <div className="relative h-56 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow text-accent mb-1">{exp.category}</p>
                <h3 className="text-lg font-serif font-bold text-fg group-hover:text-accent transition-colors">
                  {exp.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stay In Touch Section */}
      <section className="py-16 md:py-20 bg-natural-100 dark:bg-surface/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-surface border border-border rounded-lg p-8 md:p-12 shadow-sm dark:shadow-none">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Text */}
                <div>
                  <p className="eyebrow text-accent mb-3">Newsletter</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg leading-tight mb-4">
                    Stay In Touch
                  </h2>
                  <p className="text-muted leading-relaxed reading">
                    Get the latest on exhibitions, events, wine releases, and special offers.
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    Prefer a full signup page?{' '}
                    <Link href="/newsletter" className="text-accent hover:underline">
                      Open the newsletter page
                    </Link>
                    .
                  </p>
                </div>
                {/* Right - Form */}
                <div>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        name="website"
                        value={newsletterHoneypot}
                        onChange={(e) => setNewsletterHoneypot(e.target.value)}
                        className="absolute -left-[9999px] h-px w-px opacity-0"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value)
                          if (newsletterStatus !== 'idle') setNewsletterStatus('idle')
                        }}
                        className={`${CONTRAST_FORM_CONTROL_ROW_CLASS} py-4 px-5 focus:ring-accent dark:focus:ring-accent`}
                        required
                        disabled={newsletterStatus === 'loading'}
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="px-8 py-4 bg-accent text-white font-semibold tracking-wide uppercase rounded hover:bg-accent-hover transition-colors whitespace-nowrap disabled:opacity-60"
                      >
                        {newsletterStatus === 'loading' ? 'Signing up…' : 'Sign Up'}
                      </button>
                    </div>
                    {newsletterStatus === 'success' && (
                      <p className="text-sm text-muted">Thanks — you&apos;re on the list.</p>
                    )}
                    {newsletterStatus === 'error' && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        Something went wrong. Try again or email {SITE_CONFIG.email}.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
