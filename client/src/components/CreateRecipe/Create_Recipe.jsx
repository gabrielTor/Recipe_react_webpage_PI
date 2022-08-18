import React from "react";
import './create_recipe.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createRecipe } from '../../Reducers/actions'

function Create_recipe() {

  const dispatch = useDispatch()
  const [input, setinput] = useState({
    name: '',
    summary: '',
    health_score: 0,
    steps: '',
    image: '',
    diet: []
  })

  const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(createRecipe(input));
  }
  const handleChange = (event) => setinput({
    ...input,
    [event.target.name]: event.target.value
    }
  )

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter a title for your recipe:</label>
      <input type="text" name="name" value={input.name} onChange={handleChange}/>

      <label>Summary of recipe:</label>
      <input type="text" name="summary" value={input.summary} onChange={handleChange}/>

      <label>What health score does it have:</label>
      <input type="number" name="health_score" value={input.health_score} onChange={handleChange}/>

      <label>step by step instructions:</label>
      <input type="text" name="steps" value={input.steps} onChange={handleChange}/>

      <label>uplaod an image:</label>
      <input type="image" name="image" value={input.image} onChange={handleChange}/>

      <label>Diet type:</label>
      <input type="text" name="diet" value={input.diet} onChange={handleChange}/>

      <button type="submit">Enter</button>
    </form>
  );
}
  
  export default Create_recipe;