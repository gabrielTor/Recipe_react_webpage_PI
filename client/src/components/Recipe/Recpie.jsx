import React from "react";
import './recipe.css'

function Recipe(props) {
    return (
      <div className="card">
        <h3>{props.name}</h3>
        <img id='recipeImg' src={props.image} alt="recipe"/>
        <p>Diet Type: {props.diets?.map(d => (<span> - {d}</span>))}</p>
      </div>
    );
  }
  
  export default Recipe;