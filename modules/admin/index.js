const express = require('express');

const adminProfile = require('./adminProfile/route');
const brand = require('./brand/route');
const category = require('./category/route');
const role = require('./role/route');


const router = express.Router();

// Set up routes

router.use('/admin', adminProfile);
router.use('/admin', brand);
router.use('/admin', category);
router.use('/admin', role);



module.exports = router;
