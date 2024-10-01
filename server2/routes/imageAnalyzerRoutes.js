const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {authMiddleware} = require('../controllers/auth/auth-controller');
const { createImageAnalyzer } = require('../controllers/imageAnalyzerController');

// POST route to upload image, process input, and get GPT-4 response
router.post('/analyze',authMiddleware, upload.single('image'), createImageAnalyzer);

module.exports = router;
