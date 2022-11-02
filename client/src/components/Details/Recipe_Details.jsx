import React from "react";
import './recipe_details.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail, clearDetails, deleteRecipe } from '../../Reducers/actions'
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
    <div className="details">
      <Navbar/>

      {!details.name ? <Loading/> : 
      <>
      <h1>{details.name}</h1>
      <Link to={`/home/edit/${details.id}`}>
        <button className="edit-btn">
          Edit
        </button>
      </Link>
      <h4>Summary:</h4>
      <h3 dangerouslySetInnerHTML={{__html: details.summary,}}/>
      <img className="detailImg" src={details.image || food_default} alt="recipe"/>
      
      <div className="step-container">
      {
        <h2>
          Steps: <ol>{details.steps.split('-|-').map((s,i)=>(
            <li key={i}>{i+1+')'+s}</li>
          ))}</ol>
        </h2>
      }
      </div>

      <div className="container">
        <h3>Health Score: {details.healthScore}</h3>
        <h3>Dish types: {details.dishTypes}</h3>
        <h3>Diet Type: <ul>{details.diets?.map((d,i) => (<li key={i}>- {d}</li>))}</ul></h3>
      </div>

      <button id='delete' disabled={false} onClick={()=>handleDelete()}>Delete Recipe</button>
      </>
      }
    </div>
  )
}
  
export default RecipeDetails;