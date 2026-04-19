import { useState } from 'react'

export const useCarouselScroll = (length) => {
  const safeLength = Math.max(length, 0)
  const initialIndex = safeLength > 0 && safeLength % 2 === 1 ? Math.floor(safeLength / 2) : 0
  const [activeIndex, setActiveIndex] = useState(initialIndex)

  const next = () => {
    if (!safeLength) return
    setActiveIndex((prev) => (prev + 1) % safeLength)
  }

  const prev = () => {
    if (!safeLength) return
    setActiveIndex((prev) => (prev - 1 + safeLength) % safeLength)
  }

  return { activeIndex, setActiveIndex, next, prev }
}
