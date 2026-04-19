import { useState, useEffect, useRef } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementHeight = rect.height

      if (rect.top > windowHeight) {
        setProgress(0)
      } else if (rect.bottom < 0) {
        setProgress(0)
      } else {
        const visibleTop = Math.max(0, windowHeight - rect.top)
        const visibleBottom = Math.min(windowHeight, windowHeight - (rect.top + elementHeight - windowHeight))
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const totalScrollRange = windowHeight + elementHeight
          const scrolled = Math.max(0, windowHeight - rect.top)
          const rawProgress = scrolled / totalScrollRange
          
          const centerProgress = Math.min(1, Math.max(0, 
            1 - Math.abs((rect.top + elementHeight / 2 - windowHeight / 2) / (windowHeight / 2))
          ))
          
          setProgress(centerProgress)
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return [ref, progress]
}
