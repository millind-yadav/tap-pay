import { useState, useEffect, useCallback } from 'react'

export function ParticleBurst({ trigger }) {
  const [particles, setParticles] = useState([])

  const createParticles = useCallback(() => {
    const newParticles = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 260,
      y: (Math.random() - 0.5) * 260,
      rotate: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      color: ['#1a73e8', '#06b6d4', '#10b981', '#f59e0b', '#e879f9'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 200,
    }))

    setParticles(newParticles)

    // Clean up after animation
    setTimeout(() => setParticles([]), 1200)
  }, [])

  useEffect(() => {
    if (trigger > 0) {
      createParticles()
    }
  }, [trigger, createParticles])

  if (particles.length === 0) return null

  return (
    <div className="particle-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            '--px': `${p.x}px`,
            '--py': `${p.y}px`,
            '--rotate': `${p.rotate}deg`,
            '--scale': p.scale,
            '--color': p.color,
            '--delay': `${p.delay}ms`,
          }}
        />
      ))}
    </div>
  )
}
