import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadCinzel700(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    ).then(r => r.text())
    const match = css.match(/src: url\((.+?)\) format\('woff2'\)/)
    if (!match) return null
    return fetch(match[1]).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

const CARDS = [
  { q: '¿Qué es la eclíptica?', icon: '🌌', iconColor: '#94A3B8' },
  { q: '¿Por qué son 13?', icon: '13', iconColor: '#F59E0B', isNumber: true },
  { q: '¿Por qué Escorpio dura 7 días?', icon: '7', iconColor: '#FB7185', isNumber: true },
  { q: '¿Qué es la precesión?', icon: '🔄', iconColor: '#94A3B8' },
]

export default async function Image() {
  const cinzelData = await loadCinzel700()
  const fonts = cinzelData
    ? [{ name: 'Cinzel', data: cinzelData, weight: 700 as const, style: 'normal' as const }]
    : []
  const F = fonts.length ? 'Cinzel' : 'serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a1a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '56px 72px 48px',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: F,
            fontSize: '11px',
            fontWeight: 700,
            color: '#F59E0B',
            letterSpacing: '0.3em',
            marginBottom: '28px',
            display: 'flex',
          }}
        >
          ASTRONOMÍA · IAU · ECLÍPTICA
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              fontFamily: F,
              fontSize: '58px',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            Lo que la astrología
          </div>
          <div
            style={{
              fontFamily: F,
              fontSize: '58px',
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              display: 'flex',
            }}
          >
            no dijo.
          </div>
        </div>

        {/* 2×2 card grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            width: '100%',
            flex: 1,
          }}
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: 'calc(50% - 8px)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '20px 24px',
              }}
            >
              {/* Icon / number */}
              <div
                style={{
                  fontFamily: card.isNumber ? F : 'sans-serif',
                  fontSize: card.isNumber ? '36px' : '32px',
                  color: card.iconColor,
                  fontWeight: 700,
                  minWidth: '48px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {card.icon}
              </div>
              {/* Question */}
              <div
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '16px',
                  color: '#94A3B8',
                  lineHeight: 1.4,
                  display: 'flex',
                }}
              >
                {card.q}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '14px',
              color: '#475569',
              display: 'flex',
            }}
          >
            4 conceptos. Datos IAU. Sin astrología.
          </div>
          <div
            style={{
              fontFamily: F,
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em',
              display: 'flex',
            }}
          >
            ECLIPTIC EXPLORER
          </div>
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size
  )
}
