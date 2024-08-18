const express = require('express');

const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');



const router = express.Router();

// Set up routes

router.use('/', authRoutes);
router.use('/admin', adminRoutes);


module.exports = router;
