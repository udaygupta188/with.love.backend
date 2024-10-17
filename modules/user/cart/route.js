const express = require('express');
const router = express.Router();
const cartController = require('./controller');
const { cartItemValidationSchema } = require("../../../validation/cartValidation");
const { validateRequest } = require('../../../middleware/validationMiddleware');
const { verifyUser } = require('../../../middleware/authMiddleware');

// POST /cart - Add item to cart
router.post('/cart', verifyUser, validateRequest(cartItemValidationSchema), cartController.addProductToCart);

// GET /cart/:userId - Get cart for a user
router.get('/cart',verifyUser, cartController.getCartItems);

// PUT /cart/item/:productId - Update cart item quantity
router.put('/cart/item/:productId',verifyUser, cartController.updateProductQuantityInCart);

// DELETE /cart/item/:productId - Remove item from cart
router.delete('/cart/item/:productId',verifyUser,  cartController.removeProductFromCart);

// DELETE /cart/:userId - Clear cart
router.delete('/cart/',verifyUser,  cartController.emptyCart);

module.exports = router;
