'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Calendar, MapPin, Music, Palette, Sprout, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'

type EventCategory = 'all' | 'music' | 'dining' | 'gallery' | 'workshops' | 'gardens'

const events = [
  {
    id: 1,
    title: 'Live Jazz Night',
    date: 'Sat, Jan 17',
    time: '7:00 PM',
    category: 'music',
    location: 'The Shed',
    price: '$35',
    icon: Music,
    startsAtISO: '2026-01-17T19:00:00+11:00',
  },
  {
    id: 2,
    title: 'Seasonal Tasting Menu',
    date: 'Every Friday',
    time: '6:30 PM',
    category: 'dining',
    location: 'Pig & Whistle',
    price: '$95',
    icon: UtensilsCrossed,
    isRecurring: true,
  },
  {
    id: 3,
    title: 'Gallery Opening: Local Artists',
    date: 'Fri, Jan 30',
    time: '6:00 PM',
    category: 'gallery',
    location: 'Arts Gallery',
    price: 'Free',
    icon: Palette,
    startsAtISO: '2026-01-30T18:00:00+11:00',
  },
  {
    id: 4,
    title: 'Expressive Painting Workshop',
    date: 'Sun, Jan 18',
    time: '10:00 AM',
    category: 'workshops',
    location: 'Workshop Studio',
    price: '$65',
    icon: Palette,
    startsAtISO: '2026-01-18T10:00:00+11:00',
  },
  {
    id: 5,
    title: 'Autumn Planting Day',
    date: 'Sat, Feb 7',
    time: '9:00 AM',
    category: 'gardens',
    location: 'Edible Gardens',
    price: 'Members only',
    icon: Sprout,
    startsAtISO: '2026-02-07T09:00:00+11:00',
  },
  {
    id: 6,
    title: 'Acoustic Sunday Sessions',
    date: 'Every Sunday',
    time: '2:00 PM',
    category: 'music',
    location: 'The Shed',
    price: '$25',
    icon: Music,
    isRecurring: true,
  },
]

const categories = [
  { id: 'all', label: 'All Events', icon: Calendar },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'dining', label: 'Dining', icon: UtensilsCrossed },
  { id: 'gallery', label: 'Gallery', icon: Palette },
  { id: 'workshops', label: 'Workshops', icon: Palette },
  { id: 'gardens', label: 'Gardens', icon: Sprout },
]

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all')
  const now = new Date()

  const upcomingEvents = events
    .filter((event) => event.isRecurring || (event.startsAtISO && new Date(event.startsAtISO) >= now))
    .sort((a, b) => {
      if (a.isRecurring && !b.isRecurring) return -1
      if (!a.isRecurring && b.isRecurring) return 1
      if (a.startsAtISO && b.startsAtISO) {
        return new Date(a.startsAtISO).getTime() - new Date(b.startsAtISO).getTime()
      }
      return 0
    })

  const filteredEvents =
    activeCategory === 'all'
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === activeCategory)

  return (
    <div className="min-h-screen py-20 dark:bg-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-fg mb-4 dark:text-fg">
            What's On
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Upcoming events, performances, exhibitions, and workshops at Bayview Hub
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as EventCategory)}
                className={cn(
                  'flex items-center space-x-2 px-5 py-3 rounded-full font-medium transition-all',
                  activeCategory === cat.id
                    ? 'bg-primary-700 text-white shadow-md'
                    : 'bg-white text-fg hover:bg-natural-100 dark:bg-surface dark:text-fg dark:border dark:border-border dark:hover:bg-surface/80'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Events List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredEvents.map((event) => {
            const Icon = event.icon
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6 dark:bg-surface dark:border dark:border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 rounded-xl p-3 flex-shrink-0 dark:bg-surface">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-fg mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-base text-muted">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 md:flex-shrink-0">
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-700">
                      {event.price}
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    Book
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted text-lg">
              No events found in this category
            </p>
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-20 bg-gradient-to-br from-accent-50 to-primary-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold text-fg mb-4">
            Never Miss an Event
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get early access to tickets, exclusive events, and member-only experiences
          </p>
          <Button href="/#newsletter" variant="primary" size="lg">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  )
}

