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

const STARS: [number, number][] = [
  [5, 8], [12, 22], [25, 5], [38, 18], [50, 3], [62, 14], [75, 9], [88, 20],
  [95, 5], [3, 35], [18, 42], [32, 28], [45, 38], [58, 45], [70, 32], [82, 40],
  [92, 25], [8, 55], [20, 65], [35, 58], [48, 72], [60, 60], [72, 68], [85, 55],
  [96, 62], [15, 80], [28, 88], [42, 78], [55, 85], [68, 82], [78, 88], [90, 75],
  [6, 92], [22, 95], [35, 90], [48, 95], [62, 88], [74, 92], [86, 85], [94, 90],
  [7, 48], [33, 70], [52, 14], [80, 52], [10, 75], [65, 28], [40, 50], [85, 72],
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Star field */}
        {STARS.map(([l, t], i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${l}%`,
              top: `${t}%`,
              width: i % 4 === 0 ? '2px' : '1px',
              height: i % 4 === 0 ? '2px' : '1px',
              borderRadius: '50%',
              background: `rgba(255,255,255,${i % 5 === 0 ? 0.9 : 0.5})`,
              display: 'flex',
            }}
          />
        ))}

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '90px',
          }}
        >
          <div
            style={{
              fontFamily: F,
              fontSize: '76px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              display: 'flex',
            }}
          >
            Tu signo está mal.
          </div>
          <div
            style={{
              marginTop: '18px',
              fontSize: '24px',
              color: '#94A3B8',
              fontFamily: 'sans-serif',
              display: 'flex',
            }}
          >
            La astronomía tiene 13 constelaciones. La astrología, 12.
          </div>
        </div>

        {/* Sol + ecliptic area */}
        <div
          style={{
            marginTop: '60px',
            position: 'relative',
            display: 'flex',
            width: '800px',
            height: '200px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ecliptic ellipse */}
          <div
            style={{
              position: 'absolute',
              left: '40px',
              top: '20px',
              width: '720px',
              height: '160px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex',
            }}
          />

          {/* Sol */}
          <div
            style={{
              position: 'absolute',
              left: '110px',
              top: '60px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#F59E0B',
              boxShadow: '0 0 60px 30px rgba(245,158,11,0.35)',
              display: 'flex',
            }}
          />

          {/* Ofiuco label */}
          <div
            style={{
              position: 'absolute',
              right: '80px',
              top: '68px',
              fontFamily: F,
              fontSize: '16px',
              fontWeight: 700,
              color: '#C4B5FD',
              letterSpacing: '0.12em',
              display: 'flex',
            }}
          >
            🐍 OFIUCO
          </div>
        </div>

        {/* Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '36px',
            fontFamily: F,
            fontSize: '13px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.22em',
            display: 'flex',
          }}
        >
          ECLIPTIC EXPLORER
        </div>
      </div>
    ),
    fonts.length ? { ...size, fonts } : size
  )
}
