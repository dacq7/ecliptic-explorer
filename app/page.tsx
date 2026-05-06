import type { Metadata } from 'next'
import { HeroSection } from '@/app/components/landing/HeroSection'
import { ProofSection } from '@/app/components/landing/ProofSection'
import { OphiuchusSection } from '@/app/components/landing/OphiuchusSection'
import { CTASection } from '@/app/components/landing/CTASection'
import { Footer } from '@/app/components/landing/Footer'

export const metadata: Metadata = {
  title: "Tu signo está mal. | Ecliptic Explorer",
  description:
    "La astrología usa 12 signos de 30 días. La astronomía tiene 13 constelaciones y períodos desiguales. Descubre tu signo real según la IAU. Gratis.",
  keywords: [
    "signo zodiacal real",
    "mi signo real",
    "13 constelaciones zodíaco",
    "ofiuco signo",
    "signo astronómico IAU",
    "zodíaco real astronomía",
    "verdadero signo zodiaco",
  ],
  openGraph: {
    title: "Tu signo está mal.",
    description:
      "La astrología usa 12 signos iguales. La astronomía tiene 13 constelaciones con períodos reales. Escorpio: 7 días. Virgo: 44 días. ¿Cuál es el tuyo?",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tu signo está mal.",
    description:
      "La astronomía tiene 13 constelaciones. Escorpio dura 7 días. Virgo, 44. Descubre tu signo real según la IAU.",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ecliptic Explorer",
  url: "https://ecliptic-explorer.vercel.app",
  description:
    "Descubre tu signo zodiacal real basado en astronomía científica IAU. 13 constelaciones, datos oficiales.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://ecliptic-explorer.vercel.app/calculator?date={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <ProofSection />
      <OphiuchusSection />
      <CTASection />
      <Footer />
    </main>
  )
}
