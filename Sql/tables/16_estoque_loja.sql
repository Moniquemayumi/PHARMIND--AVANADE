-- =============================================================================
-- Tabela: ESTOQUE_LOJA
-- Descrição: Estoque e preço local de produtos em cada filial.
-- Dependências: LOJA, PRODUTO
-- =============================================================================

CREATE TABLE IF NOT EXISTS ESTOQUE_LOJA (
  id CHAR(36) NOT NULL PRIMARY KEY,
  loja_id CHAR(36) NOT NULL,
  produto_id VARCHAR(50) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  preco_local DECIMAL(10,2) NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_estoque_loja_produto (loja_id, produto_id),
  KEY idx_estoque_produto_quantidade (produto_id, quantidade),
  CONSTRAINT fk_estoque_loja FOREIGN KEY (loja_id) REFERENCES LOJA(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_estoque_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_estoque_quantidade CHECK (quantidade >= 0),
  CONSTRAINT chk_estoque_preco CHECK (preco_local IS NULL OR preco_local >= 0)
) ENGINE=InnoDB;
