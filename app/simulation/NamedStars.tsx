'use client'

import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useUIStore } from '@/app/store/uiStore'

interface StarDef {
  constellation: string
  name: string
  nameLatin?: string
  magnitude: number
  ra: number   // Right Ascension en horas decimales [0, 24)
  dec: number  // Declinación en grados decimales [-90, +90]
}

// Primary set — 19 named stars with real J2000 RA/Dec.
// Sources: .claude/star-coordinates-01.md, .claude/star-coordinates-02.md
const NAMED_STARS: StarDef[] = [
  { constellation: 'Sagittarius', name: 'Kaus Australis', nameLatin: 'ε Sagittarii', magnitude: 1.85, ra: 18.4029, dec: -34.3846 },
  { constellation: 'Capricornus', name: 'Deneb Algedi',   nameLatin: 'δ Capricorni',  magnitude: 2.81, ra: 21.7840, dec: -16.1273 },
  { constellation: 'Aquarius',    name: 'Sadalsuud',       nameLatin: 'β Aquarii',     magnitude: 2.91, ra: 21.5260, dec:  -5.5712 },
  { constellation: 'Pisces',      name: 'Alpherg',         nameLatin: 'η Piscium',     magnitude: 3.62, ra:  1.5247, dec:  15.3458 },
  { constellation: 'Aries',       name: 'Hamal',           nameLatin: 'α Arietis',     magnitude: 2.00, ra:  2.1195, dec:  23.4628 },
  { constellation: 'Taurus',      name: 'Aldebaran',       nameLatin: 'α Tauri',       magnitude: 0.87, ra:  4.5987, dec:  16.5092 },
  { constellation: 'Gemini',      name: 'Pollux',          nameLatin: 'β Geminorum',   magnitude: 1.16, ra:  7.7553, dec:  28.0261 },
  { constellation: 'Cancer',      name: 'Al Tarf',         nameLatin: 'β Cancri',      magnitude: 3.52, ra:  8.2753, dec:   9.1857 },
  { constellation: 'Leo',         name: 'Regulus',         nameLatin: 'α Leonis',      magnitude: 1.36, ra: 10.1395, dec:  11.9672 },
  { constellation: 'Virgo',       name: 'Spica',           nameLatin: 'α Virginis',    magnitude: 0.98, ra: 13.4199, dec: -11.1614 },
  { constellation: 'Libra',       name: 'Zubeneschamali',  nameLatin: 'β Librae',      magnitude: 2.61, ra: 15.2834, dec:  -9.3829 },
  { constellation: 'Scorpius',    name: 'Antares',         nameLatin: 'α Scorpii',     magnitude: 1.06, ra: 16.4901, dec: -26.4320 },
  { constellation: 'Ophiuchus',   name: 'Rasalhague',      nameLatin: 'α Ophiuchi',    magnitude: 2.07, ra: 17.5822, dec:  12.5600 },
  { constellation: 'Taurus',      name: 'Alcyone',         nameLatin: 'η Tauri',       magnitude: 2.87, ra:  3.7914, dec:  24.1051 },
  { constellation: 'Gemini',      name: 'Castor',          nameLatin: 'α Geminorum',   magnitude: 1.58, ra:  7.5766, dec:  31.8883 },
  { constellation: 'Leo',         name: 'Denebola',        nameLatin: 'β Leonis',      magnitude: 2.14, ra: 11.8177, dec:  14.5721 },
  { constellation: 'Scorpius',    name: 'Shaula',          nameLatin: 'λ Scorpii',     magnitude: 1.63, ra: 17.5601, dec: -37.1038 },
  { constellation: 'Sagittarius', name: 'Nunki',           nameLatin: 'σ Sagittarii',  magnitude: 2.05, ra: 18.9211, dec: -26.2967 },
  { constellation: 'Ophiuchus',   name: 'Sabik',           nameLatin: 'η Ophiuchi',    magnitude: 2.43, ra: 17.1730, dec: -15.7249 },
]

const STAR_RING_RADIUS = 7.5
const ECLIPTIC_OBLIQUITY = 23.4393 * (Math.PI / 180)
// ♈ equinox falls at canvas angle ≈ 180.7° (inside Pisces, not Aries IAU boundary).
// Derived: θ_VE = 90° + (92/365.25)×360° where 92 = days from Dec-18 to Mar-20.
// See .claude/arch-star-positioning-01.md §3.2 for full derivation.
const CANVAS_VERNAL_EQUINOX_DEG = 180.7

function raDecToCanvas(ra: number, dec: number): [number, number, number] {
  const raRad  = ra  * (Math.PI / 12)
  const decRad = dec * (Math.PI / 180)
  const ε = ECLIPTIC_OBLIQUITY

  // Step 1: equatorial (RA/Dec) → ecliptic (λ, β)
  const sinBeta = Math.sin(decRad) * Math.cos(ε) - Math.cos(decRad) * Math.sin(ε) * Math.sin(raRad)
  const beta = Math.asin(Math.max(-1, Math.min(1, sinBeta)))

  const lambdaY = Math.sin(decRad) * Math.sin(ε) + Math.cos(decRad) * Math.cos(ε) * Math.sin(raRad)
  const lambdaX = Math.cos(decRad) * Math.cos(raRad)
  const lambdaDeg = ((Math.atan2(lambdaY, lambdaX) * 180 / Math.PI) + 360) % 360

  // Step 2: λ → canvas angle (anchored at vernal equinox)
  const thetaDeg = (CANVAS_VERNAL_EQUINOX_DEG + lambdaDeg) % 360
  const theta = thetaDeg * (Math.PI / 180)

  // Step 3: canvas XYZ
  return [
    Math.cos(theta) * STAR_RING_RADIUS,
    (beta * 180 / Math.PI) * 0.15,
    Math.sin(theta) * STAR_RING_RADIUS,
  ]
}

function magnitudeToSize(mag: number): number {
  if (mag < 2.0) return 3
  if (mag < 3.0) return 2
  return 1.5
}

function magnitudeToOpacity(mag: number): number {
  if (mag < 2.0) return 1.0
  if (mag < 3.0) return 0.8
  return 0.5
}

function computePositions(stars: StarDef[]) {
  return stars.map(star => ({
    ...star,
    pos: raDecToCanvas(star.ra, star.dec),
    size: magnitudeToSize(star.magnitude),
    opacity: magnitudeToOpacity(star.magnitude),
  }))
}

const PRIMARY_POSITIONS = computePositions(NAMED_STARS)

// Extended set — 166 stars with real J2000 RA/Dec from SIMBAD.
// Source: .claude/star-coordinates-04.md
// Rendered only on viewport >= 640px.
const EXTENDED_STARS: StarDef[] = [
  // === SAGITTARIUS (17) ===
  { name: 'Ascella',                constellation: 'Sagittarius', ra: 19.044, dec: -29.88, magnitude: 2.59 },
  { name: 'Kaus Media',             constellation: 'Sagittarius', ra: 18.350, dec: -29.83, magnitude: 2.70 },
  { name: 'Kaus Borealis',          constellation: 'Sagittarius', ra: 18.466, dec: -25.42, magnitude: 2.82 },
  { name: 'Albaldah',               constellation: 'Sagittarius', ra: 19.163, dec: -21.02, magnitude: 2.89 },
  { name: 'Alnasl',                 constellation: 'Sagittarius', ra: 18.097, dec: -30.42, magnitude: 2.96 },
  { name: 'Nash',                   constellation: 'Sagittarius', ra: 18.294, dec: -36.76, magnitude: 3.11 },
  { name: 'Phi Sagittarii',         constellation: 'Sagittarius', ra: 18.761, dec: -26.99, magnitude: 3.17 },
  { name: 'Tau Sagittarii',         constellation: 'Sagittarius', ra: 19.116, dec: -27.67, magnitude: 3.32 },
  { name: 'Xi2 Sagittarii',         constellation: 'Sagittarius', ra: 18.962, dec: -21.11, magnitude: 3.52 },
  { name: 'Omicron Sagittarii',     constellation: 'Sagittarius', ra: 19.078, dec: -21.74, magnitude: 3.77 },
  { name: 'Polis',                  constellation: 'Sagittarius', ra: 18.229, dec: -21.06, magnitude: 3.86 },
  { name: 'Rho1 Sagittarii',        constellation: 'Sagittarius', ra: 19.361, dec: -17.85, magnitude: 3.93 },
  { name: 'Rukbat',                 constellation: 'Sagittarius', ra: 19.398, dec: -40.62, magnitude: 3.97 },
  { name: 'Arkab Prior',            constellation: 'Sagittarius', ra: 19.377, dec: -44.46, magnitude: 4.01 },
  { name: 'Iota Sagittarii',        constellation: 'Sagittarius', ra: 19.921, dec: -41.87, magnitude: 4.12 },
  { name: 'Arkab Posterior',        constellation: 'Sagittarius', ra: 19.387, dec: -44.80, magnitude: 4.27 },
  { name: 'Theta1 Sagittarii',      constellation: 'Sagittarius', ra: 19.996, dec: -35.28, magnitude: 4.37 },
  // === CAPRICORNUS (9) ===
  { name: 'Dabih',                  constellation: 'Capricornus', ra: 20.350, dec: -14.78, magnitude: 3.05 },
  { name: 'Algedi',                 constellation: 'Capricornus', ra: 20.301, dec: -12.54, magnitude: 3.58 },
  { name: 'Nashira',                constellation: 'Capricornus', ra: 21.668, dec: -16.66, magnitude: 3.69 },
  { name: 'Marakk',                 constellation: 'Capricornus', ra: 21.444, dec: -22.41, magnitude: 3.77 },
  { name: 'Theta Capricorni',       constellation: 'Capricornus', ra: 21.099, dec: -17.23, magnitude: 4.08 },
  { name: 'Baten Algiedi',          constellation: 'Capricornus', ra: 20.864, dec: -26.92, magnitude: 4.12 },
  { name: 'Psi Capricorni',         constellation: 'Capricornus', ra: 20.768, dec: -25.27, magnitude: 4.13 },
  { name: 'Iota Capricorni',        constellation: 'Capricornus', ra: 21.371, dec: -16.83, magnitude: 4.27 },
  { name: 'Algedi Prima',           constellation: 'Capricornus', ra: 20.294, dec: -12.51, magnitude: 4.30 },
  // === AQUARIUS (16) ===
  { name: 'Sadalmelik',             constellation: 'Aquarius',    ra: 22.096, dec:  -0.32, magnitude: 2.95 },
  { name: 'Skat',                   constellation: 'Aquarius',    ra: 22.911, dec: -15.82, magnitude: 3.27 },
  { name: 'Sadaltager',             constellation: 'Aquarius',    ra: 22.480, dec:  -0.02, magnitude: 3.65 },
  { name: 'Lambda Aquarii',         constellation: 'Aquarius',    ra: 22.877, dec:  -7.58, magnitude: 3.73 },
  { name: 'Albali',                 constellation: 'Aquarius',    ra: 20.795, dec:  -9.50, magnitude: 3.78 },
  { name: 'Sadachbia',              constellation: 'Aquarius',    ra: 22.361, dec:  -1.39, magnitude: 3.86 },
  { name: '98 Aquarii',             constellation: 'Aquarius',    ra: 23.383, dec: -20.10, magnitude: 3.97 },
  { name: 'Hydria',                 constellation: 'Aquarius',    ra: 22.589, dec:  -0.12, magnitude: 4.04 },
  { name: 'Tau2 Aquarii',           constellation: 'Aquarius',    ra: 22.827, dec: -13.59, magnitude: 4.05 },
  { name: 'Ancha',                  constellation: 'Aquarius',    ra: 22.281, dec:  -7.78, magnitude: 4.17 },
  { name: 'Psi1 Aquarii',           constellation: 'Aquarius',    ra: 23.265, dec:  -9.09, magnitude: 4.21 },
  { name: 'Phi Aquarii',            constellation: 'Aquarius',    ra: 23.239, dec:  -6.05, magnitude: 4.22 },
  { name: 'Iota Aquarii',           constellation: 'Aquarius',    ra: 22.107, dec: -13.87, magnitude: 4.29 },
  { name: '99 Aquarii',             constellation: 'Aquarius',    ra: 23.434, dec: -20.64, magnitude: 4.38 },
  { name: 'Psi2 Aquarii',           constellation: 'Aquarius',    ra: 23.298, dec:  -9.18, magnitude: 4.41 },
  { name: 'Zeta2 Aquarii',          constellation: 'Aquarius',    ra: 22.480, dec:  -0.02, magnitude: 4.42 },
  // === PISCES (7) ===
  { name: 'Gamma Piscium',          constellation: 'Pisces',      ra: 23.286, dec:   3.28, magnitude: 3.70 },
  { name: 'Alrescha',               constellation: 'Pisces',      ra:  2.034, dec:   2.76, magnitude: 3.82 },
  { name: 'Omega Piscium',          constellation: 'Pisces',      ra: 23.988, dec:   6.86, magnitude: 4.01 },
  { name: 'Iota Piscium',           constellation: 'Pisces',      ra: 23.666, dec:   5.63, magnitude: 4.13 },
  { name: 'Omicron Piscium',        constellation: 'Pisces',      ra:  1.756, dec:   9.16, magnitude: 4.26 },
  { name: 'Epsilon Piscium',        constellation: 'Pisces',      ra:  1.049, dec:   7.89, magnitude: 4.27 },
  { name: 'Theta Piscium',          constellation: 'Pisces',      ra: 23.466, dec:   6.38, magnitude: 4.27 },
  // === ARIES (4) ===
  { name: 'Sheratan',               constellation: 'Aries',       ra:  1.911, dec:  20.81, magnitude: 2.64 },
  { name: 'Bharani',                constellation: 'Aries',       ra:  2.833, dec:  27.26, magnitude: 3.63 },
  { name: 'Mesarthim',              constellation: 'Aries',       ra:  1.892, dec:  19.29, magnitude: 3.86 },
  { name: 'Botein',                 constellation: 'Aries',       ra:  3.194, dec:  19.73, magnitude: 4.35 },
  // === TAURUS (17) ===
  { name: 'Elnath',                 constellation: 'Taurus',      ra:  5.438, dec:  28.61, magnitude: 1.65 },
  { name: 'Tianguan',               constellation: 'Taurus',      ra:  5.627, dec:  21.14, magnitude: 2.97 },
  { name: 'Chamukuy',               constellation: 'Taurus',      ra:  4.478, dec:  15.87, magnitude: 3.40 },
  { name: 'Lambda Tauri',           constellation: 'Taurus',      ra:  4.011, dec:  12.49, magnitude: 3.41 },
  { name: 'Ain',                    constellation: 'Taurus',      ra:  4.477, dec:  19.18, magnitude: 3.53 },
  { name: 'Omicron Tauri',          constellation: 'Taurus',      ra:  3.414, dec:   9.03, magnitude: 3.61 },
  { name: 'Atlas',                  constellation: 'Taurus',      ra:  3.820, dec:  24.05, magnitude: 3.62 },
  { name: 'Prima Hyadum',           constellation: 'Taurus',      ra:  4.330, dec:  15.63, magnitude: 3.65 },
  { name: 'Electra',                constellation: 'Taurus',      ra:  3.748, dec:  24.11, magnitude: 3.72 },
  { name: 'Xi Tauri',               constellation: 'Taurus',      ra:  3.453, dec:   9.73, magnitude: 3.73 },
  { name: 'Secunda Hyadum',         constellation: 'Taurus',      ra:  4.382, dec:  17.54, magnitude: 3.77 },
  { name: 'Theta1 Tauri',           constellation: 'Taurus',      ra:  4.476, dec:  15.96, magnitude: 3.84 },
  { name: 'Maia',                   constellation: 'Taurus',      ra:  3.764, dec:  24.37, magnitude: 3.87 },
  { name: 'Nu Tauri',               constellation: 'Taurus',      ra:  4.053, dec:   5.99, magnitude: 3.91 },
  { name: 'Merope',                 constellation: 'Taurus',      ra:  3.772, dec:  23.95, magnitude: 4.14 },
  { name: 'Kappa1 Tauri',           constellation: 'Taurus',      ra:  4.423, dec:  22.29, magnitude: 4.21 },
  { name: 'Taygeta',                constellation: 'Taurus',      ra:  3.753, dec:  24.47, magnitude: 4.30 },
  // === GEMINI (17) ===
  { name: 'Alhena',                 constellation: 'Gemini',      ra:  6.628, dec:  16.40, magnitude: 1.93 },
  { name: 'Tejat',                  constellation: 'Gemini',      ra:  6.382, dec:  22.51, magnitude: 2.87 },
  { name: 'Mebsuta',                constellation: 'Gemini',      ra:  6.732, dec:  25.13, magnitude: 3.06 },
  { name: 'Propus',                 constellation: 'Gemini',      ra:  6.248, dec:  22.51, magnitude: 3.31 },
  { name: 'Alzirr',                 constellation: 'Gemini',      ra:  6.755, dec:  12.90, magnitude: 3.35 },
  { name: 'Wasat',                  constellation: 'Gemini',      ra:  7.335, dec:  21.98, magnitude: 3.53 },
  { name: 'Kappa Geminorum',        constellation: 'Gemini',      ra:  7.741, dec:  24.40, magnitude: 3.57 },
  { name: 'Lambda Geminorum',       constellation: 'Gemini',      ra:  7.302, dec:  16.54, magnitude: 3.58 },
  { name: 'Theta Geminorum',        constellation: 'Gemini',      ra:  6.880, dec:  33.96, magnitude: 3.59 },
  { name: 'Iota Geminorum',         constellation: 'Gemini',      ra:  7.429, dec:  27.80, magnitude: 3.79 },
  { name: 'Mekbuda',                constellation: 'Gemini',      ra:  7.069, dec:  20.57, magnitude: 4.01 },
  { name: 'Upsilon Geminorum',      constellation: 'Gemini',      ra:  7.599, dec:  26.90, magnitude: 4.06 },
  { name: 'Nu Geminorum',           constellation: 'Gemini',      ra:  6.483, dec:  20.21, magnitude: 4.13 },
  { name: '1 Geminorum',            constellation: 'Gemini',      ra:  6.069, dec:  23.26, magnitude: 4.16 },
  { name: 'Rho Geminorum',          constellation: 'Gemini',      ra:  7.485, dec:  31.78, magnitude: 4.16 },
  { name: 'Sigma Geminorum',        constellation: 'Gemini',      ra:  7.722, dec:  28.88, magnitude: 4.23 },
  { name: 'Tau Geminorum',          constellation: 'Gemini',      ra:  7.186, dec:  30.24, magnitude: 4.41 },
  // === CANCER (3) ===
  { name: 'Asellus Australis',      constellation: 'Cancer',      ra:  8.745, dec:  18.15, magnitude: 3.94 },
  { name: 'Iota Cancri',            constellation: 'Cancer',      ra:  8.778, dec:  28.76, magnitude: 4.02 },
  { name: 'Acubens',                constellation: 'Cancer',      ra:  8.975, dec:  11.86, magnitude: 4.25 },
  // === LEO (18) ===
  { name: 'Algieba',                constellation: 'Leo',         ra: 10.333, dec:  19.84, magnitude: 2.08 },
  { name: 'Zosma',                  constellation: 'Leo',         ra: 11.235, dec:  20.52, magnitude: 2.56 },
  { name: 'Algenubi',               constellation: 'Leo',         ra:  9.764, dec:  23.77, magnitude: 2.97 },
  { name: 'Chertan',                constellation: 'Leo',         ra: 11.237, dec:  15.43, magnitude: 3.33 },
  { name: 'Adhafera',               constellation: 'Leo',         ra: 10.278, dec:  23.42, magnitude: 3.43 },
  { name: 'Al Jabhah',              constellation: 'Leo',         ra: 10.122, dec:  16.76, magnitude: 3.48 },
  { name: 'Subra',                  constellation: 'Leo',         ra:  9.686, dec:   9.89, magnitude: 3.52 },
  { name: 'Rho Leonis',             constellation: 'Leo',         ra: 10.547, dec:   9.31, magnitude: 3.84 },
  { name: 'Rasalas',                constellation: 'Leo',         ra:  9.879, dec:  26.01, magnitude: 3.88 },
  { name: 'Iota Leonis',            constellation: 'Leo',         ra: 11.399, dec:  10.53, magnitude: 3.94 },
  { name: 'Sigma Leonis',           constellation: 'Leo',         ra: 11.352, dec:   6.03, magnitude: 4.05 },
  { name: '54 Leonis',              constellation: 'Leo',         ra: 10.927, dec:  24.75, magnitude: 4.30 },
  { name: 'Upsilon Leonis',         constellation: 'Leo',         ra: 11.616, dec:  -0.82, magnitude: 4.30 },
  { name: 'Alterf',                 constellation: 'Leo',         ra:  9.529, dec:  22.97, magnitude: 4.32 },
  { name: '31 Leonis',              constellation: 'Leo',         ra: 10.132, dec:  10.00, magnitude: 4.39 },
  { name: '60 Leonis',              constellation: 'Leo',         ra: 11.039, dec:  20.18, magnitude: 4.42 },
  { name: 'Phi Leonis',             constellation: 'Leo',         ra: 11.278, dec:  -3.65, magnitude: 4.45 },
  { name: 'Kappa Leonis',           constellation: 'Leo',         ra:  9.411, dec:  26.18, magnitude: 4.47 },
  // === VIRGO (14) ===
  { name: 'Porrima',                constellation: 'Virgo',       ra: 12.694, dec:  -1.45, magnitude: 2.74 },
  { name: 'Vindemiatrix',           constellation: 'Virgo',       ra: 13.036, dec:  10.96, magnitude: 2.83 },
  { name: 'Heze',                   constellation: 'Virgo',       ra: 13.578, dec:  -0.60, magnitude: 3.38 },
  { name: 'Minelauva',              constellation: 'Virgo',       ra: 12.927, dec:   3.40, magnitude: 3.38 },
  { name: 'Zavijava',               constellation: 'Virgo',       ra: 11.845, dec:   1.76, magnitude: 3.60 },
  { name: '109 Virginis',           constellation: 'Virgo',       ra: 14.771, dec:   1.89, magnitude: 3.73 },
  { name: 'Mu Virginis',            constellation: 'Virgo',       ra: 14.718, dec:  -5.66, magnitude: 3.87 },
  { name: 'Zaniah',                 constellation: 'Virgo',       ra: 12.332, dec:  -0.67, magnitude: 3.89 },
  { name: 'Nu Virginis',            constellation: 'Virgo',       ra: 11.764, dec:   6.53, magnitude: 4.04 },
  { name: 'Syrma',                  constellation: 'Virgo',       ra: 14.267, dec:  -6.00, magnitude: 4.08 },
  { name: 'Omicron Virginis',       constellation: 'Virgo',       ra: 12.087, dec:   8.73, magnitude: 4.12 },
  { name: 'Kang',                   constellation: 'Virgo',       ra: 14.215, dec: -10.27, magnitude: 4.18 },
  { name: 'Tau Virginis',           constellation: 'Virgo',       ra: 14.028, dec:   1.54, magnitude: 4.23 },
  { name: 'Theta Virginis',         constellation: 'Virgo',       ra: 13.166, dec:  -5.54, magnitude: 4.38 },
  // === LIBRA (6) ===
  { name: 'Zubenelgenubi',          constellation: 'Libra',       ra: 14.848, dec: -16.04, magnitude: 2.74 },
  { name: 'Brachium',               constellation: 'Libra',       ra: 15.068, dec: -25.28, magnitude: 3.29 },
  { name: 'Upsilon Librae',         constellation: 'Libra',       ra: 15.617, dec: -28.14, magnitude: 3.60 },
  { name: 'Tau Librae',             constellation: 'Libra',       ra: 15.644, dec: -29.78, magnitude: 3.66 },
  { name: 'Zubenelhakrabi',         constellation: 'Libra',       ra: 15.592, dec: -14.79, magnitude: 3.91 },
  { name: 'Theta Librae',           constellation: 'Libra',       ra: 15.897, dec: -16.73, magnitude: 4.13 },
  // === SCORPIUS (19) ===
  { name: 'Sargas',                 constellation: 'Scorpius',    ra: 17.622, dec: -43.00, magnitude: 1.87 },
  { name: 'Dschubba',               constellation: 'Scorpius',    ra: 16.006, dec: -22.62, magnitude: 2.29 },
  { name: 'Wei',                    constellation: 'Scorpius',    ra: 16.836, dec: -34.29, magnitude: 2.29 },
  { name: 'Girtab',                 constellation: 'Scorpius',    ra: 17.708, dec: -39.03, magnitude: 2.41 },
  { name: 'Acrab',                  constellation: 'Scorpius',    ra: 16.091, dec: -19.81, magnitude: 2.62 },
  { name: 'Lesath',                 constellation: 'Scorpius',    ra: 17.513, dec: -37.30, magnitude: 2.70 },
  { name: 'Alniyat τ',              constellation: 'Scorpius',    ra: 16.598, dec: -28.22, magnitude: 2.82 },
  { name: 'Fang',                   constellation: 'Scorpius',    ra: 15.981, dec: -26.11, magnitude: 2.89 },
  { name: 'Alniyat σ',              constellation: 'Scorpius',    ra: 16.353, dec: -25.59, magnitude: 2.90 },
  { name: 'Iota1 Scorpii',          constellation: 'Scorpius',    ra: 17.793, dec: -40.13, magnitude: 3.03 },
  { name: 'Xamidimura',             constellation: 'Scorpius',    ra: 16.864, dec: -38.05, magnitude: 3.08 },
  { name: 'Fuyue',                  constellation: 'Scorpius',    ra: 17.831, dec: -37.04, magnitude: 3.21 },
  { name: 'Eta Scorpii',            constellation: 'Scorpius',    ra: 17.203, dec: -43.24, magnitude: 3.33 },
  { name: 'Pipirima',               constellation: 'Scorpius',    ra: 16.872, dec: -38.02, magnitude: 3.56 },
  { name: 'Zeta2 Scorpii',          constellation: 'Scorpius',    ra: 16.910, dec: -42.36, magnitude: 3.62 },
  { name: 'Iklil',                  constellation: 'Scorpius',    ra: 15.948, dec: -29.21, magnitude: 3.87 },
  { name: 'Omega1 Scorpii',         constellation: 'Scorpius',    ra: 16.113, dec: -20.67, magnitude: 3.93 },
  { name: 'Jabbah',                 constellation: 'Scorpius',    ra: 16.200, dec: -19.46, magnitude: 4.00 },
  { name: 'Omega2 Scorpii',         constellation: 'Scorpius',    ra: 16.124, dec: -20.87, magnitude: 4.31 },
  // === OPHIUCHUS (19) ===
  { name: 'Zeta Ophiuchi',          constellation: 'Ophiuchus',   ra: 16.619, dec: -10.57, magnitude: 2.56 },
  { name: 'Yed Prior',              constellation: 'Ophiuchus',   ra: 16.239, dec:  -3.69, magnitude: 2.73 },
  { name: 'Cebalrai',               constellation: 'Ophiuchus',   ra: 17.724, dec:   4.57, magnitude: 2.76 },
  { name: 'Kappa Ophiuchi',         constellation: 'Ophiuchus',   ra: 16.961, dec:   9.38, magnitude: 3.20 },
  { name: 'Yed Posterior',          constellation: 'Ophiuchus',   ra: 16.305, dec:  -4.69, magnitude: 3.23 },
  { name: 'Theta Ophiuchi',         constellation: 'Ophiuchus',   ra: 17.367, dec: -25.00, magnitude: 3.27 },
  { name: 'Sinistra',               constellation: 'Ophiuchus',   ra: 17.984, dec:  -9.77, magnitude: 3.32 },
  { name: '72 Ophiuchi',            constellation: 'Ophiuchus',   ra: 18.122, dec:   9.56, magnitude: 3.73 },
  { name: 'Gamma Ophiuchi',         constellation: 'Ophiuchus',   ra: 17.798, dec:   2.71, magnitude: 3.75 },
  { name: 'Marfik',                 constellation: 'Ophiuchus',   ra: 16.515, dec:   1.98, magnitude: 3.82 },
  { name: '67 Ophiuchi',            constellation: 'Ophiuchus',   ra: 18.011, dec:   2.93, magnitude: 3.93 },
  { name: '70 Ophiuchi',            constellation: 'Ophiuchus',   ra: 18.091, dec:   2.50, magnitude: 4.03 },
  { name: '44 Ophiuchi',            constellation: 'Ophiuchus',   ra: 17.439, dec: -24.18, magnitude: 4.16 },
  { name: 'Chi Ophiuchi',           constellation: 'Ophiuchus',   ra: 16.450, dec: -18.46, magnitude: 4.22 },
  { name: '45 Ophiuchi',            constellation: 'Ophiuchus',   ra: 17.456, dec: -29.87, magnitude: 4.28 },
  { name: 'Phi Ophiuchi',           constellation: 'Ophiuchus',   ra: 16.519, dec: -16.61, magnitude: 4.29 },
  { name: '36 Ophiuchi B',          constellation: 'Ophiuchus',   ra: 17.256, dec: -26.60, magnitude: 4.33 },
  { name: 'Sigma Ophiuchi',         constellation: 'Ophiuchus',   ra: 17.442, dec:   4.14, magnitude: 4.34 },
  { name: 'Iota Ophiuchi',          constellation: 'Ophiuchus',   ra: 16.900, dec:  10.17, magnitude: 4.39 },
]

const EXTENDED_POSITIONS = computePositions(EXTENDED_STARS)

export function NamedStars() {
  const showStarNames = useUIStore(s => s.showStarNames)
  const { size } = useThree()
  const isDesktop = size.width >= 640

  // Antares pulse — variable star (0.6–1.6 mag). Opacity breathes 0.70 → 1.00
  // over a 2 s sine period. DOM ref updated directly to avoid React re-renders.
  const antaresRef = useRef<HTMLDivElement>(null)
  const antaresTimeRef = useRef(0)

  useFrame((_, delta) => {
    antaresTimeRef.current += delta
    if (antaresRef.current) {
      const opacity = 0.85 + 0.15 * Math.sin(antaresTimeRef.current * Math.PI)
      antaresRef.current.style.opacity = String(opacity)
    }
  })

  if (!showStarNames) return null

  return (
    <>
      {PRIMARY_POSITIONS.map(star => {
        const [x, y, z] = star.pos
        const isAntares = star.name === 'Antares'
        const px = star.size
        const showLabel = isDesktop && star.magnitude < 2.5

        return (
          <Html
            key={star.name}
            position={[x, y, z]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div
              ref={isAntares ? antaresRef : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                ...(isAntares ? {} : { opacity: star.opacity }),
              }}
            >
              <div
                style={{
                  width: `${px}px`,
                  height: `${px}px`,
                  borderRadius: '50%',
                  background: isAntares ? '#ff7b6b' : '#ffffff',
                  boxShadow: isAntares
                    ? `0 0 ${px * 2}px ${px}px rgba(255,90,60,0.7), 0 0 ${px * 4}px rgba(220,60,40,0.4)`
                    : `0 0 ${px * 1.5}px ${px * 0.5}px rgba(200,220,255,0.8), 0 0 ${px * 3}px rgba(150,180,255,0.4)`,
                  flexShrink: 0,
                }}
              />
              {showLabel && (
                <div
                  style={{
                    fontSize: '9px',
                    color: isAntares ? 'rgba(255,150,110,0.8)' : 'rgba(180,200,255,0.65)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                  }}
                >
                  {star.name}
                </div>
              )}
            </div>
          </Html>
        )
      })}
      {isDesktop && EXTENDED_POSITIONS.map(star => {
        const [x, y, z] = star.pos
        const px = star.size
        const showLabel = star.magnitude < 2.5

        return (
          <Html
            key={`x-${star.name}`}
            position={[x, y, z]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '3px',
                opacity: star.opacity,
              }}
            >
              <div
                style={{
                  width: `${px}px`,
                  height: `${px}px`,
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: `0 0 ${px * 1.5}px ${px * 0.5}px rgba(200,220,255,0.8), 0 0 ${px * 3}px rgba(150,180,255,0.4)`,
                  flexShrink: 0,
                }}
              />
              {showLabel && (
                <div
                  style={{
                    fontSize: '9px',
                    color: 'rgba(180,200,255,0.65)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                    userSelect: 'none',
                  }}
                >
                  {star.name}
                </div>
              )}
            </div>
          </Html>
        )
      })}
    </>
  )
}
