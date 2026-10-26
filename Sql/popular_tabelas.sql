-- =============================================================================
-- Descrição: Seed data para tabelas estruturais, operacionais e de e-commerce.
--            Não inclui dados regulatórios ANVISA (PRINCIPIO_ATIVO, MEDICAMENTO,
--            BULA_SECAO).
-- Execução: mysql -u <usuario> -p chatbot_farmacia < popular_tabelas.sql
-- =============================================================================

USE chatbot_farmacia;

SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================================
-- BLOCO 1: CATEGORIA
-- Hierarquia de categorias e subcategorias da farmácia.
-- Ordem: pai antes dos filhos (auto-referência).
-- =============================================================================

INSERT INTO CATEGORIA (id, categoria_pai_id, nome) VALUES
  -- Raízes (sem pai)
  ('cat-med',              NULL,      'Medicamentos'),
  ('cat-higiene',          NULL,      'Higiene Pessoal'),
  ('cat-dermocosmeticos',  NULL,      'Dermocosméticos'),
  ('cat-suplementos',      NULL,      'Suplementos e Vitaminas'),
  ('cat-bebe',             NULL,      'Bebê e Infantil'),
  ('cat-perfumaria',       NULL,      'Perfumaria'),

  -- Filhos de Medicamentos
  ('cat-dor-febre',        'cat-med', 'Dor e Febre'),
  ('cat-alergicos',        'cat-med', 'Alérgicos e Antialérgicos'),
  ('cat-vitaminas-med',    'cat-med', 'Vitaminas e Minerais'),

  -- Filhos de Higiene Pessoal
  ('cat-higiene-bucal',    'cat-higiene', 'Higiene Bucal'),
  ('cat-cabelos',          'cat-higiene', 'Cabelos'),
  ('cat-corpo-banho',      'cat-higiene', 'Corpo e Banho'),
  ('cat-desodorantes',     'cat-higiene', 'Desodorantes'),

  -- Filhos de Dermocosméticos
  ('cat-hidratantes',      'cat-dermocosmeticos', 'Hidratantes Faciais'),
  ('cat-protetor-solar',   'cat-dermocosmeticos', 'Protetores Solares'),
  ('cat-antiidade',        'cat-dermocosmeticos', 'Antienvelhecimento'),

  -- Filhos de Suplementos
  ('cat-proteinas',        'cat-suplementos', 'Proteínas e Aminoácidos'),
  ('cat-multivitaminicos', 'cat-suplementos', 'Multivitamínicos'),
  ('cat-omegas',           'cat-suplementos', 'Ômegas e Óleos'),

  -- Filhos de Bebê
  ('cat-fralda',           'cat-bebe', 'Fraldas'),
  ('cat-higiene-bebe',     'cat-bebe', 'Higiene Infantil'),

  -- Filhos de Perfumaria
  ('cat-feminino',         'cat-perfumaria', 'Feminino'),
  ('cat-masculino',        'cat-perfumaria', 'Masculino')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);


-- =============================================================================
-- BLOCO 2: LOJA
-- Filiais físicas fictícias da rede Pague Menos.
-- Coordenadas geográficas válidas (dentro do território brasileiro).
-- =============================================================================

INSERT INTO LOJA (id, nome, endereco, cep, cidade, estado, latitude, longitude, telefone, ativa) VALUES
  (
    'loja-fortaleza-01',
    'Pague Menos - Aldeota (Fortaleza)',
    'Av. Dom Luís, 500 - Aldeota',
    '60160-230', 'Fortaleza', 'CE',
    -3.7327890, -38.5021050,
    '(85) 3246-1100', TRUE
  ),
  (
    'loja-fortaleza-02',
    'Pague Menos - Messejana (Fortaleza)',
    'Av. Padre Antônio Tomás, 3045 - Messejana',
    '60841-000', 'Fortaleza', 'CE',
    -3.8250210, -38.4906740,
    '(85) 3246-1200', TRUE
  ),
  (
    'loja-sao-paulo-01',
    'Pague Menos - Paulista (São Paulo)',
    'Av. Paulista, 1374 - Bela Vista',
    '01310-100', 'São Paulo', 'SP',
    -23.5645230, -46.6522180,
    '(11) 3246-2100', TRUE
  ),
  (
    'loja-rio-01',
    'Pague Menos - Botafogo (Rio de Janeiro)',
    'Rua Voluntários da Pátria, 190 - Botafogo',
    '22270-010', 'Rio de Janeiro', 'RJ',
    -22.9530460, -43.1859350,
    '(21) 3246-3100', TRUE
  ),
  (
    'loja-brasilia-01',
    'Pague Menos - Asa Norte (Brasília)',
    'SCLN 406, Bloco B, Loja 15 - Asa Norte',
    '70847-510', 'Brasília', 'DF',
    -15.7511450, -47.8880520,
    '(61) 3246-4100', TRUE
  )
ON DUPLICATE KEY UPDATE nome = VALUES(nome);


-- =============================================================================
-- BLOCO 3: PRODUTO
-- SKUs variados: perfumaria, higiene, suplementos e correlatos.
-- id: código interno; ean: código de barras EAN-13 fictício mas realista.
-- tipo: classificação interna do produto.
-- =============================================================================

INSERT INTO PRODUTO (id, ean, nome, marca, descricao, categoria_id, tipo, preco_atual, disponivel) VALUES

  -- HIGIENE BUCAL --
  ('prod-creme-colgate',      '7891024187791', 'Creme Dental Colgate Total 12 Active Fresh 90g',
   'Colgate',     'Proteção contra cáries, tártaro e manchas. Fórmula com flúor.',
   'cat-higiene-bucal', 'higiene',        9.89,  TRUE),

  ('prod-escova-oral-b',      '7500435137828', 'Escova Dental Oral-B Pro-Saúde Indicator 40 Macia',
   'Oral-B',      'Cerdas macias que protegem gengivas. Indicador de troca azul.',
   'cat-higiene-bucal', 'higiene',        14.90, TRUE),

  ('prod-fio-colgate',        '7891024186787', 'Fio Dental Colgate Total 12 Menta 25m',
   'Colgate',     'Remove resíduos entre os dentes com aroma de menta.',
   'cat-higiene-bucal', 'higiene',        7.49,  TRUE),

  -- CABELOS --
  ('prod-shampoo-pantene',    '7501007455693', 'Shampoo Pantene Pro-V Restauração 400ml',
   'Pantene',     'Restaura danos em até 14 dias. Fórmula com Pro-Vitamina B5.',
   'cat-cabelos',       'higiene',        22.90, TRUE),

  ('prod-cond-tresemme',      '7891150079083', 'Condicionador TRESemmé Hidratação Profunda 400ml',
   'TRESemmé',    'Hidratação intensa para cabelos ressecados e quebradiços.',
   'cat-cabelos',       'higiene',        19.90, TRUE),

  ('prod-mascara-elseve',     '3600522876014', 'Máscara Capilar L\'Oréal Elseve Hydra-Hyal 300ml',
   'L\'Oréal',    'Ácido hialurônico que preenche os fios e reduz o frizz.',
   'cat-cabelos',       'higiene',        34.90, TRUE),

  -- CORPO E BANHO --
  ('prod-sabonete-dove',      '7891150071148', 'Sabonete Dove Hidratação Profunda Original 90g',
   'Dove',        'Com 1/4 de creme hidratante. Pele mais macia após o banho.',
   'cat-corpo-banho',   'higiene',        4.29,  TRUE),

  ('prod-gel-banho-nivea',    '4005900498274', 'Gel de Banho NIVEA Cream Care 400ml',
   'NIVEA',       'Extrato de creme NIVEA para pele seca, suave ao toque.',
   'cat-corpo-banho',   'higiene',        21.90, TRUE),

  -- DESODORANTES --
  ('prod-deso-rexona-f',      '7891150061507', 'Desodorante Rexona Women Cotton Dry Aerossol 150ml',
   'Rexona',      'Proteção 48h contra suor e odor. Sem álcool no spray.',
   'cat-desodorantes',  'higiene',        18.49, TRUE),

  ('prod-deso-rexona-m',      '7891150031609', 'Desodorante Rexona Men Extreme Aerossol 150ml',
   'Rexona',      'Proteção 48h com tecnologia Motionsense para homens.',
   'cat-desodorantes',  'higiene',        18.49, TRUE),

  ('prod-deso-nivea-roll',    '4005900370082', 'Desodorante Roll-On NIVEA Fresh Natural 50ml',
   'NIVEA',       'Roll-on com extrato de algodão. Sem álcool, sem mancha.',
   'cat-desodorantes',  'higiene',        13.90, TRUE),

  -- HIDRATANTES FACIAIS --
  ('prod-hidrat-neutrogena', '3574661262734', 'Hidratante Facial Neutrogena Hydro Boost Water Gel 50g',
   'Neutrogena',  'Gel-creme com ácido hialurônico. Hidratação 72h sem oleosidade.',
   'cat-hidratantes',   'dermocosmetico', 64.90, TRUE),

  ('prod-hidrat-cerave',      '3606000594005', 'Hidratante Facial CeraVe Loção Hidratante 52ml',
   'CeraVe',      'Ceramidas + ácido hialurônico. Dermatologicamente testado.',
   'cat-hidratantes',   'dermocosmetico', 79.90, TRUE),

  -- PROTETOR SOLAR --
  ('prod-fps50-neutrogena',   '3574661441946', 'Protetor Solar Neutrogena Sun Fresh FPS 50 200ml',
   'Neutrogena',  'Toque seco, não oleoso. Resistente a água por 80 minutos.',
   'cat-protetor-solar',  'dermocosmetico', 59.90, TRUE),

  ('prod-fps60-isdin',        '8470001856760', 'Protetor Solar ISDIN Fusion Water SPF 60 50ml',
   'ISDIN',       'Textura ultra-leve. Controle de oleosidade e hidratação.',
   'cat-protetor-solar',  'dermocosmetico', 129.90, TRUE),

  -- ANTIENVELHECIMENTO --
  ('prod-retinol-roc',        '3574661564530', 'Sérum Antirrugas RoC Retinol Correxion 30ml',
   'RoC',         'Retinol puro de ação progressiva. Reduz rugas em 12 semanas.',
   'cat-antiidade',     'dermocosmetico', 149.90, TRUE),

  -- SUPLEMENTOS -- PROTEÍNAS --
  ('prod-whey-gold',          '0039442039302', 'Whey Protein Gold Standard 100% 907g Baunilha',
   'Optimum Nutrition', 'Whey isolado + concentrado. 24g de proteína por dose.',
   'cat-proteinas',     'suplemento',    229.90, TRUE),

  ('prod-creatina-atlhetica', '7896229400614', 'Creatina Monohidratada Atlhetica 300g',
   'Atlhetica Nutrition', '100% pura, sem sabor. Aumenta força e desempenho muscular.',
   'cat-proteinas',     'suplemento',    79.90,  TRUE),

  -- SUPLEMENTOS -- MULTIVITAMÍNICOS --
  ('prod-centrum-homem',      '7896015529619', 'Centrum Homem 60 Comprimidos',
   'Centrum',     'Multivitamínico completo com 23 vitaminas e minerais para homens.',
   'cat-multivitaminicos', 'suplemento', 59.90,  TRUE),

  ('prod-centrum-mulher',     '7896015529626', 'Centrum Mulher 60 Comprimidos',
   'Centrum',     'Multivitamínico para mulheres com Ferro, Cálcio e Vitamina D3.',
   'cat-multivitaminicos', 'suplemento', 59.90,  TRUE),

  -- SUPLEMENTOS -- ÔMEGAS --
  ('prod-omega3-vitgold',     '7896218800200', 'Ômega 3 1g Vitgold 60 Cápsulas',
   'Vitgold',     'EPA e DHA para saúde cardiovascular e cognitiva.',
   'cat-omegas',        'suplemento',    39.90,  TRUE),

  -- BEBÊ -- FRALDAS --
  ('prod-fralda-pampers-m',   '7500435132878', 'Fralda Pampers Premium Care Tamanho M 44 Unidades',
   'Pampers',     'Ultra absorvente, com proteção de 12h contra vazamentos.',
   'cat-fralda',        'bebe',           79.90, TRUE),

  -- BEBÊ -- HIGIENE INFANTIL --
  ('prod-shampoo-johnsons',   '7896019604004', 'Shampoo Johnson\'s Baby Lavanda 200ml',
   'Johnson\'s Baby', 'Fórmula suave sem lágrimas. Perfume de lavanda relaxante.',
   'cat-higiene-bebe',  'bebe',           24.90, TRUE),

  -- PERFUMARIA -- FEMININO --
  ('prod-perf-importad-f',    '3274872459143', 'Eau de Parfum La Vie Est Belle Lancôme 75ml',
   'Lancôme',     'Iris, pralinê e baunilha. O perfume da felicidade.',
   'cat-feminino',      'perfumaria',   549.90, TRUE),

  ('prod-perf-nacional-f',    '7891618003701', 'Colônia Inspiração Floral O Boticário 100ml',
   'O Boticário', 'Notas florais de rosa, jasmim e frésia. Duração prolongada.',
   'cat-feminino',      'perfumaria',    99.90, TRUE),

  -- PERFUMARIA -- MASCULINO --
  ('prod-perf-importad-m',    '3614272050302', 'Eau de Toilette Dior Sauvage 100ml',
   'Dior',        'Bergamota, pimenta Sichuan e madeiras ambariadas.',
   'cat-masculino',     'perfumaria',   649.90, TRUE),

  ('prod-perf-nacional-m',    '7896496903412', 'Deo Colônia Kaiak Masculino Natura 100ml',
   'Natura',      'Notas aquáticas e cítricas. Frescor intenso e duradouro.',
   'cat-masculino',     'perfumaria',    89.90, TRUE)

ON DUPLICATE KEY UPDATE
  nome        = VALUES(nome),
  preco_atual = VALUES(preco_atual),
  disponivel  = VALUES(disponivel);


-- =============================================================================
-- BLOCO 4: ESTOQUE_LOJA
-- Relacionamento PRODUTO x LOJA com quantidade em estoque e preço local.
-- Padrão de ID: 'est-<loja_alias>-<produto_alias>'
-- =============================================================================

INSERT INTO ESTOQUE_LOJA (id, loja_id, produto_id, quantidade, preco_local) VALUES

  -- LOJA: Fortaleza 01 (Aldeota)
  ('est-for01-creme-col',    'loja-fortaleza-01', 'prod-creme-colgate',       120,   9.89),
  ('est-for01-escova-ob',    'loja-fortaleza-01', 'prod-escova-oral-b',        85,  14.90),
  ('est-for01-sham-pan',     'loja-fortaleza-01', 'prod-shampoo-pantene',      60,  22.90),
  ('est-for01-deso-rex-f',   'loja-fortaleza-01', 'prod-deso-rexona-f',        90,  18.49),
  ('est-for01-deso-rex-m',   'loja-fortaleza-01', 'prod-deso-rexona-m',        90,  18.49),
  ('est-for01-hid-neutro',   'loja-fortaleza-01', 'prod-hidrat-neutrogena',    30,  64.90),
  ('est-for01-fps50-neu',    'loja-fortaleza-01', 'prod-fps50-neutrogena',     45,  59.90),
  ('est-for01-fps60-isd',    'loja-fortaleza-01', 'prod-fps60-isdin',          18, 129.90),
  ('est-for01-whey-gold',    'loja-fortaleza-01', 'prod-whey-gold',            22, 229.90),
  ('est-for01-omg3-vitg',    'loja-fortaleza-01', 'prod-omega3-vitgold',       70,  39.90),
  ('est-for01-fralda-pm',    'loja-fortaleza-01', 'prod-fralda-pampers-m',     50,  79.90),
  ('est-for01-perf-nac-f',   'loja-fortaleza-01', 'prod-perf-nacional-f',      25,  99.90),
  ('est-for01-perf-nac-m',   'loja-fortaleza-01', 'prod-perf-nacional-m',      25,  89.90),

  -- LOJA: Fortaleza 02 (Messejana)
  ('est-for02-creme-col',    'loja-fortaleza-02', 'prod-creme-colgate',       100,   9.49),
  ('est-for02-sab-dove',     'loja-fortaleza-02', 'prod-sabonete-dove',       150,   4.19),
  ('est-for02-gel-nivea',    'loja-fortaleza-02', 'prod-gel-banho-nivea',      80,  21.90),
  ('est-for02-deso-niv-r',   'loja-fortaleza-02', 'prod-deso-nivea-roll',     110,  13.90),
  ('est-for02-cond-tres',    'loja-fortaleza-02', 'prod-cond-tresemme',        55,  19.90),
  ('est-for02-mascara-el',   'loja-fortaleza-02', 'prod-mascara-elseve',       40,  34.90),
  ('est-for02-hid-cerave',   'loja-fortaleza-02', 'prod-hidrat-cerave',        15,  79.90),
  ('est-for02-ctr-homem',    'loja-fortaleza-02', 'prod-centrum-homem',        60,  59.90),
  ('est-for02-ctr-mulher',   'loja-fortaleza-02', 'prod-centrum-mulher',       60,  59.90),
  ('est-for02-creat-atl',    'loja-fortaleza-02', 'prod-creatina-atlhetica',   35,  79.90),
  ('est-for02-sham-joh',     'loja-fortaleza-02', 'prod-shampoo-johnsons',     65,  24.90),
  ('est-for02-perf-nac-m',   'loja-fortaleza-02', 'prod-perf-nacional-m',      18,  89.90),

  -- LOJA: São Paulo 01 (Paulista)
  ('est-sp01-creme-col',     'loja-sao-paulo-01', 'prod-creme-colgate',       200,   9.89),
  ('est-sp01-escova-ob',     'loja-sao-paulo-01', 'prod-escova-oral-b',       150,  14.90),
  ('est-sp01-fio-col',       'loja-sao-paulo-01', 'prod-fio-colgate',         200,   7.49),
  ('est-sp01-hid-neutro',    'loja-sao-paulo-01', 'prod-hidrat-neutrogena',    55,  64.90),
  ('est-sp01-hid-cerave',    'loja-sao-paulo-01', 'prod-hidrat-cerave',        40,  79.90),
  ('est-sp01-fps50-neu',     'loja-sao-paulo-01', 'prod-fps50-neutrogena',     80,  59.90),
  ('est-sp01-retinol-roc',   'loja-sao-paulo-01', 'prod-retinol-roc',          20, 149.90),
  ('est-sp01-whey-gold',     'loja-sao-paulo-01', 'prod-whey-gold',            40, 229.90),
  ('est-sp01-ctr-homem',     'loja-sao-paulo-01', 'prod-centrum-homem',        90,  59.90),
  ('est-sp01-ctr-mulher',    'loja-sao-paulo-01', 'prod-centrum-mulher',       90,  59.90),
  ('est-sp01-perf-imp-f',    'loja-sao-paulo-01', 'prod-perf-importad-f',      10, 549.90),
  ('est-sp01-perf-imp-m',    'loja-sao-paulo-01', 'prod-perf-importad-m',       8, 649.90),
  ('est-sp01-fralda-pm',     'loja-sao-paulo-01', 'prod-fralda-pampers-m',     80,  79.90),

  -- LOJA: Rio de Janeiro 01 (Botafogo)
  ('est-rj01-sham-pan',      'loja-rio-01',       'prod-shampoo-pantene',      70,  22.90),
  ('est-rj01-cond-tres',     'loja-rio-01',       'prod-cond-tresemme',        65,  19.90),
  ('est-rj01-mascara-el',    'loja-rio-01',       'prod-mascara-elseve',        50,  34.90),
  ('est-rj01-fps50-neu',     'loja-rio-01',       'prod-fps50-neutrogena',      90,  59.90),
  ('est-rj01-fps60-isd',     'loja-rio-01',       'prod-fps60-isdin',           22, 129.90),
  ('est-rj01-retinol-roc',   'loja-rio-01',       'prod-retinol-roc',           15, 149.90),
  ('est-rj01-omg3-vitg',     'loja-rio-01',       'prod-omega3-vitgold',        80,  39.90),
  ('est-rj01-sab-dove',      'loja-rio-01',       'prod-sabonete-dove',        180,   4.29),
  ('est-rj01-deso-rex-f',    'loja-rio-01',       'prod-deso-rexona-f',        100,  18.49),
  ('est-rj01-perf-nac-f',    'loja-rio-01',       'prod-perf-nacional-f',       30,  99.90),
  ('est-rj01-perf-imp-m',    'loja-rio-01',       'prod-perf-importad-m',        5, 649.90),

  -- LOJA: Brasília 01 (Asa Norte)
  ('est-bsb01-creme-col',    'loja-brasilia-01',  'prod-creme-colgate',        90,   9.89),
  ('est-bsb01-hid-neutro',   'loja-brasilia-01',  'prod-hidrat-neutrogena',    25,  64.90),
  ('est-bsb01-hid-cerave',   'loja-brasilia-01',  'prod-hidrat-cerave',        20,  79.90),
  ('est-bsb01-whey-gold',    'loja-brasilia-01',  'prod-whey-gold',            30, 229.90),
  ('est-bsb01-creat-atl',    'loja-brasilia-01',  'prod-creatina-atlhetica',   25,  79.90),
  ('est-bsb01-ctr-homem',    'loja-brasilia-01',  'prod-centrum-homem',        70,  59.90),
  ('est-bsb01-ctr-mulher',   'loja-brasilia-01',  'prod-centrum-mulher',       70,  59.90),
  ('est-bsb01-omg3-vitg',    'loja-brasilia-01',  'prod-omega3-vitgold',       60,  39.90),
  ('est-bsb01-fralda-pm',    'loja-brasilia-01',  'prod-fralda-pampers-m',     45,  79.90),
  ('est-bsb01-perf-imp-f',   'loja-brasilia-01',  'prod-perf-importad-f',       6, 549.90),
  ('est-bsb01-perf-nac-m',   'loja-brasilia-01',  'prod-perf-nacional-m',      20,  89.90)

ON DUPLICATE KEY UPDATE
  quantidade  = VALUES(quantidade),
  preco_local = VALUES(preco_local);


-- =============================================================================
-- BLOCO 5: USUARIO
-- Perfis de teste.
-- ATENÇÃO: IDs 'C001' e 'C002' são exigidos pelo contrato de API do chatbot.
-- =============================================================================

INSERT INTO USUARIO (
  id, nome, data_nascimento, email, telefone,
  cep, cidade, estado, bairro, endereco,
  latitude, longitude
) VALUES
  (
    'C001',
    'Ana Beatriz Lima',
    '1990-06-15',
    'ana.beatriz.lima@email-teste.com',
    '(85) 99821-3344',
    '60160-230', 'Fortaleza', 'CE', 'Aldeota',
    'Rua Osvaldo Cruz, 1890, Apto 302',
    -3.7342100, -38.5001300
  ),
  (
    'C002',
    'Carlos Eduardo Moura',
    '1985-11-28',
    'carlos.eduardo.moura@email-teste.com',
    '(11) 98765-4321',
    '01310-100', 'São Paulo', 'SP', 'Bela Vista',
    'Av. Paulista, 900, Apto 85',
    -23.5642000, -46.6542000
  ),
  (
    'C003',
    'Fernanda Oliveira Santos',
    '1998-03-07',
    'fernanda.santos@email-teste.com',
    '(21) 97654-8890',
    '22270-010', 'Rio de Janeiro', 'RJ', 'Botafogo',
    'Rua Voluntários da Pátria, 88, Casa',
    -22.9524000, -43.1861000
  ),
  (
    'C004',
    'Roberto Alves Pereira',
    '1979-09-20',
    'roberto.alves@email-teste.com',
    '(61) 99988-7766',
    '70847-510', 'Brasília', 'DF', 'Asa Norte',
    'SQN 407, Bloco F, Apto 301',
    -15.7490000, -47.8865000
  )
ON DUPLICATE KEY UPDATE
  nome     = VALUES(nome),
  email    = VALUES(email),
  telefone = VALUES(telefone);


-- =============================================================================
-- BLOCO 6: CONSENTIMENTO
-- Registros de aceite LGPD vinculados aos usuários de teste.
-- finalidade: 'historico_compras', 'perfil_saude', 'marketing', 'dados_localizacao'
-- aceito: 1 = aceito, 0 = recusado (conforme CHECK da tabela)
-- =============================================================================

INSERT INTO CONSENTIMENTO (id, usuario_id, finalidade, aceito) VALUES
  -- C001 – Ana Beatriz: aceita tudo exceto marketing
  ('cons-c001-hist',  'C001', 'historico_compras',  1),
  ('cons-c001-saude', 'C001', 'perfil_saude',        1),
  ('cons-c001-mkt',   'C001', 'marketing',           0),
  ('cons-c001-loc',   'C001', 'dados_localizacao',   1),

  -- C002 – Carlos Eduardo: aceita tudo
  ('cons-c002-hist',  'C002', 'historico_compras',  1),
  ('cons-c002-saude', 'C002', 'perfil_saude',        1),
  ('cons-c002-mkt',   'C002', 'marketing',           1),
  ('cons-c002-loc',   'C002', 'dados_localizacao',   1),

  -- C003 – Fernanda: aceita somente compras e localização
  ('cons-c003-hist',  'C003', 'historico_compras',  1),
  ('cons-c003-saude', 'C003', 'perfil_saude',        0),
  ('cons-c003-mkt',   'C003', 'marketing',           0),
  ('cons-c003-loc',   'C003', 'dados_localizacao',   1),

  -- C004 – Roberto: aceita tudo
  ('cons-c004-hist',  'C004', 'historico_compras',  1),
  ('cons-c004-saude', 'C004', 'perfil_saude',        1),
  ('cons-c004-mkt',   'C004', 'marketing',           1),
  ('cons-c004-loc',   'C004', 'dados_localizacao',   1)

ON DUPLICATE KEY UPDATE aceito = VALUES(aceito);


-- =============================================================================
-- BLOCO 7: PREFERENCIA_USUARIO
-- Preferências iniciais para personalização do atendimento pelo chatbot.
-- categorias_favoritas / marcas_favoritas: arrays JSON.
-- =============================================================================

INSERT INTO PREFERENCIA_USUARIO (
  usuario_id,
  categorias_favoritas,
  marcas_favoritas,
  preco_minimo,
  preco_maximo,
  canal_preferido,
  tratamento_preferido
) VALUES
  (
    'C001',
    '["cat-dermocosmeticos", "cat-protetor-solar", "cat-higiene"]',
    '["Neutrogena", "ISDIN", "CeraVe", "Dove"]',
    10.00, 200.00,
    'chatbot_web',
    'hidratação e proteção solar'
  ),
  (
    'C002',
    '["cat-suplementos", "cat-proteinas", "cat-multivitaminicos"]',
    '["Optimum Nutrition", "Atlhetica Nutrition", "Centrum"]',
    30.00, 500.00,
    'chatbot_whatsapp',
    'performance esportiva e saúde masculina'
  ),
  (
    'C003',
    '["cat-cabelos", "cat-dermocosmeticos", "cat-perfumaria"]',
    '["L\'Oréal", "TRESemmé", "Lancôme", "O Boticário"]',
    20.00, 600.00,
    'chatbot_web',
    'cuidados com cabelo e perfumaria feminina'
  ),
  (
    'C004',
    '["cat-suplementos", "cat-omegas", "cat-multivitaminicos"]',
    '["Centrum", "Vitgold", "Dior", "Natura"]',
    15.00, 300.00,
    'chatbot_whatsapp',
    'saúde e bem-estar masculino'
  )
ON DUPLICATE KEY UPDATE
  categorias_favoritas = VALUES(categorias_favoritas),
  marcas_favoritas     = VALUES(marcas_favoritas),
  preco_minimo         = VALUES(preco_minimo),
  preco_maximo         = VALUES(preco_maximo),
  canal_preferido      = VALUES(canal_preferido),
  tratamento_preferido = VALUES(tratamento_preferido);


SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- FIM DO SCRIPT DE SEED DATA
-- =============================================================================

