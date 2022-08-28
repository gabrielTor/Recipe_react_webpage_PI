import {
    GET_RECIPES_BY_NAME, 
    GET_ALL_RECIPES, 
    GET_RECIPE_DETAIL, 
    CREATE_RECIPE, 
    FILTER_BY_DIET, 
    ALPHABETICALLY,
    ORDER_HEALTH_SCORE,
    GET_DIET_TYPES 
} from "./actions";

let initialState = {
    recipesByName: [],
    recipes: [],
    recipeDetail: {},
    diets: [],
    recipesAll: [],
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesAll: action.payload
            }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipesByName: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.concat(action.peyload)
            }
        case FILTER_BY_DIET:
            let dietsfilter = action.payload === 'none' ? state.recipesAll : state.recipesAll.filter(r => r.diets.includes(action.payload))
            return {
                ...state,
                recipes: dietsfilter
            }
        case ALPHABETICALLY:
            const orderBy = (value) => {
                if(value === 'A-Z'){
                    const a_Z = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                        else return -1})
                    return a_Z
                    }
                else if(value === 'Z-A'){
                    const z_A = state.recipes.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
                        else return -1})
                    return z_A
                    }
                else return state.recipesAll
                }
            return {
                ...state,
                recipes: orderBy(action.payload)
            }
        case GET_DIET_TYPES:
            return {
                ...state,
                diets: action.payload
            }
        case ORDER_HEALTH_SCORE:
            const orderhealthScore = (value) => {
                if(value === 'highest'){
                    const highest = state.recipes.sort((a, b) => {
                        if((a.healthScore - b.healthScore) < 0) return 1
                        else return -1})
                    return highest
                    }
                else if(value === 'lowest'){
                    const lowest = state.recipes.sort((a, b) => {
                        if ((b.healthScore - a.healthScore) < 0) return 1
                        else return -1})
                    return lowest
                    }
                else return state.recipesAll
                }
            return {
                ...state,
                recipes: orderhealthScore(action.payload)
            }
        default: return state
    }
}