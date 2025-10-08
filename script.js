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

// --- Sistema de chat ---
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("mensagemInput");
const btn = document.getElementById("enviarBtn");

function adicionarMensagem(texto, classe) {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", classe);
  msg.textContent = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

btn.addEventListener("click", () => {
  const mensagem = input.value.trim();
  if (mensagem === "") return;

  adicionarMensagem(mensagem, "usuario");
  const resposta = responder(mensagem);
  setTimeout(() => adicionarMensagem(resposta, "zayra"), 500);

  input.value = "";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
