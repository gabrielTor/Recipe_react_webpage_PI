import React from "react";
import './home.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes, orderAlphabetically, filterByDiet, orderHealthScore, clearDetails } from '../../Reducers/actions'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Loading from '../Loading/Loading'

function Home() {
  const [updatePage, setUpdatePage] = useState('')
  const [page, setPage] = useState(1)
  const recipesPerPage = 9
  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
  const recipeFound = useSelector(state => state.recipesByName)
  const [isLoading, setIsLoading] = useState(false);
  const indexLast = page * recipesPerPage
  const indexFirst = indexLast - recipesPerPage
  let currentRecipes = recipeFound.length ? recipeFound.slice(indexFirst, indexLast) : allRecipes.slice(indexFirst, indexLast)
  const handlePage = (num) => setPage(num)
  
  const totalRecipes = recipeFound.length ? recipeFound.length : allRecipes.length
  const numLength = Math.ceil(totalRecipes / recipesPerPage)
  const handleNext = () => {
    if(numLength !== page) setPage(page + 1)
  }
  const handlePrev = () => {
    if(page !== 1) setPage(page - 1)
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(getRecipes())
    setIsLoading(false)

    return () => {
      dispatch(clearDetails())
      dispatch(getRecipes()) 
    }
  }, [dispatch])

  const handleOrder = (event) => {
    dispatch(orderAlphabetically(event.target.value))
    setPage(1)
    setUpdatePage(event.target.value)
  }
  const handleDiet = (event) => {
    dispatch(filterByDiet(event.target.value))
    setPage(1)
  }
  const handleHealthOrder = (event) => {
    dispatch(orderHealthScore(event.target.value))
    setPage(1)
    setUpdatePage(event.target.order)
  }

  return (
    <div id="home">
      <Navbar/>
      <Filter 
        handleOrder={handleOrder} 
        handleHealthOrder={handleHealthOrder} 
        handleDiet={handleDiet}/>

      {isLoading ? <Loading/> :
      <div className="grid">
      {
        currentRecipes?.map(r => {
          return(
            <div key={r.id} className='rCards'>
              <Link to={`/home/${r.id}`}>
                <Recipe 
                  name={r.name}
                  image={r.image}
                  diets={r.dietTypes}
                  key={r.id}/>
              </Link>
            </div>
          )
        })
      }
      </div>
      }
      <Pagination 
        numLength={numLength} 
        page={handlePage}
        nextP={handleNext}
        prevP={handlePrev}/>
    </div>
  )
}
  
export default Home;