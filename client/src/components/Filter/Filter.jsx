import React from "react";
import './filter.css'

function Filter(){
    return(
        <div>
            <select>
                <option>Order by:</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
                <option value='healthScore'>by health score</option>
            </select>
            <select>
                <option>Filter by diet:</option>
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