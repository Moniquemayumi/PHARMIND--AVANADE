-- =============================================================================
-- Tabela: PERFIL_SAUDE
-- Descrição: Armazena dados sensíveis de saúde criptografados do usuário.
-- Dependências: USUARIO (relação 1:1)
-- =============================================================================

CREATE TABLE IF NOT EXISTS PERFIL_SAUDE (
  usuario_id VARCHAR(50) NOT NULL PRIMARY KEY,
  alergias_criptografadas TEXT NULL,
  condicoes_criptografadas TEXT NULL,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_perfil_saude_usuario FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
