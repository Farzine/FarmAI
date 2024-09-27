const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Extract the file extension
    const ext = path.extname(file.originalname).toLowerCase().slice(1); // e.g., 'jpg', 'png'

    // Define allowed formats
    const allowedFormats = ['jpg', 'jpeg', 'png'];

    if (!allowedFormats.includes(ext)) {
      throw new Error('Unsupported file format. Please upload JPG or PNG images.');
    }

    return {
      folder: 'FarmAI',
      format: ext, // Retain original format
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Optional: limit file size to 1MB
  fileFilter: (req, file, cb) => {
    // Validate MIME types
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported MIME type. Please upload JPG or PNG images.'), false);
    }
  },
});

module.exports = upload;
