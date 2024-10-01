
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorised user!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid authentication token' });
  }
};

module.exports = auth;
