const falsey = require('falsey');
const JwtUtil = require('../utils/jwtUtil');
require('dotenv').config();

async function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (falsey(token)) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: No validated token' });
  }

  try {
    jwt = new JwtUtil().verify(token);
    req._id = jwt._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = { authenticateToken };
