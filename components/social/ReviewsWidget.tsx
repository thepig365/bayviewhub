'use client'

import React from 'react'
import { Star, MessageCircle } from 'lucide-react'

interface Review {
  id: number
  author: string
  rating: number
  date: string
  text: string
  platform: 'google' | 'facebook' | 'tripadvisor'
}

const sampleReviews: Review[] = [
  {
    id: 1,
    author: 'Sarah M.',
    rating: 5,
    date: '2 weeks ago',
    text: 'Amazing experience! The food was excellent and the gardens are beautiful. Perfect for a weekend getaway.',
    platform: 'google',
  },
  {
    id: 2,
    author: 'James L.',
    rating: 5,
    date: '1 month ago',
    text: 'Live music on weekends is fantastic. Great atmosphere and wines.',
    platform: 'facebook',
  },
]

export function ReviewsWidget() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-serif font-bold text-natural-900">
            What Our Visitors Say
          </h3>
          <div className="flex items-center mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent-500 text-accent-500" />
              ))}
            </div>
            <span className="ml-2 text-sm text-natural-600">4.9 average rating</span>
          </div>
        </div>
        <a
          href="#"
          className="text-primary-700 hover:text-primary-800 font-medium text-sm"
        >
          Write a review →
        </a>
      </div>

      <div className="space-y-4">
        {sampleReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-natural-900">{review.author}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-accent-500 text-accent-500'
                            : 'text-natural-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-natural-500">{review.date}</span>
                </div>
              </div>
              <span className="text-xs text-natural-500 capitalize">{review.platform}</span>
            </div>
            <p className="text-natural-700 leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-natural-50 rounded-lg">
        <h4 className="font-bold text-natural-900 mb-2 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2" />
          Integration Options
        </h4>
        <p className="text-sm text-natural-600">
          Connect with review platforms:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-natural-600">
          <li>Google Business Profile API for Google reviews</li>
          <li>Facebook Graph API for Facebook reviews</li>
          <li>TripAdvisor Content API</li>
          <li>Or use aggregation services like Trustpilot, Birdeye, or Podium</li>
        </ul>
      </div>
    </div>
  )
}

