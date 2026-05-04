'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { SIGN_COMPARISONS } from '@/app/content/comparisons'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import { ComparisonTable } from '@/app/components/compare/ComparisonTable'
import { ComparisonCard } from '@/app/components/compare/ComparisonCard'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

export default function ComparePage() {
  const ophiuchus = CONSTELLATIONS.find(c => c.name === 'Ophiuchus')!
  const calloutRef = useRef<HTMLDivElement>(null)
  const calloutInView = useInView(calloutRef, { once: true, margin: '-60px' })

  return (
    <main className="bg-[#0a0a1a] min-h-screen">
      {/* HERO */}
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <motion.p
          className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-4"
          {...fadeUp(0)}
        >
          Astronomía vs Astrología · 12 Signos · Datos IAU
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4"
          {...fadeUp(0.1)}
        >
          <span className="block">Las fechas</span>
          <span className="block text-amber-400">no mienten.</span>
        </motion.h1>
        <motion.p
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
          {...fadeUp(0.2)}
        >
          Doce signos iguales de 30 días cada uno.
          <br />
          Ese fue el acuerdo. La eclíptica nunca lo firmó.
        </motion.p>
        <motion.div
          className="mt-8 mb-12 flex flex-wrap gap-3 justify-center items-center"
          {...fadeUp(0.3)}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Cercano
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Desfasado
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 text-rose-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Muy lejos
          </span>
        </motion.div>
      </section>

      <ComparisonTable comparisons={SIGN_COMPARISONS} ophiuchus={ophiuchus} />
      <ComparisonCard comparisons={SIGN_COMPARISONS} ophiuchus={ophiuchus} />

      {/* STATS CALLOUT */}
      <motion.div
        ref={calloutRef}
        className="max-w-3xl mx-auto px-4 md:px-8 pb-16"
        initial={{ opacity: 0, y: 24 }}
        animate={calloutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left">
            <span className="font-display text-3xl font-bold text-rose-400">37 días</span>
            <span className="text-xs text-slate-500 mt-1 leading-relaxed">
              de distancia entre el Escorpio que conocías y el Escorpio real
            </span>
          </div>
          <div className="hidden md:block w-px bg-white/[0.06] self-stretch" />
          <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left">
            <span className="font-display text-3xl font-bold text-amber-400">44d</span>
            <span className="text-xs text-slate-500 mt-1 leading-relaxed">
              permanece el Sol en Virgo — la constelación más larga de la eclíptica
            </span>
          </div>
          <div className="hidden md:block w-px bg-white/[0.06] self-stretch" />
          <div className="flex flex-col items-center md:items-start flex-1 text-center md:text-left">
            <span className="font-display text-3xl font-bold text-violet-400">18 días</span>
            <span className="text-xs text-slate-500 mt-1 leading-relaxed">
              recorre el Sol por Ofiuco cada año, sin aparecer en ningún horóscopo
            </span>
          </div>
        </div>
      </motion.div>

      {/* CTA FINAL */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto">
        <div className="mb-12 border-t border-white/[0.06]" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          ¿Cuál es el tuyo, en realidad?
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
          Ya ves dónde está el error en el sistema.
          <br />
          Descubre cuál es tu constelación real.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-amber-500 text-black hover:bg-amber-400 focus-visible:ring-amber-500 h-14 px-8 text-lg shadow-[0_0_32px_rgba(251,191,36,0.3)] hover:shadow-[0_0_48px_rgba(251,191,36,0.5)] transition-shadow duration-300"
        >
          Descubre tu constelación real
        </Link>
        <p className="mt-4 text-xs text-slate-600">
          Gratis · Sin registro · Datos oficiales IAU
        </p>
      </section>
    </main>
  )
}
