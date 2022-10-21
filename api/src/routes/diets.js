const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/controllers')

router.get('/', getDiets)

module.exports = router;