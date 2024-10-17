const express = require('express');
const router = express.Router();
const brandRoutes = require('./brand/route');
const cartRoutes = require('./cart/route');
const userProfileRoutes = require('./userProfile/route')
const wishListRoutes = require('./wishList/route');

//user
router.use(brandRoutes);
router.use(cartRoutes);
router.use(userProfileRoutes)
router.use(wishListRoutes);

module.exports = router