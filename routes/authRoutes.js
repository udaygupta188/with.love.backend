
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/admin/login', authController.loginAdmin);

router.post('/user/register', userController.register);



module.exports = router;
