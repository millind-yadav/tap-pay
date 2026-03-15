import { useCountUp } from '../hooks/useCountUp'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function AnimatedCounter({ target, suffix = '', label, duration = 2000 }) {
  const { ref, isRevealed } = useScrollReveal({ threshold: 0.3 })
  const count = useCountUp(target, isRevealed, duration)

  return (
    <div ref={ref} className="stat-item">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
