# Catálogo de ICs e Repositórios

**UNIVERSIDADE FEDERAL DO CEARÁ**
**ENGENHARIA DA COMPUTAÇÃO — SOBRAL**

---

## 1. Metadados do Projeto

- **Nome do Projeto:** Cafeteria Gourmet
- **Responsável pela Gerência de Configuração (GC):** Ynã Ponte
- **Data de Criação:** 07/04/2026
- **Última Atualização:** 09/06/2026

---

## 2. Itens de Configuração (ICs)

| ID do IC | Nome do Item | Tipo (Código/Doc/Teste) | Localização (Repositório) | Versão Atual | Responsável | Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| IC-001 | Documentação do Projeto | Documentação | [GitHub/README.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/README.md) | `v1.0.0` | Tadeu Jerônimo | Ativo |
| IC-002 | Configuração de Dependências e Build Backend | Dependências e Builds | [GitHub/back](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back) | `v1.0.0` | Tadeu Jerônimo | Ativo |
| IC-003 | Aplicação Express | Código | [GitHub/app.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/app.js) | `v1.0.0` | Tadeu Jerônimo | Ativo |
| IC-004 | Inicialização do Servidor | Código |[GitHub/server.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/server.js) | `v1.0.0` | Lanna Mesquita | Ativo |
| IC-005 | Modelo de Dados (Persistência Prisma) | Código | [GitHub/prisma](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back/prisma) | `v1.0.0` | Lanna Mesquita | Ativo |
| IC-006 | Rotas da API | Código | [GitHub/routes](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back/src/routes) | `v1.0.0` | Lanna Mesquita | Ativo |
| IC-007 | Controller de Pedidos | Código | [GitHub/pedidosController.js](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/back/src/controllers/pedidosController.js) | `v1.0.0` | Ynã Ponte | Ativo |
| IC-008 | Regras de Versionamento (Gitignore) | Configuração | [GitHub/.gitignore](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/.gitignore) | `v1.0.0`, `baseline-2026-04-08` | Ynã Ponte | Ativo |
| IC-009 | Configuração de Dependências Frontend | Configuração | [GitHub/front](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front) | `v1.0.0` | Ynã Ponte | Ativo |
| IC-010 | Núcleo da Interface | Código | [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src) | `v1.0.0` | Alanna Paiva | Ativo |
| IC-011 | Telas Funcionais (Interface de Usuário) | Código | [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src) | `v1.0.0` | Alanna Paiva | Ativo |
| IC-012 | Testes Automatizados | Teste | [GitHub/front/src](https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front/src) | `v1.0.0` | Alanna Paiva | Ativo |
| IC-013 | Documento de Arquitetura (ADD/SAD) | Documentação | [GitHub/docs/architecture/ADD-cafeteria-gourmet.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/architecture/ADD-cafeteria-gourmet.md) | `v1.0.0` | Ynã Ponte | Ativo |
| IC-014 | Especificação OpenAPI da API Backend | Documentação | [GitHub/docs/openapi.yaml](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/openapi.yaml) | `v1.0.0` | Ynã Ponte | Ativo |
| IC-015 | Lista de Itens de Configuração | Documentação | [GitHub/docs/ConfigurationItens.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/ConfigurationItens.md) | `v1.2.0` | Ynã Ponte | Ativo |
| IC-016 | Catálogo de ICs e Repositórios | Documentação | [GitHub/docs/Catalogo_ICs_Repositorios.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Catalogo_ICs_Repositorios.md) | `v1.2.0` | Ynã Ponte | Ativo |
| IC-017 | Documento de Requisitos | Documentação | [GitHub/docs/Requisitos.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Requisitos.md) | `v1.0.0` | Tadeu Jerônimo | Ativo |
| IC-018 | Documentação do Processo de CI/CD | Documentação | [GitHub/docs/Requisitos.md](https://github.com/Lanna-Maria/EstudosEspeciais/blob/main/docs/Documentacao_do_Processo_de_CI-CD.md) | `v1.0.0` | Tadeu Jerônimo | Ativo |

---

## 3. Repositórios

| Nome do Repositório | Tipo (Git/Artefato) | URL | Descrição |
|:---:|:---:|:---:|:---:|
| EstudosEspeciais | Git (GitHub) | https://github.com/Lanna-Maria/EstudosEspeciais | Repositório principal do projeto |
| EstudosEspeciais — Backend | Git (GitHub) | https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/back | Código-fonte do backend (Node/Express) |
| EstudosEspeciais — Frontend | Git (GitHub) | https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/front | Código-fonte do frontend (React) |
| EstudosEspeciais — Docs | Git (GitHub) | https://github.com/Lanna-Maria/EstudosEspeciais/tree/main/docs | Documentação técnica e lista de ICs |

---

## 4. Controle de Versões

- **Política de Versionamento:** Versionamento Semântico (vMAIOR.MENOR.PATCH) — ex.: `v1.0.0`
- **Ferramenta:** Git Tags / GitHub Releases

```bash
# Criar tag anotada para a release v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0 — Entrega inicial do projeto EstudosEspeciais"

# Publicar todas as tags no repositório remoto
git push origin --tags
```

---

## 5. Histórico de Mudanças
 
| Data | Versão | Alteração | Autor |
|:---|:---|:---|:---|
| 08/04/2026 | v1.0.0 | Initial commit: estrutura inicial do repositório | Lanna Mesquita |
| 08/04/2026 | v1.0.0 | Primeiro commit: configuração inicial do projeto | Lanna Mesquita |
| 08/04/2026 | v1.0.0 | Adição do IC-008: configuração do .gitignore | Lanna Mesquita |
| 13/04/2026 | v1.0.0 | Atualização do IC-001: reorganiza .env.example e README | Tadeu Jerônimo |
| 13/04/2026 | v1.0.0 | Criação do arquivo docs/ConfigurationItens.md | Tadeu Jerônimo |
| 13/04/2026 | v1.0.0 | Registro dos IC-001, IC-002 e IC-003 na documentação | Tadeu Jerônimo |
| 13/04/2026 | v1.0.0 | Registro dos IC-004, IC-005 e IC-006 na documentação | Lanna Mesquita |
| 13/04/2026 | v1.0.0 | Registro dos IC-004, IC-005 e IC-006 na documentação (correção) | Lanna Mesquita |
| 13/04/2026 | v1.0.0 | Registro dos IC-007, IC-008 e IC-009 na documentação | Ynã Ponte |
| 14/04/2026 | v1.0.0 | Registro dos IC-010, IC-011 e IC-012 na documentação | Alanna Paiva|
| 30/05/2026 | v1.0.0 | Registro dos IC-013 e IC-014: ADD/SAD e Especificação OpenAPI | Ynã Ponte |
| 31/05/2026 | v1.0.0 | Registro dos IC-015 e IC-016: documentos de controle de configuração | Ynã Ponte |
| 01/06/2026 | v1.0.0 | Registro do IC-017: documento de requisitos funcionais e não funcionais | Tadeu Jerônimo |
| 09/06/2026 | v1.0.0 | Registro do IC-018: documentação do processo de CI/CD | Tadeu Jerônimo |