const { Router } = require('express');
const router = Router();
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

router.get('/', async (req, res, next) => {
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
      next(err)
    }
})


module.exports = router;