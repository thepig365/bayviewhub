import React from 'react'
import { ImageResponse } from 'next/og'

type ShareCardTheme = 'bayview' | 'mendpress'

export function renderShareCard(options: {
  title: string
  summary: string
  eyebrow?: string
  footer?: string
  theme?: ShareCardTheme
}) {
  const theme = options.theme || 'bayview'
  const background =
    theme === 'mendpress'
      ? 'linear-gradient(135deg, #0B1520 0%, #112433 48%, #17384B 100%)'
      : 'linear-gradient(135deg, #08151D 0%, #0D2431 52%, #1C4857 100%)'
  const accent = theme === 'mendpress' ? '#D9B36A' : '#8DB7C7'
  const title = options.title.trim()
  const summary = options.summary.trim()
  const eyebrow = options.eyebrow?.trim()
  const footer = options.footer?.trim()

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background,
          color: 'white',
          padding: '56px 64px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top right, rgba(255,255,255,0.10), transparent 28%), radial-gradient(circle at bottom left, rgba(255,255,255,0.06), transparent 32%)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 24,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            <div
              style={{
                width: 58,
                height: 2,
                background: accent,
              }}
            />
            <div>{eyebrow || 'Bayview Hub'}</div>
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 980,
              textWrap: 'balance',
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 29,
              lineHeight: 1.38,
              color: 'rgba(255,255,255,0.88)',
              maxWidth: 980,
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            {footer || 'Victoria'}
          </div>
          <div
            style={{
              width: 180,
              height: 1,
              background: 'rgba(255,255,255,0.22)',
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
