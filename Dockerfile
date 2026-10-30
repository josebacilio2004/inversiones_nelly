# ====================================================================
# INVERSIONES NELLY S.A.C. - DOCKERFILE MULTI-STAGE DE PRODUCCIÓN
# Next.js 15 (App Router) + TypeScript + Prisma ORM + Tailwind CSS
# Arquitectura: Alpine Linux minimal (<150MB en producción)
# ====================================================================

# --------------------------------------------------------------------
# ETAPA 1: Dependencias del Sistema y Paquetes Node (deps)
# --------------------------------------------------------------------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Instalar dependencias con caché optimizada de capas
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm ci

# --------------------------------------------------------------------
# ETAPA 2: Compilación y Build Standalone de Next.js (builder)
# --------------------------------------------------------------------
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivar telemetría de Next.js para builds deterministas
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generación de cliente tipado de Prisma y compilación estática
RUN npx prisma generate
RUN npm run build

# --------------------------------------------------------------------
# ETAPA 3: Imagen Ultraligera de Producción (runner)
# --------------------------------------------------------------------
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl curl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Principio de menor privilegio: Usuario sin privilegios root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar artefactos del build standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

# Healthcheck a nivel de contenedor
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
