const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Cria o hash da senha
  const senhaHash = await bcrypt.hash('123', 10);

  // Cria ou atualiza o administrador
  await prisma.administrador.upsert({
    where: {
      email: 'admin@admin.com',
    },
    update: {
      senha: senhaHash,
    },
    create: {
      email: 'admin@admin.com',
      senha: senhaHash,
    },
  });

  console.log('Admin criado/verificado com sucesso');
}

main()
  .catch((e) => {
    console.error('Erro ao criar seed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
