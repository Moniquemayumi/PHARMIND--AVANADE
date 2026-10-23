-- =============================================================================
-- Tabela: MEDICAMENTO
-- Descrição: Especialização de PRODUTO contendo atributos farmacêuticos.
-- Dependências: PRODUTO (relação 1:1), PRINCIPIO_ATIVO
-- =============================================================================

CREATE TABLE IF NOT EXISTS MEDICAMENTO (
  produto_id VARCHAR(50) NOT NULL PRIMARY KEY,
  principio_ativo_id VARCHAR(50) NULL,
  concentracao VARCHAR(120) NULL,
  forma_farmaceutica VARCHAR(120) NULL,
  tipo VARCHAR(80) NULL,
  tarja VARCHAR(50) NULL,
  exige_receita BOOLEAN NULL,
  registro_anvisa VARCHAR(80) NULL,
  KEY idx_medicamento_principio_ativo (principio_ativo_id),
  KEY idx_medicamento_registro_anvisa (registro_anvisa),
  CONSTRAINT fk_medicamento_produto FOREIGN KEY (produto_id) REFERENCES PRODUTO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_medicamento_principio_ativo FOREIGN KEY (principio_ativo_id) REFERENCES PRINCIPIO_ATIVO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
