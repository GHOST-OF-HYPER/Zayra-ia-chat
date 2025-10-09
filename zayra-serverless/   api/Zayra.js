export default async function handler(req, res) {
  if(req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  const texto = req.body.texto || "";
  // Aqui você pode processar a imagem se quiser: req.files ou req.body.imagem
  // Exemplo simples de resposta
  const resposta = `Você disse: "${texto}" (resposta serverless)`;

  res.status(200).json({ resposta });
}
