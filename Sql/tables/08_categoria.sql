-- =============================================================================
-- Tabela: CATEGORIA
-- Descrição: Categorias de produtos com auto-relacionamento para hierarquia.
-- Dependências: Nenhuma (auto-referência interna opcional)
-- =============================================================================

CREATE TABLE IF NOT EXISTS CATEGORIA (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  categoria_pai_id VARCHAR(50) NULL,
  nome VARCHAR(120) NOT NULL,
  UNIQUE KEY uq_categoria_pai_nome (categoria_pai_id, nome),
  CONSTRAINT fk_categoria_pai FOREIGN KEY (categoria_pai_id) REFERENCES CATEGORIA(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_categoria_autoreferencia CHECK (id <> categoria_pai_id)
) ENGINE=InnoDB;
