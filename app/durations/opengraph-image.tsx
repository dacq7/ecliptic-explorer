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

const BARS = [
  { label: 'VIRGO', days: 44, pct: 100, color: '#F59E0B' },
  { label: 'PISCIS', days: 38, pct: 86, color: '#94A3B8' },
  { label: 'ACUARIO', days: 24, pct: 55, color: '#94A3B8' },
  { label: 'OFIUCO', days: 18, pct: 41, color: '#C4B5FD', note: '(ignorado)' },
  { label: 'ESCORPIO', days: 7, pct: 16, color: '#FB7185' },
]

export default async function Image() {
  const cinzelData = await loadCinzel700()
  const fonts = cinzelData
    ? [{ name: 'Cinzel', data: cinzelData, weight: 700 as const, style: 'normal' as const }]
    : []
  const F = fonts.length ? 'Cinzel' : 'serif'

  const BAR_MAX_WIDTH = 560

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a1a',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 72px 48px',
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: F,
            fontSize: '56px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          No son 30 días.
        </div>
        <div
          style={{
            fontFamily: F,
            fontSize: '34px',
            fontWeight: 700,
            color: '#F59E0B',
            marginTop: '4px',
            marginBottom: '40px',
            display: 'flex',
          }}
        >
          Nunca lo fueron.
        </div>

        {/* Bars */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1,
          }}
        >
          {BARS.map((bar, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Bar */}
              <div
                style={{
                  width: `${(bar.pct / 100) * BAR_MAX_WIDTH}px`,
                  height: '22px',
                  background: bar.color,
                  borderRadius: '4px',
                  display: 'flex',
                }}
              />
              {/* Label */}
              <div
                style={{
                  fontFamily: F,
                  fontSize: '15px',
                  fontWeight: 700,
                  color: bar.color,
                  letterSpacing: '0.08em',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {bar.label} —
                <span style={{ fontFamily: 'sans-serif', fontWeight: 400, display: 'flex' }}>
                  {bar.days} días{bar.note ? ` ${bar.note}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: '13px',
            color: '#475569',
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex' }}>
            La astrología le asigna 30 días iguales a todos.
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
