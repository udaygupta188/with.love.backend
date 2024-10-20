const express = require('express');
const { roleSchema } = require('../../../validation/roleValidation');
const router = express.Router();
const validationMiddleware = require('../../../middleware/validationMiddleware');
const roleController = require('./role.controller');

router.get('/fetch-roles',roleController.getAllRoles);

router.post('/add-role',validationMiddleware.validateRequest(roleSchema),roleController.createRole);
router.put('/update-role/:id',roleController.updateRole);
router.get('/fetch-all-role',roleController.getAllRoles);
router.get('/role/:id',roleController.getRoleById);
router.delete('/role/:id',roleController.deleteRole);


module.exports = router