const ImageAnalyzer = require('../models/ImageAnalyzer');
const cloudinary = require('../config/cloudinary');
const OpenAI = require('openai');


const openai = new OpenAI({apikey: process.env.OPENAI_API_KEY2});

const createImageAnalyzer = async (req, res) => {
    try {
        const { userInputText } = req.body;
        const imageFile = req.file; 
    
        let cloudinaryImageUrl = null;
        let generatedImageUrl = null;

        if (imageFile) {
          const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'FarmAIgpt4',
            format: 'webp',
          });
          cloudinaryImageUrl = uploadedImage.secure_url;
        }
    
        // Generate response using GPT-4 based on the text input (image optional)
        const gptResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
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
        
        if (error.code === 'insufficient_quota') {
          return res.status(403).json({ error: 'You have exceeded your quota. Please check your plan and billing details.' });
        }
      
        res.status(500).json({ error: 'Something went wrong with the image analysis.' });
      }
};



module.exports = {
  createImageAnalyzer,
};
