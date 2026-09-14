# Sistema de Controle de Pedidos — Lanchonete

Este projeto é uma aplicação em **TypeScript** focada em testes unitários automatizados utilizando a biblioteca **Jest**.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Jest** (`ts-jest`)

## 📋 Regras de Negócio Implementadas

- **RN01 — Cliente:** Validação de nome obrigatório e com no mínimo 3 caracteres.
- **RN02 — Pedido:** Requisito de ter pelo menos 1 produto no pedido para cálculo.
- **RN03 — Desconto:** Desconto automático de 10% para pedidos acima de R$ 100,00.
- **RN04 — Valor Negativo:** Impedimento de preços ou quantidades menores ou iguais a zero.
- **RN05 — Status:** Gerenciamento dos estados (`CRIADO`, `EM_PREPARACAO`, `PRONTO`, `ENTREGUE`, `CANCELADO`).
- **RN06 — Cancelamento:** Pedidos com status `ENTREGUE` não podem ser cancelados.
- **RN07 — Pedido Pronto:** O status só transiciona para `ENTREGUE` se o pedido estiver `PRONTO`.

## 🛠️ Como Executar os Testes

1. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps