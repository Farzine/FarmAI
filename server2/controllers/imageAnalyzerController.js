const ImageAnalyzer = require('../models/ImageAnalyzer');
const cloudinary = require('../config/cloudinary');
const OpenAI = require('openai');
const path = require('path');

const openai = new OpenAI({apikey: process.env.OPENAI_API_KEY_NAFI});

const createImageAnalyzer = async (req, res) => {
    try {
        const { userInputText } = req.body;
        const imageFile = req.file; 
        console.log(userInputText);
        console.log(imageFile);
    
        let cloudinaryImageUrl = null;
        let generatedImageUrl = null;

        if (imageFile) {
          // Validate MIME type
          const allowedMimeTypes = ['image/jpeg', 'image/png'];
          if (!allowedMimeTypes.includes(imageFile.mimetype)) {
            return res.status(400).json({ error: 'Unsupported MIME type. Please upload JPG or PNG images.' });
          }
    
          // Extract and validate file extension
          const ext = path.extname(imageFile.originalname).slice(1).toLowerCase();
          const allowedFormats = ['jpg', 'jpeg', 'png'];
          if (!allowedFormats.includes(ext)) {
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
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInputText },
          ],
          max_tokens: 200,
        });
    
        const gptText = gptResponse.data.choices[0].message.content.trim();;
    
        if (imageFile) {
          const generatedImage = await openai.createImage({
            prompt: gptText,
            n: 1,
            size: '1024x1024',
          });
    
          generatedImageUrl = generatedImage.data.data[0].url;;
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
        
        if (error.http_code === 400 && error.message.includes('Invalid extension')) {
          return res.status(400).json({ error: 'Invalid image format. Please upload a JPG or PNG image.' });
        }
    
        if (error.code === 'insufficient_quota') {
          return res.status(403).json({ error: 'You have exceeded your quota. Please check your plan and billing details.' });
        }
      
        res.status(500).json({ error: 'Something went wrong with the image analysis.' });
      }
};



module.exports = {
  createImageAnalyzer,
};
