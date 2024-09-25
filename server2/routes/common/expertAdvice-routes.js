const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const expertAdviceController = require('../../controllers/common/expertAdvice-controller');


router.post('/add', upload.single('image'), expertAdviceController.uploadExpertAdvice);
router.delete('/:id', expertAdviceController.deleteExpertAdvice);
router.get('/', expertAdviceController.getExpertAdvice);
router.put('/:id', expertAdviceController.editExpertAdvice);

module.exports = router;