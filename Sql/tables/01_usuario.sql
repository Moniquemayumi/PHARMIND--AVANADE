-- =============================================================================
-- Tabela: USUARIO
-- Descrição: Armazena os dados cadastrais e de localização dos usuários/clientes.
-- =============================================================================

CREATE TABLE IF NOT EXISTS USUARIO (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  data_nascimento DATE NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  telefone VARCHAR(30) NULL,
  cep VARCHAR(12) NULL,
  cidade VARCHAR(100) NULL,
  estado CHAR(2) NULL,
  bairro VARCHAR(100) NULL,
  endereco VARCHAR(255) NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_usuario_cep (cep),
  KEY idx_usuario_cidade_estado (cidade, estado),
  CONSTRAINT chk_usuario_latitude CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
  CONSTRAINT chk_usuario_longitude CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180)
) ENGINE=InnoDB;
