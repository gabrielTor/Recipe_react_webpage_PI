import React from "react";
import './filter.css'
import { useDispatch } from "react-redux";
import { orderAlphabetically, filterByDiet, orderHealthScore } from '../../Reducers/actions'

function Filter({handleOrder, handleHealthOrder, handleDiet}){

    // const dispatch = useDispatch()

    // const handleOrder = (event) => {
    //     dispatch(orderAlphabetically(event.target.value))
    // }
    // const handleDiet = (event) => {
    //     dispatch(filterByDiet(event.target.value))
    // }
    // const handleHealthOrder = (event) => {
    //     dispatch(orderHealthScore(event.target.value))
    // }

    return(
        <div className="filter">
            <select onChange={(e)=>handleOrder(e)}>
                <option value='none'>Order by:</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>

            <select onChange={(e)=>handleHealthOrder(e)}>
                <option value='none'>Health Score Order</option>
                <option value='highest'>highest health score</option>
                <option value='lowest'>lowest health score</option>
            </select>

            <select onChange={(e)=>handleDiet(e)}>
                <option value='none'>Filter by diet:</option>
                <option value='gluten free'>gluten free</option>
                <option value='dairy free'>dairy free</option>
                <option value='ketogenic'>ketogenic</option>
                <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
                <option value='vegan'>vegan</option>
                <option value='pescatarian'>pescatarian</option>
                <option value='paleolithic'>paleolithic</option>
                <option value='primal'>primal</option>
                <option value='fodmap friendly'>fodmap friendly</option>
                <option value='whole 30'>whole 30</option>
            </select>
        </div>
    )
}

export default Filter;

// window.location.reload()