# Lista de Itens de Configuração

## Item de Configuração: Documentação do Projeto

- **ID:** IC-001
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/README.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/README.md)
- **Branch:** main
- **Commit ID:** f1aec80885d2fcbc0bbea7fd6bdff957f49e7962
- **Mudanças:** Estruturação do `README.md` com orientações de configuração e execução do projeto.
- **Data Release:** 13/04/2026

## Item de Configuração: Configuração de Dependências e Build Backend

- **ID:** IC-002
- **Tipo:** Dependências e builds
- **Versão:** 1.0.0
- **Repositório:** [GitHub/back](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Versionamento de bibliotecas, scripts e configuração de build/deploy. Arquivos: `package.json`, `package-lock.json`.
- **Data Release:** 07/04/2026

## Item de Configuração: Aplicação Express

- **ID:** IC-003
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/app.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/app.js)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Configuração de middleware, CORS, JSON e roteamento base /api. Arquivos: `app.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Inicialização do Servidor

- **ID:** IC-004
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/server.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/server.js)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Porta de execução e bootstrap do backend. Arquivos: `server.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Modelo de Dados (Persistência Prisma)

- **ID:** IC-005
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/prisma](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back/prisma)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Definição dos modelos, dados iniciais e acesso ao banco via Prisma. Arquivos: `schema.prisma`, `seed.js`, `prismaClient.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Rotas da API

- **ID:** IC-006
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/routes](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back/src/routes)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Centralização das rotas de cardápio, pedidos, admin e dashboard. Arquivos: `routes/index.js`, `adminRoutes.js`, `pedidosRoutes.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Controller de Pedidos

- **ID:** IC-007
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/pedidosController.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/src/controllers/pedidosController.js)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Regras de negócio para criação, consulta e atualização de pedidos. Arquivos: `pedidosController.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Regras de Versionamento (Gitignore)

- **ID**: IC-008
- **Tipo**: Configuração de Infraestrutura
- **Versão**: 1.0.0
- **Repositório:** [GitHub/.gitignore](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/.gitignore)
- **Branch**: main
- **Commit ID**: 322b5a38ddb52029c92b7e6901ce02a041919c58
- **Mudanças**: Definição da listagem de exclusão em todas as camadas (`node_modules`, pastas de log e env) blindando o repositório.
- **Data Release**: 08/04/2026

## Item de Configuração: Configuração de Dependências Frontend

- **ID**: IC-009
- **Tipo**: Configuração de Software
- **Versão**: 1.0.0
- **Repositório:** [GitHub/front](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front)
- **Branch**: main
- **Commit ID**: 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças**: Registro imutável de versão (via `package-lock.json` e `package.json`) das libs utilizadas no Frontend (ex: React dom, Router, Web Vitals).
- **Data Release**: 07/04/2026

## Item de Configuração: Núcleo da Interface

- **ID:** IC-010
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Estrutura principal da aplicação, inicialização no DOM e proteção de rotas administrativas. Arquivos: `App.js`, `src/index.js`, `PrivateRoute.jsx`.
- **Data Release:** 07/04/2026

## Item de Configuração: Telas Funcionais (Interface de Usuário)

- **ID:** IC-011
- **Tipo:** Código-fonte
- **Versão:** 1.0.0
- **Repositório:** [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Interface de pedidos e dashboard administrativo para operação e gestão. Arquivos: `Pedidos.jsx`, `Dashboard.jsx`.
- **Data Release:** 07/04/2026

## Item de Configuração: Testes Automatizados

- **ID:** IC-012
- **Tipo:** Testes
- **Versão:** 1.0.0
- **Repositório:** [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src)
- **Branch:** main
- **Commit ID:** 2d0124891bf4ccd8faacee7893c91ad3b5e50314
- **Mudanças:** Cobertura inicial de renderização e validação básica da interface. Arquivos: `App.test.js`, `setupTests.js`.
- **Data Release:** 07/04/2026

## Item de Configuração: Documento de Arquitetura (ADD/SAD)

- **ID:** IC-013
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/architecture/ADD-cafeteria-gourmet.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/architecture/ADD-cafeteria-gourmet.md)
- **Branch:** docs/project-specifications
- **Commit ID:** ef5b85050276824000f29d2a25ec2e195a569694
- **Mudanças:** Inclusão do Architectural Design Document (ADD), decisões arquiteturais, riscos e débitos técnicos. Arquivo: `docs/architecture/ADD-cafeteria-gourmet.md`.
- **Data Release:** 30/05/2026

## Item de Configuração: Especificação OpenAPI da API Backend

- **ID:** IC-014
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/openapi.yaml](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/openapi.yaml)
- **Branch:** docs/project-specifications
- **Commit ID:** 622c017d97167c46fa4ef1731a51f276c2824828
- **Mudanças:** Inclusão da especificação OpenAPI 3.0 da API backend, documentando os endpoints Express expostos para cardápio, pedidos, login administrativo e dashboard. Arquivo: `docs/api-spec.yaml`.
- **Data Release:** 30/05/2026

## Item de Configuração: Lista de Itens de Configuração

- **ID:** IC-015
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/ConfigurationItens.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/ConfigurationItens.md)
- **Branch:** docs/project-specifications
- **Commit ID:** 155470d4b0afa0b2b407794a4a5c1d6574d4208c
- **Mudanças:** Inclusão da própria lista detalhada de itens de configuração como documento controlado e versionado. Arquivo: `docs/ConfigurationItens.md`.
- **Data Release:** 31/05/2026

## Item de Configuração: Catálogo de ICs e Repositórios

- **ID:** IC-016
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/Catalogo_ICs_Repositorios.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Catalogo_ICs_Repositorios.md)
- **Branch:** docs/project-specifications
- **Commit ID:** 155470d4b0afa0b2b407794a4a5c1d6574d4208c
- **Mudanças:** Inclusão do catálogo resumido de ICs e repositórios como documento controlado e versionado. Arquivo: `docs/Catalogo_ICs_Repositorios.md`.
- **Data Release:** 31/05/2026

## Item de Configuração: Documento de Requisitos

- **ID:** IC-017
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/Requisitos.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Requisitos.md)
- **Branch:** docs/project-specifications
- **Commit ID:** A definir após commit de atualização
- **Mudanças:** Inclusão do documento de requisitos funcionais e não funcionais. Arquivo: `docs/Requisitos.md`.
- **Data Release:** 01/06/2026

## Item de Configuração: Documentação do Processo de CI/CD

- **ID:** IC-018
- **Tipo:** Documentação
- **Versão:** 1.0.0
- **Repositório:** [GitHub/docs/Documentacao_do_Processo_de_CI-CD.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Documentacao_do_Processo_de_CI-CD.md)
- **Branch:** docs/project-specifications
- **Commit ID:** A definir após commit de atualização
- **Mudanças:** Inclusão da documentação do processo de CI/CD. Arquivo: `docs/Documentacao_CI_CD.md`.
- **Data Release:** 09/06/2026