const express = require('express')
const router = express.Router();
const {registerUser,loginUser,recover} = require('../Controllers/userController')

router.post('/user-register',registerUser)
router.post('/user-login',loginUser)
router.post('/recover-password',recover)


module.exports = router;