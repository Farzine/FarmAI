const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    enum: ['seeds', 'insecticide', 'fertilizer', 'sapling', 'tools', 'other'],
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  }
  ,
  product_discount_price: {
    type: String,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
