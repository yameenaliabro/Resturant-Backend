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
exports.adminMiddleware = (req, res, next) => {
  // Check if the user is authenticated and has admin role
  if (req.user && req.user.role === 'admin') {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, return a 403 Forbidden response
    res.status(403).json({ message: 'Forbidden' });
  }
};