import React from "react";
import styles from './recipe_details.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail, clearDetails, deleteRecipe } from '../../redux/actions'
import Navbar from "../NavBar/Navbar";
import { useHistory, Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import food_default from '../Home/food_default.png'

function RecipeDetails(props) {

  const dispatch = useDispatch()
  const details = useSelector(state => state.recipeDetail)
  const user = useSelector(state => state.user)
  const history = useHistory()
  
  useEffect(()=>{
    dispatch(getRecipeDetail(props.match.params.id))

    return ()=> dispatch(clearDetails())
  }, [dispatch, props.match.params.id])

  useEffect(()=>{
    if(!user.user) {
      history.push('/login')
      setTimeout(()=>{alert('To access you must login first!')},300)
    }
  }, [history, user.user])

  const handleDelete = () => {
    dispatch(deleteRecipe(props.match.params.id))
    history.push('/home')
  }

  return (
    <>
    <Navbar/>
    <div className={styles.detailsContainer}>

      {!details.name ? <Loading/> : 
      <>
      <h1>{details.name}</h1>

      <Link to={`/home/edit/${details.id}`}>
        <button disabled className={styles.editBtn}>
          Edit
        </button>
      </Link>

      <h3>Summary:</h3>
      <h4 dangerouslySetInnerHTML={{__html: details.summary,}}/>

      <div className={styles.subContainer}>
        <img className={styles.detailImg} src={details.image || food_default} alt="recipe"/>
        <div className={styles.info}>
          <h4>Health Score: {details.healthScore}</h4>
          <h4>Dish types: {details.dishTypes}</h4>
          <h4>Diet Type: </h4><ul>{details.diets?.map((d,i) => (<li key={i}>- {d}</li>))}</ul>
        </div>
      </div>
      
      <div className={styles.stepContainer}>
      <h3>Steps: </h3>
        {<ol>{details.steps.split('-|-').map((step,i)=>(
            <li key={i}>{step}</li>
          ))}</ol>}
      </div>
      <div className={styles.deleteContainer}>
        <button className={styles.delete} disabled={true} onClick={()=>handleDelete()}>Delete Recipe</button>
      </div>
      </>
      }
    </div></>
  )
}
  
export default RecipeDetails;