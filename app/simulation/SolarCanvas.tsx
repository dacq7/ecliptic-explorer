'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useSimulationStore } from '@/app/store/simulationStore'
import { EclipticRing } from './EclipticRing'
import { ConstellationRegions } from './ConstellationRegions'
import { ConstellationLabels } from './ConstellationLabels'
import { NamedStars } from './NamedStars'
import { SunOrbit } from './SunOrbit'
import { SimulationController } from './SimulationController'
import { WebGLContextGuard } from './WebGLContextGuard'

const CAMERA_START = new Vector3(0, 22, 18)
const CAMERA_END = new Vector3(0, 12, 8)
const CAMERA_START_MOBILE = new Vector3(0, 28, 22)
const CAMERA_END_MOBILE = new Vector3(0, 18, 14)
const CAMERA_START_PHONE = new Vector3(0, 35, 28)
const CAMERA_END_PHONE = new Vector3(0, 22, 18)
const INTRO_DURATION = 2.5

function CameraController({ start, end }: { start: Vector3; end: Vector3 }) {
  const { camera, invalidate } = useThree()
  const elapsedRef = useRef(0)
  const doneRef = useRef(false)

  useFrame((_, delta) => {
    if (doneRef.current) return
    elapsedRef.current = Math.min(elapsedRef.current + delta, INTRO_DURATION)
    const t = elapsedRef.current / INTRO_DURATION
    // Approximate cubicBezier(0.16, 1, 0.3, 1) — fast-in, ease-out
    const ease = 1 - Math.pow(1 - t, 3)
    camera.position.lerpVectors(start, end, ease)
    if (elapsedRef.current >= INTRO_DURATION) {
      camera.position.copy(end)
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
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  return (
    <>
      <Stars radius={100} depth={50} count={isMobile ? 800 : 3000} factor={3} saturation={0} fade />
      {!isMobile && (
        <>
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
      )}
    </>
  )
}

export function SolarCanvas() {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
  const isMobileViewport = viewportWidth < 768
  const isPhoneViewport = viewportWidth < 480
  const cameraStart = isPhoneViewport ? CAMERA_START_PHONE : isMobileViewport ? CAMERA_START_MOBILE : CAMERA_START
  const cameraEnd = isPhoneViewport ? CAMERA_END_PHONE : isMobileViewport ? CAMERA_END_MOBILE : CAMERA_END

  const cssStars = useMemo(() => {
    let seed = 42
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff
      return (seed >>> 0) / 0xffffffff
    }
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      opacity: 0.3 + rand() * 0.5,
      size: 1 + Math.round(rand()),
    }))
  }, [])

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, viewportWidth < 640 ? 1.5 : 2]}
        frameloop="demand"
        camera={{ position: isPhoneViewport ? [0, 35, 28] : isMobileViewport ? [0, 28, 22] : [0, 22, 18], fov: 45 }}
        gl={{ antialias: viewportWidth >= 640, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000008)
        }}
      >
        <WebGLContextGuard />
        <color attach="background" args={['#000008']} />
        <ambientLight intensity={0.08} color="#0a1628" />

        <Suspense fallback={null}>
          <StarBackground />
          <EclipticRing />
          <ConstellationRegions />
          <ConstellationLabels />
          {viewportWidth >= 640 && <NamedStars />}
          <SunOrbit />
        </Suspense>

        <CameraController start={cameraStart} end={cameraEnd} />
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
      <div className="absolute inset-0 md:hidden pointer-events-none" aria-hidden="true">
        {cssStars.map(s => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: 'white',
              borderRadius: '50%',
              opacity: s.opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}
