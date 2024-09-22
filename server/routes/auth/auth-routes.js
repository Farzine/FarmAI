const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const passport = require('passport');
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyOTP,
  forgotPassword,
  resetPassword,
  loginFailure,
  loginSuccess,
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register",upload.single('profilePicture'), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});


// Route to initiate Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle callback from Google OAuth
router.get( '/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/success', 
		failureRedirect: '/failure'
}));

router.get('/success', loginSuccess);
router.get('/failure', loginFailure);

module.exports = router;
