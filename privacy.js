/* Dados de compra ficam na aba e separados pela identidade autenticada.
   Não é autorização de servidor: pedidos reais precisam de validação no backend. */
window.PMPrivacy = (() => {
  const memory = new Map();
  const raw = {
    getItem(key) { try { return sessionStorage.getItem(key); } catch { return memory.get(key) ?? null; } },
    setItem(key, value) { try { sessionStorage.setItem(key, value); } catch { memory.set(key, String(value)); } },
    removeItem(key) { try { sessionStorage.removeItem(key); } catch {} memory.delete(key); }
  };
  const keys = ['pm_cart', 'pm_cep', 'pm_payment', 'pm_guided_chat', 'pm_pending_purchase'];
  const ownerKey = 'pm_private_owner_v2';
  let owner = raw.getItem(ownerKey) || 'guest';
  const keyFor = (key, who = owner) => `pm_private_v2:${encodeURIComponent(who)}:${key}`;
  const storage = {
    getItem(key) { return raw.getItem(keyFor(key)); },
    setItem(key, value) { raw.setItem(keyFor(key), value); },
    removeItem(key) { raw.removeItem(keyFor(key)); }
  };
  // Não importar registros antigos sem identificação de dono.
  keys.forEach(key => { raw.removeItem(key); try { localStorage.removeItem(key); } catch {} });
  function clearOwner(who) { keys.forEach(key => raw.removeItem(keyFor(key, who))); }
  function setUser(id) {
    const next = id ? `user:${id}` : 'guest';
    if (next === owner) return false;
    const carryGuest = owner === 'guest' && Boolean(id);
    const carry = carryGuest ? keys.map(key => [key, storage.getItem(key)]) : [];
    clearOwner(owner);
    clearOwner(next);
    owner = next;
    raw.setItem(ownerKey, owner);
    carry.forEach(([key, value]) => { if (value !== null) storage.setItem(key, value); });
    return !carryGuest;
  }
  function clear() {
    clearOwner(owner); clearOwner('guest');
    owner = 'guest'; raw.removeItem(ownerKey);
    raw.removeItem('pm_auth_session_v2');
    raw.removeItem('pm_auth_session_v2-code-verifier');
  }
  let reload = false;
  try { reload = window.performance?.getEntriesByType('navigation')[0]?.type === 'reload'; } catch {}
  // Recarregar inicia as etapas novamente. Retorno deliberado do login é a exceção.
  if (reload || !storage.getItem('pm_pending_purchase')) {
    storage.removeItem('pm_guided_chat');
    storage.removeItem('pm_payment');
  }
  if (reload) storage.removeItem('pm_pending_purchase');
  return { storage, authStorage: raw, setUser, clear };
})();
