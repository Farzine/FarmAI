const multer = require('multer');
const cloudinary = require('./cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FarmAI', 
    format: async (req, file) => 'webp', 
    public_id: (req, file) => file.originalname.split('.')[0], 
  },
});


const upload = multer({ storage: storage });

module.exports = upload;
