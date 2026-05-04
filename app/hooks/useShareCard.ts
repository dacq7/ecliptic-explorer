'use client'

import { useState, useCallback } from 'react'
import type { ZodiacResult } from '@/app/types'

export interface UseShareCardReturn {
  /** Pre-formatted text for the native share dialog or clipboard */
  shareText: string
  /** Trigger the native share dialog (Web Share API) or clipboard fallback */
  share: () => Promise<void>
  /** True if the Web Share API is available in this browser */
  canNativeShare: boolean
  /** True for 2 s after a successful clipboard copy (not set on native share) */
  copied: boolean
}

export function useShareCard(result: ZodiacResult | null): UseShareCardReturn {
  const [copied, setCopied] = useState(false)

  const shareText = result?.shareText ?? ''

  const canNativeShare =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function'

  const share = useCallback(async () => {
    if (!shareText) return

    if (canNativeShare) {
      try {
        await navigator.share({ text: shareText })
        return
      } catch {
        // User cancelled or platform rejected — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [shareText, canNativeShare])

  return { shareText, share, canNativeShare, copied }
}
