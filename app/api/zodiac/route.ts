/**
 * API Route: GET /api/zodiac?date=YYYY-MM-DD
 *
 * Stateless endpoint. Delegates all logic to getConstellationByDate()
 * from Sistema 3 — it does NOT re-implement constellation logic.
 *
 * TODO (Backend Architect): Implement the handler once
 * getConstellationByDate() is ready.
 *
 * Usage:
 *   GET /api/zodiac?date=1990-07-21
 *   → { success: true, data: ZodiacResult }
 *
 *   GET /api/zodiac?date=invalid
 *   → { success: false, error: "Invalid date format. Use YYYY-MM-DD." }
 */

import { NextRequest, NextResponse } from 'next/server'
import type { ZodiacAPIResponse } from '@/app/types'

/**
 * TODO (Backend Architect): Replace stub with real implementation.
 *
 * Implementation outline:
 *  1. Extract `date` from searchParams.
 *  2. Validate format with a regex: /^\d{4}-\d{2}-\d{2}$/.
 *  3. Call getConstellationByDate(date) — wrap in try/catch.
 *  4. On success: return NextResponse.json({ success: true, data: result }).
 *  5. On validation error: return 400 with { success: false, error: message }.
 *  6. On unexpected error: return 500 with { success: false, error: "Internal error" }.
 */
export async function GET(request: NextRequest): Promise<NextResponse<ZodiacAPIResponse>> {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json(
      { success: false, data: null as unknown as ZodiacAPIResponse['data'], error: 'Missing required query parameter: date' },
      { status: 400 }
    )
  }

  // TODO: implement full logic — remove this placeholder
  return NextResponse.json(
    {
      success: false,
      data: null as unknown as ZodiacAPIResponse['data'],
      error: 'Not yet implemented. See TODO in app/api/zodiac/route.ts.',
    },
    { status: 501 }
  )
}
