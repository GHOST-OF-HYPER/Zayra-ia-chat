<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Zayra</title>
  <style>
    /* estilo tema escuro (mesmo do anterior) */
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #0e0e14;
      color: #f1f1f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    h1 {
      color: #9c6bff;
      text-shadow: 0 0 10px rgba(156, 107, 255, 0.6);
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    #chat-box {
      width: 90%;
      max-width: 400px;
      height: 600px;
      border: 2px solid #2a2a3b;
      border-radius: 10px;
      padding: 10px;
      background: linear-gradient(145deg, #161625, #10101b);
      overflow-y: auto;
      box-shadow: 0 0 20px rgba(156, 107, 255, 0.1);
      display: flex;
      flex-direction: column;
    }
    .mensagem {
      margin: 8px 0;
      padding: 10px 14px;
      border-radius: 10px;
      max-width: 75%;
      word-wrap: break-word;
      font-size: 15px;
      line-height: 1.4;
    }
    .usuario {
      background: linear-gradient(145deg, #3a3a80, #252552);
      align-self: flex-end;
      text-align: right;
      margin-left: auto;
      color: #d0cfff;
      box-shadow: 0 0 10px rgba(100, 100, 255, 0.3);
    }
    .zayra {
      background: linear-gradient(145deg, #26263b, #1a1a2d);
      align-self: flex-start;
      text-align: left;
      margin-right: auto;
      color: #e4dcff;
      box-shadow: 0 0 10px rgba(156, 107, 255, 0.25);
    }
    #input-area {
      display: flex;
      width: 90%;
      max-width: 400px;
      margin-top: 10px;
    }
    #mensagemInput {
      flex: 1;
      padding: 10px;
      border-radius: 10px 0 0 10px;
      border: 1px solid #2f2f46;
      outline: none;
      background-color: #1a1a28;
      color: #fff;
    }
    #mensagemInput::placeholder { color: #7a7a9e; }
    button {
      padding: 10px 20px;
      border: none;
      background: linear-gradient(145deg, #6f45ff, #5432c5);
      color: white;
      font-weight: bold;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      transition: 0.2s ease;
      box-shadow: 0 0 10px rgba(156, 107, 255, 0.3);
    }
    button:hover {
      background: linear-gradient(145deg, #7c55ff, #6640d4);
      box-shadow: 0 0 20px rgba(156, 107, 255, 0.5);
    }
  </style>
</head>
<body>
  <h1>Zayra</h1>

  <!-- Importante: apenas UM chat-box deve existir aqui -->
  <div id="chat-box" role="log" aria-live="polite"></div>

  <div id="input-area">
    <input type="text" id="mensagemInput" placeholder="Fale com a Zayra..." autocomplete="off" />
    <button id="enviarBtn">Enviar</button>
  </div>

  <!-- Inclui apenas UMA vez o script -->
  <script src="script.js"></script>
</body>
</html>
