// controllers/productController.js
const productService = require('../services/productService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Assuming you have imported the helper functions
// Create Product
const createProduct = async (req, res) => {
    console.log(req.body)
  try {
    const product = await productService.createProduct(req.body);
    return apiSuccessResponse(res, 'Product created successfully', product, HTTP_STATUS.CREATED);
  } catch (error) {
    return apiErrorResponse(res, 'Product creation failed', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return apiSuccessResponse(res, 'Products fetched successfully', products, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Failed to fetch products', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return apiErrorResponse(res, 'Product not found', null, HTTP_STATUS.NOT_FOUND)
    }
    return apiSuccessResponse(res, 'Product fetched successfully', product, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Failed to fetch product', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      return apiErrorResponse(res, 'Product not found', null, HTTP_STATUS.NOT_FOUND)
    }
    return apiSuccessResponse(res, 'Product updated successfully', updatedProduct, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Failed to update product', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      // return res.status(404).json({ message: 'Product not found' });
      return apiErrorResponse(res, 'Product not found', null, HTTP_STATUS.NOT_FOUND)
    }
    // res.status(204).json({ message: 'Product deleted successfully' });
    return apiSuccessResponse(res, 'Product deleted successfully', null, 204);
  } catch (error) {
    // res.status(500).json({ error: 'Failed to delete product' });
    return apiErrorResponse(res, 'Failed to delete product', null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
};

const addStyleRecommendation = async(req, res)=>{
  try {
    const styleRecommendation =await productService.addStyleRecommendation(req.body);
    return apiSuccessResponse(res, "Style product added successfully", styleRecommendation, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Failed to add style recommended product', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    addStyleRecommendation
}