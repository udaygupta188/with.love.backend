
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const userController = require('../user/userProfile/userProfile.controller');
const { sendTestEmail } = require('../../controllers/emailController');
const {verifyUser} = require('../../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/admin/login', authController.loginAdmin);

router.post('/user/register', userController.register);

// Forgot Password route for logged-in users
router.post('/user/forgot-password', verifyUser, authController.forgotPassword);

// Route for resetting password
router.post('/user/reset-password', authController.resetPassword);
router.get('/suggest-username', userController.suggestUsername);

router.post('/test-email', sendTestEmail);


module.exports = router;
