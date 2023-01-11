import styles from './home.module.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes, orderAlphabetically, filterByDiet, orderHealthScore, clearDetails } from '../../redux/actions'
import { useEffect, useState } from 'react'
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Loading from '../Loading/Loading'
import food_default from './food_default.png'
/* eslint-disable */
function Home() {
  const [updatePage, setUpdatePage] = useState(false)
  const [page, setPage] = useState(1)
  const recipesPerPage = 9
  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
  const recipeFound = useSelector(state => state.recipesByName)
  const indexLast = page * recipesPerPage
  const indexFirst = indexLast - recipesPerPage
  let currentRecipes = recipeFound.length ? recipeFound.slice(indexFirst, indexLast) : allRecipes.slice(indexFirst, indexLast)
  
  const totalRecipes = recipeFound.length ? recipeFound.length : allRecipes.length
  const numLength = Math.ceil(totalRecipes / recipesPerPage)
  const handleNext = () => {
    if(numLength !== page) setPage((p) => p + 1)
  }
  const handlePrev = () => {
    if(page !== 1) setPage((p) => p - 1)
  }

  useEffect(() => {

    return () => {
      dispatch(clearDetails())
      dispatch(getRecipes()) 
    }
  }, [dispatch])
  
  useEffect(()=>{
    setPage(1)
  },[recipeFound])

  const handleOrder = (event) => {
    dispatch(orderAlphabetically(event.target.value))
    setPage(1)
    setUpdatePage((s)=>!s)
  }
  const handleDiet = (event) => {
    dispatch(filterByDiet(event.target.value))
    setPage(1)
  }
  const handleHealthOrder = (event) => {
    dispatch(orderHealthScore(event.target.value))
    setPage(1)
    setUpdatePage((s)=>!s)
  }

  return (
    <div className={styles.home}>
      <Navbar/>
      {/* <Filter 
        handleOrder={handleOrder} 
        handleHealthOrder={handleHealthOrder} 
        handleDiet={handleDiet}/> */}

      {!allRecipes.length ? <Loading/> :
      <div className={styles.grid}>
        {
          currentRecipes?.map(r => (
            <Recipe
              key={r.id}
              id={r.id}
              name={r.name}
              image={r.image || food_default}
              diets={r.dietTypes} />
          ))
        }
      </div>
      }
      <Pagination 
        numLength={numLength} 
        setPage={setPage}
        page={page}
        nextP={handleNext}
        prevP={handlePrev}/>
    </div>
  )
}
  
export default Home;