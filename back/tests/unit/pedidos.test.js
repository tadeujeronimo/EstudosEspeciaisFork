const { mockPrisma, createRes } = require('../utils/helpers');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const {
  createPedido,
  getAllPedidos,
  deletePedido,
} = require('../../src/controllers/pedidosController');

describe('pedidosController', () => {
  test('retorna 400 quando faltam dados obrigatórios', async () => {
    const req = { body: {} };
    const res = createRes();

    await createPedido(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Preencha os dados obrigatórios',
    });
  });

  test('cria pedido e calcula total corretamente', async () => {
    mockPrisma.pedido.create.mockResolvedValue({ id: 10 });

    const req = {
      body: {
        nomeCliente: 'Joao',
        itens: [
          { nome: 'Coxinha', preco: 5, quantidade: 2 },
          { nome: 'Suco', preco: 4, quantidade: 1 },
        ],
        formaPagamento: 'Pix',
        tipoPedido: 'Entrega',
        rua: 'Rua A',
        numero: '10',
        bairro: 'Centro',
        precisaTroco: 'true',
        trocoPara: '50',
        observacoes: 'Sem cebola',
      },
    };
    const res = createRes();

    await createPedido(req, res);

    expect(mockPrisma.pedido.create).toHaveBeenCalledWith({
      data: {
        nomeCliente: 'Joao',
        itens: req.body.itens,
        precoTotal: 14,
        formaPagamento: 'Pix',
        tipoPedido: 'Entrega',
        rua: 'Rua A',
        numero: '10',
        bairro: 'Centro',
        precisaTroco: true,
        trocoPara: 50,
        observacoes: 'Sem cebola',
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 10 });
  });

  test('lista pedidos com sucesso', async () => {
    mockPrisma.pedido.findMany.mockResolvedValue([{ id: 1 }]);

    const req = {};
    const res = createRes();

    await getAllPedidos(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  test('deleta pedido com sucesso', async () => {
    mockPrisma.pedido.delete.mockResolvedValue({});

    const req = { params: { id: '3' } };
    const res = createRes();

    await deletePedido(req, res);

    expect(mockPrisma.pedido.delete).toHaveBeenCalledWith({
      where: { id: 3 },
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });
});