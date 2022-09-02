const { Router } = require('express');
const router = Router();
const axios = require('axios')
const {Recipe, DietTypes} = require('../db')
require('dotenv').config();
const { API_key } = process.env;
const recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&addRecipeInformation=true&number=100`;

router.get('/', async (req, res, next) => {
    const { name } = req.query
    try{
        // const spoonApi = await axios.get(recipeUrl)
        // const response = await spoonApi.data

        // const hundredRecipes = response.results.map(r => {
        //     return {
        //         name: r.title,
        //         summary: r.summary,
        //         // steps: r.analyzedInstructions.length ? r.analyzedInstructions[0].steps : "There are no instructions.",
        //         healthScore: r.healthScore,
        //         image: r.image,
        //         // dishTypes: r.dishTypes,
        //         // diets: r.diets
        //     }
        // })
        // await Recipe.bulkCreate(hundredRecipes)

        const recipeDB = await Recipe.findAll({ include: DietTypes })
        let dbRecipes = await recipeDB?.map(r => {
            return {
                id: r.id,
                name: r.name,
                summary: r.summary,
                score: r.score,
                healthScore: r.healthScore,
                image: r.image,
                steps: r.steps,
                dishTypes: r.dishTypes,
                diets: r.dietTypes.map(d => d.name)
            }
        })
        let allRecipes = [...dbRecipes]

        if(name){
        const recipeName = allRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()) )
        if(recipeName.length > 0) return res.send(recipeName)
        else res.status(404).send('No recipe found with that name')
        } 
        else res.send(allRecipes)
    }
    catch(err){
        next(err)
    }
})



router.get('/:recipeId', async (req, res, next) => {
    const { recipeId } = req.params
    try {
        if(String(recipeId).length === 36){
            const recipe = await Recipe.findByPk(recipeId)
            let diets = await recipe.getDietTypes()
            diets = diets.map(d => d.dataValues.name)
            if(recipe){
                return res.send({...recipe.dataValues, diets})
            }
        }
        else{
            const apiRecipeFound = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_key}`)
            const response = await apiRecipeFound.data
            const details = {
                name: response.title,
                id: response.id,
                summary: response.summary,
                steps: response.analyzedInstructions.length ? response.analyzedInstructions[0].steps : "There are no instructions.",
                healthScore: response.healthScore,
                image: response.image,
                dishTypes: response.dishTypes,
                diets: response.diets
            }
            return res.send(details)
        }
    } catch (err) {
        next(err)
    }
})



router.post('/', async (req, res, next) => {
    const { name, summary, steps, healthScore, image, diets, dishTypes } = req.body
    try {
        if(!name, !summary) return res.status(404).send('name and summary are requied')
        if(healthScore < 0 || healthScore > 100) return res.status(404).send('health score must be between 0 and 100')
        else if(/[^a-zA-Z, ]/g.test(name)) return res.status(404).send('Name could be letters, no symbols!')
        let newRecipe = await Recipe.create({
            name,
            summary,
            steps,
            healthScore,
            image,
            dishTypes
        })

        let dietDb = await DietTypes.findAll({
            where:{ name: diets }
        })
        newRecipe.addDietTypes(dietDb)
        res.send('ok')

    } catch (err) {
        next(err)
    }
})

module.exports = router;