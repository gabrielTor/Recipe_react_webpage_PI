import React from "react";
import './search.css'
import { getRecipesByName } from '../../Reducers/actions'
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
  }

  return (
    <form className="search">
      <input
        type="text"
        placeholder="Look for Recipe"
        onChange={(e) => handleOnSearch(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
    </form>
  );
}

export default Search;