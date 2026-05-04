'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

export function OphiuchusSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const pills = ['Nov 30 – Dic 17', '18 días en la eclíptica', '13ª constelación']

  return (
    <section ref={ref} className="relative py-24 px-4 md:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]"
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-8 md:p-12 text-center shadow-[0_0_60px_rgba(139,92,246,0.08)]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]"
          />

          <motion.span
            className="block mb-6 text-7xl md:text-8xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            🐍
          </motion.span>

          <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-5xl">
            El signo que borraron
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            Ofiuco siempre estuvo ahí. El Sol lo cruza 18 días cada año&nbsp;—
            del 30 de noviembre al 17 de diciembre. La astronomía nunca lo olvidó.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/calculator"
              className="text-sm font-medium text-violet-400 underline underline-offset-4 transition-colors hover:text-violet-300"
            >
              ¿Eres Ofiuco? Descúbrelo →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
