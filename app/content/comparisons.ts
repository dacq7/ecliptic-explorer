/**
 * Sistema 4 — Narrativa Educativa: Comparisons.
 *
 * Structured data for the /compare section.
 * Maps each traditional astrological sign to its astronomical counterpart.
 * No business logic here — only content.
 *
 */

/** One row in the astronomy vs. astrology comparison table */
export interface SignComparison {
  /** Traditional astrological sign name */
  traditionalSign: string
  /** Traditional date range (display string) */
  traditionalRange: string
  /** IAU astronomical constellation name */
  astronomicalConstellation: string
  /** IAU astronomical date range (display string) */
  astronomicalRange: string
  /** Number of days the Sun is actually in this constellation (IAU) */
  astronomicalDays: number
  /** Short description of how/why they differ */
  discrepancyNote: string
  /** Severity of the mismatch for visual highlighting: low | medium | high */
  mismatchLevel: 'low' | 'medium' | 'high'
}

/**
 * The 12 traditional signs compared to their astronomical counterparts.
 * Ordered by traditional zodiac sequence.
 *
 */
export const SIGN_COMPARISONS: SignComparison[] = [
  {
    traditionalSign: 'Aries',
    traditionalRange: 'Mar 21 – Apr 19',
    astronomicalConstellation: 'Aries',
    astronomicalRange: 'Apr 19 – May 13',
    astronomicalDays: 25,
    discrepancyNote: 'El Sol no entra en Aries hasta el 19 de abril. La astrología lo ubica desde el 21 de marzo — 29 días antes. El comienzo del año astrológico lleva dos milenios de retraso.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Taurus',
    traditionalRange: 'Apr 20 – May 20',
    astronomicalConstellation: 'Taurus',
    astronomicalRange: 'May 14 – Jun 21',
    astronomicalDays: 38,
    discrepancyNote: 'El Sol entra en Tauro el 14 de mayo, no el 20 de abril. El desfase es de 24 días. Y permanece 38 días en la eclíptica — 8 más de los 30 que la astrología otorga a cada signo.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Gemini',
    traditionalRange: 'May 21 – Jun 20',
    astronomicalConstellation: 'Gemini',
    astronomicalRange: 'Jun 22 – Jul 20',
    astronomicalDays: 29,
    discrepancyNote: 'El Sol entra en Géminis el 22 de junio, no el 21 de mayo. La duración real es 29 días — casi exacta. El desfase está en las fechas, no en el tiempo.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Cancer',
    traditionalRange: 'Jun 21 – Jul 22',
    astronomicalConstellation: 'Cancer',
    astronomicalRange: 'Jul 21 – Aug 10',
    astronomicalDays: 21,
    discrepancyNote: 'El Sol entra en Cáncer el 21 de julio. La astrología lo sitúa desde el 21 de junio — exactamente un mes antes. Además, solo dura 21 días: las tres semanas más cortas del verano.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Leo',
    traditionalRange: 'Jul 23 – Aug 22',
    astronomicalConstellation: 'Leo',
    astronomicalRange: 'Aug 11 – Sep 16',
    astronomicalDays: 37,
    discrepancyNote: 'El Sol entra en Leo el 11 de agosto, no el 23 de julio. 19 días de desfase. La duración real es 37 días — una semana más que los 30 del sistema tradicional.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Virgo',
    traditionalRange: 'Aug 23 – Sep 22',
    astronomicalConstellation: 'Virgo',
    astronomicalRange: 'Sep 17 – Oct 30',
    astronomicalDays: 44,
    discrepancyNote: 'El Sol no llega a Virgo hasta el 17 de septiembre — 25 días después de lo que indica la astrología. Permanece 44 días: la constelación más larga del zodíaco, ignorada en toda su extensión.',
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Libra',
    traditionalRange: 'Sep 23 – Oct 22',
    astronomicalConstellation: 'Libra',
    astronomicalRange: 'Oct 31 – Nov 22',
    astronomicalDays: 23,
    discrepancyNote: 'El Sol entra en Libra el 31 de octubre — 38 días después de lo que indica la astrología. Solo permanece 23 días: el signo del equilibrio resulta ser el más desfasado de todos.',
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Scorpio',
    traditionalRange: 'Oct 23 – Nov 21',
    astronomicalConstellation: 'Scorpius',
    astronomicalRange: 'Nov 23 – Nov 29',
    astronomicalDays: 7,
    discrepancyNote: 'El Sol entra en Escorpión el 23 de noviembre — un mes completo después de lo que indica la astrología. Solo permanece 7 días. Lo que sigue no es Sagitario: es Ofiuco.',
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Sagittarius',
    traditionalRange: 'Nov 22 – Dec 21',
    astronomicalConstellation: 'Sagittarius',
    astronomicalRange: 'Dec 18 – Jan 18',
    astronomicalDays: 32,
    discrepancyNote: 'El Sol entra en Sagitario el 18 de diciembre, no el 22 de noviembre. El desfase es de 26 días. Y cruza el año nuevo: quienes nacen antes del 18 de enero son astronómicamente Sagitario.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Capricorn',
    traditionalRange: 'Dec 22 – Jan 19',
    astronomicalConstellation: 'Capricornus',
    astronomicalRange: 'Jan 19 – Feb 15',
    astronomicalDays: 28,
    discrepancyNote: 'El Sol entra en Capricornio el 19 de enero — exactamente un mes después de lo que indica la astrología. Permanece 28 días: casi la referencia de 30, pero en fechas completamente distintas.',
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Aquarius',
    traditionalRange: 'Jan 20 – Feb 18',
    astronomicalConstellation: 'Aquarius',
    astronomicalRange: 'Feb 16 – Mar 11',
    astronomicalDays: 24,
    discrepancyNote: 'El Sol entra en Acuario el 16 de febrero, no el 20 de enero. La duración real es de 24 días — menos de un mes, pero sin el drama de Escorpio o Libra.',
    mismatchLevel: 'low',
  },
  {
    traditionalSign: 'Pisces',
    traditionalRange: 'Feb 19 – Mar 20',
    astronomicalConstellation: 'Pisces',
    astronomicalRange: 'Mar 12 – Apr 18',
    astronomicalDays: 38,
    discrepancyNote: 'El Sol entra en Piscis el 12 de marzo, no el 19 de febrero. El desfase es de 21 días. La duración real es 38 días — más que Cáncer y Escorpio combinados.',
    mismatchLevel: 'low',
  },
]
