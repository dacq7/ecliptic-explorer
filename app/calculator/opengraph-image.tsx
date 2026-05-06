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
          backgroundImage: 'radial-gradient(ellipse at 50% 60%, rgba(245,158,11,0.08), transparent 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top left label */}
        <div
          style={{
            position: 'absolute',
            top: '32px',
            left: '48px',
            fontFamily: F,
            fontSize: '11px',
            fontWeight: 700,
            color: '#F59E0B',
            letterSpacing: '0.3em',
            display: 'flex',
          }}
        >
          CALCULADORA DE SIGNO REAL
        </div>

        {/* Card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid rgba(245,158,11,0.2)',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)',
            padding: '56px 72px',
            gap: '0px',
          }}
        >
          {/* Question */}
          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '18px',
              color: '#94A3B8',
              display: 'flex',
            }}
          >
            ¿Naciste el 15 de noviembre?
          </div>

          {/* Separator */}
          <div
            style={{
              width: '240px',
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
              marginTop: '24px',
              marginBottom: '24px',
              display: 'flex',
            }}
          />

          {/* Label */}
          <div
            style={{
              fontFamily: F,
              fontSize: '28px',
              fontWeight: 700,
              color: '#ffffff',
              display: 'flex',
            }}
          >
            Tu signo real es...
          </div>

          {/* Result */}
          <div
            style={{
              marginTop: '20px',
              fontFamily: F,
              fontSize: '64px',
              fontWeight: 700,
              color: '#C4B5FD',
              boxShadow: '0 0 80px 0px rgba(139,92,246,0.4)',
              display: 'flex',
            }}
          >
            🐍 OFIUCO
          </div>

          {/* Note */}
          <div
            style={{
              marginTop: '20px',
              fontFamily: 'sans-serif',
              fontSize: '14px',
              color: '#FB7185',
              display: 'flex',
            }}
          >
            No es el del horóscopo.
          </div>
        </div>

        {/* Bottom right domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '36px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#475569',
            display: 'flex',
          }}
        >
          ecliptic-explorer.vercel.app
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size
  )
}
