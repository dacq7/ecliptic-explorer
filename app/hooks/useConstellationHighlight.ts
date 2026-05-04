'use client'

import { useMemo } from 'react'
import { useSimulationStore } from '@/app/store/simulationStore'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'
import type { ZodiacResult } from '@/app/types'

export function useConstellationHighlight(): ZodiacResult {
  const currentDate = useSimulationStore(s => s.currentDate)
  return useMemo(() => getConstellationByDate(currentDate), [currentDate])
}
