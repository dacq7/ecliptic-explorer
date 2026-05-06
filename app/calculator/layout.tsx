import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de Signo Real',
  description:
    'Ingresa tu fecha de nacimiento y descubre qué constelación ocupaba el Sol ese día según los límites IAU de 1930. 13 constelaciones, datos científicos.',
  keywords: [
    'calculadora signo zodiacal real',
    'cuál es mi signo real',
    'signo astronómico por fecha de nacimiento',
    'ofiuco calculadora',
    'mi constelación real',
    'signo IAU',
    'signo verdadero astronomía',
  ],
  openGraph: {
    title: '¿Cuál es tu signo real? Calculadora astronómica IAU',
    description:
      'No el de la astrología — el de la astronomía. Ingresa tu fecha de nacimiento y descubre en qué constelación estaba el Sol ese día. Puede que sea Ofiuco.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Cuál es tu signo real?',
    description:
      'No el de la astrología. El astronómico. Puede que sea Ofiuco — 18 días al año que ningún horóscopo menciona.',
  },
}

const calculatorJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Calculadora de Signo Zodiacal Real',
  url: 'https://ecliptic-explorer.vercel.app/calculator',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  description:
    'Calcula tu signo zodiacal real según los límites de constelación de la Unión Astronómica Internacional (IAU) de 1930. 13 constelaciones incluyendo Ofiuco.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: 'Ecliptic Explorer',
    url: 'https://ecliptic-explorer.vercel.app',
  },
  featureList: [
    'Calcula signo zodiacal astronómico por fecha de nacimiento',
    '13 constelaciones incluyendo Ofiuco',
    'Datos oficiales IAU 1930',
    'Comparación con signo astrológico tradicional',
    'Resultado compartible en redes sociales',
  ],
}

const calculatorFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuál es mi signo zodiacal real según la astronomía?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tu signo zodiacal real es la constelación en la que se encontraba el Sol el día de tu nacimiento, según los límites oficiales de la Unión Astronómica Internacional (IAU) establecidos en 1930. Hay 13 constelaciones en la eclíptica, incluyendo Ofiuco (30 nov – 17 dic), que la astrología tradicional ignora.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Por qué mi signo astronómico es diferente al astrológico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Debido a la precesión de los equinoccios, el eje de la Tierra se ha desplazado casi 30 grados en los últimos 2.600 años. Esto hace que las constelaciones reales ya no correspondan a las fechas del sistema astrológico tradicional, que fue diseñado hace dos milenios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es Ofiuco y por qué no está en mi horóscopo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ofiuco es la 13a constelación que el Sol atraviesa cada año, entre el 30 de noviembre y el 17 de diciembre. La astrología babilónica la excluyó del zodíaco hace 2.600 años para mantener un sistema de 12 signos iguales que coincidiera con los 12 meses lunares. La astronomía nunca la ignoró.',
      },
    },
  ],
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorFaqJsonLd) }}
      />
      {children}
    </>
  )
}
