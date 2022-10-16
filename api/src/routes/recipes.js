const { Router } = require('express');
const router = Router();
const {getRecipes, getDetails, createRecipe, editRecipe, deleteRecipe} = require('./controllers')

router.get('/', getRecipes)

router.get('/:recipeId', getDetails)

router.post('/', createRecipe)

router.put('/edit/:id', editRecipe)

router.delete('/:id', deleteRecipe)

module.exports = router;