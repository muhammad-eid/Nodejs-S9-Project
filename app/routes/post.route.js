const User = require('../controllers/user.controller')
const router = require('express').Router()

router.post('/createPost', User.createPost)

module.exports = router