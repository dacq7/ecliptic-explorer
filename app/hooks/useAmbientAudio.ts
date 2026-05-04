'use client'

import { useEffect, useRef } from 'react'
import { useUIStore } from '@/app/store/uiStore'
import { useSimulationStore } from '@/app/store/simulationStore'
import { getConstellationByDate } from '@/app/logic/zodiacLogic'

/**
 * Manages ambient audio for the simulation using Web Audio API — no external files.
 *
 * When showAudio=true:
 *   - A 55 Hz sine drone at gain 0.03 plays continuously (the cosmos).
 *
 * When the Sun enters Ophiuchus:
 *   - A brief disonant note (440 Hz + 466 Hz, 0.8 s, exponential fade-out) fires once.
 *
 * The AudioContext is created on first enable (satisfies browser autoplay policy —
 * the toggle click is the required user gesture).
 */
export function useAmbientAudio() {
  const showAudio = useUIStore(s => s.showAudio)
  const currentDate = useSimulationStore(s => s.currentDate)

  const ctxRef = useRef<AudioContext | null>(null)
  const droneOscRef = useRef<OscillatorNode | null>(null)
  const droneGainRef = useRef<GainNode | null>(null)
  const prevConstellationRef = useRef<string>('')

  useEffect(() => {
    if (!showAudio) return

    const ctx = new AudioContext()
    ctxRef.current = ctx

    const gain = ctx.createGain()
    gain.gain.value = 0.03
    gain.connect(ctx.destination)
    droneGainRef.current = gain

    const drone = ctx.createOscillator()
    drone.type = 'sine'
    drone.frequency.value = 55
    drone.connect(gain)
    droneOscRef.current = drone

    // Browsers may create AudioContext in suspended state even inside a user-gesture
    // handler. We must await resume() before calling start() — otherwise the oscillator
    // queues on a suspended context that never becomes active if resume() is rejected.
    let live = true
    ctx.resume()
      .then(() => {
        if (live) drone.start()
      })
      .catch(() => undefined)

    return () => {
      live = false
      try {
        drone.stop()
      } catch {
        // oscillator was never started (e.g. resume() failed or cleanup beat start())
      }
      ctx.close().catch(() => undefined)
      ctxRef.current = null
      droneOscRef.current = null
      droneGainRef.current = null
      prevConstellationRef.current = ''
    }
  }, [showAudio])

  // Detect transition into Ophiuchus and play disonant note
  useEffect(() => {
    if (!showAudio || !ctxRef.current) return

    const constellationName = getConstellationByDate(currentDate).constellation.name

    if (constellationName === 'Ophiuchus' && prevConstellationRef.current !== 'Ophiuchus') {
      const ctx = ctxRef.current
      const now = ctx.currentTime

      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.value = 440

      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.value = 466

      const noteGain = ctx.createGain()
      noteGain.gain.setValueAtTime(0.06, now)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

      osc1.connect(noteGain)
      osc2.connect(noteGain)
      noteGain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 0.8)
      osc2.stop(now + 0.8)
    }

    prevConstellationRef.current = constellationName
  }, [currentDate, showAudio])
}
