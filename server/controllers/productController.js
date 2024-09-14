const cloudinary = require('../config/cloudinary');
const Product = require('../models/product');

exports.uploadProduct = async (req, res) => {
  try {
    const file = req.file;
    const { description, tag, product_name,product_price,product_discount_price } = req.body;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const product = new Product({
      path: file.path,
      public_id: file.filename,
      description,
      tag,
      product_name,
      product_price,
      product_discount_price
    });

    await product.save();
    res.status(200).json({ message: 'Product uploaded successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await cloudinary.uploader.destroy(product.public_id);
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


