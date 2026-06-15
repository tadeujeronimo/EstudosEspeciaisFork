const { mockPrisma, createRes } = require('../utils/helpers');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const {
  getDashboardPedidos,
  createPedido,
  updatePedidoStatus,
} = require('../../src/controllers/dashboardController');

describe('dashboardController', () => {
  test('lista pedidos do dashboard', async () => {
    mockPrisma.pedido.findMany.mockResolvedValue([{ id: 1 }]);

    const req = {};
    const res = createRes();

    await getDashboardPedidos(req, res);

    expect(mockPrisma.pedido.findMany).toHaveBeenCalledWith({
      orderBy: { criadoEm: 'desc' },
    });
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  test('cria pedido do dashboard convertendo itens string', async () => {
    mockPrisma.pedido.create.mockResolvedValue({ id: 2 });

    const req = {
      body: {
        cliente: 'Maria',
        itens: 'Pizza,Refrigerante',
      },
    };
    const res = createRes();

    await createPedido(req, res);

    expect(mockPrisma.pedido.create).toHaveBeenCalledWith({
      data: {
        nomeCliente: 'Maria',
        numeroMesa: '1',
        itens: [
          { nome: 'Pizza', preco: 0, quantidade: 1 },
          { nome: 'Refrigerante', preco: 0, quantidade: 1 },
        ],
        precoTotal: 0,
        status: 'Pendente',
      },
    });
    expect(res.json).toHaveBeenCalledWith({ id: 2 });
  });

  test('atualiza status do pedido', async () => {
    mockPrisma.pedido.update.mockResolvedValue({ id: 3, status: 'Pronto' });

    const req = {
      params: { id: '3' },
      body: { status: 'Pronto' },
    };
    const res = createRes();

    await updatePedidoStatus(req, res);

    expect(mockPrisma.pedido.update).toHaveBeenCalledWith({
      where: { id: 3 },
      data: { status: 'Pronto' },
    });
    expect(res.json).toHaveBeenCalledWith({ id: 3, status: 'Pronto' });
  });
});