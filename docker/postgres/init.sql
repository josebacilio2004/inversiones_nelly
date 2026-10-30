-- ====================================================================
-- INVERSIONES NELLY S.A.C. - POSTGRESQL 16 INITIALIZATION SCRIPT
-- ====================================================================

-- Habilitar extensión UUID criptográfica
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Habilitar extensión de búsqueda textual trigram para razones sociales y RUCs
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Configurar zona horaria de Perú
SET TIME ZONE 'America/Lima';

-- Notificación de inicio de base de datos
DO $$
BEGIN
    RAISE NOTICE 'Base de Datos inversiones_nelly_db inicializada con éxito para Inversiones Nelly S.A.C.';
END $$;
