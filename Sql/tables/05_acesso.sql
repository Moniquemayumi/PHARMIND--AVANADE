-- =============================================================================
-- Tabela: ACESSO
-- Descrição: Registro de acessos e logins do usuário por canal.
-- Dependências: USUARIO
-- =============================================================================

CREATE TABLE IF NOT EXISTS ACESSO (
  id CHAR(36) NOT NULL PRIMARY KEY,
  usuario_id CHAR(36) NOT NULL,
  inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  canal VARCHAR(40) NOT NULL,
  KEY idx_acesso_usuario_inicio (usuario_id, inicio),
  CONSTRAINT fk_acesso_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
