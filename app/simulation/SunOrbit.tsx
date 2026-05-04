'use client'

import { useEffect } from 'react'
import { useSimulationStore } from '@/app/store/simulationStore'
import { getVisualSolarAngle } from '@/app/logic/eclipticAngles'
import { SunMesh } from './SunMesh'

export function SunOrbit() {
  const currentDate = useSimulationStore(s => s.currentDate)
  const setSolarLongitude = useSimulationStore(s => s.setSolarLongitude)

  useEffect(() => {
    setSolarLongitude(getVisualSolarAngle(currentDate))
  }, [currentDate, setSolarLongitude])

  return <SunMesh />
}
