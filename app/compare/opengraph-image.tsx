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

const ROWS = [
  {
    emoji: '🦂',
    sign: 'Escorpio',
    astro: 'Oct 23 – Nov 21',
    astron: 'Nov 23 – Nov 29',
    diff: '+31 días',
    highlight: 'rose',
  },
  {
    emoji: '⚖️',
    sign: 'Libra',
    astro: 'Sep 23 – Oct 22',
    astron: 'Oct 31 – Nov 22',
    diff: '+38 días',
    highlight: 'rose-soft',
  },
  {
    emoji: '♍',
    sign: 'Virgo',
    astro: 'Ago 23 – Sep 22',
    astron: 'Sep 17 – Oct 30',
    diff: '44 días reales',
    highlight: 'amber',
  },
  {
    emoji: '🐍',
    sign: 'Ofiuco',
    astro: '— (no existe)',
    astron: 'Nov 30 – Dic 17',
    diff: '18 días ignorados',
    highlight: 'violet',
  },
]

function rowBackground(highlight: string) {
  if (highlight === 'rose') return 'rgba(251,113,133,0.08)'
  if (highlight === 'rose-soft') return 'rgba(251,113,133,0.04)'
  if (highlight === 'amber') return 'rgba(245,158,11,0.06)'
  if (highlight === 'violet') return 'rgba(196,181,253,0.08)'
  return 'transparent'
}

function rowBorderTop(highlight: string) {
  if (highlight === 'violet') return '1px solid rgba(196,181,253,0.2)'
  return 'none'
}

function diffColor(highlight: string) {
  if (highlight === 'rose' || highlight === 'rose-soft') return '#FB7185'
  if (highlight === 'amber') return '#F59E0B'
  if (highlight === 'violet') return '#C4B5FD'
  return '#94A3B8'
}

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
          padding: '56px 72px 48px',
        }}
      >
        {/* Headline */}
        <div
          style={{
            fontFamily: F,
            fontSize: '52px',
            fontWeight: 700,
            color: '#ffffff',
            display: 'flex',
          }}
        >
          Las fechas no mienten.
        </div>
        <div
          style={{
            fontFamily: F,
            fontSize: '28px',
            fontWeight: 700,
            color: '#F59E0B',
            marginTop: '6px',
            marginBottom: '32px',
            display: 'flex',
          }}
        >
          Astronomía vs. Astrología.
        </div>

        {/* Table */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.03)',
              padding: '12px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {['SIGNO', 'ASTROLOGÍA', 'ASTRONOMÍA', 'DESFASE'].map((col, i) => (
              <div
                key={i}
                style={{
                  fontFamily: F,
                  fontSize: '11px',
                  color: '#475569',
                  letterSpacing: '0.15em',
                  display: 'flex',
                  flex: i === 0 ? 1.2 : 1,
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {ROWS.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                padding: '18px 20px',
                background: rowBackground(row.highlight),
                borderTop: rowBorderTop(row.highlight),
                alignItems: 'center',
                borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}
            >
              {/* Sign */}
              <div style={{ display: 'flex', flex: 1.2, gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', display: 'flex' }}>{row.emoji}</span>
                <span
                  style={{
                    fontFamily: F,
                    fontSize: '14px',
                    fontWeight: 700,
                    color: diffColor(row.highlight),
                    display: 'flex',
                  }}
                >
                  {row.sign}
                </span>
              </div>
              {/* Astrology */}
              <div
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#64748B',
                  display: 'flex',
                }}
              >
                {row.astro}
              </div>
              {/* Astronomy */}
              <div
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#94A3B8',
                  display: 'flex',
                }}
              >
                {row.astron}
              </div>
              {/* Diff */}
              <div
                style={{
                  flex: 1,
                  fontFamily: F,
                  fontSize: '13px',
                  fontWeight: 700,
                  color: diffColor(row.highlight),
                  display: 'flex',
                }}
              >
                {row.diff}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '12px',
              color: '#475569',
              display: 'flex',
            }}
          >
            Fuente: IAU 1930 · 12 signos restantes en ecliptic-explorer.vercel.app
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
