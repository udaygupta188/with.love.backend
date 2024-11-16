
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const userController = require('../user/userProfile/userProfile.controller');
const brandController = require('../user/brand/brand.controller')
const { sendTestEmail } = require('../../controllers/emailController');
const { verifyUser } = require('../../middleware/authMiddleware');
const { basicInfoSchema, validateOtpScehma, setPasswordSchema, selectUserTypeSchema, selectSubRoleSchema } = require('../../validation/userSchema');
const validationMiddleware = require('../../middleware/validationMiddleware')

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/admin/login', authController.loginAdmin);

// router.post('/user/register', userController.register);

// Forgot Password route for logged-in users
router.post('/user/forgot-password', verifyUser, authController.forgotPassword);

// Route for resetting password
router.post('/user/reset-password', authController.resetPassword);
router.get('/suggest-username', userController.suggestUsername);

router.post('/test-email', sendTestEmail);

router.post('/user/register', validationMiddleware.validateRequest(basicInfoSchema), userController.registeration);
router.post('/validate-otp',validationMiddleware.validateRequest(validateOtpScehma), userController.validateOtp);
router.post('/set-password', validationMiddleware.validateRequest(setPasswordSchema),userController.setPassword);
router.post('/select-user-type',validationMiddleware.validateRequest(selectUserTypeSchema), userController.selectUserType)
router.post('/select-sub-role',validationMiddleware.validateRequest(selectSubRoleSchema), userController.selectSubRole)


module.exports = router;
