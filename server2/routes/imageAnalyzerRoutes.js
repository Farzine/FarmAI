const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const auth = require('../middleware/auth');
const { createImageAnalyzer } = require('../controllers/imageAnalyzerController');

// POST route to upload image, process input, and get GPT-4 response
router.post('/analyze',auth, upload.single('image'), createImageAnalyzer);

module.exports = router;
