import { useRef, useCallback } from 'react'

export function MagneticButton({ children, className = '', ...props }) {
  const btnRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const btn = btnRef.current
      if (!btn) { rafRef.current = null; return }

      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * 0.3
      const deltaY = (e.clientY - centerY) * 0.3

      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      rafRef.current = null
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const btn = btnRef.current
    if (btn) {
      btn.style.transform = 'translate(0px, 0px)'
    }
  }, [])

  return (
    <button
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}
