
const ImageAnalyzer = require('../models/ImageAnalyzer');
const cloudinary = require('../config/cloudinary');
const path = require('path');
const fs = require('fs');
const multer = require('multer'); 
const axios = require('axios'); 
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_NAFI,
});

const createImageAnalyzer = async (req, res) => {
  try {
    const { userInputText } = req.body;
    const imageFile = req.file; 

    let cloudinaryImageUrl = null;
    let generatedImageUrl = null;

  
    if (imageFile) {
      const allowedMimeTypes = ['image/jpeg', 'image/png'];
      if (!allowedMimeTypes.includes(imageFile.mimetype)) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Unsupported MIME type. Please upload JPG or PNG images.' });
      }

      const ext = path.extname(imageFile.originalname).slice(1).toLowerCase();
      const allowedFormats = ['jpg', 'jpeg', 'png'];
      if (!allowedFormats.includes(ext)) {
        fs.unlinkSync(imageFile.path);
        return res.status(400).json({ error: 'Unsupported file format. Please upload JPG or PNG images.' });
      }

      const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'FarmAIgpt4',
        format: ext,
      });
      cloudinaryImageUrl = uploadedImage.secure_url;
    }
    

   // Build messages array based on availability of the image URL
   const messages = [
    { "role": "user", "content": { "type": "text", "text": userInputText } }
  ];

  if (cloudinaryImageUrl) {
    messages.push({
      "type": "image_url",
      "image_url": { "url": cloudinaryImageUrl }
    });
  }

  // Make OpenAI API request for chat completion
  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": userInputText },
          {
            "type": "image_url",
            "image_url": {
              "url": cloudinaryImageUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  });


    const gptText = gptResponse.choices[0].message.content;

    const prompt = `${userInputText}. Also, consider this:- ${gptText.substring(0, 200)}`;
    if (imageFile) {
      const generatedImage = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      });

      generatedImageUrl = generatedImage.data[0].url;

      // Download the AI-generated image
      const imageResponse = await axios({
        url: generatedImageUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const fileName = `generated_${Date.now()}.png`;
      const filePath = path.join(__dirname, '../uploads', fileName);
      

      const writer = fs.createWriteStream(filePath);
      imageResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      const uploadedGeneratedImage = await cloudinary.uploader.upload(filePath, {
        folder: 'FarmAIgpt4',
        format: 'png',
      });

      generatedImageUrl = uploadedGeneratedImage.secure_url;

      fs.unlinkSync(filePath);
    }


    const newEntry = new ImageAnalyzer({
      userInputText,
      cloudinaryImageUrl: cloudinaryImageUrl || '',
      gptResponse: gptText,
      generatedImageUrl: generatedImageUrl || '',
    });

    await newEntry.save();

    res.status(201).json({
      message: 'Image analysis complete!',
      data: newEntry,
    });
  } catch (error) {
    console.error(error);

    if (error.response) {
      const { status, data } = error.response;
      if (status === 400 && data.error.code === 'model_not_found') {
        return res.status(400).json({ error: 'The specified model does not exist or you do not have access to it. Please verify your OpenAI subscription and model name.' });
      }

      if (data.error.code === 'insufficient_quota') {
        return res.status(403).json({ error: 'You have exceeded your quota. Please check your plan and billing details.' });
      }

      return res.status(status).json({ error: data.error.message });
    }

    if (error instanceof multer.MulterError) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Something went wrong with the image analysis.' });
  }
};

module.exports = {
  createImageAnalyzer,
};
