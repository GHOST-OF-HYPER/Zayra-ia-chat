// backend/server.js
import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// memória simples de conversa
const sessions = new Map()

async function callLLM(messages) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages
    })
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content || "Erro: sem resposta"
}

app.post("/api/chat", async (req, res) => {
  try {
    const { sessionId, message } = req.body
    if (!sessionId || !message) {
      return res.status(400).json({ error: "sessionId e message são obrigatórios" })
    }

    const base = sessions.get(sessionId) || [
      { role: "system", content: "Você é Zayra, assistente oficial do Zyron Protocol. Responda com clareza e personalidade." }
    ]

    base.push({ role: "user", content: message })
    const reply = await callLLM(base)
    base.push({ role: "assistant", content: reply })
    sessions.set(sessionId, base)

    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro interno" })
  }
})

app.listen(PORT, () => console.log(`Servidor da Zayra rodando na porta ${PORT}`))
