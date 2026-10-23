-- =============================================================================
-- Tabela: BULA_SECAO
-- Descrição: Seções textuais da bula para consulta e busca semântica (RAG).
-- Dependências: MEDICAMENTO
-- =============================================================================

CREATE TABLE IF NOT EXISTS BULA_SECAO (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  medicamento_id VARCHAR(50) NOT NULL,
  tipo VARCHAR(100) NOT NULL,
  texto LONGTEXT NOT NULL,
  fonte VARCHAR(2048) NULL,
  versao VARCHAR(100) NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Referência ao embedding em serviço vetorial externo; MySQL 8 não possui VECTOR nativo equivalente ao pgvector.
  embedding_ref VARCHAR(512) NULL,
  KEY idx_bula_secao_medicamento_tipo (medicamento_id, tipo),
  CONSTRAINT fk_bula_secao_medicamento FOREIGN KEY (medicamento_id) REFERENCES MEDICAMENTO(produto_id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
