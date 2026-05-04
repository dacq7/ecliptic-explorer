'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DoubleSide } from 'three'
import type { MeshBasicMaterial } from 'three'
import { useSimulationStore } from '@/app/store/simulationStore'
import { useUIStore } from '@/app/store/uiStore'
import { getConstellationAngleRanges } from '@/app/logic/eclipticAngles'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'

const INACTIVE_COLOR = '#1e3a6e'
const INACTIVE_OPACITY = 0.18
const INACTIVE_BOUNDARIES_OPACITY = 0.5
const ACTIVE_COLOR = '#f59e0b'
const ACTIVE_OPACITY = 0.70
const OPHIUCHUS_INACTIVE_COLOR = '#3b0764'
const OPHIUCHUS_INACTIVE_OPACITY = 0.22
const OPHIUCHUS_ACTIVE_COLOR = '#7c3aed'
const OPHIUCHUS_ACTIVE_OPACITY = 0.80

export function ConstellationRegions() {
  const currentDate = useSimulationStore(s => s.currentDate)
  const showIAUBoundaries = useUIStore(s => s.showIAUBoundaries)
  const { invalidate } = useThree()

  const ranges = useMemo(() => getConstellationAngleRanges(), [])

  const materialRefs = useRef<(MeshBasicMaterial | null)[]>(new Array(13).fill(null))
  const prevActiveRef = useRef<string>('')
  const transitionRef = useRef(1) // start at 1 (done) so first render snaps to correct state

  // Stable refs so useFrame always reads current values without stale closures
  const currentDateRef = useRef(currentDate)
  const showIAUBoundariesRef = useRef(showIAUBoundaries)

  useEffect(() => {
    currentDateRef.current = currentDate
    invalidate()
  }, [currentDate, invalidate])

  useEffect(() => {
    showIAUBoundariesRef.current = showIAUBoundaries
    invalidate()
  }, [showIAUBoundaries, invalidate])

  useFrame((_, delta) => {
    const date = currentDateRef.current
    const showBoundaries = showIAUBoundariesRef.current
    const activeName = getConstellationByDate(date).constellation.name

    if (activeName !== prevActiveRef.current) {
      prevActiveRef.current = activeName
      transitionRef.current = 0
    }

    const isOphiuchusActive = activeName === 'Ophiuchus'
    const transitionDuration = isOphiuchusActive ? 1.2 : 0.8
    transitionRef.current = Math.min(1, transitionRef.current + delta / transitionDuration)

    const t = transitionRef.current
    // ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3)

    ranges.forEach((range, i) => {
      const mat = materialRefs.current[i]
      if (!mat) return

      const isActive = range.name === activeName
      const isOphiuchus = range.name === 'Ophiuchus'

      if (isActive) {
        const targetOpacity = isOphiuchus ? OPHIUCHUS_ACTIVE_OPACITY : ACTIVE_OPACITY
        const baseOpacity = isOphiuchus ? OPHIUCHUS_INACTIVE_OPACITY : INACTIVE_OPACITY
        mat.opacity = baseOpacity + (targetOpacity - baseOpacity) * eased
        mat.color.set(isOphiuchus ? OPHIUCHUS_ACTIVE_COLOR : ACTIVE_COLOR)
      } else {
        mat.color.set(isOphiuchus ? OPHIUCHUS_INACTIVE_COLOR : INACTIVE_COLOR)
        const inactiveOpacity = isOphiuchus ? OPHIUCHUS_INACTIVE_OPACITY : INACTIVE_OPACITY
        mat.opacity = showBoundaries ? INACTIVE_BOUNDARIES_OPACITY : inactiveOpacity
      }
    })

    // Keep animating until transition completes
    if (t < 1) invalidate()
  })

  return (
    <>
      {ranges.map((range, i) => {
        // thetaStart and thetaLength use raw degree values from getConstellationAngleRanges().
        // Sagittarius starts at 90° — matches longitudeToPosition's XZ coordinate system
        // when mesh rotation is [π/2, 0, 0].
        // Virgo startDeg ≈ 359° (crosses 360°): Three.js handles wrap via periodic sin/cos.
        const thetaStart = range.startDeg * (Math.PI / 180)
        const thetaLength = (range.endDeg - range.startDeg) * (Math.PI / 180)

        return (
          <mesh key={range.name} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.6, 5.4, 64, 1, thetaStart, thetaLength]} />
            <meshBasicMaterial
              ref={el => { materialRefs.current[i] = el }}
              color={INACTIVE_COLOR}
              opacity={INACTIVE_OPACITY}
              transparent
              side={DoubleSide}
            />
          </mesh>
        )
      })}
    </>
  )
}
