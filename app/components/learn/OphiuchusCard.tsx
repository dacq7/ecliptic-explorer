'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Explanation } from '@/app/content/explanations'

interface OphiuchusCardProps {
  explanation: Explanation
}

const PILLS = [
  'Nov 30 – Dic 17',
  '18 días en la eclíptica',
  'Ignorada desde 600 a.C.',
]

export function OphiuchusCard({ explanation }: OphiuchusCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.08)]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]" />

      <motion.span
        className="text-7xl md:text-8xl block mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        🐍
      </motion.span>

      <span className="inline-flex items-center gap-2 mb-4 text-xs font-medium uppercase tracking-[0.15em] text-violet-400 border border-violet-500/30 rounded-full px-3 py-1">
        La constelación ignorada
      </span>

      <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
        {explanation.title}
      </h2>

      <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-6 whitespace-pre-line">
        {explanation.body}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {PILLS.map((pill) => (
          <span
            key={pill}
            className="border border-violet-500/30 bg-violet-500/10 text-violet-300 rounded-full px-4 py-2 text-sm font-medium"
          >
            {pill}
          </span>
        ))}
      </div>

      {explanation.funFact && (
        <div className="mt-6 rounded-xl border border-violet-500/10 bg-violet-500/[0.03] px-5 py-3 text-xs text-violet-400/80 italic">
          {explanation.funFact}
        </div>
      )}
    </motion.div>
  )
}
