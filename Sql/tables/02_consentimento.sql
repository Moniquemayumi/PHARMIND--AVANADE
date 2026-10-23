-- =============================================================================
-- Tabela: CONSENTIMENTO
-- Descrição: Registro de consentimento para LGPD / privacidade.
-- Dependências: USUARIO
-- =============================================================================

CREATE TABLE IF NOT EXISTS CONSENTIMENTO (
  id CHAR(36) NOT NULL PRIMARY KEY,
  usuario_id CHAR(36) NOT NULL,
  finalidade VARCHAR(80) NOT NULL,
  aceito BOOLEAN NOT NULL,
  registrado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_consentimento_usuario_finalidade (usuario_id, finalidade, registrado_em),
  CONSTRAINT fk_consentimento_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT chk_consentimento_aceito CHECK (aceito IN (0, 1))
) ENGINE=InnoDB;
