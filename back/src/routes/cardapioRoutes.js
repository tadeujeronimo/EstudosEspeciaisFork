const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('../config/multer');

const {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/cardapioController');

const router = express.Router();

// Públicas
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Apenas administrador
router.post('/', auth, multer.single('imagem'), addMenuItem);

router.put('/:id', auth, multer.single('imagem'), updateMenuItem);

router.delete('/:id', auth, deleteMenuItem);

module.exports = router;
