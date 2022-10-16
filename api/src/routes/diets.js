const { Router } = require('express');
const router = Router();
const { getDiets } = require('./controllers')

router.get('/', getDiets)

module.exports = router;