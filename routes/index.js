const express = require('express');

const adminRoutes = require('./admin/adminRoutes');
const userRoutes = require('./user/userRoutes');
const authRoutes = require('./authRoutes');
const generalRoutes = require('./generalRoutes');
const influencerRoutes = require('./influencerRoutes');



const router = express.Router();

// Set up routes
router.use('/', authRoutes);
router.use('/', generalRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/influencer', influencerRoutes)


module.exports = router;
