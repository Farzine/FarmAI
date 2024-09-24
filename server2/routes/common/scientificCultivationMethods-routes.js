const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const scientificCultivationMethodsController = require('../../controllers/common/scientificCultivationMethods-controller');


router.post('/add', upload.single('image'), scientificCultivationMethodsController.uploadScientificCultivationMethods);
router.delete('/:id', scientificCultivationMethodsController.deleteScientificCultivationMethods);
router.get('/', scientificCultivationMethodsController.getScientificCultivationMethods);
router.put('/:id', scientificCultivationMethodsController.editScientificCultivationMethods);

module.exports = router;