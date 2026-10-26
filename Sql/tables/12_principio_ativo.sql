-- =============================================================================
-- Tabela: PRINCIPIO_ATIVO
-- Descrição: Catálogo de princípios ativos farmacêuticos e classes terapêuticas.
-- Dependências: Nenhuma
-- =============================================================================

CREATE TABLE IF NOT EXISTS PRINCIPIO_ATIVO (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  nome VARCHAR(180) NOT NULL UNIQUE,
  classe_terapeutica VARCHAR(180) NULL
) ENGINE=InnoDB;
