const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');
const authRoutes = require('./auth/auth.route')
const influencerRoutes = require('./influencer/influencer.route');
const publicRoutes = require('./public/public.route');
const orderRoutes = require('./order/order.route');
const productRoutes = require('./product/product.route');
const ratingRoutes = require('./rating/rating.route');
//auth 
router.use(authRoutes);
//admin
router.use(adminRoutes)
//user
router.use(userRoutes);

//influencer
router.use(influencerRoutes);
//order
router.use(orderRoutes)
//product routes
router.use(productRoutes)
//public routes
router.use(publicRoutes)
//rating routes
router.use(ratingRoutes)
module.exports= router