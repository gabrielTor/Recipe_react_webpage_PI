import styles from '../CreateRecipe/create_recipe.module.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { editRe, getDietTypes, getRecipeDetail } from '../../redux/actions'
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
  const details = useSelector(state => state.editDetail)
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
    dispatch(getRecipeDetail(props.match.params.id))
  }, [dispatch, props.match.params.id])

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
    <div className={styles.edit}>
      <form className={styles.formContainer} onSubmit={(e)=>handleSubmit(e)}>
      <button onClick={handleCancel}>Cancel</button>
        <div className={styles.form}>
          <label>Enter a title for your recipe:</label>
          <input className={errors.name && styles.danger} type="text" name="name" value={input.name} onChange={(e)=>handleChange(e)} required/>
        </div>
        
        <div className={styles.form}>
          <label>Summary of recipe:</label>
          <input className={errors.summary && styles.danger} type="textarea" name="summary" value={input.summary} onChange={(e)=>handleChange(e)} required/>
        </div>
        
        <div className={styles.form}>
          <label>What health score does it have:</label>
          <input className={errors.healthScore && styles.danger} type="number" name="healthScore" value={input.healthScore} onChange={(e)=>handleChange(e)}/>
        </div>
        
        <div className={styles.form}>
          <label>image url:</label>
          <input type="url" name="image" value={input.image} onChange={(e)=>handleChange(e)}/>
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
            diets.map(d => (
              <label className={styles.diets} key={d.id}>
                {d.name}
                <input type="checkbox" value={d.name} onChange={(e)=>handleDiet(e)}/>
              </label>
            ))
          }
        </div>

        <div className={styles.submit}>
          { errors.name && (<p className={styles.danger}>{errors.name}</p>) }
          { errors.summary && (<p className={styles.danger}>{errors.summary}</p>) }
          { errors.healthScore && (<p className={styles.danger}>{errors.healthScore}</p>) }
        </div>
        
        <div className={styles.submit}>
          <button disabled={errors.name || errors.summary || errors.healthScore} type="submit">Enter</button>
        </div>
        
      </form>
    </div>
  )
}
  
export default EditRecipe;