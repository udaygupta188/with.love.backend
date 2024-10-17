const express = require('express');
const router = express.Router();
const influencerController = require('./controller');

router.get('/fetch-influencer-brands/:userId', influencerController.getInfluencerBrands);
router.get('/fetch-all-influencer',influencerController.getAllInfluencer );
router.post('/add-brand',influencerController.addBrand);

module.exports = router
