// /api/zayra.js
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb', // limite para upload de imagens
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { texto, imagemBase64 } = req.body;

    // Simulação de processamento
    let resposta = "";

    if (texto) {
      const msg = texto.toLowerCase();
      if (msg.includes("oi") || msg.includes("olá")) resposta = "Oi! Eu sou a Zayra 😊";
      else if (msg.includes("tudo bem")) resposta = "Tudo ótimo! E com você?";
      else if (msg.includes("quem é você")) resposta = "Sou a Zayra, seu assistente virtual em desenvolvimento 💫";
      else resposta = "Ainda estou aprendendo... pode repetir de outro jeito?";
    } else if (imagemBase64) {
      resposta = "Recebi sua imagem! (Em breve posso analisar 😎)";
    } else {
      resposta = "Não recebi nada para responder...";
    }

    res.status(200).json({ resposta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}
