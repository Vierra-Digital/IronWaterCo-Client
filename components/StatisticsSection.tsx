'use client'

export default function StatisticsSection() {
  const stats = [
    { number: '60+', label: 'Years of Combined Experience' },
    { number: '10,000+', label: 'Successful Projects' },
    { number: '500+', label: 'Satisfied Clients' },
    { number: '7/7', label: 'Showroom Open Days' },
  ]

  return (
    <section id="stats" className="statistics-section">
      <div className="container">
        <p className="section-subtitle">Numbers That Matter</p>
        <h2 className="section-title">Statistics</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
