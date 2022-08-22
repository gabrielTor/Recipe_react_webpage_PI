const { Router } = require('express');
const router = Router();
const {Diet_types} = require('../db')

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
            Diet_types.findOrCreate({ 
                where: { 
                    name: d 
                } 
            });
        })
        let diet_types = await Diet_types.findAll()
        res.send(diet_types)
      } catch (err) {
            next(err)
      }
})


module.exports = router;