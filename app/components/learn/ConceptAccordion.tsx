'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CONCEPT_EXPLANATIONS } from '@/app/content/explanations'

const ACCENTS = [
  {
    badge: 'bg-blue-400/10 text-blue-400',
    border: 'border-l-2 border-blue-400/30',
    callout: 'bg-blue-400/[0.06] border border-blue-400/20 text-blue-400',
  },
  {
    badge: 'bg-amber-400/10 text-amber-400',
    border: 'border-l-2 border-amber-400/30',
    callout: 'bg-amber-400/[0.06] border border-amber-400/20 text-amber-400',
  },
  {
    badge: 'bg-rose-400/10 text-rose-400',
    border: 'border-l-2 border-rose-400/30',
    callout: 'bg-rose-400/[0.06] border border-rose-400/20 text-rose-400',
  },
  {
    badge: 'bg-violet-400/10 text-violet-400',
    border: 'border-l-2 border-violet-400/30',
    callout: 'bg-violet-400/[0.06] border border-violet-400/20 text-violet-400',
  },
]

export function ConceptAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="flex flex-col gap-2">
      {CONCEPT_EXPLANATIONS.map((item, index) => {
        const isOpen = activeIndex === index
        const accent = ACCENTS[index]
        const badge = String(index + 1).padStart(2, '0')

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.08 }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-150 overflow-hidden"
          >
            <button
              className="flex items-center gap-4 px-5 py-4 w-full text-left cursor-pointer"
              onClick={() => setActiveIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${index}`}
            >
              <span
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${accent.badge}`}
                aria-hidden="true"
              >
                {badge}
              </span>
              <span className="flex-1 font-display text-base md:text-lg font-semibold text-white leading-snug">
                {item.question}
              </span>
              <svg
                className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-body-${index}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className={`px-5 pb-5 ml-[52px] ${accent.border}`}>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </p>
                    {item.funFact && (
                      <div className={`mt-4 rounded-lg px-4 py-2.5 text-xs font-medium leading-relaxed ${accent.callout}`}>
                        {item.funFact}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
