import { useState } from 'react'
import { motion } from 'framer-motion'

export function ProfileSection({ profile = {} }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(profile.name || 'Paciente')
  const [age, setAge] = useState(profile.age || '')
  const [weight, setWeight] = useState(profile.weight || '')
  const [height, setHeight] = useState(profile.height || '')

  const stats = [
    { label: 'Edad', value: age, unit: 'años' },
    { label: 'Peso', value: weight, unit: 'kg' },
    { label: 'Talla', value: height, unit: 'cm' },
  ]

  return (
    <section className="px-6 py-8">
      <div className="flex items-start justify-between mb-6">
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg px-3 py-1 text-2xl outline-none"
            style={{
              backgroundColor: 'rgba(0,229,196,0.08)',
              border: '1px solid rgba(0,229,196,0.3)',
              color: 'var(--text-primary)',
              fontFamily: "'Playfair Display', serif",
            }}
            autoFocus
          />
        ) : (
          <h2
            onClick={() => setEditing(true)}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            {name}
          </h2>
        )}
        <button
          onClick={() => setEditing((v) => !v)}
          style={{ color: 'var(--accent-teal)', fontFamily: "'DM Mono', monospace", fontSize: 12 }}
          className="hover:opacity-70"
        >
          {editing ? 'guardar' : 'editar'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl p-4" style={{ backgroundColor: 'rgba(0,229,196,0.04)', border: '1px solid rgba(0,229,196,0.08)' }}>
            {editing ? (
              <input
                value={s.value}
                onChange={(e) => {
                  if (s.label === 'Edad') setAge(e.target.value)
                  if (s.label === 'Peso') setWeight(e.target.value)
                  if (s.label === 'Talla') setHeight(e.target.value)
                }}
                className="w-full rounded px-2 py-1 outline-none text-2xl font-bold"
                style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', fontFamily: "'DM Mono', monospace" }}
              />
            ) : (
              <p style={{ fontSize: 28, fontFamily: "'DM Mono', monospace", color: 'var(--text-primary)', fontWeight: 600 }}>
                {s.value || '—'}
              </p>
            )}
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
              {s.unit} · {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
