
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/upload', authenticateToken, upload.single('image'), productController.uploadProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);
router.get('/', productController.getProduct);

module.exports = router;
