-- =============================================================================
-- Tabela: PREFERENCIA_USUARIO
-- Descrição: Preferências de consumo, marcas, categorias e faixas de preço.
-- Dependências: USUARIO (relação 1:1)
-- =============================================================================

CREATE TABLE IF NOT EXISTS PREFERENCIA_USUARIO (
  usuario_id VARCHAR(50) NOT NULL PRIMARY KEY,
  categorias_favoritas JSON NULL,
  marcas_favoritas JSON NULL,
  preco_minimo DECIMAL(10,2) NULL,
  preco_maximo DECIMAL(10,2) NULL,
  canal_preferido VARCHAR(40) NULL,
  tratamento_preferido VARCHAR(80) NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_preferencia_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_preferencia_preco_minimo CHECK (preco_minimo IS NULL OR preco_minimo >= 0),
  CONSTRAINT chk_preferencia_preco_maximo CHECK (preco_maximo IS NULL OR preco_maximo >= 0),
  CONSTRAINT chk_preferencia_faixa_preco CHECK (
    preco_minimo IS NULL OR preco_maximo IS NULL OR preco_minimo <= preco_maximo
  )
) ENGINE=InnoDB;
