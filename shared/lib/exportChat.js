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
  a.click()
  URL.revokeObjectURL(url)
}

function formatMessages(messages) {
  return messages
    .filter(m => m.content)
    .map(m => ({ role: m.role, content: m.content }))
}

export function exportTXT(messages) {
  const text = formatMessages(messages)
    .map(m => `[${m.role === 'user' ? 'Tú' : 'nutrIA'}]\n${stripMd(m.content)}`)
    .join('\n\n---\n\n')
  download(new Blob([text], { type: 'text/plain' }), 'nutria-consulta.txt')
}

export function exportMD(messages) {
  const text = formatMessages(messages)
    .map(m => `### ${m.role === 'user' ? 'Tú' : 'nutrIA'}\n\n${m.content}`)
    .join('\n\n---\n\n')
  download(new Blob([text], { type: 'text/markdown' }), 'nutria-consulta.md')
}

export function exportCSV(messages) {
  const rows = [['rol', 'mensaje']]
  formatMessages(messages).forEach(m => {
    rows.push([m.role, `"${m.content.replace(/"/g, '""')}"`])
  })
  const csv = rows.map(r => r.join(',')).join('\n')
  download(new Blob(['\uFEFF' + csv], { type: 'text/csv' }), 'nutria-consulta.csv')
}

export function exportDOC(messages) {
  const body = formatMessages(messages)
    .map(m => `<h3 style="color:${m.role === 'user' ? '#b08020' : '#007060'}">${m.role === 'user' ? 'Tú' : 'nutrIA'}</h3><p>${m.content.replace(/\n/g, '<br>')}</p><hr>`)
    .join('')
  const html = `<html><head><meta charset="utf-8"><title>Consulta nutrIA</title></head><body style="font-family:Arial;font-size:14px;max-width:800px;margin:40px auto">${body}</body></html>`
  download(new Blob([html], { type: 'application/msword' }), 'nutria-consulta.doc')
}

export function exportPDF(messages) {
  const body = formatMessages(messages)
    .map(m => `<div style="margin-bottom:20px"><strong style="color:${m.role === 'user' ? '#b08020' : '#007060'};font-size:12px;text-transform:uppercase;letter-spacing:1px">${m.role === 'user' ? 'Tú' : 'nutrIA'}</strong><p style="margin-top:6px;white-space:pre-wrap">${stripMd(m.content)}</p></div>`)
    .join('<hr style="border:none;border-top:1px solid #eee;margin:16px 0">')
  const win = window.open('', '_blank')
  win.document.write(`<html><head><title>Consulta nutrIA</title><style>body{font-family:Georgia,serif;font-size:14px;line-height:1.7;max-width:720px;margin:48px auto;color:#222}@media print{body{margin:24px}}</style></head><body><h1 style="font-size:20px;margin-bottom:32px">Consulta nutrIA</h1>${body}<script>window.onload=()=>window.print()<\/script></body></html>`)
  win.document.close()
}
