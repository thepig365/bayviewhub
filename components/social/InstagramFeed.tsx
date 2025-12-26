'use client'

import React from 'react'
import { Instagram } from 'lucide-react'

interface InstagramFeedProps {
  username?: string
  limit?: number
}

export function InstagramFeed({ username = 'bayviewhub', limit = 6 }: InstagramFeedProps) {
  // This is a placeholder. In production, you would:
  // 1. Use Instagram Basic Display API
  // 2. Or use a service like SnapWidget, EmbedSocial, or Flockler
  // 3. Or use Instagram's embed script

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-natural-900 flex items-center">
          <Instagram className="w-6 h-6 mr-2 text-primary-600" />
          @{username}
        </h3>
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-700 hover:text-primary-800 font-medium text-sm"
        >
          Follow →
        </a>
      </div>
      
      {/* Grid of Instagram posts */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-natural-200 rounded-lg overflow-hidden group cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            {/* Replace with actual Instagram images */}
            <div className="w-full h-full bg-gradient-to-br from-primary-200 to-accent-200" />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-natural-50 rounded-lg text-sm text-natural-600">
        <p>
          <strong>Implementation Note:</strong> Replace this component with actual Instagram feed using:
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Instagram Basic Display API (requires app approval)</li>
          <li>Third-party service like SnapWidget or EmbedSocial</li>
          <li>Or use Instagram's official embed script for specific posts</li>
        </ul>
      </div>
    </div>
  )
}

