# Documentação do Processo de CI/CD

- **Projeto:** CG - Cafeteria Gourmet
- **Versão:** 1.0.0
- **Data de Criação:** 09/06/2026
- **Última Atualização:** 09/06/2026

---

## Histórico de Revisões

| Data | Versão | Descrição | Responsável(eis) |
|---|---|---|---|
| 09/06/2026 | 1.0.0 | Elaboração inicial do documento de CI/CD | Alanna Paiva, Lanna Mesquita, Tadeu Jerônimo, Ynã Ponte |

---

## 1. Objetivo

Este documento descreve o processo de Integração Contínua (CI) e Entrega Contínua (CD) adotado no projeto, visando automatizar a validação, construção e implantação da aplicação, garantindo maior qualidade e confiabilidade nas entregas.

---

## 2. Ferramentas Utilizadas

| Ferramenta | Finalidade |
|---|---|
| GitHub | Versionamento do código |
| GitHub Pull Requests | Revisão de código |
| Git | Controle de versão |
| Node.js | Ambiente de execução |
| npm | Gerenciamento de dependências |
| Vercel | Hospedagem e deploy |

---

## 3. Fluxo do Pipeline CI/CD

O pipeline é executado automaticamente para pushes na branch principal e Pull Requests. Utiliza GitHub Actions para testes e Vercel para deploy automático em produção. Frontend e backend são testados e deployados de forma independente.

### 3.1. Etapas do Pipeline

1. **Checkout do Código** — o sistema de CI baixa o código do repositório usando `actions/checkout`. Esse step é executado no início de cada job dos workflows.

2. **Build** — após a atualização da branch principal, a Vercel identifica automaticamente as alterações. As dependências são instaladas com `npm install` ou `npm ci` e a aplicação é compilada automaticamente.

3. **Testes** — o pipeline executa os testes do frontend e do backend. Se algum teste falhar, o deploy não continua. Os workflows de deploy dependem da aprovação dessa etapa antes da publicação.

4. **Deploy** — concluído o processo de build, a Vercel realiza a publicação automática da nova versão da aplicação, disponibilizando-a em produção sem necessidade de intervenção manual.

---

## 4. Configuração do Ambiente

### 4.1. Pré-requisitos

- Git instalado;
- Ambiente de execução Node.js configurado;
- Conta GitHub;
- Conta Vercel;
- Repositório conectado à Vercel.

### 4.2. Arquivos de Pipeline

#### `ci.yml`

```yaml
name: CI
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test-frontend:
    name: Test Frontend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: front
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: front/package-lock.json
      - name: Install dependencies
        run: npm install
      - name: Ensure router dependency is available
        run: npm ls react-router-dom || npm install react-router-dom@^6.30.3 --no-save
      - name: Run tests
        run: npm test -- --watchAll=false --passWithNoTests

  test-backend:
    name: Test Backend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: back
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: back/package-lock.json
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test -- --passWithNoTests
```

#### `deploy-back.yml`

```yaml
name: Deploy Backend
on:
  push:
    branches:
      - main

concurrency:
  group: deploy-backend
  cancel-in-progress: false

jobs:
  test:
    name: Test Backend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: back
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: back/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test -- --passWithNoTests

  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: back/package-lock.json
      - name: Deploy to Vercel (action)
        uses: amondnet/vercel-action@v42
        id: vercel_deploy
        with:
          github-token: ${{ github.token }}
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_BACK }}
          vercel-build: true
          vercel-args: --prod
          github-deployment: true
```

#### `deploy-front.yml`

```yaml
name: Deploy Frontend
on:
  push:
    branches:
      - main

concurrency:
  group: deploy-frontend
  cancel-in-progress: false

jobs:
  test:
    name: Test Frontend
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: front
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: front/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Ensure router dependency is available
        run: npm ls react-router-dom || npm install react-router-dom@^6.30.3 --no-save
      - name: Run tests
        run: npm test -- --watchAll=false --passWithNoTests

  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: front/package-lock.json
      - name: Deploy to Vercel (action)
        uses: amondnet/vercel-action@v42
        id: vercel_deploy_front
        with:
          github-token: ${{ github.token }}
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID_FRONT }}
          vercel-build: true
          vercel-args: --prod
          github-deployment: true
```

---

## 5. Responsabilidades

- Garantir que as alterações enviadas ao repositório não comprometam o funcionamento da aplicação;
- Revisar e aprovar os Pull Requests antes do merge para a branch principal;
- Monitorar o resultado dos builds e deploys executados automaticamente pela Vercel;
- Corrigir falhas identificadas durante o processo de build ou implantação;
- Comunicar a equipe sobre problemas que impeçam a publicação de novas versões.

---

## 6. Tratamento de Falhas

Em caso de falha durante o processo de CI/CD:

1. Verificar os logs disponibilizados pela Vercel para identificar a origem do problema;
2. Analisar possíveis erros relacionados às dependências do projeto;
3. Corrigir falhas de compilação ou outros problemas identificados no código;
4. Realizar um novo commit com as correções necessárias;
5. Enviar as alterações para o repositório;
6. Executar um novo deploy.