import React from "react";
import './navbar.css'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import { useSelector, useDispatch } from 'react-redux'
import { getRecipes } from '../../Reducers/actions'
/* eslint-disable */
function Navbar() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleReload = () => {
    if(window.location.href === 'https://recipe-react-webpage-pi.vercel.app/home'){
      dispatch(getRecipes())
    }
  }

  return (
    <nav>
      <ul className="nav">

        <li className="navList">
          <Link to='/home'><a onClick={()=>handleReload()}>HOME</a></Link>
        </li>

        <li className="navList">
          <Link to='/createRecipe'><a>Create Recipe</a></Link>
        </li>

        <li className="navList">
          <Link to='/login'><a>{user.user ? 'Logout' : 'Login'}</a></Link>
        </li>
        { user.user && window.location.href === 'https://recipe-react-webpage-pi.vercel.app/home' ?
        <li className="navList">
          <Link to='/home'><a>{user.user.toUpperCase()}</a></Link>
        </li> : null
        }
        <li className="navSearch">
          <Search/>
        </li>

      </ul>
    </nav>
  );
}
  
  export default Navbar;