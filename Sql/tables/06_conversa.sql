-- =============================================================================
-- Tabela: CONVERSA
-- Descrição: Sessões de atendimento e conversas com o chatbot.
-- Dependências: USUARIO
-- =============================================================================

CREATE TABLE IF NOT EXISTS CONVERSA (
  id CHAR(36) NOT NULL PRIMARY KEY,
  usuario_id CHAR(36) NOT NULL,
  titulo VARCHAR(200) NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'ativa',
  iniciada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  encerrada_em DATETIME NULL,
  KEY idx_conversa_usuario_iniciada (usuario_id, iniciada_em),
  KEY idx_conversa_status (status),
  CONSTRAINT fk_conversa_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_conversa_status CHECK (status IN ('ativa','encerrada','arquivada'))
) ENGINE=InnoDB;
