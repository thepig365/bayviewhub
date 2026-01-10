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

  const filteredEvents =
    activeCategory === 'all'
      ? events
      : events.filter((event) => event.category === activeCategory)

  return (
    <div className="min-h-screen py-20 dark:bg-primary-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-natural-900 mb-4 dark:text-natural-50">
            What's On
          </h1>
          <p className="text-xl text-natural-600 max-w-2xl mx-auto dark:text-natural-200">
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
                    : 'bg-white text-natural-700 hover:bg-natural-100 dark:bg-primary-900/60 dark:text-natural-100 dark:border dark:border-primary-700 dark:hover:bg-primary-800'
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
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6 dark:bg-primary-900/60 dark:border dark:border-primary-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 rounded-xl p-3 flex-shrink-0 dark:bg-primary-800">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-natural-900 mb-2 dark:text-natural-50">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-sm text-natural-600 dark:text-natural-200">
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
            <p className="text-natural-500 text-lg">
              No events found in this category
            </p>
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="mt-20 bg-gradient-to-br from-accent-50 to-primary-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold text-natural-900 mb-4">
            Never Miss an Event
          </h2>
          <p className="text-natural-700 mb-8 max-w-2xl mx-auto">
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

