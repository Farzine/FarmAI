const cloudinary = require('../../config/cloudinary');
const ExpertAdvice = require('../../models/ExpertiseAdvice');

exports.uploadExpertAdvice = async (req, res) => {
    try {
      const file = req.file;
      const { description,  title } = req.body;

  
      if (!file && !req.body.image) {
        return res.status(400).json({ message: 'No Expert Advice uploaded', success: false });
      }
  
      const expertAdvice = new ExpertAdvice({
        path: file ? file.path : req.body.image,
        public_id: file ? file.filename : null,
        description,
        title: title,
      });
  
      await expertAdvice.save();
      res.status(200).json({ message: 'Expert Advice uploaded successfully', expertAdvice, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error',success: false });
    }
  };



  exports.deleteExpertAdvice = async (req, res) => {
    try {
      const { id } = req.params;
      const expertAdvice = await ExpertAdvice.findById(id);
  
      if (!expertAdvice) {
        return res.status(404).json({ message: 'Expert Advice not found', success: false });
      }
  
      await cloudinary.uploader.destroy(expertAdvice.public_id);
      await ExpertAdvice.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Expert Advice deleted successfully', success: true });
    } catch (err) {
      res.status(500).json({ message: 'Server error', success: false });
    }
  };
  

  exports.getExpertAdvice = async (req, res) => {
    try {
      const expertAdvice = await ExpertAdvice.find();
      res.status(200).json({ success:true, expertAdvice});
    } catch (err) {
      res.status(500).json({ message: 'Server error', success: false });
    }
  };

  exports.editExpertAdvice = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, title, image } = req.body;
      const file = req.file;
  
      const expertAdvice = await ExpertAdvice.findById(id);
  
      if (!expertAdvice) {
        return res.status(404).json({ message: 'ExpertAdvice not found', success: false });
      }
  
      expertAdvice.description = description || expertAdvice.description;
      expertAdvice.title = title || expertAdvice.title;
  
      if (file) {
        await cloudinary.uploader.destroy(expertAdvice.public_id);
  
        expertAdvice.path = file.path;
        expertAdvice.public_id = file.filename;
      }else if(image){
        expertAdvice.path = image;
      }
  
      await expertAdvice.save();
  
      res.status(200).json({ message: 'ExpertAdvice updated successfully', expertAdvice, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', success: false });
    }
  };
  