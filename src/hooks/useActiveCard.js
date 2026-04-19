import { useMemo } from 'react'
import { useCarouselScroll } from './useCarouselScroll'

export const useActiveCard = (projects) => {
  const items = projects || []
  const length = items.length

  const { activeIndex, setActiveIndex, next, prev } = useCarouselScroll(length)

  const activeProject = useMemo(() => {
    if (!length) return null
    return items[activeIndex]
  }, [items, activeIndex, length])

  return {
    items,
    activeIndex,
    activeProject,
    setActiveIndex,
    next,
    prev,
  }
}
