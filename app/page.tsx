'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { SITE_CONFIG, EXPERIENCES } from '@/lib/constants'
import { ChevronLeft, ChevronRight, MapPin, Clock, Phone } from 'lucide-react'

// Hero slides data - 5 slides with placeholders
const heroSlides = [
  {
    id: 1,
    category: 'Now Open',
    title: 'Bayview Arts Gallery',
    description: 'Curated exhibitions featuring emerging and established artists. Experience contemporary art in our beautifully restored gallery spaces.',
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

// Featured content for the highlight section
const featuredContent = {
  category: 'Founding Partners Wanted',
  title: 'Build the Next Chapter with Us',
  description: 'We\'re seeking founding leaders to establish our Gallery, Art Programs, and Edible Gardens operations. Join a destination with 50k+ annual visitors and built-in hospitality infrastructure.',
  cta: { label: 'Apply Now', href: '/partners' },
  image: '/images/functions.jpg',
}

// Events/Experiences grid
const experienceHighlights = [
  {
    category: 'Dining',
    title: 'Winery Restaurant',
    href: 'https://thepigandwhistle.com.au',
    external: true,
    image: '/images/restaurant.jpg',
  },
  {
    category: 'Accommodation',
    title: 'The Farmhouse Stay',
    href: 'https://www.thepigandwhistle.com.au/accommodation',
    external: true,
    image: '/images/stay.jpg',
  },
  {
    category: 'Functions',
    title: 'Private Events & Weddings',
    href: 'https://www.thepigandwhistle.com.au/function-bookings',
    external: true,
    image: '/images/functions.jpg',
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
      {/* Hero Carousel Section */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
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
              {/* Gradient overlay - darker on right for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/70" />
            </div>
          ))}
        </div>

        {/* Content - Right aligned */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="ml-auto max-w-xl lg:max-w-2xl text-right">
              {/* Category Label */}
              <span className="inline-block px-4 py-1.5 bg-accent text-white text-sm font-semibold tracking-wide uppercase rounded-full mb-6">
                {slide.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                {slide.description}
              </p>

              {/* CTA Button */}
              {slide.cta.external ? (
                <a
                  href={slide.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {slide.cta.label}
                </a>
              ) : (
                <Link
                  href={slide.cta.href}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-gray-900 text-white py-6 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-center md:text-left">
            <Link href="/visit" className="group flex items-center gap-3 hover:text-accent transition-colors">
              <MapPin className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold">Plan Your Visit</p>
                <p className="text-sm text-gray-400 group-hover:text-gray-300">Main Ridge, Victoria</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold">Open Daily</p>
                <p className="text-sm text-gray-400">11:00 AM – 5:00 PM</p>
              </div>
            </div>
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 hover:text-accent transition-colors">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold">Contact</p>
                <p className="text-sm text-gray-400">{SITE_CONFIG.phone}</p>
              </div>
            </a>
            <Button href="/cellar-door#book" variant="accent" size="md">
              Book Wine Tasting
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Content Block */}
      <section className="py-16 md:py-24 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={featuredContent.image}
                alt={featuredContent.title}
                fill
                className="object-cover"
              />
            </div>
            {/* Content */}
            <div className="md:pl-8">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase rounded-full mb-6 dark:bg-accent/20">
                {featuredContent.category}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-fg mb-6">
                {featuredContent.title}
              </h2>
              <p className="text-lg text-muted mb-8 leading-relaxed">
                {featuredContent.description}
              </p>
              <Button href={featuredContent.cta.href} variant="primary" size="lg">
                {featuredContent.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">Explore</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mt-2">
                Experiences at Bayview
              </h2>
            </div>
            <Button href="/experiences" variant="outline" size="md" className="hidden md:inline-flex">
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {experienceHighlights.map((exp, index) => (
              <a
                key={index}
                href={exp.href}
                target={exp.external ? '_blank' : undefined}
                rel={exp.external ? 'noopener noreferrer' : undefined}
                className="group relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm text-accent font-medium">{exp.category}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white mt-1">
                    {exp.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button href="/experiences" variant="outline" size="md">
              View All Experiences
            </Button>
          </div>
        </div>
      </section>

      {/* Now On View / Browse Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-bg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wide">Now Available</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-fg mt-2">
                Featured Programs
              </h2>
            </div>
            <Button href="/partners" variant="outline" size="md" className="hidden md:inline-flex">
              Partner Opportunities
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...EXPERIENCES.new].slice(0, 4).map((exp) => (
              <Link
                key={exp.id}
                href={exp.cta.href}
                className="group block bg-gray-50 dark:bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                    {exp.category}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-fg mt-1 mb-2 group-hover:text-accent transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">{exp.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-400 mb-8">
              Get updates on exhibitions, events, wine releases, and exclusive offers
            </p>
            <div className="bg-gray-800 rounded-2xl p-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
