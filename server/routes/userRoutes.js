const express = require('express');
const { registerUser, verifyOTP, loginUser, updateUser, forgotPassword, resetPassword } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Register new user (Step 1: Send OTP)
router.post('/register',upload.single('profilePicture'), registerUser);

// Verify OTP and complete registration (Step 2)
router.post('/verify-otp', verifyOTP);

// Login user
router.post('/login', loginUser);

// Update user details (Authenticated route)
router.put('/update', authenticateToken, updateUser);

// Forgot password (send OTP)
router.post('/forgot-password', forgotPassword);

// Reset password using OTP
router.post('/reset-password', resetPassword);

module.exports = router;
