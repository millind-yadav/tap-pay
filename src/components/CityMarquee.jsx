const cities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow']

export function CityMarquee() {
  // Duplicate the array for seamless loop
  const doubled = [...cities, ...cities]

  return (
    <div className="marquee-container" aria-label="Cities we serve">
      <div className="marquee-track">
        {doubled.map((city, i) => (
          <span key={i} className="marquee-item">
            {city}
            <span className="marquee-dot" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
