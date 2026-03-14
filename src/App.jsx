function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="brand" aria-label="TapPay">
          <img src="/logo1.png" alt="TapPay logo" />
        </div>
        <button className="ghost" type="button">
          Notify me
        </button>
      </header>

      <main className="hero">
        <section className="hero-text">
          <span className="chip">Coming soon</span>
          <h1>
            A bold new way to tap, pay, and move faster across India.
          </h1>
          <p>
            Built for India-first experiences, from metros to growing cities.
            Simple, secure, and designed for everyday speed.
          </p>

          <form className="email-form" onSubmit={(event) => event.preventDefault()}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              aria-label="Email address"
              required
            />
            <button className="primary" type="submit">
              Get early access
            </button>
          </form>
          <div className="trust">No spam. Only launch updates.</div>

          <div className="city-row">Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Pune</div>

          <div className="stats">
            <div>
              <span className="stat-value">750M+</span>
              <span className="stat-label">smartphone users</span>
            </div>
            <div>
              <span className="stat-value">65M+</span>
              <span className="stat-label">small merchants</span>
            </div>
            <div>
              <span className="stat-value">India-first</span>
              <span className="stat-label">designed for local habits</span>
            </div>
          </div>

          <div className="highlights">
            <div className="highlight">
              <h3>Merchant-friendly</h3>
              <p>Built to respect how merchants already work.</p>
            </div>
            <div className="highlight">
              <h3>Universal access</h3>
              <p>One tap that works across major phones and wallets.</p>
            </div>
            <div className="highlight">
              <h3>Everyday trust</h3>
              <p>Clear, familiar flows that feel reliable.</p>
            </div>
          </div>
        </section>

        <section className="hero-visual" aria-hidden="true">
          <div className="orb"></div>
          <div className="hero-media">
            <img
              src="/tappay-hero.png"
              alt="TapPay tap or scan visual"
              className="hero-poster"
            />
          </div>
          <div className="ripple"></div>
        </section>
      </main>

      <footer className="footer">
        <div>TapPay is launching soon.</div>
        <div className="footer-note">Stay tuned for the official release.</div>
      </footer>
    </div>
  )
}

export default App
