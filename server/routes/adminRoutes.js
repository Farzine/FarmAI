const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/login', adminController.login);
router.put('/update-email-password', authenticateToken, adminController.updateEmailAndPassword);
router.post('/logout', adminController.logout); 

module.exports = router;
