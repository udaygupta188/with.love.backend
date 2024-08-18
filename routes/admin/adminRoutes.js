const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchema');
const categoryController = require('../../controllers/admin/categoryController');
const { verifyAdmin } = require('../../middleware/authMiddleware');



// Route to create a category
router.get('/categories/', categoryController.getAllCategories);

//Protected Routes
router.use(verifyAdmin);
// Route to create a new admin
router.post('/', adminController.createAdmin);
router.get('/details', adminController.getAdminDetails);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);


router.get('/categories/:id', categoryController.getCategoryById);
router.delete('/categories/:id', categoryController.deleteCategory);
router.post('/categories/create', categoryController.createCategory);
router.put('/categories/update/:id', categoryController.updateCategory);

module.exports = router;
