-- =============================================================================
-- Tabela: PRODUTO
-- Descrição: Catálogo de produtos gerais comercializados pela farmácia.
-- Dependências: CATEGORIA
-- =============================================================================

CREATE TABLE IF NOT EXISTS PRODUTO (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  ean VARCHAR(20) NULL UNIQUE,
  nome VARCHAR(200) NOT NULL,
  marca VARCHAR(120) NULL,
  descricao TEXT NULL,
  categoria_id VARCHAR(50) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  preco_atual DECIMAL(10,2) NULL,
  disponivel BOOLEAN NOT NULL DEFAULT TRUE,
  url_origem VARCHAR(2048) NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_produto_nome (nome),
  KEY idx_produto_marca (marca),
  KEY idx_produto_categoria (categoria_id),
  KEY idx_produto_tipo_disponivel (tipo, disponivel),
  CONSTRAINT fk_produto_categoria FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_produto_preco CHECK (preco_atual IS NULL OR preco_atual >= 0)
) ENGINE=InnoDB;