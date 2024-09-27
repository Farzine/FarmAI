// controllers/imageAnalyzerController.js

const ImageAnalyzer = require('../models/ImageAnalyzer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); // Ensure multer is imported

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_NAFI,
});


const createImageAnalyzer = async (req, res) => {
  try {
    const { userInputText } = req.body;
    const imageFile = req.file; 
    console.log('User Input Text:', userInputText);
    console.log('Image File:', imageFile);

    let cloudinaryImageUrl = null;
    let generatedImageUrl = null;

    if (imageFile) {
      // Validate MIME type
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(imageFile.mimetype)) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Unsupported MIME type. Please upload JPG or PNG images.' });
      }

      // Extract and validate file extension
      const ext = path.extname(imageFile.originalname).slice(1).toLowerCase();
      const allowedFormats = ['jpg', 'jpeg', 'png'];
      if (!allowedFormats.includes(ext)) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Unsupported file format. Please upload JPG or PNG images.' });
      }

      // Upload to Cloudinary with correct format
      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'FarmAIgpt4',
        format: ext, // Use the actual file extension
      });
      cloudinaryImageUrl = uploadedImage.secure_url;
    }

    // Generate response using GPT-4 based on the text input (image optional)
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4', // Correct model name
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInputText },
      ],
      max_tokens: 200,
    });

    const gptText = gptResponse.choices[0].message.content.trim();

    if (imageFile) {
      const generatedImage = await openai.images.generate({
        prompt: gptText,
        n: 1,
        size: '1024x1024',
      });

      generatedImageUrl = generatedImage.data[0].url;
    }

    // Store everything in the database
    const newEntry = new ImageAnalyzer({
      userInputText,
      cloudinaryImageUrl,
      gptResponse: gptText,
      generatedImageUrl,
    });

    await newEntry.save();

    res.status(201).json({
      message: 'Image analysis complete!',
      data: newEntry,
    });
  } catch (error) {
    console.error(error);
    
    if (error.response) {
      // OpenAI API returned an error response
      const { status, data } = error.response;
      
      if (status === 400 && data.error.code === 'model_not_found') {
        return res.status(400).json({ error: 'The specified model does not exist or you do not have access to it. Please verify your OpenAI subscription and model name.' });
      }

      if (data.error.code === 'insufficient_quota') {
        return res.status(403).json({ error: 'You have exceeded your quota. Please check your plan and billing details.' });
      }

      return res.status(status).json({ error: data.error.message });
    }

    // Handle Multer errors
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message });
    }

    // Handle custom errors thrown in multer configuration
    if (error.message) {
      return res.status(400).json({ error: error.message });
    }

    // Generic error message
    res.status(500).json({ error: 'Something went wrong with the image analysis.' });
  }
};

module.exports = {
  createImageAnalyzer,
};
