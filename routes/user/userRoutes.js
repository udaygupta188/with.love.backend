const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const {verifyUser} = require('../../middleware/authMiddleware');

router.get('/profile',verifyUser,userController.getProfile);

module.exports =router;