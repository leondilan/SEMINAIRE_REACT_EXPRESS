const express = require('express')
const router = express.Router()
const HomeController = require('../Controller/HomeController')
const AuthController = require('../Controller/AuthController')

router.get('/',HomeController.home)


router.post('/register',AuthController.register)
router.post('/login',AuthController.login)

module.exports = router