'use client'

import { motion } from 'framer-motion'
import { useSimulationStore } from '@/app/store/simulationStore'
import { useUIStore } from '@/app/store/uiStore'
import { getConstellationAngleRanges, getVisualSolarAngle } from '@/app/logic/eclipticAngles'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'
import { useSimulationTick } from '@/app/hooks/useSimulationTick'

const CX = 200
const CY = 200
const R_OUTER = 150
const R_INNER = 112
const R_SUN = 131

const RANGES = getConstellationAngleRanges()

// Deterministic star field — no Math.random at render time.
// Uses a quasi-random low-discrepancy sequence for even coverage.
// Opacity range 0.20–0.72 ensures stars are visible on dark backgrounds.
const STAR_DOTS = Array.from({ length: 120 }, (_, i) => ({
  cx: ((i * 137.508 + 23) % 390) + 5,
  cy: ((i * 97.31 + 41) % 390) + 5,
  r: i % 13 === 0 ? 2.0 : i % 7 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.7,
  opacity: 0.20 + (i % 8) * 0.065, // 0.20 → 0.72
}))

/**
 * Converts a visual angle (90° = top, clockwise) to SVG [x, y] coordinates.
 */
function visualToXY(visualDeg: number, r: number): [number, number] {
  const rad = (visualDeg - 90) * (Math.PI / 180)
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)]
}

function sectorPath(startDeg: number, endDeg: number): string {
  const span = endDeg - startDeg
  const large = span >= 180 ? 1 : 0
  const [x1, y1] = visualToXY(startDeg, R_OUTER)
  const [x2, y2] = visualToXY(endDeg, R_OUTER)
  const [x3, y3] = visualToXY(endDeg, R_INNER)
  const [x4, y4] = visualToXY(startDeg, R_INNER)
  return [
    `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
    `A ${R_INNER} ${R_INNER} 0 ${large} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
    'Z',
  ].join(' ')
}

export function SimulationFallback2D() {
  // Drive the animation loop — mirrors SimulationController but uses RAF, not useFrame
  useSimulationTick()

  const currentDate = useSimulationStore(s => s.currentDate)
  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)

  const activeConstellation = getConstellationByDate(currentDate).constellation

  // Compute sun position directly from currentDate — solarLongitude in the store
  // is only kept in sync by SimulationController (3D), so we derive it ourselves here.
  const visualAngle = getVisualSolarAngle(currentDate)
  const [sunX, sunY] = visualToXY(visualAngle, R_SUN)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#000008]">
      <p className="text-center mb-4 text-xs text-slate-600 font-mono">
        Modo 2D — WebGL no disponible en este navegador
      </p>
      <div
        className="w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden"
        style={{ background: 'rgba(0,0,8,0.80)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <svg
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Star field */}
          {STAR_DOTS.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
          ))}

          {/* Constellation sectors */}
          {RANGES.map(range => {
            const isActive = activeConstellation.name === range.name
            const isOphiuchus = range.name === 'Ophiuchus'
            const fill = isActive ? '#f59e0b' : isOphiuchus ? '#7c3aed' : '#1e3a6e'
            const fillOpacity = isActive ? 0.75 : isOphiuchus ? 0.22 : 0.18

            return (
              <motion.path
                key={range.name}
                d={sectorPath(range.startDeg, range.endDeg)}
                fill={fill}
                fillOpacity={fillOpacity}
                animate={{ fill, fillOpacity }}
                transition={{ duration: 0.8 }}
              />
            )
          })}

          {/* IAU boundary lines — one radial line per sector edge */}
          {showIAUBoundaries && RANGES.map(range => {
            const [x1, y1] = visualToXY(range.startDeg, R_INNER)
            const [x2, y2] = visualToXY(range.startDeg, R_OUTER)
            return (
              <line
                key={`boundary-${range.name}`}
                x1={x1.toFixed(2)}
                y1={y1.toFixed(2)}
                x2={x2.toFixed(2)}
                y2={y2.toFixed(2)}
                stroke="rgba(255,255,255,0.30)"
                strokeWidth="0.8"
                strokeDasharray="3 2"
              />
            )
          })}

          {/* Ecliptic ring */}
          <circle
            cx={CX}
            cy={CY}
            r={(R_OUTER + R_INNER) / 2}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.5"
            strokeOpacity={showIAUBoundaries ? 0.55 : 0.30}
          />

          {/* Sun — animated with spring physics on position change */}
          <motion.g
            animate={{ x: sunX - CX, y: sunY - CY }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            {/* Glow rings */}
            <circle cx={CX} cy={CY} r={14} fill="#ff8c00" opacity={0.08} />
            <circle cx={CX} cy={CY} r={9} fill="#ff8c00" opacity={0.18} />
            {/* Core */}
            <motion.circle
              cx={CX}
              cy={CY}
              r={5}
              fill="#fff7e0"
              animate={{ r: [4.8, 5.2, 4.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>

          {/* Active constellation label */}
          {(() => {
            const active = RANGES.find(r => r.name === activeConstellation.name)
            if (!active) return null
            const [lx, ly] = visualToXY(active.midDeg, R_INNER - 18)
            const con = CONSTELLATIONS.find(c => c.name === active.name)
            return (
              <text
                x={lx.toFixed(2)}
                y={ly.toFixed(2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill={active.name === 'Ophiuchus' ? '#a78bfa' : '#fbbf24'}
                opacity="0.9"
              >
                {con?.emoji} {con?.nameEs}
              </text>
            )
          })()}

          {/* IAU sector labels — shown when boundaries are active */}
          {showIAUBoundaries && RANGES.map(range => {
            const con = CONSTELLATIONS.find(c => c.name === range.name)
            if (!con) return null
            const isActive = activeConstellation.name === range.name
            if (isActive) return null // active label already rendered above
            const [lx, ly] = visualToXY(range.midDeg, R_INNER - 18)
            return (
              <text
                key={`label-${range.name}`}
                x={lx.toFixed(2)}
                y={ly.toFixed(2)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill={range.name === 'Ophiuchus' ? '#a78bfa' : 'rgba(255,255,255,0.35)'}
                opacity="0.8"
              >
                {con.emoji}
              </text>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
