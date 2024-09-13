const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  });
  
};

module.exports = authenticateToken;
