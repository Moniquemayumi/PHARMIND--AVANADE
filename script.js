
const CATALOGO_PRODUTOS = [

  {
    id: 'med-01',
    nome: 'Analgésico Dorflex 36 Comprimidos',
    categoriaId: 'medicamentos',
    categoriaNome: 'Medicamentos',
    preco: 17.49,
    precoAntigo: 21.90,
    desconto: '-20%',
    avaliacao: 4.9,
    avaliacoesTotal: 842,
    isDestaque: true,
    isMedicamento: true,
    imagem: 'assets/produtos/med-01.jpg',
    avisoReceita: 'Medicamento isento de prescrição médica (MIP). Indicado para dor e relaxamento muscular.',
    descricao: 'Indicado no alívio da dor associada a contraturas musculares decorrentes de processos traumáticos ou inflamatórios.',
    modoUso: 'Tomar de 1 a 2 comprimidos, de 3 a 4 vezes ao dia. Não ultrapassar o limite diário recomendado na bula.'
  },
  {
    id: 'med-02',
    nome: 'Dipirona Monoidratada 500mg 10 Comprimidos Genérico EMS',
    categoriaId: 'medicamentos',
    categoriaNome: 'Medicamentos',
    preco: 3.49,
    precoAntigo: 5.20,
    desconto: '-33%',
    avaliacao: 4.8,
    avaliacoesTotal: 960,
    isDestaque: true,
    isMedicamento: true,
    imagem: 'assets/produtos/med-02.png',
    avisoReceita: 'Medicamento genérico isento de prescrição médica (MIP). Analgésico e antitérmico.',
    descricao: 'Eficaz no alívio de dores de intensidade leve a moderada e redução de estados febris em adultos e adolescentes.',
    modoUso: 'Ingerir 1 comprimido com água em caso de dor ou febre, respeitando o intervalo mínimo de 6 horas.'
  },
  {
    id: 'med-03',
    nome: 'Analgésico Neosaldina Dipirona Caixa 20 Drágeas',
    categoriaId: 'medicamentos',
    categoriaNome: 'Medicamentos',
    preco: 30.99,
    precoAntigo: 36.90,
    desconto: '-16%',
    avaliacao: 4.9,
    avaliacoesTotal: 730,
    isDestaque: false,
    isMedicamento: true,
    imagem: 'assets/produtos/med-03.jpg',
    avisoReceita: 'Medicamento isento de prescrição médica (MIP). Alívio rápido para cefaleias.',
    descricao: 'Medicamento com ação analgésica e antiespasmódica, desenvolvido para combater dores de cabeça e crises de enxaqueca.',
    modoUso: 'Tomar 1 a 2 drágeas em dose única a cada 6 horas se persistir a dor. Não mastigar as drágeas.'
  },
  {
    id: 'med-04',
    nome: 'Antigripal Cimegripe 20 Cápsulas',
    categoriaId: 'medicamentos',
    categoriaNome: 'Medicamentos',
    preco: 14.89,
    precoAntigo: 18.90,
    desconto: '-21%',
    avaliacao: 4.7,
    avaliacoesTotal: 410,
    isDestaque: false,
    isMedicamento: true,
    imagem: 'assets/produtos/med-04.jpg',
    avisoReceita: 'Medicamento isento de prescrição médica (MIP). Sintomas de gripes e resfriados.',
    descricao: 'Tratamento dos sintomas gripais, como coriza, febre, congestão nasal e dores musculares generalizadas.',
    modoUso: 'Adultos de 18 a 60 anos: 1 cápsula a cada 4 horas. Não exceder 4 cápsulas em 24 horas.'
  },
  {
    id: 'med-05',
    nome: 'Paracetamol 500mg 10 Comprimidos Genérico Prati-Donaduzzi',
    categoriaId: 'medicamentos',
    categoriaNome: 'Medicamentos',
    preco: 8.90,
    precoAntigo: 10.90,
    desconto: '-18%',
    avaliacao: 4.8,
    avaliacoesTotal: 310,
    isDestaque: false,
    isMedicamento: true,
    imagem: 'assets/produtos/med-05.jpg',
    avisoReceita: 'Consulte a bula e peça orientação ao farmacêutico antes de usar.',
    descricao: 'Fórmula padrão para alívio de desconfortos musculares e dores de cabeça ocasionais.',
    modoUso: 'Conforme instruções da embalagem oficial.'
  },

  {
    id: 'pel-01',
    nome: 'NIVEA Loção Hidratante Milk Pele Seca a Extrasseca 400ml',
    categoriaId: 'pele',
    categoriaNome: 'Cuidados com a pele',
    preco: 24.90,
    precoAntigo: 29.90,
    desconto: '-17%',
    avaliacao: 4.7,
    avaliacoesTotal: 208,
    isDestaque: true,
    isMedicamento: false,
    imagem: 'assets/produtos/pel-01.jpg',
    descricao: 'Hidratação profunda por 48 horas com fórmula hipoalergênica para peles secas e sensíveis.',
    modoUso: 'Espalhar por todo o corpo massageando suavemente, especialmente após o banho.'
  },
  {
    id: 'pel-02',
    nome: 'Protetor Labial Nivea Sun Protect Hidratante FPS30 4,8g',
    categoriaId: 'pele',
    categoriaNome: 'Cuidados com a pele',
    preco: 12.90,
    precoAntigo: 15.90,
    desconto: '-19%',
    avaliacao: 4.9,
    avaliacoesTotal: 127,
    isDestaque: true,
    isMedicamento: false,
    imagem: 'assets/produtos/pel-02.png',
    descricao: 'Proteção contra raios solares UVA/UVB e prevenção de ressecamento labial com manteiga de cacau.',
    modoUso: 'Aplicar uniformemente sobre os lábios sempre que necessário ou antes da exposição solar.'
  },
  {
    id: 'pel-03',
    nome: 'Protetor Solar Facial Episol Sec Acqua FPS60 Incolor 40ml',
    categoriaId: 'pele',
    categoriaNome: 'Cuidados com a pele',
    preco: 89.90,
    precoAntigo: 109.90,
    desconto: '-18%',
    avaliacao: 4.9,
    avaliacoesTotal: 520,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/pel-03.png',
    descricao: 'Toque seco imediato, textura fluida e tecnologia que controla a oleosidade por até 12 horas.',
    modoUso: 'Aplicar abundantemente sobre a pele seca 30 minutos antes da exposição ao sol.'
  },
  {
    id: 'pel-04',
    nome: 'CeraVe Loção Hidratante Corporal 473ml',
    categoriaId: 'pele',
    categoriaNome: 'Cuidados com a pele',
    preco: 84.90,
    precoAntigo: 99.90,
    desconto: '-15%',
    avaliacao: 4.9,
    avaliacoesTotal: 680,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/pel-04.jpg',
    descricao: 'Com 3 ceramidas essenciais e ácido hialurônico. Restaura a barreira protetora da pele.',
    modoUso: 'Aplicar generosamente na pele sempre que sentir necessidade de hidratação.'
  },
  {
    id: 'pel-05',
    nome: 'Creme Hidratante Bepantol Derma Toque Seco Oil Free Pele Normal a Seca 30g',
    categoriaId: 'pele',
    categoriaNome: 'Cuidados com a pele',
    preco: 39.90,
    precoAntigo: 48.90,
    desconto: '-18%',
    avaliacao: 4.8,
    avaliacoesTotal: 340,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/pel-05.jpg',
    descricao: 'Dexpantenol puro em fórmula oil-free para hidratação intensiva e rápida absorção facial.',
    modoUso: 'Aplicar uma fina camada sobre o rosto limpo pela manhã e à noite.'
  },

  {
    id: 'hig-01',
    nome: 'Sabonete em Barra Dove Original Hidratante 90g',
    categoriaId: 'higiene',
    categoriaNome: 'Higiene pessoal',
    preco: 4.49,
    precoAntigo: 5.49,
    desconto: '-18%',
    avaliacao: 4.8,
    avaliacoesTotal: 312,
    isDestaque: true,
    isMedicamento: false,
    imagem: 'assets/produtos/hig-01.jpg',
    descricao: 'Fórmula hidratante com pH neutro que limpa suavemente sem ressecar a pele.',
    modoUso: 'Aplicar durante o banho sobre a pele úmida até formar espuma suave e enxaguar em seguida.'
  },
  {
    id: 'hig-02',
    nome: 'Desodorante Antitranspirante Rexona Clinical Classic 96h Aerossol 150ml',
    categoriaId: 'higiene',
    categoriaNome: 'Higiene pessoal',
    preco: 23.90,
    precoAntigo: 28.90,
    desconto: '-17%',
    avaliacao: 4.8,
    avaliacoesTotal: 590,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/hig-02.jpg',
    descricao: 'Proteção avançada 3x mais eficaz contra o suor e o odor, ideal para o dia a dia ativo.',
    modoUso: 'Agitar bem antes de usar e aplicar a 15 cm das axilas por cerca de 2 segundos.'
  },
  {
    id: 'hig-03',
    nome: 'Shampoo Pantene Pro-V Restauração 400ml',
    categoriaId: 'higiene',
    categoriaNome: 'Higiene pessoal',
    preco: 21.90,
    precoAntigo: 26.90,
    desconto: '-19%',
    avaliacao: 4.7,
    avaliacoesTotal: 440,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/hig-03.jpg',
    descricao: 'Tecnologia com Pro-Vitaminas que repara os danos causados por químicas e calor desde o 1º uso.',
    modoUso: 'Massagear sobre os cabelos molhados até espumar e enxaguar bem.'
  },

  {
    id: 'buc-01',
    nome: 'Escova Dental Sensodyne Sensibilidade & Esmalte Cerda Macia 1 Unidade',
    categoriaId: 'bucal',
    categoriaNome: 'Saúde bucal',
    preco: 8.90,
    precoAntigo: 11.90,
    desconto: '-25%',
    avaliacao: 4.6,
    avaliacoesTotal: 541,
    isDestaque: true,
    isMedicamento: false,
    imagem: 'assets/produtos/buc-01.png',
    descricao: 'Cerdas ultramacias com pontas arredondadas que protegem a gengiva e removem a placa bacteriana.',
    modoUso: 'Escovar os dentes 3 vezes ao dia após as refeições ou conforme orientação do dentista.'
  },
  {
    id: 'buc-02',
    nome: 'Creme Dental Colgate Total 12 Whitening 90g',
    categoriaId: 'bucal',
    categoriaNome: 'Saúde bucal',
    preco: 7.90,
    precoAntigo: 9.90,
    desconto: '-20%',
    avaliacao: 4.8,
    avaliacoesTotal: 810,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/buc-02.jpg',
    descricao: 'Até 12 horas de defesa antibacteriana contra placa, gengivite, tártaro e mau hálito.',
    modoUso: 'Escovar cuidadosamente após cada refeição pelo menos duas vezes ao dia.'
  },
  {
    id: 'buc-03',
    nome: 'Antisséptico Bucal Listerine Cool Mint Refrescância Intensa Sabor Hortelã 500ml',
    categoriaId: 'bucal',
    categoriaNome: 'Saúde bucal',
    preco: 24.90,
    precoAntigo: 29.90,
    desconto: '-17%',
    avaliacao: 4.8,
    avaliacoesTotal: 620,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/buc-03.jpg',
    descricao: 'Mata até 99,9% dos germes que causam placa e mau hálito com sabor refrescante de menta.',
    modoUso: 'Bochechar 20ml por 30 segundos pela manhã e à noite. Não engolir.'
  },
  {
    id: 'buc-04',
    nome: 'Fio Dental Reach Essencial Expansion Plus Sabor Menta 100 metros',
    categoriaId: 'bucal',
    categoriaNome: 'Saúde bucal',
    preco: 11.50,
    precoAntigo: 14.90,
    desconto: '-23%',
    avaliacao: 4.9,
    avaliacoesTotal: 490,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/buc-04.jpg',
    descricao: 'Fio resistente que não desfia e desliza suavemente entre os dentes sem machucar a gengiva.',
    modoUso: 'Cortar cerca de 40 cm e passar suavemente entre os espaços interdentais.'
  },

  {
    id: 'beb-01',
    nome: 'Fralda Pampers Confort Sec M 70 Unidades',
    categoriaId: 'bebes',
    categoriaNome: 'Mamães e bebês',
    preco: 59.90,
    precoAntigo: 72.90,
    desconto: '-18%',
    avaliacao: 4.9,
    avaliacoesTotal: 920,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/beb-01.jpg',
    descricao: 'Com canais de ar que mantêm o bebê sequinho por até 12 horas de sono tranquilo.',
    modoUso: 'Posicionar o bebê e prender as fitas elásticas sem apertar o abdômen.'
  },
  {
    id: 'beb-02',
    nome: 'Lenços Umedecidos Pampers Cuidado de Bebê 48 Unidades',
    categoriaId: 'bebes',
    categoriaNome: 'Mamães e bebês',
    preco: 13.90,
    precoAntigo: 16.90,
    desconto: '-18%',
    avaliacao: 4.8,
    avaliacoesTotal: 580,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/beb-02.jpg',
    descricao: 'Limpam e refrescam suavemente, sem álcool, corantes ou parabenos.',
    modoUso: 'Puxar pela abertura adesiva e higienizar a pele a cada troca.'
  },
  {
    id: 'beb-03',
    nome: 'Creme Preventivo De Assaduras Desitin Máxima Duração 57G',
    categoriaId: 'bebes',
    categoriaNome: 'Mamães e bebês',
    preco: 32.90,
    precoAntigo: 39.90,
    desconto: '-18%',
    avaliacao: 4.9,
    avaliacoesTotal: 410,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/beb-03.jpg',
    descricao: 'Barreira protetora imediata enriquecida com óxido de zinco para prevenir assaduras.',
    modoUso: 'Aplicar a cada troca de fralda após limpar e secar a pele do bebê.'
  },

  {
    id: 'vit-01',
    nome: 'Suplemento Alimentar Lavitan AZ Original 60 Comprimidos',
    categoriaId: 'vitaminas',
    categoriaNome: 'Vitaminas e bem-estar',
    preco: 35.79,
    precoAntigo: 44.90,
    desconto: '-20%',
    avaliacao: 4.9,
    avaliacoesTotal: 870,
    isDestaque: true,
    isMedicamento: false,
    imagem: 'assets/produtos/vit-01.jpg',
    descricao: 'Suplemento vitamínico e mineral diário que fornece energia, imunidade e disposição.',
    modoUso: 'Ingerir 1 comprimido ao dia com água, de preferência junto à principal refeição.'
  },
  {
    id: 'vit-02',
    nome: 'Suplemento Alimentar Lavitan Cabelos E Unhas 30 Cápsulas',
    categoriaId: 'vitaminas',
    categoriaNome: 'Vitaminas e bem-estar',
    preco: 22.99,
    precoAntigo: 28.90,
    desconto: '-20%',
    avaliacao: 4.8,
    avaliacoesTotal: 430,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/vit-02.jpg',
    descricao: 'Rico em biotina, zinco e vitamina B6 para fortalecimento capilar e unhas mais resistentes.',
    modoUso: 'Tomar 1 cápsula ao dia. Não engorda e não contém açúcar.'
  },
  {
    id: 'vit-03',
    nome: 'Vitamina C Redoxon 1g Sabor Laranja 10 Comprimidos Efervescentes',
    categoriaId: 'vitaminas',
    categoriaNome: 'Vitaminas e bem-estar',
    preco: 16.90,
    precoAntigo: 21.90,
    desconto: '-23%',
    avaliacao: 4.8,
    avaliacoesTotal: 650,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/vit-03.jpg',
    descricao: 'Dose potente de vitamina C para reforço rápido das defesas naturais do organismo.',
    modoUso: 'Dissolver 1 comprimido em 200 ml de água filtrada uma vez ao dia.'
  },
  {
    id: 'vit-04',
    nome: 'Centrum de A a Zinco Adulto 30 Comprimidos',
    categoriaId: 'vitaminas',
    categoriaNome: 'Vitaminas e bem-estar',
    preco: 64.90,
    precoAntigo: 79.90,
    desconto: '-19%',
    avaliacao: 4.9,
    avaliacoesTotal: 390,
    isDestaque: false,
    isMedicamento: false,
    imagem: 'assets/produtos/vit-04.jpg',
    descricao: 'Fórmula completa e balanceada que complementa a alimentação com micronutrientes essenciais.',
    modoUso: 'Ingerir 1 comprimido ao dia acompanhado de líquidos.'
  }
];

const purchaseStorage = window.PMPrivacy?.storage || sessionStorage;
let purchaseStorageReady = !window.PMPrivacy;
const preferences = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch {} }
};
const appState = {
  usuario: {
    autenticado: false,
    nome: 'Visitante',
    cep: ''
  },
  formaPagamentoSelecionada: 'pix',
  categoriaAtiva: 'todas',
  fontScale: 1.0,
  highContrast: false,
  simpleReading: true,
  highlightLinks: false,
  favoritos: new Set(),
  carrinho: []
};

document.addEventListener('DOMContentLoaded', () => {
  inicializarEstadoAcessibilidade();
  configurarEventosControles();
  verificarCardBoasVindas();
  renderizarProdutosVitrine('todas');
  atualizarCarrinhoUI();
  atualizarDadosUsuarioUI();
});

/* Card de Boas-Vindas & Instruções Iniciais para Novos Usuários */

function verificarCardBoasVindas() {
  const fechado = preferences.get('pm_welcome_closed');
  const box = document.getElementById('welcome-card-box');
  if (fechado === 'true' && box) {
    box.style.display = 'none';
  }
}

function fecharCardBoasVindas() {
  const box = document.getElementById('welcome-card-box');
  if (box) {
    box.style.opacity = '0';
    box.style.transform = 'translateY(-10px)';
    box.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      box.style.display = 'none';
    }, 300);
  }
  preferences.set('pm_welcome_closed', 'true');
  notificarAcessibilidade('Instruções iniciais fechadas.');
}

/* Acessibilidade */

function inicializarEstadoAcessibilidade() {
  appState.simpleReading = preferences.get('pm_simple_reading') !== 'false';
  document.body.classList.toggle('simple-reading', appState.simpleReading);
  if (appState.simpleReading) {
    document.body.classList.add('simple-reading');
  }

  const salvoContraste = preferences.get('pm_high_contrast');
  if (salvoContraste === 'true') {
    appState.highContrast = true;
    document.body.classList.add('high-contrast');
    sincronizarControlesVisuaisContraste(true);
  }

  const salvoZoom = preferences.get('pm_font_scale');
  if (salvoZoom) {
    const scale = Number(salvoZoom);
    appState.fontScale = Number.isFinite(scale) ? Math.min(2, Math.max(.85, scale)) : 1;
    aplicarZoomFonte();
  }
}

function configurarEventosControles() {
  const toggleContrasteHero = document.getElementById('toggle-contraste');
  if (toggleContrasteHero) {
    toggleContrasteHero.addEventListener('change', (e) => {
      sincronizarContraste(e.target.checked);
    });
  }

  const toggleLeituraHero = document.getElementById('toggle-leitura');
  if (toggleLeituraHero) {
    toggleLeituraHero.addEventListener('change', (e) => {
      sincronizarLeitura(e.target.checked);
    });
  }
}

function sincronizarContraste(ativo) {
  appState.highContrast = ativo;
  if (ativo) {
    document.body.classList.add('high-contrast');
    notificarAcessibilidade('Alto contraste ativado na paleta acessível da Pague Menos.');
    mostrarToast('Alto Contraste Pague Menos ativado (#13243B / #FFF5D6)');
  } else {
    document.body.classList.remove('high-contrast');
    notificarAcessibilidade('Contraste padrão restaurado.');
    mostrarToast('Contraste padrão restaurado');
  }

  sincronizarControlesVisuaisContraste(ativo);
  preferences.set('pm_high_contrast', String(ativo));
}

function sincronizarControlesVisuaisContraste(ativo) {
  const tHero = document.getElementById('toggle-contraste');
  const tModal = document.getElementById('modal-toggle-contraste');
  if (tHero) tHero.checked = ativo;
  if (tModal) tModal.checked = ativo;
}

function sincronizarLeitura(ativo) {
  preferences.set('pm_simple_reading', String(ativo));
  appState.simpleReading = ativo;
  if (ativo) {
    document.body.classList.add('simple-reading');
    notificarAcessibilidade('Leitura simplificada ativada com tipografia Lexend.');
    mostrarToast('Leitura simplificada ativada');
  } else {
    document.body.classList.remove('simple-reading');
    notificarAcessibilidade('Modo de leitura padrão.');
    mostrarToast('Leitura padrão');
  }

  const tHero = document.getElementById('toggle-leitura');
  const tModal = document.getElementById('modal-toggle-leitura');
  if (tHero) tHero.checked = ativo;
  if (tModal) tModal.checked = ativo;
}

function toggleDestacarLinks(ativo) {
  appState.highlightLinks = ativo;
  if (ativo) {
    document.body.classList.add('highlight-links');
    mostrarToast('Destaque de links ativado');
  } else {
    document.body.classList.remove('highlight-links');
    mostrarToast('Destaque de links desativado');
  }
}

function ajustarEscalaFonte(direcao) {
  const passo = 0.1;
  const min = 0.85;
  const max = 2;

  let novoValor = appState.fontScale + (direcao * passo);
  if (novoValor < min) novoValor = min;
  if (novoValor > max) novoValor = max;

  appState.fontScale = Math.round(novoValor * 100) / 100;
  aplicarZoomFonte();

  const pct = Math.round(appState.fontScale * 100);
  notificarAcessibilidade(`Tamanho da fonte ajustado para ${pct}%`);
  mostrarToast(`Tamanho do texto: ${pct}%`);
}

function resetarEscalaFonte() {
  appState.fontScale = 1.0;
  aplicarZoomFonte();
  notificarAcessibilidade('Tamanho da fonte redefinido para 100%');
  mostrarToast('Tamanho da fonte: 100% (Padrão)');
}

function aplicarZoomFonte() {
  document.documentElement.style.setProperty('--font-scale', `${appState.fontScale}rem`);
  preferences.set('pm_font_scale', String(appState.fontScale));
}

function abrirPainelAcessibilidade() {
  const modal = document.getElementById('modal-acessibilidade');
  if (modal) {
    const tContraste = document.getElementById('modal-toggle-contraste');
    const tLeitura = document.getElementById('modal-toggle-leitura');
    if (tContraste) tContraste.checked = appState.highContrast;
    if (tLeitura) tLeitura.checked = appState.simpleReading;
    modal.showModal();
    document.getElementById('btn-accessibility-quick')?.setAttribute('aria-expanded', 'true');
    modal.addEventListener('close', () => document.getElementById('btn-accessibility-quick')?.setAttribute('aria-expanded', 'false'), { once: true });
  }
}

function fecharPainelAcessibilidade() {
  const modal = document.getElementById('modal-acessibilidade');
  if (modal) modal.close();
}

function notificarAcessibilidade(mensagem) {
  const el = document.getElementById('status-acessibilidade');
  if (el) el.textContent = mensagem;
}

/* Filtragem Reativa de Categorias na Home */

function selecionarCategoria(categoriaId) {
  appState.categoriaAtiva = categoriaId;

  document.querySelectorAll('.nav-btn-link').forEach(btn => {
    const active = btn.getAttribute('data-cat') === categoriaId;
    btn.classList.toggle('active', active);
    if (btn.getAttribute('data-cat')) btn.setAttribute('aria-pressed', String(active));
  });

  document.querySelectorAll('.category-card').forEach(card => {
    const ariaLabel = card.getAttribute('aria-label') || '';
    const active = ariaLabel.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(categoriaId);
    card.classList.toggle('active', active);
    card.setAttribute('aria-pressed', String(active));
  });

  renderizarProdutosVitrine(categoriaId);

  const totalExibido = categoriaId === 'todas' 
    ? 'todos os produtos mais procurados' 
    : `produtos da categoria ${categoriaId}`;
  notificarAcessibilidade(`Exibindo ${totalExibido} na Home.`);

  const sectionDestaques = document.getElementById('destaques');
  if (sectionDestaques) {
    sectionDestaques.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetarFiltroHome(event) {
  if (event) event.preventDefault();
  selecionarCategoria('todas');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filtrarOfertas() {
  selecionarCategoria('todas');
  mostrarToast('Exibindo produtos em oferta com descontos especiais da Pague Menos!');
}

function renderizarProdutosVitrine(categoriaId, resultadosBusca = null) {
  const container = document.getElementById('products-grid-container');
  const labelSubheading = document.getElementById('products-active-filter-label');
  if (!container) return;

  let listaFiltrada = CATALOGO_PRODUTOS;
  if (Array.isArray(resultadosBusca)) {
    listaFiltrada = resultadosBusca;
    if (labelSubheading) labelSubheading.textContent = `${resultadosBusca.length} produtos encontrados. Use o nome do produto para ver os detalhes.`;
  } else if (categoriaId !== 'todas') {
    listaFiltrada = CATALOGO_PRODUTOS.filter(p => p.categoriaId === categoriaId);
    if (labelSubheading) {
      const nomeCat = listaFiltrada[0] ? listaFiltrada[0].categoriaNome : categoriaId;
      labelSubheading.textContent = `Exibindo ${listaFiltrada.length} produtos em ${nomeCat} (filtrado na Home sem recarregar)`;
    }
  } else {

    listaFiltrada = CATALOGO_PRODUTOS;
    if (labelSubheading) {
      labelSubheading.textContent = `Catálogo com ${listaFiltrada.length} produtos. Escolha uma categoria ou busque pelo nome.`;
    }
  }

  container.innerHTML = listaFiltrada.map(produto => {
    const isFav = appState.favoritos.has(produto.id);
    const precoFormatado = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const precoAntigoFormatado = produto.precoAntigo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
      <article class="product-card" aria-label="${produto.nome}, ${produto.categoriaNome}, Preço ${precoFormatado}">
        <div class="product-card-top">
          <span class="discount-badge">${produto.desconto}</span>
          <button 
            type="button" 
            class="btn-favorite ${isFav ? 'active' : ''}" 
            onclick="toggleFavoritoProduto('${produto.id}', this)"
            aria-pressed="${isFav}"
            aria-label="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <button type="button" class="product-image-box" onclick="abrirDetalheProduto('${produto.nome}')" aria-label="Ver detalhes de ${produto.nome}">
          <img 
            src="${produto.imagem || 'assets/produto-sem-foto.svg'}" 
            alt="" 
            class="product-card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/produto-sem-foto.svg';"
          >
        </button>

        <div class="product-details">
          <span class="product-category">${produto.categoriaNome}</span>
          <h3 class="product-name"><button type="button" class="product-title-button" onclick="abrirDetalheProduto('${produto.nome}')">${produto.nome}</button></h3>

          <div class="product-rating" aria-label="Avaliação ${produto.avaliacao} estrelas com ${produto.avaliacoesTotal} avaliações">
            <span class="star-icon" aria-hidden="true">★</span>
            <span class="rating-val">${produto.avaliacao.toString().replace('.', ',')}</span>
            <span class="rating-count">(${produto.avaliacoesTotal})</span>
          </div>

          <div class="product-price-box">
            <span class="price-current">${precoFormatado}</span>
            <span class="price-old" aria-label="Preço anterior: ${precoAntigoFormatado}">${precoAntigoFormatado}</span>
          </div>

          <button 
            type="button" 
            class="btn-add-cart" 
            onclick="adicionarAoCarrinho('${produto.id}', '${produto.nome}', ${produto.preco})"
            aria-label="Adicionar ${produto.nome} ao carrinho"
          >
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Adicionar ao carrinho</span>
          </button>
        </div>
      </article>
    `;
  }).join('') || '<p class="search-empty" role="status">Nenhum produto encontrado. Tente outro nome, marca ou categoria.</p>';
}

/* Carrinho de Compras */

function abrirGavetaCarrinho() {
  const modal = document.getElementById('modal-carrinho');
  if (modal) {
    atualizarCarrinhoUI();
    modal.showModal();
    notificarAcessibilidade(`Carrinho aberto com ${obterTotalItensCarrinho()} itens.`);
  }
}

function fecharGavetaCarrinho() {
  const modal = document.getElementById('modal-carrinho');
  if (modal) modal.close();
}

function obterTotalItensCarrinho() {
  return appState.carrinho.reduce((acc, item) => acc + item.qtd, 0);
}

function obterSubtotalCarrinho() {
  return appState.carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
}

function adicionarAoCarrinho(id, nome, preco) {
  const product = CATALOGO_PRODUTOS.find(product => product.id === id);
  if (!product) { mostrarToast('Produto não encontrado. Atualize sua busca.'); return; }
  nome = product.nome; preco = product.preco;
  const itemExistente = appState.carrinho.find(i => i.id === id);
  if (itemExistente?.qtd >= 99) { mostrarToast('O limite é de 99 unidades por produto.'); return; }
  if (itemExistente) {
    itemExistente.qtd += 1;
  } else {
    appState.carrinho.push({ id, nome, preco, qtd: 1 });
  }

  atualizarCarrinhoUI();
  
  const precoFmt = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const msg = `${nome} (${precoFmt}) incluído no carrinho! Total: ${obterTotalItensCarrinho()} itens.`;
  mostrarToast(`🛒 ${msg}`);
  notificarAcessibilidade(msg);
}

function alterarQtdCarrinho(id, delta) {
  const item = appState.carrinho.find(i => i.id === id);
  if (!item) return;

  const novaQuantidade = item.qtd + delta;
  if (novaQuantidade > 99) { mostrarToast('O limite é de 99 unidades por produto.'); return; }
  if (novaQuantidade <= 0) {
    removerDoCarrinho(id);
    return;
  }
  item.qtd = novaQuantidade;

  atualizarCarrinhoUI();
  notificarAcessibilidade(`Quantidade de ${item.nome} alterada para ${item.qtd}.`);
}

const remocoesCarrinho = [];

function limparDadosCompraAtual() {
  appState.carrinho = [];
  appState.usuario = { autenticado: false, nome: 'Visitante', cep: '' };
  appState.formaPagamentoSelecionada = 'pix';
  appState.favoritos.clear();
  remocoesCarrinho.length = 0;
  if (window.PMChat) PMChat.reset();
  for (const id of ['chat-input', 'input-cep-val', 'troca-pedido-id', 'auth-email', 'auth-password', 'new-password']) {
    const input = document.getElementById(id); if (input) input.value = '';
  }
  const log = document.getElementById('chat-messages-container');
  if (log) {
    log.replaceChildren();
    const welcome = document.createElement('p'); welcome.textContent = 'Como posso ajudar? Não envie CPF, senha ou dados bancários no chat.'; log.appendChild(welcome);
  }
  document.getElementById('payment-details-view')?.replaceChildren();
  document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
  atualizarCarrinhoUI(); atualizarDadosUsuarioUI(); atualizarAvisoRemocaoCarrinho();
}

function atualizarAvisoRemocaoCarrinho() {
  const last = remocoesCarrinho[remocoesCarrinho.length - 1];
  for (const prefix of ['cart', 'guided']) {
    const box = document.getElementById(`${prefix}-undo`);
    const text = document.getElementById(`${prefix}-undo-text`);
    if (box) box.hidden = !last;
    if (text) text.textContent = last ? `${last.item.nome} removido. Você pode desfazer a remoção.` : '';
  }
}

function desfazerRemocaoCarrinho() {
  const last = remocoesCarrinho[remocoesCarrinho.length - 1];
  if (!last) return;
  const existing = appState.carrinho.find(item => item.id === last.item.id);
  if ((existing?.qtd || 0) + last.item.qtd > 99) {
    mostrarToast('Diminua a quantidade no carrinho antes de desfazer: o limite é de 99 unidades por produto.');
    return;
  }
  remocoesCarrinho.pop();
  if (existing) existing.qtd += last.item.qtd;
  else appState.carrinho.splice(Math.min(last.index, appState.carrinho.length), 0, { ...last.item });
  atualizarCarrinhoUI();
  atualizarAvisoRemocaoCarrinho();
  if (window.PMChat) PMChat.refreshCart();
  notificarAcessibilidade(`${last.item.nome} restaurado ao carrinho. Total atualizado.`);
  const target = document.getElementById('guided-purchase-dialog')?.open
    ? document.getElementById('guided-edit-cart')
    : document.getElementById(remocoesCarrinho.length ? 'cart-undo-button' : 'modal-cart-title');
  if (target?.id === 'modal-cart-title') target.tabIndex = -1;
  if (target && !target.closest?.('[hidden]')) target.focus({ preventScroll: true });
}

function removerDoCarrinho(id) {
  const index = appState.carrinho.findIndex(i => i.id === id);
  if (index !== -1) {
    const nome = appState.carrinho[index].nome;
    remocoesCarrinho.push({ index, item: { ...appState.carrinho[index] } });
    appState.carrinho.splice(index, 1);
    atualizarCarrinhoUI();
    atualizarAvisoRemocaoCarrinho();
    if (document.getElementById('modal-carrinho')?.open) document.getElementById('cart-undo-button')?.focus({ preventScroll: true });
    mostrarToast(`"${nome}" removido do carrinho.`);
    notificarAcessibilidade(`Item ${nome} removido.`);
  }
}

function atualizarCarrinhoUI() {
  if (purchaseStorageReady) {
    try { purchaseStorage.setItem('pm_cart', JSON.stringify(appState.carrinho)); } catch {}
  }
  const badge = document.getElementById('cart-count');
  const drawerCount = document.getElementById('cart-drawer-count');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const totalEl = document.getElementById('cart-total-val');
  const cepLabel = document.getElementById('cart-cep-label');

  const totalItens = obterTotalItensCarrinho();
  document.getElementById('btn-cart')?.setAttribute('aria-label', `Visualizar carrinho com ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`);

  if (badge) {
    badge.textContent = totalItens;
    badge.style.transform = 'scale(1.35)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }
  if (drawerCount) drawerCount.textContent = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
  if (cepLabel) cepLabel.textContent = appState.usuario.cep || 'informe seu CEP';

  if (!container) return;

  if (appState.carrinho.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <p><strong>Seu carrinho está vazio no momento.</strong></p>
        <p style="margin-top: 8px;">Explore os produtos reais da Pague Menos com apoio da Assistente de IA.</p>
        <button type="button" class="btn btn-primary" style="margin-top: 16px;" onclick="fecharGavetaCarrinho()">Explorar catálogo</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
    if (totalEl) totalEl.textContent = 'R$ 0,00';
    return;
  }

  let subtotal = 0;
  container.innerHTML = appState.carrinho.map(item => {
    const itemTotal = item.preco * item.qtd;
    subtotal += itemTotal;
    const precoUnitFmt = item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const totalFmt = itemTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `
      <div class="cart-item-row" aria-label="${item.nome}, Quantidade ${item.qtd}, Total ${totalFmt}">
        <div class="cart-item-left">
          <div class="cart-item-icon" aria-hidden="true">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div class="cart-item-info">
            <span class="cart-item-name">${item.nome}</span>
            <span class="cart-item-unit-price">${precoUnitFmt} cada</span>
          </div>
        </div>

        <div class="cart-qty-ctrl">
          <button type="button" class="btn-qty" onclick="alterarQtdCarrinho('${item.id}', -1)" aria-label="Diminuir quantidade de ${item.nome}">−</button>
          <span><strong>${item.qtd}</strong></span>
          <button type="button" class="btn-qty" onclick="alterarQtdCarrinho('${item.id}', 1)" aria-label="Aumentar quantidade de ${item.nome}">+</button>
        </div>

        <div class="cart-item-price-total">${totalFmt}</div>

        <button type="button" class="btn-remove-item" onclick="removerDoCarrinho('${item.id}')" aria-label="Remover ${item.nome} do carrinho">
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  const frete = subtotal >= 99 ? 0 : 9.90;
  const total = subtotal + frete;

  if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  if (totalEl) totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* Checkout & Pagamento Guiado pela Assistente de IA */

function iniciarCheckoutGuiadoIA() {
  fecharGavetaCarrinho();

  if (appState.carrinho.length === 0) {
    mostrarToast('Seu carrinho está vazio. Adicione produtos para pagar!');
    return;
  }

  const modalCheckout = document.getElementById('modal-checkout-ia');
  if (!modalCheckout) return;

  const totalItens = obterTotalItensCarrinho();
  const subtotal = obterSubtotalCarrinho();
  const frete = subtotal >= 99 ? 0 : 9.90;
  const total = subtotal + frete;

  const totalItemsBadge = document.getElementById('checkout-total-items-badge');
  const cepBadge = document.getElementById('checkout-cep-badge');
  const subtotalEl = document.getElementById('checkout-subtotal-val');
  const freteEl = document.getElementById('checkout-frete-val');
  const totalEl = document.getElementById('checkout-total-val');
  const itemsContainer = document.getElementById('checkout-items-list-container');

  if (totalItemsBadge) totalItemsBadge.textContent = `${totalItens} ${totalItens === 1 ? 'produto' : 'produtos'}`;
  if (cepBadge) cepBadge.textContent = appState.usuario.cep || 'a informar';
  if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  if (freteEl) {
    freteEl.textContent = frete === 0 ? 'Grátis (acima de R$ 99)' : 'R$ 9,90';
  }
  if (totalEl) totalEl.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (itemsContainer) {
    itemsContainer.innerHTML = appState.carrinho.map(item => {
      const itemTotal = (item.preco * item.qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      return `
        <div class="checkout-item-pill">
          <div>
            <strong>${item.qtd}x</strong> ${item.nome}
          </div>
          <div><strong>${itemTotal}</strong></div>
        </div>
      `;
    }).join('');
  }

  trocarFormaPagamento(appState.formaPagamentoSelecionada);

  modalCheckout.showModal();
  notificarAcessibilidade('Etapa de pagamento guiado aberta. A Assistente de IA está acompanhando seu pedido.');
}

function fecharCheckoutGuiadoIA() {
  const modalCheckout = document.getElementById('modal-checkout-ia');
  if (modalCheckout) modalCheckout.close();
  pararLeitura();
}

function trocarFormaPagamento(metodo) {
  const names = { pix: 'Pix', card: 'Cartão de crédito', boleto: 'Boleto bancário', pbm: 'Convênio / PBM' };
  if (!names[metodo]) return;
  appState.formaPagamentoSelecionada = metodo;
  const radio = document.getElementById('pay-' + metodo);
  if (radio) radio.checked = true;
  const view = document.getElementById('payment-details-view');
  if (!view) return;
  const explanations = {
    pix: 'O código Pix será apresentado quando o serviço de pagamento estiver disponível. Não utilize códigos enviados pelo chat.',
    card: 'Os dados do cartão devem ser informados somente no ambiente de pagamento, quando disponível. Não envie número do cartão ou CVV no chat.',
    boleto: 'Confira o beneficiário e o vencimento quando o boleto estiver disponível.',
    pbm: 'Os descontos dependem da validação do benefício. Não envie CPF ou carteirinha pelo chat.'
  };
  const title = document.createElement('strong');
  title.textContent = names[metodo] + ' selecionado';
  const description = document.createElement('p');
  description.textContent = explanations[metodo];
  view.replaceChildren(title, description);
  notificarAcessibilidade('Forma de pagamento selecionada: ' + names[metodo] + '.');
}

function copiarChavePix() {
  const input = document.getElementById('input-pix-code');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
      mostrarToast('📋 Chave Pix copiada com sucesso!');
      notificarAcessibilidade('Chave Pix copiada para a área de transferência.');
    });
  }
}

function ouvirOrientacaoIA() {
  const total = (obterSubtotalCarrinho() + (obterSubtotalCarrinho() >= 99 ? 0 : 9.90))
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const totalItens = obterTotalItensCarrinho();
  const texto = `Olá! Sou sua Assistente Pague Menos. Seu carrinho tem ${totalItens} produtos e total estimado de ${total}, incluindo o frete. Você pode escolher Pix, cartão de crédito, boleto bancário ou convênio. No Pix, confira o código fornecido pelo serviço de pagamento. No cartão, preencha os dados apenas no ambiente de pagamento. No boleto, confira o beneficiário e o vencimento antes de pagar. O convênio depende da validação de elegibilidade. Revise os produtos e entre na sua conta antes de confirmar o pedido. Se algum serviço estiver indisponível, você será avisado e seu carrinho será mantido.`;
  
  ouvirDescricaoProduto(texto);
}

let compraEmConfirmacao = false;
async function confirmarCompraSimuladaIA(origem = 'checkout') {
  if (compraEmConfirmacao) return;
  if (!appState.carrinho.length) {
    mostrarToast('Seu carrinho está vazio. Adicione produtos para continuar.');
    return;
  }
  compraEmConfirmacao = true;
  try {
    if (!window.PMAuth) {
      mostrarToast('Entre na sua conta antes de concluir a compra.');
      location.assign('login.html');
      return;
    }
    if (!await PMAuth.requireLogin(origem)) return;
    if (!appState.carrinho.length) return;
    concluirPedidoDemonstrativo(origem);
  } finally {
    compraEmConfirmacao = false;
  }
}

function concluirPedidoDemonstrativo(origem) {
  // Conectar ao backend de pedidos antes de habilitar confirmação e cobrança.
  const message = 'A conclusão de pedidos ainda não está disponível. Seu carrinho foi mantido. Tente novamente mais tarde.';
  if (origem === 'chat' && window.PMChat) PMChat.orderUnavailable();
  else {
    const status = document.getElementById('checkout-order-status');
    if (status) status.textContent = message;
    notificarAcessibilidade(message);
  }
  mostrarToast(message);
  return false;
}

function fecharModalSucessoPedido() {
  const modalSucesso = document.getElementById('modal-sucesso-pedido');
  if (modalSucesso) modalSucesso.close();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Autenticação & Visitante */

function abrirModalAuth() {
  if (window.PMAuth) PMAuth.goToLogin();
  else location.assign('login.html');
}

function fecharModalAuth() {
  const modal = document.getElementById('modal-auth');
  if (modal) modal.close();
}

function entrarComoVisitante() {
  if (appState.usuario.autenticado) {
    abrirModalAuth();
    return;
  }
  appState.usuario.autenticado = false;
  appState.usuario.nome = 'Visitante';
  appState.usuario.cep = '';

  atualizarDadosUsuarioUI();
  fecharModalAuth();
  mostrarToast('Navegando como visitante. Informe seu próprio CEP para entrega.');
  notificarAcessibilidade('Sessão iniciada como visitante.');
}

function autenticarUsuario() {
  abrirModalAuth();
}

function atualizarDadosUsuarioUI() {
  const userDisplay = document.getElementById('user-display-name');
  const cepDisplay = document.getElementById('cep-display');

  if (userDisplay) {
    userDisplay.textContent = appState.usuario.autenticado 
      ? `Olá, ${appState.usuario.nome}` 
      : 'Olá, visitante';
  }

  if (cepDisplay) {
    cepDisplay.textContent = appState.usuario.cep || 'Informe seu CEP';
  }
}

/* Detalhes Oficiais do Produto */

function abrirDetalheProduto(nomeProduto) {
  const produto = CATALOGO_PRODUTOS.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase()) 
    || CATALOGO_PRODUTOS.find(p => p.id === nomeProduto);
  if (!produto) { mostrarToast('Não encontramos esse produto. Faça uma nova busca.'); return; }
  
  const modal = document.getElementById('modal-produto-detalhe');
  const body = document.getElementById('modal-prod-body');
  if (!modal || !body) return;

  const precoFmt = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const precoAntigoFmt = produto.precoAntigo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  body.innerHTML = `
    <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 16px;">
      <div style="width: 140px; height: 140px; background-color: #FFF; border: 1px solid var(--color-border); border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 8px; flex-shrink: 0;">
        <img src="${produto.imagem || 'assets/produto-sem-foto.svg'}" alt="${produto.nome}" onerror="this.onerror=null; this.src='assets/produto-sem-foto.svg';" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
      <div>
        <div class="prod-badge-tag">${produto.categoriaNome}</div>
        <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 6px;">${produto.nome}</h3>
        <div class="product-rating">
          <span class="star-icon">★</span>
          <strong>${produto.avaliacao.toString().replace('.', ',')}</strong>
          <span class="rating-count">(${produto.avaliacoesTotal} avaliações)</span>
        </div>
      </div>
    </div>
    
    <div class="prod-detail-header-info">
      <div>
        <span class="prod-detail-price">${precoFmt}</span>
        <span class="price-old" style="margin-left: 8px;">${precoAntigoFmt}</span>
        <span class="discount-badge" style="margin-left: 8px;">${produto.desconto}</span>
      </div>
    </div>

    ${produto.isMedicamento ? `
      <div style="background-color: #FEF3C7; border: 1.5px solid #F59E0B; border-radius: 8px; padding: 12px; margin-bottom: 14px; font-size: 0.88rem; color: #92400E;">
        <strong>Cuidados com medicamentos:</strong> Consulte a bula e peça orientação ao farmacêutico. Não altere seu tratamento com base na conversa com a assistente.
      </div>
    ` : ''}

    <div class="prod-detail-section">
      <h4>Descrição e Benefícios</h4>
      <p style="font-size: 0.92rem; line-height: 1.6;">${produto.descricao}</p>
    </div>

    <div class="prod-detail-section">
      <h4>Orientações de uso</h4>
      <p style="font-size: 0.92rem; line-height: 1.6;">${produto.isMedicamento ? 'Consulte a bula correspondente à apresentação e siga a prescrição ou a orientação do farmacêutico. A assistente não define doses ou tratamentos.' : produto.modoUso}</p>
    </div>

    <div style="display: flex; gap: 12px; margin-top: 20px;">
      <button type="button" class="btn btn-secondary" onclick="ouvirDescricaoProduto('${produto.nome}. ${produto.descricao}')">
        🔊 Ouvir informações
      </button>
      <button type="button" class="btn btn-secondary" onclick="pararLeitura()">Parar leitura</button>
      <button type="button" class="btn btn-primary" style="flex: 1;" onclick="adicionarAoCarrinho('${produto.id}', '${produto.nome}', ${produto.preco}); fecharModalProduto();">
        Adicionar ao carrinho (${precoFmt})
      </button>
    </div>
  `;

  modal.showModal();
  notificarAcessibilidade(`Detalhes de ${produto.nome} abertos.`);
}

function fecharModalProduto() {
  const modal = document.getElementById('modal-produto-detalhe');
  if (modal) modal.close();
  pararLeitura();
}

function pararLeitura() { if (window.speechSynthesis) window.speechSynthesis.cancel(); }

function ouvirDescricaoProduto(texto) {
  if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
    try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'pt-BR';
    utter.rate = 1.0;
    window.speechSynthesis.speak(utter);
    mostrarToast('Leitura em voz alta iniciada.');
    } catch { mostrarToast('Não foi possível iniciar a leitura. As informações continuam disponíveis em texto.'); }
  } else {
    mostrarToast('Síntese de voz não disponível no navegador.');
  }
}

/* CEP & Busca com Voz */

function abrirModalCep() {
  const modal = document.getElementById('modal-cep');
  if (modal) modal.showModal();
}

function fecharModalCep() {
  const modal = document.getElementById('modal-cep');
  if (modal) modal.close();
}

function salvarCep() {
  const input = document.getElementById('input-cep-val');
  const val = input ? input.value.trim() : '';
  if (!/^\d{5}-?\d{3}$/.test(val)) {
    const status = document.getElementById('cep-status');
    if (status) status.textContent = 'Informe um CEP com 8 números. Exemplo: 50000-000.';
    input?.setAttribute('aria-invalid', 'true'); input?.focus();
    mostrarToast('Informe um CEP válido (ex: 50000-000).');
    return;
  }
  const digits = val.replace(/\D/g, '');
  input?.removeAttribute('aria-invalid');
  const cepStatus = document.getElementById('cep-status'); if (cepStatus) cepStatus.textContent = '';
  appState.usuario.cep = `${digits.slice(0, 5)}-${digits.slice(5)}`;
  try { purchaseStorage.setItem('pm_cep', appState.usuario.cep); } catch {}
  atualizarDadosUsuarioUI();
  fecharModalCep();
  mostrarToast(`CEP ${val} salvo com sucesso!`);
  notificarAcessibilidade(`Endereço de entrega atualizado para o CEP ${val}`);
}

function buscarProduto() {
  const campo = document.getElementById('campo-busca');
  const termo = campo ? campo.value.trim() : '';
  if (!termo) {
    mostrarToast('Digite o nome, a marca ou a categoria do produto.');
    campo?.focus(); return;
  }
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const words = normalize(termo).split(/\s+/).filter(Boolean);
  const resultados = CATALOGO_PRODUTOS.filter(product => {
    const text = normalize(product.nome + ' ' + product.categoriaNome + ' ' + product.descricao);
    return words.every(word => text.includes(word));
  });
  renderizarProdutosVitrine('todas', resultados);
  const title = document.getElementById('products-active-filter-label');
  if (title) title.textContent = resultados.length + ' produtos encontrados para “' + termo + '”.';
  const message = resultados.length ? resultados.length + ' produtos encontrados. Confira os resultados abaixo.' : 'Nenhum produto encontrado. Tente outro nome, marca ou categoria.';
  mostrarToast(message); notificarAcessibilidade(message);
  const section = document.getElementById('destaques');
  if (section) {
    section.tabIndex = -1;
    section.focus({ preventScroll: true });
    section.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
}

function ativarBuscaPorVoz(targetInputId, enviarNoChat = false) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    mostrarToast('Reconhecimento de voz não suportado neste navegador. Digite no campo!');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;

  mostrarToast('🎙️ Ouvindo... Pode falar agora.');
  notificarAcessibilidade('Microfone ativado. Fale o que procura.');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById(targetInputId);
    if (input) input.value = transcript;
    mostrarToast(`Você disse: "${transcript}"`);
    notificarAcessibilidade(`Voz reconhecida: ${transcript}`);

    input?.focus({ preventScroll: true });
    notificarAcessibilidade('Mensagem transcrita. Revise o texto e use ' + (enviarNoChat ? 'Enviar.' : 'Buscar.'));
    mostrarToast('Revise o texto reconhecido antes de enviar.');
  };

  recognition.onerror = () => {
    mostrarToast('Não conseguimos ouvir com clareza. Tente novamente.');
  };

  try {
    recognition.start();
  } catch (e) {
    mostrarToast('Microfone já ativo ou permissão pendente.');
  }
}

function toggleFavoritoProduto(id, button) {
  button.setAttribute('aria-pressed', String(!appState.favoritos.has(id)));
  if (appState.favoritos.has(id)) {
    appState.favoritos.delete(id);
    button.classList.remove('active');
    button.setAttribute('aria-label', 'Adicionar aos favoritos');
    mostrarToast('Removido dos favoritos');
  } else {
    appState.favoritos.add(id);
    button.classList.add('active');
    button.setAttribute('aria-label', 'Remover dos favoritos');
    mostrarToast('❤️ Adicionado aos seus favoritos!');
  }
}

/* Assistente de IA Autônomo da Pré-Compra ao Pagamento */

function focarAssistenteIA() {
  const sectionIA = document.getElementById('assistente-ia');
  const chatInput = document.getElementById('chat-input');
  if (sectionIA) {
    const header = document.querySelector('.main-header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const sectionTop = sectionIA.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: Math.max(0, sectionTop - headerHeight - 16),
      behavior: 'smooth'
    });
  }
  if (chatInput) {
    setTimeout(() => {
      chatInput.focus({ preventScroll: true });
    }, 400);
  }
  mostrarToast('💬 Assistente de IA ativada! Pode digitar ou usar a voz.');
  notificarAcessibilidade('Assistente de IA pronta para interação.');
}

function focarChatInput() {
  focarAssistenteIA();
}

function enviarMensagemRapida(texto) {
  const input = document.getElementById('chat-input');
  if (input) input.value = texto;
  enviarMensagemChat();
}

function abrirChatbotComMensagem(texto) {
  focarChatInput();
  enviarMensagemRapida(texto);
}

function enviarMensagemChat() {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const texto = input.value.trim();
  if (!texto) return;

  adicionarBolhaChat(texto, 'user');
  input.value = '';

  setTimeout(() => {
    gerarRespostaBot(texto);
  }, 600);
}

function adicionarBolhaChat(mensagem, tipo) {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${tipo}-bubble`;
  const paragraph = document.createElement('p');
  paragraph.textContent = mensagem;
  bubble.appendChild(paragraph);
  container.appendChild(bubble);

  container.scrollTop = container.scrollHeight;
  notificarAcessibilidade(`Assistente: ${mensagem}`);
}

function gerarRespostaBot(pergunta) {
  const lower = pergunta.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let resposta = 'Posso orientar sobre rastreamento, trocas, produto violado, entrega e pagamento. Para comprar, use o chat de compra guiada. Não envie CPF, senha ou dados bancários aqui.';

  if (/violad|lacre|adulterad|avariad|embalagem aberta/.test(lower)) {
    resposta = 'Se o produto chegou violado ou com o lacre rompido, não utilize o produto. Guarde a embalagem e a nota fiscal e registre fotos do problema. Use “Preciso de ajuda” para acessar o atendimento oficial da Pague Menos e solicitar análise e orientação sobre a solução. Não envie documentos pessoais neste chat.';
  } else if (/rastre|acompanhar.*pedido|status.*pedido|onde.*pedido/.test(lower)) {
    resposta = 'Para rastrear sua compra, entre na sua conta no site ou aplicativo oficial da Pague Menos e abra “Meus Pedidos”. Escolha o pedido para consultar o status e as informações de entrega disponíveis. A consulta de rastreamento por este chat ainda não está disponível. Se precisar, use “Preciso de ajuda” para acessar o atendimento oficial. Não envie CPF ou senha no chat.';
  } else if (/(troca|devolu|regra|politica).*(remedio|medicamento)|(remedio|medicamento).*(troca|devolu|regra)/.test(lower)) {
    resposta = 'As regras de troca de medicamentos dependem do tipo de produto, do motivo e do canal da compra. Consulte a política oficial de trocas e devoluções da Pague Menos e peça avaliação à Central de Atendimento; guarde a nota fiscal e a embalagem. Se houver violação ou suspeita de defeito, não utilize o produto. A aprovação depende da análise do atendimento. Você encontra o link da política na Central de Ajuda do site.';
  } else if (/regras?.*(pedido|compra)|politica.*pedido/.test(lower)) {
    resposta = 'Para conferir as regras do seu pedido, consulte as condições da compra, entrega, pagamento e trocas no site oficial. O acompanhamento fica em “Meus Pedidos” da sua conta. Se você quer saber especificamente sobre cancelar, trocar ou prazo de entrega, diga qual desses assuntos deseja consultar.';
  } else if (/troca|devolu|defeito|arrependimento|cancel/.test(lower)) {
    resposta = 'Para solicitar troca, devolução ou cancelamento, consulte a política oficial da Pague Menos e entre em contato com a Central de Atendimento. Tenha o comprovante da compra disponível apenas no canal oficial. As condições dependem do produto e da situação. A solicitação deve ser registrada no atendimento; esta conversa oferece orientação.';
  } else if (/prazo|entrega|frete/.test(lower)) {
    resposta = 'O prazo e o frete dependem do CEP, dos produtos e da modalidade escolhida. Confira o valor final e a previsão de entrega antes de confirmar o pedido. Para uma compra já feita, consulte “Meus Pedidos” no site ou aplicativo oficial.';
  } else if (/receita|prescricao/.test(lower)) {
    resposta = 'A exigência de receita depende do medicamento. Confira a indicação na página oficial do produto e peça orientação ao farmacêutico sobre receita digital, retenção e documentos necessários. Não envie receita, CPF ou informações de saúde neste chat.';
  } else if (lower.includes('historia') || lower.includes('quantas lojas') || lower.includes('fundada') || lower.includes('clinic farma')) {
    resposta = 'A Pague Menos foi fundada em 1981 em Fortaleza (CE) e hoje conta com mais de 1.600 lojas em todo o Brasil! Fomos pioneiros no Clinic Farma (consultórios farmacêuticos) e no compromisso de levar saúde com preços acessíveis e inclusão a todas as pessoas.';
  } else if (/pagamento|pagar|pix|cartao|boleto|convenio|desconto/.test(lower)) {
    resposta = 'Você pode escolher Pix, cartão, boleto ou convênio na etapa de pagamento. Confira as condições e os descontos disponíveis antes de confirmar. Para continuar, escolha “Comprar pelo chat” ou “Pagamento guiado”. Não envie números de cartão, CPF ou carteirinha no chat.';
  } else if (lower.includes('medicamento') || lower.includes('dorflex') || lower.includes('dipirona') || lower.includes('remedio')) {
    resposta = 'Temos Dorflex 36 comp por R$ 17,49 e Dipirona 500mg por R$ 3,49. Ambos são medicamentos isentos de prescrição. Quer que eu adicione um deles ao seu carrinho?';
  } else if (lower.includes('carrinho') || lower.includes('itens') || lower.includes('revisar')) {
    const qtd = obterTotalItensCarrinho();
    const subtotal = obterSubtotalCarrinho().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    resposta = `Seu carrinho tem ${qtd} itens totalizando ${subtotal}. Quando quiser, basta clicar em "Ir para o pagamento guiado" para eu te orientar.`;
  } else if (lower.includes('bula') || lower.includes('usar') || lower.includes('posologia')) {
    resposta = 'Abra os detalhes do produto para consultar a descrição e usar “Ouvir informações”. Para medicamentos, consulte a bula correspondente à apresentação e peça orientação ao farmacêutico. A assistente não define doses ou tratamentos.';
  }

  adicionarBolhaChat(resposta, 'bot');
}

function mostrarModalAjudaIA() {
  mostrarToast('Assistente Pague Menos: sua parceira da busca de produtos até o pagamento!');
}

function mostrarModalProgramaDesconto() {
  mostrarToast('Programa de Desconto: até 33% de desconto em medicamentos e itens essenciais!');
}

function mostrarModalDeclaracaoA11y() {
  location.assign('ajuda.html#guia-de-compra');
}

/* Toast Feedback */

let toastTimeout = null;
function mostrarToast(mensagem) {
  notificarAcessibilidade(mensagem);
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.textContent = mensagem;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
