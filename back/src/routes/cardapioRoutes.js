const express = require('express');
const auth = require('../middlewares/auth');


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
router.post('/', auth, addMenuItem);

router.put('/:id', auth, updateMenuItem);

router.delete('/:id', auth, deleteMenuItem);

module.exports = router;
