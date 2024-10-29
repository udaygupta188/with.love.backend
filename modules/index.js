const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');
const authRoutes = require('./auth/auth.route')
const influencerRoutes = require('./influencer/influencer.route');
const publicRoutes = require('./public/public.route');
const orderRoutes = require('./order/order.route');
const productRoutes = require('./product/product.route');

//admin
router.use(adminRoutes)
//user
router.use(userRoutes);
//auth 
router.use(authRoutes);
//influencer
router.use(influencerRoutes);
//order
router.use(orderRoutes)
//product routes
router.use(productRoutes)
//public routes
router.use(publicRoutes)

module.exports= router