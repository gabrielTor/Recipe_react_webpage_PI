const {DietTypes} = require('../db')

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
        DietTypes.findOrCreate({ where: { name: d } })
        })
        let diet_types = await DietTypes.findAll()
        res.send(diet_types)
    } 
    catch (err) {
    console.log(err)
    }
}

module.exports = {getDiets}