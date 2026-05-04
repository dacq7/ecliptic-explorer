import { useEffect } from 'react'
import { useUIStore } from '@/app/store/uiStore'

export function useWebGLDetect() {
  const set2DFallback = useUIStore(s => s.set2DFallback)
  useEffect(() => {
    // Mobile devices go directly to 2D — no WebGL attempt
    const isMobile = navigator.maxTouchPoints > 0 || window.screen.width < 768
    if (isMobile) {
      set2DFallback(true)
      return
    }

    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) {
      set2DFallback(true)
      return
    }

    // Low maxTextureSize is a reliable proxy for GPUs too weak for this scene
    const maxTexture = (gl as WebGLRenderingContext).getParameter(
      (gl as WebGLRenderingContext).MAX_TEXTURE_SIZE
    )
    if (maxTexture < 4096) set2DFallback(true)

    // Release the test context
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')
    ext?.loseContext()
  }, [set2DFallback])
}
