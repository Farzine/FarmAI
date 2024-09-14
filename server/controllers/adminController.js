const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models/admin');



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email or password' });

    admin.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

      const token = jwt.sign({ email: admin.email }, process.env.SECRET_KEY, { expiresIn: '30d' });
      res.cookie('token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
      res.json({ token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateEmailAndPassword = async (req, res) => {
    const { newEmail, newPassword } = req.body;
  
    try {
      const admin = await Admin.findOne();
      if (!admin) return res.status(404).json({ message: 'Admin not found' });
  
      if (newEmail) admin.email = newEmail;
      if (newPassword) admin.passwordHash = newPassword;
  
      await admin.save();
      res.json({ message: 'Email and password updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };
