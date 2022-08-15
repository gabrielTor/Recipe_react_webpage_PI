const { Router } = require('express');
// Importar todos los routers;
const recipes_Router = require('./recipes')
const diets_Router = require('./diets')
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes_Router)
router.use('/diets', diets_Router)


module.exports = router;


//https://api.spoonacular.com/recipes/716429/information?apiKey=5ac2284383764e7fb51efd184167d806

// https://api.spoonacular.com/recipes/complexSearch/?apiKey=5ac2284383764e7fb51efd184167d806

// https://api.spoonacular.com/recipes/complexSearch?apiKey=5ac2284383764e7fb51efd184167d806&addRecipeInformation=true&number=9