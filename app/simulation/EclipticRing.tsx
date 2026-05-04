'use client'

import { ECLIPTIC_RADIUS } from './SunMesh'

export function EclipticRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[ECLIPTIC_RADIUS, 0.04, 16, 100]} />
      <meshBasicMaterial color="#ffffff" opacity={0.1} transparent />
    </mesh>
  )
}
