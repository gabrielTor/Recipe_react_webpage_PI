import React from "react";
import './create_recipe.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createRecipe, getDietTypes } from '../../Reducers/actions'


const validate = (input) => {
  const errors = {}
  if (!input.name) {
    errors.name = 'You must enter a name for your recipe!'
  } else if (/[^a-zA-Z0-9 ]/g.test(input.name)) {
    errors.name = 'Name could be letters or numbers, no symbols!'
  }
  if(!input.summary) {
    errors.summary = 'You must enter a brief summary!'
  }
  if(input.healthScore > 100 || input.healthScore < 0){
    errors.healthScore = 'Score can not exceed 100, nor be negative number'
  }
  return errors
}

function Create_Recipe() {

  const diets = useSelector(state => state.diets)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [input, setinput] = useState({
    name: '',
    summary: '',
    healthScore: 0,
    steps: '',
    image: 'https://protkd.com/wp-content/uploads/2017/04/default-image.jpg',
    diet: []
  })

  useEffect(() => {
    dispatch(getDietTypes())
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createRecipe(input))
  }
  const handleChange = (event) => {
    setinput({
      ...input,
      [event.target.name]: event.target.value
    })
    setErrors(validate({
      ...input,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
        <label>Enter a title for your recipe:</label>
        <input className={errors.name && 'danger'} type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)}/>
        { errors.name && (<p className="danger">{errors.name}</p>) }
      </div>
      
      <div>
        <label>Summary of recipe:</label>
        <input className={errors.summary && 'danger'} type="text" name="summary" value={input.summary} onChange={(e)=>handleChange(e)}/>
        { errors.summary && (<p className="danger">{errors.summary}</p>) }
      </div>
      
      <div>
        <label>What health score does it have:</label>
        <input className={errors.healthScore && 'danger'} type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
        { errors.healthScore && (<p className="danger">{errors.healthScore}</p>) }
      </div>
      
      <div>
        <label>step by step instructions:</label>
        <input type="text" name="steps" value={input.steps} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div>
        <label>uplaod an image:</label>
        <input type="text" name="image" value={input.image} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div>
        <label>Diet type:</label>
        <input type="checkbox" name="diet" value={input.diet} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <button type="submit">Enter</button>
      { errors && (<p className="danger">{errors}</p>) }
    </form>
  )
}
  
  export default Create_Recipe;