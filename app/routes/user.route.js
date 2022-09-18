const User = require('../controllers/user.controller')
const router = require('express').Router()

router.get('/', User.home)
router.post('/profile', User.profile)
router.post('/addImage', User.addImage)

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/logout', User.logout)

router.post('/edit', User.edit)
router.post('/editPassowrd', User.editPassowrd)

router.get('/view', User.viewAll)
router.get('/view/:id', User.viewOne)

router.post('/activate', User.activate)
router.post('/deactivate', User.deactivate)

router.post('/delete', User.delete)


module.exports = router