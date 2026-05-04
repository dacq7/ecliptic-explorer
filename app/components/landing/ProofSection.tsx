'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { CONSTELLATIONS } from '@/app/logic/constellations'

const DISPLAY_NAMES = ['Virgo', 'Pisces', 'Leo', 'Capricornus', 'Ophiuchus', 'Scorpius']
const MAX_DAYS = 44

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export function ProofSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const displayConstellations = DISPLAY_NAMES.map(
    (name) => CONSTELLATIONS.find((c) => c.name === name)!,
  ).sort((a, b) => b.durationDays - a.durationDays)

  return (
    <section className="py-24 md:py-32 px-4 md:px-8">
      <motion.div
        ref={ref}
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={sectionVariants}
      >
        {/* Sub-section A: El número que nadie dijo */}
        <div className="text-center">
          <p className="font-display text-4xl md:text-6xl font-bold leading-tight text-white">
            No son 12.
          </p>
          <p className="font-display text-4xl md:text-6xl font-bold leading-tight text-amber-400">
            Son 13.
          </p>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            La Unión Astronómica Internacional reconoce 13 constelaciones en la eclíptica.
            La astrología ignoró a Ofiuco porque no encajaba en su sistema de 12 signos iguales.
          </p>
          <div className="mt-8 mx-auto inline-flex flex-col items-center gap-1 border border-violet-500/30 bg-violet-500/10 rounded-2xl px-8 py-5 shadow-[0_0_24px_rgba(139,92,246,0.15)]">
            <span className="text-5xl">🐍</span>
            <span className="font-display text-xl font-bold text-violet-300 mt-2">Ofiuco</span>
            <span className="text-sm text-violet-400/80">
              La 13ª constelación — ignorada por la astrología
            </span>
          </div>
        </div>

        {/* Sub-section B: Los días que no cuadran */}
        <div className="mt-20 text-center">
          <p className="font-display text-3xl md:text-4xl font-bold text-white">
            Escorpio dura 7 días.
          </p>
          <p className="font-display text-3xl md:text-4xl font-bold text-amber-400">
            Virgo dura 44.
          </p>
          <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mt-3 mb-10 leading-relaxed">
            La astrología le da 30 días a cada signo.
            <br />
            La eclíptica no entiende de igualdad.
          </p>

          <div className="flex flex-col gap-3">
            {displayConstellations.map((c, i) => {
              const isExtreme = c.name === 'Virgo' || c.name === 'Scorpius'
              const widthPct = ((c.durationDays / MAX_DAYS) * 100).toFixed(1) + '%'
              return (
                <div
                  key={c.name}
                  className="flex items-center gap-3 w-full max-w-xl mx-auto py-1"
                >
                  <span className="text-sm text-slate-300 w-28 shrink-0 text-right">
                    {c.nameEs} {c.emoji}
                  </span>
                  <div className="flex-1 bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${isExtreme ? 'bg-amber-400' : 'bg-blue-400/50'}`}
                      initial={{ width: '0%' }}
                      animate={inView ? { width: widthPct } : { width: '0%' }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.08 }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-10 text-right shrink-0">
                    {c.durationDays}d
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
