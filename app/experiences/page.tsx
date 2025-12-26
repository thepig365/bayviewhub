'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { EXPERIENCES } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Category = 'all' | 'create' | 'grow' | 'eat' | 'drink' | 'listen' | 'stay' | 'celebrate'

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const allExperiences = [...EXPERIENCES.new, ...EXPERIENCES.core]

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'create', label: 'Create' },
    { id: 'grow', label: 'Grow' },
    { id: 'eat', label: 'Eat & Drink' },
    { id: 'listen', label: 'Listen' },
    { id: 'stay', label: 'Stay & Celebrate' },
  ]

  const filteredExperiences = activeCategory === 'all'
    ? allExperiences
    : allExperiences.filter((exp) => {
        if (activeCategory === 'eat') {
          return exp.category === 'eat' || exp.category === 'drink'
        }
        if (activeCategory === 'stay') {
          return exp.category === 'stay' || exp.category === 'celebrate'
        }
        return exp.category === activeCategory
      })

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold text-natural-900 mb-4">
            Experiences
          </h1>
          <p className="text-xl text-natural-600 max-w-2xl mx-auto">
            Explore all the ways to experience Bayview Hub
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={cn(
                'px-6 py-3 rounded-full font-medium transition-all',
                activeCategory === cat.id
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-white text-natural-700 hover:bg-natural-100'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp) => (
            <Card
              key={exp.id}
              title={exp.title}
              description={exp.blurb}
              image={exp.image}
              cta={exp.cta}
              variant={EXPERIENCES.new.includes(exp) ? 'highlight' : 'default'}
            />
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-natural-500 text-lg">
              No experiences found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

