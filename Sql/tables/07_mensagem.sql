-- =============================================================================
-- Tabela: MENSAGEM
-- Descrição: Mensagens individuais enviadas na conversa (usuário, assistente, sistema).
-- Dependências: CONVERSA
-- =============================================================================

CREATE TABLE IF NOT EXISTS MENSAGEM (
  id CHAR(36) NOT NULL PRIMARY KEY,
  conversa_id CHAR(36) NOT NULL,
  papel VARCHAR(20) NOT NULL,
  conteudo TEXT NOT NULL,
  enviada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_mensagem_conversa_data (conversa_id, enviada_em),
  CONSTRAINT fk_mensagem_conversa FOREIGN KEY (conversa_id) REFERENCES CONVERSA(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_mensagem_papel CHECK (papel IN ('usuario','assistente','sistema'))
) ENGINE=InnoDB;
