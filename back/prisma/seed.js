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

  console.log('Admin criado/atualizado com sucesso');

  // Limpa o cardápio antes de inserir os itens
  await prisma.cardapio.deleteMany({});

  // Insere os itens de exemplo no cardápio
  await prisma.cardapio.createMany({
    data: [
      { nome: 'Café Preto', preco: 4.5, categoria: 'cafes' },
      { nome: 'Café com Leite', preco: 5.0, categoria: 'cafes' },
      { nome: 'Espresso', preco: 5.5, categoria: 'cafes' },
      { nome: 'Cappuccino', preco: 6.5, categoria: 'cafes' },
      { nome: 'Latte', preco: 6.5, categoria: 'cafes' },
      { nome: 'Bolo de Chocolate', preco: 8.0, categoria: 'sobremesas' },
      { nome: 'Pudim', preco: 7.0, categoria: 'sobremesas' },
      { nome: 'Brownie', preco: 8.5, categoria: 'sobremesas' },
      { nome: 'Torta de Frutas', preco: 9.0, categoria: 'sobremesas' },
      { nome: 'Café Gourmet', preco: 12.0, categoria: 'especiais' },
      { nome: 'Café com Calda de Caramelo', preco: 7.5, categoria: 'especiais' },
      { nome: 'Café Canela', preco: 6.5, categoria: 'especiais' },
      { nome: 'Café Gelado', preco: 5.5, categoria: 'bebidasGeladas' },
      { nome: 'Iced Cappuccino', preco: 7.0, categoria: 'bebidasGeladas' },
      { nome: 'Refrigerante', preco: 4.0, categoria: 'bebidasGeladas' },
      { nome: 'Suco Natural', preco: 6.0, categoria: 'bebidasGeladas' },
      { nome: 'Chá Verde', preco: 4.5, categoria: 'chas' },
      { nome: 'Chá Preto', preco: 4.5, categoria: 'chas' },
      { nome: 'Chá de Camomila', preco: 5.0, categoria: 'chas' },
      { nome: 'Chá de Gengibre', preco: 5.5, categoria: 'chas' },
    ],
  });

  console.log('Cardápio populado com sucesso');
}

main()
  .catch((e) => {
    console.error('Erro ao criar seed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
