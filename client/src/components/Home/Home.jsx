import React from "react";
import './home.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipesByName } from '../../Reducers/actions'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


function Home() {

  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(getRecipesByName())
  })

  return (
      <div>
        <Navbar/>

        <Link to={`/home/${r.id}`}>
          <Recipe name={r.name} image={r.image} diets={r.diets} key={r.id}/>
        </Link>
      </div>
    );
  }
  
  export default Home;