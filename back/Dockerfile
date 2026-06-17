# ─── Backend Dockerfile ───────────────────────────────────────────────────────
# Usa Node 20 LTS slim para imagem enxuta.
# O entrypoint executa migrations + seed (se necessário) antes de iniciar.
# ──────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine

# Instala openssl (exigido pelo Prisma no Alpine)
RUN apk add --no-cache openssl

WORKDIR /app

# Copia manifests primeiro para aproveitar cache de layers do Docker
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Gera o Prisma Client para o ambiente Linux/Alpine
RUN npx prisma generate

EXPOSE 4000

# O docker-compose sobrescreve o CMD com o entrypoint.sh
CMD ["node", "server.js"]
