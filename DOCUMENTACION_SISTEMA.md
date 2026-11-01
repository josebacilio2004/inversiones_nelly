# Documentación Técnica del Sistema Empresarial Unificado
## Inversiones Nelly S.A.C. (RUC 20608945123)

---

### 1. Resumen Ejecutivo & Misión de la Plataforma

**Inversiones Nelly S.A.C.** es un consorcio empresarial peruano con más de 12 años de trayectoria, líder en la provisión de dos líneas de negocio sinérgicas de alto impacto para los sectores de Construcción Civil, Minería, Agroindustria e Infraestructura Vial:

1. **División Eco-Sanitarios Portátiles:** Suministro, despliegue logístico y mantenimiento preventivo por succión hidrostática de cabinas químicas de alto tránsito bajo la **Norma Técnica Peruana G.050**, con certificación ambiental expedida por la **Dirección General de Salud Ambiental (DIGESA)** bajo la Autorización Sanitaria Nº DIG-2024-EP.
2. **División Hotel & Hospedaje Ejecutivo:** Servicio de hospitalidad corporativa para ingenieros residentes, supervisores de obra y cuadrillas de contratistas, con cochera cerrada para camionetas 4x4, desayuno temprano de campo desde las **05:30 AM** y facturación mensual unificada con crédito a 15/30 días.

El presente sistema web unifica ambos frentes bajo una arquitectura moderna en **Next.js 15 (App Router)**, **TypeScript**, **Zustand**, **Tailwind CSS**, **Framer Motion** y telemetría geoespacial en vivo mediante **Mapbox GL**.

---

### 2. Arquitectura de Software y Stack Tecnológico

```
inversiones-nelly-platform/
├── src/
│   ├── app/
│   │   ├── (marketing)/                # Sub-portal público B2B
│   │   │   ├── page.tsx                # Hub Corporativo Maestro (Split 50/50)
│   │   │   ├── sanitarios-portatiles/  # Embudo de sanitarios, mapa y calculadora G.050
│   │   │   ├── hotel/                  # Portal de hospitalidad, buscador y CAD plan
│   │   │   ├── convenio-constructora/  # Convenio B2B de facturación única
│   │   │   ├── terminos-y-condiciones/ # Marco legal, G.050, DIGESA y reclamaciones
│   │   │   └── layout.tsx              # Header y Footer de marketing
│   │   ├── (erp)/                      # Sistema Administrativo ERP
│   │   │   └── admin/dashboard/        # KPIs en vivo, Rack, Succión, SUNAT, Docker
│   │   ├── layout.tsx                  # RootLayout, Toasts, WhatsApp Widget, Mapbox CSS
│   │   └── globals.css                 # Configuración Tailwind y Mapbox styles
│   ├── components/
│   │   ├── brand/                      # Isotipo SVG fiel al logo de Inversiones Nelly
│   │   ├── layout/                     # MarketingHeader (con selector ES/EN y drawer) y Footer
│   │   ├── marketing/                  # Componentes de diseño (Mapbox, Blueprint, Catalog)
│   │   └── ui/                         # Toast, Modal, Icons, WhatsAppButton
│   ├── store/                          # Zustand store con estado global reactivo
│   ├── types/                          # Contratos TypeScript estrictos
│   └── lib/                            # i18n diccionarios y utilitarios
├── docs/                               # Despliegue estático para GitHub Pages
├── tests/unit/                         # Suite de pruebas unitarias (G.050 y SUNAT)
├── Dockerfile                          # Build multi-stage optimizado para producción
├── docker-compose.yml                  # Orquestación con PostgreSQL y Redis
└── DOCUMENTACION_SISTEMA.md            # Este documento
```

#### Tecnologías Principales:
* **Framework:** Next.js 15.0.0 (App Router con Server & Client Components).
* **Librería UI:** React 19.0.0 y TypeScript 5.6.3 en modo estricto.
* **Estilizado & Diseño:** Tailwind CSS 3.4.14 con paleta corporativa oficial.
* **Animaciones:** Framer Motion 14.9.0.
* **Gestión de Estado:** Zustand 5.0.1 con sincronización reactiva en tiempo real.
* **Geolocalización & Telemetría:** Mapbox GL con API Token oficial y marcadores dinámicos.
* **Pruebas Automatizadas:** Node Test Runner nativo con strip-types (`tests/unit/`).

---

### 3. Sistema de Diseño y Paleta de Colores

Basado rigurosamente en la identidad visual y el logotipo oficial de **Inversiones Nelly S.A.C.**:

* **Verde Ecológico Primario (`#6CBE1A`, oscuro `#2E5A07`):** Representa la división de Saneamiento Ambiental, sostenibilidad, insumos biodegradables y aprobación DIGESA.
* **Dorado Arena / Tierra (`#C8A064`, claro `#F5EBE0`):** Identidad de la división de Hospitalidad y Hotel Ejecutivo.
* **Azul Agua Higiene (`#00A8E8`):** Acentos de hidro-lavado a presión, cisternas al vacío y telemetría de rutas.
* **Fondo Corporativo Dark (`#0F172A`, `#0B1322`) & Superficie Clara (`#F8FAFC`).**

---

### 4. Módulos y Funcionalidades Clave

#### 4.1. Hub Corporativo General (`/`)
* **Hero Split-Screen Interactivo:** Permite elegir de manera fluida entre la *División Eco-Sanitarios Portátiles* y la *División Hotel & Hospedaje Ejecutivo*.
* **Background de Edificios Corporativos:** Configurado con opacidad balanceada (`opacity-50`) para mostrar la envergadura de las obras civiles y la infraestructura hotelera manteniendo un contraste óptimo de texto.
* **Tarjeta de Hotel Ejecutivo:** Incorpora una fotografía real de habitación hotelera ejecutiva (eliminando cualquier captura de maquetas anteriores).
* **Bloque Estratégico B2B:** Explicación del Convenio Integral Constructora (baños en obra + alojamiento de cuadrillas con factura única SUNAT).

#### 4.2. Portal de Eco-Sanitarios Portátiles (`/sanitarios-portatiles`)
* **Catálogo Técnico con Pasarela Fotográfica:**
  Cada uno de los 4 modelos de sanitarios incluye una galería de más de 3 fotografías reales (frente de obra, interior de la cabina y accesorios higiénicos):
  1. *IN-SAN-01:* Sanitario Estándar de Obra (Tanque 210L con trampilla hermética).
  2. *IN-SAN-02:* Sanitario Ejecutivo VIP (Lavamanos y bomba de pie manos libres).
  3. *IN-SAN-03:* Sanitario Accesible Universal (Rampa nivel cero, Ley Nº 29973).
  4. *IN-SAN-04:* Sanitario Autónomo de Alta Rotación (Panel solar LED, tanque 250L).
* **Frame de Inspección Interactiva 360°:**
  Modal técnico que permite rotar virtualmente la cabina de 0° a 360° mediante un control deslizante (slider) con proyección CAD, inspeccionar la pasarela fotográfica HD y revisar la ficha técnica constructiva.
* **Calculadora Interactiva Norma Técnica G.050:**
  Slider dinámico de cantidad de trabajadores en obra que calcula por ley cuántos baños portátiles se requieren, la frecuencia de succión recomendada y el presupuesto estimado en Soles (S/), permitiendo volcar los datos directamente al formulario de cotización.
* **Formulario Sticky de Cotización Rápida:**
  Autocompletado simulado de razón social vía RUC/DNI SUNAT, selección de frentes de obra y solicitud instantánea.

#### 4.3. Centro de Telemetría Mapbox GL & Cobertura Nacional
* **Integración Mapbox GL:**
  Configurado vía variable de entorno `NEXT_PUBLIC_MAPBOX_TOKEN` (almacenada en `.env.local` y configurable en el despliegue de producción).
* **Nodos de Operación en el Perú:**
  1. *Lima Metropolitana:* Metro Línea 2 & Cosapi (450 cabinas).
  2. *Chosica:* Carretera Central Km 42 / Consorcio Vial del Norte (38 cabinas).
  3. *Lurín:* Megaparque Industrial / Constructora Cosapi (85 cabinas).
  4. *Ica:* Subtanjalla & Villacurí / Agroexportadora del Sur (120 cabinas).
  5. *Junín:* Minera Chinalco Toromocho a 4,500 msnm (75 cabinas térmicas).
  6. *Trujillo:* Proyecto Chavimochic (90 cabinas).
  7. *Arequipa:* Cerro Verde / Yarabamba (60 cabinas VIP).
  8. *Moquegua:* Mina Quellaveco / Anglo American (50 cabinas accesibles).
  9. *Piura:* Refinería Talara (70 cabinas estándar).
* **Conmutador de Vistas:** Permite alternar entre la vista satelital/dark Mapbox GL y la vista táctica vectorial SVG con arcos Bézier.
* **HUD de Telemetría en Vivo:** Muestra el camión de succión asignado, chofer con brevete especial A-IIIc, código de contrato y botón para descargar el manifiesto oficial DIGESA.

#### 4.4. Portal Hotel Nelly Ejecutivo (`/hotel`)
* **System Design "Rent H&U":** Barra de búsqueda flotante tipo cápsula con selectores de Ubicación/Proyecto, Tipología de habitación y Tarifa B2B (-25%).
* **Sección "Most Viewed":** Tarjetas arquitectónicas de habitaciones reales (*Simple Ejecutiva*, *Matrimonial Superior*, *Doble Contratistas*).
* **System Design "Glasshaven":** Bloques de servicio numerados `01 Cochera 4x4`, `02 Desayuno 5:30 AM`, `03 Wi-Fi Fibra 200Mbps`, `04 Facturación SUNAT 30 Días`.
* **Componente Nativo "House & Room Plan":** Plano arquitectónico 2D vectorial en SVG con desglose técnico de metros cuadrados (m²) por ambiente, cotas 1:50 y camas ortopédicas.
* **Rack Visual y Reserva Instantánea:** Modal de reserva que bloquea habitaciones y genera comprobantes de pago.

#### 4.5. Sistema de Soporte y Canales Directos
* **Botón Flotante de WhatsApp:**
  Ubicado en la esquina inferior derecha con enlace directo a:
  `https://wa.me/51998675270?text=...` (Número: **+51 998 675 270**).
  Incluye tooltip interactivo y animación de presencia en línea 24/7.
* **Selector de Idioma Bilingüe (Español 🇵🇪 / Inglés 🇺🇸):**
  Ubicado en el header superior y en el menú móvil para permitir la navegación de auditorías internacionales o consorcios extranjeros.
* **Términos y Condiciones (`/terminos-y-condiciones`):**
  Desglose legal detallado de la Norma G.050, D.L. 1278, DIGESA y SUNAT.
* **Libro de Reclamaciones Virtual:**
  Modal interactivo conforme al D.S. 011-2011-PCM que emite un código de seguimiento de reclamación formal.

---

### 5. Guía de Ejecución y Despliegue

#### 5.1. Entorno de Desarrollo Local
```bash
# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo en http://localhost:3000
npm run dev

# Ejecutar suite de pruebas unitarias
npm test

# Verificación de tipos TypeScript
npm run type-check
```

#### 5.2. Despliegue en Docker
```bash
# Compilar imagen Docker multi-stage
npm run docker:build

# Levantar contenedores en producción con PostgreSQL y Redis
npm run docker:up
```

#### 5.3. Despliegue Estático en GitHub Pages (`/docs`)
El repositorio oficial está configurado en:
`https://github.com/josebacilio2004/inversiones_nelly.git`

La carpeta `/docs` contiene la versión cliente autocontenida para servirse directamente desde la rama `master` en GitHub Pages activando la opción:
**Settings > Pages > Source: Deploy from a branch > Branch: master > Folder: /docs**.
