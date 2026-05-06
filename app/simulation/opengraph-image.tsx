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

const LABELS = [
  { label: '🏹 SAGITARIO', color: '#F59E0B', left: 60, top: 110 },
  { label: '🐍 OFIUCO', color: '#C4B5FD', left: 180, top: 60 },
  { label: '🦂 ESCORPIO', color: '#94A3B8', left: 350, top: 35 },
  { label: '♍ VIRGO', color: '#94A3B8', left: 530, top: 55 },
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
          background: '#000008',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ecliptic + Sol canvas area (left ~70%) */}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: '800px',
            height: '630px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ecliptic ellipse */}
          <div
            style={{
              position: 'absolute',
              left: '40px',
              top: '215px',
              width: '720px',
              height: '200px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
            }}
          />

          {/* Sol */}
          <div
            style={{
              position: 'absolute',
              left: '100px',
              top: '283px',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#F59E0B',
              boxShadow: '0 0 30px 15px rgba(255,140,0,0.5), 0 0 80px 40px rgba(255,140,0,0.2)',
              display: 'flex',
            }}
          />

          {/* Constellation labels along the ecliptic */}
          {LABELS.map((item, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${item.left}px`,
                top: `${item.top}px`,
                fontFamily: F,
                fontSize: '13px',
                fontWeight: 700,
                color: item.color,
                letterSpacing: '0.08em',
                display: 'flex',
              }}
            >
              {item.label}
            </div>
          ))}

          {/* Bottom left badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '36px',
              left: '48px',
              fontFamily: F,
              fontSize: '10px',
              fontWeight: 700,
              color: '#F59E0B',
              letterSpacing: '0.35em',
              display: 'flex',
            }}
          >
            SIMULACIÓN 3D INTERACTIVA
          </div>
        </div>

        {/* Right panel (glassmorphism) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '360px',
            height: '630px',
            background: 'rgba(255,255,255,0.04)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            padding: '0 40px',
          }}
        >
          {/* Panel label */}
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '11px',
              color: '#64748B',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            Sol actualmente en
          </div>

          {/* Constellation name */}
          <div
            style={{
              fontFamily: F,
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '12px',
              display: 'flex',
            }}
          >
            Sol en Sagitario
          </div>

          {/* Duration */}
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '14px',
              color: '#F59E0B',
              marginBottom: '8px',
              display: 'flex',
            }}
          >
            32 días en la eclíptica
          </div>

          {/* Date range */}
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              color: '#64748B',
              display: 'flex',
            }}
          >
            18 dic → 18 ene
          </div>

          {/* Divider */}
          <div
            style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.06)',
              marginTop: '32px',
              marginBottom: '32px',
              display: 'flex',
            }}
          />

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {[
              { label: 'Escorpio', value: '7 días', color: '#FB7185' },
              { label: 'Ofiuco', value: '18 días', color: '#C4B5FD' },
              { label: 'Virgo', value: '44 días', color: '#F59E0B' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#94A3B8', display: 'flex' }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: F, fontSize: '13px', color: stat.color, display: 'flex' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size
  )
}
