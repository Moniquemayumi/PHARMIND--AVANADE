
(() => {
  const N8N_WEBHOOK_URL = 'http://100.125.19.11:5678/webhook/chat';

  let enviandoMensagem = false;

  function obterSessionId() {
  let id = sessionStorage.getItem('pm_chat_session');
  if (!id) {
    id = 's-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem('pm_chat_session', id);
  }
  return id;
  }

  window.enviarMensagemChat = async function () {
    const input = document.getElementById('chat-input');

    if (!input) {
      console.error('Campo chat-input não encontrado.');
      return;
    }

    const texto = input.value.trim();
    if (!texto || enviandoMensagem) return;

    if (typeof window.adicionarBolhaChat !== 'function') {
      console.error('Função adicionarBolhaChat não encontrada.');
      return;
    }

    window.adicionarBolhaChat(texto, 'user');
    input.value = '';
    enviandoMensagem = true;

    let respostaRecebida = false;

    try {
      if (!N8N_WEBHOOK_URL) {
        throw new Error('URL do webhook não configurada.');
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 120000);

      let respostaHTTP;

      try {
        respostaHTTP = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: texto,
            sessionId: obterSessionId(),
            clienteId: 'C001'
          }),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!respostaHTTP.ok) {
        throw new Error(`Erro HTTP ${respostaHTTP.status}`);
      }

      const dados = await respostaHTTP.json();
      const resultado = Array.isArray(dados) ? dados[0] : dados;

      const mensagem =
        typeof resultado === 'string'
          ? resultado
          : resultado?.reply ??
              resultado?.output ??
            resultado?.response ??
            resultado?.text ??
            resultado?.message ??
            resultado?.answer;

      if (typeof mensagem !== 'string' || !mensagem.trim()) {
        throw new Error('Resposta do n8n vazia ou em formato inesperado.');
      }
      const mensagemLimpa = mensagem.trim();

      const respostaGenerica =
        'Posso orientar sobre rastreamento, trocas, produto violado, entrega e pagamento. Para comprar, use o chat de compra guiada. Não envie CPF, senha ou dados bancários aqui.';

      if (mensagemLimpa === respostaGenerica) {
        throw new Error('Resposta genérica do n8n; usando o chatbot local.');
      }
      const textoVisivel = mensagem.replace(/COMPRAR:.*$/m, '').trim() || mensagem.trim();
      window.adicionarBolhaChat(textoVisivel, 'bot');
      respostaRecebida = true;

      // Linha "COMPRAR: id:preco:qtd,id:preco:qtd" enviada pelo agente = adiciona ao carrinho do site
      const compra = mensagem.match(/COMPRAR:\s*(.+)$/m);
      if (compra && typeof window.adicionarAoCarrinho === 'function') {
        compra[1].split(',').forEach(item => {
          const [id, , qtd] = item.trim().split(':');
          const vezes = Math.min(parseInt(qtd, 10) || 1, 99);
          for (let i = 0; i < vezes; i++) window.adicionarAoCarrinho(id.trim());
        });
      }

    } catch (erro) {
      console.warn(
        'n8n indisponível. Usando o chatbot local do script.js:',
        erro
      );

      if (!respostaRecebida) {
        if (typeof window.gerarRespostaBot === 'function') {
          window.gerarRespostaBot(texto);
        } else {
          window.adicionarBolhaChat(
            'O assistente online está indisponível. Tente novamente mais tarde.',
            'bot'
          );
        }
      }
    } finally {
      enviandoMensagem = false;
    }
  };
})();

