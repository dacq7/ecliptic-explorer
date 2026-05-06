import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tu Signo Astrológico vs. Tu Signo Real: La Comparación',
  description:
    'Escorpio astrológico empieza el 23 de octubre. El astronómico, el 23 de noviembre — un mes después. Compara los 12 signos: fechas reales vs. astrología.',
  keywords: [
    'signo astrológico vs astronómico',
    'fechas reales signos zodiacales',
    'precesión signos zodiaco',
    'escorpio fecha real',
    'mi signo cambió con la precesión',
    'tabla zodíaco real vs tradicional',
    'astronomía vs astrología signos',
  ],
  openGraph: {
    title: 'Las fechas no mienten. Tu signo astrológico lleva un mes de retraso.',
    description:
      'Escorpio astrológico: Oct 23. Escorpio astronómico: Nov 23. Un mes de desfase. Virgo real dura 44 días. Libra real dura 23. Compara los 12 signos con datos IAU.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las fechas no mienten. Tu signo lleva un mes de retraso.',
    description:
      'Escorpio astrológico: Oct 23. Escorpio astronómico: Nov 23. Compara los 12 signos con datos IAU.',
  },
}

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
