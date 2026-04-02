export function ProgressSection({ progress = null }) {
  if (!progress || progress.entries.length === 0) {
    return (
      <section className="px-6 py-8 pb-20">
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 16 }}>
          Progreso
        </h3>
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-4"
          style={{ border: '1px dashed rgba(0,229,196,0.2)', backgroundColor: 'rgba(0,229,196,0.02)' }}
        >
          <p style={{ fontSize: 40 }}>🦦</p>
          <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13, textAlign: 'center' }}>
            Registra tu primera semana para ver tu tendencia de progreso.
          </p>
        </div>
      </section>
    )
  }

  const latest = progress.entries[progress.entries.length - 1]
  const first = progress.entries[0]
  const delta = (latest.weight - first.weight).toFixed(1)
  const isLoss = delta < 0

  // Simple sparkline path
  const values = progress.entries.map((e) => e.weight)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 200
    const y = 40 - ((v - min) / range) * 35
    return `${x},${y}`
  }).join(' ')

  return (
    <section className="px-6 py-8 pb-20">
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 16 }}>
        Progreso
      </h3>

      <div className="flex items-end gap-4 mb-6">
        <p style={{ fontSize: 56, fontFamily: "'DM Mono', monospace", color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1 }}>
          {latest.weight}
        </p>
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", color: isLoss ? 'var(--accent-teal)' : '#fb923c', fontSize: 18 }}>
            {isLoss ? '▼' : '▲'} {Math.abs(delta)} kg
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", color: 'var(--text-muted)', fontSize: 11 }}>desde el inicio</p>
        </div>
      </div>

      <svg width="100%" viewBox="0 0 200 50" preserveAspectRatio="none" style={{ height: 50 }}>
        <polyline
          points={points}
          fill="none"
          stroke="var(--accent-teal)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </section>
  )
}
