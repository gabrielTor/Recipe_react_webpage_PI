import React from "react";
import './create_recipe.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createRecipe, getDietTypes } from '../../Reducers/actions'
import Navbar from '../NavBar/Navbar'

const validate = (input) => {
  const errors = {}
  if (!input.name) {
    errors.name = 'You must enter a name for your recipe!'
  } else if (/[^a-zA-Z]/g.test(input.name)) {
    errors.name = 'Name could be letters, no symbols!'
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
    dishTypes: '',
    image: 'https://protkd.com/wp-content/uploads/2017/04/default-image.jpg',
    diet: []
  })

  useEffect(() => {
    dispatch(getDietTypes())
  }, [])

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
  const handleDiet = (event) => {
    if(event.target.checked){
      setinput({
        ...input,
        diets: [event.target.value]
      })
    }
  }

  return (
    <>
    <Navbar/>

    <form id='form' onSubmit={(e)=>handleSubmit(e)}>
      <div className="form">
        <label>Enter a title for your recipe:</label>
        <input className={errors.name && 'danger'} type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
        { errors.name && (<p className="danger">{errors.name}</p>) }
      </div>
      
      <div className="form">
        <label>Summary of recipe:</label>
        <input className={errors.summary && 'danger'} type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
        { errors.summary && (<p className="danger">{errors.summary}</p>) }
      </div>
      
      <div className="form">
        <label>What health score does it have:</label>
        <input className={errors.healthScore && 'danger'} type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
        { errors.healthScore && (<p className="danger">{errors.healthScore}</p>) }
      </div>
      
      <div className="form">
        <label>step by step instructions:</label>
        <textarea name="steps" value={input.steps} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div className="form">
        <label>image url:</label>
        <input type="url" name="image" value={input.image} onChange={(e)=>handleChange(e)}/>
      </div>

      <div className="form">
        <label>dish types:</label>
        <input type="text" name="dishTypes" value={input.dishTypes} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div id='dtypes'>
        <label>Diet type:</label>
        {
          diets.map(d => {
            return (
              <label className="diets">
              {d.name}
              <input type="checkbox" value={d.name} onChange={(e)=>handleDiet(e)}/>
              </label>
            )
          })
        }
      </div>
      
      <button type="submit">Enter</button>
    </form>
    </>
  )
}
  
  export default Create_Recipe;