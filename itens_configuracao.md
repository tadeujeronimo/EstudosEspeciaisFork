# Item de Configuração: Backend - Código-fonte (Lógica da API)
- **ID**: IC-001
- **Tipo**: Código-fonte
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Baseline MVP estabelecida. Contempla arquivos da lógica de Backend (`app.js`, `server.js`, `prismaClient.js` e diretório `/src`).
- **Data Release**: 08/04/2026

---

# Item de Configuração: Frontend - Código-fonte (Interface de Usuário)
- **ID**: IC-002
- **Tipo**: Código-fonte
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Baseline MVP estabelecida. Contempla o código-fonte React (`/src` e componentes estáticos em `/public`).
- **Data Release**: 08/04/2026

---

# Item de Configuração: Modelo de Dados (Prisma Schema e Migrações)
- **ID**: IC-003
- **Tipo**: Banco de Dados/Configuração O.R.M
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Esquema unificado inicializado no subdiretório `back/prisma/`, consolidando as hierarquias de dados finais deste MVP.
- **Data Release**: 08/04/2026

---

# Item de Configuração: Configuração de Dependências Backend
- **ID**: IC-004
- **Tipo**: Configuração de Software
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Registro imutável de versão (via `package-lock.json` e `package.json`) das libs utilizadas no Backend (ex: Express, Prisma).
- **Data Release**: 08/04/2026

---

# Item de Configuração: Configuração de Dependências Frontend
- **ID**: IC-005
- **Tipo**: Configuração de Software
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Registro imutável de versão (via `package-lock.json` e `package.json`) das libs utilizadas no Frontend (ex: React dom, Router, Web Vitals).
- **Data Release**: 08/04/2026

---

# Item de Configuração: Template de Variáveis de Ambiente
- **ID**: IC-006
- **Tipo**: Parâmetro de Ambiente
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Mapeamento de chaves vitais criadas (`DATABASE_URL`, `API_KEY`, `JWT_SECRET`) estabelecidas em `.env.example`.
- **Data Release**: 08/04/2026

---

# Item de Configuração: Regras de Versionamento (Gitignore)
- **ID**: IC-007
- **Tipo**: Configuração de Infraestrutura
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Definição da listagem de exclusão em todas as camadas (`node_modules`, pastas de log e env) blindando o repositório.
- **Data Release**: 08/04/2026

---

# Item de Configuração: Documentação Central
- **ID**: IC-008
- **Tipo**: Documento
- **Versão**: 1.0.0
- **Repositório**: https://github.com/Lanna-Maria/EstudosEspeciais
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Estruturação de `README.md` descrevendo o estado inicial de navegação e operação local.
- **Data Release**: 08/04/2026
