// services/productService.js
const Product = require('../models/productModel');

// Create Product
exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Get All Products
exports.getAllProducts = async () => {
  return await Product.find().populate('brand influencer categories');
};

// Get Product by ID
exports.getProductById = async (id) => {
  return await Product.findById(id).populate('brand influencer categories');
};

// Update Product
exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete Product
exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
