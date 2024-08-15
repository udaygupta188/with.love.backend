const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchema');

// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);

module.exports = router;
