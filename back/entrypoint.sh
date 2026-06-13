#!/bin/sh
# ─── Backend Entrypoint ───────────────────────────────────────────────────────
# Executado pelo docker-compose antes de iniciar o servidor Node.
# Garante que o banco está migrado e com dados iniciais (seed).
# ──────────────────────────────────────────────────────────────────────────────

set -e

echo "⏳ Aplicando migrations do Prisma..."
npx prisma migrate deploy

echo "🌱 Verificando seed do banco de dados..."
# Roda o seed — o próprio Prisma ignora duplicatas caso o admin já exista
# (upsert ou try/catch no seed.js protege contra erro de unique constraint)
node prisma/seed.js || echo "⚠️  Seed ignorado (dados já existem)"

echo "🚀 Iniciando servidor..."
exec node server.js
