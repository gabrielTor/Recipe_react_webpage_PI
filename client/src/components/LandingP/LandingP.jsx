import React from "react";
import './landingP.css'
import { Link } from 'react-router-dom'

function LandingP(){
    return(
        <div id="landing">
            <h1 className="main">WELCOME TO MY FOOD WEB APP</h1>
            <Link to='/home'>
                <button className="mainbtn">HOME</button>
            </Link>
        </div>
    )
}

export default LandingP;