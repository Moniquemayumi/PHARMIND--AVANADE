-- =============================================================================
-- Script Mestre: Execução da criação de todas as tabelas em ordem
-- Banco de Dados: chatbot_farmacia (MySQL 8.0+)
--
-- Formas de execução:
-- 1) Pelo terminal (na pasta raiz do projeto):
--      mysql -u <usuario> -p < executar_todos.sql
--
-- 2) Dentro do console interativo MySQL (na pasta raiz do projeto):
--      SOURCE executar_todos.sql;
-- =============================================================================

-- Criação e seleção do banco de dados
SOURCE tables/00_database.sql;

-- 1. Usuário e Dados Cadastrais / Perfil (Nível 0 e Nível 1)
SOURCE tables/01_usuario.sql;
SOURCE tables/02_consentimento.sql;
SOURCE tables/03_perfil_saude.sql;
SOURCE tables/04_preferencia_usuario.sql;
SOURCE tables/05_acesso.sql;

-- 2. Atendimento e Sessões de Conversa do Chatbot (Nível 1 e Nível 2)
SOURCE tables/06_conversa.sql;
SOURCE tables/07_mensagem.sql;

-- 3. Catálogo e Hierarquia de Categorias (Nível 0 e Nível 1)
SOURCE tables/08_categoria.sql;
SOURCE tables/09_produto.sql;

-- 4. Pedidos e Itens do Pedido (Nível 1 e Nível 2)
SOURCE tables/10_pedido.sql;
SOURCE tables/11_item_pedido.sql;

-- 5. Princípios Ativos, Medicamentos e Seções de Bulas para RAG (Nível 0, 2 e 3)
SOURCE tables/12_principio_ativo.sql;
SOURCE tables/13_medicamento.sql;
SOURCE tables/14_bula_secao.sql;

-- 6. Lojas e Controle de Estoque Filial (Nível 0 e Nível 2)
SOURCE tables/15_loja.sql;
SOURCE tables/16_estoque_loja.sql;
