const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const { validateProduct, styleProductSchema } = require('../../validation/productValidation');
const validationMiddleware = require('../../middleware/validationMiddleware');
// Create a Product
router.post('/products', validateProduct, productController.createProduct);

// Get All Products
router.get('/products', productController.getAllProducts);

// Get Product by ID
router.get('/products/:id', productController.getProductById);

// Update Product
router.put('/products/:id',  productController.updateProduct);

// Delete Product
router.delete('/products/:id', productController.deleteProduct);

// Search Product


router.post('/add-style-recommendation',  validationMiddleware.validateRequest(styleProductSchema), productController.addStyleRecommendation);

module.exports = router;
