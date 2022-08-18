import React from "react";
import './navbar.css'
import Home from '../Home/Home'
import { NavLink } from 'react-router-dom'
import Create_recipe from '../CreateRecipe/Create_Recipe'
import Search from '../Search/Search'

function Navbar() {
    return (
      <nav>
        {/* <NavLink to='/home'>
          <Home/>
        </NavLink>

        <NavLink to='/'>
          <Create_recipe />
        </NavLink> */}

        <Search />
  
      </nav>
    );
  }
  
  export default Navbar;