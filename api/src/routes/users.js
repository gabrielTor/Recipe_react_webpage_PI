const { Router } = require('express');
const router = Router();
const {register, login, handleRefresh, logout} = require('../controllers/userController')

router.get('/refresh', handleRefresh)
router.get('/logout', logout)
router.post('/', register)
router.post('/login', login)


module.exports = router;