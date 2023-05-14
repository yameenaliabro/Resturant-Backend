const jwt = require('jsonwebtoken');
let dotenv = require("dotenv").config()
let secret = process.env.JWT_SECRET
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('x-auth-token');
  // Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
exports.verifyToken = (req, res, next) => {
let token = req.headers.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token,"MY_SECRET_KEY") ;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};    
const checkAdminRole = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the next middleware
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};
module.exports = {
  checkAdminRole,
  authMiddleware
};