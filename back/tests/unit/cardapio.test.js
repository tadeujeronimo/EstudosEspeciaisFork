const { mockPrisma, createRes } = require('../utils/helpers');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const {
  getAllMenuItems,
  addMenuItems,
  updateMenuItem,
  deleteMenuItem,
} = require('../../src/controllers/cardapioController');

describe('cardapioController', () => {
  test('retorna itens do cardápio', async () => {
    mockPrisma.cardapio.findMany.mockResolvedValue([{ id: 1, nome: 'Café' }]);

    const req = {};
    const res = createRes();

    await getAllMenuItems(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nome: 'Café' }]);
  });

  test('adiciona itens ao cardápio', async () => {
    mockPrisma.cardapio.create.mockResolvedValue({});

    const req = {
      body: {
        menuItems: {
          bebidas: {
            'Suco de laranja': 8,
            Café: 4,
          },
        },
      },
    };
    const res = createRes();

    await addMenuItems(req, res);

    expect(mockPrisma.cardapio.create).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Itens adicionados com sucesso',
    });
  });

  test('atualiza item do cardápio', async () => {
    mockPrisma.cardapio.update.mockResolvedValue({ id: 2, nome: 'Café' });

    const req = {
      params: { id: '2' },
      body: { nome: 'Café', preco: 6, categoria: 'bebidas' },
    };
    const res = createRes();

    await updateMenuItem(req, res);

    expect(mockPrisma.cardapio.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: { nome: 'Café', preco: 6, categoria: 'bebidas' },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('remove item do cardápio', async () => {
    mockPrisma.cardapio.delete.mockResolvedValue({});

    const req = { params: { id: '5' } };
    const res = createRes();

    await deleteMenuItem(req, res);

    expect(mockPrisma.cardapio.delete).toHaveBeenCalledWith({
      where: { id: 5 },
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
  });
});