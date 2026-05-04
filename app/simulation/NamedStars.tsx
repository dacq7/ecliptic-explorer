'use client'

import { Html } from '@react-three/drei'
import { useUIStore } from '@/app/store/uiStore'

interface StarData {
  name: string
  x: number
  y: number
  z: number
}

// Approximate visual positions in world space (XZ plane = ecliptic).
// Angles chosen to loosely match each star's sky region relative to the ecliptic ring.
// Radius > 5.4 (ring outer edge) to keep stars outside the ring.
function starAt(angleDeg: number, radius: number, height: number): { x: number; y: number; z: number } {
  const r = angleDeg * (Math.PI / 180)
  return { x: radius * Math.cos(r), y: height, z: radius * Math.sin(r) }
}

const NAMED_STARS: StarData[] = [
  { name: 'Sirius',      ...starAt(105, 8.2, -1.2) },
  { name: 'Betelgeuse',  ...starAt(82,  7.6,  1.5) },
  { name: 'Rigel',       ...starAt(78,  8.8, -1.8) },
  { name: 'Aldebaran',   ...starAt(66,  7.2,  0.9) },
  { name: 'Spica',       ...starAt(203, 7.9, -1.4) },
  { name: 'Antares',     ...starAt(248, 8.4, -0.7) },
  { name: 'Vega',        ...starAt(149, 9.6,  3.3) },
  { name: 'Arcturus',    ...starAt(216, 8.9,  2.9) },
  { name: 'Pollux',      ...starAt(116, 7.3,  0.6) },
  { name: 'Fomalhaut',   ...starAt(332, 9.1, -1.6) },
]

export function NamedStars() {
  const showStarNames = useUIStore(s => s.showStarNames)

  if (!showStarNames) return null

  return (
    <>
      {NAMED_STARS.map(star => (
        <Html
          key={star.name}
          position={[star.x, star.y, star.z]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
            {/* Bright star dot */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 6px 2px rgba(200, 220, 255, 0.8), 0 0 12px 4px rgba(150, 180, 255, 0.4)',
                flexShrink: 0,
              }}
            />
            {/* Star name label */}
            <div
              style={{
                fontSize: '9px',
                color: 'rgba(180, 200, 255, 0.65)',
                whiteSpace: 'nowrap',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                userSelect: 'none',
              }}
            >
              {star.name}
            </div>
          </div>
        </Html>
      ))}
    </>
  )
}
