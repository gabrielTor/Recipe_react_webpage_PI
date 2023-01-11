import styles from './search.module.css'
import { getRecipesByName } from '../../redux/actions'
import { useState } from "react"
import { useDispatch } from 'react-redux'

function Search() {
  
  const [recName, setRecName] = useState('')
  const dispatch = useDispatch()

  const handleOnSearch = (event) => {
    setRecName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getRecipesByName(recName))
    setRecName('')
  }

  return (
    <form className={styles.search}>
      <input
        type="text"
        placeholder="Look for Recipe"
        value={recName}
        onChange={(e) => handleOnSearch(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </form>
  );
}

export default Search;