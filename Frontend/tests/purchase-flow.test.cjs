const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('páginas têm IDs únicos e referências locais de scripts e estilos válidas', () => {
  for (const file of ['index.html', 'login.html', 'sobre.html', 'ajuda.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', 'html', file), 'utf8');
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.ok(ids.length > 0);
    assert.equal(ids.length, new Set(ids).size, file);
    for (const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css))"/g)) {
      assert.ok(fs.existsSync(path.join(__dirname, '..', 'html', match[1])), match[1]);
    }
  }
});

// DOM mínimo para exercitar os fluxos sem rede, microfone ou contas reais.
function environment(saved = {}, options = {}) {
  const elements = new Map();
  const store = new Map(Object.entries(saved));
  let context;
  class Element {
    constructor(tag = 'div') { this.tagName = tag; this.children = []; this.attributes = {}; this.listeners = {}; this.dataset = {}; this.style = {}; this.value = ''; this.open = false; this.textContent = ''; this.classList = { add() {}, remove() {}, toggle() {} }; }
    set id(value) { this._id = value; elements.set(value, this); }
    get id() { return this._id; }
    set innerHTML(value) {
      this._html = value;
      this.children = [];
      for (const match of value.matchAll(/<([a-z][a-z0-9]*)\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
        const element = new Element(match[1]); element.id = match[2]; this.children.push(element);
      }
    }
    get innerHTML() { return this._html || ''; }
    append(...children) { this.children.push(...children); }
    appendChild(child) { this.children.push(child); if (child.src?.includes('supabase.js')) queueMicrotask(() => child.onload()); return child; }
    replaceChildren(...children) { this.children = [...children]; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name]; }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(name, handler) { this.listeners[name] = handler; }
    focus() { context.document.activeElement = this; }
    showModal() { this.open = true; }
    close() { this.open = false; this.listeners.close?.(); }
    reportValidity() { return this.valid !== false; }
    querySelector(tag) {
      for (const child of this.children) {
        if (child.tagName === tag) return child;
        const result = child.querySelector?.(tag); if (result) return result;
      }
      return null;
    }
    scrollIntoView() {}
  }
  context = vm.createContext({ console, URL, queueMicrotask, setTimeout: () => 1, clearTimeout() {},
    sessionStorage: { getItem: key => store.get(key) || null, setItem: (key, value) => store.set(key, value), removeItem: key => store.delete(key) },
    localStorage: { getItem: () => null, setItem() {} },
    location: { href: 'http://localhost:3000/index.html', assign(value) { context.destination = value; } },
    document: {
      addEventListener() {}, body: new Element('body'), head: new Element('head'),
      getElementById: id => elements.get(id) || null,
      createElement: tag => new Element(tag), createTextNode: text => ({ textContent: text }),
      querySelectorAll: selector => selector === 'dialog[open]' ? [...elements.values()].filter(el => el.tagName === 'dialog' && el.open) : [],
      querySelector: () => null
    }
  });
  context.window = context;
  const run = expression => vm.runInContext(expression, context);
  const load = file => run(fs.readFileSync(path.join(__dirname, '..', 'js', file), 'utf8'));
  if (options.privacy) {
    context.performance = { getEntriesByType: () => [{ type: options.navigation || 'navigate' }] };
    load('privacy.js');
  }
  load('script.js');
  // Produtos e CEP fictícios existem somente nesta fixture de testes.
  if (!options.empty) run("appState.usuario.cep = '50000-000'; appState.carrinho = [{ id: 'hig-01', nome: 'Sabonete suave 90 g', preco: 4.49, qtd: 1 }, { id: 'pel-01', nome: 'Hidratante corporal 400 ml', preco: 24.90, qtd: 1 }]");
  const nativeCartUI = context.atualizarCarrinhoUI;
  context.atualizarCarrinhoUI = () => {};
  context.atualizarDadosUsuarioUI = () => {};
  context.notificarAcessibilidade = () => {};
  context.mostrarToast = () => {};
  function element(id, tag) { const el = new Element(tag); el.id = id; return el; }
  return { context, elements, store, run, load, element, nativeCartUI };
}
function findButton(root, text) {
  for (const child of root.children || []) {
    if (child.tagName === 'button' && child.textContent.includes(text)) return child;
    const nested = findButton(child, text); if (nested) return nested;
  }
}
function click(button) { assert.ok(button, 'Botão esperado existe'); return (button.onclick || button.listeners.click)(); }
function send(env, text) { env.elements.get('guided-input').value = text; env.elements.get('guided-form').onsubmit({ preventDefault() {} }); }
function chat(env) { env.load('purchase-chat.js'); env.context.PMChat.open(); return env.elements.get('guided-actions'); }

test('visitante não conclui nem esvazia carrinho; retorno preserva origem', async () => {
  const env = environment(); env.load('auth-config.js'); env.load('auth.js');
  const count = env.run('appState.carrinho.length');
  await env.context.confirmarCompraSimuladaIA('chat');
  assert.equal(env.context.destination, 'login.html');
  assert.equal(env.run('appState.carrinho.length'), count);
  assert.equal(env.store.get('pm_pending_purchase'), 'chat');
  assert.ok(JSON.parse(env.store.get('pm_cart')).length);
});

test('carrinho restaurado usa preços do catálogo e descarta itens inválidos', async () => {
  const env = environment({ pm_cart: JSON.stringify([{ id: 'med-01', preco: .01, nome: 'alterado', qtd: 2 }, { id: 'inexistente', qtd: 1 }, { id: 'med-02', qtd: -1 }]) });
  env.load('auth-config.js'); env.load('auth.js'); await env.context.PMAuth.ready;
  assert.equal(env.run('appState.carrinho.length'), 1);
  assert.equal(env.run('appState.carrinho[0].preco'), 17.49);
  assert.match(env.run('appState.carrinho[0].nome'), /Dorflex/);
});

test('alterar estado local de autenticação não ignora a verificação remota', async () => {
  const env = environment(); env.load('auth-config.js'); env.load('auth.js');
  env.run('appState.usuario.autenticado = true');
  assert.equal(await env.context.PMAuth.verify(), false);
});

test('carrinho vazio não inicia confirmação', async () => {
  const env = environment(); env.run('appState.carrinho = []');
  await env.context.confirmarCompraSimuladaIA();
  assert.equal(env.context.destination, undefined);
});

test('sessão verificada conclui uma única vez mesmo com clique duplicado', async () => {
  const env = environment(); let resolveLogin; let confirmations = 0;
  env.context.PMAuth = { requireLogin: () => new Promise(resolve => { resolveLogin = resolve; }) };
  env.context.concluirPedidoDemonstrativo = () => { confirmations++; env.run('appState.carrinho = []'); };
  const pending = env.context.confirmarCompraSimuladaIA();
  await env.context.confirmarCompraSimuladaIA();
  resolveLogin(true); await pending;
  assert.equal(confirmations, 1);
});

test('totais incluem frete, frete grátis e carrinho vazio', () => {
  const env = environment(); env.load('purchase-chat.js');
  assert.equal(Number(env.context.PMChat.totals().total.toFixed(2)), 39.29);
  env.run('appState.carrinho = [{ id: "med-01", preco: 50, qtd: 2 }]');
  assert.equal(env.context.PMChat.totals().shipping, 0);
  env.run('appState.carrinho = []');
  assert.equal(env.context.PMChat.totals().total, 0);
});

test('chat busca, adiciona produto, confirma CEP, escolhe boleto e exige clique final', () => {
  const env = environment(); const actions = chat(env);
  send(env, 'buscar CeraVe');
  const addButton = findButton(actions, 'Adicionar CeraVe');
  const count = env.run('obterTotalItensCarrinho()'); click(addButton);
  assert.equal(env.run('obterTotalItensCarrinho()'), count + 1);
  click(findButton(actions, 'Continuar para entrega'));
  const cep = env.elements.get('guided-cep'); cep.value = '60000000';
  actions.children[0].onsubmit({ preventDefault() {} });
  assert.equal(env.run('appState.usuario.cep'), '60000-000');
  click(findButton(actions, 'Boleto bancário'));
  assert.equal(env.run('appState.formaPagamentoSelecionada'), 'boleto');
  assert.ok(findButton(actions, 'Confirmar pedido'));
  send(env, 'confirmar compra');
  assert.ok(env.run('appState.carrinho.length') > 0);
  assert.match(JSON.parse(env.store.get('pm_guided_chat')).messages.at(-1).text, /Só ele confirma/);
});

test('chat não avança entrega com carrinho vazio e mantém alternativa textual sem voz', () => {
  const env = environment(); env.run('appState.carrinho = []'); const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  assert.equal(env.elements.has('guided-cep'), false);
  click(env.elements.get('guided-mic'));
  assert.match(env.elements.get('guided-status').textContent, /digitar/);
});

test('transcrição requer envio manual; fechar chat encerra microfone', () => {
  const env = environment(); let recognition; let stopped = false;
  env.context.SpeechRecognition = class {
    constructor() { recognition = this; }
    start() { this.onstart(); }
    stop() { stopped = true; this.onend(); }
  };
  chat(env); const before = JSON.parse(env.store.get('pm_guided_chat')).messages.length;
  click(env.elements.get('guided-mic'));
  recognition.onresult({ results: [[{ transcript: 'buscar Dove' }]] });
  assert.equal(env.elements.get('guided-input').value, 'buscar Dove');
  assert.equal(JSON.parse(env.store.get('pm_guided_chat')).messages.length, before);
  click(env.elements.get('guided-close'));
  assert.equal(stopped, true);
});

test('mensagens são inseridas como texto, sem executar HTML', () => {
  const env = environment(); chat(env); send(env, '<img src=x onerror=alert(1)>');
  const userMessage = env.elements.get('guided-messages').children.find(el => el.className.includes('user'));
  assert.equal(userMessage.children[0].children[1].textContent, '<img src=x onerror=alert(1)>');
});

test('Enviar responde a saudações e confirma buscas em linguagem natural', () => {
  const env = environment(); const actions = chat(env);
  send(env, 'Olá!');
  let messages = JSON.parse(env.store.get('pm_guided_chat')).messages;
  assert.match(messages.at(-1).text, /Posso buscar produtos/);
  send(env, 'quero comprar um sabonete, por favor');
  messages = JSON.parse(env.store.get('pm_guided_chat')).messages;
  assert.match(messages.at(-1).text, /Encontrei/);
  assert.ok(findButton(actions, 'Adicionar Sabonete'));
});

test('Enviar vazio oferece instrução e foco no campo', () => {
  const env = environment(); chat(env); send(env, '   ');
  assert.match(env.elements.get('guided-notice-text').textContent, /Digite uma mensagem/);
  assert.equal(env.context.document.activeElement, env.elements.get('guided-input'));
});

test('ativar áudio lê imediatamente, lê respostas novas e permite desativar', () => {
  const env = environment(); const spoken = []; let canceled = 0;
  env.context.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  env.context.speechSynthesis = { cancel() { canceled++; }, speak(utterance) { spoken.push(utterance.text); }, getVoices: () => [{ lang: 'pt-BR' }] };
  chat(env); const control = env.elements.get('guided-auto-read');
  click(control);
  assert.equal(control.getAttribute('aria-pressed'), 'true');
  assert.equal(spoken.length, 1);
  send(env, 'oi');
  assert.equal(spoken.length, 2);
  assert.match(spoken.at(-1), /Posso buscar produtos/);
  click(control);
  assert.equal(control.getAttribute('aria-pressed'), 'false');
  send(env, 'ver total');
  assert.equal(spoken.length, 2);
  assert.ok(canceled >= 3);
});

test('falha na síntese de voz não interrompe envio nem salva só metade da conversa', () => {
  const env = environment();
  env.context.SpeechSynthesisUtterance = class {};
  env.context.speechSynthesis = { cancel() {}, speak() { throw new Error('Sem voz'); } };
  chat(env); click(env.elements.get('guided-auto-read')); send(env, 'oi');
  assert.match(JSON.parse(env.store.get('pm_guided_chat')).messages.at(-1).text, /Posso buscar produtos/);
  assert.match(env.elements.get('guided-status').textContent, /Não foi possível ativar a voz/);
});

test('áudio lê nomes e preços dos resultados e quantidades do carrinho', () => {
  const env = environment(); const spoken = [];
  env.context.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  env.context.speechSynthesis = { cancel() {}, speak(utterance) { spoken.push(utterance.text); } };
  chat(env); click(env.elements.get('guided-auto-read'));
  send(env, 'buscar CeraVe');
  assert.match(spoken.at(-1), /CeraVe.*84,90/);
  send(env, 'ver carrinho');
  assert.match(spoken.at(-1), /1 unidade de Sabonete/);
  assert.match(spoken.at(-1), /4,49/);
  assert.match(spoken.at(-1), /frete.*9,90.*total.*39,29/);
});

function paymentStage(env) {
  const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  actions.children[0].onsubmit({ preventDefault() {} });
  return actions;
}

test('voltar percorre revisão, pagamento, entrega e produtos sem perder o carrinho', () => {
  const env = environment(); const actions = paymentStage(env);
  const count = env.run('obterTotalItensCarrinho()');
  click(findButton(actions, 'Boleto bancário'));
  const back = env.elements.get('guided-back');
  assert.equal(back.textContent, 'Voltar para pagamento');
  click(back);
  assert.ok(findButton(actions, 'Boleto bancário'));
  assert.equal(env.run('appState.formaPagamentoSelecionada'), 'boleto');
  click(back);
  assert.equal(env.context.document.activeElement, env.elements.get('guided-cep'));
  click(back);
  assert.ok(findButton(actions, 'Ver produtos'));
  assert.equal(back.hidden, true);
  assert.equal(env.run('obterTotalItensCarrinho()'), count);
});

test('voltar preserva o CEP ainda não confirmado para revisão posterior', () => {
  const env = environment(); const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  env.elements.get('guided-cep').value = '60123-456';
  click(env.elements.get('guided-back'));
  assert.equal(env.run('appState.usuario.cep'), '50000-000');
  click(findButton(actions, 'Continuar para entrega'));
  assert.equal(env.elements.get('guided-cep').value, '60123-456');
});

test('Enviar vazio no pagamento avisa a ação pendente sem alterar etapa ou pedido', () => {
  const env = environment(); const actions = paymentStage(env);
  const count = env.run('obterTotalItensCarrinho()');
  send(env, '');
  assert.equal(env.elements.get('guided-notice').hidden, false);
  assert.match(env.elements.get('guided-notice-text').textContent, /Escolha Pix/);
  assert.ok(findButton(actions, 'Boleto bancário'));
  assert.equal(env.run('obterTotalItensCarrinho()'), count);
  assert.equal(env.elements.get('guided-notice-announcement').children.length, 1);
  click(env.elements.get('guided-notice-action'));
  assert.equal(env.context.document.activeElement, findButton(actions, 'Pix'));
});

test('aviso preserva rascunho e desaparece ao selecionar pagamento', () => {
  const env = environment(); const actions = paymentStage(env);
  send(env, 'continuar');
  assert.equal(env.elements.get('guided-input').value, 'continuar');
  assert.match(env.elements.get('guided-notice-text').textContent, /etapa de pagamento/);
  click(findButton(actions, 'Boleto bancário'));
  assert.equal(env.elements.get('guided-notice').hidden, true);
  assert.ok(findButton(actions, 'Confirmar pedido'));
  send(env, '');
  assert.match(env.elements.get('guided-notice-text').textContent, /Enviar serve apenas para mensagens/);
});

test('aviso não bloqueia consulta de total nem escolha de pagamento digitada', () => {
  const env = environment(); const actions = paymentStage(env);
  send(env, ''); send(env, 'ver total');
  assert.equal(env.elements.get('guided-notice').hidden, true);
  assert.ok(findButton(actions, 'Pix'));
  send(env, 'boleto');
  assert.ok(findButton(actions, 'Confirmar pedido'));
});

test('CEP inválido mantém o valor e apresenta aviso com foco no campo correto', () => {
  const env = environment(); const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  const cep = env.elements.get('guided-cep'); cep.value = '123';
  actions.children[0].onsubmit({ preventDefault() {} });
  assert.equal(cep.value, '123');
  assert.equal(cep.getAttribute('aria-invalid'), 'true');
  assert.equal(env.context.document.activeElement, cep);
  assert.match(env.elements.get('guided-notice-text').textContent, /8 números/);
});

test('configuração usa OAuth Google e vínculo de identidade em chamadas separadas', async () => {
  const env = environment(); const calls = [];
  env.context.PM_AUTH_CONFIG = { supabaseUrl: 'https://example.supabase.co', supabasePublicKey: 'public-test' };
  env.context.supabase = { createClient: () => ({ auth: {
    onAuthStateChange() {}, getUser: async () => ({ data: { user: { email: 'teste@example.com' } }, error: null }),
    signInWithOAuth: async payload => { calls.push(['signin', payload]); return {}; },
    linkIdentity: async payload => { calls.push(['link', payload]); return {}; }
  } }) };
  env.load('auth.js'); await env.context.PMAuth.ready;
  await env.context.PMAuth.google(); await env.context.PMAuth.google(true);
  assert.equal(calls[0][0], 'signin'); assert.equal(calls[1][0], 'link');
  assert.equal(calls[0][1].provider, 'google');
  assert.equal(calls[1][1].options.redirectTo, 'http://localhost:3000/login.html');
});

test('O que faço agora orienta sem alterar dados e pode ser ouvido', () => {
  const env = environment(); paymentStage(env);
  const spoken = [];
  env.context.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  env.context.speechSynthesis = { cancel() {}, speak(message) { spoken.push(message.text); } };
  click(env.elements.get('guided-auto-read'));
  const count = env.run('obterTotalItensCarrinho()');
  click(env.elements.get('guided-next-help'));
  assert.match(env.elements.get('guided-notice-text').textContent, /Escolha Pix/);
  assert.equal(env.elements.get('guided-notice-announcement').getAttribute('role'), 'status');
  assert.equal(env.run('obterTotalItensCarrinho()'), count);
  assert.match(spoken.at(-1), /Escolha Pix/);
});

test('remover e desfazer restaura quantidade e total; nova adição é preservada', () => {
  const env = environment(); chat(env);
  const total = env.context.PMChat.totals().total;
  click(findButton(env.elements.get('guided-cart-items'), 'Remover Sabonete'));
  assert.equal(env.elements.get('guided-undo').hidden, false);
  env.run("adicionarAoCarrinho('hig-01', 'Sabonete suave 90 g', 4.49)");
  click(env.elements.get('guided-undo-button'));
  assert.equal(env.run("appState.carrinho.find(item => item.id === 'hig-01').qtd"), 2);
  assert.equal(env.context.PMChat.totals().total.toFixed(2), (total + 4.49).toFixed(2));
  assert.equal(env.elements.get('guided-undo').hidden, true);
});

test('diminuir a última unidade permite restaurar uma unidade com Desfazer', () => {
  const env = environment(); chat(env);
  click(env.elements.get('guided-decrease-hig-01'));
  assert.equal(env.run("appState.carrinho.some(item => item.id === 'hig-01')"), false);
  click(env.elements.get('guided-undo-button'));
  assert.equal(env.run("appState.carrinho.find(item => item.id === 'hig-01').qtd"), 1);
  click(env.elements.get('guided-increase-hig-01'));
  assert.equal(env.run("appState.carrinho.find(item => item.id === 'hig-01').qtd"), 2);
});

test('Ouvir meu carrinho funciona com leitura automática desligada e Editar abre resumo', () => {
  const env = environment(); const spoken = [];
  env.context.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  env.context.speechSynthesis = { cancel() {}, speak(message) { spoken.push(message.text); } };
  chat(env);
  click(env.elements.get('guided-hear-cart'));
  assert.match(spoken.at(-1), /Sabonete.*frete.*total/);
  click(env.elements.get('guided-simple-mode'));
  assert.equal(env.elements.get('guided-summary-panel').open, false);
  click(env.elements.get('guided-edit-cart'));
  assert.equal(env.elements.get('guided-summary-panel').open, true);
  assert.equal(env.context.document.activeElement, env.elements.get('guided-summary-title'));
});

test('modo simplificado mostra um produto por vez e mantém acesso aos outros', () => {
  const env = environment(); const actions = chat(env);
  click(env.elements.get('guided-simple-mode'));
  assert.equal(env.elements.get('guided-simple-mode').getAttribute('aria-pressed'), 'true');
  assert.equal(env.elements.get('guided-history').open, false);
  assert.equal(env.elements.get('guided-latest').hidden, false);
  click(findButton(actions, 'Ver produtos'));
  assert.equal(actions.children.filter(child => child.className === 'guided-product').length, 1);
  const first = actions.children[0].children[1].textContent;
  click(findButton(actions, 'Próximo produto'));
  assert.notEqual(actions.children[0].children[1].textContent, first);
  click(findButton(actions, 'Produto anterior'));
  assert.equal(actions.children[0].children[1].textContent, first);
  click(env.elements.get('guided-simple-mode'));
  assert.equal(env.elements.get('guided-history').open, true);
  assert.ok(actions.children.filter(child => child.className === 'guided-product').length > 1);
});

test('modo simplificado não perde o CEP nem o rascunho da mensagem', () => {
  const env = environment(); const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  env.elements.get('guided-cep').value = '60123-456';
  env.elements.get('guided-input').value = 'minha dúvida';
  click(env.elements.get('guided-simple-mode'));
  assert.equal(env.elements.get('guided-cep').value, '60123-456');
  assert.equal(env.elements.get('guided-input').value, 'minha dúvida');
  assert.match(env.elements.get('guided-quick-total').textContent, /Total:.*39,29/);
});

test('ajuda usa o mesmo componente nas quatro páginas e não oferece atendimento fictício', () => {
  for (const file of ['index.html', 'sobre.html', 'ajuda.html', 'login.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', 'html', file), 'utf8');
    assert.match(html, /src="\.\.\/js\/accessible-help\.js"/);
    assert.match(html, /href="\.\.\/css\/accessible-flows\.css"/);
  }
  const env = environment(); let panel;
  env.context.document.querySelector = () => ({ after(element) { panel = element; } });
  env.load('accessible-help.js');
  assert.equal(panel.id, 'site-help');
  assert.match(panel.innerHTML, /Preciso de ajuda/);
  assert.match(panel.innerHTML, /ajuda.html#atendimento-humano/);
  const help = fs.readFileSync(path.join(__dirname, '..', 'html', 'ajuda.html'), 'utf8');
  assert.match(help, /consulte os canais disponíveis na central oficial/);
  assert.match(help, /https:\/\/www.paguemenos.com.br\/central-de-atendimento/);
});

test('cada atalho de ajuda recebe resposta própria sem prometer execução real', () => {
  const env = environment(); const replies = [];
  env.context.adicionarBolhaChat = text => replies.push(text);
  env.context.gerarRespostaBot('Como rastrear meu pedido?');
  assert.match(replies.at(-1), /Meus Pedidos/);
  assert.match(replies.at(-1), /rastreamento por este chat ainda não está disponível/);
  env.context.gerarRespostaBot('Qual a regra para trocar remédios?');
  assert.match(replies.at(-1), /regras de troca de medicamentos/);
  assert.doesNotMatch(replies.at(-1), /Já registrei/);
  env.context.gerarRespostaBot('O que fazer se o produto vier violado?');
  assert.match(replies.at(-1), /não utilize o produto/);
  assert.doesNotMatch(replies.at(-1), /Temos Dorflex|Já registrei/);
  env.context.gerarRespostaBot('Quais são as regras para pedidos?');
  assert.match(replies.at(-1), /condições da compra/);
  assert.equal(new Set(replies).size, 4);
});

test('primeira visita não contém CEP, produtos nem autenticação preenchidos', () => {
  const env = environment({}, { privacy: true, empty: true });
  assert.equal(env.run('appState.usuario.cep'), '');
  assert.equal(env.run('appState.carrinho.length'), 0);
  assert.equal(env.run('appState.usuario.autenticado'), false);
});

test('recarregar limpa etapas e conversa mas conserva CEP e carrinho da própria aba', async () => {
  const first = environment({}, { privacy: true });
  chat(first); send(first, 'ver total');
  first.context.PMPrivacy.storage.setItem('pm_pending_purchase', 'chat');
  const second = environment(Object.fromEntries(first.store), { privacy: true, empty: true, navigation: 'reload' });
  assert.equal(second.context.PMPrivacy.storage.getItem('pm_guided_chat'), null);
  assert.equal(second.context.PMPrivacy.storage.getItem('pm_pending_purchase'), null);
  second.load('auth-config.js'); second.load('auth.js'); await second.context.PMAuth.ready;
  assert.equal(second.run('appState.usuario.cep'), '50000-000');
  assert.equal(second.run('appState.carrinho.length'), 2);
  chat(second);
  assert.equal(second.elements.get('guided-back').hidden, true);
  assert.match(second.elements.get('guided-messages').children[0].children[0].children[1].textContent, /Olá/);
});

test('retorno deliberado do login preserva etapas sem reaproveitar registros antigos sem dono', () => {
  const env = environment({ pm_cep: '12345-678', pm_guided_chat: '{"step":"revisao"}' }, { privacy: true, empty: true });
  assert.equal(env.context.PMPrivacy.storage.getItem('pm_cep'), null);
  assert.equal(env.store.has('pm_cep'), false);
  env.context.PMPrivacy.storage.setItem('pm_guided_chat', '{"messages":[],"step":"revisao"}');
  env.context.PMPrivacy.storage.setItem('pm_pending_purchase', 'chat');
  const returned = environment(Object.fromEntries(env.store), { privacy: true, empty: true });
  assert.match(returned.context.PMPrivacy.storage.getItem('pm_guided_chat'), /revisao/);
});

test('contas e navegadores diferentes não reutilizam dados privados', () => {
  const env = environment({}, { privacy: true, empty: true });
  const privacy = env.context.PMPrivacy;
  privacy.setUser('account-a'); privacy.storage.setItem('pm_cep', '60000-001');
  privacy.storage.setItem('pm_guided_chat', 'conversa privada A');
  assert.equal(privacy.setUser('account-b'), true);
  assert.equal(privacy.storage.getItem('pm_cep'), null);
  assert.equal(privacy.storage.getItem('pm_guided_chat'), null);
  privacy.storage.setItem('pm_cep', '70000-002');
  privacy.setUser('account-a');
  assert.equal(privacy.storage.getItem('pm_cep'), null);
  const other = environment({}, { privacy: true, empty: true });
  assert.equal(other.context.PMPrivacy.storage.getItem('pm_cep'), null);
});

test('troca de identidade limpa os dados em memória e logout limpa o armazenamento', async () => {
  const env = environment({}, { privacy: true }); let authEvent; let identity = { id: 'a', email: 'a@example.com' }; let sdkOptions;
  env.context.PM_AUTH_CONFIG = { supabaseUrl: 'https://example.supabase.co', supabasePublicKey: 'public-test' };
  env.context.supabase = { createClient: (url, key, options) => {
    sdkOptions = options;
    return { auth: { onAuthStateChange(callback) { authEvent = callback; },
      getUser: async () => ({ data: { user: identity }, error: null }),
      signOut: async () => { authEvent('SIGNED_OUT', null); return {}; }
    } };
  } };
  env.load('auth.js'); await env.context.PMAuth.ready;
  assert.equal(sdkOptions.auth.storageKey, 'pm_auth_session_v2');
  assert.equal(sdkOptions.auth.storage, env.context.PMPrivacy.authStorage);
  chat(env); send(env, 'oi');
  identity = { id: 'b', email: 'b@example.com' };
  authEvent('SIGNED_IN', { user: identity });
  assert.equal(env.run('appState.usuario.cep'), '');
  assert.equal(env.run('appState.carrinho.length'), 0);
  assert.equal(env.elements.get('guided-messages').children.length, 0);
  env.context.PMPrivacy.storage.setItem('pm_cep', '12345-678');
  await env.context.PMAuth.logout();
  assert.equal(env.context.PMPrivacy.storage.getItem('pm_cep'), null);
  assert.equal(env.run('appState.usuario.autenticado'), false);
});

test('sair e apagar funciona mesmo sem serviço de login configurado', async () => {
  const env = environment({}, { privacy: true });
  env.load('auth-config.js'); env.load('auth.js'); await env.context.PMAuth.ready;
  chat(env);
  await env.context.PMAuth.clearLocalData();
  assert.equal(env.context.PMPrivacy.storage.getItem('pm_cep'), null);
  assert.equal(env.context.PMPrivacy.storage.getItem('pm_cart'), null);
  assert.equal(env.run('appState.carrinho.length'), 0);
  assert.equal(env.context.destination, 'index.html');
});

test('inicialização visual não sobrescreve carrinho privado antes de validar a conta', async () => {
  const saved = JSON.stringify([{ id: 'med-01', qtd: 3 }]);
  const env = environment({ pm_private_owner_v2: 'user:a', 'pm_private_v2:user%3Aa:pm_cart': saved }, { privacy: true, empty: true });
  let respond;
  env.context.PM_AUTH_CONFIG = { supabaseUrl: 'https://example.supabase.co', supabasePublicKey: 'public-test' };
  env.context.supabase = { createClient: () => ({ auth: {
    onAuthStateChange() {}, getUser: () => new Promise(resolve => { respond = resolve; })
  } }) };
  env.load('auth.js');
  await new Promise(resolve => setImmediate(resolve));
  env.nativeCartUI();
  assert.equal(env.context.PMPrivacy.storage.getItem('pm_cart'), saved);
  assert.equal(env.run('appState.carrinho.length'), 0);
  respond({ data: { user: { id: 'a' } }, error: null });
  await env.context.PMAuth.ready;
  assert.equal(env.run('appState.carrinho[0].qtd'), 3);
});

test('textos públicos não apresentam o site como protótipo ou demonstração', () => {
  const marker = /\b(?:protótipo|prototipo|demonstração|demonstracao|demonstrativo|demonstrativa|simulado|simulada|simular)\b/i;
  for (const file of ['html/index.html', 'html/sobre.html', 'html/ajuda.html', 'html/login.html', 'js/purchase-chat.js', 'js/script.js', 'js/auth.js', 'js/accessible-help.js']) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    assert.doesNotMatch(source, marker, file);
  }
});

test('sem serviço de pedidos, confirmar preserva carrinho e etapa sem sucesso artificial', async () => {
  const env = environment(); const actions = paymentStage(env);
  click(findButton(actions, 'Boleto bancário'));
  const success = env.element('modal-sucesso-pedido', 'dialog');
  env.context.PMAuth = { requireLogin: async () => true };
  const before = env.run('obterTotalItensCarrinho()');
  await click(findButton(actions, 'Confirmar pedido'));
  assert.equal(env.run('obterTotalItensCarrinho()'), before);
  assert.equal(success.open, false);
  assert.equal(env.elements.get('guided-purchase-dialog').open, true);
  assert.match(env.elements.get('guided-notice-text').textContent, /ainda não está disponível/);
  assert.ok(findButton(actions, 'Confirmar pedido'));
});

test('seleção de pagamento não exibe QR Code ou cobrança sem integração', () => {
  const env = environment(); const view = env.element('payment-details-view');
  for (const method of ['pix', 'card', 'boleto', 'pbm']) {
    env.context.trocarFormaPagamento(method);
    assert.equal(view.children.length, 2);
    assert.doesNotMatch(view.innerHTML, /BR.GOV.BCB.PIX|<svg|<input/);
  }
});

test('busca normaliza acentos, preserva as fotos e limpa resultados antigos quando vazia', () => {
  const env = environment();
  const input = env.element('campo-busca'); input.value = 'dipirona';
  const grid = env.element('products-grid-container'); env.element('products-active-filter-label');
  env.context.buscarProduto();
  assert.match(grid.innerHTML, /\.\.\/css\/assets\/produtos\/med-02\.png/);
  assert.doesNotMatch(grid.innerHTML, /Foto oficial|role="button"/);
  assert.match(grid.innerHTML, /button type="button" class="product-image-box"/);
  input.value = 'produto inexistente xyz'; env.context.buscarProduto();
  assert.match(grid.innerHTML, /Nenhum produto encontrado/);
  assert.doesNotMatch(grid.innerHTML, /med-02.png/);
  input.value = 'restauracao'; env.context.buscarProduto();
  assert.match(grid.innerHTML, /Pantene/);
});

test('produto inexistente não abre silenciosamente o primeiro medicamento', () => {
  const env = environment(); const modal = env.element('modal-produto-detalhe', 'dialog');
  env.element('modal-prod-body'); env.context.abrirDetalheProduto('produto inexistente');
  assert.equal(modal.open, false);
});

test('detalhes do medicamento não apresentam doses não verificadas como informação oficial', () => {
  const env = environment(); env.element('modal-produto-detalhe', 'dialog');
  const body = env.element('modal-prod-body'); env.context.abrirDetalheProduto('med-01');
  assert.doesNotMatch(body.innerHTML, /Posologia Básica|Informação Oficial de Saúde/);
  assert.equal(body.innerHTML.includes(env.run('CATALOGO_PRODUTOS[0].modoUso')), false);
  assert.match(body.innerHTML, /não define doses ou tratamentos/);
});

test('CEP enviado na conversa confirma a entrega sem exigir troca para outro campo', () => {
  const env = environment(); const actions = chat(env);
  click(findButton(actions, 'Continuar para entrega'));
  send(env, 'CEP: 60123-456');
  assert.equal(env.run('appState.usuario.cep'), '60123-456');
  assert.ok(findButton(actions, 'Boleto bancário'));
});

test('assistente adiciona e remove por nome sem escolher entre opções ambíguas', () => {
  const env = environment(); const actions = chat(env);
  send(env, 'adicione Dorflex');
  assert.equal(env.run("appState.carrinho.find(item => item.id === 'med-01').qtd"), 1);
  send(env, 'remova Dorflex');
  assert.equal(env.run("appState.carrinho.some(item => item.id === 'med-01')"), false);
  assert.equal(env.elements.get('guided-undo').hidden, false);
  const before = env.run('obterTotalItensCarrinho()');
  send(env, 'adicione Lavitan');
  assert.equal(env.run('obterTotalItensCarrinho()'), before);
  assert.ok(findButton(actions, 'Ver produtos'));
});

test('mensagem inesperada no pagamento preserva a etapa e explica a próxima ação', () => {
  const env = environment(); const actions = paymentStage(env);
  send(env, 'não entendi essa parte');
  assert.ok(findButton(actions, 'Pix'));
  assert.match(env.elements.get('guided-notice-text').textContent, /etapa de pagamento/);
  send(env, 'voltar');
  assert.ok(env.elements.get('guided-cep'));
  assert.equal(env.elements.get('guided-back').textContent, 'Voltar para produtos');
});

test('bloqueio do armazenamento de preferências não impede a inicialização', () => {
  const env = environment();
  env.context.localStorage = { getItem() { throw Error('Bloqueado'); }, setItem() { throw Error('Bloqueado'); } };
  assert.doesNotThrow(() => env.context.inicializarEstadoAcessibilidade());
  assert.doesNotThrow(() => env.context.verificarCardBoasVindas());
  assert.doesNotThrow(() => env.context.sincronizarContraste(true));
});

test('preferência de fonte inválida não corrompe layout e ajuste permite 200%', () => {
  const env = environment(); let value;
  env.context.document.documentElement = { style: { setProperty(name, next) { value = next; } } };
  env.context.localStorage.getItem = key => key === 'pm_font_scale' ? 'valor inválido' : null;
  env.context.inicializarEstadoAcessibilidade();
  assert.equal(env.run('appState.fontScale'), 1);
  env.run('appState.fontScale = 1.95'); env.context.ajustarEscalaFonte(1);
  assert.equal(env.run('appState.fontScale'), 2);
  assert.equal(value, '2rem');
});

test('voz na busca exige revisão antes de enviar mensagem ou iniciar busca', () => {
  const env = environment(); let recognition; let sent = 0;
  const input = env.element('chat-input');
  env.context.enviarMensagemChat = () => { sent++; };
  env.context.SpeechRecognition = class { constructor() { recognition = this; } start() {} };
  env.context.ativarBuscaPorVoz('chat-input', true);
  recognition.onresult({ results: [[{ transcript: 'buscar CeraVe' }]] });
  assert.equal(input.value, 'buscar CeraVe');
  assert.equal(sent, 0);
});

test('quantidade máxima não é ultrapassada por adicionar ou desfazer', () => {
  const env = environment();
  env.run("appState.carrinho = [{ id: 'med-01', nome: 'Dorflex', preco: 17.49, qtd: 99 }]");
  env.context.adicionarAoCarrinho('med-01', 'Dorflex', 0.01);
  assert.equal(env.run('appState.carrinho[0].qtd'), 99);
  env.context.removerDoCarrinho('med-01');
  env.context.adicionarAoCarrinho('med-01', 'Dorflex', 0.01);
  env.context.desfazerRemocaoCarrinho();
  assert.equal(env.run('appState.carrinho[0].qtd'), 1);
  env.context.alterarQtdCarrinho('med-01', -1);
  env.context.desfazerRemocaoCarrinho();
  assert.equal(env.run('appState.carrinho[0].qtd'), 1);
  env.context.desfazerRemocaoCarrinho();
  assert.equal(env.run('appState.carrinho[0].qtd'), 1);
});

test('Todas as categorias apresenta o catálogo inteiro e favoritos expõem seu estado', () => {
  const env = environment(); const grid = env.element('products-grid-container');
  env.context.renderizarProdutosVitrine('todas');
  const count = (grid.innerHTML.match(/<article /g) || []).length;
  assert.equal(count, env.run('CATALOGO_PRODUTOS.length'));
  const favorite = env.element('favorite', 'button');
  env.context.toggleFavoritoProduto('med-01', favorite);
  assert.equal(favorite.getAttribute('aria-pressed'), 'true');
  env.context.toggleFavoritoProduto('med-01', favorite);
  assert.equal(favorite.getAttribute('aria-pressed'), 'false');
});

test('atalhos não confundem acompanhamento com pagamento e menu usa navegação nativa', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'html', 'index.html'), 'utf8');
  assert.match(html, /href="ajuda.html#assistente-ia">Acompanhar pedido/);
  assert.doesNotMatch(html, /href="(?:index.html)?#lojas"/);
  assert.doesNotMatch(html, /role="menubar"|role="menuitem"/);
  assert.match(html, /onclick="pararLeitura\(\)"/);
});

test('leitura em voz alta indisponível não impede consultar detalhes', () => {
  const env = environment(); env.context.SpeechSynthesisUtterance = class {};
  env.context.speechSynthesis = { cancel() {}, speak() { throw Error('Sem voz'); } };
  assert.doesNotThrow(() => env.context.ouvirDescricaoProduto('Informações do produto'));
});

test('O que faço agora posiciona o aviso abaixo do resumo fixo sem rolar para os produtos', () => {
  const env = environment(); chat(env);
  const card = env.elements.get('guided-notice'); let scroll; let measureAfterLayout;
  const shell = {
    scrollTop: 200, clientTop: 0,
    getBoundingClientRect: () => ({ top: 50 }),
    querySelector: () => ({ getBoundingClientRect: () => ({ height: 100 }) }),
    scrollTo(options) { scroll = options; }
  };
  card.closest = () => shell;
  card.getBoundingClientRect = () => ({ top: 700 });
  env.context.getComputedStyle = () => ({ position: 'sticky' });
  env.context.requestAnimationFrame = callback => { measureAfterLayout = callback; };
  click(env.elements.get('guided-next-help'));
  assert.equal(scroll, undefined);
  measureAfterLayout();
  assert.equal(scroll.top, 734);
  assert.equal(scroll.behavior, 'instant');
  assert.equal(env.context.document.activeElement, env.elements.get('guided-notice-title'));
  assert.equal(card.hidden, false);
});
