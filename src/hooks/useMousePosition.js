import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId = null

    const handleMouseMove = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return position
}
