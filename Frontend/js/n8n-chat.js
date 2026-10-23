
(() => {
  // SUBSTITUA pela URL do Webhook do seu workflow n8n.
  const N8N_WEBHOOK_URL = 'http://100.125.19.11:5678/webhook/chat';

  window.enviarMensagemChat = async function () {
    const input = document.getElementById('chat-input');

    if (!input) {
      console.error('Campo chat-input não encontrado.');
      return;
    }

    const texto = input.value.trim();

    if (!texto) return;

    if (typeof window.adicionarBolhaChat !== 'function') {
      console.error('Função adicionarBolhaChat não encontrada.');
      return;
    }

    window.adicionarBolhaChat(texto, 'user');
    input.value = '';

    try {
      if (
        !N8N_WEBHOOK_URL ||
        N8N_WEBHOOK_URL === 'COLE_AQUI_A_URL_DO_WEBHOOK'
      ) {
        throw new Error('Configure a URL do Webhook do n8n.');
      }

      const respostaHTTP = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: texto
        })
      });

      if (!respostaHTTP.ok) {
        throw new Error(`Erro HTTP ${respostaHTTP.status}`);
      }

      const dados = await respostaHTTP.json();

      const resultado = Array.isArray(dados) ? dados[0] : dados;

      const mensagem =
        typeof resultado === 'string'
          ? resultado
          : resultado?.output ??
            resultado?.response ??
            resultado?.text ??
            resultado?.message ??
            resultado?.answer;

      if (typeof mensagem !== 'string' || !mensagem.trim()) {
        throw new Error(
          'O n8n respondeu, mas não foi encontrado um texto de resposta.'
        );
      }

      window.adicionarBolhaChat(mensagem.trim(), 'bot');

    } catch (erro) {
      console.error('Falha na comunicação com o n8n:', erro);

      if (typeof window.gerarRespostaBot === 'function') {
        window.gerarRespostaBot(texto);
      } else {
        window.adicionarBolhaChat(
          'Não consegui consultar o assistente agora. Tente novamente.',
          'bot'
        );
      }
    }
  };
})();
