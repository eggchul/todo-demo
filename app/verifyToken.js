const jwt = require('jsonwebtoken');

/**
 * @desc    Functionality for verifying a jsonwebtoken
 */

module.exports = function(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, 'hello');
    req.user = verified;
  } catch (err) {
    res.status(400).send('Invalid token');
  }
  next();
};
