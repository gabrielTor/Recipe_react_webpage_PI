import React from "react";
import './editRecipe.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { editRe, getDietTypes } from '../../Reducers/actions'
import { useHistory } from "react-router-dom";

const validate = (input) => {
  const errors = {}
  if (!input.name) {
    errors.name = 'You must enter a name for your recipe!'
  } else if (/[^a-zA-Z, ]/g.test(input.name)) {
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

function EditRecipe(props) {

  const history = useHistory()
  const diets = useSelector(state => state.diets)
  const details = useSelector(state => state.recipeDetail)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [input, setinput] = useState({
    name: details.name,
    summary: details.summary,
    healthScore: details.healthScore,
    steps: details.steps,
    dishTypes: details.dishTypes,
    image: details.image,
    diets: []
  })

  useEffect(() => {
    dispatch(getDietTypes())
  }, [])

  const handleSubmit = () => {
    dispatch(editRe(props.match.params.id, input))
    history.push('/home')
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
        diets: [...input.diets, event.target.value]
      })
    }
  }
  const handleCancel = () => {
    history.push(`/home/${props.match.params.id}`)
  }

  return (
    <div className="edit">
    <button onClick={()=>{handleCancel()}}>Cancel</button>
    <form id='form' onSubmit={(e)=>handleSubmit(e)}>
      <div className="form">
        <label>Enter a title for your recipe:</label>
        <input className={errors.name && 'danger'} type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
      </div>
      
      <div className="form">
        <label>Summary of recipe:</label>
        <input className={errors.summary && 'danger'} type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
      </div>
      
      <div className="form">
        <label>What health score does it have:</label>
        <input className={errors.healthScore && 'danger'} type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div className="form">
        <label>image url:</label>
        <input type="url" name="image" value={input.image} onChange={(e)=>handleChange(e)}/>
      </div>

      <div className="form">
        <label>dish types:</label>
        <input type="text" name="dishTypes" value={input.dishTypes} onChange={(e)=>handleChange(e)}/>
      </div>

      <div className="form">
        <label>step by step instructions:</label>
        <textarea name="steps" value={input.steps} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <div id='dtypes'>
        <label>Diet type:</label>
        {
          diets.map(d => {
            return (
              <label className="diets" key={d.id}>
              {d.name}
              <input type="checkbox" value={d.name} onChange={(e)=>handleDiet(e)}/>
              </label>
            )
          })
        }
      </div>
      
      <button disabled={errors.name || errors.summary || errors.healthScore} type="submit">Enter</button>
      { errors.name && (<p className="danger">{errors.name}</p>) }
      { errors.summary && (<p className="danger">{errors.summary}</p>) }
      { errors.healthScore && (<p className="danger">{errors.healthScore}</p>) }
    </form>
    </div>
  )
}
  
export default EditRecipe;