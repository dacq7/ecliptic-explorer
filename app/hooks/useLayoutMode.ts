'use client'

import { useState, useEffect } from 'react'

export interface LayoutMode {
  isPhone: boolean         // max-width: 479px
  isLandscapePhone: boolean // orientation: landscape AND max-height: 500px
  isPortraitPhone: boolean  // orientation: portrait AND max-width: 767px
}

export function useLayoutMode(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>({
    isPhone: false,
    isLandscapePhone: false,
    isPortraitPhone: false,
  })

  useEffect(() => {
    const mqPhone = window.matchMedia('(max-width: 479px)')
    const mqLandscape = window.matchMedia('(orientation: landscape) and (max-height: 500px)')
    const mqPortrait = window.matchMedia('(orientation: portrait) and (max-width: 767px)')

    const update = () => {
      setMode({
        isPhone: mqPhone.matches,
        isLandscapePhone: mqLandscape.matches,
        isPortraitPhone: mqPortrait.matches,
      })
    }

    update()
    ;[mqPhone, mqLandscape, mqPortrait].forEach(mq => mq.addEventListener('change', update))
    return () => {
      ;[mqPhone, mqLandscape, mqPortrait].forEach(mq => mq.removeEventListener('change', update))
    }
  }, [])

  return mode
}
