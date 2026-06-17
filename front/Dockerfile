# ─── Frontend Dockerfile ──────────────────────────────────────────────────────
# Serve o React em modo de desenvolvimento (react-scripts start).
# Para testes locais via Docker — não usar em produção.
# Em produção, o Vercel faz o build e hospeda os assets estáticos.
# ──────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Variável de ambiente passada pelo docker-compose em build-time
# e também em runtime via environment: no compose file
ARG REACT_APP_API_URL=http://localhost:4000
ENV REACT_APP_API_URL=$REACT_APP_API_URL

EXPOSE 3000

# Desabilita verificação de versão do browser para evitar erros no Alpine
ENV BROWSER=none

CMD ["npm", "start"]
