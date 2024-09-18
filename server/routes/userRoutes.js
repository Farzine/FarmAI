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
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // On success, redirect to the success route
    res.redirect(`${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/auth/success`);
  }
);

// Route for login failure (handled by the controller)
router.get('/auth/failure', (req, res) => {
    // Redirect to the frontend with failure information
    res.redirect(`${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/signUp?login=failed`);
});

// Route for login success (controller handles the response)
router.get('/auth/success', (req, res) => {
    if (req.isAuthenticated()) {
      // Use the controller function to respond with success
      return loginSuccess(req, res);
    } else {
      // If the user is not authenticated, redirect to failure
      return res.redirect('/auth/failure');
    }
  });
  
  // Route for login failure (controller handles the response)
  router.get('/auth/failure', loginFailure);

module.exports = router;
