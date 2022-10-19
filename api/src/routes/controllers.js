const axios = require('axios')
const {Recipe, DietTypes} = require('../db')
require('dotenv').config();
const { API_key } = process.env;
const recipeUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_key}&addRecipeInformation=true&number=100`;

let dietsArr = [
    "gluten free",
    "dairy free",          
    "ketogenic",           
    "lacto ovo vegetarian",
    "vegan",               
    "pescatarian",         
    "paleolithic",         
    "primal",              
    "fodmap friendly",     
    "whole 30"
  ]

async function getDiets(req, res){
    try {
        dietsArr.map((d) => {
        DietTypes.findOrCreate({ 
            where: { name: d } 
        });
        })
        let diet_types = await DietTypes.findAll()
        res.send(diet_types)
    } 
    catch (err) {
    console.log(err)
    }
}

async function getRecipes(req, res){
const { name } = req.query
    try{
        const recipeDB = await Recipe.findAll()
        // await axios.get('http://localhost:3001/diets')
        if(recipeDB.length === 0) {
            const spoonApi = await axios.get(recipeUrl)
            const response = await spoonApi.data
            const hundredRecipes = response.results.map(r => {
                return {
                    name: r.title,
                    summary: r.summary,
                    steps: r.analyzedInstructions.length ? 
                        r.analyzedInstructions[0].steps.map(s => s.step).join('-|- ') : 
                        "There are no instructions.",
                    healthScore: r.healthScore,
                    image: r.image,
                    dishTypes: r.dishTypes.join(', '),
                    diets: r.diets
                }
            })
            await Recipe.bulkCreate(hundredRecipes)
            for (let i = 0; i < hundredRecipes.length; i++) {
                let recipe = await Recipe.findOne({where:{name: hundredRecipes[i].name}})
                if(hundredRecipes[i].diets.length > 0){
                    for (let j = 0; j < hundredRecipes[i].diets.length; j++) {
                        let dietDb = await DietTypes.findAll({
                            where:{ name: hundredRecipes[i].diets[j]}
                        })
                        recipe.addDietTypes(dietDb)
                    }
                }
            }
        }

        if(name){
        const allRecipes = await Recipe.findAll({include: DietTypes})
        const recipeName = allRecipes.filter(r => r.name.toLowerCase().includes(name.toLowerCase()) )
        if(recipeName.length > 0) return res.send(recipeName)
        else res.status(404).send('No recipe found with that name')
        }
        else {
            const allRecipes = await Recipe.findAll({include: DietTypes})
            res.send(allRecipes)
        }
    }
    catch(err){
        console.log(err)
    }
}

async function getDetails(req, res){
    const { recipeId } = req.params
    try {
        const recipe = await Recipe.findByPk(recipeId)
        let diets = await recipe.getDietTypes()
        diets = diets.map(d => d.dataValues.name)
        res.send({...recipe.dataValues, diets})
    } catch (err) {
        console.log(err)
    }
}

async function createRecipe(req, res){
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
            image: image ? image : '',
            dishTypes
        })

        let dietDb = await DietTypes.findAll({
            where:{ name: diets }
        })
        newRecipe.addDietTypes(dietDb)
        res.send('recipe created and added to database')

    } catch (err) {
        console.log(err)
    }
}

async function editRecipe(req, res){
    const {id} = req.params
    const { name, summary, steps, healthScore, image, diets, dishTypes } = req.body
    try{
        let updatedRecipe = await Recipe.findByPk(id)
        await Recipe.upsert({
            id: id,
            name,
            summary,
            steps,
            healthScore,
            image,
            dishTypes
        })
        const changeDiets = await DietTypes.findAll({
            where: { name: diets }
        })
        await updatedRecipe.setDietTypes(changeDiets)
        res.send(`recipe id ${id} was changed`)
    } catch(err) {
        console.log(err)
    }
}

async function deleteRecipe(req, res){
    const {id} = req.params
    try {
        await Recipe.destroy({where: { id: id }})
        res.send('recipe deleted')
    } catch (err) {
        console.log(err)
    }
}

module.exports = {getDiets, getRecipes, getDetails, createRecipe, editRecipe, deleteRecipe};