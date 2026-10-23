-- =============================================================================
-- Tabela: LOJA
-- Descrição: Filiais físicas da rede de farmácias com coordenadas geográficas.
-- Dependências: Nenhuma
-- =============================================================================

CREATE TABLE IF NOT EXISTS LOJA (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  nome VARCHAR(180) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  cep VARCHAR(12) NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  telefone VARCHAR(30) NULL,
  ativa BOOLEAN NOT NULL DEFAULT TRUE,
  KEY idx_loja_cidade_estado_ativa (cidade, estado, ativa),
  CONSTRAINT chk_loja_latitude CHECK (latitude IS NULL OR latitude BETWEEN -90 AND 90),
  CONSTRAINT chk_loja_longitude CHECK (longitude IS NULL OR longitude BETWEEN -180 AND 180)
) ENGINE=InnoDB;
