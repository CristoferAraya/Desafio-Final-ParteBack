const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send('No autorizado');
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('No autorizado');
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;