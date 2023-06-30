const jwt = require('jsonwebtoken');

const createJWTToken = user => {
  return jwt.sign({ user }, 'juniorencode', {
    expiresIn: '1h'
  });
};

module.exports = { createJWTToken };
