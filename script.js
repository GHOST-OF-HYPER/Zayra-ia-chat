function responder(mensagem) {
  mensagem = mensagem.toLowerCase();

  if (mensagem.includes("oi") || mensagem.includes("olá")) {
    return "Oi! Eu sou a Zayra 😊";
  } else if (mensagem.includes("tudo bem")) {
    return "Tudo ótimo! E com você?";
  } else if (mensagem.includes("quem é você")) {
    return "Sou a Zayra, seu assistente virtual em desenvolvimento 💫";
  } else {
    return "Ainda estou aprendendo... pode repetir de outro jeito?";
  }
}
