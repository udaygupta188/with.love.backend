const express = require('express');
const { subRoleSchema } = require('../../../validation/roleValidation');
const router = express.Router();
const validationMiddleware = require('../../../middleware/validationMiddleware');
const subRoleController = require('./subRole.controller');


router.post('/sub-role',validationMiddleware.validateRequest(subRoleSchema),subRoleController.createSubRole);
router.get('/sub-role/:id',subRoleController.getSubRoles);

module.exports = router