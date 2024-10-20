//Category
const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const { verifyAdmin } = require('../../../middleware/authMiddleware');

router.get('/categories/', categoryController.getAllCategories);
router.use(verifyAdmin);

router.get('/categories/:id', categoryController.getCategoryById);
router.delete('/categories/:id', categoryController.deleteCategory);
router.post('/categories/create', categoryController.createCategory);
router.put('/categories/update/:id', categoryController.updateCategory);

module.exports = router;