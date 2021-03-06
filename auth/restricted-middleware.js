const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  const [authType, token] = req.headers.authorization.split(' ');
  console.log('token: ', token);

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'cannot touch this (invalid token)' });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'have no power (no token included)' });
  }
};
