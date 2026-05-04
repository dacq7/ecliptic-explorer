/**
 * useShareCard — React hook for generating share card content.
 *
 * Produces the share text and (Phase 2) triggers the image generation
 * for premium users.
 *
 * TODO (Growth Hacker + Frontend Developer): Implement share text
 * generation once the copy is defined. Image generation is Phase 2.
 */

import type { ZodiacResult } from '@/app/types'

export interface UseShareCardReturn {
  /** Pre-formatted text for the native share dialog or clipboard */
  shareText: string
  /** Trigger the native share dialog (Web Share API) or clipboard fallback */
  share: () => Promise<void>
  /** True if the Web Share API is available in this browser */
  canNativeShare: boolean
}

/**
 * TODO (Frontend Developer): Replace stub with real implementation.
 *
 * Implementation outline:
 *  1. Accept a ZodiacResult as parameter (or read from userStore).
 *  2. Format shareText using result.shareText from the logic layer.
 *  3. On share(): try navigator.share(), fall back to clipboard.writeText().
 *  4. Track share events for analytics (Growth Hacker defines the event schema).
 */
export function useShareCard(_result: ZodiacResult | null): UseShareCardReturn {
  throw new Error(
    'useShareCard is not yet implemented. ' +
      'See TODO comment in useShareCard.ts.'
  )
}
