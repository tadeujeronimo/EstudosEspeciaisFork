const VALID_PICKUP_PIX = {
  nomeCliente: 'Alice Pickup',
  itens: [
    { nome: 'Espresso', categoria: 'Bebidas', preco: 5.0, quantidade: 2 }
  ],
  formaPagamento: 'pix',
  tipoPedido: 'retirada',
  precisaTroco: false,
};

const VALID_DELIVERY_CASH = {
  nomeCliente: 'Bob Delivery',
  itens: [
    { nome: 'Pizza', categoria: 'Lanches', preco: 40.0, quantidade: 1 }
  ],
  formaPagamento: 'dinheiro',
  tipoPedido: 'entrega',
  rua: 'Rua A',
  numero: '123',
  bairro: 'Centro',
  precisaTroco: true,
  trocoPara: 50, // total is 40, troco for 50 is valid
};

const INVALID_NEGATIVE_QTY = {
  nomeCliente: 'Hacker',
  itens: [
    { nome: 'Refrigerante', categoria: 'Bebidas', preco: 5.0, quantidade: -1 }
  ],
  formaPagamento: 'pix',
  tipoPedido: 'retirada'
};

const INVALID_DELIVERY_NO_ADDRESS = {
  nomeCliente: 'Charlie NoAddress',
  itens: [
    { nome: 'Bolo', categoria: 'Doces', preco: 15.0, quantidade: 1 }
  ],
  formaPagamento: 'debito',
  tipoPedido: 'entrega', // missing rua, numero, bairro
};

const INVALID_CHANGE_AMOUNT = {
  nomeCliente: 'Dave Change',
  itens: [
    { nome: 'Torta', categoria: 'Doces', preco: 30.0, quantidade: 1 }
  ],
  formaPagamento: 'dinheiro',
  tipoPedido: 'retirada',
  precisaTroco: true,
  trocoPara: 20, // less than total (30)
};

module.exports = {
  VALID_PICKUP_PIX,
  VALID_DELIVERY_CASH,
  INVALID_NEGATIVE_QTY,
  INVALID_DELIVERY_NO_ADDRESS,
  INVALID_CHANGE_AMOUNT,
};
