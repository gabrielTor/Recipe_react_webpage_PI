import React from "react";
import './navbar.css'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'

function Navbar() {
    return (
      <nav>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/createRecipe'>Create Recipe</Link>
          </li>
          <li>
            <Search/>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;