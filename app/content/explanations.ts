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
    title: 'Ophiuchus: The Forgotten Thirteenth',
    body: '', // TODO: fill in
    funFact: '', // TODO: fill in
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
}

/**
 * FAQ-style concept explanations.
 * TODO (Visual Storyteller): Write the answers.
 */
export const CONCEPT_EXPLANATIONS: ConceptExplanation[] = [
  {
    question: 'What is the ecliptic?',
    answer: '', // TODO
  },
  {
    question: 'Why does Ophiuchus exist?',
    answer: '', // TODO
  },
  {
    question: 'Why does Scorpius only last 7 days?',
    answer: '', // TODO
  },
  {
    question: 'What is the precession of the equinoxes?',
    answer: '', // TODO
  },
]
