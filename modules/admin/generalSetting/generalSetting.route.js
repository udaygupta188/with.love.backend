const express = require('express');
const router = express.Router();
const generalSettingController = require('./generalSetting.controller')
//Settings
router.post('/add-setting', generalSettingController.createGeneralSetting);
router.get('/fetch-all-settings', generalSettingController.getAllGeneralSettings);
router.get('/setting/:id', generalSettingController.getGeneralSettingById);
router.put('/update-setting/:id', generalSettingController.updateGeneralSetting);
router.delete('/remove-setting/:id', generalSettingController.deleteGeneralSetting);

module.exports = router