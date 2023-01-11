const axios = require('axios')

export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME"
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const ALPHABETICALLY = "ALPHABETICALLY"
export const GET_DIET_TYPES = "GET_DIET_TYPES"
export const ORDER_HEALTH_SCORE = "ORDER_HEALTH_SCORE"
export const CLEARDETAILS = "CLEARDETAILS"
export const DELETERECIPE = "DELETERECIPE"
export const EDIT_RECIPE = "EDIT_RECIPE"
export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const REFRESH = "REFRESH"

export const getRecipes = () => {
    return async (dispatch) => {
        const response = await axios.get('/recipes')
        return dispatch({ type: GET_ALL_RECIPES, payload: response.data })
    }
}

export const getRecipesByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/recipes?name=${name}`)
            return dispatch({ type: GET_RECIPES_BY_NAME, payload: response.data })
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const getRecipeDetail = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/recipes/${id}`)
        return dispatch({ type: GET_RECIPE_DETAIL, payload: response.data })
    }
}

export const deleteRecipe = (id) => {
    return async (disptach) => {
        await axios.delete(`/recipes/${id}`)
        return disptach({ type: DELETERECIPE })
    }
}

export const createRecipe = (value) => {
    return async (dispatch) => {
        await axios.post('/recipes', value)
        return dispatch({type: CREATE_RECIPE})
    }
}

export const getDietTypes = () => {
    return async (dispatch) => {
        const response = await axios.get('/diets')
        return dispatch({type: GET_DIET_TYPES, payload: response.data})
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
        type: ALPHABETICALLY,
        payload: value
    }
}

export const orderHealthScore = (value) => {
    return {
        type: ORDER_HEALTH_SCORE,
        payload: value
    }
}

export const clearDetails = () => {
    return {
        type: CLEARDETAILS
    }
}

export const editRe = (id, value) => {
    return async (dispatch) => {
        await axios.put(`/recipes/edit/${id}`, value)
        return dispatch({type: EDIT_RECIPE})
    }
}

export const userRegister = (value) => {
    return async (dispatch) => {
        try {
            await axios.post('/user', value)
            return dispatch({type: REGISTER})
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const userLogin = (value) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/user/login', value, { withCredentials: true })
            return dispatch({type: LOGIN, payload: response.data})
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        await axios.get('/user/logout')
        return dispatch({type: LOGOUT})
    }
}

export const refreshToken = () => {
    return async (dispatch) => {
        const response = await axios.get('/user/refresh', {withCredentials: true})
        return dispatch({type: REFRESH, payload: response.data})
    }
}