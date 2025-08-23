const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController')

router.post('register_user',UserController.RegisterUser);
router.get('login_user',UserController.loginUser);
router.put('update_user',UserController.UpdateUser)

module.exports = router;