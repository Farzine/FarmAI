const cloudinary = require('../config/cloudinary');
const ScientificCultivationMethods = require('../models/scientificCultivationMethods');

exports.uploadScientificCultivationMethods = async (req, res) => {
  try {
    const file = req.file;
    const { description, crop_name } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No scientific cultivation methods uploaded' });
    }

    const scientificCultivationMethods = new ScientificCultivationMethods({
      path: file.path,
      public_id: file.filename,
      description,
      crop_name,
    });

    await scientificCultivationMethods.save();
    res.status(200).json({ message: 'Scientific Cultivation Methods uploaded successfully', scientificCultivationMethods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteScientificCultivationMethods = async (req, res) => {
  try {
    const { id } = req.params;
    const scientificCultivationMethods = await ScientificCultivationMethods.findById(id);

    if (!scientificCultivationMethods) {
      return res.status(404).json({ message: 'Scientific Cultivation Method not found' });
    }

    await cloudinary.uploader.destroy(scientificCultivationMethods.public_id);
    await ScientificCultivationMethods.findByIdAndDelete(id);

    res.status(200).json({ message: 'Scientific Cultivation Method deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getScientificCultivationMethods = async (req, res) => {
  try {
    const scientificCultivationMethods = await ScientificCultivationMethods.find();
    res.status(200).json(scientificCultivationMethods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
