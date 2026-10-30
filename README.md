# Inversiones Nelly S.A.C. - Plataforma Empresarial Unificada

[![CI Pipeline](https://github.com/inversiones-nelly/platform/actions/workflows/ci.yml/badge.svg)](https://github.com/inversiones-nelly/platform/actions/workflows/ci.yml)
[![Docker Security Scan](https://github.com/inversiones-nelly/platform/actions/workflows/security-scan.yml/badge.svg)](https://github.com/inversiones-nelly/platform/actions/workflows/security-scan.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)

Plataforma full-stack de grado enterprise desarrollada para **Inversiones Nelly S.A.C.** (RUC: `20608945123`), que unifica en una sola arquitectura digital de alto rendimiento:
1. **División Eco-Sanitarios Portátiles:** Alquiler, logística de entrega y servicio de succión hidrostática con cisterna bajo la **Norma Técnica G.050** y certificaciones DIGESA (estilo *Ancro Perú*).
2. **División Hotelera & Hospitalidad:** Reserva y asignación de habitaciones ejecutivas y para contratistas, con cochera techada para flotas 4x4 y facturación unificada.
3. **ERP Administrativo Unificado:** Rack interactivo de habitaciones, asignación de números de serie (`IN-BP-XXX`), emisión de manifiestos ambientales DIGESA y facturación electrónica SUNAT.

---

## 🏛️ 1. Arquitectura Modular y Estructura del Proyecto

El proyecto sigue las mejores prácticas de **Next.js 15 App Router** con **Route Groups** para desacoplar el portal de marketing del ERP privado:

```text
inversiones-nelly-platform/
├── .github/workflows/          # Pipelines de CI/CD y escáner de seguridad Trivy
├── docker/
│   ├── nginx/nginx.conf        # Reverse proxy, SSL, Gzip, cabeceras OWASP y rate-limiting
│   └── postgres/init.sql       # Extensiones UUID, trigram y zona horaria America/Lima
├── prisma/
│   ├── schema.prisma           # Esquema relacional PostgreSQL (Clientes, Contratos, Habitaciones, Facturas)
│   └── seed.ts                 # Población inicial idempotente del catálogo y habitaciones
├── src/
│   ├── app/
│   │   ├── (marketing)/        # Sub-portal público de conversión y cotizaciones
│   │   │   ├── page.tsx        # Hub General con Hero Split-Screen 50/50
│   │   │   ├── sanitarios-portatiles/page.tsx # Embudo B2B (Ancro) + Calculadora G.050
│   │   │   ├── hotel/page.tsx  # Motor de reservas y tarifas corporativas
│   │   │   └── convenio-constructora/page.tsx # Sinergia B2B mixta
│   │   ├── (erp)/              # Sub-portal administrativo privado
│   │   │   └── admin/
│   │   │       ├── dashboard/  # KPIs en tiempo real de ambos rubros
│   │   │       ├── sanitarios/ # Flota de baños y registro de succión hidrostática
│   │   │       ├── hotel/      # Rack visual de habitaciones pisos 1 al 3
│   │   │       ├── facturacion/# Comprobantes electrónicos SUNAT (Facturas F001 / Boletas B001)
│   │   │       └── devops/     # Monitoreo de contenedores y visor de infraestructura
│   │   ├── api/                # Route Handlers REST (Health, SUNAT, Cotizaciones, Reservas)
│   │   ├── globals.css         # Tokens de diseño Tailwind
│   │   └── layout.tsx          # Root Layout con ToastContainer
│   ├── components/
│   │   ├── brand/NellyLogo.tsx # Isotipo SVG oficial fiel al logo de la empresa
│   │   ├── layout/             # Header sticky, Footer y Sidebar ERP
│   │   ├── marketing/          # Calculadora G.050, Sticky Form, Catálogo
│   │   ├── erp/                # Rack Grid, Tablas de Succión y KPIs
│   │   └── ui/                 # Modales, Toasts, Iconos SVG optimizados
│   ├── lib/
│   │   ├── env.ts              # Validación estricta de variables de entorno con Zod
│   │   ├── g050.ts             # Motor de cálculo de la Norma Técnica Peruana G.050
│   │   ├── sunat.ts            # Validador de RUC peruano (Módulo 11) y consulta al padrón
│   │   ├── prisma.ts           # Cliente singleton de PostgreSQL
│   │   └── redis.ts            # Cliente singleton de Redis con degradación elegante
│   ├── store/
│   │   └── useAppStore.ts      # Estado reactivo global en Zustand
│   └── types/                  # Interfaces y tipos de dominio
├── tests/unit/                 # Pruebas unitarias de lógica de negocio (Vitest)
├── Dockerfile                  # Compilación Multi-Stage con Next.js Standalone (<150MB)
├── Dockerfile.dev              # Contenedor con Hot Reload para desarrollo
├── docker-compose.yml          # Orquestación de producción (Postgres, Redis, App, Nginx)
├── docker-compose.dev.yml      # Orquestación de desarrollo local
├── Makefile                    # Comandos CLI para desarrolladores
└── package.json
```

---

## 🎨 2. Sistema de Diseño y Paleta Oficial

Basado en el isotipo corporativo de **Inversiones Nelly S.A.C.**:
- **Verde Ecológico Primario (`#6CBE1A`, oscuro `#2E5A07`):** Letra "N", hojas orgánicas y división de Eco-Sanitarios Portátiles. Transmite desinfección, bioseguridad y cumplimiento ambiental DIGESA.
- **Dorado Tierra / Arena (`#C8A064`, claro `#F5EBE0`):** Letra "I", tallo y división Hotelera. Transmite calidez, hospitalidad ejecutiva y descanso para contratistas.
- **Azul Agua e Higiene (`#00A8E8`):** Arco interior del isotipo. Utilizado en acentos de succión hidrostática, lavamanos autónomos a pedal y certificaciones.
- **Slate Corporativo (`#0F172A`) y Superficie Clara (`#F8FAFC`):** Garantizan contraste ergonómico y legibilidad moderna.

---

## 🚀 3. Puesta en Marcha Rápida (Quickstart)

### Requisitos Previos:
- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/) v2+ instalados.
- [Node.js](https://nodejs.org/) v20+ (opcional para desarrollo local sin Docker).

### Opción A: Despliegue Completo con Docker (Producción)
Con un solo comando levantarás la base de datos PostgreSQL 16, Redis 7, el servicio de migración y seed, la aplicación Next.js y el proxy Nginx:

```bash
docker compose up -d --build
```

- **Portal Web & ERP:** [http://localhost](http://localhost) (Puerto 80 vía Nginx) o [http://localhost:3000](http://localhost:3000) (Next.js directo).
- **Endpoint de Salud (Healthcheck):** [http://localhost:3000/api/health](http://localhost:3000/api/health)
- **Base de Datos PostgreSQL:** Puerto `5432` (`inversiones_nelly_db`).
- **Redis Cache:** Puerto `6379`.

Para detener todos los servicios:
```bash
docker compose down -v
```

---

### Opción B: Entorno de Desarrollo Local
1. Copia el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Genera el cliente de Prisma:
   ```bash
   npx prisma generate
   ```
4. Ejecuta la aplicación en modo desarrollo con HMR:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧪 4. Testing Automatizado y Calidad de Código

El proyecto incluye tests unitarios para los algoritmos críticos de negocio:

```bash
# Ejecutar suite de pruebas con Vitest
npm test

# Ejecutar con reporte de cobertura de código
npm run test:coverage

# Comprobación estricta de tipos TypeScript
npm run type-check

# Análisis estático con ESLint
npm run lint
```

### Casos de Prueba Cubiertos:
- **`tests/unit/g050.test.ts`:**
  - Validación de la proporción de 1 inodoro cada 20 trabajadores (Norma Técnica G.050).
  - Cálculo de saltos de escala (25 operarios = 2 baños, 45 operarios = 3 baños).
  - Factores de seguridad para campamentos mineros (1.25x) y turnos rotativos.
- **`tests/unit/sunat.test.ts`:**
  - Validación del algoritmo de checksum peruano (Módulo 11) para RUCs de 11 dígitos.
  - Rechazo de números no peruanos o formatos truncados.
  - Autocompletado simulado de razones sociales para empresas constructoras.

---

## 🛡️ 5. Prácticas de Seguridad y DevOps Implementadas

- **Docker Multi-Stage Build:** Genera imágenes mínimas (<150MB) usando la salida `standalone` de Next.js, copiando únicamente lo indispensable y descartando `node_modules` de desarrollo.
- **Principio de Menor Privilegio:** La aplicación se ejecuta bajo un usuario no-root (`nextjs:nodejs` UID 1001) para evitar escalado de privilegios en el host.
- **Cabeceras de Seguridad OWASP:** Nginx y Next.js inyectan automáticamente `Content-Security-Policy`, `Strict-Transport-Security` (HSTS), `X-Frame-Options: SAMEORIGIN`, y `X-Content-Type-Options: nosniff`.
- **Rate Limiting:** Nginx aplica zonas de limitación de tasa (`limit_req_zone`) para prevenir ataques de denegación de servicio (DDoS) o scraping abusivo en los endpoints de cotización y SUNAT.
- **Validación con Zod:** Toda entrada de datos en los formularios y endpoints API (`/api/quotes`, `/api/bookings`) es validada en tiempo de compilación y ejecución.
- **Pipelines CI/CD (GitHub Actions):**
  - `.github/workflows/ci.yml`: Ejecuta linters, validación de tipos, tests unitarios y build en cada Pull Request.
  - `.github/workflows/cd.yml`: Construye y etiqueta imágenes semánticas en GitHub Container Registry.
  - `.github/workflows/security-scan.yml`: Escaneo automatizado de vulnerabilidades en dependencias y sistema operativo con Trivy.

---

## 📞 Soporte & Contacto Corporativo

- **Razón Social:** Inversiones Nelly S.A.C.
- **RUC:** 20608945123
- **Central Telefónica:** (01) 719-8420 / 987-654-321
- **Correo Electrónico:** cotizaciones@inversionesnelly.pe
- **Sede:** Av. Los Próceres 1240, Lima, Perú.
