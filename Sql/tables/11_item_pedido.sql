-- =============================================================================
-- Tabela: ITEM_PEDIDO
-- Descrição: Itens contidos em cada pedido (relação N:N entre PEDIDO e PRODUTO).
-- Dependências: PEDIDO, PRODUTO
-- =============================================================================

CREATE TABLE IF NOT EXISTS ITEM_PEDIDO (
  id CHAR(36) NOT NULL PRIMARY KEY,
  pedido_id VARCHAR(36) NOT NULL,
  produto_id VARCHAR(50) NOT NULL,
  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  nome_produto_no_pedido VARCHAR(200) NULL,
  KEY idx_item_pedido_pedido (pedido_id),
  KEY idx_item_pedido_produto (produto_id),
  CONSTRAINT fk_item_pedido_pedido FOREIGN KEY (pedido_id) REFERENCES PEDIDO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_item_pedido_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_item_pedido_quantidade CHECK (quantidade > 0),
  CONSTRAINT chk_item_pedido_preco CHECK (preco_unitario >= 0)
) ENGINE=InnoDB;
