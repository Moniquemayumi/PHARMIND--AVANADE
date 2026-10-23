// Mesmo ponto de ajuda em todas as páginas, sem sobrepor conteúdo ou abrir sozinho.
(() => {
  const header = document.querySelector('.main-header');
  if (!header || document.getElementById('site-help')) return;
  const panel = document.createElement('details');
  panel.id = 'site-help'; panel.className = 'site-help container';
  panel.innerHTML = `
    <summary>Preciso de ajuda</summary>
    <nav aria-label="Ajuda para usar o site">
      <a class="btn btn-secondary" href="index.html#assistente-ia">Comprar com a assistente</a>
      <a class="btn btn-secondary" href="ajuda.html#guia-de-compra">Como comprar e usar o teclado</a>
      <a class="btn btn-secondary" href="ajuda.html#atendimento-humano">Procurar atendimento humano</a>
      <a class="btn btn-secondary" href="ajuda.html#privacidade">Como meus dados são usados</a>
    </nav>
    <p>Você pode usar texto, teclado ou voz. A leitura em voz alta é opcional.</p>`;
  const privacy = document.createElement('p');
  privacy.textContent = 'Ao recarregar, as etapas recomeçam. Seus dados de compra ficam apenas nesta aba, separados por conta. Em aparelho compartilhado, saia e apague seus dados ao terminar.';
  const clear = document.createElement('button');
  clear.type = 'button'; clear.className = 'btn btn-secondary'; clear.textContent = 'Sair e apagar meus dados desta aba';
  clear.onclick = () => window.PMAuth?.clearLocalData();
  const feedback = document.createElement('p'); feedback.id = 'privacy-status'; feedback.setAttribute('role', 'status');
  panel.append(privacy, clear, feedback);
  header.after(panel);
})();
