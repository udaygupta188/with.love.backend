const express = require('express');
const router = express.Router();
const adminProfileController = require('./adminProfile.controller');
const validationMiddleware = require('../../../middleware/validationMiddleware');
const userSchemas = require('../../../validation/userSchema')
router.post('/', adminProfileController.createAdmin);
router.get('/profile', adminProfileController.getAdminDetails);
router.put('/update-profile', adminProfileController.updateProfile);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminProfileController.changePassword
);
module.exports = router;