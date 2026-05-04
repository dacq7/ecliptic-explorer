import Link from 'next/link'
import { CONSTELLATION_EXPLANATIONS } from '@/app/content/explanations'
import { OphiuchusCard } from '@/app/components/learn/OphiuchusCard'
import { ConceptAccordion } from '@/app/components/learn/ConceptAccordion'

export default function LearnPage() {
  const ophiuchus = CONSTELLATION_EXPLANATIONS['Ophiuchus']

  return (
    <main className="bg-[#0a0a1a] min-h-screen">
      {/* HERO */}
      <section className="pt-24 pb-16 px-4 md:px-8 max-w-3xl mx-auto text-center">
        <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-4">
          Astronomía · IAU · Lo que nadie te explicó
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-4">
          <span className="block">Lo que la astrología</span>
          <span className="block text-amber-400">no dijo.</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
          Qué es la eclíptica, por qué son 13, por qué Escorpio dura 7 días.
          <br />
          Cuatro respuestas que el zodíaco nunca te dio.
        </p>
      </section>

      {/* OPHIUCHUS FEATURE CARD */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 pb-16">
        <OphiuchusCard explanation={ophiuchus} />
      </section>

      {/* CONCEPT ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 md:px-8 pb-24">
        <div className="mb-10 border-t border-white/[0.06]" />
        <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-1">
          Las preguntas que nadie respondió
        </h2>
        <p className="text-slate-500 text-sm mb-8 md:hidden">
          Toca cualquier pregunta para leer la respuesta.
        </p>
        <p className="text-slate-500 text-sm mb-8 hidden md:block">
          Haz clic en cualquier pregunta para leer la respuesta.
        </p>
        <ConceptAccordion />
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-4 text-center max-w-xl mx-auto">
        <div className="mb-12 border-t border-white/[0.06]" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          ¿Y cuál es el tuyo?
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
          Ahora que entiendes cómo funciona el zodíaco real, descubre en qué constelación estaba el Sol el día que naciste.
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
