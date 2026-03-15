import { useRef, useCallback } from 'react'

export function HighlightCard({ title, description, delay = 0 }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      className="highlight glow-card"
      onMouseMove={handleMouseMove}
      style={{ '--card-delay': `${delay}ms` }}
    >
      <div className="glow-card-border" />
      <div className="glow-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
