'use client'

import { useUIStore } from '@/app/store/uiStore'
import { useWebGLDetect } from '@/app/hooks/useWebGLDetect'
import { useAmbientAudio } from '@/app/hooks/useAmbientAudio'
import { SolarCanvas } from './SolarCanvas'
import { SimulationFallback2D } from './SimulationFallback2D'
import { SimulationSidePanel } from './SimulationSidePanel'
import { DateSlider } from './DateSlider'
import { ExplorerControls } from './ExplorerControls'

export function SimulationShell() {
  useWebGLDetect()
  useAmbientAudio()
  const is2DFallback = useUIStore(s => s.is2DFallback)

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Simulación del plano eclíptico. El Sol se mueve por las 13 constelaciones reales según la fecha seleccionada."
    >
      {/* Layer 0: canvas */}
      {is2DFallback ? <SimulationFallback2D /> : <SolarCanvas />}

      {/* Layer 1: UI overlays — pointer-events: none on container, auto on interactive elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <ExplorerControls />
          <SimulationSidePanel />
          <DateSlider />
        </div>
      </div>
    </div>
  )
}
