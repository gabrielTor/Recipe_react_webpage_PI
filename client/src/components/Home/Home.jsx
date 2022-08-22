import React from "react";
import './home.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes } from '../../Reducers/actions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";

function Home() {

  const [page, setPage] = useState(1)
  const recipesPerPage = 9
  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
  const recipeFound = useSelector(state => state.recipesByName)

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  const indexLast = page * recipesPerPage
  const indexFirst = indexLast - recipesPerPage
  const currentRecipes = recipeFound.length ? recipeFound.slice(indexFirst, indexLast) : allRecipes.slice(indexFirst, indexLast)
  const handlePage = (n) => setPage(n)

  return (
    <div>
      <Navbar/>
      <Filter/>
      {
        currentRecipes?.map(r => {
          return(
            <div key={r.id}>
              <Link to={`/home/${r.id}`}>
                <Recipe 
                  name={r.name} 
                  image={r.image} 
                  diets={r.diets} 
                  key={r.id}/>
              </Link>
            </div>
          )
        })
      }
      <Pagination recipesPerPage={recipesPerPage} totalRecipes={allRecipes.length} page={handlePage}/>
    </div>
  )
}
  
export default Home;