import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export function MealPlanSection({ mealPlan = null }) {
  const [expandedDay, setExpandedDay] = useState(null)

  if (!mealPlan) {
    return (
      <section className="px-6 py-8">
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 16 }}>
          Plan de Comidas
        </h3>
        <p style={{ color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
          Tu plan semanal aparecerá aquí después de tu consulta.
        </p>
      </section>
    )
  }

  return (
    <section className="px-6 py-8">
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--text-primary)', marginBottom: 20 }}>
        Plan de Comidas
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px" style={{ backgroundColor: 'rgba(0,229,196,0.15)' }} />

        <div className="flex flex-col gap-2 pl-10">
          {DAYS.map((day, i) => {
            const dayData = mealPlan[i]
            const isExpanded = expandedDay === i
            return (
              <div key={day}>
                {/* Timeline node */}
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: 10,
                    marginTop: 14,
                    backgroundColor: isExpanded ? 'var(--accent-teal)' : 'rgba(0,229,196,0.3)',
                    border: '2px solid var(--bg-deep)',
                    top: `${i * 52}px`,
                  }}
                />
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : i)}
                  className="w-full rounded-xl px-4 py-3 text-left transition-colors"
                  style={{
                    backgroundColor: isExpanded ? 'rgba(0,229,196,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isExpanded ? 'rgba(0,229,196,0.2)' : 'rgba(255,255,255,0.05)'}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'var(--text-primary)' }}>{day}</span>
                    {dayData && (
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>
                        {dayData.calories} kcal
                      </span>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && dayData && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-3 space-y-2">
                        {dayData.meals?.map((meal, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: "'DM Mono', monospace", minWidth: 60 }}>
                              {meal.time}
                            </span>
                            <p style={{ fontSize: 12, color: 'var(--text-primary)', fontFamily: "'DM Mono', monospace" }}>
                              {meal.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
