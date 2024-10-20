const express = require('express');
const router = express.Router();
const brandRoutes = require('./brand/brand.route');
const cartRoutes = require('./cart/cart.route');
const userProfileRoutes = require('./userProfile/userProfile.route')
const wishListRoutes = require('./wishList/wishList.route');

//user
router.use(brandRoutes);
router.use(cartRoutes);
router.use(userProfileRoutes)
router.use(wishListRoutes);

module.exports = router