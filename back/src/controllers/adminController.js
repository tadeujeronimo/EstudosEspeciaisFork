const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const adminLogin = async (req, res) => {
  const { email, senha } = req.body;

  console.log('BODY:', req.body);
  console.log('EMAIL DIGITADO:', `[${email}]`);
  console.log('SENHA DIGITADA:', `[${senha}]`);

  if (!email || !senha) {
    return res.status(400).json({
      error: 'Email e senha são obrigatórios',
    });
  }

  try {
    const admin = await prisma.administrador.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    console.log('ADMIN DO BANCO:', admin);

    if (!admin) {
      return res.status(401).json({
        error: 'Administrador não encontrado',
      });
    }

    console.log('SENHA DO BANCO:', `[${admin.senha}]`);

    if (admin.senha.trim() !== senha.trim()) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET || 'segredo123',
      {
        expiresIn: '1d',
      },
    );

    return res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Erro no servidor',
    });
  }
};

module.exports = {
  adminLogin,
};
