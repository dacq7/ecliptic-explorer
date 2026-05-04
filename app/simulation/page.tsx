/**
 * /simulation — The 3D ecliptic simulation route.
 *
 * This page is the shell for Sistema 1. It hosts SolarCanvas in a
 * Suspense boundary so 3D loading never blocks the rest of the UI.
 *
 * TODO (Frontend Developer): Wire SolarCanvas, SidePanel, and DateSlider
 * once Three.js dependencies and stores are installed.
 */

import { Suspense } from 'react'

export default function SimulationPage() {
  return (
    <main className="relative w-full h-screen bg-[#0a0a1a] overflow-hidden">
      <Suspense fallback={<SimulationLoadingFallback />}>
        {/* TODO: <SolarCanvas /> */}
      </Suspense>
      {/* TODO: <SidePanel /> */}
      {/* TODO: <DateSlider /> */}
    </main>
  )
}

function SimulationLoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white/40 text-sm">Loading simulation...</p>
    </div>
  )
}
