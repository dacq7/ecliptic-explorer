import type { Metadata } from 'next'
import Link from 'next/link'
import { CONSTELLATION_EXPLANATIONS } from '@/app/content/explanations'
import { OphiuchusCard } from '@/app/components/learn/OphiuchusCard'
import { ConceptAccordion } from '@/app/components/learn/ConceptAccordion'

export const metadata: Metadata = {
  title: 'Qué es la Eclíptica: 13 Constelaciones, Ofiuco y Precesión',
  description:
    'Por qué hay 13 constelaciones y no 12. Por qué Escorpio dura solo 7 días. Qué es la precesión y por qué tu signo cambió. Explicado con datos IAU.',
  keywords: [
    'qué es la eclíptica',
    'por qué hay 13 signos zodiacales',
    'ofiuco por qué se ignora',
    'precesión de los equinoccios zodíaco',
    'eclíptica explicada',
    'constelaciones zodíaco astronomía',
    'por qué escorpio dura 7 días',
  ],
  openGraph: {
    title: 'Cuatro preguntas que el zodíaco nunca te respondió.',
    description:
      '¿Por qué hay 13 constelaciones? ¿Por qué Escorpio dura 7 días? ¿Qué es la precesión? ¿Por qué tu signo cambió? Las respuestas, con datos astronómicos reales.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuatro preguntas que el zodíaco nunca te respondió.',
    description:
      '¿Por qué hay 13 constelaciones? ¿Por qué Escorpio dura 7 días? ¿Qué es la precesión? Las respuestas, con datos IAU.',
  },
}

const learnFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es la eclíptica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La eclíptica es el camino aparente que el Sol recorre alrededor de la Tierra a lo largo del año. Las constelaciones que ese plano cruza son las del zodíaco — y son 13, no 12. La eclíptica está inclinada 23.5 grados respecto al ecuador, el mismo ángulo que origina las estaciones.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué hay 13 constelaciones en el zodíaco y no 12?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Unión Astronómica Internacional trazó los límites reales del cielo en 1930. El plano de la eclíptica cruza 13 constelaciones — incluyendo Ofiuco, que la astrología nunca incluyó. La astrología eligió 12 signos iguales de 30 grados hace 2.600 años. La IAU reconoce 88 constelaciones en total; solo 13 están en el camino del Sol.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué Escorpio dura solo 7 días en la eclíptica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La eclíptica no divide el cielo en partes iguales — cada constelación ocupa un área diferente. Escorpio ocupa un tramo pequeño del plano solar: apenas 7 días, frente a los 44 de Virgo. La astrología compensó esa desigualdad dándole 30 días a todos. Escorpio es seis veces más corto que Virgo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la precesión de los equinoccios?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Tierra no gira erguida — su eje oscila lentamente en un ciclo de 26.000 años. En 2.600 años, ese movimiento desplazó las constelaciones del zodíaco casi un mes completo. Por eso el signo astrológico y la constelación real ya no coinciden. El desfase actual es de casi 30 grados.',
      },
    },
  ],
}

export default function LearnPage() {
  const ophiuchus = CONSTELLATION_EXPLANATIONS['Ophiuchus']

  return (
    <main className="bg-[#0a0a1a] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learnFaqJsonLd) }}
      />
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
