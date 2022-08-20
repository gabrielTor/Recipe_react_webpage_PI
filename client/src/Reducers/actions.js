const axios = require('axios')

export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const ORDER_HEALTH_SCORE = "ORDER_HEALTH_SCORE"
export const GET_DIET_TYPES = "GET_DIET_TYPES"


export const getRecipesByName = (name) => {
    return async (dispatch) => {
        try{
            const response = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({ type: GET_ALL_RECIPES, payload: response.data })
        }
        catch(err){
            console.log(err)
        }
    }
}

export const getRecipeDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:3001/recipes/${id}`)
        const json = await response.json()
        await dispatch({ type: GET_RECIPE_DETAIL, payload: json })
    }
}

export const createRecipe = (value) => {
    return {
        type: CREATE_RECIPE,
        payload: value
    }
}

export const filterByDiet = (value) => {
    return {
        type: FILTER_BY_DIET,
        payload: value
    }
}

export const orderAlphabetically = (value) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload: value
    }
}

export const orderByScore = (value) => {
    return {
        type: ORDER_HEALTH_SCORE,
        payload: value
    }
}

export const getDietTypes = (value) => {
    return {
        type: GET_DIET_TYPES,
        payload: value
    }
}