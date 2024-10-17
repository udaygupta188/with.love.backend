const express = require('express');
const router = express.Router();
const userController = require('./controller');

const { checkFollowers } = require('../../../utils');
const validateSocialDetail = require('../../../validation/socialDetailValidation');
const { verifyUser } = require('../../../middleware/authMiddleware');

router.get('/profile',verifyUser,userController.getProfile);
router.put('/profile-update', verifyUser, userController.updateProfile);
router.post('/follow/:targetUserId', verifyUser, userController.followUser);
router.post('/unfollow/:id', verifyUser, userController.unfollowUser);
router.post("/become-curator", verifyUser,checkFollowers, userController.becomeCurator);
router.get('/brand-interactions',validateSocialDetail, verifyUser, userController.brandInteractions);
router.post('/add-social-detail',validateSocialDetail, verifyUser, userController.addSocialMedia)




module.exports =router;