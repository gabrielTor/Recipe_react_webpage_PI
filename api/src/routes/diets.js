const { Router } = require('express');
const router = Router();
const {Diet_types} = require('../db')

let dietsArr = [
    { diets: "gluten free" },
    { diets: "ketogenic" },
    { diets: "vegetarian" },
    { diets: "lacto vegetarian" },
    { diets: "ovo vegetarian" },
    { diets: "vegan" },
    { diets: "pescatarian" },
    { diets: "paleo" },
    { diets: "primal" },
    { diets: "whole 30" },
    { diets: "Low FODMAP" }
  ];

router.get('/', async (req, res, next) => {
      try {
        dietsArr.map((d) => {
            Diet_types.findOrCreate({ 
                where: { 
                    diet: d.diets 
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