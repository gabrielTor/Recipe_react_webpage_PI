const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/dietsControllers')

router.get('/', getDiets)

module.exports = router;