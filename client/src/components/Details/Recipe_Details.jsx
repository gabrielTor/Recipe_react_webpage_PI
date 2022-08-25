import React from "react";
import './recipe_details.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getRecipeDetail } from '../../Reducers/actions'
import Navbar from "../NavBar/Navbar";

function Recipe_Details(props) {
  
  const dispatch = useDispatch()
  const details = useSelector(state => state.recipeDetail)

  useEffect(()=>{
    dispatch(getRecipeDetail(props.match.params.id))
  }, [])

    return (
      <div>
        <Navbar/>
        <h1>{details.name}</h1>
        <h4>Summary: {details.summary}</h4>
        <img className="detailImg" src={details.image} alt="recipe"/>
        {
          Array.isArray(details.steps) ? 
          <h2>Steps: {details.steps.map(s => (
            <ol>
              <li>{s.number + ')' + s.step}</li>
            </ol>
          ))}</h2> :
          <h2>Steps: {details.steps}</h2>
        }
        <h3>Health Score: {details.healthScore}</h3>
        {
          Array.isArray(details.dishTypes) ?
          <h3>Dish types: {details.dishTypes?.map(d => (<ul><li>{d}</li></ul>))}</h3> :
          <h3>Dish types: {details.dishTypes}</h3>
        }
        <h3>Diet Type: {details.diets?.map(d => (<ul><li>{d}</li></ul>))}</h3>
      </div>
    );
  }
  
  export default Recipe_Details;