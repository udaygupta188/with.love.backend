const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');
const roleController = require("../controllers/admin/roleController");

router.get('/countries', countryController.getCountries);
router.get('/fetch-roles',roleController.getAllRoles);
module.exports = router;