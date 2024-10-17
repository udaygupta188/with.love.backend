const express = require('express');
const router = express.Router();
const wishListController = require('./controller');

router.post('/wishlist', wishListController.addToWishlist);
router.get('/wishlist', wishListController.getWishlistItems);
router.delete('/wishlist/:id', wishListController.removeWishlistItem);
module.exports = router