export default function handler(req, res) {
  if (req.method === "POST") {
    const { mensagem } = req.body;

    let resposta = "Ainda estou aprendendo...";

    if (mensagem) {
      const msg = mensagem.toLowerCase();
      if(msg.includes("oi") || msg.includes("olá")) resposta = "Oi! Eu sou a Zayra 😊";
      else if(msg.includes("tudo bem")) resposta = "Tudo ótimo! E com você?";
      else if(msg.includes("quem é você")) resposta = "Sou a Zayra, seu assistente virtual em desenvolvimento 💫";
    }

    res.status(200).json({ resposta });
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
