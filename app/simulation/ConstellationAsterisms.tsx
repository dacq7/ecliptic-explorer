'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { raDecToCanvasXYZ } from './utils/raDecToCanvas'
import { ASTERISM_BY_CONSTELLATION } from './asterismData'

const SEGMENTS_PER_SECOND = 20
const FADE_OUT_DURATION   = 0.4

const ASTERISM_COLOR_NORMAL    = '#7eb8f7'
const ASTERISM_COLOR_OPHIUCHUS = '#c084fc'

interface DrawState {
  phase: 'idle' | 'drawing' | 'visible' | 'fading'
  segmentsRevealed: number
  opacity: number
}

interface ConstellationAsterismsProps {
  activeConstellation: string
  visible: boolean
}

export function ConstellationAsterisms({ activeConstellation, visible }: ConstellationAsterismsProps) {
  const geoRef   = useRef<THREE.BufferGeometry>(null)
  const matRef   = useRef<THREE.LineBasicMaterial>(null)
  const stateRef = useRef<DrawState>({ phase: 'idle', segmentsRevealed: 0, opacity: 0 })

  const color = activeConstellation === 'Ophiuchus' ? ASTERISM_COLOR_OPHIUCHUS : ASTERISM_COLOR_NORMAL

  // Rebuild geometry only when the active constellation changes.
  const positions = useMemo(() => {
    const asterism = ASTERISM_BY_CONSTELLATION[activeConstellation]
    if (!asterism) return new Float32Array(0)

    const arr = new Float32Array(asterism.lines.length * 6)
    asterism.lines.forEach((line, i) => {
      const [x0, y0, z0] = raDecToCanvasXYZ(line.from.ra, line.from.dec)
      const [x1, y1, z1] = raDecToCanvasXYZ(line.to.ra,   line.to.dec)
      arr.set([x0, y0, z0, x1, y1, z1], i * 6)
    })
    return arr
  }, [activeConstellation])

  // Sync geometry when positions change (new constellation loaded).
  useEffect(() => {
    const geo = geoRef.current
    if (!geo) return
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setDrawRange(0, 0)
  }, [positions])

  // State machine transition: new constellation → start draw cycle.
  useEffect(() => {
    const state = stateRef.current
    if (state.phase === 'idle') {
      stateRef.current = { phase: 'drawing', segmentsRevealed: 0, opacity: 0 }
    } else {
      stateRef.current.phase = 'fading'
    }
  }, [activeConstellation])

  useFrame((_, delta) => {
    const geo = geoRef.current
    const mat = matRef.current
    if (!geo || !mat) return

    if (!visible) {
      mat.opacity = 0
      return
    }

    const state    = stateRef.current
    const totalSeg = positions.length / 6

    if (state.phase === 'drawing') {
      state.segmentsRevealed = Math.min(
        totalSeg,
        state.segmentsRevealed + SEGMENTS_PER_SECOND * delta,
      )
      geo.setDrawRange(0, Math.floor(state.segmentsRevealed) * 2)
      state.opacity = Math.min(1, state.opacity + delta * 3)
      if (state.segmentsRevealed >= totalSeg) state.phase = 'visible'
    }

    if (state.phase === 'fading') {
      state.opacity = Math.max(0, state.opacity - delta / FADE_OUT_DURATION)
      if (state.opacity <= 0) {
        state.phase            = 'drawing'
        state.segmentsRevealed = 0
        geo.setDrawRange(0, 0)
      }
    }

    mat.opacity = state.opacity
  })

  return (
    <lineSegments>
      <bufferGeometry ref={geoRef} />
      <lineBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </lineSegments>
  )
}
