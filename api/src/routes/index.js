const { Router } = require('express');
const recipes_Router = require('./recipes')
const diets_Router = require('./diets')
const user_Router = require('./users');
// const verifyJWT = require('../verifyJWT');
const router = Router();

router.use('/user', user_Router)
// router.use(verifyJWT)
router.use('/recipes', recipes_Router)
router.use('/diets', diets_Router)


module.exports = router;
