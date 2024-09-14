const mongoose = require('mongoose');

const scientificCultivationMethods = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  crop_name: {
    type: String,
    required: true,
  },
});

const ScientificCultivationMethods = mongoose.model('scientificCultivationMethods', scientificCultivationMethods);

module.exports = ScientificCultivationMethods;
