-- =============================================================================
-- Tabela: PEDIDO
-- Descrição: Registro de pedidos realizados pelos usuários.
-- Dependências: USUARIO
-- =============================================================================

CREATE TABLE IF NOT EXISTS PEDIDO (
  id CHAR(36) NOT NULL PRIMARY KEY,
  usuario_id CHAR(36) NOT NULL,
  realizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  valor_total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  status VARCHAR(30) NOT NULL DEFAULT 'pendente',
  origem VARCHAR(40) NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_pedido_usuario_data (usuario_id, realizado_em),
  KEY idx_pedido_status (status),
  CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_pedido_valor_total CHECK (valor_total >= 0),
  CONSTRAINT chk_pedido_status CHECK (
    status IN ('pendente','confirmado','processando','enviado','concluido','cancelado','devolvido')
  )
) ENGINE=InnoDB;
