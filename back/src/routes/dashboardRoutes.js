const express = require('express');
const auth = require('../middlewares/auth');

const {
  getDashboardPedidos,
  updatePedidoStatus,
} = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', auth, getDashboardPedidos);

router.put('/:id', auth, updatePedidoStatus);

module.exports = router;
