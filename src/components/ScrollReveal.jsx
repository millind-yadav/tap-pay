import { useScrollReveal } from '../hooks/useScrollReveal'

export function ScrollReveal({ children, delay = 0, className = '', direction = 'up' }) {
  const { ref, isRevealed } = useScrollReveal()

  const directionMap = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isRevealed ? 'revealed' : ''} ${className}`}
      style={{
        '--reveal-delay': `${delay}ms`,
        '--reveal-transform': directionMap[direction] || directionMap.up,
      }}
    >
      {children}
    </div>
  )
}
