// proteção contra múltiplas inicializações
if (!window.zayraInitialized) {
  window.zayraInitialized = true;

  // --- função responder (sua lógica) ---
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

  // --- remover duplicatas acidentais de elementos (se existirem) ---
  (function cleanupDuplicates() {
    // mantém apenas o primeiro #chat-box e remove os demais
    const chatBoxes = document.querySelectorAll('#chat-box');
    if (chatBoxes.length > 1) {
      for (let i = 1; i < chatBoxes.length; i++) {
        chatBoxes[i].remove();
      }
    }
    // mantém apenas o primeiro #input-area
    const inputs = document.querySelectorAll('#input-area');
    if (inputs.length > 1) {
      for (let i = 1; i < inputs.length; i++) {
        inputs[i].remove();
      }
    }
  })();

  // --- sistema de chat ---
  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("mensagemInput");
  const btn = document.getElementById("enviarBtn");

  // se algum elemento essencial não existir, aborta com leve aviso
  if (!chatBox || !input || !btn) {
    console.warn("Elementos do chat não encontrados. Verifique o HTML.");
  } else {
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
      // efeito de digitação simples (pouco atraso)
      setTimeout(() => adicionarMensagem(resposta, "zayra"), 500);
      input.value = "";
      input.focus();
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        btn.click();
      }
    });
  }
        }
