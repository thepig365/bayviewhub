'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG, EXPERIENCES } from '@/lib/constants'
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail } from 'lucide-react'

// Hero slides data - 5 slides
const heroSlides = [
  {
    id: 1,
    category: 'Now Open',
    title: 'Bayview Arts Gallery',
    description: 'Curated exhibitions featuring emerging and established artists. Experience contemporary art in our beautifully restored gallery spaces. Visit today.',
    cta: { label: 'Explore Gallery', href: 'https://gallery.bayviewhub.me/archive', external: true },
    image: '/images/gallery.jpg',
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
    category: 'New Program',
    title: 'Edible Gardens Subscriptions',
    description: 'Seasonal harvest boxes, garden days, and hands-on growing experiences. Connect with food from paddock to plate.',
    cta: { label: 'Subscribe Now', href: '/edible-gardens' },
    image: '/images/gardens.jpg',
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
          <div className="hidden md:flex absolute bottom-8 left-8 z-20 gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Text Panel - Bottom on Mobile, Left on Desktop */}
        <div className="md:w-[40%] bg-accent flex items-center relative z-10 order-2 md:order-1">
          <div className="px-6 md:px-12 lg:px-16 py-10 md:py-16">
            {/* Category Label */}
            <p className="text-white/80 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 md:mb-4">
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

            {/* CTA Button - Outlined style like The Broad */}
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold text-sm md:text-base tracking-wide uppercase hover:bg-white hover:text-accent transition-colors"
              >
                {slide.cta.label}
              </a>
            ) : (
              <Link
                href={slide.cta.href}
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold text-sm md:text-base tracking-wide uppercase hover:bg-white hover:text-accent transition-colors"
              >
                {slide.cta.label}
              </Link>
            )}
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

      {/* Plan Your Visit Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg leading-tight">
              Plan<br />
              Your Visit
            </h2>
            <Link 
              href="/visit" 
              className="inline-block mt-3 text-accent font-semibold text-sm tracking-widest uppercase hover:underline"
            >
              More Info
            </Link>
          </div>

          {/* Info Box */}
          <div className="border border-border rounded-lg p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Column 1: Location & Contact */}
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-fg mb-4">
                  Bayview Hub
                </h3>
                <p className="text-muted leading-relaxed mb-1">
                  365 Purves Road,
                </p>
                <p className="text-muted leading-relaxed mb-6">
                  Main Ridge, Victoria 3928
                </p>
                
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
                <h3 className="text-sm font-bold tracking-widest uppercase text-fg mb-4">
                  Know Before You Go & FAQ
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Everything you need to know for your visit, including opening hours, booking wine tastings, and planning your day at the estate.
                </p>
                <Link 
                  href="/visit" 
                  className="text-accent font-semibold text-sm tracking-widest uppercase hover:underline"
                >
                  Learn More
                </Link>
              </div>

              {/* Column 3: Experiences */}
              <div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-fg mb-4">
                  Experiences
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  Bayview Hub offers wine tastings, dining at Pig & Whistle, art exhibitions, workshops, live music, and edible garden experiences all on one beautiful 30-acre estate.
                </p>
                <Link 
                  href="/experiences" 
                  className="text-accent font-semibold text-sm tracking-widest uppercase hover:underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Block */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-surface">
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
              <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
                Founding Partners Wanted
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mb-6 leading-tight">
                Build the Next Chapter with Us
              </h2>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                We're seeking founding leaders to establish our Gallery, Art Programs, and Edible Gardens operations. Join a destination with 50k+ annual visitors and built-in hospitality infrastructure.
              </p>
              <Button href="/partners" variant="primary" size="lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 md:py-20 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg leading-tight">
                Now<br />
                On View
              </h2>
              <Link 
                href="/experiences" 
                className="inline-block mt-3 text-accent font-semibold text-sm tracking-widest uppercase hover:underline"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                  {exp.category}
                </p>
                <h3 className="text-lg font-serif font-bold text-fg group-hover:text-accent transition-colors">
                  {exp.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stay In Touch Section - The Broad Style */}
      <section className="py-16 md:py-20 bg-gray-100 dark:bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-bg border border-border rounded-lg p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left - Text */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-fg leading-tight mb-4">
                    Stay<br />In Touch
                  </h2>
                  <p className="text-muted leading-relaxed">
                    Sign up to get the latest news about Bayview Hub, upcoming exhibitions and events, wine releases, and special offers.
                  </p>
                </div>
                {/* Right - Form */}
                <div>
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-5 py-4 border border-border rounded bg-white dark:bg-surface text-fg placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                      required
                    />
                    <button
                      type="submit"
                      className="px-8 py-4 bg-accent text-white font-semibold tracking-wide uppercase rounded hover:bg-accent-hover transition-colors whitespace-nowrap"
                    >
                      Sign Up
                    </button>
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
