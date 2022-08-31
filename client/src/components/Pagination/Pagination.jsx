import React from "react";
import './pagination.css'

function Pagination({ page, nextP, prevP, numLength }){
    const pageN = []
    for (let i = 1; i <= numLength; i++) {
        pageN.push(i)
    }

    return(
        <ul className="pNums">
            <li><button onClick={()=>prevP()}>Previous</button></li>
            {
                pageN?.map(n => { 
                return (
                    <li className='btn' key={n}>
                        <button onClick={()=>page(n)}>{n}</button>
                    </li>)
                })
            }
            <li><button onClick={()=>nextP()}>Next</button></li>
        </ul>
    )
}

export default Pagination;