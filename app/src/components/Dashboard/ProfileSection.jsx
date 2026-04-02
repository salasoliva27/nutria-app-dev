import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useProfile } from '@shared/hooks/useProfile.js'

const ACTIVITY_LABELS = {
  sedentary: 'Sedentario',
  light: 'Ligero',
  moderate: 'Moderado',
  active: 'Activo',
  very_active: 'Muy activo',
}

export function ProfileSection({ userId }) {
  const { profile, loading, saveProfile } = useProfile(userId)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '',
    age: '',
    weight_kg: '',
    height_cm: '',
    goal: '',
  })

  // Sync form when profile loads from Supabase
  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        age: profile.age || '',
        weight_kg: profile.weight_kg || '',
        height_cm: profile.height_cm || '',
        goal: profile.goal || '',
      })
    }
  }, [profile])

  async function handleSave() {
    setSaving(true)
    await saveProfile({
      name: form.name || null,
      age: form.age ? parseInt(form.age, 10) : null,
      weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
      height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
      goal: form.goal || null,
    })
    setSaving(false)
    setEditing(false)
  }

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const displayName = profile?.name || form.name || 'Paciente'
  const bmi = profile?.bmi
    ? profile.bmi.toFixed(1)
    : profile?.weight_kg && profile?.height_cm
      ? ((profile.weight_kg / ((profile.height_cm / 100) ** 2)).toFixed(1))
      : null

  const stats = [
    { label: 'Edad', value: profile?.age, unit: 'años', field: 'age' },
    { label: 'Peso', value: profile?.weight_kg, unit: 'kg', field: 'weight_kg' },
    { label: 'Talla', value: profile?.height_cm, unit: 'cm', field: 'height_cm' },
  ]

  if (loading) {
    return (
      <section className="px-6 py-8 flex items-center justify-center" style={{ minHeight: 160 }}>
        <div className="h-5 w-5 rounded-full border-2 animate-spin" style={{ borderColor: 'var(--accent-teal)', borderTopColor: 'transparent' }} />
      </section>
    )
  }

  return (
    <section className="px-6 py-8">
      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        {editing ? (
          <input
            value={form.name}
            onChange={set('name')}
            placeholder="Nombre del paciente"
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
          <div className="flex flex-col gap-1">
            <h2
              onClick={() => setEditing(true)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--text-primary)', cursor: 'pointer' }}
            >
              {displayName}
            </h2>
            {profile?.intake_complete && (
              <span style={{ fontSize: 10, color: 'var(--accent-teal)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em' }}>
                INTAKE COMPLETADO
              </span>
            )}
          </div>
        )}
        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          disabled={saving}
          style={{ color: 'var(--accent-teal)', fontFamily: "'DM Mono', monospace", fontSize: 12 }}
          className="hover:opacity-70 disabled:opacity-40"
        >
          {saving ? 'guardando…' : editing ? 'guardar' : 'editar'}
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4"
            style={{ backgroundColor: 'rgba(0,229,196,0.04)', border: '1px solid rgba(0,229,196,0.08)' }}
          >
            {editing ? (
              <input
                value={form[s.field]}
                onChange={set(s.field)}
                placeholder="—"
                className="w-full rounded px-2 py-1 outline-none text-2xl font-bold"
                style={{ backgroundColor: 'transparent', color: 'var(--text-primary)', fontFamily: "'DM Mono', monospace" }}
              />
            ) : (
              <p style={{ fontSize: 28, fontFamily: "'DM Mono', monospace", color: 'var(--text-primary)', fontWeight: 600 }}>
                {s.value ?? '—'}
              </p>
            )}
            <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
              {s.unit} · {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* BMI badge */}
      {bmi && !editing && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ backgroundColor: 'rgba(0,229,196,0.08)', border: '1px solid rgba(0,229,196,0.15)' }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'var(--accent-teal)', fontWeight: 600 }}>
            BMI {bmi}
          </span>
        </motion.div>
      )}

      {/* Goal */}
      {(profile?.goal || editing) && (
        <div
          className="rounded-xl p-4 mt-2"
          style={{ backgroundColor: 'rgba(0,229,196,0.04)', border: '1px solid rgba(0,229,196,0.08)' }}
        >
          <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>
            OBJETIVO
          </p>
          {editing ? (
            <textarea
              value={form.goal}
              onChange={set('goal')}
              placeholder="Meta principal del paciente…"
              rows={2}
              className="w-full outline-none resize-none"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
              }}
            />
          ) : (
            <p style={{ color: 'var(--text-primary)', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              {profile?.goal}
            </p>
          )}
        </div>
      )}

      {/* Conditions / Medications / Allergies — shown only when present */}
      {!editing && (profile?.conditions?.length > 0 || profile?.medications?.length > 0 || profile?.allergies?.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.conditions?.map((c) => (
            <Tag key={c} label={c} color="rgba(255,120,100,0.15)" border="rgba(255,120,100,0.3)" />
          ))}
          {profile.medications?.map((m) => (
            <Tag key={m} label={m} color="rgba(100,160,255,0.1)" border="rgba(100,160,255,0.25)" />
          ))}
          {profile.allergies?.map((a) => (
            <Tag key={a} label={`⚠ ${a}`} color="rgba(255,200,50,0.1)" border="rgba(255,200,50,0.25)" />
          ))}
        </div>
      )}

      {/* Activity level */}
      {!editing && profile?.activity_level && (
        <p style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace" }}>
          Actividad · {ACTIVITY_LABELS[profile.activity_level] ?? profile.activity_level}
        </p>
      )}

      {/* Empty state nudge */}
      {!profile && !editing && !loading && (
        <p
          onClick={() => setEditing(true)}
          style={{ marginTop: 8, fontSize: 13, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", cursor: 'pointer' }}
        >
          Habla con nutrIA para completar tu perfil →
        </p>
      )}
    </section>
  )
}

function Tag({ label, color, border }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs"
      style={{
        backgroundColor: color,
        border: `1px solid ${border}`,
        color: 'var(--text-primary)',
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
      }}
    >
      {label}
    </span>
  )
}
