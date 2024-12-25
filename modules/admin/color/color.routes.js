const express = require('express');
const router = express.Router();
const colorController = require('./color.controller')

router.post('/create-color', colorController.createColor);
router.get('/get-color', colorController.getColors);
router.put('/update-color/:id', colorController.updateColor);
router.delete('/delete-color/:id', colorController.deleteColor);


module.exports = router