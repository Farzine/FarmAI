const mongoose = require('mongoose');

const ImageAnalyzerSchema = new mongoose.Schema({
  userInputText: { type: String, required: true },
  cloudinaryImageUrl: { type: String, default: null },  
  gptResponse: { type: String, required: true },
  generatedImageUrl: { type: String, default: null }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ImageAnalyzer', ImageAnalyzerSchema);
