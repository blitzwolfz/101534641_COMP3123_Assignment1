const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        status: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        status: false, 
        message: 'Token expired' 
      });
    }
    return res.status(401).json({ 
      status: false, 
      message: 'Invalid token' 
    });
  }
};

module.exports = verifyToken;
