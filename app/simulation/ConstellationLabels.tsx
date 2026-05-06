'use client'

import { Html } from '@react-three/drei'
import { useUIStore } from '@/app/store/uiStore'
import { useConstellationHighlight } from '@/app/hooks/useConstellationHighlight'
import { useLayoutMode } from '@/app/hooks/useLayoutMode'
import { getConstellationAngleRanges } from '@/app/logic/eclipticAngles'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import { longitudeToPosition } from '@/app/simulation/SolarPosition'

const LABEL_RADIUS = 6.5

// On portrait mobile viewports only the 5 most recognizable constellations render
// to avoid label clutter with Scorpius/Ophiuchus tightly packed sectors
const MOBILE_PRIORITY = new Set(['Virgo', 'Scorpius', 'Ophiuchus', 'Sagittarius', 'Leo'])

const SPECIAL_SUBLABELS: Record<string, string> = {
  Virgo: '44 días · la más larga',
  Scorpius: '7 días · la más corta',
  Ophiuchus: 'ignorada · 18 días',
}

const IAU_SUBLABELS: Record<string, string> = {
  Sagittarius: '32 días · cruza año nuevo',
  Capricornus: '28 días',
  Aquarius: '24 días',
  Pisces: '38 días',
  Aries: '25 días',
  Taurus: '38 días',
  Gemini: '29 días',
  Cancer: '21 días',
  Leo: '37 días',
  Virgo: '44 días · la más larga',
  Libra: '23 días',
  Scorpius: '7 días · la más corta',
  Ophiuchus: 'ignorada · 18 días',
}

export function ConstellationLabels() {
  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)
  const { constellation: activeConstellation } = useConstellationHighlight()
  const { isPhone, isLandscapePhone, isPortraitPhone } = useLayoutMode()
  const ranges = getConstellationAngleRanges()

  // Portrait tablet/phone filter — landscape handled separately via early return per label
  const isMobile = isPortraitPhone

  return (
    <>
      {CONSTELLATIONS.map(c => {
        const range = ranges.find(r => r.name === c.name)
        if (!range) return null

        const isActive = activeConstellation.name === c.name
        const pos = longitudeToPosition(range.midDeg, LABEL_RADIUS)

        // Portrait phone (< 480px): large emoji labels
        if (isPhone && !isLandscapePhone) {
          return (
            <Html
              key={c.name}
              position={[pos.x, pos.y, pos.z]}
              center
              distanceFactor={12}
              style={{ pointerEvents: 'none' }}
            >
              {isActive ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', lineHeight: 1 }}>
                  <div style={{ fontSize: '42px', lineHeight: 1, filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.8))' }}>{c.emoji}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#F59E0B', background: 'rgba(0,0,0,0.65)', padding: '2px 8px', borderRadius: '10px', marginTop: '3px', whiteSpace: 'nowrap' }}>
                    {c.nameEs}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '28px', opacity: 0.75, userSelect: 'none', lineHeight: 1 }}>
                  {c.emoji}
                </div>
              )}
            </Html>
          )
        }

        // Landscape phone: compact emoji labels — 36px active, 22px inactive
        if (isLandscapePhone) {
          return (
            <Html
              key={c.name}
              position={[pos.x, pos.y, pos.z]}
              center
              distanceFactor={7}
              style={{ pointerEvents: 'none' }}
            >
              {isActive ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none', lineHeight: 1 }}>
                  <div style={{ fontSize: '36px', lineHeight: 1 }}>{c.emoji}</div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#F59E0B',
                    textShadow: '0 0 6px rgba(245,158,11,0.7)',
                    background: 'rgba(0,0,0,0.60)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginTop: '3px',
                    whiteSpace: 'nowrap',
                  }}>
                    {c.nameEs}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '22px', opacity: 0.45, userSelect: 'none', lineHeight: 1 }}>
                  {c.emoji}
                </div>
              )}
            </Html>
          )
        }

        // Portrait tablet (480–767px): only priority labels + active
        if (isMobile && !MOBILE_PRIORITY.has(c.name) && !isActive) return null

        const isOphiuchus = c.name === 'Ophiuchus'
        const sublabel = showIAUBoundaries
          ? IAU_SUBLABELS[c.name]
          : SPECIAL_SUBLABELS[c.name]

        const labelColor = isActive
          ? 'rgba(245, 158, 11, 0.90)'
          : isOphiuchus
            ? 'rgba(167, 139, 250, 0.80)'
            : 'rgba(255, 255, 255, 0.55)'

        const borderColor = isActive
          ? 'rgba(245, 158, 11, 0.35)'
          : isOphiuchus
            ? 'rgba(124, 58, 237, 0.30)'
            : 'rgba(255, 255, 255, 0.04)'

        const sublabelColor = isActive
          ? isOphiuchus
            ? 'rgba(167, 139, 250, 0.70)'
            : 'rgba(245, 158, 11, 0.65)'
          : 'rgba(255, 255, 255, 0.35)'

        return (
          <Html
            key={c.name}
            position={[pos.x, pos.y, pos.z]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                background: 'rgba(0, 0, 8, 0.65)',
                backdropFilter: 'blur(8px)',
                border: `1px solid ${borderColor}`,
                borderRadius: '6px',
                padding: '4px 8px',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: labelColor,
                  lineHeight: 1.3,
                }}
              >
                {c.emoji} {c.nameEs}
              </div>
              {sublabel && (
                <div
                  style={{
                    fontSize: '10px',
                    color: sublabelColor,
                    lineHeight: 1.2,
                    marginTop: '1px',
                  }}
                >
                  {sublabel}
                </div>
              )}
            </div>
          </Html>
        )
      })}
    </>
  )
}
