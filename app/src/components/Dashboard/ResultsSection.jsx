export function ResultsSection({ results = null }) {
  if (!results) {
    return (
      <section className="px-6 py-8">
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 16 }}>
          Resultados
        </h3>
        <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
          Completa tu consulta con nutrIA para ver tus métricas calculadas.
        </p>
      </section>
    )
  }

  const macros = [
    { label: 'Calorías', value: results.calories, unit: 'kcal', color: 'var(--accent-warm)' },
    { label: 'Proteína', value: results.protein, unit: 'g', color: 'var(--accent-teal)' },
    { label: 'Carbos', value: results.carbs, unit: 'g', color: '#a78bfa' },
    { label: 'Grasas', value: results.fat, unit: 'g', color: '#fb923c' },
  ]

  return (
    <section className="px-6 py-8">
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 16 }}>
        Resultados
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {macros.map((m) => (
          <div key={m.label} className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ fontSize: 32, fontFamily: "'DM Mono', monospace", color: m.color, fontWeight: 600 }}>{m.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace" }}>{m.unit} · {m.label}</p>
          </div>
        ))}
      </div>

      {results.flags && results.flags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {results.flags.map((flag) => (
            <span
              key={flag}
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: 'rgba(255,107,107,0.1)',
                border: '1px solid rgba(255,107,107,0.3)',
                color: '#ff6b6b',
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
              }}
            >
              ⚑ {flag}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
