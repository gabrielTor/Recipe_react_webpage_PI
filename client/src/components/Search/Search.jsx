import styles from './search.module.css'
import { getRecipesByName } from '../../redux/actions'
import { useState } from "react"
import { useDispatch } from 'react-redux'

function Search() {

  const [recipe, setRecipe] = useState('')
  const dispatch = useDispatch()

  const handleOnSearch = (event) => {
    setRecipe(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getRecipesByName(recipe))
    setRecipe('')
  }

  return (
    <form className={styles.search}>
      <input
        type="text"
        placeholder="Look for Recipe"
        value={recipe}
        onChange={handleOnSearch}
      />
      <button type="submit" onClick={handleSubmit}>Search</button>
    </form>
  );
}

export default Search;