import Link from 'next/link'
import { CONSTELLATIONS } from '@/app/logic/constellations'
import { DurationBar } from '@/app/components/durations/DurationBar'

export default function DurationsPage() {
  const sorted = [...CONSTELLATIONS].sort((a, b) => b.durationDays - a.durationDays)
  const maxDays = sorted[0].durationDays

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-4">
          Eclíptica · IAU · 13 Constelaciones
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4">
          <span className="block text-white">No son 30 días.</span>
          <span className="block text-amber-400">Nunca lo fueron.</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
          La astrología divide el zodíaco en 12 partes iguales de 30 días.<br />
          La eclíptica hace lo que quiere.
        </p>
      </section>

      {/* Duration bars */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 pb-24 flex flex-col gap-1">
        {sorted.map((constellation, index) => (
          <DurationBar
            key={constellation.name}
            constellation={constellation}
            maxDays={maxDays}
            index={index}
          />
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto">
        <div className="mb-12 border-t border-white/[0.06]" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          ¿En cuál estaba el Sol cuando naciste?
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
          Ingresa tu fecha de nacimiento.<br />
          Te decimos en qué constelación real estaba el Sol ese día.
        </p>
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center rounded-full font-medium h-14 px-8 text-lg bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_32px_rgba(251,191,36,0.3)] hover:shadow-[0_0_48px_rgba(251,191,36,0.5)] transition-all duration-300"
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
