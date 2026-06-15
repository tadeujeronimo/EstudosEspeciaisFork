const { mockPrisma, createRes } = require('../utils/helpers');

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => mockPrisma),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('fake-token'),
}));

const { adminLogin } = require('../../src/controllers/adminController');

describe('adminController', () => {
  test('retorna 400 quando email ou senha faltam', async () => {
    const req = { body: { email: '', senha: '' } };
    const res = createRes();

    await adminLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Email e senha são obrigatórios',
    });
  });

  test('retorna 200 quando login é válido', async () => {
    mockPrisma.administrador.findUnique.mockResolvedValue({
      id: 1,
      email: 'admin@teste.com',
      senha: '$2b$10$hashedpassword',
    });

    const req = {
      body: {
        email: ' ADMIN@TESTE.COM ',
        senha: ' 123456 ',
      },
    };
    const res = createRes();

    await adminLogin(req, res);

    expect(mockPrisma.administrador.findUnique).toHaveBeenCalledWith({
      where: { email: 'admin@teste.com' },
    });
    expect(res.json).toHaveBeenCalledWith({
      message: 'Login realizado com sucesso',
      token: 'fake-token',
      admin: {
        id: 1,
        email: 'admin@teste.com',
      },
    });
  });
});