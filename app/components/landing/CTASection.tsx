'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, type Variants } from 'framer-motion'


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 px-4 text-center md:py-32">
      <motion.div
        className="mx-auto max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.h2
          variants={itemVariants}
          className="font-display mb-4 text-4xl font-bold text-white md:text-6xl"
        >
          ¿Cuál es el tuyo?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mx-auto mb-10 max-w-md text-base leading-relaxed text-slate-400 md:text-lg"
        >
          Ingresa tu fecha de nacimiento.
          <br />
          Te decimos en qué constelación real estaba el Sol ese día.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="relative inline-flex flex-col items-center gap-3"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-amber-400/20 blur-3xl"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />

          <Link
            href="/calculator"
            className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-amber-500 text-black hover:bg-amber-400 focus-visible:ring-amber-500 h-14 px-8 text-lg min-w-[260px] shadow-[0_0_40px_rgba(251,191,36,0.5)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(251,191,36,0.7)] sm:w-auto"
          >
            Descubre tu signo real
          </Link>

          <p className="text-xs text-slate-600">
            Gratis&nbsp;·&nbsp;Sin registro&nbsp;·&nbsp;Datos oficiales IAU
          </p>

          <Link
            href="/simulation"
            className="mt-3 text-sm text-slate-500 underline underline-offset-4 transition-colors hover:text-slate-300"
          >
            O explora la simulación 3D →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
