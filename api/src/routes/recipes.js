const { Router } = require('express');
const router = Router();
const axios = require('axios')
const {Recipe, Diet_types} = require('../db')
require('dotenv').config();
const { API_key } = process.env;
const recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&addRecipeInformation=true&number=100`;

router.get('/', async (req, res, next) => {
    const { name } = req.query
    try{
        let spoonApi= await axios.get(recipeUrl)
        .then(resp => resp.data)

        let filteredRecipes = [];

        spoonApi.results.map(r => {
            if(r.title.toLowerCase().includes(name.toLowerCase())) {
                filteredRecipes.push({
                    title: r.title,
                    id: r.id,
                    summary: r.summary,
                    steps: r.analyzedInstructions.length ? r.analyzedInstructions[0].steps : "There are no instructions.",
                    healthScore: r.healthScore,
                    image: r.image,
                    diets: r.diets
                })
            } 
        })
    // let recipes = [...dbRecipes, ...filteredRecipes]
        if(filteredRecipes.length > 0) return res.send(filteredRecipes)
    }
    catch(err){
        next(err)
    }
})

router.get('/:recipeId', async (req, res, next) => {
    const { recipeId } = req.params
    try {
        let recipe = await Recipe.findByPk(recipeId)
        let diets = await recipe.getDiet_types()
        diets = diets.map(d => d.dataValues.name)
        if(recipe){
            return res.send({...recipe.dataValues, diets})
        } else{
            let apiRecipeFound = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_key}`)
            let details = {
                title: apiRecipeFound.title,
                id: apiRecipeFound.id,
                summary: apiRecipeFound.summary,
                steps: apiRecipeFound.analyzedInstructions.length ? apiRecipeFound.analyzedInstructions[0].steps : "There are no instructions.",
                healthScore: apiRecipeFound.healthScore,
                image: apiRecipeFound.image,
                diets: apiRecipeFound.diets
            }
            return res.json(details)
        }
    } catch (err) {
        next(err)
    }
})

router.post('/', (req, res, next) => {
    const { title, summary, steps, healthScore, image, diets } = req.body
    try {
        const newRecipe = await Recipe.create({
            title,
            summary,
            steps,
            healthScore,
            image,
            diets
        })

        res.json(newRecipe)

    } catch (err) {
        next(err)
    }
})

module.exports = router;