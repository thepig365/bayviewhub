'use client'

import React from 'react'
import { Facebook, Twitter, Linkedin, Share2, Mail } from 'lucide-react'
import { generateShareUrl } from '@/lib/utils'

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export function SocialShare({ url, title, description, className }: SocialShareProps) {
  const platforms = [
    { name: 'facebook', icon: Facebook, label: 'Share on Facebook' },
    { name: 'twitter', icon: Twitter, label: 'Share on Twitter' },
    { name: 'linkedin', icon: Linkedin, label: 'Share on LinkedIn' },
    { name: 'email', icon: Mail, label: 'Share via Email' },
  ]

  const handleShare = async (platform: string) => {
    const shareUrl = generateShareUrl(platform, url, title, description)
    
    // Use Web Share API if available (mobile devices)
    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title, text: description, url })
      } catch (err) {
        console.log('Share cancelled or failed')
      }
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-natural-600 dark:text-natural-200">Share:</span>
        <div className="flex gap-2">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.name}
                onClick={() => handleShare(platform.name)}
                className="p-2 rounded-full bg-natural-100 hover:bg-natural-200 transition-colors dark:bg-primary-800/60 dark:hover:bg-primary-700"
                aria-label={platform.label}
              >
                <Icon className="w-4 h-4 text-natural-700 dark:text-natural-100" />
              </button>
            )
          })}
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={() => handleShare('native')}
              className="p-2 rounded-full bg-natural-100 hover:bg-natural-200 transition-colors dark:bg-primary-800/60 dark:hover:bg-primary-700"
              aria-label="Share via device"
            >
              <Share2 className="w-4 h-4 text-natural-700 dark:text-natural-100" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

