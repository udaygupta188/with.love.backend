const express = require('express');

const adminRoutes = require('./admin/adminRoutes');
const authRoutes = require('./authRoutes');

const { verifyAdmin } = require('../middleware/authMiddleware');



const router = express.Router();

// Set up routes

router.use('/', authRoutes);
router.use('/admin', verifyAdmin, adminRoutes);


module.exports = router;
