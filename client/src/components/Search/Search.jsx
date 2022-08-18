import React from "react";
import './search.css'
import { getRecipesByName } from '../../Reducers/actions'
import { useState } from "react"
import { useDispatch } from 'react-redux'

function Search() {
  
  const [recName, setRecName] = useState('')
  const dispatch = useDispatch()

  const onSearch = (event) => {
    setRecName(event.target.value)
  }
  const click = (event) => {
    event.preventDefault()
    dispatch(getRecipesByName(recName))
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Look for Recipe"
        value={recName}
        onChange={e => onSearch(e)}
      />
      <input type="submit" value="Search" onSubmit={e => click(e)} />
    </form>
  );
}

  export default Search;