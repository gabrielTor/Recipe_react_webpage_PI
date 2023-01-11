import styles from './create_recipe.module.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createRecipe, getDietTypes } from '../../redux/actions'
import Navbar from '../NavBar/Navbar'
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
  if(input.image){
    if(!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(input.image)) {
      errors.image = 'Valid images that end with jpg, jpeg, png, gif'
    }
  }
  return errors
}

function CreateRecipe() {

  const history = useHistory()
  const diets = useSelector(state => state.diets)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [input, setinput] = useState({
    name: '',
    summary: '',
    healthScore: 0,
    steps: '',
    dishTypes: '',
    image: '',
    diets: []
  })

  useEffect(() => {
    dispatch(getDietTypes())
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createRecipe(input))
    alert('Created new Recipe')
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

  return (
    <>
    <Navbar/>

    <form className={styles.formContainer} onSubmit={(e)=>handleSubmit(e)}>
      <div className={styles.form}>
        <label>Enter a title for your recipe:</label>
        <input className={errors.name && 'danger'} type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
        {/* { errors.name && (<p className={styles.danger}>{errors.name}</p>) } */}
      </div>
      
      <div className={styles.form}>
        <label>Summary of recipe:</label>
        <input className={errors.summary && 'danger'} type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
        {/* { errors.summary && (<p className={styles.danger}>{errors.summary}</p>) } */}
      </div>
      
      <div className={styles.form}>
        <label>What health score does it have:</label>
        <input className={errors.healthScore && 'danger'} type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
        {/* { errors.healthScore && (<p className={styles.danger}>{errors.healthScore}</p>) } */}
      </div>
      
      <div className={styles.form}>
        <label>image url:</label>
        <input type="url" name="image" value={input.image} placeholder='If no image available a Default Image will be added' onChange={(e)=>handleChange(e)}/>
      </div>

      <div className={styles.form}>
        <label>dish types:</label>
        <input type="text" name="dishTypes" value={input.dishTypes} onChange={(e)=>handleChange(e)}/>
      </div>

      <div className={styles.form}>
        <label>step by step instructions:</label>
        <textarea name="steps" value={input.steps} onChange={(e)=>handleChange(e)}/>
      </div>
      
      <label>Diet type:</label>
      <div className={styles.dTypes}>
        {
          diets.map(d => {
            return (
              <label className={styles.diets} key={d.id}>
              {d.name}
              <input type="checkbox" value={d.name} onChange={(e)=>handleDiet(e)}/>
              </label>
            )
          })
        }
      </div>
      <div className={styles.submit}>
        { errors.name && (<p className={styles.danger}>{errors.name}</p>) }
        { errors.summary && (<p className={styles.danger}>{errors.summary}</p>) }
        { errors.healthScore && (<p className={styles.danger}>{errors.healthScore}</p>) }
        { errors.image && (<p className={styles.danger}>{errors.image}</p>) }
      </div>

      <div className={styles.submit}>
        <button disabled={errors.name || errors.summary || errors.healthScore || errors.image} type="submit">Enter</button>
      </div>
      
    </form>
    </>
  )
}
  
export default CreateRecipe;