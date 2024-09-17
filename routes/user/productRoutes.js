// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');

// Create a Product
router.post('/products', productController.createProduct);

// Get All Products
router.get('/products', productController.getAllProducts);

// Get Product by ID
router.get('/products/:id', productController.getProductById);

// Update Product
router.put('/products/:id', productController.updateProduct);

// Delete Product
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
