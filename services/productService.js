// services/productService.js
const HowToStyle = require('../models/howToStyleModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
// Create Product
exports.createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Get All Products
exports.getAllProducts = async (filter, sortBy) => {
  return await Product.find(filter).populate('brand influencer categories').sort(sortBy ? { [sortBy]: 1 } : {});;
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

exports.addStyleRecommendation = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the product already has a style recommendation
    const product = await Product.findById(data.productId).populate('styleRecommendations').session(session);

    let styleRecommendation;
    if (product.styleRecommendations) {
      // Update the existing style recommendation
      styleRecommendation = await HowToStyle.findByIdAndUpdate(
        product.styleRecommendations._id, // Update existing recommendation
        data,
        { new: true, session }
      );
      
    } else {
      // Create a new style recommendation
      styleRecommendation = new HowToStyle(data);
      await styleRecommendation.save({ session });
      
      // Link the new style recommendation to the product
      product.styleRecommendations = styleRecommendation._id;
      await product.save({ session });
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return styleRecommendation;
  } catch (error) {
    console.log("error",error)
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Error adding/updating style recommendation: ${error.message}`);
  }
};

