import { Suspense } from 'react'
import { SimulationShell } from './SimulationShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulación 3D del Plano Eclíptico',
  description:
    'El Sol moviéndose por las 13 constelaciones reales. Simulación astronómica interactiva con datos IAU. Mueve el tiempo, observa la eclíptica en 3D.',
  keywords: [
    'simulación eclíptica interactiva',
    'plano eclíptico 3D',
    'movimiento del sol constelaciones',
    'eclíptica zodíaco',
    'astronomía interactiva',
    'sistema solar eclíptica',
    'constelaciones IAU',
  ],
  openGraph: {
    title: 'El Sol, moviéndose por las 13 constelaciones. En tiempo real.',
    description:
      'Simulación 3D del plano eclíptico con datos oficiales IAU. Escorpio aparece 7 días. Ofiuco aparece 18. Virgo domina 44. Muévelo tú mismo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Sol, moviéndose por las 13 constelaciones. En tiempo real.',
    description:
      'Simulación 3D del plano eclíptico con datos oficiales IAU. Escorpio aparece 7 días. Ofiuco aparece 18. Virgo domina 44. Muévelo tú mismo.',
  },
}

export default function SimulationPage() {
  return (
    <main
      className="relative flex-1 min-h-0 w-full bg-[#000008] overflow-hidden"
      style={{ paddingTop: 0, marginTop: 0 }}
    >
      <Suspense fallback={<SimulationLoadingFallback />}>
        <SimulationShell />
      </Suspense>
    </main>
  )
}

function SimulationLoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#000008]">
      <p className="text-[10px] text-amber-400/60 uppercase tracking-[0.3em] font-medium">
        Inicializando simulación
      </p>
      <div className="w-8 h-8 rounded-full bg-[#ff8c00] animate-pulse shadow-[0_0_24px_12px_rgba(255,140,0,0.4),0_0_60px_30px_rgba(255,140,0,0.15)]" />
      <div className="w-48 h-px bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full w-0 bg-amber-400/60 rounded-full animate-[grow_2s_ease-in-out_forwards]" />
      </div>
      <p className="text-xs text-slate-600 font-mono">
        13 constelaciones · Plano eclíptico IAU
      </p>
    </div>
  )
}
