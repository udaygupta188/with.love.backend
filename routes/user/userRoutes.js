const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const productRoutes = require('./productRoutes');

const {verifyUser} = require('../../middleware/authMiddleware');

router.get('/profile',verifyUser,userController.getProfile);
router.put('/profile-update', verifyUser, userController.updateProfile);
router.post('/follow/:targetUserId', verifyUser, userController.followUser);
router.post('/unfollow/:id', verifyUser, userController.unfollowUser);

router.use('/',verifyUser,productRoutes)


module.exports =router;