const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const orderController = require('../order/order.controller')
const { validateProduct, styleProductSchema } = require('../../validation/productValidation');
const validationMiddleware = require('../../middleware/validationMiddleware');
const { checkFollowers } = require('../../utils');
const { upload } = require('../../utils/upload');
const { verifyUser } = require('../../middleware/authMiddleware');

// Create a Product
router.post('/products',upload.any() ,verifyUser, checkFollowers, [validateProduct],productController.createProduct);
// router.post(
//     '/products',
//     upload.any(), // 'image' should match the name of the file field in your form
//     (req, res, next) => {
//       if (!req.files) {
//         return res.status(400).json({ msg: 'No file uploaded!' });
//       }
//       next(); // Continue to the next middleware after successful upload
//     },
//     (err, req, res, next) => {
//         if (err) {
//           return res.status(500).json({ msg: `Internal Server Error: ${err.message}` });
//         }
//         next();
//       },
//     verifyUser,
//     checkFollowers,
//     [validateProduct],
//     productController.createProduct
//   );
// Get All Products
router.get('/products', productController.getAllProducts);

// Get Product by ID
router.get('/products/:id', productController.getProductById);

// Update Product
router.put('/products/:id', upload.any(),  productController.updateProduct);

// Delete Product
router.delete('/products/:id', productController.deleteProduct);

// Search Product


router.post('/add-style-recommendation',  validationMiddleware.validateRequest(styleProductSchema), productController.addStyleRecommendation);
//find other curators by product id
router.get('/other-curators/:id',productController.otherCurators);

router.get('/check-purchase',orderController.checkPurchase);

router.post('/add-review/:id', productController.addReviewOnProduct)

module.exports = router;
