const express = require('express');
const router = express.Router();
const brandController = require('./brand.controller')

router.get('/brand/user-create-brand',brandController.createBrand);
 router.get('/brands/:brandId/other-products',brandController.brandsProduct)

module.exports = router