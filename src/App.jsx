import { useState, useEffect } from 'react'
import { ScrollReveal } from './components/ScrollReveal'
import { CursorGlow } from './components/CursorGlow'
import { TiltCard } from './components/TiltCard'
import { AnimatedCounter } from './components/AnimatedCounter'
import { MagneticButton } from './components/MagneticButton'
import { HighlightCard } from './components/HighlightCard'
import { CityMarquee } from './components/CityMarquee'
import { ParticleBurst } from './components/ParticleBurst'

function App() {
  const [submitCount, setSubmitCount] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const [totalSignups, setTotalSignups] = useState(0)

  // Fetch signup count from API on load
  useEffect(() => {
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => setTotalSignups(data.totalCount || 0))
      .catch(() => {
        // Fallback to localStorage for local dev
        try {
          const stored = JSON.parse(localStorage.getItem('tappay_emails') || '[]')
          setTotalSignups(stored.length)
        } catch { /* ignore */ }
      })
  }, [])

  // Track scroll for background gradient shift
  useEffect(() => {
    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        rafId = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4500)
    return () => clearTimeout(timer)
  }, [toast])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = email.trim().toLowerCase()
    if (!trimmed || isSubmitting) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      const data = await res.json()

      if (data.duplicate) {
        setToast({ type: 'info', message: `You're already on the list! We'll notify you at ${trimmed} 🎯` })
      } else if (data.success) {
        setTotalSignups(data.totalCount)
        setSubmitCount((c) => c + 1)
        setEmail('')
        setToast({
          type: 'success',
          message: 'Interest registered! 🚀',
          detail: `You're #${data.position} on the early access list. We'll reach out to ${trimmed} before launch.`,
        })
      } else {
        setToast({ type: 'info', message: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      // Fallback to localStorage when API is unavailable (local dev)
      try {
        const stored = JSON.parse(localStorage.getItem('tappay_emails') || '[]')
        if (stored.includes(trimmed)) {
          setToast({ type: 'info', message: `You're already on the list! We'll notify you at ${trimmed} 🎯` })
        } else {
          stored.push(trimmed)
          localStorage.setItem('tappay_emails', JSON.stringify(stored))
          const position = stored.length
          setTotalSignups(position)
          setSubmitCount((c) => c + 1)
          setEmail('')
          setToast({
            type: 'success',
            message: 'Interest registered! 🚀',
            detail: `You're #${position} on the early access list. We'll reach out to ${trimmed} before launch.`,
          })
        }
      } catch {
        setToast({ type: 'success', message: 'Thanks for your interest! We\'ll be in touch 🎉' })
        setSubmitCount((c) => c + 1)
        setEmail('')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Dynamic background gradient shift based on scroll
  const gradientShift = scrollY * 0.05

  return (
    <div
      className="page"
      style={{
        '--gradient-shift': `${gradientShift}deg`,
        '--gradient-offset': `${Math.sin(scrollY * 0.003) * 10}%`,
      }}
    >
      <CursorGlow />

      {/* Success Toast */}
      {toast && (
        <div className={`toast toast-${toast.type} toast-enter`}>
          <div className="toast-icon">
            {toast.type === 'success' ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <div className="toast-content">
            <div className="toast-message">{toast.message}</div>
            {toast.detail && <div className="toast-detail">{toast.detail}</div>}
          </div>
          <button className="toast-close" onClick={() => setToast(null)} aria-label="Dismiss">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="toast-progress" />
        </div>
      )}

      {/* Nav */}
      <header className="nav">
        <ScrollReveal delay={0}>
          <div className="brand" aria-label="TapPay">
            <img src="/logo1.png" alt="TapPay logo" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <MagneticButton className="ghost" type="button" onClick={() => document.querySelector('.email-form input')?.focus()}>
            Register interest
          </MagneticButton>
        </ScrollReveal>
      </header>

      {/* Hero */}
      <main className="hero">
        <section className="hero-text">
          <ScrollReveal delay={100}>
            <span className="chip">
              <span className="chip-dot" />
              Coming soon
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1>
              A bold new way to <span className="gradient-text">tap, pay,</span> and move faster across India.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p>
              Built for India-first experiences, from metros to growing cities.
              Simple, secure, and designed for everyday speed.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <form className="email-form" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  aria-label="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="submit-wrapper">
                <MagneticButton className="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register your interest'}
                  <span className="btn-shine" />
                </MagneticButton>
                <ParticleBurst trigger={submitCount} />
              </div>
            </form>
            <div className="trust-row">
              <div className="trust">
                <svg className="trust-icon" viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M8 1L2 4v4c0 3.5 2.5 6.4 6 7 3.5-.6 6-3.5 6-7V4L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M5.5 8l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                No spam. Only launch updates.
              </div>
              {totalSignups > 0 && (
                <div className="signup-counter">
                  <span className="signup-dot" />
                  <span>{totalSignups} {totalSignups === 1 ? 'person has' : 'people have'} joined</span>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <CityMarquee />
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="stats">
              <AnimatedCounter target={750} suffix="M+" label="smartphone users" duration={2200} />
              <AnimatedCounter target={65} suffix="M+" label="small merchants" duration={1800} />
              <div className="stat-item stat-text">
                <span className="stat-value">India-first</span>
                <span className="stat-label">designed for local habits</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={700}>
            <div className="highlights">
              <HighlightCard
                title="Merchant-friendly"
                description="Built to respect how merchants already work."
                delay={0}
              />
              <HighlightCard
                title="Universal access"
                description="One tap that works across major phones and wallets."
                delay={100}
              />
              <HighlightCard
                title="Everyday trust"
                description="Clear, familiar flows that feel reliable."
                delay={200}
              />
            </div>
          </ScrollReveal>
        </section>

        <section className="hero-visual" aria-hidden="true">
          <ScrollReveal delay={400} direction="right">
            <div className="orb" />
            <TiltCard>
              <div className="hero-media">
                <img
                  src="/tappay-hero.png"
                  alt="TapPay tap or scan visual"
                  className="hero-poster"
                />
              </div>
            </TiltCard>
            <div className="ripple" />
          </ScrollReveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <ScrollReveal delay={200}>
          <div className="footer-inner">
            <div className="footer-brand">TapPay</div>
            <div>TapPay is launching soon.</div>
            <div className="footer-note">Stay tuned for the official release.</div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  )
}

export default App
