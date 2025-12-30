import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #0B1F2A 0%, #1D3A2A 55%, #0B1F2A 100%)',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1, lineHeight: 1.05 }}>
          Small Second Home Builder
        </div>
        <div style={{ marginTop: 18, fontSize: 30, fontWeight: 600, opacity: 0.92 }}>
          Backyard studios • Granny flats • Rental options (VIC)
        </div>
        <div style={{ marginTop: 28, fontSize: 22, opacity: 0.86, maxWidth: 980, lineHeight: 1.35 }}>
          Turn unused space into a calm, garden-inspired second home. Register your interest and explore house types.
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {['Parents', 'Income', 'Studio', 'Guests', 'Work'].map((pill) => (
            <div
              key={pill}
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}


