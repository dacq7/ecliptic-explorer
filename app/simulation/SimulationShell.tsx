'use client'

import { useUIStore } from '@/app/store/uiStore'
import { useWebGLDetect } from '@/app/hooks/useWebGLDetect'
import { SolarCanvas } from './SolarCanvas'
import { SimulationFallback2D } from './SimulationFallback2D'

export function SimulationShell() {
  useWebGLDetect()
  const is2DFallback = useUIStore(s => s.is2DFallback)

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Simulación del plano eclíptico. El Sol se mueve por las 13 constelaciones reales según la fecha seleccionada."
    >
      {is2DFallback ? <SimulationFallback2D /> : <SolarCanvas />}
    </div>
  )
}
