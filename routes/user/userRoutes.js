const express = require('express');
const router = express.Router();
const {verifyUser} = require('../../middleware/authMiddleware');
const userController = require('../../controllers/userController');

router.get('/profile',verifyUser,userController.getProfile);

module.exports =router;