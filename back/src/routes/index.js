const express = require('express');
const auth = require('../middlewares/auth');

const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidosRoutes');
const adminRoutes = require('./adminRoutes');
const dashboardRoutes = require('./dashboardRoutes');

const router = express.Router();

// Públicas
router.use('/admin', adminRoutes);
router.use('/pedidos', pedidoRoutes);

// Protegidas
router.use('/dashboard', auth, dashboardRoutes);
router.use('/cardapio', cardapioRoutes);

module.exports = router;
