const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin/index');
const userRoutes = require('./user/index');
const authRoutes = require('./auth/auth.route')
const influencerRoutes = require('./influencer/influencer.route');
const publicRoutes = require('./public/public.route');

//admin
router.use(adminRoutes)
//user
router.use(userRoutes);
//auth 
router.use(authRoutes);
//influencer
router.use( influencerRoutes);
//public routes
router.use(publicRoutes)

module.exports= router