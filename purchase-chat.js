/* Assistente de compra guiada: respostas locais, sem serviço de IA generativa. */
window.PMChat = (() => {
  let messages = [];
  let recognition = null;
  let lastReply = '';
  let step = 'produtos';
  let autoRead = false;
  let cepDraft = null;
  let simpleMode = false;
  let lastProductTerm = null;
  let productOffset = 0;
  try { simpleMode = localStorage.getItem('pm_simple_purchase') === 'true'; } catch {}
  const names = { pix: 'Pix', card: 'Cartão de crédito', boleto: 'Boleto bancário', pbm: 'Convênio / PBM' };
  const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const byId = id => document.getElementById(id);
  const totals = () => {
    const subtotal = obterSubtotalCarrinho();
    const shipping = subtotal === 0 || subtotal >= 99 ? 0 : 9.90;
    return { subtotal, shipping, total: subtotal + shipping };
  };
  function save() {
    try {
      purchaseStorage.setItem('pm_guided_chat', JSON.stringify({ messages: messages.slice(-60), step, cepDraft }));
      purchaseStorage.setItem('pm_cart', JSON.stringify(appState.carrinho));
      purchaseStorage.setItem('pm_cep', appState.usuario.cep);
      purchaseStorage.setItem('pm_payment', appState.formaPagamentoSelecionada);
    } catch {}
  }
  function restore() {
    try {
      const saved = JSON.parse(purchaseStorage.getItem('pm_guided_chat'));
      if (saved && Array.isArray(saved.messages)) {
        if (typeof saved.cepDraft === 'string') cepDraft = saved.cepDraft.slice(0, 9);
        messages = saved.messages.filter(message => ['bot', 'user'].includes(message.role) && typeof message.text === 'string').slice(-60);
        if (['produtos', 'entrega', 'pagamento', 'revisao', 'concluido'].includes(saved.step)) step = saved.step;
      }
    } catch {}
  }
  function speak(text) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { status('Este navegador não oferece leitura em voz alta. Todas as orientações estão disponíveis em texto.'); return; }
    try {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR'; utterance.rate = 0.9;
      const voice = window.speechSynthesis.getVoices?.().find(voice => /^pt[-_]BR$/i.test(voice.lang));
      if (voice) utterance.voice = voice;
      utterance.onerror = event => {
        if (!['interrupted', 'canceled'].includes(event.error)) status('Não foi possível ler a resposta. Você pode acompanhar pelo texto.');
      };
      window.speechSynthesis.resume?.();
      window.speechSynthesis.speak(utterance);
    } catch { status('Não foi possível ativar a voz. As mensagens continuam disponíveis em texto.'); }
  }
  function stopSpeaking() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  function status(text) { if (byId('guided-status')) byId('guided-status').textContent = text; }
  function clearNotice() {
    if (!byId('guided-notice')) return;
    byId('guided-notice').hidden = true;
    byId('guided-notice-announcement').replaceChildren();
    byId('guided-input').removeAttribute('aria-invalid');
    byId('guided-input').setAttribute('aria-describedby', 'guided-voice-help');
  }
  function notice(text, actionLabel, target, urgent = true) {
    const card = byId('guided-notice');
    card.hidden = false;
    byId('guided-notice-text').textContent = text;
    const action = byId('guided-notice-action');
    action.textContent = actionLabel;
    action.onclick = () => {
      const destination = target();
      destination?.focus({ preventScroll: true });
      destination?.scrollIntoView({ block: 'nearest' });
    };
    byId('guided-notice-announcement').setAttribute('role', urgent ? 'alert' : 'status');
    byId('guided-notice-announcement').replaceChildren(document.createTextNode(`Para continuar: ${text}`));
    byId('guided-input').setAttribute('aria-describedby', 'guided-voice-help guided-notice-text');
    status('');
    const reveal = () => {
      if (card.hidden) return;
      if (!urgent) byId('guided-notice-title').focus({ preventScroll: true });
      const shell = card.closest?.('.guided-shell');
      if (shell?.getBoundingClientRect && shell.scrollTo) {
        const summary = shell.querySelector('.guided-quick-summary');
        const sticky = summary && window.getComputedStyle(summary).position === 'sticky';
        const offset = sticky ? summary.getBoundingClientRect().height : 0;
        const top = shell.scrollTop + card.getBoundingClientRect().top - shell.getBoundingClientRect().top - shell.clientTop - offset - 16;
        shell.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      } else {
        card.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    };
    // Aguarda o card ocupar espaço antes de medir; rola somente a área da conversa.
    if (window.requestAnimationFrame) window.requestAnimationFrame(reveal);
    else reveal();
    if (autoRead) speak(text);
  }
  function explainNextAction(urgent = true) {
    const input = () => byId('guided-input');
    const firstAction = () => byId('guided-actions').querySelector('button');
    if (step === 'pagamento') {
      notice('Você está na etapa de pagamento. Escolha Pix, cartão, boleto ou convênio nos botões da etapa, ou digite a opção e depois toque em Enviar. Enviar sozinho não confirma o pagamento.', 'Ir para as formas de pagamento', firstAction, urgent);
    } else if (step === 'entrega') {
      notice('Antes de escolher o pagamento, confira seu CEP e use o botão “Confirmar CEP e escolher pagamento”. Para conversar, digite uma mensagem antes de enviar.', 'Ir para o CEP', () => byId('guided-cep'), urgent);
    } else if (step === 'revisao') {
      notice('Seu pedido está na revisão. Confira o total e use “Confirmar pedido” para continuar. Será necessário entrar na conta. O botão Enviar serve apenas para mensagens.', 'Ir para a confirmação do pedido', firstAction, urgent);
    } else if (step === 'concluido') {
      notice('Esta compra foi concluída. Use “Começar outra compra” para escolher novos produtos.', 'Começar outra compra', firstAction, urgent);
    } else {
      notice('Digite uma mensagem ou use o microfone antes de enviar. Para começar, você pode escrever “buscar sabonete” ou usar “Ver produtos”.', 'Escrever uma mensagem', input, urgent);
    }
  }
  function appendMessage(message) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${message.role === 'bot' ? 'bot' : 'user'}-bubble`;
    const label = document.createElement('strong');
    label.textContent = message.role === 'bot' ? 'Assistente: ' : 'Você: ';
    const paragraph = document.createElement('p');
    paragraph.append(label, document.createTextNode(message.text));
    bubble.appendChild(paragraph);
    byId('guided-messages').appendChild(bubble);
  }
  function add(text, role = 'bot') {
    const message = { text, role };
    messages.push(message);
    appendMessage(message);
    const log = byId('guided-messages');
    log.scrollTop = log.scrollHeight;
    if (role === 'bot') {
      lastReply = text;
      if (byId('guided-latest')) byId('guided-latest').textContent = text;
      if (autoRead) speak(text);
    }
    if (byId('guided-purchase-dialog').open) {
      const target = simpleMode ? byId('guided-latest') : log.lastElementChild;
      target?.scrollIntoView({ block: 'nearest' });
    }
    save();
  }
  function button(text, handler) {
    const element = document.createElement('button');
    element.type = 'button'; element.className = 'btn btn-secondary'; element.textContent = text;
    element.addEventListener('click', handler);
    return element;
  }
  function mount() {
    if (byId('guided-purchase-dialog')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'guided-purchase-dialog'; dialog.className = 'guided-dialog';
    dialog.setAttribute('aria-labelledby', 'guided-title');
    dialog.innerHTML = `
      <div class="guided-shell">
        <header class="dialog-header"><div><h2 id="guided-title" class="dialog-title" tabindex="-1">Comprar com a assistente</h2><p>Por texto ou voz, no seu ritmo</p></div><button type="button" class="btn-close-dialog" id="guided-close" aria-label="Fechar chat de compra">✕</button></header>
        <div class="guided-quick-summary"><p id="guided-quick-total" role="status" aria-atomic="true"></p><div class="guided-tools"><button type="button" id="guided-hear-cart" class="btn btn-secondary">Ouvir meu carrinho</button><button type="button" id="guided-edit-cart" class="btn btn-secondary">Editar carrinho</button></div></div>
        <div class="guided-body">
          <p class="guided-disclaimer">Escolha seus produtos e confira cada etapa com a assistente. Para dúvidas sobre medicamentos e tratamentos, procure um farmacêutico.</p>
          <ol class="guided-steps" aria-label="Etapas da compra"><li data-step="produtos">1. Produtos</li><li data-step="entrega">2. Entrega</li><li data-step="pagamento">3. Pagamento</li><li data-step="revisao">4. Revisão</li></ol>
          <button type="button" id="guided-back" class="btn btn-secondary" hidden>Voltar à etapa anterior</button>
          <div class="guided-tools"><button type="button" id="guided-next-help" class="btn btn-secondary">O que faço agora?</button><button type="button" id="guided-simple-mode" class="btn btn-secondary" aria-pressed="false">Ativar compra simplificada</button><a class="btn btn-secondary" href="ajuda.html#guia-de-compra" onclick="PMChat.save()">Preciso de ajuda</a></div>
          <p id="guided-latest" class="guided-latest" role="status" aria-atomic="true" hidden></p>
          <details id="guided-history" open><summary>Histórico da conversa</summary><section aria-label="Conversa com a assistente"><div id="guided-messages" class="guided-messages" role="log" aria-live="polite" aria-relevant="additions" tabindex="0" aria-label="Histórico da conversa"></div></section></details>
          <div id="guided-actions" class="guided-actions" aria-label="Opções da etapa atual"></div>
          <details id="guided-summary-panel" class="guided-summary" open><summary id="guided-summary-title">Seu carrinho · produtos e quantidades</summary><ul id="guided-cart-items"></ul><p id="guided-total"></p></details>
        </div>
        <footer class="guided-composer">
          <div id="guided-undo" class="purchase-undo" hidden><p id="guided-undo-text" role="status" aria-atomic="true"></p><button type="button" id="guided-undo-button" class="btn btn-secondary">Desfazer remoção</button></div>
          <div id="guided-notice-announcement" class="sr-only" role="alert" aria-atomic="true"></div>
          <aside id="guided-notice" class="guided-notice" hidden aria-labelledby="guided-notice-title">
            <h3 id="guided-notice-title" tabindex="-1">Para continuar</h3>
            <p id="guided-notice-text"></p>
            <button type="button" id="guided-notice-action" class="btn btn-secondary">Ir para a próxima ação</button>
          </aside>
          <div class="guided-controls"><button type="button" id="guided-auto-read" class="btn btn-primary" aria-pressed="false">Ativar áudio da assistente</button><button type="button" id="guided-listen" class="btn btn-secondary">Ouvir última resposta</button><button type="button" id="guided-stop-speech" class="btn btn-secondary">Parar leitura</button></div>
          <form id="guided-form"><label for="guided-input" class="form-label">Sua mensagem</label><div class="guided-input-row"><input id="guided-input" class="form-input" type="text" maxlength="500" autocomplete="off" placeholder="Ex.: buscar sabonete ou ver total" aria-describedby="guided-voice-help"><button type="button" class="btn btn-secondary" id="guided-mic" aria-pressed="false">Falar por áudio</button><button type="submit" class="btn btn-primary">Enviar</button></div></form>
          <p id="guided-voice-help">O áudio vira texto para você revisar antes de enviar. O microfone só é ativado ao tocar em “Falar por áudio”.</p>
          <p id="guided-status" role="status" aria-live="polite"></p>
        </footer>
      </div>`;
    document.body.appendChild(dialog);
    byId('guided-close').onclick = close;
    byId('guided-back').onclick = previousStep;
    byId('guided-next-help').onclick = () => explainNextAction(false);
    byId('guided-simple-mode').onclick = toggleSimpleMode;
    byId('guided-hear-cart').onclick = () => speak(cartDescription());
    byId('guided-edit-cart').onclick = editCart;
    byId('guided-undo-button').onclick = desfazerRemocaoCarrinho;
    dialog.addEventListener('close', () => { stopVoice(); stopSpeaking(); save(); });
    byId('guided-form').onsubmit = event => { event.preventDefault(); send(); };
    byId('guided-listen').onclick = () => speak(lastReply || 'Vamos começar pela escolha dos produtos.');
    byId('guided-stop-speech').onclick = stopSpeaking;
    byId('guided-auto-read').onclick = () => {
      if (!autoRead && (!window.speechSynthesis || !window.SpeechSynthesisUtterance)) {
        status('Este navegador não oferece leitura em voz alta. Todas as orientações estão disponíveis em texto.');
        return;
      }
      autoRead = !autoRead;
      const control = byId('guided-auto-read');
      control.setAttribute('aria-pressed', String(autoRead));
      control.textContent = autoRead ? 'Desativar áudio da assistente' : 'Ativar áudio da assistente';
      if (autoRead) {
        status('Áudio ativado. A assistente vai ler as próximas respostas.');
        speak(lastReply || 'Áudio ativado. Estou aqui para acompanhar sua compra.');
      } else { stopSpeaking(); status('Áudio desativado. Continue acompanhando pelo texto.'); }
    };
    byId('guided-mic').onclick = toggleVoice;
  }
  function summary() {
    const previous = { entrega: 'produtos', pagamento: 'entrega', revisao: 'pagamento' }[step];
    byId('guided-back').hidden = !previous;
    byId('guided-back').textContent = previous ? `Voltar para ${previous}` : 'Voltar à etapa anterior';
    const list = byId('guided-cart-items');
    list.replaceChildren();
    appState.carrinho.forEach(item => {
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.textContent = `${item.qtd} × ${item.nome} — ${money(item.preco * item.qtd)}`;
      const decrease = button(`Diminuir quantidade de ${item.nome}`, () => changeQuantity(item.id, -1));
      decrease.id = `guided-decrease-${item.id}`;
      const increase = button(`Aumentar quantidade de ${item.nome}`, () => changeQuantity(item.id, 1));
      increase.id = `guided-increase-${item.id}`;
      li.append(label, decrease, increase);
      li.append(button(`Remover ${item.nome}`, () => {
        if (step === 'entrega') cepDraft = byId('guided-cep').value;
        removerDoCarrinho(item.id); step = 'produtos'; summary(); renderActions();
        byId('guided-undo-button').focus({ preventScroll: true });
        add('Produto removido. O total foi atualizado.');
      }));
      list.appendChild(li);
    });
    if (!appState.carrinho.length) { const li = document.createElement('li'); li.textContent = 'Seu carrinho está vazio.'; list.appendChild(li); }
    const total = totals();
    byId('guided-total').textContent = `Subtotal: ${money(total.subtotal)}. Frete: ${money(total.shipping)}. Total: ${money(total.total)}.`;
    byId('guided-quick-total').textContent = `${obterTotalItensCarrinho()} itens · Produtos: ${money(total.subtotal)} · Frete: ${money(total.shipping)} · Total: ${money(total.total)}`;
    atualizarAvisoRemocaoCarrinho();
    document.querySelectorAll('[data-step]').forEach(element => {
      if (element.dataset.step === step) element.setAttribute('aria-current', 'step');
      else element.removeAttribute('aria-current');
    });
    save();
  }
  function cartDescription() {
    const items = appState.carrinho.map(item => `${item.qtd} ${item.qtd === 1 ? 'unidade' : 'unidades'} de ${item.nome}, por ${money(item.preco * item.qtd)}.`).join(' ');
    return `Você tem ${obterTotalItensCarrinho()} itens. ${items} Subtotal de ${money(totals().subtotal)}, frete de ${money(totals().shipping)} e total de ${money(totals().total)}. Use Editar carrinho para alterar os produtos.`;
  }
  function changeQuantity(id, delta) {
    alterarQtdCarrinho(id, delta);
    summary();
    const exists = appState.carrinho.some(item => item.id === id);
    const target = exists ? byId(`guided-${delta > 0 ? 'increase' : 'decrease'}-${id}`) : byId('guided-undo-button');
    target?.focus({ preventScroll: true });
    status('Quantidade e total do carrinho atualizados.');
  }
  function editCart() {
    byId('guided-summary-panel').open = true;
    const target = byId('guided-summary-title');
    target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'nearest' });
    status('Carrinho aberto. Você pode remover produtos e desfazer uma remoção.');
  }
  function applySimpleMode() {
    byId('guided-simple-mode').setAttribute('aria-pressed', String(simpleMode));
    byId('guided-simple-mode').textContent = simpleMode ? 'Desativar compra simplificada' : 'Ativar compra simplificada';
    byId('guided-history').open = !simpleMode;
    byId('guided-summary-panel').open = !simpleMode;
    byId('guided-latest').hidden = !simpleMode;
    byId('guided-latest').textContent = lastReply;
  }
  function toggleSimpleMode() {
    if (step === 'entrega') cepDraft = byId('guided-cep').value;
    simpleMode = !simpleMode;
    try { localStorage.setItem('pm_simple_purchase', String(simpleMode)); } catch {}
    applySimpleMode();
    if (step === 'produtos' && lastProductTerm !== null) showProducts(lastProductTerm);
    status(simpleMode ? 'Compra simplificada ativada. Um produto por vez; o histórico e o carrinho podem ser abertos quando precisar.' : 'Compra completa restaurada. Histórico e carrinho expandidos.');
  }
  function refreshCart() {
    if (!byId('guided-purchase-dialog')?.open) return;
    if (step === 'entrega') cepDraft = byId('guided-cep').value;
    summary(); renderActions();
  }
  function setStep(nextStep, text) { clearNotice(); step = nextStep; summary(); renderActions(); if (text) add(text); }
  function previousStep() {
    const previous = { entrega: 'produtos', pagamento: 'entrega', revisao: 'pagamento' }[step];
    if (!previous) return;
    if (step === 'entrega') cepDraft = byId('guided-cep').value;
    stopVoice(); stopSpeaking();
    setStep(previous, `Voltamos para ${previous}. Seu carrinho e suas escolhas foram mantidos. Você pode revisar esta etapa antes de continuar.`);
    const target = previous === 'entrega' ? byId('guided-cep') : byId('guided-actions').querySelector('button');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'nearest' });
  }
  function showProducts(term = '', offset = 0) {
    lastProductTerm = term;
    const actions = byId('guided-actions');
    actions.replaceChildren();
    const ignored = new Set(['buscar', 'pesquisar', 'procurar', 'quero', 'comprar', 'adicionar', 'preciso', 'gostaria', 'de', 'do', 'da', 'um', 'uma', 'o', 'a', 'por', 'favor', 'voce', 'voces', 'tem', 'ver', 'mostrar', 'produtos']);
    const words = normalize(term).replace(/[?!.,]/g, ' ').split(/\s+/).filter(word => word && !ignored.has(word));
    const matches = CATALOGO_PRODUTOS.filter(product => words.every(word => normalize(product.nome).includes(word)));
    productOffset = Math.max(0, Math.min(offset, matches.length - 1));
    const products = simpleMode ? matches.slice(productOffset, productOffset + 1) : matches.slice(0, 8);
    if (!products.length) { add('Não encontrei esse produto. Digite o nome ou a marca, como “Dove” ou “CeraVe”.'); return; }
    products.forEach(product => {
      const card = document.createElement('div'); card.className = 'guided-product';
      const image = document.createElement('img'); image.src = product.imagem; image.alt = ''; image.loading = 'lazy';
      image.onerror = () => { image.onerror = null; image.src = 'assets/produto-sem-foto.svg'; };
      const label = document.createElement('p'); label.textContent = `${product.nome} — ${money(product.preco)}`;
      card.append(image, label, button(`Adicionar ${product.nome}`, () => {
        clearNotice();
        const before = obterTotalItensCarrinho();
        adicionarAoCarrinho(product.id, product.nome, product.preco); step = 'produtos'; summary();
        if (obterTotalItensCarrinho() === before) {
          notice('Não foi possível adicionar mais unidades. O limite é de 99 unidades por produto. Você pode editar as quantidades no carrinho.', 'Editar carrinho', () => byId('guided-edit-cart'));
          return;
        }
        add(`Adicionei uma unidade de ${product.nome}. Seu total com frete é ${money(totals().total)}. Você pode adicionar mais produtos ou continuar para entrega.`);
      }));
      actions.appendChild(card);
    });
    if (simpleMode && matches.length > 1) {
      const position = document.createElement('p'); position.textContent = `Produto ${productOffset + 1} de ${matches.length}`;
      actions.appendChild(position);
      const browse = offset => {
        showProducts(term, offset);
        const target = byId('guided-actions').querySelector('button');
        target?.focus({ preventScroll: true }); target?.scrollIntoView({ block: 'nearest' });
      };
      if (productOffset > 0) actions.append(button('Produto anterior', () => browse(productOffset - 1)));
      if (productOffset < matches.length - 1) actions.append(button('Próximo produto', () => browse(productOffset + 1)));
    }
    actions.append(button('Continuar para entrega', delivery));
    const productList = products.map((product, index) => `${index + 1}. ${product.nome}, por ${money(product.preco)}.`).join(' ');
    add(`Encontrei ${products.length} ${products.length === 1 ? 'produto' : 'produtos'}. ${productList} Confira as opções abaixo e use o botão Adicionar no produto desejado.`);
  }
  function delivery() {
    if (!appState.carrinho.length) {
      showProducts();
      notice('Seu carrinho está vazio. Adicione pelo menos um produto para continuar para entrega e pagamento.', 'Ir para os produtos', () => byId('guided-actions').querySelector('button'));
      return;
    }
    setStep('entrega', 'Confira seu CEP para continuar. O resumo mostra o valor estimado do frete; confirme as condições de entrega antes de concluir o pedido.');
  }
  function payment() {
    setStep('pagamento', 'Escolha Pix, cartão, boleto ou convênio. O total aparece no resumo. Nenhuma informação bancária deve ser enviada no chat.');
  }
  function choosePayment(method) {
    if (!names[method]) return;
    appState.formaPagamentoSelecionada = method;
    const explanations = {
      pix: 'Pix selecionado. O código de pagamento deve ser apresentado pelo serviço de pagamento. Não faça pagamentos usando códigos recebidos no chat.',
      card: 'Cartão selecionado. Os dados do cartão devem ser informados somente no ambiente de pagamento, nunca no chat.',
      boleto: 'Boleto selecionado. Confira o vencimento e os dados do beneficiário quando o boleto estiver disponível.',
      pbm: 'Convênio selecionado. Os benefícios dependem da validação de elegibilidade. Não envie CPF ou carteirinha no chat.'
    };
    setStep('revisao', `${explanations[method]} Revise os produtos, o CEP ${appState.usuario.cep} e o total de ${money(totals().total)}. Para continuar, é necessário entrar na conta. Use o botão “Confirmar pedido”.`);
  }
  function renderActions() {
    const actions = byId('guided-actions'); actions.replaceChildren();
    if (step === 'produtos') {
      actions.append(button('Ver produtos', () => showProducts()), button('Continuar para entrega', delivery));
    } else if (step === 'entrega') {
      const form = document.createElement('form'); form.className = 'guided-delivery';
      form.noValidate = true;
      const label = document.createElement('label'); label.htmlFor = 'guided-cep'; label.textContent = 'CEP de entrega';
      const input = document.createElement('input'); input.id = 'guided-cep'; input.className = 'form-input';
      input.inputMode = 'numeric'; input.autocomplete = 'postal-code'; input.required = true;
      input.pattern = '[0-9]{5}-?[0-9]{3}'; input.maxLength = 9; input.value = cepDraft ?? appState.usuario.cep;
      const help = document.createElement('p'); help.id = 'guided-cep-help'; help.textContent = 'Use 8 números, com ou sem hífen. Exemplo: 50000-000.';
      input.setAttribute('aria-describedby', help.id);
      const next = document.createElement('button'); next.type = 'submit'; next.className = 'btn btn-primary'; next.textContent = 'Confirmar CEP e escolher pagamento';
      form.append(label, input, help, next);
      form.onsubmit = event => {
        event.preventDefault();
        if (!/^[0-9]{5}-?[0-9]{3}$/.test(input.value)) {
          input.setAttribute('aria-invalid', 'true');
          input.setAttribute('aria-describedby', 'guided-cep-help guided-notice-text');
          notice('O CEP precisa ter 8 números. Confira o campo, por exemplo 50000-000, e depois use “Confirmar CEP e escolher pagamento”.', 'Corrigir o CEP', () => input);
          input.focus({ preventScroll: true });
          return;
        }
        const digits = input.value.replace(/\D/g, ''); appState.usuario.cep = `${digits.slice(0, 5)}-${digits.slice(5)}`;
        cepDraft = appState.usuario.cep;
        atualizarDadosUsuarioUI(); payment(); byId('guided-input').focus({ preventScroll: true });
      };
      actions.append(form);
    } else if (step === 'pagamento') {
      Object.entries(names).forEach(([value, name]) => actions.append(button(name, () => {
        choosePayment(value); byId('guided-input').focus({ preventScroll: true });
      })));
    } else if (step === 'revisao') {
      const review = document.createElement('p'); review.textContent = `Entrega no CEP ${appState.usuario.cep}. Pagamento: ${names[appState.formaPagamentoSelecionada]}. Total: ${money(totals().total)}.`;
      const confirm = button('Confirmar pedido', async () => {
        confirm.disabled = true;
        try { await confirmarCompraSimuladaIA('chat'); }
        finally { confirm.disabled = false; }
      });
      confirm.className = 'btn btn-primary';
      actions.append(review, confirm, button('Alterar pagamento', payment), button('Alterar entrega', delivery), button('Adicionar outros produtos', () => { setStep('produtos'); showProducts(); }));
    } else actions.append(button('Começar outra compra', () => { setStep('produtos', 'Vamos começar uma nova compra. O que você procura?'); showProducts(); }));
  }
  function send() {
    const input = byId('guided-input'); const text = input.value.trim();
    if (!text) {
      explainNextAction();
      input.setAttribute('aria-invalid', 'true');
      input.focus({ preventScroll: true });
      return;
    }
    if (['pagamento', 'revisao', 'entrega'].includes(step) && /^(sim|ok|enviar|continuar|avancar|pronto)[!?.\s]*$/.test(normalize(text))) {
      explainNextAction();
      return;
    }
    clearNotice();
    stopVoice(); input.value = ''; add(text, 'user');
    status('Mensagem enviada.');
    const lower = normalize(text);
    const cep = lower.match(/^(?:cep\s*:?\s*)?(\d{5}-?\d{3})$/);
    const cartCommand = lower.match(/^(adicione|adicionar|coloque|inclua|remover|remova|retire)\s+(.+)$/);
    if (/^voltar(?:\s.*)?$/.test(lower)) {
      if (step === 'produtos') add('Você está na primeira etapa. Busque um produto ou confira seu carrinho.');
      else previousStep();
    } else if (step === 'entrega' && cep) {
      const digits = cep[1].replace(/\D/g, '');
      appState.usuario.cep = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      cepDraft = appState.usuario.cep;
      atualizarDadosUsuarioUI(); payment();
    } else if (cartCommand) {
      const remove = /^(remover|remova|retire)$/.test(cartCommand[1]);
      const words = cartCommand[2].split(/\s+/).filter(word => !['um', 'uma', 'o', 'a', 'do', 'da', 'produto'].includes(word));
      const candidates = (remove ? appState.carrinho : CATALOGO_PRODUTOS).filter(product => words.every(word => normalize(product.nome).includes(word)));
      if (!words.length || candidates.length !== 1) {
        add(candidates.length ? 'Encontrei mais de uma opção. Informe o nome completo ou escolha o produto nos botões para evitar enganos.' : 'Não encontrei esse produto. Informe o nome ou a marca como aparece no catálogo.');
      } else {
        const product = candidates[0];
        if (step === 'entrega') cepDraft = byId('guided-cep').value;
        const before = obterTotalItensCarrinho();
        if (remove) removerDoCarrinho(product.id);
        else adicionarAoCarrinho(product.id, product.nome, product.preco);
        if (!remove && obterTotalItensCarrinho() === before) {
          add('Não foi possível adicionar mais unidades. O limite é de 99 unidades por produto. Use Editar carrinho para revisar.');
          return;
        }
        setStep('produtos', `${remove ? 'Removi' : 'Adicionei uma unidade de'} ${product.nome}. Total atualizado: ${money(totals().total)}. ${remove ? 'Você pode usar Desfazer remoção.' : 'Confira seu carrinho antes de continuar.'}`);
      }
    } else if (/^(oi|ola|bom dia|boa tarde|boa noite|ajuda|como funciona)[!?.\s]*$/.test(lower)) {
      add('Olá! Posso buscar produtos, mostrar seu carrinho e acompanhar o pagamento. Digite, por exemplo, “buscar sabonete”, “ver total” ou “continuar para entrega”.');
    } else if (/\b(total|carrinho|revisar|resumo)\b/.test(lower)) {
      summary(); add(cartDescription());
    } else if (/\b(concluir|confirmar|finalizar)\b/.test(lower)) {
      if (step === 'revisao') {
        add('Revise o resumo e use o botão “Confirmar pedido”. Só ele confirma a compra, após o login.');
        explainNextAction();
      }
      else delivery();
    } else if (/\b(pix|cartao|boleto|convenio|pbm|pagamento|pagar)\b/.test(lower)) {
      if (!appState.carrinho.length) { add('Primeiro escolha os produtos da compra.'); showProducts(); }
      else if (!['pagamento', 'revisao'].includes(step)) delivery();
      else {
        const method = lower.includes('pix') ? 'pix' : lower.includes('cartao') ? 'card' : lower.includes('boleto') ? 'boleto' : /convenio|pbm/.test(lower) ? 'pbm' : null;
        if (method) choosePayment(method); else payment();
      }
    } else if (/\b(cep|entrega|continuar)\b/.test(lower)) delivery();
    else if (/\b(bula|dose|dor|sintoma|tratamento)\b/.test(lower)) add('Para dúvidas sobre sintomas, doses ou tratamentos, procure um farmacêutico. Posso ajudar a localizar um produto pelo nome e organizar sua compra.');
    else if (['entrega', 'pagamento', 'revisao'].includes(step) && !/\b(buscar|pesquisar|procurar|comprar|produto)\b/.test(lower)) {
      explainNextAction(false);
    } else { setStep('produtos'); showProducts(text); }
  }
  function stopVoice() { if (recognition) { try { recognition.stop(); } catch {} } }
  function toggleVoice() {
    if (recognition) { stopVoice(); return; }
    const API = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!API) { status('A transcrição por voz não está disponível neste navegador. Você pode digitar ou usar o ditado do teclado do aparelho.'); return; }
    stopSpeaking();
    const active = new API(); recognition = active;
    active.lang = 'pt-BR'; active.interimResults = false; active.continuous = false;
    const mic = byId('guided-mic');
    active.onstart = () => { mic.textContent = 'Parar microfone'; mic.setAttribute('aria-pressed', 'true'); status('Microfone ativo. Fale sua mensagem.'); };
    active.onresult = event => {
      const text = event.results[0][0].transcript;
      if (!byId('guided-purchase-dialog').open) return;
      byId('guided-input').value = text.slice(0, 500);
      byId('guided-input').focus({ preventScroll: true });
      status('Áudio transcrito. Revise sua mensagem e toque em Enviar.');
    };
    active.onerror = event => status(event.error === 'not-allowed' ? 'O acesso ao microfone não foi permitido. Você pode digitar sua mensagem.' : 'Não consegui transcrever o áudio. Tente novamente ou digite sua mensagem.');
    active.onend = () => { recognition = null; mic.textContent = 'Falar por áudio'; mic.setAttribute('aria-pressed', 'false'); };
    try { active.start(); } catch { recognition = null; status('Não foi possível ativar o microfone. Digite ou tente novamente.'); }
  }
  function open(resume = false) {
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    mount();
    if (!messages.length) {
      restore();
      messages.forEach(appendMessage);
      lastReply = [...messages].reverse().find(message => message.role === 'bot')?.text || '';
    }
    byId('guided-purchase-dialog').showModal();
    clearNotice();
    summary(); renderActions(); byId('guided-title').focus({ preventScroll: true });
    applySimpleMode();
    if (!messages.length) add('Olá! Vou acompanhar sua compra do começo ao fim. Digite o nome de um produto ou escolha “Ver produtos”. Você pode revisar o carrinho e o total a qualquer momento. Para concluir, vamos pedir que entre na sua conta.');
    if (resume) add('Você voltou à compra. Confira o resumo atualizado e confirme quando estiver pronto.');
  }
  function close() { byId('guided-purchase-dialog')?.close(); }
  function reset() {
    close();
    messages = []; step = 'produtos'; cepDraft = null; lastReply = ''; lastProductTerm = null; productOffset = 0;
    byId('guided-messages')?.replaceChildren();
    byId('guided-cart-items')?.replaceChildren();
    if (byId('guided-latest')) byId('guided-latest').textContent = '';
    if (byId('guided-input')) byId('guided-input').value = '';
    if (byId('guided-total')) byId('guided-total').textContent = '';
    if (byId('guided-quick-total')) byId('guided-quick-total').textContent = '';
    byId('guided-actions')?.replaceChildren();
    clearNotice();
    purchaseStorage.removeItem('pm_guided_chat');
  }
  function complete() { step = 'concluido'; close(); save(); }
  function orderUnavailable() {
    notice('A conclusão de pedidos ainda não está disponível. Seu carrinho foi mantido. Tente novamente mais tarde.', 'Revisar meu carrinho', () => byId('guided-edit-cart'));
  }
  return { open, close, save, totals, complete, refreshCart, reset, orderUnavailable };
})();
