// ======== Variáveis principais ========
const chatBox = document.getElementById("chat-box");
const mensagemInput = document.getElementById("mensagemInput");
const sendBtn = document.getElementById("sendBtn");
const imageBtn = document.getElementById("imageBtn");
const imageInput = document.getElementById("imageInput");
const selectedFile = document.getElementById("selectedFile");
const resetBtn = document.getElementById("resetBtn");
const ajudaBtn = document.getElementById("ajudaBtn");
const goBottomBtn = document.getElementById("goBottomBtn");

// ======== Função para scroll automático ========
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ======== Função para criar mensagens no chat ========
function criarMensagem(texto, tipo="zayra", meta="") {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", tipo);

  const msgText = document.createElement("div");
  msgText.classList.add("msg-text");
  msgText.textContent = texto;
  msg.appendChild(msgText);

  if(meta) {
    const msgMeta = document.createElement("div");
    msgMeta.classList.add("msg-meta");
    msgMeta.textContent = meta;
    msg.appendChild(msgMeta);
  }

  chatBox.appendChild(msg);
  scrollToBottom();
}

// ======== Função typing animation ========
function showTypingAnimation() {
  const typing = document.createElement("div");
  typing.classList.add("zayra-typing");

  for(let i=0;i<3;i++){
    const dot = document.createElement("div");
    dot.classList.add("dot");
    typing.appendChild(dot);
  }

  chatBox.appendChild(typing);
  scrollToBottom();
  return typing;
}

// ======== Função de resposta local (fallback) ========
function responderLocal(mensagem) {
  mensagem = mensagem.toLowerCase();
  if (mensagem.includes("oi") || mensagem.includes("olá")) return "Oi! Eu sou a Zayra 😊";
  if (mensagem.includes("tudo bem")) return "Tudo ótimo! E com você?";
  if (mensagem.includes("quem é você")) return "Sou a Zayra, seu assistente virtual em desenvolvimento 💫";
  return "Ainda estou aprendendo... pode repetir de outro jeito?";
}

// ======== Função para enviar mensagem ========
async function enviarMensagem(texto) {
  if(!texto.trim()) return;

  criarMensagem(texto, "usuario");
  mensagemInput.value = "";

  const typing = showTypingAnimation();

  try {
    // Aqui você conecta com serverless (descomente quando tiver o endpoint)
    /*
    const res = await fetch("https://seu-backend/responder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: texto })
    });
    const data = await res.json();
    */
    const data = { resposta: responderLocal(texto) }; // fallback local
    typing.remove();
    criarMensagem(data.resposta, "zayra");
  } catch (err) {
    typing.remove();
    criarMensagem("Erro ao conectar com servidor.", "zayra");
    console.error(err);
  }
}

// ======== Eventos ========
sendBtn.addEventListener("click", () => enviarMensagem(mensagemInput.value));
mensagemInput.addEventListener("keypress", e => { if(e.key==="Enter") enviarMensagem(mensagemInput.value) });

// ======== Upload de imagens ========
imageBtn.addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if(file){
    selectedFile.textContent = file.name;

    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "70%";
      img.style.borderRadius = "12px";
      img.style.margin = "6px 0";
      criarMensagem("", "usuario"); // balão vazio para imagem
      const lastMsg = chatBox.lastChild;
      lastMsg.appendChild(img);
      scrollToBottom();
    };
    reader.readAsDataURL(file);
  }
});

// ======== Botões de reset e ajuda ========
function showFloatingMsg(texto){
  const aviso = document.createElement("div");
  aviso.textContent = texto;
  aviso.style.position = "fixed";
  aviso.style.top = "50%";
  aviso.style.left = "50%";
  aviso.style.transform = "translate(-50%,-50%)";
  aviso.style.padding = "12px 18px";
  aviso.style.background = "rgba(0,0,0,0.5)";
  aviso.style.color = "#fff";
  aviso.style.borderRadius = "12px";
  aviso.style.zIndex = "9999";
  aviso.style.fontSize = "14px";
  document.body.appendChild(aviso);

  setTimeout(()=>aviso.remove(),1500);
}

resetBtn.addEventListener("click", () => {
  chatBox.innerHTML = "";
  showFloatingMsg("Chat resetado!");
});

ajudaBtn.addEventListener("click", () => {
  showFloatingMsg("Dica: Digite uma mensagem e clique em Enviar. Pode enviar imagens também!");
});

// ======== Botão "go to bottom" ========
chatBox.addEventListener("scroll", () => {
  if(chatBox.scrollTop + chatBox.clientHeight < chatBox.scrollHeight - 10){
    goBottomBtn.style.display = "block";
  } else {
    goBottomBtn.style.display = "none";
  }
});
goBottomBtn.addEventListener("click", scrollToBottom);

// ======== Inicialização ========
mensagemInput.focus();
