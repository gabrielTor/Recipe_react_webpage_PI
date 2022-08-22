import React from "react";
import './pagination.css'

function Pagination({ recipesPerPage, totalRecipes, page }){
    const pageN = []
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageN.push(i)
    }

    return(
        <ul>
            {
                pageN?.map(n => {
                    return(<li key={n}>
                        <button onClick={(n)=>page(n)}>{n}</button>
                    </li>)
                })
            }
        </ul>
    )
}

export default Pagination;