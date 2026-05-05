'use client'

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useUIStore } from '@/app/store/uiStore'

const CONTEXT_RESTORE_TIMEOUT_MS = 5000

export function WebGLContextGuard() {
  const { gl } = useThree()
  const set2DFallback = useUIStore(s => s.set2DFallback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const canvas = gl.domElement

    const handleContextLost = (e: Event) => {
      e.preventDefault()
      timeoutRef.current = setTimeout(() => {
        set2DFallback(true)
      }, CONTEXT_RESTORE_TIMEOUT_MS)
    }

    const handleContextRestored = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [gl, set2DFallback])

  return null
}
