const express = require('express')
const router = express.Router();
const {registerUser,loginUser,recover,checkOtp,updatePassword} = require('../Controllers/userController')

router.post('/user-register',registerUser)
router.post('/user-login',loginUser)
router.post('/recover-password',recover)
router.post('/recover-password/verify-otp',checkOtp)
router.post('/updatePassword',updatePassword)



module.exports = router;