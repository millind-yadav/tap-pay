import { useRef, useCallback } from 'react'

export function TiltCard({ children }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) { rafRef.current = null; return }

      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
