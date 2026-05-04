'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { StarField } from '@/app/components/shared/StarField'
import { Button } from '@/app/components/shared/Button'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0a0a1a] px-4 py-20 md:px-8">
      <StarField className="absolute inset-0 z-0" aria-hidden />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em]"
        >
          Astronomía · IAU · 13 Constelaciones
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight max-w-2xl mx-auto"
        >
          <span className="block text-white">Tu signo está</span>
          <span className="block text-amber-400">mal.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-slate-400 max-w-md mx-auto leading-relaxed"
        >
          La astrología usa un sistema de 2.000 años.
          <br />
          La astronomía tiene 13 constelaciones.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 mt-2 justify-center"
        >
          <Link href="/calculator">
            <Button
              variant="primary"
              size="lg"
              className="shadow-[0_0_24px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-shadow"
            >
              Descubre el real
            </Button>
          </Link>
          <Link href="/simulation">
            <Button variant="secondary" size="lg">
              Ver la simulación
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce hidden sm:block">
        ↓
      </div>
    </section>
  )
}
