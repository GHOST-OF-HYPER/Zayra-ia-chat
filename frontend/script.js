const chat = document.getElementById('chat')
const form = document.getElementById('form')
const input = document.getElementById('input')
const sessionId = Date.now().toString()

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return

  append('Você', text)
  input.value = ''

  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message: text })
  })
  const data = await res.json()
  append('Zayra', data.reply)
})

function append(who, text) {
  const el = document.createElement('div')
  el.textContent = `${who}: ${text}`
  chat.appendChild(el)
}
