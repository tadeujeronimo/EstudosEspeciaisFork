const { mockPrisma, createRes } = require('../utils/helpers');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

const {
  getAllMenuItems,
  addMenuItem,
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

  test('adiciona item ao cardápio', async () => {
    const novoItem = { id: 1, nome: 'Café', preco: 4, categoria: 'cafes', imagem: null };
    mockPrisma.cardapio.create.mockResolvedValue(novoItem);

    const req = {
      body: { nome: 'Café', preco: '4', categoria: 'cafes' },
      file: null,
    };
    const res = createRes();

    await addMenuItem(req, res);

    expect(mockPrisma.cardapio.create).toHaveBeenCalledWith({
      data: { nome: 'Café', preco: 4, categoria: 'cafes', imagem: null },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(novoItem);
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
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Item removido com sucesso' });
  });
});