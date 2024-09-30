
const mongoose = require('mongoose');

const ImageAnalyzerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  userInputText: {
    type: String,
    required: true,
  },
  cloudinaryImageUrl: {
    type: String,
    required: false,
  },
  gptResponse: {
    type: String,
    required: false,
  },
  generatedImageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('ImageAnalyzer', ImageAnalyzerSchema);
