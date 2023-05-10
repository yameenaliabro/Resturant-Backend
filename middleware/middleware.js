const jwt = require('jsonwebtoken');
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
  checkAdminRole
};