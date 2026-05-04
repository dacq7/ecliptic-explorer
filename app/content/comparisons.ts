/**
 * Sistema 4 — Narrativa Educativa: Comparisons.
 *
 * Structured data for the /compare section.
 * Maps each traditional astrological sign to its astronomical counterpart.
 * No business logic here — only content.
 *
 * TODO (Visual Storyteller): Fill in the discrepancy descriptions.
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
 * TODO (Visual Storyteller): Complete discrepancyNote for each entry.
 * TODO (Reality Checker): Verify astronomicalRange values against IAU dates.
 */
export const SIGN_COMPARISONS: SignComparison[] = [
  {
    traditionalSign: 'Aries',
    traditionalRange: 'Mar 21 – Apr 19',
    astronomicalConstellation: 'Aries',
    astronomicalRange: 'Apr 19 – May 13',
    astronomicalDays: 25,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Taurus',
    traditionalRange: 'Apr 20 – May 20',
    astronomicalConstellation: 'Taurus',
    astronomicalRange: 'May 14 – Jun 21',
    astronomicalDays: 38,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Gemini',
    traditionalRange: 'May 21 – Jun 20',
    astronomicalConstellation: 'Gemini',
    astronomicalRange: 'Jun 22 – Jul 20',
    astronomicalDays: 29,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Cancer',
    traditionalRange: 'Jun 21 – Jul 22',
    astronomicalConstellation: 'Cancer',
    astronomicalRange: 'Jul 21 – Aug 10',
    astronomicalDays: 21,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Leo',
    traditionalRange: 'Jul 23 – Aug 22',
    astronomicalConstellation: 'Leo',
    astronomicalRange: 'Aug 11 – Sep 16',
    astronomicalDays: 37,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Virgo',
    traditionalRange: 'Aug 23 – Sep 22',
    astronomicalConstellation: 'Virgo',
    astronomicalRange: 'Sep 17 – Oct 30',
    astronomicalDays: 44,
    discrepancyNote: '', // TODO
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Libra',
    traditionalRange: 'Sep 23 – Oct 22',
    astronomicalConstellation: 'Libra',
    astronomicalRange: 'Oct 31 – Nov 22',
    astronomicalDays: 23,
    discrepancyNote: '', // TODO
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Scorpio',
    traditionalRange: 'Oct 23 – Nov 21',
    astronomicalConstellation: 'Scorpius',
    astronomicalRange: 'Nov 23 – Nov 29',
    astronomicalDays: 7,
    discrepancyNote: '', // TODO
    mismatchLevel: 'high',
  },
  {
    traditionalSign: 'Sagittarius',
    traditionalRange: 'Nov 22 – Dec 21',
    astronomicalConstellation: 'Sagittarius',
    astronomicalRange: 'Dec 18 – Jan 18',
    astronomicalDays: 32,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Capricorn',
    traditionalRange: 'Dec 22 – Jan 19',
    astronomicalConstellation: 'Capricornus',
    astronomicalRange: 'Jan 19 – Feb 15',
    astronomicalDays: 28,
    discrepancyNote: '', // TODO
    mismatchLevel: 'medium',
  },
  {
    traditionalSign: 'Aquarius',
    traditionalRange: 'Jan 20 – Feb 18',
    astronomicalConstellation: 'Aquarius',
    astronomicalRange: 'Feb 16 – Mar 11',
    astronomicalDays: 24,
    discrepancyNote: '', // TODO
    mismatchLevel: 'low',
  },
  {
    traditionalSign: 'Pisces',
    traditionalRange: 'Feb 19 – Mar 20',
    astronomicalConstellation: 'Pisces',
    astronomicalRange: 'Mar 12 – Apr 18',
    astronomicalDays: 38,
    discrepancyNote: '', // TODO
    mismatchLevel: 'low',
  },
]
