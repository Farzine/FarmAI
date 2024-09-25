const mongoose = require('mongoose');

const ExpertAdvice = new mongoose.Schema({
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
  title: {
    type: String,
    required: true,
  },
});

const ExpertAdviceModel = mongoose.model('Expert Advice', ExpertAdvice);

module.exports = ExpertAdviceModel;
