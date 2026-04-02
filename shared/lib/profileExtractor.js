/**
 * Extracts a structured patient profile from the intake conversation.
 * Uses claude-haiku for a lightweight, fast extraction call.
 * Only fires at message milestones (8, 16, 24...) and stops once intake_complete = true.
 */
export async function extractProfileFromMessages(messages) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || messages.length < 4) return null

  const conversationText = messages
    .map((m) => `${m.role === 'user' ? 'Paciente' : 'nutrIA'}: ${m.content}`)
    .join('\n\n')

  let response
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: `Eres un extractor de datos clínicos. Lee la conversación y extrae SOLO lo que fue mencionado explícitamente.
Responde ÚNICAMENTE con JSON válido, sin texto adicional, con exactamente esta estructura:
{
  "name": null,
  "age": null,
  "sex": null,
  "weight_kg": null,
  "height_cm": null,
  "wrist_cm": null,
  "bmi": null,
  "goal": null,
  "conditions": [],
  "medications": [],
  "allergies": [],
  "activity_level": null,
  "intake_complete": false
}
Reglas:
- name: nombre del paciente si lo mencionó
- age: número entero en años
- sex: "male" o "female" si se mencionó
- weight_kg: número decimal
- height_cm: número decimal
- bmi: calculado si tienes peso y altura, null si no
- goal: objetivo principal en una oración
- conditions: array de strings (ej. ["diabetes tipo 2", "hipertensión"])
- medications: array de strings
- allergies: array de strings (alimentos)
- activity_level: uno de "sedentary" | "light" | "moderate" | "active" | "very_active"
- intake_complete: true SOLO si la conversación contiene información de los 5 tiers (antropometría + historial médico + estilo de vida + historial dietético + objetivo)
Usa null para campos sin información. Arrays vacíos si no se mencionaron.`,
        messages: [{ role: 'user', content: conversationText }],
      }),
    })
  } catch {
    return null
  }

  if (!response.ok) return null

  const data = await response.json()
  const text = data.content?.[0]?.text?.trim()
  if (!text) return null

  try {
    // Strip markdown code blocks if model wraps it
    const clean = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    return JSON.parse(clean)
  } catch {
    return null
  }
}
