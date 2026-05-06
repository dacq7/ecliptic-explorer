// Asterism line data — 13 IAU ecliptic constellations.
// Source: Stellarium constellationship.fab (HIP pairs). See .claude/asterisms-01.md.
// Coordinates: J2000.0, RA in decimal hours, Dec in decimal degrees.
// Each { from, to } is one line segment (edge in the stick figure graph).

export interface AsterismStar {
  name: string
  hip: number
  ra: number
  dec: number
}

export interface AsterismLine {
  from: AsterismStar
  to: AsterismStar
}

export interface ConstellationAsterism {
  constellation: string
  abbreviation: string
  lines: AsterismLine[]
}

export const CONSTELLATION_ASTERISMS: ConstellationAsterism[] = [

  // 1. SAGITTARIUS — 24 segments
  {
    constellation: "Sagittarius",
    abbreviation: "Sgr",
    lines: [
      { from: { name: "Kaus Media",    hip: 89931,  ra: 18.3499, dec: -29.8280 }, to: { name: "Kaus Borealis",  hip: 90496,  ra: 18.4662, dec: -25.4212 } },
      { from: { name: "η Sgr",         hip: 89642,  ra: 18.2938, dec: -36.7613 }, to: { name: "Kaus Australis", hip: 90185,  ra: 18.4029, dec: -34.3835 } },
      { from: { name: "Kaus Australis",hip: 90185,  ra: 18.4029, dec: -34.3835 }, to: { name: "Alnasl",         hip: 88635,  ra: 18.0968, dec: -30.4237 } },
      { from: { name: "Alnasl",        hip: 88635,  ra: 18.0968, dec: -30.4237 }, to: { name: "4 Sgr",          hip: 87072,  ra: 17.7927, dec: -27.8309 } },
      { from: { name: "Alnasl",        hip: 88635,  ra: 18.0968, dec: -30.4237 }, to: { name: "Kaus Media",     hip: 89931,  ra: 18.3499, dec: -29.8280 } },
      { from: { name: "Kaus Media",    hip: 89931,  ra: 18.3499, dec: -29.8280 }, to: { name: "Kaus Australis", hip: 90185,  ra: 18.4029, dec: -34.3835 } },
      { from: { name: "Kaus Australis",hip: 90185,  ra: 18.4029, dec: -34.3835 }, to: { name: "Ascella",        hip: 93506,  ra: 19.0435, dec: -29.8801 } },
      { from: { name: "Ascella",       hip: 93506,  ra: 19.0435, dec: -29.8801 }, to: { name: "φ Sgr",          hip: 92041,  ra: 18.7609, dec: -26.9908 } },
      { from: { name: "φ Sgr",         hip: 92041,  ra: 18.7609, dec: -26.9908 }, to: { name: "Kaus Media",     hip: 89931,  ra: 18.3499, dec: -29.8280 } },
      { from: { name: "φ Sgr",         hip: 92041,  ra: 18.7609, dec: -26.9908 }, to: { name: "Kaus Borealis",  hip: 90496,  ra: 18.4662, dec: -25.4212 } },
      { from: { name: "Kaus Borealis", hip: 90496,  ra: 18.4662, dec: -25.4212 }, to: { name: "Polis",          hip: 89341,  ra: 18.2294, dec: -21.0588 } },
      { from: { name: "Ascella",       hip: 93506,  ra: 19.0435, dec: -29.8801 }, to: { name: "τ Sgr",          hip: 93864,  ra: 19.1157, dec: -27.6698 } },
      { from: { name: "τ Sgr",         hip: 93864,  ra: 19.1157, dec: -27.6698 }, to: { name: "Nunki",          hip: 92855,  ra: 18.9211, dec: -26.2967 } },
      { from: { name: "Nunki",         hip: 92855,  ra: 18.9211, dec: -26.2967 }, to: { name: "φ Sgr",          hip: 92041,  ra: 18.7609, dec: -26.9908 } },
      { from: { name: "Nunki",         hip: 92855,  ra: 18.9211, dec: -26.2967 }, to: { name: "ξ² Sgr",         hip: 93085,  ra: 18.9621, dec: -21.1066 } },
      { from: { name: "ξ² Sgr",        hip: 93085,  ra: 18.9621, dec: -21.1066 }, to: { name: "ο Sgr",          hip: 93683,  ra: 19.0780, dec: -21.7414 } },
      { from: { name: "ο Sgr",         hip: 93683,  ra: 19.0780, dec: -21.7414 }, to: { name: "d Sgr",          hip: 94820,  ra: 19.2939, dec: -18.9529 } },
      { from: { name: "d Sgr",         hip: 94820,  ra: 19.2939, dec: -18.9529 }, to: { name: "ρ¹ Sgr",         hip: 95168,  ra: 19.3612, dec: -17.8472 } },
      { from: { name: "τ Sgr",         hip: 93864,  ra: 19.1157, dec: -27.6698 }, to: { name: "h¹ Sgr",         hip: 96406,  ra: 19.6003, dec: -24.7192 } },
      { from: { name: "h¹ Sgr",        hip: 96406,  ra: 19.6003, dec: -24.7192 }, to: { name: "62 Sgr",         hip: 98688,  ra: 20.0443, dec: -27.7099 } },
      { from: { name: "62 Sgr",        hip: 98688,  ra: 20.0443, dec: -27.7099 }, to: { name: "θ¹ Sgr",         hip: 98412,  ra: 19.9956, dec: -35.2763 } },
      { from: { name: "θ¹ Sgr",        hip: 98412,  ra: 19.9956, dec: -35.2763 }, to: { name: "ι Sgr",          hip: 98032,  ra: 19.9210, dec: -41.8684 } },
      { from: { name: "ι Sgr",         hip: 98032,  ra: 19.9210, dec: -41.8684 }, to: { name: "Rukbat",         hip: 95347,  ra: 19.3981, dec: -40.6156 } },
      { from: { name: "Rukbat",        hip: 95347,  ra: 19.3981, dec: -40.6156 }, to: { name: "Arkab Post.",    hip: 95294,  ra: 19.3869, dec: -44.7996 } },
    ],
  },

  // 2. CAPRICORNUS — 9 segments
  {
    constellation: "Capricornus",
    abbreviation: "Cap",
    lines: [
      { from: { name: "Algedi",        hip: 100064, ra: 20.3008, dec: -12.5447 }, to: { name: "Dabih",          hip: 100345, ra: 20.3502, dec: -14.7814 } },
      { from: { name: "Dabih",         hip: 100345, ra: 20.3502, dec: -14.7814 }, to: { name: "Dorsum",         hip: 104139, ra: 21.0991, dec: -17.2327 } },
      { from: { name: "Dorsum",        hip: 104139, ra: 21.0991, dec: -17.2327 }, to: { name: "ι Cap",          hip: 105515, ra: 21.3706, dec: -16.8344 } },
      { from: { name: "ι Cap",         hip: 105515, ra: 21.3706, dec: -16.8344 }, to: { name: "Nashira",        hip: 106985, ra: 21.6681, dec: -16.6623 } },
      { from: { name: "Nashira",       hip: 106985, ra: 21.6681, dec: -16.6623 }, to: { name: "Deneb Algedi",   hip: 107556, ra: 21.7839, dec: -16.1283 } },
      { from: { name: "ι Cap",         hip: 105515, ra: 21.3706, dec: -16.8344 }, to: { name: "ζ Cap",          hip: 105881, ra: 21.4444, dec: -22.4111 } },
      { from: { name: "ζ Cap",         hip: 105881, ra: 21.4444, dec: -22.4111 }, to: { name: "Dorsum",         hip: 104139, ra: 21.0991, dec: -17.2327 } },
      { from: { name: "Dabih",         hip: 100345, ra: 20.3502, dec: -14.7814 }, to: { name: "ψ Cap",          hip: 102485, ra: 20.7681, dec: -25.2714 } },
      { from: { name: "Dorsum",        hip: 104139, ra: 21.0991, dec: -17.2327 }, to: { name: "ω Cap",          hip: 102978, ra: 20.8636, dec: -26.9189 } },
    ],
  },

  // 3. AQUARIUS — 14 segments
  {
    constellation: "Aquarius",
    abbreviation: "Aqr",
    lines: [
      { from: { name: "Sadalsuud",     hip: 106278, ra: 21.5260, dec: -5.5712  }, to: { name: "Sadalmelik",    hip: 109074, ra: 22.0964, dec: -0.3198  } },
      { from: { name: "Sadalmelik",    hip: 109074, ra: 22.0964, dec: -0.3198  }, to: { name: "Sadachbia",     hip: 110395, ra: 22.3609, dec: -1.3874  } },
      { from: { name: "Sadachbia",     hip: 110395, ra: 22.3609, dec: -1.3874  }, to: { name: "ζ¹ Aqr",        hip: 110960, ra: 22.4805, dec: -0.0200  } },
      { from: { name: "ζ¹ Aqr",        hip: 110960, ra: 22.4805, dec: -0.0200  }, to: { name: "η Aqr",         hip: 111497, ra: 22.5893, dec: -0.1174  } },
      { from: { name: "η Aqr",         hip: 111497, ra: 22.5893, dec: -0.1174  }, to: { name: "λ Aqr",         hip: 112961, ra: 22.8769, dec: -7.5797  } },
      { from: { name: "λ Aqr",         hip: 112961, ra: 22.8769, dec: -7.5797  }, to: { name: "ψ¹ Aqr",        hip: 114855, ra: 23.2648, dec: -9.0877  } },
      { from: { name: "ψ¹ Aqr",        hip: 114855, ra: 23.2648, dec: -9.0877  }, to: { name: "b¹ Aqr",        hip: 115438, ra: 23.3828, dec: -20.1008 } },
      { from: { name: "Sadalmelik",    hip: 109074, ra: 22.0964, dec: -0.3198  }, to: { name: "θ Aqr",         hip: 110003, ra: 22.2806, dec: -7.7832  } },
      { from: { name: "θ Aqr",         hip: 110003, ra: 22.2806, dec: -7.7832  }, to: { name: "ι Aqr",         hip: 109139, ra: 22.1073, dec: -13.8695 } },
      { from: { name: "θ Aqr",         hip: 110003, ra: 22.2806, dec: -7.7832  }, to: { name: "σ Aqr",         hip: 111123, ra: 22.5108, dec: -10.6779 } },
      { from: { name: "σ Aqr",         hip: 111123, ra: 22.5108, dec: -10.6779 }, to: { name: "τ² Aqr",        hip: 112716, ra: 22.8265, dec: -13.5925 } },
      { from: { name: "τ² Aqr",        hip: 112716, ra: 22.8265, dec: -13.5925 }, to: { name: "Skat",          hip: 113136, ra: 22.9109, dec: -15.8208 } },
      { from: { name: "Skat",          hip: 113136, ra: 22.9109, dec: -15.8208 }, to: { name: "88 Aqr",        hip: 114341, ra: 23.1574, dec: -21.1725 } },
      { from: { name: "Albali",        hip: 102618, ra: 20.7946, dec: -9.4957  }, to: { name: "Sadalsuud",     hip: 106278, ra: 21.5260, dec: -5.5712  } },
    ],
  },

  // 4. PISCES — 19 segments
  {
    constellation: "Pisces",
    abbreviation: "Psc",
    lines: [
      { from: { name: "σ Psc",         hip: 4889,   ra: 1.0470,  dec: 31.8043  }, to: { name: "φ Psc",         hip: 5742,   ra: 1.2292,  dec: 24.5838  } },
      { from: { name: "σ Psc",         hip: 4889,   ra: 1.0470,  dec: 31.8043  }, to: { name: "υ Psc",         hip: 6193,   ra: 1.3244,  dec: 27.2641  } },
      { from: { name: "υ Psc",         hip: 6193,   ra: 1.3244,  dec: 27.2641  }, to: { name: "φ Psc",         hip: 5742,   ra: 1.2292,  dec: 24.5838  } },
      { from: { name: "φ Psc",         hip: 5742,   ra: 1.2292,  dec: 24.5838  }, to: { name: "η Psc",         hip: 7097,   ra: 1.5247,  dec: 15.3458  } },
      { from: { name: "η Psc",         hip: 7097,   ra: 1.5247,  dec: 15.3458  }, to: { name: "ο Psc",         hip: 8198,   ra: 1.7566,  dec: 9.1571   } },
      { from: { name: "ο Psc",         hip: 8198,   ra: 1.7566,  dec: 9.1571   }, to: { name: "α Psc",         hip: 9487,   ra: 2.0341,  dec: 2.7638   } },
      { from: { name: "α Psc",         hip: 9487,   ra: 2.0341,  dec: 2.7638   }, to: { name: "ξ Psc",         hip: 8833,   ra: 1.8926,  dec: 3.1875   } },
      { from: { name: "ξ Psc",         hip: 8833,   ra: 1.8926,  dec: 3.1875   }, to: { name: "ν Psc",         hip: 7884,   ra: 1.6905,  dec: 5.4876   } },
      { from: { name: "ν Psc",         hip: 7884,   ra: 1.6905,  dec: 5.4876   }, to: { name: "μ Psc",         hip: 7007,   ra: 1.5031,  dec: 6.1439   } },
      { from: { name: "μ Psc",         hip: 7007,   ra: 1.5031,  dec: 6.1439   }, to: { name: "ε Psc",         hip: 4906,   ra: 1.0491,  dec: 7.8901   } },
      { from: { name: "ε Psc",         hip: 4906,   ra: 1.0491,  dec: 7.8901   }, to: { name: "62 Psc",        hip: 3760,   ra: 0.8048,  dec: 7.2999   } },
      { from: { name: "62 Psc",        hip: 3760,   ra: 0.8048,  dec: 7.2999   }, to: { name: "d Psc",         hip: 1645,   ra: 0.3433,  dec: 8.1903   } },
      { from: { name: "d Psc",         hip: 1645,   ra: 0.3433,  dec: 8.1903   }, to: { name: "ω Psc",         hip: 118268, ra: 23.9885, dec: 6.8636   } },
      { from: { name: "ω Psc",         hip: 118268, ra: 23.9885, dec: 6.8636   }, to: { name: "ι Psc",         hip: 116771, ra: 23.6658, dec: 5.6274   } },
      { from: { name: "ι Psc",         hip: 116771, ra: 23.6658, dec: 5.6274   }, to: { name: "λ Psc",         hip: 116928, ra: 23.7008, dec: 1.7804   } },
      { from: { name: "λ Psc",         hip: 116928, ra: 23.7008, dec: 1.7804   }, to: { name: "κ Psc",         hip: 115738, ra: 23.4489, dec: 1.2558   } },
      { from: { name: "κ Psc",         hip: 115738, ra: 23.4489, dec: 1.2558   }, to: { name: "γ Psc",         hip: 114971, ra: 23.2860, dec: 3.2823   } },
      { from: { name: "γ Psc",         hip: 114971, ra: 23.2860, dec: 3.2823   }, to: { name: "θ Psc",         hip: 115830, ra: 23.4662, dec: 6.3791   } },
      { from: { name: "θ Psc",         hip: 115830, ra: 23.4662, dec: 6.3791   }, to: { name: "ι Psc",         hip: 116771, ra: 23.6658, dec: 5.6274   } },
    ],
  },

  // 5. ARIES — 3 segments
  {
    constellation: "Aries",
    abbreviation: "Ari",
    lines: [
      { from: { name: "41 Ari",        hip: 13209,  ra: 2.8330,  dec: 27.2608  }, to: { name: "Hamal",         hip: 9884,   ra: 2.1195,  dec: 23.4628  } },
      { from: { name: "Hamal",         hip: 9884,   ra: 2.1195,  dec: 23.4628  }, to: { name: "Sheratan",      hip: 8903,   ra: 1.9107,  dec: 20.8083  } },
      { from: { name: "Sheratan",      hip: 8903,   ra: 1.9107,  dec: 20.8083  }, to: { name: "Mesarthim",     hip: 8832,   ra: 1.8922,  dec: 19.2941  } },
    ],
  },

  // 6. TAURUS — 12 segments
  {
    constellation: "Taurus",
    abbreviation: "Tau",
    lines: [
      { from: { name: "Elnath",        hip: 25428,  ra: 5.4382,  dec: 28.6079  }, to: { name: "τ Tau",         hip: 21881,  ra: 4.7041,  dec: 22.9570  } },
      { from: { name: "τ Tau",         hip: 21881,  ra: 4.7041,  dec: 22.9570  }, to: { name: "Ain",           hip: 20889,  ra: 4.4769,  dec: 19.1805  } },
      { from: { name: "Zeta Tau",      hip: 26451,  ra: 5.6274,  dec: 21.1426  }, to: { name: "Aldebaran",     hip: 21421,  ra: 4.5987,  dec: 16.5097  } },
      { from: { name: "Ain",           hip: 20889,  ra: 4.4769,  dec: 19.1805  }, to: { name: "Aldebaran",     hip: 21421,  ra: 4.5987,  dec: 16.5097  } },
      { from: { name: "Aldebaran",     hip: 21421,  ra: 4.5987,  dec: 16.5097  }, to: { name: "θ² Tau",        hip: 20894,  ra: 4.4777,  dec: 15.8710  } },
      { from: { name: "θ² Tau",        hip: 20894,  ra: 4.4777,  dec: 15.8710  }, to: { name: "γ Tau",         hip: 20205,  ra: 4.3299,  dec: 15.6277  } },
      { from: { name: "γ Tau",         hip: 20205,  ra: 4.3299,  dec: 15.6277  }, to: { name: "δ¹ Tau",        hip: 20455,  ra: 4.3822,  dec: 17.5426  } },
      { from: { name: "δ¹ Tau",        hip: 20455,  ra: 4.3822,  dec: 17.5426  }, to: { name: "Ain",           hip: 20889,  ra: 4.4769,  dec: 19.1805  } },
      { from: { name: "Ain",           hip: 20889,  ra: 4.4769,  dec: 19.1805  }, to: { name: "68 Tau",        hip: 20648,  ra: 4.4248,  dec: 17.9280  } },
      { from: { name: "68 Tau",        hip: 20648,  ra: 4.4248,  dec: 17.9280  }, to: { name: "δ¹ Tau",        hip: 20455,  ra: 4.3822,  dec: 17.5426  } },
      { from: { name: "δ¹ Tau",        hip: 20455,  ra: 4.3822,  dec: 17.5426  }, to: { name: "λ Tau",         hip: 18724,  ra: 4.0113,  dec: 12.4904  } },
      { from: { name: "λ Tau",         hip: 18724,  ra: 4.0113,  dec: 12.4904  }, to: { name: "ο Tau",         hip: 15900,  ra: 3.4136,  dec: 9.0291   } },
    ],
  },

  // 7. GEMINI — 16 segments
  {
    constellation: "Gemini",
    abbreviation: "Gem",
    lines: [
      { from: { name: "Alhena",        hip: 31681,  ra: 6.6285,  dec: 16.3994  }, to: { name: "Mekbuda",       hip: 34088,  ra: 7.0685,  dec: 20.5703  } },
      { from: { name: "Mekbuda",       hip: 34088,  ra: 7.0685,  dec: 20.5703  }, to: { name: "Wasat",         hip: 35550,  ra: 7.3354,  dec: 21.9823  } },
      { from: { name: "Wasat",         hip: 35550,  ra: 7.3354,  dec: 21.9823  }, to: { name: "λ Gem",         hip: 35350,  ra: 7.3016,  dec: 16.5405  } },
      { from: { name: "Wasat",         hip: 35550,  ra: 7.3354,  dec: 21.9823  }, to: { name: "Alzir",         hip: 32362,  ra: 6.7549,  dec: 12.8960  } },
      { from: { name: "Wasat",         hip: 35550,  ra: 7.3354,  dec: 21.9823  }, to: { name: "υ Gem",         hip: 36962,  ra: 7.5987,  dec: 26.8960  } },
      { from: { name: "υ Gem",         hip: 36962,  ra: 7.5987,  dec: 26.8960  }, to: { name: "κ Gem",         hip: 37740,  ra: 7.7408,  dec: 24.3981  } },
      { from: { name: "υ Gem",         hip: 36962,  ra: 7.5987,  dec: 26.8960  }, to: { name: "Pollux",        hip: 37826,  ra: 7.7554,  dec: 28.0263  } },
      { from: { name: "υ Gem",         hip: 36962,  ra: 7.5987,  dec: 26.8960  }, to: { name: "ι Gem",         hip: 36046,  ra: 7.4288,  dec: 27.7983  } },
      { from: { name: "ι Gem",         hip: 36046,  ra: 7.4288,  dec: 27.7983  }, to: { name: "τ Gem",         hip: 34693,  ra: 7.1864,  dec: 30.2447  } },
      { from: { name: "τ Gem",         hip: 34693,  ra: 7.1864,  dec: 30.2447  }, to: { name: "θ Gem",         hip: 33018,  ra: 6.8798,  dec: 33.9614  } },
      { from: { name: "τ Gem",         hip: 34693,  ra: 7.1864,  dec: 30.2447  }, to: { name: "Castor",        hip: 36850,  ra: 7.5765,  dec: 31.8883  } },
      { from: { name: "τ Gem",         hip: 34693,  ra: 7.1864,  dec: 30.2447  }, to: { name: "ε Gem",         hip: 32246,  ra: 6.7322,  dec: 25.1312  } },
      { from: { name: "ε Gem",         hip: 32246,  ra: 6.7322,  dec: 25.1312  }, to: { name: "ν Gem",         hip: 30883,  ra: 6.4827,  dec: 20.2122  } },
      { from: { name: "ν Gem",         hip: 30883,  ra: 6.4827,  dec: 20.2122  }, to: { name: "μ Gem",         hip: 30343,  ra: 6.3827,  dec: 22.5138  } },
      { from: { name: "μ Gem",         hip: 30343,  ra: 6.3827,  dec: 22.5138  }, to: { name: "η Gem",         hip: 29655,  ra: 6.2480,  dec: 22.5068  } },
      { from: { name: "η Gem",         hip: 29655,  ra: 6.2480,  dec: 22.5068  }, to: { name: "1 Gem",         hip: 28734,  ra: 6.0687,  dec: 23.2636  } },
    ],
  },

  // 8. CANCER — 5 segments
  {
    constellation: "Cancer",
    abbreviation: "Cnc",
    lines: [
      { from: { name: "ι Cnc",         hip: 43103,  ra: 8.7783,  dec: 28.7600  }, to: { name: "Asellus Bor.",  hip: 42806,  ra: 8.7215,  dec: 21.4686  } },
      { from: { name: "Asellus Bor.",  hip: 42806,  ra: 8.7215,  dec: 21.4686  }, to: { name: "χ Cnc",         hip: 40843,  ra: 8.3344,  dec: 27.2186  } },
      { from: { name: "Asellus Bor.",  hip: 42806,  ra: 8.7215,  dec: 21.4686  }, to: { name: "Asellus Aus.",  hip: 42911,  ra: 8.7447,  dec: 18.1549  } },
      { from: { name: "Asellus Aus.",  hip: 42911,  ra: 8.7447,  dec: 18.1549  }, to: { name: "Tarf",          hip: 40526,  ra: 8.2753,  dec: 9.1857   } },
      { from: { name: "Asellus Aus.",  hip: 42911,  ra: 8.7447,  dec: 18.1549  }, to: { name: "Acubens",       hip: 44066,  ra: 8.9748,  dec: 11.8578  } },
    ],
  },

  // 9. LEO — 10 segments
  {
    constellation: "Leo",
    abbreviation: "Leo",
    lines: [
      { from: { name: "Denebola",      hip: 57632,  ra: 11.8177, dec: 14.5723  }, to: { name: "θ Leo",         hip: 54879,  ra: 11.2373, dec: 15.4297  } },
      { from: { name: "θ Leo",         hip: 54879,  ra: 11.2373, dec: 15.4297  }, to: { name: "Regulus",       hip: 49669,  ra: 10.1396, dec: 11.9672  } },
      { from: { name: "Regulus",       hip: 49669,  ra: 10.1396, dec: 11.9672  }, to: { name: "η Leo",         hip: 49583,  ra: 10.1222, dec: 16.7627  } },
      { from: { name: "η Leo",         hip: 49583,  ra: 10.1222, dec: 16.7627  }, to: { name: "γ¹ Leo",        hip: 50583,  ra: 10.3328, dec: 19.8418  } },
      { from: { name: "γ¹ Leo",        hip: 50583,  ra: 10.3328, dec: 19.8418  }, to: { name: "δ Leo",         hip: 54872,  ra: 11.2351, dec: 20.5240  } },
      { from: { name: "δ Leo",         hip: 54872,  ra: 11.2351, dec: 20.5240  }, to: { name: "Denebola",      hip: 57632,  ra: 11.8177, dec: 14.5723  } },
      { from: { name: "γ¹ Leo",        hip: 50583,  ra: 10.3328, dec: 19.8418  }, to: { name: "ζ Leo",         hip: 50335,  ra: 10.2782, dec: 23.4173  } },
      { from: { name: "ζ Leo",         hip: 50335,  ra: 10.2782, dec: 23.4173  }, to: { name: "μ Leo",         hip: 48455,  ra: 9.8794,  dec: 26.0071  } },
      { from: { name: "μ Leo",         hip: 48455,  ra: 9.8794,  dec: 26.0071  }, to: { name: "ε Leo",         hip: 47908,  ra: 9.7642,  dec: 23.7743  } },
      { from: { name: "δ Leo",         hip: 54872,  ra: 11.2351, dec: 20.5240  }, to: { name: "θ Leo",         hip: 54879,  ra: 11.2373, dec: 15.4297  } },
    ],
  },

  // 10. VIRGO — 12 segments
  {
    constellation: "Virgo",
    abbreviation: "Vir",
    lines: [
      { from: { name: "ν Vir",         hip: 57380,  ra: 11.7643, dec: 6.5298   }, to: { name: "Zaniah",        hip: 60129,  ra: 12.3317, dec: -0.6667  } },
      { from: { name: "Zaniah",        hip: 60129,  ra: 12.3317, dec: -0.6667  }, to: { name: "Porrima",       hip: 61941,  ra: 12.6944, dec: -1.4495  } },
      { from: { name: "Porrima",       hip: 61941,  ra: 12.6944, dec: -1.4495  }, to: { name: "Spica",         hip: 65474,  ra: 13.4199, dec: -11.1613 } },
      { from: { name: "Spica",         hip: 65474,  ra: 13.4199, dec: -11.1613 }, to: { name: "κ Vir",         hip: 69427,  ra: 14.2149, dec: -10.2740 } },
      { from: { name: "κ Vir",         hip: 69427,  ra: 14.2149, dec: -10.2740 }, to: { name: "Syrma",         hip: 69701,  ra: 14.2669, dec: -5.9994  } },
      { from: { name: "Syrma",         hip: 69701,  ra: 14.2669, dec: -5.9994  }, to: { name: "μ Vir",         hip: 71957,  ra: 14.7177, dec: -5.6574  } },
      { from: { name: "Spica",         hip: 65474,  ra: 13.4199, dec: -11.1613 }, to: { name: "ζ Vir",         hip: 66249,  ra: 13.5783, dec: -0.5959  } },
      { from: { name: "ζ Vir",         hip: 66249,  ra: 13.5783, dec: -0.5959  }, to: { name: "τ Vir",         hip: 68520,  ra: 14.0272, dec: 1.5446   } },
      { from: { name: "τ Vir",         hip: 68520,  ra: 14.0272, dec: 1.5446   }, to: { name: "109 Vir",       hip: 72220,  ra: 14.7706, dec: 1.8929   } },
      { from: { name: "ζ Vir",         hip: 66249,  ra: 13.5783, dec: -0.5959  }, to: { name: "δ Vir",         hip: 63090,  ra: 12.9268, dec: 3.3976   } },
      { from: { name: "δ Vir",         hip: 63090,  ra: 12.9268, dec: 3.3976   }, to: { name: "Vindemiatrix",  hip: 63608,  ra: 13.0363, dec: 10.9591  } },
      { from: { name: "δ Vir",         hip: 63090,  ra: 12.9268, dec: 3.3976   }, to: { name: "Porrima",       hip: 61941,  ra: 12.6944, dec: -1.4495  } },
    ],
  },

  // 11. LIBRA — 5 segments
  {
    constellation: "Libra",
    abbreviation: "Lib",
    lines: [
      { from: { name: "θ Lib",             hip: 77853,  ra: 15.8971, dec: -16.7288 }, to: { name: "Zubeneschamali",    hip: 76333,  ra: 15.5921, dec: -14.7895 } },
      { from: { name: "Zubeneschamali",    hip: 76333,  ra: 15.5921, dec: -14.7895 }, to: { name: "Zubenelgenubi β",   hip: 74785,  ra: 15.2835, dec: -9.3828  } },
      { from: { name: "Zubenelgenubi β",   hip: 74785,  ra: 15.2835, dec: -9.3828  }, to: { name: "Zubenelgenubi α",   hip: 72622,  ra: 14.8480, dec: -16.0416 } },
      { from: { name: "Zubenelgenubi α",   hip: 72622,  ra: 14.8480, dec: -16.0416 }, to: { name: "Brachium",          hip: 73714,  ra: 15.0678, dec: -25.2819 } },
      { from: { name: "Brachium",          hip: 73714,  ra: 15.0678, dec: -25.2819 }, to: { name: "Zubeneschamali",    hip: 76333,  ra: 15.5921, dec: -14.7895 } },
    ],
  },

  // 12. SCORPIUS — 12 segments
  {
    constellation: "Scorpius",
    abbreviation: "Sco",
    lines: [
      { from: { name: "Shaula",        hip: 85927,  ra: 17.5601, dec: -37.1038 }, to: { name: "Girtab",        hip: 86670,  ra: 17.7082, dec: -39.0300 } },
      { from: { name: "Girtab",        hip: 86670,  ra: 17.7082, dec: -39.0300 }, to: { name: "ι¹ Sco",        hip: 87073,  ra: 17.7931, dec: -40.1270 } },
      { from: { name: "ι¹ Sco",        hip: 87073,  ra: 17.7931, dec: -40.1270 }, to: { name: "Sargas",        hip: 86228,  ra: 17.6220, dec: -42.9978 } },
      { from: { name: "Sargas",        hip: 86228,  ra: 17.6220, dec: -42.9978 }, to: { name: "η Sco",         hip: 84143,  ra: 17.2026, dec: -43.2385 } },
      { from: { name: "η Sco",         hip: 84143,  ra: 17.2026, dec: -43.2385 }, to: { name: "ζ¹ Sco",        hip: 82671,  ra: 16.8999, dec: -42.3620 } },
      { from: { name: "ζ¹ Sco",        hip: 82671,  ra: 16.8999, dec: -42.3620 }, to: { name: "μ¹ Sco",        hip: 82514,  ra: 16.8645, dec: -38.0473 } },
      { from: { name: "μ¹ Sco",        hip: 82514,  ra: 16.8645, dec: -38.0473 }, to: { name: "ε Sco",         hip: 82396,  ra: 16.8362, dec: -34.2931 } },
      { from: { name: "ε Sco",         hip: 82396,  ra: 16.8362, dec: -34.2931 }, to: { name: "τ Sco",         hip: 81266,  ra: 16.5981, dec: -28.2160 } },
      { from: { name: "τ Sco",         hip: 81266,  ra: 16.5981, dec: -28.2160 }, to: { name: "Antares",       hip: 80763,  ra: 16.4901, dec: -26.4319 } },
      { from: { name: "Antares",       hip: 80763,  ra: 16.4901, dec: -26.4319 }, to: { name: "Dschubba",      hip: 78401,  ra: 16.0056, dec: -22.6216 } },
      { from: { name: "Antares",       hip: 80763,  ra: 16.4901, dec: -26.4319 }, to: { name: "π Sco",         hip: 78265,  ra: 15.9808, dec: -26.1142 } },
      { from: { name: "Antares",       hip: 80763,  ra: 16.4901, dec: -26.4319 }, to: { name: "Acrab",         hip: 78820,  ra: 16.0907, dec: -19.8054 } },
    ],
  },

  // 13. OPHIUCHUS — 7 segments
  {
    constellation: "Ophiuchus",
    abbreviation: "Oph",
    lines: [
      { from: { name: "Rasalhague",    hip: 86032,  ra: 17.5822, dec: 12.5606  }, to: { name: "Cebalrai",      hip: 86742,  ra: 17.7246, dec: 4.5669   } },
      { from: { name: "Sabik",         hip: 84012,  ra: 17.1730, dec: -15.7251 }, to: { name: "Cebalrai",      hip: 86742,  ra: 17.7246, dec: 4.5669   } },
      { from: { name: "Rasalhague",    hip: 86032,  ra: 17.5822, dec: 12.5606  }, to: { name: "κ Oph",         hip: 83000,  ra: 16.9612, dec: 9.3750   } },
      { from: { name: "κ Oph",         hip: 83000,  ra: 16.9612, dec: 9.3750   }, to: { name: "Yed Posterior", hip: 79882,  ra: 16.3054, dec: -4.6926  } },
      { from: { name: "Yed Posterior", hip: 79882,  ra: 16.3054, dec: -4.6926  }, to: { name: "Han",           hip: 81377,  ra: 16.6193, dec: -10.5671 } },
      { from: { name: "Han",           hip: 81377,  ra: 16.6193, dec: -10.5671 }, to: { name: "Sabik",         hip: 84012,  ra: 17.1730, dec: -15.7251 } },
      { from: { name: "Sabik",         hip: 84012,  ra: 17.1730, dec: -15.7251 }, to: { name: "c Oph",         hip: 85755,  ra: 17.5235, dec: -23.9632 } },
    ],
  },

]

// O(1) lookup by constellation name — built once at module load.
export const ASTERISM_BY_CONSTELLATION: Readonly<Record<string, ConstellationAsterism>> =
  Object.fromEntries(CONSTELLATION_ASTERISMS.map(a => [a.constellation, a]))
