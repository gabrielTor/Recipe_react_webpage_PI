import React from "react";
import './navbar.css'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'

function Navbar() {

  const handleReload = () => {
    if(window.location.href === 'http://localhost:3000/home'){
      window.location.reload()
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
          <li className="navSearch">
            <Search/>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;