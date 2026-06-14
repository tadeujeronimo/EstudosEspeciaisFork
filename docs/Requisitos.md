# Documento de Requisitos

- **Projeto:** CG - Cafeteria Gourmet
- **Versão:** 1.0.0

---

## 1. Introdução

### 1.1 Objetivo

Este documento apresenta os requisitos do sistema **Café Gourmet**, desenvolvido para auxiliar na gestão de cardápio, pedidos e administração de uma cafeteria de pequeno porte.

### 1.2 Escopo

O sistema permitirá:
- consulta de itens do cardápio;
- gerenciamento de produtos;
- registro e acompanhamento de pedidos;
- autenticação administrativa;
- controle operacional dos pedidos.

## 2. Descrição Geral

O sistema será uma aplicação web composta por:
- área pública para clientes;
- área administrativa restrita para gerenciamento do sistema.

Os usuários administrativos poderão cadastrar produtos, visualizar pedidos e atualizar seus status.

## 3. Requisitos Funcionais

| Ator | Código | Descrição |
|---|---|---|
| Cliente | RF01 | Visualizar o cardápio disponível. |
| Cliente | RF02 | Realizar pedidos de produtos. |
| Cliente | RF03 | Escolher a modalidade de recebimento (receber em casa ou retirada no balcão). |
| Cliente | RF04 | Escolher a forma de pagamento (dinheiro, Pix, débito ou crédito), com opção de informar o troco, caso necessário. |
| Administrador | RF05 | Realizar login no sistema. |
| Administrador | RF06 | Visualizar os pedidos. |
| Administrador | RF07 | Confirmar pedidos recebidos. |
| Administrador | RF08 | Cancelar pedidos quando necessário. |
| Administrador | RF09 | Visualizar o total de vendas realizadas no dia. |
| Administrador | RF10 | Gerenciar os produtos do cardápio (incluir, editar e excluir). |
| Administrador | RF11 | Realizar logout. |

## 4. Requisitos Não Funcionais

| Código | Descrição |
|---|---|
| RNF01 | **Segurança:** garantir que apenas administradores autenticados possam gerenciar pedidos e produtos. |
| RNF02 | **Privacidade:** proteger os dados contra acesso não autorizado. |
| RNF03 | **Desempenho:** garantir respostas rápidas às requisições. |
| RNF04 | **Usabilidade:** fornecer uma interface simples e intuitiva. |
| RNF05 | **Escalabilidade:** permitir o aumento de usuários, pedidos e funcionalidades sem perda significativa de desempenho. |

## 5. Regras de Negócio

- Apenas administradores autenticados podem acessar o painel administrativo;
- Pedidos devem conter ao menos um item do cardápio;
- Campos obrigatórios devem ser validados antes do envio do pedido.

## 6. Critérios de Aceitação

- O sistema deve permitir registrar pedidos corretamente;
- O administrador deve conseguir atualizar o status dos pedidos;
- O acesso administrativo deve exigir autenticação válida.

## 7. Observações

A autenticação administrativa é realizada com JWT (JSON Web Token) para controle de sessão e bcrypt para armazenamento seguro de senhas.