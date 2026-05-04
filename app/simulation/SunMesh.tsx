'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BackSide } from 'three'
import type { Mesh, MeshStandardMaterial } from 'three'
import { useSimulationStore } from '@/app/store/simulationStore'
import { longitudeToPosition } from './SolarPosition'

export const ECLIPTIC_RADIUS = 5

export function SunMesh() {
  const solarLongitude = useSimulationStore(s => s.solarLongitude)
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<MeshStandardMaterial>(null)
  const pulseRef = useRef(0)

  const { x, y, z } = longitudeToPosition(solarLongitude, ECLIPTIC_RADIUS)

  useFrame((_, delta) => {
    pulseRef.current += delta * 0.8
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 2.5 + Math.sin(pulseRef.current) * 0.3
    }
    if (meshRef.current) {
      const scale = 1 + Math.sin(pulseRef.current * 1.3) * 0.015
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={[x, y, z]}>
      {/* Core solar sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#fff7e0"
          emissive="#ff8c00"
          emissiveIntensity={2.5}
          roughness={0}
          metalness={0}
        />
      </mesh>

      {/* Glow layer 1 — corona interior */}
      <mesh>
        <sphereGeometry args={[0.44, 16, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.18} side={BackSide} />
      </mesh>

      {/* Glow layer 2 — halo exterior */}
      <mesh>
        <sphereGeometry args={[0.65, 12, 12]} />
        <meshBasicMaterial color="#ff8c00" transparent opacity={0.07} side={BackSide} />
      </mesh>

      {/* Glow layer 3 — resplandor difuso */}
      <mesh>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.025} side={BackSide} />
      </mesh>

      {/* Solar point light — warms nearby constellation sectors */}
      <pointLight color="#ff9500" intensity={3.5} distance={8} decay={2} />
    </group>
  )
}
