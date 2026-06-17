const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

// ── Blob provider ─────────────────────────────────────────────────────────────
// When USE_LOCAL_STORAGE=true (Docker / local testing) we skip Vercel Blob and
// save files to disk instead, returning a localhost URL.
// In production (Vercel) the env var is absent and the real SDK is used.
let put;
if (process.env.USE_LOCAL_STORAGE === 'true') {
  put = async (filename, buffer, _opts) => {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    // Flatten the path so "menu-items/123-foto.jpg" becomes "menu-items-123-foto.jpg"
    const safeName = filename.replace(/\//g, '-');
    fs.writeFileSync(path.join(uploadDir, safeName), buffer);
    return { url: `http://localhost:${process.env.PORT || 4000}/uploads/${safeName}` };
  };
} else {
  ({ put } = require('@vercel/blob'));
}

// Listar todos os itens
const getAllMenuItems = async (req, res) => {
  try {
    const itens = await prisma.cardapio.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.status(200).json(itens);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro ao buscar os itens do cardápio',
    });
  }
};

// Buscar item por ID
const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.cardapio.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!item) {
      return res.status(404).json({
        message: 'Item não encontrado',
      });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro ao buscar item',
    });
  }
};

// Criar item
const addMenuItem = async (req, res) => {
  try {
    const { nome, preco, categoria } = req.body;

    let imagemUrl = null;

    if (req.file) {
      const filename = `menu-items/${Date.now()}-${req.file.originalname}`;
      const blob = await put(filename, req.file.buffer, {
        access: 'public',
        contentType: req.file.mimetype,
      });
      imagemUrl = blob.url;
    }

    const item = await prisma.cardapio.create({
      data: {
        nome,
        preco: Number(preco),
        categoria,
        imagem: imagemUrl,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro ao adicionar item ao cardápio',
    });
  }
};

// Atualizar item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, categoria } = req.body;

    const dadosAtualizacao = {
      nome,
      preco: Number(preco),
      categoria,
    };

    if (req.file) {
      const filename = `menu-items/${Date.now()}-${req.file.originalname}`;
      const blob = await put(filename, req.file.buffer, {
        access: 'public',
        contentType: req.file.mimetype,
      });
      dadosAtualizacao.imagem = blob.url;
    }

    const itemAtualizado = await prisma.cardapio.update({
      where: {
        id: Number(id),
      },
      data: dadosAtualizacao,
    });

    res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro ao atualizar item do cardápio',
    });
  }
};

// Remover item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cardapio.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: 'Item removido com sucesso',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Erro ao remover item do cardápio',
    });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
