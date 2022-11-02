const { Router } = require('express');
const router = Router();
const {getRecipes, getDetails, createRecipe, editRecipe, deleteRecipe} = require('../controllers/controllers');
const verifyJWT = require('../verifyJWT');

router.get('/', getRecipes)

router.get('/:recipeId', /*verifyJWT,*/ getDetails)

router.post('/', /*verifyJWT,*/ createRecipe)

router.put('/edit/:id', editRecipe)

router.delete('/:id', deleteRecipe)

module.exports = router;