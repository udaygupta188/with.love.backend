const express = require('express');

const adminProfile = require('./adminProfile/adminProfile.route');
const brand = require('./brand/brand.route');
const category = require('./category/category.route');
const role = require('./role/role.route');
const subRoutes = require('./subRole/subRole.route');
const ads = require('./ads/ads.route');
const requestsRoutes = require('./requests/requests.route')
const router = express.Router();

// Set up routes

router.use('/admin', adminProfile);
router.use('/admin', brand);
router.use('/admin', category);
router.use('/admin', role);
router.use('/admin', subRoutes)
router.use('/admin',ads);
router.use('/admin', requestsRoutes);


module.exports = router;
