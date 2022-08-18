const { Router } = require('express');
const router = Router();
const {Diet_types} = require('../db')

let dietsArr = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto vegetarian",
    "ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleo",
    "primal",
    "whole 30",
    "Low FODMAP" 
  ];

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