import { useEffect } from 'react'
import { useUIStore } from '@/app/store/uiStore'

export function useWebGLDetect() {
  const set2DFallback = useUIStore(s => s.set2DFallback)
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) set2DFallback(true)
  }, [set2DFallback])
}
