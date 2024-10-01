const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const validationMiddleware = require('../../middleware/validationMiddleware');
const userSchemas = require('../../validation/userSchema');
const categoryController = require('../../controllers/admin/categoryController');
const brandController = require('../../controllers/admin/brandController');
const generalSettingController = require('../../controllers/admin/generalSettingController');
const roleController = require('../../controllers/admin/roleController');
const { verifyAdmin } = require('../../middleware/authMiddleware');
const { roleSchema } = require('../../validation/roleValidation');


// Route to create a category
router.get('/categories/', categoryController.getAllCategories);
router.get('/brands/', brandController.getBrands);


//|-------------------Protected Routes------------------------|
router.use(verifyAdmin);

router.post('/', adminController.createAdmin);
router.get('/profile', adminController.getAdminDetails);
router.put('/update-profile', adminController.updateProfile);

router.post(
    '/change-password',
    validationMiddleware.validateRequest(userSchemas.resetPasswordSchema),
    adminController.changePassword
);

//Category
router.get('/categories/:id', categoryController.getCategoryById);
router.delete('/categories/:id', categoryController.deleteCategory);
router.post('/categories/create', categoryController.createCategory);
router.put('/categories/update/:id', categoryController.updateCategory);


//Brands
router.post('/brand/create', brandController.createBrand);
router.get('/brand/:id', brandController.getBrandById);
router.put('/brand/:id', brandController.updateBrand);
router.delete('/brand/:id', brandController.deleteBrand);

//Settings
router.post('/add-setting', generalSettingController.createGeneralSetting);
router.get('/fetch-all-settings', generalSettingController.getAllGeneralSettings);
router.get('/setting/:id', generalSettingController.getGeneralSettingById);
router.put('/update-setting/:id', generalSettingController.updateGeneralSetting);
router.delete('/remove-setting/:id', generalSettingController.deleteGeneralSetting);

//roles
router.post('/add-role',validationMiddleware.validateRequest(roleSchema),roleController.createRole);
router.put('/update-role/:id',roleController.updateRole);
router.get('/fetch-all-role',roleController.getAllRoles);
router.get('/role/:id',roleController.getRoleById);
router.delete('/role/:id',roleController.deleteRole);

module.exports = router;
