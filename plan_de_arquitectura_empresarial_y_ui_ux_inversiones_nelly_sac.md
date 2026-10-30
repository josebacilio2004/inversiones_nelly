# Arquitectura Empresarial, Next.js (TypeScript) y Dockerización: Inversiones Nelly S.A.C.

**Rol:** Senior Full Stack Architect & Senior UI/UX Designer  
**Cliente:** Inversiones Nelly S.A.C.  
**Stack Principal:** Next.js 15 (App Router) + TypeScript + Tailwind CSS + Prisma ORM + PostgreSQL 16 + Redis 7 (Todo 100% Dockerizado).  
**Unidades de Negocio:**
1. **División Eco-Sanitarios (B2B / Industrial / Eventos):** Alquiler, logística de entrega/recojo y mantenimiento (succión/limpieza) de baños portátiles, lavamanos y duchas. *(Referencia comercial: Ancro Perú)*.
2. **División Hotelera (B2C / Corporativo):** Reserva de habitaciones, gestión de huéspedes (Check-in/Check-out), housekeeping y convenios corporativos para personal de obra.

---

## 1. Sistema de Diseño UI/UX y Psicología del Color

A partir del análisis del isotipo oficial de **Inversiones Nelly S.A.C.** (la letra "I" en tono ocre/tierra, la "N" en verde lima orgánico con hojas detalladas y el aro que integra un trazo azul celeste hídrico), definimos los **Design Tokens** en Tailwind CSS para guiar visualmente al usuario entre ambos rubros sin perder unidad de marca:

| Token en Tailwind (`tailwind.config.ts`) | Código HEX | Origen en el Logo | Aplicación Estratégica en UI/UX |
| :--- | :--- | :--- | :--- |
| `brand-green` (`DEFAULT` / `dark`) | `#6CBE1A` / `#2E5A07` | Letra "N" y hojas | **Identidad Corporativa & División Sanitarios:** Transmite ecología, desinfección certificada (DIGESA) y estándares medioambientales en obra. |
| `brand-gold` (`DEFAULT` / `light`) | `#C8A064` / `#F5EBE0` | Letra "I" y tallo | **División Hotelera & Hospitalidad:** Transmite calidez, descanso ejecutivo, confort y atención personalizada. |
| `brand-water` (`DEFAULT`) | `#00A8E8` | Arco interno del anillo | **Acento Higiene / Agua / Succión:** Usado en iconografía de limpieza hidrostática, lavamanos portátiles y estados de mantenimiento en el ERP. |
| `brand-dark` (`DEFAULT`) | `#0F172A` | Contraste de marca | **Fondos Corporativos y Textos Principales:** Sustituye al negro puro del fondo del logo para ofrecer legibilidad moderna y elegante. |

---

## 2. Reformulación de la Estructura del Landing Page (Next.js App Router + CRO)

En lugar de mezclar habitaciones de hotel y baños químicos en una misma página sin orden, reformulamos la arquitectura de información mediante **un Portal Corporativo Paraguas (Hub General)** que se subdivide limpiamente a través de un **Mega-Menú Inteligente con Conmutador de Rubro** y rutas estáticas optimizadas para SEO (`SSR`/`ISR`).

### 2.1. Wireframe Estructural y Flujo de Navegación del Landing Page

```
====================================================================================================
[ TOP BAR CORPORATIVO ]  RUC: 20XXXXXXXXX | Certificación Ambiental DIGESA | Atención 24/7 | [Intranet ERP]
====================================================================================================
[ HEADER STICKY INTELIGENTE ]
  (Logo Inversiones Nelly SAC)    [ Inicio Grupo ]   [ Sanitarios Portátiles v ]   [ Hotel & Estadías v ]   [ Convenios B2B ]
                                                     |-- Para Obras y Minería      |-- Habitaciones y Suites
                                                     |-- Para Eventos VIP          |-- Tarifas para Empresas
                                                     |-- Lavamanos y Duchas        |-- Servicios e Instalaciones
                                                     |-- Calculadora Norma G.050   |-- Reservar Online
====================================================================================================

1. RUTA PRINCIPAL `/` (HUB CORPORATIVO GENERAL - "GRUPO INVERSIONES NELLY S.A.C.")
   ├── [Hero Split-Screen Interactivo (50% / 50%)]:
   │     ├── Columna Izquierda (Tema Verde #6CBE1A + Azul #00A8E8):
   │     │     "Alquiler de Sanitarios Portátiles para Obras, Minería y Eventos"
   │     │     [CTA: Cotizar Equipos Ahora] -> Redirige a `/sanitarios-portatiles`
   │     └── Columna Derecha (Tema Dorado #C8A064 + Slate #0F172A):
   │           "Hotel & Hospedaje Ejecutivo: El descanso ideal para viajeros y equipos de trabajo"
   │           [CTA: Ver Disponibilidad de Habitaciones] -> Redirige a `/hotel`
   ├── [Barra de Autoridad y Respaldo]: +10 años de experiencia | Flota Propia Hidrosuccionadora | Facturación Electrónica SUNAT
   ├── [Sección de Sinergia B2B - "Pack Constructora / Contratista"]:
   │     "¿Ejecutas un proyecto en la región? Equipa tu obra con nuestros sanitarios portátiles y aloja a tus ingenieros y supervisores en nuestro hotel con una sola factura corporativa y línea de crédito."
   └── [Footer Unificado]: Mapa de ubicación, Libro de Reclamaciones Virtual, enlaces directos y botón flotante de WhatsApp Dual.

----------------------------------------------------------------------------------------------------

2. SUB-PORTAL `/sanitarios-portatiles` (EMBUDO B2B INSPIRADO EN ANCRO PERÚ)
   ├── [Hero B2B de Alta Conversión]:
   │     ├── Izquierda: Propuesta de valor ("Sanitarios Portátiles resistentes, higienizados bajo normativa ambiental").
   │     └── Derecha (Sticky Form): Formulario Rápido de Cotización por RUC (Autocompletado SUNAT, Ubicación de Obra, Duración, Cantidad).
   ├── [Selector por Sector de Uso]:
   │     [ Construcción Civil (Norma G.050) ] | [ Minería y Energía ] | [ Eventos y Conciertos ] | [ Agroindustria ]
   ├── [Catálogo Técnico Interactivo (Tarjetas con Specs JSON + Descarga Ficha PDF)]:
   │     1. Sanitario Estándar Obra (Tanque 210L, alta resistencia al impacto, ventilación).
   │     2. Sanitario Ejecutivo VIP (Bomba de pie, lavamanos interno, dispensador jabón/papel).
   │     3. Sanitario Accesible / Discapacitados (Amplio espacio para silla de ruedas, barras de apoyo).
   │     4. Lavamanos Portátil Autónomo (2 estaciones, acción por pedal, agua limpia/residual separada).
   │     5. Ducha Portátil Individual.
   ├── [Widget Interactivo: Calculadora Normativa G.050]:
   │     Input de Nº de obreros y género -> Calcula automáticamente la dotación obligatoria de baños y frecuencia de succión semanal.
   └── [Ciclo Operativo del Servicio (4 Pasos Visuales)]:
         1. Entrega e Instalación en Obra -> 2. Succión con Camión Hidrostático -> 3. Desinfección con Biodegradables -> 4. Entrega de Certificado Ambiental.

----------------------------------------------------------------------------------------------------

3. SUB-PORTAL `/hotel` (EMBUDO DE RESERVAS DIRECTAS B2C / B2B)
   ├── [Hero Hospitalidad + Motor de Búsqueda Horizontal]:
   │     Inputs: [Fecha Check-In] | [Fecha Check-Out] | [Huéspedes] | [Código Convenio Empresa (Opcional)] -> [Buscar Habitaciones]
   ├── [Catálogo de Habitaciones en Tiempo Real]:
   │     Muestra Habitación Simple Ejecutiva, Matrimonial, Doble/Triple para Contratistas y Suite, con precios en Soles (S/), fotos y amenidades.
   ├── [Drawer / Modal de Checkout Directo]:
   │     Registro con DNI/RUC, resumen de noches, pago con Yape/Plin/Tarjeta o Reserva Corporativa y generación de código de reserva.
   └── [Servicios Complementarios]: Cochera privada para camionetas de obra, Wi-Fi de alta velocidad, desayuno temprano para personal de campo.
```

---

## 3. Estructura de Directorios en Next.js (TypeScript)

Empleamos **Next.js App Router** con **Route Groups** para mantener en un mismo repositorio tanto el portal publicitario SEO-friendly como el ERP Administrativo protegido por middleware, compartiendo componentes tipados y acciones de servidor (*Server Actions*).

```text
inversiones-nelly-platform/
├── docker/
│   ├── postgres/
│   │   └── init.sql                     # Extensiones UUID e índices iniciales
│   └── nginx/
│       └── nginx.conf                   # Reverse Proxy opcional para producción
├── prisma/
│   ├── schema.prisma                    # Esquema unificado (Core, Sanitarios, Hotel)
│   └── seed.ts                          # Datos semilla (Catálogo Ancro-style + Habitaciones)
├── src/
│   ├── app/
│   │   ├── (marketing)/                 # GRUPO DE RUTAS PÚBLICAS (LANDING & SUB-PORTALES)
│   │   │   ├── layout.tsx               # Header con Mega-Menú Dual + Footer Corporativo
│   │   │   ├── page.tsx                 # Hub Principal (Grupo Inversiones Nelly SAC)
│   │   │   ├── sanitarios-portatiles/
│   │   │   │   └── page.tsx             # Landing B2B estilo Ancro + Calculadora G.050
│   │   │   ├── hotel/
│   │   │   │   └── page.tsx             # Landing Hotelera + Motor de Disponibilidad
│   │   │   └── convenios-empresas/
│   │   │       └── page.tsx             # Paquetes Mixtos (Baños en Obra + Hotel Ingenieros)
│   │   │
│   │   ├── (erp)/                       # GRUPO DE RUTAS PRIVADAS (SISTEMA ADMINISTRATIVO)
│   │   │   ├── layout.tsx               # Sidebar ERP + Topbar Usuario/Notificaciones
│   │   │   └── admin/
│   │   │       ├── dashboard/page.tsx   # KPIs combinados (Ingresos S/, Flota, Ocupación)
│   │   │       ├── sanitarios/
│   │   │       │   ├── flota/page.tsx   # Control de unidades por QR/Serie
│   │   │       │   ├── contratos/page.tsx
│   │   │       │   └── rutas-limpieza/page.tsx # Hoja de ruta diaria de camiones de succión
│   │   │       ├── hotel/
│   │   │       │   ├── rack/page.tsx    # Rack visual de habitaciones por piso
│   │   │       │   └── reservas/page.tsx
│   │   │       └── facturacion/page.tsx # Clientes unificados RUC/DNI y emisión SUNAT
│   │   │
│   │   └── api/                         # Route Handlers (REST Endpoints & Webhooks)
│   │       ├── quotes/sanitarios/route.ts
│   │       ├── bookings/hotel/route.ts
│   │       └── sunat/ruc-lookup/route.ts
│   │
│   ├── components/
│   │   ├── brand/NellyLogo.tsx          # Isotipo SVG vectorial oficial
│   │   ├── sanitarios/                  # G050Calculator.tsx, SanitaryCatalogCard.tsx, QuoteFormB2B.tsx
│   │   ├── hotel/                       # BookingEngineBar.tsx, RoomCard.tsx, HotelRackGrid.tsx
│   │   └── erp/                         # KpiStatCard.tsx, MaintenanceRouteTable.tsx
│   ├── lib/
│   │   ├── prisma.ts                    # Singleton de conexión a PostgreSQL
│   │   └── redis.ts                     # Cliente Redis para caché de disponibilidad
│   └── types/
│       └── domain.ts                    # Interfaces estrictas en TypeScript
├── Dockerfile                           # Build Multi-Stage optimizado con output: 'standalone'
├── docker-compose.yml                   # Orquestación completa (App + Postgres + Redis + Migrator)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 3.1. Definición de Tipos Principales en TypeScript (`src/types/domain.ts`)

```typescript
export type BusinessUnit = 'SANITARIOS' | 'HOTEL' | 'CONVENIO_MIXTO';

export type SanitaryCategory = 'OBRA_MINERIA' | 'EVENTOS_VIP' | 'DISCAPACITADOS' | 'LAVAMANOS' | 'DUCHAS';
export type SanitaryUnitStatus = 'DISPONIBLE' | 'ALQUILADO_EN_OBRA' | 'EN_MANTENIMIENTO' | 'DESINFECCION';

export interface SanitaryModelSpec {
  id: string;
  code: string;
  name: string;
  category: SanitaryCategory;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  specs: {
    tankCapacityLiters: number;
    dimensions: string;
    hasInternalSink: boolean;
    flushType: 'GRAVEDAD' | 'BOMBA_PIE' | 'RECIRCULACION';
    weightKg: number;
  };
}

export type RoomStatus = 'DISPONIBLE' | 'OCUPADA' | 'LIMPIEZA_PENDIENTE' | 'MANTENIMIENTO' | 'RESERVADA';

export interface HotelRoom {
  id: string;
  roomNumber: string;
  floor: number;
  type: 'SIMPLE_EJECUTIVA' | 'MATRIMONIAL' | 'DOBLE_CORPORATIVA' | 'SUITE_NELLY';
  priceNight: number;
  corporatePriceNight: number;
  status: RoomStatus;
  currentGuest?: string;
}
```

---

## 4. Arquitectura de Contenedores (Dockerización Completa)

Para garantizar que puedas levantar todo el sistema en cualquier servidor VPS (AWS EC2, DigitalOcean, Hetzner o servidor local de la empresa) con un solo comando (`docker compose up -d --build`), implementamos una arquitectura Docker Multi-Stage.

### 4.1. Configuración en `next.config.ts`
Habilitamos el modo `standalone` de Next.js para que la imagen final de producción pese menos de 150MB y no requiera instalar `node_modules` completos en el contenedor de ejecución:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
```

### 4.2. `Dockerfile` (Multi-Stage para Next.js + TypeScript + Prisma)

```dockerfile
# ==========================================
# ETAPA 1: Dependencias (deps)
# ==========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

# ==========================================
# ETAPA 2: Compilación TypeScript y Next.js (builder)
# ==========================================
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generar cliente tipado de Prisma y compilar aplicación Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate
RUN npm run build

# ==========================================
# ETAPA 3: Imagen de Producción Ultraligera (runner)
# ==========================================
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### 4.3. `docker-compose.yml` (Orquestación de Servicios con Healthchecks)

```yaml
version: '3.9'

services:
  # 1. Base de Datos Relacional Unificada (Core + Sanitarios + Hotel)
  postgres_db:
    image: postgres:16-alpine
    container_name: nelly_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${DB_USER:-nelly_admin}
      POSTGRES_PASSWORD: ${DB_PASSWORD:-NellySecret2026!}
      POSTGRES_DB: ${DB_NAME:-inversiones_nelly_db}
      TZ: 'America/Lima'
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - nelly_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-nelly_admin} -d ${DB_NAME:-inversiones_nelly_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 2. Caché en Memoria y Bloqueo Temporal de Disponibilidad (Evita Overbooking)
  redis_cache:
    image: redis:7-alpine
    container_name: nelly_redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD:-NellyRedis2026!}
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - nelly_network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD:-NellyRedis2026!}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # 3. Servicio Efímero de Migración Automática de Esquema (Prisma Migrate)
  db_migrator:
    build:
      context: .
      target: builder
    container_name: nelly_migrator
    environment:
      DATABASE_URL: postgresql://${DB_USER:-nelly_admin}:${DB_PASSWORD:-NellySecret2026!}@postgres_db:5432/${DB_NAME:-inversiones_nelly_db}?schema=public
    depends_on:
      postgres_db:
        condition: service_healthy
    command: >
      sh -c "npx prisma migrate deploy && npx prisma db seed"
    networks:
      - nelly_network

  # 4. Aplicación Principal Next.js (Landing Multi-Rubro + ERP Admin)
  web_app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nelly_nextjs_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER:-nelly_admin}:${DB_PASSWORD:-NellySecret2026!}@postgres_db:5432/${DB_NAME:-inversiones_nelly_db}?schema=public
      REDIS_URL: redis://:${REDIS_PASSWORD:-NellyRedis2026!}@redis_cache:6379
      NEXT_PUBLIC_COMPANY_NAME: "Inversiones Nelly S.A.C."
      NEXT_PUBLIC_RUC: "20600000001"
      TZ: 'America/Lima'
    depends_on:
      postgres_db:
        condition: service_healthy
      redis_cache:
        condition: service_healthy
      db_migrator:
        condition: service_completed_successfully
    networks:
      - nelly_network

volumes:
  postgres_data:
  redis_data:

networks:
  nelly_network:
    driver: bridge
```

---

## 5. Modelo de Base de Datos Relacional (PostgreSQL)

El diseño de la base de datos mantiene las tablas organizadas en **3 dominios lógicos** (`core`, `sanitarios`, `hotel`), permitiendo que una misma empresa cliente reciba facturación integrada.

### 5.1. Tablas Principales (`core`, `sanitarios`, `hotel`)

```sql
-- 1. Directorio Único de Clientes (Personas Naturales y Empresas B2B)
CREATE TABLE core_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_type VARCHAR(10) NOT NULL CHECK (doc_type IN ('DNI', 'RUC', 'CE', 'PASAPORTE')),
    doc_number VARCHAR(20) UNIQUE NOT NULL,
    business_name VARCHAR(200) NOT NULL,
    email VARCHAR(120),
    phone VARCHAR(30) NOT NULL,
    fiscal_address TEXT,
    customer_segment VARCHAR(20) DEFAULT 'AMBOS' CHECK (customer_segment IN ('SANITARIOS', 'HOTEL', 'AMBOS')),
    credit_limit DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Catálogo de Modelos de Sanitarios Portátiles (Inspirado en Ancro)
CREATE TABLE san_catalog_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(30) NOT NULL CHECK (category IN ('OBRA_MINERIA', 'EVENTOS_VIP', 'DISCAPACITADOS', 'LAVAMANOS', 'DUCHAS')),
    daily_rate DECIMAL(10,2) NOT NULL,
    weekly_rate DECIMAL(10,2) NOT NULL,
    monthly_rate DECIMAL(10,2) NOT NULL,
    specs JSONB NOT NULL
);

-- 3. Contratos de Alquiler y Rutas de Succión / Limpieza
CREATE TABLE san_rental_contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_code VARCHAR(25) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES core_customers(id),
    project_name VARCHAR(150),
    delivery_address TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    units_count INT NOT NULL,
    cleaning_frequency VARCHAR(30) NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'COTIZACION' CHECK (status IN ('COTIZACION', 'APROBADO', 'EN_EJECUCION', 'FINALIZADO')),
    total_amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Habitaciones Físicas del Hotel y Motor de Reservas
CREATE TABLE hot_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_number VARCHAR(10) UNIQUE NOT NULL,
    floor INT NOT NULL,
    room_type VARCHAR(40) NOT NULL,
    base_price_night DECIMAL(10,2) NOT NULL,
    corporate_price_night DECIMAL(10,2) NOT NULL,
    status VARCHAR(25) NOT NULL DEFAULT 'DISPONIBLE' CHECK (status IN ('DISPONIBLE', 'OCUPADA', 'LIMPIEZA_PENDIENTE', 'MANTENIMIENTO', 'RESERVADA'))
);

CREATE TABLE hot_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code VARCHAR(25) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES core_customers(id),
    room_id UUID NOT NULL REFERENCES hot_rooms(id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    guests_count INT NOT NULL DEFAULT 1,
    status VARCHAR(25) NOT NULL DEFAULT 'CONFIRMADA' CHECK (status IN ('PENDIENTE_PAGO', 'CONFIRMADA', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELADA')),
    total_amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 6. Prompt Maestro de Ejecución (Next.js + TypeScript + Docker Ready)

Copia y pega el siguiente prompt cuando quieras generar el prototipo funcional completo e interactivo en código:

```text
Actúa como Principal Full Stack Architect (especialista en Next.js App Router, React, TypeScript y Docker) y Senior UI/UX Designer. Construye en UN SOLO ARCHIVO React/TypeScript (`.tsx`) la aplicación completa e interactiva de "Inversiones Nelly S.A.C.", simulando el enrutamiento del App Router de Next.js (`(marketing)` para el Landing Page subdividido y `(erp)` para el Sistema Administrativo Unificado), e incluye una vista técnica con los archivos `Dockerfile` y `docker-compose.yml` listos para copiar.

1. SISTEMA DE DISEÑO Y PALETA DE COLORES (BASADO EN EL LOGO DE INVERSIONES NELLY S.A.C.):
- Verde Ecológico Primario (`#6CBE1A`, oscuro `#2E5A07`): Identidad principal y División de Alquiler de Sanitarios Portátiles.
- Dorado Tierra / Arena (`#C8A064`, claro `#F5EBE0`): Identidad de la División Hotelera y Hospitalidad.
- Azul Agua Higiene (`#00A8E8`): Acentos de limpieza por succión hidrostática, lavamanos y certificaciones DIGESA.
- Fondo Corporativo (`#0F172A`) y Superficie Clara (`#F8FAFC`).
- Renderiza en el Header el isotipo SVG fiel al logo: aro circular con trazos verdes y azul agua, hojas verdes con gotas de rocío a la izquierda, letra "I" en dorado `#C8A064` y letra "N" en verde `#6CBE1A` con una hoja superior derecha.

2. ARQUITECTURA REFORMULADA DEL LANDING PAGE Y SISTEMA ERP (CONMUTADOR DE RUTAS NEXT.JS):
Implementa un Mega-Menú superior con simulación de rutas de Next.js:
- RUTA `/` (Hub Corporativo General - Grupo Inversiones Nelly S.A.C.):
  * Hero Split-Screen 50/50 interactivo que permite elegir entre "División Eco-Sanitarios Portátiles (Obras/Eventos)" y "División Hotel & Estadías Ejecutivas".
  * Bloque estratégico B2B: "Convenio Integral Constructora (Sanitarios en Obra + Alojamiento de Ingenieros en Hotel con Facturación Única SUNAT)".
- RUTA `/sanitarios-portatiles` (Embudo B2B inspirado en https://www.ancro.com.pe/sanitarios-portatiles-para-obras/):
  * Hero con Formulario Sticky de Cotización Rápida por RUC/DNI (autocompletado simulado SUNAT, ubicación de obra, cantidad de baños, meses/días).
  * Selector de Sectores (Construcción Civil, Minería, Eventos Masivos, Agroindustria).
  * Catálogo Técnico con filtros y specs detalladas: 1) Sanitario Estándar de Obra (Tanque 210L), 2) Sanitario Ejecutivo VIP con Lavamanos y Bomba de Pie, 3) Sanitario para Discapacitados (Accesible), 4) Lavamanos Portátil Doble Autónomo, 5) Ducha Portátil.
  * "Calculadora Interactiva Norma Técnica G.050": Slider de cantidad de trabajadores en obra que calcula automáticamente cuántos sanitarios portátiles se requieren por ley, frecuencia de succión semanal y presupuesto estimado en Soles (S/), con botón para volcar los datos al formulario de cotización.
  * Ciclo de Servicio en 4 pasos: Entrega en Obra -> Succión con Camión Hidrostático -> Insumos Biodegradables -> Certificado Ambiental DIGESA.
- RUTA `/hotel` (Sub-portal de Reservas Hoteleras):
  * Buscador de disponibilidad (Check-in, Check-out, Huéspedes, Tarifa Estándar vs Tarifa Convenio Corporativo).
  * Catálogo de Habitaciones (Simple Ejecutiva, Matrimonial Superior, Doble/Triple Contratistas, Suite Nelly) con precios en Soles (S/) y modal de Reserva Instantánea.
- RUTA `/admin/dashboard` (ERP Administrativo Unificado para ambos rubros):
  * KPIs en tiempo real (Ingresos Totales en S/, Flota de Baños Alquilados vs Disponibles, % Ocupación Hotelera, Rutas de Succión Programadas Hoy).
  * Módulo 1: "Flota de Sanitarios y Rutas de Succión" (Tabla de contratos en obras, unidades por serie `IN-BP-001` y botón interactivo para registrar limpieza/succión completada).
  * Módulo 2: "Rack Visual de Habitaciones del Hotel" (Cuadrícula interactiva de pisos 101-304 que cambia estados: Disponible, Ocupada, Limpieza Pendiente, Mantenimiento).
  * Módulo 3: "Directorio Único de Clientes (RUC/DNI) y Facturación Electrónica SUNAT".
  * Módulo 4: "Infraestructura Docker & Next.js" (Visor de código integrado para copiar el `Dockerfile`, `docker-compose.yml` y `schema.prisma`).

3. FLUJO REACTIVO COMPLETO EN TYPESCRIPT:
- Toda cotización enviada desde `/sanitarios-portatiles` o reserva creada en `/hotel` debe actualizar inmediatamente el estado global tipado en TypeScript, disparar una notificación Toast y reflejarse al instante en las tablas y KPIs de `/admin/dashboard`.
```