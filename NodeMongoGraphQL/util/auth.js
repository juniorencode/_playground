const jwt = require('jsonwebtoken');

const createJWTToken = user => {
  return jwt.sign({ user }, 'juniorencode', {
    expiresIn: '1d'
  });
};

module.exports = { createJWTToken };
