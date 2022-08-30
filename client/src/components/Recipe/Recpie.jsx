import React from "react";
import './recipe.css'

function Recipe(props) {
  let key = 1
  return (
    <div className="card" key={props.id}>
      <h3>{props.name}</h3>
      <img id='recipeImg' src={props.image} alt="recipe"/>
      <p><b>Diet Type:</b> {props.diets?.map(d => (<span key={key++}> - {d}</span>))}</p>
    </div>
  );
}
  
export default Recipe;