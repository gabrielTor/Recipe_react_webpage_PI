import React from "react";
import styles from './landingP.module.css'
import { Link } from 'react-router-dom'

function LandingP(){
    return(
        <div className={styles.landing}>
            <h1 className={styles.main}>WELCOME TO THE FOOD WEB APP</h1>
            <div className={styles.main}>
                <Link to='/home'>
                    <button className={styles.mainbtn}>HOME</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingP;