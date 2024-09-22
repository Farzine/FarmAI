const express = require('express');
const { registerUser, verifyOTP, loginUser, updateUser, forgotPassword, resetPassword } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require('passport');
const { loginSuccess, loginFailure } = require('../controllers/userController');
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


// Route to initiate Google login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle callback from Google OAuth
router.get( '/auth/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/auth/success', 
		failureRedirect: '/auth/failure'
}));
// router.get('/auth/google/callback',
//   passport.authenticate('google', { 
//     failureRedirect: '/auth/failure' 
//   }),
//   (req, res) => {
//     console.log('Google callback hit');
//     try{

//       res.redirect('/');
//     } catch (error) {
//       console.error('Error during redirect:', error);
//       res.status(500).send('Server Error');
//     }
//   }
// );


  router.get('/auth/success', loginSuccess);
  router.get('/auth/failure', loginFailure);

module.exports = router;
