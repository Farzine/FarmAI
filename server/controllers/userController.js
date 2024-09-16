const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const cloudinary = require('../config/cloudinary'); // Assuming Cloudinary is set up
const otpStore = {}; // Temporary store for OTP

// Helper function to send OTP via email
const sendOTP = (email, otp) => {
  const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com', // Correct Sendinblue SMTP host
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

// Register user - step 1 (send OTP)
exports.registerUser = async (req, res) => {
  const { name, email, phone, profilePicture, password, confirmPassword, address } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Generate and send OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = { otp, data: { name, email, phone, profilePicture, password, address }, expiration: Date.now() + 10 * 60 * 1000 };

  try {
    await sendOTP(email, otp);
    res.status(200).json({ message: 'OTP sent to email. Please verify your account.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

// Verify OTP and create account - step 2
exports.verifyOTP = async (req, res) => {
  const { email, otp, profilePicture } = req.body;
  const storedOTP = otpStore[email];

  if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expiration) {
    return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
  }

  try {
    // Upload profile picture to Cloudinary (if provided)
    let cloudinaryUrl = '';
    if (profilePicture) {
      const uploadResult = await cloudinary.uploader.upload(profilePicture, {
        folder: 'FarmAI',
        format: 'webp',  // Save as .webp
      });
      cloudinaryUrl = uploadResult.secure_url;
    }

    const { name, email, phone, password, address } = storedOTP.data;

    // Save user data to database after OTP verification
    const user = new User({ name, email, phone, profilePicture: cloudinaryUrl, password, address });
    await user.save();

    delete otpStore[email];  // Clear OTP after successful registration
    res.status(201).json({ message: 'Account created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.isPasswordValid(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '24h' });

    // Store the token in a cookie
    res.cookie('token', token, {
      httpOnly: true,  // Accessible only by the server (prevents XSS attacks)
      secure: process.env.NODE_ENV === 'production',  // Send cookie over HTTPS only in production
      maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


// Update user details
exports.updateUser = async (req, res) => {
  const { id } = req.user; // Extracted user ID from the token in the middleware
  const { name, phone, address, profilePicture, currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a password update is requested
    if (currentPassword && newPassword && confirmNewPassword) {
      // Validate the current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Check if the new password and confirm password match
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword; // Update user's password
    }

    // Update other user details if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // If a new profile picture is provided, upload it to Cloudinary
    if (profilePicture) {
      const uploadResult = await cloudinary.uploader.upload(profilePicture, {
        folder: 'FarmAI', // Upload to the FarmAI folder
        format: 'webp',   // Save the image as .webp for optimization
      });
      user.profilePicture = uploadResult.secure_url; // Update profile picture URL
    }

    // Save the updated user information to the database
    await user.save();

    // Respond with a success message and the updated user object
    res.status(200).json({
      message: 'User updated successfully',
      user: {
        name: user.name,
        phone: user.phone,
        address: user.address,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
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

exports.logoutUser = (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.status(200).json({ message: 'Logout successful' });
};