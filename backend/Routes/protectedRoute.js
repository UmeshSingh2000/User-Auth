const express= require('express')
const router = express.Router();
const authMiddleware = require('../Middlewares/protected')
const {homepage} = require('../Controllers/protectedController')

router.get('/',authMiddleware,homepage)
module.exports = router;