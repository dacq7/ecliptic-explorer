/**
 * Sistema 4 — Narrativa Educativa: Explanations.
 *
 * All UI-facing strings live here — never hardcode copy in components.
 * This file has zero business logic; it exports structured text only.
 *
 * TODO (Visual Storyteller): Fill in the copy for each entry.
 */

/** A single educational explanation block */
export interface Explanation {
  /** Short title (used as accordion header or section heading) */
  title: string
  /** Body copy — supports plain text; Markdown rendering is opt-in at the component level */
  body: string
  /** Optional fun fact to highlight in a callout box */
  funFact?: string
}

/** Explanations keyed by IAU constellation name */
export type ConstellationExplanations = Record<string, Explanation>

/**
 * Per-constellation explanations for the /learn section.
 * Keys match Constellation.name (English, IAU).
 *
 * TODO (Visual Storyteller): Add copy for all 13 constellations.
 */
export const CONSTELLATION_EXPLANATIONS: ConstellationExplanations = {
  Ophiuchus: {
    title: 'El signo que decidieron ignorar.',
    body:
      'Ofiuco siempre existió. El Sol lo cruza 18 días al año — y ningún horóscopo del mundo lo menciona.\n' +
      'No fue un error: simplemente no encajaba en los 12 signos iguales que la astrología necesitaba.',
    funFact:
      'Si naciste entre el 30 de nov y el 17 de dic, tu constelación real es Ofiuco — aunque ningún horóscopo lo diga.',
  },
  Scorpius: {
    title: 'Scorpius: Only 7 Days',
    body: '', // TODO: fill in
    funFact: '', // TODO: fill in
  },
  // TODO: add remaining 11 constellations
}

// ---------------------------------------------------------------------------
// Calculator UI copy
// ---------------------------------------------------------------------------

/** Static strings for the /calculator page */
export const CALCULATOR_COPY = {
  pageTitle: 'Tu signo real',
  pageSubtitle: 'Ingresa tu fecha de nacimiento y descubre qué constelación ocupaba el Sol ese día, según la Unión Astronómica Internacional.',
  inputLabel: 'Fecha de nacimiento',
  submitLabel: 'Descubrir mi signo real',
  loadingLabel: 'Calculando...',
  resetLabel: 'Calcular otra fecha',
  shareLabel: 'Copiar para compartir',
  shareCopied: '¡Copiado!',
  seeSimulationLabel: 'Ver en la simulación',
  surpriseHeading: '¡Sorpresa!',
  matchHeading: 'Confirmado',
  surpriseMessage: (constellationEs: string) =>
    `Tu signo real es ${constellationEs}, no el que te dijeron.`,
  matchMessage: (constellationEs: string) =>
    `Tu signo real es ${constellationEs} — coincide con la astrología tradicional.`,
  traditionalSignLabel: 'Signo astrológico tradicional',
  durationLabel: (days: number) => `El Sol estuvo en esta constelación ${days} días ese año.`,
  ophiuchusNote: 'Ofiuco es la constelación que la astrología tradicional ignoró. El Sol la recorre 18 días al año.',
} as const

/** Concept explanations for general /learn FAQ content */
export interface ConceptExplanation {
  question: string
  answer: string
  /** Optional callout — concrete data point, max 1 visual line */
  funFact?: string
}

/** FAQ-style concept explanations for the /learn accordion */
export const CONCEPT_EXPLANATIONS: ConceptExplanation[] = [
  {
    question: '¿Qué es la eclíptica?',
    answer:
      'El camino aparente que el Sol recorre alrededor de la Tierra a lo largo del año.\n' +
      'No salta de un lugar a otro: se mueve lentamente por un plano fijo en el cielo.\n' +
      'Las constelaciones que ese plano cruza son las del zodíaco — y son 13, no 12.',
    funFact:
      'La eclíptica está inclinada 23.5° respecto al ecuador — el mismo ángulo que origina las estaciones.',
  },
  {
    question: '¿Por qué hay 13 constelaciones y no 12?',
    answer:
      'La Unión Astronómica Internacional trazó los límites reales del cielo en 1930.\n' +
      'El plano de la eclíptica cruza 13 constelaciones — incluyendo Ofiuco, que la astrología nunca incluyó.\n' +
      'La astrología eligió 12 signos iguales de 30° hace 2.600 años. La astronomía no tuvo esa elección.',
    funFact:
      'La IAU reconoce 88 constelaciones en total. Solo 13 están en el camino del Sol.',
  },
  {
    question: '¿Por qué Escorpio dura solo 7 días en la eclíptica?',
    answer:
      'La eclíptica no divide el cielo en partes iguales — cada constelación ocupa un área diferente.\n' +
      'Escorpio ocupa un tramo pequeño del plano solar: apenas 7 días, frente a los 44 de Virgo.\n' +
      'La astrología compensó esa desigualdad dándole 30 días a todos. La astronomía no hace compensaciones.',
    funFact:
      'Escorpio es seis veces más corto que Virgo. La astrología les asigna exactamente los mismos 30 días.',
  },
  {
    question: '¿Qué es la precesión y por qué importa?',
    answer:
      'La Tierra no gira erguida — su eje oscila lentamente en un ciclo de 26.000 años.\n' +
      'En 2.600 años, ese movimiento desplazó las constelaciones del zodíaco casi un mes completo.\n' +
      'Por eso tu signo astrológico y tu constelación real ya no coinciden.',
    funFact:
      'El ciclo completo de precesión dura 25.772 años. El desfase actual es de casi 30 grados.',
  },
]
