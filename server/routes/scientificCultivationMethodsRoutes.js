
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const scientificCultivationMethodsController = require('../controllers/scientificCultivationMethodsController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/upload', authenticateToken, upload.single('image'), scientificCultivationMethodsController.uploadScientificCultivationMethods);
router.delete('/:id', authenticateToken, scientificCultivationMethodsController.deleteScientificCultivationMethods);
router.get('/', scientificCultivationMethodsController.getScientificCultivationMethods);

module.exports = router;
