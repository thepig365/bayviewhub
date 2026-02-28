'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
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
      {/* Hero Section - Split Layout: Text Left, Image Right */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex">
        {/* Left Side - Colored Background with Text */}
        <div className="w-full md:w-[40%] bg-accent flex items-center relative z-10">
          <div className="px-8 md:px-12 lg:px-16 py-16 md:py-0">
            {/* Category Label */}
            <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">
              {slide.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-md">
              {slide.description}
            </p>

            {/* CTA Button */}
            {slide.cta.external ? (
              <a
                href={slide.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-semibold text-base tracking-wide uppercase rounded hover:bg-gray-100 transition-colors"
              >
                {slide.cta.label}
              </a>
            ) : (
              <Link
                href={slide.cta.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-semibold text-base tracking-wide uppercase rounded hover:bg-gray-100 transition-colors"
              >
                {slide.cta.label}
              </Link>
            )}

            {/* Slide Indicators - Mobile */}
            <div className="flex gap-2 mt-10 md:hidden">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-white w-6'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Arrow - Left */}
          <button
            onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-[60%] relative">
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

          {/* Navigation Arrow - Right */}
          <button
            onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors drop-shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Slide Indicators - Desktop */}
          <div className="absolute bottom-8 left-8 z-20 flex gap-2">
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

        {/* Mobile: Background Image */}
        <div className="absolute inset-0 md:hidden -z-10">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover opacity-20"
            priority
          />
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

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-400 mb-8">
              Get updates on exhibitions, events, wine releases, and exclusive offers
            </p>
            <div className="bg-gray-800 rounded-lg p-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
