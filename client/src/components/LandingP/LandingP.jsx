import React from "react";
import { Link } from 'react-router-dom'

function LandingP(){
    return(
        <div>
            <h1>WELCOME TO MY FOOD WEB APP</h1>
            <Link to='/home'>
                <button>HOME</button>
            </Link>
        </div>
    )
}

export default LandingP;