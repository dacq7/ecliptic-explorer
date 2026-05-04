'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSimulationStore } from '@/app/store/simulationStore'
import { EclipticRing } from './EclipticRing'
import { ConstellationRegions } from './ConstellationRegions'
import { ConstellationLabels } from './ConstellationLabels'
import { SunOrbit } from './SunOrbit'
import { SimulationController } from './SimulationController'

const CAMERA_START = new Vector3(0, 22, 18)
const CAMERA_END = new Vector3(0, 12, 8)
const INTRO_DURATION = 2.5

function CameraController() {
  const { camera, invalidate } = useThree()
  const elapsedRef = useRef(0)
  const doneRef = useRef(false)

  useFrame((_, delta) => {
    if (doneRef.current) return
    elapsedRef.current = Math.min(elapsedRef.current + delta, INTRO_DURATION)
    const t = elapsedRef.current / INTRO_DURATION
    // Approximate cubicBezier(0.16, 1, 0.3, 1) — fast-in, ease-out
    const ease = 1 - Math.pow(1 - t, 3)
    camera.position.lerpVectors(CAMERA_START, CAMERA_END, ease)
    if (elapsedRef.current >= INTRO_DURATION) {
      camera.position.copy(CAMERA_END)
      doneRef.current = true
    } else {
      invalidate()
    }
  })

  return null
}

// Calls invalidate() whenever solarLongitude changes so demand-mode re-renders
function StoreInvalidator() {
  const { invalidate } = useThree()
  const solarLongitude = useSimulationStore(s => s.solarLongitude)

  useEffect(() => {
    invalidate()
  }, [solarLongitude, invalidate])

  return null
}

function StarBackground() {
  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade />
      <Stars
        radius={80}
        depth={30}
        count={800}
        factor={2}
        saturation={0.3}
        fade
        // @ts-expect-error — drei Stars accepts rotation as a prop
        rotation={[0.1, 0.3, 0]}
      />
      <Stars
        radius={50}
        depth={15}
        count={200}
        factor={5}
        saturation={0.6}
        fade
        // @ts-expect-error — drei Stars accepts rotation as a prop
        rotation={[0.2, -0.15, 0.1]}
      />
    </>
  )
}

export function SolarCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        frameloop="demand"
        camera={{ position: [0, 22, 18], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000008)
        }}
      >
        <color attach="background" args={['#000008']} />
        <ambientLight intensity={0.08} color="#0a1628" />

        <Suspense fallback={null}>
          <StarBackground />
          <EclipticRing />
          <ConstellationRegions />
          <ConstellationLabels />
          <SunOrbit />
        </Suspense>

        <CameraController />
        <StoreInvalidator />
        <SimulationController />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          dampingFactor={0.05}
          enableDamping
          makeDefault
        />
      </Canvas>
    </div>
  )
}
