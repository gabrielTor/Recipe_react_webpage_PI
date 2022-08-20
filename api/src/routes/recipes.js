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

        let spoonApi = await axios.get(recipeUrl)
        .then(resp => resp.data)

        var hundredRecipes = []
        spoonApi.results.map(r => {
            hundredRecipes.push({
                name: r.title,
                id: r.id,
                summary: r.summary,
                steps: r.analyzedInstructions.length ? r.analyzedInstructions[0].steps : "There are no instructions.",
                healthScore: r.healthScore,
                image: r.image,
                diets: r.diets
            })
        })

        if(name){

        let spoonApi = await axios.get(recipeUrl)
        .then(resp => resp.data)

        let filteredRecipes = []

        spoonApi.results.map(r => {
            if(r.title.toLowerCase().includes(name.toLowerCase())) {
                filteredRecipes.push({
                    name: r.title,
                    id: r.id,
                    summary: r.summary,
                    steps: r.analyzedInstructions.length ? r.analyzedInstructions[0].steps : "There are no instructions.",
                    healthScore: r.healthScore,
                    image: r.image,
                    diets: r.diets
                })
            } 
        })

        const recipeDB =  await Recipe.findAll({ 
            include:{
                model: Diet_types,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        let dbRecipes = await recipeDB?.map(r => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                score: r.score,
                healthScore: r.healthScore,
                image: r.image,
                steps: r.steps,
                diets: r.diets?.map(diet => diet.name),
            }
        })

        let allRecipes = [...dbRecipes, ...filteredRecipes]
        // if(filteredRecipes.length > 0) return res.send(filteredRecipes)
        if(allRecipes.length > 0) return res.send(allRecipes)
        else{res.status(404).json({msg:'No recipe found with that name'})}
        } else{
            res.send(hundredRecipes)
        }
    }
    catch(err){
        next(err)
    }
})



router.get('/:recipeId', async (req, res, next) => {
    const { recipeId } = req.params
    try {
        if(String(recipeId).length === 36){
            let recipe = await Recipe.findByPk(recipeId)
            let diets = await recipe.getDiet_types()
            diets = diets.map(d => d.dataValues.name)
            if(recipe){
                return res.send({...recipe.dataValues, diets})
            }
        }
        else{
            let apiRecipeFound = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_key}`)
            let details = {
                name: apiRecipeFound.data.title,
                id: apiRecipeFound.data.id,
                summary: apiRecipeFound.data.summary,
                steps: apiRecipeFound.data.analyzedInstructions.length ? apiRecipeFound.data.analyzedInstructions[0].steps : "There are no instructions.",
                healthScore: apiRecipeFound.data.healthScore,
                image: apiRecipeFound.data.image,
                diets: apiRecipeFound.data.diets
            }
            return res.json(details)
        }
    } catch (err) {
        next(err)
    }
})



router.post('/', async (req, res, next) => {
    const { name, summary, steps, healthScore, image, diets } = req.body
    try {
        const newRecipe = await Recipe.create({
            name,
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