
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { sendTestEmail } = require('../controllers/emailController');
const {verifyUser} = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/admin/login', authController.loginAdmin);

router.post('/user/register', userController.register);

// Forgot Password route for logged-in users
router.post('/user/forgot-password', verifyUser, authController.forgotPassword);

router.post('/test-email', sendTestEmail);


module.exports = router;
