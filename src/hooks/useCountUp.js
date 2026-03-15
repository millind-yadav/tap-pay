import { useEffect, useState } from 'react'

export function useCountUp(target, isActive, duration = 2000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let startTime = null
    let rafId = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [target, isActive, duration])

  return value
}
