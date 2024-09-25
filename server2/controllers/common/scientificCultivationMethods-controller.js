const cloudinary = require('../../config/cloudinary');
const ScientificCultivationMethods = require('../../models/ScientificCultivationMethods');

exports.uploadScientificCultivationMethods = async (req, res) => {
    try {
      const file = req.file;
      const { description, crop_name } = req.body;

      console.log(req.body, file);
  
      if (!file && !req.body.image) {
        return res.status(400).json({ message: 'No scientific cultivation methods uploaded', success: false });
      }
  
      const scientificCultivationMethods = new ScientificCultivationMethods({
        path: file ? file.path : req.body.image,
        public_id: file ? file.filename : null,
        description,
        crop_name,
      });
  
      await scientificCultivationMethods.save();
      res.status(200).json({ message: 'Scientific Cultivation Methods uploaded successfully', scientificCultivationMethods, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error',success: false });
    }
  };



  exports.deleteScientificCultivationMethods = async (req, res) => {
    try {
      const { id } = req.params;
      const scientificCultivationMethods = await ScientificCultivationMethods.findById(id);
  
      if (!scientificCultivationMethods) {
        return res.status(404).json({ message: 'Scientific Cultivation Method not found', success: false });
      }
  
      await cloudinary.uploader.destroy(scientificCultivationMethods.public_id);
      await ScientificCultivationMethods.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Scientific Cultivation Method deleted successfully', success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', success: false });
    }
  };
  

  exports.getScientificCultivationMethods = async (req, res) => {
    try {
      const scientificCultivationMethods = await ScientificCultivationMethods.find();
      res.status(200).json({ success:true, scientificCultivationMethods});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', success: false });
    }
  };

  exports.editScientificCultivationMethods = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, crop_name, image } = req.body;
      const file = req.file;
  
      const scientificCultivationMethods = await ScientificCultivationMethods.findById(id);
  
      if (!scientificCultivationMethods) {
        return res.status(404).json({ message: 'Scientific Cultivation Method not found', success: false });
      }
  
      scientificCultivationMethods.description = description || scientificCultivationMethods.description;
      scientificCultivationMethods.crop_name = crop_name || scientificCultivationMethods.crop_name;
  
      if (file) {
        await cloudinary.uploader.destroy(scientificCultivationMethods.public_id);
  
        scientificCultivationMethods.path = file.path;
        scientificCultivationMethods.public_id = file.filename;
      }else if(image){
        scientificCultivationMethods.path = image;
      }
  
      await scientificCultivationMethods.save();
  
      res.status(200).json({ message: 'Scientific Cultivation Method updated successfully', scientificCultivationMethods, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', success: false });
    }
  };
  