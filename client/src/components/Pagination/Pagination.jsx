import React from "react";
import './pagination.css'

function Pagination({ recipesPerPage, totalRecipes, page, nextP, prevP }){
    const pageN = []
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageN.push(i)
    }

    return(
        <ul className="pNums">
            <li><button onClick={()=>prevP()}>Previous</button></li>
            {
                pageN?.map(n => { 
                return (
                    <li key={n}>
                        <button onClick={()=>page(n)}>{n}</button>
                    </li>)
                })
            }
            <li><button onClick={()=>nextP()}>Next</button></li>
        </ul>
    )
}

export default Pagination;