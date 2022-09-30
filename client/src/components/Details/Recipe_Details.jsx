import React from "react";
import './recipe_details.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail, clearDetails, deleteRecipe, showOrHide } from '../../Reducers/actions'
import Navbar from "../NavBar/Navbar";
import { useHistory, Link } from 'react-router-dom'

function Recipe_Details(props) {

  let key = 1
  const dispatch = useDispatch()
  const details = useSelector(state => state.recipeDetail)
  const hideComp = useSelector(state => state.hide)
  const history = useHistory()
  
  useEffect(()=>{
    dispatch(getRecipeDetail(props.match.params.id))

    return ()=> dispatch(clearDetails())
  }, [])

  const handleDelete = () => {
    dispatch(deleteRecipe(props.match.params.id))
    history.push('/home')
  }

  const handleShow = () => {
    dispatch(showOrHide(true))
  }

  return (
    <>{!hideComp ? 
    <div className="details">
      <Navbar/>
      <h1>{details.name}</h1> 
      <Link to={`/home/edit/${details.id}`}>
        <button onClick={handleShow}>
          Edit
        </button>
      </Link>
      <h4>Summary:</h4>
      <h3 dangerouslySetInnerHTML={{__html: details.summary,}}/>
      <img className="detailImg" src={details.image} alt="recipe"/>
      <div className="step-container">
      {
        Array.isArray(details.steps) ? 
        <h2>Steps: <ol>{details.steps.map(s => (
            <li key={s.number}>{s.number + ')' + s.step}</li>
        ))}</ol></h2> :
        <h2>Steps: {details.steps}</h2>
      }
      </div>
      <div className="container">
      <h3>Health Score: {details.healthScore}</h3>
      {
        Array.isArray(details.dishTypes) ?
        <h3>Dish types: <ul>{details.dishTypes?.map(d => (<li key={key++}>- {d}</li>))}</ul></h3> :
        <h3>Dish types: {details.dishTypes}</h3>
      }
      <h3>Diet Type: <ul>{details.diets?.map(d => (<li key={key++}>- {d}</li>))}</ul></h3>
      </div>

      <button id='delete' disabled={false} onClick={()=>handleDelete()}>Delete Recipe</button>
    </div> : <></>}
    </>
  );
}
  
export default Recipe_Details;