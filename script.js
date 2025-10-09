// ----------------------
// Função para criar mensagens no chat
// ----------------------
function criarMensagem(texto, tipo, imagemURL = null) {
  const chatBox = document.getElementById("chat-box");

  const mensagem = document.createElement("div");
  mensagem.classList.add("mensagem", tipo);

  if (imagemURL) {
    const img = document.createElement("img");
    img.src = imagemURL;
    img.style.maxWidth = "70%";
    img.style.maxHeight = "250px";
    img.style.borderRadius = "12px";
    img.style.objectFit = "contain";
    img.style.display = "block";
    img.style.marginTop = texto ? "6px" : "0";
    mensagem.appendChild(img);
  }

  if (texto) {
    const textoElem = document.createElement("div");
    textoElem.classList.add("msg-text");
    textoElem.textContent = texto;
    mensagem.appendChild(textoElem);
  }

  const meta = document.createElement("div");
  meta.classList.add("msg-meta");
  const agora = new Date();
  meta.textContent = agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  mensagem.appendChild(meta);

  chatBox.appendChild(mensagem);

  // Scroll automático
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ----------------------
// Função para mostrar aviso flutuante
// ----------------------
function mostrarAviso(texto) {
  const aviso = document.createElement("div");
  aviso.classList.add("float-msg");
  aviso.textContent = texto;
  document.body.appendChild(aviso);
  setTimeout(() => aviso.remove(), 2000);
  aviso.classList.add("show");
}

// ----------------------
// Função enviar mensagem
// ----------------------
async function enviarMensagem() {
  const input = document.getElementById("mensagemInput");
  const texto = input.value.trim();
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!texto && !file) return;

  // Mensagem do usuário
  criarMensagem(texto, "usuario", file ? URL.createObjectURL(file) : null);

  input.value = "";
  fileInput.value = "";
  document.getElementById("selectedFile").textContent = "";

  // Mostrar "digitando" Zayra
  const chatBox = document.getElementById("chat-box");
  const typing = document.createElement("div");
  typing.classList.add("mensagem", "zayra-typing");
  typing.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Espera para simular "digitando"
  await new Promise(r => setTimeout(r, 500));

  let resposta = "";

  try {
    const body = { texto };

    if (file) {
      // Converte imagem para base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise(resolve => {
        reader.onload = () => {
          body.imagemBase64 = reader.result.split(",")[1]; // remove o prefixo data:image
          resolve();
        };
      });
    }

    // Chamada ao endpoint serverless
    const res = await fetch("/api/zayra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    resposta = data.resposta;

  } catch (err) {
    resposta = "Ops, ocorreu um erro na comunicação com o servidor 😢";
  }

  typing.remove();
  criarMensagem(resposta, "zayra");
}

// ----------------------
// Botões e eventos
// ----------------------
document.getElementById("sendBtn").addEventListener("click", enviarMensagem);
document.getElementById("mensagemInput").addEventListener("keypress", e => {
  if (e.key === "Enter") enviarMensagem();
});

// Seleção de imagens
const imageBtn = document.getElementById("imageBtn");
const imageInput = document.getElementById("imageInput");
const selectedFile = document.getElementById("selectedFile");

imageBtn.addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", () => {
  if (imageInput.files[0]) {
    selectedFile.textContent = imageInput.files[0].name;
  } else {
    selectedFile.textContent = "";
  }
});

// Resetar chat
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("chat-box").innerHTML = "";
  mostrarAviso("Chat resetado!");
});

// Ajuda
document.getElementById("ajudaBtn").addEventListener("click", () => {
  mostrarAviso("Digite algo para conversar com a Zayra ou envie uma imagem.");
});

// Botão "ir para o fim"
const goBottomBtn = document.getElementById("goBottomBtn");
const chatBox = document.getElementById("chat-box");

chatBox.addEventListener("scroll", () => {
  if (chatBox.scrollTop + chatBox.clientHeight < chatBox.scrollHeight - 20) {
    goBottomBtn.style.display = "block";
  } else {
    goBottomBtn.style.display = "none";
  }
});

goBottomBtn.addEventListener("click", () => {
  chatBox.scrollTop = chatBox.scrollHeight;
});
