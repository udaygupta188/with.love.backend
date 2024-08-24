const express = require('express');

const adminRoutes = require('./admin/adminRoutes');
const userRoutes = require('./user/userRoutes');
const authRoutes = require('./authRoutes');



const router = express.Router();

// Set up routes
router.use('/', authRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);


module.exports = router;
