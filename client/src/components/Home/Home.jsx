import styles from './home.module.css'
import Navbar from "../NavBar/Navbar";
import { useDispatch, useSelector } from 'react-redux'
import Recipe from '../Recipe/Recpie'
import { getRecipes, clearDetails } from '../../redux/actions'
import { useEffect } from 'react'
import Pagination from "../Pagination/Pagination";
import Loading from '../Loading/Loading'
import food_default from './food_default.png'

function Home() {
  
  const page = useSelector(state => state.currentPage)
  const dispatch = useDispatch()
  const allRecipes = useSelector(state => state.recipes)
  const recipeFound = useSelector(state => state.recipesByName)
  const indexLast = page * 9
  const indexFirst = indexLast - 9
  let currentRecipes = recipeFound.length ? recipeFound.slice(indexFirst, indexLast) : allRecipes.slice(indexFirst, indexLast)
  
  const totalRecipes = recipeFound.length ? recipeFound.length : allRecipes.length
  const numLength = Math.ceil(totalRecipes / 9)
  const handleNext = () => {
    if(numLength !== page) dispatch({type: 'changePage', payload: page+1})
  }
  const handlePrev = () => {
    if(page !== 1) dispatch({type: 'changePage', payload: page-1})
  }

  useEffect(() => {

    return () => {
      dispatch(clearDetails())
      dispatch(getRecipes()) 
    }
  }, [dispatch])
  
  useEffect(()=>{
    dispatch({type: 'changePage', payload: 1})
  },[recipeFound, dispatch])

  return (
    <div className={styles.home}>
      <Navbar/>

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
        nextP={handleNext}
        prevP={handlePrev}/>
    </div>
  )
}
  
export default Home;