const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const productRoutes = require('./productRoutes');

const {verifyUser} = require('../../middleware/authMiddleware');
const { socialMediaSchema } = require('../../validation/userSchema');
const { checkFollowers } = require('../../utils');
const validateSocialDetail = require('../../validation/socialDetailValidation');

router.get('/profile',verifyUser,userController.getProfile);
router.put('/profile-update', verifyUser, userController.updateProfile);
router.post('/follow/:targetUserId', verifyUser, userController.followUser);
router.post('/unfollow/:id', verifyUser, userController.unfollowUser);
router.post("/become-curator", verifyUser,checkFollowers, userController.becomeCurator);
router.get('/brand-interactions',validateSocialDetail, verifyUser, userController.brandInteractions);
router.post('/add-social-detail',validateSocialDetail, verifyUser, userController.addSocialMedia)
router.use('/',verifyUser,productRoutes)



module.exports =router;