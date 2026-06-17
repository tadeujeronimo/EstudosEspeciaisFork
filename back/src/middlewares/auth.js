const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não informado',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo123');

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
};

module.exports = auth;
