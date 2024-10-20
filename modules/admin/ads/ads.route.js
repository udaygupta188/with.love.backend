const express = require('express');
const { verifyAdmin } = require('../../../middleware/authMiddleware');
const router = express.Router();
const adsController = require('./ads.controller');
router.use(verifyAdmin);

router.post('/create-add', adsController.createAds)
router.post('/update-add/:id', adsController.updateAds)
router.post('/delete-add::id', adsController.deleteAds)

module.exports = router