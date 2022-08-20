import React from "react";
import './recipe.css'

function Recipe(props) {
    return (
      <div key={props.id}>
        <h3>{props.name}</h3>
        <img src={props.image} alt="recipe"/>
        <p>Diet Type: {props.diets}</p>
      </div>
    );
  }
  
  export default Recipe;