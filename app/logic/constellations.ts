import type { Constellation } from '@/app/types'

/**
 * The 13 constellations along the ecliptic.
 * Source: International Astronomical Union (IAU) — do not modify dates
 * without citing the IAU boundary table.
 *
 * NOTE: startDate / endDate use "MM-DD" format.
 * Sagittarius wraps the calendar year (Dec 18 → Jan 18).
 *
 * Dates may vary ±1 day in leap years; this dataset uses mean values
 * aligned to EarthSky year-by-year solar transit observations and the
 * Wikipedia Template:Zodiac_date_IAU (Shapiro 2011 reference).
 *
 * --- Reality Checker verification log (2026-05-04) ---
 * Sources consulted:
 *   - EarthSky sun-in-zodiac-constellations (2018, 2019, 2021 datasets)
 *     https://earthsky.org/astronomy-essentials/sun-in-zodiac-constellations/
 *   - Wikipedia Template:Zodiac_date_IAU (Shapiro 2011)
 *     https://en.wikipedia.org/wiki/Template:Zodiac_date_IAU
 *   - Wikipedia Zodiac article IAU table
 *     https://en.wikipedia.org/wiki/Zodiac
 *   - EarthSky Ophiuchus dedicated article
 *     https://earthsky.org/astronomy-essentials/sun-in-ophiuchus-november-30-to-december-18/
 *
 * Corrections applied:
 *   - Taurus durationDays: corrected from 38 to 39.
 *     May 14 to Jun 21 inclusive = 39 days (18 remaining days in May
 *     plus 21 days in June). The stored value of 38 was an arithmetic
 *     error; the startDate and endDate were already correct.
 *     Confirmed by EarthSky 2018/2019/2021 data (Taurus May 14 – Jun 21)
 *     and the IAU Office of Astronomy for Education reference.
 *     Note: the total across all 13 constellations is 365 days regardless
 *     of this field because durationDays is informational; the date-range
 *     logic uses startDate/endDate directly.
 *
 * Verified correct (within ±1 day documented tolerance):
 *   - Sagittarius Dec 18 – Jan 18 = 32 days  [multiple sources agree]
 *   - Capricornus Jan 19 – Feb 15 = 28 days  [multiple sources agree]
 *   - Aquarius    Feb 16 – Mar 11 = 24 days  [multiple sources agree]
 *   - Pisces      Mar 12 – Apr 18 = 38 days  [multiple sources agree]
 *   - Aries       Apr 19 – May 13 = 25 days  [multiple sources agree]
 *   - Gemini      Jun 22 – Jul 20 = 29 days  [EarthSky 2019 confirms Jun 22]
 *   - Cancer      Jul 21 – Aug 10 = 21 days  [multiple sources agree]
 *   - Leo         Aug 11 – Sep 16 = 37 days  [multiple sources agree]
 *   - Virgo       Sep 17 – Oct 30 = 44 days  [multiple sources agree]
 *   - Libra       Oct 31 – Nov 22 = 23 days  [multiple sources agree]
 *   - Scorpius    Nov 23 – Nov 29 =  7 days  [multiple sources agree]
 *   - Ophiuchus   Nov 30 – Dec 17 = 18 days  [EarthSky 2018/2019/2021 + Shapiro 2011]
 *     Note: some EarthSky article titles say "to December 18" — that is
 *     the first day of Sagittarius, not the last day of Ophiuchus.
 *     Year-by-year data consistently places the Ophiuchus exit on Dec 17.
 */
export const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Sagittarius',
    nameEs: 'Sagitario',
    startDate: '12-18',
    endDate: '01-18',
    durationDays: 32,
    order: 1,
    zodiacEquivalent: 'Sagitario',
    emoji: '🏹',
  },
  {
    name: 'Capricornus',
    nameEs: 'Capricornio',
    startDate: '01-19',
    endDate: '02-15',
    durationDays: 28,
    order: 2,
    zodiacEquivalent: 'Capricornio',
    emoji: '🐐',
  },
  {
    name: 'Aquarius',
    nameEs: 'Acuario',
    startDate: '02-16',
    endDate: '03-11',
    durationDays: 24,
    order: 3,
    zodiacEquivalent: 'Acuario',
    emoji: '🏺',
  },
  {
    name: 'Pisces',
    nameEs: 'Piscis',
    startDate: '03-12',
    endDate: '04-18',
    durationDays: 38,
    order: 4,
    zodiacEquivalent: 'Piscis',
    emoji: '🐟',
  },
  {
    name: 'Aries',
    nameEs: 'Aries',
    startDate: '04-19',
    endDate: '05-13',
    durationDays: 25,
    order: 5,
    zodiacEquivalent: 'Aries',
    emoji: '🐏',
  },
  {
    name: 'Taurus',
    nameEs: 'Tauro',
    startDate: '05-14',
    endDate: '06-21',
    durationDays: 39,
    order: 6,
    zodiacEquivalent: 'Tauro',
    emoji: '🐂',
  },
  {
    name: 'Gemini',
    nameEs: 'Géminis',
    startDate: '06-22',
    endDate: '07-20',
    durationDays: 29,
    order: 7,
    zodiacEquivalent: 'Géminis',
    emoji: '👯',
  },
  {
    name: 'Cancer',
    nameEs: 'Cáncer',
    startDate: '07-21',
    endDate: '08-10',
    durationDays: 21,
    order: 8,
    zodiacEquivalent: 'Cáncer',
    emoji: '🦀',
  },
  {
    name: 'Leo',
    nameEs: 'Leo',
    startDate: '08-11',
    endDate: '09-16',
    durationDays: 37,
    order: 9,
    zodiacEquivalent: 'Leo',
    emoji: '🦁',
  },
  {
    name: 'Virgo',
    nameEs: 'Virgo',
    startDate: '09-17',
    endDate: '10-30',
    durationDays: 44,
    order: 10,
    zodiacEquivalent: 'Virgo',
    emoji: '♍',
  },
  {
    name: 'Libra',
    nameEs: 'Libra',
    startDate: '10-31',
    endDate: '11-22',
    durationDays: 23,
    order: 11,
    zodiacEquivalent: 'Libra',
    emoji: '⚖️',
  },
  {
    name: 'Scorpius',
    nameEs: 'Escorpio',
    startDate: '11-23',
    endDate: '11-29',
    durationDays: 7,
    order: 12,
    zodiacEquivalent: 'Escorpio',
    emoji: '🦂',
  },
  {
    name: 'Ophiuchus',
    nameEs: 'Ofiuco',
    startDate: '11-30',
    endDate: '12-17',
    durationDays: 18,
    order: 13,
    zodiacEquivalent: null,
    emoji: '🐍',
  },
]
