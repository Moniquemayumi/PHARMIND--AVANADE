/* Login real via Supabase Auth. Sem configuração, a compra permanece bloqueada. */
window.PMAuth = (() => {
  let client;
  let user = null;
  const storage = {
    get(key) { try { return purchaseStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { purchaseStorage.setItem(key, value); } catch {} },
    remove(key) { try { purchaseStorage.removeItem(key); } catch {} }
  };
  function message(text, error = false) {
    const status = document.getElementById('auth-status');
    if (status) {
      status.textContent = text;
      status.setAttribute('role', error ? 'alert' : 'status');
      if (error) status.focus();
    }
  }
  function savePurchase(mode) {
    storage.set('pm_pending_purchase', mode === 'chat' ? 'chat' : 'checkout');
    storage.set('pm_cart', JSON.stringify(appState.carrinho));
    storage.set('pm_cep', appState.usuario.cep);
    storage.set('pm_payment', appState.formaPagamentoSelecionada);
    if (window.PMChat) PMChat.save();
  }
  function syncUser(nextUser) {
    if (window.PMPrivacy?.setUser(nextUser?.id || null)) limparDadosCompraAtual();
    user = nextUser;
    appState.usuario.autenticado = Boolean(user);
    appState.usuario.nome = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Visitante';
    atualizarDadosUsuarioUI();
    const account = document.getElementById('account-panel');
    const form = document.getElementById('login-panel');
    if (account) account.hidden = !user;
    if (form) form.hidden = Boolean(user);
    const name = document.getElementById('account-name');
    if (name) name.textContent = appState.usuario.nome;
    const linked = Boolean(user?.identities?.some(identity => identity.provider === 'google'));
    const link = document.getElementById('link-google');
    if (link) { link.disabled = linked; link.textContent = linked ? 'Conta Google vinculada' : 'Vincular minha conta ao Google'; }
  }
  async function verify() {
    await ready;
    if (!client) return false;
    try {
      const { data, error } = await client.auth.getUser();
      syncUser(error ? null : data.user);
      return Boolean(user);
    } catch { syncUser(null); return false; }
  }
  function goToLogin(mode) {
    if (mode) savePurchase(mode);
    else {
      storage.set('pm_cart', JSON.stringify(appState.carrinho));
      storage.set('pm_cep', appState.usuario.cep);
    }
    location.assign('login.html');
  }
  async function requireLogin(mode) {
    if (await verify()) return true;
    goToLogin(mode);
    return false;
  }
  function continuePurchase() { location.assign('index.html'); }
  async function run(action) {
    await ready;
    if (!client) { message('O login ainda não está disponível. Você pode continuar navegando; a conclusão da compra exige uma conta conectada.', true); return; }
    const form = document.getElementById('login-form');
    if (form?.getAttribute('aria-busy') === 'true') return;
    if (form) form.setAttribute('aria-busy', 'true');
    document.querySelectorAll('[data-auth-action]').forEach(button => { button.disabled = true; });
    message('Aguarde, conectando sua conta…');
    try { await action(); }
    catch { message('Não foi possível conectar. Confira seus dados e sua conexão e tente novamente.', true); }
    finally {
      if (form) form.setAttribute('aria-busy', 'false');
      document.querySelectorAll('[data-auth-action]').forEach(button => { button.disabled = false; });
      syncUser(user);
    }
  }
  async function login(event) {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    await run(async () => {
      const { error } = await client.auth.signInWithPassword({
        email: document.getElementById('auth-email').value.trim(),
        password: document.getElementById('auth-password').value
      });
      if (error) { message('E-mail ou senha inválidos. Confira os dados ou use a recuperação de senha.', true); return; }
      if (await verify()) continuePurchase();
    });
  }
  async function signup() {
    const form = document.getElementById('login-form');
    if (!form.reportValidity()) return;
    const password = document.getElementById('auth-password');
    if (password.value.length < 8) {
      password.setAttribute('aria-invalid', 'true');
      message('Para criar uma conta, use uma senha com pelo menos 8 caracteres.', true);
      password.focus(); return;
    }
    password.removeAttribute('aria-invalid');
    await run(async () => {
      const { error } = await client.auth.signUp({
        email: document.getElementById('auth-email').value.trim(),
        password: document.getElementById('auth-password').value,
        options: { emailRedirectTo: new URL('login.html', location.href).href }
      });
      if (error) { message('Não foi possível criar a conta. Use uma senha com pelo menos 8 caracteres ou tente recuperar seu acesso.', true); return; }
      message('Solicitação recebida. Confira seu e-mail para confirmar a conta e depois entre com sua senha.');
    });
  }
  async function google(link = false) {
    await run(async () => {
      const options = { redirectTo: new URL('login.html', location.href).href };
      const result = link
        ? await client.auth.linkIdentity({ provider: 'google', options })
        : await client.auth.signInWithOAuth({ provider: 'google', options });
      if (result.error) message('Não foi possível conectar ao Google. Tente novamente ou entre por e-mail.', true);
    });
  }
  async function resetPassword() {
    const email = document.getElementById('auth-email');
    if (!email.reportValidity()) return;
    await run(async () => {
      const { error } = await client.auth.resetPasswordForEmail(email.value.trim(), {
        redirectTo: new URL('login.html?recovery=1', location.href).href
      });
      if (error) { message('Não foi possível enviar o e-mail. Tente novamente.', true); return; }
      message('Se houver uma conta com esse e-mail, você receberá um link para redefinir a senha.');
    });
  }
  async function updatePassword(event) {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    await run(async () => {
      const { error } = await client.auth.updateUser({ password: document.getElementById('new-password').value });
      if (error) { message('Não foi possível atualizar a senha. Solicite um novo link de recuperação.', true); return; }
      document.getElementById('recovery-panel').hidden = true;
      message('Senha atualizada. Você já pode continuar sua compra.');
    });
  }
  async function logout() {
    await run(async () => {
      const { error } = await client.auth.signOut();
      if (error) throw error;
      syncUser(null);
      storage.remove('pm_pending_purchase');
      message('Você saiu da conta. Os dados privados da compra foram apagados desta aba.');
    });
  }
  function restorePurchase() {
    // Carrinho é persistido como dados do catálogo, nunca como preços confiáveis do cliente.
    try {
      const saved = JSON.parse(storage.get('pm_cart'));
      if (Array.isArray(saved)) appState.carrinho = saved.flatMap(item => {
        const product = CATALOGO_PRODUTOS.find(product => product.id === item.id);
        return product && Number.isInteger(item.qtd) && item.qtd > 0 && item.qtd <= 99
          ? [{ id: product.id, nome: product.nome, preco: product.preco, qtd: item.qtd }] : [];
      });
      const cep = storage.get('pm_cep');
      if (/^\d{5}-?\d{3}$/.test(cep || '')) appState.usuario.cep = cep;
      const payment = storage.get('pm_payment');
      if (['pix', 'card', 'boleto', 'pbm'].includes(payment)) appState.formaPagamentoSelecionada = payment;
    } catch {}
    purchaseStorageReady = true;
    atualizarCarrinhoUI();
  }
  const ready = (async () => {
    const config = window.PM_AUTH_CONFIG || {};
    if (!config.supabaseUrl || !config.supabasePublicKey) {
      syncUser(null);
      restorePurchase();
      message('O acesso à conta está temporariamente indisponível. Você pode continuar navegando e montar seu carrinho. Tente entrar novamente mais tarde.');
      document.querySelectorAll('[data-auth-action]').forEach(button => { button.disabled = true; });
      return;
    }
    try {
      // Remove somente a sessão legada deste projeto, antes guardada no armazenamento compartilhado do navegador.
      try {
        const project = new URL(config.supabaseUrl).hostname.split('.')[0];
        localStorage.removeItem(`sb-${project}-auth-token`);
        localStorage.removeItem(`sb-${project}-auth-token-code-verifier`);
      } catch {}
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js';
        script.onload = resolve; script.onerror = reject;
        document.head.appendChild(script);
      });
      client = window.supabase.createClient(config.supabaseUrl, config.supabasePublicKey, {
        auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true,
          storage: window.PMPrivacy?.authStorage || sessionStorage, storageKey: 'pm_auth_session_v2' }
      });
      client.auth.onAuthStateChange((event, session) => {
        syncUser(session?.user || null);
        if (event === 'PASSWORD_RECOVERY') {
          const panel = document.getElementById('recovery-panel');
          if (panel) { panel.hidden = false; document.getElementById('new-password').focus(); }
        }
      });
      const { data, error } = await client.auth.getUser();
      syncUser(error ? null : data.user);
      restorePurchase();
      if (user) message('Conta conectada. Você pode continuar sua compra ou gerenciar o vínculo com Google.');
      else message('Entre na sua conta para concluir a compra.');
    } catch {
      syncUser(null);
      restorePurchase();
      message('O serviço de login não está disponível agora. Tente novamente em instantes.', true);
    }
  })();
  document.addEventListener('DOMContentLoaded', async () => {
    await ready;
    const pending = storage.get('pm_pending_purchase');
    if (!document.getElementById('login-form') && pending && user) {
      storage.remove('pm_pending_purchase');
      if (pending === 'chat' && window.PMChat) PMChat.open(true);
      else iniciarCheckoutGuiadoIA();
    }
  });
  async function clearLocalData() {
    await ready;
    try {
      if (client) {
        const { error } = await client.auth.signOut({ scope: 'local' });
        if (error) throw error;
      }
      window.PMPrivacy?.clear();
      limparDadosCompraAtual();
      syncUser(null);
      ['pm_cart', 'pm_cep', 'pm_payment', 'pm_guided_chat', 'pm_pending_purchase'].forEach(key => storage.remove(key));
      location.assign('index.html');
    } catch {
      const status = document.getElementById('privacy-status');
      if (status) status.textContent = 'Não foi possível sair da conta agora. Confira sua conexão e tente novamente.';
    }
  }
  return { ready, verify, requireLogin, goToLogin, login, signup, google, resetPassword, updatePassword, logout, continuePurchase, storage, clearLocalData };
})();
