# ====================================================================
# INVERSIONES NELLY S.A.C. - MAKEFILE DE AUTOMATIZACIÓN DEVOPS
# ====================================================================

.PHONY: help dev build start lint test test-coverage db-migrate db-seed docker-dev docker-prod docker-down clean

help:
	@echo "Comandos disponibles para Inversiones Nelly S.A.C.:"
	@echo "  make dev          - Inicia el servidor de desarrollo local de Next.js"
	@echo "  make build        - Compila la aplicación para producción"
	@echo "  make start        - Inicia el servidor compilado de producción"
	@echo "  make lint         - Ejecuta el linter ESLint y comprobación de tipos"
	@echo "  make test         - Corre la suite de tests unitarios (Vitest)"
	@echo "  make test-coverage- Corre los tests y genera reporte de cobertura"
	@echo "  make db-migrate   - Ejecuta las migraciones de Prisma"
	@echo "  make db-seed      - Puebla la base de datos con catálogo y habitaciones"
	@echo "  make docker-dev   - Levanta el stack completo de desarrollo en Docker"
	@echo "  make docker-prod  - Levanta el stack de producción (Postgres, Redis, App, Nginx)"
	@echo "  make docker-down  - Detiene y elimina todos los contenedores Docker"
	@echo "  make clean        - Limpia node_modules, .next y artefactos generados"

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint
	npm run type-check

test:
	npm run test

test-coverage:
	npm run test:coverage

db-migrate:
	npx prisma migrate dev

db-seed:
	npx tsx prisma/seed.ts

docker-dev:
	docker compose -f docker-compose.dev.yml up -d --build

docker-prod:
	docker compose up -d --build

docker-down:
	docker compose down -v

clean:
	rm -rf .next out dist coverage node_modules
