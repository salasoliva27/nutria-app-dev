// Strip markdown to plain text
function stripMd(text) {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
    .replace(/\|.+\|/g, (row) => row.split('|').filter(Boolean).map(c => c.trim()).join('\t'))
    .replace(/^[-*]\s+/gm, '• ')
    .replace(/^\d+\.\s+/gm, (m) => m)
    .trim()
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  // Append to body, click, then remove — avoids popup blocker
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function formatMessages(messages) {
  return messages
    .filter(m => m.content && (m.role === 'user' || m.role === 'assistant'))
    .map(m => ({ role: m.role, content: m.content }))
}

export function exportTXT(messages) {
  const text = formatMessages(messages)
    .map(m => `[${m.role === 'user' ? 'Tú' : 'nutrIA'}]\n${stripMd(m.content)}`)
    .join('\n\n---\n\n')
  download(new Blob([text], { type: 'text/plain;charset=utf-8' }), 'nutria-consulta.txt')
}

export function exportMD(messages) {
  const text = formatMessages(messages)
    .map(m => `### ${m.role === 'user' ? 'Tú' : 'nutrIA'}\n\n${m.content}`)
    .join('\n\n---\n\n')
  download(new Blob([text], { type: 'text/markdown;charset=utf-8' }), 'nutria-consulta.md')
}

export function exportCSV(messages) {
  const rows = [['rol', 'mensaje']]
  formatMessages(messages).forEach(m => {
    rows.push([m.role, `"${m.content.replace(/"/g, '""')}"`])
  })
  const csv = rows.map(r => r.join(',')).join('\n')
  download(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }), 'nutria-consulta.csv')
}

export function exportDOC(messages) {
  const body = formatMessages(messages)
    .map(m => `<h3 style="color:${m.role === 'user' ? '#b08020' : '#007060'};font-size:14px;margin-bottom:4px">${m.role === 'user' ? 'Tú' : 'nutrIA'}</h3><p style="margin:0 0 8px;white-space:pre-wrap">${m.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g, '<br>')}</p><hr style="border:none;border-top:1px solid #ddd;margin:12px 0">`)
    .join('')
  const html = `<html><head><meta charset="utf-8"><title>Consulta nutrIA</title></head><body style="font-family:Arial;font-size:14px;max-width:800px;margin:40px auto">${body}</body></html>`
  download(new Blob([html], { type: 'application/msword' }), 'nutria-consulta.doc')
}

// PDF: downloads a print-ready HTML file — user opens it and prints/saves as PDF via browser
// This avoids popup blockers that block window.open()
export function exportPDF(messages) {
  const body = formatMessages(messages)
    .map(m => `
      <div class="message">
        <div class="role ${m.role === 'user' ? 'user' : 'nutria'}">${m.role === 'user' ? 'Tú' : 'nutrIA'}</div>
        <div class="content">${stripMd(m.content).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>
      </div>`)
    .join('')

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Consulta nutrIA</title>
  <style>
    body { font-family: Georgia, serif; font-size: 13px; line-height: 1.7; max-width: 680px; margin: 48px auto; color: #1a1a1a; }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #0a5e50; }
    .date { font-size: 11px; color: #666; margin-bottom: 36px; font-family: monospace; }
    .message { margin-bottom: 20px; }
    .role { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
    .role.user { color: #8a6010; }
    .role.nutria { color: #0a5e50; }
    .content { white-space: pre-wrap; padding-bottom: 12px; border-bottom: 1px solid #eee; }
    @media print { body { margin: 24px; } @page { margin: 2cm; } }
  </style>
</head>
<body>
  <h1>Consulta nutrIA</h1>
  <p class="date">${new Date().toLocaleDateString('es-MX', { year:'numeric', month:'long', day:'numeric' })}</p>
  ${body}
  <script>window.onload = () => window.print()</script>
</body>
</html>`

  download(new Blob([html], { type: 'text/html;charset=utf-8' }), 'nutria-consulta.html')
}
