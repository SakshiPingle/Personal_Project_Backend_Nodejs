const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController')

router.post('/register_user',UserController.RegisterUser);
router.post('/login_user',UserController.loginUser);
module.exports = router;