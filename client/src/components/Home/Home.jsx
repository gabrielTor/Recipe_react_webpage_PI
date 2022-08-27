import React from "react";
import './home.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes, getDietTypes, orderAlphabetically, filterByDiet, orderHealthScore } from '../../Reducers/actions'
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
  const alphaRecipes = useSelector(state => state.alphaRecipes)
  const healthRecipes = useSelector(state => state.healthRecipes)
 
  const indexLast = page * recipesPerPage
  const indexFirst = indexLast - recipesPerPage
  const currentRecipes = recipeFound.length ? recipeFound.slice(indexFirst, indexLast) : allRecipes.slice(indexFirst, indexLast)
  const handlePage = (num) => setPage(num)
  
  let totalRecipes = recipeFound.length ? recipeFound.length : allRecipes.length
  let numLength = Math.ceil(totalRecipes / recipesPerPage)
  const handleNext = () => {
    if(numLength !== page) setPage(page + 1)
  }
  const handlePrev = () => {
    if(page !== 1) setPage(page - 1)
  }

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDietTypes())
    dispatch(orderAlphabetically())
    dispatch(orderHealthScore())
  }, [dispatch])

  const handleOrder = (event) => {
    dispatch(orderAlphabetically(event.target.value))
    totalRecipes = alphaRecipes.length
  }
  const handleDiet = (event) => {
    dispatch(filterByDiet(event.target.value))
    setPage(1)
  }
  const handleHealthOrder = (event) => {
    dispatch(orderHealthScore(event.target.value))
    totalRecipes = healthRecipes.length
  }

  return (
    <div id="home">
      <Navbar/>
      <Filter handleOrder={handleOrder} handleHealthOrder={handleHealthOrder} handleDiet={handleDiet}/>
      {
        currentRecipes?.map(r => {
          return(
            <div key={r.id} className='rCards'>
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
      <Pagination 
        recipesPerPage={recipesPerPage} 
        totalRecipes={totalRecipes} 
        page={handlePage}
        nextP={handleNext}
        prevP={handlePrev}/>
    </div>
  )
}
  
export default Home;