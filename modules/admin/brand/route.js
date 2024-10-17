//Category
const express = require('express');
const router = express.Router();
const brandController = require('./controller');
const { verifyAdmin } = require('../../../middleware/authMiddleware');
//Brands
router.get('/brands/', brandController.getBrands);

router.use(verifyAdmin);

router.post('/brand/create', brandController.createBrand);
router.get('/brand/:id', brandController.getBrandById);
router.put('/brand/:id', brandController.updateBrand);
router.delete('/brand/:id', brandController.deleteBrand);

module.exports = router;