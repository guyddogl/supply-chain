const { AUTHORIZATION_TOKEN } = require('../utils/authorizationToken');

const validateAuthorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token !== AUTHORIZATION_TOKEN) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = {
  validateAuthorization,
};