import React from "react";
import './home.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes } from '../../Reducers/actions'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


function Home() {

  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)

  useEffect(() => {
    dispatch(getRecipes())
  }, [])

  return (
      <div>
        <Navbar/>

        {
          allRecipes && allRecipes.map(r => {
            return(
              <div key={r.id}>
                <Link to={`/home/${r.id}`}>
                  <Recipe name={r.name} image={r.image} diets={r.diets} key={r.id}/>
                </Link>
              </div>
            )
          })
        }
        
      </div>
    );
  }
  
  export default Home;