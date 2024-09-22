const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User1");
const nodemailer = require('nodemailer');
const cloudinary = require('../../config/cloudinary'); 
const fs = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const otpStore = {}; 



// google auth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/api/auth/google/callback`,
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in your database
      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        // If user doesn't exist, create a new user
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
          password: '', 
          address: '', 
        });

        await user.save();
      }

      // Return the user
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

// Serialize user information into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
exports.loginSuccess = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: req.user,
  });
};

exports.loginFailure = (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failed',
  });
};


// Helper function to send OTP via email
const sendOTP = (email, otp) => {
  const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'OTP for Account Verification',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

//register
exports.registerUser = async (req, res) => {
  const { userName, email, password,phone  } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

      // Generate OTP and store it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, data: { userName, email, phone, profilePicture, password }, expiration: Date.now() + 10 * 60 * 1000 };

    // Send OTP
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to email. Please verify your account.', success: true });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error sending OTP', e });
  }
};


// Verify OTP and create account - step 2
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const storedOTP = otpStore[email];

  if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiration) {
    return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
  }

  try {
    // Upload profile picture to Cloudinary (if provided)
    let cloudinaryUrl = '';
    if (storedOTP.data.profilePicture) {
      try {
        const filePath = storedOTP.data.profilePicture;
        const uploadResult = await cloudinary.uploader.upload(filePath, {
          folder: 'FarmAIuserProfile',
          format: 'webp', 
        });
        cloudinaryUrl = uploadResult.secure_url;

        // Remove the file from local uploads folder after upload
        fs.unlinkSync(filePath);
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(500).json({ message: 'Error uploading profile picture', error: uploadError });
      }
    }

    const { userName, phone, password } = storedOTP.data;

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      phone,
      profilePicture: cloudinaryUrl
    });

    await newUser.save();

    // Clear OTP from the store after successful registration
    delete otpStore[email];

    res.status(201).json({success: true, message: 'Account created successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Error creating account', error });
  }
};


//login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        phone: checkUser.phone,
      },
      process.env.SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        phone: checkUser.phone,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

exports.logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};


// Forgot password - send OTP
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expiration: Date.now() + 10 * 60 * 1000 }; // Store OTP temporarily

    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};


// Reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmNewPassword } = req.body;

  try {
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const storedOTP = otpStore[email];
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiration) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    delete otpStore[email]; // Remove OTP after use
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
