const express = require('express');
const auth = require('../middlewares/auth');

const { adminLogin } = require('../controllers/adminController');

const router = express.Router();

// Pública
router.post('/login', adminLogin);

// Protegida
router.get('/dashboard', auth, (req, res) => {
  return res.status(200).json({
    message: 'Acesso autorizado',
    admin: req.admin,
  });
});

module.exports = router;
